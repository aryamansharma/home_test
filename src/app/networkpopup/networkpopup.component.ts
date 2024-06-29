import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-networkpopup',
  templateUrl: './networkpopup.component.html',
  styleUrls: ['./networkpopup.component.scss'],
})
export class NetworkpopupComponent {
  @Input() isNetworkPopupOpened!: boolean;
  @Output() closingPopup = new EventEmitter<string>();

  feeType: string = 'standard';

  changeFeetype(feeType: string) {
    this.feeType = feeType;
    this.closeNetworkPopup();
  }

  closeNetworkPopup() {
    this.isNetworkPopupOpened = !this.isNetworkPopupOpened;
    this.closingPopup.emit(this.feeType);
  }
}
