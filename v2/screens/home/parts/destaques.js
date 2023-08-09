import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Box from '../../../components/box';
import HorizontalList from '../../../components/horizontalList';
import MuralListItem from '../../../components/listItem/destaques';
import ListDots from '../../../components/listDots';
import Header from './headerDestaques/index';

import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';
import {theme as globalTheme} from '../../../utils/style';
import {ASSET_PREFIX} from '../../../constants/env';

const Destaque = () => {
  const {screenWidth, theme} = useLayoutContext();
  const {
    goToMuralScreen,
    userInfo,
    goToNotificationScreen,
    goToProfileMenuScreen,
    goToSearchScreen,
    highlight,
  } = useContext();
  const [index, setIndex] = useState(0);
  const fakeData = [{id: -4}, {id: -5}, {id: -6}];

  const handleViewableItemsChangedRef = useRef(function (info) {
    let lastItem = info.viewableItems[info.viewableItems.length - 1];
    if (!lastItem) {
      return;
    }

    setIndex(lastItem.index);
  });
  const handleViewableItemsChanged = handleViewableItemsChangedRef.current;
  const itemWidth = screenWidth - globalTheme.spacing(3 * 2.1);
  const itemsSpace = globalTheme.spacing(1);

  function renderItem({item}) {
    return (
      <View style={{width: itemWidth}}>
        <MuralListItem
          id={item.id}
          image={ASSET_PREFIX + item.image}
          onPress={() => goToMuralScreen(item)}
          color={{
            // image: theme.secondColorShade,
            primary: theme.contrastTextColor,
            secondary: theme.contrastTextColor,
          }}
          text={item.fantasyName}
        />
      </View>
    );
  }

  function renderSkeleton(item) {
    return (
      <View style={{marginBottom: 20}}>
        <SkeletonPlaceholder
          highlightColor={theme.secondColorShade}
          speed={1500}>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: 350,
                height: 130,
                borderRadius: 10,
                overflow: 'hidden',
              }}
            />
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  }

  function getItemLayout(data, index) {
    return {
      length: itemWidth,
      offset: itemWidth * index + itemsSpace * Math.max(0, index - 1),
      index,
    };
  }

  return (
    <Box background={theme.primaryColor} titleColor={theme.contrastTextColor}>
      <Header
        background={theme.primaryColor}
        imagProfile={userInfo?.img}
        notification={goToNotificationScreen}
        search={goToSearchScreen}
        menuProfile={goToProfileMenuScreen}
      />

      <HorizontalList
        data={!highlight ? fakeData : highlight || []}
        renderItem={!highlight ? renderSkeleton : renderItem}
        keyExtractor={item => String(item.id)}
        snapToInterval={itemWidth + itemsSpace}
        decelerationRate="fast"
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        onViewableItemsChanged={handleViewableItemsChanged}
        getItemLayout={getItemLayout}
        overScrollMode="never"
        bounces={false}
      />
      <ListDots
        index={index}
        quantity={!highlight ? 3 : highlight?.length}
        autoStyle={false}
        color={theme.contrastTextColor}
      />
    </Box>
  );
};

export default Destaque;
