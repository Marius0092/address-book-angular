import { TestBed } from '@angular/core/testing';

import { ContactsPersistenceService } from './contacts-persistence.service';

describe('ContactsPersistenceService', () => {
  let service: ContactsPersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsPersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
