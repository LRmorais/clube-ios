import React from 'react';
import { TouchableOpacity, Text, View, Linking } from 'react-native';
import PropTypes from 'prop-types';

import Box from '../box';
import PaddingContainer from '../paddingContainer';
import ImageWithLoading from '../imageWithLoading';
import Icon from '../icons';
import ListLabeledIcon from '../icons/listLabeled';
import ReadMore from '../readMore';
import CommonButton from '../button/common';
import createStyle from '../../utils/style';
import { useLayoutContext } from '../../hocs/layout';

const MovieHead = (props) => {
  const {
    screenWidth,
  } = useLayoutContext();

  function handleTrailerPress() {
    try {
      Linking.openURL(`${props.trailer}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`);
    } catch {
      //
    }
  }

  return (
    <Box background={props.color.background}>
      <PaddingContainer>
        <ImageWithLoading
          containerStyle={[
            styles.image,
            { width: screenWidth * .5375 },
          ]}
          source={{ uri: props.image }}
          resizeMode="cover"
        >
          {!!props.trailer && (
            <TouchableOpacity
              style={styles.trailer}
              activeOpacity={.9}
              onPress={handleTrailerPress}
            >
              <Icon
                id="play-circle"
                size={60}
                style={[
                  styles.playIcon,
                  { color: props.color.playIcon },
                ]}
              />
            </TouchableOpacity>
          )}
        </ImageWithLoading>
        <Text style={[
          styles.title,
          { color: props.color.text },
        ]}>
          {props.text.title.toUpperCase()}
        </Text>
        {props.meta && (
          <Text style={[
            styles.meta,
            { color: props.meta.color || props.color.text },
          ]}>
            {props.meta.text}
          </Text>
        )}
        {props.icons && (
          <View style={styles.iconsContainer}>
            <ListLabeledIcon
              data={props.icons}
              size="medium"
              extraSpace
            />
          </View>
        )}
        {!!props.text.description && (
          <ReadMore
            containerProps={{
              style: styles.descriptionContainer,
            }}
            collapsedStyle={[
              styles.description,
              styles.collapsedDescription,
              { color: props.color.text },
            ]}
            expandedStyle={[
              styles.description,
              { color: props.color.text },
            ]}
            numberOfLines={3}
            onLinkPress={props.onLinkPress}
            renderExpandCaller={(handlePress) => (
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
            renderCollapseCaller={(handlePress) => (
              <View style={styles.descriptionButton}>
                <CommonButton
                  text="Ler menos"
                  backgroundColor={props.color.description.background}
                  textColor={props.color.description.text}
                  size="small"
                  onPress={handlePress}
                />
              </View>
            )}
          >
            {props.text.description}
          </ReadMore>
        )}
      </PaddingContainer>
    </Box>
  );
};

MovieHead.propTypes = {
  color: PropTypes.shape({
    background: PropTypes.string.required,
    description: PropTypes.shape({
      background: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    playIcon: PropTypes.string.required,
    text: PropTypes.string.required,
  }).isRequired,
  icons: PropTypes.array,
  image: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
  }),
  onLinkPress: PropTypes.func,
  text: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  trailer: PropTypes.string,
};

const styles = createStyle((theme) => ({
  image: {
    overflow: 'hidden',
    alignSelf: 'center',
    aspectRatio: 17 / 25,
    borderRadius: 2,
  },
  trailer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  playIcon: {
    padding: theme.spacing(1),
    ...theme.textShadows[10],
  },
  title: {
    marginTop: theme.spacing(2),
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
    marginTop: theme.spacing(2),
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

export default MovieHead;
