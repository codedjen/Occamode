(function () {
  "use strict";

  var SERVICES = [
    {
      title: "IoT Development",
      desc: "Drive innovation with tailored IoT advancements.",
      href: "./iot.html",
      icon:
        '<svg width="28" height="28" viewBox="0 0 28 28" fill="none">' +
        '<rect x="7" y="7" width="14" height="14" rx="3" fill="#FF5722" opacity=".15"/>' +
        '<rect x="7" y="7" width="14" height="14" rx="3" stroke="#FF5722" stroke-width="1.5"/>' +
        '<rect x="11" y="11" width="6" height="6" rx="1" fill="#FF5722"/>' +
        '<path d="M11 4v3M17 4v3M11 21v3M17 21v3M4 11h3M4 17h3M21 11h3M21 17h3" stroke="#FF5722" stroke-width="1.5" stroke-linecap="round"/>' +
        "</svg>",
    },
    {
      title: "Web Development",
      desc: "Expertly engineered web solutions from concept to code.",
      href: "./webservice.html",
      icon:
        '<svg width="28" height="28" viewBox="0 0 28 28" fill="none">' +
        '<rect x="3" y="4" width="22" height="17" rx="3" fill="#E53935" opacity=".15"/>' +
        '<rect x="3" y="4" width="22" height="17" rx="3" stroke="#E53935" stroke-width="1.5"/>' +
        '<path d="M3 9.5h22" stroke="#E53935" stroke-width="1.5"/>' +
        '<circle cx="6" cy="6.75" r=".75" fill="#E53935"/>' +
        '<circle cx="8.5" cy="6.75" r=".75" fill="#E53935"/>' +
        '<circle cx="11" cy="6.75" r=".75" fill="#E53935"/>' +
        '<path d="M10.5 14l2.5 2.5-2.5 2.5M17.5 14l-2.5 2.5 2.5 2.5" stroke="#E53935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
        "</svg>",
    },
    {
      title: "UI/UX Designing",
      desc: "Enhance your digital presence with expert UI/UX services.",
      href: "./ui-ux.html",
      icon:
        '<svg width="28" height="28" viewBox="0 0 28 28" fill="none">' +
        '<rect x="3" y="3" width="10" height="10" rx="2" fill="#FF7043" opacity=".15" stroke="#FF7043" stroke-width="1.5"/>' +
        '<rect x="15" y="3" width="10" height="10" rx="2" fill="#FF7043" opacity=".15" stroke="#FF7043" stroke-width="1.5"/>' +
        '<rect x="3" y="15" width="10" height="10" rx="2" fill="#FF7043" opacity=".15" stroke="#FF7043" stroke-width="1.5"/>' +
        '<rect x="15" y="15" width="10" height="10" rx="5" fill="#FF7043"/>' +
        "</svg>",
    },
    {
      title: "Mobile App Development",
      desc: "Build secure, fast, visually stunning mobile apps.",
      href: "./mobile-app-service.html",
      icon:
        '<svg width="28" height="28" viewBox="0 0 28 28" fill="none">' +
        '<rect x="7" y="2" width="14" height="24" rx="3" fill="#2D39F2" opacity=".15"/>' +
        '<rect x="7" y="2" width="14" height="24" rx="3" stroke="#2D39F2" stroke-width="1.5"/>' +
        '<path d="M7 7h14M7 20h14" stroke="#2D39F2" stroke-width="1.5"/>' +
        '<circle cx="14" cy="23" r="1.25" fill="#2D39F2"/>' +
        '<rect x="11" y="10" width="6" height="2" rx="1" fill="#2D39F2" opacity=".5"/>' +
        '<rect x="11" y="14" width="4" height="2" rx="1" fill="#2D39F2" opacity=".3"/>' +
        "</svg>",
    },
    {
      title: "Product Engineering",
      desc: "Evolve products with technology advancements and re-engineering.",
      href: "./productEngineering.html",
      icon:
        '<svg width="28" height="28" viewBox="0 0 28 28" fill="none">' +
        '<circle cx="14" cy="14" r="5" fill="#444CFC" opacity=".15" stroke="#444CFC" stroke-width="1.5"/>' +
        '<circle cx="14" cy="14" r="2" fill="#444CFC"/>' +
        '<path d="M14 5v3M14 20v3M5 14h3M20 14h3M7.93 7.93l2.12 2.12M17.95 17.95l2.12 2.12M7.93 20.07l2.12-2.12M17.95 10.05l2.12-2.12" stroke="#444CFC" stroke-width="1.5" stroke-linecap="round"/>' +
        "</svg>",
    },
    {
      title: "DevOps",
      desc: "Accelerate software delivery, ensuring top efficiency & security.",
      href: "./devops.html",
      icon:
        '<svg width="28" height="28" viewBox="0 0 28 28" fill="none">' +
        '<path d="M14 4l3 5h-6l3-5z" fill="#FF5722"/>' +
        '<path d="M8 14a6 6 0 0112 0" stroke="#FF5722" stroke-width="1.5" stroke-linecap="round"/>' +
        '<path d="M6 14a8 8 0 0116 0" stroke="#FF5722" stroke-width="1.5" stroke-linecap="round" opacity=".4"/>' +
        '<circle cx="14" cy="19" r="3" fill="#FF5722" opacity=".15" stroke="#FF5722" stroke-width="1.5"/>' +
        '<circle cx="14" cy="19" r="1" fill="#FF5722"/>' +
        "</svg>",
    },
  ];

  // ── HTML builders ────────────────────────────────────────────

  function buildDropdownHTML() {
    var html = '<div class="grid grid-cols-2 gap-y-10 gap-x-10">';
    for (var i = 0; i < SERVICES.length; i++) {
      var s = SERVICES[i];
      html +=
        '<a href="' + s.href + '" class="flex items-start gap-3 rounded-lg no-underline transition-colors hover:bg-[#F5F7FA] p-2">' +
          '<span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">' + s.icon + "</span>" +
          "<div>" +
            '<p class="text-[14px] font-bold leading-[100%]! text-[#1B2125]">' + s.title + "</p>" +
            '<p class="mt-0.5 text-[12px] leading-relaxed text-[#647E9B]">' + s.desc + "</p>" +
          "</div>" +
        "</a>";
    }
    html += "</div>";
    return html;
  }

  var svcChevronRight = '<svg class="h-4 w-4 shrink-0 text-[#B0BAC9]" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var circleMinusSVG = '<svg class="mm-sb-toggle-icon h-[22px] w-[22px] shrink-0" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" stroke="currentColor" stroke-width="1.5"/><path class="mm-sb-h-bar" d="M7 11h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path class="mm-sb-v-bar" d="M11 7v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

  function buildSidebarHTML(navItems, contactHref) {
    var html =
      '<div class="flex shrink-0 items-center justify-between px-6 py-5">' +
        '<a href="./index.html"><img src="./images/logoblue.svg" alt="Occamode" class="h-5 w-auto"></a>' +
        '<button class="mm-sb-close flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border-none bg-[#1B2125] transition-opacity hover:opacity-80" aria-label="Close menu">' +
          '<svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>' +
        "</button>" +
      "</div>" +
      '<nav class="flex-1 overflow-y-auto px-6 pb-6">';

    for (var i = 0; i < navItems.length; i++) {
      var item = navItems[i];

      if (item.isServices) {
        var svcColor = item.active ? " font-semibold text-[#2D39F2]" : " font-medium text-[#1B2125]";
        html +=
          '<div class="border-b border-[#EDF2F8]">' +
          '<button class="mm-sb-svc-toggle flex w-full items-center justify-between py-4 text-left text-[18px] transition-colors' + svcColor + '" type="button">' +
            "<span>Services</span>" +
            circleMinusSVG +
          "</button>" +
          '<div class="mm-sb-panel">' +
            '<div class="pb-4 pl-2">';

        for (var j = 0; j < SERVICES.length; j++) {
          var s = SERVICES[j];
          var borderClass = j < SERVICES.length - 1 ? " border-b border-[#EDF2F8]" : "";
          html +=
            '<a href="' + s.href + '" class="flex items-center justify-between gap-3 py-3.5 no-underline' + borderClass + '">' +
              '<div class="min-w-0">' +
                '<p class="text-[14px] font-semibold leading-[100%]! text-[#1B2125]">' + s.title + "</p>" +
                '<p class="mt-1 text-[12px] leading-[1.5] text-[#647E9B]">' + s.desc + "</p>" +
              "</div>" +
              svcChevronRight +
            "</a>";
        }
        html += "</div></div></div>";
      } else {
        var linkActive = item.active ? " font-semibold text-[#2D39F2]" : "";
        html +=
          '<a href="' + item.href + '" class="mm-sb-link block border-b border-[#EDF2F8] py-4 text-[18px] font-medium text-[#1B2125] no-underline transition-colors hover:text-[#2D39F2]' + linkActive + '">' +
            item.text +
          "</a>";
      }
    }

    html += "</nav>";
    html +=
      '<div class="shrink-0 px-6 pb-6">' +
      '<a href="' + (contactHref || "./contactus.html") + '" class="block rounded-full bg-[#2D39F2] px-4 py-3.5 text-center text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#1B19C7]">' +
        "Contact Us" +
      "</a></div>";
    return html;
  }

  // ── Init ─────────────────────────────────────────────────────

  function init() {
    var header = document.querySelector("header");
    if (!header) return;

    var navUl = header.querySelector("ul");
    if (!navUl) return;

    var navLis = navUl.querySelectorAll("li");
    var servicesLi = null;
    var servicesLink = null;

    for (var i = 0; i < navLis.length; i++) {
      var el = navLis[i].querySelector("a") || navLis[i].firstElementChild;
      if (el && el.textContent.trim() === "Services") {
        servicesLi = navLis[i];
        servicesLink = el;
        break;
      }
    }
    if (!servicesLi) return;

    // ── Mega-menu dropdown ─────────────────────────────────────

    servicesLi.classList.add("mm-has-mega");

    var dropdown = document.createElement("div");
    dropdown.className = "mm-dropdown fixed z-[200] w-[604px] max-w-[calc(100vw-40px)] rounded-lg bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.10),0_4px_16px_rgba(0,0,0,0.05)]";
    dropdown.innerHTML = buildDropdownHTML();
    document.body.appendChild(dropdown);

    var hideTimer;

    function positionDropdown() {
      var liRect = servicesLi.getBoundingClientRect();
      var linkRect = servicesLink.getBoundingClientRect();
      var dropW = Math.min(604, window.innerWidth - 40);
      var topPos = liRect.bottom + 22;

      dropdown.style.top = topPos + "px";

      if (liRect.left + dropW > window.innerWidth - 20) {
        var rightEdge = window.innerWidth - liRect.right;
        dropdown.style.left = "auto";
        dropdown.style.right = Math.max(20, rightEdge) + "px";
        dropdown.style.setProperty("--mm-arrow-left", "auto");
        dropdown.style.setProperty("--mm-arrow-right", (liRect.right - linkRect.left - linkRect.width / 2 - 5 + Math.max(20, rightEdge) - rightEdge) + "px");
      } else {
        dropdown.style.left = Math.max(20, liRect.left) + "px";
        dropdown.style.right = "auto";
        var arrowLeft = linkRect.left - Math.max(20, liRect.left) + linkRect.width / 2 - 5;
        dropdown.style.setProperty("--mm-arrow-left", Math.max(16, arrowLeft) + "px");
        dropdown.style.setProperty("--mm-arrow-right", "auto");
      }
    }

    function show() {
      clearTimeout(hideTimer);
      positionDropdown();
      dropdown.classList.add("mm-visible");
    }

    function hide() {
      hideTimer = setTimeout(function () {
        dropdown.classList.remove("mm-visible");
      }, 100);
    }

    servicesLi.addEventListener("mouseenter", show);
    servicesLi.addEventListener("mouseleave", hide);
    dropdown.addEventListener("mouseenter", show);
    dropdown.addEventListener("mouseleave", hide);

    servicesLink.addEventListener("click", function (e) {
      if (window.matchMedia("(hover: none)").matches) {
        e.preventDefault();
        dropdown.classList.toggle("mm-visible");
      }
    });

    window.addEventListener("scroll", function () {
      dropdown.classList.remove("mm-visible");
    }, { passive: true });

    // ── Mobile sidebar ─────────────────────────────────────────

    var overlay = null;
    var sidebar = null;

    function closeSidebar() {
      if (sidebar) sidebar.classList.remove("mm-open");
      if (overlay) overlay.classList.remove("mm-open");
      document.body.classList.remove("mm-no-scroll");
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        dropdown.classList.remove("mm-visible");
        closeSidebar();
      }
    });

    document.addEventListener("click", function (e) {
      if (!servicesLi.contains(e.target)) {
        dropdown.classList.remove("mm-visible");
      }
    });

    var hamburger = header.querySelector('button[aria-label="Open menu"]');
    if (!hamburger) return;

    var pagePath = location.pathname.split("/").pop().split("?")[0].split("#")[0].toLowerCase();
    var darkBurgerPages = ["casestudies.html", "casestudy.html", "about.html", "contactus.html"];
    if (darkBurgerPages.indexOf(pagePath) !== -1) {
      hamburger.setAttribute("style", "align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:#1B2125;border:none;padding:0;cursor:pointer;");
      hamburger.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h12" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>';
    }

    // Collect nav items
    var navItems = [];
    var contactHref = "./contactus.html";

    var headerLinks = header.querySelectorAll("nav > a");
    for (var k = 0; k < headerLinks.length; k++) {
      if (headerLinks[k].textContent.trim() === "Contact Us") {
        var h = headerLinks[k].getAttribute("href");
        if (h && h !== "#") contactHref = h;
        break;
      }
    }

    for (var li = 0; li < navLis.length; li++) {
      var link = navLis[li].querySelector("a") || navLis[li].firstElementChild;
      if (!link) continue;

      var text = link.textContent.trim();
      var isActive =
        link.classList.contains("font-semibold") ||
        link.classList.contains("text-[#2D39F2]");

      if (
        !isActive &&
        link.classList.contains("text-white") &&
        !link.classList.contains("text-white/70") &&
        !link.classList.contains("text-white/60")
      ) {
        if (text !== "Home") isActive = true;
      }

      if (text === "Services") {
        var svcActive = isActive ||
          (link.className.indexOf("border-b") > -1 && link.className.indexOf("border-b-") === -1);
        navItems.push({ isServices: true, active: svcActive });
      } else {
        navItems.push({ href: link.getAttribute("href") || "#", text: text, active: isActive });
      }
    }

    // Overlay
    overlay = document.createElement("div");
    overlay.className = "mm-overlay";
    document.body.appendChild(overlay);

    // Sidebar
    sidebar = document.createElement("div");
    sidebar.className = "mm-sidebar";
    sidebar.innerHTML = buildSidebarHTML(navItems, contactHref);
    document.body.appendChild(sidebar);

    // Wire events
    var closeBtn = sidebar.querySelector(".mm-sb-close");
    var svcToggle = sidebar.querySelector(".mm-sb-svc-toggle");
    var svcPanel = sidebar.querySelector(".mm-sb-panel");

    function openSidebar() {
      sidebar.classList.add("mm-open");
      overlay.classList.add("mm-open");
      document.body.classList.add("mm-no-scroll");
    }

    hamburger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      openSidebar();
    });

    if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);

    if (svcToggle && svcPanel) {
      svcToggle.addEventListener("click", function () {
        var open = svcPanel.classList.toggle("mm-sb-expanded");
        svcToggle.classList.toggle("mm-sb-expanded", open);
      });
    }

    sidebar.querySelectorAll(".mm-sb-link, a[href]").forEach(function (el) {
      el.addEventListener("click", closeSidebar);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
