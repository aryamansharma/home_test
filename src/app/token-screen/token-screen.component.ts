import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { convertDauToUsd, convertUsdToDau } from './utility';

@Component({
  selector: 'app-token-screen',
  templateUrl: './token-screen.component.html',
  styleUrls: ['./token-screen.component.scss'],
})
export class TokenScreenComponent implements OnInit {
  isNetworkComponentOpened: boolean = false;
  isNetworkFeeComponentOpened: boolean = false;

  feeType: string = 'standard';

  amountBeforeDeduction: number | string = '';
  amountAfterDeduction: number | string = '';
  sendCurrencyTypePrimary: string = 'DAU';
  sendCurrencyTypeSecondary: string = 'USD';
  recieveCurrenyTypePrimary: string = 'DAU';
  recieveCurrenyTypeSecondary: string = 'USD';

  balanceInDAU: number | string = 7;
  balanceInUSD!: number | string;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.balanceInUSD = convertDauToUsd(this.balanceInDAU);
  }

  toggleNetworkPopup(event: any) {
    this.isNetworkComponentOpened = !this.isNetworkComponentOpened;
    this.feeType = event;
  }

  toggleNetworkFeePopup() {
    this.isNetworkFeeComponentOpened = !this.isNetworkFeeComponentOpened;
  }

  gettingSendCurrencyType(event: string) {
    this.sendCurrencyTypeSecondary = this.sendCurrencyTypePrimary;
    this.sendCurrencyTypePrimary = event;
    this.amountBeforeDeduction = 0;
    this.amountAfterDeduction = 0;
  }

  gettingRecieveCurrencyType(event: string) {
    this.recieveCurrenyTypeSecondary = this.recieveCurrenyTypePrimary;
    this.recieveCurrenyTypePrimary = event;
  }

  calculatingAmountToRecieve() {
    this.amountAfterDeduction = this.amountBeforeDeduction;
    let standardAmount: number | string = 3.76;
    let fastAmount: number | string = 10.3;
    let transferFees: number | string = 0.005;
    if (this.sendCurrencyTypePrimary === 'USD') {
      if (this.recieveCurrenyTypePrimary === 'DAU') {
        standardAmount = convertUsdToDau(standardAmount);
        fastAmount = convertUsdToDau(fastAmount);
      } else if (this.recieveCurrenyTypePrimary === 'USD') {
        transferFees = convertDauToUsd(transferFees);
      }
    }
    if (this.amountAfterDeduction) {
      this.amountAfterDeduction =
        this.feeType === 'standard'
          ? Number(this.amountAfterDeduction) - Number(standardAmount)
          : Number(this.amountAfterDeduction) - Number(fastAmount);
      this.amountAfterDeduction =
        this.amountAfterDeduction - Number(transferFees);
    } else {
      this.amountAfterDeduction = 0;
    }
  }

  convertingCurrency(amount: any, type: string) {
    if (type === this.sendCurrencyTypePrimary) {
      return amount;
    } else if (type === 'DAU') {
      return convertUsdToDau(amount);
    } else {
      return convertDauToUsd(amount);
    }
  }

  validatingTokens() {
    if (!this.amountBeforeDeduction!) {
      this.toastr.error('Please enter some amount', 'Major Error', {
        timeOut: 3000,
      });
    } else if (Number(this.amountBeforeDeduction) <= 0) {
      this.toastr.error('Token can not be negative or zero', 'Major Error', {
        timeOut: 3000,
      });
    } else if (
      (this.sendCurrencyTypePrimary === 'DAU' &&
        this.amountBeforeDeduction > this.balanceInDAU) ||
      (this.sendCurrencyTypePrimary === 'USD' &&
        this.amountBeforeDeduction > this.balanceInUSD)
    ) {
      this.toastr.error(
        'Amount should be less than current balance',
        'Major Error',
        {
          timeOut: 3000,
        }
      );
    } else {
      if (this.sendCurrencyTypePrimary === 'DAU') {
        this.balanceInDAU =
          Number(this.balanceInDAU) - Number(this.amountBeforeDeduction);
        this.balanceInUSD =
          convertDauToUsd(this.balanceInDAU) === undefined
            ? 0
            : convertDauToUsd(this.balanceInDAU);
      } else if (this.sendCurrencyTypePrimary === 'USD') {
        this.balanceInUSD =
          Number(this.balanceInUSD) - Number(this.amountBeforeDeduction);
        this.balanceInDAU =
          convertUsdToDau(this.balanceInUSD) === undefined
            ? 0
            : convertUsdToDau(this.balanceInUSD);
      }
      this.toastr.success('Tokens send successfully!', 'Success');
      this.amountBeforeDeduction = 0;
      this.amountAfterDeduction = 0;
    }
  }
}
