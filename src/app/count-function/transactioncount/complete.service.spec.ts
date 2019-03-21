import { TestBed, inject } from '@angular/core/testing';
import { CompleteTransService } from '../../completetrans.service';
import { MessageService } from '../../message.service';
import { HttpClientModule } from '@angular/common/http';

describe('completeTransService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CompleteTransService, MessageService]
    });
  });


  it('CompleteTransService should be created', inject([CompleteTransService], (service: CompleteTransService) => {
    expect(service).toBeTruthy();
  }));
});

