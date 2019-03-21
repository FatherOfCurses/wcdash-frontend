import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToptenreasonService } from './toptenreason.service';
import { ExceptionTransService } from '../../exceptiontrans.service';
import { MessageService } from '../../message.service';

describe('ToptenreasonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ToptenreasonService, ExceptionTransService, MessageService]
    });
  });

  it('should be created', inject([ToptenreasonService], (service: ToptenreasonService) => {
    expect(service).toBeTruthy();
  }));
});
