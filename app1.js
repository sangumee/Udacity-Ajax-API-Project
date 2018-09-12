(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        // const imgRequest = new XMLHttpRequest();
        // imgRequest.onload = addImage;
        // imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        // imgRequest.setRequestHeader('Authorization', 'Client-ID 89511a20975117a2d7d1c3fd1904517bb7326531502dc28a78dd73bb67269e4a');
        // imgRequest.send();

        // $.ajax({
        //     url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
        //     headers: {
        //         Authorization: 'Client-ID 89511a20975117a2d7d1c3fd1904517bb7326531502dc28a78dd73bb67269e4a'
        //     }
        // }).done(addImage);

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
                headers: {
                    Authorization: 'Client-ID 89511a20975117a2d7d1c3fd1904517bb7326531502dc28a78dd73bb67269e4a'
                }
            }).then(response => response.json())
            .then(addImage)
            .catch(e => requestError(e, 'image'));

        function addImage(data) {
            let htmlContent = '';
            const firstImage = data.results[0];

            if (firstImage) {
                htmlContent = `<figure>
                    <img src="${firstImage.urls.small}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`;
            } else {
                htmlContent = 'Unfortunately, no image was returned for your search.'
            }

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }




        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=84769d8f2a284e4eb474fa4f82311714`, {}).then(response => response.json())
            .then(addArticles)
            .catch(e => requestError(e, 'NYT API'));

        function addArticles(data1) {

            let htmlContent = '';
            const data1 = datae.response[0];

            if (data1.response && data1.response.docs && data1.response.docs.length > 1) {
                htmlContent = '<ul>' + data1.response.docs.map(article => `<li class="article">
                    <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                    <p>${article.snippet}</p>
                    </li>`).join('') + '</ul>';
            } else {
                htmlContent = '<div class="error-no-articles">No articles available</div>';
            }
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        function requestError(e, part) {
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
        }
    });
})();