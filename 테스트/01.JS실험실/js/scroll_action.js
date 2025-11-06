// JS실험실 : 04.스크롤액션 JS

// 나의 함수 불러오기
import myFn from "./my_function.js";

// 글자등장 함수 불러오기
import callLetter from "./call_letter.js";

// console.log(callLetter);

// 부드러운 스크롤 함수 불러오기
import startSS from "./smoothScroll23.js";

// 부드러운 스크롤 함수호출
startSS();


// 글자등장함수 호출하기
callLetter(".stage", "신카이 마코토", 1500);

/**************************************************** 
    [ 스크롤 이벤트를 활용한 요소 등장액션 기능구현하기 ]

  1. 사용 이벤트 : scroll
  -> 스크롤 바가 있는 페이지에서 또는 부분박스에서
  스크롤 바가 이동할때 발생하는 이벤트
  -> 주의: wheel 이벤트와는 다르다! 무엇이?
  스크롤바가 이동하지 않아도 마우스 휠이 작동될때 발생한다!
  (휠이벤트는 모바일에서 사용불가!)

  2. 스크롤바 위치값 알아내기 : 세로방향(Y축)
    (1) window.scrollY (IE6~11지원안함)
    (2) document.scrollingElement.scrollTop
    (3) document.documentElement.scrollTop
    (4) document.querySelector('html').scrollTop
    -> 가로방향 스크롤바는 Y대신 X라는 문자를 사용함!

  3. 스크롤 등장 대상요소의 보이는 화면에서의 top값
    getBoundingClientRect().top
    -> 보이는 화면상단을 기준으로 이것보다 위로 갈경우
    마이너스값을 리턴한다!
    -> 기준: 보이는 화면크기를 기준하면 된다!
    -> 윈도우화면 전체: window.innerHeight
    예) 화면의 3/2는 window.innerHeight/3*2
    예) 화면의 4/3는 window.innerHeight/4*3

    ((메서드명 조어 분석))
    getBoundingClientRect()
    get 가져와라
    Bounding 경계선 (->바운딩박스 - 경계선을 가지는 직사각형박스)
    Client 보이는 화면
    Rect 사각형

    ->>> BouningClientRect 
    -> 보이는 화면 사각형 경계선으로 부터의 거리를
     리턴해주는 메서드
     -> 상단으로 부터의 거리는 top속성
     -> 왼쪽으로 부터의 거리는 left속성
     공통적으로 경계선 아래쪽은 양수, 윗쪽은 음수

****************************************************/

// 1. 대상선정 :
// (1) 이벤트 대상 : window
// (2) 변경대상 : .scroll-act
const daesang = myFn.qsa(".scroll-act");

// 등장위치값 계산변수
let gijun = window.innerHeight/3*2;

// 기준검사함수
const checkFn = (el) => {
    // el - 위치대상요소

    // 등장위치값
    let pos = el.getBoundingClientRect().top;
    
    // 기준검사 조건에 맞으면 on 클래스추가
    if(pos < gijun){
        el.classList.add("on");
    } //// if //////////////////
    // 기준검사 조건에 맞지 않을 때 on 클래스 제거
    else{
        el.classList.remove("on");
    } //// else //////////////

    
}; ///////// checkFn //////////////


// 2. 이벤트 함수 설정하기 
window.addEventListener('scroll',()=>{

    console.log('스크롤~~~!');

    // 대상의 개수만큼 하나씩 반복하여
    // checkFn 함수로 보내준다!
    // 그러면 함수에서 해당 대상에게 on 클래스를 더해준다!
    daesang.forEach(el=>checkFn(el));

}); /////// scroll 이벤트 /////////////////////