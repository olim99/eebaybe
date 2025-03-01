fetch("https://fakestoreapi.com/products?limit=10")
    .then(res => res.json())
    .then(data => {
        displayProducts(data);
    })
    .catch(error => console.error('Error loading products:', error));

const productContainer = document.getElementById('productContainer');
const cartItems = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');

function displayProducts(products) {
    productContainer.innerHTML = ""; 
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description.slice(0, 50)}...</p>
            <p class="price">$${product.price}</p>
            <button onclick='addToCart(${product.id}, "${product.title}", ${product.price})'>Купить</button>
        `;
        productContainer.appendChild(card);
    });
}

function addToCart(id, title, price) {
    const item = document.createElement('li');
    item.textContent = `${title} - $${price}`;
    cartItems.appendChild(item);

    const currentTotal = parseFloat(totalPriceElement.textContent.replace('Total: $', '')) || 0;
    const newTotal = currentTotal + price;
    totalPriceElement.textContent = `Total: $${newTotal.toFixed(2)}`;
}
