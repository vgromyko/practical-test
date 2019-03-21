import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsStatComponent } from './sms-stat.component';

describe('SmsStatComponent', () => {
  let component: SmsStatComponent;
  let fixture: ComponentFixture<SmsStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
