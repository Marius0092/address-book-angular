import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContactDetails, Education } from '../models/contact.model';
import { NgForm } from '@angular/forms';
import { RetrieveContactsService } from '../services/retrieve-contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  newContact!: ContactDetails;

  constructor(
    private location: Location,
    private contactService: RetrieveContactsService
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  goBack(): void {
    this.location.back();
  }

  saveForm(form: NgForm): void {
    this.newContact = form.value;
    this.newContact.birthDate = new Date(form.value.birthDate);
    // this.newContact.education = +this.newContact.education;
    this.contactService.saveNewContact(this.newContact);
    this.resetForm();
  }

  resetForm(): void {
    this.newContact = {
      phoneNumber: '',
      phonePrefix: '',
      birthDate: '2023-05-29',
      id: 0,
      firstName: '',
      lastName: '',
      gender: 'M',
      drivingLicense: false,
      education: Education.middleLicense,
    };
  }
}
