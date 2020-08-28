import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DptoDialogComponent } from './dpto-dialog.component';

describe('DptoDialogComponent', () => {
  let component: DptoDialogComponent;
  let fixture: ComponentFixture<DptoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DptoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DptoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
