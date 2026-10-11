import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './OrderDrink.style';
import DrinkList, {Drink} from '../../components/DrinkList/DrinkList.view';
import {common} from '../../styles/common.style';
import FormOrder from '../../components/FormOrder/FormOrder.view';

interface OrderDrinkProps {
  drinkData: Drink[];
}

const OrderDrink = ({drinkData}: OrderDrinkProps) => {
  const renderDrinkAction = (item: Drink) => {
    return (
      <>
        <TouchableOpacity
          style={common.button}
          onPress={() => {
            console.log('Thêm đơn hàng:', item.drinkId);
          }}>
          <Text style={common.textWhite}>Thêm đơn hàng</Text>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={styles.bodyContainer}>
      <DrinkList drinkData={drinkData} renderAction={renderDrinkAction} />
      <View style={styles.containerRight}>
        <FormOrder />
      </View>
    </View>
  );
};

export default OrderDrink;
