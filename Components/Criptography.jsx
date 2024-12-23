import 'react-native-get-random-values';

const CryptoJS = require("crypto-js");

export const criptaTesto = (key, str) => {
  const chiaveSegreta = CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex); // Chiave esadecimale
  const testoCifrato = CryptoJS.AES.encrypt(str, chiaveSegreta).toString();
  return testoCifrato;
};

export const decriptaTesto = (key, str) => {
  const chiaveSegreta = CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex); // Chiave esadecimale (corretto)
  const testoDecifrato = CryptoJS.AES.decrypt(str, chiaveSegreta); // Decriptazione
  const testoDecodificato = testoDecifrato.toString(CryptoJS.enc.Utf8); // Conversione in UTF-8 (corretto)
  return testoDecodificato; 
};