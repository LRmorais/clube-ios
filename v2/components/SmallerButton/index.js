import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

import {theme} from '../../utils/style';
import {opacify, parseToRgb} from 'polished';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 100,
  },
  iconContainer: {
    marginRight: 5,
  },
  text: {
    color: '#494D4B',
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: 12,
    textTransform: 'uppercase',
  },
});

export const SmallerButton = ({settings}) => {
  const {text, onPress: action, icon, color} = settings;

  return (
    <TouchableOpacity
      onPress={action}
      style={[
        styles.container,
        color && {
          backgroundColor: color,
        },
      ]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
