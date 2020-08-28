import { TestBed } from '@angular/core/testing';

import { DptoService } from './dpto.service';

describe('DptoService', () => {
  let service: DptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
