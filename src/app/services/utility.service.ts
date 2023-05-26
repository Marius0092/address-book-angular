import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import * as moment from 'moment';
import 'moment/locale/it';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  public stringaMaiuscola(stringaMinuscola: string): string {
    return stringaMinuscola.toUpperCase();
  }

  public inizialiMaiusole(firstName: string, lastName: string): string {
    return firstName[0].toUpperCase() && lastName[0].toUpperCase();
  }

  // ORDINA CONTATTI IN ORDINE ALFABETICO
  public ordinaContatti(contatti: Contact[]): Contact[] {
    return contatti.sort((a, b) => {
      const nameA = a.firstName.toLowerCase();
      const nameB = b.firstName.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  // ORDINA CONTATTI PER DATA DI NASCITA

  // public ordinaContattiPerDataNascita(contatti: Contact[]): Contact[] {
  //   contatti.sort((a, b) => {
  //     const dataA = moment(a.birthDate);
  //     const dataB = moment(b.birthDate);

  //     if (dataA.isBefore(dataB)) {
  //       return -1;
  //     } else if (dataA.isAfter(dataB)) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });

  //   return contatti;
  // }

  // CONVERTIRE DATA AMERICANA IN DATA ITALIANA

  public convertDateToItalianFormat(date: string): string {
    const formattedDate = moment(date, 'MM/DD/YYYY')
      .locale('it')
      .format('DD/MM/YYYY');
    return formattedDate;
  }

  // RICERCA CONTATTO
  public cercaContatto(arrayContatti: any, nomeCercato: any): any {
    for (let i = 0; i < arrayContatti.length; i++) {
      if (arrayContatti[i].nome === nomeCercato) {
        return arrayContatti[i];
      }
    }
    return null;
  }

  // PRIMA LETTERA MAIUSCOLA
  public adjustFormatName(firstName: string, lastName?: string) {
    const formattedFirstName =
      firstName.slice(0, 1).toUpperCase() + firstName.slice(1).toLowerCase();
    const formattedLastName = lastName
      ? lastName.slice(0, 1).toUpperCase() + lastName.slice(1).toLowerCase()
      : '';
    return (
      formattedFirstName + (formattedLastName ? ' ' + formattedLastName : '')
    );
  }

  // NOME E COGNOME MAIUSCOLI
  public adjustFormatFullName(contact: Contact) {
    return this.adjustFormatName(contact.firstName, contact.lastName);
  }
}
// metodo che rende maiuscole le iniziali di firstName e lastName

// metodo che converte una data dal formato americano a quello italiano

// metodo che ordina alfabeticamente la lista dei contatti

// metodo che ordina i contatti in basa alla data di nascita

// metodo che ordina i contatti in base al tempo in cui sono stati aggiunti

// ricerca contatti
