
#include "pch.h"
#include "ReceiptPrinter.h"

#include <Windows.h>
#include <algorithm>
#include <string>
#include <vector>
#include <sstream>
#include <iomanip>
#include <utility>

#include <winrt/Windows.UI.h>
#include <winrt/Windows.UI.Text.h>
#include <winrt/Windows.UI.Xaml.Media.h>
#include <winrt/Windows.UI.Xaml.Shapes.h>

using namespace winrt;
using namespace Windows::Foundation;
using namespace Windows::UI;
using namespace Windows::UI::Text;
using namespace Windows::UI::Xaml;
using namespace Windows::UI::Xaml::Controls;
using namespace Windows::UI::Xaml::Media;
using namespace Windows::UI::Xaml::Shapes;

namespace
{
  using Printer =
      winrt::MyAwesomeApp::implementation::ReceiptPrinter;

  // PrintManager chỉ đăng ký sự kiện một lần cho view hiện tại.
  event_token g_printTaskRequestedToken{};
  bool g_printTaskRequestedRegistered{false};

  // Module đang thực hiện in.
  Printer *g_activePrinter{nullptr};

  std::wstring ToWString(hstring const &value)
  {
    return std::wstring(value.c_str());
  }

  std::vector<std::wstring> SplitLines(
      std::wstring const &text)
  {
    std::vector<std::wstring> result;
    std::wistringstream stream(text);
    std::wstring line;

    while (std::getline(stream, line))
    {
      if (!line.empty() && line.back() == L'\r')
      {
        line.pop_back();
      }

      result.push_back(line);
    }

    return result;
  }

  std::vector<std::wstring> SplitTabs(
      std::wstring const &line)
  {
    std::vector<std::wstring> result;
    std::wistringstream stream(line);
    std::wstring value;

    while (std::getline(stream, value, L'\t'))
    {
      result.push_back(value);
    }

    // Giữ cột cuối nếu chuỗi kết thúc bằng tab.
    if (!line.empty() && line.back() == L'\t')
    {
      result.emplace_back();
    }

    return result;
  }

  std::wstring GetValue(
      std::wstring const &line,
      std::wstring const &prefix)
  {
    if (line.rfind(prefix, 0) == 0)
    {
      return line.substr(prefix.size());
    }

    return L"";
  }

  void SetText(
      TextBlock const &text,
      std::wstring const &value,
      double fontSize = 11.0,
      bool bold = false,
      TextAlignment alignment = TextAlignment::Left)
  {
    text.Text(value);
    text.FontFamily(
        Windows::UI::Xaml::Media::FontFamily(L"Segoe UI"));
    text.FontSize(fontSize);
    text.TextWrapping(TextWrapping::Wrap);
    text.TextAlignment(alignment);
    text.Margin(Thickness{2, 3, 2, 3});

    if (bold)
    {
      text.FontWeight(FontWeights::Bold());
    }
  }

  void AddLabel(
      StackPanel const &panel,
      std::wstring const &value,
      double fontSize = 11.0,
      bool bold = false,
      TextAlignment alignment = TextAlignment::Left)
  {
    TextBlock text;
    SetText(text, value, fontSize, bold, alignment);
    panel.Children().Append(text);
  }

  void AddSeparator(StackPanel const &panel)
  {
    Border separator;
    separator.Height(1);
    separator.Background(
        SolidColorBrush(Colors::LightGray()));
    separator.Margin(Thickness{0, 5, 0, 5});

    panel.Children().Append(separator);
  }

