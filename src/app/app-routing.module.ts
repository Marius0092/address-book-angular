import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { TypeCheckGuard } from './guards/type-check.guard';
import { AddContactComponent } from './add-contact/add-contact.component';
import { AddContactReactiveComponent } from './add-contact-reactive/add-contact-reactive.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/contacts',
    pathMatch: 'full',
  },
  {
    path: 'contacts',
    component: ContactListComponent,
  },

  {
    path: 'contact/:id',
    canActivate: [TypeCheckGuard],
    component: ContactDetailsComponent,
  },

  {
    path: 'add-contact',
    component: AddContactComponent,
  },

  {
    path: 'add-contact-reactive',
    component: AddContactReactiveComponent,
  },

  {
    path: '**',
    redirectTo: '/contacts',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
