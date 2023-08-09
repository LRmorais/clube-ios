import React from 'react';
import { View } from 'react-native';

import LayoutScreen from '../../components/layoutScreen';
import Box from '../../components/box';
import PaddingContainer from '../../components/paddingContainer';
import Spacer from '../../components/spacer';

import Header from './parts/header';
import CardHolderField from './parts/cardHolderField';
import CardNumberField from './parts/cardNumberField';
import CardValidityField from './parts/cardValidityField';
import CardCvcField from './parts/cardCvcField';
import PostalCodeField from './parts/postalCodeField';
import AddressNumberField from './parts/addressNumberField';
import AddressStreetField from './parts/addressStreetField';
import AddressCityField from './parts/addressCityField';
import AddressStateField from './parts/addressStateField';
import PhoneField from './parts/phoneField';
import SaveButton from './parts/saveButton';
import CancelLink from './parts/cancelLink';
import Loading from './parts/loading';
import Feedback from './parts/feedback';

import createStyle from '../../utils/style';
import { useLayoutContext } from '../../hocs/layout';
import { useContext } from './context';

const Screen = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    alreadyHasAddress,
    alreadyHasPhone,
  } = useContext();

  const showSecondBox = !alreadyHasAddress || !alreadyHasPhone;
  const buttons = (
    <PaddingContainer>
      <Spacer size={4} setMinSize fixedSize />
      <SaveButton />
      <Spacer size={4} setMinSize fixedSize />
      <CancelLink />
    </PaddingContainer>
  );

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.greyishBackground },
    ]}>
      <Header />
      <LayoutScreen>
        <Box shadow="bottom">
          <PaddingContainer>
            <CardHolderField />
            <Spacer size={2.5} setMinSize fixedSize />
            <CardNumberField />
            <Spacer size={2.5} setMinSize fixedSize />
            <View style={styles.row}>
              <View style={styles.field}>
                <CardValidityField />
              </View>
              <Spacer size={2} horizontal setMinSize fixedSize />
              <View style={styles.field}>
                <CardCvcField />
              </View>
            </View>
          </PaddingContainer>
          {!showSecondBox && buttons}
        </Box>
        {showSecondBox && (
          <Box
            shadow="top"
            fill
          >
            {!alreadyHasAddress && (
              <PaddingContainer>
                <View style={styles.row}>
                  <View style={styles.field}>
                    <PostalCodeField />
                  </View>
                  <Spacer size={2} horizontal setMinSize fixedSize />
                  <View style={styles.field}>
                    <AddressNumberField />
                  </View>
                </View>
                <Spacer size={2.5} setMinSize fixedSize />
                <AddressStreetField />
                <Spacer size={2.5} setMinSize fixedSize />
                <View style={styles.row}>
                  <View style={styles.field}>
                    <AddressCityField />
                  </View>
                  <Spacer size={2} horizontal setMinSize fixedSize />
                  <View style={styles.field}>
                    <AddressStateField />
                  </View>
                </View>
              </PaddingContainer>
            )}
            {!alreadyHasAddress && !alreadyHasPhone && (
              <Spacer size={2.5} setMinSize fixedSize />
            )}
            {!alreadyHasPhone && (
              <PaddingContainer>
                <PhoneField />
              </PaddingContainer>
            )}
            {buttons}
          </Box>
        )}
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
  row: {
    flexDirection: 'row',
  },
  field: {
    flex: 1,
  },
});

export default Screen;
