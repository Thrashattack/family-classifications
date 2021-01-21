import IProvider from '@shared/core/IProvider';
import bcrypt from 'bcrypt';
import authConfig from '@config/auth';

export default class PasswordProvider implements IProvider<string, string> {
  provide(password?: string): string | Promise<string> {
    return bcrypt.hashSync(password, authConfig.salt);
  }
}
