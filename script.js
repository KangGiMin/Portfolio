(() => {
  "use strict";

  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("kgm-theme");
  } catch (_) {}

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const label = theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환";
    themeToggle.setAttribute("aria-label", label);
    themeToggle.title = label;
    themeColor.content = theme === "dark" ? "#080a0d" : "#ffffff";
  }
  applyTheme(root.dataset.theme);
  themeToggle.addEventListener("click", () => {
    savedTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(savedTheme);
    try {
      localStorage.setItem("kgm-theme", savedTheme);
    } catch (_) {}
  });
  colorScheme.addEventListener("change", (event) => {
    if (!savedTheme) applyTheme(event.matches ? "dark" : "light");
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav");
  const mobileQuery = window.matchMedia("(max-width: 650px)");

  function closeMenu(returnFocus = false) {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "메뉴 열기");
    if (returnFocus) menuToggle.focus();
  }
  menuToggle.addEventListener("click", () => {
    const open = !navigation.classList.contains("open");
    navigation.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  });
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!mobileQuery.matches) return;
      closeMenu();
      // Move focus to the chosen section before hiding the focused menu link.
      const section = document.querySelector(link.getAttribute("href"));
      section.setAttribute("tabindex", "-1");
      section.focus({ preventScroll: true });
    });
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".header")) closeMenu();
  });
  mobileQuery.addEventListener("change", () => closeMenu());

  const cards = [...document.querySelectorAll(".project-card")];
  const filters = [...document.querySelectorAll(".filter")];
  const projectCount = document.querySelector(".project-count");
  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      filters.forEach((button) => {
        const selected = button === filter;
        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      let count = 0;
      cards.forEach((card) => {
        const visible =
          filter.dataset.filter === "all" ||
          card.dataset.category === filter.dataset.filter;
        card.hidden = !visible;
        if (visible) count++;
      });
      projectCount.textContent = `${count} PROJECT${count === 1 ? "" : "S"}`;
      updateActiveNavigation();
    });
  });

  const dialog = document.querySelector("#project-dialog");
  const dialogContent = document.querySelector("#dialog-content");
  let dialogTrigger = null;
  document.querySelectorAll("[data-project]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const template = document.getElementById(
        `detail-${trigger.dataset.project}`,
      );
      if (!template) return;
      dialogTrigger = trigger;
      dialogContent.replaceChildren(template.content.cloneNode(true));
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.classList.add("modal-open");
      document.querySelector(".dialog-close").focus({ preventScroll: true });
    });
  });
  document
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  let backdropPointerDown = false;
  const isOutsideDialog = (event) => {
    const rect = dialog.getBoundingClientRect();
    return (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    );
  };
  dialog.addEventListener("pointerdown", (event) => {
    backdropPointerDown = event.target === dialog && isOutsideDialog(event);
  });
  dialog.addEventListener("click", (event) => {
    if (
      backdropPointerDown &&
      event.target === dialog &&
      isOutsideDialog(event)
    )
      dialog.close();
    backdropPointerDown = false;
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    dialogTrigger?.focus({ preventScroll: true });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("open"))
      closeMenu(true);
  });

  const navLinks = [...document.querySelectorAll("[data-nav]")];
  const sections = navLinks.map((link) =>
    document.getElementById(link.dataset.nav),
  );
  function updateActiveNavigation() {
    const offset = Math.min(window.innerHeight * 0.35, 240);
    let active = null;
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= offset) active = section.id;
    });
    if (
      document.querySelector("#contact").getBoundingClientRect().top <= offset
    )
      active = null;
    navLinks.forEach((link) => {
      const selected = link.dataset.nav === active;
      link.classList.toggle("active", selected);
      if (selected) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  let scrollPending = false;
  window.addEventListener(
    "scroll",
    () => {
      if (scrollPending) return;
      scrollPending = true;
      window.requestAnimationFrame(() => {
        updateActiveNavigation();
        scrollPending = false;
      });
    },
    { passive: true },
  );
  window.addEventListener("resize", updateActiveNavigation);
  updateActiveNavigation();
  document.getElementById("year").textContent = new Date().getFullYear();

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!("IntersectionObserver" in window) || motionPreference.matches) return;

  const revealGroups = [...document.querySelectorAll("main > section")].map(
    (section) => {
      const content = section.classList.contains("hero")
        ? section
        : section.querySelector(":scope > .container");
      return [...content.children].flatMap((element) =>
        element.matches(".stack-grid, .project-grid")
          ? [...element.children]
          : [element],
      );
    },
  );
  revealGroups.push([document.querySelector(".footer-inner")]);

  const reveal = (element) => {
    element.classList.add("is-visible");
    observer.unobserve(element);
  };
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) reveal(entry.target);
      });
    },
    { threshold: 0.05 },
  );

  revealGroups.forEach((group) => {
    group.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min(index * 65, 195)}ms`);
      element.classList.add("reveal-pending");
      observer.observe(element);
    });
  });
  document.addEventListener("focusin", (event) => {
    const element = event.target.closest(".reveal-pending");
    if (element) reveal(element);
  });
  motionPreference.addEventListener("change", (event) => {
    if (!event.matches) return;
    observer.disconnect();
    revealGroups.flat().forEach((element) => element.classList.add("is-visible"));
  });
})();
