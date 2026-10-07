(() => {
  const fitnessImages = [
    "assets/fitness-1.jpeg",
    "assets/fitness-2.jpeg",
    "assets/fitness-3.jpeg"
  ];

  function setupCardGallery() {
    const fitnessButton = [...document.querySelectorAll(".product button")]
      .find((button) => button.getAttribute("onclick")?.includes("openProduct('fitness')"));

    const card = fitnessButton?.closest(".product");
    const media = card?.querySelector(".product-media");
    if (!media || media.dataset.galleryReady === "true") return;

    media.dataset.galleryReady = "true";
    media.innerHTML = `
      <div class="fitness-card-gallery">
        <img class="fitness-card-main" src="${fitnessImages[0]}" alt="Modelo de llavero fitness">
        <button class="fitness-card-arrow fitness-card-prev" type="button" aria-label="Modelo anterior">‹</button>
        <button class="fitness-card-arrow fitness-card-next" type="button" aria-label="Modelo siguiente">›</button>
        <div class="fitness-card-dots" aria-label="Modelos disponibles">
          ${fitnessImages.map((_, i) => `<button class="fitness-dot${i === 0 ? " active" : ""}" type="button" data-index="${i}" aria-label="Ver modelo ${i + 1}"></button>`).join("")}
        </div>
        <span class="fitness-card-count"><b>1</b> / ${fitnessImages.length}</span>
      </div>
      <span class="product-tag">Diseño deportivo · 3 modelos</span>
    `;

    const image = media.querySelector(".fitness-card-main");
    const count = media.querySelector(".fitness-card-count b");
    const dots = [...media.querySelectorAll(".fitness-dot")];
    let current = 0;

    const show = (index) => {
      current = (index + fitnessImages.length) % fitnessImages.length;
      image.src = fitnessImages[current];
      count.textContent = current + 1;
      dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
    };

    media.querySelector(".fitness-card-prev").addEventListener("click", (e) => {
      e.stopPropagation();
      show(current - 1);
    });
    media.querySelector(".fitness-card-next").addEventListener("click", (e) => {
      e.stopPropagation();
      show(current + 1);
    });
    dots.forEach((dot) => dot.addEventListener("click", (e) => {
      e.stopPropagation();
      show(Number(dot.dataset.index));
    }));
  }

  function enhanceFitnessModal() {
    const detail = document.querySelector("#modalContent .detail");
    const mainImage = detail?.querySelector(":scope > img");
    if (!detail || !mainImage || detail.querySelector(".fitness-gallery")) return;

    const gallery = document.createElement("div");
    gallery.className = "fitness-gallery";
    gallery.innerHTML = `
      <div class="fitness-gallery-stage">
        <img id="fitnessGalleryMain" src="${fitnessImages[0]}" alt="Modelo de llavero fitness">
        <button class="gallery-arrow gallery-prev" type="button" aria-label="Foto anterior">‹</button>
        <button class="gallery-arrow gallery-next" type="button" aria-label="Foto siguiente">›</button>
        <span class="gallery-count"><b id="fitnessGalleryCurrent">1</b> / ${fitnessImages.length}</span>
      </div>
      <div class="fitness-gallery-thumbs">
        ${fitnessImages.map((src, index) => `
          <button class="gallery-thumb${index === 0 ? " active" : ""}" type="button" data-index="${index}" aria-label="Ver modelo ${index + 1}">
            <img src="${src}" alt="Modelo ${index + 1} de llavero fitness">
          </button>
        `).join("")}
      </div>
      <small class="gallery-hint">Pulsa las flechas o las miniaturas para ver más modelos.</small>
    `;

    mainImage.replaceWith(gallery);

    let current = 0;
    const image = gallery.querySelector("#fitnessGalleryMain");
    const counter = gallery.querySelector("#fitnessGalleryCurrent");
    const thumbs = [...gallery.querySelectorAll(".gallery-thumb")];

    const show = (index) => {
      current = (index + fitnessImages.length) % fitnessImages.length;
      image.src = fitnessImages[current];
      counter.textContent = current + 1;
      thumbs.forEach((thumb, i) => thumb.classList.toggle("active", i === current));
    };

    gallery.querySelector(".gallery-prev").addEventListener("click", () => show(current - 1));
    gallery.querySelector(".gallery-next").addEventListener("click", () => show(current + 1));
    thumbs.forEach((thumb) => thumb.addEventListener("click", () => show(Number(thumb.dataset.index))));
  }

  setupCardGallery();

  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button?.getAttribute("onclick")?.includes("openProduct('fitness')")) {
      setTimeout(enhanceFitnessModal, 0);
    }
  });
})();
