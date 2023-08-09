import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import createStyle from '../../utils/style';

const TextLabel = (props) => {
  const styles = createStyle((theme) => ({
    text: {
      fontFamily: (props.fontStyleNormal != undefined ?  theme.typography.fontFamily.regular : theme.typography.fontFamily.bold),
    },
    textMedium: {
      fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    },
    textSmall: {
      fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    },
    bottomSpacing: {
      marginBottom: theme.spacing(2),
    },
  }));

  const propsByTextSize = {
    medium: {
      style: styles.textMedium,
    },
    small: {
      style: styles.textSmall,
    },
  }[props.textSize];




  return (
    <TouchableOpacity
      style={props.bottomSpacing && styles.bottomSpacing}
      activeOpacity={props.onPress ? .75 : 1}
      onPress={props.onPress}
    >
      <Text
        style={[
          styles.text,
          propsByTextSize.style,
          props?.style,
          { color: props.color,},
          { textAlign: props.textAlign, }
        ]}
        numberOfLines={props.numberOfLines}
        ellipsizeMode="tail"
      >
        {props.children.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

TextLabel.propTypes = {
  bottomSpacing: PropTypes.bool,
  color: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  textSize: PropTypes.oneOf(['medium', 'small']),
  style: PropTypes.object,
};

TextLabel.defaultProps = {
  bottomSpacing: false,
  textSize: 'medium',
};



export default TextLabel;
