import {StyleSheet} from 'react-native-windows';

const getDrinkItemWidth = (
  flatListWidth: number,
  numColumns: number,
  gap = 10,
) => {
  return (flatListWidth - gap * (numColumns - 1)) / numColumns;
};

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#f3f3f3',
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 8,
    paddingBottom: 5,
    flexDirection: 'row',
    gap: 10,
  },
  price: {
    color: '#d32f2f',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 4,
  },
  containerRight: {
    width: '26%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  button: {
    minWidth: 70,
    backgroundColor: 'rgba(113, 163, 193, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 7,
  },
});

export {styles, getDrinkItemWidth};
