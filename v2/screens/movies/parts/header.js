import React from 'react';

import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const Header = () => {
  const {theme} = useLayoutContext();
  const {place, returnToPreviousScreen: handleBackPress} = useContext();

  return (
    <HeaderBar
      backgroundColor={theme.tertiaryColor}
      showShadow
      leftIcons={[
        {
          id: 'return-arrow',
          backgroundColor: 'transparent',
          iconColor: theme.contrastTextColor,
          onPress: handleBackPress,
        },
      ]}>
      <Title color={theme.contrastTextColor}>
        {place ? `Filmes - ${place.fantasyName}` : 'Filmes em cartaz'}
      </Title>
    </HeaderBar>
  );
};

export default Header;
