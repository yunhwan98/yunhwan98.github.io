const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

//let으로 설정하여 업데이트가 가능하도록 만들기
let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    
    //target은 클릭된 HTML element
    //parentElement는 클릭된 element의 부모
    const li = event.target.parentElement;
    li.remove();
    //filter를 통해서 li.id 해당되는 toDo를 제외하고 새로운 배열을 생성
    //li.id는 문자로 설정되어있기 때문에 int로 변경
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    //다시 localstorage에 저장
    saveToDos();
    
}

function paintToDo(newTodo) {
    //li 태그 생성
    const li = document.createElement("li");
    li.id = newTodo.id;
    //span 태그 생성
    const span = document.createElement("span");
    //object의 text를 받아주기
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    //span을 li에 추가
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    //input의 현재 value를 새로운 변수에 복사
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    //forEach는 array에 있는 각각 item에 대하여 function실행
    const parsedToDos = JSON.parse(savedToDos);
     //이전 toDos array를 복원
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}