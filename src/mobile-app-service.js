// Mobile App Service page — footer + testimonial behavior (mirrors main.js for these features)

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

(function () {
  const yearEl = document.getElementById("copyrightYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

(function () {
  document.querySelectorAll("[data-contact-toggle]").forEach((openBtn) => {
    const sel = openBtn.getAttribute("data-contact-toggle");
    if (!sel) return;
    const form = document.querySelector(sel);
    if (!form) return;

    let isOpen = false;
    openBtn.addEventListener("click", () => {
      isOpen = !isOpen;
      form.classList.toggle("hidden", !isOpen);
      openBtn.textContent = isOpen ? "Close Form" : "Schedule a Call";
    });
  });
})();

(function () {
  function initDotsSlider(viewportId, trackId, dotsWrapId, dotClass) {
    const viewport = document.getElementById(viewportId);
    const track = document.getElementById(trackId);
    const dotsWrap = document.getElementById(dotsWrapId);
    if (!viewport || !track || !dotsWrap) return;

    const slides = Array.from(track.children);
    const dots = Array.from(dotsWrap.querySelectorAll(`.${dotClass}`));
    if (!slides.length || !dots.length) return;

    let current = 0;
    let slideWidth = 0;
    let startX = 0;
    let deltaX = 0;
    let isPointerDown = false;

    function setDotState() {
      dots.forEach((dot, i) => {
        dot.classList.toggle("bg-[#2D39F2]", i === current);
        dot.classList.toggle("bg-[#C9D2DF]", i !== current);
      });
    }

    function goTo(index, animate = true) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      current = index;
      track.style.transitionDuration = animate ? "" : "0ms";
      const offset = Math.round(current * slideWidth);
      track.style.transform = `translate3d(-${offset}px, 0, 0)`;
      setDotState();
      if (!animate) {
        requestAnimationFrame(() => {
          track.style.transitionDuration = "";
        });
      }
    }

    function syncWidths() {
      slideWidth = viewport.clientWidth;
      if (!slideWidth) return;
      track.style.width = `${Math.round(slideWidth * slides.length)}px`;
      slides.forEach((slide) => {
        const widthPx = `${Math.round(slideWidth)}px`;
        slide.style.flex = `0 0 ${widthPx}`;
        slide.style.minWidth = widthPx;
        slide.style.maxWidth = widthPx;
        slide.style.width = widthPx;
      });
      goTo(current, false);
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        goTo(parseInt(dot.dataset.slide || "0", 10));
      });
    });

    viewport.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        deltaX = 0;
      },
      { passive: true }
    );

    viewport.addEventListener(
      "touchmove",
      (e) => {
        deltaX = e.touches[0].clientX - startX;
      },
      { passive: true }
    );

    viewport.addEventListener("touchend", () => {
      if (Math.abs(deltaX) > 45) {
        if (deltaX < 0) goTo(current + 1);
        else goTo(current - 1);
      }
    });

    viewport.addEventListener("pointerdown", (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      isPointerDown = true;
      startX = e.clientX;
      deltaX = 0;
      viewport.setPointerCapture(e.pointerId);
    });

    viewport.addEventListener("pointermove", (e) => {
      if (!isPointerDown) return;
      deltaX = e.clientX - startX;
    });

    function endPointerDrag() {
      if (!isPointerDown) return;
      isPointerDown = false;
      if (Math.abs(deltaX) > 55) {
        if (deltaX < 0) goTo(current + 1);
        else goTo(current - 1);
      }
    }

    viewport.addEventListener("pointerup", endPointerDrag);
    viewport.addEventListener("pointercancel", endPointerDrag);
    viewport.addEventListener("pointerleave", endPointerDrag);

    window.addEventListener("resize", syncWidths);
    syncWidths();
    goTo(0, false);
  }

  initDotsSlider(
    "testimonialsDesktopViewport",
    "testimonialsDesktopTrack",
    "testimonialsDesktopDots",
    "testi-desktop-dot"
  );
  initDotsSlider(
    "testimonialsMobileViewport",
    "testimonialsMobileTrack",
    "testimonialsMobileDots",
    "testi-mobile-dot"
  );
})();

