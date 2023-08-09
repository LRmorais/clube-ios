import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import ImageWithLoading from '../imageWithLoading';
import HTMLRenderer from '../htmlRenderer';
import createStyle from '../../utils/style';

const VIPFact = (props) => {
  const propsByLight = {
    [true]: {
      containerStyle: styles.containerLight,
    },
    [false]: {
      containerStyle: styles.containerDark,
    },
  }[props.light];

  return (
    <View style={[
      styles.container,
      propsByLight.containerStyle,
    ]}>
      <ImageWithLoading
        containerStyle={[
          styles.image,
          { backgroundColor: props.color },
        ]}
        source={props.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <HTMLRenderer style={[
          styles.text,
          { color: props.color },
        ]}>
          {props.children}
        </HTMLRenderer>
      </View>
    </View>
  );
};

VIPFact.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  // image: ?
  light: PropTypes.bool,
};

VIPFact.defaultProps = {
  light: true,
};

const styles = createStyle((theme) => ({
  container: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
  },
  containerLight: {
    backgroundColor: 'rgba(255, 255, 255, .3)',
  },
  containerDark: {
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
  image: {
    width: 100,
    height: 110,
  },
  textContainer: {
    flex: 1,
    paddingLeft: theme.spacing(2),
  },
  text: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: 21,
  },
}));

export default VIPFact;
