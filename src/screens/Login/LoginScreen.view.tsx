import React, {useState, useRef} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from './LoginScreen.style';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParameters} from '../../navigation/type';
import {login} from '../../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const LoginScreen = () => {
  // const accessToken = await
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMasage, setErrorMessage] = useState('');
  const navigation =
    useNavigation<StackNavigationProp<RootParameters, 'Login'>>();
  const passwordRef = useRef<TextInput>(null);

  async function handleLogin() {
    if (!email || !password) {
      await AsyncStorage.setItem(
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InZvbG9kaWExOTE3QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiRnVsbE5hbWUiOiJOZ3V54buFbiBWaeG6v3QgQ8aw4budbmciLCJleHAiOjE3OTE0MTM3ODJ9.SL90LQUnAAWF_2YR-tZAu747i3quSUoJGHB4Pv8Epj0',
      );
      navigation.replace('MainScreen', {email: email});
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
      const accessToken = await login(email, password);
      // if (!response.ok) {
      //   setErrorMessage('Email hoặc mật khẩu không chính xác.');
      //   return;
      // }
      if (!accessToken) {
        setErrorMessage('Email hoặc mật khẩu không chính xác.');
        return;
      }
      navigation.replace('MainScreen', {email: email});
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
        source={require('../../assets/background5.jpg')}
        style={[StyleSheet.absoluteFill, styles.background]}
        resizeMode="cover"
      />
      <View style={styles.loginBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>MÊ LINH COFFEE</Text>
          <Text>Đăng nhập vào hệ thống:</Text>
        </View>
        {errorMasage && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMasage}</Text>
          </View>
        )}
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
            onSubmitEditing={() => passwordRef.current?.focus()}
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
            ref={passwordRef}
            onSubmitEditing={handleLogin}
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
