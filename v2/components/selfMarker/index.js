import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import createStyle, { theme } from '../../utils/style';

const SelfMarker = (props) => (
  <View style={[
    styles.outerBall,
    { backgroundColor: props.color.outerBall + '33' }
  ]}>
    <View style={[
      styles.innerBall,
      {
        backgroundColor: props.color.innerBall,
        borderColor: props.color.innerBorder,
      },
    ]} />
  </View>
);

SelfMarker.propTypes = {
  color: PropTypes.shape({
    innerBall: PropTypes.string.isRequired,
    innerBorder: PropTypes.string.isRequired,
    outerBall: PropTypes.string.isRequired,
  }).isRequired,
};

SelfMarker.SIZE = theme.spacing(4);

const styles = createStyle({
  outerBall: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SelfMarker.SIZE,
    height: SelfMarker.SIZE,
    borderRadius: SelfMarker.SIZE / 2,
  },
  innerBall: {
    width: SelfMarker.SIZE / 2,
    height: SelfMarker.SIZE / 2,
    borderWidth: 1.5,
    borderRadius: SelfMarker.SIZE / 4,
  },
});

export default SelfMarker;
