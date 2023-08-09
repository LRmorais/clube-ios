import React, { useState, useLayoutEffect } from 'react';
import { Text, Image } from 'react-native';

import Box from '../../../components/box';
import ImageWithLoading from '../../../components/imageWithLoading';
import PaddingContainer from '../../../components/paddingContainer';
import Spacer from '../../../components/spacer';
import HTMLRenderer from '../../../components/htmlRenderer';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';
import { ASSET_PREFIX } from '../../../constants/env';

const Content = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    image,
    subtitle,
    title,
    content,
    date,
    openLink: handleLinkPress,
  } = useContext();
  const [aspectRatio, setAspectRatio] = useState();

  useLayoutEffect(() => {
    if (!image) return;

    Image.getSize(ASSET_PREFIX + image, (width, height) => setAspectRatio(width / height));
  }, []);

  return (
    <>
      <Box background={theme.primaryColor}>
        <PaddingContainer>
          {title && (
            <>
              <Spacer size={2} setMinSize fixedSize />
              <Text style={[
                styles.title,
                { color: theme.contrastTextColor },
              ]}>
                {title}
              </Text>
              <Spacer size={3} setMinSize fixedSize />
            </>
          )}
          <Text style={[
            styles.date,
            { color: theme.contrastTextColor },
          ]}>
            {date}
          </Text>
        </PaddingContainer>
      </Box>
      <Box>
        <PaddingContainer>
          {image ? (
            <>
              <ImageWithLoading
                source={{ uri: ASSET_PREFIX + image }}
                containerStyle={[
                  styles.image,
                  { aspectRatio },
                ]}
              />
              <Spacer size={2} setMinSize fixedSize />
            </>
          ) : null}
          {(image && subtitle) ? (
            <>
              <Text style={[
                styles.subtitle,
                { color: theme.tertiaryColor },
              ]}>
                {subtitle}
              </Text>
              <Spacer size={3} setMinSize fixedSize />
            </>
          ) : undefined}
          {content && (
            <>
              <HTMLRenderer
                style={[
                  styles.content,
                  { color: theme.textPrimaryColor },
                ]}
                onLinkPress={handleLinkPress}
                >
                {content}
              </HTMLRenderer>
              <Spacer size={3} setMinSize fixedSize />
            </>
          )}
        </PaddingContainer>
      </Box>
    </>
  );
};

const styles = createStyle((theme) => ({
  image: {
    width: '100%',
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(14),
  },
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(24),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(28),
  },
  content: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(21),
  },
  date: {
    fontFamily: theme.typography.fontFamily.regularItalic,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(14),
  },
}));

export default Content;
