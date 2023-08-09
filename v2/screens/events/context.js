import React, {
  createContext,
  useContext as useReactContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';

import {useAnalyticsContext} from '../../hocs/analytics';

import {CORE_URL} from '../../constants/env';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const [events, setEvents] = useState();
  const {dispatchRecord} = useAnalyticsContext();

  const othersFilters = props.navigation.getParam('othersFilters', []);

  const from = 'events';

  useEffect(() => {
    dispatchRecord('Tags aplicadas', {
      json: othersFilters,
    });
  }, [othersFilters]);

  // buscando na api do core -------

  useEffect(() => {
    getAllEvents();
  }, []);
  async function getAllEvents() {
    try {
      const response = await axios.get(`${CORE_URL}events/all`);
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  // -------------------------------

  function filterByOthers() {
    if (othersFilters.length === 0) {
      return events;
    }

    const filteredEvents = events.filter(event => {
      return othersFilters.some(item => item === event.slug);
    });

    return filteredEvents;
  }

  function getFilteredData() {
    let filteredData = filterByOthers();
    return filteredData;
  }
  const filteredData = getFilteredData();

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function goToTagsFiltersScreen() {
    props.navigation.navigate('TagsFilters', {
      type: 'events',
      from,
      appliedFilters: othersFilters,
      // allFilters: getFilters({
      //   type: 'events',
      //   completeData: data,
      // }),
    });
  }

  function goToEventDetailsScreenHOF(data) {
    return function () {
      props.navigation.navigate('EventDetails', {
        id: data.id,
      });
    };
  }

  function clearFilters() {
    props.navigation.setParams({othersFilters: []});
  }

  const value = {
    events,
    othersFilters,
    filteredData,
    returnToPreviousScreen,
    goToTagsFiltersScreen,
    goToEventDetailsScreenHOF,
    clearFilters,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
