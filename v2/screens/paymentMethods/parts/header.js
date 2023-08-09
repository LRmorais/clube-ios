import React from 'react';
import { ActivityIndicator } from 'react-native';

import HeaderBar from '../../../components/headerBar';
import Spacer from '../../../components/spacer';
import Title from '../../../components/title'
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Header = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    loading,
    returnToPreviousScreenIfPossible: handleBackPress,
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
        Meus cartões
      </Title>
      {loading && (
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
