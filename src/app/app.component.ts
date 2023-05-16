import { Component, ViewChild } from '@angular/core';
import { Contact } from './models/contact.model';
import { ContactListComponent } from './contact-list/contact-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'address-book';

  @ViewChild('contactListComponent') contactListComponent : ContactListComponent | null | undefined;

  contacts: Contact[] = [
    {
      firstName: "Giacomo",
      lastName: "Piantini",
      phoneNumber: "1111111111",
      phonePrefix: "+39",
      email: "giacomo.piantini@mail.it",
      birthDate: new Date("1996-07-12")
    }, 
    {
      firstName: "Eleonora",
      lastName: "Casto",
      phoneNumber: "2222222222",
      phonePrefix: "+39",
      email: "eleonora.casto@mail.it",
      birthDate: new Date("1993-11-25")
    }, 
    {
      firstName: "Laura",
      lastName: "Saporoso",
      phoneNumber: "3333333333",
      phonePrefix: "+39",
      email: "laura.saporoso@mail.it",
      birthDate: new Date("1999-01-15")
    }
  ]

  selectedContact : Contact | null | undefined;

  onSelectedContact($event: Contact){
    this.selectedContact = $event;
  }

  ngAfterViewInit(){
    console.log(this.contactListComponent?.background);
  }

  onBackToContactList(){
    if(this.selectedContact){
      this.selectedContact = null;
    }
  }
}
