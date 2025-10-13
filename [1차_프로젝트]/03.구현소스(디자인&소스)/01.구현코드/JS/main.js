// 위고 출판사 메인 페이지 JS - main.js /////////

/* ***************************************************************** */

// 페이지 로드 시 최상단으로 이동
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// 히스토리 사용 시에도 최상단으로 이동
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// 페이지 로드 즉시 최상단으로
window.addEventListener("load", function () {
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 0);
});

/* ***************************************************************** */

/* ****** 언어 설정 구역 효과 ****** */
/* 언어 설정버튼 */
/* KR, EN 버튼 */
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

/* ***************************************************************** */
/* 2. 메인영역 */
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

  // 탭 기능 초기화 호출
  initBookTabs();

  // 언어 버튼 초기화 호출
  initLanguageButtons();
});

/* ***************************************************************** */
/* 2-1. Navigation Tabs */
/* 배너 바로 밑에 있는 탭 버튼 3종 */

// 탭 기능 초기화
function initBookTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const allbookRows = document.querySelectorAll(".book-row");

  // 탭이 없으면 종료
  if (tabs.length === 0 || allbookRows.length === 0) return;

  // 첫 번째 탭 활성화
  tabs[0].classList.add("active");

  // 초기 상태: New Books만 표시 - 10권
  allbookRows.forEach((row) => {
    if (row.getAttribute("data-category") === "new") {
      row.style.display = "flex";
    } else {
      row.style.display = "none";
    }
  });

  // 각 탭에 클릭 이벤트 추가
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // All 탭(index 2)은 페이지 이동이므로 preventDefault 안함
      if (href && href.includes("all-books.html")) {
        return; // 페이지 이동 허용
      }

      // 페이지 최상단 이동 방지
      e.preventDefault();

      // 모든 탭에서 active 클래스 제거
      tabs.forEach((t) => t.classList.remove("active"));

      // 클릭한 탭에 active 클래스 추가
      this.classList.add("active");

      // 탭에 따라 다른 책 표시
      let category = "";
      if (index === 0) {
        category = "new"; // New Books
      } else if (index === 1) {
        category = "best"; // Best
      }

      // 해당 카테고리의 책만 표시
      allBookRows.forEach((row, i) => {
        if (row.getAttribute("data-category") === category) {
          row.style.display = "flex";
          setTimeout(() => animateBooks(row), i * 50);
        } else {
          row.style.display = "none";
        }
      });
    });
  });
}

// 책 애니메이션 효과
function animateBooks(row) {
  const books = row.querySelectorAll(".book-item");

  books.forEach((book, index) => {
    // 초기 상태
    book.style.opacity = "0";
    book.style.transform = "translateY(20px)";

    // 순차적으로 나타나기
    setTimeout(() => {
      book.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      book.style.opacity = "1";
      book.style.transform = "translateY(0)";
    }, index * 100);
  });
}

/* ***************************************************************** */

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

/* ***************************************************************** */

// 페이지 로드 완료
window.addEventListener("load", function () {
  handleResize();
  console.log("위고 출판사 페이지 로드 완료");
});
