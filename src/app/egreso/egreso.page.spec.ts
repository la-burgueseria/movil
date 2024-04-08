import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EgresoPage } from './egreso.page';

describe('EgresoPage', () => {
  let component: EgresoPage;
  let fixture: ComponentFixture<EgresoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EgresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
