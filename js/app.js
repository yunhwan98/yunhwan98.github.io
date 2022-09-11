
const loginForm =document.querySelector("#login-form");
const loginInput =document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

//string을 반복사용시 대문자 변수로 저장 권고
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event){
    //브라우저의 새로고침을 막음
    event.preventDefault();
    //class에 hidden 추가
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    //localStorage에 저장
    localStorage.setItem(USERNAME_KEY,username);
    
    paintGreetings(username);

}

// h1을 화면에 나타나게 하고 글쓰기
function paintGreetings(username){
    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting.innerText = `Hello ${username}`;
}


const savedUsername =localStorage.getItem(USERNAME_KEY);

if(savedUsername === null){

    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);

} else{
    paintGreetings(savedUsername);
}