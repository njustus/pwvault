import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVaultEntryComponent } from './edit-vault-entry.component';

describe('EditVaultEntryComponent', () => {
  let component: EditVaultEntryComponent;
  let fixture: ComponentFixture<EditVaultEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVaultEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVaultEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
