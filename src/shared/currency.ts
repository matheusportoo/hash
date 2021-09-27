import { Injectable } from '@nestjs/common';

type CurrencyTypes = 'cents' | 'normal';

@Injectable()
export class Currency {
  private options = {
    cents: 0.01,
    normal: 1,
  };

  getValue(value: number) {
    const type: CurrencyTypes =
      (process.env.VALUE_MONETARY_IN as CurrencyTypes) || 'cents';

    if (type === 'cents') {
      return value / this.options.cents;
    }

    return value;
  }
}
