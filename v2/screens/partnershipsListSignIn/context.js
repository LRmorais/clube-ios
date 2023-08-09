import React, {
  createContext,
  useContext as useReactContext,
  useState,
  useEffect
} from 'react';

import GraphQLEmpresas from '../../helpers/graphqlEmpresasApi';
import { useLayoutContext } from '../../hocs/layout';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const { palette } =
    useLayoutContext();
  const screenPalette = palette.sign_in;
  const [loading, setLoading] = useState(false);
  const [companiesNotLoganIntegration, setCompaniesNotLoganIntegration] = useState([]);
  const [companySelected, setCompanySelected] = useState(null);
  

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  async function getCompaniesNotLoganIntegration() {
    setLoading(true);
    try {
      let result = await GraphQLEmpresas({
        query: `query getCompaniesNotLoganIntegration{
          getCompaniesNotLoganIntegration{
            id
            title
            loganIntegration
          }
        }`,
      });

      if (result.status !== 200) {
        throw [];
      }

      return result.data.data.getCompaniesNotLoganIntegration;
    } catch (e) {
      setLoading(false);
      return [];
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getCompaniesNotLoganIntegration();
      setLoading(false);
      setCompaniesNotLoganIntegration(data);
    }
    fetchData();
  }, []);

  function goToCompleteRegistration() {
    props.navigation.navigate('CompleteRegistration', {whiteLabelId: companySelected});
  }
  

  const value = {
    companiesNotLoganIntegration,
    companySelected,
    screenPalette,
    loading,
    returnToPreviousScreen,
    setCompanySelected,
    goToCompleteRegistration
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
