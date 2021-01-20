import jwt from 'jsonwebtoken';
import authConfig from '@config/auth';
import { Authentication, User } from '@shared/@types/types';
import IService from '@shared/core/IService';
import UserRepository from '../repositories/UsersRepository';

export default class SignUpService
  implements IService<User, Promise<Authentication | Error>> {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async execute(request: User): Promise<Authentication | Error> {
    const user = await this.userRepository.saveOne(request);

    if (!user) {
      return new Error('Failed to create new user');
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
