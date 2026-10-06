import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import styles from './MainScreen.style';
import Header from '../../components/Header/Header.view';
import Footer from '../../components/Footer/Footer.view';
import EditDrink from '../EditDrinks/EditDrink.view';
import OrderDrink from '../OrderDrinks/OrderDrink.view';
import {getDrinks} from '../../api/drinkApi';
import {Drink} from '../../components/DrinkList/DrinkList.view';

// import {useNavigation, NavigationProp} from '@react-navigation/native';
// const navigation = useNavigation<NavigationProp<Rootparameters, 'Login'>>();

const MainScreen = () => {
  const [drinkData, setDrinkData] = useState<Drink[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<number>(1.1);
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
  return (
    <View style={styles.screenContainer}>
      <Header onMenuPress={setSelectedMenu} />
      {selectedMenu === 1.1 && (
        <EditDrink drinkData={drinkData} setDrinkData={setDrinkData} />
      )}
      {selectedMenu === 2.2 && <OrderDrink drinkData={drinkData} />}
      <Footer />
    </View>
  );
};
export default MainScreen;
