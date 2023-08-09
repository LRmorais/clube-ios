import React from 'react';

import PlaceListItem from '../../../../components/listItem/place';
import Spacer from '../../../../components/spacer';
import {getDistance} from '../../../../utils/map';
import {API_BASE_URL} from '../../../../constants/env';
import {useLayoutContext} from '../../../../hocs/layout';
import {useGlobalStateContext} from '../../../../hocs/globalState';
import {useContext} from '../../context';

const MovieTicketInfo = () => {
  const {theme} = useLayoutContext();
  const {deviceLocation} = useGlobalStateContext();
  const {thing, evaluationId} = useContext();
  const place = thing.partner;

  console.log('nas infos:', place);
  return (
    <>
      <PlaceListItem
        id={place.id}
        color={{
          image: theme.secondColorShade,
          title: theme.primaryColor,
        }}
        title={thing.partner.name}
        image={place?.logo}
        partnerName={place.name}
        category="Cinemas"
      />
      <Spacer size={3} fixedSize setMinSize />
    </>
  );
};

export default MovieTicketInfo;
