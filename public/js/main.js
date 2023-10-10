// FRONT-END (CLIENT) JAVASCRIPT HERE

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
