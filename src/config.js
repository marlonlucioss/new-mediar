// Use import.meta.env.MODE to check if we're in development or production
export const API_URL = import.meta.env.MODE === 'development' 
  ? 'http://localhost:3001'
  : 'https://mediar360.com:3001'
// export const API_URL = 'https://mediar360.com:3001'