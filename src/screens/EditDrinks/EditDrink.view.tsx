import React, {useState} from 'react';
import {View, Alert, TouchableOpacity, Text} from 'react-native';
import {styles} from './EditDrink.style';
import DrinkForm from '../../components/DrinkForm/DrinkForm.view';
import {
  deleteDrinks,
  getDrinks,
  postDrinks,
  putDrinks,
} from '../../api/drinkApi';
import DrinkList, {Drink} from '../../components/DrinkList/DrinkList.view';

export type CreateDrink = {
  drinkName: string;
  price: number;
  imageUrl: string;
};

export type UpdateDrinks = {
  drinkId: number;
  drinkName: string;
  price: number;
  imageUrl?: string;
};

interface EditDrinkProps {
  drinkData: Drink[];
  setDrinkData: any;
  // setDrinkData: React.Dispatch<React.SetStateAction<Drink[]>>;
}

const EditDrink = ({drinkData, setDrinkData}: EditDrinkProps) => {
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  //getDrinks

  //handleUpdateDrink
  const handleUpdateDrink = async (updatedDrink: UpdateDrinks) => {
    await putDrinks(updatedDrink);
    const data = await getDrinks();
    setDrinkData(data);
  };
  //handleOnAdd
  const handleOnAdd = async (addDrink: CreateDrink) => {
    if (!addDrink.drinkName) {
      throw new Error('Vui lòng nhập tên!');
    }
    if (!addDrink.price) {
      throw new Error('Giá phải lớn hơn 0');
    }
    if (!addDrink.imageUrl) {
      throw new Error('Vui lòng nhập ảnh');
    }
    await postDrinks(addDrink);
    const data = await getDrinks();
    setDrinkData(data);
  };
  //handleDelete
  const handleDelete = async (id: number) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa sản phẩm này không', [
      {text: 'Hủy', style: 'cancel'},
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          await deleteDrinks(id);
          const data = await getDrinks();
          setSelectedDrink(null);
          setDrinkData(data);
        },
      },
    ]);
  };
  //handleCancel
  const handleCancel = () => {
    setSelectedDrink(null);
  };
  //renderDrinkAction
  const renderDrinkAction = (item: Drink) => {
    return (
      <>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSelectedDrink(item);
          }}>
          <Text>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleDelete(item.drinkId);
          }}>
          <Text>Xóa</Text>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={styles.bodyContainer}>
      <DrinkList drinkData={drinkData} renderAction={renderDrinkAction} />
      <View style={styles.containerRight}>
        <DrinkForm
          selectedDrink={selectedDrink}
          onUpdate={handleUpdateDrink}
          onCancel={handleCancel}
          onAdd={handleOnAdd}
        />
      </View>
    </View>
  );
};

export default EditDrink;
