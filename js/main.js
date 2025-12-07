const weatherLocation = '品川区'

const searchEngineDefault = 'https://www.google.com/search?q=';
const searchEngines = [
    ["g", "google", "https://www.google.com/search?q="],
    ["i", "google images", "https://www.google.com/search?udm=2&q="],
    ["y", "youtube", "https://www.youtube.com/results?search_query="],
    ["n", "nyaa", "https://nyaa.si/?f=0&c=0_0&q="],
    ["s", "sukebei", "https://sukebei.nyaa.si/?f=0&c=0_0&q="],
    ["a", "anilist", "https://anilist.co/search/anime?search="],
    ["m", "anilist manga", "https://anilist.co/search/manga?search="],
    ["r", "arch wiki", "https://wiki.archlinux.org/index.php?search="],
    ["j", "jisho", "http://jisho.org/search/"],
    ["k", "kotobank", "https://kotobank.jp/search?q="],
    ["w", "wikipedia", "http://en.wikipedia.org/w/index.php?search="],
    ["x", "searxng", "https://searxng.blankaex.reisen/search?q="]
];

const links = [
    ["CATEGORY", "social"],
    ["twitter", "https://x.com/home"],
    ["youtube", "https://www.youtube.com/feed/subscriptions"],
    ["github", "https://github.com/blankaex?tab=repositories"],
    ["gmail", "https://mail.google.com/"],
    ["protonmail", "https://mail.proton.me/"],
    ["CATEGORY", "END"],

    ["CATEGORY", "media"],
    ["anichart", "https://anichart.net/"],
    ["anilist", "https://anilist.co/user/blankaex/animelist"],
    ["mangalist", "https://anilist.co/user/blankaex/mangalist"],
    ["vndb", "https://vndb.org/u42490/ulist?vnlist=1"],
    ["dramalist", "https://mydramalist.com/profile/blankaex"],
    ["CATEGORY", "END"],

    ["CATEGORY", "server"],
    ["qbittorrent", "https://qbittorrent.blankaex.reisen/"],
    ["szurubooru", "https://szurubooru.blankaex.reisen/"],
    ["statping", "https://statping.blankaex.reisen/"],
    ["portracker", "https://portracker.blankaex.reisen/"],
    ["CATEGORY", "END"],

    ["CATEGORY", "misc"],
    ["amazon", "https://www.amazon.co.jp/"],
    ["gmaps", "https://maps.google.com/"],
    ["nosh", "https://nosh.jp/mypage/475144/dashboard"],
    ["smart-tt", "https://reserva.be/smartttgym/reserve?mode=service_staff&search_evt_no=63eJwzNDAzMzEAAAQuATI&ctg_no=aceJwzMjK3MAEAAxABCA&sctg_no=d9eJwzNTI2AAACBADL"],
    ["CATEGORY", "END"]
]

const tabKeyCode = 9;
const enterKeyCode = 13;
const escapeKeyCode = 27;

const searchBarElement = document.getElementById('search-bar');
const formElement = document.getElementById('search-form');
const searchFlagList = document.getElementById('search-flag-list');
const searchOptions = document.getElementById('search-options');
const searchHr = document.getElementById('search-hr');
const linksContainer = document.getElementById('links-container');

function onLoad() {
    buildSearchList();
    buildLinkList();
}

function buildSearchList() {
    let searchEngineList = "";
    for (var i = 0; i < searchEngines.length; i++) {
        searchEngineList += `<li><span>-${searchEngines[i][0]}</span>${searchEngines[i][1]}</li>`
    }
    searchFlagList.innerHTML = searchEngineList;
}

function buildLinkList() {
    let linkList = "";
    for (var i = 0; i < links.length; i++) {
        if (links[i][0] == "CATEGORY" && links[i][1] != "END") {
            linkList += '<section class="link-section">'
            linkList += `<h2 class="link-section-title">${links[i][1]}</h2>`
            linkList += '<hr />'
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

function search() {
    let value = searchBarElement.value;
    if (!value) {
        return;
    }

    if (value.startsWith('https://') || value.startsWith('http://')) {
        window.location = value;
    } else if (value.startsWith('-') && value[2] == ' ') {
        let searchEngine = ""
        for (var i = 0; i < searchEngines.length; i++) {
            if (searchEngines[i][0] == value[1]) {
                searchEngine = searchEngines[i][2];
                break;
            }
        }
        if (searchEngine) {
            window.location = searchEngine + encodeURIComponent(value.substring(3, value.length));
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
}

function searchBlur() {
    searchOptions.classList.remove('input-active');
    searchHr.classList.remove('input-active');
    linksContainer.classList.remove('input-active');
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
