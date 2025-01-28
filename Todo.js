// All target
let form = document.querySelector("form");
let input = document.querySelector('input[type = "text"]');
let deleteAllTasks = document.querySelector('.deleteAllTasks');
let filterInput = document.querySelector('.header input')

// All event handlers
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value == '') {
    alert("Please add task first");
  } else {
    // function call for save data in local storage
    saveInLocalStorage(input.value);
    input.value = '';
    input.focus();
    addListItems();
  }
});

// Functions
function saveInLocalStorage(data) {
  let tasks = getTasksFromLocalStorage();
  let NewTasks;
  if(tasks != ''){
    NewTasks = tasks.concat(',' , data);
  }else{
    NewTasks = tasks.concat(data)
  }
  localStorage.setItem('tasks', JSON.stringify(NewTasks));
}


// Delete All Tasks onclick handler function
deleteAllTasks.addEventListener('click', function () {
  localStorage.removeItem('tasks');
  addListItems();
});

// Filter data event
filterInput.addEventListener('keyup',function(event){
  let tasks = getTasksFromLocalStorage().split(',');
  let result = tasks.filter(function(item,index){
  let inputValue = event.target.value.toLowerCase()
  let compare = item.toLowerCase()
    if(compare.includes(inputValue)){
        return item;
    }
  })

  addListItems(result);
})


// localStorage.setItem(JSON.Stringify());
// JSON.parse(localStorage.getItem());
// JSON.Stringify();
// JSON.parse();

// function to show list item Saved Data on local storage data
function addListItems(data) {
  let tasks;
  if(data == undefined){
     tasks = getTasksFromLocalStorage().split(',');
  }else{
    tasks = data;
  }

  document.querySelector('ul').innerHTML = '';
  if (tasks != '') {
    tasks.forEach(function (item, index) {
// <li><span>Task one</span><img src="trash-fill.svg" alt=""></li>
      let li = document.createElement('li');
      // <li></li>
      li.setAttribute('id',index)
      let span = document.createElement('span');
      // <span></span>
      let textNode = document.createTextNode(item);
      let img = document.createElement('img');
      img.setAttribute('src', "trash-fill.svg");
      span.appendChild(textNode);
      li.append(span, img);
      document.querySelector('ul').appendChild(li);
    });
    
  }
  singleDeleteButtonsFunction();
}
addListItems();

// get tasks from localStorage
function getTasksFromLocalStorage() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks == null) {
    localStorage.setItem('tasks', JSON.stringify(''));
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
}

// Delete Single Item on click delete icon
function singleDeleteButtonsFunction() {

  let singleDeleteButtons = document.querySelectorAll('ul li img');
  singleDeleteButtons.forEach(function (item, index) {
    item.addEventListener('click', function (event) {

      let id = event.target.parentElement.id;
      console.log(id);

      let tasks = getTasksFromLocalStorage().split(',');

      let filteredTasks = tasks.filter(function (item, index) {
        return index != id;
      });

      let str = filteredTasks.toString();
      console.log(str);

      localStorage.setItem('tasks', JSON.stringify(str));
      addListItems();
    });
  });
}
