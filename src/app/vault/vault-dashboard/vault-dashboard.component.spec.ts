import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultDashboardComponent } from './vault-dashboard.component';

describe('VaultDashboardComponent', () => {
  let component: VaultDashboardComponent;
  let fixture: ComponentFixture<VaultDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaultDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaultDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
