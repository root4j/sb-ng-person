import { DragDropModule } from '@angular/cdk/drag-drop';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragTestComponent } from './drag-test.component';

describe('DragTestComponent', () => {
  let component: DragTestComponent;
  let fixture: ComponentFixture<DragTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragTestComponent ],
      imports: [
        NoopAnimationsModule,
        DragDropModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
