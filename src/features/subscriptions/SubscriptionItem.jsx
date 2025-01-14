import React from "react";

const SubscriptionItem = ({ subscription }) => {
  return (
    <>
      <strong>{subscription.tickerSymbol}</strong>: $
      {subscription.threshold.toFixed(2)}
    </>
  );
};

export default SubscriptionItem;
