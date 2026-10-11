import {StyleSheet} from 'react-native-windows';
import {colors} from '../../styles/colors';

const styles = StyleSheet.create({
  text: {
    color: colors.coffeeDark,
    fontSize: 14,
    fontWeight: '400',
  },
  screenContainer: {
    flex: 1,
  },
  accountText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  bodyContainer: {
    backgroundColor: colors.cream,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
