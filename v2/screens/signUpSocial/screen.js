import React from 'react';
import { ImageBackground, View } from 'react-native';
import LayoutScreen from '../../components/layoutScreen';
import PaddingContainer from '../../components/paddingContainer';
import Spacer from '../../components/spacer';
import Header from './parts/header';
import ContinueButton from './parts/continueButton';
import createStyle from '../../utils/style';
import { useContext } from './context';
import CpfField from './parts/cpfField';
import SectionDescription from './parts/sectionDescription';
import PasswordField from './parts/passwordField';
import Loading from './parts/loading'
import Feedback from './parts/feedback'
import UserBox from './parts/userBox'
import GoToForgotPasswordLink from './parts/goToForgotPasswordLink'


const Screen = () => {
  const {
    screenPalette,
    name,
    email,
    photo,
    action
  } = useContext();
 

  return (
    <ImageBackground
      style={[
        styles.imageBackground,
        { backgroundColor: screenPalette.screen.background },
      ]}
      source={require('../../images/textures/TexturaCurves.png')}
      resizeMode="cover"
    >
       <Header />
       <LayoutScreen>
        <PaddingContainer style={styles.content}>
              <Spacer size={1} setMinSize/>
              {action == 1 ? 
                  (<><SectionDescription>{`VOCÊ ESTÁ ACESSANDO COMO:`}</SectionDescription><UserBox name={name} email={email} photo={photo}/><SectionDescription>{`Para continuar, informe o seu CPF.`}</SectionDescription></>) :
                  (<SectionDescription>{`VERIFICAMOS QUE JÁ EXISTE UMA CONTA COM ESSE CPF, PARA ACESSÁ-LA, INSIRA SUA SENHA.`}</SectionDescription> )
              }

              <Spacer size={1} setMinSize/>
              {action == 1 ? 
                <CpfField /> :
                <><PasswordField /><GoToForgotPasswordLink /></>
              }
              <Spacer size={1} setMinSize/>
              <ContinueButton text={action== 1 ? "PRÓXIMO" : "ENTRAR"} />
              <Spacer size={1} setMinSize/>
              <Spacer size={10} setMinSize/>
              
       </PaddingContainer>
       </LayoutScreen>

       <Loading />
      <Feedback />

    </ImageBackground>
  );
};

const styles = createStyle({
  imageBackground: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  socialButton: {
    flex: 1,
  },
  submitButton: {
    width: 120,
  },
});

export default Screen;