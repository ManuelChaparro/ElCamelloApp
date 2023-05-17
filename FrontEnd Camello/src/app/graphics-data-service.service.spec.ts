import { TestBed } from '@angular/core/testing';

import { GraphicsDataServiceService } from './graphics-data-service.service';

describe('GraphicsDataServiceService', () => {
  let service: GraphicsDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphicsDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
