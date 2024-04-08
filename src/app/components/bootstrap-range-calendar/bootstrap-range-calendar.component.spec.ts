import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BootstrapRangeCalendarComponent } from './bootstrap-range-calendar.component';

describe('BootstrapRangeCalendarComponent', () => {
  let component: BootstrapRangeCalendarComponent;
  let fixture: ComponentFixture<BootstrapRangeCalendarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapRangeCalendarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BootstrapRangeCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