  Grid CreateItemGrid(
      std::vector<std::wstring> const &values,
      bool isHeader)
  {
    Grid grid;

    // Tỷ lệ cột: tên món rộng hơn; số lượng hẹp hơn.
    grid.ColumnDefinitions().Append(
        ColumnDefinition{});
    grid.ColumnDefinitions().Append(
        ColumnDefinition{});
    grid.ColumnDefinitions().Append(
        ColumnDefinition{});
    grid.ColumnDefinitions().Append(
        ColumnDefinition{});

    grid.ColumnDefinitions().GetAt(0).Width(
        GridLength{1.8, GridUnitType::Star});

    grid.ColumnDefinitions().GetAt(1).Width(
        GridLength{0.45, GridUnitType::Star});

    grid.ColumnDefinitions().GetAt(2).Width(
        GridLength{1.0, GridUnitType::Star});

    grid.ColumnDefinitions().GetAt(3).Width(
        GridLength{1.1, GridUnitType::Star});

    for (int i = 0; i < 4; ++i)
    {
      TextBlock text;

      std::wstring value =
          i < static_cast<int>(values.size())
              ? values[i]
              : L"";

      TextAlignment alignment = TextAlignment::Left;

      if (i == 1)
      {
        alignment = TextAlignment::Center;
      }
      else if (i >= 2)
      {
        alignment = TextAlignment::Right;
      }

      SetText(
          text,
          value,
          isHeader ? 9.0 : 10.0,
          isHeader,
          alignment);

      text.VerticalAlignment(VerticalAlignment::Top);

      Grid::SetColumn(text, i);
      grid.Children().Append(text);
    }

    return grid;
  }
}

namespace winrt::MyAwesomeApp::implementation
{
  void ReceiptPrinter::Initialize(
      RN::ReactContext const &reactContext) noexcept
  {
    context = reactContext;
  }

  void ReceiptPrinter::RegisterForPrinting()
  {
    g_activePrinter = this;
    if (isRegistered)
    {
      return;
    }

    // Phải gọi trên UI thread.
    printDocument = XamlPrinting::PrintDocument();

    paginateToken = printDocument.Paginate(
        [this](
            Windows::Foundation::IInspectable const &,
            Windows::Foundation::IInspectable const &args)
        {
          Paginate(
              printDocument,
              args.as<XamlPrinting::PaginateEventArgs>());
        });

    getPreviewPageToken = printDocument.GetPreviewPage(
        [this](
            Windows::Foundation::IInspectable const &,
            Windows::Foundation::IInspectable const &args)
        {
          GetPreviewPage(
              printDocument,
              args.as<XamlPrinting::GetPreviewPageEventArgs>());
        });

    addPagesToken = printDocument.AddPages(
        [this](
            Windows::Foundation::IInspectable const &,
            Windows::Foundation::IInspectable const &args)
        {
          AddPages(
              printDocument,
              args.as<XamlPrinting::AddPagesEventArgs>());
        });

    // Lấy DocumentSource ngay tại UI thread.
    printDocumentSource = printDocument.DocumentSource();

    printManager =
        GraphicsPrinting::PrintManager::GetForCurrentView();

    if (!printManager)
    {
      throw hresult_error(
          E_FAIL,
          L"Không lấy được PrintManager của cửa sổ hiện tại.");
    }

    g_activePrinter = this;

    if (!g_printTaskRequestedRegistered)
    {
      g_printTaskRequestedToken =
          printManager.PrintTaskRequested(
              [](
                  GraphicsPrinting::PrintManager const &sender,
                  GraphicsPrinting::PrintTaskRequestedEventArgs const &args)
              {
                auto *active = g_activePrinter;

                if (active != nullptr)
                {
                  active->PrintTaskRequested(sender, args);
                }
              });

      g_printTaskRequestedRegistered = true;
    }

    isRegistered = true;
  }

  void ReceiptPrinter::PrintTaskRequested(
      GraphicsPrinting::PrintManager const &,
      GraphicsPrinting::PrintTaskRequestedEventArgs const &args)
  {
    auto documentSource = printDocumentSource;

    if (!documentSource)
    {
      throw hresult_error(
          E_FAIL,
          L"PrintDocumentSource chưa được khởi tạo.");
    }

    auto request = args.Request();

    request.CreatePrintTask(
        L"Hóa đơn",
        [documentSource](
            GraphicsPrinting::PrintTaskSourceRequestedArgs const &sourceArgs)
        {
          // Chỉ dùng source đã lấy trước trên UI thread.
          sourceArgs.SetSource(documentSource);
        });
  }

