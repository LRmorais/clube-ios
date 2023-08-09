import React from 'react';

import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title'
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Header = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    returnToPreviousScreen: handleBackPress,
  } = useContext();

  return (
    <HeaderBar
      backgroundColor={theme.primaryColor}
      contentStyle={styles.content}
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
        Adicionar cartão
      </Title>
    </HeaderBar>
  );
};

const styles = createStyle({
  content: {
    flexDirection: 'row',
  },
});

export default Header;
