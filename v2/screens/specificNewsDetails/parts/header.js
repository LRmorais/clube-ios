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
    title,
    loading,
    returnToPreviousScreen: handleBackPress,
  } = useContext();

  return (
    <HeaderBar
      backgroundColor="#fff"
      contentStyle={styles.content}
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
        {title}
      </Title>
      {loading && (
        <>
          <Spacer horizontal size={1} fixedSize />
          <ActivityIndicator
            size="small"
            color={theme.primaryColor}
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
