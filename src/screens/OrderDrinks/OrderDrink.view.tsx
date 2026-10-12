import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';

import styles from './OrderDrink.style';
import DrinkList, {Drink} from '../../components/DrinkList/DrinkList.view';
import {common} from '../../styles/common.style';
import FormOrder from '../../components/FormOrder/FormOrder.view';
import {postInvoice} from '../../api/orderApi';
import {printReceipt, ReceiptItem} from '../../util/receiptPrinter';
import {formatVietnamTime} from '../../util/dateTime';
interface OrderDrinkProps {
  drinkData: Drink[];
}

export type OrderItem = Drink & {
  quantity: number;
};

const OrderDrink = ({drinkData}: OrderDrinkProps) => {
  const [orderData, setOrderData] = useState<OrderItem[]>([]);
  // Thêm món vào đơn hàng
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

  // Tăng hoặc giảm số lượng món
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

  // Nút thêm món trong danh sách
  const renderDrinkAction = (item: Drink) => {
    const orderedItem = orderData.find(drink => drink.drinkId === item.drinkId);
    return (
      <TouchableOpacity
        style={[styles.button, common.buttonAdd, orderedItem && styles.addText]}
        activeOpacity={0.7}
        onPress={() => handleAddDrink(item)}>
        <Text style={common.textWhite}>
          {orderedItem
            ? `Đã thêm (+1) · SL: ${orderedItem.quantity}`
            : 'Thêm đơn hàng'}
        </Text>
      </TouchableOpacity>
    );
  };
  // Xóa món khỏi đơn hàng
  const handleDelete = (drink: Drink) => {
    setOrderData(prev => prev.filter(item => item.drinkId !== drink.drinkId));
  };
  // Lưu hóa đơn và mở Print Preview
  const handlePostInvoice = async (
    dataPost: OrderItem[],
    emailPost: string,
  ) => {
    try {
      if (dataPost.length === 0) {
        Alert.alert('Thông báo', 'Vui lòng chọn ít nhất một món.');
        return;
      }
      if (!emailPost.trim()) {
        Alert.alert('Thông báo', 'Vui lòng nhập email nhân viên.');
        return;
      }
      // Bước 1: Lưu hóa đơn qua API hiện tại
      const savedInvoice = await postInvoice(dataPost, emailPost);
      if (!savedInvoice) {
        throw new Error('Không lưu được hóa đơn.');
      }
      // Bước 2: Chuẩn hóa danh sách món để in
      const receiptItems: ReceiptItem[] = dataPost.map(item => ({
        drinkName: item.drinkName,
        quantity: item.quantity,
        price: Number(item.price),
      }));
      const invoiceDate = formatVietnamTime(savedInvoice.createdAt);
      // Bước 3: Tạo hóa đơn và mở Print Preview
      const printed = await printReceipt({
        invoiceCode: String(savedInvoice.invoiceCode),
        tableNumber: Number(savedInvoice.tableNumber),
        staffEmail: emailPost,
        items: receiptItems,
        invoiceDate,
      });
      if (printed) {
        setOrderData([]);
        Alert.alert('Thành công', 'Đã lưu hóa đơn');
      } else {
        Alert.alert('Thông báo', 'Hộp thoại in đã đóng hoặc chưa xác nhận in.');
      }
    } catch (error) {
      console.error('Lỗi lưu hoặc in hóa đơn:', error);
      Alert.alert(
        'Lỗi',
        error instanceof Error
          ? error.message
          : 'Không thể lưu hoặc in hóa đơn.',
      );
    }
  };

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
