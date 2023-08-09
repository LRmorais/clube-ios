import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import axios from 'axios';

import Box from '../../components/box';
import HorizontalList from '../../components/horizontalList';
import MovieListItem from '../../components/listItem/movie';

import {useGlobalStateContext} from '../../hocs/globalState';
import GraphQL from '../../helpers/graphql';
import {ASSET_PREFIX} from '../../constants/env';
import {CORE_URL} from '../../constants/env';
import {useLayoutContext} from '../../hocs/layout';

const Movies = () => {
  const navigation = useNavigation();
  const {theme} = useLayoutContext();
  const [movies, setMovies] = useState([]);
  const fakeData = [{id: -4}, {id: -5}, {id: -6}];

  //------ chamada api para busca de filmes em cartas------
  useEffect(() => {
    getTickets();
  }, []);

  async function getTickets() {
    let base_url = `${CORE_URL}movies`;
    try {
      let result = await axios.get(`${base_url}`);
      if (result.status !== 200) {
        throw null;
      }
      setMovies(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  //-----------------termina busca-------------------------

  function handleExtraActionPress() {
    navigation.navigate('Movies');
  }

  function handleListItemPressHOF(item) {
    let {id} = item;
    return function () {
      navigation.navigate({
        routeName: 'MovieDetails',
        params: {
          id,
        },
      });
    };
  }

  function renderItem({item}) {
    return (
      <MovieListItem
        id={item.id}
        image={ASSET_PREFIX + item.cover}
        title={item.title}
        color={{
          image: theme.tertiaryColor,
          title: theme.primaryColor,
        }}
        onPress={handleListItemPressHOF(item)}
      />
    );
  }
  function renderSkeleton() {
    return (
      <SkeletonPlaceholder highlightColor={theme.secondColorShade} speed={1500}>
        <View style={{marginHorizontal: 20}}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: 190,
              height: 200,
            }}
          />
          <View style={{width: 190, height: 20, marginTop: 10}} />
        </View>
      </SkeletonPlaceholder>
    );
  }

  return (
    <Box
      title="FILMES"
      titleColor={theme.primaryColor}
      shadow="both"
      action={{
        text: movies.length === 0 ? '.' : 'Ver mais',
        color: theme.secondColor,
        onPress: handleExtraActionPress,
      }}>
      <HorizontalList
        data={movies.length === 0 ? fakeData : movies.slice(0, 5)}
        renderItem={movies.length === 0 ? renderSkeleton : renderItem}
        keyExtractor={item => String(item.id)}
      />
    </Box>
  );
};

export default Movies;
