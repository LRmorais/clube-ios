import React from 'react';
import {View} from 'react-native';

import Spacer from '../../components/spacer';

import SearchCategories from './searchCategories/index';
import Categories from './categories';
import Movies from './movies';
import Events from './events';
import NoLocation from '../noLocation';

import News from './news';

import {useLayoutContext} from '../../hocs/layout';

const Feed = () => {
  const {theme} = useLayoutContext();

  return (
    <View style={{backgroundColor: theme.greyishBackground}}>
      <Categories />
      {/* <NoLocation /> */}
      <Movies />
      <Events />
      <News />
      <SearchCategories />
      <Spacer size={11} fixedSize />
    </View>
  );
};

export default Feed;
