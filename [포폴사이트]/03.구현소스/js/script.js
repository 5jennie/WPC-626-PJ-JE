// 기본 셋팅 파일

// ************************ header 불러오기 *************************
fetch("./inc/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("nav").innerHTML = data;

    // 현재 페이지가 서브 페이지 인지 확인하기
    const isSubPage =
      !window.location.pathname.includes("index.html") &&
      window.location.pathname !== "/" &&
      window.location.pathname.endsWith(".html");

    // Home 링크 설정
    const homeLink = document.querySelector('.nav a[href="#main"]');
    if (homeLink && isSubPage) {
      // 서브페이지에서는 index.html로 이동
      homeLink.href = "./index.html";
      homeLink.removeAttribute("data-scroll"); // 스크롤 속성 제거
    }

    // 부드러운 스크롤 효과
    document.querySelectorAll('.nav a[href^="#"]').forEach((anchor) => {
      // 서브페이지에서 ./index.html로 변경된 링크는 제외
      // 페이지 이동 링크는 preventDefault 하지 않음
      if (anchor.getAttribute("href").startsWith("./")) {
        return;
      }

      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    const cursor = document.querySelector(".custom-cursor");
    document.querySelectorAll(".nav a").forEach((element) => {
      element.addEventListener("mouseenter", () =>
        cursor.classList.add("active")
      );
      element.addEventListener("mouseleave", () =>
        cursor.classList.remove("active")
      );
    });
  });

// ************************ footer 불러오기 *************************

fetch("./inc/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

// ************************ 반응 셋팅 *************************

// 페이지 로드 시 최상단으로 이동
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// 히스토리 사용 시에도 최상단으로 이동
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// 부드러운 스크롤 기능
document.documentElement.style.scrollBehavior = "smooth";

// ******************** 마우스 커서 커스텀 ********************

window.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".custom-cursor");

  if (cursor) {
    // 마우스 위치 저장 변수
    let mouseX = 0;
    let mouseY = 0;

    // 마우스 이동 시 좌표 업데이트
    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // 커서를 마우스 위치로 부드럽게 이동
    function updateCursor() {
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // 인터랙티브 요소에 호버 시 커서 확대 효과
    document
      .querySelectorAll(
        "a, canvas, .scroll-guide, .project-images-slider1, .project-images-slider2, .project-images-slider3, .more-images, .more-click"
      )
      .forEach((element) => {
        // 마우스 올리면 커서에 'active' 클래스 추가 (확대)
        element.addEventListener("mouseenter", function () {
          cursor.classList.add("active");
        });

        // 마우스 벗어나면 'active' 클래스 제거 (원래 크기)
        element.addEventListener("mouseleave", function () {
          cursor.classList.remove("active");
        });
      });
  }
});

// //////////////////////// 메인 index 셋팅 ////////////////////////
// ************************ 메인 - gif 설정 ************************

// 메인 gif 애니메이션
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("je-gif");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // 애니메이션 프레임 설정
  // 총 프레임 수
  const totalFrames = 20;
  // 프레임 배열과 현재 프레임 인덱스
  const frames = [];
  // 현재 표시 중인 프레임 번호
  let currentFrame = 0;
  // 애니메이션 재생 상태
  let isPlaying = true;
  // 로드된 이미지 개수
  let imagesLoaded = 0;
  // 마지막 프레임 표시 시간
  let lastFrameTime = 0;
  // 프레임 간 딜레이 (약 0초)
  const frameDelay = 1000 / 6;

  // gif캔버스 크기 설정
  canvas.width = 400;
  canvas.height = 400;

  // 모든 프레임 이미지 미리 로드
  for (let i = 1; i <= totalFrames; i++) {
    const img = new Image();
    // 이미지 로드 완료 시 카운트 증가
    img.src = `./img/animation/144ppi/je_ani_${i}.png`;
    img.onload = function () {
      imagesLoaded++;
      // 모든 이미지가 로드되면 애니메이션 시작
      if (imagesLoaded === totalFrames) {
        animate(0);
      }
    };
    frames.push(img);
  }

  // 애니메이션 재생 함수
  function animate(timestamp) {
    // 재생이 멈춘 상태면 중단
    if (!isPlaying) return;

    // 프레임 딜레이만큼 시간이 지나면 다음 프레임으로
    if (timestamp - lastFrameTime >= frameDelay) {
      // 이전 프레임 지우기
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 현재 프레임 그리기
      ctx.drawImage(frames[currentFrame], 0, 0, canvas.width, canvas.height);

      // 다음 프레임으로 이동 (마지막 프레임이면 처음으로)
      currentFrame = (currentFrame + 1) % totalFrames;
      lastFrameTime = timestamp;
    }

    // 다음 프레임 요청
    requestAnimationFrame(animate);
  }

  // 마우스가 캔버스에 올라가면 애니메이션 일시정지
  canvas.addEventListener("mouseenter", function () {
    isPlaying = false;
  });

  // 마우스가 캔버스에서 벗어나면 애니메이션 재개
  canvas.addEventListener("mouseleave", function () {
    isPlaying = true;
    lastFrameTime = 0;
    requestAnimationFrame(animate);
  });
});

