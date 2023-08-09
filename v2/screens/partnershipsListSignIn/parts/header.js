import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

import HeaderBar from '../../../components/headerBar';
import {useContext} from '../context';
import {theme} from '../../../utils/style';

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
  },
  titleButton: {
    paddingVertical: 15,
  },
});

const Header = (props) => {
  const {screenPalette, returnToPreviousScreen: handleBackPress} = useContext();

  return (
    <HeaderBar
      statusBarProps={{
        backgroundColor: screenPalette.header.background,
      }}
      leftIcons={[
        {
          id: 'return-arrow',
          backgroundColor: 'transparent',
          iconColor: screenPalette.header.action,
          onPress: handleBackPress,
        },
      ]}>
      <TouchableOpacity
        onPress={() => (props.titleAction ? props.titleAction() : {})}
        style={styles.titleButton}>
        <Text style={styles.title}>Verifique sua elegibilidade</Text>
      </TouchableOpacity>
    </HeaderBar>
  );
};

export default Header;
