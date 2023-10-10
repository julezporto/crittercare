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
  }
};

// submit a critter
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
  console.log("show new critter");
  let data = await newCritter.json();
  console.log("add: " + JSON.stringify(data));
  showCritter(data);
};

// display critter
const showCritter = function (data) {
  let nameLabel = document.querySelector("#critter-name-display");
  let typeLabel = document.querySelector("#critter-type-display");
  let lifeLabel = document.querySelector("#critter-life-display");

  data.forEach((item) => {
    console.log("show results: " + JSON.stringify(Object.values(item)));
    nameLabel.innerHTML = "Critter Name: " + item.name;
    typeLabel.innerHTML = "Critter Type: " + item.type;
    lifeLabel.innerHTML = "Life Points: " + item.lifepoints;
  });
};

// initialize the page
window.onload = function () {
  // Initialize the money resource table with user data
  initializeMoneyResourceTable();

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
      showCritter(json, true);
    });
};
