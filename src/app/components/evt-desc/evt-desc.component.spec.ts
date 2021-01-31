import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvtDescComponent } from './evt-desc.component';

describe('EvtDescComponent', () => {
  let component: EvtDescComponent;
  let fixture: ComponentFixture<EvtDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvtDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvtDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
