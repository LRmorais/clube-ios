import React, {
  createContext,
  useContext as useReactContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import debounce from 'lodash.debounce';

import {searchNews} from '../../utils/outerRequest';
import {useGlobalStateContext} from '../../hocs/globalState';
import {useAnalyticsContext} from '../../hocs/analytics';
import axios from 'axios';
import {CORE_URL} from '../../constants/env';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const {deviceLocation} = useGlobalStateContext();
  const {dispatchRecord} = useAnalyticsContext();

  const [place, setPlace] = useState([]);
  const [event, setEvent] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [orderBy, setOrderBy] = useState(['alphabetical']);
  const [searchValue, setSearchValue] = useState('');
  const [news, setNews] = useState([]);
  const [selectedTab, setSelectedTab] = useState('places');
  const [loadingNews, setLoadingNews] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const inputRef = useRef();

  const [filterOptions, setFilterOptions] = useState([]);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(
    deviceLocation ? 'distance' : 'alphabetical',
  );

  const getNewsRef = useRef(
    debounce(async function (query) {
      if (!query.trim()) {
        setNews([]);
        return;
      }

      dispatchRecord('Pesquisa de notícia', {
        value: query,
      });
      try {
        setLoadingNews(true);
        let result = await searchNews(query);
        let news = (result.data || []).slice(0, 5);
        setNews(news);
      } catch {
        //
      } finally {
        setLoadingNews(false);
      }
    }, 400),
  );
  const getNews = getNewsRef.current;

  useEffect(() => {
    if (searchValue.length >= 2) {
      const delayDebounceFn = setTimeout(() => {
        Search();
      }, 800);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchValue, sortOption]);

  function replaceAccents(str) {
    str = str.replace(/'/g, '_');
    str = str.replace(/á/g, '_');
    str = str.replace(/é/g, '_');
    str = str.replace(/í/g, '_');
    str = str.replace(/ó/g, '_');
    str = str.replace(/ú/g, '_');
    str = str.toLowerCase();
    str = str.replace(/e/g, '_');

    if (str.search(/[\xC0-\xFF]/g) > -1) {
      str = str
        .replace(/[\xC0-\xC5]/g, 'A')
        .replace(/[\xC6]/g, 'AE')
        .replace(/[\xC7]/g, 'C')
        .replace(/[\xC8-\xCB]/g, 'E')
        .replace(/[\xCC-\xCF]/g, 'I')
        .replace(/[\xD0]/g, 'D')
        .replace(/[\xD1]/g, 'N')
        .replace(/[\xD2-\xD6\xD8]/g, 'O')
        .replace(/[\xD9-\xDC]/g, 'U')
        .replace(/[\xDD]/g, 'Y')
        .replace(/[\xDE]/g, 'P')
        .replace(/[\xE0-\xE5]/g, 'a')
        .replace(/[\xE6]/g, 'ae')
        .replace(/[\xE7]/g, 'c')
        .replace(/[\xE8-\xEB]/g, 'e')
        .replace(/[\xEC-\xEF]/g, 'i')
        .replace(/[\xF1]/g, 'n')
        .replace(/[\xF2-\xF6\xF8]/g, 'o')
        .replace(/[\xF9-\xFC]/g, 'u')
        .replace(/[\xFE]/g, 'p')
        .replace(/[\xFD\xFF]/g, 'y');
    }

    return str;
  }

  async function getPlaces() {
    setLoading(true);

    let replecedSearchValue;

    replecedSearchValue = replaceAccents(searchValue.trim());
    replecedSearchValue = replecedSearchValue.replace(/[^A-Z0-9]+/gi, '_');
    console.log('pesquisa:', replecedSearchValue);
    let base_url = '';
    if (deviceLocation) {
      base_url = `${CORE_URL}search/?type=places&name=${replecedSearchValue}&sorted=${sortOption}&lat=${
        deviceLocation.coords?.latitude
      }&lng=${deviceLocation.coords?.longitude}&tags=${selectedFilters.join(
        '&tags=',
      )}`;
      console.log(base_url);
    } else {
      base_url = `${CORE_URL}search/?type=places&name=${searchValue.trim()}&sorted=${sortOption}&tags=${selectedFilters.join(
        '&tags=',
      )}`;
    }
    const res = await axios.get(`${base_url}`);
    return res.data;
  }

  async function getEvents() {
    setLoading(true);
    let base_url = '';
    base_url = `${CORE_URL}search/?type=events&name=${searchValue
      .split(' ')
      .join('%20')}`;
    const res = await axios.get(`${base_url}`);
    return res.data;
  }

  function sortedNews(a, b) {
    // Convert string dates into `Date` objects
    const date1 = new Date(a.scheduled);
    const date2 = new Date(b.scheduled);

    return date2 - date1;
  }

  async function Search() {
    const resCategories = await axios.get(`${CORE_URL}tags`);
    const [places, events, newsResult] = await Promise.all([
      getPlaces(),
      getEvents(),
      searchNews(searchValue.trim()),
    ]);
    let sorted = newsResult.data.sort(sortedNews);

    setNews(sorted);
    setPlace(places);
    setEvent(events);
    if (places.length == 0 && events.length == 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }

    setCategories(resCategories.data);
    setLoading(false);
  }

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function goToPlaceDetailsScreenHOF(data) {
    if (data.type === 'partner') {
      return function () {
        props.navigation.navigate('PartnerDetails', {
          unitId: data.id,
          id: data.id,
          from: {
            screenType: 'search',
            typeCategorie: data.tag,
          },
        });
      };
    } else if (data.type === 'event') {
      return function () {
        props.navigation.navigate('EventDetails', {
          id: data.id,
        });
      };
    } else {
      return function () {
        props.navigation.navigate('NewsDetails', data);
      };
    }
  }

  function showSortModal() {
    setSortModalVisible(true);
  }

  function hideSortModal() {
    setSortModalVisible(false);
  }

  const partners = [
    {
      title: 'Parceiros',
      data: place,
    },
  ];
  const events = [
    {
      title: 'Eventos',
      data: event,
    },
  ];
  const noticias = [
    {
      title: 'Notícias',
      data: news,
    },
  ];

  const value = {
    noticias,
    noResults,
    place,
    event,
    partners,
    events,
    Search,
    orderBy,
    setOrderBy,
    selectedFilters,
    setSelectedFilters,
    categories,
    loading,
    searchValue,
    setSearchValue,
    news,
    selectedTab,
    setSelectedTab,
    loadingNews,
    inputRef,
    getNews,
    returnToPreviousScreen,
    goToPlaceDetailsScreenHOF,
    filterOptions,
    setFilterOptions,
    showSortModal,
    hideSortModal,
    sortModalVisible,
    sortOption,
    setSortOption,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
