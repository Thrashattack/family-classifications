"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = __importDefault(require("../../../config/auth"));
const UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
class SignUpService {
    constructor() {
        this.userRepository = new UsersRepository_1.default();
    }
    async execute(request) {
        const user = await this.userRepository.saveOne(request);
        if (!user) {
            throw new Error('Failed to create new user');
        }
        user.password = bcrypt_1.default.hashSync(request.password, auth_1.default.salt);
        return {
            token: jsonwebtoken_1.default.sign(user, auth_1.default.secret, {
                expiresIn: auth_1.default.expiresIn,
            }),
            expires: new Date(new Date().setDate(new Date().getDate() + Number(auth_1.default.expiresIn.charAt(0)))),
        };
    }
}
exports.default = SignUpService;
