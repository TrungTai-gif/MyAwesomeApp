import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {styles, getDrinkItemWidth} from './OrderDrink.style';
import DrinkForm from '../DrinkForm/DrinkForm.view';
import {formatPrice} from '../../util/formatPrice';
import {
  deleteDrinks,
  getDrinks,
  postDrinks,
  putDrinks,
} from '../../api/drinkApi';

let NUM_COLUMNS = 5;

export type Drink = {
  drinkId: number;
  drinkName: string;
  price: number;
  imageUrl: string;
};
export type CreateDrink = {
  drinkName: string;
  price: number;
  imageUrl: string;
};

const OrderDrink = () => {
  const [drinkData, setDrinkData] = useState<Drink[]>([]);
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  //getDrinks
  useEffect(() => {
    const loadDrink = async () => {
      try {
        const data = await getDrinks();
        setDrinkData(data);
      } catch (err) {
        console.log(err);
      }
    };
    loadDrink();
  }, []);
  //handleCardItem
  const handleCardItem = (item: Drink) => {
    const drinkItemWidth = getDrinkItemWidth(flatListWidth, NUM_COLUMNS);
    return (
      <View style={[styles.drinkItem, {width: drinkItemWidth}]}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.imageUrl}} style={styles.image} />
        </View>
        <View style={styles.info}>
          <Text style={styles.drinkName}>{item.drinkName}</Text>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
        </View>
        <View style={styles.action}>
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
              setSelectedDrink(null);
            }}>
            <Text>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  //handleUpdateDrink
  const handleUpdateDrink = async (updatedDrink: Drink) => {
    await putDrinks(updatedDrink);
    setDrinkData(list =>
      list.map(item =>
        item.drinkId === updatedDrink.drinkId ? updatedDrink : item,
      ),
    );
  };
  //handleCancel
  const handleCancel = () => {
    setSelectedDrink(null);
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
          setDrinkData(data);
        },
      },
    ]);
  };
  return (
    <View style={styles.screenContainer}>
      <View style={styles.bodyContainer}>
        <FlatList
          key={NUM_COLUMNS} // key của flatlist => thay đổi số cột nó sẽ xóa flatlist cũ tạo lại tránh gây lỗi
          keyExtractor={item => item.drinkId.toString()} //key của các item trong flatlist => khi thêm item mới flatlist nhận diện được nó tránh lỗi
          numColumns={NUM_COLUMNS}
          data={drinkData}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({item}) => handleCardItem(item)}
          onLayout={event => {
            const width = event.nativeEvent.layout.width;
            setFlatListWidth(width);
          }}
        />
        <View style={styles.containerRight}>
          <DrinkForm
            selectedDrink={selectedDrink}
            onUpdate={handleUpdateDrink}
            onCancel={handleCancel}
            onAdd={handleOnAdd}
          />
        </View>
      </View>
    </View>
  );
};

export default OrderDrink;
