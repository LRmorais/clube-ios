import React from 'react';
import { View, TouchableOpacity, Text, Platform, ToastAndroid, Share } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import PropTypes from 'prop-types';

import CircleIcon, { sizes } from '../icons/circle';
import createStyle from '../../utils/style';

const ShareTinyBand = (props) => {
  function handleCopyToClip() {
    if (props.onCopy) props.onCopy();
    Clipboard.setString(props.message);
    if (Platform.OS === 'android') ToastAndroid.show('Copiado para área de transferência', ToastAndroid.SHORT);
  }

  function handleShare() {
    try {
      if (props.onShare) props.onShare();
      Share.share({
        message: props.message,
        url: props.link,
      });
    } catch {}
  }

  return (
    <View style={{ backgroundColor: props.backgroundColor }}>
      {props.extraContent && (
        <Text style={[
          styles.extraContent,
          { color: props.textColor },
        ]}>
          {props.extraContent}
        </Text>
      )}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.linkContainer}
          activeOpacity={.75}
          onPress={handleCopyToClip}
        >
          <Text style={[
            styles.text,
            { color: props.textColor },
          ]}>
            {props.text}
          </Text>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <CircleIcon
            id="share-outlined"
            backgroundColor="transparent"
            size="medium"
            iconColor={props.textColor}
            onPress={handleShare}
          />
        </View>
      </View>
    </View>
  );
};

ShareTinyBand.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  extraContent: PropTypes.string,
  link: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onCopy: PropTypes.func,
  onShare: PropTypes.func,
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

const styles = createStyle((theme) => ({
  extraContent: {
    paddingTop: theme.spacing(3),
    paddingHorizontal: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: theme.spacing(8),
    paddingHorizontal: theme.spacing(4),
  },
  linkContainer: {
    flex: 1,
    paddingLeft: theme.spacing(sizes.medium),
  },
  text: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    textAlign: 'center',
  },
  iconContainer: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(-2),
  },
}));

export default ShareTinyBand;
