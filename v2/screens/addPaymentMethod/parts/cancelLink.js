import React from 'react';
import { View } from 'react-native';

import Title from '../../../components/title';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const CancelLink = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    returnToPreviousScreen: handlePress,
  } = useContext();

  return (
    <View style={styles.container}>
      <Title
        color={theme.primaryColor + '80'}
        onPress={handlePress}
      >
        Cancelar
      </Title>
    </View>
  );
};

const styles = createStyle({
  container: {
    alignItems: 'center',
  },
});

export default CancelLink;
