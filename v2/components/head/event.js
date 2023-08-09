import React from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import Box from '../box';
import PaddingContainer from '../paddingContainer';
import HorizontalList from '../horizontalList/customHorizontalList';
import ImageWithLoading from '../imageWithLoading';
import FloatingButton from '../../components/button/feed_button';
import ReadMore from '../readMore';
import CommonButton from '../button/common';
import createStyle, {theme} from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';
import {formatPrice} from '../../utils/data';

const EventHead = props => {
  const {screenWidth} = useLayoutContext();

  return (
    <Box background={props.color.background}>
      <HorizontalList
        style={styles.imagesList}
        data={props.images}
        renderItem={({item}) => (
          <View>
            <ImageWithLoading
              containerStyle={[styles.image, {width: screenWidth}]}
              source={{uri: item}}
            />
            <View style={styles.dateBox}>
              <Text style={[styles.textDate, {color: props.color.text}]}>
                {props.date}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={item => item}
      />
      <PaddingContainer>
        {/* {props.date && (
          <Text style={[styles.date, {color: props.color.text}]}>
            {props.date.toUpperCase()}
          </Text>
        )} */}
        {props.text.title ? (
          <Text style={[styles.title, {color: props.color.text}]}>
            {props.text.title.toUpperCase()}
          </Text>
        ) : null}

        {props.text.date ? (
          <Text style={[styles.subTitle, {color: props.color.text}]}>
            {/* {props.text.title.toUpperCase()} */}
            {`${props.text.slug} -  `}
            <Icon name="calendar-outline" size={20} color={props.color.text} />
            {`  ${props.text.date} `}
          </Text>
        ) : null}

        {props.meta && (
          <Text
            style={[
              styles.meta,
              {color: props.meta.color || props.color.text},
            ]}>
            {props.meta.text}
          </Text>
        )}

        {/* <View style={styles.iconsContainer}>
          <ListLabeledIcon data={props.icons} size="medium" extraSpace />
        </View> */}
        {props.text.description ? (
          <ReadMore
            containerProps={{
              style: styles.descriptionContainer,
            }}
            collapsedStyle={[
              styles.description,
              styles.collapsedDescription,
              {color: props.color.text},
            ]}
            expandedStyle={[styles.description, {color: props.color.text}]}
            numberOfLines={3}
            onLinkPress={props.onLinkPress}
            renderExpandCaller={handlePress => (
              <View style={styles.descriptionButton}>
                <CommonButton
                  text="Ler mais"
                  // backgroundColor={props.color.description.background}
                  textColor={props.color.description.background}
                  size="medium"
                  onPress={handlePress}
                />
              </View>
            )}
            renderCollapseCaller={handlePress => (
              <View style={styles.descriptionButton}>
                <CommonButton
                  text="Ler menos"
                  // backgroundColor={props.color.description.background}
                  textColor={props.color.description.background}
                  size="medium"
                  onPress={handlePress}
                />
              </View>
            )}>
            {props.text.description}
          </ReadMore>
        ) : null}

        <>
          <Text style={[styles.price, {color: props.color.text}]}>
            A partir de:
          </Text>
          <Text style={[styles.textPricing, {color: props.color.text}]}>
            {props.price === 0 ? 'Gratuito' : formatPrice(props.price)}
          </Text>
        </>

        {props.purchaseURL ? (
          <FloatingButton
            text="COMPRAR INGRESSOS"
            textColor={props.color.text}
            styles={{marginLeft: 0, marginRight: 0}}
            onPress={props.onLinkPress}
          />
        ) : null}
      </PaddingContainer>
    </Box>
  );
};

EventHead.propTypes = {
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    description: PropTypes.shape({
      background: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  date: PropTypes.string,
  icons: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired,
  meta: PropTypes.shape({
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
  }),
  onLinkPress: PropTypes.func,
  text: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = createStyle(theme => ({
  imagesList: {
    marginBottom: theme.spacing(3),
  },
  image: {
    overflow: 'hidden',
    alignSelf: 'center',
    aspectRatio: 3 / 2,
    borderRadius: 2,
  },
  dateBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  textDate: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(15),
    textAlign: 'center',
    lineHeight: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: '#ffc133',
  },
  date: {
    marginBottom: theme.spacing(1.5),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    textAlign: 'center',
  },
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(21),
  },
  subTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(15),
    paddingTop: theme.spacing(2),
  },
  meta: {
    marginTop: theme.spacing(1),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(11),
    textAlign: 'center',
  },
  iconsContainer: {
    alignItems: 'center',
    marginTop: theme.spacing(3.5),
  },
  descriptionContainer: {
    marginTop: theme.spacing(2.5),
  },
  description: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    textAlign: 'justify',
    lineHeight: 25,
  },
  collapsedDescription: {
    fontFamily: theme.typography.fontFamily.regular,
  },
  descriptionButton: {
    alignSelf: 'center',
    marginTop: theme.spacing(1),
  },
  price: {
    marginVertical: theme.spacing(0.5),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(15),
  },
  textPricing: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(23),
    lineHeight: 25,
    textAlign: 'justify',
  },
}));

export default EventHead;
