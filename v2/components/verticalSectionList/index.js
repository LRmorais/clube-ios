import React from 'react';
import {SectionList, View} from 'react-native';
import PropTypes from 'prop-types';

import Divider from '../divider';
import {theme} from '../../utils/style';

const VerticalSectionList = props => (
  <SectionList
    {...props}
    // showsVerticalScrollIndicator={false}
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

VerticalSectionList.propTypes = {
  separatorColor: PropTypes.string,
  separatorSize: PropTypes.number,
  showSeparator: PropTypes.bool,
};

VerticalSectionList.defaultProps = {
  separatorSize: 2,
  showSeparator: false,
};

export default VerticalSectionList;
