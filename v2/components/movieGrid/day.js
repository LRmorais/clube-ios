import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import PaddingContainer from '../paddingContainer';
import ExtraVerticalPaddingContainer from '../paddingContainer/extraVertical';
import SimpleVerticalList from '../verticalList/simple';
import MovieGridItem from './item';

const MovieGridDay = props => {
  if (props.data.length === 0) {
    return null;
  }

  return (
    <View>
      <PaddingContainer>
        <ExtraVerticalPaddingContainer>
          <SimpleVerticalList
            showSeparator
            data={props.data}
            renderItem={({item, index}) => (
              <MovieGridItem
                {...item}
                first={index === 0}
                last={index === props.data.length - 1}
              />
            )}
            keyExtractor={item => item.place.title}
            scrollEnabled={false}
            bounces={false}
            overScrollMode="never"
          />
        </ExtraVerticalPaddingContainer>
      </PaddingContainer>
    </View>
  );
};

MovieGridDay.propTypes = {
  data: PropTypes.array.isRequired,
  noSessionsProps: PropTypes.object,
};

export default MovieGridDay;
