import React from 'react';
import { ImageBackground, Text } from 'react-native';

import HeaderBar from '../../../components/headerBar';
import ImageEmpty from '../../../components/imageEmpty';
import StarRating from '../../../components/starRating';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const EvaluationHead = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    evaluationId,
    rating,
    thingType,
    returnToPreviousScreen: handleBackPress,
    handleRatingChange,
  } = useContext();

  if (!evaluationId || thingType === 'movieTicket') return null;

  return (
    <ImageBackground
      imageStyle={styles.image}
      style={{ backgroundColor: theme.green__main }}
      source={require('../../../images/textures/TexturaCircles.png')}
      resizeMode="cover"
    >
      <HeaderBar
        statusBarProps={{
          backgroundColor: theme.green__main,
        }}
        rightIcons={[
          {
            id: 'close',
            backgroundColor: 'transparent',
            iconColor: theme.contrastTextColor,
            onPress: handleBackPress,
          },
        ]}
      />
      <ImageEmpty
        backgroundColor="transparent"
        substractHeaderBar
        introInfo={{
          text: 'Desconto resgatado',
          color: theme.contrastTextColor,
        }}
        mainInfo={{
          text: 'Parabéns! Seu desconto de assinante foi resgatado!',
          color: theme.contrastTextColor,
        }}
        bottomContent={(
          <>
            <Text style={[
              styles.bottomContentText,
              { color: theme.contrastTextColor },
            ]}>
              Como você avalia a sua experiência neste parceiro?
            </Text>
            <StarRating
              color={{
                checked: theme.VIPBackground,
                unchecked: theme.inputBackground,
              }}
              size={38}
              readOnly={!!rating}
              value={rating}
              onChange={handleRatingChange}
            />
          </>
        )}
      />
    </ImageBackground>
  );
};

const styles = createStyle((theme) => ({
  image: {
    zIndex: -1,
  },
  bottomContentText: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(3),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    textAlign: 'center',
  }
}));

export default EvaluationHead;
