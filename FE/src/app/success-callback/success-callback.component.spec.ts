import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCallbackComponent } from './success-callback.component';

describe('SuccessCallbackComponent', () => {
  let component: SuccessCallbackComponent;
  let fixture: ComponentFixture<SuccessCallbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessCallbackComponent]
    });
    fixture = TestBed.createComponent(SuccessCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
