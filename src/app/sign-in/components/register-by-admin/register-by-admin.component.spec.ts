import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterByAdminComponent } from './register-by-admin.component';

describe('RegisterByAdminComponent', () => {
  let component: RegisterByAdminComponent;
  let fixture: ComponentFixture<RegisterByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterByAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
