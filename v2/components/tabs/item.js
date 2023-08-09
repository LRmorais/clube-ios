import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, View, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../icons';
import CircleBadge from '../badge/circle';
import createStyle from '../../utils/style';

const TabsItem = (props) => {
  const toValue = props.selected ? 1 : 0;
  const animation = useRef(new Animated.Value(toValue));

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue,
      easing: Easing.quad,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [props.selected]);

  function handlePress() {
    if (props.selected) return;

    props.onPress(props.value);
  }

  const opacity = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [.5, 1],
  });

  const width = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const propsByFontSize = {
    small: {
      iconWithTextSize: 13,
      iconAloneSize: 20,
      textStyle: styles.textSmall,
    },
    medium: {
      iconWithTextSize: 14,
      iconAloneSize: 24,
      textStyle: styles.textMedium,
    },
  }[props.fontSize];

  return (
    <TouchableOpacity
      style={[
        props.stretch && styles.containerStretch,
        !props.noTopGutter && styles.containerTopGutter,
      ]}
      activeOpacity={props.selected ? 1 : .75}
      onPress={handlePress}
    >
      <View style={styles.innerContainer}>
        {props.icon && (
          <Icon
            id={props.icon}
            size={(
              props.text
                ? propsByFontSize.iconWithTextSize
                : propsByFontSize.iconAloneSize
            )}
            style={[
              props.text && styles.iconMargin,
              {
                opacity,
                color: props.color,
              },
            ]}
          />
        )}
        {props.text && (
          <Animated.Text style={[
            styles.text,
            propsByFontSize.textStyle,
            {
              opacity,
              color: props.color,
            },
          ]}>
            {props.text.toUpperCase()}
          </Animated.Text>
        )}
        {props.badge && (
          <CircleBadge {...props.badge} />
        )}
      </View>
      <Animated.View style={[
        styles.bar,
        {
          width,
          backgroundColor: props.color,
        },
      ]} />
    </TouchableOpacity>
  );
};

TabsItem.propTypes = {
  bagde: PropTypes.shape(CircleBadge.propTypes),
  color: PropTypes.string.isRequired,
  icon: PropTypes.string,
  noTopGutter: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  text: PropTypes.string,
  value: PropTypes.string.isRequired,
};

const styles = createStyle((theme) => ({
  containerStretch: {
    flex: 1,
  },
  containerTopGutter: {
    paddingTop: theme.spacing(1) + 3,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconMargin: {
    marginRight: theme.spacing(1),
  },
  text: {
    fontFamily: theme.typography.fontFamily.bold,
  },
  textSmall: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(21),
  },
  textMedium: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(24),
  },
  bar: {
    alignSelf: 'center',
    height: 3,
    marginTop: theme.spacing(1),
  },
}));

export default TabsItem;
