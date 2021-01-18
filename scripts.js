//Global variables
var caret = document.getElementsByClassName('caret')[0];
var buttonPrimary = document.getElementsByClassName('primary-btn')[0];
var addTaskButton = document.getElementsByClassName('add')[0];
var addTaskRow = document.getElementById('add-row');
var taskList = document.getElementById('task-list');
var overflowY = document.getElementsByClassName('overflow-y')[0];
var containerOne = document.getElementsByClassName('container-1')[0];
var containerTwo = document.getElementsByClassName('container-2')[0];
var blockOne = document.getElementsByClassName('block')[0];
var blockTwo = document.getElementsByClassName('sub-block')[0];

//Function to show full container on click
function showFullContainer() {
    containerOne.classList.add('col-third');
    containerOne.classList.remove('col-half');
    containerTwo.classList.add('col-full', 'slide-in');
    containerTwo.classList.remove('col-half');
    overflowY.classList.add('col-full');
    blockOne.style.display = 'none';
    blockTwo.style.display = 'block';
}

//Click funtion for the caret icon
caret.addEventListener('click', showFullContainer, false);

//Variables for box shadow colors
var pinkShadow = '0px 0px 26.2px rgba(165, 35, 186, 0.25)';
var blueShadow = '0px 0px 26.2px rgba(35, 50, 186, 0.25)';
var greenShadow = '0px 0px 26.2px rgba(74, 186, 35, 0.25)';
var colors = [pinkShadow, blueShadow, greenShadow];
var rowContainer = document.getElementsByClassName('row');
var index = 0;

//Hide button by default
buttonPrimary.style.display = 'none';
caret.style.display = 'none';

addTaskRow.style.boxShadow = colors[index];

//Add task button click listener
addTaskButton.addEventListener('click', function() {
    var taskTitle = document.getElementsByClassName('title')[0].value;
    var taskDescription = document.getElementsByClassName('text')[0].value;
    addTaskRow.style.display = 'none';
    if (index === 2) {
        index = 0;
    } else {
        index +=1;
    }
    addNewTask(taskTitle, taskDescription);
    document.getElementsByClassName('title')[0].value = '';
    document.getElementsByClassName('text')[0].value = '';
    buttonPrimary.style.display = 'inline-block';
    if (!document.getElementsByClassName('.block')[0]) {
        caret.style.display = 'inline-block';
    } else {
        caret.style.display = 'none';
    }
    numTotalTasks();
}, false);

buttonPrimary.addEventListener('click', function() {
    addTaskRow.style.display = 'flex';
}, false);

var totalNumTasks = document.getElementById('total-tasks');
//Default state
var totalNum = 0;

//Keep count of total number of tasks
//Always update the variable before updating the html
function numTotalTasks() {
    totalNum++;
    totalNumTasks.innerHTML = totalNum;
}  

//Descreae number of tasks when you click done
function decreaseNumTasks() {
    totalNum--;
    totalNumTasks.innerHTML = totalNum;
}

var outOfNum = document.getElementById('num-tasks');
var totalNumDone = 0;

//Keep count of tasks that have been done
function numTotalDone() {
    totalNumDone++;
    outOfNum.innerHTML = totalNumDone;
} 

function addNewTask(taskTitle, taskDescription) {
    //Creating the html string
    var taskHtml = `
        <li class="row flex f-column">
        <input class="title" placeholder="Title" value='` + taskTitle + `'></input>
        <textarea class="text" placeholder="Description">` + taskDescription + `</textarea>
        <div class="actions flex f-end">
            <span class="done" style="display: inline-block;">
                Done
                <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.1312 1.1566L13.9183 0L8.46452 5.2006L9.67742 6.3572L15.1312 1.1566ZM18.7785 0L9.67742 8.6786L6.08172 5.25802L4.86882 6.41462L9.67742 11L20 1.1566L18.7785 0ZM0 6.41462L4.8086 11L6.02151 9.8434L1.22151 5.25802L0 6.41462Z" fill="white"/>
                </svg>                                
            </span>
            <span class="delete flex f-center" style="display: flex !important;">
                <svg width="14" height="18" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.714286 10.6667C0.714286 11.4 1.35714 12 2.14286 12H7.85714C8.64286 12 9.28571 11.4 9.28571 10.6667V2.66667H0.714286V10.6667ZM2.47143 5.92L3.47857 4.98L5 6.39333L6.51429 4.98L7.52143 5.92L6.00714 7.33333L7.52143 8.74667L6.51429 9.68667L5 8.27333L3.48571 9.68667L2.47857 8.74667L3.99286 7.33333L2.47143 5.92ZM7.5 0.666667L6.78571 0H3.21429L2.5 0.666667H0V2H10V0.666667H7.5Z" fill="white"/>
                </svg>                                
            </span>
            <span class="add flex f-center" style="display: none;">Add                       
                <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.1312 1.1566L13.9183 0L8.46452 5.2006L9.67742 6.3572L15.1312 1.1566ZM18.7785 0L9.67742 8.6786L6.08172 5.25802L4.86882 6.41462L9.67742 11L20 1.1566L18.7785 0ZM0 6.41462L4.8086 11L6.02151 9.8434L1.22151 5.25802L0 6.41462Z" fill="white"/>
                </svg>         
            </span>
        </div>
    </li>
    `
    var taskHtmlElement = document.createElement('div');
        taskHtmlElement.innerHTML = taskHtml; 
        taskHtmlElement = taskHtmlElement.getElementsByTagName('li')[0];
        taskHtmlElement.style.boxShadow = colors[index];
        taskHtmlElement.getElementsByClassName('done')[0].addEventListener('click', function() {
            //Task is finished
            taskHtmlElement.parentNode.removeChild(taskHtmlElement);
            numTotalDone();
            decreaseNumTasks();
        })
        taskHtmlElement.getElementsByClassName('delete')[0].addEventListener('click', function() {
            //Task is deleted
            taskHtmlElement.parentNode.removeChild(taskHtmlElement);
        })
    
    //Add the row to the tree
    taskList.insertAdjacentElement('afterbegin', taskHtmlElement);
}