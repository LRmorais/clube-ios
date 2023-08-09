import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, Animated, Easing, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import PaddingContainer from '../paddingContainer';
import Icon from '../icons';
import createStyle from '../../utils/style';

const AccordionItem = (props) => {
  const toValue = props.link ? 1 : (props.open ? 1 : 0);
  const animation = useRef(new Animated.Value(toValue));
  const [titleHeight, setTitleHeight] = useState();
  const [contentHeight, setContentHeight] = useState(0);
  const activeOpacity = props.onPress ? .75 : 1;

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue,
      easing: Easing.cubic,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [props.open]);

  function handleTitleLayout(e) {
    setTitleHeight(e.nativeEvent.layout.height);
  }

  function handleContentLayout(e) {
    setContentHeight(e.nativeEvent.layout.height);
  }

  const height = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  const rotate = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  function Arrow() {
    return (
      <Animated.View style={{ transform: [{ rotate: props.link ? '-90deg' : rotate }]}}>
        <Icon
          id="arrow-down"
          size={14}
          style={{ color: props.color.arrow || props.color.title }}
        />
      </Animated.View>
    );
  }

  return (
    <PaddingContainer style={styles.container}>
      {props.icon && (
        <TouchableOpacity
          style={[
            styles.touchable,
            { height: titleHeight },
          ]}
          activeOpacity={activeOpacity}
          onPress={props.onPress}
        >
          <Icon
            id={props.icon}
            size={18}
            style={[
              styles.icon,
              { color: props.color.icon || props.color.title },
            ]}
          />
        </TouchableOpacity>
      )}
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.touchable}
          activeOpacity={activeOpacity}
          onPress={props.onPress}
        >
          <Text
            style={[
              styles.title,
              { color: props.color.title },
            ]}
            onLayout={handleTitleLayout}
          >
            {props.title}
          </Text>
          {!props.visibleContent && (
            <Arrow />
          )}
        </TouchableOpacity>
        {props.visibleContent && (
          <View>
            {props.visibleContent.content}
            <TouchableOpacity
              style={styles.touchable}
              activeOpacity={activeOpacity}
              onPress={props.onPress}
            >
              <Text style={[
                styles.visibleContentText,
                { color: props.color.icon || props.color.title },
              ]}>
                {props.visibleContent.actionText.toUpperCase()}
              </Text>
              <Arrow />
            </TouchableOpacity>
          </View>
        )}
        <Animated.View style={[
          styles.collapsable,
          !props.link && { height },
        ]}>
          <View
            style={[
              styles.content,
              props.link ? styles.contentPaddingRight : styles.contentNormal,
            ]}
            onLayout={handleContentLayout}
          >
            {
              typeof props.content === 'string'
                ? (
                  <Text style={[
                    styles.contentText,
                    { color: props.color.content },
                  ]}>
                    {props.content}
                  </Text>
                )
                : props.content
            }
          </View>
        </Animated.View>
      </View>
    </PaddingContainer>
  );
};

AccordionItem.propTypes = {
  color: PropTypes.shape({
    arrow: PropTypes.string,
    content: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
  content: PropTypes.node.isRequired,
  icon: PropTypes.string,
  link: PropTypes.bool,
  onPress: PropTypes.func,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  visibleContent: PropTypes.shape({
    actionText: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
  }),
};

AccordionItem.defaultProps = {
  link: false,
};

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: theme.spacing(6),
    paddingVertical: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  innerContainer: {
    flex: 1,
  },
  title: {
    flex: 1,
    marginRight: theme.spacing(2),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.lineHeight.mostCommon,
  },
  visibleContentText: {
    flex: 1,
    marginRight: theme.spacing(2.5),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'right',
  },
  collapsable: {
    overflow: 'hidden',
  },
  content: {
    paddingBottom: theme.spacing(2),
  },
  contentNormal: {
    position: 'absolute',
  },
  contentPaddingRight: {
    paddingRight: theme.spacing(8),
  },
  contentText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
}));

export default AccordionItem;
