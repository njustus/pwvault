import { TestBed } from '@angular/core/testing';

import { OpenedVaultService } from './opened-vault.service';

describe('OpenedVaultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenedVaultService = TestBed.get(OpenedVaultService);
    expect(service).toBeTruthy();
  });
});
