import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelCallbackComponent } from './cancel-callback.component';

describe('CancelCallbackComponent', () => {
  let component: CancelCallbackComponent;
  let fixture: ComponentFixture<CancelCallbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelCallbackComponent]
    });
    fixture = TestBed.createComponent(CancelCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
