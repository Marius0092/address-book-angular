import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RetrieveContactsService } from '../services/retrieve-contacts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  currentId!: number;
  retrieveCurrentId: Subscription = new Subscription();
  contactsSubscription: Subscription = new Subscription();

  selectedContact!: Contact;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactsService: RetrieveContactsService
  ) {
    this.retrieveCurrentId = this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.currentId = params['id'];
      },
    });
  }

  ngOnInit(): void {
    console.log('Attualmente il nostro curreintId ha valore' + this.currentId);

    // Recupero di tutta la lista di contatti. Evitato l'uso di rxjs per evitare di aggiungere concetti non ancora introdotti nei moduli sottoposti;
    this.contactsSubscription = this.contactsService
      .getContactsFromJson()
      .subscribe({
        next: (contacts: Contact[]) =>
          (this.selectedContact = {
            ...contacts.find(
              (contact: Contact) => contact.id == this.currentId
            )!,
          }),
      });
  }

  closeDetail() {
    this.router.navigateByUrl('contacts');
  }

  ngOnDestroy(): void {
    this.retrieveCurrentId.unsubscribe();
    this.contactsSubscription.unsubscribe();
  }
}
