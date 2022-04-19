import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraccionComponent } from './extraccion.component';

describe('ExtraccionComponent', () => {
  let component: ExtraccionComponent;
  let fixture: ComponentFixture<ExtraccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
