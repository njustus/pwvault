import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVaultComponent } from './new-vault.component';

describe('NewVaultComponent', () => {
  let component: NewVaultComponent;
  let fixture: ComponentFixture<NewVaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
