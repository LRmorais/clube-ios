import axios from 'axios';

export const saveUserToLogan = (params) => axios({
  method: 'post',
  url: 'https://account-api.gazetadopovo.com.br/user',
  headers: {
    'Content-type': 'application/json',
    'X-Api-Key': '9HeAD3tb8M1eZcyGHO3BXau6G68SEcAJ8MRsxLGx',
    'x-publisher-id': '94e6bf84-f14c-11e7-8c3f-9a214cf093ae',
  },
  data: {
    birthday: null,
    genre: 'm',
    isSubscriber: false,
    notificationAuth: false,
    privacyAuth: false,
    name: params.fullName,
    cpf: params.docNumber.replace(/\D/g, ''),
    password: params.password,
    emails: [
      {
        email: params.email,
        origin: 'user',
      },
    ],
    phones: [
      {
        phone: params.phone,
      },
    ],
  },
});


export const checkCPF = (cpf) => axios({
  method: 'get',
  url: `https://account-api.gazetadopovo.com.br/users?cpf=${cpf}`,
  headers: {
    'Content-type': 'application/json',
    'X-Api-Key': '9HeAD3tb8M1eZcyGHO3BXau6G68SEcAJ8MRsxLGx',
    'x-publisher-id': '94e6bf84-f14c-11e7-8c3f-9a214cf093ae',
  }
});

export const associateSocialNetwork = (userId, name, photo, network, socialId, tokenGazeta) => axios({
    method: 'post',
    url: `https://account-api.gazetadopovo.com.br/user/${userId}/social-network`,
    headers: {
      'Content-type': 'application/json',
      'X-Api-Key': '9HeAD3tb8M1eZcyGHO3BXau6G68SEcAJ8MRsxLGx',
      'x-publisher-id': '94e6bf84-f14c-11e7-8c3f-9a214cf093ae',
      "Authorization": tokenGazeta
    },
    data: {
      name,
      photo,
      network,
      socialId
    }
});

export const paySubscriptionOnLogan = (params) => axios({
  method: 'post',
  url: 'https://ak21cr5sa0.execute-api.sa-east-1.amazonaws.com/prod/checkout',
  headers: {
    'Content-type': 'application/json',
  },
  data: {
    token: params.token,
    recaptcha: params.recaptcha,
    telefone: '',
    data_nascimento: '',
    enderecos: {
      cobranca: {
        tipo: '',
        cep: '',
        estado: '',
        cidade: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
      },
      entrega: {
        tipo: '',
        cep: '',
        estado: '',
        cidade: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
      },
    },
    id_forma_pagamento: '2',
    id_oferta: params.offer,
    origem: 9,
    dependentes: 0,
    bandeira: params.cardBanner,
    titular: params.cardHolder,
    cartao: params.cardNumber.replace(/\D/g, ''),
    mes: params.cardValidity.split('/')[0],
    ano: '20' + params.cardValidity.split('/')[1],
    cvv: params.cardCvc,
    banco: '',
    agencia: '',
    conta: '',
    digito_conta: '',
    operacao: '',
    voucher: '',
  },
});

export const searchNews = (text) => axios({
  method: 'get',
  baseURL: (
    process.env.NODE_ENV === 'production'
      ? 'https://3qzxn7zbfc.execute-api.us-east-1.amazonaws.com/prd'
      : 'https://gmf74cxux3.execute-api.us-east-1.amazonaws.com/dev'
  ),
  url: `/news/search/${encodeURI(text)}`,
});

export const uploadFile = (dir, file) => {
  const data = new FormData();
  data.append('type', 'file');
  data.append('bucket', 'gdp-prd-clube');
  data.append('path', dir + '/');
  data.append('file', file);
  return axios({
    method: 'post',
    url: 'https://apiupload.clubegazetadopovo.com.br/fileupload',
    headers: {
      'Content-type': 'multipart/form-data',
    },
    data,
  });
};

export const updateUserPhone = (userId, authorization, phone) => axios({
  method: 'post',
  url: `https://account-api.gazetadopovo.com.br/user/${userId}/phone`,
  headers: {
    'Content-type': 'application/json',
    'X-Api-Key': '9HeAD3tb8M1eZcyGHO3BXau6G68SEcAJ8MRsxLGx',
    'x-publisher-id': '94e6bf84-f14c-11e7-8c3f-9a214cf093ae',
    authorization,
  },
  data: {
    phone,
    userId,
    main: true,
  },
});

export const updateUserEmail = (userId, authorization, email) => axios({
  method: 'post',
  url: `https://account-api.gazetadopovo.com.br/user/${userId}/email`,
  headers: {
    'Content-type': 'application/json',
    'X-Api-Key': '9HeAD3tb8M1eZcyGHO3BXau6G68SEcAJ8MRsxLGx',
    'x-publisher-id': '94e6bf84-f14c-11e7-8c3f-9a214cf093ae',
    authorization,
  },
  data: {
    email,
    userId,
    main: true,
  },
});

export const updateUserInfo = (userId, authorization, data) => axios({
  method: 'put',
  url: `https://account-api.gazetadopovo.com.br/user/${userId}`,
  headers: {
    'Content-type': 'application/json',
    'X-Api-Key': '9HeAD3tb8M1eZcyGHO3BXau6G68SEcAJ8MRsxLGx',
    'x-publisher-id': '94e6bf84-f14c-11e7-8c3f-9a214cf093ae',
    authorization,
  },
  data,
});
