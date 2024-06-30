import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-dropdowncomponent',
  templateUrl: './dropdowncomponent.component.html',
  styleUrl: './dropdowncomponent.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DropdowncomponentComponent {
  @Output() sendingDropDownVal = new EventEmitter<string>();
  @ViewChild('select') select!: MatSelect;

  options = [
    { value: 'DAU', icon: 'assets/icons/red_logo.svg' },
    { value: 'USD', icon: 'assets/icons/united_states.png' },
  ];
  selectedOption = this.options[0].value;

  constructor(private overlay: Overlay) {}

  getIcon(value: string): string {
    const option = this.options.find((option) => option.value === value);
    return option ? option.icon : '';
  }

  onSelectionChange(event: any) {
    this.sendingDropDownVal.emit(event.value);
  }

  openCustomDropdown() {
    const overlayRef: OverlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.select._elementRef)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetX: 10,
            offsetY: 0,
          },
        ]),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    overlayRef.attach(this.select.panel.nativeElement);
  }
}
