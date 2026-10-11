import {StyleSheet} from 'react-native-windows';
import {colors} from '../../styles/colors';

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.cream,
    paddingHorizontal: 5,
    paddingTop: 8,
    paddingBottom: 5,
    flexDirection: 'row',
    gap: 10,
  },
  containerRight: {
    width: '35%',
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    borderColor: colors.green,
    borderWidth: 1.2,
  },
  addText: {
    borderColor: colors.danger,
    borderWidth: 1.2,
  },
});

export default styles;
