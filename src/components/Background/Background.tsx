import React from 'react';
import {Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

function Background() {
  return (
    <Image
      source={require('../../assets/Backgroung5.jpg')}
      style={[styles.background, StyleSheet.absoluteFill]}
    />
  );
}

export default Background;
