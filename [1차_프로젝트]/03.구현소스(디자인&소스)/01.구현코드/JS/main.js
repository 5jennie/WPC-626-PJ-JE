// 위고 출판사 메인 페이지 JS - main.js /////////
/* 위고 출판사 서브 페이지 js - all-books.css */

// 컴포넌트 로드 함수
async function loadComponent(selector, file) {
  try {
    const response = await fetch(file);
    const html = await response.text();
    document.querySelector(selector).innerHTML = html;
  } catch (error) {
    console.error(`${file} 로드 실패:`, error);
  }
}

// Header와 Footer 로드
loadComponent("#header", "./hero.html");
loadComponent("#footer", "./footer.html");

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

/* ****** hero - 언어 설정 구역 효과 ****** */
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
  // main - Swiper 초기화

document.addEventListener("DOMContentLoaded", function () {
  const swiperElement = document.querySelector(".main-swiper");
  
  if (swiperElement) {
    const swiper = new Swiper(".main-swiper", {
      loop: true,
      speed: 800,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      keyboard: {
        enabled: true,
      },
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 0,
      watchOverflow: false,
      effect: "slide",
    });
  }

  // 메인 페이지 탭 기능 초기화
  initBookTabs();
  
  // All Books 페이지 카테고리 탭 초기화
  initCategoryTabs();
  
  console.log("위고 출판사 페이지 로드 완료");
});

/* ***************************************************************** */
/* main-Navigation Tabs */
/* 메인 배너 바로 밑에 있는 탭 버튼 3종 */

// 탭 기능 초기화
function initBookTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const allbookRows = document.querySelectorAll(".book-row");

  // 탭이 없으면 종료 (all-books 페이지)
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
      allbookRows.forEach((row, i) => {
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

/* ***************************************************************** */
// 서브페이지 All Books 카테고리 탭 기능

// 탭 기능 초기화
function initCategoryTabs() {
  const categoryTabs = document.querySelectorAll(".category-tab");
  const bookItems = document.querySelectorAll(".book-item");

  console.log("카테고리 탭 개수:", categoryTabs.length);
  console.log("책 아이템 개수:", bookItems.length);

  if (categoryTabs.length === 0) {
    console.log("카테고리 탭 없음 - 메인 페이지");
    return;
  }

  console.log("카테고리 탭 초기화 완료");

  // 각 탭에 클릭 이벤트 추가
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      console.log("탭 클릭:", this.textContent.trim());

      // 모든 탭에서 active 제거
      categoryTabs.forEach((t) => t.classList.remove("active"));

      // 클릭한 탭에 active 추가
      this.classList.add("active");

      // 탭 텍스트 가져오기
      const category = this.textContent.trim();

      // 책 필터링
      bookItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (category === "All") {
          item.style.display = "block";
        } else if (category === "아무튼 시리즈" && itemCategory === "아무튼") {
          item.style.display = "block";
        } else if (category === "점선면 시리즈" && itemCategory === "점선면") {
          item.style.display = "block";
        } else if (category === "위고의 그림책" && itemCategory === "그림책") {
          item.style.display = "block";
        } else if (category === "인기순" && itemCategory === "인기") {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
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
// 페이지 로드 완료 메시지

window.addEventListener("load", function () {
  console.log("위고 출판사 페이지 로드 완료");
});