(() => {
  if (!document.querySelector('link[data-mic-premium]')) {
    const premiumStyles = document.createElement('link');
    premiumStyles.rel = 'stylesheet';
    premiumStyles.href = 'premium.css?v=20261013-1';
    premiumStyles.dataset.micPremium = 'true';
    document.head.appendChild(premiumStyles);
  }

  const categoryInfo = {
    all: {
      title: "Todos los productos",
      description: "Explora todos nuestros diseños y elige el que quieres personalizar."
    },
    decoracion: {
      title: "Decoración personalizada",
      description: "Piezas decorativas con nombres, iniciales y detalles creados a medida."
    },
    llaveros: {
      title: "Llaveros y deporte",
      description: "Diseños inspirados en fitness, pádel y aficiones, personalizables a tu gusto."
    },
    bodas: {
      title: "Bodas y eventos",
      description: "Detalles para mesas, copas y celebraciones que puedes adaptar al estilo de tu evento."
    },
    navidad: {
      title: "Navidad y litofanías",
      description: "Adornos y recuerdos personalizados con tus fotografías para regalar en Navidad."
    }
  };

  const catalog = document.querySelector("#catalogo");
  const catalogTitle = document.querySelector("#catalogTitle");
  const catalogDescription = document.querySelector("#catalogDescription");
  const productsMenu = document.querySelector("#productsMenu");
  const productsTrigger = document.querySelector("#productsTrigger");
  const menuButton = document.querySelector("#menuToggle");
  const mainNav = document.querySelector("#mainNav");

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

    const info = categoryInfo[filter] || categoryInfo.all;
    if (catalogTitle) catalogTitle.textContent = info.title;
    if (catalogDescription) catalogDescription.textContent = info.description;
  }

  function closeProductsDropdown() {
    productsMenu?.classList.remove("open");
    productsTrigger?.setAttribute("aria-expanded", "false");
  }

  function closeMobileNav() {
    mainNav?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  }

  function openCatalog(filter = "all") {
    filterProducts(filter);
    catalog?.classList.remove("is-catalog-hidden");
    closeProductsDropdown();
    closeMobileNav();

    requestAnimationFrame(() => {
      catalog?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  document.querySelectorAll("[data-catalog-filter]").forEach((button) => {
    button.addEventListener("click", () => openCatalog(button.dataset.catalogFilter || "all"));
  });

  document.querySelector("#closeCatalog")?.addEventListener("click", () => {
    catalog?.classList.add("is-catalog-hidden");
    document.querySelector("#nosotros")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  productsTrigger?.addEventListener("click", () => {
    const open = productsMenu?.classList.toggle("open");
    productsTrigger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  menuButton?.addEventListener("click", () => {
    const open = mainNav?.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    if (!open) closeProductsDropdown();
  });

  mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeProductsDropdown();
      closeMobileNav();
    });
  });

  document.querySelectorAll(".home-link").forEach((link) => {
    link.addEventListener("click", () => catalog?.classList.add("is-catalog-hidden"));
  });

  document.addEventListener("click", (event) => {
    if (productsMenu && !productsMenu.contains(event.target)) closeProductsDropdown();

    if (mainNav?.classList.contains("open") && !mainNav.contains(event.target) && !menuButton?.contains(event.target)) {
      closeMobileNav();
    }
  });

  prepareCards();
  filterProducts("all");
})();
