import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultEntryComponent } from './vault-entry.component';

describe('VaultEntryComponent', () => {
  let component: VaultEntryComponent;
  let fixture: ComponentFixture<VaultEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaultEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaultEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
