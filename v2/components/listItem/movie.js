import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import ImageWithLoading from '../imageWithLoading';
import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';

const MovieListItem = props => {
  const {screenWidth} = useLayoutContext();

  return (
    <TouchableOpacity
      style={{width: screenWidth / 3}}
      activeOpacity={props._skeleton ? 1 : 0.75}
      onPress={props.onPress}>
      <ImageWithLoading
        containerStyle={[styles.image, {backgroundColor: props.color.image}]}
        source={{uri: props.image}}
      />
      <Text style={[styles.text, {color: props.color.title}]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

MovieListItem.propTypes = {
  _skeleton: PropTypes.bool,
  color: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

MovieListItem.defaultProps = {
  _skeleton: false,
};

MovieListItem.Skeleton = props => (
  <MovieListItem
    _skeleton
    color={props.color}
    id={props.id}
    image=""
    title="█████████"
    onPress={() => {}}
  />
);

const styles = createStyle(theme => ({
  image: {
    overflow: 'hidden',
    resizeMode: 'cover',
    width: '100%',
    aspectRatio: 17 / 25,
    borderRadius: 2,
  },
  text: {
    marginTop: theme.spacing(1.5),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'center',
  },
}));

export default MovieListItem;
