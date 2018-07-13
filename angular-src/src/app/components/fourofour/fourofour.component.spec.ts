import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourofourComponent } from './fourofour.component';

describe('FourofourComponent', () => {
  let component: FourofourComponent;
  let fixture: ComponentFixture<FourofourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourofourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourofourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
