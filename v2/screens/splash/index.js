import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

import HeaderBar from '../../components/headerBar';
import ImageWithLoading from '../../components/imageWithLoading';
import Spacer from '../../components/spacer';

import GraphQL from '../../helpers/graphql';
import database from '../../helpers/database';
import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';
import {useGlobalStateContext} from '../../hocs/globalState';
import {useNotificationsContext} from '../../hocs/notifications';

import Logo from '../../images/logo/yellow.png';

const Splash = props => {
  const {palette} = useLayoutContext();
  const screenPalette = palette.splash;
  const {generalData} = useGlobalStateContext();
  const {neededRoute} = useNotificationsContext();
  const {navigate, replace, getParam} = props.navigation;
  // const unnamedParam = getParam('0');
  const waitingScreen = getParam('screen');

  useEffect(() => {
    chooseInitialScreen();
  }, [generalData, neededRoute]);

  async function getUserZet(cpf) {
    try {
      let result = await GraphQL({
        query: `query Query($cpf: String!) {
          getUserZet(cpf: $cpf)
        }`,
        variables: {
          cpf: String(cpf),
        },
      });
      if (result.status !== 200) {
        throw [];
      }

      return result.data.data.getUserZet
    } catch (e) {
      return [];
    }
  }

  async function chooseInitialScreen() {
    let userInfo = await database.get('user-info').then(JSON.parse);

    // if (userInfo === null) return navigate((
    //   /^(assine|entre-para-o-clube)$/.test(unnamedParam)
    //     ? 'SignUp'
    //     : 'AuthSwitch'
    // ));

    if (userInfo === null) {
      navigate('WelcomeOnBoarding');
    } else {
      const userZet = await getUserZet(userInfo.cpf);
      if(userZet){
        console.log('passou');
      }else{
        let {hasClub} = (userInfo?.subscriptions || [])[0] || {};
        if (!hasClub) {
          return navigate('Payment');
        }
      }
    }

    if (!generalData) {
      return;
    }

    if (neededRoute) {
      if (!Array.isArray(neededRoute)) {
        return;
      }

      return replace(...neededRoute);
    }

    console.log('waitingScreen', waitingScreen);
    if (waitingScreen) {
      return replace(waitingScreen, getParam('params'));
    }

    if (userInfo.situation && userInfo.situation === 3) {
      navigate('CompleteRegistration');
    }

    replace('Home');
  }

  return (
    <View style={styles.container}>
      <HeaderBar
        backgroundColor={screenPalette.screen.background}
        onlyStatusBar
      />

      <ImageWithLoading containerStyle={styles.logo} source={Logo} />

      <Spacer size={8} fixedSize />
    </View>
  );
};

Splash.propTypes = {
  screen: PropTypes.string,
  params: PropTypes.object,
};

const styles = createStyle(theme => ({
  container: {
    flex: 1,
    backgroundColor: '#30287b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    aspectRatio: 159 / 146,
  },
}));

export default Splash;
