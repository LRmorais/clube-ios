import React from 'react';
import { View, ActivityIndicator } from 'react-native';

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
    loadingUses,
    loadingPayments,
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
        Utilizações
      </Title>
      {(loadingUses || loadingPayments) && (
        <>
          <View style={styles.spacer} />
          <ActivityIndicator
            size="small"
            color={theme.contrastTextColor}
          />
        </>
      )}
    </HeaderBar>
  );
};

const styles = createStyle((theme) => ({
  content: {
    flexDirection: 'row',
  },
  spacer: {
    width: theme.spacing(1),
  },
}));

export default Header;
