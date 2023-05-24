import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact, ContactDetails } from '../models/contact.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RetrieveContactsService } from '../services/retrieve-contacts.service';
import { Subscription, concatMap } from 'rxjs';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})

// constructor(private contactsService: ContactsService, private router: Router, private activatedRoute: ActivatedRoute) {
//   this.retriveCurrentId = this.activatedRoute.params.pipe(
//     map((params:Params) => {
//       this.currentId = params["id"]
//       return this.currentId
//     }),
//     map((id: number) => {
//       return this.contactsService.getContactDetails(id)
//     }),
//     concatAll()
//   ).subscribe({
//     next: (contactDetails: ContactDetails) => {
//       this.selectedContact = contactDetails
//     }
//   })
// }
export class ContactDetailsComponent implements OnInit, OnDestroy {
  currentId!: number;
  retrieveCurrentId: Subscription = new Subscription();
  contactsSubscription: Subscription = new Subscription();

  selectedContact!: ContactDetails;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactsService: RetrieveContactsService
  ) {
    this.retrieveCurrentId = this.activatedRoute.params
      .pipe(
        concatMap((params: Params) => {
          this.currentId = params['id'];
          return this.contactsService.getContactDetails(this.currentId);
        })
      )
      .subscribe({
        next: (contact: ContactDetails) => {
          this.selectedContact = contact;
        },
      });
  }

  ngOnInit(): void {
    console.log('Attualmente il nostro curreintId ha valore' + this.currentId);
  }

  closeDetail() {
    this.router.navigateByUrl('contacts');
  }

  ngOnDestroy(): void {
    this.retrieveCurrentId.unsubscribe();
    this.contactsSubscription.unsubscribe();
  }
}
