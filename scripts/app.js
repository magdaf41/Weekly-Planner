// MENU BAR

const daysOfTheWeek = document.querySelectorAll('.menu-item');
console.log(daysOfTheWeek);

const hideAllLiElements = (daysOfTheWeek, currentIndex) => {
    daysOfTheWeek.forEach((day, index) => {
        if (currentIndex !== index) {
            day.classList.toggle('hide')
        }
        console.log(currentIndex);
    })
}



const chooseADay = () => {
    daysOfTheWeek.forEach((dayOfWeek, index) => {
        const aElement = dayOfWeek.querySelector('a');
        aElement.addEventListener('click', event => {
            console.log(dayOfWeek.innerText)

            hideAllLiElements(daysOfTheWeek, index)
            const parent = event.target.parentNode;
            parent.classList.toggle('display');
        })
    })
}

chooseADay();

//Slider

//const _key = <- zmienna jest prywatna
//const observable = <- strumienie danych

const slides = document.querySelector('.slider-items').children;
nextSlide = document.querySelector(".right-slide");
prevSlide = document.querySelector(".left-slide");
totalSlides = slides.length;
let index = 0;


nextSlide.onclick = function () {
    next("next");
}
prevSlide.onclick = function () {
    next("prev");
}

function next(direction) {

    if (direction == "next") {
        index++;
        if (index == totalSlides) {
            index = 0;
        }
    }
    else {
        if (index == 0) {
            index = totalSlides - 1;
        }
        else {
            index--;
        }
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[index].classList.add("active");

}


// TO DO LIST

let todoInput; //miejsce gdzie użytkownik wpisuje treść
let alertInfo; //info o braku zadań
let addBtn; //przycisk ADD - dodaje nowe zadanie
let ulList; //lista zadań
let newTask; // nowe dodanie li, nowe zadanie
let allTasks; // wszystkie elementy listy li
let idNumber = 0; // ID dodowane do każdego nowego zadania
let popup; // pobrany popup
let popupInfo; // alert w popupie, jak się doda pusty itp
let editedTodo; // edytowany Todo
let popupInput; // tekst wpisywany w inputa w popupie
let addPopupBtn; // przycisk zatwierdź w popupie
let closeTodoBtn; // przycisk do zamykania popupa


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    todoInput = document.querySelector('.to-do-input');
    alertInfo = document.querySelector('.alert-info');
    addBtn = document.querySelector('.add-btn');
    ulList = document.querySelector('.items-to-do-list ul');
    allTasks = document.querySelectorAll('li .item-to-do');
    popup = document.querySelector('.popup');
    popupInfo = document.querySelector('.popup-info');
    popupInput = document.querySelector('.popup-input');
    addPopupBtn = document.querySelector('.accept');
    closeTodoBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewTask);
    todoInput.addEventListener('keyup', enterCheck);
    ulList.addEventListener('click', checkClick);
}

const addNewTask = () => {
    if (todoInput.value !== '') {
        idNumber++;
        newTask = document.createElement('li');
        newTask.setAttribute('id', `test${idNumber}`);
        newTask.setAttribute('class', 'item-to-do')
        newTask.innerText = todoInput.value;
        ulList.appendChild(newTask);

        todoInput.value = '';
        alertInfo.innerText = ''
        createToolsArea();
    } else {
        alertInfo.innerText = "Implement task";
    }
}

const enterCheck = (event) => {
    if (event.keyCode === 13) {
        addNewTask();
    }
}

const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    newTask.appendChild(toolsPanel);

    toolsPanel.innerHTML = `
    <div class="tools">
        <button class="complete">
        <i class="fa fa-check"></i>
        </button>
        <button class="edit">EDIT</button>
        <button class="delete"><i class="fas fa-times"></i></button>
        <button class="next-day">
            <i class="fas fa-arrow-right"></i>
        </button>
    </div>
`;

}

const checkClick = e => {

    if (e.target.classList.value !== '') {
        if (e.target.parentNode.classList.contains('complete')) {
            e.target.closest('li').classList.toggle('completed');
            e.target.closest('button').classList.toggle('completed');
        } else if (e.target.closest('button').classList.contains('edit')) {
            e.target.closest('li').classList.toggle('edit');
        } else if (e.target.closest('button').classList.contains('delete')) {
            deleteTask(e);
        } else if (e.target.closest('button').classList.contains('next-day')) {
            console.log('next-day')
        }
        console.log(e.target.parentNode);
    }
}



const deleteTask = e => {
    const deleteTodo = e.target.parentNode.querySelector('li');
    deleteTodo.remove();

    if (allTasks.length === 0) {
        alertInfo.innerText = "No tasks on the list"
    }

}


document.addEventListener('DOMContentLoaded', main);