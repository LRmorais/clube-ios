import React, {useState, useRef, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Animated,
  Text,
  Easing,
  TouchableOpacity,
} from 'react-native';

import Box from '../box';
import PaddingContainer from '../paddingContainer';
import createStyle from '../../utils/style';

const FilterBox = props => {
  const [contentHeight, setContentHeight] = useState(null);
  const animation = useRef(new Animated.Value(0));
  const toValue = props.visible ? 1 : 0;

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue,
      easing: Easing.inOut(Easing.cubic),
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [props.visible]);

  function handleClose() {
    if (props.onClose) {
      props.onClose();
    }
  }

  function handleContentLayout(e) {
    setContentHeight(e.nativeEvent.layout.height);
  }

  const opacity = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.75],
  });

  const translateY = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight * -1],
  });

  return (
    <View
      style={[styles.container]}
      pointerEvents={props.visible ? 'auto' : 'none'}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View
          style={[
            styles.mask,
            {
              opacity,
              backgroundColor: props.color.mask,
            },
          ]}
        />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[styles.content, {transform: [{translateY}]}]}
        onLayout={handleContentLayout}>
        <Box>
          <View style={styles.boxChild}>
            <PaddingContainer>
              <View style={styles.header}>
                <Text style={[styles.title, {color: props.color.title}]}>
                  {props.title.toUpperCase()}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    props.handleFilters([]);
                    props.aply();
                  }}>
                  <Text style={[styles.cleanButton]}>Limpar</Text>
                </TouchableOpacity>
                {props.action && (
                  <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={props.action.onPress}>
                    <Text style={[styles.action, {color: props.action.color}]}>
                      {props.action.text.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </PaddingContainer>
            <View
              style={[styles.divider, {backgroundColor: props.color.divider}]}
            />
            <PaddingContainer>{props.children}</PaddingContainer>
          </View>
        </Box>
      </Animated.View>
    </View>
  );
};

const styles = createStyle(theme => ({
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
    width: '100%',
    top: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  boxChild: {
    paddingBottom: theme.spacing(1.5),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
  },
  cleanButton: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    color: '#d73f32',
  },
  action: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
  },
  divider: {
    width: '100%',
    height: 2,
    marginBottom: theme.spacing(3),
  },
}));

export default FilterBox;
