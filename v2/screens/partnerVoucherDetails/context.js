import React, {
  createContext,
  useContext as useReactContext,
  useState,
} from 'react';
import {Linking} from 'react-native';
// import Clipboard from '@react-native-clipboard/clipboard';

import API from '../../helpers/api';
import {useGlobalStateContext} from '../../hocs/globalState';
import {useAnalyticsContext} from '../../hocs/analytics';
import {useAPIContext} from '../../hocs/api';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const {userInfo} = useGlobalStateContext();
  const {dispatchRecord} = useAnalyticsContext();
  const {canCall} = useAPIContext();
  const data = props.navigation.getParam('data');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  function returnToPreviousScreen() {
    props.navigation.navigate('PartnersVouchers', {
      itemToUpdate: data,
    });
  }

  async function getVoucher() {
    if (!canCall) {
      return setFeedback('noInternet');
    }

    try {
      setLoading(true);
      let result = await API.call({
        method: 'post',
        url: '/api/create/getCoupon',
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
        },
        data: {
          offer: Number(data.offer) || 'general',
          clientGazetaId: userInfo.id,
          couponsBookId: data.id,
        },
      });
      if (result.status !== 200) {
        throw null;
      }

      let userVouchers = await API.call({
        method: 'get',
        url: '/api/get/couponsByUser',
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
          'Cache-control': 'no-cache',
        },
      }).then(response => response.data);
      let userStuff = userVouchers.find(
        voucher => voucher.id === result.data.codeId,
      );
      setFeedback(result.data.code);
      props.navigation.setParams({
        data: {
          ...data,
          userStuff,
        },
      });
    } catch {
      setFeedback(!canCall ? 'noInternet' : 'error');
    } finally {
      setLoading(false);
    }
  }

  function copyCode() {
    Clipboard.setString(data.userStuff.code);
  }

  function hideFeedback() {
    setFeedback(null);
  }

  function sendLinkRecord(url) {
    Linking.openURL(`${url}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`).catch(() => {});
    dispatchRecord('Abertura de link', {
      value: url,
    });
  }

  function contactPressHOF(url) {
    return function () {
      Linking.openURL(`${url}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`).catch(() => {});
      dispatchRecord('Abertura de link', {
        value: url,
      });
    };
  }

  const value = {
    data,
    loading,
    feedback,
    returnToPreviousScreen,
    getVoucher,
    copyCode,
    hideFeedback,
    sendLinkRecord,
    contactPressHOF,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
