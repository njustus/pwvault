import { VaultEntry } from './vault-entry';
import * as R from 'ramda';
import { ParamMap } from '@angular/router';
import { vaultAddressKey } from 'app/core/constants';

export interface Vault {
  name: string
  sourceFile: string
  description: string
  entries: VaultEntry[]
}

const getAddress = (params: ParamMap) => params.get(vaultAddressKey)
const addressParams = (path: string) => ({ [vaultAddressKey]: path })

export const decodeVaultAddressParam = R.compose(decodeURIComponent, getAddress)
export const encodeVaultAddressParam = R.compose(addressParams, encodeURIComponent)
