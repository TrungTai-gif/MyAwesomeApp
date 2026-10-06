import {StyleSheet} from 'react-native';

export const getDrinkItemWidth = (
  flatListWidth: number,
  numColumns: number,
  gap = 10,
) => {
  return (flatListWidth - gap * (numColumns - 1)) / numColumns;
};
const styles = StyleSheet.create({
  drinkList: {
    flex: 1,
  },
  drinkItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  info: {
    marginVertical: 4,
  },
  drinkName: {
    color: '#222',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  price: {
    color: '#d32f2f',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 4,
  },
  columnWrapper: {
    gap: 10,
  },
  imageContainer: {
    width: '100%',
    minHeight: 200,
    maxHeight: 230,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default styles;
