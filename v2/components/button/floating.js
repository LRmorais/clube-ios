import React from 'react';
import {TouchableHighlight, View, Text} from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../icons';
import createStyle from '../../utils/style';

const FloatingButton = props => {
  const propsByTextSize = {
    smaller: {
      iconSize: 14,
      textStyle: styles.textSmaller,
    },
    small: {
      iconSize: 16,
      textStyle: styles.textSmall,
    },
    medium: {
      iconSize: 17,
      textStyle: styles.textMedium,
    },
  }[props.textSize];

  return (
    <View
      style={[styles.container, props.stretch && styles.containerStretch]}
      pointerEvents={props.onPress ? 'auto' : 'none'}>
      <TouchableHighlight
        style={styles.touchable}
        underlayColor={props.colors.shadow}
        activeOpacity={props.onPress ? 0.9 : 1}
        onPress={props.onPress}>
        <View
          style={[
            styles.touchableContent,
            {backgroundColor: props.colors.main},
          ]}>
          {props.icon && (
            <Icon
              style={[styles.icon, {color: props.colors.text}]}
              id={props.icon}
              size={propsByTextSize.iconSize}
            />
          )}
          {props.text && (
            <Text
              style={[
                styles.text,
                props.alignIconLeft && styles.textFill,
                propsByTextSize.textStyle,
                {color: props.colors.text},
              ]}>
              {props.text.toUpperCase()}
            </Text>
          )}
        </View>
      </TouchableHighlight>
      <View style={[styles.shadow, {backgroundColor: props.colors.shadow}]} />
    </View>
  );
};

FloatingButton.propTypes = {
  alignIconLeft: PropTypes.bool,
  colors: PropTypes.shape({
    main: PropTypes.string.isRequired,
    shadow: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  icon: PropTypes.string,
  onPress: PropTypes.func,
  stretch: PropTypes.bool,
  text: PropTypes.string,
  textSize: PropTypes.oneOf(['smaller', 'small', 'medium']),
};

FloatingButton.defaultProps = {
  alignIconLeft: false,
  stretch: true,
  textSize: 'medium',
};

const styles = createStyle(theme => ({
  container: {
    position: 'relative',
  },
  containerStretch: {
    flex: 1,
  },
  touchable: {
    borderRadius: 2,
  },
  touchableContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderRadius: 2,
  },
  icon: {
    marginRight: theme.spacing(1.5),
  },
  text: {
    fontFamily: theme.typography.fontFamily.bold,
    textAlign: 'center',
  },
  textFill: {
    flex: 1,
  },
  textSmaller: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(11),
  },
  textSmall: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
  textMedium: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 2,
    transform: [{translateX: 4}, {translateY: 4}],
    zIndex: -1,
  },
}));

export default FloatingButton;
