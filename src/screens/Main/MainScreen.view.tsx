import React from 'react';
import {View, Text} from 'react-native';
import styles from './MainScreen.style';
import Header from '../../components/Header/Header.view';
import Footer from '../../components/Footer/Footer.view';

// import {useNavigation, NavigationProp} from '@react-navigation/native';
// const navigation = useNavigation<NavigationProp<Rootparameters, 'Login'>>();

const MainScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Header/>
      {/* <TouchableWithoutFeedback onPress={() => setActiveMenu(-1)}> */}
      <View style={styles.bodyContainer}>
        <Text style={styles.text}>The main content area hear</Text>
      </View>
      {/* </TouchableWithoutFeedback> */}
      <Footer />
    </View>
  );
};
export default MainScreen;
