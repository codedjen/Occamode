if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Reusable: Mobile Accordion with Auto-Progress ──────────────────
function initAccordion(accordionId, duration) {
  const PROGRESS_DURATION = duration || 5000;
  const accordion = document.getElementById(accordionId);
  if (!accordion) return;

  const items = accordion.querySelectorAll(".accordion-item");
  if (!items.length) return;

  let activeIndex = -1;
  let progressTimer = null;
  let isPaused = false;

  function openItem(index) {
    items.forEach((item, i) => {
      const body = item.querySelector(".accordion-body");
      const bar = item.querySelector(".accordion-progress");

      bar.classList.remove("running");
      bar.style.width = "0";
      void bar.offsetWidth;

      if (i === index) {
        body.classList.add("open");
        bar.style.setProperty("--progress-duration", PROGRESS_DURATION + "ms");
        bar.classList.add("running");
      } else {
        body.classList.remove("open");
      }
    });

    activeIndex = index;
  }

  function nextItem() {
    const next = (activeIndex + 1) % items.length;
    openItem(next);
  }

  function startCycle() {
    stopCycle();
    progressTimer = setInterval(() => {
      if (!isPaused) nextItem();
    }, PROGRESS_DURATION);
  }

  function stopCycle() {
    if (progressTimer) {
      clearInterval(progressTimer);
      progressTimer = null;
    }
  }

  items.forEach((item) => {
    item.querySelector(".accordion-trigger").addEventListener("click", () => {
      const idx = parseInt(item.dataset.index, 10);
      openItem(idx);
      startCycle();
    });
  });

  accordion.addEventListener("pointerenter", () => {
    isPaused = true;
  });
  accordion.addEventListener("pointerleave", () => {
    isPaused = false;
  });

  const mql = window.matchMedia("(max-width: 767px)");

  function handleViewport(e) {
    if (e.matches) {
      openItem(0);
      startCycle();
    } else {
      stopCycle();
      items.forEach((item) => {
        item.querySelector(".accordion-body").classList.remove("open");
        const bar = item.querySelector(".accordion-progress");
        bar.classList.remove("running");
        bar.style.width = "0";
      });
      activeIndex = -1;
    }
  }

  mql.addEventListener("change", handleViewport);
  handleViewport(mql);
}

// ─── Accordion + progress: auto-cycle on all viewports (e.g. DevOps) ──
function initAccordionCycleAlways(accordionId, duration) {
  const PROGRESS_DURATION = duration || 5000;
  const accordion = document.getElementById(accordionId);
  if (!accordion) return;

  const items = accordion.querySelectorAll(".accordion-item");
  if (!items.length) return;

  let activeIndex = -1;
  let progressTimer = null;
  let isPaused = false;

  function openItem(index) {
    items.forEach((item, i) => {
      const body = item.querySelector(".accordion-body");
      const bar = item.querySelector(".accordion-progress");
      if (!body || !bar) return;

      bar.classList.remove("running");
      bar.style.width = "0";
      void bar.offsetWidth;

      if (i === index) {
        body.classList.add("open");
        bar.style.setProperty("--progress-duration", PROGRESS_DURATION + "ms");
        bar.classList.add("running");
      } else {
        body.classList.remove("open");
      }
    });

    activeIndex = index;
  }

  function nextItem() {
    const next = (activeIndex + 1) % items.length;
    openItem(next);
  }

  function startCycle() {
    stopCycle();
    progressTimer = setInterval(() => {
      if (!isPaused) nextItem();
    }, PROGRESS_DURATION);
  }

  function stopCycle() {
    if (progressTimer) {
      clearInterval(progressTimer);
      progressTimer = null;
    }
  }

  items.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    if (!trigger) return;
    trigger.addEventListener("click", () => {
      const idx = parseInt(item.dataset.index, 10);
      openItem(idx);
      startCycle();
    });
  });

  accordion.addEventListener("pointerenter", () => {
    isPaused = true;
  });
  accordion.addEventListener("pointerleave", () => {
    isPaused = false;
  });

  openItem(0);
  startCycle();
}

// ─── Reusable: Portfolio Carousel (Slide) ────────────────────────────
function initSlider(trackId, carouselId, prevId, nextId, dotsId) {
  const track = document.getElementById(trackId);
  const carousel = document.getElementById(carouselId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  const dotsContainer = document.getElementById(dotsId);
  if (!track || !carousel || !prevBtn || !nextBtn || !dotsContainer) return;

  const dots = dotsContainer.querySelectorAll(".dot");
  const totalSlides = track.children.length;
  let current = 0;

  function goTo(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    current = index;

    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((dot, i) => {
      const isActive = i === current;
      dot.classList.toggle("active", isActive);
      dot.classList.toggle("bg-[#1B2125]", isActive);
      dot.classList.toggle("bg-[#647E9B]/50", !isActive);
    });
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(parseInt(dot.dataset.slide, 10));
    });
  });

  let startX = 0;
  let deltaX = 0;

  carousel.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      deltaX = 0;
    },
    { passive: true },
  );

  carousel.addEventListener(
    "touchmove",
    (e) => {
      deltaX = e.touches[0].clientX - startX;
    },
    { passive: true },
  );

  carousel.addEventListener("touchend", () => {
    if (Math.abs(deltaX) > 50) {
      deltaX < 0 ? goTo(current + 1) : goTo(current - 1);
    }
  });
}

// ─── Init Section 1 ─────────────────────────────────────────────────
initAccordion("servicesAccordion", 5000);
initSlider(
  "sliderTrack",
  "portfolioCarousel",
  "sliderPrev",
  "sliderNext",
  "sliderDots",
);

// ─── Init Section 2 ─────────────────────────────────────────────────
initAccordion("servicesAccordion2", 5000);
initSlider(
  "sliderTrack2",
  "portfolioCarousel2",
  "sliderPrev2",
  "sliderNext2",
  "sliderDots2",
);

// ─── IoT page: portfolio slider ──────────────────────────────────────
initSlider(
  "iotSliderTrack",
  "iotPortfolioCarousel",
  "iotSliderPrev",
  "iotSliderNext",
  "iotSliderDots",
);

