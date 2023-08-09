import React from 'react';

import TextLabel from '../../../components/textLabel';
import { useContext } from '../context';

const SectionTitle = (props) => {
  const {
    screenPalette,
  } = useContext();

  return (
    <TextLabel  
      color={screenPalette.section_title}
      textSize="small"
      fontStyleNormal={props.fontStyleNormal}
      numberOfLines={5}
      textAlign={props.textAlign}
    >
      {props.children}
    </TextLabel>
  );
};

export default SectionTitle;
