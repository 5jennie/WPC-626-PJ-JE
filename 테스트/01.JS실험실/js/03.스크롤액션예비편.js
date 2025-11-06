// 03.스크롤액션예비편 JS /////////////

/////////////////////////////////////////////////////
// 테스트 목표는?
// 각 위치로 부터 스크롤되어 올라오는 비행기 박스의
// 보이는 화면 Top 위치로부터의 거리를 px로 화면출력하고
// 스크롤 이벤트와 함께 위치값을 구하는 코드를 연습한다!
/////////////////////////////////////////////////////

// 화면 상단으로 부터 위치값을 리턴해 주는 JS메서드는?
// getBoundingClientRect() 메서드를 사용하고
// top값을 구할 수 있다!
// -> 소수점 아래 1자리만 찍기 가능 : toFixed(1)
// toFixed(소수점자리수)

const getBCR = (el) => el.getBoundingClientRect().top.toFixed(1);

// 화면높이값의 3/1지점값 구하기
// 즉, 윈도우 높이 2/3크기임!
const winH = window.innerHeight * 2/3;
console.log('윈도우 2/3 높이:', winH);


// [ 위치값 화면에 찍기 구현코드 ] ////
// 대상 : .track aside
const bangi = document.querySelectorAll('.track aside');
console.log('뱅기:',bangi);

// 비행기 위치값 출력 span ////
let b1Span =bangi[0].querySelector('span');
let b2Span =bangi[1].querySelector('span');
let b3Span =bangi[2].querySelector('span');


// [ 스크롤 이벤트 구현코드 ]
// 이벤트 대상: window
// 이벤트 종류: scroll 이벤트
window.addEventListener('scroll',()=>{

    console.log('스크롤중~~~!', getBCR(bangi[0]));

    // 각 비행기 위치변수
    let b1Top = getBCR(bangi[0]);
    let b2Top = getBCR(bangi[1]);
    let b3Top = getBCR(bangi[2]);

    // 첫번째 비행기 위치값 출력하기
    b1Span.innerText = b1Top;
    // 두번째 비행기 위치값 출력하기    
    b2Span.innerText = b2Top;
    // 세번째 비행기 위치값 출력하기    
    b3Span.innerText = b3Top;

    // 해당위치에 비행기박스 올때 클래스 action주기!
    // 첫번째 비행기박스의 top값 < 윈도우 높이 2/3
    if(b1Top < winH){
        bangi[0].classList.add('action');
    }else{
        bangi[0].classList.remove('action');
    }

    // 두번째 비행기박스의 top값 < 윈도우 높이 2/3
    if(b2Top < winH){
        bangi[1].classList.add('action');
    }else{
        bangi[1].classList.remove('action');
    }

    // 세번째 비행기박스의 top값 < 윈도우 높이 2/3
    if(b3Top < winH){
        bangi[2].classList.add('action');
    }else{
        bangi[2].classList.remove('action');
    }

}); //////////// scroll 이벤트 //////////// 