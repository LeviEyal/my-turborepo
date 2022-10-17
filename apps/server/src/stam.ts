import cypto from 'crypto';
const password = '123456';

export function hashPassword(password: string): string  {
    return cypto.createHash('sha256').update(password).digest('hex');
};

export function checkPassword(password: string, hash: string): boolean {
    return hashPassword(password) === hash;
};

const hashedPassword = hashPassword(password);

console.log({password, hashedPassword, check: checkPassword('1234567', hashedPassword)});
