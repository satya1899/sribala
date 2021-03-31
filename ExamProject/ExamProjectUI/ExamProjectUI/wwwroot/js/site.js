// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const uri = 'http://localhost:55722/api/equipment';
let examlist = [];



function getexams() {
    fetch(uri, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
    })
        .then(response => response.json())
        .then(data => _displayexamList(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addexam() {

    const exam = {
        Id: document.getElementById('Id').value,
        Description: document.getElementById('Description').value,
        IsDone: document.getElementById('IsDone').value
    };
    //Fetch API
    //axios
    //jquery ajax
    //angular http service
    fetch(uri, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(exam)
    })
        .then(response => response.json())
        .then(() => {
            getexams();
            ///addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    debugger;
    const item = examlist.find(item => item.Id === id);

    document.getElementById('editId').value = item.Id;
    document.getElementById('editDescription').value = item.Description;
    document.getElementById('editIsDone').value = item.IsDone;
    
}

function updateItem() {
    const Id = document.getElementById('editId').value;
    const exam = {
        Description: document.getElementById('editDescription').value,
        IsDone: document.getElementById('editIsDone').value,
    };

    fetch(`${uri}/${Id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(exam)
    })
        .then(() => getexam())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayexamList(data) {
    debugger;
    const tBody = document.getElementById('examlist');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let lableforId = document.createElement('label');
        lableforId.innerHTML = item.Id;

        let lableforexamName = document.createElement('label');
        lableforexamName.innerHTML = item.Description;

        let lableforexamType = document.createElement('label');
        lableforexamType.innerHTML = item.IsDone;

        

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.Id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.Id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(lableforId);

        let td2 = tr.insertCell(1);
        td2.appendChild(lableforDescriptions);

        let td3 = tr.insertCell(2);
        td3.appendChild(lableforIsDone);

        

        //let td2 = tr.insertCell(1);
        //let textNode = document.createTextNode(item.name);
        //td2.appendChild(textNode);

        let td5 = tr.insertCell(4);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(5);
        td6.appendChild(deleteButton);
    });

    examlist = data;
}

