import React from 'react';
import {FlatList} from 'react-native';

import Box from '../../../components/box';
import HorizontalList from '../../../components/horizontalList';
import MovieListItem from '../../../components/listItem/movie';
import {ASSET_PREFIX} from '../../../constants/env';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const List = () => {
  const {theme} = useLayoutContext();
  const {
    sections,
    movies,
    goToMovieDetailsScreenHOF: handleListItemPressHOF,
  } = useContext();

  function renderItem({item}) {
    return (
      <MovieListItem
        id={item.id}
        image={ASSET_PREFIX + item.cover}
        title={item.title}
        color={{
          image: theme.tertiaryColor,
          title: theme.secondColor,
        }}
        onPress={handleListItemPressHOF(item)}
      />
    );
  }

  function renderSection({item: sectionTitle}) {
    let sectionData = movies.filter(item =>
      item.parsedGenres.includes(sectionTitle),
    );

    return (
      <Box
        title={sectionTitle}
        titleColor={theme.primaryColor}
        noGutters="bottom">
        <HorizontalList
          data={sectionData}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
        />
      </Box>
    );
  }

  return (
    <FlatList
      data={sections}
      renderItem={renderSection}
      keyExtractor={item => item}
    />
  );
};

export default List;
