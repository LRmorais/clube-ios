import React from 'react';

import RadioGroup from '../../../components/radio/group';
import { useContext } from '../context';

const NameField = () => {
  const {
    radioColor,
    values,
    setValuesHOF,
  } = useContext();
  const field = 'genre';
  const value = values[field] || '';
  const handleChange = setValuesHOF(field);

  return (
    <RadioGroup
      data={[
        {
          label: 'Masculino',
          value: 'm',
          color: radioColor,
        },
        {
          label: 'Feminino',
          value: 'f',
          color: radioColor,
        },
        {
          label: 'Prefiro não informar',
          value: '',
          color: radioColor,
        },
      ]}
      value={value}
      onChange={handleChange}
      horizontal
      label="Gênero"
      color={{
        label: radioColor.label,
      }}
    />
  );
};

export default NameField;