// ─── Green portfolio slider (data-driven: N slides ↔ N dots, API-ready) ───────
(function () {
  const section = document.getElementById("portfolioGreenSection");
  const viewport = document.getElementById("portfolioGreenViewport");
  const track = document.getElementById("portfolioGreenTrack");
  const dotsMobile = document.getElementById("portfolioGreenDotsMobile");
  const dotsDesktop = document.getElementById("portfolioGreenDotsDesktop");
  if (!section || !viewport || !track || !dotsMobile || !dotsDesktop) return;

  const TRANSITION =
    "transform 0.55s cubic-bezier(0.22, 1, 0.32, 1)";

  const DOT_BTN_CLASS =
    "portfolio-green-dot group flex h-7 w-7 cursor-pointer touch-manipulation select-none items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80";

  const DOT_INNER_HTML =
    '<span class="hidden h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white group-[.is-active]:flex"><span class="h-2 w-2 rounded-full bg-white"></span></span>' +
    '<span class="h-2 w-2 rounded-full bg-white/45 group-[.is-active]:hidden"></span>';

  /** Default items; replace via OccamodePortfolioGreen.setItems() after API fetch */
  const DEFAULT_PORTFOLIO_ITEMS = [
    {
      tags: ["Health", "Startup", "Food ordering"],
      title: "A fresh take on online grocery shopping",
      description:
        "Finsweet has been a wonderful partner to work with. I have been a customer now for the past few months now and I have had nothing but positive experiences!",
      imageSrc: "./images/groceryshop.png",
      imageAlt: "Grocery shopping app preview",
      ctaHref: "#",
      ctaLabel: "View more →",
    },
    {
      tags: ["EV", "Retail", "Mobile"],
      title: "Smarter sessions for drivers on the go",
      description:
        "Real-time station data, saved vehicles, and a checkout flow built for speed—so every charge feels effortless from the first tap to the receipt.",
      imageSrc: "./images/groceryshop.png",
      imageAlt: "Mobile app preview",
      ctaHref: "#",
      ctaLabel: "View more →",
    },
    {
      tags: ["Wellness", "UX", "iOS"],
      title: "Care that fits in your pocket",
      description:
        "Guided plans, gentle reminders, and a calm interface help members stay consistent—without overwhelming their day.",
      imageSrc: "./images/groceryshop.png",
      imageAlt: "Mobile app preview",
      ctaHref: "#",
      ctaLabel: "View more →",
    },
    {
      tags: ["FinTech", "Security", "Scale"],
      title: "Banking-grade mobile experiences",
      description:
        "Biometrics, device binding, and encrypted channels by default—so your users trust every transfer and balance check.",
      imageSrc: "./images/groceryshop.png",
      imageAlt: "Mobile app preview",
      ctaHref: "#",
      ctaLabel: "View more →",
    },
  ];

  function normalizePortfolioItem(raw) {
    let tags = [];
    if (Array.isArray(raw?.tags)) tags = raw.tags.map((t) => String(t));
    else if (raw?.tags != null) tags = [String(raw.tags)];
    return {
      tags,
      title: String(raw?.title ?? ""),
      description: String(raw?.description ?? ""),
      imageSrc: String(
        raw?.imageSrc ?? raw?.image ?? raw?.image_url ?? "./images/groceryshop.png"
      ),
      imageAlt: String(raw?.imageAlt ?? raw?.image_alt ?? ""),
      ctaHref: String(raw?.ctaHref ?? raw?.href ?? raw?.url ?? "#"),
      ctaLabel: String(raw?.ctaLabel ?? raw?.cta_label ?? "View more →"),
    };
  }

  function getSlides() {
    return Array.from(track.querySelectorAll(".portfolio-green-slide"));
  }

  function getDots() {
    return [
      ...dotsMobile.querySelectorAll(".portfolio-green-dot"),
      ...dotsDesktop.querySelectorAll(".portfolio-green-dot"),
    ];
  }

  function buildDotButton(index, total) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.dataset.slide = String(index);
    btn.className = DOT_BTN_CLASS;
    btn.setAttribute("aria-label", `Slide ${index + 1} of ${total}`);
    btn.innerHTML = DOT_INNER_HTML;
    return btn;
  }

  function buildSlideElement(item, index) {
    const slide = document.createElement("div");
    slide.className = "portfolio-green-slide h-full w-full shrink-0";
    const grid = document.createElement("div");
    grid.className =
      "grid h-full min-h-0 w-full grid-rows-[auto_minmax(0,1fr)] bg-[#07A077] lg:grid-cols-2 lg:grid-rows-1 lg:items-center lg:gap-8 lg:px-10 lg:py-6";

    const imgCol = document.createElement("div");
    imgCol.className =
      "flex shrink-0 justify-center px-6 pt-6 pb-2 lg:px-4 lg:py-0";
    const imgWrap = document.createElement("div");
    imgWrap.className =
      "aspect-[6/10] w-[min(68vw,268px)] max-h-[38dvh] lg:max-h-[min(72vh,540px)] lg:w-[min(100%,380px)]";
    const img = document.createElement("img");
    img.src = item.imageSrc;
    img.alt = item.imageAlt;
    img.className =
      "h-full w-full object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.32)]";
    img.loading = index === 0 ? "eager" : "lazy";
    imgWrap.appendChild(img);
    imgCol.appendChild(imgWrap);

    const textCol = document.createElement("div");
    textCol.className =
      "flex min-h-0 min-w-0 flex-1 flex-col justify-center px-6 pb-16 text-center lg:px-4 lg:pr-14 lg:pb-8 lg:text-left";

    const tagsRow = document.createElement("div");
    tagsRow.className = "flex flex-wrap justify-center gap-2 lg:justify-start";
    item.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className =
        "rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium text-white md:text-xs";
      span.textContent = tag;
      tagsRow.appendChild(span);
    });

    const h3 = document.createElement("h3");
    h3.className =
      "mt-4 text-[22px] font-bold leading-[1.2] tracking-[-0.02em] md:text-[26px] lg:mt-5 lg:text-[34px] lg:leading-[1.15]";
    h3.textContent = item.title;

    const p = document.createElement("p");
    p.className =
      "mt-3 line-clamp-3 text-[13px] leading-relaxed text-white/90 md:text-[14px] lg:line-clamp-none lg:text-[15px] lg:leading-7";
    p.textContent = item.description;

    const a = document.createElement("a");
    a.href = item.ctaHref;
    a.className =
      "mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white underline underline-offset-4 lg:justify-start";
    a.textContent = item.ctaLabel;

    textCol.append(tagsRow, h3, p, a);
    grid.append(imgCol, textCol);
    slide.appendChild(grid);
    return slide;
  }

  function renderPortfolioItems(items) {
    const normalized = (items || []).map(normalizePortfolioItem);
    track.innerHTML = "";
    dotsMobile.innerHTML = "";
    dotsDesktop.innerHTML = "";

    if (!normalized.length) {
      section.classList.add("hidden");
      current = 0;
      return 0;
    }
    section.classList.remove("hidden");

    normalized.forEach((item, index) => {
      track.appendChild(buildSlideElement(item, index));
    });

    const n = normalized.length;
    const showDots = n > 1;
    if (!showDots) {
      dotsMobile.setAttribute("hidden", "");
      dotsDesktop.setAttribute("hidden", "");
    } else {
      dotsMobile.removeAttribute("hidden");
      dotsDesktop.removeAttribute("hidden");
      for (let i = 0; i < n; i++) {
        dotsMobile.appendChild(buildDotButton(i, n));
        dotsDesktop.appendChild(buildDotButton(i, n));
      }
    }

    current = 0;
    return n;
  }

  let current = 0;
  let slideWidth = 0;
  let startX = 0;
  let deltaX = 0;
  let isPointerDown = false;
  let touchFromDot = false;

  function targetIsDot(el) {
    return !!(el && el.closest && el.closest(".portfolio-green-dot"));
  }

  function setDotState() {
    getDots().forEach((dot) => {
      const idx = parseInt(dot.getAttribute("data-slide") || "0", 10);
      const active = idx === current;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });
  }

  function goTo(index, animate = true) {
    const slides = getSlides();
    const n = slides.length;
    if (n === 0) return;
    if (index < 0) index = n - 1;
    if (index >= n) index = 0;
    if (index === current && animate) {
      setDotState();
      return;
    }
    current = index;
    track.style.transition = animate ? TRANSITION : "none";
    const offset = Math.round(current * slideWidth);
    track.style.transform = `translate3d(-${offset}px, 0, 0)`;
    setDotState();
    if (!animate) {
      requestAnimationFrame(() => {
        track.style.transition = TRANSITION;
      });
    }
  }

  function syncDimensions() {
    const slides = getSlides();
    slideWidth = viewport.clientWidth;
    const slideHeight = viewport.clientHeight;
    if (!slideWidth || !slideHeight || !slides.length) return;
    track.style.width = `${Math.round(slideWidth * slides.length)}px`;
    track.style.height = `${Math.round(slideHeight)}px`;
    slides.forEach((slide) => {
      const w = `${Math.round(slideWidth)}px`;
      const h = `${Math.round(slideHeight)}px`;
      slide.style.flex = `0 0 ${w}`;
      slide.style.minWidth = w;
      slide.style.maxWidth = w;
      slide.style.width = w;
      slide.style.height = h;
      slide.style.minHeight = h;
    });
    goTo(current, false);
  }

  function onDotsClick(e) {
    const btn = e.target.closest(".portfolio-green-dot");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const i = parseInt(btn.getAttribute("data-slide") || "0", 10);
    if (!Number.isNaN(i)) goTo(i, true);
  }
  dotsMobile.addEventListener("click", onDotsClick, true);
  dotsDesktop.addEventListener("click", onDotsClick, true);

  viewport.addEventListener(
    "touchstart",
    (e) => {
      touchFromDot = targetIsDot(e.target);
      if (touchFromDot) return;
      startX = e.touches[0].clientX;
      deltaX = 0;
    },
    { passive: true }
  );

  viewport.addEventListener(
    "touchmove",
    (e) => {
      if (touchFromDot) return;
      deltaX = e.touches[0].clientX - startX;
    },
    { passive: true }
  );

  viewport.addEventListener("touchend", () => {
    if (touchFromDot) {
      touchFromDot = false;
      return;
    }
    if (Math.abs(deltaX) > 45) {
      if (deltaX < 0) goTo(current + 1);
      else goTo(current - 1);
    }
  });

  viewport.addEventListener("pointerdown", (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    if (targetIsDot(e.target)) return;
    isPointerDown = true;
    startX = e.clientX;
    deltaX = 0;
    try {
      viewport.setPointerCapture(e.pointerId);
    } catch (_) {
      /* ignore */
    }
  });

  viewport.addEventListener("pointermove", (e) => {
    if (!isPointerDown) return;
    deltaX = e.clientX - startX;
  });

  function endPointerDrag() {
    if (!isPointerDown) return;
    isPointerDown = false;
    if (Math.abs(deltaX) > 55) {
      if (deltaX < 0) goTo(current + 1);
      else goTo(current - 1);
    }
  }

  viewport.addEventListener("pointerup", endPointerDrag);
  viewport.addEventListener("pointercancel", endPointerDrag);
  viewport.addEventListener("pointerleave", endPointerDrag);

  window.addEventListener("resize", syncDimensions);
  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(() => syncDimensions());
    ro.observe(viewport);
  }

  function tryParseJsonScript() {
    const el = document.getElementById("portfolioGreenData");
    if (!el || !el.textContent) return null;
    try {
      const data = JSON.parse(el.textContent.trim());
      return Array.isArray(data) ? data : null;
    } catch (_) {
      return null;
    }
  }

  let lastItems = DEFAULT_PORTFOLIO_ITEMS;

  function mountFromItems(items) {
    lastItems = items;
    renderPortfolioItems(items);
    requestAnimationFrame(() => {
      syncDimensions();
      goTo(0, false);
    });
  }

  mountFromItems(tryParseJsonScript() || DEFAULT_PORTFOLIO_ITEMS);

  window.OccamodePortfolioGreen = {
    /** Replace all slides + dots. Pass an array of items (see normalizePortfolioItem). */
    setItems(items) {
      mountFromItems(Array.isArray(items) ? items : []);
    },
    /** Current item list (last passed to setItems or default). */
    getItems() {
      return lastItems.slice();
    },
    /** Map API rows to slider items (customize field names in your API layer). */
    mapFromApi(row) {
      return normalizePortfolioItem(row);
    },
    goToSlide(index, animate = true) {
      goTo(index, animate);
    },
  };
})();

