import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import Box from '../box';
import PaddingContainer from '../paddingContainer';
import ImageWithLoading from '../imageWithLoading';
import ListLabeledIcon from '../icons/listLabeled';
import ReadMore from '../readMore';
import CommonButton from '../button/common';
import createStyle from '../../utils/style';

const ChallengeHead = (props) => (
  <Box background={props.color.background}>
    <PaddingContainer>
      <ImageWithLoading
        containerStyle={styles.image}
        source={{ uri: props.image }}
      />
      <Text style={[
        styles.title,
        { color: props.color.text },
      ]}>
        {props.text.title.toUpperCase()}
      </Text>
      {props.text.meta && (
        <Text style={[
          styles.meta,
          { color: props.color.meta || props.color.text },
        ]}>
          {props.text.meta}
        </Text>
      )}
      <View style={styles.iconsContainer}>
        <ListLabeledIcon
          data={props.icons}
          size="medium"
          extraSpace
        />
      </View>
      {props.text.description && (
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

ChallengeHead.propTypes = {
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    description: PropTypes.shape({
      background: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    meta: PropTypes.string,
    text: PropTypes.string.isRequired,
  }).isRequired,
  icons: PropTypes.array.isRequired,
  // image: ?
  onLinkPress: PropTypes.func,
  text: PropTypes.shape({
    description: PropTypes.string,
    meta: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = createStyle((theme) => ({
  image: {
    overflow: 'hidden',
    alignSelf: 'center',
    width: '100%',
    aspectRatio: 78 / 45,
    marginBottom: theme.spacing(4),
    borderRadius: 2,
  },
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(21),
    textAlign: 'center',
  },
  meta: {
    marginVertical: theme.spacing(2),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(11),
    textAlign: 'center',
  },
  iconsContainer: {
    alignItems: 'center',
    marginTop: theme.spacing(3),
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
    marginTop: theme.spacing(3),
  },
}));

export default ChallengeHead;
