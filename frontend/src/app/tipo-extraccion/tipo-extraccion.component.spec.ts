import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoExtraccionComponent } from './tipo-extraccion.component';

describe('TipoExtraccionComponent', () => {
  let component: TipoExtraccionComponent;
  let fixture: ComponentFixture<TipoExtraccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoExtraccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoExtraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
