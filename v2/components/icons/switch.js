import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';

import CircleIcon, { sizes } from './circle';
import createStyle, { theme } from '../../utils/style';

const SwitchIcon = (props) => {
  const animation = useRef(new Animated.Value(0));
  const index = props.options.findIndex(({ value }) => value === props.value);
  const baseSize = theme.spacing(sizes[props.size]);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: index,
      easing: Easing.in(),
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [props.value]);

  useEffect(() => {
    animation.current.setValue(index);
  }, [props.size]);

  const translateX = animation.current.interpolate({
    inputRange: props.options.map((_, i) => i),
    outputRange: props.options.map((_, i) => i * baseSize),
  });

  function renderItem(option, i) {
    const propsByChecked = {
      [true]: {
        iconColor: props.color.checked,
        opacity: 1,
      },
      [false]: {
        iconColor: props.color.unchecked,
        opacity: .75,
      },
    }[index === i];

    function handlePress() {
      if (props.value !== option.value) props.onChange(option.value);
    }

    return (
      <View
        key={option.value}
        style={{ opacity: propsByChecked.opacity }}
      >
        <CircleIcon
          id={option.icon}
          backgroundColor="transparent"
          iconColor={propsByChecked.iconColor}
          size={props.size}
          onPress={handlePress}
        />
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      {
        width: baseSize * props.options.length,
        height: baseSize,
        borderRadius: baseSize / 2,
        backgroundColor: props.color.background,
      },
    ]}>
      <Animated.View style={[
        styles.highlight,
        {
          width: baseSize,
          height: baseSize,
          borderRadius: baseSize / 2,
          backgroundColor: props.color.highlight,
          transform: [{ translateX }],
        },
      ]} />
      {props.options.map(renderItem)}
    </View>
  );
};

SwitchIcon.propTypes = {
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    checked: PropTypes.string.isRequired,
    highlight: PropTypes.string.isRequired,
    unchecked: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  size: PropTypes.oneOf(Object.keys(sizes)).isRequired,
  value: PropTypes.string.isRequired,
};

const styles = createStyle({
  container: {
    flexDirection: 'row',
    position: 'relative',
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default SwitchIcon;
