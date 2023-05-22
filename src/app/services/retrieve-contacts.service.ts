import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class RetrieveContactsService {
  constructor(private httpClient: HttpClient) {}

  // Metodo per la simulazione di recupero dati da un ipotetico backend
  public getContactsFromJson(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>('assets/json/contacts.json');
  }

  // metodo per il recupero del singolo contatto attraverso l'ID
}
