import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Login/LoginScreen.view';
import MainScreen from '../screens/Main/MainScreen.view';
import {RootParameters} from './type';
import authApi from '../api/authApi';

const Stack = createStackNavigator<RootParameters>();

function AppNavigator() {
  const [initialScreen, setInitialScreen] = useState<'Login' | 'MainScreen' | null>(null);
  const [email, setEmail] = useState('');
  useEffect(() => {
    authApi()
      .then(response => {
        if (response) {
          setEmail(response);
          setInitialScreen('MainScreen');
        } else {
          setInitialScreen('Login');
        }
      })
      .catch(() => {
        setInitialScreen('Login');
      });
  }, []);
  if (!initialScreen) {
    return null; // Đợi kiểm tra token xong
  }
  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        initialParams={{email}}
      />
    </Stack.Navigator>
  );
}
export default AppNavigator;
