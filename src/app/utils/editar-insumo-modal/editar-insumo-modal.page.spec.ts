import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarInsumoModalPage } from './editar-insumo-modal.page';

describe('EditarInsumoModalPage', () => {
  let component: EditarInsumoModalPage;
  let fixture: ComponentFixture<EditarInsumoModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInsumoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
