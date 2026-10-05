import {StyleSheet} from 'react-native-windows';

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
    backgroundColor: 'rgba(248, 240, 229, 0.85)',
    borderRadius: 5,
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
  },
  errorBox: {
    backgroundColor: 'rgba(253, 230, 233, 0.85)',
    paddingVertical: 9,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e96c53',
    marginBottom: 10,
  },
  errorText: {
    width: '100%',
    color: 'red',
    textAlign: 'center',
  },
  lable: {
    marginBottom: 3,
  },
  input: {
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 8,
    minHeight: 40,
    marginBottom: 20,
  },
  buttonBox: {
    backgroundColor: '#0178d4',
    paddingVertical: 9,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  pressed: {
    opacity: 0.8,
  },
});

export default styles;