  void ReceiptPrinter::BuildReceiptPage(
      hstring const &receiptText,
      double width,
      double height)
  {
    auto lines = SplitLines(ToWString(receiptText));

    std::wstring storeName = L"ME LINH COFFEE";
    std::wstring storeAddress;
    std::wstring storePhone;
    std::wstring invoiceCode;
    std::wstring tableNumber;
    std::wstring invoiceDate;
    std::wstring staffEmail;
    std::wstring totalText;

    std::vector<std::vector<std::wstring>> items;

    bool readingItems = false;

    for (auto const &line : lines)
    {
      if (line == L"__ITEMS_BEGIN__")
      {
        readingItems = true;
        continue;
      }

      if (line == L"__ITEMS_END__")
      {
        readingItems = false;
        continue;
      }

      if (readingItems)
      {
        items.push_back(SplitTabs(line));
        continue;
      }

      if (line.rfind(L"__STORE_NAME__=", 0) == 0)
      {
        storeName = GetValue(line, L"__STORE_NAME__=");
      }
      else if (line.rfind(L"__STORE_ADDRESS__=", 0) == 0)
      {
        storeAddress =
            GetValue(line, L"__STORE_ADDRESS__=");
      }
      else if (line.rfind(L"__STORE_PHONE__=", 0) == 0)
      {
        storePhone = GetValue(line, L"__STORE_PHONE__=");
      }
      else if (line.rfind(L"__INVOICE__=", 0) == 0)
      {
        invoiceCode = GetValue(line, L"__INVOICE__=");
      }
      else if (line.rfind(L"__TABLE__=", 0) == 0)
      {
        tableNumber = GetValue(line, L"__TABLE__=");
      }
      else if (line.rfind(L"__DATETIME__=", 0) == 0)
      {
        invoiceDate = GetValue(line, L"__DATETIME__=");
      }
      else if (line.rfind(L"__STAFF_EMAIL__=", 0) == 0)
      {
        staffEmail = GetValue(line, L"__STAFF_EMAIL__=");
      }
      else if (line.rfind(L"__TOTAL__=", 0) == 0)
      {
        totalText = GetValue(line, L"__TOTAL__=");
      }
    }

    auto panel = StackPanel();
    panel.Width(std::max(100.0, width - 20.0));
    panel.Padding(Thickness{5, 5, 5, 5});

    AddLabel(
        panel,
        storeName,
        18.0,
        true,
        TextAlignment::Center);

    if (!storeAddress.empty())
    {
      AddLabel(
          panel,
          L"Địa chỉ: " + storeAddress,
          9.0);
    }

    if (!storePhone.empty())
    {
      AddLabel(
          panel,
          L"Điện thoại: " + storePhone,
          9.0);
    }

    AddSeparator(panel);

    AddLabel(
        panel,
        L"HÓA ĐƠN",
        15.0,
        true,
        TextAlignment::Center);

    AddLabel(panel, L"Mã hóa đơn: " + invoiceCode);
    AddLabel(panel, L"Quầy: " + tableNumber);
    AddLabel(panel, L"Ngày giờ: " + invoiceDate);

    // Đây là email nhân viên lấy từ FormOrder.
    AddLabel(panel, L"Nhân viên: " + staffEmail, 9.0);

    AddSeparator(panel);

    for (auto const &item : items)
    {
      if (item.size() == 1 &&
          item[0] == L"Món hàng")
      {
        panel.Children().Append(
            CreateItemGrid(item, true));
        continue;
      }

      panel.Children().Append(
          CreateItemGrid(item, false));

      AddSeparator(panel);
    }

    AddSeparator(panel);

    auto totalPanel = Grid();
    totalPanel.ColumnDefinitions().Append(
        ColumnDefinition{});
    totalPanel.ColumnDefinitions().Append(
        ColumnDefinition{});

    totalPanel.ColumnDefinitions().GetAt(0).Width(
        GridLength{1.0, GridUnitType::Star});

    totalPanel.ColumnDefinitions().GetAt(1).Width(
        GridLength{1.0, GridUnitType::Star});

    TextBlock totalLabel;
    SetText(totalLabel, L"TỔNG CỘNG", 12.0, true);
    Grid::SetColumn(totalLabel, 0);

    TextBlock totalValue;
    SetText(
        totalValue,
        totalText,
        12.0,
        true,
        TextAlignment::Right);
    Grid::SetColumn(totalValue, 1);

    totalPanel.Children().Append(totalLabel);
    totalPanel.Children().Append(totalValue);
    panel.Children().Append(totalPanel);

    AddSeparator(panel);

    AddLabel(
        panel,
        L"Cảm ơn quý khách!",
        11.0,
        true,
        TextAlignment::Center);

    printPage = panel;

    // Dùng kích thước trang do PrintManager cung cấp.
    printPage.Measure(
        Windows::Foundation::Size{
            static_cast<float>(std::max(100.0, width - 10.0)),
            static_cast<float>(std::max(100.0, height - 10.0))});

    printPage.Arrange(
        Windows::Foundation::Rect{
            0.0,
            0.0,
            static_cast<float>(std::max(100.0, width - 10.0)),
            static_cast<float>(std::max(100.0, height - 10.0))});
  }

