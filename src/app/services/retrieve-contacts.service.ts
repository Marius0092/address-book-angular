import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, map } from 'rxjs';
import { Contact, ContactDetails } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class RetrieveContactsService {
  constructor(private httpClient: HttpClient) {}

  // Metodo per la simulazione di recupero dati da un ipotetico backend
  public getContactsFromJson(inputSearch?: string): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>('assets/json/contacts.json').pipe(
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
    return this.httpClient.get<ContactDetails>(
      'assets/json/contacts/' + id + '.json'
    );
  }

  // metodo per il recupero del singolo contatto attraverso l'ID
}
