"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.hashPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
const password = '123456';
function hashPassword(password) {
    return crypto_1.default.createHash('sha256').update(password).digest('hex');
}
exports.hashPassword = hashPassword;
;
function checkPassword(password, hash) {
    return hashPassword(password) === hash;
}
exports.checkPassword = checkPassword;
;
const hashedPassword = hashPassword(password);
console.log({ password, hashedPassword, check: checkPassword('1234567', hashedPassword) });
