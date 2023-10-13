// FRONT-END (CLIENT) JAVASCRIPT HERE

// Create resource variables
let money = 0;
let food = 0;
let exercise = 0;
let sleep = 0;

// Initialize Resource Table
async function initializeMoneyResourceTable() {
  try {
    const response = await fetch("/getUserData");
    if (!response.ok) {
      console.error("Failed to load user data. Status: ", response.status);
      return;
    }

    // Parse the response to get user data
    const userData = await response.json();
    // console.log(userData);

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

    // Set variables to the current user's values
    money = userData[0].money;
    food = userData[0].food;
    exercise = userData[0].exercise;
    sleep = userData[0].sleep;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Record money value
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

// Record food value
async function recordFood(foodValue) {
  try {
    const response = await fetch("/updateFood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ food: foodValue }), // Send the current food value
    });

    if (response.ok) {
      console.log("Food recorded successfully.");
    } else {
      console.error("Failed to record food.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Record exercise value
async function recordExercise(exerciseValue) {
  try {
    const response = await fetch("/updateExercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ exercise: exerciseValue }), // Send the current exercise value
    });

    if (response.ok) {
      console.log("Exercise recorded successfully.");
    } else {
      console.error("Failed to record exercise.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Record sleep value
async function recordSleep(sleepValue) {
  try {
    const response = await fetch("/updateSleep", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sleep: sleepValue }), // Send the current sleep value
    });

    if (response.ok) {
      console.log("Sleep recorded successfully.");
    } else {
      console.error("Failed to record sleep.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Increment money value
const addMoney = () => {
  // Increment the money value
  money += 1;

  // Update the display
  const moneyCol = document.getElementById("money-val");
  moneyCol.innerText = money;

  // Send the current money value to the server
  recordMoney(money);
};

// Increment food value & decrement money
const addFood = () => {
  // Check to see if user has enough money to buy food
  if (money >= 10) {
    // Increment the food value & decrement the money value
    food += 1;
    money -= 10;

    // Update the food display
    const foodCol = document.getElementById("food-val");
    foodCol.innerText = food;

    // Send the current food value to the server
    recordFood(food);

    // Update the money display
    const moneyCol = document.getElementById("money-val");
    moneyCol.innerText = money;

    // Send the current money value to the server
    recordMoney(money);

    console.log("Food has been successfully added.");
  } else {
    console.log("Food has not been added.");
    window.alert("You do not have enough money to buy food.");
  }
};

// Increment exercise value & decrement money
const addExercise = () => {
  // Check to see if user has enough money to buy exercise
  if (money >= 15) {
    // Increment the exercise value & decrement the money value
    exercise += 1;
    money -= 15;

    // Update the exercise display
    const exerciseCol = document.getElementById("exercise-val");
    exerciseCol.innerText = exercise;

    // Send the current exercise value to the server
    recordExercise(exercise);

    // Update the money display
    const moneyCol = document.getElementById("money-val");
    moneyCol.innerText = money;

    // Send the current money value to the server
    recordMoney(money);

    console.log("Exercise has been successfully added.");
  } else {
    console.log("Exercise has not been added.");
    window.alert("You do not have enough money to buy exercise.");
  }
};

// Increment sleep value & decrement money
const addSleep = () => {
  // Check to see if user has enough money to buy sleep
  if (money >= 5) {
    // Increment the sleep value & decrement the money value
    sleep += 1;
    money -= 5;

    // Update the sleep display
    const sleepCol = document.getElementById("sleep-val");
    sleepCol.innerText = sleep;

    // Send the current sleep value to the server
    recordSleep(sleep);

    // Update the money display
    const moneyCol = document.getElementById("money-val");
    moneyCol.innerText = money;

    // Send the current money value to the server
    recordMoney(money);

    console.log("Sleep has been successfully added.");
  } else {
    console.log("Sleep has not been added.");
    window.alert("You do not have enough money to buy sleep.");
  }
};

// submit a critter
const submit = async function (event) {
  event.preventDefault();
  // Check to see if user has enough money to buy critter
  if (money >= 50) {
    const name = document.querySelector("#critter-name");
    const type = document.querySelector("#critter-type");
    const lifepoints = 100;

    // decrease user money for buying critter
    money -= 50;

    // Update the money display
    const moneyCol = document.getElementById("money-val");
    moneyCol.innerText = money;

    // Send the current money value to the server
    recordMoney(money);

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
      lifepoints: lifepoints,
    };
    const body = JSON.stringify(json);
    console.log(body);
    const newCritter = await fetch("/addCritter", {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });
    console.log("show new critter");
    let data = await newCritter.json();
    console.log("add: " + JSON.stringify(data));
    showCritter(data);
    window.alert("Congratulations on your new Critter!");
  } else {
    console.log("Critter has not been added.");
    window.alert("You do not have enough money to buy a critter.");
  }
  let frm = document.querySelector("#buy-critter-form");
  frm.reset();
  return false;
};

// display single critter
const showCritter = function (data) {
  let resultsTable = document.querySelector("#resultsTable");
  resultsTable.innerHTML =
    "<tr><th>Critter Name</th><th>Type</th><th>Life Points</th><th>Feed</th><th>Exercise</th><th>Sleep</th></tr>";

  data.forEach((item) => {
    // console.log("show results: " + JSON.stringify(Object.values(item)));
    formatTable(item, resultsTable);
  });
};

const formatTable = function (critter, resultsTable) {
  // console.log(resultsTable);
  // create new row in table
  const row = resultsTable.insertRow();
  const cellName = row.insertCell(); // create new cell
  cellName.innerHTML = critter.name; // add data to cell
  const cellType = row.insertCell(); // create new cell
  cellType.innerHTML = critter.type; // add data to cell
  const cellLifePoints = row.insertCell(); // create new cell
  cellLifePoints.innerHTML = critter.lifepoints; // add data to cell

  // console.log(critter);
  // in last column, create a button to remove items
  row.innerHTML +=
    "<td>" +
    `<button id="feedButton" onclick="feedCritter(\'${critter.name}\')">Feed (+3)</button>` +
    "</td>";
  row.innerHTML +=
    "<td>" +
    `<button id="exerciseButton" onclick="exerciseCritter(\'${critter.name}\')">Exercise (+5)</button>` +
    "</td>";
  row.innerHTML +=
    "<td>" +
    `<button id="sleepButton" onclick="sleepCritter(\'${critter.name}\')">Sleep (+1)</button>` +
    "</td>";
};

const feedCritter = async function (name) {
  const newData = {
    name: name,
  };
  let body = JSON.stringify(newData);
  const lifepoint = await fetch("/getLifePoints", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  });
  const lp = await lifepoint.json();
  if (lp > 0) {
    if (food > 0) {
      food -= 1;
      const updatedItem = await fetch("/feedCritter", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      });
      const data = await updatedItem.json();
      const foodCol = document.getElementById("food-val");
      foodCol.innerText = food;
      showCritter(data);
    } else {
      window.alert(
        "You do not have enough food resources to feed your critter."
      );
    }
  } else {
    window.alert("Critter is invalid RIP");
  }
};

const exerciseCritter = async function (name) {
  const newData = {
    name: name,
  };
  let body = JSON.stringify(newData);
  const lifepoint = await fetch("/getLifePoints", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  });
  const lp = await lifepoint.json();
  if (lp > 0) {
    if (exercise > 0) {
      exercise -= 1;
      const updatedItem = await fetch("/exerciseCritter", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      });
      const data = await updatedItem.json();
      const exerciseCol = document.getElementById("exercise-val");
      exerciseCol.innerText = exercise;
      showCritter(data);
    } else {
      window.alert(
        "You do not have enough exercise resources to exercise your critter."
      );
    }
  } else {
    window.alert("Critter is invalid RIP");
  }
};

const sleepCritter = async function (name) {
  const newData = {
    name: name,
  };
  let body = JSON.stringify(newData);
  const lifepoint = await fetch("/getLifePoints", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  });
  const lp = await lifepoint.json();
  if (lp > 0) {
    if (sleep > 0) {
      sleep -= 1;
      const updatedItem = await fetch("/sleepCritter", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      });
      const data = await updatedItem.json();
      const sleepCol = document.getElementById("sleep-val");
      sleepCol.innerText = sleep;
      showCritter(data);
    } else {
      window.alert(
        "You do not have enough sleep resources to rest your critter."
      );
    }
  } else {
    window.alert("Critter is invalid RIP");
  }
};

// Function to decrement life points of all critters
const showCritterArray = function (data) {
  let resultsTable = document.querySelector("#resultsTable");

  // Clear the existing table content
  resultsTable.innerHTML =
    "<tr><th>Critter Name</th><th>Type</th><th>Life Points</th><th>Feed</th><th>Exercise</th><th>Sleep</th></tr>";

  // Check if data is an array
  if (Array.isArray(data)) {
    data.forEach((item) => {
      formatTable(item, resultsTable);
    });
  }
};

// Modify the killCritters function
const killCritters = async () => {
  // Fetch all critters
  const critters = await fetch("/data").then((response) => response.json());

  // console.log(critters);

  // Call the updated showCritterArray function
  showCritterArray(critters);

  // Loop through critters and decrement life points
  for (const critter of critters) {
    if (critter.lifepoints > 0) {
      const updatedLifePoints = critter.lifepoints - 1;

      // Send a request to update the critter's life points
      const updatedItem = await fetch("/updateLifePoints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: critter.name,
          lifepoints: updatedLifePoints,
        }),
      });

      console.log("Updated lifepoints");

      const data = await updatedItem.json();
      // Update the specific row for the critter
      updateTableRow(data);

      console.log("Updated Table Entry");
    } else {
    }
  }
};

// Function to update the table row for a critter
const updateTableRow = function (data) {
  let resultsTable = document.querySelector("#resultsTable");

  // Find the row for the critter by its name
  const rows = resultsTable.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    if (cells[0].innerHTML === data.name) {
      cells[2].innerHTML = data.lifepoints; // Update the life points column
      break;
    }
  }
};

// initialize the page
window.onload = function () {
  // Initialize the money resource table with user data
  initializeMoneyResourceTable();

  // Initialize set interval function to start
  setInterval(killCritters, 5000);

  // Initialize the money button
  const moneyButton = document.getElementById("money-button");
  moneyButton.onclick = addMoney;

  // Initialize the food button
  const foodButton = document.getElementById("buy-food-button");
  foodButton.onclick = addFood;

  // Initialize the exercise button
  const exerciseButton = document.getElementById("buy-exercise-button");
  exerciseButton.onclick = addExercise;

  // Initialize the sleep button
  const sleepButton = document.getElementById("buy-sleep-button");
  sleepButton.onclick = addSleep;

  // Initialize the critter button
  const addCritter = document.querySelector("#buy-critter-button");
  addCritter.onclick = submit;

  fetch("/data", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => {
      showCritter(json);
    });
};
