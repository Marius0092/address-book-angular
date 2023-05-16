import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userInitials'
})
export class UserInitialsPipe implements PipeTransform {

  transform(firstName: string, lastName: string): string {
    return firstName.charAt(0) + lastName.charAt(0);
  }

}
