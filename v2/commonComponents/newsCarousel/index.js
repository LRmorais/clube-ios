import React, {useState, useLayoutEffect, useEffect} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {decode} from 'html-entities';
import PropTypes from 'prop-types';
import {lightFormat, getMonth, getYear} from 'date-fns';

import Box from '../../components/box';
import Carousel from '../../components/carousel';
import NewsCarouselItem from '../../components/carouselItem/news';

import CommonButton from '../../components/button/feed_button';
import {useGlobalStateContext} from '../../hocs/globalState';
import {useLayoutContext} from '../../hocs/layout';
import {ASSET_PREFIX} from '../../constants/env';

const NewsCarousel = props => {
  const navigation = useNavigation();
  const {generalData} = useGlobalStateContext();
  const {theme} = useLayoutContext();
  const [data, setData] = useState(null);
  const [specificData, setSpecificData] = useState(null);
  const [viewing, setViewing] = useState('general');
  const fakeData = [{id: -4}, {id: -5}, {id: -6}, {id: -7}];
  const title = 'FIQUE LIGADO !';
  const hasSpecificData = specificData && specificData.length > 0;

  const [index, setIndex] = useState(0);

  useLayoutEffect(() => {
    if (generalData?.news) {
      setData(generalData.news.slice(0, 3));
    }
  }, [generalData?.news]);

  useLayoutEffect(() => {
    if (generalData?.specificNews) {
      setSpecificData(generalData.specificNews.slice(0, 3));
    }
  }, [generalData?.specificNews]);

  useEffect(() => {
    if (specificData && specificData.length > 0) {
      setViewing('specific');
    }
  }, [specificData]);

  function handleScroll(index) {
    setIndex(index);
  }

  function handleExtraActionPress() {
    navigation.navigate(
      {
        general: 'News',
        specific: 'SpecificNews',
      }[viewing],
    );
  }

  function handleListItemPressHOF(params) {
    return function () {
      navigation.navigate({
        routeName: 'NewsDetails',
        params,
      });
    };
  }

  function handleSpecificListItemPressHOF(params) {
    return function () {
      navigation.navigate({
        routeName: 'SpecificNewsDetails',
        params,
      });
    };
  }

  function renderItem({item}) {
    return (
      <NewsCarouselItem
        id={item.id}
        image={item.image}
        primary={{
          text: decode(item.title),
          color: theme.primaryColor,
        }}
        secondary={{
          text: item.resume,
          color: item.primaryColor,
        }}
        onPress={handleListItemPressHOF(item)}
      />
    );
  }

  function renderItemSpecificItem({item}) {
    const publishedDate = new Date(item.publishedDate || item.createdAt);
    const day = lightFormat(publishedDate, 'dd');
    const month = getMonth(publishedDate);
    const year = getYear(publishedDate);

    const months = {
      0: 'Janeiro',
      1: 'Fevereiro',
      2: 'Março',
      3: 'Abril',
      4: 'Maio',
      5: 'Junho',
      6: 'Julho',
      7: 'Agosto',
      8: 'Setembro',
      9: 'Outubro',
      10: 'Novembro',
      11: 'Dezembro',
    };

    return (
      <NewsCarouselItem
        id={item.id}
        image={ASSET_PREFIX + item.image}
        primary={{
          text: item.title,
          color: theme.primaryColor,
        }}
        secondary={{
          text: `${day} de ${months[month]}, ${year}`,
          color: item.primaryColor,
        }}
        onPress={handleSpecificListItemPressHOF(item)}
      />
    );
  }

  function renderSkeleton({item}) {
    return (
      <NewsCarouselItem.Skeleton
        id={item.id}
        primary={{
          color: theme.textPrimaryColor,
        }}
        secondary={{
          color: theme.textPrimaryColor,
        }}
      />
    );
  }

  if (data === 'error') {
    return null;
  }
  if (data && data.length === 0) {
    return null;
  }
  // if (data.length === 0) return null;

  return (
    <Box
      title={!hasSpecificData ? title : undefined}
      titleColor={theme.primaryColor}
      tabsProps={
        hasSpecificData
          ? {
              defaultColor: theme.primaryColor,
              selected: viewing,
              fontSize: 'medium',
              data: [
                {
                  text: theme.title,
                  value: 'specific',
                },
                {
                  text: title,
                  value: 'general',
                },
              ],
              onChange: setViewing,
            }
          : undefined
      }
      shadow="both"
      {...props}
      background="#fff">
      {viewing === 'general' && (
        <Carousel
          data={!data ? fakeData : data || []}
          renderItem={!data ? renderSkeleton : renderItem}
          onScroll={handleScroll}
          keyExtractor={item => String(item.id)}
          dots={3}
          dotsColor={theme.primaryColor}
        />
      )}
      {viewing === 'specific' && (
        <Carousel
          data={specificData || []}
          renderItem={renderItemSpecificItem}
          onScroll={handleScroll}
          keyExtractor={item => String(item.id)}
          dots={3}
          dotsColor={theme.primaryColor}
        />
      )}
      <CommonButton
        text="Ver Mais"
        textColor={theme.primaryColor}
        onPress={handleExtraActionPress}
      />
    </Box>
  );
};

NewsCarousel.propTypes = {
  excludedIDs: PropTypes.array,
};

NewsCarousel.defaultProps = {
  excludedIDs: [],
};

export default NewsCarousel;
