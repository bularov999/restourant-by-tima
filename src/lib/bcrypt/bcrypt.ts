import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPasswordByBcrypt = (password: string) =>
  bcrypt.hashSync(password, saltRounds);

export const comparePasswordByBcrypt = (
  password: string,
  hashPassword: string,
) => bcrypt.compareSync(password, hashPassword);
