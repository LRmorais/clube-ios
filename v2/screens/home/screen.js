import React from 'react';
import {View} from 'react-native';

import LayoutScreen from '../../components/layoutScreen';

import Destaques from './parts/destaques';
import CompleteProfileMessage from './parts/completeProfileMessage';
import Feed from './parts/feed';
import AbsoluteButtons from './parts/absoluteButtons';
import CompleteProfileModal from './parts/completeProfileModal';

import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';

const Screen = () => {
  const {theme} = useLayoutContext();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.greyishBackground}]}>
      <LayoutScreen>
        <Destaques />
        <CompleteProfileMessage />
        <Feed />
      </LayoutScreen>
      <AbsoluteButtons />
      <CompleteProfileModal />
    </View>
  );
};

const styles = createStyle({
  container: {
    flex: 1,
  },
});

export default Screen;
