import React, {useState} from 'react';
import {ImageBackground, View, Platform} from 'react-native';

import LayoutScreen from '../../components/layoutScreen';
import PaddingContainer from '../../components/paddingContainer';
import Spacer from '../../components/spacer';

import Header from './parts/header';
import SectionTitle from './parts/sectionTitle';
import FacebookButton from './parts/facebookButton';
import GoogleButton from './parts/googleButton';
import AppleButton from './parts/appleButton';
import FullNameField from './parts/fullNameField';
import DocNumberField from './parts/docNumberField';
import EmailField from './parts/emailField';
import PhoneField from './parts/phoneField';
import PasswordField from './parts/passwordField';
import GoToPaymentButton from './parts/goToPaymentButton';
import LogicDivider from './parts/logicDivider';
import GoToSignInButton from './parts/goToSignInButton';
import Loading from './parts/loading';
import Feedback from './parts/feedback';
import SectionDescription from './parts/sectionDescription';

import createStyle from '../../utils/style';
import {useContext} from './context';

const Screen = () => {
  const {screenPalette, idSocial, socialName} = useContext();
  const [appleButtonWidth, setAppleButtonWidth] = useState();

  function handleAppleButtonContainerLayout(e) {
    setAppleButtonWidth(e.nativeEvent.layout.width);
  }

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
          {idSocial == null && Platform.OS === 'android' ? (
            <>
              <Spacer size={5} setMinSize />
              <SectionTitle>Criar conta com</SectionTitle>
              <Spacer size={2} setMinSize />
              <View style={styles.row}>
                <View style={styles.socialButton}>
                  <FacebookButton />
                </View>
                <Spacer size={2} fixedSize horizontal />
                {/* <View style={styles.socialButton}>
                  <GoogleButton />
                </View> */}
              </View>
              {/* {Platform.OS === 'ios' && (
                <>
                  <Spacer size={2} setMinSize />
                  <View onLayout={handleAppleButtonContainerLayout}>
                    <AppleButton width={appleButtonWidth} />
                  </View>
                </>
              )} */}
              <Spacer size={3.5} setMinSize />
              <SectionTitle>Ou</SectionTitle>
            </>
          ) : (
            <SectionDescription>{`${socialName} ESSA É A SUA PRIMEIRA VEZ ACESSANDO O CLUBE GAZETA DO POVO, POR FAVOR, COMPLETE O CADASTRO.`}</SectionDescription>
          )}
          <Spacer size={2} setMinSize />
          <FullNameField />
          <Spacer size={2} setMinSize />
          <DocNumberField />
          <Spacer size={2} setMinSize />
          <EmailField />
          <Spacer size={2} setMinSize />
          <PhoneField />
          <Spacer size={2} setMinSize />
          <PasswordField />
          <Spacer size={2} setMinSize />
          <GoToPaymentButton />
          <Spacer size={3} setMinSize />
          <LogicDivider />
          <Spacer size={2.5} setMinSize />
          <GoToSignInButton />
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
  socialButton: {
    flex: 1,
  },
  submitButton: {
    width: 120,
  },
});

export default Screen;
