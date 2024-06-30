import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  amountAfterDeduction!: number | undefined;
  sendCurrencyType: string = 'DAU';
  recieveCurrenyType: string = 'DAU';
  isBtnDisabled: boolean = true;
  balance = {
    valueInDau: 7,
  };

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    console.log('9913000000000003'.length);
  }

  toggleNetworkPopup(event: any) {
    this.isNetworkComponentOpened = !this.isNetworkComponentOpened;
    this.feeType = event;
  }

  toggleNetworkFeePopup() {
    this.isNetworkFeeComponentOpened = !this.isNetworkFeeComponentOpened;
  }

  convertingIntoUSD(amount: any) {
    if (amount) return amount * 2474.8;
    else return;
  }

  convertingIntoDAU(amount: any) {
    if (amount) return amount / 2474.8;
    else return;
  }
  gettingSendCurrencyType(event: string) {
    this.sendCurrencyType = event;
    this.amountBeforeDeduction = undefined;
    this.amountAfterDeduction = undefined;
  }
  gettingRecieveCurrencyType(event: string) {
    this.recieveCurrenyType = event;
  }

  calculatingAmountToRecieve() {
    this.amountAfterDeduction = this.amountBeforeDeduction;
    if (this.amountBeforeDeduction) {
      this.amountAfterDeduction =
        this.feeType === 'standard'
          ? this.amountAfterDeduction! - 0.0037
          : this.amountAfterDeduction! - 0.0076;
      this.amountAfterDeduction = this.amountAfterDeduction - 0.005;
      this.isBtnDisabled = false;
    } else {
      this.amountAfterDeduction = undefined;
    }
  }

  hasUpTo18DecimalPlaces(num: number): boolean {
    const numStr = num.toString();
    const parts = numStr.split('.');
    if (parts.length < 2) return true;
    const decimalPart = parts[1];
    return decimalPart.length <= 18;
  }

  validatingTokens() {
    if (
      !this.hasUpTo18DecimalPlaces(this.amountAfterDeduction!) ||
      this.hasUpTo18DecimalPlaces(this.amountAfterDeduction! * 2474.8)
    ) {
      this.toastr.error(
        'Cannot accept more than 18 decimal places. Please enter less amount',
        'Major Error',
        {
          timeOut: 3000,
        }
      );
    } else if (this.amountBeforeDeduction! > this.balance.valueInDau) {
      this.toastr.error(
        'Amount should be less than current balance',
        'Major Error',
        {
          timeOut: 3000,
        }
      );
    } else if (this.amountBeforeDeduction! <= 0) {
      this.toastr.error('Token can not be negative or zero', 'Major Error', {
        timeOut: 3000,
      });
    } else {
      this.toastr.success('Hello world!', 'Toastr fun!');
      this.amountBeforeDeduction = undefined;
      this.amountAfterDeduction = undefined;
    }
  }
}
