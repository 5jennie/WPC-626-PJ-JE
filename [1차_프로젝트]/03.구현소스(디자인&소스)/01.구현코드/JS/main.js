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


function handleScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const scrollY = window.scrollY;
  
  const stage1 = 100;
  const stage2 = 300;
  const stage3 = 500;

  header.classList.remove('scroll-stage-1', 'scroll-stage-2', 'scroll-stage-3');

  if (scrollY >= stage3) {
    header.classList.add('scroll-stage-3');
  } else if (scrollY >= stage2) {
    header.classList.add('scroll-stage-2');
  } else if (scrollY >= stage1) {
    header.classList.add('scroll-stage-1');
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
