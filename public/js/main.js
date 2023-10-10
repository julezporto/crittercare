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

const submit = async function (event) {
  event.preventDefault();
  const name = document.querySelector("#critter-name");
  const type = document.querySelector("#critter-type");
  const lifepoints = 0;

  //Validation error messages
  if (name.value === "") {
    window.alert("Please fill out critter name");
    return;
  } else if (type.value === "") {
    window.alert("Please fill out critter type");
    return;
  }
  //Create json object with user input
  const json = {
    name: name.value,
    type: type.value,
    lifepoints: 0,
  };
  const body = JSON.stringify(json);
  console.log(body);
  const newCritter = await fetch("/addCritter", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  });
  console.log("show new critter")
  let data = await newCritter.json();
  console.log("add: " + JSON.stringify(data));
  showCritter(data)
};

const showCritter = function (data) {
  let nameLabel = document.querySelector("#critter-name-display");
  let typeLabel = document.querySelector("#critter-type-display");
  let lifeLabel = document.querySelector("#critter-life-display");

  data.forEach((item) => {
    console.log("show results: " + JSON.stringify(Object.values(item)));
    nameLabel.innerHTML = "Critter Name: " + item.name
    typeLabel.innerHTML = "Critter Type: " + item.type
    lifeLabel.innerHTML = "Life Points: " + item.lifepoints
  });
};

// initialize the page
window.onload = function () {
  // Initialize the money resource table with user data
  initializeMoneyResourceTable();
  
  // Initialize the money button
  const moneyButton = document.getElementById("money-button");
  moneyButton.onclick = addMoney;
  
  const addCritter = document.querySelector("#buy-critter-button");
  addCritter.onclick = submit;
  fetch("/data", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => {
      showCritter(json, true);
    });
};
