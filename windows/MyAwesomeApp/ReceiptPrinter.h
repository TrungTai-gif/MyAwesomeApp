
#pragma once

#include "NativeModules.h"

#include <winrt/Windows.Foundation.h>
#include <winrt/Windows.Graphics.Printing.h>
#include <winrt/Windows.UI.Xaml.h>
#include <winrt/Windows.UI.Xaml.Controls.h>
#include <winrt/Windows.UI.Xaml.Printing.h>

namespace RN = winrt::Microsoft::ReactNative;
namespace GraphicsPrinting = winrt::Windows::Graphics::Printing;
namespace Xaml = winrt::Windows::UI::Xaml;
namespace Controls = winrt::Windows::UI::Xaml::Controls;
namespace XamlPrinting = winrt::Windows::UI::Xaml::Printing;

namespace winrt::MyAwesomeApp::implementation
{
  REACT_MODULE(ReceiptPrinter)
  struct ReceiptPrinter
  {
    RN::ReactContext context;

    GraphicsPrinting::PrintManager printManager{nullptr};
    XamlPrinting::PrintDocument printDocument{nullptr};

    // Lấy DocumentSource trên UI thread trước khi in.
    GraphicsPrinting::IPrintDocumentSource
        printDocumentSource{nullptr};

    Xaml::UIElement printPage{nullptr};

    winrt::hstring currentReceiptText{};

    double pageWidth{280.0};
    double pageHeight{1000.0};

    bool isRegistered{false};

    winrt::event_token paginateToken{};
    winrt::event_token getPreviewPageToken{};
    winrt::event_token addPagesToken{};

    REACT_INIT(Initialize)
    void Initialize(RN::ReactContext const &reactContext) noexcept;

    REACT_METHOD(PrintReceipt)
    void PrintReceipt(
        winrt::hstring receiptText,
        RN::ReactPromise<bool> promise) noexcept;

    winrt::Windows::Foundation::IAsyncAction PrintReceiptAsync(
        winrt::hstring receiptText,
        RN::ReactPromise<bool> promise);

    void RegisterForPrinting();

    void PrintTaskRequested(
        GraphicsPrinting::PrintManager const &sender,
        GraphicsPrinting::PrintTaskRequestedEventArgs const &args);

    void Paginate(
        XamlPrinting::PrintDocument const &sender,
        XamlPrinting::PaginateEventArgs const &args);

    void GetPreviewPage(
        XamlPrinting::PrintDocument const &sender,
        XamlPrinting::GetPreviewPageEventArgs const &args);

    void AddPages(
        XamlPrinting::PrintDocument const &sender,
        XamlPrinting::AddPagesEventArgs const &args);

    void BuildReceiptPage(
        winrt::hstring const &receiptText,
        double width,
        double height);
  };
}