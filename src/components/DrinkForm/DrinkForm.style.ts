import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  drinkFormContainer: {
    padding: 10,
    gap: 20,
  },
  h1: {
    fontSize: 20,
    fontWeight: '700',
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
  },

  input: {
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 8,
    minHeight: 30,
    color: 'red',
    fontSize: 17,
    fontWeight: '600',
  },
  chooseImage: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(225, 227, 227, 0.5)',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  chooseText: {
    fontWeight: '700',
    fontSize: 12,
  },
  bachgroundChooseText: {
    position: 'absolute',
    borderRadius: 7,
    padding: 4,
    backgroundColor: 'rgba(225, 227, 227, 0.5)',
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
