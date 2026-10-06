import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './OrderDrink.style';
import DrinkList, {Drink} from '../../components/DrinkList/DrinkList.view';

interface OrderDrinkProps {
  drinkData: Drink[];
}

const OrderDrink = ({drinkData}: OrderDrinkProps) => {
  const renderDrinkAction = (item: Drink) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            console.log(item);
          }}>
          <Text>Thêm đơn hàng</Text>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={styles.bodyContainer}>
      <DrinkList drinkData={drinkData} renderAction={renderDrinkAction} />
    </View>
  );
};

export default OrderDrink;
