import React from 'react';
import {Animated} from 'react-native';
import PropTypes from 'prop-types';

import mapIdToLetter from '../../defaults/icons/out/ClubeIcons.json';
import {theme} from '../../utils/style';

const Icon = props => (
  <Animated.Text
    style={[
      props?.style,
      {
        fontFamily: 'ClubeIcons',
        fontSize: theme.typography.fontSize.__zeplinSpToPx(props.size),
      },
    ]}>
    {String.fromCharCode(parseInt(mapIdToLetter[props.id].substr(1), 16))}
  </Animated.Text>
);

Icon.propTypes = {
  id: PropTypes.oneOf(Object.keys(mapIdToLetter)).isRequired,
  size: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
};

Icon.defaultProps = {
  size: 14,
};

export default Icon;
