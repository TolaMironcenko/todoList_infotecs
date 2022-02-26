// получение области со всеми заметками 
const list = document.querySelector('.list')
// получение кнопки создания новой заметки
const newNoteBtn = document.querySelector('#new-note')
// получение области редактирования заметки
const editForm = document.querySelector('.edit')
// получение кнопки удаления всех заметок
const deleteAll = document.querySelector('#deleteAll')
var defaultContent = 'Новая заметка' // текст в новой заметке
// localStorage.clear() // очищение локального хранилища
// массив обьектов для последующего рендера табличек с заметками
// получает значение из localstorage. Если в localstorage ничего нет то создается пустой массив
var todoList = localStorage.getItem('todoList') == null ? [] : JSON.parse(localStorage.getItem('todoList'))
// id переменная для обозначения номера элемента
// так же получается из localstorage. Если localstorage пуст то id = 0
var id = localStorage.getItem('todoList') == null ? 0 : JSON.parse(localStorage.getItem('todoList')).length
// console.log(todoList) // вывод в консоль массива для проверки
if (todoList) {
	// если массив не пуст то вызывается функция для рендера табличек с заметками
	renderList()
}

if (todoList.length != 0) {
	editForm.id = todoList.length - 1
	editForm.innerHTML = todoList[todoList.length - 1].todo
	editForm.style.display = 'block'
	const todos = document.querySelectorAll('.todo')
	// console.log(todos)
	todos[0].classList.add('active-todo')
} else { editForm.id = 0 }

// функция создания таблички заметки
function createTodo(todotext, todoid, todoFlag = 0) {
	const todoBlock = document.createElement('div') // создание блока div
	todoBlock.classList.add('todo') // присваивение блоку класса todo
	todoBlock.id = todoid // присваивание id
	const todoBlockText = document.createElement('p') // создание параграфа
	todoBlockText.classList.add('todotext') // присваивание параграфу класса
	todoBlockText.innerHTML = todotext // присваивание параграфу значение текста
	todoBlockText.id = todoid // присваивание параграфу id
	const deleteTodoBtn = document.createElement('button') // создание кнопки 
	deleteTodoBtn.classList.add('create-todo', 'deltodobtn') // присваивание классов кнопке
	deleteTodoBtn.innerHTML = `<img id="${todoid}"class="trash-icon" src="https://img.icons8.com/material-rounded/24/000000/delete.png"/>` // присваивание кнопке надписи "удалить" 
	deleteTodoBtn.id = todoid // присваивание кнопке id
	// состояние прогресса

	// <div class="dropdown">
	//   <button onclick="myFunction()" class="dropbtn"> Выпадающий</button>
	//   <div id="myDropdown" class="dropdown-content">
	//     <a href="#">Главная</a>
	//     <a href="#">О Нас</a>
	//     <a href="#">Контакты</a>
	//   </div>
	// </div>

	const selectProgress = document.createElement('div') // выбор состояния 
	selectProgress.classList.add('dropdown')
	selectProgress.value = todoFlag
	const optionNow = document.createElement('button')
	optionNow.classList.add('dropbtn')
	optionNow.value = todoFlag
	optionNow.id = todoid
	if (todoFlag == 0) { optionNow.innerHTML = "ожидает"; optionNow.style.backgroundColor = 'rgb(201, 197, 197)' }
	if (todoFlag == 1) { optionNow.innerHTML = 'в процессе'; optionNow.style.backgroundColor = 'rgb(151, 191, 229)' }
	if (todoFlag == 2) { optionNow.innerHTML = 'выполнена'; optionNow.style.backgroundColor = 'rgb(169, 247, 169)' }

	const allOptions = document.createElement('div')
	allOptions.classList.add('dropdown-content')
	allOptions.id = todoid
	// allOptions.style.display = 'none'

	const optionOne = document.createElement('button')
	optionOne.classList.add('flagbtn')
	optionOne.id = todoid
	optionOne.value = 0
	optionOne.innerHTML = "ожидает"
	optionOne.style.backgroundColor = 'rgb(201, 197, 197)'
	const optionTwo = document.createElement('button')
	optionTwo.classList.add('flagbtn')
	optionTwo.id = todoid
	optionTwo.value = 1
	optionTwo.innerHTML = "в процессе"
	optionTwo.style.backgroundColor = 'rgb(151, 191, 229)'
	const optionThree = document.createElement('button')
	optionThree.classList.add('flagbtn')
	optionThree.id = todoid
	optionThree.value = 2
	optionThree.innerHTML = "выполнена"
	optionThree.style.backgroundColor = 'rgb(169, 247, 169)'

	allOptions.append(optionOne, optionTwo, optionThree)

	selectProgress.append(optionNow, allOptions)
	// selectProgress.classList.add('select-Progress')
	console.log(selectProgress)

	todoBlock.append(todoBlockText, selectProgress, deleteTodoBtn) // добавление параграфа и кнопки в блок todoBlock
	return todoBlock // возвращение todoBlock 
}

