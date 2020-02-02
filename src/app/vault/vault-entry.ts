import { IconDescription } from "app/core/services/icon-provider.service";
import { Category } from "app/core/services/category-provider.service";

export interface VaultEntry {
  name: string
  username: string
  password: string
  icon: IconDescription
  lastUpdatedAt: Date
  url?: string
}

export function entryHasCategory(entry: VaultEntry, category: Category): boolean {
  return entry.icon.category.name === category.name
}
