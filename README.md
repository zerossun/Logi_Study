# 크롬 웹 제작 & Js 기초 문법
1. Js 기초 문법
2. 크롬 웹 제작

---

<br>

## Js 기초 문법

1) 호이스팅과 변수 선언<br>
  [블로그 주소](https://velog.io/@wonssun/TDZ%EC%99%80-%EB%B3%80%EC%88%98%EB%93%A4)
2) 사용한 js 함수 목록<br>
  [블로그 주소](https://velog.io/@wonssun/js-%EA%B8%B0%EB%B3%B8-%ED%95%A8%EC%88%98%EB%93%A4)
3) js 기초 단어, 비동기 프로그래밍<br>
  [블로그 주소](https://velog.io/@wonssun/js-%EA%B8%B0%EC%B4%88-%EB%8B%A8%EC%96%B4-%EC%A0%95%EB%A6%AC)

<br>

## 크롬 웹 제작

### 사용한 기능

### + addEventListner 이벤트(click, submit, change)
```
  document.addEventListener(event,function,useCapture);
```
```
  · event: 반응할 이벤트 유형
  · function : 이벤트가 발생할 때 실행할 함수
  · useCapture : 이벤트 타겟으로 전송하기 전, 등록된 function으로 타입의 이벤트 전송여부를 나타내는 boolean
```
#### 예제
```
const LoginInput = document.querySelector('#LoginForm input:first-child');

function LoginInputChnage(e) {
  console.log(e.value);
  LoginInput.value = e.target.value;
}

LoginInput.addEventListener('change', LoginInputChnage);
```
### + localStorage
```
Html에 데이터를 저장할 수 있는 저장소 (key = value 쌍으로 저장. key 기반으로 데이터 조회)
```
```
  · setItem(key, value) – 키-값 쌍을 보관
    ex) localStorage.setItem('username', LoginInput.value);

  · getItem(key) – 키에 해당하는 값을 받아옴
    ex) const setItem2 = localStorage.getItem('username');

  · removeItem(key) – 키와 해당 값을 삭제
    ex) localStorage.removeItem('username');

  · clear() – 모든 것을 삭제
    ex) localStorage.clear('username');

  · key(index) – 인덱스(index)에 해당하는 키를 받아옴
    ex) localStorage.key('username')

  · length – 저장된 항목의 개수를 얻음
    ex) localStorage.length
  ```
#### 예제
```
function LoginBtn2() {
  const yourname2 = LoginInput.value;
  localStorage.setItem('username', LoginInput.value);
}
```
### 


#### 예제 결과값
<img src="https://github.com/zerossun/Logi_Study/assets/130970089/25b1ebb4-79c5-475e-b4db-9fc996e94569"  width="700" height="370">

