import React, {useState} from 'react';
import {Image, Text, View, FlatList, LayoutChangeEvent, ActivityIndicator} from 'react-native';
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
    <View style={styles.drinkList} onLayout={handleLayout}>
      {flatListWidth === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          key={columns}
          keyExtractor={item => item.drinkId.toString()}
          numColumns={columns}
          data={drinkData}
          columnWrapperStyle={columns > 1 ? styles.columnWrapper : undefined}
          renderItem={({item}) => handleCardItem(item)}
        />
      )}
    </View>
  );
};

export default DrinkList;
