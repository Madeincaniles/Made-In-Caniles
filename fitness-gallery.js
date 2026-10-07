(() => {
  const galleries = {
    letras: {
      images: [
        "assets/letras-1.jpeg",
        "assets/letras-2.jpeg",
        "assets/letras-3.jpeg",
        "assets/letras-4.jpeg",
        "assets/letras-5.jpeg"
      ],
      label: "Letras grandes personalizadas",
      tag: "Nombres personalizados · 5 modelos"
    },
    fitness: {
      images: [
        "assets/fitness-1.jpeg",
        "assets/fitness-2.jpeg",
        "assets/fitness-3.jpeg"
      ],
      label: "Llaveros fitness personalizados",
      tag: "Diseño deportivo · 3 modelos"
    }
  };

  function setupCardGallery(productId, config) {
    const productButton = [...document.querySelectorAll(".product button")]
      .find((button) => button.getAttribute("onclick")?.includes(`openProduct('${productId}')`));

    const card = productButton?.closest(".product");
    const media = card?.querySelector(".product-media");
    if (!media || media.dataset.galleryReady === "true") return;

    media.dataset.galleryReady = "true";
    media.innerHTML = `
      <div class="fitness-card-gallery">
        <img class="fitness-card-main" src="${config.images[0]}" alt="${config.label}">
        <button class="fitness-card-arrow fitness-card-prev" type="button" aria-label="Foto anterior">‹</button>
        <button class="fitness-card-arrow fitness-card-next" type="button" aria-label="Foto siguiente">›</button>
        <div class="fitness-card-dots" aria-label="Fotos disponibles">
          ${config.images.map((_, i) => `<button class="fitness-dot${i === 0 ? " active" : ""}" type="button" data-index="${i}" aria-label="Ver foto ${i + 1}"></button>`).join("")}
        </div>
        <span class="fitness-card-count"><b>1</b> / ${config.images.length}</span>
      </div>
      <span class="product-tag">${config.tag}</span>
    `;

    const image = media.querySelector(".fitness-card-main");
    const count = media.querySelector(".fitness-card-count b");
    const dots = [...media.querySelectorAll(".fitness-dot")];
    let current = 0;

    const show = (index) => {
      current = (index + config.images.length) % config.images.length;
      image.src = config.images[current];
      count.textContent = current + 1;
      dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
    };

    media.querySelector(".fitness-card-prev").addEventListener("click", (event) => {
      event.stopPropagation();
      show(current - 1);
    });

    media.querySelector(".fitness-card-next").addEventListener("click", (event) => {
      event.stopPropagation();
      show(current + 1);
    });

    dots.forEach((dot) => dot.addEventListener("click", (event) => {
      event.stopPropagation();
      show(Number(dot.dataset.index));
    }));
  }

  function enhanceModal(productId, config) {
    const detail = document.querySelector("#modalContent .detail");
    const mainImage = detail?.querySelector(":scope > img");
    if (!detail || !mainImage || detail.querySelector(".fitness-gallery")) return;

    const gallery = document.createElement("div");
    gallery.className = "fitness-gallery";
    gallery.innerHTML = `
      <div class="fitness-gallery-stage">
        <img class="gallery-main" src="${config.images[0]}" alt="${config.label}">
        <button class="gallery-arrow gallery-prev" type="button" aria-label="Foto anterior">‹</button>
        <button class="gallery-arrow gallery-next" type="button" aria-label="Foto siguiente">›</button>
        <span class="gallery-count"><b>1</b> / ${config.images.length}</span>
      </div>
      <div class="fitness-gallery-thumbs">
        ${config.images.map((src, index) => `
          <button class="gallery-thumb${index === 0 ? " active" : ""}" type="button" data-index="${index}" aria-label="Ver foto ${index + 1}">
            <img src="${src}" alt="${config.label} · foto ${index + 1}">
          </button>
        `).join("")}
      </div>
      <small class="gallery-hint">Pulsa las flechas o las miniaturas para ver más modelos.</small>
    `;

    mainImage.replaceWith(gallery);

    let current = 0;
    const image = gallery.querySelector(".gallery-main");
    const counter = gallery.querySelector(".gallery-count b");
    const thumbs = [...gallery.querySelectorAll(".gallery-thumb")];

    const show = (index) => {
      current = (index + config.images.length) % config.images.length;
      image.src = config.images[current];
      counter.textContent = current + 1;
      thumbs.forEach((thumb, i) => thumb.classList.toggle("active", i === current));
    };

    gallery.querySelector(".gallery-prev").addEventListener("click", () => show(current - 1));
    gallery.querySelector(".gallery-next").addEventListener("click", () => show(current + 1));
    thumbs.forEach((thumb) => thumb.addEventListener("click", () => show(Number(thumb.dataset.index))));
  }

  Object.entries(galleries).forEach(([productId, config]) => setupCardGallery(productId, config));

  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const onclick = button.getAttribute("onclick") || "";
    const productId = Object.keys(galleries).find((id) => onclick.includes(`openProduct('${id}')`));
    if (!productId) return;

    setTimeout(() => enhanceModal(productId, galleries[productId]), 0);
  });
})();
