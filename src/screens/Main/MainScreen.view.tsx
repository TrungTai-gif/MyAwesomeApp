import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './MainScreen.style';
import Header from '../../components/Header/Header.view';
import Footer from '../../components/Footer/Footer.view';
import OrderDrink from '../../components/OrderDrink/OrderDrink.view';

// import {useNavigation, NavigationProp} from '@react-navigation/native';
// const navigation = useNavigation<NavigationProp<Rootparameters, 'Login'>>();

const MainScreen = () => {
  const [selectedMenu, setSelectedMenu] = useState<number>(1.1);
  return (
    <View style={styles.screenContainer}>
      <Header onMenuPress={setSelectedMenu} />
      {/* <TouchableWithoutFeedback onPress={() => setActiveMenu(-1)}> */}
      {selectedMenu === 1.1 && <OrderDrink />}
      {/* <View style={styles.bodyContainer} /> */}
      {/* </TouchableWithoutFeedback> */}
      <Footer />
    </View>
  );
};
export default MainScreen;
