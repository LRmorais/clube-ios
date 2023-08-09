import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../icons';
import ImageWithLoading from '../imageWithLoading';
import createStyle from '../../utils/style';

const UserCard = (props) => {
  const propsBySchema = {
    dependent: {
      subtitle: 'Dependente',
    },
    holder: {
      subtitle: 'Titular',
    },
  }[props.schema];

  return (
    <View style={[
      styles.container,
      { backgroundColor: props.color.background },
    ]}>
      {props.isVIP && (
        <View style={[
          styles.vipSign,
          { backgroundColor: props.color.VIP.background },
        ]}>
          <Icon
            id="medal"
            size={18}
            style={{ color: props.color.VIP.icon }}
          />
          <Text style={[
            styles.vipText,
            { color: props.color.VIP.text },
          ]}>
            VIP
          </Text>
        </View>
      )}
      <ImageWithLoading
        containerStyle={styles.texture}
        source={require('../../images/textures/cardDetail.png')}
      />
      <View style={styles.content}>
        <View style={styles.contentTop}>
          <Text style={[
            styles.contentLabel,
            { color: props.color.text },
          ]}>
            CÓDIGO
          </Text>
          <Text style={[
            styles.contentValue,
            { color: props.color.text },
          ]}>
            {props.code}
          </Text>
        </View>
        <View>
          <Text style={[
            styles.contentLabel,
            { color: props.color.text },
          ]}>
            NOME
          </Text>
          <Text style={[
            styles.contentValue,
            { color: props.color.text },
          ]}>
            {props.name}
          </Text>
          <Text style={[
            styles.contentSubtitle,
            { color: props.color.text },
          ]}>
            {propsBySchema.subtitle}
          </Text>
        </View>
      </View>
    </View>
  );
};

UserCard.propTypes = {
  code: PropTypes.string.isRequired,
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    VIP: PropTypes.shape({
      background: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isVIP: PropTypes.bool,
  name: PropTypes.string.isRequired,
  schema: PropTypes.oneOf(['dependent', 'holder']),
};

UserCard.defaultProps = {
  isVIP: false,
  schema: 'holder',
};

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    aspectRatio: 39 / 25,
    borderRadius: theme.spacing(1),
  },
  vipSign: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    height: theme.spacing(4),
    paddingHorizontal: theme.spacing(1.5),
    borderRadius: theme.spacing(2),
  },
  vipText: {
    marginLeft: theme.spacing(1),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
  },
  texture: {
    height: '65%',
    aspectRatio: 10 / 13,
    marginRight: theme.spacing(3),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    paddingRight: theme.spacing(3),
  },
  contentTop: {
    paddingVertical: theme.spacing(2.5),
  },
  contentLabel: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: 17.5,
  },
  contentValue: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: 21,
  },
  contentSubtitle: {
    fontFamily: theme.typography.fontFamily.regularItalic,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
}));

export default UserCard;
