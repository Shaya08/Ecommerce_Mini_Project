
document.addEventListener('DOMContentLoaded', function() {
    fetch('../JSON/index.json')
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById('product-container');
            displayProducts(products, productContainer);

            const searchForm = document.getElementById('search-form');
            const searchInput = document.getElementById('search-input');

            searchForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const searchTerm = searchInput.value.toLowerCase().trim(); 
                const filteredProducts = products.filter(product => 
                    product.title.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                );
                productContainer.innerHTML = ''; 
                displayProducts(filteredProducts, productContainer); 
            });
        })
        .catch(error => console.error('Error fetching the JSON file:', error));
});

function displayProducts(products, container) {
    products.forEach(product => {
        const cardHTML = `
            <div class="col-md-3 mb-4">
                <div class="card h-100 d-flex flex-column">
                    <img src="${product.imgSrc}" class="card-img-top product-img" alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text flex-grow-1">${product.description}</p>
                        <p class="card-text"><strong>${product.price}</strong></p>
                        <a href="#" class="btn btn-primary text-center mt-auto">Add to Cart</a>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}


