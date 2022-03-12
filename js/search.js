const searchFeed = document.getElementById("newsfeed");

function generateNewsFeed(info) {
    const subArticle = generateArticlesFeed(info.sub_articles)
	return `
	<div class="col-span-12 bg-white border-solid border border-slate-500 rounded-lg mb-4">
        <!-- Main article -->
        <div class="pt-4 pb-4 px-4">
            <a href="${info.link}">
                <div class="flex items-center text-lg font-bold">${info.title}</div>
                <div class="flex items-center opacity-70">
                    <div class="flex items-center text-xs mr-2">${info.source.title}</div>
                    <a class="flex items-center">
                        <div class="h-1 w-1 mr-2 pt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z"/></svg>
                        </div>
                        <div class="text-xs">${info.published}</div>
                    </a>
                </div>
            </a>
        </div>
        <!-- Main article (end) -->
        ${subArticle}
    </div>
	`
} 

function generateArticlesFeed(info = []) {
    let articleHtml = ""
    for (let i = 0; i < info.length; i++) {
        articleHtml += `
        <!-- Sub-article -->
        <div class="flex px-8 mr-32 mb-4 w-auto">
            <a href="${info[i].url}" class="flex">
                <div class="fill--blue h-2 w-2 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z"/></svg>
                </div>
                <div>
                    <div class="text-sm font-bold">${info[i].title}</div>
                    <div class="flex items-center opacity-70">
                        <div class="flex items-center text-xs mr-2">${info[i].publisher}</div>
                    </div>
                </div>
            </a>
        </div>
        <!-- Sub-article (end) -->
    `
    }
    return articleHtml;
}

function renderSearchResults(searchResults = []) {
    if (typeof object === 'object') {
        for (let i = 0; i < 10; i++) {
            const feeder = generateNewsFeed(searchResults[i]);
            searchFeed.innerHTML += feeder;
        }
        renderArticlesSearchResults(searchResults.sub_articles);
    } else {
        return `
        <div id="news-error" class="col-span-12 bg-white border-solid border border-slate-500 rounded-lg p-4 mb-4">Out of order... for now.</div>
        `
    }
}

function renderArticlesSearchResults(sub = []) {
    for (let i = 0; i < sub.length; i++) {
        const feeder = generateArticlesFeed(sub[i]);
        articlesFeed.innerHTML += feeder;
    }
}

function search(valueOf) {
    const searchAPI = `https://google-news.p.rapidapi.com/v1/search?q=${valueOf}&country=US&lang=en`;
    const fetchAPI = fetch(searchAPI, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "google-news.p.rapidapi.com",
            "x-rapidapi-key": "ceb7b38904msh05437490326e9cfp1de724jsn02f2c8b0dc46"
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        searchFeed.innerHTML = "";
        renderSearchResults(data.articles);
    })
    .catch(err => {
        console.error(err);
    });
} 

function debounce(func, timeout = 500){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const processChange = debounce(() => search());