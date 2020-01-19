let isSecondRowShowingEmail = true;
let isOverlayOn = false;
var dataRows;

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

async function generateTable() {
  const data = await getData("contacts.json");
  let jsonData = "";

  for (let row in data) {
    //First row [circle and name]
    const firstRow = `<span class="dot" style="background-color: ${data[row].status}"></span> ${data[row].name}`;

    //Second row [email/name]
    const secondRow = `${
      isSecondRowShowingEmail ? data[row].email : data[row].phone
    }`;

    //third row hidden [email, phone, address]
    const address1 = data[row].address;
    const address2 = `${data[row].city}, ${data[row].state} ${data[row].zip}`;
    const thirdRow = `<p>${data[row].email}</p><p>${data[row].phone}</p><p>${address1}<br /> ${address2}</p>`;

    //turn it into a data
    jsonData += `<tr>
        <td class="col-1">${firstRow}</td>
        <td class="col-2">${secondRow}</td>
        <td class="td-hidden">${thirdRow}</td>
    </tr>`;
  }

  document.getElementById("app").innerHTML = jsonData;

  //pass all tr into const
  dataRows = document.querySelectorAll("tr");
  dataRows.forEach(dataRow => {
    dataRow.addEventListener("click", showBox);
  });
}

//On window load - generate the table.
generateTable();

// 1) When you click a row, it shows the box directly on top of it.
// const dataRow = document.querySelector(".clickable");

// dataRow.addEventListener("click", showBox);

// 2) set all boxes to have the function
//set all tb items to have a click event
// const triggers = document.querySelectorAll(".cool > li");
// let contactRows = document.querySelectorAll("#app");

// contactRows.forEach(contactRow => console.log(contactRow));

// let elementX = window.scrollX + document.row
// .getBoundingClientRect().left

function showBox() {
  let hiddenData = this.querySelector(".td-hidden").innerHTML;
  let secondRowCoords = this.querySelector(".col-2").getBoundingClientRect();

  const coords = {
    top: secondRowCoords.top - 6,
    left: secondRowCoords.left - 6,
    width: "",
    height: ""
  };

  dropdownBackground.style.setProperty(
    "transform",
    `translate(${coords.left}px, ${coords.top}px)`
  );

  dropdownBackground.classList.add("open");

  //send text to dropdown
  dropdownBackground.querySelector("p").innerHTML = hiddenData;
  console.log(hiddenData);
}

//for the click function
const row = document.querySelector("#tester");
const dropdownBackground = document.querySelector(".dropdownBackground");

function hideBox() {
  dropdownBackground.classList.remove("open");
}

//for the dropdown
document.querySelector("#selector").addEventListener("change", changeSecondRow);

function changeSecondRow() {
  isSecondRowShowingEmail = !isSecondRowShowingEmail;
  console.log(isSecondRowShowingEmail);

  generateTable();
}

// 1) When ou click butts, it adds a overlay on top of the thing.
document.querySelector(".butt").addEventListener("click", setOverlay);

function setOverlay() {
  isOverlayOn = !isOverlayOn;
  console.log("isOverlayOn", isOverlayOn);

  if (isOverlayOn) {
    document.querySelector("#app").classList.add("overlay");
    console.log("show overlay");
  } else {
    document.querySelector("#app").classList.remove("overlay");

    console.log("hide overlay");
  }
}
