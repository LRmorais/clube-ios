import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import SumUserInfo from './sum';
import Icon from '../icons';
import createStyle from '../../utils/style';

const RatingUserInfo = (props) => (
  <View>
    {!props._skeleton && (
      <SumUserInfo {...props} />
    )}
    {props._skeleton && (
      <SumUserInfo.Skeleton {...props} />
    )}
    <View style={styles.content}>
      <Text style={[
        styles.number,
        { color: props.color.number },
      ]}>
        {!props._skeleton && props.rating.number.toFixed(1).replace('.', ',')}
        {props._skeleton && '██ '}
      </Text>
      {!props._skeleton && (
        <Icon
          id="star"
          size={8}
          style={[
            styles.icon,
            { color: props.color.icon },
          ]}
        />
      )}
      <Text style={[
        styles.description,
        { color: props.color.description },
      ]}>
        {props.rating.description}
      </Text>
    </View>
  </View>
);

RatingUserInfo.propTypes = {
  _skeleton: PropTypes.bool,
  color: PropTypes.shape({
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  rating: PropTypes.shape({
    number: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

RatingUserInfo.defaultProps = {
  _skeleton: false,
};

RatingUserInfo.Skeleton = (props) => (
  <RatingUserInfo
    _skeleton
    color={props.color}
    rating={{
      number: 0,
      description: '█████████',
    }}
  />
);

const styles = createStyle((theme) => ({
  content: {
    flexDirection: 'row',
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(7),
  },
  number: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.lineHeight.thin,
  },
  icon: {
    marginLeft: theme.spacing(.5),
    marginRight: theme.spacing(1),
    lineHeight: theme.typography.lineHeight.thin,
  },
  description: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.lineHeight.thin,
  },
}));

export default RatingUserInfo;
