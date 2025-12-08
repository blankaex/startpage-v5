// use https://latlong.info/
const lat = 36;
const lon = 138;

const searchEngineDefault = 'https://www.google.com/search?q=';
const searchEngines = {
    g: ["google", "https://www.google.com/search?q="],
    i: ["google images", "https://www.google.com/search?udm=2&q="],
    y: ["youtube", "https://www.youtube.com/results?search_query="],
    w: ["wikipedia", "http://en.wikipedia.org/w/index.php?search="]
};

const links = [
    ["CATEGORY", "category1"],
    ["example", "https://example-link.com/"],
    ["example", "https://example-link.com/"],
    ["example", "https://example-link.com/"],
    ["example", "https://example-link.com/"],
    ["example", "https://example-link.com/"],
    ["CATEGORY", "END"],

    ["CATEGORY", "category2"],
    ["example", "https://example-link.com/"],
    ["example", "https://example-link.com/"],
    ["example", "https://example-link.com/"],
    ["example", "https://example-link.com/"],
    ["example", "https://example-link.com/"],
    ["CATEGORY", "END"],

    ["CATEGORY", "category3"],
    ["example", "https://example-link.com/"],
    ["example", "https://example-link.com/"],
    ["example", "https://example-link.com/"],
    ["example", "https://example-link.com/"],
    ["example", "https://example-link.com/"],
    ["CATEGORY", "END"],

    ["CATEGORY", "category4"],
    ["example", "https://example-link.com/"],
    ["example", "https://example-link.com/"],
    ["example", "https://example-link.com/"],
    ["example", "https://example-link.com/"],
    ["example", "https://example-link.com/"],
    ["CATEGORY", "END"]
]

// from https://open-meteo.com/en/docs/ecmwf-api
const weatherCodes = {
    0:  "clear",
    1:  "mostly clear",
    2:  "partly cloudy",
    3:  "overcast",
    45: "foggy",
    48: "depositing rime fog",
    51: "light drizzle",
    53: "moderate drizzle",
    55: "dense drizzle",
    56: "light freezing drizzle",
    57: "dense freezing drizzle",
    61: "slight rain",
    63: "rain",
    65: "heavy rain",
    66: "light freezing rain",
    67: "heavy freezing rain",
    71: "slight snowfall",
    73: "snow",
    75: "heavy snowfall",
    77: "snow grains",
    80: "slight shower",
    81: "moderate shower",
    82: "violent shower",
    85: "slight snow shower",
    86: "heavy snow shower",
    95: "thunderstorm",
    96: "thunderstorm, slight hail",
    99: "thunderstorm, heavy hail"
};
