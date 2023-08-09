import React from 'react';
import { ActivityIndicator } from 'react-native';

import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title';
import Spacer from '../../../components/spacer';

import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Header = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    fullData,
    userData,
    loading,
    returnToPreviousScreen: handleBackPress,
    showInfoModal: handleInfoPress,
    goToEconomyScreen: handleEconomyPress,
  } = useContext();

  return (
    <HeaderBar
      showShadow={fullData?.length === 0}
      contentStyle={styles.content}
      backgroundColor={theme.primaryColor}
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
          id: 'info',
          backgroundColor: 'transparent',
          iconColor: theme.contrastTextColor,
          onPress: handleInfoPress,
        },
        userData && {
          id: 'pig',
          backgroundColor: 'transparent',
          iconColor: theme.contrastTextColor,
          onPress: handleEconomyPress,
        },
      ].filter(Boolean)}
    >
      <Title color={theme.contrastTextColor}>
        Cupons do Clube
      </Title>
      {loading === 'data' && (
        <>
          <Spacer size={1} horizontal fixedSize setMinSize />
          <ActivityIndicator
            size="small"
            color={theme.contrastTextColor}
          />
        </>
      )}
    </HeaderBar>
  );
};

const styles = createStyle({
  content: {
    flexDirection: 'row',
  },
});

export default Header;
