import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedVaultModalComponent } from './locked-vault-modal.component';

describe('LockedVaultModalComponent', () => {
  let component: LockedVaultModalComponent;
  let fixture: ComponentFixture<LockedVaultModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockedVaultModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockedVaultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
