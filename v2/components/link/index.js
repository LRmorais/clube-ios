import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import createStyle from '../../utils/style';

const Link = (props) => {
  const propsBySize = {
    small: {
      textStyle: styles.textSmall,
    },
  }[props.size];

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={props.onPress}
      style={styles.container}>
      <Text style={[styles.text, propsBySize.textStyle, {color: props.color}]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small']),
};

Link.defaultProps = {
  size: 'small',
};

const styles = createStyle((theme) => ({
  container: {
    marginTop: 10,
  },
  text: {
    fontFamily: theme.typography.fontFamily.regularItalic,
  },
  textSmall: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
}));

export default Link;
