import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './DrinkForm.style';
import {Drink} from '../../screens/OrderDrink/OrderDrink.view';
import {formatPrice} from '../../util/formatPrice';

interface DrinkFormProps {
  selectedDrink: Drink | null;
  onUpdate: (drink: Drink) => Promise<void>;
  handleCancel: (cancel: boolean) => void;
}

const DrinkForm = ({selectedDrink, onUpdate, handleCancel}: DrinkFormProps) => {
  const [valueName, setValueName] = useState('');
  const [valuePrice, setValuePrice] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setValueName(selectedDrink?.drinkName ?? '');
    setValuePrice(selectedDrink ? formatPrice(selectedDrink.price) : '0');
  }, [selectedDrink]);
  const handlePickImage = async () => {};

  return (
    <View style={styles.drinkFormContainer}>
      <View style={styles.labelInput}>
        <Text style={styles.text}>Tên: </Text>
        <TextInput
          style={styles.input}
          value={valueName}
          spellCheck={false}
          onChangeText={text => {
            setValueName(text);
          }}
        />
      </View>
      <View style={styles.labelInput}>
        <Text style={styles.text}>Giá: </Text>
        <TextInput
          style={styles.input}
          value={valuePrice}
          spellCheck={false}
          onChangeText={text => {
            const onlyNumber = text.toString().replace(/\D/g, '');
            setValuePrice(formatPrice(Number(onlyNumber)));
          }}
        />
      </View>
      <TouchableOpacity onPress={handlePickImage}>
        <Text>Chọn hình ảnh</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!selectedDrink) {
              return;
            }
            const updateDrink: Drink = {
              ...selectedDrink,
              drinkName: valueName,
              price: Number(valuePrice.replace(/\./g, '')),
            };
            onUpdate(updateDrink);
          }}>
          <Text style={styles.text}>Cập nhật</Text>
        </TouchableOpacity> */}
        <Pressable
          style={({pressed}) => [styles.button, pressed && styles.pressed]}
          onPress={async () => {
            if (!selectedDrink) {
              return;
            }
            const updateDrink: Drink = {
              ...selectedDrink,
              drinkName: valueName,
              price: Number(valuePrice.replace(/\./g, '')),
            };
            setLoading(true);
            try {
              await onUpdate(updateDrink);
              Alert.alert('Thành công', 'Cập nhật đồ uống thành công');
            } catch (err) {
              Alert.alert('Thất bại',`${err}`);
            } finally {
              setLoading(false);
            }
          }}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.text}>Cập nhật</Text>
          )}
        </Pressable>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleCancel(false);
          }}>
          <Text style={styles.text}>Hủy thay đổi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrinkForm;
