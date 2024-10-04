document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById('search');
    const searchBox = document.querySelector('.search-box');
    const movieCard = document.querySelector('.movie-card');

    searchButton.addEventListener('click', function() {
        const searchTerm = searchBox.value.trim();
        if (searchTerm === '') {
            alert('Please enter a search term');
            return;
        }

        const apiUrl = `https://api.tvmaze.com/singlesearch/shows?q=${searchTerm}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const { name, rating, genres, officialSite } = data;

                movieCard.querySelector('.movie-heading').textContent = name;
                movieCard.querySelector('.rating h3').textContent = rating.average;
                movieCard.querySelector('.details p').textContent = genres.join(' | ');

                const websiteButton = document.createElement('a');
                websiteButton.href = officialSite;
                websiteButton.textContent = 'Website';
                websiteButton.className = 'button';
                websiteButton.target = '_blank';

                movieCard.appendChild(websiteButton);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('An error occurred while fetching data');
            });
    });
});