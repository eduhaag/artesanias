interface IDateProvider {
  stringToTimestamp(stringDate: string): Date;
  setDatetoEndOfDay(stringDate: string): Date;
}

export { IDateProvider };
