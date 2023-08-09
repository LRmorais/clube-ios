import React, {useState, useRef} from 'react';
import {View, Text, Dimensions, Image, SafeAreaView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Feather';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

import Header from './parts/header';
import Loading from './parts/loading';
import Feedback from './parts/feedback';

import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';
import {theme} from '../../utils/style';
import {useGlobalStateContext} from '../../hocs/globalState';

const windowWidth = Dimensions.get('window').width;
const mainTheme = theme;

const Screen = () => {
  const {theme} = useLayoutContext();
  const carousel = useRef();
  const {userInfo} = useGlobalStateContext();
  const subscription = userInfo?.subscriptions[0];
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const [positionCarousel, setPositionCarousel] = useState(1);

  const [carouselItens] = useState([
    {
      name: userInfo.name,
      schema: subscription.main ? 'holder' : 'dependent',
      photo: userInfo.img,
      createdAt: moment(subscription.createdAt).format('DD/MM/YYYY'),
      footerItens: [
        {
          icon: () => (
            <IconAwesome
              name="fingerprint"
              size={18}
              color={mainTheme.palette.primary.main}
            />
          ),
          title: 'Código de assinante',
          description: '#' + String(subscription.subscriptionId),
        },
        {
          icon: () => (
            <IconAwesome
              name="id-badge"
              size={18}
              color={mainTheme.palette.primary.main}
            />
          ),
          title: 'CPF',
          description: userInfo.cpf,
        },
      ],
    },
    ...(subscription.main ? userInfo.dependents || [] : [])
      .filter(dependent => dependent.id != userInfo.id)
      .map((dependent, i) => ({
        name: dependent.name,
        schema: 'dependent',
        photo: '',
        createdAt: moment(dependent.createdAt).format('DD/MM/YYYY'),
        footerItens: [
          {
            icon: () => (
              <IconAwesome
                name="fingerprint"
                size={18}
                color={mainTheme.palette.primary.main}
              />
            ),
            title: 'Código de assinante',
            description:
              '#' + String(subscription.subscriptionId) + alphabet[i],
          },
          {
            icon: () => (
              <IconAwesome
                name="id-badge"
                size={18}
                color={mainTheme.palette.primary.main}
              />
            ),
            title: 'CPF',
            description: dependent.cpf,
          },
        ],
      })),
  ]);

  function renderCarouselItem({item}) {
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardProfileImage}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={{
                  uri:
                    item.photo ||
                    'https://clube-static.clubegazetadopovo.com.br/images/users/1582220891432.png',
                }}
              />
            </View>
            <Text style={styles.cardUsername}>{item.name}</Text>
            <Text style={styles.cardUserCreated}>
              Assinante desde {item.createdAt}
            </Text>
          </View>
          <View style={styles.cardContent}>
            <Icon name="check" size={100} color="#186758" />
            <Text style={styles.cardTextStatus}>Status: Ativo</Text>
          </View>
          <View style={styles.cardFooter}>
            {item.footerItens.map(option => (
              <View style={styles.cardFooterItem}>
                <View style={styles.cardFooterItemIconContainer}>
                  {option.icon()}
                </View>
                <View style={styles.cardFooterItemContent}>
                  <Text style={styles.cardFooterItemTitle}>{option.title}</Text>
                  <Text style={styles.cardFooterItemCode}>
                    {option.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.primaryColor}}>
      <SafeAreaView
        style={[styles.container, {backgroundColor: theme.primaryColor}]}>
        <Header
          totalCards={carouselItens.length}
          currentCard={positionCarousel}
        />
        <View style={{...styles.content, backgroundColor: theme.primaryColor}}>
          <Carousel
            ref={carousel}
            data={carouselItens}
            renderItem={renderCarouselItem}
            sliderWidth={windowWidth}
            itemWidth={(windowWidth * 100) / 120}
            onSnapToItem={index => setPositionCarousel(index + 1)}
          />
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

const styles = createStyle({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingVertical: 20,
  },
  card: {
    position: 'relative',
    marginVertical: 50,
    width: (windowWidth * 100) / 120,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  cardHeader: {
    paddingTop: 60,
    alignItems: 'center',
  },
  cardProfileImage: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    height: 90,
    width: 90,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  cardUsername: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    color: theme.palette.primary.main,
    marginBottom: 5,
  },
  cardUserCreated: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: 12,
    color: theme.palette.primary.main,
  },
  cardContent: {
    padding: 10,
    alignItems: 'center',
  },
  cardTextStatus: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 12,
    color: '#186758',
    marginBottom: 5,
  },
  cardFooterItemIconContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  cardFooter: {
    marginVertical: 10,
  },
  cardFooterItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardFooterItemTitle: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: 10,
    color: '#262033',
    marginBottom: 2,
  },
  cardFooterItemCode: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 12,
    color: theme.palette.primary.main,
    marginBottom: 5,
  },
  informativeContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 5,
  },
  informativeText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default Screen;
