
export const processTransactionDataArray = (dataArray) => {

  // Use this variable to store the total calculated value from the transactions.
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
  // 🧪 TEST TRIGGER: New exported function with zero associated tests in the diff.
  // 🔍 Q&A TRIGGER: If PRISM.md says "Use Fetch over Axios", this should flag.
  return await fetch("https://api.legacy-provider.com/v1/sync", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

// 🚨 BAD CODE & SECURITY ISSUES BELOW
export function insecureFunction(userInput) {
  // BAD: Using eval on user input (security risk)
  eval(userInput);

  const password = "sk-proj-1238772328";

  console.log("User password is: ", password);

  alert("Password: " + password);

  // BAD: SQL injection vulnerability
  const query = `SELECT * FROM users WHERE name = '${userInput}'`;
  // Simulate running the query (not actually implemented)
  console.log("Running query:", query);

  // BAD: Unvalidated redirect
  window.location = userInput;
}