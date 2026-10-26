// =====================================
// PRODUCTOS
// =====================================

const products = [

    {
        id: 1,
        club: "Boca Juniors",
        name: "Boca Juniors Retro",
        year: "1997",
        price: 129.90,
        image: "images/boca-1997.jpg"
    },

    {
        id: 2,
        club: "River Plate",
        name: "River Plate Retro",
        year: "1996",
        price: 129.90,
        image: "images/river-1996.jpg"
    },

    {
        id: 3,
        club: "Barcelona",
        name: "Barcelona Retro",
        year: "1992",
        price: 139.90,
        image: "images/barcelona-1992.jpg"
    },

    {
        id: 4,
        club: "Real Madrid",
        name: "Real Madrid Retro",
        year: "1998",
        price: 139.90,
        image: "images/real-madrid-1998.jpg"
    },

    {
        id: 5,
        club: "Liverpool",
        name: "Liverpool Retro",
        year: "1984",
        price: 139.90,
        image: "images/liverpool-1984.jpg"
    },

    {
        id: 6,
        club: "AC Milan",
        name: "AC Milan Retro",
        year: "1989",
        price: 139.90,
        image: "images/milan-1989.jpg"
    },

    {
        id: 7,
        club: "Manchester United",
        name: "Manchester United Retro",
        year: "1999",
        price: 139.90,
        image: "images/manchester-united-1999.jpg"
    },

    {
        id: 8,
        club: "Chelsea",
        name: "Chelsea Retro",
        year: "1970",
        price: 129.90,
        image: "images/chelsea-1970.jpg"
    },

    {
        id: 9,
        club: "Arsenal",
        name: "Arsenal Retro",
        year: "2004",
        price: 139.90,
        image: "images/arsenal-2004.jpg"
    },

    {
        id: 10,
        club: "Corinthians",
        name: "Corinthians Retro",
        year: "1990",
        price: 129.90,
        image: "images/corinthians-1990.jpg"
    },

    {
        id: 11,
        club: "Juventus",
        name: "Juventus Retro",
        year: "1996",
        price: 139.90,
        image: "images/juventus-1996.jpg"
    },

    {
        id: 12,
        club: "Ajax",
        name: "Ajax Retro",
        year: "1995",
        price: 139.90,
        image: "images/ajax-1995.jpg"
    },

    {
        id: 13,
        club: "Inter Milan",
        name: "Inter Milan Retro",
        year: "1998",
        price: 139.90,
        image: "images/inter-1998.jpg"
    }

];


// =====================================
// CARRITO
// =====================================

let cart = [];


// =====================================
// MOSTRAR PRODUCTOS
// =====================================

function displayProducts(list) {

    const container = document.getElementById("products");

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML = `
            <p style="grid-column: 1/-1; text-align:center;">
                No encontramos camisetas.
            </p>
        `;

        return;
    }


    list.forEach(product => {

        const card = document.createElement("article");

        card.className = "product";

        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.style.display='none'"
                >

            </div>

            <div class="product-info">

                <span class="product-club">
                    ${product.club}
                </span>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <span class="product-year">
                    Temporada ${product.year}
                </span>

                <div class="product-bottom">

                    <span class="product-price">
                        S/ ${product.price.toFixed(2)}
                    </span>

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})"
                    >
                        + Carrito
                    </button>

                </div>

            </div>
        `;

        container.appendChild(card);

    });

}


// =====================================
// FILTRAR POR CLUB
// =====================================

function filterClub(club) {

    if (club === "Todos") {

        displayProducts(products);

        return;
    }

    const filtered = products.filter(
        product => product.club === club
    );

    displayProducts(filtered);

}


// =====================================
// BUSCADOR
// =====================================

function searchProducts() {

    const search = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered = products.filter(product =>

        product.name.toLowerCase().includes(search) ||

        product.club.toLowerCase().includes(search) ||

        product.year.includes(search)

    );

    displayProducts(filtered);

}


// =====================================
// AGREGAR AL CARRITO
// =====================================

function addToCart(id) {

    const product = products.find(
        product => product.id === id
    );

    cart.push(product);

    updateCart();

}


// =====================================
// ACTUALIZAR CARRITO
// =====================================

function updateCart() {

    const cartCount =
        document.getElementById("cart-count");

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    cartCount.textContent = cart.length;

    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((product, index) => {

        total += product.price;

        const item =
            document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `

            <span>
                ${product.name}
            </span>

            <span>
                S/ ${product.price.toFixed(2)}

                <button
                    onclick="removeFromCart(${index})"
                    style="
                        margin-left:10px;
                        border:none;
                        background:none;
                        cursor:pointer;
                    "
                >
                    ×
                </button>

            </span>

        `;

        cartItems.appendChild(item);

    });


    cartTotal.textContent =
        `S/ ${total.toFixed(2)}`;

}


// =====================================
// ELIMINAR PRODUCTO
// =====================================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// =====================================
// ABRIR CARRITO
// =====================================

function openCart() {

    document.getElementById(
        "cart-modal"
    ).style.display = "flex";

}


// =====================================
// CERRAR CARRITO
// =====================================

function closeCart() {

    document.getElementById(
        "cart-modal"
    ).style.display = "none";

}


// =====================================
// COMPRAR
// =====================================

function checkout() {

    if (cart.length === 0) {

        alert(
            "Tu carrito está vacío."
        );

        return;
    }


    let message =
        "Hola, quiero comprar:%0A%0A";


    let total = 0;


    cart.forEach(product => {

        message +=
            `- ${product.name} (${product.year}) - S/ ${product.price.toFixed(2)}%0A`;

        total += product.price;

    });


    message +=
        `%0ATotal: S/ ${total.toFixed(2)}`;


    const phone =
        "51999999999";


    window.open(
        `https://wa.me/${phone}?text=${message}`,
        "_blank"
    );

}


// =====================================
// INICIAR PÁGINA
// =====================================

displayProducts(products);