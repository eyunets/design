import { TestBed } from '@angular/core/testing';

import { FakeBackendInterceptor } from './fake-backend-interceptor.service';

describe('FakeBackendInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FakeBackendInterceptor = TestBed.get(FakeBackendInterceptor);
    expect(service).toBeTruthy();
  });
});
