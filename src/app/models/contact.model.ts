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

  languageSkills?: LanguageSkills[];
}

export enum Education {
  middleLicense,
  diploma,
  degree,
}

export interface LanguageSkills {
  language: string;
  level: LanguageLevel;
}

export enum LanguageLevel {
  A1,
  A2,
  B1,
  B2,
  C1,
  C2,
}

export interface ContactForm extends Omit<Contact, 'id'> {
  details: Omit<ContactDetails, 'id' | 'firstName' | 'lastName'>;
}
