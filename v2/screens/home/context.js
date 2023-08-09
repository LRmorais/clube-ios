import React, {
  createContext,
  useContext as useReactContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import {Linking} from 'react-native';
import {useGlobalStateContext} from '../../hocs/globalState';
import {useLayoutContext} from '../../hocs/layout';
import {CORE_URL} from '../../constants/env';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const [highlight, setHighlight] = useState();
  const {
    paymentOrders,
    completeProfileModalVisible,
    hideCompleteProfileModal,
    userInfo,
  } = useGlobalStateContext();
  const {whiteLabelId} = useLayoutContext();
  const pendingPayments = paymentOrders
    ?.filter(order => order.situation === 1)
    ?.sort((one, another) => another.id - one.id);

  useEffect(() => {
    getHighlights();
  }, []);

  function goToMapsScreen() {
    props.navigation.navigate('Maps');
  }

  function goToMuralScreen(data) {
    let partnerList = data?.Partners;

    let title = data.title;

    let highlightId = data.id;

    if (data.typeHighlight === 'mural') {
      props.navigation.navigate('Mural', {data});
    } else if (data.typeHighlight === 'partnerList') {
      props.navigation.navigate('Places', {
        type: 'highlight',
        partnerList,
        title,
        whiteLabelId: whiteLabelId == null ? 0 : whiteLabelId,
        highlightId,
      });
    } else if (data.typeHighlight === 'directLink') {
      Linking.openURL(`${data.link}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`).catch(() => {});
    }
  }

  function goToCheckoutScreenHOF(data) {
    return function () {
      props.navigation.navigate('Checkout', {
        paymentOrderID: data.id,
      });
    };
  }

  function goToUsesScreen() {
    props.navigation.navigate('Uses', {
      activeTab: 'payments',
    });
  }

  function goToPartnersVouchersScreen() {
    props.navigation.navigate('PartnersVouchers');
  }

  function goToProfileScreen() {
    props.navigation.navigate('Profile');
  }
  function goToNotificationScreen() {
    props.navigation.navigate('PartnerDetails');
    // props.navigation.navigate('Notifications');
  }
  function goToProfileMenuScreen() {
    props.navigation.navigate('ProfileMenu');
  }
  function goToSearchScreen() {
    props.navigation.navigate('Search');
  }

  async function getHighlights() {
    try {
      const response = await axios.get(
        `${CORE_URL}highlights/mobile/${whiteLabelId}`,
      );
      setHighlight(response.data);
    } catch (error) {
      console.error(error);
      console.log('Error em chamar os Destaques');
    }
  }

  const value = {
    userInfo,
    pendingPayments,
    completeProfileModalVisible,
    hideCompleteProfileModal,
    goToMapsScreen,
    goToMuralScreen,
    goToCheckoutScreenHOF,
    goToUsesScreen,
    goToPartnersVouchersScreen,
    goToProfileScreen,
    goToNotificationScreen,
    goToProfileMenuScreen,
    goToSearchScreen,
    highlight,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
