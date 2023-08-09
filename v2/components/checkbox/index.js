import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../icons';
import createStyle from '../../utils/style';

const Checkbox = (props) => {
  const propsByChecked = {
    [true]: {
      color: props.color.checked,
    },
    [false]: {
      color: props.color.default,
    },
  }[props.checked];
  const hasHandler = !!props.onChange && !props.readOnly;

  function handlePress() {
    props.onChange(props.value);
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={hasHandler ? .75 : 1}
      onPress={hasHandler ? handlePress : undefined}
    >
      <View style={[
        styles.box,
        { borderColor: propsByChecked.color },
      ]}>
        {props.checked && (
          <Icon
            id="check"
            size={10}
            style={{ color: props.color.icon || props.color.checked }}
          />
        )}
      </View>
      <Text style={[
        styles.text,
        { color: propsByChecked.color },
      ]}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  color: PropTypes.shape({
    checked: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired,
    icon: PropTypes.string,
  }).isRequired,
  label: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

Checkbox.defaultProps = {
  checked: false,
  readOnly: false,
};

const styles = createStyle((theme) => ({
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 18,
    height: 18,
    borderWidth: 2,
    borderRadius: 2,
  },
  text: {
    marginLeft: theme.spacing(2),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: 18,
  },
}));

export default Checkbox;
