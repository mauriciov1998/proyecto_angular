import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraccionCamaraComponent } from './extraccion-camara.component';

describe('ExtraccionCamaraComponent', () => {
  let component: ExtraccionCamaraComponent;
  let fixture: ComponentFixture<ExtraccionCamaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraccionCamaraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraccionCamaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
