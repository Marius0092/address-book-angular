import { Injectable } from '@angular/core';

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
  public ordinaContatti(array: any[]): any[] {
    return array.sort((a, b) => {
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
  public ordinaContattiPerDataNascita(contatti: any): any {
    contatti.sort(function (a: any, b: any) {
      let dataA = new Date(a.dataNascita);
      let dataB = new Date(b.dataNascita);

      return dataA.getTime() - dataB.getTime();
    });

    return contatti;
  }

  // CONVERTIRE DATA AMERICANA IN DATA ITALIANA
  public convertiDataAmericanaInItaliana(dataAmericana: string): string {
    let partiData = dataAmericana.split('/');
    let giorno = partiData[1];
    let mese = partiData[0];
    let anno = partiData[2];

    return giorno + '/' + mese + '/' + anno;
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
}

// metodo che rende maiuscole le iniziali di firstName e lastName

// metodo che converte una data dal formato americano a quello italiano

// metodo che ordina alfabeticamente la lista dei contatti

// metodo che ordina i contatti in basa alla data di nascita

// metodo che ordina i contatti in base al tempo in cui sono stati aggiunti

// ricerca contatti
