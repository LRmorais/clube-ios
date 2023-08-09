import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import createStyle from '../../utils/style';

const Title = props => {
  const propsByTextSize = {
    medium: {
      style: styles.textMedium,
    },
    small: {
      style: styles.textSmall,
    },
    large: {
      style: styles.textLarge,
    },
  }[props.textSize];

  const propsByTextDecoration = {
    toUpperCase: {
      style: styles.upperCase,
    },
  }[props.decoration];

  return (
    <TouchableOpacity
      style={props.bottomSpacing && styles.bottomSpacing}
      activeOpacity={props.onPress ? 0.75 : 1}
      onPress={props.onPress}>
      <Text
        style={[
          styles.text,
          propsByTextSize.style,
          propsByTextDecoration,
          props?.style,
          {color: props.color},
        ]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

Title.propTypes = {
  bottomSpacing: PropTypes.bool,
  color: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  textSize: PropTypes.oneOf(['medium', 'small', 'large']),
  style: PropTypes.object,
};

Title.defaultProps = {
  bottomSpacing: false,
  textSize: 'medium',
};

const styles = createStyle(theme => ({
  text: {
    fontFamily: theme.typography.fontFamily.bold,
  },
  textMedium: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
  },
  textSmall: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
  textLarge: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(26),
  },
  bottomSpacing: {
    marginBottom: theme.spacing(2),
  },
  upperCase: {
    textTransform: 'uppercase',
  },
}));

export default Title;
