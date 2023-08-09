import React from 'react';
import {View} from 'react-native';

import HTMLRenderer from '../../../components/htmlRenderer';
import Spacer from '../../../components/spacer';
import createStyle from '../../../utils/style';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const Warning = () => {
  const {theme} = useLayoutContext();
  const {evaluationId, thingType} = useContext();

  if (evaluationId || thingType === 'movieTicket') {
    return null;
  }

  return (
    <>
      <View
        style={[styles.container, {backgroundColor: theme.secondColorShade}]}>
        <HTMLRenderer style={[styles.content, {color: theme.primaryColor}]}>
          {
            '<p>Não esqueça de pedir para o estabelecimento validar seu CPF. <b>Só assim você contabiliza sua experiência para o VIP e pode deixar sua avaliação.</b></p>'
          }
        </HTMLRenderer>
      </View>
      <Spacer size={3} fixedSize setMinSize />
    </>
  );
};

const styles = createStyle(theme => ({
  container: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1),
    paddingVertical: theme.spacing(2),
    paddingHorizontal: theme.spacing(1.5),
    borderRadius: 2,
  },
  content: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(20),
    textAlign: 'center',
  },
}));

export default Warning;
