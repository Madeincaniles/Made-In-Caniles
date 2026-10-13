(() => {
  const categoryNames = {
    all: "Todo el catálogo",
    decoracion: "Decoración personalizada",
    llaveros: "Llaveros y deporte",
    bodas: "Bodas y eventos",
    navidad: "Navidad y litofanías"
  };

  function getCategory(card) {
    const title = card.querySelector("h3")?.textContent.toLowerCase() || "";

    if (title.includes("letras grandes")) return "decoracion";
    if (title.includes("fitness") || title.includes("pádel") || title.includes("padel")) return "llaveros";
    if (title.includes("copas") || title.includes("centro de mesa")) return "bodas";
    if (title.includes("navidad") || title.includes("litofanía") || title.includes("litofania")) return "navidad";

    return "decoracion";
  }

  function prepareCards() {
    document.querySelectorAll("#productGrid .product").forEach((card) => {
      card.dataset.category = getCategory(card);
    });
  }

  function filterProducts(filter) {
    prepareCards();

    document.querySelectorAll("#productGrid .product").forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !visible);
    });

    document.querySelectorAll(".category-filter").forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    const note = document.querySelector("#catalogNote");
    if (note) note.textContent = categoryNames[filter] || categoryNames.all;
  }

  document.querySelectorAll(".category-filter").forEach((button) => {
    button.addEventListener("click", () => {
      filterProducts(button.dataset.filter || "all");
      document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const menuButton = document.querySelector("#menuToggle");
  const mainNav = document.querySelector("#mainNav");

  menuButton?.addEventListener("click", () => {
    const open = mainNav?.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
  });

  mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!mainNav?.classList.contains("open")) return;
    if (mainNav.contains(event.target) || menuButton?.contains(event.target)) return;
    mainNav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });

  prepareCards();
  filterProducts("all");
})();
