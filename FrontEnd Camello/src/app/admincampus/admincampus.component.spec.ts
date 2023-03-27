import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincampusComponent } from './admincampus.component';

describe('AdmincampusComponent', () => {
  let component: AdmincampusComponent;
  let fixture: ComponentFixture<AdmincampusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmincampusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmincampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
