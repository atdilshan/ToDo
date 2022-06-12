const vApp = {

    addTask: () => {
        const taskText = document.getElementById('newTask'),
            taskDesc = document.getElementById('newTaskDesc'),
            contentBox = document.getElementById('tasksholder'),
            taskCreator = document.createElement('div'),
            textBox = document.createElement('div'),
            deleteButton = document.createElement('button'),
            editButton = document.createElement('button'),
            downButton = document.createElement('button'),
            upButton = document.createElement('button'),
            checkBox = document.createElement('input'),
            label = document.createElement('label');

        if (taskText.value.length > 0) {        // protection against empty input
            taskCreator.className = 'task-box';
            textBox.innerHTML = taskText.value;
            textBox.className = 'textBox';
            contentBox.insertBefore(taskCreator, contentBox.childNodes[0]);
            taskText.value = '';                // clear input box

            deleteButton.style.backgroundImage = "url('img/delete.png')";
            deleteButton.addEventListener('click', function() {
                contentBox.removeChild(this.parentNode);
            });

            editButton.style.backgroundImage = "url('img/edit.png')";
            editButton.addEventListener('click', function() {
                vApp.disableEditing(this.parentNode, true);
                vApp.editTask(this.parentNode);
            });

            downButton.style.backgroundImage = "url('img/down.png')";
            downButton.addEventListener('click', function() {
                if (this.parentNode ===  contentBox.lastChild) {
                    return false;
                } else {
                    vApp.swapElements(this.parentNode, this.parentNode.nextSibling);
                }
            });

            upButton.style.backgroundImage = "url('img/up.png')";
            upButton.addEventListener('click', function() {
                if (this.parentNode ===  contentBox.firstChild) {
                    return false;
                } else {
                    vApp.swapElements(this.parentNode, this.parentNode.previousSibling);
                }
            });

            checkBox.type = "checkbox";
            checkBox.addEventListener('click', function() {
               vApp.manageCheckbox(this.parentNode);
            });

            label.appendChild(checkBox);
            taskCreator.appendChild(textBox);
            taskCreator.appendChild(label);
            taskCreator.appendChild(downButton);
            taskCreator.appendChild(upButton);
            taskCreator.appendChild(editButton);
            taskCreator.appendChild(deleteButton);
            taskText.placeholder = 'What else needs to be done?';

        } else {
            vApp.warn();
        }
    },

    disableEditing: (buttonParent, enabling) => {
        buttonParent.childNodes[4].disabled = enabling;
    },

    editTask: (taskToEdit) => {
        const bubble = document.createElement('span'),
            inputField = document.createElement('input'),
            inputButton = document.createElement('button'),
            textContainer = document.createElement('div');

        inputField.value = taskToEdit.innerText;
        inputField.setAttribute('type', 'text');
        inputField.setAttribute('maxlength', '40');
        taskToEdit.removeChild(taskToEdit.firstChild);
        textContainer.className = 'textBox';
        bubble.className = 'bubble';
        inputButton.innerText = 'Ok';
        inputButton.style.fontSize = '18px';
        inputButton.style.color = "#dddddd";
        inputButton.addEventListener('click', function() {
            textContainer.innerHTML = inputField.value;
            taskToEdit.insertBefore(textContainer, taskToEdit.childNodes[0]);
            vApp.disableEditing(taskToEdit,false);
            bubble.parentNode.removeChild(bubble);
        });
        bubble.appendChild(inputField);
        bubble.appendChild(inputButton);
        taskToEdit.appendChild(bubble);
    },

    filterTasks: (type) => {
        const container = document.getElementById('tasksholder'),
             checkBoxes = container.getElementsByTagName("input");
        vApp.showAllTasks();
        for (let i = 0; checkBoxes.length > i; i++) {
            if (checkBoxes[i].type === "checkbox" && checkBoxes[i].checked === type) {
                checkBoxes[i].parentNode.parentNode.style.display='none';
            }
        }
    },

    manageCheckbox: (label) => {
        if(label.childNodes[0].checked === true) {
            label.style.backgroundImage = 'url(img/tick.png)';
        } else {
            label.style.backgroundImage = 'none';
        }
    },

    swapElements: (task1, task2) => {
        vApp.showAllTasks();                    // show all tasks first, otherwise you may be swapping with hidden divs
        const task2Parent = task2.parentNode;   // save placement of second task
        let task2Sibling = task2.nextSibling;
        if (task2Sibling === task1) {
            task2Parent.insertBefore(task1, task2);
        } else {
            task1.parentNode.insertBefore(task2, task1);
            if (task2Sibling) {                 // insert where task2 was
                task2Parent.insertBefore(task1, task2Sibling);
            } else {                            // in case task2 was the last one
                task2Parent.appendChild(task1);
            }
        }
    },

    showAllTasks: () => {
        const container = document.getElementById('tasksholder'),
            checkBoxes = container.getElementsByTagName("input");
        for(let i = 0; checkBoxes.length > i; i++) {
            checkBoxes[i].parentNode.parentNode.style.display='block';
        }
    },

    scanThrough: () => {
        const searchBar = document.getElementById('searchBar'),
            container = document.getElementById('tasksholder');
        vApp.showAllTasks();
        for (let i = 0; container.childElementCount > i; i++) {
            if (container.childNodes[i].innerText.includes(searchBar.value)) {
                container.childNodes[i].style.display='block';
            } else {
                container.childNodes[i].style.display='none';
            }
        }
    },

    warn: () => {
        const taskText = document.getElementById('newTask');
        taskText.placeholder = 'You can\'t add an empty task!';
        return false;
    },

};