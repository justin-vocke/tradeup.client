export interface Stock {
  ticker: string;
  current: number;
  high: number;
  percentChange: number;
  low: number;
  openingPrice: number;
  previousClose: number;
  time: Date;
}
