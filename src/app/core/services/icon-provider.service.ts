import { Injectable } from '@angular/core';
import { faDocker, faFacebook, faFirefox, faAmazon, faAtlassian, faApple, faGoogle, faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { faAt, faDesktop, IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IconDescription {
  icon: IconDefinition
  brand: string
}

export class IconProviderService {
  public static readonly icons: IconDescription[] = [
    { icon: faDocker, brand: 'Docker' },
    { icon: faFacebook, brand: 'Facebook' },
    { icon: faFirefox, brand: 'Firefox' },
    { icon: faApple, brand: 'Apple' },
    { icon: faAtlassian, brand: 'Atlassian' },
    { icon: faAmazon, brand: 'Amazon' },
    { icon: faGoogle, brand: 'Google' },
    { icon: faGithub, brand: 'GitHub' },
    { icon: faGitlab, brand: 'GitLab' },
    { icon: faAt, brand: 'E-Mail' },
    { icon: faDesktop, brand: 'Computer' },
  ]

  public static iconForBrand(brand: string): IconDescription {
    return IconProviderService.icons.find(descr => descr.brand === brand)
  }

  public static get iconDescriptions(): IconDefinition[] {
    return IconProviderService.icons.map(descr => descr.icon)
  }
}
