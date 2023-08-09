import React from 'react';

import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title'
import { useContext } from '../context';
import { useLayoutContext } from '../../../hocs/layout';

const Header = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    goToHomeScreen: handleClosePress,
  } = useContext();

  return (
    <HeaderBar
      backgroundColor={theme.primaryColor}
      showShadow
      rightIcons={[
        {
          id: 'close',
          backgroundColor: 'transparent',
          iconColor: theme.contrastTextColor,
          onPress: handleClosePress,
        },
      ]}
    >
      <Title color={theme.contrastTextColor}>
        Sua avaliação
      </Title>
    </HeaderBar>
  );
};

export default Header;
