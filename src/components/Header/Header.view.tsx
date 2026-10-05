import React, {useState} from 'react';
import {menus} from '../../constants/menus1';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootParameters} from '../../navigation/type';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from '../Header/Header.style';

interface HeaderProps {
  onMenuPress: (id: number) => void;
}

const Header = ({onMenuPress}: HeaderProps) => {
  const [activeMenu, setActiveMenu] = useState<number>(-1);
  const route = useRoute<RouteProp<RootParameters, 'MainScreen'>>();
  const email = route.params.email;
  return (
    <>
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
                        onPress={() => {
                          onMenuPress(item.id);
                          setActiveMenu(-1);
                        }}
                        key={item.id}
                        style={styles.subMenuItem}>
                        <Text>{item.title}</Text>
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
    </>
  );
};

export default Header;
