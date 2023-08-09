import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../icons';
import createStyle from '../../utils/style';

const Signet = (props) => (
  <TouchableOpacity
    style={[
      styles.container,
      { backgroundColor: props.color.background },
    ]}
    activeOpacity={props.onPress ? .75 : 1}
    onPress={props.onPress}
  >
    <Icon
      id={props.icon}
      size={24}
      style={{ color: props.color.icon }}
    />
  </TouchableOpacity>
);

Signet.propTypes = {
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

const styles = createStyle((theme) => ({
  container: {
    justifyContent: 'center',
    height: theme.spacing(5.5),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(3.5),
    borderTopLeftRadius: theme.spacing(2.75),
    borderBottomLeftRadius: theme.spacing(2.75),
  },
}));

export default Signet;
