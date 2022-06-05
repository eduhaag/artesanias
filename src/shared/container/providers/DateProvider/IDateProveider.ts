interface IDateProvider {
  stringToTimestamp(stringDate: string): Date;
  setDatetoEndOfDay(stringDate: string): Date;
  addDays(date: Date, daysToAdd: number): Date;
}

export { IDateProvider };
