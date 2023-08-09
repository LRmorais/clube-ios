import React from 'react';

import Box from '../../../components/box';
import HorizontalList from '../../../components/horizontalList';
import MovieListItem from '../../../components/listItem/movie';
import {ASSET_PREFIX} from '../../../constants/env';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const Movies = () => {
  const {theme} = useLayoutContext();
  const {
    movies,
    goToMovieDetailsScreenHOF: handleListItemPressHOF,
    goToMoviesScreen: handleExtraActionPress,
  } = useContext();
  const quantityToBeShown = 5;
  const data = movies.slice(0, quantityToBeShown);

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

  if (data.length === 0) {
    return null;
  }

  return (
    <Box
      title="Programação"
      titleColor={theme.primaryColor}
      shadow="both"
      action={
        movies.length > quantityToBeShown
          ? {
              text: 'Ver mais',
              color: theme.secondColor,
              onPress: handleExtraActionPress,
            }
          : undefined
      }>
      <HorizontalList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
      />
    </Box>
  );
};

export default Movies;
