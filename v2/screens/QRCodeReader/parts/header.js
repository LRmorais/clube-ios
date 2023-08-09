import React from 'react';

import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const Header = () => {
  const {theme} = useLayoutContext();
  const {returnToPreviousScreen: handleBackPress} = useContext();

  return (
    <HeaderBar
      backgroundColor={theme.primaryColor}
      rightIcons={[
        {
          id: 'close',
          backgroundColor: 'transparent',
          iconColor: theme.contrastTextColor,
          onPress: handleBackPress,
        },
      ]}>
      <Title color={theme.contrastTextColor}>Resgatar desconto</Title>
    </HeaderBar>
  );
};

export default Header;
