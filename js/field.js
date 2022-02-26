// var searchFun = require('./search.js')

let body = document.getElementById('root')

let header = document.createElement('header')
header.classList.add('header', 'container')

let newNoteButton = document.createElement('button')
newNoteButton.classList.add('create-todo')
newNoteButton.id = "new-note"
newNoteButton.innerHTML = "Новая заметка"
// console.log(newNoteButton)

let delAllBtn = document.createElement('button')
delAllBtn.classList.add('create-todo')
delAllBtn.id = "deleteAll"
delAllBtn.innerHTML = "удалить все"
// console.log(delAllBtn)


header.append(newNoteButton, delAllBtn)


let listAndEditField = document.createElement('section')
listAndEditField.classList.add('list-and-edit', 'container')
// console.log(listAndEditField)

let todoListHTML = document.createElement('div')
todoListHTML.classList.add('todoList')

let searchInput = document.createElement('input')
searchInput.type = "text"
searchInput.onkeyup = (event) => {
	event.preventDefault();
	// обьявляем переменные переменные
	var input = event.target.value.toLowerCase();
	const articles = document.querySelectorAll('.todo')
	var articlestexts = list.querySelectorAll('.todotext')

	// Прокручиваем все элементы списка и скрываем те, которые не соответствуют поисковому запросу
	for (var i = 0; i < articles.length; i++) {
		if (articlestexts[i].innerHTML.toLowerCase().indexOf(input) > -1) {
			articles[i].style.display = "";
		} else {
			articles[i].style.display = "none";
		}
	}
}
searchInput.classList.add('search-input')
searchInput.id = "text-to-find"
searchInput.placeholder = "Введите имя заметки"
// console.log(searchInput)

let List = document.createElement('div')
List.classList.add('list')

let dragList = document.createElement('div')
dragList.id = "drag"

todoListHTML.append(searchInput, List, dragList)
// console.log(todoListHTML)

let editBlock = document.createElement('div')
editBlock.classList.add('edit-block')

let edit = document.createElement('div')
edit.classList.add("edit")
edit.contentEditable = true

editBlock.append(edit)
// console.log(editBlock)

listAndEditField.append(todoListHTML, editBlock)
// console.log(listAndEditField)

body.append(header, listAndEditField)
// console.log(body)