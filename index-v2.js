let isSecondRowShowingEmail = true;

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

function showBox() {
  const hiddenData = row.childNodes[2].innerHTML;
  const secondRowCoords = row.childNodes[1].getBoundingClientRect();
  //   let coordX =
  //     window.scrollX + row.lastElementChild.getBoundingClientRect().left;
  //   let coordY =
  //     window.scrollY + row.lastElementChild.getBoundingClientRect().top;
  console.log("coordX", secondRowCoords.top);
  console.log("coordY", secondRowCoords.left);

  const coords = {
    top: window.scrollX + secondRowCoords.top - 20,
    left: window.scrollY + secondRowCoords.left - 10,
    width: "",
    height: ""
  };

  dropdownBackground.style.setProperty(
    "transform",
    `translate(${coords.left}px, ${coords.top}px)`
  );

  dropdownBackground.classList.add("open");
  console.log(hiddenData);

  //for the click function
  const row = document.querySelector("#tester");
  const dropdownBackground = document.querySelector(".dropdownBackground");

  function hideBox() {
    dropdownBackground.classList.remove("open");
  }

  //for the dropdown
  document
    .querySelector("butt-text")
    .addEventListener("click", changeSecondRow);

  function changeSecondRow() {
    // isSecondRowShowingEmail = !isSecondRowShowingEmail;
    // console.log(isSecondRowShowingEmail);
    console.log("working");

    generateTable();
  }

  // row.addEventListener("click", showBox);

  //set all tb items to have a click event
  // const triggers = document.querySelectorAll(".cool > li");
  // let contactRows = document.querySelectorAll("#app");

  // contactRows.forEach(contactRow => console.log(contactRow));

  // let elementX = window.scrollX + document.row
  // .getBoundingClientRect().left
}
