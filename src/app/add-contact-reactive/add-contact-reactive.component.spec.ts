import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactReactiveComponent } from './add-contact-reactive.component';

describe('AddContactReactiveComponent', () => {
  let component: AddContactReactiveComponent;
  let fixture: ComponentFixture<AddContactReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContactReactiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContactReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
