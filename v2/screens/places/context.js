import React, {
  createContext,
  useContext as useReactContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import {Share} from 'react-native';
import axios from 'axios';

import {getDistance} from '../../utils/map';
import {useLayoutContext} from '../../hocs/layout';
import {useGlobalStateContext} from '../../hocs/globalState';
import {useAnalyticsContext} from '../../hocs/analytics';

import {CORE_URL} from '../../constants/env';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const {theme, whiteLabelId} = useLayoutContext();
  const {deviceLocation} = useGlobalStateContext();
  const {dispatchRecord} = useAnalyticsContext();
  const iconRef = useRef();
  const [controlledDeviceLocation, setControlledDeviceLocation] =
    useState(deviceLocation);
  const [sortOption, setSortOption] = useState('alphabetical');
  // const [sortOption, setSortOption] = useState(
  //   deviceLocation ? 'distance' : 'alphabetical',
  // );
  const [filterOptions, setFilterOptions] = useState([]);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState('list');

  const [partnersData, setPartnersData] = useState();

  const {getParam} = props.navigation;
  const type = props.navigation.getParam('type');
  const title = props.navigation.getParam('title');
  const slugCategory = props.navigation.getParam('slugCategory');
  const highlightId = props.navigation.getParam('highlightId');

  // buscando na api do core -------
  useEffect(() => {
    if (type === 'category') {
      getPartnerCategory();
    } else if (type === 'highlight') {
      getPartnerHighlight();
    } else if (type === 'nearby') {
      getPartnerNearby();
    }
  }, []);

  async function getPartnerCategory() {
    let base_url = `${CORE_URL}discounts/partner/category/${slugCategory}?&sorted=${sortOption}`;
    try {
      // if (deviceLocation) {
      //   base_url = `${CORE_URL}discounts/partner/category/${slugCategory}?lat=${deviceLocation.coords?.latitude}&lng=${deviceLocation.coords?.longitude}&sorted=${sortOption}`;
      // } else {
      //   base_url = `${CORE_URL}discounts/partner/category/${slugCategory}?&sorted=${sortOption}`;
      // }
      const response = await axios.get(`${base_url}`);
      setPartnersData(response.data);

    } catch (error) {
      console.error(error);
    }
  }
  async function getPartnerNearby() {
    let base_url = '';
    try {
      if (deviceLocation) {
        base_url = `${CORE_URL}discounts/partner/nearby/?lat=${deviceLocation.coords?.latitude}&lng=${deviceLocation.coords?.longitude}&limit=30`;
      } else {
        props.navigation.goBack();
      }
      const response = await axios.get(`${base_url}`);
      console.log(response.status);
      setPartnersData(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getPartnerHighlight() {
    let base_url = '';
    try {
      if (deviceLocation) {
        base_url = `${CORE_URL}highlights/mobile/partnerList/${whiteLabelId}/${highlightId}?lat=${deviceLocation.coords?.latitude}&lng=${deviceLocation.coords?.longitude}&sorted=${sortOption}`;
      } else {
        base_url = `${CORE_URL}highlights/mobile/partnerList/${whiteLabelId}/${highlightId}?&sorted=${sortOption}`;
      }
      const response = await axios.get(`${base_url}`);
      setPartnersData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // -------------------------------

  const screenType = 'category';

  const othersFilters = getParam('othersFilters', []);

  const haederPropsByViewMode = {
    maps: {
      rightIcon: {
        id: 'list',
        onPress: viewAsList,
      },
    },
    list: {
      rightIcon: {
        id: 'map',
        onPress: viewAsMaps,
      },
    },
  }[viewMode];

  const headerPropsByScreenType = {
    category: {
      backgroundColor: theme.primaryColor,
      title: 'previousScreenInfo.name',
    },
  }[screenType];

  useEffect(() => {
    if (!deviceLocation) {
      return;
    }

    if (controlledDeviceLocation) {
      let newDeviceCoords = {
        lat: deviceLocation.coords.latitude,
        lng: deviceLocation.coords.longitude,
      };
      let controlledDeviceCoords = {
        lat: controlledDeviceLocation.coords.latitude,
        lng: controlledDeviceLocation.coords.longitude,
      };
      let distance = getDistance(newDeviceCoords, controlledDeviceCoords);
      if (distance < 750) {
        return;
      }
    }

    setControlledDeviceLocation(deviceLocation);
  }, [deviceLocation]);

  useEffect(() => {
    dispatchRecord('Ordenação selecionada', {
      value: sortOption,
    });
  }, [sortOption]);

  useEffect(() => {
    dispatchRecord('Filtros aplicados', {
      json: filterOptions,
    });
  }, [filterOptions]);

  useEffect(() => {
    dispatchRecord('Tags aplicadas', {
      json: othersFilters,
    });
  }, [othersFilters]);

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function goToIndicateEstablishmentScreen() {
    props.navigation.navigate('IndicateEstablishment');
  }

  function viewAsList() {
    dispatchRecord('Modo de visualização', {
      value: 'list',
    });
    setViewMode('list');
  }

  function viewAsMaps() {
    dispatchRecord('Modo de visualização', {
      value: 'maps',
    });
    setViewMode('maps');
  }

  function centerOnMap() {
    mapRef.current.animateCamera(
      {center: deviceLocation.coords},
      {duration: 450},
    );
  }

  function share() {
    let sharingUrl = `https://clube.gazetadopovo.com.br/${slugCategory}`;
    try {
      dispatchRecord('Compartilhamento');
      Share.share({
        message:
          'Olha o que eu vi no Clube Gazeta e achei a sua cara! (:\n' +
          sharingUrl,
        url: sharingUrl,
      });
    } catch {
      //
    }
  }

  function showOptions() {
    share();
  }

  function showSortModal() {
    setSortModalVisible(true);
  }

  function hideSortModal() {
    setSortModalVisible(false);
  }

  function goToPlaceDetailsScreenHOF(item) {
    let typeCategorie = headerPropsByScreenType.title;
    return function () {
      props.navigation.navigate('PartnerDetails', {
        unitId: item.id,
        id: item.id,
        from: {
          screenType,
          typeCategorie,
        },
      });
    };
  }

  function clearFilters() {
    dispatchRecord('Limpeza de filtros');
    setFilterOptions([]);
    props.navigation.setParams({othersFilters: []});
  }

  const value = {
    partnersData,
    title,
    iconRef,
    controlledDeviceLocation,
    sortOption,
    setSortOption,
    filterOptions,
    setFilterOptions,
    sortModalVisible,
    viewMode,
    screenType,
    othersFilters,
    haederPropsByViewMode,
    headerPropsByScreenType,
    returnToPreviousScreen,
    goToIndicateEstablishmentScreen,
    viewAsList,
    viewAsMaps,
    centerOnMap,
    showOptions,
    showSortModal,
    hideSortModal,
    goToPlaceDetailsScreenHOF,
    clearFilters,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
