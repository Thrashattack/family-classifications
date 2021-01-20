import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth';
import { Authentication, User } from '@common-types/Basics';
import IService from '@shared/core/IService';
import UserRepository from '../repositories/UsersRepository';

export default class SignInService
  implements IService<User, Promise<Authentication>> {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async execute(request: User): Promise<Authentication> {
    const { login, password } = request;

    const user: User = await this.userRepository.findOne(login);

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!user || !isPasswordCorrect) {
      throw new Error('User or Password is Incorrect');
    }

    return {
      token: jwt.sign(user, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
      expires: new Date(
        new Date().setDate(
          new Date().getDate() + Number(authConfig.expiresIn.charAt(0)),
        ),
      ),
    };
  }
}
