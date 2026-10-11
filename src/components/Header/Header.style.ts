import {StyleSheet} from 'react-native-windows';
import {colors} from '../../styles/colors';

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '400',
  },
  isDisabled: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 15,
    backgroundColor: colors.coffee,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.caramel,
    overflow: 'visible',
    zIndex: 100,
  },
  menuItem: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
  },
  menuItemIsActive: {
    backgroundColor: colors.coffeeDark,
    borderColor: colors.coffeeDark,
    borderRadius: 5,
  },
  textActive: {
    color: colors.white,
    fontWeight: '600',
  },
  subMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: colors.white,
    minWidth: 200,
    borderWidth: 1,
    borderColor: colors.caramel,
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
    zIndex: 101,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.caramel,
  },
  subMenuItem: {
    paddingVertical: 6,
  },
  account: {
    position: 'absolute',
    right: 30,
    top: 0,
    height: '100%',
    marginVertical: 5,
    justifyContent: 'center',
  },
});

export default styles;
