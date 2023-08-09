import React, { createContext, useContext as useReactContext, useState, useEffect } from 'react';
import API from '../../helpers/api';
import { useGlobalStateContext } from '../../hocs/globalState';
const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {
  const {
    userInfo,
  } = useGlobalStateContext();
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const setDescription = (text) => {
    setText(text)
  }

  const backScreen = () => {
    props.navigation.goBack();
  }

  const save = async() => {
    if (text.trim().length === 0) return;

    setLoading(true)
    await API.call({
      method: 'post',
      url: '/api/referapartner',
      data: {
        description: text,
      },
      headers: {
        Authorization: `Bearer ${userInfo.tokenJWTClube}`,
      },
    });
    setLoading(false)
    setFeedback('success');
  }
  const value = {
    text,
    setDescription,
    backScreen,
    feedback,
    save,
    loading,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
