import React from 'react';

import EventHead from '../../../components/head/event';
import {getDistance} from '../../../utils/map';
import {useLayoutContext} from '../../../hocs/layout';
import {useGlobalStateContext} from '../../../hocs/globalState';
import {useContext} from '../context';
import {ASSET_PREFIX} from '../../../constants/env';

const Head = () => {
  const {theme} = useLayoutContext();
  const {deviceLocation} = useGlobalStateContext();
  const {eventDetail, sendLinkRecord: handleLinkPress} = useContext();

  const place = eventDetail.eventPlace;
  const date = eventDetail?.nextDate;

  const distance =
    deviceLocation &&
    place &&
    place.latitude &&
    place.longitude &&
    getDistance(
      {
        lat: Number(place.latitude),
        lng: Number(place.longitude),
      },
      {
        lat: deviceLocation.coords.latitude,
        lng: deviceLocation.coords.longitude,
      },
      true,
    );

  const icons = [];
  if (eventDetail.discountAmount) {
    icons.push({
      id: 'voucher',
      label: `${eventDetail.discountAmount}%`,
      color: {
        icon: theme.primaryColor,
        label: theme.primaryColor,
      },
    });
  }
  if (distance) {
    icons.push({
      id: 'distance',
      label: distance,
      color: {
        icon: theme.primaryColor,
        label: theme.primaryColor,
      },
    });
  }

  return (
    <>
      <EventHead
        color={{
          background: theme.whiteBackground,
          text: theme.primaryColor,
          description: {
            background: '#ffc133',
            text: theme.primaryColor,
          },
        }}
        price={eventDetail.minPrice}
        date={date || undefined}
        icons={icons}
        images={[ASSET_PREFIX + eventDetail.logo]}
        text={{
          title: eventDetail.name,
          description: eventDetail.description,
          date: eventDetail.date,
          slug: eventDetail.Tag.name,
        }}
        onLinkPress={handleLinkPress}
        purchaseURL={eventDetail.purchaseInClubURL}
      />
      {/* <Address /> */}
    </>
  );
};

export default Head;
