import {StyleSheet} from 'react-native-windows';

const getDrinkItemWidth = (
  flatListWidth: number,
  numColumns: number,
  gap = 10,
) => {
  return (flatListWidth - gap * (numColumns - 1)) / numColumns;
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
  },
  screenContainer: {
    // display: 'flex', View mặc đinh là display: flex
    flex: 1,
  },
  bodyContainer: {
    backgroundColor: '#f3f3f3',
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 8,
    paddingBottom: 5,
    flexDirection: 'row',
    gap: 10,
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
    minHeight:200,
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
  button: {
    minWidth: 70,
    backgroundColor: 'rgba(113, 163, 193, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 7,
  },
  containerRight: {
    width: '25%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export {styles, getDrinkItemWidth};
