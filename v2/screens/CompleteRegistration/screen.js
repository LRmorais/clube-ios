import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import Spacer from '../../components/spacer';

import Header from './parts/header';
import FullnameField from './parts/fullnameField';
import RegisterNumberField from './parts/registerNumberField';
import DocumentField from './parts/documentField';
import PhoneField from './parts/phoneField';
import EmailField from './parts/emailField';
import CheckBoxTerms from './parts/CheckboxTerms';
import Loading from './parts/loading';
import Feedback from './parts/feedback';
import BirthdayField from './parts/birthdayField';

import {RoundedButton} from '../../components/RoundedButton';
import {useContext} from '../CompleteRegistration/context';
import createStyle, {theme} from '../../utils/style';

const Screen = props => {
  const {
    screenPalette,
    signIn: handlePress,
    openTermsAction,
    openPoliticsAction,
    isTermsCheckbox,
  } = useContext();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      // behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={styles.container}>
      <Header />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>Complete seu cadastro</Text>
          </View>

          <View style={styles.form}>
            <FullnameField />
            <Spacer size={2.5} setMinSize />
            <DocumentField />
            <Spacer size={2.5} setMinSize />
            <BirthdayField />
            <Spacer size={2.5} setMinSize />
            <PhoneField />
            <Spacer size={2.5} setMinSize />
            <EmailField />
            <Spacer size={2.5} setMinSize />
            <RegisterNumberField />
            {/* <View style={styles.termsContainer}>
              <View style={styles.checkBoxContainer}>
                <CheckBoxTerms />
              </View>
              <View>
                <Text style={styles.termsText}>
                  Ao criar a minha conta, eu aceito os{' '}
                  <Text onPress={openTermsAction} style={styles.bolded}>
                    termos de uso
                  </Text>{' '}
                  e{' '}
                  <Text onPress={openPoliticsAction} style={styles.bolded}>
                    políticas de privacidade.
                  </Text>
                </Text>
              </View>
            </View> */}

            <Spacer size={2.5} setMinSize />
            <RoundedButton
              // disabled={isTermsCheckbox ? false : true}
              variant="custom"
              styled={{
                color: screenPalette.sign_up_button.text,
                backgroundColor: screenPalette.sign_up_button.main,
              }}
              action={handlePress}
              title="Concluir cadastro"
            />
          </View>

          <Spacer size={1} setMinSize />

          <Loading />
          <Feedback />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = createStyle(() => ({
  container: {
    flex: 1,

    backgroundColor: theme.palette.companies.primary.main,
  },
  header: {
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 25,
    paddingBottom: 25,
  },
  title: {
    color: theme.palette.primary.contrast,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 32,
  },
  description: {
    fontSize: 15.5,
    fontFamily: theme.typography.fontFamily.extraLight,
    color: theme.palette.primary.contrast,
    marginTop: 10,
  },
  form: {
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 25,
    paddingBottom: 30,
  },
  socialAuthTitle: {
    fontSize: 16,
    color: theme.palette.primary.contrast,
    fontFamily: theme.typography.fontFamily.bold,
  },
  socialAuthContainer: {
    alignItems: 'center',
  },
  socialAuthContent: {
    paddingBottom: 25,
    width: Platform.OS === 'ios' ? 250 : 170,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  termsContainer: {
    padding: 15,
    flexDirection: 'row',
  },
  termsText: {
    color: '#ffffff',
    fontFamily: theme.typography.fontFamily.extraLight,
  },
  checkBoxContainer: {
    paddingRight: 15,
  },
  bolded: {
    fontFamily: theme.typography.fontFamily.regular,
  },
}));
export default Screen;
