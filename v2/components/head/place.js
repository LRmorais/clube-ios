import React from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

import Box from '../box';
import HorizontalList from '../horizontalList';
import PaddingContainer from '../paddingContainer';
import Icon from '../icons';
import ImageWithLoading from '../imageWithLoading';
import ListLabeledIcon from '../icons/listLabeled';
import ReadMore from '../readMore';
import CommonButton from '../button/common';
import createStyle, {theme} from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';

const PlaceHead = props => {
  const {screenWidth} = useLayoutContext();

  return (
    <Box background={props.color.background}>
      <HorizontalList
        data={props.images}
        renderItem={({item, index}) => (
          <ImageWithLoading
            style={styles.image}
            containerStyle={[
              styles.imageContainer,
              {width: screenWidth - theme.spacing(3 * 2)},
            ]}
            source={{uri: item}}>
            {props.isVIP && index === 0 && (
              <View
                style={[
                  styles.vipSign,
                  {backgroundColor: props.color.VIP.background},
                ]}>
                <Icon
                  id="star"
                  size={24}
                  style={{color: props.color.VIP.icon}}
                />
              </View>
            )}
          </ImageWithLoading>
        )}
        keyExtractor={item => item}
      />
      <PaddingContainer style={styles.container}>
        <Text style={[styles.title, {color: props.color.text}]}>
          {props.text.title.toUpperCase()}
        </Text>
        {props.meta && (
          <Text
            style={[
              styles.meta,
              {color: props.meta.color || props.color.text},
            ]}>
            {props.meta.text}
          </Text>
        )}
        <View style={styles.iconsContainer}>
          <ListLabeledIcon data={props.icons} size="medium" extraSpace />
        </View>
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
                  backgroundColor={props.color.description.background}
                  textColor={props.color.description.text}
                  size="small"
                  onPress={handlePress}
                />
              </View>
            )}
            renderCollapseCaller={handlePress => (
              <View style={styles.descriptionButton}>
                <CommonButton
                  text="Ler menos"
                  backgroundColor={props.color.description.background}
                  textColor={props.color.description.text}
                  size="small"
                  onPress={handlePress}
                />
              </View>
            )}>
            {props.text.description}
          </ReadMore>
        ) : null}
      </PaddingContainer>
    </Box>
  );
};

PlaceHead.propTypes = {
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    description: PropTypes.shape({
      background: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    VIP: PropTypes.shape({
      background: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  icons: PropTypes.array.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  isVIP: PropTypes.bool,
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

PlaceHead.defaultProps = {
  isVIP: false,
};

const styles = createStyle(theme => ({
  container: {
    position: 'relative',
  },
  vipSign: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
    bottom: 0,
    left: '50%',
    borderRadius: theme.spacing(2.75),
    transform: [
      {translateX: theme.spacing(-2.75)},
      {translateY: theme.spacing(1.5)},
    ],
  },
  imageContainer: {
    alignSelf: 'center',
    aspectRatio: 300 / 150,
    marginBottom: theme.spacing(3),
  },
  image: {
    borderRadius: 2,
  },
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(21),
    textAlign: 'center',
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
    textAlign: 'center',
    lineHeight: 25,
  },
  collapsedDescription: {
    fontFamily: theme.typography.fontFamily.regular,
  },
  descriptionButton: {
    alignSelf: 'center',
    marginTop: theme.spacing(2),
  },
}));

export default PlaceHead;
