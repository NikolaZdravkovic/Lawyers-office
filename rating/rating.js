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

    tasks.forEach(function (newUser) {

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
        p.innerHTML = newUser.text;

        div.appendChild(p);

        const h3 = document.createElement('h3');

        h3.className = "title";
        h3.innerHTML = newUser.name;
        div.appendChild(h3);


        cards.appendChild(div);



    });
}



// Add Task
function addTask(e) {
    if (name.value === '') {
        alert('Add a task');
    }
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


    e.preventDefault();
}



// Store Task
function save(name, surname, email2, text) {

    let tasks = [];



    const newUser = {
        name: name,
        surname: surname,
        email2: email2,
        text: text
    };

    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));

        if (!tasks.find(user => user.email2 === newUser.email2)) {
            tasks.push(newUser);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            alert(`User successfully registered!`);
            // location.assign("login.html");
        } else {
            alert(`User ${email2} already exist!`);
        }
    } else { // Ovo se izvrsava samo prvi put, tj. samo kada u localStorage-u
        // ne postoji polje/kljuc "users"
        tasks.push(newUser);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        alert(`User successfully registered!`);
        // location.assign("login.html");
    }


}