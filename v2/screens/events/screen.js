import React from 'react';
import {View} from 'react-native';

import LayoutScreen from '../../components/layoutScreen';

import Header from './parts/header';

import List from './parts/list';
import NoResults from './parts/noResults';
import BlankSpace from './parts/blankSpace';
import AbsoluteButtons from './parts/absoluteButtons';

import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';
import {useContext} from './context';

const Screen = () => {
  const {
    filteredData,

    events,
  } = useContext();
  const {theme} = useLayoutContext();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.greyishBackground}]}>
      <Header />
      <LayoutScreen>
        {filteredData?.length > 0 || !events ? (
          <>
            <List />
            <BlankSpace />
            <AbsoluteButtons />
          </>
        ) : (
          <NoResults />
        )}
      </LayoutScreen>
    </View>
  );
};

const styles = createStyle({
  container: {
    flex: 1,
  },
});

export default Screen;
