/* ════════════════════════════════════════════════════════════════
   main.js — 화면 동작
   ════════════════════════════════════════════════════════════════
   [5주차] 이 파일은 세 가지 일만 합니다.
     ① 모바일 메뉴 열고 닫기
     ② 카테고리 필터
     ③ 신청 폼 검사 후 완료 화면 보여주기

   기억할 문법은 세 개뿐입니다.
     document.querySelector('#아이디')      요소 하나 찾기
     document.querySelectorAll('.클래스')   여러 개 찾기
     요소.addEventListener('click', 함수)   눌렀을 때 실행

   ⚠ 가장 중요한 원칙
     JS는 스타일을 직접 바꾸지 않습니다. 클래스만 붙였다 뗍니다.
     보이는 모습은 CSS가 결정합니다.
         요소.classList.add('이름')      붙이기
         요소.classList.remove('이름')   떼기
         요소.classList.toggle('이름')   있으면 떼고 없으면 붙이기
   ════════════════════════════════════════════════════════════════ */


/* ───────────────────────────────────────────────────────────────
   ① 모바일 메뉴 토글           ▸ 모든 페이지에서 동작
   ───────────────────────────────────────────────────────────────
   화면을 768px보다 좁게 줄여야 '메뉴' 버튼이 보입니다.
   ─────────────────────────────────────────────────────────────── */

const menuBtn = document.querySelector('#menuBtn');
const gnb     = document.querySelector('#gnb');

if (menuBtn && gnb) {        // 요소가 있을 때만 실행 (아래 설명 참고)

  menuBtn.addEventListener('click', function () {

    const menuBtn = document.querySelector('#menuBtn');
const gnb     = document.querySelector('#gnb');

if (menuBtn && gnb) {

  menuBtn.addEventListener('click', function () {

        gnb.classList.toggle('is-open');
        menuBtn.setAttribute('aria-expanded', gnb.classList.contains('is-open'));/* TODO(5주차): 버튼을 누르면 gnb에 'is-open' 클래스를
                    붙였다 뗐다 하게 만드세요. */

  });

}/* TODO(5주차): 버튼을 누르면 gnb에 'is-open' 클래스를
                    붙였다 뗐다 하게 만드세요.
       힌트: gnb.classList.toggle( ? );
       확인: CSS의 .gnb.is-open 규칙이 무엇을 하는지 먼저 찾아보세요. */

  });

}


/* ───────────────────────────────────────────────────────────────
   ② 카테고리 필터              ▸ index.html 에서만 동작
   ─────────────────────────────────────────────────────────────── */

const chips = document.querySelectorAll('#filters .chip');
const cards = document.querySelectorAll('#cardGrid .card');

if (chips.length > 0) {

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {

      /* ── 2-1. 누른 칩만 진하게 ──────────────────────────────
         '전부 끄고 하나만 켠다'가 순서입니다.

         TODO(5주차):
           ① chips 전부에서 'is-active' 를 떼세요
              힌트: chips.forEach(function (c) { c.classList.remove( ? ); });
           ② 방금 누른 chip 에만 다시 붙이세요
              힌트: chip.classList.add( ? );
      */



      /* ── 2-2. 카드 걸러내기 ────────────────────────────────
         누른 칩의 data-filter 값과
         각 카드의 data-cat 값을 비교합니다.

         HTML의 data-filter="특강" 은 JS에서 chip.dataset.filter 로 읽습니다.
         HTML의 data-cat="특강"    은 JS에서 card.dataset.cat 으로 읽습니다.

         TODO(5주차):
           ① 누른 칩의 값을 want 라는 이름으로 꺼내세요
           ② 카드마다 돌면서, want가 'all' 이거나 카테고리가 같으면 보이고
              아니면 'is-hidden' 클래스를 붙여 숨기세요

         힌트 (뼈대):
           const want = chip.dataset.filter;
           cards.forEach(function (card) {
             const match = (want === 'all' || card.dataset.cat === want);
             card.classList.toggle('is-hidden', !match);
           });

         ※ classList.toggle 의 두 번째 값이 true면 붙이고 false면 뗍니다.
           if 문 없이 처리됩니다.
      */



    });
  });

}


/* ───────────────────────────────────────────────────────────────
   ③ 신청 폼 검사               ▸ apply.html 에서만 동작
   ───────────────────────────────────────────────────────────────
   ⚠ 시작하기 전에 apply.html 의 <form> 에 novalidate 를 붙이세요.
     그래야 브라우저 기본 오류 풍선 대신 우리가 만든 메시지가 나옵니다.
   ─────────────────────────────────────────────────────────────── */

const form        = document.querySelector('#applyForm');
const formScreen  = document.querySelector('#formScreen');
const doneScreen  = document.querySelector('#doneScreen');

/* 도우미 함수 ▸ 완성본 제공
   오류 표시를 켜고 끄는 일을 한 곳에 모아두었습니다.
   항목마다 같은 코드를 반복해서 쓰지 않기 위해서입니다. */
function setError(fieldEl, errorEl, show) {
  fieldEl.classList.toggle('has-error', show);
  errorEl.classList.toggle('is-show', show);
}

