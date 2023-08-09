import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Torch from 'react-native-torch';
import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#080714',
  },
  disabled: {
    opacity: 0.5,
  },
});

const Footer = () => {
  const {theme} = useLayoutContext();
  const {returnToPreviousScreen: handleBackPress} = useContext();

  const [menuOptions] = useState([
    {
      id: 1,
      icon: 'arrow-left',
      onPress: handleBackPress,
    },
    {
      id: 2,
      icon: 'zap',
      onPress: () => {},
      disabled: true,
    },
  ]);

  return (
    <View style={styles.container}>
      {menuOptions.map(option => (
        <View key={option.id} style={option.disabled && styles.disabled}>
          <TouchableOpacity disabled={option.disabled} onPress={option.onPress}>
            <Icon name={option.icon} size={32} color="#ffffff" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Footer;