// ─── Mobile App: roadmap pinned slider + progress checkpoints ───────
(function () {
  const section = document.getElementById("webRoadmapSection");
  const progressWrap = document.getElementById("roadmapProgressWrap");
  const progressBgHost = document.getElementById("roadmapProgressSegmentsBg");
  const progressFillHost = document.getElementById(
    "roadmapProgressSegmentsFill"
  );
  const viewport = document.getElementById("roadmapViewport");
  const track = document.getElementById("roadmapTrack");

  if (
    !section ||
    !progressWrap ||
    !progressBgHost ||
    !progressFillHost ||
    !viewport ||
    !track
  )
    return;

  const checkpoints = Array.from(
    section.querySelectorAll("[data-roadmap-checkpoint]")
  );
  let roadmapTrigger = null;
  let lineStart = 0;
  let lineWidth = 0;
  let lastProgress = 0;
  let segmentGeometry = [];
  let fillSegments = [];

  function layoutProgressGeometry() {
    if (checkpoints.length < 2) return;
    const wrapRect = progressWrap.getBoundingClientRect();
    const checkpointRects = checkpoints.map((checkpoint) =>
      checkpoint.getBoundingClientRect()
    );

    const centers = checkpointRects.map(
      (rect) => rect.left - wrapRect.left + rect.width / 2
    );
    const radius = checkpointRects[0]?.width ? checkpointRects[0].width / 2 : 16;

    progressBgHost.innerHTML = "";
    progressFillHost.innerHTML = "";
    segmentGeometry = [];
    fillSegments = [];

    for (let i = 0; i < centers.length - 1; i += 1) {
      const start = centers[i] + radius;
      const end = centers[i + 1] - radius;
      const width = Math.max(0, end - start);

      const bgSeg = document.createElement("div");
      bgSeg.className =
        "absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#FFA28B]/25";
      bgSeg.style.left = `${start}px`;
      bgSeg.style.width = `${width}px`;
      progressBgHost.appendChild(bgSeg);

      const fillSeg = document.createElement("div");
      fillSeg.className =
        "absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#FFA28B]/50";
      fillSeg.style.left = `${start}px`;
      fillSeg.style.width = "0px";
      progressFillHost.appendChild(fillSeg);

      segmentGeometry.push({ width });
      fillSegments.push(fillSeg);
    }

    const firstRect = checkpointRects[0];
    const lastRect = checkpointRects[checkpointRects.length - 1];
    lineStart = firstRect.left - wrapRect.left + firstRect.width / 2 + radius;
    const lineEnd = lastRect.left - wrapRect.left + lastRect.width / 2 - radius;
    lineWidth = Math.max(0, lineEnd - lineStart);
  }

  function setProgress(progress) {
    const p = Math.max(0, Math.min(progress, 1));
    lastProgress = p;
    const totalSegments = Math.max(segmentGeometry.length, 1);
    const progressInSegments = p * totalSegments;

    fillSegments.forEach((segment, index) => {
      const segmentProgress = Math.max(
        0,
        Math.min(1, progressInSegments - index)
      );
      const segmentWidth = segmentGeometry[index]?.width || 0;
      segment.style.width = `${segmentWidth * segmentProgress}px`;
    });

    const lastIndex = Math.max(checkpoints.length - 1, 1);
    checkpoints.forEach((checkpoint, index) => {
      const threshold = index / lastIndex;
      const isDone = p >= threshold - 0.001;

      checkpoint.classList.toggle("opacity-100", isDone);
      checkpoint.classList.toggle("opacity-40", !isDone);
      checkpoint.classList.toggle("scale-[1.03]", isDone);
      checkpoint.classList.toggle("scale-100", !isDone);
    });
  }

  checkpoints.forEach((checkpoint, index) => {
    checkpoint.addEventListener("click", () => {
      const ratio = checkpoints.length > 1 ? index / (checkpoints.length - 1) : 0;
      if (roadmapTrigger) {
        const targetY =
          roadmapTrigger.start + ratio * (roadmapTrigger.end - roadmapTrigger.start);
        window.scrollTo({ top: targetY, behavior: "smooth" });
      } else {
        const maxScroll = track.scrollWidth - viewport.clientWidth;
        if (maxScroll > 0) {
          const targetLeft = maxScroll * ratio;
          viewport.scrollTo({ left: targetLeft, behavior: "smooth" });
        }
      }
      setProgress(ratio);
    });
  });

  if (!(window.gsap && window.ScrollTrigger)) {
    layoutProgressGeometry();
    setProgress(0);
    return;
  }

  const getMaxX = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

  const tween = gsap.to(track, {
    x: () => -getMaxX(),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${getMaxX() + 700}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onUpdate: (self) => setProgress(self.progress),
      onRefresh: () => {
        layoutProgressGeometry();
        setProgress(lastProgress);
      },
      onRefreshInit: () => {
        track.style.transform = "translate3d(0px, 0px, 0px)";
      },
    },
  });

  roadmapTrigger = tween.scrollTrigger || null;

  window.addEventListener("resize", () => {
    layoutProgressGeometry();
    setProgress(lastProgress);
  });

  layoutProgressGeometry();
  setProgress(0);
})();

