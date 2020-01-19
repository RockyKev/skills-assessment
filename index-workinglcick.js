let isSecondRowShowingEmail = true;
let isOverlayOn = false;

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

async function generateTable() {
  const data = await getData("contacts.json");
  // console.log(data);
  // console.log("output", data[0].name);
  let jsonData = "";

  for (let row in data) {
    //First row [circle and name]
    const firstRow = `<span class="dot" style="background-color: ${data[row].status}"></span> ${data[row].name}`;

    //Second row [email/name]
    const secondRow = `${
      isSecondRowShowingEmail ? data[row].email : data[row].phone
    }`;

    //third row [email, phone, address]
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
}

//On window load - generate the table.
generateTable();

// 1) When you click a row, it shows the box directly on top of it.
const dataRow = document.querySelector(".clickable");

dataRow.addEventListener("click", showBox);

// 2)

function showBox() {
  const hiddenData = dataRow.childNodes[5].innerHTML;
  const secondRowCoords = dataRow.childNodes[3].getBoundingClientRect();
  // const secondRowCoords = dataRow.childNodes[1].getBoundingClientRect();

  //   let coordX =
  //     window.scrollX + row.lastElementChild.getBoundingClientRect().left;
  //   let coordY =
  //     window.scrollY + row.lastElementChild.getBoundingClientRect().top;

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

  //set all tb items to have a click event
  // const triggers = document.querySelectorAll(".cool > li");
  // let contactRows = document.querySelectorAll("#app");

  // contactRows.forEach(contactRow => console.log(contactRow));

  // let elementX = window.scrollX + document.row
  // .getBoundingClientRect().left
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

//get position of the div

function getPosition(element) {
  let posX,
    posY = 0;

  while (element) {
    if (element.tagName == "BODY") {
      //deal with browser quirks

      let xScroll = element.scrollLeft || document.documentElement.scrollLeft;
      let xyScroll = element.scrollTop || document.documentElement.scrollTop;
    } else {
      //for other non-body stuff

      posX += element.offsetLeft - element.scrollLeft + element.clientLeft;
      posY += element.offsetTop - element.scrollTop + element.clientTop;
    }

    element = element.offsetParent;
  }

  return {
    x: posX,
    y: posY
  };
}
