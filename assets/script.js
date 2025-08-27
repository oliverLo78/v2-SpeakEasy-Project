// API Keys (Replace with your actual keys)
const COCKTAIL_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const YOUTUBE_API_KEY = 'AIzaSyALVeo-GPPH2Qiw0MJbnfqwwjmFzHCLu1I';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsSection = document.getElementById('resultsSection');
const drinkName = document.getElementById('drinkName');
const drinkImg = document.getElementById('drinkImg');
const drinkIngredients = document.getElementById('drinkIngredients');
const drinkInstructions = document.getElementById('drinkInstructions');
const youtubeResults = document.getElementById('youtubeResults');
const commentForm = document.getElementById('commentForm');
const recentSearches = document.getElementById('recentSearches');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const closeModal = document.querySelector('.close');

// Global variables
let recentDrinks = JSON.parse(localStorage.getItem('recentDrinks')) || [];

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
commentForm.addEventListener('submit', handleCommentSubmit);
closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Add event listeners to recommendation cards
document.querySelectorAll('.recommendation').forEach(card => {
    card.addEventListener('click', () => {
         searchInput.value = card.getAttribute('data-drink');
            handleSearch();
    });
});
        
// Initialize recent searches
updateRecentSearches();

// Functions
function handleSearch() {
    const searchTerm = searchInput.value.trim();
            
    if (!searchTerm) {
        showModal('Error', 'Please enter a cocktail name to search');
        return;
    }
            
    // Add to recent searches
    if (!recentDrinks.includes(searchTerm)) {
        recentDrinks.unshift(searchTerm);
        if (recentDrinks.length > 5) recentDrinks.pop();
        localStorage.setItem('recentDrinks', JSON.stringify(recentDrinks));
        updateRecentSearches();
        
    }

    // Fetch cocktail data
    fetchCocktailData(searchTerm);
            
    // Fetch YouTube videos
    fetchYouTubeVideos(searchTerm);
        }
        
        function fetchCocktailData(cocktailName) {
            fetch(`${COCKTAIL_API_URL}${cocktailName}`)
                .then(response => response.json())
                .then(data => {
                    if (data.drinks && data.drinks.length > 0) {
                        displayCocktailData(data.drinks[0]);
                        resultsSection.style.display = 'block';
                    } else {
                        showModal('No Results', 'No drinks found with that name. Please try another search.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching cocktail data:', error);
                    showModal('Error', 'Failed to fetch cocktail data. Please try again later.');
                });
        }

        function displayCocktailData(drink) {
            // Set drink name
            drinkName.textContent = drink.strDrink;
            
            // Set drink image
            drinkImg.src = drink.strDrinkThumb;
            drinkImg.alt = drink.strDrink;
            
            // Set ingredients
            drinkIngredients.innerHTML = '';
            for (let i = 1; i <= 15; i++) {
                const ingredient = drink[`strIngredient${i}`];
                const measure = drink[`strMeasure${i}`];
                
                if (ingredient && ingredient.trim() !== '') {
                    const li = document.createElement('li');
                    li.textContent = `${measure ? measure : ''} ${ingredient}`;
                    drinkIngredients.appendChild(li);
                }
            }
            
            // Set instructions
            drinkInstructions.textContent = drink.strInstructions;
        }

        function fetchYouTubeVideos(searchQuery) {
        // In a real implementation, you would use the YouTube API
        // This is a mock implementation since we can't make actual API calls from this environment
            
            youtubeResults.innerHTML = `
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/jOfshHOuW_M" frameborder="0" allowfullscreen></iframe>
                </div>
                <p class="has-text-centered mt-3">Video tutorials for "${searchQuery}" would appear here</p>
            `;
            
            // Actual implementation would look like this:
            fetch(`${YOUTUBE_API_URL}?part=snippet&maxResults=3&q=${searchQuery}+cocktail+recipe&type=video&key=${YOUTUBE_API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    displayYouTubeVideos(data.items);
                })
                .catch(error => {
                    console.error('Error fetching YouTube videos:', error);
                    showModal('Error', 'Failed to fetch video tutorials. Please try again later.');
                });
            
        }
        
        function displayYouTubeVideos(videos) {
            youtubeResults.innerHTML = '';
            
            if (videos.length === 0) {
                youtubeResults.innerHTML = '<p class="has-text-light">No video tutorials found</p>';
                return;
            }
            
            videos.forEach(video => {
                const videoElement = document.createElement('div');
                videoElement.className = 'mb-5';
                videoElement.innerHTML = `
                    <h3 class="title is-5 has-text-light">${video.snippet.title}</h3>
                    <div class="video-container">
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${video.id.videoId}" 
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                    </div>
                `;
                youtubeResults.appendChild(videoElement);
            });
        }
        
        function handleCommentSubmit(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const drinkType = document.getElementById('drinkType').value;
            const comment = document.getElementById('comment').value;
            const agreement = document.getElementById('agreement').checked;
            
            if (!username || !email || !comment) {
                showModal('Error', 'Please fill in all required fields');
                return;
            }
            
            if (!agreement) {
                showModal('Error', 'Please agree to share your email address');
                return;
            }
            
            // Save comment to localStorage
            saveComment({
                username,
                email,
                drinkType,
                comment,
                timestamp: new Date().toISOString()
            });
            
            // Show success message
            showModal('Success', 'Thank you for your comment!');
            
            // Reset form
            commentForm.reset();
        }
        
        function saveComment(comment) {
            let comments = JSON.parse(localStorage.getItem('speakeasyComments')) || [];
            comments.push(comment);
            localStorage.setItem('speakeasyComments', JSON.stringify(comments));
        }
        
        function updateRecentSearches() {
            recentSearches.innerHTML = '';
            
            if (recentDrinks.length === 0) return;
            
            recentSearches.innerHTML = '<span class="tag is-dark is-medium">Recent Searches:</span>';
            
            recentDrinks.forEach(drink => {
                const tag = document.createElement('span');
                tag.className = 'tag is-danger is-medium mr-1';
                tag.textContent = drink;
                tag.style.cursor = 'pointer';
                tag.addEventListener('click', () => {
                    searchInput.value = drink;
                    handleSearch();
                });
                recentSearches.appendChild(tag);
            });
        }
        
        function showModal(title, message) {
            modalTitle.textContent = title;
            modalMessage.textContent = message;
            modal.style.display = 'flex';
        }
        
        // Initialize with a popular drink
        window.addEventListener('load', () => {
            searchInput.value = 'Margarita';
            handleSearch();
        });
