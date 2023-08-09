import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  ToastAndroid,
  Share,
} from 'react-native';
import PropTypes from 'prop-types';
// import Clipboard from '@react-native-clipboard/clipboard';

import createStyle from '../../utils/style';

const ShareFlat = props => {
  function handleCopy() {
    if (props.onCopy) {
      props.onCopy();
    }
    // Clipboard.setString(props.message);
    if (Platform.OS === 'android') {
      ToastAndroid.show(
        'Copiado para área de transferência',
        ToastAndroid.SHORT,
      );
    }
  }

  function handleShare() {
    try {
      if (props.onShare) {
        props.onShare();
      }
      Share.share({
        message: props.message,
        url: props.link,
      });
    } catch {
      //
    }
  }

  return (
    <View style={[styles.container, {backgroundColor: props.color.background}]}>
      <TouchableOpacity
        style={styles.copy}
        activeOpacity={0.85}
        onPress={handleCopy}>
        <Text style={[styles.copyText, {color: props.color.link}]}>
          {props.text.link}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.share}
        activeOpacity={0.85}
        onPress={handleShare}>
        <Text style={[styles.shareText, {color: props.color.options}]}>
          {props.text.options}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

ShareFlat.propTypes = {
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    options: PropTypes.string.isRequired,
  }).isRequired,
  link: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onCopy: PropTypes.func,
  onShare: PropTypes.func,
  text: PropTypes.shape({
    link: PropTypes.string.isRequired,
    options: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = createStyle(theme => ({
  container: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(1.5),
    alignItems: 'center',
  },
  copy: {
    paddingHorizontal: theme.spacing(0.5),
  },
  copyText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(16),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(20),
  },
  share: {
    paddingVertical: theme.spacing(1),
    paddingHorizontal: theme.spacing(1),
  },
  shareText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(20),
  },
}));

export default ShareFlat;
