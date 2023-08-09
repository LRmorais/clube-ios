import React, { createContext, useContext as useReactContext, useState, useEffect } from 'react';

import API from '../../helpers/api';
import database from '../../helpers/database';
import { useGlobalStateContext } from '../../hocs/globalState';
import { useAPIContext } from '../../hocs/api';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const INFO_MODAL_TIMES_SHOWN_KEY = 'INFO_MODAL_TIMES_SHOWN_KEY_2';

const Provider = (props) => {
  const {
    userInfo,
    generalData,
  } = useGlobalStateContext();
  const {
    canCall,
  } = useAPIContext();
  const [fullData, setFullData] = useState(null);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [filters, setFilters] = useState([]);
  const modifiedItem = props.navigation.getParam('itemToUpdate');

  if (!generalData) {
    props.navigation.replace('Splash', {
      screen: 'PartnersVouchers',
      params: props.navigation.state.params,
    });
    return null;
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!fullData) return;

    setData(
      filters.length === 0
        ? fullData
        : fullData.filter((item) =>
          (filters.includes('toBeUsed') && item.userStuff?.status === 2) ||
          (filters.includes('used') && item.userStuff?.status === 3) ||
          (filters.includes('available') && !item.userStuff) ||
          (filters.includes('future') && new Date(item.launchDate) > new Date())
        )
    );
  }, [filters, fullData]);

  useEffect(() => {
    if (!modifiedItem) return;

    setFullData(fullData.map((item) => (
      item.index === modifiedItem.index
        ? modifiedItem
        : item
    )));
  }, [modifiedItem]);

  async function getData() {
    if (!canCall) return setError('noInternet');

    try {
      setLoading('data');
      let userVouchers = await API.call({
        method: 'get',
        url: '/api/get/couponsByUser',
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
          'Cache-control': 'no-cache, no-store, must-revalidate',
        },
      }).then((response) => response.data);
      setUserData([...userVouchers]);
      let offers = userInfo?.subscriptions?.filter((offer) => !offer.canceledAt)?.map(({ offerId }) => offerId) || [];
      let [generalVouchers, ...offersVouchers] = await Promise.all(['general', ...offers].map(
        (offer) => API.call({
          method: 'get',
          url: '/api/user/getCoupons/' + offer,
          headers: {
            Authorization: `Bearer ${userInfo.tokenJWTClube}`,
            'Cache-control': 'no-cache, no-store, must-revalidate',
          },
        })
        .then((response) => response.data)
        .catch(() => ([]))
      ));
      let neededGeneralVouchers = generalVouchers.filter((voucher) =>
        !offersVouchers.flat(2).map(voucher => voucher.id).includes(voucher.id)
      );
      let allVouchers = [neededGeneralVouchers, ...offersVouchers].flat(2).map(
        (voucher) => [...new Array(
          voucher.activationType === 1
            ? voucher.userLimit
            : Math.min(voucher.userLimit, (userVouchers.filter((userVoucher) => userVoucher.CouponsBook.id === voucher.id).length +1))
        )].map(() => ({
          ...voucher,
          userStuff: ((index) => userVouchers.splice(index, ~~(index >= 0))[0])(
            userVouchers.findIndex((userVoucher) => userVoucher.CouponsBook.id === voucher.id)
          ),
        }))
      ).flat().map((item, index) => ({ ...item, index }));
      let sortedVouchers = allVouchers.sort((one, another) =>
        one.title.localeCompare(another.title)
      );
      setFullData(sortedVouchers);
      setData(sortedVouchers);
      if (sortedVouchers.length > 0) showInfoModalIfNeeded();
    } catch {
      setError(!canCall ? 'noInternet' : 'any');
    } finally {
      setLoading(false);
    }
  }

  async function showInfoModalIfNeeded() {
    let timesShown = await database.get(INFO_MODAL_TIMES_SHOWN_KEY);
    if (Number(timesShown) === 3) return;

    showInfoModal();
    database.set(INFO_MODAL_TIMES_SHOWN_KEY, Number(timesShown) +1);
  }

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function goToEconomyScreen() {
    props.navigation.navigate('Economy', {
      data: userData,
    });
  }

  function goToPartnerVoucherDetailsScreenHOF(data) {
    return function() {
      props.navigation.navigate('PartnerVoucherDetails', {
        data,
      });
    }
  }

  function filterData(value, checked) {
    if (loading) return;

    if (checked) setFilters((filters) => ([
      ...filters,
      value,
    ]));
    else setFilters((filters) => filters.filter(
      (filter) => filter !== value
    ));
  }

  function showInfoModal() {
    setInfoModalVisible(true);
  }

  function hideInfoModal() {
    setInfoModalVisible(false);
  }

  const value = {
    fullData,
    data,
    userData,
    loading,
    error,
    infoModalVisible,
    filters,
    modifiedItem,
    getData,
    returnToPreviousScreen,
    goToEconomyScreen,
    goToPartnerVoucherDetailsScreenHOF,
    filterData,
    showInfoModal,
    hideInfoModal,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
