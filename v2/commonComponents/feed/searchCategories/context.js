import React, {
  createContext,
  useContext as useReactContext,
  useState,
  useRef,
  useEffect,
} from 'react';

import database from '../../../helpers/database';

import {dedup} from '../../../utils/array';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const PREVIOUS_SEARCH_KEY = 'previous-searched-categories';

const Provider = props => {
  const categories = [
    {
      id: '1',
      name: 'Academias',
      slug: 'academias',
      uri: require('../../../images/categories/Academia.jpg'),
    },
    {
      id: '2',
      name: 'Empórios',
      slug: 'emporios',
      uri: require('../../../images/categories/Emporio.jpg'),
    },
    {
      id: '3',
      name: 'Bares e Baladas',
      slug: 'bares-e-baladas',
      uri: require('../../../images/categories/Bares.jpg'),
    },
    {
      id: '4',
      name: 'Beleza e Estética',
      slug: 'beleza',
      uri: require('../../../images/categories/Beleza.jpg'),
    },
    {
      id: '5',
      name: 'Cafeterias',
      slug: 'cafeterias',
      uri: require('../../../images/categories/Cafeterias.jpg'),
    },
    {
      id: '6',
      name: 'Cinemas',
      slug: 'cinemas',
      uri: require('../../../images/categories/Cinemas.jpg'),
    },
    {
      id: '7',
      name: 'Docerias',
      slug: 'docerias',
      uri: require('../../../images/categories/Docerias.jpg'),
    },
    {
      id: '8',
      name: 'Educação',
      slug: 'educacao',
      uri: require('../../../images/categories/Educacao.jpg'),
    },
    {
      id: '9',
      name: 'Casa de Eventos',
      slug: 'casa-de-eventos',
      uri: require('../../../images/categories/CasaDeEventos.jpg'),
    },
    {
      id: '10',
      name: 'Farmácias',
      slug: 'farmacias',
      uri: require('../../../images/categories/Farmacias.jpg'),
    },
    {
      id: '11',
      name: 'Food Trucks',
      slug: 'food-trucks',
      uri: require('../../../images/categories/FoodTruck.jpg'),
    },
    {
      id: '12',
      name: 'Hamburguerias',
      slug: 'hamburguerias',
      uri: require('../../../images/categories/Hamburgueria.jpg'),
    },
    {
      id: '13',
      name: 'Viagens',
      slug: 'viagens',
      uri: require('../../../images/categories/Viagens.jpg'),
    },
    {
      id: '14',
      name: 'Lanches',
      slug: 'lanches',
      uri: require('../../../images/categories/Lanches.jpg'),
    },
    {
      id: '15',
      name: 'Lavanderias',
      slug: 'lavanderias',
      uri: require('../../../images/categories/Lavanderias.jpg'),
    },
    {
      id: '16',
      name: 'Padarias',
      slug: 'padarias',
      uri: require('../../../images/categories/Padarias.png'),
    },
    {
      id: '17',
      name: 'PetShops',
      slug: 'pet-shops',
      uri: require('../../../images/categories/PetShops.png'),
    },
    {
      id: '18',
      name: 'Pizzaria',
      slug: 'pizzarias',
      uri: require('../../../images/categories/Pizzaria.png'),
    },
    {
      id: '19',
      name: 'Restaurantes',
      slug: 'restaurantes',
      uri: require('../../../images/categories/Restaurantes.png'),
    },
    {
      id: '20',
      name: 'Sorveterias',
      slug: 'sorveterias',
      uri: require('../../../images/categories/Sorveterias.png'),
    },
    {
      id: '21',
      name: 'Teatros',
      slug: 'teatros',
      uri: require('../../../images/categories/Teatros.png'),
    },
    {
      id: '22',
      name: 'Passeios',
      slug: 'passeios',
      uri: require('../../../images/categories/Passeios.png'),
    },
    {
      id: '23',
      name: 'Serviços automotivos',
      slug: 'servicos-automotivos',
      uri: require('../../../images/categories/ServicoAuto.png'),
    },
    {
      id: '24',
      name: 'Lojas',
      slug: 'lojas',
      uri: require('../../../images/categories/Lojas.png'),
    },
    {
      id: '25',
      name: 'Laboratórios',
      slug: 'laboratorios',
      uri: require('../../../images/categories/Laboratorios.png'),
    },
    {
      id: '26',
      name: 'Casa e decoração',
      slug: 'casa-e-decoracao',
      uri: require('../../../images/categories/Outros.png'),
    },
    {
      id: '27',
      name: 'Consultoria',
      slug: 'consultorias',
      uri: require('../../../images/categories/Outros.png'),
    },
    {
      id: '28',
      name: 'Contabilidade',
      slug: 'contabilidade',
      uri: require('../../../images/categories/Outros.png'),
    },
    {
      id: '29',
      name: 'Coworking',
      slug: 'coworking',
      uri: require('../../../images/categories/Outros.png'),
    },
    {
      id: '30',
      name: 'Imóveis',
      slug: 'imoveis',
      uri: require('../../../images/categories/Imoveis.png'),
    },
    {
      id: '31',
      name: 'Saúde',
      slug: 'saude',
      uri: require('../../../images/categories/Saude.png'),
    },
    {
      id: '32',
      name: 'Soluções Tecnologicas',
      slug: 'solucoes-tecnologicas',
      uri: require('../../../images/categories/Tecnologia.png'),
    },
    {
      id: '33',
      name: 'Outros',
      slug: 'outros-1',
      uri: require('../../../images/categories/Outros.png'),
    },
  ];
  const [data, setData] = useState(Object.values(categories));
  const [originalData, setOriginalData] = useState(Object.values(categories));
  const [previous, setPrevious] = useState([]);
  const [valueSearch, setValueSearch] = useState('');

  const inputRef = useRef();

  useEffect(() => {
    getPreviousSearched();
  }, []);

  // busca no storage as pesquisas recentes
  async function getPreviousSearched() {
    let previous = await database.get(PREVIOUS_SEARCH_KEY).then(JSON.parse);
    if (previous) {
      setPrevious(previous);
    }
  }

  // salva no storage o slug do item pesquisado
  function updatePrevious(placeId) {
    let newPrevious = dedup([placeId, ...previous]).slice(0, 3);
    setPrevious(newPrevious);
    database.set(PREVIOUS_SEARCH_KEY, JSON.stringify(newPrevious));
  }

  // pega os dados do input
  function handleChange(e) {
    let arr = JSON.parse(JSON.stringify(originalData));
    setData(arr.filter(d => d.name.includes(e)));
  }

  const value = {
    data,
    setData,
    originalData,
    inputRef,
    categories,
    updatePrevious,
    previous,
    valueSearch,
    setValueSearch,
    handleChange,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
