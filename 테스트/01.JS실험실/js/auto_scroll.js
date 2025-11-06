// 자동 스크롤 JS - auto_scroll.js /////////

// 나의 함수 불러오기
import myFn from "./my_function.js";

// 1. 사용할 이벤트 : wheel
// -> scroll 이벤트는 스크롤바기 움직일때 발생
// -> wheel 이벤트는 마우스 휠이 움직일때 발생

// 2. 이벤트 대상 : window

// 3. body에 overflow:hidden 셋팅
document.body.style.overflow = "hidden";

// 4. html에 scroll-behavior:smooth 셋팅
document.documentElement.style.scrollBehavior = "smooth";
// -> html 최상위 요소는 document.documentElement 로 선택함!

// 5. 새로고침시 스크롤위치 맨위로 이동하기
setTimeout(() => {
  window.scrollTo(0, 0);
}, 400);

// 6. 전역 페이지번호
let pgNo = 0;

// 7. 이동단위 -> 윈도우 높이값
let winH = window.innerHeight;

// 8. 전체 .page인 페이지개수 구하기 - 페이지 증가 한계값으로 사용
const page = document.querySelectorAll(".page");
const pageCnt = page.length;

console.log("페이지개수:", pageCnt);

// 9. 메뉴 및 인디케이터 요소 li수집
const gnb = document.querySelectorAll(".gnb li");
const indic = document.querySelectorAll(".indic li");

// 10. 휠 이벤트를 window에 적용하여 기본 휠작동 막기
// -> 그래야 우리가 원하는 자동 스크롤 기능을 구현할 수 있다
window.addEventListener(
  "wheel",
  (e) => {
    // e - 이벤트 전달변수
    // (1) 기본 기능 막기
    e.preventDefault();
    // -> window / document / body 에서 기본기능막기를 할때
    // passive 모드값을 false로 설정해야 에러가 발생하지 않음

    // (1.5) 광휠막기
    if (blockWheel()) return;

    // (2) 휠 방향 알아내기
    // 이벤트객체.wheelDelta
    let dir = e.wheelDelta;
    // 아래쪽은 음수, 윗쪽은 양수

    // (3) 방향에 따른 페이지번호 증감
    if (dir < 0) {
      //  아랫방향 음수
      pgNo++; // 페이지번호 증가
      if (pgNo >= pageCnt) pgNo = pageCnt - 1; // 한계값 고정
    } /// if ///
    else if (dir > 0) {
      // 윗방향 양수
      pgNo--; // 페이지번호 감소
      if (pgNo < 0) pgNo = 0; // 한계값 고정
    } /// else if ///

    console.log("휠~~~~!", pgNo);

    // (4) 전체 포지션이동
    window.scrollTo(0, pgNo * winH);

    // (5) 메뉴 클래스 on 넣기
    for (let x of gnb) x.classList.remove("on");
    gnb[pgNo].classList.add("on");
    for (let y of indic) y.classList.remove("on");
    indic[pgNo].classList.add("on");
  },
  { passive: false }
); //////////// wheel 이벤트 //////////////
// addEventListener(이벤트명,함수,{passive:false});

// 11. 메뉴 클릭시 이동 및 클래스 on 넣기
gnb.forEach((x, i) => {
  // x - 요소, i - 순번
  x.addEventListener("click", (e) => {
    // (1) 기본 기능 막기
    e.preventDefault();

    // (2) 현재 페이지번호 업데이트
    pgNo = i;

    // (3) 전체 포지션이동
    window.scrollTo(0, pgNo * winH);

    // (4) 메뉴 클래스 on 넣기
    for (let x of gnb) x.classList.remove("on");
    gnb[pgNo].classList.add("on");

    // (5) 인디케이터 클래스 on 넣기
    for (let y of indic) y.classList.remove("on");
    indic[pgNo].classList.add("on");
  });
}); ///////////// forEach //////////////

