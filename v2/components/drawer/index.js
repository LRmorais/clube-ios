import React, { useState, useRef, useEffect } from 'react';
import { TouchableWithoutFeedback, View, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';

import createStyle from '../../utils/style';

const Drawer = (props) => {
  const [contentWidth, setContentWidth] = useState(null);
  const animation = useRef(new Animated.Value(0));
  const toValue = props.visible ? 1 : 0;
  const positionFactor = {
    left: 1,
    right: -1,
  }[props.position];

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue,
      easing: Easing.inOut(Easing.cubic),
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [props.visible]);

  function handleClose() {
    if (props.onClose) props.onClose();
  }

  function handleContentLayout(e) {
    setContentWidth(e.nativeEvent.layout.width);
  }

  const opacity = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, .75],
  });

  const translateX = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentWidth * positionFactor],
  });

  return (
    <View
      style={styles.container}
      pointerEvents={props.visible ? 'auto' : 'none'}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View style={[
          styles.mask,
          {
            opacity,
            backgroundColor: props.maskColor,
          },
        ]} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.content,
          {
            left: styles.contentLeft,
            right: styles.contentRight,
          }[props.position],
          { transform: [{ translateX }]},
        ]}
        onLayout={handleContentLayout}
      >
        {props.children}
      </Animated.View>
    </View>
  );
};

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
  maskColor: PropTypes.string.isRequired,
  visible: PropTypes.bool,
};

Drawer.defaultProps = {
  position: 'left',
  visible: false,
};

const styles = createStyle((theme) => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 1000,
    zIndex: 1000,
  },
  mask: {
    flex: 1,
  },
  content: {
    overflow: 'hidden',
    position: 'absolute',
    height: '100%',
  },
  contentLeft: {
    right: '100%',
  },
  contentRight: {
    left: '100%',
  },
}));

export default Drawer;
