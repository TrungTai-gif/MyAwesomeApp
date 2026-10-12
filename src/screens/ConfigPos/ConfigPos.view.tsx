import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import styles from './ConfigPos.style';

const ConfigPos = () => {
  const [branch, setBranch] = useState('1');

  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.title}>Cấu hình chi nhánh</Text>
      <Text style={styles.label}>Chọn chi nhánh:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={branch}
          onValueChange={value => setBranch(value)}>
          <Picker.Item label="Chi nhánh Thái Phiên" value="1" />
          <Picker.Item label="Chi nhánh Nguyễn Huệ" value="2" />
          <Picker.Item label="Chi nhánh Lê Lợi" value="3" />
        </Picker>
      </View>
      <Text style={styles.result}>Chi nhánh đã chọn: {branch}</Text>
    </View>
  );
};

export default ConfigPos;
