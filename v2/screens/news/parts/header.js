import React from 'react';
import {View} from 'react-native';
import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title';
import createStyle from '../../../utils/style';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const Header = () => {
  const {theme} = useLayoutContext();
  const {returnToPreviousScreen: handleBackPress} = useContext();

  return (
    <HeaderBar
      backgroundColor="#fff"
      showShadow
      leftIcons={[
        {
          id: 'return-arrow',
          backgroundColor: 'transparent',
          iconColor: theme.primaryColor,
          onPress: handleBackPress,
        },
      ]}>
      <View style={[styles.container]}>
        <Title color={theme.primaryColor}>Fique ligado</Title>
      </View>
    </HeaderBar>
  );
};

const styles = createStyle({
  container: {
    // marginRight: '60%',
    width: '100%',
    justifyContent: 'flex-start',
    textTransform: 'capitalize',
  },
});

export default Header;
