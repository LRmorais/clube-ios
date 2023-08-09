import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import createStyle from '../../utils/style';

const Radio = (props) => {
  const outerBallColor = (
    props.checked
      ? props.color.defaultSelected || props.color.default
      : props.color.default
  );
  const textColor = (
    props.checked
      ? props.color.textSelected || props.color.text
      : props.color.text
  );

  function handlePress() {
    props.onChange(props.value);
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={.75}
      onPress={handlePress}
    >
      <View style={[
        styles.outerBall,
        { borderColor: outerBallColor },
      ]}>
        {props.checked && (
          <View style={[
            styles.innerBall,
            { backgroundColor: props.color.innerBall },
          ]} />
        )}
      </View>
      {props.label && (
        <Text style={[
          styles.label,
          { color: textColor },
        ]}>
          {props.label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

Radio.propTypes = {
  checked: PropTypes.bool,
  color: PropTypes.shape({
    default: PropTypes.string.isRequired,
    defaultSelected: PropTypes.string,
    innerBall: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    textSelected: PropTypes.string,
  }).isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

Radio.defaultProps = {
  checked: true,
};

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerBall: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 18,
    height: 18,
    borderWidth: 2,
    borderRadius: 9,
  },
  innerBall: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    marginLeft: theme.spacing(1.5),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
  },
}));

export default Radio;
