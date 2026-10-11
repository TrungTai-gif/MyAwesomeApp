import {StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

const styles = StyleSheet.create({
  drinkFormContainer: {
    height: '100%',
    padding: 10,
    gap: 20,
    backgroundColor: colors.cream,
  },
  h1Change: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.coffee,
  },
  h1Add: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.greenDark,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
  },
  input: {
    marginTop: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 8,
    minHeight: 30,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderDark,
    color: colors.danger,
    fontSize: 17,
    fontWeight: '600',
  },
  chooseImage: {
    width: 150,
    height: 150,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.caramel,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  chooseText: {
    fontWeight: '700',
    fontSize: 12,
    color: colors.coffeeDark,
  },
  bachgroundChooseText: {
    position: 'absolute',
    borderRadius: 7,
    padding: 4,
    backgroundColor: 'rgba(247, 241, 231, 0.85)',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 7,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pressed: {
    opacity: 0.7,
  },
});

export default styles;
