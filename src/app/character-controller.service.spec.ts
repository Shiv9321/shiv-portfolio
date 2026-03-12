import { TestBed } from '@angular/core/testing';

import { CharacterControllerService } from './character-controller.service';

describe('CharacterControllerService', () => {
  let service: CharacterControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