if (form) {

  form.addEventListener('submit', function (e) {

    e.preventDefault();
    /* ↑ 이 한 줄이 없으면 페이지가 새로고침되면서
         아무 일도 안 일어난 것처럼 보입니다. 절대 지우지 마세요. */

    let ok = true;   // 하나라도 틀리면 false 로 바꿀 예정


    /* ── 3-1. 이름 ▸ 완성본 제공. 나머지 항목은 이 형식을 따라 하세요 ── */
    const name    = document.querySelector('#name');
    const nameBad = name.value.trim() === '';        // 비어 있으면 true
    setError(name.closest('.field'), document.querySelector('#err-name'), nameBad);
    if (nameBad) ok = false;

    /* .trim() 은 앞뒤 공백을 지웁니다. 공백만 입력한 경우를 걸러냅니다.
       .closest('.field') 는 이 input을 감싸고 있는 .field 를 찾아 올라갑니다. */


    const tel = document.querySelector('#tel');
    const telBad = !tel.checkValidity();
    setError(tel.closest('.field'), document.querySelector('#err-tel'), telBad);
    if (telBad) ok = false; /* ── 3-2. 연락처 ──────────────────────────────────────────
       TODO(5주차):
         checkValidity() 를 쓰면 HTML에 적어둔 pattern 을
         브라우저가 알아서 검사해 줍니다. 정규식을 다시 짤 필요가 없습니다.

       힌트:
         const tel    = document.querySelector('#tel');
         const telBad = !tel.checkValidity();      // ! 는 '아니다'
         setError(tel.closest('.field'), document.querySelector('#err-tel'), telBad);
         if (telBad) ok = false;
    */



       const email = document.querySelector('#email');
    const emailBad = !email.checkValidity();
    setError(email.closest('.field'), document.querySelector('#err-email'), emailBad);
    if (emailBad) ok = false;/* ── 3-3. 이메일 ──────────────────────────────────────────
       TODO(5주차): 연락처와 똑같은 방식입니다. id 만 email 로 바꾸세요.
    */



        const count = document.querySelector('#count');
    const n = Number(count.value);
    const countBad = !(n >= 1 && n <= 4) || count.value === '';
    setError(count.closest('.field'), document.querySelector('#err-count'), countBad);
    if (countBad) ok = false;/* ── 3-4. 참가 인원 ───────────────────────────────────────
       ⚠ 이 항목은 checkValidity() 를 쓰지 말고 직접 조건을 쓰세요.
         무엇을 검사하는지 눈에 보여야 테스트 케이스를 만들 수 있습니다.

       TODO(5주차): 1 이상 4 이하가 아니거나, 비어 있으면 오류입니다.

       힌트:
         const count    = document.querySelector('#count');
         const n        = Number(count.value);   // 글자를 숫자로 바꿈
         const countBad = !(n >= 1 && n <= 4) || count.value === '';
         …

       ※ 입력칸의 값은 항상 '글자'입니다. Number() 로 바꿔야 크기 비교가
         제대로 됩니다.
       ※ 5주차 3차시에 이 조건으로 경계값 테스트를 설계합니다.
         0 / 1 / 4 / 5 를 각각 넣으면 어떻게 되어야 할까요?
    */



    /* ── 3-5. 희망 좌석 (라디오) ──────────────────────────────
       라디오는 '선택된 것'을 찾는 방식이 다릅니다.

       TODO(5주차):
         const seat    = document.querySelector('input[name="seat"]:checked');
         const seatBad = !seat;        // 선택된 게 없으면 true
         …

       ※ :checked 는 '체크된 것만' 고르라는 뜻입니다.
         아무것도 선택 안 했으면 찾지 못해서 seat 는 null 이 됩니다.
    */



    /* ── 3-6. 동의 (체크박스) ─────────────────────────────────
       TODO(5주차):
         const agree    = document.querySelector('#agree');
         const agreeBad = !agree.checked;
         …
    */



    /* ── 3-7. 하나라도 틀렸으면 여기서 멈춤 ▸ 완성본 ────────── */
    if (!ok) return;


    /* ── 3-8. 통과했으면 완료 화면으로 ────────────────────────
       TODO(5주차): 입력한 값을 완료 화면에 채워 넣으세요.

       힌트:
         document.querySelector('#r-name').textContent  = name.value;
         document.querySelector('#r-tel').textContent   = tel.value;
         document.querySelector('#r-seat').textContent  = seat.value;
         document.querySelector('#r-count').textContent = count.value + '명';

       ※ textContent 는 요소 안의 글자를 바꿉니다.
         완료 화면의 '—' 자리에 입력값이 들어갑니다.
    */



    /* ── 3-9. 화면 바꾸기 ▸ 완성본 ────────────────────────────
       신청 폼을 숨기고 완료 화면을 보이게 합니다. */
    formScreen.classList.add('is-hidden');
    doneScreen.classList.remove('is-hidden');
    window.scrollTo(0, 0);

  });

}


/* ════════════════════════════════════════════════════════════════
   참고 : if (menuBtn && gnb) 같은 줄은 왜 있나요?
   ════════════════════════════════════════════════════════════════
   이 파일 하나를 세 페이지가 함께 씁니다.
   그런데 #applyForm 은 apply.html 에만 있고, #filters 는 index.html 에만
   있습니다. 없는 요소를 붙잡으려 하면 이런 오류가 납니다.

       Cannot read properties of null

   그래서 '있을 때만 실행하라'는 조건을 감싸 둔 것입니다.
   오류 메시지는 F12 → Console 탭에서 볼 수 있습니다.
   ════════════════════════════════════════════════════════════════ */
