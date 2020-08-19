import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DptoComponent } from './dpto.component';

describe('DptoComponent', () => {
  let component: DptoComponent;
  let fixture: ComponentFixture<DptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
