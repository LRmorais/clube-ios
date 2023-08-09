import React, { useRef, useEffect } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import { betweenMinMax } from '../../utils/number';

const FlatListWithPaging = (props) => {
  const flatListRef = useRef();

  useEffect(() => {
    if (typeof props.index === 'undefined') return;

    const index = betweenMinMax(props.index, 0, props.data.length - 1);
    flatListRef.current.scrollToIndex({
      index,
      animated: true,
      viewOffset: 0,
      viewPosition: 0,
    });
  }, [props.index]);

  return (
    <FlatList
      {...props}
      ref={flatListRef}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

FlatListWithPaging.propTypes = {
  index: PropTypes.number,
};

export default FlatListWithPaging;
