import {StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

const styles = StyleSheet.create({
  drinkFormContainer: {
    height: '100%',
    padding: 10,
    gap: 5,
    // backgroundColor: 'black',
  },
  table: {
    flex: 1,
  },
  h1: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.greenDark,
  },
  productColumn: {
    flex: 5,
  },
  priceColumn: {
    flex: 2,
  },
  quantityColumn: {
    flex: 1.8,
  },
  plusColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  quanlityText: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusMinus: {
    fontSize: 20,
    fontWeight: '400',
  },
  delete: {
    position: 'absolute',
    right: 0,
  },
  textDelete: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.danger,
  },
  order: {
    justifyContent: 'flex-end',
    gap: 7,
    borderTopColor: colors.border,
    borderTopWidth: 2,
    paddingTop: 7,
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
  },
  textButton: {
    fontSize: 19,
    fontWeight: '600',
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
