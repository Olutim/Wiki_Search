const searchedQuery = document.querySelector('#searchedQuery');
const resultCollections = document.querySelector('resultCollections');

searchedQuery.select();

searchedQuery.addEventListener('input', function(event) {
    query(event.target.value);
});

let timerIndicator;

const query = (searchedQuery) => {

    if(timerIndicator){
        clearTimeout(timerIndicator);
    }

    timerIndicator = setTimeout(async () => {
        try{
            const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|extracts&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchedQuery}`);
            const getRequest = await response.json();
            const searchResulttHtml = createHTML(getRequest.query.search, searchedQuery);
            resultCollections.innerHTML = searchResulttHtml;
        }
        catch(error){
            console.log(error);
        }
    }, 500)
}

const deHtml = (html) => {
    let deDiv = document.createElement('div');
    deDiv.textContent = html;
    return deDiv.textContent;
};

const highlightSearchedTexts = (str, searchedWord, className = 'highlight') => {
    const h1 = `<span class = '${className}'>${searchedWord}</span>`;
    return str.replace(new RegExp(searchedWord, 'gi'), h1);
};

const createHTML = (results, searchedQuery) => {
    return results
        .map(result => {
            const title = highlightSearchedTexts(deHtml(result.title), searchedQuery);
            const snippet = highlightSearchedTexts(deHtml(result.title), searchedQuery);

            return `<article>
                 <a href="https://en.wikipedia.org/?curid=${result.pageid}">
                    <h2>${title}</h2>
                </a>
                <div class="summary">${snippet}....</div>
            </article>`;
        })
        .join('');
};