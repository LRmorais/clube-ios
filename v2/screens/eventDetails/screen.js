/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';

import Skeleton from './parts/skeleton';
import LayoutScreen from '../../components/layoutScreen';
import Box from '../../components/box';
import Spacer from '../../components/spacer';

import Header from './parts/header';
import Head from './parts/head';
import Address from './parts/address';
import Info from './parts/info';
import Infos from './parts/infos';
import Rules from './parts/Rules';
import Tickets from './parts/tickets';
import AbsoluteButtons from './parts/absoluteButtons';

import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';
import {useContext} from './context';

const Screen = () => {
  const {theme} = useLayoutContext();
  const {eventDetail} = useContext();

  return (
    <>
      {eventDetail ? (
        <View
          style={[
            styles.container,
            {backgroundColor: theme.greyishBackground},
          ]}>
          <Header />
          <LayoutScreen>
            <Head />
            <Spacer size={1} fixedSize />
            <Infos />
            <Spacer size={1} fixedSize />
            <Rules />
            <Spacer size={1} fixedSize />
            <Tickets />
            <View style={styles.blankSpace} />
          </LayoutScreen>
          {eventDetail.purchaseInClubURL ? null : <AbsoluteButtons />}
        </View>
      ) : (
        <>
          <Header />
          <Skeleton />
        </>
      )}
    </>
  );
};

const styles = createStyle(theme => ({
  container: {
    flex: 1,
  },
  blankSpace: {
    height: theme.spacing(11),
  },
}));

export default Screen;
