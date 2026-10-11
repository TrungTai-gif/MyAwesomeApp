import {StyleSheet} from 'react-native-windows';
import {colors} from '../../styles/colors';

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: colors.cream,
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 8,
    paddingBottom: 5,
    flexDirection: 'row',
    gap: 10,
  },
  price: {
    color: colors.danger,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 4,
  },
  containerRight: {
    width: '26%',
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8DCCB',
  },
  button: {
    minWidth: 70,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 7,
  },
});

export {styles};
