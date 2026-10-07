const cupsImg = "assets/Personaliza tus copas para eventos.png";

grid.insertAdjacentHTML(
  "beforeend",
  `
  <article class="product">
    <div class="product-media">
      <img
        src="${cupsImg}"
        alt="Nombres personalizados para copas"
        loading="lazy"
      >
      <span class="product-tag">Bodas · Comuniones · Bautizos</span>
    </div>

    <div class="product-body">
      <div class="product-top">
        <h3>Nombres personalizados para copas</h3>
        <span class="price">Consultar</span>
      </div>

      <p>Detalles impresos en 3D que se enganchan al borde de la copa. Personalizables con nombres y colores. El precio depende de la cantidad.</p>

      <button onclick="window.open('https://wa.me/34673596200?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20nombres%20personalizados%20para%20copas.%20Me%20gustar%C3%ADa%20saber%20el%20precio%20seg%C3%BAn%20la%20cantidad.', '_blank')">
        Consultar por WhatsApp →
      </button>
    </div>
  </article>
  `
);