import { Injectable } from "@angular/core";
import { Vault } from "./vault";
import { CryptoFileService } from "app/core/services/crypto-file.service";
import { createHash } from "crypto";

@Injectable({
  providedIn: 'root'
})
export class VaultStoreService {
  constructor(private readonly fileService: CryptoFileService<Vault>) { }

  async saveVault(vault: Vault, rawPassword: string): Promise<string> {
    const hashedPassword = this.hashPassword(rawPassword)
    await this.fileService.write(vault, hashedPassword, vault.sourceFile)
    return vault.sourceFile
  }

  async openVault(vaultPath: string, rawPassword: string): Promise<Vault> {
    const hashedPassword = this.hashPassword(rawPassword)
    return await this.fileService.read(hashedPassword, vaultPath)
  }

  private hashPassword(pw: string): string {
    return createHash('sha256').digest('hex')
  }
}
