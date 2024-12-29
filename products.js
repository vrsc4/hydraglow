const products = [
    {
        name: "COSRX Advanced Snail 96 Mucin Power Essence",
        brand: "COSRX",
        price: 25,
        rating: 4.5,
        ingredients: ["Snail Secretion Filtrate", "Hyaluronic Acid"],
        amazonLink: "https://www.amazon.com/Cosrx-Advanced-Snail-Mucin-Essence/dp/B00PBX3L7K",
        image: "https://m.media-amazon.com/images/I/61oqm51WDXL._SL1500_.jpg"
    },
    {
        name: "Beauty of Joseon Glow Serum",
        brand: "Beauty of Joseon",
        price: 17,
        rating: 4.7,
        ingredients: ["Propolis", "Niacinamide"],
        amazonLink: "https://www.amazon.com/Beauty-Joseon-Glow-Serum-Niacinamide/dp/B08MCZBPM3",
        image: "https://m.media-amazon.com/images/I/61DUO0NqyyL._SL1500_.jpg"
    },
    // Add more products here...
];

const brands = [...new Set(products.map(p => p.brand))].sort();
const ingredients = [...new Set(products.flatMap(p => p.ingredients))].sort();

$(document).ready(function() {
    $('.ingredients-select').select2({
        placeholder: "Select ingredients"
    });
    $('.price-select').select2({
        placeholder: "Select price range"
    });
    $('.brands-select').select2({
        placeholder: "Select brands"
    });

    // Populate dropdowns
    ingredients.forEach(ingredient => {
        $('.ingredients-select').append(new Option(ingredient, ingredient));
    });
    brands.forEach(brand => {
        $('.brands-select').append(new Option(brand, brand));
    });

    // Initial product display
    displayProducts(products);
});

function filterProducts() {
    const selectedIngredients = $('.ingredients-select').val() || [];
    const selectedPriceRanges = $('.price-select').val() || [];
    const selectedBrands = $('.brands-select').val() || [];

    const filteredProducts = products.filter(product => {
        const ingredientsMatch = selectedIngredients.length === 0 || 
            selectedIngredients.some(i => product.ingredients.includes(i));
        
        const brandMatch = selectedBrands.length === 0 || 
            selectedBrands.includes(product.brand);
        
        const priceMatch = selectedPriceRanges.length === 0 || 
            selectedPriceRanges.some(range => {
                switch(range) {
                    case 'under10': return product.price < 10;
                    case '10-20': return product.price >= 10 && product.price <= 20;
                    case '20-30': return product.price >= 20 && product.price <= 30;
                    case '30-50': return product.price >= 30 && product.price <= 50;
                    case 'over50': return product.price > 50;
                    default: return false;
                }
            });

        return ingredientsMatch && brandMatch && priceMatch;
    });

    displayProducts(filteredProducts);
}

function displayProducts(productsToShow) {
    const container = document.getElementById('products-container');
    
    if (productsToShow.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p>No products found matching your criteria.</p></div>';
        return;
    }

    container.innerHTML = productsToShow.map(product => `
        <div class="col-md-4 mb-4">
            <div class="product-card h-100 shadow-sm">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: contain;">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">
                        <strong>Brand:</strong> ${product.brand}<br>
                        <strong>Price:</strong> $${product.price}<br>
                        <strong>Rating:</strong> 
                        <span class="star-rating">
                            ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 >= 0.5 ? '½' : ''}
                        </span>
                        (${product.rating}/5)<br>
                        <strong>Key Ingredients:</strong> ${product.ingredients.join(', ')}
                    </p>
                    <a href="${product.amazonLink}" class="btn btn-primary" target="_blank">View on Amazon</a>
                </div>
            </div>
        </div>
    `).join('');
}
