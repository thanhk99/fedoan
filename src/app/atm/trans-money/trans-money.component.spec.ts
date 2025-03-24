import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransMoneyComponent } from './trans-money.component';

describe('TransMoneyComponent', () => {
  let component: TransMoneyComponent;
  let fixture: ComponentFixture<TransMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransMoneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
