import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-dropdowncomponent',
  templateUrl: './dropdowncomponent.component.html',
  styleUrl: './dropdowncomponent.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DropdowncomponentComponent {
  @Output() sendingDropDownVal = new EventEmitter<string>();

  options = [
    { value: 'DAU', icon: 'assets/icons/red_logo.svg' },
    { value: 'USD', icon: 'assets/icons/united_states.png' },
  ];
  selectedOption = this.options[0].value;

  constructor() {}

  getIcon(value: string): string {
    const option = this.options.find((option) => option.value === value);
    return option ? option.icon : '';
  }

  onSelectionChange(event: any) {
    this.sendingDropDownVal.emit(event.value);
  }
}
