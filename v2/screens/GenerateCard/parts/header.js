import React from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';
import {theme} from '../../../utils/style';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#ffffff',
    fontFamily: theme.typography.fontFamily.bold,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    marginLeft: 14,
  },
});

const Header = props => {
  const {theme} = useLayoutContext();
  const {returnToPreviousScreen: handleBackPress} = useContext();

  return (
    <>
      <StatusBar
        backgroundColor={theme.primaryColor}
        barStyle="light-content"
      />
      <View style={{...styles.container, backgroundColor: theme.primaryColor}}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {props.currentCard}/{props.totalCards}
          </Text>
          <Icon
            style={styles.iconStyle}
            name="users"
            size={16}
            color="#ffffff"
          />
        </View>
      </View>
    </>
  );
};

export default Header;
