import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeTest } from './prime-test';

describe('PrimeTest', () => {
  let component: PrimeTest;
  let fixture: ComponentFixture<PrimeTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
