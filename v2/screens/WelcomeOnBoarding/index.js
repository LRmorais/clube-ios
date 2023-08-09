import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Linking,
} from 'react-native';

import OnBoarding from 'react-native-onboarding-swiper';
import {theme} from '../../utils/style';

import Spacer from '../../components/spacer';
import {RoundedButton} from '../../components/RoundedButton';

import Illustration1 from '../../images/stuff/onboarding-illustration-1.png';
import Illustration2 from '../../images/stuff/onboarding-illustration-2.png';
import Illustration3 from '../../images/stuff/onboarding-illustration-3.png';

const phoneHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30287b',
  },
  onBoardingContainer: {
    height: phoneHeight > 592 ? phoneHeight / 1.5 : phoneHeight / 1.5,
  },
  containerOnBoarding: {
    justifyContent: 'flex-start',
  },
  imageContainer: {
    height: phoneHeight > 592 ? phoneHeight / 2.3 : phoneHeight / 2.5,
    paddingBottom: 0,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    height: '100%',
    width: '100%',
    marginBottom: 0,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 22,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.palette.primary.contrast,
  },
  subtitleContainer: {
    maxWidth: 320,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily.extraLight,
    color: theme.palette.primary.contrast,
  },
  bold: {
    fontFamily: theme.typography.fontFamily.bold,
  },
  dotComponent: {
    padding: 1,
    width: 30,
    marginHorizontal: 5,
    backgroundColor: theme.palette.primary.contrast,
  },
  dotComponentSelected: {
    opacity: 0.3,
  },
  actionsContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 30,
    backgroundColor: theme.palette.primary.main,
    // backgroundColor: '#30287b',
    justifyContent: 'center',
  },
});

export const WelcomeOnBoarding = (props) => {
  const {navigate} = props.navigation;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.palette.primary.main} />
      <View style={styles.onBoardingContainer}>
        <OnBoarding
          containerStyles={styles.containerOnBoarding}
          imageContainerStyles={styles.imageContainer}
          titleStyles={styles.title}
          showPagination={true}
          showDone={false}
          showSkip={false}
          showNext={false}
          DotComponent={({selected}) => (
            <View
              style={[
                styles.dotComponent,
                !selected && styles.dotComponentSelected,
              ]}
            />
          )}
          skipToPage={1}
          bottomBarColor={theme.palette.primary.main}
          bottomBarHeight={20}
          pages={[
            {
              image: (
                <Image style={styles.illustration} source={Illustration1} />
              ),
              title: 'Bem vindo ao Clube',
              subtitle: (
                <View style={styles.subtitleContainer}>
                  <Text style={styles.subtitle}>
                    Com o <Text style={styles.bold}>Clube Gazeta do Povo</Text>{' '}
                    você economiza todos os dias.
                  </Text>
                </View>
              ),
              backgroundColor: theme.palette.primary.main,
            },
            {
              image: (
                <Image style={styles.illustration} source={Illustration2} />
              ),
              title: '+1.000 parceiros Clube',
              subtitle: (
                <View style={styles.subtitleContainer}>
                  <Text style={styles.subtitle}>
                    São mais de <Text style={styles.bold}>1.000 parceiros</Text>
                    , em <Text style={styles.bold}>30 categorias</Text> para
                    você aproveitar.
                  </Text>
                </View>
              ),
              backgroundColor: theme.palette.primary.main,
            },
            {
              image: (
                <Image style={styles.illustration} source={Illustration3} />
              ),
              title: 'Viva mais, gaste menos',
              subtitle: (
                <View style={styles.subtitleContainer}>
                  <Text style={styles.subtitle}>
                    <Text style={styles.bold}>R$ 200,00</Text> é a média que
                    nossos assinantes economizam,{' '}
                    <Text style={styles.bold}>todos os meses</Text>.
                  </Text>
                </View>
              ),
              backgroundColor: theme.palette.primary.main,
            },
          ]}
        />
      </View>
      <View style={styles.actionsContainer}>
        <RoundedButton action={() => navigate('SignIn')} title="ENTRAR" />
        <Spacer size={2} fixedSize />
        <RoundedButton
          outlined
          openLink={true}
          title="ASSINE O CLUBE"
        />
        <Spacer size={2} fixedSize />
        <RoundedButton action={() => navigate('PartnershipsListSignIn')} title="PARCERIAS" />
      </View>
    </View>
  );
};
