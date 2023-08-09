import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import createStyle from '../../utils/style';

const ProgressWithMessage = (props) => (
  <TouchableOpacity
    style={[
      styles.container,
      { backgroundColor: props.color.background },
    ]}
    activeOpacity={props.onPress ? .75 : 1}
    onPress={props.onPress}
  >
    <View style={[
      styles.progress,
      {
        width: `${props.progress * 100}%`,
        backgroundColor: props.color.progress,
      },
    ]} />
    <Text numberOfLines={2} style={[
      styles.message,
      { color: props.color.text },
    ]}>
      {props.children}
    </Text>
  </TouchableOpacity>
);

ProgressWithMessage.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.shape({
    background: PropTypes.string,
    progress: PropTypes.string,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onPress: PropTypes.func,
  progress: PropTypes.number.isRequired,
};

const styles = createStyle((theme) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: theme.spacing(6.5),
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
  },
  message: {
    padding: theme.spacing(3),
    fontFamily: theme.typography.fontFamily.different,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12.3),
    textAlign: 'center',
    height: 100,
    marginTop: theme.spacing(4),
  },
}));

export default ProgressWithMessage;
