import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, delay, map } from 'rxjs';
import { Contact, ContactDetails } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class RetrieveContactsService {
  private contacts$ = new BehaviorSubject<Contact[]>([]);

  constructor(private httpClient: HttpClient) {
    // this.contacts$.subscribe(console.log);
  }

  /*
   * Create > POST:
   * Read > GET:
   * Update > PUT:
   * Delete > DELETE:
   */

  // Metodo per la simulazione di recupero dati da un ipotetico backend
  public getContactsFromJson(inputSearch?: string): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>('contacts.json').pipe(
      delay(500),

      map((contacts: Contact[]) => {
        if (inputSearch) {
          return contacts.filter((contact) =>
            contact.firstName
              .toLowerCase()
              .includes(inputSearch.toLocaleLowerCase())
          );
        } else {
          return contacts;
        }
      })
    );
  }

  public getContactDetails(id: number): Observable<ContactDetails> {
    return this.httpClient.get<ContactDetails>('contacts/' + id + '.json');
  }

  saveNewContact(contact: ContactDetails): void {
    let currentContacts = this.contacts$.value;
    currentContacts.push(contact);
    this.contacts$.next(currentContacts);
  }

  getContacts(inputSearch?: string): Observable<Contact[]> {
    return this.contacts$.asObservable().pipe(
      delay(500),

      map((contacts: Contact[]) => {
        if (inputSearch) {
          return contacts.filter((contact) =>
            contact.firstName
              .toLowerCase()
              .includes(inputSearch.toLocaleLowerCase())
          );
        } else {
          return contacts;
        }
      })
    );
  }

  // metodo per il recupero del singolo contatto attraverso l'ID
}
