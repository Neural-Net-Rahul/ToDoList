document.addEventListener('DOMContentLoaded',()=>{
    let addTaskButton = document.getElementById("add_task_btn");
    let taskContent = document.getElementById("inputData");
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskDisplay = document.getElementById('tasks');
    renderTasks(tasks);
    addTaskButton.addEventListener('click',()=>{
        if(taskContent.value == "") return;
        let data = taskContent.value;
        taskContent.value = "";
        tasks.push({
            id:Date.now(),
            data : data,
            strikethrough : false
        })
        localStorage.setItem('tasks',JSON.stringify(tasks));
        renderTasks(tasks);
    })
    function renderTasks(dbTask){
        taskDisplay.innerHTML = "";
        dbTask.map(
          (i) =>{
            let element = `<div></div>`
            if(i.strikethrough == true){
                element = `<div class="each_task strikethrough">
                    <li class='task_content' data-id=${i.id}>${i.data}</li> <button class="deleteTask" data-id=${i.id}>Delete</button>
                </div>`;
            }
            else{
                element = `<div class="each_task">
                    <li class='task_content' data-id=${i.id}>${i.data}</li> <button class="deleteTask" data-id=${i.id}>Delete</button>
                </div>`;
            }
            return taskDisplay.innerHTML += element;
          }
        );
    }
    window.deleteItem = function(id){
        let newTask = [];
        tasks.forEach(i => {
            if(i.id != id){
                newTask.push(i);
            }
        })
        tasks = newTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks(tasks);
    }
    taskDisplay.addEventListener('click',(event)=>{
        let classValue = event.target;
        let section = 1;
        let id = -1;
        if(classValue.classList.contains('each_task')){
            id = classValue.firstElementChild.getAttribute('data-id');
        }
        else if(classValue.classList.contains('task_content')){
            id = classValue.getAttribute('data-id');
            section = 2
        }
        else{
            id = classValue.getAttribute("data-id");
            section = 3;
        }
        let newTasks = [];
        tasks.forEach((i) => {
          if (i.id == id) {
            if(section != 3){
                let value = i.strikethrough;
                newTasks.push({ ...i, strikethrough: !value });
            }
          } else {
            newTasks.push(i);
          }
        });
        tasks = newTasks;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks(tasks);
    })
})
