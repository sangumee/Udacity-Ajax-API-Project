(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        // Use Fetch Method to get image from Unsplash
        // API Keys are only for the github pages function. You can get API key in this Link https://unsplash.com/developers
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
                headers: {
                    Authorization: 'Client-ID 89511a20975117a2d7d1c3fd1904517bb7326531502dc28a78dd73bb67269e4a'
                }
            }).then(response => response.json())
            .then(addImage)
            .catch(e => requestError(e, 'image'));


        // addImage Function
        function addImage(data) {
            let htmlContent = '';
            const firstImage = data.results[0];

            if (firstImage) {
                htmlContent = `<figure>
                        <a href="${firstImage.links.html}" target="_blank"><img src="${firstImage.urls.raw}" alt="${searchedForText}"></a>
                        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                    </figure>`;
            } else {
                htmlContent = 'Unfortunately, no image was returned for your search.'
            }

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        // Use Fetch Method to get articles from NYT
        // API Keys are only for the github pages function. You can get API key in this Link https://developer.nytimes.com/signup
        fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=84769d8f2a284e4eb474fa4f82311714`, {}).then(response => response.json())
            .then(addArticles)
            .catch(e => requestError(e, 'article'));

        function addArticles(articles) {
            let htmlContent = '';
            const data = articles;
            if (articles) {
                responseContainer.insertAdjacentHTML('beforeend', '<ul>' + data.response.docs.map(article => `<li class="article">
            <h2><a href="${article.web_url}" target="_blank">${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
            </li>`).join('') + '</ul>')

            } else {
                htmlContent = 'Unfortunately, no image was returned for your search.'
            }

            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }


        function requestError(e, part) {
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
        }

    });
})();