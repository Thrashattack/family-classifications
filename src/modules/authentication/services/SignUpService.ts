import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import authConfig from '@config/auth';
import { Authentication, User } from '@common-types/types';
import IService from '@shared/core/IService';
import UserRepository from '../repositories/UsersRepository';

export default class SignUpService
  implements IService<User, Promise<Authentication>> {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async execute(request: User): Promise<Authentication> {
    const user = await this.userRepository.saveOne(request);

    if (!user) {
      throw new Error('Failed to create new user');
    }

    user.password = bcrypt.hashSync(request.password, authConfig.salt);

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
