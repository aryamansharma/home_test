import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdowncomponentComponent } from './dropdowncomponent.component';

describe('DropdowncomponentComponent', () => {
  let component: DropdowncomponentComponent;
  let fixture: ComponentFixture<DropdowncomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdowncomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdowncomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
