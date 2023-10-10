// FRONT-END (CLIENT) JAVASCRIPT HERE

let money = 0;

async function initializeMoneyResourceTable() {
  try {
    const response = await fetch("/getUserData");
    if (!response.ok) {
      console.error("Failed to load user data. Status: ", response.status);
      return;
    }

    // Parse the response to get user data
    const userData = await response.json();
    console.log(userData);

    if (!userData) {
      console.error("User data is missing or invalid.");
      return;
    }

    // Update the money resource table with user data
    const moneyCol = document.getElementById("money-val");
    moneyCol.innerText = userData[0].money;

    const foodCol = document.getElementById("food-val");
    foodCol.innerText = userData[0].food;

    const exerciseCol = document.getElementById("exercise-val");
    exerciseCol.innerText = userData[0].exercise;

    const sleepCol = document.getElementById("sleep-val");
    sleepCol.innerText = userData[0].sleep;

    // Set money variable to the user's money value
    money = userData[0].money;
    
  } catch (error) {
    console.error("Error:", error);
  }
}

async function recordMoney(moneyValue) {
  try {
    const response = await fetch("/updateMoney", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ money: moneyValue }), // Send the current money value
    });

    if (response.ok) {
      console.log("Money recorded successfully.");
    } else {
      console.error("Failed to record money.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const addMoney = () => {
  // Increment the money value
  money += 1;

  // Update the display
  const moneyCol = document.getElementById("money-val");
  moneyCol.innerText = money;

  // Send the current money value to the server
  recordMoney(money);
};


// Initialize the page
window.onload = function () {
  // Initialize the money resource table with user data
  initializeMoneyResourceTable();
  
  // Initialize the money button
  const moneyButton = document.getElementById("money-button");
  moneyButton.onclick = addMoney;
};
