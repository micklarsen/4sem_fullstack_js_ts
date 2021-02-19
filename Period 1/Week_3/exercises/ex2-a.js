const fetch = require("node-fetch");
const URL = "https://swapi.dev/api/people/";

function getPlanetForFirstSpeciesInFirstMovieForPerson(id) {

    fetch(URL + id)
        .then((res) => res.json())
        .then(data => {
            console.log("Name: ", data.name)
            fetch(data.films[0])
                .then(res => res.json())
                .then(data1 => {
                    console.log("First film: " + data1.title);
                    fetch(data1.species[0])
                        .then(res => res.json())
                        .then(data2 => {
                            console.log("Species: " + data2.name);
                            fetch(data2.homeworld)
                                .then(res => res.json())
                                .then(data3 => {
                                    console.log("Planet: " + data3.name);
                                })
                        })
                })
        }).catch((err) => {
            console.log("Error: " + err);
        })
}
getPlanetForFirstSpeciesInFirstMovieForPerson(1);