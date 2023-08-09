import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 70,
    width: 70,
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#ffffff',
  },
});

export const CircleButton = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.action}>
      {props.children}
    </TouchableOpacity>
  );
};
