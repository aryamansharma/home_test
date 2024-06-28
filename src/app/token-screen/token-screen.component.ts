import { Component } from '@angular/core';

@Component({
  selector: 'app-token-screen',
  templateUrl: './token-screen.component.html',
  styleUrls: ['./token-screen.component.scss'],
})
export class TokenScreenComponent {
  isNetworkComponentOpened: boolean = false;
  isNetworkFeeComponentOpened: boolean = false;

  toggleNetworkPopup() {
    this.isNetworkComponentOpened = !this.isNetworkComponentOpened;
  }

  toggleNetworkFeePopup() {
    this.isNetworkFeeComponentOpened = !this.isNetworkFeeComponentOpened;
  }
}
