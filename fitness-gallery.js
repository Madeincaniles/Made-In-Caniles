(() => {
  const fitnessImages = [
    "assets/fitness-1.jpeg",
    "assets/fitness-2.jpeg",
    "assets/fitness-3.jpeg"
  ];

  const originalOpenProduct = window.openProduct;

  if (typeof originalOpenProduct !== "function") return;

  window.openProduct = function (id) {
    originalOpenProduct(id);

    if (id !== "fitness") return;

    const detail = document.querySelector("#modalContent .detail");
    const mainImage = detail?.querySelector(":scope > img");

    if (!detail || !mainImage) return;

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
  };
})();
