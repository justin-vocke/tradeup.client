import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

interface StockUpdate {
  symbol: string;
  lastPrice: number;
  volume: number;
  conditions: string[];
  time: string;
}

const useSignalR = (hubUrl: string, tickerSymbol: string) => {
  const [stockData, setStockData] = useState<StockUpdate | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        connection.invoke("SubscribeToStock", tickerSymbol);
        console.log(`Connected to SignalR for ${tickerSymbol}`);
      })
      .catch((err) => console.error("SignalR Connection Error:", err));

    connection.on("ReceiveStockUpdate", (data) => {
      console.log("Stock update received:", data);
      if (Array.isArray(data)) {
        // Find the update for the specific ticker symbol
        const stock = data.find((stock: any) => stock.s === tickerSymbol);

        if (stock) {
          const update: StockUpdate = {
            symbol: stock.s,
            lastPrice: stock.p,
            volume: stock.v,
            conditions: stock.c || [],
            time: new Date(stock.t).toLocaleTimeString(),
          };

          setStockData(update);
        }
      }
    });

    return () => {
      connection.stop();
    };
  }, [hubUrl, tickerSymbol]);

  return stockData;
};

export default useSignalR;
