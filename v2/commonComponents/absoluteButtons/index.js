import React, {useState, useEffect} from 'react';
import {Linking} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import PropTypes from 'prop-types';
import axios from 'axios';

import PaddingContainer from '../../components/paddingContainer';
import FloatingButton from '../../components/button/floating';
import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';
import {useAnalyticsContext} from '../../hocs/analytics';

import {CORE_URL} from '../../constants/env';

const AbsoluteButtons = props => {
  const navigation = useNavigation();
  const {theme} = useLayoutContext();
  const {dispatchRecord} = useAnalyticsContext();
  const [events, setEvents] = useState([]);
  const [place, setPlace] = useState([]);
  const thing =
    props.from &&
    {
      event: events,
      place: place,
    }[props.from.type];

  async function getEvents() {
    if (props?.from?.type === 'event') {
      try {
        const response = await axios.get(
          `${CORE_URL}events/id/${props.from.id}`,
        );
        setEvents(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function getPlaces() {
    if (props?.from?.type === 'place') {
      try {
        const response = await axios.get(
          `${CORE_URL}partnerApp/unit/${props.from.id}`,
        );
        setPlace(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getEvents();
    getPlaces();
  }, []);

  const showPurchaseButton = thing && thing.hasPurchaseInClub;
  const purchaseText =
    props.from &&
    {
      event: 'Comprar ingresso',
      place: 'Comprar',
    }[props?.from?.type];

  function handleDiscountPress() {
    const routeName =
      props?.from?.type === 'event' ||
      thing?.discountType === 2 ||
      thing?.discountType === 3
        ? 'DiscountResult'
        : 'RedeemDiscount';
    // 'DiscountRequest';
    navigation.navigate({
      routeName,
      params: props.from,
    });
  }

  function handlePurchasePress() {
    try {
      dispatchRecord('Abrir link de compra', {
        value: thing.purchaseInClubURL,
      });
      Linking.openURL(`${thing.purchaseInClubURL}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`);
    } catch {
      //
    }
  }

  return (
    <PaddingContainer style={styles.container} pointerEvents="box-none">
      {showPurchaseButton ? (
        <FloatingButton
          colors={{
            main: theme.secondButtonBackground,
            shadow: theme.secondButtonShadow,
            text: theme.secondButtonTextColor,
          }}
          text={purchaseText}
          textSize="smaller"
          onPress={handlePurchasePress}
        />
      ) : (
        <FloatingButton
          colors={{
            main: theme.primaryButtonBackground,
            shadow: theme.primaryButtonShadow,
            text: theme.primaryButtonTextColor,
          }}
          text="Resgatar desconto"
          textSize={showPurchaseButton ? 'smaller' : 'small'}
          onPress={handleDiscountPress}
        />
      )}
      {/* <FloatingButton
        colors={{
          main: theme.primaryButtonBackground,
          shadow: theme.primaryButtonShadow,
          text: theme.primaryButtonTextColor,
        }}
        text="Resgatar desconto"
        textSize={showPurchaseButton ? 'smaller' : 'small'}
        onPress={handleDiscountPress}
      />
      {!!showPurchaseButton && (
        <>
          <Spacer size={2.5} fixedSize horizontal />
          <FloatingButton
            colors={{
              main: theme.secondButtonBackground,
              shadow: theme.secondButtonShadow,
              text: theme.secondButtonTextColor,
            }}
            text={purchaseText}
            textSize="smaller"
            onPress={handlePurchasePress}
          />
        </>
      )} */}
    </PaddingContainer>
  );
};

AbsoluteButtons.propTypes = {
  from: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['place', 'event']).isRequired,
    validationId: PropTypes.number,
  }),
};

const styles = createStyle(theme => ({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: theme.spacing(4.5),
    backgroundColor: 'transparent',
    zIndex: 200,
  },
}));

export default AbsoluteButtons;
