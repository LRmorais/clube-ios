import React from 'react';

import Title from '../../../components/title';
import {useContext} from '../context';

const SectionTitle = (props) => {
  const {screenPalette} = useContext();

  return (
    <Title color={screenPalette.section_title} {...props}>
      {props.children}
    </Title>
  );
};

export default SectionTitle;
