import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import ImageWithLoading from '../../../../components/imageWithLoading';
import defaultLogo from '../../../../images/logo/sideMenu.png';
import { useLayoutContext } from '../../../../hocs/layout';

const HeaderDestaques = props => {
  const { width, height } = Dimensions.get('window');
  const { theme } = useLayoutContext();

  const [logoSource, setLogoSource] = useState(
    theme.logo ? { uri: theme.logo } : defaultLogo,
  );
  const [logoAspectRatio, setLogoAspectRatio] = useState(
    theme.logoAspectRatio || 14 / 7,
  );

  function handleLogoError() {
    setLogoSource(defaultLogo);
    setLogoAspectRatio(14 / 7);
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingLeft: 25,
      paddingRight: 25,
      paddingBottom: 25,
    },
    logo: {
      alignSelf: 'stretch',
      // height: 58.5,
      // marginRight: 40
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginLeft: '23%'
    },
    iconContainer: {
      marginRight: 15,
    },
    profileImage: {
      width: 33,
      height: 33,
      borderRadius: 50,
      marginLeft: 10,
    },
  });

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: props.backgroundColor,
          ...styles.container,
        }}>
        <View>
          <ImageWithLoading
            // containerStyle={[styles.logo, {aspectRatio: logoAspectRatio}, { width: width * 0.4, height: height * 0.2 }]}
            containerStyle={[styles.logo, { width: width * 0.30, height: height * 0.1 }]}
            source={logoSource}
            resizeMode="contain"
            onError={handleLogoError}
          />
        </View>

        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={props.search}>
            <Icon color="#fff" name="search" size={20} />
          </TouchableOpacity>

          <TouchableOpacity onPress={props.menuProfile}>
            <Image
              source={{
                uri:
                  props.imageProfile ||
                  'https://clube-static.clubegazetadopovo.com.br/images/users/1582220891432.png',
              }}
              style={styles.profileImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HeaderDestaques;
