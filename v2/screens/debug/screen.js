import React from 'react';
import { View } from 'react-native';

import LayoutScreen from '../../components/layoutScreen';
import PaddingContainer from '../../components/paddingContainer';
import Box from '../../components/box';
import Spacer from '../../components/spacer';

import Header from './parts/header';
import LastTimeUpdated from './parts/lastTimeUpdated';
import Missing from './parts/missing';
import Mismatching from './parts/mismatching';

import createStyle from '../../utils/style';
import { useLayoutContext } from '../../hocs/layout';

const Screen = () => {
  const {
    theme,
  } = useLayoutContext();

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.greyishBackground },
    ]}>
      <Header />
      <LayoutScreen>
        <Box
          shadow="bottom"
          title="Última sincronização"
          titleColor={theme.primaryColor}
        >
          <PaddingContainer>
            <LastTimeUpdated />
          </PaddingContainer>
        </Box>
        <Box
          shadow="both"
          title="Não encontrados"
          titleColor={theme.primaryColor}
        >
          <PaddingContainer>
            <Missing />
          </PaddingContainer>
        </Box>
        <Box
          shadow="both"
          title="Desatualizados"
          titleColor={theme.primaryColor}
        >
          <PaddingContainer>
            <Mismatching />
          </PaddingContainer>
        </Box>
        <Spacer size={5} fixedSize />
      </LayoutScreen>
    </View>
  )
};

const styles = createStyle({
  container: {
    flex: 1,
  },
});

export default Screen;
