export default {
  secret: process.env.APP_SECRET || '',
  expiresIn: process.env.TOKEN_EXPIRES_IN || '1d',
  salt: process.env.PASSWORD_SALT || 12,
};
