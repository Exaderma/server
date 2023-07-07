import bcrypt from 'bcrypt';

export function hashPassword(passwordToHash: string): string
{
    return bcrypt.hashSync(passwordToHash, 10);
}

export function comparePassword(passwordToCompare: string, hashPassword: string): boolean
{
    return bcrypt.compareSync(passwordToCompare, hashPassword);
}
