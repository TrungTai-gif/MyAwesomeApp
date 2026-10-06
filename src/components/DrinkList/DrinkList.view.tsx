import React, {useState} from 'react';
import {Image, Text, View, FlatList, LayoutChangeEvent} from 'react-native';
import styles, {getDrinkItemWidth} from './DrinkList.style';
import {formatPrice} from '../../util/formatPrice';

export type Drink = {
  drinkId: number;
  drinkName: string;
  price: number;
  imageUrl: string;
};
interface DrinkListProps {
  drinkData: Drink[];
  renderAction: (item: Drink) => React.ReactNode;
}
const DrinkList = ({drinkData, renderAction}: DrinkListProps) => {
  const [flatListWidth, setFlatListWidth] = useState(0);
  //handleColumns
  const handleColumns = (width: number) => {
    if (width >= 1400) {
      return 7;
    } else if (width >= 1200) {
      return 6;
    } else if (width >= 1000) {
      return 5;
    } else if (width >= 800) {
      return 4;
    } else if (width >= 600) {
      return 3;
    } else if (width >= 400) {
      return 2;
    } else {
      return 1;
    }
  };
  const columns = handleColumns(flatListWidth);
  const handleLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    setFlatListWidth(width);
  };
  //handleCardItem
  const handleCardItem = (item: Drink) => {
    const drinkItemWidth = getDrinkItemWidth(flatListWidth, columns);
    return (
      <View style={[styles.drinkItem, {width: drinkItemWidth}]}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.imageUrl}} style={styles.image} />
        </View>
        <View style={styles.info}>
          <Text style={styles.drinkName}>{item.drinkName}</Text>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
        </View>
        <View style={styles.action}>{renderAction(item)}</View>
      </View>
    );
  };
  return (
    <View style={styles.drinkList}>
      <FlatList
        key={columns} // key của flatlist => thay đổi số cột nó sẽ xóa flatlist cũ tạo lại tránh gây lỗi
        keyExtractor={item => item.drinkId.toString()} //key của các item trong flatlist => khi thêm item mới flatlist nhận diện được nó tránh lỗi
        numColumns={columns}
        data={drinkData}
        columnWrapperStyle={columns > 1 ? styles.columnWrapper : undefined}
        renderItem={({item}) => handleCardItem(item)}
        onLayout={handleLayout}
      />
    </View>
  );
};

export default DrinkList;
