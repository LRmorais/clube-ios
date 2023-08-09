import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { theme } from '../../utils/style';

const Spacer = (props) => (
  <View style={(
    props.fixedSize
      ? { [props.horizontal ? 'width' : 'height']: theme.spacing(props.size) }
      : [
          { flex: theme.spacing(props.size) },
          props.setMinSize && { [props.horizontal ? 'minWidth' : 'minHeight']: theme.spacing(props.size) },
        ]
  )} />
);

Spacer.propTypes = {
  fixedSize: PropTypes.bool,
  horizontal: PropTypes.bool,
  setMinSize: PropTypes.bool,
  size: PropTypes.number.isRequired,
};

Spacer.defaultProps = {
  fixedSize: false,
  horizontal: false,
  setMinSize: false,
};

export default Spacer;
