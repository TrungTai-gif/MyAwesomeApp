let logoutHandler: (() => void) | null = null;

// lưu logoutHandler =  () => { navigation }
export const setLogoutHandler = (handler: () => void) => {
  logoutHandler = handler;
};

//khi dùng chỉ cần gọi triggerLogout()
//nó sẽ kiểm tra logoutHandler có hay không nếu có thì logoutHandler()
export const triggerLogout = () => {
  logoutHandler?.();
};
