import React, {
  createContext,
  useContext as useReactContext,
  useState,
  useEffect,
} from 'react';
import deburr from 'lodash.deburr';

import {insert, remove} from '../../utils/array';
import {useAnalyticsContext} from '../../hocs/analytics';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const {dispatchRecord} = useAnalyticsContext();
  const [searchValue, setSearchValue] = useState('');
  const preCalculatedFilters = props.navigation.getParam('allFilters', []);
  const typeEvents = props.navigation.getParam('type', []);

  const [nonRepeatedFilters, setNonRepeatedFilters] =
    useState(preCalculatedFilters);
  const [filtersChecked, setFiltersChecked] = useState(
    props.navigation.getParam('appliedFilters', []),
  );
  const searchValueRegex = new RegExp(deburr(searchValue), 'gi');

  const from = props.navigation.getParam('from');

  const estaticEventsTags = [
    {
      id: 3,
      name: 'Bares e Baladas',
      slug: 'bares-e-baladas',
    },
    {
      id: 4,
      name: 'Beleza e Estética',
      slug: 'beleza',
    },
    {
      id: 5,
      name: 'Cafeterias',
      slug: 'cafeterias',
    },
    {
      id: 10,
      name: 'Casa de Eventos',
      slug: 'casa-de-eventos',
    },
    {
      id: 17,
      name: 'Lanches',
      slug: 'lanches',
    },
    {
      id: 26,
      name: 'Restaurantes',
      slug: 'restaurantes',
    },
    {
      id: 27,
      name: 'Shows',
      slug: 'shows',
    },
    {
      id: 29,
      name: 'Teatros',
      slug: 'teatros',
    },
  ];

  useEffect(() => {
    let filtered;
    if (typeEvents === 'events') {
      filtered = estaticEventsTags.filter(filter =>
        searchValueRegex.test(filter.name),
      );
    } else {
      filtered = preCalculatedFilters.filter(filter =>
        searchValueRegex.test(filter.name),
      );
    }

    setNonRepeatedFilters(filtered);
  }, [searchValue]);

  useEffect(() => {
    dispatchRecord('Tags aplicadas', {
      json: filtersChecked,
    });
  }, [filtersChecked]);

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function applyPlacesFilters() {
    props.navigation.navigate('Places', {
      type: props.navigation.getParam('screenType'),
      key: props.navigation.getParam('key'),
      othersFilters: filtersChecked,
    });
  }

  function applyEventsFilters() {
    props.navigation.navigate('Events', {
      othersFilters: filtersChecked,
    });
  }

  function applyMapsFilters() {
    props.navigation.navigate('Maps', {
      othersFilters: filtersChecked,
    });
  }

  const applyFilters = {
    places: applyPlacesFilters,
    events: applyEventsFilters,
    maps: applyMapsFilters,
  }[from];

  function cleanFilters() {
    dispatchRecord('Limpeza de filtros');
    setSearchValue('');
    setFiltersChecked([]);
  }

  function handleFiltersChange(value, checked) {
    setFiltersChecked(filtersChecked =>
      checked ? insert(filtersChecked, value) : remove(filtersChecked, value),
    );
  }

  const value = {
    searchValue,
    setSearchValue,
    filtersChecked,
    nonRepeatedFilters,
    returnToPreviousScreen,
    applyFilters,
    cleanFilters,
    handleFiltersChange,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
