// Targeting Elements

let newTask = document.getElementById("new-task");
let addTaskForm = document.getElementById("add-task-form");
let filterTask = document.getElementById("filter-task");
let tasksList = document.getElementById("tasks-list");
let clearTask = document.getElementById("clear-tasks");

// Load All Events

loadEventListeners();

function loadEventListeners() {

	// Add Event Listener To Disable Right Click
	document.addEventListener("contextmenu", disableRightClick);

	// Add Event Listener To Disable Inspection 
	document.addEventListener("keydown", disableInspection);

	// Add All Existing Events when DOM Content Loaded
	document.addEventListener("DOMContentLoaded", getExistingTasks);

	// Add New Task Through Form Submission
	addTaskForm.addEventListener("submit", addNewTaskListener);

	// Delete Task From Tasks List
	tasksList.addEventListener("click", removeTaskListener);

	// Filter Task From Task List
	filterTask.addEventListener("keyup", filterTaskListener);

	// Clear All Task From Task List
	clearTask.addEventListener("click", clearAllTaskListener);

}


function disableRightClick(e) {
	e.preventDefault();
}

function disableInspection(e) {

   // "I" key
   if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
       disabledEvent(e);
   }
   // "J" key
   if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
       disabledEvent(e);
   }
   // "S" key + macOS
   if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
       disabledEvent(e);
   }
   // "U" key
   if (e.ctrlKey && e.keyCode == 85) {
       disabledEvent(e);
   }
   // "F12" key
   if (event.keyCode == 123) {
       disabledEvent(e);
   }

}

function disabledEvent(e) {
   if (e.stopPropagation) {
       e.stopPropagation();
   } else if (window.event) {
       window.event.cancelBubble = true;
   }
   e.preventDefault();
   return false;
}	

function getExistingTasks(e) {

	let tasks;
	if(localStorage.getItem("tasks") == null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function (task) {
		let list = document.createElement("li");
		list.className = "list-group-item";
		list.style.backgroundColor = "#ebebeb";
		list.textContent = task;
		let button = document.createElement("button");
		button.className = "btn-sm btn-close float-end";
		button.setAttribute("area-label", "Close");
		list.appendChild(button);
		tasksList.appendChild(list);
	});
	
}

function addNewTaskListener(e) {

	if(newTask.value == "") {
		alert("Please Enter Task !");
	} else {
		let list = document.createElement("li");
		let task = newTask.value;
		list.textContent = task;
		newTask.value = "";
		list.className = "list-group-item";
		list.style.backgroundColor = "#ebebeb";
		let button = document.createElement("button");
		button.className = "btn-sm btn-close float-end";
		button.setAttribute("area-label", "Close");
		list.appendChild(button);
		tasksList.appendChild(list);

		let tasks;
		if(localStorage.getItem("tasks") == null) {
			tasks = [];
		} else {
			tasks = JSON.parse(localStorage.getItem("tasks"));
		}
		tasks.push(task);
		tasks = JSON.stringify(tasks);
		localStorage.setItem("tasks", tasks);
	}

	e.preventDefault();

}

function removeTaskListener(e) {
	
	if(e.target.className == "btn-sm btn-close float-end") {
		if(confirm("Are You Sure About Removing This Task ?")) {
			e.target.parentElement.remove();
			let taskName = e.target.previousSibling.textContent;
			let tasks = JSON.parse(localStorage.getItem("tasks"));
			tasks.pop(taskName);
			if(tasks.length == 0) {
				localStorage.removeItem("tasks");
			} else {
				tasks = JSON.stringify(tasks);
				localStorage.setItem("tasks", tasks);
			}
		}
	}
	
}

function filterTaskListener(e) {

	let filterText = e.target.value.toLowerCase();
	let lists = document.getElementsByClassName("list-group-item");
	lists = Array.from(lists);
	lists.forEach(function (list) {
		let taskItem = list.textContent.toLowerCase();
		if(taskItem.includes(filterText)) {
			list.style.display = "block";
		} else {
			list.style.display = "none";
		}
	});

}

function clearAllTaskListener(e) {

	if(tasksList.children.length == 0) {
		alert("Please Enter Tasks Before Clearing !");
	} else {
		if(confirm("Are You Sure About Clearing All Tasks ?")) {
			let lists = Array.from(tasksList.children);
			lists.forEach(function (list) {
				list.remove();
			});

			if(localStorage.getItem("tasks") != null) {
				localStorage.removeItem("tasks")
			}
		}
	}

}