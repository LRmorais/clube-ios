import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../icons';
import createStyle from '../../utils/style';

const LabeledCheckbox = props => {
  const hasHandler = typeof props.onChange === 'function';
  const propsByChecked = {
    [true]: {
      backgroundColor: props.color.highlight,
      color: props.color.croppedText || props.color.unchecked,
    },
    [false]: {
      backgroundColor: props.color.unchecked,
      color: props.color.highlight,
    },
  }[props.checked];

  function handlePress() {
    props.onChange(props.value);
  }

  return (
    <TouchableOpacity
      activeOpacity={hasHandler ? 0.75 : 1}
      onPress={hasHandler ? handlePress : undefined}>
      <View
        style={[
          styles.view,
          props.bordered && styles.viewBorder,
          !props.showChecked && styles.viewNormal,
          props.showChecked && styles.viewChecked,
          {
            backgroundColor: propsByChecked.backgroundColor,
            borderColor: hasHandler
              ? props.color.highlight
              : propsByChecked.backgroundColor,
          },
        ]}>
        <Text
          style={[
            styles.text,
            props.textBold ? styles.textBold : styles.textRegular,
            {color: propsByChecked.color},
          ]}>
          {props.text}
        </Text>
        {props.showChecked && (
          <View
            style={[
              styles.checkedContainer,
              {
                backgroundColor: props.checked
                  ? propsByChecked.color
                  : 'transparent',
                borderWidth: props.checked ? 0 : 2,
                borderColor: propsByChecked.color,
              },
            ]}>
            {props.checked && (
              <Icon
                id="close"
                size={8}
                style={{color: propsByChecked.backgroundColor}}
              />
            )}
          </View>
        )}
        {props.showCaret && !props.showChecked && (
          <Icon
            id="caret-down"
            size={4.5}
            style={[styles.caret, {color: propsByChecked.color}]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

LabeledCheckbox.propTypes = {
  bordered: PropTypes.bool,
  checked: PropTypes.bool,
  color: PropTypes.shape({
    croppedText: PropTypes.string,
    highlight: PropTypes.string.isRequired,
    unchecked: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func,
  showCaret: PropTypes.bool,
  showChecked: PropTypes.bool,
  text: PropTypes.string.isRequired,
  textBold: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

LabeledCheckbox.defaultProps = {
  bordered: true,
  checked: false,
  showCaret: false,
  showChecked: false,
  textBold: false,
};

const styles = createStyle(theme => ({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 30,
    height: 30,
    paddingLeft: theme.spacing(1.5),
    textAlign: 'center',
    borderRadius: 15,
  },
  viewNormal: {
    paddingRight: theme.spacing(1.5),
  },
  viewChecked: {
    paddingRight: 6,
  },
  viewBorder: {
    borderWidth: 1,
  },
  text: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
  textRegular: {
    fontFamily: theme.typography.fontFamily.regular,
  },
  textBold: {
    fontFamily: theme.typography.fontFamily.bold,
  },
  checkedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 18,
    height: 18,
    marginLeft: theme.spacing(0.5),
    borderRadius: 9,
  },
  caret: {
    marginLeft: theme.spacing(1),
  },
}));

export default LabeledCheckbox;
