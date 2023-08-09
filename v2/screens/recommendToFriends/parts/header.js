import React from 'react';

import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Header = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    returnToPreviousScreen: handleBackPress,
    goToConvertedFriendsScreen,
  } = useContext();

  return (
    <HeaderBar
      backgroundColor={theme.primaryColor}
      showShadow
      leftIcons={[
        {
          id: 'return-arrow',
          backgroundColor: 'transparent',
          iconColor: theme.contrastTextColor,
          onPress: handleBackPress,
        },
      ]}
      rightIcons={[
        {
          id: 'user',
          backgroundColor: 'transparent',
          iconColor: theme.contrastTextColor,
          onPress: goToConvertedFriendsScreen,
        },
      ]}
    >
      <Title color={theme.contrastTextColor}>
        Indique amigos
      </Title>
    </HeaderBar>
  );
};

export default Header;
