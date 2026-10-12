import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import styles from './FormOrder.style';
import {DataTable} from 'react-native-paper';
import {Drink} from '../DrinkList/DrinkList.view';
import {common} from '../../styles/common.style';
import {formatPrice} from '../../util/formatPrice';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootParameters} from '../../navigation/type';
import { OrderItem } from '../../screens/OrderDrinks/OrderDrink.view';
import {FontAwesome} from '@react-native-vector-icons/fontawesome';
interface FormOrderProps {
  // data: (Drink & {quantity: number})[];
  data: OrderItem[];
  handleQuantity: (drinkId: number, amount: number) => void;
  handleDelete: (drink: Drink) => void;
  handlePostInvoice: (data: OrderItem[], email: string) => void;
}

const FormOrder = ({
  data,
  handleQuantity,
  handleDelete,
  handlePostInvoice,
}: FormOrderProps) => {
  const router = useRoute<RouteProp<RootParameters, 'MainScreen'>>();
  const email = router.params.email;
  const totalPrice = data.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <View style={styles.drinkFormContainer}>
      <Text style={styles.h1}>Order form</Text>
      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title style={styles.productColumn}>
            Sản phẩm
          </DataTable.Title>
          <DataTable.Title style={styles.priceColumn}>Giá</DataTable.Title>
          <DataTable.Title style={styles.quantityColumn}>
            Số lượng
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          {data.map(item => {
            return (
              <DataTable.Row key={item.drinkId}>
                <DataTable.Cell style={styles.productColumn}>
                  {item.drinkName}
                </DataTable.Cell>
                <DataTable.Cell style={styles.priceColumn}>
                  {formatPrice(item.price)}
                </DataTable.Cell>
                <View style={[styles.quantityColumn, styles.plusColumn]}>
                  <TouchableOpacity
                    onPress={() => handleQuantity(item.drinkId, -1)}>
                    <Text style={styles.plusMinus}>-</Text>
                  </TouchableOpacity>
                  <View style={styles.quanlityText}>
                    <Text>{item.quantity}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleQuantity(item.drinkId, 1)}>
                    <Text style={styles.plusMinus}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.delete}
                    onPress={() => handleDelete(item)}>
                    {/* <Text style={styles.textDelete}>x</Text> */}
                    <FontAwesome name="trash" size={15} color="#d21919" />
                  </TouchableOpacity>
                </View>
              </DataTable.Row>
            );
          })}
        </ScrollView>
      </DataTable>
      <View style={styles.order}>
        <View style={styles.price}>
          <Text style={styles.text}>Tổng ({data.length} mặt hàng)</Text>
          <Text style={[styles.text, {color: 'red'}]}>
            {formatPrice(totalPrice)}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, common.buttonSave]}
          onPress={() => handlePostInvoice(data, email)}>
          <Text style={[styles.textButton, common.textWhite]}>Lưu và in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormOrder;
