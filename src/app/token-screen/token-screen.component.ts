import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import BigNumber from 'bignumber.js';

// Conversion rates
const DAU_TO_USD_RATE = new BigNumber('74755.13');
const USD_TO_DAU_RATE = new BigNumber('1').dividedBy(DAU_TO_USD_RATE);

@Component({
  selector: 'app-token-screen',
  templateUrl: './token-screen.component.html',
  styleUrls: ['./token-screen.component.scss'],
})
export class TokenScreenComponent implements OnInit {
  isNetworkComponentOpened: boolean = false;
  isNetworkFeeComponentOpened: boolean = false;
  feeType: string = 'standard';
  amountBeforeDeduction: any = null;
  amountAfterDeduction: BigNumber = new BigNumber(0);
  sendCurrencyTypePrimary: string = 'DAU';
  sendCurrencyTypeSecondary: string = 'USD';
  recieveCurrenyTypePrimary: string = 'DAU';
  recieveCurrenyTypeSecondary: string = 'USD';
  balanceInDAU: BigNumber = new BigNumber('7');
  balanceInUSD!: BigNumber;
  isAmountValid: boolean = false;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.balanceInUSD = new BigNumber(
      this.convertDauToUsd(this.balanceInDAU.valueOf())
    );
  }

  /**
   * Converts USD to DAU.
   *
   * @param {string | number | BigNumber} usdAmount - The amount of USD to convert.
   * @param {BigNumber} usdToDauRate - The exchange rate from USD to DAU.
   * @returns {BigNumber} - The equivalent amount in DAU, rounded to 18 decimal places.
   */
  convertUsdToDau(
    usdAmount: string | number | BigNumber,
    usdToDauRate: BigNumber = USD_TO_DAU_RATE
  ): string {
    const usd = new BigNumber(usdAmount);
    const dauAmount = usd.times(usdToDauRate);
    return dauAmount.toFixed(18, 1);
  }

  /**
   * Converts DAU to USD.
   *
   * @param {string | number | BigNumber} dauAmount - The amount of DAU to convert.
   * @param {BigNumber} dauToUsdRate - The exchange rate from DAU to USD.
   * @returns {string} - The equivalent amount in USD, rounded to 18 decimal places.
   */
  convertDauToUsd(
    dauAmount: string | number | BigNumber,
    dauToUsdRate: BigNumber = DAU_TO_USD_RATE
  ): string {
    const dau = new BigNumber(dauAmount);
    const usdAmount = dau.times(dauToUsdRate);
    return usdAmount.toFixed(2, 1);
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
    this.amountBeforeDeduction = null;
    this.amountAfterDeduction = new BigNumber(0);
  }

  gettingRecieveCurrencyType(event: string) {
    this.recieveCurrenyTypeSecondary = this.recieveCurrenyTypePrimary;
    this.recieveCurrenyTypePrimary = event;
  }

  checkingAmountValidity(amount: any) {
    if (!isNaN(amount) && isFinite(amount) && amount > 0 && amount) {
      const bigAmount = new BigNumber(amount);
      if (
        bigAmount.isNaN() ||
        !bigAmount.isFinite() ||
        bigAmount.isNegative() ||
        bigAmount.isZero()
      ) {
        this.isAmountValid = false;
      } else {
        this.isAmountValid = true;
      }
    } else {
      this.isAmountValid = false;
    }
  }

  calculatingAmountToRecieve() {
    this.checkingAmountValidity(this.amountBeforeDeduction);
    if (this.isAmountValid) {
      this.amountAfterDeduction = new BigNumber(this.amountBeforeDeduction);
      let standardAmount: BigNumber = new BigNumber(3.76);
      let fastAmount: BigNumber = new BigNumber(10.3);
      let transferFees: BigNumber = new BigNumber(0.005);
      let totalFees: BigNumber;
      if (this.recieveCurrenyTypePrimary === 'DAU') {
        standardAmount = new BigNumber(
          new BigNumber(this.convertUsdToDau(standardAmount)).toFixed(2, 1)
        );
        fastAmount = new BigNumber(
          new BigNumber(this.convertUsdToDau(fastAmount)).toFixed(2, 1)
        );
      } else if (this.recieveCurrenyTypePrimary === 'USD') {
        transferFees = new BigNumber(
          new BigNumber(this.convertDauToUsd(fastAmount)).toFixed(18, 1)
        );
      }
      totalFees = new BigNumber(
        transferFees.add(
          this.feeType === 'standard' ? standardAmount : fastAmount
        )
      );
      this.amountAfterDeduction = this.amountAfterDeduction.minus(totalFees);
    } else {
      if (this.amountAfterDeduction.lessThanOrEqualTo(0)) {
        this.showError(
          'After deduction the Recipient Amount is Less than zero. Please enter a greater amount.',
          'Error'
        );
      } else {
        this.showError(
          'Token should be a valid number and cannot be negative or zero',
          'Error'
        );
      }
    }
  }

  convertingCurrency(amount: BigNumber, type: string) {
    this.checkingAmountValidity(this.amountBeforeDeduction);
    if (this.isAmountValid) {
      if (type === this.sendCurrencyTypePrimary) {
        return amount;
      } else if (type === 'DAU') {
        return this.convertUsdToDau(amount);
      } else {
        return this.convertDauToUsd(amount);
      }
    } else {
      return '';
    }
  }

  showError(errorMessage: string, errorType: string) {
    this.toastr.error(errorMessage, errorType, {
      timeOut: 1000,
    });
  }

  showSuccess(successMessage: string) {
    this.toastr.success(successMessage, 'Success', { timeOut: 1000 });
  }

  validatingTokens() {
    if (!this.amountBeforeDeduction) {
      this.showError('Please enter some amount', 'Error');
    } else if (new BigNumber(this.amountBeforeDeduction).lessThanOrEqualTo(0)) {
      this.showError('Token can not be negative or zero', 'Error');
    } else if (
      (this.sendCurrencyTypePrimary === 'DAU' &&
        this.amountBeforeDeduction > this.balanceInDAU) ||
      (this.sendCurrencyTypePrimary === 'USD' &&
        this.amountBeforeDeduction > this.balanceInUSD)
    ) {
      this.showError('Amount should be less than current balance', 'Error');
    } else {
      if (this.sendCurrencyTypePrimary === 'DAU') {
        this.balanceInDAU = this.balanceInDAU.minus(
          new BigNumber(this.amountBeforeDeduction)
        );
        this.balanceInUSD = new BigNumber(
          this.balanceInDAU.isZero()
            ? new BigNumber(0)
            : this.convertDauToUsd(this.balanceInDAU)
        );
      } else if (this.sendCurrencyTypePrimary === 'USD') {
        this.balanceInUSD = this.balanceInUSD.minus(
          new BigNumber(this.amountBeforeDeduction)
        );
        this.balanceInDAU = new BigNumber(
          this.balanceInUSD.isZero()
            ? new BigNumber(0)
            : this.convertUsdToDau(this.amountBeforeDeduction)
        );
      }
      this.showSuccess('Tokens send successfully!');
      this.amountBeforeDeduction = null;
      this.amountAfterDeduction = new BigNumber(0);
    }
  }
}
