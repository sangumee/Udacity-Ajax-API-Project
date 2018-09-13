(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        // Use ajax Method to show unsplash Images
        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID 89511a20975117a2d7d1c3fd1904517bb7326531502dc28a78dd73bb67269e4a'
            }
        }).done(addImage);

        function addImage(images) {
            const firstImage = images.results[0];

            responseContainer.insertAdjacentHTML('afterbegin', `<figure>
                    <img src="${firstImage.urls.small}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`);
        }

        // Use ajax Method to show NYT Articles
        $.ajax({
            url:`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=84769d8f2a284e4eb474fa4f82311714`
        }).done(addArticles);

        function addArticles(articles) {

            const data= articles;
            responseContainer.insertAdjacentHTML('beforeend', '<ul>' + data.response.docs.map(article => `<li class="article">
            <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
            </li>`).join('') + '</ul>')

        }

    });
})();