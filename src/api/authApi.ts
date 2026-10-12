import AsyncStorage from '@react-native-async-storage/async-storage';

const authApi = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    return null;
  }
  const authResponse = await fetch('http://localhost:5094/api/Authentication', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!authResponse.ok) {
    return null;
  }
  const resolve = await authResponse.json();
  return resolve.message;
};

export default authApi;
