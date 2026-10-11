import {StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

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
    backgroundColor: colors.cream,
  },
  drinkItem: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
  },
  info: {
    marginVertical: 4,
  },
  drinkName: {
    color: colors.coffeeDark,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  price: {
    color: colors.danger,
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
