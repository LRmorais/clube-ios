import React from 'react';

import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const Header = () => {
  const {theme} = useLayoutContext();
  const {
    unit,
    iconRef,
    returnToPreviousScreen: handleBackPress,
    showOptions: handleMorePress,
  } = useContext();

  return (
    <HeaderBar
      backgroundColor={theme.whiteBackground}
      leftIcons={[
        {
          id: 'return-arrow',
          iconColor: theme.primaryColor,
          backgroundColor: 'transparent',
          onPress: handleBackPress,
        },
      ]}
      rightIcons={[
        {
          id: 'more-vertical',
          iconRef,
          iconColor: theme.primaryColor,
          backgroundColor: 'transparent',
          onPress: handleMorePress,
        },
      ]}>
      {unit ? (
        <Title color={theme.primaryColor}>{unit.fantasyName}</Title>
      ) : (
        <Title color={theme.primaryColor}>Carregando ..</Title>
      )}
    </HeaderBar>
  );
};

export default Header;
