import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControlStatus,
  FormGroup,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ContactDetails, ContactForm } from '../models/contact.model';
import { Education } from '../models/contact.model';
import { LanguageLevel, LanguageSkills } from '../models/contact.model';
import {
  Observable,
  combineLatest,
  filter,
  interval,
  map,
  merge,
  retry,
  take,
  tap,
} from 'rxjs';
import { ValidationErrors } from '@angular/forms';
import { AsyncValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-add-contact-reactive',
  templateUrl: './add-contact-reactive.component.html',
  styleUrls: ['./add-contact-reactive.component.css'],
})
export class AddContactReactiveComponent implements OnInit {
  contactForm!: FormGroup;
  contact: ContactDetails = {
    firstName: 'Marco',
    lastName: 'Rossi',
    phonePrefix: '334',
    phoneNumber: '283758235',
    gender: 'M',
    education: Education.degree,
    email: 'aksfa@mail.it',
    drivingLicense: true,
    birthDate: '1992-08-14',
    id: 1,
  };

  languageSkill: LanguageSkills[] = [
    {
      language: 'Italiano',
      level: LanguageLevel.C2,
    },
    {
      language: 'Inglese',
      level: LanguageLevel.A2,
    },
    {
      language: 'Spagnolo',
      level: LanguageLevel.B1,
    },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', [Validators.required, this.upperCaseValidator()]],
      lastName: ['', Validators.minLength(3), this.upperCaseValidatorAsync()],
      details: this.formBuilder.group({
        /* languageSkills: this.formBuilder.array([
          this.formBuilder.group({
            language: 'Italiano',
            level: LanguageLevel.C2,
          }),
        ]), */
        languageSkills: this.formBuilder.array(
          this.languageSkill.map((langSkill) =>
            this.formBuilder.group(langSkill)
          )
        ),
        phoneNumber: ['', Validators.required],
        phonePrefix: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        birthDate: ['', Validators.required],
        drivingLicense: [false, Validators.requiredTrue],
        education: [Education.diploma, Validators.required],
        gender: ['', Validators.required],
      }),
    });

    this.contactForm.patchValue(this.contact);
    this.contactForm.get('details')?.patchValue(this.contact);

    // this.contactForm.get('details')!.disable();

    // this.contactForm.get('firstName')?.valueChanges.subscribe(console.log);
    combineLatest([
      this.contactForm.get('firstName')!.statusChanges,
      this.contactForm.get('lastName')!.statusChanges,
    ])
      .pipe(
        tap(console.log),
        filter((status) =>
          status.every((status: FormControlStatus) => status === 'VALID')
        )
      )
      .subscribe(() => {
        this.contactForm.get('details')!.enable();
      });
  }

  upperCaseValidator(): ValidatorFn {
    return (control) => {
      console.log('validatore', control.value);
      control.errors;
      const upperCaseError: ValidationErrors = {
        upperCase: true,
      };
      if (control.value == control.value.toUpperCase()) {
        return null;
      }
      return upperCaseError;
    };
  }

  upperCaseValidatorAsync(): AsyncValidatorFn {
    return (control) => {
      console.log('validatore', control.value);
      return interval(3000).pipe(
        take(1),
        map((_) => {
          control.errors;
          const upperCaseError: ValidationErrors = {
            asyncUpperCase: true,
          };
          if (control.value == control.value.toUpperCase()) {
            return null;
          }
          return upperCaseError;
        })
      );
    };
  }

  saveForm(form: ContactForm): void {
    console.log('Save Form', form);

    const { details, ...others } = form;
    const newContact: ContactDetails = {
      ...others,
      ...details,
      id: 1,
    };

    console.log(newContact);
  }

  addLanguage(): void {
    const newLanguageGroup: FormGroup = this.formBuilder.group({
      language: ['', Validators.required],
      level: LanguageLevel.A1,
    });
    (this.contactForm.get('details')?.get('languageSkills') as FormArray).push(
      newLanguageGroup
    );
  }

  get languageSkills(): FormArray {
    return this.contactForm.get('details')?.get('languageSkills') as FormArray;
  }

  removeLanguage(i: number): void {
    this.languageSkills.removeAt(i);
  }

  removeAllLanguage(): void {
    this.languageSkills.clear();
  }
}
