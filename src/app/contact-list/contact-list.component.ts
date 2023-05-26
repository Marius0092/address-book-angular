import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Contact } from '../models/contact.model';
import {
  Observable,
  Subscription,
  debounceTime,
  fromEvent,
  map,
  filter,
  switchMap,
  startWith,
} from 'rxjs';
import { RetrieveContactsService } from '../services/retrieve-contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];

  contactsSubscription: Subscription = new Subscription();

  @ViewChild('inputFilter', { static: true }) inputFilter!: ElementRef;

  background: string = 'white';

  backgroundForFirstContact: string = 'yellow';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactsService: RetrieveContactsService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    (
      fromEvent(
        this.inputFilter.nativeElement,
        'keyup'
      ) as Observable<KeyboardEvent>
    )
      .pipe(
        debounceTime(1000),
        filter(
          (keyboardEvent) =>
            (keyboardEvent.target as any).value.length >= 3 ||
            (keyboardEvent.target as any).value.length >= 0
        ),
        map((keyboardEvent) => (keyboardEvent.target as any).value),
        startWith(''),
        switchMap((inputValue: string) => {
          return this.contactsService.getContactsFromJson(inputValue);
        })
      )
      .subscribe((filteredContacts) => {
        console.log(filteredContacts);
        this.contacts = filteredContacts;
      });

    // this.contactsSubscription = this.contactsService
    //   .getContactsFromJson()
    //   .subscribe({
    //     next: (contacts: Contact[]) => (this.contacts = [...contacts]),
    //   });
  }

  changeBackground() {
    if (this.backgroundForFirstContact === 'yellow') {
      this.backgroundForFirstContact = 'red';
    } else {
      this.backgroundForFirstContact = 'yellow';
    }
  }

  changeBackgroundToAllElements() {
    if (this.background === 'white') {
      this.background = 'aquamarine';
    } else {
      this.background = 'white';
    }
  }

  orderContacts() {
    this.utilityService.ordinaContatti(this.contacts);
  }

  showDetails(contactId: number) {
    console.log('ID del contatto selezionato uguale a:' + contactId);
    this.router.navigateByUrl('contact/' + contactId);
  }

  ngOnDestroy(): void {
    this.contactsSubscription.unsubscribe();
  }
}
