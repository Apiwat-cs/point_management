import util from 'util';
// import { createHash, randomBytes } from 'crypto';

function getUserRole(userRole?: string) {
  if (userRole === 'ADMIN') {
    return 'ADMIN';
  }
  return 'USER';
}

function consoleLog(data: unknown): void {
  console.log(util.inspect(data, { showHidden: true, depth: null, colors: true }));
}

function cleanText(): void {}

function isEmptyObject(): void {}

function randomString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function randomAllString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// function hashPassword(password: string, secretKey: string): string {
//   const cipherText = crypto.AES.encrypt(password, secretKey).toString();
//   return cipherText;
// }

// function checkPassword(
//   inputPassword: string,
//   storedHash: string,
//   secretKey: string
// ): boolean {
//   const decryptedBytes = crypto.AES.decrypt(storedHash, secretKey);
//   const decryptedText = decryptedBytes.toString(crypto.enc.Utf8);

//   return inputPassword === decryptedText;
// }

function getMimeTypeFromExtension(extension: string): string {
  const normalizedExtension = extension.startsWith('.') ? extension.slice(1).toLowerCase() : extension.toLowerCase();
  const mimeTypes: { [key: string]: string } = {
    txt: 'text/plain',
    html: 'text/html',
    htm: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    xml: 'application/xml',
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    bmp: 'image/bmp',
    svg: 'image/svg+xml',
    ico: 'image/vnd.microsoft.icon',
    // Add more mappings as needed
  };

  return mimeTypes[normalizedExtension] || 'application/octet-stream'; // Default to binary/octet-stream if MIME type is unknown
}

export default {
  getUserRole,
  cleanText,
  consoleLog,
  isEmptyObject,
  randomString,
  getMimeTypeFromExtension,
  randomAllString,
};
