import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import createStyle from '../../utils/style';
import Icon from '../icons';

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
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}
      activeOpacity={props.onPress ? .75 : 1}
      onPress={props.onPress}
    >
      <Icon
        id={props.icon}
        size={10}
        style={{ color: '#ffffff',  marginRight: 10, }}
      />

      <Text
        style={[
          styles.text,
          propsByTextSize.style,
         
          { color: props.color,},
          { textAlign: props.textAlign, },
           
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
