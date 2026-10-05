import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header.view';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import Footer from '../../components/Footer/Footer.view';
import {styles, getDrinkItemWidth} from './OrderDrink.style';
import DrinkForm from '../../components/DrinkForm/DrinkForm.view';
import {formatPrice} from '../../util/formatPrice';
import {getDrinks, putDrinks} from '../../api/drinkApi';

let NUM_COLUMNS = 5;

export type Drink = {
  drinkId: number;
  drinkName: string;
  price: number;
  imageUrl: string;
};

const OrderDrink = () => {
  const [drinkData, setDrinkData] = useState<Drink[]>([]);
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [display, setDisplay] = useState<boolean>(false);
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
  const handleCardItem = (item: any) => {
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
              setDisplay(true);
            }}>
            <Text>Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
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
    handleCancel(false);
  };
  //handleCancel
  const handleCancel = (cancel: boolean) => {
    setDisplay(cancel);
  };
  return (
    <View style={styles.screenContainer}>
      <Header />
      <View style={styles.bodyContainer}>
        <FlatList
          key={NUM_COLUMNS}
          numColumns={NUM_COLUMNS}
          data={drinkData}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({item}) => handleCardItem(item)}
          onLayout={event => {
            const width = event.nativeEvent.layout.width;
            setFlatListWidth(width);
          }}
        />
        {display && (
          <View style={styles.containerRight}>
            <DrinkForm
              selectedDrink={selectedDrink}
              onUpdate={handleUpdateDrink}
              handleCancel={handleCancel}
            />
          </View>
        )}
      </View>
      <Footer />
    </View>
  );
};

export default OrderDrink;
