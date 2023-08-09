import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Clipboard from '@react-native-clipboard/clipboard';

import createStyle, { theme } from '../../utils/style';
import { useLayoutContext } from '../../hocs/layout';

const CodeDiscountCard = (props) => {
  const {
    screenWidth,
  } = useLayoutContext();

  function handleCopyToClip() {
    Clipboard.setString(props.text.code);
  }

  return (
    <View style={[
      styles.container,
      {
        width: screenWidth - theme.spacing(3 * 2),
        backgroundColor: props.backgroundColor,
      },
    ]}>
      <Text style={[
        styles.topMessage,
        { color: props.color.message },
      ]}>
        {props.text.topMessage}
      </Text>
      <TouchableOpacity
        activeOpacity={.75}
        onPress={handleCopyToClip}
      >
        <Text style={[
          styles.code,
          { color: props.color.code || props.color.message },
        ]}>
          {props.text.code}
        </Text>
      </TouchableOpacity>
      <Text style={[
        styles.bottomMessage,
        { color: props.color.message },
      ]}>
        {props.text.bottomMessage}
      </Text>
    </View>
  );
};

CodeDiscountCard.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.shape({
    code: PropTypes.string,
    message: PropTypes.string.isRequired,
  }).isRequired,
  text: PropTypes.shape({
    bottomMessage: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    topMessage: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = createStyle((theme) => ({
  container: {
    justifyContent: 'space-between',
    aspectRatio: 9 / 5,
    paddingVertical: theme.spacing(3),
    paddingHorizontal: theme.spacing(4),
    borderRadius: 8,
  },
  topMessage: {
    opacity: .75,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'center',
  },
  code: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(32),
    textAlign: 'center',
  },
  bottomMessage: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'center',
  },
}));

export default CodeDiscountCard;
