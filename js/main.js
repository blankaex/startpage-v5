const tabKeyCode = 9;
const enterKeyCode = 13;
const escapeKeyCode = 27;

const searchBarElement = document.getElementById('search-bar');
const formElement = document.getElementById('search-form');
const searchFlagList = document.getElementById('search-flag-list');
const searchOptions = document.getElementById('search-options');
const searchHr = document.getElementById('search-hr');
const linksContainer = document.getElementById('links-container');
const weatherPanel = document.getElementById('weather');
const weatherInfo = document.getElementById('weather-info');

async function onLoad() {
    buildSearchList();
    buildLinkList();
    await buildWeather();
}

function buildSearchList() {
    let searchEngineKeys = Object.keys(searchEngines);
    let searchEngineList = "";
    for (var i = 0; i < searchEngineKeys.length; i++) {
        if (i % 6 == 0) {
            searchEngineList += '</ul><ul>'
        }
        searchEngineList += `<li><span>-${searchEngineKeys[i]}</span>${searchEngines[searchEngineKeys[i]][0]}</li>`
    }
    searchFlagList.innerHTML = searchEngineList;
}

function buildLinkList() {
    let linkList = "";
    for (var i = 0; i < links.length; i++) {
        if (links[i][0] == "CATEGORY" && links[i][1] != "END") {
            linkList += '<section class="link-section">'
            linkList += `<h2 class="link-section-title">${links[i][1]}</h2>`
            linkList += '<ul class="link-list">'
        }
        else if (links[i][0] == "CATEGORY" && links[i][1] == "END") {
            linkList += '</ul></section>'
        } else {
            linkList += '<li class="link-list-item">'
            linkList += `<a class="link" href="${links[i][1]}">${links[i][0]}</a>`
            linkList += '</li>'
        }
    }
    linksContainer.innerHTML = linkList;
}

async function buildWeather () {
    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
        `&hourly=temperature_2m&current_weather=true`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        let temp = `${data["current_weather"]["temperature"]}${data["current_weather_units"]["temperature"]}`;
        let cond = `${weatherCodes[data["current_weather"]["weathercode"]]}`;
        weatherInfo.innerHTML = `${temp} ${cond}`;
    } catch (e) {
        weatherInfo.innerHTML = "offline";
    }
}

function search() {
    let value = searchBarElement.value;
    if (!value) {
        return;
    }

    if (value.startsWith('https://') || value.startsWith('http://')) {
        window.location = value;
    } else if (value.startsWith('-') && value[2] == ' ') {
        let searchEngine = searchEngines[value[1]];
        if (searchEngine) {
            window.location = searchEngine[1] + encodeURIComponent(value.substring(3, value.length));
        } else {
    window.location = searchEngineDefault + encodeURIComponent(value);
        }
    } else {
        window.location = searchEngineDefault + encodeURIComponent(value);
    }
}

function searchFocus() {
    searchOptions.classList.add('input-active');
    searchHr.classList.add('input-active');
    linksContainer.classList.add('input-active');
    weatherPanel.classList.add('input-active');
}

function searchBlur() {
    searchOptions.classList.remove('input-active');
    searchHr.classList.remove('input-active');
    linksContainer.classList.remove('input-active');
    weatherPanel.classList.remove('input-active');
    searchBarElement.value = '';
}

formElement.addEventListener('submit', (ev) => {
    ev.preventDefault();
    search();
});

document.addEventListener('keypress', (event) => {
    if (event.keyCode == escapeKeyCode) {
        searchBarElement.blur();
        searchBarElement.value = '';
    } else if (event.keyCode != tabKeyCode && event.keyCode != enterKeyCode) {
        searchBarElement.focus();
    }
});
