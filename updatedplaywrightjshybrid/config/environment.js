import 'dotenv/config';

export const environment = {
  baseUrl: process.env.BASE_URL || '',
  username: process.env.USERNAME || '',
  password: process.env.PASSWORD || ''
};
