import React from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';

import Header from './parts/header';
import Loading from './parts/loading';

import { RoundedButton } from '../../components/RoundedButton';
import Spacer from '../../components/spacer';
import CompanyListPicker from './parts/companyListPicker';
import CompanyListIOS from './parts/companySearchIOS';
import {useContext} from './context';

import { theme } from '../../utils/style';

const Screen = () => {
  const {
    companySelected,
    goToCompleteRegistration
  } = useContext();

  return (
    <View style={styles.container}>
      <Header titleAction={() => {}} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Pra começar, sua empresa já é nossa parceira?</Text>
        </View>

        <View style={styles.content}>
        {Platform.OS === 'ios' ? (
          <CompanyListIOS />
        ) : (
          <CompanyListPicker />
        )
     
      }

        </View>

        <View style={styles.content}>
          <Spacer size={10} setMinSize />
          <RoundedButton disabled={companySelected == null && true} action={goToCompleteRegistration} title="Continuar" />
        </View>
      </ScrollView>
      <Loading />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.primary.main,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  content: {
    paddingVertical: 25,
    paddingHorizontal: 35,
  },
  title: {
    color: theme.palette.primary.contrast,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 28,
    textAlign: 'center',
  },
});

export default Screen;
