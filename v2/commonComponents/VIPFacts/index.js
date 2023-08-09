import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';

import Box from '../../components/box';
import InfoBox from '../../components/infoBox';
import Spacer from '../../components/spacer';
import VIPFact from '../../components/vipFact';
import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';

const VIPFacts = props => {
  const {theme} = useLayoutContext();

  const isVIP =
    props?.partner?.partnerType === 2 || props?.partner?.partnerType === 3;

  if (!isVIP) {
    return null;
  }

  return (
    <Box shadow={props.shadow} background={theme.VIPBackground}>
      <InfoBox
        title="Este é um parceiro VIP!"
        icon="star"
        color={{
          icon: theme.primaryColor,
          title: theme.primaryColor,
        }}>
        <Text style={[styles.regular, {color: theme.textPrimaryColor}]}>
          Além do benefício habitual, este parceiro oferece vantagens especiais
          para quem é <Text style={styles.bold}>Assinante VIP.</Text>
        </Text>
        <Spacer size={2} fixedSize />
        <VIPFact color={theme.textPrimaryColor}>
          {props?.partner?.partnerVipRoles}
        </VIPFact>
      </InfoBox>
    </Box>
  );
};

VIPFacts.propTypes = {
  partner: PropTypes.object.isRequired,
  shadow: PropTypes.string,
};

const styles = createStyle(theme => ({
  regular: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: 21,
  },
  bold: {
    fontFamily: theme.typography.fontFamily.bold,
  },
}));

export default VIPFacts;
