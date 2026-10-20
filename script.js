    document.getElementById("year").textContent = new Date().getFullYear();

    const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
    const navSections = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
    let navUpdatePending = false;

    function updateActiveNav() {
      if (navUpdatePending) return;
      navUpdatePending = true;

      window.requestAnimationFrame(() => {
        navUpdatePending = false;
        const activationLine = document.querySelector(".site-header").offsetHeight + 1;
        let activeSection = navSections.find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= activationLine && bounds.bottom > activationLine;
        });

        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1) {
          activeSection = navSections[navSections.length - 1];
        }

        navLinks.forEach((link) => {
          if (activeSection && link.hash === `#${activeSection.id}`) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    window.addEventListener("resize", updateActiveNav);
    updateActiveNav();

    const contactDialog = document.getElementById("contact-dialog");
    document.querySelectorAll("[data-open-contact]").forEach((button) => {
      button.addEventListener("click", () => contactDialog.showModal());
    });
    contactDialog.querySelector(".contact-close").addEventListener("click", () => {
      contactDialog.close();
    });
    contactDialog.addEventListener("click", (event) => {
      if (event.target === contactDialog) contactDialog.close();
    });
  
