import React from 'react';

import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Header = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    returnToPreviousScreen: handleBackPress,
    cleanFilters: handleActionPress,
  } = useContext();

  return (
    <HeaderBar
      contentStyle={styles.contentStyle}
      backgroundColor={theme.whiteBackground}
      showShadow
      leftIcons={[
        {
          id: 'return-arrow',
          backgroundColor: 'transparent',
          iconColor: theme.primaryColor,
          onPress: handleBackPress,
        },
      ]}
    >
      <Title color={theme.primaryColor}>
        Filtros
      </Title>
      <Title
        color={theme.secondColor}
        onPress={handleActionPress}
      >
        Limpar filtros
      </Title>
    </HeaderBar>
  )
};

const styles = createStyle({
  contentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Header;
