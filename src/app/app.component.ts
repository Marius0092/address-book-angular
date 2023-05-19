import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Contact } from './models/contact.model';
import { ContactListComponent } from './contact-list/contact-list.component';
import { RetrieveContactsService } from './services/retrieve-contacts.service';
import { Subscription } from 'rxjs';
import { UtilityService } from './services/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'address-book';

  @ViewChild('contactListComponent') contactListComponent:
    | ContactListComponent
    | null
    | undefined;

  contacts: Contact[] = [];

  contactsSubscription: Subscription = new Subscription();

  contactOrder: UtilityService = new UtilityService();

  selectedContact: Contact | null | undefined;

  constructor(private retrieveContactsService: RetrieveContactsService) {}

  onSelectedContact($event: Contact) {
    this.selectedContact = $event;
  }

  ngOnInit() {
    console.log("salve sono l'onInit di app component");
    console.log(
      "Procedo a recuperare la lista dei contatti da 'contacts.json';"
    );

    this.contactsSubscription = this.retrieveContactsService
      .getContactsFromJson()
      .subscribe({
        next: (contacts: Contact[]) => {
          this.contacts = [...contacts];
          let contattiOrdinati = this.contactOrder.ordinaContatti(
            this.contacts
          );
          console.log('ordine alfabetico contatti');
          console.log(contattiOrdinati);
        },
      });
  }

  ngAfterViewInit() {
    console.log(this.contactListComponent?.background);
  }

  onBackToContactList() {
    if (this.selectedContact) {
      this.selectedContact = null;
    }
  }

  ngOnDestroy(): void {
    this.contactsSubscription.unsubscribe();
  }
}
