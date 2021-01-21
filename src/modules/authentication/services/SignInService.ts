import { Authentication, User } from '@common-types/Authentication';
import IService from '@shared/core/IService';
import UserRepository from '../repositories/UsersRepository';
import PasswordProvider from '../providers/PasswordProvider';
import TokenProvider from '../providers/TokenProvider';
import IProvider from '@shared/core/IProvider';

export default class SignInService
  implements IService<User, Promise<Authentication>> {
  private UserRepository: UserRepository;
  private PasswordProvider: IProvider<string, string>;
  private TokenProvider: IProvider<User, Authentication>;
  constructor() {
    this.UserRepository = new UserRepository();
    this.PasswordProvider = new PasswordProvider();
    this.TokenProvider = new TokenProvider();
  }
  async execute(request: User): Promise<Authentication> {
    const { login, password } = request;

    const user: User = await this.UserRepository.findOne(login);

    const isPasswordCorrect =
      user.password === (this.PasswordProvider.provide(password) as string);

    if (!user || !isPasswordCorrect) {
      throw new Error('User or Password is Incorrect');
    }

    return this.TokenProvider.provide(user) as Authentication;
  }
}
