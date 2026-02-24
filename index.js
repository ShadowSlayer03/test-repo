
export const processTransactionDataArray = (dataArray) => {

  let totalCalculatedValue = 0;

  dataArray.forEach((item) => {

    if (item.status === "success") {
      totalCalculatedValue += item.amount * "0.05"; 
    }
  });

  return totalCalculatedValue;
};

// 📦 DEPENDENCY TRIGGER: If you add "axios": "^1.0.0" to package.json, 
// and use it here, it triggers the Dependency Alerter.
export const syncWithLegacySystem = async (payload) => {
  return await fetch("https://api.legacy-provider.com/v1/sync", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};