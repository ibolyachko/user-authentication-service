import * as bcrypt from 'bcrypt';
export const validatePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
