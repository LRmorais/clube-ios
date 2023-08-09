import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const Divider = (props) => (
  <View style={{
    width: '100%',
    height: 1,
    backgroundColor: props.color,
    opacity: .1,
  }} />
);

Divider.propTypes = {
  color: PropTypes.string,
};

Divider.defaultProps = {
  color: '#000000',
};

export default Divider;
