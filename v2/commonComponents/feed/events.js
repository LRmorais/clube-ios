/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Dimensions, View} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Box from '../../components/box';
import EventsCarouselItem from '../../components/carouselItem/events';
import ListDots from '../../components/listDots';

import Carousel from 'react-native-snap-carousel';

import CommonButton from '../../components/button/feed_button';
import {getDistance} from '../../utils/map';
import {ASSET_PREFIX} from '../../constants/env';
import {useGlobalStateContext} from '../../hocs/globalState';
import {useLayoutContext} from '../../hocs/layout';

import {CORE_URL} from '../../constants/env';

const Events = () => {
  const navigation = useNavigation();
  const {deviceLocation} = useGlobalStateContext();
  const {theme} = useLayoutContext();

  const {width: viewportWidth} = Dimensions.get('window');
  const SLIDE_WIDTH = Math.round(viewportWidth / 1.5);
  const ITEM_HORIZONTAL_MARGIN = 15;
  const ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 2;
  const SLIDER_WIDTH = viewportWidth;
  const [activeSlide, setActiveSlide] = useState(0);
  const [events, setEvents] = useState();
  const fakeData = [{id: -4}, {id: -5}, {id: -6}];
  const [erroApi, setErrorApi] = useState(false);

  // buscando na api do core -------

  async function getEventsHome() {
    try {
      const response = await axios.get(`${CORE_URL}events/some?limit=10`);
      setEvents(response.data);
    } catch (error) {
      console.error(error);
      setErrorApi(true);
    }
  }
  useEffect(() => {
    getEventsHome();
  }, []);
  // -------------------------------

  function handleExtraActionPress() {
    navigation.navigate('Events');
  }

  function handleListItemPressHOF(data) {
    return function () {
      navigation.navigate({
        routeName: 'EventDetails',
        params: {
          id: data.id,
        },
      });
    };
  }

  function renderItem({item}) {
    let discount = `${item.discountAmount}%`;

    let distance =
      deviceLocation &&
      item.eventPlace &&
      item.eventPlace.latitude &&
      item.eventPlace.longitude &&
      getDistance(
        {
          lat: Number(item.eventPlace.latitude),
          lng: Number(item.eventPlace.longitude),
        },
        {
          lat: deviceLocation.coords.latitude,
          lng: deviceLocation.coords.longitude,
        },
        true,
      );

    let icons = [];
    if (discount) {
      icons.push({
        icon: 'voucher',
        label: discount,
        color: {
          icon: theme.primaryColor,
          label: theme.primaryColor,
        },
      });
    }
    if (distance) {
      icons.push({
        icon: 'distance',
        label: distance,
        color: {
          icon: theme.primaryColor,
          label: theme.primaryColor,
        },
      });
    }

    return (
      <EventsCarouselItem
        id={item.id}
        image={ASSET_PREFIX + item.logo}
        date={item.date}
        primary={{
          text: (item.eventPlace || {}).name,
          color: theme.primaryColor,
        }}
        secondary={{
          text: item.name,
          color: theme.primaryColor,
        }}
        price={{
          text: item.minPrice,
        }}
        color={{
          date: theme.primaryColor,
        }}
        onPress={handleListItemPressHOF(item)}
      />
    );
  }
  if (erroApi) {
    return null;
  }

  function renderSkeleton() {
    return (
      <View style={{marginBottom: 20}}>
        <SkeletonPlaceholder
          highlightColor={theme.secondColorShade}
          speed={1500}>
          <View style={{alignItems: 'flex-start', marginLeft: 20}}>
            <View
              style={{
                width: 280,
                height: 160,
              }}
            />
            <View style={{width: 180, height: 10, marginTop: 10}} />
            <View style={{width: 150, height: 15, marginTop: 10}} />
            <View style={{width: 100, height: 20, marginTop: 10}} />
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  }

  return (
    <Box
      title={(theme?.id ? `Eventos ${theme.title} + ` : '') + 'AGENDA CULTURAL'}
      titleColor={theme.primaryColor}
      shadow="both">
      <Carousel
        data={!events ? fakeData : events || []}
        renderItem={!events ? renderSkeleton : renderItem}
        enableMomentum={false}
        lockScrollWhileSnapping
        useScrollView
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        activeSlideAlignment={'start'}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <ListDots
        index={activeSlide}
        quantity={!events ? fakeData.length : events.length}
        color={theme.primaryColor}
      />
      <CommonButton
        text="Ver Mais"
        textColor={theme.primaryColor}
        onPress={handleExtraActionPress}
      />
    </Box>
  );
};

export default Events;
