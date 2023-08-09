import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import ImageWithLoading from '../imageWithLoading';
import Icon from '../icons';
import CircleIcon from '../icons/circle';
import Interaction from '../interaction';
import createStyle from '../../utils/style';

const SumUserInfo = (props) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.content}
      activeOpacity={props.onPress ? .75 : 1}
      onPress={props.onPress}
    >
      {props.image && (
        <ImageWithLoading
          style={[
            styles.image,
            { backgroundColor: props.color.image },
          ]}
          containerStyle={styles.imageContainer}
          source={props.image}
          resizeMode="cover"
        >
          {props.isVIP && (
            <CircleIcon
              id="medal"
              size="micro"
              backgroundColor={props.color.VIP.background}
              iconColor={props.color.VIP.icon}
            />
          )}
        </ImageWithLoading>
      )}
      <View style={styles.texts}>
        <View style={styles.textsInner}>
          <Text style={[
            styles.primaryText,
            { color: props.color.text.primary },
          ]}>
            {props.text.primary}
          </Text>
          <Text style={[
            styles.secondaryText,
            { color: props.color.text.secondary },
          ]}>
            {props.isVIP && (
              <>
              <Text style={[
                styles.vipText,
                { color: props.color.VIP.text },
              ]}>
                VIP
              </Text>
              <View style={styles.vipTextSpace} />
              </>
            )}
            {props.text.secondary}
          </Text>
        </View>
        {props.interaction && (
          <View style={styles.interactionContainer}>
            <Interaction {...props.interaction} />
          </View>
        )}
      </View>
    </TouchableOpacity>
    {props.onMorePress && (
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={props.onMorePress}
      >
        <Icon
          id="more-vertical"
          size={16}
          style={{ color: props.color.text.primary }}
        />
      </TouchableOpacity>
    )}
  </View>
);

SumUserInfo.propTypes = {
  color: PropTypes.shape({
    text: PropTypes.shape({
      primary: PropTypes.string.isRequired,
      secondary: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.string,
    VIP: PropTypes.shape({
      background: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  // image: ?
  interaction: PropTypes.object,
  isVIP: PropTypes.bool,
  onMorePress: PropTypes.func,
  onPress: PropTypes.func,
  text: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }).isRequired,
};

SumUserInfo.defaultProps = {
  isVIP: false,
};

SumUserInfo.Skeleton = (props) => (
  <SumUserInfo
    color={props.color}
    text={{
      primary: '████████',
      secondary: '█████████',
    }}
  />
);

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: theme.spacing(2),
  },
  image: {
    borderRadius: theme.spacing(2.5),
  },
  texts: {
    flex: 1,
    justifyContent: 'space-around',
  },
  textsInner: {
    justifyContent: 'center',
    minHeight: theme.spacing(5),
  },
  primaryText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
  },
  secondaryText: {
    opacity: .75,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
  vipText: {
    fontFamily: theme.typography.fontFamily.bold,
  },
  vipTextSpace: {
    width: theme.spacing(1.5),
    height: 1,
  },
  interactionContainer: {
    marginTop: theme.spacing(2),
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

export default SumUserInfo;
