import React from 'react';

import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title'
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Header = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    title,
    returnToPreviousScreen: handleBackPress,
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
    >
      <Title color={theme.contrastTextColor}>
        {`Avaliações de ${title}`}
      </Title>
    </HeaderBar>
  );
};

export default Header;
