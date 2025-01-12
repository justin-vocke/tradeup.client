import React from "react";

const inputHelper = (e, data) => {
  const tempData = { ...data };
  tempData[e.target.name] = e.target.value;
  return tempData;
};

export default inputHelper;
