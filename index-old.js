import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
`;

let isSecondRowShowingEmail = false;

//Get the Json data
function getUser(name) {
  fetch(`https://api.github.com/users/${name}`)
    .then(response => response.json())
    .then(json => console.log(json));
}

//connect the button
document.querySelector("#selector").addEventListener("change", changeSecondRow);

function changeSecondRow() {
  isSecondRowShowingEmail = !isSecondRowShowingEmail;
  console.log(isSecondRowShowingEmail);
}

// https://stackoverflow.com/questions/45018338/javascript-fetch-api-how-to-save-output-to-variable-as-an-object-not-the-prom/45018619

// function populateList(contacts = [], contactList) {

//   contactList.innerHTML = contacts.map((contacts, i) => {

//     return `
//       <li>
//         contacts
//       </li>
//     `;

//   }).join('');

// }

// GOALS
// 1: JSON to js object
// 2: js object into list item
// 3: list item css
// 4: add button js functionality
// 5: add onClick
// 6: add css design
