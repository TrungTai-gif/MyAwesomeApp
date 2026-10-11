import AsyncStorage from '@react-native-async-storage/async-storage';
import {triggerLogout} from '../util/authEvent';

const apiClient = async (url: string, config: RequestInit = {}) => {
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    triggerLogout();
    throw new Error('Token hết hạn hoặc không hợp lệ');
  }
  const authResponse = await fetch('http://localhost:5094/api/Authentication', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!authResponse.ok) {
    triggerLogout();
    throw new Error('Token hết hạn hoặc không hợp lệ');
  }
  const response = await fetch(url, {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 401) {
    await AsyncStorage.removeItem('token');
  }
  return response;
};

export default apiClient;
