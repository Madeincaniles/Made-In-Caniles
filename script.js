const products = [
  {
    id: "letras",
    name: "Letras grandes personalizadas",
    price: 10,
    priceText: "Desde 10 €",
    img: "assets/letras-1.jpeg",
    tag: "Nombres personalizados",
    desc: "Inicial decorativa con nombre en relieve. Elige tamaño y color para crear una pieza única.",
    options: "letters"
  },
  {
    id: "bolas",
    name: "Bolas de Navidad de litofanía",
    price: 5,
    priceText: "Desde 5 €",
    img: "assets/bolas.jpeg",
    tag: "Con tus fotografías",
    desc: "Tus fotos favoritas convertidas en un adorno navideño de litofanía que cobra vida con la luz.",
    options: "balls"
  },
  {
    id: "fitness",
    name: "Llaveros fitness personalizados",
    price: null,
    priceText: "Consultar",
    img: "assets/fitness-1.jpeg",
    tag: "Diseño deportivo",
    desc: "Llaveros inspirados en el fitness, personalizables con iniciales, logos y colores.",
    options: "fitness"
  },
  {
    id: "padel",
    name: "Llaveros de pádel",
    price: 5,
    priceText: "5 €",
    img: "assets/pádel.jpeg",
    tag: "Para amantes del pádel",
    desc: "Mini pala de pádel impresa en 3D, ligera y disponible en diferentes colores.",
    options: "padel"
  }
];

let cart = JSON.parse(localStorage.getItem("mic-cart") || "[]");

const grid = document.querySelector("#productGrid");

products.forEach((p) => {
  grid.insertAdjacentHTML(
    "beforeend",
    `
    <article class="product">

      <div class="product-media">
        <img
          src="${p.img}"
          alt="${p.name}"
          loading="lazy"
        >

        <span class="product-tag">
          ${p.tag}
        </span>
      </div>

      <div class="product-body">

        <div class="product-top">
          <h3>${p.name}</h3>
          <span class="price">${p.priceText}</span>
        </div>

        <p>${p.desc}</p>

        <button onclick="openProduct('${p.id}')">
          Personalizar producto →
        </button>

      </div>

    </article>
    `
  );
});


function openProduct(id) {

  const p = products.find((x) => x.id === id);

  let fields = "";

  if (p.options === "letters") {

    fields = `
      <label>Tamaño</label>

      <select id="optSize" onchange="updateModalPrice()">
        <option value="15 cm|10">
          15 cm — 10 €
        </option>

        <option value="20 cm|15">
          20 cm — 15 €
        </option>
      </select>

      <label>Nombre</label>

      <input
        id="optName"
        placeholder="Ej. Martina"
        maxlength="30"
      >

      <label>Color</label>

      <input
        id="optColor"
        placeholder="Ej. rosa, azul, verde…"
      >
    `;
  }


  if (p.options === "balls") {

    fields = `
      <label>Pack</label>

      <select id="optSize" onchange="updateModalPrice()">

        <option value="1 bola|5">
          1 bola — 5 €
        </option>

        <option value="4 bolas|18">
          4 bolas — 18 €
        </option>

      </select>

      <label>Fotografías</label>

      <p>
        Después de realizar el pedido podrás enviarnos
        las fotografías directamente por WhatsApp.
      </p>
    `;
  }


  if (p.options === "fitness") {

    fields = `
      <label>Diseño / personalización</label>

      <input
        id="optName"
        placeholder="Logo, iniciales, colores…"
      >

      <p>
        <b>Precio:</b>
        te lo confirmaremos por WhatsApp según el diseño.
      </p>
    `;
  }


  if (p.options === "padel") {

    fields = `
      <label>Color o detalles</label>

      <input
        id="optName"
        placeholder="Indica tu preferencia"
      >
    `;
  }


  document.querySelector("#modalContent").innerHTML = `

    <div class="detail">

      <img
        src="${p.img}"
        alt="${p.name}"
      >

      <div>

        <span class="eyebrow">
          PERSONALIZA TU DISEÑO
        </span>

        <h2>${p.name}</h2>

        <p>${p.desc}</p>

        ${fields}

        <button
          class="add"
          onclick="addToCart('${p.id}')"
        >
          Añadir al carrito

          <span id="modalPrice">
            ${p.price === null ? "" : "· " + p.price + " €"}
          </span>

        </button>

      </div>

    </div>
  `;

  document
    .querySelector("#modal")
    .classList.remove("hidden");

  document
    .querySelector("#overlay")
    .classList.remove("hidden");
}


function updateModalPrice() {

  const size = document.querySelector("#optSize");

  if (!size) return;

  const price = size.value.split("|")[1];

  document.querySelector("#modalPrice").textContent =
    "· " + price + " €";
}


