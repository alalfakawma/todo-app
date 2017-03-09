var getInput = document.getElementById('todos');
var getBtn = document.getElementById('add-btn');
var getList = document.getElementById('list');
var getDone = document.getElementsByClassName('done');
var getEdit = document.getElementsByClassName('edit')
var getDeleteAll = document.getElementById('delete-all');
var theListPara = document.getElementsByClassName('thevalue');
var getErrorTodo = document.getElementById('same-todo');

// add delete all event handler

getDeleteAll.addEventListener("click", deleteAll);

// add todo when button clicked

getBtn.addEventListener("click", addTodo);

// Press enter for adding todo only if todo has text in it

getInput.addEventListener('keydown', function(e) {
	var theInput = "getInput.value = ''"

	if (getInput.value.length > 0 || theInput) {
	    if (e.keyCode == 13) {
	    	addTodo();
	    }
	}
});

// add todo function

function addTodo() {
	var theError = "getErrorTodo.style.visibility = 'visible'";

	if (getInput.value == '' && theError) {
		getErrorTodo.style.visibility = 'hidden';

		return;
	}

	if (getInput.value.length > 0) {

		getErrorTodo.style.visibility = 'hidden';

		// compare input values and already added values of the list

		for (var i = 0; i < theListPara.length; i++) {
			var theNeededValue = theListPara[i].innerText;

			if (getInput.value === theNeededValue) {
				getErrorTodo.style.visibility = 'visible';
				getInput.select();
				getInput.setSelectionRange(0, getInput.value.length);

				return;
			}
		}

		var theTime = new Date();
		var theHour = theTime.getHours();
		var theMinute = theTime.getMinutes();
		var theDate = theTime.getDate();
		var theMonth = theTime.getMonth();
		var theYear = theTime.getFullYear();
		var theTimeOfDay = 'at ' + theHour + ':' + theMinute;
		var theDateLine = theDate + '/' + theMonth + '/' + theYear
		var inputValue = getInput.value;
		var createDiv = document.createElement('div');
		createDiv.setAttribute('class', 'thelist');
		createDiv.className += ' normal';
		createDiv.innerHTML += "<p class='thevalue'>" + getInput.value + "</p>" + "<span class='edit'>Edit</span>" + "<span class='done'>Done</span>" + "<span class='date'>" + theDateLine + '<br>' + theTimeOfDay + "</span>";

		getList.insertBefore(createDiv, getList.firstChild);

		getInput.value = '';

		if (getInput.value.length <= 0) {
			for (var i = 0; i < getEdit.length; i++) {
				getEdit[i].classList.remove('disabled');
			}
		}

		checkList();

	}

	// press done code if done exists

	if (getDone[0]) {
		var theDone = document.querySelectorAll('.thelist span')[1];

		theDone.addEventListener("click", function(e) {
		    if(e.target && e.target.classList.contains('done')) {

				var theElement = this;

				this.parentElement.className += ' delete';
				setTimeout(function () {
					theElement.parentElement.remove();
					checkList();
				}, 500);
			}
		});
	}

	// press edit code if edit exists

	if (getEdit[0]) {

		var theEdit = document.querySelector('.thelist span');

		theEdit.addEventListener("click", function(e) {
		    if(e.target && e.target.classList.contains('edit')) {

				var theThis = this.parentElement.childNodes[0].innerHTML;
				
				getInput.value = theThis;
				getInput.select();
				getInput.setSelectionRange(0, getInput.value.length);

				this.parentElement.remove();

				if (getInput.value.length > 0) {
					for (var i = 0; i < getEdit.length; i++) {
						getEdit[i].className += ' disabled';
					}
				}
				checkList();
			};
		});
	}

	if (theListPara[0]) {
		var thelp = document.querySelector('.thelist p');

		thelp.addEventListener("click", function(e) {
		    if(e.target && e.target.classList.contains('thevalue')) {
		        if (this.parentElement.classList.contains('normal')) {
		            this.parentElement.classList.toggle('high');
		        }
		    }
		});
	}
}

// check if list has items

function checkList() {
	if (getList.childNodes.length > 0) {
		getDeleteAll.style.visibility = "visible";
	} else if (getList.childNodes.length <= 0) {
		getDeleteAll.style.visibility = "hidden";
	}
}

// delete all items from list

function deleteAll() {

	var getTheList = document.getElementsByClassName('thelist');

	// run through all the list items and give em a class of delete

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