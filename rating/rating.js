// Adding review


const btn = document.getElementById("sbmBtn");
const yourName = document.getElementById("name");
const lastName = document.getElementById("lastName");
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
        h3.innerHTML = newComm.yourName;
        div.appendChild(h3);


        cards.appendChild(div);



    });
}



// Add Task
function addTask(e) {

    const filter = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const filterName = /[a-zA-Z]/


    if (!filter.test(email2.value)) {
        showError("Molimo proverite Vas mejl")

    } else if (email2.value === '' || lastName.value === '' || yourName.value === '' || text.value === '') {
        showError('Molimo da ne ostavljate polja prazna');
    } else if (text.value.length < 10) {
        showError('Molimo da unesete minimalno 10 slova u komentaru');
    } else if (!filterName.test(lastName.value) || !filterName.test(yourName.value)) {

        showError('Molimo kucajte samo slova');
    } else { // ukoliko user ne prodje validaciju, ne ispiujemo ga

        save(yourName.value, lastName.value, email2.value, text.value);

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
        h3.appendChild(document.createTextNode(yourName.value));
        div.appendChild(h3);


        cards.appendChild(div);

    }






    e.preventDefault();
}



// Store Task
function save(yourName, lastName, email2, text) {

    let tasks = [];



    const newComm = {
        yourName: yourName,
        lastName: lastName,
        email2: email2,
        text: text
    };


    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));




        if (!tasks.find(comm => comm.email2 === newComm.email2)) {
            tasks.push(newComm);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            Swal.fire({
                type: 'success',
                title: 'Vaš komentar je uspešno poslat!',
               
              })
            // alert(`User successfully registered!`);
            // location.assign("login.html");
        } else {
            alert(`User ${email2} already exist!`);
        }
    } else { // Ovo se izvrsava samo prvi put, tj. samo kada u localStorage-u
        // ne postoji polje / kljuc "users"
        tasks.push(newComm);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        alert(`User successfully registered!`);

    }


}

// Show Error
function showError(error) {
    // Create a div
    const errorDiv = document.createElement('div');

    const infoCard = document.getElementById("information-card");
    const headingInfo = document.getElementById("heading-info")

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    infoCard.insertBefore(errorDiv, headingInfo);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);

}

// Clear error
function clearError() {
    document.querySelector('.alert').remove();
}