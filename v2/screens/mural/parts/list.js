import React, {useState, useEffect} from 'react';
import {Text, Image} from 'react-native';

import PaddingContainer from '../../../components/paddingContainer';
import ImageWithLoading from '../../../components/imageWithLoading';
import HTMLRenderer from '../../../components/htmlRenderer';
import FloatingButton from '../../../components/button/floating';
import Spacer from '../../../components/spacer';
import createStyle from '../../../utils/style';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';
import {ASSET_PREFIX} from '../../../constants/env';
import {View} from 'react-native-animatable';

const List = () => {
  const {theme} = useLayoutContext();
  const {
    muralData,
    openCTAHOF: handleCTAPressHOF,
    sendLinkRecord: handleLinkPress,
  } = useContext();

  function noop() {}

  const [aspectRatio, setAspectRatio] = useState(2 / 1);

  useEffect(() => {
    if (!muralData.image) {
      return;
    }

    Image.getSize(
      ASSET_PREFIX + muralData.image,
      (width, height) => setAspectRatio(width / height),
      noop,
    );
  }, []);

  return (
    <View style={styles.container}>
      <PaddingContainer>
        {muralData.title ? (
          <Text style={[styles.title, {color: theme.primaryColor}]}>
            {muralData.title}
          </Text>
        ) : null}

        {muralData.image ? (
          <ImageWithLoading
            containerStyle={[styles.image, {aspectRatio}]}
            source={{uri: ASSET_PREFIX + muralData.image}}
          />
        ) : null}
        {muralData.content ? (
          <HTMLRenderer
            style={[styles.content, {color: theme.textPrimaryColor}]}
            onLinkPress={handleLinkPress}>
            {muralData.content}
          </HTMLRenderer>
        ) : null}
        {muralData.link && muralData.calltoaction ? (
          <>
            <Spacer size={3} fixedSize setMinSize />
            <FloatingButton
              text={muralData.calltoaction}
              textSize="small"
              onPress={handleCTAPressHOF(muralData)}
              colors={{
                main: theme.primaryButtonBackground,
                shadow: theme.primaryButtonShadow,
                text: theme.primaryButtonTextColor,
              }}
            />
          </>
        ) : null}
      </PaddingContainer>
    </View>
  );
};

const styles = createStyle(theme => ({
  container: {
    paddingVertical: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(3),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(16),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(24),
  },
  content: {
    marginTop: theme.spacing(3),
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(21),
  },
  image: {
    width: '100%',
  },
}));

export default List;
