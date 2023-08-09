import React from 'react';
import {TouchableOpacity, Animated, Text, Image} from 'react-native';
import PropTypes from 'prop-types';

import Icon from './index';
import createStyle, {theme} from '../../utils/style';

const CircleIcon = props => {
  const propsBySize = {
    micro: {
      circleStyle: styles.circleMicro,
      labelStyle: styles.labelMicro,
      size: 9,
    },
    mini: {
      circleStyle: styles.circleMini,
      labelStyle: styles.labelMini,
      size: 11,
    },
    small: {
      circleStyle: styles.circleSmall,
      labelStyle: styles.labelSmall,
      size: 14,
    },
    medium: {
      circleStyle: styles.circleMedium,
      labelStyle: styles.labelMedium,
      size: 16.5,
    },
  }[props.size];

  return (
    <TouchableOpacity
      ref={props.iconRef}
      style={[
        styles.container,
        {width: theme.spacing(props.containerWidth) || undefined},
      ]}
      activeOpacity={props.onPress ? 0.75 : 1}
      onPress={props.onPress}>
      <Animated.View
        style={[
          styles.circle,
          propsBySize.circleStyle,
          {backgroundColor: props.backgroundColor},
        ]}>
        {props.showShadow && (
          <Image
            style={styles.shadow}
            source={require('../../images/vectors/circleShadow-5.png')}
          />
        )}
        {!props._skeleton && (
          <Icon
            id={props.id}
            size={propsBySize.size}
            style={{color: props.iconColor}}
          />
        )}
      </Animated.View>
      {props.label && (
        <Text
          style={[
            styles.label,
            propsBySize.labelStyle,
            {color: props.label.color || props.iconColor},
          ]}>
          {props.label.text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export const sizes = {
  micro: 2,
  mini: 2.5,
  small: 4,
  medium: 6,
};

CircleIcon.propTypes = {
  _skeleton: PropTypes.bool,
  backgroundColor: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  containerWidth: PropTypes.number,
  iconColor: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  id: PropTypes.string.isRequired,
  label: PropTypes.shape({
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
  }),
  onPress: PropTypes.func,
  showShadow: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(sizes)),
};

CircleIcon.defaultProps = {
  _skeleton: false,
  showShadow: false,
  size: 'medium',
};

CircleIcon.Skeleton = props => (
  <CircleIcon
    _skeleton
    backgroundColor={props.backgroundColor}
    id={props.id}
    label={{
      text: '████',
      color: props.label.color,
    }}
    size={props.size}
  />
);

const styles = createStyle(theme => {
  const stylesBySize = size => ({
    width: theme.spacing(size),
    height: theme.spacing(size),
    borderRadius: theme.spacing(size / 2),
  });

  return {
    container: {
      alignItems: 'center',
    },
    circle: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    circleMicro: stylesBySize(sizes.micro),
    circleMini: stylesBySize(sizes.mini),
    circleSmall: stylesBySize(sizes.small),
    circleMedium: stylesBySize(sizes.medium),
    shadow: {
      position: 'absolute',
      width: '125%',
      height: '125%',
    },
    label: {
      fontFamily: theme.typography.fontFamily.regular,
      textAlign: 'center',
    },
    labelMicro: {
      marginTop: theme.spacing(0.5),
      fontSize: theme.typography.fontSize.__zeplinSpToPx(9),
    },
    labelMini: {
      marginTop: theme.spacing(0.5),
      fontSize: theme.typography.fontSize.__zeplinSpToPx(10),
    },
    labelSmall: {
      marginTop: theme.spacing(1),
      fontSize: theme.typography.fontSize.__zeplinSpToPx(11),
    },
    labelMedium: {
      marginTop: theme.spacing(1),
      fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    },
  };
});

export default CircleIcon;
