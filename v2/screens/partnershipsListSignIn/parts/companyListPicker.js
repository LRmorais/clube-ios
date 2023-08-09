import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {useContext} from '../context';
const SelectList = () => {
    const {
      setCompanySelected,
      companySelected,
      companiesNotLoganIntegration
  } = useContext();

  const handleSelectChange = (itemValue) => {
    setCompanySelected(itemValue);
  };

  const showNoOptionsMessage = companiesNotLoganIntegration.length === 0;

  return (
    <View style={styles.container}>
      {showNoOptionsMessage ? (
        <Picker>
          <Picker.Item label="Nenhuma empresa disponível" value={null} />
        </Picker>
      ) : (
        <Picker
          style={styles.picker}
          selectedValue={companySelected}
          onValueChange={handleSelectChange}
        >
          <Picker.Item label="Selecione uma empresa..." value={null} />
          {companiesNotLoganIntegration.map((company) => (
            <Picker.Item
              key={company.id}
              label={company.title}
              value={company.id}
            />
          ))}
        </Picker>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '80%', // Defina a largura desejada aqui
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  picker: {
    color: '#000',
  },
});

export default SelectList;
