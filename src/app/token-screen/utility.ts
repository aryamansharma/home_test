import { BigNumber } from 'bignumber.js';

const DAU_TO_USD_RATE = new BigNumber('74755.13');

export function convertDauToUsd(dau: string | number): string {
  if (dau) {
    const dauValue = new BigNumber(dau);
    if (dauValue.isNaN()) {
      throw new Error('Invalid DAU value');
    }

    const usdValue = dauValue.times(DAU_TO_USD_RATE);
    return usdValue.toFixed(2); // Return the result with up to 2 decimal places
  }
  return '';
}

export function convertUsdToDau(usd: string | number): string {
  if (usd) {
    const usdValue = new BigNumber(usd);
    if (usdValue.isNaN()) {
      throw new Error('Invalid USD value');
    }

    const dauValue = usdValue.dividedBy(DAU_TO_USD_RATE);
    return dauValue.toFixed(18); // Return the result with up to 18 decimal places
  }
  return '';
}
