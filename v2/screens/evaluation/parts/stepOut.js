import React from 'react';
import { View } from 'react-native';

import ExtraVerticalPaddingContainer from '../../../components/paddingContainer/extraVertical';
import Title from '../../../components/title';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useAnalyticsContext } from '../../../hocs/analytics';
import { useContext } from '../context';

const StepOut = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    dispatchRecord,
  } = useAnalyticsContext();
  const {
    goToHomeScreen,
  } = useContext();

  function handlePress() {
    dispatchRecord('Abandono de fluxo');
    goToHomeScreen();
  }

  return (
    <ExtraVerticalPaddingContainer>
      <View style={styles.container}>
        <Title
          color={theme.primaryColor + '80'}
          onPress={handlePress}
        >
          Pular
        </Title>
      </View>
    </ExtraVerticalPaddingContainer>
  );
};

const styles = createStyle({
  container: {
    alignItems: 'center',
  },
});

export default StepOut;
