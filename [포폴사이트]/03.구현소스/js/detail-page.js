// 디테일 페이지 셋팅

// URL에서 프로젝트 ID 가져오기
function getProjectIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// 프로젝트 상세 정보 로드
async function loadProjectDetail() {
  const projectId = getProjectIdFromURL();

  if (!projectId) {
    console.error("프로젝트 ID가 없습니다.");
    return;
  }

  try {
    const response = await fetch("./data/projects.json");
    const data = await response.json();

    const project = data.projects.find((p) => p.id === parseInt(projectId));

    if (project) {
      renderProjectDetail(project);
    } else {
      console.error("프로젝트를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("프로젝트 데이터 로드 실패:", error);
  }
}

/* 프로젝트 상세 정보 렌더링 */
function renderProjectDetail(project) {
  const detailPage = document.querySelector("#detail-page");
  if (!detailPage) return;

  // 기존 내용 초기화
  detailPage.innerHTML = "";

  // 메인 이미지
  const mainImageDiv = document.createElement("div");
  mainImageDiv.className = "detail-img-m";
  mainImageDiv.innerHTML = `<img src="${project.detailMainImage}" alt="Project ${project.id}" />`;
  detailPage.appendChild(mainImageDiv);

  // 서브 이미지들
  if (project.detailSubImages && project.detailSubImages.length > 0) {
    const subImagesDiv = document.createElement("div");
    subImagesDiv.className = "detail-img-sb";

    project.detailSubImages.forEach((imgSrc) => {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = `Project ${project.id} detail`;
      subImagesDiv.appendChild(img);
    });

    detailPage.appendChild(subImagesDiv);
  }
}

/* 페이지 로드 시 실행 */
if (document.querySelector("#detail-page")) {
  document.addEventListener("DOMContentLoaded", loadProjectDetail);
}
