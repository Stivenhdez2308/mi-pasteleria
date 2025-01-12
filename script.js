let cart = [];
let total = 0;

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    total += productPrice;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - €${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });
    document.getElementById('total-price').textContent = `Total: €${total.toFixed(2)}`;
}

// Añadir eventos a los botones
document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const productName = productElement.querySelector('h3').innerText;
        const productPrice = parseFloat(productElement.querySelector('p').innerText.replace('Precio: €', ''));
        addToCart(productName, productPrice);
    });
});