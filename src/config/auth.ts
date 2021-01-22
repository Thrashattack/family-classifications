export default {
  secret: String(process.env.APP_SECRET) || '',
  expiresIn: String(process.env.TOKEN_EXPIRES_IN) || '1d',
  salt: Number(process.env.PASSWORD_SALT) || 12,
};
