import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkpopupComponent } from './networkpopup.component';

describe('NetworkpopupComponent', () => {
  let component: NetworkpopupComponent;
  let fixture: ComponentFixture<NetworkpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
