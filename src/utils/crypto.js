const cryptoJS = require('crypto-js')
require("dotenv").config();

const encryptionKey = cryptoJS.enc.Utf8.parse(process.env.CRYPTO_KEY);

const encryptData = (data) => {
    const stringData = typeof data === "object" ? JSON.stringify(data) : data;
    return cryptoJS.AES.encrypt(stringData, encryptionKey, {
        mode: cryptoJS.mode.ECB,
        padding: cryptoJS.pad.Pkcs7,
        iv: process.env.CRYPTO_IV
    }).toString();
}


const decryptData = (encryptedData) => {
    try {
        console.log("Encrypted Data Received: ", encryptedData);

        const bytes = cryptoJS.AES.decrypt(encryptedData.data, encryptionKey, {
            mode: cryptoJS.mode.ECB,
            padding: cryptoJS.pad.Pkcs7,
            iv: process.env.CRYPTO_IV
        });

        const decryptedString = bytes.toString(cryptoJS.enc.Utf8);
        return JSON.parse(decryptedString);
    } catch (error) {
        console.error("Decryption failed: ", error.message);
        throw new Error("Decryption Error");
    }
}


module.exports = {
    encryptData,
    decryptData,
};
