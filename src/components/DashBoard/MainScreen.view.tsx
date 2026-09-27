import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './MainScreen.style';
import {useRoute, RouteProp} from '@react-navigation/native';
import {Rootparameters} from '../../navigation/AppNavigator';
// import {useNavigation, NavigationProp} from '@react-navigation/native';

// const navigation = useNavigation<NavigationProp<Rootparameters, 'Login'>>();
const menus = [
  {
    title: 'Danh mục',
    items: ['Vật tư', 'Nhà cung cấp', 'Đơn vị', 'Nhân viên'],
  },
  {
    title: 'Chức năng',
    items: ['Phiếu mua hàng', 'Đơn hàng mua', 'Thanh toán'],
  },
  {
    title: 'Cấu hình',
    items: ['Đồng bộ người dùng', 'Thoát ứng dụng'],
  },
  {
    title: 'Trợ giúp',
    items: [],
  },
];

const MainScreen = () => {
  const [activeMenu, setActiveMenu] = useState<number>(-1);
  const route = useRoute<RouteProp<Rootparameters, 'Dashboard'>>();
  const email = route.params.email;
  return (
    <View style={styles.screenContainer}>
      {activeMenu !== -1 && (
        <TouchableWithoutFeedback onPress={() => setActiveMenu(-1)}>
          <View style={styles.isDisabled} />
        </TouchableWithoutFeedback>
      )}
      <View style={styles.headerContainer}>
        {menus.map((menu, index) => {
          return (
            <View key={menu.title}>
              <TouchableOpacity
                onPress={() => setActiveMenu(activeMenu === index ? -1 : index)}
                style={[
                  styles.menuItem,
                  activeMenu === index && styles.menuItemIsActive,
                ]}>
                <Text
                  style={[
                    styles.text,
                    activeMenu === index && styles.textActive,
                  ]}>
                  {menu.title}
                </Text>
              </TouchableOpacity>
              {activeMenu === index && menu.items.length > 0 && (
                <View style={styles.subMenu}>
                  {menu.items.map(item => {
                    return (
                      <TouchableOpacity
                        key={item}
                        style={styles.subMenuItem}>
                        <Text>{item}</Text>
                        <View style={styles.underline} />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
        <View style={styles.account}>
          <Text>Nguời dùng: {email}</Text>
        </View>
      </View>
      {/* <TouchableWithoutFeedback onPress={() => setActiveMenu(-1)}> */}
      <View style={styles.bodyContainer}>
        <Text style={styles.text}>The main content area hear</Text>
      </View>
      {/* </TouchableWithoutFeedback> */}
      <View style={styles.footerContainer}>
        <Text style={styles.text}>@Bản quyền 2026 – Alta Software</Text>
      </View>
    </View>
  );
};
export default MainScreen;
