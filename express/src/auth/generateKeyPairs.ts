const passphrase = process.env.passphrase
import { generateKeyPair } from "node:crypto"
import { writeFile } from "node:fs"

async function generateKeyPairs() {
    generateKeyPair('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: 'top secret',
        },
    }, (err, publicKey, privateKey) => {
        const prb64url = Buffer.from(privateKey).toString('base64url');
        const pbb64url = Buffer.from(publicKey).toString('base64url');

        const data = `\nPRIVATE_KEY="${prb64url}"\nPUBLIC_KEY="${pbb64url}"`;

        writeFile(import.meta.dirname + '/../../.env', data, {
            flag: 'a'
        }, (err) => {if (err) console.error(err)})
    });
}

generateKeyPairs();