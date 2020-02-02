import { Injectable } from '@angular/core';
import { faDocker, faFacebook, faFirefox, faAmazon, faAtlassian, faApple, faGoogle, faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { faAt, faDesktop, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Category, CategoryProviderService } from './category-provider.service';

export interface IconDescription {
  icon: IconDefinition
  brand: string
  url?: string
  category: Category
}

@Injectable()
export class IconProviderService {
  public readonly icons: IconDescription[] = [
    { icon: faDocker, brand: 'Docker', url: 'https://hub.docker.com', category: this.categories.coding },
    { icon: faFacebook, brand: 'Facebook', url: 'https://de-de.facebook.com', category: this.categories.social },
    { icon: faFirefox, brand: 'Firefox', url: 'https://www.mozilla.org', category: this.categories.social },
    { icon: faApple, brand: 'Apple', url: 'https://www.apple.com', category: this.categories.it },
    { icon: faAtlassian, brand: 'Atlassian', url: 'https://www.atlassian.com', category: this.categories.coding },
    { icon: faAmazon, brand: 'Amazon', url: 'https://www.amazon.com', category: this.categories.finance },
    { icon: faGoogle, brand: 'Google', url: 'https://www.google.com', category: this.categories.social },
    { icon: faGithub, brand: 'GitHub', url: 'https://www.github.com', category: this.categories.coding },
    { icon: faGitlab, brand: 'GitLab', url: 'https://www.gitlab.com', category: this.categories.coding },
    { icon: faAt, brand: 'E-Mail', category: this.categories.mail },
    { icon: faDesktop, brand: 'Computer', category: this.categories.it },
  ]

  constructor(private readonly categories: CategoryProviderService) { }

  public iconForBrand(brand: string): IconDescription {
    return this.icons.find(descr => descr.brand === brand)
  }

  public get iconDescriptions(): IconDefinition[] {
    return this.icons.map(descr => descr.icon)
  }

  public urlForBrand(brand: string): string | undefined {
    const descr = this.icons.find(icon => icon.brand === brand)
    return descr.url
  }
}