// ─── Roadmap: phase detail modal (plus buttons; page uses this file, not main.js) ─
(function () {
  if (!document.querySelector("[data-roadmap-detail-open]")) return;

  let modal = document.getElementById("roadmapDetailModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "roadmapDetailModal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "roadmapDetailModalTitle");
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML =
      '<div class="roadmap-detail-modal__backdrop" data-roadmap-detail-backdrop tabindex="-1"></div>' +
      '<div class="roadmap-detail-modal__panel">' +
      '<button type="button" class="roadmap-detail-modal__close" data-roadmap-detail-close aria-label="Close dialog">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
      "</button>" +
      '<p class="roadmap-detail-modal__num">03</p>' +
      '<h2 id="roadmapDetailModalTitle" class="roadmap-detail-modal__title">Research &amp; Define</h2>' +
      '<ul class="roadmap-detail-modal__list">' +
      "<li><strong>Market Research:</strong> We work together with our client to understand the challenges and goals of delivery.</li>" +
      "<li><strong>Competitor Analysis:</strong> It gives us a holistic view of the project so we can brainstorm and co-create a solution.</li>" +
      "<li><strong>Develop User Personas:</strong> It gives us a holistic view of the project so we can brainstorm and co-create a solution.</li>" +
      "<li><strong>User-flow:</strong> We work together with our client to understand the challenges and goal.</li>" +
      "<li><strong>User &amp; Stakeholder Research:</strong> Working this way ensures alignment across teams and clear priorities for the product roadmap.</li>" +
      "</ul>" +
      "</div>";
    document.body.appendChild(modal);
  }

  let previousActive = null;

  function openModal() {
    previousActive = document.activeElement;
    modal.classList.add("roadmap-detail-modal--open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const closeBtn = modal.querySelector("[data-roadmap-detail-close]");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("roadmap-detail-modal--open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (previousActive && typeof previousActive.focus === "function") {
      try {
        previousActive.focus();
      } catch (_) {
        /* ignore */
      }
    }
    previousActive = null;
  }

  document.addEventListener("click", function (e) {
    const opener = e.target.closest("[data-roadmap-detail-open]");
    if (opener) {
      e.preventDefault();
      e.stopPropagation();
      openModal();
      return;
    }
    if (e.target.closest("[data-roadmap-detail-close]")) {
      e.preventDefault();
      closeModal();
      return;
    }
    const backdrop = e.target.closest("[data-roadmap-detail-backdrop]");
    if (backdrop && modal.contains(backdrop)) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      modal.classList.contains("roadmap-detail-modal--open")
    ) {
      closeModal();
    }
  });
})();

