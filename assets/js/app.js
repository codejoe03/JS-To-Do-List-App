let todoEditIndex, updateBtn, activeSort, todoList;

updateBtn = document.getElementById('updateTaskButton')
updateBtn.disabled = true;

// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');
list.addEventListener('click', function (liCheck) {
  if (liCheck.target.tagName === 'LI') {
    liCheck.target.classList.toggle('checked');
  }
}, false);

// Create a "close" button and append it to each list item
let myTodoList, listLoop;
myTodoList = document.getElementsByTagName("LI");
for (listLoop = 0; listLoop < myTodoList.length; listLoop++) {
  let spanOne = document.createElement("SPAN");
  let spanTwo = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  let editBtn = document.createTextNode("Edit");
  spanOne.className = "close";
  spanTwo.className = "edit";
  spanOne.appendChild(txt);
  spanTwo.appendChild(editBtn);
  myTodoList[listLoop].appendChild(spanOne);
  myTodoList[listLoop].appendChild(spanTwo);
}

// Click on a close button to delete the current list item
let close, i;
close = document.getElementsByClassName("close");
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    let div = this.parentElement;
    //div.style.display = "none";
    div.remove();
  }
}

// Click on a edit button to edit the current list item
let editItem, j, taskTxt, taskShow;
editItem = document.getElementsByClassName("edit");
for (j = 0; j < editItem.length; j++) {
  editItem[j].onclick = function () {
    //console.log(j);
    taskTxt = this.parentElement;
    taskShow = document.getElementById('taskInput');
    taskShow.value = taskTxt.firstElementChild.innerHTML;
    document.getElementById('addTaskButton').disabled = true;
    updateBtn.disabled = false;
    saveEditTodoIndex();
    //taskTxt.remove();
    //console.log(this.parentElement.firstElementChild.innerHTML)
  }
}

function saveEditTodoIndex() {
  let liList, todoUlLi, taskShow, todoItem;
  //let todoUL = document.getElementById('todoUL');
  todoUlLi = document.getElementsByTagName('LI');
  for (liList = 0; liList < todoUlLi.length; liList++) {
    taskShow = document.getElementById('taskInput');
    todoItem = todoUlLi[liList].firstElementChild.innerHTML;
    if (taskShow.value == todoItem) {
      todoEditIndex = liList;
      console.log(liList)
    }
  }
}

function updateTask() {
  let taskShow, todos;
  taskShow = document.getElementById('taskInput');
  todos = document.getElementsByTagName('LI');
  console.log(todos[todoEditIndex].firstElementChild.innerHTML);
  todos[todoEditIndex].firstElementChild.innerHTML = taskShow.value;
  taskShow.value = "";
}

// Create a new list item when clicking on the "Add" button

function addTask() {
  let li, spanTxt, inputValue
  li = document.createElement("li");
  spanTxt = document.createElement("span");
  spanTxt.className = "taskTxt";

  inputValue = document.getElementById("taskInput").value;
  //let listedTask = document.createTextNode(inputValue);

  //li.appendChild(listedTask);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    spanTxt.append(inputValue);
    localStorage.setItem("item", inputValue);
    let spanClose = document.createElement("SPAN");
    let closeBtn = document.createTextNode("x");
    let editBtn = document.createTextNode("Edit");
    let spanEdit = document.createElement("SPAN");
    spanClose.className = "close";
    spanEdit.className = "edit";
    // spanClose.appendChild(closeBtn);

    // li.appendChild(spanClose);
    // li.appendChild(spanEdit);
    document.getElementById("todoUL").appendChild(li).appendChild(spanTxt);

    li.appendChild(spanClose);
    li.appendChild(spanEdit);
    spanEdit.appendChild(editBtn);
    spanClose.appendChild(closeBtn);
  }
  document.getElementById("taskInput").value = "";

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
      // div.remove();
    }
  }

  // Click on a edit button to edit the current list item
  let editItem, j, taskTxt, taskShow;
  editItem = document.getElementsByClassName("edit");
  for (j = 0; j < editItem.length; j++) {
    editItem[j].onclick = function () {
      //console.log(j);
      taskTxt = this.parentElement;
      taskShow = document.getElementById('taskInput');
      taskShow.value = taskTxt.firstElementChild.innerHTML;
      document.getElementById('addTaskButton').disabled = true;
      updateBtn.disabled = false;
      saveEditTodoIndex();
      //taskTxt.remove();
      //console.log(this.parentElement.firstElementChild.innerHTML)
    }
  }
}

// Clear List

function clearList() {
  let todoUl = document.getElementById('todoUL');
  todoUl.innerHTML = "";
}

function clearField() {
  let clearTxtField = document.getElementById('taskInput');
  clearTxtField.value = "";
  document.getElementById('addTaskButton').disabled = false;
  updateBtn.disabled = true;
}

// Sort List

function listSort() {
  let list, i, switching, b, shouldSwitch, dir, switchcount = 0;
  list = document.getElementById("todoUL");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  // Make a loop that will continue until no switching has been done:
  while (switching) {
    // start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("LI");
    // Loop through all list-items:
    for (i = 0; i < (b.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /* check if the next item should switch place with the current item,
      based on the sorting direction (asc or desc): */
      if (dir == "asc") {
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          /* if next item is alphabetically lower than current item,
          mark as a switch and break the loop: */
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
          /* if next item is alphabetically higher than current item,
          mark as a switch and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      // Each time a switch is done, increase switchcount by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function searchTask() {
  let input, filter, ul, li, spanText, i, txtValue;
  input = document.getElementById("taskSearch");
  filter = input.value.toUpperCase();
  ul = document.getElementById("todoUL");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    spanText = li[i].getElementsByClassName("taskTxt")[0];
    txtValue = spanText.textContent || li.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}