// 12. 인디케이터 클릭시 이동 및 클래스 on 넣기
indic.forEach((x, i) => {
  // x - 요소, i - 순번
  x.addEventListener("click", (e) => {
    // (1) 기본 기능 막기
    e.preventDefault();

    // (2) 현재 페이지번호 업데이트
    pgNo = i;

    // (3) 전체 포지션이동
    window.scrollTo(0, pgNo * winH);

    // (4) 메뉴 클래스 on 넣기
    for (let x of gnb) x.classList.remove("on");
    gnb[pgNo].classList.add("on");

    // (5) 인디케이터 클래스 on 넣기
    for (let y of indic) y.classList.remove("on");
    indic[pgNo].classList.add("on");
  });
}); ///////////// forEach //////////////

/******************************** 
////////// 광휠금지함수 //////////
********************************/
// [1] 광휠금지상태변수 ///////////
let stopWheel = false;
// 값이 true일때 휠릭허용/ false면 불허용

// [2] 광휠금지해제시간 상수셋팅 //////
const TIME_GAP = 400;

// [3] 광휠금지함수 //////////////////
function blockWheel() {
  // 1. 광휠이면 true 를 리턴함!
  if (stopWheel) return true;

  // 2. 휠가능상태이면 전역변수 셋팅
  stopWheel = true;
  setTimeout(() => {
    stopWheel = false;
  }, TIME_GAP);

  // 3. 상태값 리턴 (휠가능상태 false)
  return false;
} ////// blockWheel 함수 ///////

/********************************************************* 
    [ 모바일 이벤트처리 ]
    
    [ 모바일 터치 스크린에서 사용하는 이벤트 종류 ]
    1. touchstart - 손가락이 화면에 닿을때 발생
    2. touchend - 손가락이 화면에서 떨어질때 발생
    3. touchmove - 손가락이 화면에 닿은채로 움직일때 발생
    
    [ 화면터치 이벤트관련 위치값 종류 ]
    1. screenX, screenY : 
        디바이스 화면을 기준한 x,y 좌표
    2. clientX, clientY : 
        브라우저 화면을 기준한 x,y 좌표(스크롤미포함)
    3. pageX, pageY : 
        스크롤을 포함한 브라우저 화면을 기준한 x,y 좌표
*********************************************************/
// 1. 모바일 이벤트 등록하기 //////////
myFn.addEvt(window, "touchstart", touchStartFn);
myFn.addEvt(window, "touchend", touchEndFn);

// 터치시 위치값 변수
// mPosStart 시작위치 / mPosEnd 끝위치
let mPosStart = 0,
  mPosEnd = 0;

// 2. 모바일 이벤트함수 만들기 /////////
function touchStartFn(e) {
  // 필요한 위치값은 Y축
  mPosStart = e.touches[0].screenY;
  // event.touches는 모바일 터치정보를 담고 있음
  // 위치정보는 0번째 주소에 모두 종류별로 있음
  // console.log('터치시작!', mPosStart, e.touches);
} /////////// touchStartFn 함수 ///////////

function touchEndFn(e) {
  // 1. 필요한 위치값은 Y축
  mPosEnd = e.changedTouches[0].screenY;
  // 처음 터치위치값과 변경된 터치위치값은 다른곳에 담긴다!
  // 바로 changedTouches를 사용해야 읽을 수 있다!

  // 2. 위치차 : 처음위치 - 나중위치
  let diffValue = mPosStart - mPosEnd;
  // console.log('터치끝!', mPosEnd, '/차이수:',diffValue);

  // 3. 위치차 값이 양수이면 아래쪽이동(음수는 윗쪽이동)
  if (diffValue > 0) {
    console.log("아랫방향이동!");
    pgNo++;
  } //// if /////
  else if (diffValue < 0) {
    console.log("윗방향이동!");
    pgNo--;
  } ///// else if ///

  // 4. 한계값 체크 (0과 페이지끝번호 기준) ///////
  if (pgNo < 0) pgNo = 0;
  else if (pgNo > pageCnt - 1) pgNo = pageCnt - 1;

  // 5. 페이지 이동하기 /////////
  window.scrollTo(0, winH * pgNo);

  // 6. 페이지번호와 일치하는 GNB와 인디케이터에 클래스on넣기
  for (let x of gnb) x.classList.remove("on");
  gnb[pgNo].classList.add("on");
  for (let y of indic) y.classList.remove("on");
  indic[pgNo].classList.add("on");
} //////// touchEndFn 함수 ///////////////
