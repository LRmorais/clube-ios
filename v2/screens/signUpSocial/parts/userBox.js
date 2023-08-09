import React from 'react';

import UserBoxModal from '../../../components/userbox';
import { useContext } from '../context';

const UserBox = (props) => {
  const {
    screenPalette,
    photo,
    email,
    name 
  } = useContext();
  return (
    <UserBoxModal
      color={screenPalette.userBox.color}
      name={name}
      email={email}
      photo={photo}
      background={screenPalette.userBox.background}
    />
  );
};

export default UserBox;
