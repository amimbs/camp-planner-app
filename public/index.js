

//This is our plaList
const planList = document.getElementById('planList');




//This Gear List
const geardivList = document.querySelector('.gearlistholder');
const addGearInput = document.querySelector('#addGearInput');
const addGearBtn = document.querySelector('#addGearBtn');

function gearaddLists() {
    if (addGearInput.value === '') {

        alert('Enter the list name please!!!');
    } else {
        const gearul = geardivList.querySelector('#gearlist_ul');
        const gearli = document.createElement('li');
        gearli.innerHTML = addGearInput.value;
        addGearInput.value = '';
        gearul.appendChild(gearli);
        gearcreateBtn(gearli);
    }
}

addGearBtn.addEventListener('click', () => {
    gearaddLists();
});

addGearInput.addEventListener('keyup', (event) => {
    if (event.which === 13) {
        gearaddLists();
    }
});

const gearlistUl = document.querySelector('.gearlist');
const gearlis = gearlistUl.children;

function gearcreateBtn(gearli) {
    const gearremove = document.createElement('button');
    gearremove.className = 'gear-btn-icon remove';
    gearli.appendChild(gearremove);

    const geardown = document.createElement('button');
    geardown.className = 'gear-btn-icon down';
    gearli.appendChild(geardown);

    const gearup = document.createElement('button');
    gearup.className = 'gear-btn-icon up';
    gearli.appendChild(gearup);

    return gearli;
}

for (var i = 0; i < gearlis.length; i++) {
    gearcreateBtn(gearlis[i]);
}

geardivList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const gearbutton = event.target;
        const gearli = gearbutton.parentNode;
        const gearul = gearli.parentNode;
        if (gearbutton.className === 'gear-btn-icon remove') {
            gearul.removeChild(gearli);
        } else if (gearbutton.className === 'gear-btn-icon down') {
            const gearnextLi = gearli.nextElementSibling;
            if (gearnextLi) {
                gearul.insertBefore(gearnextLi, gearli);
            }
        } else if (gearbutton.className === 'gear-btn-icon up') {
            const gearprevLi = gearli.previousElementSibling;
            if (gearprevLi) {
                gearul.insertBefore(gearli, gearprevLi);
            }
        }
    }
});


//This is for Grocery Card
const grodivList = document.querySelector('.grolistHolder');
const addgroInput = document.querySelector('#addgroInput');
const addgroBtn = document.querySelector('#addgroBtn');

function groaddLists() {
    if (addgroInput.value === '') {
        alert('Enter the list name please!!!');
    } else {
        const groul = grodivList.querySelector('#grolist_ul');
        const groli = document.createElement('li');
        groli.innerHTML = addgroInput.value;
        addgroInput.value = '';
        groul.appendChild(groli);
        grocreateBtn(groli);
    }
}

addgroBtn.addEventListener('click', () => {
    groaddLists();
});

addgroInput.addEventListener('keyup', (event) => {
    if (event.which === 13) {
        groaddLists();
    }
});

const grolistUl = document.querySelector('.grolist');
const grolis = grolistUl.children;

function grocreateBtn(groli) {
    const groremove = document.createElement('button');
    groremove.className = 'gro-btn-icon remove';
    groli.appendChild(groremove);

    const grodown = document.createElement('button');
    grodown.className = 'gro-btn-icon down';
    groli.appendChild(grodown);

    const group = document.createElement('button');
    group.className = 'gro-btn-icon up';
    groli.appendChild(group);

    return groli;
}

for (var i = 0; i < grolis.length; i++) {
    grocreateBtn(grolis[i]);
}

grodivList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const grobutton = event.target;
        const groli = grobutton.parentNode;
        const groul = groli.parentNode;
        if (grobutton.className === 'gro-btn-icon remove') {
            groul.removeChild(groli);
        } else if (grobutton.className === 'gro-btn-icon down') {
            const gronextLi = groli.nextElementSibling;
            if (gronextLi) {
                groul.insertBefore(gronextLi, groli);
            }
        } else if (grobutton.className === 'gro-btn-icon up') {
            const groprevLi = groli.previousElementSibling;
            if (groprevLi) {
                groul.insertBefore(groli, groprevLi);
            }
        }
    }
});

        // This is for the saving adventure button

        // const savedPage = localstorage.getItem("campplan");

        // function campplan() {
        //     const plan = document.getElementById("save")
        //}


        //New Adventure button
        const newad = document.querySelector('#newad');

        newad.addEventListener('click', () => {
            location.reload();
        });
     