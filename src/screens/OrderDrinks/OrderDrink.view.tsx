import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './OrderDrink.style';
import DrinkList, {Drink} from '../../components/DrinkList/DrinkList.view';
import {common} from '../../styles/common.style';
import FormOrder from '../../components/FormOrder/FormOrder.view';

interface OrderDrinkProps {
  drinkData: Drink[];
}
type OrderItem = Drink & {
  quantity: number;
};

const OrderDrink = ({drinkData}: OrderDrinkProps) => {
  const [orderData, setOrderData] = useState<OrderItem[]>([]);
  //renderDrinkAction
  const handleAddDrink = (drink: Drink) => {
    setOrderData(prev => {
      const existing = prev.find(item => item.drinkId === drink.drinkId);
      if (existing) {
        return prev.map(item =>
          item.drinkId === drink.drinkId
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      }
      return [...prev, {...drink, quantity: 1}];
    });
  };
  //handleQuantity
  const handleQuantity = (drinkId: number, amount: number) => {
    setOrderData(prev =>
      prev.flatMap(item => {
        if (item.drinkId !== drinkId) {
          return [item];
        }
        const quantity = item.quantity + amount;
        if (quantity <= 0) {
          return [];
        }
        if (item.quantity > 99) {
          return [item];
        }
        return [{...item, quantity}];
      }),
    );
  };
  //renderDrinkAction
  const renderDrinkAction = (item: Drink) => {
    const orderedItem = orderData.find(drink => drink.drinkId === item.drinkId);
    return (
      <>
        <TouchableOpacity
          style={[
            styles.button,
            common.buttonAdd,
            orderedItem && styles.addText,
          ]}
          onPress={() => {
            handleAddDrink(item);
          }}>
          <Text style={common.textWhite}>
            {orderedItem
              ? `Đã thêm (+1) · SL: ${orderedItem.quantity}`
              : 'Thêm đơn hàng'}
          </Text>
        </TouchableOpacity>
      </>
    );
  };
  //handleDelete
  const handleDelete = (drink : Drink) => {
    setOrderData(prev => prev.filter(item => item.drinkId !== drink.drinkId))
  }
  return (
    <View style={styles.bodyContainer}>
      <DrinkList drinkData={drinkData} renderAction={renderDrinkAction} />
      <View style={styles.containerRight}>
        <FormOrder
          data={orderData}
          handleQuantity={handleQuantity}
          handleDelete={handleDelete}
        />
      </View>
    </View>
  );
};

export default OrderDrink;
