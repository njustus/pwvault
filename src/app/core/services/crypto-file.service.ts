import { Injectable } from '@angular/core';
import { createDecipher, createCipher } from 'crypto';
import { writeFile, readFile } from 'fs';
import { cipherName, encoding } from '../constants';
import { promisify } from 'util';

@Injectable({
  providedIn: 'root'
})
export class CryptoFileService<A> {

  constructor() { }

  write(obj: A, key: string, targetPath: string): Promise<void> {
    const content = JSON.stringify(obj)
    const cipher = createCipher(cipherName, key)

    const encrypted = Buffer.concat([cipher.update(new Buffer(content, encoding as any)), cipher.final()])
    return promisify(writeFile)(targetPath, encrypted)
  }

  read(key: string, targetPath: string): Promise<A> {
    const cipher = createDecipher(cipherName, key)

    return promisify(readFile)(targetPath).then(content => {
      const decrypted = Buffer.concat([cipher.update(content), cipher.final()])
      return JSON.parse(decrypted.toString(encoding))
    })
  }
}
