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
  amountBeforeDeduction!: number;
  amountAfterDeduction!: number;
  balance = {
    valueInDau: 7,
  };

  constructor() {}

  ngOnInit(): void {
    console.log(this.feeType);
  }

  toggleNetworkPopup(event: any) {
    this.isNetworkComponentOpened = !this.isNetworkComponentOpened;
    this.feeType = event;
    console.log(this.feeType);
  }

  toggleNetworkFeePopup() {
    this.isNetworkFeeComponentOpened = !this.isNetworkFeeComponentOpened;
  }

  convertingCurrency() {}

  sendCurrencyType!: string;
  recieveCurrenyType!: string;

  convertingIntoUSD(balance: number) {
    return balance * 2474.8;
  }

  convertingIntoDAU(balance: number) {
    return balance / 2474.8;
  }
  gettingSendCurrencyType(event: string) {
    this.sendCurrencyType = event;
  }
  gettingRecieveCurrencyType(event: string) {
    this.recieveCurrenyType = event;
  }
}
