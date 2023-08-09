import React from 'react';
import {View, Image} from 'react-native';

import DefaultCard from './default';
import CouponCard from './coupon';
import LinkCard from './link';
import MovieTicketCard from './movieTicket';
import createStyle from '../../../../utils/style';
import {useLayoutContext} from '../../../../hocs/layout';
import {useContext} from '../../context';

const Card = () => {
  const {theme} = useLayoutContext();
  const {thingType, thing, evaluationId} = useContext();

  const key = {
    event: () => thing?.discountType,
    place: () => thing?.discountType,
    movieTicket: () => 5,
  }[thingType]();

  const Component = {
    1: DefaultCard,
    2: CouponCard,
    3: CouponCard,
    4: LinkCard,
    5: MovieTicketCard,
  }[key];
  const backgroundColor = {
    1: theme.greyishBackground,
    2: theme.whiteBackground,
    3: theme.whiteBackground,
    4: theme.whiteBackground,
    5: theme.whiteBackground,
  }[key];

  if (evaluationId || !Component) {
    return null;
  }

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={[styles.background, {backgroundColor: theme.primaryColor}]}>
        <Image
          style={styles.shadow}
          source={require('../../../../images/vectors/bottomShadow.png')}
          resizeMode="stretch"
        />
      </View>
      <Component />
    </View>
  );
};

const styles = createStyle(theme => ({
  container: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(2.5),
  },
  background: {
    position: 'absolute',
    width: '100%',
    aspectRatio: 360 / 114,
    top: 0,
    left: 0,
    right: 0,
  },
  shadow: {
    position: 'absolute',
    width: '100%',
    height: theme.spacing(0.75),
    left: 0,
    right: 0,
    bottom: theme.spacing(-0.75),
    zIndex: 1,
  },
}));

export default Card;
