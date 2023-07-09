import { hashPassword, comparePassword } from '../../../../src/utils/security/hashing';

test('hashPassword', () => {
    const password = 'password';
    const hashedPassword = hashPassword(password);
    expect(hashedPassword).not.toBe(password);
})

test('comparePassword', () => {
    const password = 'password';
    const hashedPassword = hashPassword(password);
    expect(comparePassword(password, hashedPassword)).toBe(true);
})
