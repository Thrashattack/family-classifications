"use strict";
exports.__esModule = true;
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.prototype.findAll = function (_page, _size) {
        throw new Error('Method not implemented.');
    };
    UserRepository.prototype.findOne = function (_id) {
        if (_id === 'admin')
            return Promise.resolve({
                login: 'admin',
                password: ''
            });
        return Promise.reject({
            message: 'User not found'
        });
    };
    UserRepository.prototype.saveOne = function (_entity) {
        return Promise.resolve(_entity);
    };
    UserRepository.prototype.saveAll = function (_entities) {
        throw new Error('Method not implemented.');
    };
    UserRepository.prototype.updateOne = function (_id, _entity) {
        throw new Error('Method not implemented.');
    };
    UserRepository.prototype.updateAll = function (_entities) {
        throw new Error('Method not implemented.');
    };
    UserRepository.prototype.deleteOne = function (_id) {
        throw new Error('Method not implemented.');
    };
    UserRepository.prototype.deleteAll = function (_ids) {
        throw new Error('Method not implemented.');
    };
    return UserRepository;
}());
exports["default"] = UserRepository;
