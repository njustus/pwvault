import { TestBed } from '@angular/core/testing';

import { CategoryProviderService } from './category-provider.service';

describe('CategoryProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryProviderService = TestBed.get(CategoryProviderService);
    expect(service).toBeTruthy();
  });
});
