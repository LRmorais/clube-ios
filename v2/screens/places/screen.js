import React from 'react';
import {View} from 'react-native';

import LayoutScreen from '../../components/layoutScreen';

import Skeleton from './parts/skeleton';
import Header from './parts/header';
import SortAndFilters from './parts/sortAndFilters';
import Maps from './parts/maps';
import List from './parts/list';
import NoResults from './parts/noResults';
import AbsoluteButtons from './parts/absoluteButtons';
import SortModal from './parts/sortModal';
import Spacer from '../../components/spacer';
import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';
import {useContext} from './context';

const Screen = () => {
  const {theme} = useLayoutContext();
  const {viewMode, partnersData} = useContext();

  return (
    <>
      {partnersData ? (
        <View
          style={[styles.container, {backgroundColor: theme.whiteBackground}]}>
          <Header />
          <LayoutScreen>
            {/* <SortAndFilters /> */}
            <Maps />
            <List />
            <NoResults />
            {viewMode !== 'maps' ? <Spacer size={10} setMinSize /> : <></>}
          </LayoutScreen>
          <AbsoluteButtons />
          {/* <SortModal /> */}
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

const styles = createStyle({
  container: {
    flex: 1,
  },
});

export default Screen;
