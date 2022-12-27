const searchedQuery = document.querySelector('#searchedQuery');
const resultCollections = document.querySelector('resultCollections');

searchedQuery.focus();

searchedQuery.addEventListener('input', function(event) {
    console.log(event.target.value);
});

// Consuming Wikipedia Search API
const query = async (searchedQuery) => {
    try{
        const initiateGetRequest = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|extracts&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchedQuery}`);
        const response = await initiateGetRequest.json();
        console.log({
            'term': searchedQuery,
            'results': response.query.search
        })
    }
    catch(error){
        console.error(`An error must have occurred: ${error}`);
    }
}

