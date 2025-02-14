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

export interface StockDataWebSocket {
  symbol: string;
  timeStamp: number;
  lastPrice: number;
  volume: number;
  conditions: string[] | null;
}

export const mapWebSocketDataToStockData = (data: any): StockDataWebSocket => ({
  symbol: data.s,
  timeStamp: data.t,
  lastPrice: data.p,
  volume: data.v,
  conditions: data.c || [],
});
