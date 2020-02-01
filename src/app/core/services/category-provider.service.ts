import { Injectable } from '@angular/core';

export interface Category {
  name: string,
  icon: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoryProviderService {

  public readonly mail: Category = { name: 'E-Mail', icon: 'mail-bulk' }
  public readonly finance: Category = { name: 'Finance', icon: 'money-check-alt' }
  public readonly coding: Category = { name: 'Coding', icon: 'terminal' }

  public readonly social: Category = { name: 'Social', icon: 'users' }
  public readonly it: Category = { name: 'IT', icon: 'computer' }

  private readonly defaultCategories: Category[] = [
    this.mail,
    this.finance,
    this.coding,
    this.it
  ]

  constructor() { }

  public get categories(): Category[] {
    return this.defaultCategories
  }
}
