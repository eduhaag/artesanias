import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProveider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  stringToTimestamp(stringDate: string): Date {
    if (stringDate) {
      return dayjs(stringDate).toDate();
    }
    return undefined;
  }

  setDatetoEndOfDay(stringDate: string): Date {
    if (stringDate) {
      return dayjs(stringDate).add(24, 'h').toDate();
    }
    return undefined;
  }

  addDays(date: Date, daysToAdd: number): Date {
    return dayjs(date).add(daysToAdd, 'd').toDate();
  }
}

export { DayjsDateProvider };
