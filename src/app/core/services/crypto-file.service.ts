import { Injectable } from '@angular/core';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { cipherName, encoding } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CryptoFileService<A> {

  constructor() { }

  write(obj: A, key: string, targetPath: string): void {
    const content = JSON.stringify(obj)
    const cipher = crypto.createCipher(cipherName, key)

    const encrypted = Buffer.concat([cipher.update(new Buffer(content, encoding as any)), cipher.final()])
    fs.writeFileSync(targetPath, encrypted)
  }

  read(key: string, targetPath: string): A {
    const cipher = crypto.createDecipher(cipherName, key)
    const content = fs.readFileSync(targetPath)

    const decrypted = Buffer.concat([cipher.update(content), cipher.final()])
    return JSON.parse(decrypted.toString(encoding))
  }
}
