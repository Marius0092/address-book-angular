import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnChanges, OnInit, AfterContentInit, OnDestroy {

  @Input('contactsInInput') contacts: Contact[] = [];

  @Input() background: string = "white";

  

  @Output() selectedContactEvent: EventEmitter<Contact> = new EventEmitter<Contact>();

  backgroundForFirstContact: string = 'yellow';


  ngOnChanges(changes: SimpleChanges){
    console.log("oggetto di tipo SimpleChanges, contenente tutti gli input", changes)
    if(changes["contacts"]){
      if(changes["contacts"].currentValue !== changes["contacts"].previousValue){
        //implementiamo una logica per il cambiamento avvenuto
        console.log("la proprietà in input è cambiata")
      }else{
        console.log("la proprietà in input è rimasta invariata")
      }
    }
  }

  ngOnInit(){
    console.log(this.contacts)
  }

  ngAfterContentInit(): void {
    console.log("In risposta all'evento after content init")
  }

  ngOnDestroy(): void {
    console.log("un attimo prima che Angula rimuova il componente")
  }

  changeBackground(){
    if(this.backgroundForFirstContact === "yellow"){
      this.backgroundForFirstContact = "red";
    }else{
      this.backgroundForFirstContact = "yellow";
    }
  }

  changeBackgroundToAllElements(){
    if(this.background === "white"){
      this.background = "aquamarine";
    }else{
      this.background = "white";
    }
  }

  showDetails(contact: Contact){
      console.log(contact);
      //emettere l'evento
      this.selectedContactEvent.emit(contact);
  }

  isCalledEleonora(firstName: string){
    return firstName.toLowerCase() === "eleonora";
  }

}
