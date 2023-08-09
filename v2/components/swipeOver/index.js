import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Animated, PanResponder } from 'react-native';

import { useLayoutContext } from '../../hocs/layout';

function noop() {}

const SwipeOver = (props) => {
  const {
    screenHeight,
    headerBarHeight,
  } = useLayoutContext();
  const absoluteTop = props.subtractHeaderBar ? headerBarHeight : 0;
  const freeAreaHeight = screenHeight - props.exposedHeight;
  const toggleThreshold = (freeAreaHeight - absoluteTop) / 7;
  const [expandedPosition, setExpandedPosition] = useState(0);
  const [collapsedPosition] = useState(freeAreaHeight);
  const [contentHeight, setContentHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [lastSwipeDirection, setLastSwipeDirection] = useState(null);
  const currentPosition = expanded ? expandedPosition : collapsedPosition;
  const position = useRef(new Animated.Value(currentPosition));
  const positionAtStart = useRef(position.current);
  const lastSwipeDirectionValidUntil = useRef(Date.now());
  const maxContentTop = screenHeight - contentHeight;
  const swipeConfig = {
    directionalOffsetThreshold: 80,
    gestureIsClickThreshold: 2.5,
    idleTimeout: 350,
    velocityThreshold: 0.3,
    ...props.swipeConfig,
  };
  const swipeDirections = {
    SWIPE_DOWN: 'SWIPE_DOWN',
    SWIPE_UP: 'SWIPE_UP',
  };

  function gestureIsClick(gesture) {
    let threshold = swipeConfig.gestureIsClickThreshold;
    return Math.abs(gesture.dx) < threshold && Math.abs(gesture.dy) < threshold;
  }

  function isValidSwipe(gesture) {
    return Math.abs(gesture.vy) > swipeConfig.velocityThreshold && Math.abs(gesture.dx) < swipeConfig.directionalOffsetThreshold;
  }

  function getSwipeDirection(gesture) {
    if (!isValidSwipe(gesture)) return null;
    return gesture.dy > 0 ? swipeDirections.SWIPE_DOWN : swipeDirections.SWIPE_UP;
  }

  function updateLastSwipeDirectionValidUntil() {
    lastSwipeDirectionValidUntil.current = Date.now() + swipeConfig.idleTimeout;
  }

  function handleSwipeDown() {
    setLastSwipeDirection(swipeDirections.SWIPE_DOWN);
    updateLastSwipeDirectionValidUntil();
  }

  function handleSwipeUp() {
    setLastSwipeDirection(swipeDirections.SWIPE_UP);
    updateLastSwipeDirectionValidUntil();
  }

  function expand() {
    setExpanded(true);
    transitionTo(expandedPosition, props.onExpanded);
  }

  function collapse() {
    setExpanded(false);
    transitionTo(collapsedPosition, props.onCollapsed);
  }

  function resetPosition() {
    Animated.spring(position.current, {
      ...props.springConfig,
      toValue: currentPosition,
    }).start();
  }

  function defineLastMovement(gesture) {
    if (goingToExpand(gesture)) return expand();
    if (goingToCollapse(gesture)) return collapse();
    resetPosition();
  }

  function stopAndClean(gesture) {
    position.current.stopAnimation();
    position.current.removeAllListeners();
    if (gesture) defineLastMovement(gesture);
  }

  function goingToExpand(gesture) {
    if (lastSwipeDirection === swipeDirections.SWIPE_UP && lastSwipeDirectionIsValid()) return true;
    return !expanded && gesture.dy < -toggleThreshold;
  }

  function goingToCollapse(gesture) {
    if (lastSwipeDirection === swipeDirections.SWIPE_DOWN && lastSwipeDirectionIsValid()) return true;
    return expanded && gesture.dy > toggleThreshold;
  }

  function lastSwipeDirectionIsValid() {
    return lastSwipeDirectionValidUntil.current >= Date.now();
  }

  function transitionTo(toValue, callback) {
    Animated.spring(position.current, {
      ...props.springConfig,
      toValue,
    }).start();
    callback();
  }

  function handleStartShouldSetPanResponder(e, gesture) {
    return e.nativeEvent.touches.length === 1 && !gestureIsClick(gesture);
  }

  function handleMoveShouldSetPanResponder(e, gesture) {
    return e.nativeEvent.touches.length === 1 && !gestureIsClick(gesture);
  }

  function handlePanResponderGrant() {
    positionAtStart.current = position.current._value;
  }

  function handlePanResponderMove(e, gesture) {
    let correctPosition = positionAtStart.current <= 0 ? positionAtStart.current : currentPosition;
    position.current.setValue(Math.min(freeAreaHeight, Math.max(correctPosition + gesture.dy, maxContentTop)));
    let swipeDirection = getSwipeDirection(gesture);
    ({
      [swipeDirections.SWIPE_DOWN]: handleSwipeDown,
      [swipeDirections.SWIPE_UP]: handleSwipeUp,
      [null]: noop,
    })[swipeDirection]();
  }

  function handleFinish(e, gesture) {
    if (position.current._value > 0) return defineLastMovement(gesture);

    if (Math.abs(gesture.vy) < swipeConfig.velocityThreshold) return;

    position.current.addListener(({ value }) => {
      if (value <= maxContentTop) stopAndClean();
      if (value >= 0) stopAndClean(gesture);
    });
    Animated.decay(position.current, {
      deceleration: .995,
      velocity: gesture.vy,
    }).start(() => position.current.removeAllListeners());
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: handleStartShouldSetPanResponder,
    onMoveShouldSetPanResponder: handleMoveShouldSetPanResponder,
    onPanResponderGrant: handlePanResponderGrant,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: handleFinish,
    onPanResponderTerminate: handleFinish,
  });

  function handleLayout(e) {
    let { height } = e.nativeEvent.layout;
    setContentHeight(height);
    setExpandedPosition(Math.max(0, screenHeight - height) + absoluteTop);
  }

  const top = (
    contentHeight === 0
      ? freeAreaHeight
      : position.current.interpolate({
        inputRange: [maxContentTop, freeAreaHeight],
        outputRange: [maxContentTop, freeAreaHeight],
        extrapolateLeft: 'clamp',
      })
  );

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
      {...panResponder.panHandlers}
      onLayout={handleLayout}
    >
      {props.children}
    </Animated.View>
  );
}

SwipeOver.propTypes = {
  children: PropTypes.node.isRequired,
  exposedHeight: PropTypes.number,
  onCollapsed: PropTypes.func,
  onExpanded: PropTypes.func,
  springConfig: PropTypes.object,
  subtractHeaderBar: PropTypes.bool,
  swipeConfig: PropTypes.shape({
    directionalOffsetThreshold: PropTypes.number,
    gestureIsClickThreshold: PropTypes.number,
    idleTimeout: PropTypes.number,
    velocityThreshold: PropTypes.number,
  }),
};

SwipeOver.defaultProps = {
  exposedHeight: 50,
  onCollapsed: noop,
  onExpanded: noop,
  springConfig: {},
  subtractHeaderBar: false,
  swipeConfig: {},
};

export default SwipeOver;
