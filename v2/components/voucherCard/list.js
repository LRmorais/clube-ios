import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import HorizontalList from '../horizontalList';
import VoucherCard from './index';
import ListDots from '../listDots';
import { theme } from '../../utils/style';
import { useLayoutContext } from '../../hocs/layout';

const VoucherCardsList = (props) => {
  const [index, setIndex] = useState(0);
  const {
    screenWidth,
  } = useLayoutContext();
  const width = screenWidth - theme.spacing(3 * 2);

  function handleScroll(e) {
    let totalContainerWidth = Math.round(e.nativeEvent.contentSize.width);
    let widthByItem = Math.round(totalContainerWidth / props.cards.length);
    let index = Math.round(e.nativeEvent.contentOffset.x / widthByItem);
    setIndex(index);
    if (props.onScroll) props.onScroll(index);
  }

  function getItemLayout(data, index) {
    return {
      length: width * data.length,
      offset: width * index,
      index,
    };
  }

  function renderItem({ item }) {
    return (
      <View style={{ width }}>
        <VoucherCard {...item} />
      </View>
    );
  }

  return (
    <View>
      <HorizontalList
        data={props.cards}
        renderItem={renderItem}
        onScroll={handleScroll}
        getItemLayout={getItemLayout}
        keyExtractor={(_, index) => String(index)}
      />
      {props.cards.length > 1 && (
        <ListDots
          color={props.dotsColor}
          index={index}
          quantity={props.cards.length}
        />
      )}
    </View>
  );
};

VoucherCardsList.propTypes = {
  cards: PropTypes.array.isRequired,
  dotsColor: PropTypes.string.isRequired,
  onScroll: PropTypes.func,
};

export default VoucherCardsList;
