import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../icons';
import createStyle from '../../utils/style';

const MessageBox = (props) => (
  <TouchableOpacity
    style={[styles.container, {backgroundColor: props.color.background}]}
    activeOpacity={props.onPress ? 0.75 : 1}
    onPress={props.onPress}>
    {props.icon && (
      <Icon
        id={props.icon}
        size={28}
        style={[styles.icon, {color: props.color.icon || props.color.text}]}
      />
    )}
    <Text style={[styles.text, {color: props.color.text}]}>
      {props.children}
    </Text>
  </TouchableOpacity>
);

MessageBox.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    icon: PropTypes.string,
    text: PropTypes.string.isRequired,
  }).isRequired,
  icon: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: 2,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  text: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: 21,
  },
}));

export default MessageBox;
