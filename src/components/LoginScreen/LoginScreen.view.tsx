import React, {useState} from 'react';
import {
  ActivityIndicator,
  // Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from './LoginScreen.style';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import { Rootparameters } from '../../navigation/AppNavigator';

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMasage, setErrorMessage] = useState('');
  const navigation =
    useNavigation<NavigationProp<Rootparameters, 'Dashboard'>>();

  async function handleLogin() {
    if (!email || !password) {
      navigation.navigate('Dashboard', {email: email});
      setErrorMessage('Phải nhập cả email và mật khẩu.');
      return;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage('Địa chỉ email không đúng định dạng.');
      return;
    }
    setErrorMessage('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        setErrorMessage('Email hoặc mật khẩu không chính xác.');
        return;
      }
      const data = await response.json();
      console.log(data);
      navigation.navigate('Dashboard', {email: email});
    } catch (error) {
      console.log(error);
      setErrorMessage('Không thể kết nối đến máy chủ.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.loginContainer}>
      <Image
        source={require('../../assets/background3.jpg')}
        style={[StyleSheet.absoluteFill, styles.background]}
        resizeMode="cover"
      />
      <View style={styles.loginBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>MÊ LINH COFFEE</Text>
          <Text>Đăng nhập vào hệ thống:</Text>
        </View>
        <View style={[styles.errorBox, !errorMasage && {display: 'none'}]}>
          <Text style={styles.errorText}>{errorMasage}</Text>
        </View>
        <View>
          <Text style={styles.lable}>Địa chỉ Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập Email vào đây"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setErrorMessage('');
            }}
            spellCheck={false}
          />
          <Text style={styles.lable}>Mật khẩu</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập Mật khẩu vào đây"
            secureTextEntry
            value={password}
            onChangeText={text => {
              setPassword(text);
              setErrorMessage('');
            }}
          />
        </View>
        <Pressable
          style={({pressed}) => [styles.buttonBox, pressed && styles.pressed]}
          onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Đăng nhập</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
