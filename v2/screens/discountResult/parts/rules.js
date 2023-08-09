import React from 'react';
import {View} from 'react-native';

import InfoBox from '../../../components/infoBox';
import HTMLRenderer from '../../../components/htmlRenderer';
import Spacer from '../../../components/spacer';
import createStyle from '../../../utils/style';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const Rules = () => {
  const {theme} = useLayoutContext();
  const {
    thingType,
    thing,
    paymentDetails,
    sendLinkRecord: handleLinkPress,
  } = useContext();

  const content = {
    event: thingType === 'event' && thing?.roles,
    place: thingType === 'place' && thing?.roles,
    movieTicket: thingType === 'movieTicket' && thing?.rules,
  }[thingType];

  if (!content || paymentDetails) {
    return null;
  }

  return (
    <>
      <InfoBox
        title="Regras de uso"
        icon="info"
        color={{
          icon: theme.primaryColor,
          title: theme.primaryColor,
        }}>
        <HTMLRenderer
          style={[styles.content, {color: theme.textPrimaryColor}]}
          onLinkPress={handleLinkPress}>
          {content}
        </HTMLRenderer>
        <Spacer size={3} fixedSize />
      </InfoBox>
      <Spacer size={3} fixedSize setMinSize />
    </>
  );
};

const styles = createStyle(theme => ({
  content: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: 20,
  },
}));

export default Rules;
