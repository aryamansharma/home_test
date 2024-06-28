import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-networkpopup',
  templateUrl: './networkpopup.component.html',
  styleUrls: ['./networkpopup.component.scss'],
})
export class NetworkpopupComponent {
  @Input() isNetworkPopupOpened!: boolean;
  @Output() closingPopup = new EventEmitter();

  closeNetworkPopup() {
    this.isNetworkPopupOpened = !this.isNetworkPopupOpened;
    this.closingPopup.emit();
  }
}
