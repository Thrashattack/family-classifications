"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserRepository {
    findAll(_page, _size) {
        throw new Error('Method not implemented.');
    }
    findOne(_id) {
        if (_id === 'admin')
            return Promise.resolve({
                login: 'admin',
                password: '',
            });
        return Promise.reject({
            message: 'User not found',
        });
    }
    saveOne(_entity) {
        return Promise.resolve(_entity);
    }
    saveAll(_entities) {
        throw new Error('Method not implemented.');
    }
    updateOne(_id, _entity) {
        throw new Error('Method not implemented.');
    }
    updateAll(_entities) {
        throw new Error('Method not implemented.');
    }
    deleteOne(_id) {
        throw new Error('Method not implemented.');
    }
    deleteAll(_ids) {
        throw new Error('Method not implemented.');
    }
}
exports.default = UserRepository;
