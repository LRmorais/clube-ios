import React from 'react';
import {Platform} from 'react-native';

import FullScreenCarousel from '../../../components/carousel/fullScreen';
import CardCarouselItem from '../../../components/carouselItem/card';

import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const PermissionsCarousel = () => {
  const {theme} = useLayoutContext();
  const {
    index,
    goToNextCard: handleLocationExtraPress,
    goToInitialScreen: handleNotificationExtraPress,
    requestLocationPermission: handleLocationMainPress,
    requestNotificationPermission: handleNotificationMainPress,
  } = useContext();

  const backgroundColor = theme.whiteBackground;
  const textColors = {
    primary: theme.tertiaryColor,
    secondary: theme.tertiaryColor,
  };
  const floatingButtonsColors = {
    main: theme.primaryButtonBackground,
    shadow: theme.primaryButtonShadow,
    text: theme.primaryButtonTextColor,
  };
  const extraActionColor = theme.textPrimaryColor;

  const locationData = {
    background: backgroundColor,
    text: {
      primary: 'Permitir localização',
      secondary:
        'Para encontrar descontos próximos a você e receber recomendações mais satisfatórias.',
    },
    color: textColors,
    floatingButtonProps: {
      text: 'Continuar',
      colors: floatingButtonsColors,
      onPress: handleLocationMainPress,
    },
    // extraAction: {
    //   text: 'Pular',
    //   color: extraActionColor,
    //   onPress: handleLocationExtraPress,
    // },
    // Platform.OS === 'ios'
    //   ? null
    //   : {
    //       text: 'Pular',
    //       color: extraActionColor,
    //       onPress: handleLocationExtraPress,
    //     },
    backgroundProps: {
      source: require('../../../images/stuff/map.png'),
      resizeMode: 'contain',
      containerStyle: {
        alignSelf: 'center',
        width: '70%',
        height: '55%',
      },
    },
  };

  const notificationsData = {
    background: backgroundColor,
    text: {
      primary: 'Ative suas notificações',
      secondary:
        'Receba novidades, promoções e as melhores indicações de descontos.',
    },
    color: textColors,
    floatingButtonProps:
      Platform.OS === 'ios'
        ? {
            text: 'Continuar',
            colors: floatingButtonsColors,
            onPress: handleNotificationExtraPress,
          }
        : {
            text: 'Ativar notificações',
            colors: floatingButtonsColors,
            // onPress: handleNotificationMainPress,
            onPress: handleNotificationExtraPress,
          },
    extraAction:
      Platform.OS === 'ios'
        ? null
        : {
            text: 'Pular',
            color: extraActionColor,
            onPress: handleNotificationExtraPress,
          },
    // extraAction: {
    //   text: 'Pular',
    //   color: extraActionColor,
    //   onPress: handleNotificationExtraPress,
    // },
    backgroundProps: {
      source: require('../../../images/stuff/balloon.png'),
      resizeMode: 'contain',
      containerStyle: {
        alignSelf: 'center',
        width: '70%',
        height: '55%',
      },
    },
  };

  // const data = [locationData, notificationsData];
  const data = [ notificationsData ];

  function renderItem({item}) {
    return <CardCarouselItem {...item} />;
  }

  return (
    <FullScreenCarousel
      contentPosition="bottom"
      data={data}
      renderItem={renderItem}
      scrollEnabled={false}
      index={index}
      dotsColor={theme.whiteBackground}
      keyExtractor={item => item.text.primary}
    />
  );
};

export default PermissionsCarousel;
