import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import PropTypes from 'prop-types';

import createStyle from '../../utils/style';

const CommonButton = props => {
  const propsBySize = {
    medium: {
      text: props.text.toUpperCase(),
      textStyle: styles.textMedium,
    },
    small: {
      text: props.text,
      textStyle: styles.textSmall,
    },
  }[props.size];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        props?.styles,
        {
          medium: styles.containerMedium,
          small: styles.containerSmall,
        }[props.size],
        {backgroundColor: props.backgroundColor},
      ]}
      activeOpacity={0.75}
      onPress={props.onPress}>
      <Text
        style={[styles.text, propsBySize.textStyle, {color: props.textColor}]}>
        {propsBySize.text}
      </Text>
    </TouchableOpacity>
  );
};

CommonButton.propTypes = {
  backgroundColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['medium', 'small']),
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

CommonButton.defaultProps = {
  size: 'medium',
};

const styles = createStyle(theme => ({
  container: {
    justifyContent: 'center',
    // paddingHorizontal: theme.spacing(18),
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    borderRadius: theme.spacing(18),
    borderWidth: 1,
    borderColor: '#30287b',
    // width: '90%',
  },
  containerMedium: {
    height: theme.spacing(5),
  },
  containerSmall: {
    height: theme.spacing(5),
  },
  text: {
    // paddingLeft: theme.spacing(16),
    textAlign: 'center',
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.lineHeight.thin,
  },
  textMedium: {
    fontFamily: theme.typography.fontFamily.bold,
  },
  textSmall: {
    fontFamily: theme.typography.fontFamily.regular,
  },
}));

export default CommonButton;
