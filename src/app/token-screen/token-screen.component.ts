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
  sendCurrencyTypePrimary: string = 'DAU';
  sendCurrencyTypeSecondary: string = 'USD';
  recieveCurrenyTypePrimary: string = 'DAU';
  recieveCurrenyTypeSecondary: string = 'USD';

  balanceInDAU: number | undefined = 7;
  balanceInUSD!: number | undefined;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.balanceInUSD = this.convertingIntoUSD(this.balanceInDAU);
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
    let standardAmount: number | undefined = 0.0037;
    let fastAmount: number | undefined = 0.0076;
    let transferFees: number | undefined = 0.005;
    if (this.sendCurrencyTypePrimary === 'USD') {
      if (this.recieveCurrenyTypePrimary === 'USD') {
        standardAmount = this.convertingIntoUSD(standardAmount);
        fastAmount = this.convertingIntoUSD(fastAmount);
        transferFees = this.convertingIntoUSD(transferFees);
      }
    }
    if (this.amountAfterDeduction) {
      this.amountAfterDeduction =
        this.feeType === 'standard'
          ? this.amountAfterDeduction - standardAmount!
          : this.amountAfterDeduction - fastAmount!;
      this.amountAfterDeduction = this.amountAfterDeduction - transferFees!;
    } else {
      this.amountAfterDeduction = undefined;
    }
  }

  convertingCurrency(amount: any, type: string) {
    if (type === this.sendCurrencyTypePrimary) {
      return amount;
    } else if (type === 'DAU') {
      return this.convertingIntoDAU(amount);
    } else {
      return this.convertingIntoUSD(amount);
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
    if (!this.amountBeforeDeduction!) {
      this.toastr.error('Please enter some amount', 'Major Error', {
        timeOut: 3000,
      });
    } else if (this.amountBeforeDeduction <= 0) {
      this.toastr.error('Token can not be negative or zero', 'Major Error', {
        timeOut: 3000,
      });
    } else if (
      (this.sendCurrencyTypePrimary === 'DAU' &&
        this.amountBeforeDeduction > this.balanceInDAU!) ||
      (this.sendCurrencyTypePrimary === 'USD' &&
        this.amountBeforeDeduction > this.balanceInUSD!)
    ) {
      this.toastr.error(
        'Amount should be less than current balance',
        'Major Error',
        {
          timeOut: 3000,
        }
      );
    } else if (
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
    } else {
      if (this.sendCurrencyTypePrimary === 'DAU') {
        this.balanceInDAU = this.balanceInDAU! - this.amountBeforeDeduction;
        this.balanceInUSD =
          this.convertingIntoUSD(this.balanceInDAU) === undefined
            ? 0
            : this.convertingIntoUSD(this.balanceInDAU);
      } else if (this.sendCurrencyTypePrimary === 'USD') {
        this.balanceInUSD = this.balanceInUSD! - this.amountBeforeDeduction;
        this.balanceInDAU =
          this.convertingIntoDAU(this.balanceInUSD) === undefined
            ? 0
            : this.convertingIntoDAU(this.balanceInUSD);
      }
      this.toastr.success('Tokens send successfully!', 'Success');
      this.amountBeforeDeduction = undefined;
      this.amountAfterDeduction = undefined;
    }
  }
}
