const searchedQuery = document.querySelector('#searchedQuery');
const resultCollections = document.querySelector('resultCollections');

searchedQuery.select();

searchedQuery.addEventListener('input', function(event) {
    query(event.target.value);
});

// Consuming Wikipedia Search API
const query = async (searchedQuery) => {
    try{
        const initiateGetRequest = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|extracts&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchedQuery}`;
        const response = await fetch(initiateGetRequest);
        const getRequest = await response.json();
        console.log({
            'term': searchedQuery,
            'results': getRequest.query.search
        });

    }
    catch(error){
        console.log(error);
    }
}
