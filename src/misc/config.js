const API_BASE_URL = 'https://api.tvmaze.com';

export async function apiGet(queryString){

    const response = await fetch(`${API_BASE_URL}${queryString}`).then(r => r.json());

    return response;

}

/*
const onSearch = () => {
        //https://api.tvmaze.com/search/shows?q=men
        fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
            .then(response => response.json()).then(result => {
                setResults(result);
                console.log(result);
                console.log(result[0].show.name);
            })
    };*/