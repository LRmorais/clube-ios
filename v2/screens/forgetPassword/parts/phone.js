import React from 'react';

import TextLabel from '../../../components/textLabelWithIcon';
import { useContext } from '../context';
import Icon from '../../../components/icons/';
const Phone = (props) => {
  const {
    screenPalette,
  } = useContext();

  return ( 
    <>
     
      <TextLabel     
        color={screenPalette.section_title}
        icon={props.icon}
        onPress={props.onPress}
        textSize="small"
        fontStyleNormal={props.fontStyleNormal}
        numberOfLines={1}
        textAlign='center'
      >
        {props.children}
      </TextLabel>
    </>
  );
};

export default Phone;
