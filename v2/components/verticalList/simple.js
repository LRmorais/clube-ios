import React from 'react';
import {FlatList, View} from 'react-native';
import PropTypes from 'prop-types';

import Divider from '../divider';
import {theme} from '../../utils/style';

const SimpleVerticalList = props => (
  <FlatList
    {...props}
    showsVerticalScrollIndicator={false}
    ItemSeparatorComponent={
      props.showSeparator &&
      (() => (
        <View style={{marginVertical: theme.spacing(props.separatorSize)}}>
          <Divider color={props.separatorColor} />
        </View>
      ))
    }
  />
);

SimpleVerticalList.propTypes = {
  separatorColor: PropTypes.string,
  separatorSize: PropTypes.number,
  showSeparator: PropTypes.bool,
};

SimpleVerticalList.defaultProps = {
  separatorSize: 2,
  showSeparator: false,
};

export default SimpleVerticalList;
