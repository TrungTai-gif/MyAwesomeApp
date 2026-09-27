import React from 'react';
import {View, StyleSheet} from 'react-native';
// import Background from './src/components/Background/Background';
// import Clock from './src/components/Clock/Clock';
// import LoginScreen from './src/components/LoginScreen/LoginScreen.view';
// import MainScreen from './src/components/DashBoard/MainScreen.view';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  clockContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 150,
  },
});

function App() {
  return (
    <View style={styles.root}>
      {/* <Background />
      <View style={styles.clockContainer}>
        <Clock city="Ho Chi Minh City" timeZone="Asia/Ho_Chi_Minh" />
        <Clock city="Sydney" timeZone="Australia/Sydney" />
        <Clock city="Los Angeles" timeZone="America/Los_Angeles" />
      </View> */}
      {/* <MainScreen/> */}
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </View>
  );
}

export default App;
