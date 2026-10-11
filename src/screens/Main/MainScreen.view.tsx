import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import styles from './MainScreen.style';
import Header from '../../components/Header/Header.view';
import Footer from '../../components/Footer/Footer.view';
import EditDrink from '../EditDrinks/EditDrink.view';
import OrderDrink from '../OrderDrinks/OrderDrink.view';
import {getDrinks} from '../../api/drinkApi';
import {Drink} from '../../components/DrinkList/DrinkList.view';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParameters} from '../../navigation/type';
import {setLogoutHandler, triggerLogout} from '../../util/authEvent';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {useNavigation, NavigationProp} from '@react-navigation/native';
// const navigation = useNavigation<NavigationProp<Rootparameters, 'Login'>>();

const MainScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootParameters, 'MainScreen'>>();
  const [drinkData, setDrinkData] = useState<Drink[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<number>(1.1);
  //getDrinks
  useEffect(() => {
    const loadDrink = async () => {
      try {
        const data = await getDrinks();
        setDrinkData(data);
      } catch (err) {
        console.log(err);
      }
    };
    loadDrink();
  }, []);
  //setLogoutHandler truyền  () => { navigation } lưu vào 1 biến chứ chưa thực hiện (đăng ký hàm)
  // truyền  () => { navigation } ra ngoài react để dùng được ngoài react
  useEffect(() => {
    setLogoutHandler(() => {
      navigation.replace('Login');
    });
  }, [navigation]);
  //handleMenuPress
  const handleMenuPress = async (menuId: number) => {
    if (menuId === 4.1) {
      await AsyncStorage.removeItem('token');
      triggerLogout();
      return;
    }
    setSelectedMenu(menuId);
  };
  return (
    <View style={styles.screenContainer}>
      <Header onMenuPress={handleMenuPress} />
      {selectedMenu === 1.1 && (
        <EditDrink drinkData={drinkData} setDrinkData={setDrinkData} />
      )}
      {selectedMenu === 2.2 && <OrderDrink drinkData={drinkData} />}
      <Footer />
    </View>
  );
};
export default MainScreen;
