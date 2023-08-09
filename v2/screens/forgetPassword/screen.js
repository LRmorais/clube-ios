import React from 'react';
import {View, Text} from 'react-native';
import Spacer from '../../components/spacer';
import Header from './parts/header';
import createStyle from '../../utils/style';
import EmailField from './parts/emailField';
import Loading from './parts/loading';
import Feedback from './parts/feedback';
import {theme} from '../../utils/style';

import {RoundedButton} from '../../components/RoundedButton';

import {useContext} from './context';

const Screen = () => {
  const {continueAction} = useContext();

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.header}>
        <Text style={styles.title}>Recuperar senha</Text>
        <Text style={styles.description}>
          Informe seu e-mail e enviaremos as instruções para recuperar sua
          senha.
        </Text>
        <Spacer size={3.5} setMinSize />

        <EmailField />
        <Spacer size={4.5} setMinSize />
        <RoundedButton action={continueAction} title="Recuperar senha" />
      </View>

      <Loading />
      <Feedback />
    </View>
  );
};

const styles = createStyle({
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
