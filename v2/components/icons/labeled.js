import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import Icon from './index';
import createStyle from '../../utils/style';

const LabeledIcon = (props) => {
  const propsBySize = {
    small: {
      iconStyle: props.horizontal ? styles.iconSmallHorizontal : styles.iconSmall,
      iconSize: 10,
      labelStyle: styles.labelSmall,
    },
    medium: {
      iconStyle: props.horizontal ? styles.iconMediumHorizontal : styles.iconMedium,
      iconSize: 12,
      labelStyle: styles.labelMedium,
    },
    bigSpecial: {
      iconStyle: props.horizontal ? styles.iconBigSpecialHorizontal : styles.iconBigSpecial,
      iconSize: 18,
      labelStyle: styles.labelBigSpecial,
    },
  }[props.size];

  return (
    <TouchableOpacity
      style={props.horizontal && styles.containerHorizontal}
      activeOpacity={props.onPress ? .75 : 1}
      onPress={props.onPress}
    >
      <Icon
        style={[
          styles.alignCenter,
          propsBySize.iconStyle,
          { color: props.color.icon },
        ]}
        id={props.id}
        size={propsBySize.iconSize}
      />
      <Text style={[
        styles.alignCenter,
        propsBySize.labelStyle,
        { color: props.color.label },
      ]}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

LabeledIcon.propTypes = {
  color: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  horizontal: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'bigSpecial']),
};

LabeledIcon.defaultProps = {
  horizontal: false,
  size: 'small',
};

const styles = createStyle((theme) => ({
  containerHorizontal: {
    flexDirection: 'row',
  },
  alignCenter: {
    textAlign: 'center',
  },
  iconSmall: {
    marginBottom: theme.spacing(.5),
  },
  iconSmallHorizontal: {
    marginRight: theme.spacing(.5),
  },
  iconMedium: {
    marginBottom: theme.spacing(.5),
  },
  iconMediumHorizontal: {
    marginRight: theme.spacing(.5),
  },
  iconBigSpecial: {
    marginBottom: theme.spacing(1),
  },
  iconBigSpecialHorizontal: {
    marginRight: theme.spacing(1),
  },
  labelSmall: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(10),
    lineHeight: 13,
  },
  labelMedium: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(11.4),
    lineHeight: 14,
  },
  labelBigSpecial: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(10),
    lineHeight: 14,
  },
}));

export default LabeledIcon;
