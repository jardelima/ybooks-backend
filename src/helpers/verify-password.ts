import argon2 from "argon2";

export async function verifyPassword(storedHash: string, password: string): Promise<boolean> {
    return argon2.verify(storedHash, password);
}
