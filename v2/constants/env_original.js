export const ASSET_PREFIX =
  process.env.NODE_ENV === 'production'
    ? 'https://clube-static.clubegazetadopovo.com.br/'
    : 'https://gdp-dev-clube.s3.amazonaws.com/';

export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://dw4wnfxklm52y.cloudfront.net/'
    : 'https://d31v9oqjkpvawk.cloudfront.net/';

export const LAMBDA_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://cfmao2eq78.execute-api.us-east-1.amazonaws.com/prd/'
    : 'https://nzc9c9xbrb.execute-api.us-east-1.amazonaws.com/dev/';

export const TRACKER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://events-api.gazetadopovo.com.br'
    : 'https://events.development.gazetadopovo.com.br';

export const GRAPHQL_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://graphql.clubegazetadopovo.com.br/'
    : 'https://graphql-dev.clubegazetadopovo.com.br/';

export const CORE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://core.clubegazetadopovo.com.br/'
    : 'https://core-dev.clubegazetadopovo.com.br/';
        
export const EMPRESAS_URL =
process.env.NODE_ENV === 'production'
  ? 'https://empresas.clubegazetadopovo.com.br/api/graphql'
  : 'https://empresas-dev.clubegazetadopovo.com.br/api/graphql';

export const PAYMENT_ORDER_ENCRYPTION_KEY =
  '(ClubeGazeta2020@#$!GazetadoPovoSistemas)';