// ─── DevOps page: services accordion (auto + progress on all breakpoints) ─
initAccordionCycleAlways("devopsServicesAccordion", 5200);
initAccordionCycleAlways("iotServicesAccordion", 5200);

// ─── View More (Multifaceted Results mobile) ────────────────────────
(function () {
  const btn = document.getElementById("viewMoreResultsBtn");
  if (!btn) return;

  const extraCards = document.querySelectorAll("[data-extra-card]");
  let expanded = false;

  btn.addEventListener("click", () => {
    expanded = !expanded;
    extraCards.forEach((card) => card.classList.toggle("hidden", !expanded));
    btn.textContent = expanded ? "View less" : "View more";
  });
})();

// ─── IoT page: journey block View more ───────────────────────────────
(function () {
  const btn = document.getElementById("iotJourneyToggle");
  const extra = document.getElementById("iotJourneyExtra");
  if (!btn || !extra) return;
  btn.addEventListener("click", () => {
    extra.classList.toggle("hidden");
    btn.textContent = extra.classList.contains("hidden")
      ? "View more"
      : "View less";
  });
})();

// ─── IoT page: Industry solutions carousel progress (mobile) ────────
(function () {
  const scroller = document.getElementById("iotIndustryScroll");
  const fill = document.getElementById("iotIndustryProgressFill");
  if (!scroller || !fill) return;

  function update() {
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    const t = maxScroll <= 0 ? 1 : scroller.scrollLeft / maxScroll;
    const minPct = 33;
    const maxPct = 100;
    fill.style.width = `${minPct + t * (maxPct - minPct)}%`;
  }

  scroller.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

// ─── DevOps page: challenges block View more ──────────────────────────
(function () {
  const btn = document.getElementById("devopsJourneyToggle");
  const extra = document.getElementById("devopsJourneyExtra");
  if (!btn || !extra) return;
  btn.addEventListener("click", () => {
    extra.classList.toggle("hidden");
    btn.textContent = extra.classList.contains("hidden")
      ? "View more"
      : "View less";
  });
})();

// ─── Mobile contact form toggle (footer) ────────────────────────────
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

// ─── Dynamic copyright year ──────────────────────────────────────────
(function () {
  const yearEl = document.getElementById("copyrightYear");
  if (!yearEl) return;
  yearEl.textContent = new Date().getFullYear();
})();

// ─── About: stats counter animation ──────────────────────────────────
(function () {
  const section = document.getElementById("aboutStatsCounter");
  if (!section) return;

  const counters = Array.from(section.querySelectorAll(".stat-count"));
  if (!counters.length) return;

  let started = false;

  function animateCounter(el) {
    const target = Number(el.dataset.target || 0);
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const startAt = performance.now();

    function tick(now) {
      const progress = Math.min((now - startAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      el.textContent = `${current}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = `${target}${suffix}`;
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (started) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.95) {
          started = true;
          counters.forEach(animateCounter);
          observer.disconnect();
        }
      });
    },
    { threshold: [0.95, 1] },
  );

  observer.observe(section);
})();

// ─── About: virtues slider (2 pages) ────────────────────────────────
(function () {
  const viewport = document.getElementById("virtuesViewport");
  const track = document.getElementById("virtuesTrack");
  const progressFill = document.getElementById("virtuesProgressFill");
  const progressTrack = document.getElementById("virtuesProgressTrack");
  if (!viewport || !track) return;

  const cards = Array.from(track.children);
  const pages = [0, 3];
  let currentPage = 0;
  let dragStartX = 0;
  let dragDeltaX = 0;
  let isDragging = false;

  function goToPage(pageIndex, options = {}) {
    const animate = options.animate !== false;
    currentPage = Math.max(0, Math.min(pageIndex, pages.length - 1));
    const cardIndex = pages[currentPage];
    const targetCard = cards[cardIndex];
    if (!targetCard) return;

    const offset = targetCard.offsetLeft;

    if (!animate) {
      track.style.setProperty("transition", "none");
    }

    if (Math.abs(offset) < 0.5) {
      track.style.removeProperty("transform");
    } else {
      track.style.transform = `translateX(-${offset}px)`;
    }

    if (!animate) {
      void track.offsetHeight;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          track.style.removeProperty("transition");
        });
      });
    }
    if (progressFill) {
      const progressPercent = ((currentPage + 1) / pages.length) * 100;
      progressFill.style.width = `${progressPercent}%`;
    }
  }

  function syncVirtuesPosition() {
    goToPage(currentPage, { animate: false });
  }

  // Swipe support
  let startX = 0;
  let deltaX = 0;
  viewport.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      deltaX = 0;
    },
    { passive: true },
  );

  viewport.addEventListener(
    "touchmove",
    (e) => {
      deltaX = e.touches[0].clientX - startX;
    },
    { passive: true },
  );

  viewport.addEventListener("touchend", () => {
    if (Math.abs(deltaX) < 40) return;
    if (deltaX < 0) goToPage(currentPage + 1);
    else goToPage(currentPage - 1);
  });

  // Pointer drag support (mouse + pen + touchpad click-drag)
  viewport.addEventListener("pointerdown", (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragDeltaX = 0;
    viewport.setPointerCapture(e.pointerId);
    track.style.transitionDuration = "0ms";
    viewport.style.cursor = "grabbing";
    e.preventDefault();
  });

  viewport.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    dragDeltaX = e.clientX - dragStartX;
    const baseOffset = cards[pages[currentPage]]?.offsetLeft || 0;
    track.style.transform = `translateX(-${baseOffset - dragDeltaX}px)`;
  });

  function endPointerDrag() {
    if (!isDragging) return;
    isDragging = false;
    track.style.transitionDuration = "";
    viewport.style.cursor = "";
    if (Math.abs(dragDeltaX) > 45) {
      if (dragDeltaX < 0) goToPage(currentPage + 1);
      else goToPage(currentPage - 1);
    } else {
      goToPage(currentPage);
    }
  }

  viewport.addEventListener("pointerup", endPointerDrag);
  viewport.addEventListener("pointercancel", endPointerDrag);
  viewport.addEventListener("pointerleave", endPointerDrag);

  if (progressTrack) {
    progressTrack.addEventListener("click", (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const clickedRatio = (e.clientX - rect.left) / rect.width;
      goToPage(clickedRatio >= 0.5 ? 1 : 0);
    });
  }

  // Trackpad horizontal scroll support
  let wheelLocked = false;
  viewport.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (wheelLocked) return;
      wheelLocked = true;
      if (e.deltaX > 0) goToPage(currentPage + 1);
      else goToPage(currentPage - 1);
      setTimeout(() => {
        wheelLocked = false;
      }, 280);
    },
    { passive: false },
  );

  window.addEventListener("resize", () => syncVirtuesPosition());

  let virtuesRoPending = false;
  const virtuesResizeObserver = new ResizeObserver(() => {
    if (virtuesRoPending) return;
    virtuesRoPending = true;
    requestAnimationFrame(() => {
      virtuesRoPending = false;
      syncVirtuesPosition();
    });
  });
  virtuesResizeObserver.observe(viewport);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => syncVirtuesPosition());
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => syncVirtuesPosition());
  }
  window.addEventListener("load", () => syncVirtuesPosition());
})();

// ─── Web Services / IoT: single-open accordion (same markup pattern) ──
(function () {
  function initWebStyleAccordion(rootId) {
    const accordion = document.getElementById(rootId);
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
    }

    items.forEach((item, index) => {
      const trigger = item.querySelector("[data-web-acc-trigger]");
      if (!trigger) return;
      trigger.addEventListener("click", () => {
        if (activeIndex === index) return;
        activeIndex = index;
        setOpen(activeIndex);
      });
    });

    setOpen(activeIndex);
  }

  initWebStyleAccordion("webServicesAccordion");
})();

// ─── UI/UX page: Potential of UI/UX accordion (mint cards, + / × toggles) ──
(function () {
  const accordion = document.getElementById("uiuxPotentialAccordion");
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll("[data-uiux-acc-item]"));
  if (!items.length) return;

  let activeIndex = 0;

  function setOpen(index) {
    items.forEach((item, i) => {
      const trigger = item.querySelector("[data-uiux-acc-trigger]");
      const panel = item.querySelector("[data-uiux-acc-panel]");
      const iconOpen = item.querySelector("[data-uiux-icon-open]");
      const iconClosed = item.querySelector("[data-uiux-icon-closed]");
      const isOpen = index >= 0 && i === index;

      if (trigger) trigger.setAttribute("aria-expanded", String(isOpen));
      if (panel) panel.classList.toggle("open", isOpen);
      if (iconOpen) iconOpen.classList.toggle("hidden", !isOpen);
      if (iconClosed) iconClosed.classList.toggle("hidden", isOpen);
    });
  }

  items.forEach((item, index) => {
    const trigger = item.querySelector("[data-uiux-acc-trigger]");
    if (!trigger) return;
    trigger.addEventListener("click", () => {
      activeIndex = activeIndex === index ? -1 : index;
      setOpen(activeIndex);
    });
  });

  setOpen(activeIndex);
})();

// ─── Web Service: roadmap pinned slider + progress checkpoints ───────
(function () {
  const section = document.getElementById("webRoadmapSection");
  const progressWrap = document.getElementById("roadmapProgressWrap");
  const progressBgHost = document.getElementById("roadmapProgressSegmentsBg");
  const progressFillHost = document.getElementById(
    "roadmapProgressSegmentsFill",
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
    section.querySelectorAll("[data-roadmap-checkpoint]"),
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
      checkpoint.getBoundingClientRect(),
    );

    const centers = checkpointRects.map(
      (rect) => rect.left - wrapRect.left + rect.width / 2,
    );
    const radius = checkpointRects[0]?.width
      ? checkpointRects[0].width / 2
      : 16;

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
        Math.min(1, progressInSegments - index),
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
      const ratio =
        checkpoints.length > 1 ? index / (checkpoints.length - 1) : 0;
      if (roadmapTrigger) {
        const targetY =
          roadmapTrigger.start +
          ratio * (roadmapTrigger.end - roadmapTrigger.start);
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
    // Keep static first state if GSAP is unavailable.
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

// ─── Roadmap horizontal scroll: phase detail modal (plus on each card) ─
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

// ─── Web Service: technology expertise tabs ──────────────────────────
(function () {
  const techTileImgSrc = "./images/nodeIc.png";
  const tabsWrap = document.getElementById("techStackTabs");
  const grid = document.getElementById("techStackGrid");
  if (!tabsWrap || !grid) return;

  const techByDepartment = {
    frontend: [
      "React",
      "Vue.js",
      "Angular",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Redux",
      "Svelte",
      "Nuxt.js",
      "Gatsby",
      "Material UI",
      "Sass",
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
    cta.style.gridColumn = `span ${ctaSpan} / span ${ctaSpan}`;
    cta.className =
      "box-border inline-flex h-[100px] min-w-0 items-center justify-center gap-1 border-r border-b border-[#E6E9EF] text-[14px] font-bold text-[#3D4BFF] transition hover:text-[#2D39F2] md:text-[18px]";
    cta.innerHTML =
      'Build with us';
    cta.classList.add("group");
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

// ─── Web apps portfolio slider (UI/UX, Product Engineering, …) ─────
function initWebAppsSlider(trackId, prevId, nextId, dotsId) {
  const track = document.getElementById(trackId);
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);
  const dotsWrap = document.getElementById(dotsId);
  if (!track || !prev || !next || !dotsWrap) return;

  const slides = Array.from(track.children);
  const dots = Array.from(dotsWrap.querySelectorAll(".webapps-dot"));
  if (!slides.length) return;

  let current = 0;
  let startX = 0;
  let deltaX = 0;

  function goTo(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle("bg-[#2D39F2]", i === current);
      dot.classList.toggle("bg-[#C4CCDA]", i !== current);
    });
  }

  prev.addEventListener("click", () => goTo(current - 1));
  next.addEventListener("click", () => goTo(current + 1));
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(parseInt(dot.dataset.slide || "0", 10));
    });
  });

  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      deltaX = 0;
    },
    { passive: true },
  );

  track.addEventListener(
    "touchmove",
    (e) => {
      deltaX = e.touches[0].clientX - startX;
    },
    { passive: true },
  );

  track.addEventListener("touchend", () => {
    if (Math.abs(deltaX) > 45) {
      if (deltaX < 0) goTo(current + 1);
      else goTo(current - 1);
    }
  });

  goTo(0);
}

initWebAppsSlider("webAppsTrack", "webAppsPrev", "webAppsNext", "webAppsDots");
initWebAppsSlider(
  "peWebAppsTrack",
  "peWebAppsPrev",
  "peWebAppsNext",
  "peWebAppsDots",
);

// ─── Product Engineering: technology expertise (Frontend / Backend / Mobile / DevOps)
(function () {
  const techTileImgSrc = "./images/nodeIc.png";
  const tabsWrap = document.getElementById("peTechStackTabs");
  const grid = document.getElementById("peTechStackGrid");
  if (!tabsWrap || !grid) return;

  const techByDepartment = {
    frontend: [
      "Angular",
      "React",
      "Vue.js",
      "TypeScript",
      "Next.js",
      "Redux",
      "Tailwind",
      "Sass",
      "Slack",
      "Gradle",
      "Webpack",
      "Vite",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "Python",
      ".NET Core",
      "PHP",
      "NestJS",
      "Django",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Selenium",
      "GraphQL",
    ],
    mobile: [
      "React Native",
      "Flutter",
      "Swift",
      "Kotlin",
      "Ionic",
      "Expo",
      "Firebase",
      "Shopify",
      "REST APIs",
      "WebSockets",
      "CI/CD",
      "App Store",
    ],
    devops: [
      "Docker",
      "GitHub",
      "GitLab",
      "Bitbucket",
      "AWS",
      "Azure",
      "Google Cloud",
      "Kubernetes",
      "Terraform",
      "Jenkins",
      "GitHub Actions",
      "Prometheus",
    ],
  };

  const tabs = Array.from(tabsWrap.querySelectorAll("[data-pe-tech-tab]"));
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
    cta.style.gridColumn = `span ${ctaSpan} / span ${ctaSpan}`;
    cta.className =
      "box-border inline-flex h-[100px] min-w-0 items-center justify-center gap-1 border-r border-b border-[#E6E9EF] text-[14px] font-bold text-[#3D4BFF] transition hover:text-[#2D39F2] md:text-[18px]";
    cta.innerHTML =
      'Build with us';
    cta.classList.add("group");
    grid.appendChild(cta);
  }

  function setActiveTab(key) {
    activeTabKey = key;
    tabs.forEach((tab) => {
      const isActive = tab.dataset.peTechTab === key;
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
      setActiveTab(tab.dataset.peTechTab || "frontend");
    });
  });

  window.addEventListener("resize", () => {
    renderGrid(activeTabKey);
  });

  setActiveTab("frontend");
})();

// ─── Testimonials sliders (desktop + mobile) ─────────────────────────
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
      { passive: true },
    );

    viewport.addEventListener(
      "touchmove",
      (e) => {
        deltaX = e.touches[0].clientX - startX;
      },
      { passive: true },
    );

    viewport.addEventListener("touchend", () => {
      if (Math.abs(deltaX) > 45) {
        if (deltaX < 0) goTo(current + 1);
        else goTo(current - 1);
      }
    });

    // Pointer drag support (mouse + touchpad click-drag)
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
    "testi-desktop-dot",
  );
  initDotsSlider(
    "testimonialsMobileViewport",
    "testimonialsMobileTrack",
    "testimonialsMobileDots",
    "testi-mobile-dot",
  );
})();

// // ─── IoT: "What Sets Us Apart" — parallel scroll, stack at top ──
// (function () {
//   if (!window.gsap || !window.ScrollTrigger) return;

//   var section = document.getElementById("iotStackSection");
//   var wrap = document.getElementById("iotStackCards");
//   if (!section || !wrap) return;

//   var cards = Array.from(wrap.querySelectorAll(".iot-stack-card"));
//   var n = cards.length;
//   if (n < 2) return;

//   var PEEK = 6;
//   var GAP = 16;

//   function build() {
//     ScrollTrigger.getAll().forEach(function (st) {
//       if (st.trigger === section) st.kill();
//     });
//     gsap.set(cards, { clearProps: "all" });
//     wrap.removeAttribute("style");

//     if (!window.matchMedia("(min-width: 768px)").matches) return;

//     var cardH = cards[0].offsetHeight;
//     var startTops = [];
//     for (var i = 0; i < n; i++) startTops.push(i * (cardH + GAP));
//     var totalH = startTops[n - 1] + cardH;

//     var stackTops = [];
//     for (var j = 0; j < n; j++) stackTops.push((n - 1 - j) * PEEK);

//     wrap.style.position = "relative";
//     wrap.style.height = totalH + "px";

//     gsap.set(cards, {
//       position: "absolute",
//       top: function (idx) { return startTops[idx]; },
//       left: 0, right: 0, width: "100%",
//       zIndex: function (idx) { return n - idx; }
//     });

//     var maxTravel = startTops[n - 1] - stackTops[n - 1];

//     gsap.to({}, {
//       scrollTrigger: {
//         trigger: section,
//         start: "top top",
//         end: "+=" + Math.round(maxTravel + 600),
//         pin: true,
//         scrub: 1,
//         invalidateOnRefresh: true,
//         onUpdate: function (self) {
//           var scrolled = self.progress * maxTravel;
//           for (var i = 0; i < n; i++) {
//             var natural = startTops[i] - scrolled;
//             var clamped = Math.max(stackTops[i], natural);
//             var stacked = clamped <= stackTops[i] + 2;
//             gsap.set(cards[i], {
//               top: clamped,
//               opacity: (stacked && i > 0) ? 0.78 : 1
//             });
//           }
//         },
//         onRefreshInit: function () {
//           for (var i = 0; i < n; i++) {
//             gsap.set(cards[i], { top: startTops[i], opacity: 1 });
//           }
//         }
//       }
//     });
//   }

//   if (document.readyState === "complete") {
//     requestAnimationFrame(build);
//   } else {
//     window.addEventListener("load", function () {
//       requestAnimationFrame(build);
//     }, { once: true });
//   }

//   var rid;
//   window.addEventListener("resize", function () {
//     clearTimeout(rid);
//     rid = setTimeout(build, 200);
//   });
// })();

/* ─── IoT / Web service: stack cards pin scroll (same behavior, per-page IDs) ─── */
(function () {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  function initStackCardPin(sectionId, wrapId) {
    var section = document.getElementById(sectionId);
    var wrap = document.getElementById(wrapId);
    if (!section || !wrap) return;

    var cards = Array.from(wrap.querySelectorAll(".iot-stack-card"));
    var n = cards.length;
    if (n < 2) return;

    var GAP = 16;
    var PEEK = 6;
    var resizeTimer = null;
    var st = null;

    function cleanup() {
      if (st) {
        st.kill();
        st = null;
      }

      gsap.killTweensOf(cards);
      gsap.set(cards, { clearProps: "all" });
      cards.forEach(function (el) {
        el.style.minHeight = "";
      });
      wrap.style.position = "";
      wrap.style.height = "";
    }

    function build() {
      cleanup();

      var isMobile = window.matchMedia("(max-width: 767px)").matches;

      var heights = cards.map(function (c) {
        return c.offsetHeight;
      });
      var maxH = Math.max.apply(null, heights);
      cards.forEach(function (c) {
        c.style.minHeight = maxH + "px";
      });
      var cardH = maxH;

      // Natural vertical positions
      var startY = [];
      for (var i = 0; i < n; i++) {
        startY.push(i * (cardH + GAP));
      }

      // Final stacked positions
      var endY = [];
      for (var j = 0; j < n; j++) {
        endY.push(j * PEEK);
      }

      var totalH = startY[n - 1] + cardH;
      var maxTravel = startY[n - 1] - endY[n - 1];

      wrap.style.position = "relative";
      wrap.style.height = totalH + "px";

      gsap.set(cards, {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        y: function (i) {
          return startY[i];
        },
        zIndex: function (i) {
          return n - i;
        },
        opacity: 1,
      });

      var pinOffset = isMobile ? 60 : 110;

      st = ScrollTrigger.create({
        trigger: wrap,
        start: "top top+=" + pinOffset,
        end: "+=" + maxTravel,
        pin: true,
        pinSpacing: false,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,

        onUpdate: function (self) {
          var scrolled = self.progress * maxTravel;

          for (var i = 0; i < n; i++) {
            var y = Math.max(endY[i], startY[i] - scrolled);
            var stacked = y <= endY[i] + 1;

            gsap.set(cards[i], {
              y: y,
              opacity: stacked && i > 0 ? 0.78 : 1,
            });
          }
        },

        onRefreshInit: function () {
          gsap.set(cards, {
            y: function (i) {
              return startY[i];
            },
            opacity: 1,
          });
        },

        onLeave: function () {
          gsap.set(cards, {
            y: function (i) {
              return endY[i];
            },
            opacity: function (i) {
              return i > 0 ? 0.78 : 1;
            },
          });
        },

        onEnterBack: function () {
          gsap.set(cards, {
            y: function (i) {
              return endY[i];
            },
            opacity: function (i) {
              return i > 0 ? 0.78 : 1;
            },
          });
        },

        onLeaveBack: function () {
          gsap.set(cards, {
            y: function (i) {
              return startY[i];
            },
            opacity: 1,
          });
        },
      });

      ScrollTrigger.refresh();
    }

    if (document.readyState === "complete") {
      requestAnimationFrame(build);
    } else {
      window.addEventListener(
        "load",
        function () {
          requestAnimationFrame(build);
        },
        { once: true },
      );
    }

    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        build();
      }, 200);
    });
  }

  initStackCardPin("iotStackSection", "iotStackCards");
  initStackCardPin("webCommitmentSection", "webCommitmentCards");
})();

// ─── Product Engineering: vertical methodology timeline + card slide-in (no pin) ───
(function () {
  const section = document.getElementById("peMethodologySection");
  if (!section) return;

  function getActiveProgressWrap() {
    return window.matchMedia("(min-width: 1024px)").matches
      ? document.getElementById("peMethodProgressWrapLg")
      : document.getElementById("peMethodProgressWrapSm");
  }

  const checkpoints = Array.from(
    section.querySelectorAll("[data-pe-method-checkpoint]"),
  );
  const cards = Array.from(section.querySelectorAll(".pe-method-card"));
  const footerScrollTarget = section.querySelector("[data-pe-method-scroll-top]");

  function scrollToMethodologyTop() {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (footerScrollTarget) {
    footerScrollTarget.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToMethodologyTop();
    });
    footerScrollTarget.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        scrollToMethodologyTop();
      }
    });
  }

  if (checkpoints.length < 2) return;

  let continuousLineGeometry = null;
  let fillSegments = [];
  let segmentTriggers = [];
  let resizeTimer = null;

  function layoutVerticalProgressGeometry() {
    if (checkpoints.length < 2) return;
    const wrap = getActiveProgressWrap();
    const progressBgHost = wrap?.querySelector(".pe-method-seg-bg");
    const progressFillHost = wrap?.querySelector(".pe-method-seg-fill");
    if (!progressBgHost || !progressFillHost) return;
    const bgRect = progressBgHost.getBoundingClientRect();
    const checkpointRects = checkpoints.map((el) => el.getBoundingClientRect());

    const centersY = checkpointRects.map(
      (rect) => rect.top - bgRect.top + rect.height / 2,
    );

    progressBgHost.innerHTML = "";
    progressFillHost.innerHTML = "";
    fillSegments = [];

    const lineStart = centersY[0];
    const lineEnd = centersY[centersY.length - 1];
    const lineHeight = Math.max(0, lineEnd - lineStart);

    const GAP_PAD = 4;
    for (let i = 0; i < centersY.length - 1; i++) {
      const segTop = centersY[i] + checkpointRects[i].height / 2 + GAP_PAD;
      const segBottom = centersY[i + 1] - checkpointRects[i + 1].height / 2 - GAP_PAD;
      if (segBottom <= segTop) continue;

      const bgSeg = document.createElement("div");
      bgSeg.className =
        "pointer-events-none absolute left-1/2 w-1 -translate-x-1/2 rounded-full bg-[#FFA28B]/25";
      bgSeg.style.top = `${segTop}px`;
      bgSeg.style.height = `${segBottom - segTop}px`;
      progressBgHost.appendChild(bgSeg);

      const fillSeg = document.createElement("div");
      fillSeg.className =
        "pointer-events-none absolute left-1/2 w-1 -translate-x-1/2 rounded-full bg-[#FFA28B]/50";
      fillSeg.style.top = `${segTop}px`;
      fillSeg.style.height = "0px";
      progressFillHost.appendChild(fillSeg);

      fillSegments.push({
        el: fillSeg,
        start: segTop,
        end: segBottom,
        maxHeight: segBottom - segTop,
      });
    }

    continuousLineGeometry = { start: lineStart, height: lineHeight, centersY };
  }

  function updateCheckpointStyles(currentFillY) {
    checkpoints.forEach((checkpoint, k) => {
      if (k === 0) {
        checkpoint.classList.add("opacity-100", "scale-105");
        checkpoint.classList.remove("opacity-40", "scale-100");
        return;
      }
      if (!continuousLineGeometry) return;
      const reached = currentFillY >= continuousLineGeometry.centersY[k];
      checkpoint.classList.toggle("opacity-100", reached);
      checkpoint.classList.toggle("opacity-40", !reached);
      checkpoint.classList.toggle("scale-105", reached);
      checkpoint.classList.toggle("scale-100", !reached);
    });
  }

  function killSegmentTriggers() {
    segmentTriggers.forEach((st) => st.kill());
    segmentTriggers = [];
  }

  function initCardAnimations() {
    if (!(window.gsap && window.ScrollTrigger)) return;
    gsap.registerPlugin(ScrollTrigger);
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { x: 72, opacity: 0.35 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            end: "top 58%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    });
  }

  function initScrollProgress() {
    killSegmentTriggers();
    layoutVerticalProgressGeometry();

    fillSegments.forEach((seg) => { seg.el.style.height = "0px"; });
    updateCheckpointStyles(0);

    if (!(window.gsap && window.ScrollTrigger) || !continuousLineGeometry || fillSegments.length === 0) return;
    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const prog = self.progress;
        const fillY = continuousLineGeometry.start + continuousLineGeometry.height * prog;

        fillSegments.forEach((seg) => {
          if (fillY <= seg.start) {
            seg.el.style.height = "0px";
          } else if (fillY >= seg.end) {
            seg.el.style.height = `${seg.maxHeight}px`;
          } else {
            seg.el.style.height = `${fillY - seg.start}px`;
          }
        });

        updateCheckpointStyles(fillY);
      },
    });
    segmentTriggers.push(st);

    ScrollTrigger.refresh();
  }

  function build() {
    initScrollProgress();
    if (window.gsap && window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }

  initCardAnimations();
  build();

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initScrollProgress();
    }, 150);
  });

  if (document.readyState === "complete") {
    requestAnimationFrame(build);
  } else {
    window.addEventListener(
      "load",
      () => {
        requestAnimationFrame(build);
      },
      { once: true },
    );
  }
})();

/* ═══════════════════════════════════════════════════════════
   Approach page — "Our Path to Progress" timeline
   ═══════════════════════════════════════════════════════════ */
(function approachTimeline() {
  const section = document.getElementById("approachTimelineSection");
  if (!section) return;

  const isLg = () => window.matchMedia("(min-width: 1024px)").matches;

  function getActiveProgressWrap() {
    return isLg()
      ? document.getElementById("approachProgressWrapLg")
      : document.getElementById("approachProgressWrapSm");
  }

  const checkpoints = Array.from(
    section.querySelectorAll("[data-approach-checkpoint]"),
  );
  const cards = Array.from(section.querySelectorAll(".approach-card"));

  if (checkpoints.length < 2) return;

  let lineGeometry = null;
  let fillSegments = [];
  let segTriggers = [];
  let resizeTimer = null;

  function layoutGeometry() {
    if (checkpoints.length < 2) return;
    const wrap = getActiveProgressWrap();
    const bgHost = wrap?.querySelector(".approach-seg-bg");
    const fillHost = wrap?.querySelector(".approach-seg-fill");
    if (!bgHost || !fillHost) return;
    const bgRect = bgHost.getBoundingClientRect();

    const visibleCheckpoints = checkpoints.filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
    if (visibleCheckpoints.length < 2) return;

    const cpRects = visibleCheckpoints.map((el) => el.getBoundingClientRect());
    const centersY = cpRects.map(
      (rect) => rect.top - bgRect.top + rect.height / 2,
    );

    bgHost.innerHTML = "";
    fillHost.innerHTML = "";
    fillSegments = [];

    const lineStart = centersY[0];
    const lineEnd = centersY[centersY.length - 1];
    const lineHeight = Math.max(0, lineEnd - lineStart);

    const GAP_PAD = 4;
    for (let i = 0; i < centersY.length - 1; i++) {
      const segTop = centersY[i] + cpRects[i].height / 2 + GAP_PAD;
      const segBottom = centersY[i + 1] - cpRects[i + 1].height / 2 - GAP_PAD;
      if (segBottom <= segTop) continue;

      const bgSeg = document.createElement("div");
      bgSeg.className =
        "pointer-events-none absolute left-1/2 w-1 -translate-x-1/2 rounded-full bg-[#FFA28B]/25";
      bgSeg.style.top = `${segTop}px`;
      bgSeg.style.height = `${segBottom - segTop}px`;
      bgHost.appendChild(bgSeg);

      const fillSeg = document.createElement("div");
      fillSeg.className =
        "pointer-events-none absolute left-1/2 w-1 -translate-x-1/2 rounded-full bg-[#FFA28B]/50";
      fillSeg.style.top = `${segTop}px`;
      fillSeg.style.height = "0px";
      fillHost.appendChild(fillSeg);

      fillSegments.push({
        el: fillSeg,
        start: segTop,
        end: segBottom,
        maxHeight: segBottom - segTop,
      });
    }

    lineGeometry = {
      start: lineStart,
      height: lineHeight,
      centersY,
      checkpoints: visibleCheckpoints,
    };
  }

  function updateCheckpointStyles(fillY) {
    if (!lineGeometry) return;
    lineGeometry.checkpoints.forEach((cp, k) => {
      if (k === 0) {
        cp.classList.add("opacity-100", "scale-105");
        cp.classList.remove("opacity-40", "scale-100");
        return;
      }
      const reached = fillY >= lineGeometry.centersY[k];
      cp.classList.toggle("opacity-100", reached);
      cp.classList.toggle("opacity-40", !reached);
      cp.classList.toggle("scale-105", reached);
      cp.classList.toggle("scale-100", !reached);
    });
  }

  function killTriggers() {
    segTriggers.forEach((st) => st.kill());
    segTriggers = [];
  }

  function initCardAnimations() {
    if (!(window.gsap && window.ScrollTrigger)) return;
    gsap.registerPlugin(ScrollTrigger);
    cards.forEach((card) => {
      const isLeftCard = card === card.parentElement.firstElementChild;
      const xFrom = isLeftCard ? -72 : 72;

      gsap.fromTo(
        card,
        { x: xFrom, opacity: 0.35 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            end: "top 58%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    });
  }

  function initScrollProgress() {
    killTriggers();
    layoutGeometry();

    fillSegments.forEach((seg) => {
      seg.el.style.height = "0px";
    });
    updateCheckpointStyles(0);

    if (
      !(window.gsap && window.ScrollTrigger) ||
      !lineGeometry ||
      fillSegments.length === 0
    )
      return;
    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const prog = self.progress;
        const fillY = lineGeometry.start + lineGeometry.height * prog;

        fillSegments.forEach((seg) => {
          if (fillY <= seg.start) {
            seg.el.style.height = "0px";
          } else if (fillY >= seg.end) {
            seg.el.style.height = `${seg.maxHeight}px`;
          } else {
            seg.el.style.height = `${fillY - seg.start}px`;
          }
        });

        updateCheckpointStyles(fillY);
      },
    });
    segTriggers.push(st);
    ScrollTrigger.refresh();
  }

  function build() {
    initScrollProgress();
    if (window.gsap && window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }

  initCardAnimations();
  build();

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initScrollProgress();
    }, 150);
  });

  if (document.readyState === "complete") {
    requestAnimationFrame(build);
  } else {
    window.addEventListener(
      "load",
      () => {
        requestAnimationFrame(build);
      },
      { once: true },
    );
  }
})(); /* end approachTimeline */

/* ═══════════════════════════════════════════════════════════
   Approach page — Core Values animated SVG
   ═══════════════════════════════════════════════════════════ */
(function coreValuesAnimation() {
  var section = document.getElementById("coreValuesSection");
  if (!section || !window.gsap) return;

  /* ---- shared state data ---- */
  var CONNECT_OUTERS = [
    { cx: 170, cy: 28 },
    { cx: 269, cy: 71 },
    { cx: 312, cy: 170 },
    { cx: 269, cy: 269 },
    { cx: 170, cy: 312 },
    { cx: 71, cy: 269 },
    { cx: 28, cy: 170 },
    { cx: 71, cy: 71 },
  ];
  var COLLAB_OUTERS = [
    { cx: 170, cy: 70 },
    { cx: 241, cy: 99 },
    { cx: 270, cy: 170 },
    { cx: 241, cy: 241 },
    { cx: 170, cy: 270 },
    { cx: 99, cy: 241 },
    { cx: 70, cy: 170 },
    { cx: 99, cy: 99 },
  ];
  var GROW_CIRCLES = [
    { cx: 90, cy: 170, r: 35 },
    { cx: 135, cy: 170, r: 45 },
    { cx: 190, cy: 170, r: 55 },
  ];
  var ZERO_GROWS = [
    { cx: 170, cy: 170, r: 0 },
    { cx: 170, cy: 170, r: 0 },
    { cx: 170, cy: 170, r: 0 },
  ];

  var states = {
    connect: {
      center: { cx: 170, cy: 170, r: 71, fill: "#6067FC", "fill-opacity": 1 },
      outers: CONNECT_OUTERS,
      outerAttrs: { r: 28, fill: "#C7C9FE", "fill-opacity": 1, "stroke-opacity": 0 },
      outerOpacity: 1,
      linesOpacity: 1,
      grows: ZERO_GROWS,
      growOpacity: 0,
    },
    collab: {
      center: { cx: 170, cy: 170, r: 95, fill: "#444CFC", "fill-opacity": 0.9 },
      outers: COLLAB_OUTERS,
      outerAttrs: { r: 26, fill: "#444CFC", "fill-opacity": 0.35, "stroke-opacity": 1 },
      outerOpacity: 1,
      linesOpacity: 0,
      grows: ZERO_GROWS,
      growOpacity: 0,
    },
    grow: {
      center: { cx: 250, cy: 170, r: 70, fill: "#444CFC", "fill-opacity": 0.95 },
      outers: CONNECT_OUTERS.map(function () { return { cx: 170, cy: 170 }; }),
      outerAttrs: { r: 0, fill: "#444CFC", "fill-opacity": 0, "stroke-opacity": 0 },
      outerOpacity: 0,
      linesOpacity: 0,
      grows: GROW_CIRCLES,
      growOpacity: 1,
    },
  };

  var STATE_NAMES = ["connect", "collab", "grow"];

  /* ---- helper: collect SVG elements by ID prefix ---- */
  function collectSvg(suffix) {
    var c = document.getElementById("cvCenter" + suffix);
    var l = document.getElementById("cvLines" + suffix);
    if (!c || !l) return null;
    var o = [];
    for (var i = 0; i < 8; i++) {
      var el = document.getElementById("cvOuter" + i + suffix);
      if (!el) return null;
      o.push(el);
    }
    var g = [];
    for (var j = 0; j < 3; j++) {
      var gel = document.getElementById("cvGrow" + j + suffix);
      if (!gel) return null;
      g.push(gel);
    }
    return { center: c, lines: l, outers: o, grows: g };
  }

  /* ---- initialise SVG elements to connect state ---- */
  function initSvg(svg) {
    var s = states.connect;
    gsap.set(svg.center, { attr: s.center });
    svg.outers.forEach(function (el, i) {
      gsap.set(el, { attr: Object.assign({}, CONNECT_OUTERS[i], s.outerAttrs), opacity: 1 });
    });
    gsap.set(svg.lines, { opacity: 1 });
    svg.grows.forEach(function (el) {
      gsap.set(el, { attr: { cx: 170, cy: 170, r: 0 }, opacity: 0 });
    });
  }

  /* ---- animate an SVG set to a named state ---- */
  function animateSvg(svg, stateName, activeTlRef) {
    var s = states[stateName];
    var dur = 0.8;
    var ease = "power2.inOut";
    if (activeTlRef.tl) activeTlRef.tl.kill();
    var tl = gsap.timeline();

    tl.to(svg.center, { attr: s.center, duration: dur, ease: ease }, 0);

    svg.outers.forEach(function (el, i) {
      tl.to(el, {
        attr: Object.assign({}, s.outers[i], s.outerAttrs),
        opacity: s.outerOpacity,
        duration: dur,
        ease: ease,
      }, 0);
    });

    tl.to(svg.lines, { opacity: s.linesOpacity, duration: dur * 0.6, ease: ease }, 0);

    svg.grows.forEach(function (el, i) {
      tl.to(el, {
        attr: s.grows[i],
        opacity: s.growOpacity,
        duration: dur,
        ease: ease,
      }, stateName === "grow" ? i * 0.12 : 0);
    });

    activeTlRef.tl = tl;
  }

  /* ═══════ DESKTOP (md+): hover / click ═══════ */
  (function desktopCoreValues() {
    var deskSvg = collectSvg("");
    if (!deskSvg) return;
    initSvg(deskSvg);

    var items = Array.from(section.querySelectorAll("[data-core-value]"));
    var currentState = "connect";
    var tlRef = { tl: null };

    function transitionTo(stateName) {
      if (stateName === currentState) return;
      currentState = stateName;
      animateSvg(deskSvg, stateName, tlRef);

      items.forEach(function (item) {
        var val = item.dataset.coreValue;
        var title = item.querySelector(".cv-title");
        var desc = item.querySelector(".cv-desc");
        if (val === stateName) {
          title.style.color = "#444CFC";
          gsap.to(desc, { maxHeight: 200, duration: 0.4, ease: "power2.out" });
        } else {
          title.style.color = "#E0E0EE";
          gsap.to(desc, { maxHeight: 0, duration: 0.3, ease: "power2.in" });
        }
      });
    }

    items.forEach(function (item) {
      var val = item.dataset.coreValue;
      item.addEventListener("mouseenter", function () { transitionTo(val); });
      item.addEventListener("click", function () { transitionTo(val); });
    });
  })();

  /* ═══════ MOBILE (<md): swipeable slider ═══════ */
  (function mobileCoreValues() {
    var mobSvg = collectSvg("Mob");
    if (!mobSvg) return;
    initSvg(mobSvg);

    var slider = document.getElementById("cvSlider");
    var track = document.getElementById("cvSliderTrack");
    var dotsWrap = document.getElementById("cvDots");
    if (!slider || !track || !dotsWrap) return;

    var dots = Array.from(dotsWrap.querySelectorAll(".cv-dot"));
    var slideCount = 3;
    var currentIdx = 0;
    var tlRef = { tl: null };

    function slideWidth() { return slider.offsetWidth; }

    function goTo(idx) {
      idx = Math.max(0, Math.min(slideCount - 1, idx));
      if (idx === currentIdx) return;
      currentIdx = idx;
      gsap.to(track, {
        x: -idx * slideWidth(),
        duration: 0.45,
        ease: "power2.out",
      });
      animateSvg(mobSvg, STATE_NAMES[idx], tlRef);
      dots.forEach(function (d, i) {
        d.style.backgroundColor = i === idx ? "#444CFC" : "#D0D5DD";
      });
    }

    /* dot clicks */
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { goTo(i); });
    });

    /* touch swipe */
    var startX = 0;
    var startY = 0;
    var dragging = false;
    var locked = false;
    var dx = 0;
    var threshold = 40;
    var baseX = 0;
    var RUBBER = 0.25;

    track.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      dragging = true;
      locked = false;
      dx = 0;
      baseX = -currentIdx * slideWidth();
      gsap.killTweensOf(track);
    }, { passive: true });

    track.addEventListener("touchmove", function (e) {
      if (!dragging) return;
      if (!locked) {
        var dy = Math.abs(e.touches[0].clientY - startY);
        var adx = Math.abs(e.touches[0].clientX - startX);
        if (dy > adx) { dragging = false; return; }
        locked = true;
      }
      e.preventDefault();
      dx = e.touches[0].clientX - startX;
      var rawX = baseX + dx;
      var minX = -(slideCount - 1) * slideWidth();
      if (rawX > 0) rawX = rawX * RUBBER;
      else if (rawX < minX) rawX = minX + (rawX - minX) * RUBBER;
      gsap.set(track, { x: rawX });
    }, { passive: false });

    track.addEventListener("touchend", function () {
      if (!dragging) return;
      dragging = false;
      var nextIdx = currentIdx;
      if (Math.abs(dx) > threshold) {
        nextIdx = dx < 0 ? currentIdx + 1 : currentIdx - 1;
        nextIdx = Math.max(0, Math.min(slideCount - 1, nextIdx));
      }
      if (nextIdx !== currentIdx) {
        goTo(nextIdx);
      } else {
        gsap.to(track, { x: -currentIdx * slideWidth(), duration: 0.3, ease: "power2.out" });
      }
    });

    /* handle resize */
    window.addEventListener("resize", function () {
      gsap.set(track, { x: -currentIdx * slideWidth() });
    });
  })();
})();
