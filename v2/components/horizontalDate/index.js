import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pt-br';

import createStyle from '../../utils/style';

const HorizontallDate = props => (
  <View>
    <Text style={[styles.day, {color: props.textColor}]}>
      {/* {props._skeleton ? '██' : props.date?.format('DD/MM/YYYY')} */}
      {props._skeleton ? '██' : props.date}
    </Text>
  </View>
);

HorizontallDate.propTypes = {
  // date: PropTypes.instanceOf(moment).isRequired,
  _skeleton: PropTypes.bool,
  textColor: PropTypes.string.isRequired,
};

HorizontallDate.defaultProps = {
  _skeleton: false,
};

HorizontallDate.Skeleton = props => (
  <HorizontallDate _skeleton date={new Date()} textColor={props.textColor} />
);

const styles = createStyle(theme => ({
  day: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(13),
    textAlign: 'center',
    lineHeight: 31,
    // padding: theme.spacing(1.),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    backgroundColor: '#ffc133',
  },
  month: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14.4),
    textAlign: 'center',
    lineHeight: 18,
  },
}));

export default HorizontallDate;
