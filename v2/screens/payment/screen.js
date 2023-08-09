import React from 'react';
import {ImageBackground, View} from 'react-native';

import LayoutScreen from '../../components/layoutScreen';
import PaddingContainer from '../../components/paddingContainer';
import Spacer from '../../components/spacer';

import Header from './parts/header';
import SectionTitle from './parts/sectionTitle';
import OfferField from './parts/offerField';
import CardNumberField from './parts/cardNumberField';
import CardHolderField from './parts/cardHolderField';
import CardValidityField from './parts/cardValidityField';
import CardCvcField from './parts/cardCvcField';
import PaySubscriptionButton from './parts/paySubscriptionButton';
import Loading from './parts/loading';
import Feedback from './parts/feedback';

import createStyle from '../../utils/style';
import {useContext} from './context';

const Screen = () => {
  const {screenPalette} = useContext();

  return (
    <ImageBackground
      style={[
        styles.imageBackground,
        {backgroundColor: screenPalette.screen.background},
      ]}
      source={require('../../images/textures/TexturaCurves.png')}
      resizeMode="cover">
      <Header />
      <LayoutScreen>
        <PaddingContainer style={styles.content}>
          <Spacer size={5} setMinSize />
          <SectionTitle>Período de assinatura</SectionTitle>
          <Spacer size={2} setMinSize />
          <OfferField />
          <Spacer size={4} setMinSize />
          <SectionTitle>Dados para pagamento</SectionTitle>
          <Spacer size={2} setMinSize />
          <CardNumberField />
          <Spacer size={2} setMinSize />
          <CardHolderField />
          <Spacer size={2} setMinSize />
          <View style={styles.row}>
            <View style={styles.field}>
              <CardValidityField />
            </View>
            <Spacer size={2.5} fixedSize horizontal />
            <View style={styles.field}>
              <CardCvcField />
            </View>
          </View>
          <Spacer size={2} setMinSize />
          <PaySubscriptionButton />
          <Spacer size={3} setMinSize />
        </PaddingContainer>
      </LayoutScreen>
      <Loading />
      <Feedback />
    </ImageBackground>
  );
};

const styles = createStyle({
  imageBackground: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  field: {
    flex: 1,
  },
});

export default Screen;