// обработчик нажатия на кнопку создания новой заметки
newNoteBtn.addEventListener('click', () => {
	let newTodo = { // создание обьекта
		title: defaultContent,
		todo: defaultContent, // значение текста 
		id: id, // значение id
		flag: 0,
	}
	todoList.push(newTodo) // добавление обьекта в массив
	// console.log(todoList) // вывод в консоль для проверки
	localStorage.setItem('todoList', JSON.stringify(todoList)) // добавление массива в localstorage
	editForm.style.display = 'block' // присвоение полю редактирование свойсва
	const todoBlock = createTodo(defaultContent, id, 0) // создание таблички заметки
	// removeActiveClasses() // удаление всех активных классов из поля со всеми заметками
	todoBlock.classList.add('active-todo') // присваоение активного класса табличке 
	// console.log(todoBlock.classList)
	list.prepend(todoBlock) // добавление в начало поля
	editForm.innerHTML = defaultContent // присвоение значения полю редактирования
	editForm.id = todoList[id].id // присвоение id полю редактирования
	renderList() // вызов функции рендеринга табличек в поле всех заметок
	id++ // увеличение значения id на 1
})

// функция удаления активного класса со всех табличек
function removeActiveClasses() {
	const todos = document.querySelectorAll('.todo') // получение всех табличек
	todos.forEach((todo) => {
		todo.classList.remove('active-todo') // удаление класса со всех существующих табличек
	})
}
// обработчик нажатия на табличку или надпись на табличке
list.addEventListener('click', (event) => {
	if (event.target.classList.contains('todo')) { // проверка на нажатие на табличку
		removeActiveClasses() // вызов функции удаления активного класса со всех табличек
		event.target.classList.add('active-todo') // добавление активного класса к выбранной табличке
		editForm.style.display = 'block' // добавление свойства к полю редактирования
		const todotext = event.target.querySelector('.todotext') //получение надписи на табличке
		editForm.innerHTML = todoList[event.target.id].todo // присвоение полю редактирования надписи на табличке
		editForm.id = event.target.id // присоение полю редактирования id выбранной таблички
		// console.log(todotext.id) // вывод в консоль для проверки
	}
	if (event.target.classList.contains('todotext')) { // проверка на нажатие на надпись
		removeActiveClasses() // вызов функции удаления активного класса со всех табличек
		const todos = document.querySelectorAll('.todo') // получение всех табличек
		todos[todos.length - 1 - event.target.id].classList.add('active-todo') // добавление активного класса к выбранной табличке
		editForm.style.display = 'block' // добавление свойства к полю редактирования
		editForm.innerHTML = todoList[event.target.id].todo // присвоение полю редактирования надписи
		editForm.id = event.target.id // присоение полю редактирования id выбранной таблички
		// console.log(event.target.id) // вывод в консоль для проверки
	}
	if (event.target.classList.contains('deltodobtn') || event.target.classList.contains('trash-icon')) { // проверка на нажатие кнопки удаления
		removeActiveClasses() // удаление активных классов
		todoList.splice(event.target.id, 1) // удаление одного элемента по индексу значения id кнопки
		for (var i = 0; i < todoList.length; i++) {
			todoList[i].id = i // присваивание корректныз id в массиве
		}
		localStorage.setItem('todoList', JSON.stringify(todoList)) // добавление измененного массива в локальное хранилище
		// console.log(todoList) // вывод в консоль массива для проверки
		renderList() // вызов функции рендера табличек
		if (todoList.length != 0) {
			editForm.id = 0
			editForm.innerHTML = todoList[0].todo
			const todos = document.querySelectorAll('.todo')
			// console.log(todos)
			todos[todoList.length - 1].classList.add('active-todo')
		} else {
			editForm.id = 0
			editForm.innerHTML = ''
			editForm.style.display = 'none'
		}
		id-- // уменьшение значения id на 1
	}
	if (event.target.classList.contains('dropbtn')) {
		clearAllDropDown()
		const dropDowns = document.querySelectorAll('.dropdown-content')
		dropDowns[dropDowns.length - 1 - event.target.id].style.display = 'block'
	}
	if (event.target.classList.contains('flagbtn')) {
		const dropDowns = document.querySelectorAll('.dropbtn')
		dropDowns[dropDowns.length - 1 - event.target.id].style.backgroundColor = event.target.backgroundColor
		dropDowns[dropDowns.length - 1 - event.target.id].value = event.target.value
		dropDowns[dropDowns.length - 1 - event.target.id].innerHTML = event.target.innerHTML
		todoList[event.target.id].flag = event.target.value
		renderList()
	}
})

