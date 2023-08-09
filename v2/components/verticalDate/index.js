import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pt-br';

import createStyle from '../../utils/style';

const VerticalDate = (props) => (
  <View>
    <Text style={[
      styles.day,
      { color: props.textColor },
    ]}>
      {props._skeleton ? '██' : props.date.format('DD')}
    </Text>
    <Text style={[
      styles.month,
      { color: props.textColor },
    ]}>
      {props._skeleton ? '███' : props.date.format('MMM').toUpperCase()}
    </Text>
  </View>
);

VerticalDate.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  _skeleton: PropTypes.bool,
  textColor: PropTypes.string.isRequired,
};

VerticalDate.defaultProps = {
  _skeleton: false,
};

VerticalDate.Skeleton = (props) => (
  <VerticalDate
    _skeleton
    date={new Date()}
    textColor={props.textColor}
  />
);

const styles = createStyle((theme) => ({
  day: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(25.6),
    textAlign: 'center',
    lineHeight: 31,
  },
  month: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14.4),
    textAlign: 'center',
    lineHeight: 18,
  },
}));

export default VerticalDate;
