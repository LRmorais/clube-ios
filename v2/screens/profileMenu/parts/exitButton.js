import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import createStyle from '../../../utils/style';
import {useContext} from '../context';

const ExitButton = () => {
  const {handleLogOutPress} = useContext();
  return (
    <TouchableOpacity style={styles.exitButton} onPress={handleLogOutPress}>
      <View>
        <Text style={styles.textExit}>SAIR DA CONTA</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = createStyle(theme => ({
  textExit: {
    color: '#fff',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
  exitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
}));

export default ExitButton;
