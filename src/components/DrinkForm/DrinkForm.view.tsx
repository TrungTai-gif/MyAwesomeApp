import React, { useEffect, useState } from 'react';
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
import {
  CreateDrink,
  UpdateDrinks,
} from '../../screens/EditDrinks/EditDrink.view';
import {formatPrice} from '../../util/formatPrice';
import {NativeModules} from 'react-native';
import {Drink} from '../DrinkList/DrinkList.view';
import {common} from '../../styles/common.style';
import {colors} from '../../styles/colors';

interface DrinkFormProps {
  selectedDrink: Drink | null;
  onUpdate: (drink: UpdateDrinks) => Promise<void>;
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
  const [imagePath, setImagePath] = useState('');
  const [loading, setLoading] = useState(false);
  const {ImagePicker} = NativeModules;
  useEffect(() => {
    setValueName(selectedDrink?.drinkName ?? '');
    setValuePrice(selectedDrink ? formatPrice(selectedDrink.price) : '');
    setImagePath('');
  }, [selectedDrink]);
  //hanldeCancel
  const handleCancel = () => {
    onCancel();
    setValueName('');
    setValuePrice('');
    setImagePath('');
  };
  //handlePickImage
  const newDrink: CreateDrink = {
    drinkName: valueName,
    price: Number(valuePrice.replace(/\./g, '')),
    imageUrl: imagePath,
  };

  const handlePickImage = async () => {
    try {
      const path = await ImagePicker.PickImage();
      console.log('Ảnh đã chọn:', path);
      if (!path) {
        return;
      }
      setImagePath(path);
    } catch (error) {
      console.log('Lỗi chọn ảnh:', error);
    }
  };
  return (
    <View style={styles.drinkFormContainer}>
      {selectedDrink ? (
        <Text style={styles.h1Change}>Sửa sản phẩm</Text>
      ) : (
        <Text style={styles.h1Add}>Thêm sản phẩm</Text>
      )}
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
        {imagePath ? (
          <Image style={styles.image} source={{uri: imagePath}} />
        ) : selectedDrink?.imageUrl ? (
          <Image style={styles.image} source={{uri: selectedDrink.imageUrl}} />
        ) : null}
        <View style={styles.bachgroundChooseText}>
          <Text style={styles.chooseText}>Chọn hình ảnh</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({pressed}) => [
            styles.button,
            selectedDrink
              ? {backgroundColor: colors.coffee}
              : {backgroundColor: colors.green},
            pressed && styles.pressed,
          ]}
          onPress={async () => {
            setLoading(true);
            try {
              if (!selectedDrink) {
                await onAdd(newDrink);
                onCancel();
                Alert.alert('Thành công', 'Thêm đồ uống thành công');
                return;
              }
              const updateDrink: UpdateDrinks = {
                ...selectedDrink,
                drinkName: valueName,
                price: Number(valuePrice.replace(/\./g, '')),
                imageUrl: imagePath,
              };
              await onUpdate(updateDrink);
              onCancel();
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
            <Text style={[styles.text, common.textWhite]}>
              {selectedDrink ? 'Cập nhật' : 'Thêm'}
            </Text>
          )}
        </Pressable>
        <TouchableOpacity
          style={[styles.button, common.buttonCancle]}
          onPress={() => {
            handleCancel();
          }}>
          <Text style={[styles.text, common.textWhite]}>Hủy thay đổi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrinkForm;
