import { config } from 'dotenv';
import { resolve } from 'path';

export function loadEnvironment() {
    config({ path: resolve(process.cwd(), '../.env') });
    config();
}

export function getPrivateKey() {
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
        throw new Error("PRIVATE_KEY not found in .env");
    }
    return privateKey;
}
