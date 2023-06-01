import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControlStatus,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ContactDetails } from '../models/contact.model';
import { Education } from '../models/contact.model';
import { Observable, combineLatest, filter, map, merge, retry } from 'rxjs';

@Component({
  selector: 'app-add-contact-reactive',
  templateUrl: './add-contact-reactive.component.html',
  styleUrls: ['./add-contact-reactive.component.css'],
})
export class AddContactReactiveComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.minLength(3)],
      details: this.formBuilder.group({
        phoneNumber: ['1111111', Validators.required],
        phonePrefix: ['2323', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        birthDate: ['1992-08-14', Validators.required],
        drivingLicense: [false, Validators.requiredTrue],
        education: [Education.diploma, Validators.required],
        gender: ['M', Validators.required],
      }),
    });

    this.contactForm.get('details')!.disable();

    // this.contactForm.get('firstName')?.valueChanges.subscribe(console.log);
    combineLatest([
      this.contactForm.get('firstName')!.statusChanges,
      this.contactForm.get('lastName')!.statusChanges,
    ])
      .pipe(filter((status) => status.every((status) => status === 'VALID')))
      .subscribe(() => {
        this.contactForm.get('details')!.enable();
      });
  }

  saveForm(form: ContactDetails): void {
    console.log('Save Form', form);
  }
}
