// utils/hashing.ts
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const myUniqueSalt = process.env.MY_UNIQUE_SALT;

export async function hashPassword(password: string): Promise<string> {
    const saltedPassword = myUniqueSalt + password;
    const saltRounds = 10;
    return await bcrypt.hash(saltedPassword, saltRounds);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    const saltedPassword = myUniqueSalt + password;
    return await bcrypt.compare(saltedPassword, hash);
}