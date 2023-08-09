import React from 'react';
import { View } from 'react-native';

import LayoutScreen from '../../components/layoutScreen';
import PaddingContainer from '../../components/paddingContainer';
import Box from '../../components/box';
import Spacer from '../../components/spacer'

import Header from './parts/header';
import PartnerField from './parts/PartnerField'
import createStyle from '../../utils/style';
import { useLayoutContext } from '../../hocs/layout';
import IndicateButton from './parts/IndicateButton';
import Feedback from './parts/feedback'
import Loading from './parts/loading'

const Screen = () => {
  const {
    theme,
  } = useLayoutContext();

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.whiteBackground },
    ]}>
      <Header />
      <LayoutScreen>
      <Box>
            <PaddingContainer>
              <PartnerField
                label="Existe algum estabelecimento que você gostaria de ver no Clube?"
              />
                <Spacer size={2} setMinSize />

              <IndicateButton />
          </PaddingContainer>
      </Box>
      </LayoutScreen>
      <Loading />
      <Feedback />
    </View>
  );
};

const styles = createStyle({
  container: {
    flex: 1,
  },
});

export default Screen;
