var getInput = document.getElementById('todos');
var getBtn = document.getElementById('add-btn');
var getList = document.getElementById('list');
var getDone = document.getElementsByClassName('done');
var getEdit = document.getElementsByClassName('edit')
var getDeleteAll = document.getElementById('delete-all');

// add delete all event handler

getDeleteAll.addEventListener("click", deleteAll);

// add todo when button clicked

getBtn.addEventListener("click", addTodo);

// Press enter for adding todo only if todo has text in it

getInput.addEventListener('keydown', function(e) {
	if (getInput.value.length > 0) {
	    if (e.keyCode == 13) {
	    	addTodo();
	    }
	}
});

// add todo function

function addTodo() {
	if (getInput.value.length > 0) {
		var theTime = new Date();
		var theDay = theTime.getDay();
		var theHour = theTime.getHours();
		var theMinute = theTime.getMinutes();
		var theTimeOfDay = 'on ' + theHour + ':' + theMinute;
		var inputValue = getInput.value;
		var theTodoList = "<div class='thelist'>" + "<p class='thevalue'>" + getInput.value + "</p>" + "<span class='edit'>Edit</span>" + "<span class='done'>Done</span>" + "<span class='date'>" + theTimeOfDay + "</span>" + "</div>";

		getList.innerHTML += theTodoList;

		getInput.value = '';

		checkList();
	}

	// press done code if done exists

	if (getDone[0]) {
		for (var i = 0; i < getDone.length; i++) {
			getDone[i].addEventListener("click", deleteTodo);
		}

		function deleteTodo() {

			var theElement = this;

			this.parentElement.className += ' delete';
			setTimeout(function () {
				theElement.parentElement.remove();
				checkList();
			}, 500);
			
		}
	}

	// press edit code if edit exists

	if (getEdit[0]) {
		for (var i = 0; i < getEdit.length; i++) {
			getEdit[i].addEventListener("click", editTodo);
		}
		
		function editTodo() {

			var theThis = this.parentElement.childNodes[0].innerHTML;
			
			getInput.value = theThis;
			getInput.select();
			getInput.setSelectionRange(0, getInput.value.length);

			this.parentElement.remove();	

			checkList();

		}

	}

}

function checkList() {
	if (getList.childNodes.length > 0) {
		getDeleteAll.style.visibility = "visible";
	} else if (getList.childNodes.length <= 0) {
		getDeleteAll.style.visibility = "hidden";
	}
}

function deleteAll() {
	var getTheList = document.getElementsByClassName('thelist');

	for (var i = 0; i < getTheList.length; i++) {
		getTheList[i].className += ' delete';

		thelisty(getTheList[i]);

		function thelisty(thelist) {
			setTimeout(function () {
				thelist.remove();
				checkList();
			}, 500);
		}
	}
}