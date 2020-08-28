import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadDialogComponent } from './ciudad-dialog.component';

describe('CiudadDialogComponent', () => {
  let component: CiudadDialogComponent;
  let fixture: ComponentFixture<CiudadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiudadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiudadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
