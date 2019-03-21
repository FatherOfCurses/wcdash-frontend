import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompexecbyhourComponent } from './compexecbyhour.component';

describe('CompexecbyhourComponent', () => {
  let component: CompexecbyhourComponent;
  let fixture: ComponentFixture<CompexecbyhourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompexecbyhourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompexecbyhourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
