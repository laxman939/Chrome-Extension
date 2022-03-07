/*Open Multiple Websites, a Google Chrome extension that lets you open 
multiple website(s) with a single click and also stores those links   */

//To display user name

user = prompt("Please Enter Your Name", "Laxman");

document.getElementById(
  "user"
).innerHTML = `Hello ${user} Welcome, Have a Great day.`;

// Todo's

document.getElementById("add-button").addEventListener("click", newElement);

// Create a "close" button and append it to each list item
let list = document.getElementsByTagName("li");

for (let i = 0; i < list.length; i++) {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  console.log(txt);

  span.className = "close";
  span.appendChild(txt);
  list[i].appendChild(span);
}
// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    let div = this.parentElement;
    div.style.display = "none";
  };
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  let li = document.createElement("li");
  let inputValue = document.getElementById("myInput").value;
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  document.getElementById("myUL").appendChild(li);
  document.getElementById("myInput").value = "";

  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement;
      div.style.display = "none";
    };
  }
}

//fetch urls from textarea and load them
function loadUrls() {
  // fetch urls from textarea and split it
  var urls = document.getElementById("urls").value.split("\n");
  for (var i = 0; i < urls.length; i++) {
    // remove the white space from the url
    var cleanUrl = urls[i].replace(/\s/g, "");

    // if user input valid urls then open pages
    if (cleanUrl != "") {
      chrome.tabs.create({ url: cleanUrl, selected: false });
    }

    // if user input no url
    else {
      document.getElementById("urls").innerHTML = "No value specified";
    }
  }
}
//fetch urls and save it in chrome storage
function saveUrls() {
  // Fetch urls from textarea and split it
  var urls = document.getElementById("urls").value.split("\n");
  var urlsContainer = "";

  // run a loop on the fetched urls
  for (i = 0; i < urls.length; i++) {
    // if the user input valid urls, save it in local chrome storage
    if (urls[i] != " ") {
      urlsContainer += urls[i] + "\n";
      localStorage["urls"] = urlsContainer;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // add an event listener to load url when button is clicked
  document.getElementById("button").addEventListener("click", loadUrls);

  // add an event listener to save url when button is clicked
  document.getElementById("button").addEventListener("click", saveUrls);

  // reload the urls in the browser
  var urls = localStorage["urls"];
  if (!urls) {
    return;
  }
  document.getElementById("urls").value = urls;
});

//api to show random quote
async function randomQuote() {
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  document.getElementById(
    "quote"
  ).innerHTML = `${data.content} —${data.author}`;
}
randomQuote();
