// const { application } = require("express");

const divList = document.querySelector('.listHolder');
const addInput = document.querySelector('#addInput');
const addBtn = document.querySelector('#addBtn');

//signin-form testing
const form = document.getElementById('signin-form');
//////

function addLists() {
    if (addInput.value === '') {
        alert('Enter the list name please!!!');
    } else {
        const ul = divList.querySelector('ul');
        const li = document.createElement('li');
        li.innerHTML = addInput.value;
        addInput.value = '';
        ul.appendChild(li);
        createBtn(li);
    }
}

addBtn.addEventListener('click', () => {
    addLists();
});

addInput.addEventListener('keyup', (event) => {
    if (event.which === 13) {
        addLists();
    }
});

const listUl = document.querySelector('.list');
const lis = listUl.children;

function createBtn(li) {
    const remove = document.createElement('button');
    remove.className = 'btn-icon remove';
    li.appendChild(remove);

    const down = document.createElement('button');
    down.className = 'btn-icon down';
    li.appendChild(down);

    const up = document.createElement('button');
    up.className = 'btn-icon up';
    li.appendChild(up);

    return li;
}

for (var i = 0; i < lis.length; i++) {
    createBtn(lis[i]);
}

divList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const button = event.target;
        const li = button.parentNode;
        const ul = li.parentNode;
        if (button.className === 'btn-icon remove') {
            ul.removeChild(li);
        } else if (button.className === 'btn-icon down') {
            const nextLi = li.nextElementSibling;
            if (nextLi) {
                ul.insertBefore(nextLi, li);
            }
        } else if (button.className === 'btn-icon up') {
            const prevLi = li.previousElementSibling;
            if (prevLi) {
                ul.insertBefore(li, prevLi);
            }
        }
    }
});

//signin-form testing
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     fetch('/sign-in', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             username: e.target.email.value,
//             password: e.target.password.value
//         })
//     }).then(res => res.json()).then(data => {
//         console.log(data)
//     })
// })