
// Adding review


const btn = document.getElementById("sbmBtn");
const name = document.getElementById("name");
const surname = document.getElementById("surname");
const email2 = document.getElementById("emailRev");
const text = document.getElementById("text");
const cards = document.getElementById("cards");
const form = document.querySelector('#task-form');

// DOM Load event
document.addEventListener('DOMContentLoaded', getTasks);
// Add task event
form.addEventListener('submit', addTask);

// Get Tasks from LS
function getTasks() {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (newComm) {

        const div = document.createElement('div');
        div.className = "testimonial";

        const div2 = document.createElement('div');
        div2.className = "pic";

        div.appendChild(div2);

        const img = document.createElement('img');
        img.src = "tormund.png";

        div2.appendChild(img);

        const p = document.createElement('p');
        p.className = "description";
        p.innerHTML = newComm.text;

        div.appendChild(p);

        const h3 = document.createElement('h3');

        h3.className = "title";
        h3.innerHTML = newComm.name;
        div.appendChild(h3);


        cards.appendChild(div);



    });
}



// Add Task
function addTask(e) {

    const filter = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const filterNameSurname = /[a-zA-Z]/
    if (!filter.test(email2.value)) {
        alert('please enter valid mail')
        e.stopPropagation()

    } if (!filterNameSurname.test(name.value)) {
        return false;
    }
    if (!filterNameSurname.test(surname.value)) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
        return false;
    }
    else { // ukoliko user ne prodje validaciju, ne ispiujemo ga
        save(name.value, surname.value, email2.value, text.value);

        const div = document.createElement('div');
        div.className = "testimonial";

        const div2 = document.createElement('div');
        div2.className = "pic";

        div.appendChild(div2);

        const img = document.createElement('img');
        img.src = "tormund.png";

        div2.appendChild(img);

        const p = document.createElement('p');
        p.className = "description";
        p.appendChild(document.createTextNode(text.value));

        div.appendChild(p);

        const h3 = document.createElement('h3');

        h3.className = "title";
        h3.appendChild(document.createTextNode(name.value));
        div.appendChild(h3);


        cards.appendChild(div);

    }


    e.preventDefault();
}



// Store Task
function save(name, surname, email2, text) {

    let tasks = [];



    const newComm = {
        name: name,
        surname: surname,
        email2: email2,
        text: text
    };

    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));




        if (!tasks.find(comm => comm.email2 === newComm.email2)) {
            tasks.push(newComm);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            alert(`User successfully registered!`);
            // location.assign("login.html");
        } else {
            alert(`User ${email2} already exist!`);
        }
    }    //else { // Ovo se izvrsava samo prvi put, tj. samo kada u localStorage-u
        // ne postoji polje/kljuc "users"
        //tasks.push(newComm);
        //localStorage.setItem("tasks", JSON.stringify(tasks));
        //alert(`User successfully registered!`);
        // location.assign("login.html");
    //}


}

