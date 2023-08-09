import React, {
  createContext,
  useContext as useReactContext,
  useState,
  useEffect,
} from 'react';

import axios from 'axios';
import {CORE_URL} from '../../constants/env';

import {getCurrentDiscount, getFilters} from '../../utils/data';
import {getDistance} from '../../utils/map';
import {useGlobalStateContext} from '../../hocs/globalState';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const {deviceLocation} = useGlobalStateContext();
  const [filterOptions, setFilterOptions] = useState([]);
  const [controlledDeviceLocation, setControlledDeviceLocation] =
    useState(deviceLocation);
  const from = 'maps';

  const hideFeed = props.navigation.getParam('hideFeed', false);
  const othersFilters = props.navigation.getParam('othersFilters', []);
  const [naturalData, setNaturalData] = useState([]);

  // buscando na api do core -------
  useEffect(() => {
    getUnits();
  }, []);

  async function getUnits() {
    let base_url = '';
    try {
      base_url = `${CORE_URL}partnerApp/allUnits/`;
      const response = await axios.get(`${base_url}`);
      setNaturalData(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  }
  const data =
    !deviceLocation || controlledDeviceLocation === null
      ? naturalData
      : naturalData.sort((one, another) => {
          let deviceCoords = {
            lat: controlledDeviceLocation.coords.latitude,
            lng: controlledDeviceLocation.coords.longitude,
          };
          let oneDistance = getDistance(deviceCoords, {
            lat: Number(one.latitude),
            lng: Number(one.longitude),
          });
          let anotherDistance = getDistance(deviceCoords, {
            lat: Number(another.latitude),
            lng: Number(another.longitude),
          });
          return oneDistance - anotherDistance;
        });

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

  function filterByOthers(data) {
    if (othersFilters.length === 0) {
      return data;
    }

    return data.filter(({partner}) =>
      othersFilters.some(filter =>
        partner.PartnerTags.some(({Tag}) => Tag.slug === filter),
      ),
    );
  }

  function filterByDiscountNow(unit) {
    let currentDiscount = getCurrentDiscount(unit.PartnerUnityOpeningHours);
    return currentDiscount !== null;
  }

  const filterFn = {
    discountNow: filterByDiscountNow,
  };

  function getFilteredData() {
    return filterOptions.reduce(
      (filtered, filterOption) => filtered.filter(filterFn[filterOption]),
      filterByOthers(data),
    );
  }
  const filteredData = getFilteredData();

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function goToTagsFiltersScreen() {
    props.navigation.navigate('TagsFilters', {
      from,
      appliedFilters: othersFilters,
      allFilters: getFilters({
        type: 'places',
        completeData: data,
      }),
    });
  }

  const value = {
    filterOptions,
    setFilterOptions,
    hideFeed,
    othersFilters,
    data,
    filteredData,
    returnToPreviousScreen,
    goToTagsFiltersScreen,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
