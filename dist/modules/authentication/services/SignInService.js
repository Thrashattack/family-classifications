"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../../../config/auth"));
const UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
class SignInService {
    constructor() {
        this.userRepository = new UsersRepository_1.default();
    }
    async execute(request) {
        const { login, password } = request;
        const user = await this.userRepository.findOne(login);
        const isPasswordCorrect = bcrypt_1.default.compareSync(password, user.password);
        if (!user || !isPasswordCorrect) {
            throw new Error('User or Password is Incorrect');
        }
        return {
            token: jsonwebtoken_1.default.sign(user, auth_1.default.secret, {
                expiresIn: auth_1.default.expiresIn,
            }),
            expires: new Date(new Date().setDate(new Date().getDate() + Number(auth_1.default.expiresIn.charAt(0)))),
        };
    }
}
exports.default = SignInService;
