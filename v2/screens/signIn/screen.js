import React from 'react';
import {View, ScrollView, Text, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Spacer from '../../components/spacer';

import Header from './parts/header';
import UsernameField from './parts/usernameField';
import PasswordField from './parts/passwordField';
import GoToForgotPasswordLink from './parts/goToForgotPasswordLink';
import Loading from './parts/loading';
import Feedback from './parts/feedback';

import {CircleButton} from '../../components/CircleButton';
import {RoundedButton} from '../../components/RoundedButton';

import {useContext} from '../../screens/signIn/context';

import createStyle, {theme} from '../../utils/style';
// import {useCallback} from 'react';

const Screen = () => {
  const {
    signIn: handlePress,
    handleSignUp,
    signInWithApple,
    signInWithFacebook,
    // signInWithGoogle,
  } = useContext();

  return (
    <View style={styles.container}>
      <Header titleAction={handleSignUp} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Entrar</Text>
          <Text style={styles.description}>Volte a economizar com o clube</Text>
        </View>

        <View style={styles.form}>
          <UsernameField />
          <Spacer size={2.5} setMinSize />
          <PasswordField />
          <Spacer size={1} setMinSize />
          <GoToForgotPasswordLink />
          <Spacer size={3.5} setMinSize />
          <RoundedButton action={handlePress} title="Entrar" />
        </View>

        <Spacer size={1} setMinSize />

        <View style={styles.socialAuthContainer}>
          {Platform.OS === 'ios' ? null : (
            <Text style={styles.socialAuthTitle}>ou, entre com:</Text>
          )}

          <Spacer size={3} setMinSize />

          <View style={styles.socialAuthContent}>
            {/* {Platform.OS === 'ios' && (
              <CircleButton action={signInWithApple}>
                <Icon name="apple" size={32} color={theme.palette.apple.main} />
              </CircleButton>
            )} */}
            {/* {Platform.OS === 'ios' ? null : (
              <CircleButton action={signInWithApple}>
                <Icon name="apple" size={32} color={theme.palette.apple.main} />
              </CircleButton>
            )} */}

            {Platform.OS === 'ios' ? null : (
              <CircleButton action={signInWithFacebook}>
                <Icon
                  name="facebook"
                  size={32}
                  color={theme.palette.facebook.main}
                />
              </CircleButton>
            )}

            {/* {Platform.OS === 'ios' ? null : (
              <CircleButton action={signInWithGoogle}>
                <Icon
                  name="google"
                  size={32}
                  color={theme.palette.google.main}
                />
              </CircleButton>
            )} */}
          </View>
        </View>
      </ScrollView>

      {/* <LayoutScreen>
        <PaddingContainer style={styles.content}>
          <Spacer size={5} setMinSize />
          <SectionTitle textSize="large">Entrar</SectionTitle>
          <Text style={styles.description}>Volte a economizar com o clube</Text>
          <Spacer size={2} setMinSize />
          <View style={styles.row}>
            <View style={styles.socialButton}>
              <FacebookButton />
            </View>
            <Spacer size={2} fixedSize horizontal />
            <View style={styles.socialButton}>
              <GoogleButton />
            </View>
          </View>
          {Platform.OS === 'ios' && (
            <>
              <Spacer size={2} setMinSize />
              <View onLayout={handleAppleButtonContainerLayout}>
                <AppleButton width={appleButtonWidth} />
              </View>
            </>
          )}
          <Spacer size={3.5} setMinSize />
          <SectionTitle>Ou</SectionTitle>
          <Spacer size={2} setMinSize />
          <UsernameField />
          <Spacer size={2} setMinSize />
          <PasswordField />
          <Spacer size={2} setMinSize />
          <View style={styles.row}>
            <View style={styles.submitButton}>
              <SignInButton />
            </View>
            <View style={styles.forgotPassword}>
              <GoToForgotPasswordLink />
            </View>
            <FaceCircle />
          </View>
          <Spacer size={3} setMinSize />
          <LogicDivider />
          <Spacer size={2.5} setMinSize />
          <GoToSignUpButton />
          <Spacer size={12} setMinSize />
        </PaddingContainer>
      </LayoutScreen> */}
      <Loading />
      <Feedback />
    </View>
  );
};

const styles = createStyle(() => ({
  container: {
    flex: 1,
    backgroundColor: theme.palette.primary.main,
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
    paddingBottom: 25,
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
}));

// const styles = createStyle((theme) => ({
//   container: {
//     flex: 1,
//     backgroundColor: theme.palette.primary.main,
//   },
//   content: {
//     flex: 1,
//   },
//   description: {
//     fontSize: 16,
//     fontFamily: 'Montserrat',
//     color: '#ffffff',
//     marginTop: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   socialButton: {
//     flex: 1,
//   },
//   submitButton: {
//     width: 120,
//   },
//   forgotPassword: {
//     paddingHorizontal: theme.spacing(2),
//   },
// }));

export default Screen;