// ─── Mobile App: technology expertise tabs (same behavior as main.js) ─
(function () {
  const techTileImgSrc = "./images/nodeIc.png";
  const tabsWrap = document.getElementById("techStackTabs");
  const grid = document.getElementById("techStackGrid");
  if (!tabsWrap || !grid) return;

  const techByDepartment = {
    frontend: [
      "Slack",
      "Gradle",
      "Angular",
      "React",
      "Vue.js",
      "Express Js",
      "Selenium",
      "Kubernetes",
      "Node.js",
      "Python",
      ".NET Core",
      "Java",
      "Shopify",
      "Jenkins",
      "AWS",
      "Azure",
      "Google Cloud",
      "CI/CD",
      "Ansible",
      "Bitbucket",
      "Docker",
      "GitHub",
    ],
    backend: [
      "Node.js",
      "ExpressJS",
      "NestJS",
      "Django",
      "FastAPI",
      "Spring",
      ".NET Core",
      "PostgreSQL",
      "Redis",
      "MongoDB",
    ],
    cloud: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Kubernetes",
      "Docker",
      "Terraform",
      "Cloudflare",
      "Vercel",
    ],
    devops: [
      "Jenkins",
      "GitHub",
      "GitLab",
      "Bitbucket",
      "Ansible",
      "Prometheus",
      "Grafana",
      "ArgoCD",
      "Helm",
      "SonarQube",
      "ELK Stack",
      "CI/CD",
      "Datadog",
      "New Relic",
    ],
  };

  const tabs = Array.from(tabsWrap.querySelectorAll("[data-tech-tab]"));
  if (!tabs.length) return;
  let activeTabKey = "frontend";

  function renderGrid(key) {
    const items = techByDepartment[key] || [];
    const cols = window.matchMedia("(min-width: 768px)").matches ? 6 : 3;
    grid.innerHTML = "";

    items.forEach((name) => {
      const cell = document.createElement("div");
      cell.className =
        "box-border flex h-[100px] w-full min-w-0 items-center justify-center border-r border-b border-[#E6E9EF]";
      const img = document.createElement("img");
      img.src = techTileImgSrc;
      img.alt = name;
      img.className =
        "min-h-0 min-w-0 max-h-full max-w-full object-contain object-center";
      cell.appendChild(img);
      grid.appendChild(cell);
    });

    const remainder = items.length % cols;
    const ctaSpan = remainder === 0 ? cols : cols - remainder;
    const cta = document.createElement("a");
    cta.href = "#";
    cta.textContent = "Build with us";
    cta.style.gridColumn = `span ${ctaSpan} / span ${ctaSpan}`;
    cta.className =
      "box-border flex h-[100px] min-w-0 items-center justify-center border-r border-b border-[#E6E9EF] text-[14px] font-bold text-[#3D4BFF] transition hover:text-[#2D39F2] md:text-[18px]";
    grid.appendChild(cta);
  }

  function setActiveTab(key) {
    activeTabKey = key;
    tabs.forEach((tab) => {
      const isActive = tab.dataset.techTab === key;
      tab.classList.toggle("text-[#3D4BFF]", isActive);
      tab.classList.toggle("text-[#171C21]", !isActive);
      tab.classList.toggle("border-b-[#3D4BFF]", isActive);
      tab.classList.toggle("border-b-transparent", !isActive);
      tab.classList.toggle("md:border-l-[#3D4BFF]", isActive);
      tab.classList.toggle("md:border-l-transparent", !isActive);
    });
    renderGrid(key);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setActiveTab(tab.dataset.techTab || "frontend");
    });
  });

  window.addEventListener("resize", () => {
    renderGrid(activeTabKey);
  });

  setActiveTab("frontend");
})();

