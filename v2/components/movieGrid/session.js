import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

import createStyle from '../../utils/style';

const MovieGridItemSession = props => {
  const propsByVariation = {
    dubbed: {
      text: 'DUB',
      colorProps: props.color.dubbed,
    },
    subtitled: {
      text: 'LEG',
      colorProps: props.color.subtitled,
    },
  }[props.variation];

  return (
    <View style={styles.container}>
      <Text style={[styles.time, {color: props.color.time}]}>{props.time}</Text>
      <Text
        style={[
          styles.box,
          {
            color: props.color.theater.text,
            backgroundColor: props.color.theater.background,
          },
        ]}>
        {props.theater}
      </Text>
      <Text
        style={[
          styles.box,
          {
            color: propsByVariation.colorProps.text,
            backgroundColor: propsByVariation.colorProps.background,
          },
        ]}>
        {propsByVariation.text}
      </Text>
    </View>
  );
};

MovieGridItemSession.propTypes = {
  color: PropTypes.shape({
    dubbed: PropTypes.shape({
      background: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    subtitled: PropTypes.shape({
      background: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    theater: PropTypes.shape({
      background: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  time: PropTypes.string.isRequired,
  theater: PropTypes.string.isRequired,
  variation: PropTypes.oneOf(['dubbed', 'subtitled']).isRequired,
};

const styles = createStyle(theme => ({
  container: {
    alignItems: 'flex-start',
    paddingVertical: theme.spacing(0.5),
  },
  time: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
  },
  box: {
    marginTop: theme.spacing(0.5),
    paddingVertical: theme.spacing(1),
    paddingHorizontal: theme.spacing(1.5),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    borderRadius: 4,
  },
}));

export default MovieGridItemSession;
