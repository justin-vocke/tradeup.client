import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import {
  mapWebSocketDataToStockData,
  StockDataWebSocket,
} from "../models/stock";

const useSignalR = (hubUrl: string) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [stockData, setStockData] = useState<StockDataWebSocket | null>(null); // Store stock updates

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        console.log("SignalR Connected");

        // ✅ Listen for stock price updates
        newConnection.on("ReceiveStockUpdate", (update) => {
          console.log("Stock Update:", update);
          const formattedStockData = mapWebSocketDataToStockData(update);
          setStockData(formattedStockData); // Store stock price updates
        });
      })
      .catch((err) => console.error("SignalR Connection Error:", err));

    return () => {
      newConnection.stop();
    };
  }, [hubUrl]);

  // Function to subscribe to a new stock ticker
  const subscribeToStock = (ticker: string) => {
    if (connection) {
      connection
        .invoke("SubscribeToStock", ticker)
        .catch((err) => console.error(err));
    }
  };

  return { stockData, subscribeToStock };
};

export default useSignalR;
