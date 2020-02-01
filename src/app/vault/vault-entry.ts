import { IconDescription } from "app/core/services/icon-provider.service";

export interface VaultEntry {
  name: string
  username: string
  password: string
  icon: IconDescription
  lastUpdatedAt: Date
  url?: string
}
