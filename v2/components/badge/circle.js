import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import createStyle from '../../utils/style';
import { max99 } from '../../utils/number';

const CircleBadge = (props) => {
  const propsBySize = {
    big: {
      containerStyle: styles.containerBig,
      textStyle: styles.textBig,
    },
    small: {
      containerStyle: styles.containerSmall,
      textStyle: styles.textSmall,
    },
  }[props.size];
  const styleByAlign = {
    top: styles.alignTop,
    center: styles.alignCenter,
    bottom: styles.alignBottom,
  }[props.align];

  return (
    <View style={styles.outerContainer}>
    <View style={[
      styles.container,
      propsBySize.containerStyle,
      styleByAlign,
      { backgroundColor: props.color.background },
    ]}>
      <Text
        style={[
          styles.text,
          propsBySize.textStyle,
          { color: props.color.text },
        ]}
        numberOfLines={1}
        ellipsizeMode="clip"
      >
        {max99(props.count)}
      </Text>
    </View>
    </View>
  );
};

CircleBadge.propTypes = {
  align: PropTypes.oneOf(['top', 'center', 'bottom']),
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  count: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['big', 'small']),
};

CircleBadge.defaultProps = {
  align: 'center',
  size: 'big',
};

const styles = createStyle((theme) => ({
  outerContainer: {
    height: '100%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing(.5),
  },
  containerBig: {
    minWidth: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: theme.spacing(2.5),
  },
  containerSmall: {
    minWidth: theme.spacing(2),
    height: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  alignTop: {
    alignSelf: 'flex-start',
  },
  alignCenter: {
    alignSelf: 'center',
  },
  alignBottom: {
    alignSelf: 'flex-end',
  },
  text: {
    fontFamily: theme.typography.fontFamily.bold,
  },
  textBig: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
  },
  textSmall: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(11),
  },
}));

export default CircleBadge;
