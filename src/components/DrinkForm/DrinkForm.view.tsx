import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './DrinkForm.style';
import {CreateDrink, Drink} from '../OrderDrink/OrderDrink.view';
import {formatPrice} from '../../util/formatPrice';

interface DrinkFormProps {
  selectedDrink: Drink | null;
  onUpdate: (drink: Drink) => Promise<void>;
  onCancel: () => void;
  onAdd: (addDrink: CreateDrink) => Promise<void>;
}

const DrinkForm = ({
  selectedDrink,
  onUpdate,
  onCancel,
  onAdd,
}: DrinkFormProps) => {
  const [valueName, setValueName] = useState('');
  const [valuePrice, setValuePrice] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setValueName(selectedDrink?.drinkName ?? '');
    setValuePrice(selectedDrink ? formatPrice(selectedDrink.price) : '0');
  }, [selectedDrink]);
  //handlePickImage
  const handlePickImage = async () => {};
  const newDrink: CreateDrink = {
    drinkName: valueName,
    price: Number(valuePrice.replace(/\./g, '')),
    imageUrl: '',
  };
  const handleReset = () => {
    setValueName('');
    setValuePrice('');
    onCancel();
  };
  return (
    <View style={styles.drinkFormContainer}>
      <Text style={styles.h1}>
        {selectedDrink ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
      </Text>
      <View>
        <Text style={styles.text}>Tên sản phẩm: </Text>
        <TextInput
          style={styles.input}
          value={valueName}
          spellCheck={false}
          onChangeText={text => {
            setValueName(text);
          }}
        />
      </View>
      <View>
        <Text style={styles.text}>Giá tiền: </Text>
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
      <TouchableOpacity style={styles.chooseImage} onPress={handlePickImage}>
        {selectedDrink?.imageUrl && (
          <Image style={styles.image} source={{uri: selectedDrink.imageUrl}} />
        )}
        <View style={styles.bachgroundChooseText}>
          <Text style={styles.chooseText}>Chọn hình ảnh</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({pressed}) => [styles.button, pressed && styles.pressed]}
          onPress={async () => {
            setLoading(true);
            try {
              if (!selectedDrink) {
                await onAdd(newDrink);
                handleReset();
                Alert.alert('Thành công', 'Thêm đồ uống thành công');
                return;
              }
              const updateDrink: Drink = {
                ...selectedDrink,
                drinkName: valueName,
                price: Number(valuePrice.replace(/\./g, '')),
              };
              await onUpdate(updateDrink);
              handleReset();
              Alert.alert('Thành công', 'Cập nhật đồ uống thành công');
            } catch (err) {
              Alert.alert('Thất bại', `${err}`);
            } finally {
              setLoading(false);
            }
          }}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.text}>
              {selectedDrink ? 'Cập nhật' : 'Thêm '}
            </Text>
          )}
        </Pressable>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleReset();
          }}>
          <Text style={styles.text}>Hủy thay đổi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrinkForm;
