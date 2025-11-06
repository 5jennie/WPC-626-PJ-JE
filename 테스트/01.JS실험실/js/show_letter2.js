// JS실험실 : 03.글자등장2 JS - show_letter2.js

// 나의 함수 가져오기 ////
import myFn from "./my_function.js";

// 1. 요구사항 분석
// - 글자를 박스에 넣고 단어 단위로 날아오면서 등장애니

// 2. 대상선정 - .stage-letters
const stage = myFn.qs(".stage-letters");

console.log("대상:", stage);

// 3. 글자 데이터 변수 할당
const myText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

// 4. 글자 데이터 변환하기
// - 기준: 띄어쓰기 공백
// - 잘라서 배열만드는 메서드는? split(자를문자기준)
const newText = myText.split(" ");
console.log("잘라서배열:", newText);

// forEach() 메서드를 사용하는 방법 //////
// 배열값 만큼 반복시킨다!
// 이때 변수에 span태그로 싼 값을 담는다!
// let hCode = "";
// newText.forEach(val=>{
//     hCode += `<span>${val}</span>`;
// });
// // 대상박스에 코드넣기
// stage.innerHTML = hCode;

// 위와 같이 forEach를 사용할때는 변수도 써야하고
// 따로 html넣기도 해야하는 번거로움이 있다!
// 이런 이유로 새로운 메서드가 생겼으니 바로 -> map()
// map((값,순번,객체)=>{return 새로운값})
// -> 만약 return 키워드를 생력하려면?
// map((값,순번,객체)=>새로운값)

// 5. 글자데이터 변환하기
// - span태그로 싸서 대상박스에 넣기
// 대상: stage
stage.innerHTML = newText
  .map(
    (v, i) =>
      `<span
            style="transition-delay: ${i * 0.1}s"
        >${v}</span>`
  )
  .join("");
// map의 결과는 배열이기때문에 그 값을 문자화하여
// 콤마를 없애면 된다! 이때 쓰는 배열 메서드는?
// 배열.join('') -> 구분자를 빈것으로 하면 깨끗한
// 태그만 남는다!!!
// 객체는 맵쪼잉!
// 배열객체.map().join('')

// 사용할 수 있는 방법은?
// 1) for of문
// 2) forEach메서드
// 3) map메서드
// -> map((val,idx,obj)=>코드리턴)
// -> 내부전달값이 forEach()와 똑같다!
// -> 배열값을 같은 주소에 새로운 배열로 매칭해줌
// -> 변경된 데이터를 새로운 배열로 만들 수 있음
// -> 원본배열은 보존된다!

const aa = ["헐", "할", "핼"];
console.log("aa배열:", aa);
// 기존배열값에 하트를 넣는다
console.log(
  "하트넣은 aa배열:",
  aa.map((v) => "♥" + v)
);
console.log(
  "하트넣은 aa배열을 문자열로 출력:",
  aa.map((v) => "♥" + v).join("ㅋㅋ")
);
console.log(
  "div태그로 aa배열을 싸고 문자열로 출력:",
  aa.map((v) => `<div>${v}</div>`).join("")
);

console.log("다시 aa배열:", aa);
// 배열값을 특정 문자열로 결합하여 출력하기
// 배열.join('문자열') -> 전체 배열이 문자열로 출력

// [ 배열값을 map으로 변형후 출력하기! ]
// 배열.map().join('')
// 배열값 변형 맵죠잉~!

// 등장액션 기준값설정(윈도우화면 절반크기)
const CRITERIA = window.innerHeight / 2;
console.log("기준값:", CRITERIA);

// 6. 스크롤 시 글자박스에 클래스 넣기
myFn.addEvt(window, "scroll", () => {
  // (1) 대상요소 위치값 : getBoundingClientRect()
  // 대상: stage
  let pos = myFn.getBCR(stage);

  console.log("스크롤~~~", pos);

  // (2) 바운딩값이 기준값보다 작을때
  // 대상요소에 클래스 "on"넣기
  if (pos < CRITERIA) stage.classList.add("on");
  // else stage.classList.remove('on');
}); /////// addEvt /////////////
