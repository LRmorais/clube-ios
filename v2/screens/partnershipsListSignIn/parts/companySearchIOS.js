import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { useContext } from '../context';

const SelectList = () => {
  const {
    setCompanySelected,
    companySelected,
    companiesNotLoganIntegration,
  } = useContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  const handleSelectChange = (itemValue) => {
    setCompanySelected(itemValue);
    setSearchQuery(filteredCompanies.find(company => company.id === itemValue)?.title || '');
  };

  const updateFilteredCompanies = (query) => {
    if (query === '') {
        setCompanySelected();
      setFilteredCompanies([]);
    } else {
      const filtered = companiesNotLoganIntegration.filter(company =>
        company.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da sua empresa"
        onChangeText={(text) => {
          setSearchQuery(text);
          updateFilteredCompanies(text);
        }}
        value={searchQuery}
      />
      {searchQuery !== '' && filteredCompanies.length === 0 ? (
        <Text>Nenhuma empresa disponível</Text>
      ) : (
        <FlatList
          data={filteredCompanies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text
              style={styles.companyItem}
              onPress={() => handleSelectChange(item.id)}
            >
              {item.title}
            </Text>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  companyItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10
  },
});

export default SelectList;
