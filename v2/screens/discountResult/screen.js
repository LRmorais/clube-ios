import React from 'react';
import {View} from 'react-native';

import LayoutScreen from '../../components/layoutScreen';
import Box from '../../components/box';
import PaddingContainer from '../../components/paddingContainer';

import OthersHeader from './parts/othersHeader';
import Card from './parts/card';
import EvaluationHead from './parts/evaluationHead';
import Warning from './parts/warning';
import User from './parts/user';
import Info from './parts/info';
import Rules from './parts/rules';
import Instructions from './parts/instructions';
import VIPFacts from './parts/VIPFacts';
import Billing from './parts/billing';
import PaymentMethod from './parts/paymentMethod';
import Skeleton from './parts/skeleton';

import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';
import {useContext} from './context';

const Screen = () => {
  const {theme} = useLayoutContext();
  const {paymentDetails, loading} = useContext();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.greyishBackground}]}>
      {loading ? (
        <View>
          <Skeleton />
        </View>
      ) : (
        <>
          <OthersHeader />
          <LayoutScreen>
            <Card />
            <EvaluationHead />
            <Box
              shadow={paymentDetails ? 'bottom' : 'none'}
              noGutters="bottom"
              title={paymentDetails ? 'Loja' : undefined}
              titleColor={theme.primaryColor}>
              <PaddingContainer>
                <Warning />
                <User />
                <Info />
                <Rules />
                <Instructions />
              </PaddingContainer>
            </Box>
            <VIPFacts />
            {paymentDetails && (
              <>
                <Box
                  shadow="both"
                  title="Valor do pedido"
                  titleColor={theme.primaryColor}>
                  <PaddingContainer>
                    <Billing />
                  </PaddingContainer>
                </Box>
                <Box
                  shadow="top"
                  title="Método de pagamento"
                  titleColor={theme.primaryColor}
                  fill>
                  <PaddingContainer>
                    <PaymentMethod />
                  </PaddingContainer>
                </Box>
              </>
            )}
          </LayoutScreen>
        </>
      )}
    </View>
  );
};

const styles = createStyle({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default Screen;
