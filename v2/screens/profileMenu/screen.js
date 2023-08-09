import React from 'react';
import {View, SafeAreaView} from 'react-native';
import PaddingContainer from '../../components/paddingContainer';

import {useLayoutContext} from '../../hocs/layout';
import Divider from '../../components/divider';
import createStyle from '../../utils/style';

import Menu from './parts/menu';
import Head from './parts/head';
import ExitButton from './parts/exitButton';
import Feedback from './parts/feedback';
import Loading from './parts/loading';

const Screen = () => {
  const {theme} = useLayoutContext();
  return (
    <>
      <View style={[styles.container, {backgroundColor: theme.primaryColor}]}>
        <SafeAreaView>
          <PaddingContainer>
            <View style={styles.content}>
              <Head />
              <Divider />
              <Menu />
              <ExitButton />
            </View>
          </PaddingContainer>
        </SafeAreaView>
      </View>
      <Feedback />
      <Loading />
    </>
  );
};

const styles = createStyle(theme => ({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'column',
    width: '100%',
    height: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default Screen;
