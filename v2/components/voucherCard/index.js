import React from 'react';
import {TouchableOpacity, Text, Platform, ToastAndroid} from 'react-native';
import PropTypes from 'prop-types';
// import Clipboard from '@react-native-clipboard/clipboard';

import createStyle from '../../utils/style';

const VoucherCard = props => {
  function copyToClipboard() {
    // Clipboard.setString(props.text.copyable || props.text.main);
    if (Platform.OS === 'android') {
      ToastAndroid.show(
        'Copiado para área de transferência',
        ToastAndroid.SHORT,
      );
    }
  }

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: props.color.background}]}
      activeOpacity={props.onPress && !props.loading ? 0.9 : 1}
      underlayColor={props.color.background}
      onPress={props.onPress}>
      <Text style={[styles.textTop, {color: props.color.text}]}>
        {props.text.top}
      </Text>
      <TouchableOpacity activeOpacity={0.75} onPress={copyToClipboard}>
        <Text style={[styles.textMain, {color: props.color.text}]}>
          {props.text.main}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.textBottom, {color: props.color.text}]}>
        {props.text.bottom}
      </Text>
    </TouchableOpacity>
  );
};

VoucherCard.propTypes = {
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
  text: PropTypes.shape({
    bottom: PropTypes.string,
    copyable: PropTypes.string,
    main: PropTypes.string,
    top: PropTypes.string,
  }).isRequired,
};

VoucherCard.defaultProps = {
  loading: false,
};

const styles = createStyle(theme => ({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    aspectRatio: 39 / 25,
    paddingVertical: theme.spacing(3),
    paddingHorizontal: theme.spacing(4),
    borderRadius: theme.spacing(1),
  },
  textTop: {
    opacity: 0.75,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'center',
  },
  textMain: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(32),
    textAlign: 'center',
  },
  textBottom: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'center',
  },
}));

export default VoucherCard;
