import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import FlatListWithPaging from '../flatListWithPaging';
import ListDots from '../listDots';
import {useLayoutContext} from '../../hocs/layout';

const Carousel = props => {
  const {screenWidth} = useLayoutContext();
  const [index, setIndex] = useState(0);
  const handleViewableItemsChangedRef = useRef(function (info) {
    let lastItem = info.viewableItems[info.viewableItems.length - 1];
    if (!lastItem) {
      return;
    }

    setIndex(lastItem.index);
    if (props.onScroll) {
      props.onScroll(lastItem.index);
    }
  });
  const handleViewableItemsChanged = handleViewableItemsChangedRef.current;

  function renderItem(info) {
    return <View style={{width: screenWidth}}>{props.renderItem(info)}</View>;
  }

  function getItemLayout(data, index) {
    return {
      length: screenWidth,
      offset: screenWidth * index,
      index,
    };
  }

  return (
    <>
      <FlatListWithPaging
        {...props}
        onScroll={undefined}
        renderItem={renderItem}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 70,
        }}
        onViewableItemsChanged={handleViewableItemsChanged}
        getItemLayout={getItemLayout}
        overScrollMode="never"
        bounces={false}
      />
      {props.dots && (
        <ListDots
          index={index}
          quantity={props.data.length}
          color={props.dotsColor}
        />
      )}
    </>
  );
};

Carousel.propTypes = {
  data: PropTypes.array.isRequired,
  // dots: PropTypes.bool,
  dotsColor: (props, propName, componentName) => {
    if (props.dots) {
      if (!props.dotsColor || typeof props.dotsColor !== 'string') {
        return new Error(
          `Invalid prop \`${propName}\` supplied to ${componentName}.`,
        );
      }
    }
  },
  onScroll: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
};

Carousel.defaultProps = {
  dots: true,
};

export default Carousel;
