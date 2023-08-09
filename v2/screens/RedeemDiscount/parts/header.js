import React from 'react';
import {StyleSheet} from 'react-native';

import {NewHeaderBar as HeaderBar} from '../../../components/newHeaderBar';

import Title from '../../../components/title';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const Header = () => {
  const {theme} = useLayoutContext();
  const {returnToPreviousScreen: handleBackPress} = useContext();

  return (
    <HeaderBar
      backgroundColor="#ffffff"
      leftIcons={[
        {
          id: 'return-arrow',
          backgroundColor: 'transparent',
          iconColor: '#30287b',
          onPress: handleBackPress,
        },
      ]}>
      <Title color="#30287b">Resgatar desconto</Title>
    </HeaderBar>
  );
};

export default Header;
