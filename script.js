let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);

function addToCart(productName, productPrice, productImage) {
    cart.push({ name: productName, price: productPrice, image: productImage });
    total += productPrice;
    updateCart();
    updateCartIcon();
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Formato para separar miles
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return; // Si no existe, salir de la función
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px;">
            ${item.name} - $${formatPrice(item.price)} COP
            <button onclick="removeFromCart(${index})">Quitar</button>
        `;
        cartItems.appendChild(li);
    });
    document.getElementById('total-price').textContent = `Total: $${formatPrice(total)} COP`; // Usar la función de formato
}

function updateCartIcon() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length; // Actualiza el conteo de productos en el carrito
    }
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    total -= cart[index].price; // Restar el precio del total
    cart.splice(index, 1); // Eliminar el producto del carrito
    localStorage.setItem('cart', JSON.stringify(cart)); // Actualizar localStorage
    updateCart(); // Actualizar la vista del carrito
    updateCartIcon(); // Actualizar el ícono del carrito
}

// Inicializar el carrito en la página del carrito
if (document.getElementById('cart-items')) {
    updateCart();
    updateCartIcon();
}

// Añadir eventos a los botones
document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const productName = productElement.querySelector('h3').innerText;
        const productPrice = parseInt(productElement.querySelector('p').innerText.replace('$', '').replace(' COP', '').replace('.', '').replace(',', ''), 10);
        const productImage = productElement.querySelector('img').src; // Obtener la imagen del producto
        addToCart(productName, productPrice, productImage);
    });
});