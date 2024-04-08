import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearInsumoModalPage } from './crear-insumo-modal.page';

describe('CrearInsumoModalPage', () => {
  let component: CrearInsumoModalPage;
  let fixture: ComponentFixture<CrearInsumoModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearInsumoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
