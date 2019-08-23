import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralErrorsComponent } from './general-errors.component';

describe('GeneralErrorsComponent', () => {
  let component: GeneralErrorsComponent;
  let fixture: ComponentFixture<GeneralErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
