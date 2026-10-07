const cupsImg = "assets/Personaliza tus copas para eventos(1).png";
const cupsFallback = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#f4efe5"/>
      <stop offset="1" stop-color="#e7dfd1"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="750" fill="url(#bg)"/>
  <circle cx="190" cy="160" r="90" fill="#073947" opacity=".08"/>
  <circle cx="1030" cy="590" r="130" fill="#f26a21" opacity=".08"/>
  <text x="90" y="175" font-family="Arial, sans-serif" font-size="38" font-weight="700" fill="#f26a21">DETALLES PARA EVENTOS</text>
  <text x="90" y="270" font-family="Arial, sans-serif" font-size="76" font-weight="800" fill="#073947">Personaliza tus copas</text>
  <text x="90" y="340" font-family="Arial, sans-serif" font-size="34" fill="#66787d">Bodas · Comuniones · Bautizos</text>
  <g transform="translate(780,120)" fill="none" stroke="#073947" stroke-width="18" stroke-linecap="round" stroke-linejoin="round">
    <path d="M70 10h220l-30 250c-7 64-58 112-125 112S17 324 10 260L-20 10z"/>
    <path d="M135 372v150"/>
    <path d="M55 535h160"/>
  </g>
  <text x="90" y="470" font-family="Arial, sans-serif" font-size="30" fill="#073947">Nombres, colores y cantidades personalizadas</text>
  <rect x="90" y="535" rx="30" ry="30" width="390" height="72" fill="#073947"/>
  <text x="285" y="582" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="white">Precio según cantidad</text>
</svg>`);

grid.insertAdjacentHTML(
  "beforeend",
  `
  <article class="product">
    <div class="product-media">
      <img
        src="${cupsImg}"
        alt="Nombres personalizados para copas"
        loading="lazy"
        onerror="this.onerror=null;this.src=cupsFallback"
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