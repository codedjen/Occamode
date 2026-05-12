(function () {
  "use strict";

  var DATA_URL = "./casestudies-data.json";

  function getSlug() {
    return (location.hash || "").replace(/^#/, "");
  }

  function esc(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ── Render helpers ── */

  function renderTag(tag) {
    return '<span class="rounded-full border border-[#D3D9E4] bg-white/60 px-3.5 py-1.5 text-[11px] font-medium text-[#3E4C5B]">' +
      esc(tag) + "</span>";
  }

  var META_LABEL = "mb-1 text-[10px] font-semibold tracking-[0.14em] uppercase text-[#6BA3D8]";

  function renderMetaField(label, value) {
    if (value === undefined || value === null || value === "") return "";
    return '<div class="min-w-0">' +
      '<p class="' + META_LABEL + '">' + esc(label) + "</p>" +
      '<p class="text-[15px] font-medium leading-snug text-[#1B2125]">' + esc(String(value)) + "</p>" +
      "</div>";
  }

  function collectServiceLines(det) {
    var lines = [];
    if (det.services) {
      if (Array.isArray(det.services)) {
        for (var i = 0; i < det.services.length; i++) lines.push(det.services[i]);
      } else {
        lines.push(det.services);
      }
    }
    if (det.whatWeDid) {
      for (var w = 0; w < det.whatWeDid.length; w++) lines.push(det.whatWeDid[w]);
    }
    return lines;
  }

  function renderDetailsTwoColumn(det) {
    var country = det.country != null && det.country !== "" ? det.country : null;
    var industry = det.industry != null && det.industry !== "" ? det.industry : (det.platform || null);
    var clientSince = det.clientSince != null && det.clientSince !== "" ? det.clientSince : (det.launchDate || null);
    var timeline = det.timeline != null && det.timeline !== "" ? det.timeline : (det.duration || null);

    var leftCol = '<div class="flex flex-col gap-5 sm:gap-6">' +
      renderMetaField("Country", country) +
      renderMetaField("Industry", industry) +
      renderMetaField("Client Since", clientSince) +
      renderMetaField("Timeline", timeline) +
      "</div>";

    var serviceLines = collectServiceLines(det);
    var servicesBody = "";
    for (var s = 0; s < serviceLines.length; s++) {
      servicesBody += '<p class="text-[15px] leading-snug text-[#1B2125]">' + esc(serviceLines[s]) + "</p>";
    }
    if (!servicesBody) servicesBody = '<p class="text-[15px] text-[#647E9B]">—</p>';

    var rightCol = '<div class="min-w-0">' +
      '<p class="' + META_LABEL + '">Services</p>' +
      '<div class="mt-0 space-y-2">' + servicesBody + "</div></div>";

    return leftCol + rightCol;
  }

  var arrowUpGreen =
    '<svg class="h-5 w-5 shrink-0 text-[#16A34A]" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
    '<path d="M10 16V4m0 0l5 5m-5-5L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function renderStat(stat) {
    return '<div class="flex flex-col items-start">' +
      '<div class="flex items-baseline gap-2">' +
      arrowUpGreen +
      '<span class="text-[34px] font-bold leading-none tracking-tight text-[#010101] md:text-[42px]">' +
      esc(stat.value) + '<span class="text-[26px] md:text-[32px]">' + esc(stat.suffix || "") + "</span></span>" +
      "</div>" +
      '<p class="mt-3 max-w-[220px] text-[13px] leading-[1.45] text-[#7A8490] md:text-[14px]">' + esc(stat.label) + "</p>" +
      "</div>";
  }

  function renderChallengeItem(item, idx, accent) {
    var halo =
      '<span class="relative mt-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center self-start">' +
      '<span class="absolute inset-0 rounded-full" style="background-color:' + accent + ";opacity:0.22\"></span>" +
      '<span class="relative z-[1] h-2 w-2 shrink-0 rounded-full" style="background-color:' + accent + "\"></span>" +
      "</span>";
    return '<div class="flex gap-4">' +
      halo +
      '<div>' +
        '<h4 class="text-[15px] font-semibold leading-[1.35] text-[#010101] md:text-[16px]">' + esc(item.title) + "</h4>" +
        '<p class="mt-2 text-[13px] leading-[1.7] text-[#647E9B] md:text-[14px]">' + esc(item.body) + "</p>" +
      "</div></div>";
  }

  var checkSVG = '<svg class="h-5 w-5 shrink-0 text-[#3D4BFF]" viewBox="0 0 20 20" fill="none"><path d="M6 10l3 3 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/></svg>';

  function renderApproachStep(step) {
    return '<div class="flex gap-4 py-5">' +
      checkSVG +
      '<div>' +
        '<h4 class="text-[15px] font-semibold text-[#010101] md:text-[16px]">' + esc(step.title) + "</h4>" +
        '<p class="mt-1.5 text-[13px] leading-[1.65] text-[#647E9B] md:text-[14px]">' + esc(step.body) + "</p>" +
      "</div></div>";
  }

  function renderTechBadge(name) {
    return (
      '<div class="flex items-center justify-center rounded-md border border-[#E8ECF1] bg-white px-3 py-3 transition hover:shadow-sm">' +
      '<img src="./images/nodeIc.png" alt="' +
      esc(name) +
      '" class="mx-auto h-auto w-auto max-w-full object-contain" />' +
      "</div>"
    );
  }

  function renderResultItem(item) {
    var bullet =
      '<span class="relative mt-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center self-start">' +
      '<span class="absolute inset-0 rounded-full bg-[#C8E6C9]" aria-hidden="true"></span>' +
      '<span class="relative z-[1] h-2 w-2 shrink-0 rounded-full bg-[#2E7D32]" aria-hidden="true"></span>' +
      "</span>";
    return '<div class="flex gap-4">' +
      bullet +
      '<div class="min-w-0">' +
      '<h4 class="text-[15px] font-semibold leading-[1.4] text-[#1B2125] md:text-[16px]">' + esc(item.title) + "</h4>" +
      '<p class="mt-2 text-[14px] leading-[1.75] text-[#8A94A0] md:text-[15px]">' + esc(item.body) + "</p>" +
      "</div></div>";
  }

  function buildCaseCard(cs, isMobile) {
    var dark = cs.slug === "dotcal";
    var textCol = dark ? "text-white" : "";
    var subCol = dark ? "text-white/85" : "text-[#7A92AE]";
    var tagBorder = dark ? "border-white/35" : "border-[#D3D9E4]";
    var tagText = dark ? "text-white/85" : "text-[#647E9B]";
    var linkCol = "color:" + (cs.accentColor || "#F05A40");
    var bg = cs.heroBg || "#F7F8FA";
    var img = isMobile ? (cs.mobileImage || cs.heroImage) : cs.heroImage;

    var tagsHTML = "";
    for (var t = 0; t < cs.tags.length; t++) {
      tagsHTML += '<span class="rounded-full border ' + tagBorder + ' px-2.5 py-0.5 text-[10px] ' + tagText + '">' + esc(cs.tags[t]) + "</span>";
    }

    if (isMobile) {
      return '<article class="w-full shrink-0 p-4 ' + textCol + '" style="background:' + bg + '">' +
        '<img src="' + esc(cs.logo) + '" alt="' + esc(cs.logoAlt) + '" class="h-6 w-auto" />' +
        '<h3 class="mt-3 text-[16px] leading-[100%]! font-semibold">' + esc(cs.title) + "</h3>" +
        '<p class="mt-2 text-[12px] leading-5 ' + subCol + '">' + esc(cs.subtitle) + "</p>" +
        '<div class="mt-3 flex flex-wrap gap-1.5">' + tagsHTML + "</div>" +
        '<div class="mt-3 grid grid-cols-[80px_minmax(0,1fr)] items-end gap-2">' +
          '<a href="./casestudy.html#' + esc(cs.slug) + '" class="text-[12px] font-semibold" style="' + linkCol + '">View more</a>' +
          '<div class="h-[88px] w-full rounded-[3px] bg-cover bg-right bg-no-repeat" style="background-image:url(\'' + esc(img) + '\')"></div>' +
        "</div></article>";
    }

    return '<article class="flex flex-col overflow-hidden rounded-md border border-[#E8ECF1] bg-white">' +
      '<div class="relative h-[160px] bg-cover bg-center" style="background-image:url(\'' + esc(cs.heroImage) + '\');background-color:' + bg + '">' +
        '<div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>' +
      "</div>" +
      '<div class="flex flex-1 flex-col p-5">' +
        '<img src="' + esc(cs.logo) + '" alt="' + esc(cs.logoAlt) + '" class="h-6 w-auto" />' +
        '<h3 class="mt-3 text-[15px] leading-[100%]! font-semibold text-[#010101]">' + esc(cs.title) + "</h3>" +
        '<p class="mt-2 flex-1 text-[12px] leading-[1.6] text-[#647E9B]">' + esc(cs.subtitle) + "</p>" +
        '<div class="mt-3 flex flex-wrap gap-1.5">' +
          tagsHTML.replace(new RegExp(tagBorder, "g"), "border-[#D3D9E4]").replace(new RegExp(tagText, "g"), "text-[#647E9B]") +
        "</div>" +
        '<a href="./casestudy.html#' + esc(cs.slug) + '" class="mt-4 text-[13px] font-semibold" style="' + linkCol + '">View more</a>' +
      "</div></article>";
  }

  /* ── Main render ── */

  function render(data) {
    var slug = getSlug();
    var study = null;

    for (var i = 0; i < data.length; i++) {
      if (data[i].slug === slug) { study = data[i]; break; }
    }

    var sections = {
      heroWrap: document.getElementById("csHeroWrap"),
      info: document.getElementById("csCompanyInfo"),
      challenges: document.getElementById("csChallenges"),
      approach: document.getElementById("csApproach"),
      tech: document.getElementById("csTechStack"),
      results: document.getElementById("csResults"),
      otherCases: document.getElementById("csOtherCases"),
      testimonials: document.getElementById("csTestimonialsSection"),
      footer: document.getElementById("csFooterSection")
    };
    var notFound = document.getElementById("csNotFound");

    if (!study) {
      for (var k in sections) { if (sections[k]) sections[k].classList.add("hidden"); }
      notFound.classList.remove("hidden");
      document.title = "Occamode - Case Study Not Found";
      return;
    }

    notFound.classList.add("hidden");
    for (var k2 in sections) { if (sections[k2]) sections[k2].classList.remove("hidden"); }

    document.title = "Occamode - " + study.title;
    var accent = study.accentColor || "#F05A40";

    /* ── Hero ── */
    var heroBg = document.getElementById("csHeroBg");
    heroBg.style.backgroundImage = "url('" + (study.heroImage || "") + "')";
    heroBg.style.backgroundColor = study.heroBg || "#F9E4DE";
    document.getElementById("csLabel").textContent = study.details.company || study.logoAlt;
    document.getElementById("csTitle").textContent = study.title;
    document.getElementById("csSubtitle").textContent = study.subtitle;

    var tagsEl = document.getElementById("csTags");
    tagsEl.innerHTML = "";
    for (var t = 0; t < study.tags.length; t++) tagsEl.innerHTML += renderTag(study.tags[t]);

    /* ── Company Info ── */
    document.getElementById("csInfoLogo").src = study.logo;
    document.getElementById("csInfoLogo").alt = study.logoAlt;
    var descEl = document.getElementById("csInfoDesc");
    descEl.innerHTML = "";
    if (study.companyDescription) {
      for (var d = 0; d < study.companyDescription.length; d++) {
        descEl.innerHTML += "<p>" + esc(study.companyDescription[d]) + "</p>";
      }
    }
    var detGrid = document.getElementById("csDetailsGrid");
    detGrid.innerHTML = renderDetailsTwoColumn(study.details || {});

    var statsGrid = document.getElementById("csStatsGrid");
    statsGrid.innerHTML = "";
    if (study.stats && study.stats.length) {
      statsGrid.classList.remove("hidden");
      for (var st = 0; st < study.stats.length; st++) statsGrid.innerHTML += renderStat(study.stats[st]);
    } else {
      statsGrid.classList.add("hidden");
    }

    var scrollBtn = document.getElementById("csScrollDown");
    if (scrollBtn) {
      scrollBtn.onclick = function () {
        var el = document.getElementById("csCompanyInfo");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };
    }

    /* ── Key Challenges ── */
    var chalSec = sections.challenges;
    if (study.challenges) {
      chalSec.classList.remove("hidden");
      document.getElementById("csChalLabel").textContent = study.challenges.subheading || "KEY CHALLENGES";
      document.getElementById("csChalLabel").style.color = accent;
      document.getElementById("csChalHeading").textContent = study.challenges.heading;
      document.getElementById("csChalDesc").textContent = study.challenges.description;
      var chalItems = document.getElementById("csChalItems");
      chalItems.innerHTML = "";
      for (var c = 0; c < study.challenges.items.length; c++) {
        chalItems.innerHTML += renderChallengeItem(study.challenges.items[c], c, accent);
      }
    } else {
      chalSec.classList.add("hidden");
    }

    /* ── Our Approach ── */
    var apSec = sections.approach;
    if (study.approach) {
      apSec.classList.remove("hidden");
      document.getElementById("csApproachHeading").textContent = study.approach.heading;
      var apDesc = document.getElementById("csApproachDesc");
      apDesc.innerHTML = "";
      for (var ad = 0; ad < study.approach.description.length; ad++) {
        apDesc.innerHTML += "<p>" + esc(study.approach.description[ad]) + "</p>";
      }
      var apSteps = document.getElementById("csApproachSteps");
      apSteps.innerHTML = "";
      for (var as2 = 0; as2 < study.approach.steps.length; as2++) {
        apSteps.innerHTML += renderApproachStep(study.approach.steps[as2]);
      }
    } else {
      apSec.classList.add("hidden");
    }

    /* ── Tech Stack ── */
    var techSec = sections.tech;
    if (study.techStack && study.techStack.length) {
      techSec.classList.remove("hidden");
      var techGrid = document.getElementById("csTechGrid");
      techGrid.innerHTML = "";
      for (var tc = 0; tc < study.techStack.length; tc++) {
        techGrid.innerHTML += renderTechBadge(study.techStack[tc]);
      }
    } else {
      techSec.classList.add("hidden");
    }

    /* ── Results ── */
    var resSec = sections.results;
    if (study.results) {
      resSec.classList.remove("hidden");
      document.getElementById("csResultsHeading").textContent = study.results.heading;
      document.getElementById("csResultsDesc").textContent = study.results.description;
      var resItems = document.getElementById("csResultsItems");
      resItems.innerHTML = "";
      for (var ri = 0; ri < study.results.items.length; ri++) {
        resItems.innerHTML += renderResultItem(study.results.items[ri]);
      }
      var afterP = document.getElementById("csResultsAfter");
      afterP.textContent = study.results.afterItems || "";
      afterP.style.display = study.results.afterItems ? "" : "none";

      var imgWrap = document.getElementById("csResultsImageWrap");
      var imgEl = document.getElementById("csResultsImage");
      imgEl.src = study.results.image || "";
      imgEl.alt = study.title + " results";
      if (imgWrap) {
        if (study.results.image) imgWrap.classList.remove("hidden");
        else imgWrap.classList.add("hidden");
      }

      if (study.results.testimonial) {
        document.getElementById("csTestimonial").style.display = "";
        var tm = study.results.testimonial;
        document.getElementById("csTestimonialAvatar").textContent = tm.name.charAt(0);
        document.getElementById("csTestimonialQuote").textContent = tm.quote;
        document.getElementById("csTestimonialName").textContent = tm.name;
        document.getElementById("csTestimonialRole").textContent = tm.role;
      } else {
        document.getElementById("csTestimonial").style.display = "none";
      }
    } else {
      resSec.classList.add("hidden");
    }

    /* ── Discover Other Cases ── */
    var otherSec = sections.otherCases;
    otherSec.classList.remove("hidden");

    var desktopGrid = document.getElementById("csOtherGrid");
    var mobileTrack = document.getElementById("csOtherTrack");
    desktopGrid.innerHTML = "";
    mobileTrack.innerHTML = "";

    for (var oc = 0; oc < data.length; oc++) {
      desktopGrid.innerHTML += buildCaseCard(data[oc], false);
      mobileTrack.innerHTML += buildCaseCard(data[oc], true);
    }

    initOtherCarousel(data.length);

    window.scrollTo(0, 0);
  }

  /* ── Mobile carousel for "Other Cases" ── */

  var otherSlide = 0;

  function initOtherCarousel(count) {
    otherSlide = 0;
    var track = document.getElementById("csOtherTrack");
    var dots = document.getElementById("csOtherDots");
    var prev = document.getElementById("csOtherPrev");
    var next = document.getElementById("csOtherNext");
    if (!track || !dots) return;

    dots.innerHTML = "";
    for (var d = 0; d < count; d++) {
      var btn = document.createElement("button");
      btn.className = "h-1.5 w-1.5 rounded-full " + (d === 0 ? "bg-[#2D39F2]" : "bg-[#C4CCDA]");
      btn.setAttribute("data-slide", d);
      btn.setAttribute("aria-label", "Slide " + (d + 1));
      dots.appendChild(btn);
    }

    function goTo(n) {
      otherSlide = Math.max(0, Math.min(n, count - 1));
      track.style.transform = "translateX(-" + (otherSlide * 100) + "%)";
      var allDots = dots.querySelectorAll("button");
      for (var i = 0; i < allDots.length; i++) {
        allDots[i].className = "h-1.5 w-1.5 rounded-full " + (i === otherSlide ? "bg-[#2D39F2]" : "bg-[#C4CCDA]");
      }
    }

    prev.onclick = function () { goTo(otherSlide - 1); };
    next.onclick = function () { goTo(otherSlide + 1); };
    dots.onclick = function (e) {
      var s = e.target.getAttribute("data-slide");
      if (s !== null) goTo(parseInt(s, 10));
    };
  }

  /* ── Init ── */

  function init() {
    var yearEl = document.getElementById("copyrightYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var toggle = document.querySelector("[data-contact-toggle]");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var form = document.querySelector(toggle.dataset.contactToggle);
        if (form) {
          form.classList.toggle("hidden");
          toggle.classList.add("hidden");
        }
      });
    }

    fetch(DATA_URL)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        render(data);
        window.addEventListener("hashchange", function () { render(data); });
      })
      .catch(function () {
        document.getElementById("csNotFound").classList.remove("hidden");
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
