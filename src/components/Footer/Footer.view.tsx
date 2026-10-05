import React from 'react';
import {Text, View} from 'react-native';
import styles from './Footer.style';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.text}>@Bản quyền 2026 – Alta Software</Text>
    </View>
  );
};

export default Footer;
