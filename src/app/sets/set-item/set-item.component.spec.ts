import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetItemComponent } from './set-item.component';

describe('SetItemComponent', () => {
  let component: SetItemComponent;
  let fixture: ComponentFixture<SetItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetItemComponent]
    });
    fixture = TestBed.createComponent(SetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
