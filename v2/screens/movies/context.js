import React, {
  createContext,
  useContext as useReactContext,
  useEffect,
  useState,
} from 'react';
import deburr from 'lodash.deburr';

import GraphQL from '../../helpers/graphql';
import {dedup} from '../../utils/array';
import {useGlobalStateContext} from '../../hocs/globalState';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const {userInfo} = useGlobalStateContext();
  const [movies, setMovies] = useState([]);

  //------ chamada api para busca de filmes em cartas------
  useEffect(() => {
    if (from != -1) {
      getMovies(from);
    } else {
      getTickets();
    }
  }, []);

  async function getTickets() {
    try {
      let result = await GraphQL({
        query: `{
          getAllMovies {
            id
            title
            cover
            parsedGenres
          }
        }`,
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
        },
      });
      if (result.status !== 200) {
        throw null;
      }
      setMovies(result.data.data.getAllMovies);
    } catch (e) {
      console.log(e);
    }
  }
  async function getMovies(partnerUnitId) {
    try {
      let result = await GraphQL({
        query: `{
          getMovies(partnerUnitId: ${partnerUnitId}){
            id
            title
            cover
            parsedGenres
          }
        }`,
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
        },
      });
      if (result.status !== 200) {
        throw null;
      }
      setMovies(result.data.data.getMovies);
    } catch (e) {
      console.log(e);
    }
  }

  //-----------------termina busca-------------------------

  const from = props.navigation.getParam('from', -1);

  const sections = dedup(movies.map(item => item.parsedGenres).flat()).sort(
    (one, another) => deburr(one).localeCompare(deburr(another)),
  );

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function goToMovieDetailsScreenHOF(item) {
    return function () {
      props.navigation.navigate('MovieDetails', {
        id: item.id,
      });
    };
  }

  const value = {
    sections,
    movies,
    returnToPreviousScreen,
    goToMovieDetailsScreenHOF,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
