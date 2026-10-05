import {StyleSheet} from 'react-native-windows';
const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 14,
    fontWeight: 400,
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
    backgroundColor: '#cdcbcc',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e9e9e9',
    overflow: 'visible',
    zIndex: 100,
    paddingLeft: 15,
    // trong react native position mặc định là relative. còn web là static
  },
  menuItem: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  menuItemIsActive: {
    backgroundColor: '#18619c',
    borderColor: '#18619c',
    borderRadius: 5,
  },
  textActive: {
    color: 'white',
  },
  subMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#fff',
    minWidth: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
    marginTop: 5,
    padding: 10,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'black',
  },
  subMenuItem: {
    paddingVertical: 4,
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
