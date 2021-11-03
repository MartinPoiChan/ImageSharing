'use strict';
const crypto = require('crypto');
require('dotenv').config();

const key = process.env.KEY;
const type = 'aes-256-cbc'
console.log(key);
const ivLength = 16; 

function encrypt(text) {
    let iv = crypto.randomBytes(ivLength);
    let cipher = crypto.createCipheriv(type, Buffer.from(key), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(type, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = {encrypt, decrypt};