
fetch('../JSON/index.json')
.then(response => response.json())
.then(products => {
    const productContainer = document.getElementById('product-container');
    displayProducts(products, productContainer);

    
    const filterForm = document.getElementById('filter-form');
    
    filterForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const category = document.getElementById('category').value;
        const minPrice = document.getElementById('minPrice').value || 0;
        const maxPrice = document.getElementById('maxPrice').value || Number.MAX_VALUE;
        
        
        const selectedColors = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);

        
        const filteredProducts = products.filter(product => {
            const productPrice = parseInt(product.price.replace(/[^\d]/g, ''));
            
            
            const matchesCategory = category === "All Categories" || product.title.includes(category);

            
            const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;

            
            const matchesColor = selectedColors.length === 0 || selectedColors.some(color => product.description.includes(color));

            return matchesCategory && matchesPrice && matchesColor;
        });

       
        productContainer.innerHTML = '';
        displayProducts(filteredProducts, productContainer);
    });
})
.catch(error => console.error('Error fetching the JSON file:', error));


function displayProducts(products, container) {
container.innerHTML = '';
products.map(product => {
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
