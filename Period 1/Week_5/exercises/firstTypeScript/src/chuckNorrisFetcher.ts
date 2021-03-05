import fetch from "node-fetch";

// Without changing ANYTHING in the highlighted part, add the necessary changes 
// to get code-completion hints as indicated in this figure.
// ## Added interface and made chuckNorrisFetcher() implement 
// ## a promise containing the interface

interface IChuckNorrisJoke {
    id: string,
    created_at: string,
    value: string,
    icon_url: string,
    updated_at: string,
    url: string
}

function chuckNorrisFetcher(): Promise<IChuckNorrisJoke> {
    return fetch("https://api.chucknorris.io/jokes/random")
        .then(res => res.json())
        .then(data => data)
}

async function chuckNorrisTester() {
    let joke = await chuckNorrisFetcher()
    console.log(joke.value)
}

chuckNorrisTester();
