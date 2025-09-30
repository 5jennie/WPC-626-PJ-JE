// 위고 출판사 메인 페이지 JS - main.js /////////

// 위고 출판사 메인 페이지 JavaScript - main.js

// Swiper 초기화 (3분할 유지)
document.addEventListener("DOMContentLoaded", function () {
  // Swiper 설정 - 3개씩 보이도록 설정
  const swiper = new Swiper(".main-swiper", {
    // 무한 루프
    loop: true,

    // 전환 속도
    speed: 800,

    // 자동 재생 (5초마다)
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    // 네비게이션 버튼
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // 키보드 조작
    keyboard: {
      enabled: true,
    },

    // 3분할 핵심 설정
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 0,
    watchOverflow: false,

    // 부드러운 전환
    effect: "slide",
  });

  // 다른 초기화 함수들 실행
  initLanguageButtons();
  initNavTabs();
  initBookHover();
});

// 언어 버튼 기능
function initLanguageButtons() {
  const krBtn = document.querySelector(".lang-kr");
  const enBtn = document.querySelector(".lang-en");

  if (krBtn && enBtn) {
    krBtn.classList.add("active");

    krBtn.addEventListener("click", function () {
      krBtn.classList.add("active");
      enBtn.classList.remove("active");
    });

    enBtn.addEventListener("click", function () {
      enBtn.classList.add("active");
      krBtn.classList.remove("active");
    });
  }
}

// 부드러운 스크롤 기능
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// 네비게이션 탭 클릭 이벤트
function initNavTabs() {
  const navTabs = document.querySelectorAll(".nav-tab");

  navTabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      navTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const target = this.getAttribute("href");
      if (target && target !== "#") {
        smoothScrollTo(target);
      }
    });
  });
}

// 책 아이템 호버 효과
function initBookHover() {
  const bookItems = document.querySelectorAll(".book-item");

  bookItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
      this.style.transition = "transform 0.3s ease";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });

    item.addEventListener("click", function () {
      console.log("책 클릭됨:", this);
    });
  });
}

// 스크롤 이벤트 처리
function handleScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  if (window.scrollY > 100) {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.backgroundColor = "white";
    header.style.backdropFilter = "none";
  }
}

// 반응형 처리
function handleResize() {
  const isMobile = window.innerWidth <= 768;
  const swiperBtns = document.querySelectorAll(
    ".swiper-button-next, .swiper-button-prev"
  );

  swiperBtns.forEach((btn) => {
    if (isMobile) {
      btn.style.width = "50px";
      btn.style.height = "50px";
    } else {
      btn.style.width = "60px";
      btn.style.height = "60px";
    }
  });
}

// 이벤트 리스너 등록
window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleResize);

// 페이지 로드 완료
window.addEventListener("load", function () {
  handleResize();
  console.log("위고 출판사 페이지 로드 완료");
});