  void ReceiptPrinter::Paginate(
      XamlPrinting::PrintDocument const &sender,
      XamlPrinting::PaginateEventArgs const &args)
  {
    auto options = args.PrintTaskOptions();

    auto description = options.GetPageDescription(0);
    auto pageSize = description.PageSize;

    pageWidth = pageSize.Width;
    pageHeight = pageSize.Height;

    if (pageWidth <= 40.0 || pageHeight <= 40.0)
    {
      pageWidth = 280.0;
      pageHeight = 1000.0;
    }

    BuildReceiptPage(
        currentReceiptText,
        pageWidth,
        pageHeight);

    sender.SetPreviewPageCount(
        1,
        XamlPrinting::PreviewPageCountType::Final);
  }

  void ReceiptPrinter::GetPreviewPage(
      XamlPrinting::PrintDocument const &sender,
      XamlPrinting::GetPreviewPageEventArgs const &args)
  {
    if (printPage)
    {
      sender.SetPreviewPage(
          args.PageNumber(),
          printPage);
    }
  }

  void ReceiptPrinter::AddPages(
      XamlPrinting::PrintDocument const &sender,
      XamlPrinting::AddPagesEventArgs const &)
  {
    if (printPage)
    {
      sender.AddPage(printPage);
    }

    sender.AddPagesComplete();
  }

  IAsyncAction ReceiptPrinter::PrintReceiptAsync(
      hstring receiptText,
      RN::ReactPromise<bool> promise)
  {
    bool success = false;

    try
    {
      currentReceiptText = receiptText;
      printPage = nullptr;

      RegisterForPrinting();

      auto operation =
          GraphicsPrinting::PrintManager::ShowPrintUIAsync();

      success = co_await operation;
    }
    catch (hresult_error const &error)
    {
      OutputDebugStringW(
          (L"[ReceiptPrinter] " +
           std::wstring(error.message().c_str()) +
           L"\n")
              .c_str());
    }
    catch (...)
    {
      OutputDebugStringW(
          L"[ReceiptPrinter] Lỗi không xác định khi in hóa đơn.\n");
    }

    try
    {
      promise.Resolve(success);
    }
    catch (...)
    {
      OutputDebugStringW(
          L"[ReceiptPrinter] Không thể trả kết quả về JavaScript.\n");
    }

    // Không xóa g_activePrinter trước khi ShowPrintUIAsync hoàn tất.
    // Lần in sau sẽ gán lại instance đang hoạt động.
  }

  void ReceiptPrinter::PrintReceipt(
      hstring receiptText,
      RN::ReactPromise<bool> promise) noexcept
  {
    try
    {
      auto dispatcher = context.UIDispatcher();

      dispatcher.Post(
          [this,
           receiptText = std::move(receiptText),
           promise = std::move(promise)]() mutable
          {
            try
            {
              auto action = PrintReceiptAsync(
                  std::move(receiptText),
                  std::move(promise));

              action.Completed(
                  [](
                      IAsyncAction const &,
                      AsyncStatus)
                  {
                    // PrintReceiptAsync tự xử lý lỗi
                    // và resolve promise.
                  });
            }
            catch (...)
            {
              OutputDebugStringW(
                  L"[ReceiptPrinter] Không thể bắt đầu in.\n");
            }
          });
    }
    catch (...)
    {
      OutputDebugStringW(
          L"[ReceiptPrinter] Không thể gửi lệnh in lên UI thread.\n");
    }
  }
}