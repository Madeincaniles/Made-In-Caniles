const centroMesaImg = "Centro de mesa boda mr + mrs.png";

grid.insertAdjacentHTML(
  "beforeend",
  `
  <article class="product">
    <div class="product-media">
      <img src="${centroMesaImg}" alt="Centro de mesa para novios" loading="lazy">
      <span class="product-tag">Bodas · Mesa de novios</span>
    </div>

    <div class="product-body">
      <div class="product-top">
        <h3>Centro de mesa para novios</h3>
        <span class="price">Consultar</span>
      </div>

      <p>Decoración Mr + Mrs impresa en 3D para la mesa de los novios. Personalizable en colores y detalles. El precio depende del diseño.</p>

      <button onclick="window.open('https://wa.me/34673596200?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20centro%20de%20mesa%20para%20novios.%20Me%20gustar%C3%ADa%20consultar%20el%20precio%20y%20las%20opciones%20de%20personalizaci%C3%B3n.', '_blank')">
        Consultar por WhatsApp →
      </button>
    </div>
  </article>
  `
);