import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplainpComponent } from './explainp.component';

describe('ExplainpComponent', () => {
  let component: ExplainpComponent;
  let fixture: ComponentFixture<ExplainpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplainpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplainpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