// ─── Mobile App: services accordion (same behavior as webServicesAccordion) ─
(function () {
  const accordion = document.getElementById("mobileServicesAccordion");
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll("[data-web-acc-item]"));
  if (!items.length) return;

  let activeIndex = 0;

  function setOpen(index) {
    items.forEach((item, i) => {
      const trigger = item.querySelector("[data-web-acc-trigger]");
      const panel = item.querySelector("[data-web-acc-panel]");
      const title = item.querySelector("[data-web-acc-title]");
      const openIcon = item.querySelector("[data-icon-open]");
      const closedIcon = item.querySelector("[data-icon-closed]");
      const isOpen = i === index;

      if (trigger) trigger.setAttribute("aria-expanded", String(isOpen));
      if (panel) panel.classList.toggle("open", isOpen);
      if (title) {
        title.classList.toggle("text-[#444CFC]", isOpen);
        title.classList.toggle("text-[#232A31]", !isOpen);
      }
      if (openIcon) openIcon.classList.toggle("hidden", !isOpen);
      if (closedIcon) closedIcon.classList.toggle("hidden", isOpen);
    });

    activeIndex = index;
  }

  items.forEach((item, index) => {
    const trigger = item.querySelector("[data-web-acc-trigger]");
    if (!trigger) return;
    trigger.addEventListener("click", () => {
      if (activeIndex === index) return;
      setOpen(index);
    });
  });

  setOpen(activeIndex);
})();
