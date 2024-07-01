import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-token-screen',
  templateUrl: './token-screen.component.html',
  styleUrls: ['./token-screen.component.scss'],
})
export class TokenScreenComponent {
  isNetworkComponentOpened: boolean = false;
  isNetworkFeeComponentOpened: boolean = false;
  feeType: string = 'standard';
  amountBeforeDeduction!: number | undefined;
  amountAfterDeduction!: number | undefined;
  sendCurrencyTypePrimary: string = 'DAU';
  sendCurrencyTypeSecondary: string = 'USD';
  recieveCurrenyTypePrimary: string = 'DAU';
  recieveCurrenyTypeSecondary: string = 'USD';

  balance: number = 7;

  constructor(private toastr: ToastrService) {}

  toggleNetworkPopup(event: any) {
    this.isNetworkComponentOpened = !this.isNetworkComponentOpened;
    console.log(this.isNetworkComponentOpened);
    this.feeType = event;
  }

  toggleNetworkFeePopup() {
    this.isNetworkFeeComponentOpened = !this.isNetworkFeeComponentOpened;
    console.log(this.isNetworkFeeComponentOpened);
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
    this.sendCurrencyTypeSecondary = this.sendCurrencyTypePrimary;
    this.sendCurrencyTypePrimary = event;
    this.amountBeforeDeduction = undefined;
    this.amountAfterDeduction = undefined;
  }
  gettingRecieveCurrencyType(event: string) {
    this.recieveCurrenyTypeSecondary = this.recieveCurrenyTypePrimary;
    this.recieveCurrenyTypePrimary = event;
  }

  calculatingAmountToRecieve() {
    this.amountAfterDeduction = this.amountBeforeDeduction;
    const standardAmount =
      this.sendCurrencyTypePrimary === 'DAU'
        ? 0.0037
        : this.convertingIntoUSD(0.0037);
    const fastAmount =
      this.sendCurrencyTypePrimary === 'DAU'
        ? 0.0076
        : this.convertingIntoUSD(0.0076);
    const transferFees =
      this.sendCurrencyTypePrimary === 'DAU'
        ? 0.005
        : this.convertingIntoUSD(0.005);

    if (this.amountAfterDeduction) {
      this.amountAfterDeduction =
        this.feeType === 'standard'
          ? this.amountAfterDeduction! - standardAmount!
          : this.amountAfterDeduction! - fastAmount!;
      this.amountAfterDeduction = this.amountAfterDeduction - transferFees!;
    } else {
      this.amountAfterDeduction = undefined;
    }
  }

  convertingCurrency(amount: any, type: string) {
    if (type === this.sendCurrencyTypePrimary) return amount;
    else {
      if (type === 'DAU') return this.convertingIntoDAU(amount);
      else return this.convertingIntoUSD(amount);
    }
  }

  hasUpTo18DecimalPlaces(num: number): boolean {
    const numStr = num.toString();
    const parts = numStr.split('.');
    if (parts.length < 2) return true;
    const decimalPart = parts[1];
    return decimalPart.length > 18;
  }

  validatingTokens() {
    if (
      this.hasUpTo18DecimalPlaces(this.amountAfterDeduction!) ||
      this.hasUpTo18DecimalPlaces(this.amountAfterDeduction! * 2474.8)
    ) {
      this.toastr.error(
        'Cannot accept more than 18 decimal places. Please enter less amount',
        'Major Error',
        {
          timeOut: 3000,
        }
      );
    } else if (this.amountBeforeDeduction! > this.balance) {
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
      this.balance = this.balance - this.amountBeforeDeduction!;
      this.toastr.success('Tokens send successfully!', 'Success');
      this.amountBeforeDeduction = undefined;
      this.amountAfterDeduction = undefined;
    }
  }
}
