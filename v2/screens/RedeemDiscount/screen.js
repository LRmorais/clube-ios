import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './parts/header';
import Loading from './parts/loading';
import Feedback from './parts/feedback';

import Spacer from '../../components/spacer';
import createStyle from '../../utils/style';
import {useContext} from './context';

const styles = createStyle(theme => ({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  disabled: {
    opacity: 0.8,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 16,
    backgroundColor: '#f7f7f7',
  },
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 5.3,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    marginHorizontal: 5,
  },
  cardIconContainer: {
    minWidth: 70,
    paddingVertical: 18.5,
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    // backgroundColor: 'blue',
  },
  cardTitle: {
    color: theme.palette.primary.main,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(16),
    marginBottom: 5,
  },
  cardDescriptionContainer: {},
  cardDescription: {
    color: theme.palette.primary.main,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: 20,
  },
  shadow: {
    elevation: 5,
  },
  informativeContainer: {
    alignItems: 'center',
  },
  informativeText: {
    textAlign: 'center',
  },
  separator: {
    height: 1,
    marginTop: 5,
    marginBottom: 15.7,
    backgroundColor: '#dedede',
  },
}));

const Screen = () => {
  const {goToCheckInPage, goToGenerateCardPage} = useContext();

  const [menuOptions] = useState([
    {
      id: 2,
      icon: 'map-marker',
      title: 'Fazer check-in',
      description: 'Leia o QRCode para validar seu desconto.',
      onPress: () => goToCheckInPage(),
    },
    {
      id: 3,
      icon: 'id-card',
      title: 'Abrir Cartão de Assinante',
      description: 'Apresente o cartão de assinante para validar seu desconto.',
      onPress: () => goToGenerateCardPage(),
    },
    {
      id: 1,
      icon: 'money',
      title: 'Pagar pelo App',
      description: 'Pagar pelo app. Pague pelo app, com desconto.',
      onPress: () => {},
      disabled: true,
    },
  ]);

  function renderMenuItem({item}) {
    return (
      <>
        <View style={item.disabled ? styles.disabled : {}}>
          <TouchableOpacity
            disabled={item.disabled}
            style={[styles.cardContainer, !item.disabled && styles.shadow]}
            onPress={item.onPress}>
            <View style={styles.cardIconContainer}>
              <Icon name={item.icon} size={28} color="#30287b" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Spacer size={3} setMinSize />
      </>
    );
  }

  return (
    <View style={{backgroundColor: 'red', display: 'flex', flex: 1}}>
      <SafeAreaView style={[styles.container]}>
        <Header />

        <View style={styles.contentContainer}>
          <FlatList
            style={{flex: 1}}
            data={menuOptions}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id}
          />
          <View style={styles.separator} />
          <View style={styles.informativeContainer}>
            <Text style={styles.informativeText}>
              Você também pode resgatar seu desconto informando o seu CPF, na
              hora do pagamento.
            </Text>
          </View>
        </View>

        <Loading />
        <Feedback />
      </SafeAreaView>
    </View>
  );
};

export default Screen;
