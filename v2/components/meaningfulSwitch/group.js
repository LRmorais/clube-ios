import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import MeaningfulSwitch from './index';
import Divider from '../divider';

const MeaningfulSwitchGroup = (props) => {
  function renderItem({ item }) {
    return (
      <MeaningfulSwitch {...item} />
    );
  }

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <Divider />
      )}
    />
  );
};

MeaningfulSwitchGroup.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MeaningfulSwitchGroup;
