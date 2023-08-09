import React, { useState } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import AccordionItem from './item';
import Divider from '../divider';
import { insert, remove } from '../../utils/array';

const Accordion = (props) => {
  const [selected, setSelected] = useState(props.defaultSelected);

  function renderItem({ item }) {
    const open = item.link || selected.includes(item.value);

    function handlePress() {
      if (open) {
        setSelected((selected) => remove(selected, item.value));
        return;
      }

      if (props.multiple) {
        setSelected((selected) => insert(selected, item.value));
        return;
      }

      setSelected([item.value]);
    }

    return (
      <AccordionItem
        {...item}
        open={open}
        onPress={item.link ? item.onPress : handlePress}
      />
    )
  }

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.value}
      ItemSeparatorComponent={() => (
        <Divider />
      )}
    />
  );
};

Accordion.propTypes = {
  data: PropTypes.array.isRequired,
  defaultSelected: PropTypes.array,
  multiple: PropTypes.bool,
};

Accordion.defaultProps = {
  defaultSelected: [],
  multiple: false,
};

export default Accordion;
