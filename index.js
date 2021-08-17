let links = [];
let inputData = document.getElementById("inputData");
let saveData = document.getElementById("saveData");
let data = document.getElementById("data");
let deleteBtn = document.getElementById("delete");
let tabBtn = document.getElementById("saveTab");

const linksFromLocalStorage = JSON.parse(localStorage.getItem("links"));

if (linksFromLocalStorage) {    // If local storage is not null, get the links, and display the already saved links again
    links = linksFromLocalStorage;
    renderLinks();
}

function renderLinks() {
    let listItems = "";
    for (let i = 0; i < links.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${links[i]}'>${links[i]}</a>
        </li>
        `
    }
    data.innerHTML = listItems;
}

saveData.addEventListener("click", function () {
    links.push(inputData.value);
    localStorage.setItem("links", JSON.stringify(links));
    inputData.value = "";
    renderLinks();
});

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    links = [];
    renderLinks();
});

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({                         // Chrome API returns the current window tab address
        active: true, currentWindow: true
    }, function (tabs) {
        links.push(tabs[0].url);
        localStorage.setItem("links", JSON.stringify(links));
        renderLinks();
    })
});
