import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Login/LoginScreen.view';
import MainScreen from '../screens/Main/MainScreen.view';
import { RootParameters } from './type';
import OrderDrink from '../screens/OrderDrink/OrderDrink.view';

const Stack = createStackNavigator<RootParameters>();

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={MainScreen} />
      <Stack.Screen name="OrderDrink" component={OrderDrink} />
    </Stack.Navigator>
  );
}
export default AppNavigator;
