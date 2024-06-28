import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkFeePopupComponent } from './network-fee-popup.component';

describe('NetworkFeePopupComponent', () => {
  let component: NetworkFeePopupComponent;
  let fixture: ComponentFixture<NetworkFeePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkFeePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkFeePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
