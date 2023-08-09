import React from 'react';
import { View, Text, Image, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import PropTypes from 'prop-types';

import CommonButton from '../button/common';
import createStyle from '../../utils/style';
import { useLayoutContext } from '../../hocs/layout';

const ImageEmpty = (props) => {
  const {
    screenWidth,
    screenHeight,
    headerBarHeight,
  } = useLayoutContext();
  const imageInfo = props.imageProps.source && Image.resolveAssetSource(props.imageProps.source);
  const statusBarHeight = {
    ios: getStatusBarHeight(),
    android: 0,
  }[Platform.OS];
  const propsByFontSize = {
    medium: {
      introTextStyle: styles.introTextMedium,
      mainTextStyle: styles.mainTextMedium,
    },
    big: {
      introTextStyle: styles.introTextBig,
      mainTextStyle: styles.mainTextBig,
    },
  }[props.fontSize];

  return (
    <View
      style={[
        styles.container,
        {
          onlyLacking: { flex: 1 },
          wholeScreen: { height: screenHeight - statusBarHeight - (
            props.substractHeaderBar ? headerBarHeight : 0
          )},
        }[props.fillMode],
        { backgroundColor: props.backgroundColor },
      ]}
      onLayout={props.onLayout}
    >
      {props.imageProps.source && (
        <FastImage
          style={[
            styles.image,
            {
              width: screenWidth,
              height: (imageInfo.height / imageInfo.width) * screenWidth,
              [props.imageProps.align]: 0,
            },
          ]}
          source={props.imageProps.source}
          resizeMode="contain"
        />
      )}
      {props.introInfo && (
        <Text style={[
          styles.introText,
          propsByFontSize.introTextStyle,
          { color: props.introInfo.color },
        ]}>
          {props.introInfo.text}
        </Text>
      )}
      {props.mainInfo && (
        <Text style={[
          styles.mainText,
          propsByFontSize.mainTextStyle,
          { color: props.mainInfo.color },
        ]}>
          {props.mainInfo.text}
        </Text>
      )}
      {props.action && (
        <CommonButton {...props.action} />
      )}
      {props.bottomContent && props.bottomContent}
    </View>
  );
};

ImageEmpty.propTypes = {
  action: PropTypes.object,
  backgroundColor: PropTypes.string.isRequired,
  bottomContent: PropTypes.node,
  fillMode: PropTypes.oneOf(['onlyLacking', 'wholeScreen']),
  fontSize: PropTypes.oneOf(['medium', 'big']),
  imageProps: PropTypes.shape({
    align: PropTypes.oneOf(['top', 'bottom']),
    // source: ?
  }),
  introInfo: PropTypes.shape({
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  mainInfo: PropTypes.shape({
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  onLayout: PropTypes.func,
  substractHeaderBar: PropTypes.bool,
};

ImageEmpty.defaultProps = {
  fillMode: 'onlyLacking',
  fontSize: 'medium',
  imageProps: {
    align: 'top',
  },
  substractHeaderBar: false,
};

const styles = createStyle((theme) => ({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    width: '100%',
    paddingTop: theme.spacing(4),
    paddingHorizontal: theme.spacing(5),
    paddingBottom: theme.spacing(6),
    zIndex: -1,
  },
  image: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  introText: {
    opacity: .75,
    marginBottom: theme.spacing(1),
    fontFamily: theme.typography.fontFamily.regular,
    textAlign: 'center',
  },
  introTextMedium: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
  introTextBig: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
  },
  mainText: {
    marginBottom: theme.spacing(1.5),
    fontFamily: theme.typography.fontFamily.bold,
    textAlign: 'center',
  },
  mainTextMedium: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(18),
  },
  mainTextBig: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(42),
  },
}));

export default ImageEmpty;
