import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-network-fee-popup',
  templateUrl: './network-fee-popup.component.html',
  styleUrls: ['./network-fee-popup.component.scss'],
})
export class NetworkFeePopupComponent {
  @Input() isNetworkFeePopupOpened!: boolean;
  @Output() closingPopup = new EventEmitter();

  closeNetworkPopup() {
    this.isNetworkFeePopupOpened = !this.isNetworkFeePopupOpened;
    this.closingPopup.emit();
  }
}
