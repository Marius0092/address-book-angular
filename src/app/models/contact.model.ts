export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
}

export interface ContactDetails extends Contact {
  phoneNumber: string;
  phonePrefix: string;
  email?: string;
  birthDate: Date | string;
  gender: 'M' | 'F' | 'N';
  drivingLicense: boolean;
  education: Education;
}

export enum Education {
  middleLicense,
  diploma,
  degree,
}
