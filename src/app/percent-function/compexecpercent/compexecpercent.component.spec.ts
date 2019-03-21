import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompexecpercentComponent } from './compexecpercent.component';

describe('CompexecpercentComponent', () => {
  let component: CompexecpercentComponent;
  let fixture: ComponentFixture<CompexecpercentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompexecpercentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompexecpercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
