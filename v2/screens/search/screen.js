import React from 'react';
import {View} from 'react-native';

import LayoutScreen from '../../components/layoutScreen';

import Header from './parts/header';
import SortAndFilters from './parts/sortAndFilters';
import List from './parts/list';

import SortModal from './parts/sortModal';

import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';
import {useContext} from './context';
import Skeleton from './parts/skeleton';

const Screen = () => {
  const {theme} = useLayoutContext();
  const {loading} = useContext();
  return (
    <View style={[styles.container, {backgroundColor: theme.whiteBackground}]}>
      <Header />

      {/* <SortModal /> */}
      {/* <SortAndFilters /> */}

      <LayoutScreen>
        <>
          {loading ? (
            <Skeleton />
          ) : (
            <>
              <List />
              <View style={styles.blankSpace} />
            </>
          )}
        </>
      </LayoutScreen>
    </View>
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
