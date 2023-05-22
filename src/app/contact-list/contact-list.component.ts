import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Subscription } from 'rxjs';
import { RetrieveContactsService } from '../services/retrieve-contacts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];

  contactsSubscription: Subscription = new Subscription();

  background: string = 'white';

  backgroundForFirstContact: string = 'yellow';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactsService: RetrieveContactsService
  ) {}

  ngOnInit() {
    this.contactsSubscription = this.contactsService
      .getContactsFromJson()
      .subscribe({
        next: (contacts: Contact[]) => (this.contacts = [...contacts]),
      });
  }

  changeBackground() {
    if (this.backgroundForFirstContact === 'yellow') {
      this.backgroundForFirstContact = 'red';
    } else {
      this.backgroundForFirstContact = 'yellow';
    }
  }

  changeBackgroundToAllElements() {
    if (this.background === 'white') {
      this.background = 'aquamarine';
    } else {
      this.background = 'white';
    }
  }

  showDetails(contactId: number) {
    console.log('ID del contatto selezionato uguale a:' + contactId);
    this.router.navigateByUrl('contact/' + contactId);
  }

  ngOnDestroy(): void {
    this.contactsSubscription.unsubscribe();
  }
}
