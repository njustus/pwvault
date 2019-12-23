import { VaultEntry } from './vault-entry'

export interface Vault {
  name: string
  sourceFile: string
  description: string
  entries: VaultEntry[]
}
