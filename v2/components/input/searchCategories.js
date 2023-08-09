import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import CircleIcon, {sizes} from '../icons/circle';
import Icon from 'react-native-vector-icons/FontAwesome';
import createStyle from '../../utils/style';

const iconSize = sizes.small;

const SearchInput = props => (
  <View style={[styles.container, {backgroundColor: props.color.background}]}>
    <CircleIcon
      id="search"
      size="small"
      iconColor={props.color.icon}
      backgroundColor="transparent"
    />
    <TextInput
      {...props}
      style={[styles.input, {color: props.color.text}]}
      placeholderTextColor={props.color.text + '77'}
      ref={props.inputRef}
    />
    <TouchableOpacity>
      <Icon
        onPress={props.press}
        style={styles.cleanIcon}
        color="#c4c4c4"
        name="times-circle"
        size={15}
      />
    </TouchableOpacity>
  </View>
);

SearchInput.propTypes = {
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = createStyle(theme => ({
  container: {
    overflow: 'hidden',
    flexDirection: 'row',
    height: theme.spacing(iconSize),
    borderRadius: theme.spacing(iconSize / 2),
  },
  input: {
    flex: 1,
    height: theme.spacing(iconSize),
    paddingVertical: 0,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(3),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    backgroundColor: 'transparent',
  },
  cleanIcon: {
    paddingVertical: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },
}));

export default SearchInput;
