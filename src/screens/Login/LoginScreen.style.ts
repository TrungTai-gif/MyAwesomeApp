import {StyleSheet} from 'react-native-windows';
import {colors} from '../../styles/colors';

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  loginBox: {
    minWidth: 380,
    minHeight: 380,
    backgroundColor: 'rgba(247, 241, 231, 0.92)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DCC9B5',
    padding: 20,
    justifyContent: 'space-around',
  },
  titleBox: {
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.coffeeDark,
  },
  errorBox: {
    backgroundColor: '#FBE9E7',
    paddingVertical: 9,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.danger,
    marginBottom: 10,
  },
  errorText: {
    width: '100%',
    color: colors.danger,
    textAlign: 'center',
  },
  lable: {
    marginBottom: 3,
    color: colors.coffeeDark,
  },
  input: {
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 8,
    minHeight: 40,
    marginBottom: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#DCC9B5',
    color: colors.coffeeDark,
  },
  buttonBox: {
    backgroundColor: colors.coffee,
    paddingVertical: 9,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
});

export default styles;
