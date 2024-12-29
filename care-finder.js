const ingredientRecommendations = {
    acne: {
        ingredients: ['Salicylic Acid', 'Benzoyl Peroxide', 'Niacinamide', 'Tea Tree Oil'],
        description: 'These ingredients help fight bacteria, reduce inflammation, and control oil production.'
    },
    dryness: {
        ingredients: ['Hyaluronic Acid', 'Ceramides', 'Glycerin', 'Squalane'],
        description: 'These ingredients help attract and retain moisture, strengthening your skin barrier.'
    },
    darkSpots: {
        ingredients: ['Vitamin C', 'Alpha Arbutin', 'Kojic Acid', 'Niacinamide'],
        description: 'These ingredients help brighten skin and fade dark spots by inhibiting melanin production.'
    },
    sensitivity: {
        ingredients: ['Centella Asiatica', 'Green Tea', 'Aloe Vera', 'Panthenol'],
        description: 'These gentle ingredients help calm and soothe sensitive skin while reducing redness.'
    },
    aging: {
        ingredients: ['Retinol', 'Peptides', 'Vitamin C', 'Coenzyme Q10'],
        description: 'These ingredients help boost collagen production and protect against free radicals.'
    }
};

function showRecommendations() {
    const recommendationsContainer = document.getElementById('recommendations-container');
    const selectedConcerns = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    if (selectedConcerns.length === 0) {
        recommendationsContainer.innerHTML = '<p class="alert alert-warning">Please select at least one skin concern.</p>';
        return;
    }

    let recommendationsHTML = '<h3>Your Personalized Ingredients</h3>';
    
    selectedConcerns.forEach(concern => {
        const recommendation = ingredientRecommendations[concern];
        recommendationsHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">For ${concern.charAt(0).toUpperCase() + concern.slice(1)}</h4>
                    <p class="card-text">${recommendation.description}</p>
                    <h5>Recommended Ingredients:</h5>
                    <ul>
                        ${recommendation.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    });

    recommendationsHTML += `
        <div class="mt-4">
            <p>Remember to introduce new ingredients gradually and patch test before full application.</p>
            <a href="products.html" class="btn btn-gradient">Find Products with These Ingredients</a>
        </div>
    `;

    recommendationsContainer.innerHTML = recommendationsHTML;
}
