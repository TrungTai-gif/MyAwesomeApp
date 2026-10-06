#pragma once
#include "NativeModules.h"
namespace RN = winrt::Microsoft::ReactNative;
namespace winrt::MyAwesomeApp::implementation
{
  REACT_MODULE(ImagePicker)
  struct ImagePicker
  {
    RN::ReactContext context;
    // Khởi tạo Native Module
    REACT_INIT(Initialize)
    void Initialize(RN::ReactContext const &reactContext) noexcept;
    // Mở File Picker
    REACT_METHOD(PickImage)
    void PickImage(RN::ReactPromise<winrt::hstring> promise) noexcept;
  };
}