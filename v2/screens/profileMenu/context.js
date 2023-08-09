import React, {
  createContext,
  useContext as useReactContext,
  useState,
  useEffect,
} from 'react';
import {Alert, Linking} from 'react-native';
import API from '../../helpers/api';

import {useGlobalStateContext} from '../../hocs/globalState';
import {useAnalyticsContext} from '../../hocs/analytics';
import {useLayoutContext} from '../../hocs/layout';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const {palette} = useLayoutContext();
  const {userInfo, paymentOrders, removeUserInfo} = useGlobalStateContext();
  const [pendingPayments, setPendingPayments] = useState(0);
  const [feedback, setFeedback] = useState(false);
  const [loading, setLoading] = useState(false);
  const screenPalette = palette.sign_in;

  async function deleteAcount() {
    try {
      let result = await API.call({
        method: 'post',
        url: '/api/deleteSubscribe',
        data: {
          digitalUserID: userInfo.id,
        },
      });
      if (result.status === 200) {
        setLoading(false);
        logOut();
      } else {
        setLoading(false);
        setFeedback('any');
      }
    } catch (e) {
      console.log('e', e);
      setFeedback('any');
      setLoading(false);
    }
  }

  async function handleProfilePress() {
    await Linking.openURL(
      'https://conta.gazetadopovo.com.br/minha-conta/meus-dados?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet',
    );
  }
  async function deteleAcount() {
    hideFeedback();
    setTimeout(() => {
      setLoading(true);
      deleteAcount();
    }, 700);
  }
  function confirmDeleteAcount() {
    setFeedback('wrong');
  }
  function hideFeedback() {
    setFeedback(false);
  }

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

  useEffect(() => {
    let pendingPayments =
      paymentOrders?.filter(order => order.situation === 1).length || 0;
    setPendingPayments(pendingPayments);
  }, [paymentOrders]);

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function handleMenuItemPressHOF(routeName) {
    return function () {
      props.navigation.navigate(routeName);
    };
  }

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

  const value = {
    screenPalette,
    feedback,
    loading,
    hideFeedback,
    confirmDeleteAcount,
    deteleAcount,
    handleProfilePress,
    handleNotificationsPress,
    handleMovieTicketsPress,
    handleUsesPress,
    handleSettingsPress,
    handleRecommendToFriendsPress,
    handleRecommendEstablishmentPress,
    handleHelpCentrePress,
    handlePolicyAndPrivacyPress,
    returnToPreviousScreen,
    userInfo,
    pendingPayments,
    handleLogOutPress,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
