import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisDialogComponent } from './pais-dialog.component';

describe('PaisDialogComponent', () => {
  let component: PaisDialogComponent;
  let fixture: ComponentFixture<PaisDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaisDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
