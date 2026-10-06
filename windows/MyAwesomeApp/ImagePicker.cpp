#include "pch.h"
#include "ImagePicker.h"
#include <winrt/Windows.Storage.h>
#include <winrt/Windows.Storage.Pickers.h>
using namespace winrt;
using namespace Windows::Storage;
using namespace Windows::Storage::Pickers;
namespace winrt::MyAwesomeApp::implementation
{
  // INITIALIZE
  void ImagePicker::Initialize(RN::ReactContext const &reactContext) noexcept
  {
    context = reactContext;
  }
  // PICK IMAGE
  void ImagePicker::PickImage(RN::ReactPromise<hstring> promise) noexcept
  {
    auto prom = promise;
    context.UIDispatcher().Post(
        [prom = std::move(prom)]() -> winrt::fire_and_forget
        {
          auto p = prom;
          try
          {
            // 1. Tạo FileOpenPicker
            FileOpenPicker picker;
            // 2. Các định dạng ảnh cho phép chọn
            picker.FileTypeFilter().Append(L".jpg");
            picker.FileTypeFilter().Append(L".jpeg");
            picker.FileTypeFilter().Append(L".png");
            picker.FileTypeFilter().Append(L".webp");
            // 3. Mở cửa sổ chọn file-
            StorageFile file = co_await picker.PickSingleFileAsync();
            // 4. Người dùng bấm Cancel
            if (file == nullptr)
            {
              p.Resolve(L"");
              co_return;
            }
            // 5. Lấy TemporaryFolder của app
            StorageFolder tempFolder = ApplicationData::Current().TemporaryFolder();
            // 6. Copy file vào TemporaryFolder
            // Làm vậy để app có quyền đọc file sau này.
            StorageFile copiedFile = co_await file.CopyAsync(
                tempFolder, file.Name(), NameCollisionOption::ReplaceExisting);
            // 7. Lấy đường dẫn file mới
            hstring imagePath = copiedFile.Path();
            // 8. Trả path về JavaScript
            p.Resolve(imagePath);
          }
          catch (const winrt::hresult_error &ex)
          {
            auto error = RN::ReactError();
            error.Message = "PickImage WinRT error: " + winrt::to_string(ex.message());
            p.Reject(error);
          }
          catch (...)
          {
            auto error = RN::ReactError();
            error.Message = "Unknown error in PickImage";
            p.Reject(error);
          }
          co_return;
        });
  }
}