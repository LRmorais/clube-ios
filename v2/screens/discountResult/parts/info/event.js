import React from 'react';

import EventConciseListItem from '../../../../components/listItem/eventConcise';
import Spacer from '../../../../components/spacer';
import {getDistance} from '../../../../utils/map';
import {ASSET_PREFIX} from '../../../../constants/env';
import {useLayoutContext} from '../../../../hocs/layout';
import {useGlobalStateContext} from '../../../../hocs/globalState';
import {useContext} from '../../context';

const EventInfo = () => {
  const {theme} = useLayoutContext();
  const {deviceLocation} = useGlobalStateContext();
  const {thing: event} = useContext();

  const distance =
    deviceLocation &&
    event?.eventPlace?.latitude &&
    event?.eventPlace?.longitude &&
    getDistance(
      {
        lat: deviceLocation.coords.latitude,
        lng: deviceLocation.coords.longitude,
      },
      {
        lat: Number(event.eventPlace?.latitude),
        lng: Number(event.eventPlace?.longitude),
      },
      true,
    );

  const icons = [];
  if (event.discountAmount) {
    icons.push({
      id: 'voucher',
      label: `${event.discountAmount}%`,
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
      <EventConciseListItem
        id={event.id}
        horizontal
        color={{
          image: theme.tertiaryColor,
          text: {
            date: theme.red__main,
            primary: theme.primaryColor,
            secondary: theme.primaryColor,
          },
        }}
        image={ASSET_PREFIX + event.logo}
        text={{
          primary: event.name,
          secondary: event.eventPlace?.name,
          price: event.minPrice,
          date: event.nextDate,
        }}
        icons={icons}
      />
      <Spacer size={3} fixedSize setMinSize />
    </>
  );
};

export default EventInfo;
