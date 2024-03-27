import * as argon2 from 'argon2';

const hashPassword = argon2.hash;
const verifyPassword = argon2.verify;

export { hashPassword, verifyPassword };
