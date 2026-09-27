import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../components/LoginScreen/LoginScreen.view';
import MainScreen from '../components/DashBoard/MainScreen.view';
export type Rootparameters = {
  Login: undefined;
  Dashboard: {
    email: string;
  };
};
const Stack = createStackNavigator<Rootparameters>();

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={MainScreen} />
    </Stack.Navigator>
  );
}
export default AppNavigator;
