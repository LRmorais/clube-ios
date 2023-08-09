import React, {useState, useEffect} from 'react';
import {
  Alert,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  SafeAreaView,
  Linking,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import PropTypes from 'prop-types';

import Drawer from '../../components/drawer';
import PaddingContainer from '../../components/paddingContainer';
import Spacer from '../../components/spacer';
import Icon from '../../components/icons';
import ImageWithLoading from '../../components/imageWithLoading';
import SumUserInfo from '../../components/userInfo/sum';
import Menu from '../../components/menu';
import Divider from '../../components/divider';
import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';
import {useGlobalStateContext} from '../../hocs/globalState';
import defaultLogo from '../../images/logo/sideMenu.png';

const Separator = () => (
  <>
    <Spacer size={1.5} fixedSize />
    <Divider />
    <Spacer size={1.5} fixedSize />
  </>
);

const SideMenu = () => {
  const navigation = useNavigation();
  const {theme} = useLayoutContext();
  const {
    sideMenuVisible: visible,
    setSideMenuVisible,
    userInfo,
    paymentOrders,
    removeUserInfo,
  } = useGlobalStateContext();
  const [timesLogoTapped, setTimesLogoTapped] = useState(0);
  const [logoSource, setLogoSource] = useState(
    theme.logo ? {uri: theme.logo} : defaultLogo,
  );
  const [logoAspectRatio, setLogoAspectRatio] = useState(
    theme.logoAspectRatio || 14 / 3,
  );
  const [pendingPayments, setPendingPayments] = useState(0);

  useEffect(() => {
    if (timesLogoTapped < 15) {
      return;
    }

    setTimesLogoTapped(0);
    navigation.navigate('Debug');
  }, [timesLogoTapped]);

  useEffect(() => {
    let pendingPayments =
      paymentOrders?.filter(order => order.situation === 1).length || 0;
    setPendingPayments(pendingPayments);
  }, [paymentOrders]);

  function handleClose() {
    setSideMenuVisible(false);
    setTimesLogoTapped(0);
  }

  function handleLogoError() {
    setLogoSource(defaultLogo);
    setLogoAspectRatio(14 / 3);
  }

  function handleLogoPress() {
    setTimesLogoTapped(times => times + 1);
  }

  function handleMenuItemPressHOF(routeName) {
    return function () {
      navigation.navigate(routeName);
      handleClose();
    };
  }

  async function handleProfilePress() {
    await Linking.openURL(
      'https://conta.gazetadopovo.com.br/minha-conta/meus-dados',
    );
  }

  // const handleVIPPress = handleMenuItemPressHOF('VIP');
  // const handleProfilePress = handleMenuItemPressHOF('Profile');
  const handleNotificationsPress = handleMenuItemPressHOF('Notifications');
  const handleMovieTicketsPress = handleMenuItemPressHOF('MovieTickets');
  const handleUsesPress = handleMenuItemPressHOF('Uses');
  const handleSettingsPress = handleMenuItemPressHOF('Settings');
  const handleRecommendToFriendsPress =
    handleMenuItemPressHOF('RecommendToFriends');
  const handleRecommendEstablishmentPress = handleMenuItemPressHOF(
    'IndicateEstablishment',
  );
  const handleHelpCentrePress = handleMenuItemPressHOF('HelpCentre');
  const handlePolicyAndPrivacyPress =
    handleMenuItemPressHOF('PolicyAndPrivacy');
  const goToAuthSwitchScreen = handleMenuItemPressHOF('AuthSwitch');

  function logOut() {
    removeUserInfo();
    goToAuthSwitchScreen();
  }

  function handleLogOutPress() {
    Alert.alert(
      'Sair',
      'Deseja realmente sair do app?',
      [
        {
          text: 'Sim',
          onPress: logOut,
        },
        {
          text: 'Não',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  }

  return (
    <Drawer
      position="left"
      visible={visible}
      maskColor={theme.primaryColorShade}
      onClose={handleClose}>
      <View
        style={[
          styles.content,
          Platform.OS === 'ios' && {paddingTop: getStatusBarHeight()},
          {backgroundColor: theme.primaryColor},
        ]}>
        <PaddingContainer>
          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.75}
            onPress={handleClose}>
            <Icon
              id="close"
              size={14}
              style={{color: theme.contrastTextColor}}
            />
          </TouchableOpacity>
        </PaddingContainer>
        <Spacer size={3} fixedSize />
        <SafeAreaView
          style={styles.scrollViewOuter}
          contentContainerStyle={styles.scrollViewInner}
          showsVerticalScrollIndicator={false}
          overScrollMode="never">
          <PaddingContainer>
            <TouchableWithoutFeedback onPress={handleLogoPress}>
              <ImageWithLoading
                containerStyle={[styles.logo, {aspectRatio: logoAspectRatio}]}
                source={logoSource}
                onError={handleLogoError}
              />
            </TouchableWithoutFeedback>
            <Spacer size={5} fixedSize />
            <SumUserInfo
              text={{
                primary: userInfo.name,
                secondary: '#' + userInfo?.subscriptions[0].subscriptionId,
              }}
              isVIP={userInfo.status.vip}
              image={{uri: userInfo.img}}
              color={{
                image: theme.secondColorShade,
                text: {
                  primary: theme.contrastTextColor,
                  secondary: theme.contrastTextColor,
                },
                VIP: {
                  background: theme.VIPBackground,
                  icon: theme.primaryColorShade,
                  text: theme.VIPBackground,
                },
              }}
              onPress={handleProfilePress}
            />
            <Spacer size={5.5} fixedSize />
            <Menu
              items={
                [
                  // {
                  //   color: theme.contrastTextColor,
                  //   icon: 'star-outlined',
                  //   onPress: handleVIPPress,
                  //   text: 'Área VIP',
                  //   badgeColor: {
                  //     background: theme.red__main,
                  //     text: theme.contrastTextColor,
                  //   },
                  // },
                ]
              }
            />
          </PaddingContainer>
          <Separator />
          <PaddingContainer>
            <Menu
              items={[
                {
                  color: theme.contrastTextColor,
                  icon: 'bell',
                  onPress: handleNotificationsPress,
                  text: 'Notificações',
                  badgeColor: {
                    background: theme.red__main,
                    text: theme.contrastTextColor,
                  },
                },
                {
                  color: theme.contrastTextColor,
                  icon: 'ticket',
                  onPress: handleMovieTicketsPress,
                  text: 'Meus ingressos',
                  badgeColor: {
                    background: theme.red__main,
                    text: theme.contrastTextColor,
                  },
                },
                {
                  color: theme.contrastTextColor,
                  icon: 'voucher-outlined',
                  onPress: handleUsesPress,
                  text: 'Utilizações',
                  badgeCount: pendingPayments,
                  badgeColor: {
                    background: theme.red__main,
                    text: theme.contrastTextColor,
                  },
                },
                {
                  color: theme.contrastTextColor,
                  icon: 'settings',
                  onPress: handleSettingsPress,
                  text: 'Configurações',
                  badgeColor: {
                    background: theme.red__main,
                    text: theme.contrastTextColor,
                  },
                },
                {
                  color: theme.contrastTextColor,
                  icon: 'person-more',
                  onPress: handleRecommendToFriendsPress,
                  text: 'Indique um amigo',
                  badgeColor: {
                    background: theme.red__main,
                    text: theme.contrastTextColor,
                  },
                },
                {
                  color: theme.contrastTextColor,
                  icon: 'establishment',
                  onPress: handleRecommendEstablishmentPress,
                  text: 'Indique um estabelecimento',
                  badgeColor: {
                    background: theme.red__main,
                    text: theme.contrastTextColor,
                  },
                },
                {
                  color: theme.contrastTextColor,
                  icon: 'help',
                  onPress: handleHelpCentrePress,
                  text: 'Central de ajuda',
                  badgeColor: {
                    background: theme.red__main,
                    text: theme.contrastTextColor,
                  },
                },
                {
                  color: theme.contrastTextColor,
                  icon: 'privacy',
                  onPress: handlePolicyAndPrivacyPress,
                  text: 'Termos de uso',
                  badgeColor: {
                    background: theme.red__main,
                    text: theme.contrastTextColor,
                  },
                },
              ]}
            />
          </PaddingContainer>
        </SafeAreaView>
        <Separator />
        <PaddingContainer>
          <Menu
            items={[
              {
                color: theme.contrastTextColor,
                icon: 'logout',
                onPress: handleLogOutPress,
                text: 'Sair',
                badgeColor: {
                  background: theme.red__main,
                  text: theme.contrastTextColor,
                },
              },
            ]}
          />
        </PaddingContainer>
      </View>
    </Drawer>
  );
};

SideMenu.propTypes = {
  onClose: PropTypes.func,
};

const styles = createStyle(theme => ({
  content: {
    flex: 1,
    minWidth: 320,
    paddingTop: theme.spacing(2),
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  scrollViewOuter: {
    flex: 1,
  },
  scrollViewInner: {
    flexGrow: 1,
    paddingBottom: theme.spacing(6),
  },
  logo: {
    alignSelf: 'stretch',
    height: 58.5,
  },
}));

export default SideMenu;
