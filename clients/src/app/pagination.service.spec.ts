import { TestBed, inject } from '@angular/core/testing';

import { PaginationService } from './pagination.service';

describe('PagingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginationService]
    });
  });

  it('should be created', inject([PaginationService], (service: PaginationService) => {
    expect(service).toBeTruthy();
  }));
});
