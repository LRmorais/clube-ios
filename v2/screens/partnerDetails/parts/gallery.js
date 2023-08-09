import React, {useState} from 'react';
import {TouchableOpacity, Dimensions, Text, Platform} from 'react-native';

import Box from '../../../components/box';
import PaddingContainer from '../../../components/paddingContainer';
import ExtraVerticalPaddingContainer from '../../../components/paddingContainer/extraVertical';
import HorizontalList from '../../../components/horizontalList';
import ImageWithLoading from '../../../components/imageWithLoading';
import ListDots from '../../../components/listDots';
import Carousel from 'react-native-snap-carousel';
import createStyle, {theme as globalTheme} from '../../../utils/style';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';
import {ASSET_PREFIX} from '../../../constants/env';

const Gallery = () => {
  const {width: viewportWidth, height: viewportHeight} =
    Dimensions.get('window');
  const SLIDE_WIDTH =
    Platform.OS === 'ios'
      ? Math.round(viewportWidth / 1)
      : Math.round(viewportWidth / 1.1);
  const ITEM_HORIZONTAL_MARGIN = 15;
  const ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 2;
  const SLIDER_WIDTH = viewportWidth;

  const [activeSlide, setActiveSlide] = useState(0);
  const fakeData = [{id: -4}, {id: -5}, {id: -6}];
  const {theme, screenWidth} = useLayoutContext();
  const {
    goToGalleryScreen: handleActionPress,
    goToImageScreenHOF: handleListItemPressHOF,
    unit,
  } = useContext();

  function renderItem({item, index}) {
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={handleListItemPressHOF(index)}>
        <ExtraVerticalPaddingContainer>
          <ImageWithLoading
            containerStyle={[
              styles.image,
              {width: screenWidth * 0.8, height: 180},
            ]}
            source={{uri: ASSET_PREFIX + item}}
            resizeMode="cover"
          />
        </ExtraVerticalPaddingContainer>
      </TouchableOpacity>
    );
  }

  if (unit.images.length === 0) {
    return null;
  }

  return (
    <Box>
      <PaddingContainer>
        <Text style={[styles.title, {color: theme.primaryColor}]}>
          Galeria de fotos
        </Text>
        <Carousel
          data={!unit.images ? fakeData : unit.images || []}
          renderItem={renderItem}
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
          quantity={!unit.images ? fakeData.length : unit.images.length}
          color={theme.primaryColor}
        />
      </PaddingContainer>
    </Box>
  );
};

const styles = createStyle(theme => ({
  image: {
    overflow: 'hidden',
    aspectRatio: 2 / 1,
    borderRadius: 2,
  },
  title: {
    marginTop: 15,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    textTransform: 'uppercase',
  },
}));

export default Gallery;
