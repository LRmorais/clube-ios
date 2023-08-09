export const ASSET_PREFIX =
  process.env.NODE_ENV === 'production'
    ? 'https://clube-static.clubegazetadopovo.com.br/'
    : 'https://clube-static.clubegazetadopovo.com.br/';

export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://dw4wnfxklm52y.cloudfront.net/'
    : 'https://dw4wnfxklm52y.cloudfront.net/';

export const LAMBDA_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://cfmao2eq78.execute-api.us-east-1.amazonaws.com/prd/'
    : 'https://cfmao2eq78.execute-api.us-east-1.amazonaws.com/prd/';

export const TRACKER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://events-api.gazetadopovo.com.br'
    : 'https://events-api.gazetadopovo.com.br';

export const GRAPHQL_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://graphql.clubegazetadopovo.com.br/'
    : 'https://graphql.clubegazetadopovo.com.br/';

export const CORE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://core.clubegazetadopovo.com.br/'
    : 'https://core.clubegazetadopovo.com.br/';
    
export const EMPRESAS_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://empresas.clubegazetadopovo.com.br/api/graphql'
    : 'https://empresas.clubegazetadopovo.com.br/api/graphql';

export const PAYMENT_ORDER_ENCRYPTION_KEY =
  '(ClubeGazeta2020@#$!GazetadoPovoSistemas)';
