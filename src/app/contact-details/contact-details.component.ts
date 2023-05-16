import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent {


  @Input('selectedContactForDetails') selectedContact: Contact | null | undefined;
  
  @Output() backTContactListEvent : EventEmitter<void> = new EventEmitter<void>();

  backToContactList(){
    this.backTContactListEvent.emit();
  }

}