function addToCart(id) {

  const p = products.find((x) => x.id === id);

  let price = p.price;

  const details = [];

  const size = document.querySelector("#optSize");

  if (size) {

    const [label, value] =
      size.value.split("|");

    details.push(label);

    price = Number(value);
  }


  const name =
    document.querySelector("#optName");

  if (name?.value.trim()) {

    details.push(
      name.value.trim()
    );
  }


  const color =
    document.querySelector("#optColor");

  if (color?.value.trim()) {

    details.push(
      "Color: " + color.value.trim()
    );
  }


  cart.push({
    id: p.id,
    name: p.name,
    price: price,
    detail: details.join(" · ")
  });


  saveCart();

  closeModal();

  openCart();
}


function saveCart() {

  localStorage.setItem(
    "mic-cart",
    JSON.stringify(cart)
  );

  renderCart();
}


function renderCart() {

  document.querySelector(
    "#cartCount"
  ).textContent = cart.length;


  const box =
    document.querySelector("#cartItems");


  if (!cart.length) {

    box.innerHTML = `
      <div class="empty-cart">

        <strong>
          Tu carrito está vacío
        </strong>

        <p>
          Añade un producto y
          personalízalo a tu gusto.
        </p>

      </div>
    `;

  } else {

    box.innerHTML = cart
      .map(
        (item, index) => `

        <div class="cart-item">

          <strong>
            ${item.name}
          </strong>

          <small>
            ${item.detail || "Sin detalles adicionales"}
          </small>

          <div class="cart-item-row">

            <b>
              ${
                item.price == null
                  ? "Precio a consultar"
                  : item.price + " €"
              }
            </b>

            <button
              class="remove"
              onclick="removeItem(${index})"
            >
              Eliminar
            </button>

          </div>

        </div>
      `
      )
      .join("");
  }


  const knownTotal = cart
    .filter((item) => item.price != null)
    .reduce(
      (total, item) =>
        total + item.price,
      0
    );


  const hasUnknown =
    cart.some(
      (item) => item.price == null
    );


  let totalText = "";

  if (knownTotal) {
    totalText = knownTotal + " €";
  }


  if (hasUnknown) {

    totalText += knownTotal
      ? " + consultar"
      : "A consultar";
  }


  if (!cart.length) {
    totalText = "0 €";
  }


  document.querySelector(
    "#cartTotal"
  ).textContent = totalText;
}


function removeItem(index) {

  cart.splice(index, 1);

  saveCart();
}


function closeModal() {

  document
    .querySelector("#modal")
    .classList.add("hidden");

  if (
    !document
      .querySelector("#cart")
      .classList.contains("open")
  ) {

    document
      .querySelector("#overlay")
      .classList.add("hidden");
  }
}


function openCart() {

  document
    .querySelector("#cart")
    .classList.add("open");

  document
    .querySelector("#overlay")
    .classList.remove("hidden");
}


function closeCart() {

  document
    .querySelector("#cart")
    .classList.remove("open");

  document
    .querySelector("#overlay")
    .classList.add("hidden");
}


document.querySelector(
  "#cartBtn"
).onclick = openCart;


document.querySelector(
  "#closeCart"
).onclick = closeCart;


document.querySelector(
  "#closeModal"
).onclick = closeModal;


document.querySelector(
  "#overlay"
).onclick = () => {

  closeModal();

  closeCart();
};


document.querySelector(
  "#whatsappBtn"
).onclick = () => {

  if (!cart.length) {

    alert(
      "Añade algún producto al carrito."
    );

    return;
  }


  const total = cart
    .filter(
      (item) =>
        item.price != null
    )
    .reduce(
      (sum, item) =>
        sum + item.price,
      0
    );


  const lines = cart
    .map(
      (item) => {

        let line =
          "• " + item.name;

        if (item.detail) {

          line +=
            " — " + item.detail;
        }


        if (item.price != null) {

          line +=
            " — " +
            item.price +
            " €";

        } else {

          line +=
            " — precio a consultar";
        }

        return line;
      }
    )
    .join("\n");


  let message =
    "Hola, quiero realizar este pedido en Made In Caniles:\n\n" +
    lines +
    "\n\n";


  if (total) {

    message +=
      "Total conocido: " +
      total +
      " €\n";
  }


  message +=
    "\n¿Me confirmáis disponibilidad y los siguientes pasos?";


  const url =
    "https://wa.me/34673596200?text=" +
    encodeURIComponent(message);


  window.open(
    url,
    "_blank"
  );
};


document.querySelector(
  "#year"
).textContent =
  new Date().getFullYear();


renderCart();
