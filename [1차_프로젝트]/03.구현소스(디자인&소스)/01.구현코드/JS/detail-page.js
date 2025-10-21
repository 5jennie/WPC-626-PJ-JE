// detail-page.js

// 컴포넌트 로드 함수
async function loadComponent(selector, file) {
  try {
    const response = await fetch(file);
    const html = await response.text();
    document.querySelector(selector).innerHTML = html;

    // 헤더 로드 후 언어 버튼 초기화
    if (selector === "#header") {
      initLanguageButtons();
    }
  } catch (error) {
    console.error(`${file} 로드 실패:`, error);
  }
}

// Header와 Footer 로드
loadComponent("#header", "./inc/hero.html");
loadComponent("#footer", "./inc/footer.html");

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

// 스크롤 효과
const scbody = document.body.classList;

window.addEventListener("scroll", () => {
  let scTop = window.scrollY;

  if (scTop > 300) {
    scbody.add("on3");
    scbody.remove("on1", "on2");
  } else if (scTop > 200) {
    scbody.add("on2");
    scbody.remove("on1", "on3");
  } else if (scTop > 100) {
    scbody.add("on1");
    scbody.remove("on2", "on3");
  } else {
    scbody.remove("on1", "on2", "on3");
  }
});

// 탭 메뉴 기능 (상세페이지용)
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-menu button");
  
  tabButtons.forEach(button => {
    button.addEventListener("click", function () {
      tabButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  console.log("상세페이지 로드 완료");
});