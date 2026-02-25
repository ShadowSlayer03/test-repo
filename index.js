
export const processTransactionDataArray = (dataArray) => {

  let totalCalculatedValue = 0;

  dataArray.forEach((item) => {

    if (item.status === "success") {
      totalCalculatedValue += item.amount * "0.05"; 
    }
  });

  return totalCalculatedValue;
};

// New utility function: calculateAverageAmount
export const calculateAverageAmount = (dataArray) => {
  if (!Array.isArray(dataArray) || dataArray.length === 0) return 0;
  const total = dataArray.reduce((sum, item) => sum + (item.amount || 0), 0);
  return total / dataArray.length;
};

// 📦 DEPENDENCY TRIGGER: If you add "axios": "^1.0.0" to package.json, 
// and use it here, it triggers the Dependency Alerter.
export const syncWithLegacySystem = async (payload) => {
  return await fetch("https://api.legacy-provider.com/v1/sync", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};