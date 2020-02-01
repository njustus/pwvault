import { Injectable } from '@angular/core';
import { faDocker, faFacebook, faFirefox, faAmazon, faAtlassian, faApple, faGoogle, faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { faAt, faDesktop, IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IconDescription {
  icon: IconDefinition
  brand: string
  url?: string
}

export class IconProviderService {
  public static readonly icons: IconDescription[] = [
    { icon: faDocker, brand: 'Docker', url: 'https://hub.docker.com' },
    { icon: faFacebook, brand: 'Facebook', url: 'https://de-de.facebook.com' },
    { icon: faFirefox, brand: 'Firefox', url: 'https://www.mozilla.org' },
    { icon: faApple, brand: 'Apple', url: 'https://www.apple.com' },
    { icon: faAtlassian, brand: 'Atlassian', url: 'https://www.atlassian.com' },
    { icon: faAmazon, brand: 'Amazon', url: 'https://www.amazon.com' },
    { icon: faGoogle, brand: 'Google', url: 'https://www.google.com' },
    { icon: faGithub, brand: 'GitHub', url: 'https://www.github.com' },
    { icon: faGitlab, brand: 'GitLab', url: 'https://www.gitlab.com' },
    { icon: faAt, brand: 'E-Mail' },
    { icon: faDesktop, brand: 'Computer' },
  ]

  public static iconForBrand(brand: string): IconDescription {
    return IconProviderService.icons.find(descr => descr.brand === brand)
  }

  public static get iconDescriptions(): IconDefinition[] {
    return IconProviderService.icons.map(descr => descr.icon)
  }

  public static urlForBrand(brand: string): string | undefined {
    const descr = IconProviderService.icons.find(icon => icon.brand === brand)
    return descr.url
  }
}
