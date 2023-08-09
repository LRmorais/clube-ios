import React from 'react';

import EventInfo from './event';
import PlaceInfo from './place';
import MovieTicketInfo from './movieTicket';
import {useContext} from '../../context';

const Info = () => {
  const {thingType} = useContext();

  const Component = {
    event: EventInfo,
    place: PlaceInfo,
    movieTicket: MovieTicketInfo,
  }[thingType];

  return <Component />;
};

export default Info;
