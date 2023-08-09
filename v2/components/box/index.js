import React, {useRef, useEffect} from 'react';
import {View, Image, Animated, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import Title from '../title';
import Tabs from '../tabs';
import PaddingContainer from '../paddingContainer';
import createStyle from '../../utils/style';

const Box = props => {
  const animation = useRef(new Animated.Value(0));
  const withTopShadow = ['both', 'top'].includes(props.shadow);
  const withBottomShadow = ['both', 'bottom'].includes(props.shadow);
  const backgroundIsString = typeof props.background === 'string';

  useEffect(() => {
    if (!props.background || backgroundIsString) {
      return;
    }

    Animated.timing(animation.current, {
      toValue: props.background.index,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [props.background && props.background.index]);

  const backgroundColor = props.background
    ? backgroundIsString
      ? props.background
      : props.background.colors.length < 2
      ? props.background.colors[0] || 'white'
      : animation.current.interpolate({
          inputRange: props.background.colors.map((_, i) => i),
          outputRange: props.background.colors,
        })
    : 'white';

  const gutters = {
    [false]: styles.containerPaddingBoth,
    top: styles.containerPaddingBottom,
    bottom: styles.containerPaddingTop,
  }[props.noGutters];

  return (
    <View style={props.fill && styles.outerContainerFill}>
      {withTopShadow && (
        <Image
          style={styles.shadowImage}
          source={require('../../images/vectors/topShadow.png')}
          resizeMode="stretch"
        />
      )}
      <Animated.View
        style={[styles.container, gutters, {backgroundColor, flex: 1}]}>
        {props.title && (
          <PaddingContainer only={props.only}>
            <Title
              color={props.titleColor}
              bottomSpacing={!!props.children}
              decoration="toUpperCase">
              {props.title}
            </Title>
          </PaddingContainer>
        )}
        {props.tabsProps && (
          <Tabs
            fullSize
            noSpace
            {...props.tabsProps}
            bottomSpacing={!!props.children}
          />
        )}
        {props.children}
        {props.action && (
          <PaddingContainer style={styles.bottomContent}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={props.action.onPress}>
              {props.action.text && (
                <Text style={[styles.actionText, {color: props.action.color}]}>
                  {props.action.text.toUpperCase()}
                </Text>
              )}
            </TouchableOpacity>
            {props.extraBottomContent}
          </PaddingContainer>
        )}
      </Animated.View>
      {withBottomShadow && (
        <Image
          style={styles.shadowImage}
          source={require('../../images/vectors/bottomShadow.png')}
          resizeMode="stretch"
        />
      )}
    </View>
  );
};

Box.propTypes = {
  action: PropTypes.shape({
    color: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  }),
  background: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      colors: PropTypes.array,
      index: PropTypes.number,
    }),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  extraBottomContent: PropTypes.node,
  fill: PropTypes.bool,
  noGutters: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['top', 'bottom']),
  ]),
  shadow: PropTypes.oneOf(['both', 'top', 'bottom', 'none']),
  tabsProps: PropTypes.shape(Tabs.propTypes),
  title: PropTypes.string,
  titleColor: (props, propName, componentName) => {
    if (
      props.title &&
      props.title.trim() &&
      typeof props[propName] !== 'string'
    ) {
      return new Error(
        `Invalid prop\`${propName}\` supplied to ${componentName}.`,
      );
    }
  },
};

Box.defaultProps = {
  fill: false,
  noGutters: false,
  shadow: 'none',
};

const styles = createStyle(theme => ({
  outerContainerFill: {
    flex: 1,
  },
  container: {
    flex: 1,
    zIndex: 1,
    paddingBottom: 10,
  },
  shadowImage: {
    width: '100%',
    height: theme.spacing(0.75),
  },
  containerPaddingBoth: {
    paddingVertical: theme.spacing(3),
  },
  containerPaddingTop: {
    paddingTop: theme.spacing(3),
  },
  containerPaddingBottom: {
    paddingBottom: theme.spacing(3),
  },
  bottomContent: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  actionText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
}));

export default Box;
