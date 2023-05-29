import { Injectable } from '@angular/core';
import { RetrieveContactsService } from './retrieve-contacts.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsPersistenceService {
  constructor(private contactService: RetrieveContactsService) {
    this.contactToLocalStorage();
  }

  contactToLocalStorage() {
    this.contactService.getContacts().subscribe((localContact) => {
      localStorage.setItem('contact', JSON.stringify(localContact));
      console.log('localStorage' + localContact);
    });
  }
}
