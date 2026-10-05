import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  drinkFormContainer: {
    padding: 10,
    gap: 20,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
  },
  labelInput: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 8,
    minHeight: 30,
    color: 'red',
    fontSize: 17,
    fontWeight: '600',
  },
  button: {
    backgroundColor: 'rgb(117, 186, 117)',
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
