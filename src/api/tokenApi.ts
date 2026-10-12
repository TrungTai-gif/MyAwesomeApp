import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = 'http://localhost:5094/api/Token';

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: email,
        password: password,
      }),
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    await AsyncStorage.setItem('token', data.token);
    return data.token;
  } catch (err) {
    console.log(err);
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      return null;
    }
    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};
