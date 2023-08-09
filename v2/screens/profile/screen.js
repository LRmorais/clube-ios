import React from 'react';
import { View } from 'react-native';

import LayoutScreen from '../../components/layoutScreen';
import Box from '../../components/box';
import PaddingContainer from '../../components/paddingContainer';
import Spacer from '../../components/spacer';

import Header from './parts/header';
import NameField from './parts/nameField';
import DocField from './parts/docField';
import EmailField from './parts/emailField';
import PhoneField from './parts/phoneField';
import BirthdayField from './parts/birthdayField';
import GenreField from './parts/genreField';
import PostalCodeField from './parts/postalCodeField';
import AddressNumberField from './parts/addressNumberField';
import AddressStreetField from './parts/addressStreetField';
import AddressCityField from './parts/addressCityField';
import AddressStateField from './parts/addressStateField';
import SaveButton from './parts/saveButton';
import Loading from './parts/loading';
import Feedback from './parts/feedback';

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
          title="Dados pessoais"
          titleColor={theme.primaryColor}
        >
          <PaddingContainer>
            <NameField />
            <Spacer size={2.5} setMinSize fixedSize />
            <DocField />
            <Spacer size={2.5} setMinSize fixedSize />
            <EmailField />
            <Spacer size={2.5} setMinSize fixedSize />
            <PhoneField />
            <Spacer size={2.5} setMinSize fixedSize />
            <BirthdayField />
            <Spacer size={2.5} setMinSize fixedSize />
            <GenreField />
          </PaddingContainer>
        </Box>
        <Box
          shadow="top"
          fill
          title="Endereço"
          titleColor={theme.primaryColor}
        >
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
            <Spacer size={4} setMinSize fixedSize />
            <SaveButton />
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
  row: {
    flexDirection: 'row',
  },
  field: {
    flex: 1,
  },
});

export default Screen;
