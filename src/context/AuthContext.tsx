import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useState} from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
  email: string | null;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProps {
  children: React.ReactNode;
}
export const AuthProvider = (props: AuthContextProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const login = async (token: string, emailUser: string) => {
    await AsyncStorage.setItem('token', token);
    setEmail(emailUser);
    setIsLoggedIn(true);
  };
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        email,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  }
  return context;
};
