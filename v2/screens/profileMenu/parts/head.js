import React from 'react';
import moment from 'moment';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

import createStyle from '../../../utils/style';
import {useContext} from '../context';
const Head = () => {
  const {userInfo, returnToPreviousScreen, handleProfilePress} = useContext();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={returnToPreviousScreen}>
        <View style={styles.closeContainer}>
          <Icon color="#fff" name="times" size={20} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileContainer}
        onPress={handleProfilePress}>
        <Image
          source={{
            uri:
              userInfo.img ||
              'https://clube-static.clubegazetadopovo.com.br/images/users/1582220891432.png',
          }}
          style={styles.profileImage}
          resizeMode="contain"
        />
        <Text style={styles.textName}>{userInfo.name}</Text>

        <Text style={styles.textCreated}>{`Assinante desde ${moment(
          userInfo.createdAt,
        ).format('YYYY')}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = createStyle(theme => ({
  headerContainer: {
    flexDirection: 'column',
    height: '50%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  closeContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  profileContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '70%',
    alignItems: 'center',
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  textName: {
    color: '#fff',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(15),
  },
  textCreated: {
    color: '#fff',
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
}));

export default Head;
