const toDoform = document.querySelector("#todo-form");
const todoInput =document.querySelector("#todo-form input")
const toDoList = document.querySelector("#todo-list");
const TODOS_KEY = "toDos";
let toDos =[]

function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();  
}

function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos))
}

function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;    
    const span = document.createElement("span");
    span.innerText = newTodo.text;       
    const button = document.createElement("button");
    
    button.addEventListener("click",deleteToDo);
    button.innerText = "❌";
    
    li.appendChild(span);
    li.appendChild(button)
    toDoList.appendChild(li); 
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value ="";
    const newTodoObj = {
        text:newTodo,
        id:Date.now(),
    }
    toDos.push(newTodoObj);
    
    paintToDo(newTodoObj);
    saveToDos();
}

toDoform.addEventListener("submit",handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null){
    const pasredToDos = JSON.parse(savedToDos);
    toDos = pasredToDos;
    pasredToDos.forEach(paintToDo);
}