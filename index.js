let isSecondRowShowingEmail = true;
let isOverlayOn = false;
var dataRows;

const dropdownBackground = document.querySelector(".dropdownBackground"); //for the click function
const dropNameBackground = document.querySelector(".dropNameBackground"); //for the click function

//On window load - generate the table.
generateTable();

//gather data from JSON
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
    const thirdRow = `<p><a href="mailto:${data[row].email}">${data[row].email}</a></p><p>${data[row].phone}</p><p>${address1}<br /> ${address2}</p>`;

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

//for the dropdown
document.querySelector("#selector").addEventListener("change", changeSecondRow);

function changeSecondRow() {
  isSecondRowShowingEmail = !isSecondRowShowingEmail;
  console.log(isSecondRowShowingEmail);

  generateTable();
}

function setOverlay() {
  isOverlayOn = !isOverlayOn;
  console.log("isOverlayOn", isOverlayOn);

  if (isOverlayOn) {
    document.querySelector("#app").classList.add("overlay");
  } else {
    document.querySelector("#app").classList.remove("overlay");
    hideBox(); //removes the pop-up boxes
  }
}

function showBox() {
  let hiddenData = this.querySelector(".td-hidden").innerHTML;
  let first = this.querySelector(".col-1");
  let second = this.querySelector(".col-2");
  let firstCoords = first.getBoundingClientRect();
  let secondCoords = second.getBoundingClientRect();

  const coords = {
    firstTop: window.scrollY + firstCoords.top - 6,
    firstLeft: window.scrollX + firstCoords.left - 6,
    secondTop: window.scrollY + secondCoords.top - 6,
    secondLeft: window.scrollX + secondCoords.left - 6
  };

  dropNameBackground.style.setProperty(
    "transform",
    `translate(${coords.firstLeft}px, ${coords.firstTop}px)`
  );

  dropdownBackground.style.setProperty(
    "transform",
    `translate(${coords.secondLeft}px, ${coords.secondTop}px)`
  );

  dropdownBackground.classList.add("open");

  //set overlay on
  setOverlay();

  //send text to dropdown
  dropdownBackground.querySelector("p").innerHTML = hiddenData;

  //lift up first box
  if (dropdownBackground.classList.contains("open")) {
    dropNameBackground.querySelector("p").innerHTML = first.innerHTML;
    dropNameBackground.classList.add("open");
  }
}

function hideBox() {
  dropdownBackground.classList.remove("open");
  dropdownBackground.style.setProperty("transform", `translate(0px, 0px)`);

  dropNameBackground.classList.remove("open");
  dropNameBackground.style.setProperty("transform", `translate(0px, 0px)`);
}
