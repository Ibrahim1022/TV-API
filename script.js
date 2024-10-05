// Select elements from the DOM
const searchButton = document.getElementById('search');
const searchInput = document.querySelector('.search-box');
const moviesSection = document.querySelector('.movies-section');

// Function to fetch TV shows from TVMaze API based on search input
function fetchShows(query) {
  fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then(response => response.json())
    .then(data => {
      displayShows(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      moviesSection.innerHTML = '<p>Something went wrong. Please try again.</p>';
    });
}

// Function to display shows in the movies section
function displayShows(shows) {
  // Clear the previous results
  moviesSection.innerHTML = '';

  // Loop through the shows and create a card for each one
  shows.forEach(showObj => {
    const show = showObj.show;

    // Create the movie card container
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    // Show image
    const movieImage = document.createElement('div');
    movieImage.classList.add('movie-image');
    const img = document.createElement('img');
    img.src = show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image';
    img.alt = show.name;
    movieImage.appendChild(img);

    // Show title
    const movieHeading = document.createElement('h3');
    movieHeading.classList.add('movie-heading');
    movieHeading.textContent = show.name;

    // Show details (rating and genres)
    const details = document.createElement('div');
    details.classList.add('details');

    // Rating
    const ratingDiv = document.createElement('div');
    ratingDiv.classList.add('rating');
    const ratingImg = document.createElement('img');
    ratingImg.src = 'https://pngimg.com/d/star_PNG41474.png';
    ratingImg.height = 15;
    const rating = document.createElement('h3');
    rating.textContent = show.rating.average ? show.rating.average : 'N/A';
    ratingDiv.appendChild(ratingImg);
    ratingDiv.appendChild(rating);

    // Genres
    const genres = document.createElement('p');
    genres.textContent = show.genres.length ? show.genres.join(' | ') : 'No genres available';

    details.appendChild(ratingDiv);
    details.appendChild(genres);

    // Website button
    const websiteButton = document.createElement('button');
    websiteButton.classList.add('button');
    websiteButton.textContent = 'Website';
    websiteButton.onclick = () => {
      if (show.officialSite) {
        window.open(show.officialSite, '_blank');
      } else {
     console.log('No official site available for this show.');
      }
    };

    // Append all elements to the movie card
    movieCard.appendChild(movieImage);
    movieCard.appendChild(movieHeading);
    movieCard.appendChild(details);
    movieCard.appendChild(websiteButton);

    // Append the movie card to the movies section
    moviesSection.appendChild(movieCard);
  });
}

// Add event listener to the search button
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchShows(query);
  } else {
    console.log('Please enter a search term.');
  }
});