window.onclick = function (event) {
	if (!event.target.matches('.dropbtn')) {
		var dropdowns = document.querySelectorAll(".dropdown-content");
		for (var i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.style.display == 'block') {
				openDropdown.style.display = 'none';
			}
		}
	}
}

// функция рендера табличек в поле list 
function renderList() {
	list.innerHTML = '' // очищение поля со всеми заметками
	// создание табличек и добавление из в поле со всеми заметками
	for (var i = todoList.length - 1; i >= 0; i--) {
		removeActiveClasses()
		const todoBlock = createTodo(todoList[todoList.length - 1 - i].title, todoList[todoList.length - 1 - i].id, todoList[todoList.length - 1 - i].flag)
		list.prepend(todoBlock)
	}
}

function clearAllDropDown() {
	const dropDowns = document.querySelectorAll('.dropdown-content')
	for (var i = 0; i < dropDowns.length; i++) {
		dropDowns[i].style.display = 'none'
	}
}

// обработчик нажатия на кнопку удаления всех заметок
deleteAll.addEventListener('click', () => {
	todoList = [] // присвоение массиву пустого значения
	localStorage.clear() // очищение локального хранилища
	list.innerHTML = '' // очищение поля со всеми заметками
	editForm.textContent = '' // очищение поля редактирования
	editForm.style.display = 'none' // присвоение стиля display: none; поле редактирования не видно на экране
	// console.log(todoList) // вывод в консоль массива для проверки
	id = 0 // обнуление значения id
})

// автосохранение каждые пол секунды
setInterval(() => {
	if (todoList.length != 0) { // если todoList не пуст
		todoList[editForm.id].todo = editForm.innerHTML // присваивание значения поля обьекта в массиве
		todoList[editForm.id].title = editForm.innerHTML.split('<')[0]
		localStorage.setItem('todoList', JSON.stringify(todoList)) // добавление измененного массива в локальное хранилище
		const todos = document.querySelectorAll('.todotext') // получение надписей на табличках
		todos[todos.length - 1 - editForm.id].innerHTML = todoList[editForm.id].title // присваивание надписи из поля редактирования
		// console.log(todoList)
	}
}, 500) // интервал в 0.5 секунд