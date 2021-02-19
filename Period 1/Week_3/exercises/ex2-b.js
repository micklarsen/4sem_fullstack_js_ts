const fetch = require("node-fetch");
const URL = "https://swapi.dev/api/people/";

async function getPlanetForFirstSpeciesInFirstMovieForPersonAsync(id) {
    try {
        const n = await fetch(URL + id).then(res => res.json());
        const f = await fetch(n.films[0]).then(res => res.json());
        const s = await fetch(f.species[0]).then(res => res.json());
        const p = await fetch(s.homeworld).then(res => res.json());
        return `Name: ${n.name}, Title: ${f.title}, Species: ${s.name}, Planet: ${p.name}`
    }
    catch (err) {
        console.log(err);
    }
}

getPlanetForFirstSpeciesInFirstMovieForPersonAsync(1)
    .then((res) => {
        console.log(res);
    })