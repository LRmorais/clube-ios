import React, {useRef, useEffect} from 'react';
import {Platform} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator as createStackNavigatorIOS} from 'react-navigation-stack';
import createStackNavigatorAndroid from 'react-native-screens/createNativeStackNavigator';

import Screens from '../screens';
import {useAnalyticsContext} from '../hocs/analytics';
import {useNotificationsContext} from '../hocs/notifications';

const createStackNavigator = {
  ios: createStackNavigatorIOS,
  android: createStackNavigatorAndroid,
}[Platform.OS];

const AuthStack = createStackNavigator(
  {
    AuthSwitch: {
      screen: Screens.WelcomeOnBoarding,
    },
    CompleteRegistration: {
      screen: Screens.CompleteRegistration,
    },
    SignIn: {
      screen: Screens.SignIn,
    },
    PartnershipsListSignIn: {
      screen: Screens.PartnershipsListSignIn,
    },
    SignUp: {
      screen: Screens.SignUp,
    },
    SignUpSocial: {
      screen: Screens.SignUpSocial,
    },
    ForgetPassword: {
      screen: Screens.ForgetPassword,
    },
  },
  {
    initialRouteName: 'AuthSwitch',
    headerMode: 'none',
  },
);

const GeneralContentStack = createStackNavigator(
  {
    Splash: {
      screen: Screens.Splash,
      path: '(entre-para-o-clube|assine)/',
    },
    Home: {
      screen: Screens.Home,
    },
    // VIP: {
    //   screen: Screens.VIP,
    // },
    Maps: {
      screen: Screens.Maps,
    },
    Search: {
      screen: Screens.Search,
    },
    Places: {
      screen: Screens.Places,
      path: '(momentos|roteiros)/:slug',
    },
    PlacesRedirect: {
      screen: Screens.PlacesRedirect,
      path: 'descontos/:mainCategory/:otherCategory',
    },
    Events: {
      screen: Screens.Events,
    },
    Movies: {
      screen: Screens.Movies,
    },
    PartnersVouchers: {
      screen: Screens.PartnersVouchers,
      path: 'cupons',
    },
    PartnerDetails: {
      screen: Screens.PartnerDetails,
    },
    News: {
      screen: Screens.News,
    },
    SpecificNews: {
      screen: Screens.SpecificNews,
    },
    Mural: {
      screen: Screens.Mural,
    },
    TagsFilters: {
      screen: Screens.TagsFilters,
    },
    PartnerUnitList: {
      screen: Screens.PartnerUnitList,
    },
    EventDetails: {
      screen: Screens.EventDetails,
      path: 'descontos/lazer/(shows|teatros|carnaval|passeios|viagens)/:slug',
    },
    MovieDetails: {
      screen: Screens.MovieDetails,
    },
    PartnerVoucherDetails: {
      screen: Screens.PartnerVoucherDetails,
    },
    NewsDetails: {
      screen: Screens.NewsDetails,
      path: 'noticias/:category/:slug',
    },
    SpecificNewsDetails: {
      screen: Screens.SpecificNewsDetails,
    },
    DiscountRequest: {
      screen: Screens.DiscountRequest,
    },
    DiscountResult: {
      screen: Screens.DiscountResult,
    },
    RedeemDiscount: {
      screen: Screens.RedeemDiscount,
    },
    QRCodeReader: {
      screen: Screens.QRCodeReader,
    },
    GenerateCard: {
      screen: Screens.GenerateCard,
    },
    Evaluation: {
      screen: Screens.Evaluation,
    },
    Image: {
      screen: Screens.Image,
    },
    Ratings: {
      screen: Screens.Ratings,
    },
    Profile: {
      screen: Screens.Profile,
    },
    Notifications: {
      screen: Screens.Notifications,
    },
    ProfileMenu: {
      screen: Screens.ProfileMenu,
    },
    MovieTickets: {
      screen: Screens.MovieTickets,
    },
    Uses: {
      screen: Screens.Uses,
    },
    Economy: {
      screen: Screens.Economy,
    },
    Settings: {
      screen: Screens.Settings,
    },
    IndicateEstablishment: {
      screen: Screens.IndicateEstablishment,
    },
    PolicyAndPrivacy: {
      screen: Screens.PolicyAndPrivacy,
    },
    HelpCentre: {
      screen: Screens.HelpCentre,
    },
    RecommendToFriends: {
      screen: Screens.RecommendToFriends,
    },
    ConvertedFriends: {
      screen: Screens.ConvertedFriends,
    },
    // VIPRules: {
    //   screen: Screens.VIPRules,
    // },
    PaymentMethods: {
      screen: Screens.PaymentMethods,
    },
    AddPaymentMethod: {
      screen: Screens.AddPaymentMethod,
    },
    Debug: {
      screen: Screens.Debug,
    },
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);

const switchNavigator = createSwitchNavigator(
  {
    AuthStack,
    Payment: Screens.Payment,
    OnBoarding: Screens.OnBoarding,
    CompleteRegistration: Screens.CompleteRegistration,
    WelcomeOnBoarding: Screens.WelcomeOnBoarding,
    GeneralContentStack: {
      screen: GeneralContentStack,
      path: '',
    },
  },
  {
    initialRouteName: 'GeneralContentStack',
  },
);

const AppContainer = createAppContainer(switchNavigator);

const Routes = () => {
  const {trackScreens: handleNavigationStateChange, getActiveRouteName} =
    useAnalyticsContext();
  const {neededRoute} = useNotificationsContext();
  const ref = useRef();

  useEffect(() => {
    if (neededRoute) {
      if (!Array.isArray(neededRoute)) {
        return;
      }

      let wallRoutes = [
        'Splash',
        'Payment',
        'SignUp',
        'AuthSwitch',
        'CompleteRegistration',
      ];
      let currentRoute = getActiveRouteName(
        ref.current?._navigation?.state,
      ).routeName;
      if (wallRoutes.includes(currentRoute)) {
        return;
      }

      ref.current?._navigation?.navigate(...neededRoute);
    }
  }, [neededRoute]);

  return (
    <AppContainer
      ref={ref}
      uriPrefix="https://appclube.gazetadopovo.com.br/"
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
};

export default Routes;