// *************** 메인 - 스티커 패럴랙스 & 드래그 효과 ***************

// 스티커 패럴랙스 효과
document.addEventListener("DOMContentLoaded", function () {
  const stickers = document.querySelectorAll(".sticker");

  // 드래그 관련 변수
  let isDragging = false; // 드래그 중인지 확인
  let currentSticker = null; // 현재 드래그 중인 스티커
  let offsetX = 0; // 스티커 내 클릭 위치 X
  let offsetY = 0; // 스티커 내 클릭 위치 Y

  if (stickers.length > 0) {
    // 마우스 이동에 따른 패럴랙스 효과
    document.addEventListener("mousemove", function (e) {
      // 드래그 중일 때는 드래그 처리
      if (isDragging && currentSticker) {
        // 마우스 위치에서 오프셋을 빼서 스티커 위치 계산
        const newLeft = e.clientX - offsetX;
        const newTop = e.clientY - offsetY;

        // 스티커를 absolute 위치로 변경하여 자유롭게 이동
        currentSticker.style.left = newLeft + "px";
        currentSticker.style.top = newTop + "px";
        currentSticker.style.transform = "none"; // 패럴랙스 효과 제거

        return; // 드래그 중에는 패럴랙스 효과 비활성화
      }

      // 드래그 중이 아닐 때만 패럴랙스 효과 적용
      // 마우스 위치를 0~1 사이 값으로 정규화
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      // 각 스티커에 패럴랙스 효과 적용
      stickers.forEach((sticker) => {
        // 드래그로 이동한 스티커는 패럴랙스 효과 제외
        if (sticker.dataset.dragged === "true") return;

        // 각 스티커의 이동 속도 가져오기
        const speed = parseFloat(sticker.getAttribute("data-speed")) || 0.5;

        // 마우스 반대 방향으로 이동 거리 계산 (패럴랙스 효과)
        const moveX = (mouseX - 0.5) * -50 * speed;
        const moveY = (mouseY - 0.5) * -50 * speed;

        // transform 속성으로 스티커 위치 이동
        sticker.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });

    // 스티커에 드래그 기능 추가
    stickers.forEach((sticker) => {
      // 마우스 클릭 시작 (드래그 시작)
      sticker.addEventListener("mousedown", function (e) {
        isDragging = true;
        currentSticker = sticker;

        // 스티커 내에서 클릭한 위치 계산
        const rect = sticker.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        // 드래그 중임을 표시
        sticker.style.cursor = "grabbing";
        sticker.style.zIndex = "5"; // 다른 스티커 위로

        // 드래그 중에는 패럴랙스 효과 비활성화
        sticker.dataset.dragged = "true";

        e.preventDefault(); // 기본 드래그 동작 방지
      });

      // 스티커에 마우스 올리면 커스텀 커서 활성화
      sticker.addEventListener("mouseenter", function () {
        const cursor = document.querySelector(".custom-cursor");
        if (cursor) {
          cursor.classList.add("active");
        }
        // 드래그 가능함을 나타내는 커서
        if (!isDragging) {
          sticker.style.cursor = "grab";
        }
      });

      // 스티커에서 마우스 벗어나면 커스텀 커서 원래대로
      sticker.addEventListener("mouseleave", function () {
        const cursor = document.querySelector(".custom-cursor");
        if (cursor) {
          // 커스텀 커서 확대 효과 제거 (원래 크기로)
          cursor.classList.remove("active");
        }
      });
    });

    // 마우스 버튼을 놓으면 드래그 종료
    document.addEventListener("mouseup", function () {
      if (isDragging && currentSticker) {
        // 드래그 상태 해제
        isDragging = false;
        // 커서를 grabbing(잡는 중)에서 grab(잡을 수 있음)으로 변경
        currentSticker.style.cursor = "grab";
        // 현재 드래그 중인 스티커 초기화
        currentSticker = null;
      }
    });

    // 마우스가 화면 밖으로 나가도 드래그 종료
    document.addEventListener("mouseleave", function () {
      if (isDragging && currentSticker) {
        // 드래그 상태 해제
        isDragging = false;
        // 커서를 grabbing에서 grab으로 변경
        currentSticker.style.cursor = "grab";
        // 현재 드래그 중인 스티커 초기화
        currentSticker = null;
      }
    });
  }
});

// ********************* 메인 - 스크롤 애니메이션 *********************

// Intersection Observer 옵션 설정
const observerOptions = {
  // threshold: 요소가 10% 이상 보일 때 감지
  threshold: 0.1,
  // rootMargin: 하단에서 100px 전에 미리 감지 (페이드인 효과를 위해)
  rootMargin: "0px 0px -100px 0px",
};

// 요소가 화면에 보이면 'visible' 클래스 추가
const observer = new IntersectionObserver(function (entries) {
  // 관찰 중인 모든 요소를 순회
  entries.forEach((entry) => {
    // 요소가 화면에 보이는 경우
    if (entry.isIntersecting) {
      // 'visible' 클래스 추가 (CSS 애니메이션 트리거)
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Works 섹션 관찰 시작
document.addEventListener("DOMContentLoaded", function () {
  // Works 섹션 요소 선택
  const worksSection = document.querySelector(".works-section");
  // Works 섹션이 존재하면
  if (worksSection) {
    // Observer에 등록하여 스크롤 감지 시작
    observer.observe(worksSection);
  }
});

// *************** 메인 - 프로젝트 이미지 랜덤 크기 생성 ***************

// 이미지 원본 비율을 자동으로 계산하여 크기 조정
document.addEventListener("DOMContentLoaded", function () {
  // 프로젝트별 설정
  const projects = [
    {
      container: ".project-images-slider1",
      images: [
        "./img/project/project (1).jpg",
        "./img/project/project (2).jpg",
        "./img/project/project (3).jpg",
        "./img/project/project (4).jpg",
        "./img/project/project (5).jpg",
        "./img/project/project (6).jpg",
        "./img/project/project (7).jpg",
      ],
      minWidth: 300,
      maxWidth: 600,
      count: 15, // 총 이미지 개수 (같은 이미지 반복)
    },
    {
      container: ".project-images-slider2",
      images: [
        "./img/project/project (8).jpg",
        "./img/project/project (9).jpg",
        "./img/project/project (10).jpg",
        "./img/project/project (11).jpg",
        "./img/project/project (12).jpg",
        "./img/project/project (13).jpg",
        "./img/project/project (14).jpg",
      ],
      minWidth: 300,
      maxWidth: 600,
      count: 15,
    },
    {
      container: ".project-images-slider3",
      images: [
        "./img/project/project (15).jpg",
        "./img/project/project (16).jpg",
        "./img/project/project (1).jpg",
        "./img/project/project (4).jpg",
        "./img/project/project (5).jpg",
        "./img/project/project (6).jpg",
        "./img/project/project (7).jpg",
      ],
      minWidth: 300,
      maxWidth: 600,
      count: 15,
    },
  ];

  // 이미지 원본 크기를 가져와서 비율 계산하는 함수
  function loadImageWithRatio(imagePath, minWidth, maxWidth) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = function () {
        const aspectRatio = this.naturalHeight / this.naturalWidth;
        const isHorizontal = this.naturalWidth >= this.naturalHeight;

        // 가로형 이미지: maxWidth 기준, 세로형 이미지: minWidth 기준
        let targetWidth;
        if (isHorizontal) {
          // 가로형: maxWidth 기준으로 랜덤 생성 (maxWidth의 80~100%)
          targetWidth =
            Math.ceil(Math.random() * (maxWidth * 0.2)) + maxWidth * 0.8;
        } else {
          // 세로형: minWidth 기준으로 랜덤 생성 (minWidth의 100~120%)
          targetWidth = Math.ceil(Math.random() * (minWidth * 0.2)) + minWidth;
        }
        const calculatedHeight = Math.ceil(targetWidth * aspectRatio);

        resolve({
          width: targetWidth,
          height: calculatedHeight,
          src: imagePath,
        });
      };
      img.src = imagePath;
    });
  }

  // 각 프로젝트의 이미지를 원본 비율로 생성
  projects.forEach(async (project) => {
    const container = document.querySelector(project.container);
    if (!container) return;

    const imagePromises = [];

    // 이미지 생성 (2세트 - 무한 루프용)
    for (let set = 0; set < 2; set++) {
      for (let i = 0; i < project.count; i++) {
        // 이미지 배열에서 순환하여 선택
        const imageIndex = i % project.images.length;
        const imagePath = project.images[imageIndex];

        // minWidth, maxWidth를 함수에 전달하여 이미지 비율에 따라 처리
        imagePromises.push(
          loadImageWithRatio(imagePath, project.minWidth, project.maxWidth)
        );
      }
    }

    // 모든 이미지 정보를 가져온 후 HTML 생성
    const imageData = await Promise.all(imagePromises);

    let htmlCode = "";
    imageData.forEach((data, index) => {
      htmlCode += `
        <img 
          src="${data.src}" 
          alt="Project Image ${index + 1}"
          style="width: ${data.width}px; height: ${
        data.height
      }px; object-fit: cover;"
        >
      `;
    });

    // HTML에 삽입
    container.innerHTML = htmlCode;

    // *************** 드래그로 슬라이더 이동 ***************

    // 스크롤 가능한 부모 요소 (.project-slider-container)
    const wrapper = container.parentElement;

    // 드래그 상태 변수들
    let isDown = false; // 마우스를 누르고 있는지 여부
    let startX; // 드래그 시작 시 마우스 X 좌표
    let scrollLeft; // 드래그 시작 시 스크롤 위치
    let velocity = 0; // 드래그 속도 (관성 효과용)
    let lastX = 0; // 이전 마우스 X 좌표
    let lastTime = 0; // 이전 시간
    let momentumId; // 관성 애니메이션 ID

    // 마우스 버튼을 누를 때 (드래그 시작)
    wrapper.addEventListener("mousedown", (e) => {
      isDown = true; // 드래그 상태 활성화
      startX = e.pageX; // 시작 X 좌표 저장
      scrollLeft = wrapper.scrollLeft; // 현재 스크롤 위치 저장
      lastX = e.pageX; // 속도 계산용 X 좌표 저장
      lastTime = Date.now(); // 속도 계산용 시간 저장
      velocity = 0; // 속도 초기화
      cancelAnimationFrame(momentumId); // 진행 중인 관성 효과 중단
      wrapper.classList.add("active"); // 드래그 중 스타일 적용
      container.style.animationPlayState = "paused"; // 자동 슬라이드 애니메이션 일시정지
    });

    // 마우스가 영역을 벗어나거나 버튼을 놓을 때 드래그 종료
    wrapper.addEventListener("mouseleave", stopDrag);
    wrapper.addEventListener("mouseup", stopDrag);

    // 마우스 이동 시 (드래그 중)
    wrapper.addEventListener("mousemove", (e) => {
      // 드래그 중이 아니면 무시
      if (!isDown) return;
      e.preventDefault(); // 기본 동작 방지 (텍스트 선택 등)

      const x = e.pageX; // 현재 마우스 X 좌표
      const walk = x - startX; // 시작점부터 이동한 거리
      wrapper.scrollLeft = scrollLeft - walk; // 스크롤 위치 업데이트 (반대 방향)

      // 속도 계산 (관성 효과에 사용)
      const now = Date.now(); // 현재 시간
      const delta = now - lastTime; // 이전 측정 시간과의 차이
      const dx = x - lastX; // 이동 거리
      velocity = dx / delta; // 속도 = 거리 / 시간 (px/ms)
      lastX = x; // 현재 X 좌표를 이전 좌표로 저장
      lastTime = now; // 현재 시간을 이전 시간으로 저장
    });
    // 드래그 종료 처리 함수
    function stopDrag() {
      // 드래그 중이 아니면 무시
      if (!isDown) return;
      // 드래그 상태 해제
      isDown = false;
      // 드래그 중 스타일 제거
      wrapper.classList.remove("active");
      // 관성 효과 시작 (부드럽게 감속하며 멈춤)
      smoothMomentum();
    }

    // 관성 효과 (드래그 후 부드럽게 감속)
    function smoothMomentum() {
      const startVelocity = velocity * 10; // 시작 속도 (드래그 속도의 10배)
      const duration = 1500; // 감속 시간 (1.5초)
      const startTime = performance.now(); // 시작 시간 기록

      // EaseOutCubic: 점점 천천히 멈추는 곡선 함수
      function easeOutCubic(t) {
        // t: 0~1 사이의 진행률
        // 반환값: 부드러운 감속 곡선 (빠르게 시작 → 천천히 멈춤)
        return 1 - Math.pow(1 - t, 3);
      }

      // 관성 애니메이션 실행 함수
      function animate(now) {
        // 경과 시간 계산
        const elapsed = now - startTime;
        // 진행률 계산 (0~1, 최대 1을 넘지 않음)
        const progress = Math.min(elapsed / duration, 1);
        // Easing 함수 적용 (부드러운 감속 곡선)
        const eased = easeOutCubic(progress);

        // 남은 이동 거리 계산 (처음 속도에서 점점 줄어듦)
        const move = startVelocity * (1 - eased);
        // 스크롤 위치 업데이트
        wrapper.scrollLeft -= move;

        // 애니메이션이 끝나지 않았으면 계속 실행
        if (progress < 1) {
          momentumId = requestAnimationFrame(animate);
        } else {
          // 애니메이션 종료 후 자동 슬라이드 재개
          container.style.animationPlayState = "running";
        }
      }

      // 관성 애니메이션 시작
      requestAnimationFrame(animate);
    }
  });
});

// ************** 메인 - Works 섹션 애니메이션 **************

// Intersection Observer 옵션 설정
const projectObserverOptions = {
  // threshold: 요소가 20% 이상 보일 때 감지
  threshold: 0.2,
  // rootMargin: 하단에서 50px 전에 미리 감지 (페이드인 효과를 위해)
  rootMargin: "0px 0px -50px 0px",
};

// 프로젝트 아이템이 화면에 보이면 'visible' 클래스 추가하는 Observer 생성
const projectObserver = new IntersectionObserver(function (entries) {
  // 관찰 중인 모든 프로젝트 아이템을 순회
  entries.forEach((entry) => {
    // 프로젝트 아이템이 화면에 보이는 경우
    if (entry.isIntersecting) {
      // 'visible' 클래스 추가 (CSS 애니메이션 트리거)
      entry.target.classList.add("visible");
    }
  });
}, projectObserverOptions);

// 페이지 로드 시 모든 프로젝트 아이템 관찰 시작
document.addEventListener("DOMContentLoaded", function () {
  // Works 섹션의 모든 프로젝트 아이템 선택 (.project-item)
  const projectItems = document.querySelectorAll(".project-item");
  // 각 프로젝트 아이템을 Observer에 등록
  projectItems.forEach((item) => {
    // Observer에 등록하여 스크롤 감지 시작
    projectObserver.observe(item);
  });
});

// ******************* 메인 - Works 섹션 클릭 이벤트 *******************

// Works 섹션 프로젝트 클릭 시 상세 페이지로 이동
function setupMainPageProjectLinks() {
  // Works 섹션의 모든 프로젝트 아이템 선택
  const mainProjects = document.querySelectorAll(
    ".works-section .project-item"
  );

  // Works 섹션이 없으면 실행 안함 (다른 페이지)
  if (mainProjects.length === 0) return;

  // 각 프로젝트에 클릭 이벤트 추가
  mainProjects.forEach((project, index) => {
    // 커서를 포인터로 변경
    project.style.cursor = "pointer";
    // 프로젝트 ID 부여 (1, 2, 3)
    const projectId = index + 1;

    /* 드래그 감지 변수 */
    let isDragging = false; // 드래그 중인지 확인
    let startX = 0; // 드래그 시작 X 좌표
    let startY = 0; // 드래그 시작 Y 좌표

    // 마우스 버튼을 누를 때
    project.addEventListener("mousedown", function (e) {
      isDragging = false; // 드래그 상태 초기화
      startX = e.clientX; // 시작 X 좌표 저장
      startY = e.clientY; // 시작 Y 좌표 저장
    });

    // 마우스 이동 시
    project.addEventListener("mousemove", function (e) {
      // 마우스가 5px 이상 움직이면 드래그로 간주
      if (
        Math.abs(e.clientX - startX) > 5 ||
        Math.abs(e.clientY - startY) > 5
      ) {
        isDragging = true;
      }
    });

    // 클릭 시 상세 페이지로 이동 (드래그가 아닐 때만)
    project.addEventListener("click", function (e) {
      // 드래그 중이면 페이지 이동 안함
      if (isDragging) {
        e.preventDefault(); // 클릭 이벤트 취소
        return;
      }
      // 단순 클릭이면 상세 페이지로 이동
      window.location.href = `detail-page.html?id=${projectId}`;
    });

    // 마우스 버튼을 놓을 때 (드래그 종료)
    project.addEventListener("mouseup", function () {
      // 약간의 딜레이 후 드래그 상태 초기화
      setTimeout(() => {
        isDragging = false;
      }, 100);
    });
  });
}

// ******************* 메인 - More 섹션 애니메이션 *******************

// Intersection Observer 옵션 설정
const moreObserverOptions = {
  // threshold: 요소가 20% 이상 보일 때 감지
  threshold: 0.2,
  // rootMargin: 하단에서 50px 전에 미리 감지
  rootMargin: "0px 0px -50px 0px",
};

// More 섹션이 화면에 보이면 'visible' 클래스 추가하는 Observer 생성
const moreObserver = new IntersectionObserver(function (entries) {
  // 관찰 중인 모든 요소를 순회
  entries.forEach((entry) => {
    // More 섹션이 화면에 보이는 경우
    if (entry.isIntersecting) {
      // 'visible' 클래스 추가 (CSS 애니메이션 트리거)
      entry.target.classList.add("visible");
    }
  });
}, moreObserverOptions);

// More 섹션 관찰 시작
document.addEventListener("DOMContentLoaded", function () {
  // More 컨테이너 요소 선택
  const moreContainer = document.querySelector(".more-container");
  // More 섹션이 존재하면
  if (moreContainer) {
    // Observer에 등록하여 스크롤 감지 시작
    moreObserver.observe(moreContainer);
  }
});

// ******************* 메인 - More 섹션 클릭 이벤트 *******************

// More 섹션 이미지 클릭 시 상세 페이지로 이동
function setupMoreSectionLinks() {
  // More 섹션의 모든 이미지 div 선택
  const moreImages = document.querySelectorAll(".more-images > div");

  // More 섹션이 없으면 실행 안함
  if (moreImages.length === 0) return;

  // 각 이미지에 클릭 이벤트 추가
  moreImages.forEach((imageDiv, index) => {
    // 커서를 포인터로 변경
    imageDiv.style.cursor = "pointer";
    // 프로젝트 ID 부여 (4~18, 총 15개)
    const projectId = index + 4;

    // 클릭 시 상세 페이지로 이동
    imageDiv.addEventListener("click", function () {
      window.location.href = `detail-page.html?id=${projectId}`;
    });
  });
}

// 메인 페이지에서만 클릭 이벤트 실행
if (
  document.querySelector(".works-section") ||
  document.querySelector(".more-images")
) {
  document.addEventListener("DOMContentLoaded", function () {
    // Works 섹션 클릭 이벤트 설정
    setupMainPageProjectLinks();
    // More 섹션 클릭 이벤트 설정
    setupMoreSectionLinks();
  });
}

// ******************* 서브 페이지 셋팅 (Works) *******************

// 페이지네이션 전역 변수
let allProjects = []; // 전체 프로젝트 데이터 저장
let currentPage = 1; // 현재 페이지 번호
const itemsPerPage = 9; // 한 페이지에 표시할 프로젝트 개수
let currentCategory = "all"; // 현재 선택된 카테고리

// 프로젝트 데이터 로드
async function loadProjects() {
  try {
    // projects.json 파일에서 데이터 가져오기
    const response = await fetch("./data/projects.json");
    const data = await response.json();
    // 전역 변수에 프로젝트 데이터 저장
    allProjects = data.projects;
    // 프로젝트 렌더링
    renderProjects();
    // 카테고리 필터 설정
    setupCategoryFilter();
    // 페이지네이션 버튼 설정
    setupPagination();
  } catch (error) {
    console.error("프로젝트 데이터 로드 실패:", error);
  }
}

// 현재 페이지와 카테고리에 맞는 프로젝트만 렌더링
function renderProjects() {
  // 프로젝트 그리드 컨테이너 선택
  const grid = document.querySelector(".projects-grid");
  if (!grid) return;

  // 기존 내용 초기화
  grid.innerHTML = "";

  // 카테고리 필터링 (all이면 전체, 아니면 해당 카테고리만)
  const filteredProjects =
    currentCategory === "all"
      ? allProjects
      : allProjects.filter((project) => project.category === currentCategory);

  // 페이지네이션 계산
  const startIndex = (currentPage - 1) * itemsPerPage; // 시작 인덱스
  const endIndex = startIndex + itemsPerPage; // 끝 인덱스
  const projectsToShow = filteredProjects.slice(startIndex, endIndex); // 현재 페이지에 표시할 프로젝트

  // 프로젝트 카드 생성 및 렌더링
  projectsToShow.forEach((project) => {
    // 카드 div 생성
    const card = document.createElement("div");
    card.className = "project-card";
    // 카테고리 저장 (필터링용)
    card.dataset.category = project.category;
    // 프로젝트 ID 저장
    card.dataset.projectId = project.id;
    // 커서를 포인터로 변경
    card.style.cursor = "pointer";

    // 카드 내용 HTML 생성
    card.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="Project ${project.id}" />
      </div>
      <div class="project-info">
        <p class="project-description">${project.description}</p>
        <span class="project-tag">${project.tag}</span>
      </div>
    `;

    // 카드 클릭 시 상세 페이지로 이동
    card.addEventListener("click", function () {
      window.location.href = `detail-page.html?id=${project.id}`;
    });

    // 그리드에 카드 추가
    grid.appendChild(card);
  });

  // 페이지네이션 버튼 표시/숨김 처리
  updatePaginationVisibility(filteredProjects.length);
}

// 카테고리 필터 설정
function setupCategoryFilter() {
  // 모든 카테고리 탭 버튼 선택
  const tabButtons = document.querySelectorAll(".tab-btn");

  // 각 탭 버튼에 클릭 이벤트 추가
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 클릭한 탭의 카테고리 가져오기
      const category = this.getAttribute("data-category");

      // 모든 탭에서 active 클래스 제거
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      // 클릭한 탭에 active 클래스 추가
      this.classList.add("active");

      // 카테고리 변경 및 첫 페이지로 이동
      currentCategory = category;
      currentPage = 1; // 카테고리 변경 시 첫 페이지로 리셋
      // 프로젝트 다시 렌더링
      renderProjects();
    });
  });
}

// 페이지네이션 버튼 설정
function setupPagination() {
  // 이전/다음 버튼 선택
  const prevBtn = document.querySelector(".pagination-btn.prev");
  const nextBtn = document.querySelector(".pagination-btn.next");

  // 이전 버튼 클릭 이벤트
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      // 현재 카테고리의 필터링된 프로젝트 목록
      const filteredProjects =
        currentCategory === "all"
          ? allProjects
          : allProjects.filter(
              (project) => project.category === currentCategory
            );

      // 첫 페이지가 아니면 이전 페이지로 이동
      if (currentPage > 1) {
        currentPage--;
        renderProjects();
        // 페이지 상단으로 스크롤
        scrollToTop();
      }
    });
  }

  // 다음 버튼 클릭 이벤트
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      // 현재 카테고리의 필터링된 프로젝트 목록
      const filteredProjects =
        currentCategory === "all"
          ? allProjects
          : allProjects.filter(
              (project) => project.category === currentCategory
            );

      // 전체 페이지 수 계산
      const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

      // 마지막 페이지가 아니면 다음 페이지로 이동
      if (currentPage < totalPages) {
        currentPage++;
        renderProjects();
        // 페이지 상단으로 스크롤
        scrollToTop();
      }
    });
  }
}

// 페이지네이션 버튼 표시/숨김
function updatePaginationVisibility(totalItems) {
  // 페이지네이션 컨테이너 선택
  const pagination = document.querySelector(".pagination");
  if (!pagination) return;

  // 프로젝트가 9개 이하면 페이지네이션 숨김
  if (totalItems <= itemsPerPage) {
    pagination.style.display = "none";
  } else {
    // 10개 이상이면 페이지네이션 표시
    pagination.style.display = "flex";
  }
}

// 페이지 상단으로 부드럽게 스크롤
function scrollToTop() {
  window.scrollTo({
    top: 0, // 최상단으로
    behavior: "smooth", // 부드러운 스크롤
  });
}

// Works 페이지에서만 데이터 로드 실행
if (document.querySelector(".projects-grid")) {
  document.addEventListener("DOMContentLoaded", loadProjects);
}

// ************************************************************
