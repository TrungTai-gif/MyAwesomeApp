import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import styles from './OrderDrink.style';
import DrinkList, {Drink} from '../../components/DrinkList/DrinkList.view';
import {common} from '../../styles/common.style';
import FormOrder from '../../components/FormOrder/FormOrder.view';
import {postInvoice} from '../../api/orderApi';

interface OrderDrinkProps {
  drinkData: Drink[];
}
export type OrderItem = Drink & {
  quantity: number;
};

const OrderDrink = ({drinkData}: OrderDrinkProps) => {
  const [orderData, setOrderData] = useState<OrderItem[]>([]);
  //handleAddDrink
  const handleAddDrink = (drink: Drink) => {
    setOrderData(prev => {
      const existing = prev.find(item => item.drinkId === drink.drinkId);
      if (existing) {
        if (existing.quantity >= 99) {
          return prev;
        }
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
        if (quantity > 99) {
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
          activeOpacity={0.7}
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
  const handleDelete = (drink: Drink) => {
    setOrderData(prev => prev.filter(item => item.drinkId !== drink.drinkId));
  };
  //handlePostInvoice
  const handlePostInvoice = async (
    dataPost: OrderItem[],
    emailPost: string,
  ) => {
    try {
      const response = await postInvoice(dataPost, emailPost);
      console.log(response);
      setOrderData([]);
      Alert.alert('Thành công', 'Đơn đã được đặt');
    } catch (err) {
      Alert.alert('Thất bại', `${err}`);
      console.log(err);
    }
  };
  //handlePrint 
  // const handlePrint = () => {

  // }
  return (
    <View style={styles.bodyContainer}>
      <DrinkList drinkData={drinkData} renderAction={renderDrinkAction} />
      <View style={styles.containerRight}>
        <FormOrder
          data={orderData}
          handleQuantity={handleQuantity}
          handleDelete={handleDelete}
          handlePostInvoice={handlePostInvoice}
        />
      </View>
    </View>
  );
};

export default OrderDrink;
