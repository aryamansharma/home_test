import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-token-screen',
  templateUrl: './token-screen.component.html',
  styleUrls: ['./token-screen.component.scss'],
})
export class TokenScreenComponent implements OnInit {
  isNetworkComponentOpened: boolean = false;
  isNetworkFeeComponentOpened: boolean = false;
  feeType: string = 'standard';
  amountBeforeDeduction!: number | undefined;
  amountAfterDeduction!: number;
  sendCurrencyType: string = 'DAU';
  recieveCurrenyType: string = 'DAU';
  balance = {
    valueInDau: 7,
  };

  constructor() {}

  ngOnInit(): void {}

  toggleNetworkPopup(event: any) {
    this.isNetworkComponentOpened = !this.isNetworkComponentOpened;
    this.feeType = event;
  }

  toggleNetworkFeePopup() {
    this.isNetworkFeeComponentOpened = !this.isNetworkFeeComponentOpened;
  }

  convertingIntoUSD() {
    if (this.amountBeforeDeduction) {
      return this.amountBeforeDeduction * 2474.8;
    } else return;
  }

  convertingIntoDAU() {
    if (this.amountBeforeDeduction) {
      return this.amountBeforeDeduction / 2474.8;
    } else return;
  }
  gettingSendCurrencyType(event: string) {
    this.sendCurrencyType = event;
    this.amountBeforeDeduction = undefined;
  }
  gettingRecieveCurrencyType(event: string) {
    this.recieveCurrenyType = event;
  }
}
