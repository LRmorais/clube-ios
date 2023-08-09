import React, {useState} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Box from '../../../components/box';
import EventConciseListItem from '../../../components/listItem/eventConcise';
import ListDots from '../../../components/listDots';
import {getDistance} from '../../../utils/map';
import {useLayoutContext} from '../../../hocs/layout';
import {useGlobalStateContext} from '../../../hocs/globalState';
import {useContext} from '../context';
import {ASSET_PREFIX} from '../../../constants/env';

const List = () => {
  const {
    filteredData: events,
    goToEventDetailsScreenHOF: handleListItemPressHOF,
  } = useContext();
  const sections = [
    {id: 'ongoing', title: 'Acontecendo'},
    {id: 'week', title: 'Esta Semana'},
    {id: 'month', title: 'Próximos 30 Dias'},
    {id: 'other', title: 'Outras Datas'},
  ];
  const [dots, setDots] = useState({
    ongoing: 0,
    today: 0,
    week: 0,
    month: 0,
    other: 0,
  });
  const [slider, setSlider] = useState(0);
  const {width: viewportWidth} = Dimensions.get('window');
  const SLIDE_WIDTH = Math.round(viewportWidth / 2.8);
  const ITEM_HORIZONTAL_MARGIN = 12;
  const ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 2;
  const SLIDER_WIDTH = viewportWidth;
  const {theme} = useLayoutContext();
  const {deviceLocation} = useGlobalStateContext();
  const fakeData = [{id: -4}, {id: -5}, {id: -6}];

  function renderSkeleton() {
    return (
      <View style={{marginBottom: 20}}>
        <SkeletonPlaceholder
          highlightColor={theme.secondColorShade}
          speed={1500}>
          <View style={{alignItems: 'flex-start', marginLeft: 20}}>
            <View
              style={{
                width: 135,
                height: 150,
              }}
            />
            <View style={{width: 135, height: 10, marginTop: 10}} />
            <View style={{width: 120, height: 15, marginTop: 10}} />
            <View style={{width: 100, height: 20, marginTop: 10}} />
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  }

  function renderItem({item}) {
    let icons = [];

    let distance =
      deviceLocation &&
      item.eventPlace &&
      item.eventPlace.latitude &&
      item.eventPlace.longitude &&
      getDistance(
        {
          lat: deviceLocation.coords.latitude,
          lng: deviceLocation.coords.longitude,
        },
        {
          lat: Number(item.eventPlace.latitude),
          lng: Number(item.eventPlace.longitude),
        },
        true,
      );

    if (item.discountAmount) {
      icons.push({
        id: 'voucher',
        label: `${item.discountAmount}%`,
        color: {
          icon: theme.primaryColor,
          label: theme.primaryColor,
        },
      });
    }
    if (distance) {
      icons.push({
        id: 'distance',
        label: distance,
        color: {
          icon: theme.primaryColor,
          label: theme.primaryColor,
        },
      });
    }
    return (
      <EventConciseListItem
        id={item.id}
        color={{
          image: theme.tertiaryColor,
          text: {
            date: theme.red__main,
            primary: theme.primaryColor,
            secondary: theme.primaryColor,
          },
        }}
        image={ASSET_PREFIX + item.logo}
        text={{
          primary: (item.eventPlace || {}).name,
          secondary: item.name,
          price: item.minPrice,
          date: item.date,
        }}
        icons={icons}
        onPress={handleListItemPressHOF(item)}
      />
    );
  }

  function renderSection({item: {id, title: sectionTitle}}) {
    let sectionData = events?.filter(event =>
      event.actionDay.includes(sectionTitle),
    );

    return (
      <Box
        title={sectionTitle}
        titleColor={theme.primaryColor}
        noGutters="bottom">
        <Carousel
          data={!sectionData ? fakeData : sectionData || []}
          renderItem={!sectionData ? renderSkeleton : renderItem}
          keyExtractor={item => String(item.id)}
          enableMomentum={false}
          lockScrollWhileSnapping
          useScrollView
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          activeSlideAlignment={'start'}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          onSnapToItem={index => {
            const updatedDots = dots;
            updatedDots[id] = index;

            setDots(updatedDots);
            setSlider(Math.random());
          }}
          slideStyle={{paddingLeft: 15}}
        />
        <ListDots
          index={dots[id]}
          quantity={!sectionData ? fakeData.length : sectionData.length}
          color={theme.primaryColor}
        />
      </Box>
    );
  }

  return (
    <FlatList
      data={sections}
      renderItem={renderSection}
      keyExtractor={item => item}
    />
  );
};

export default List;
