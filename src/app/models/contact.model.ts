export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phonePrefix: string;
  email?: string;
  birthDate: Date;
}
