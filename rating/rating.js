// Adding review


const btn = document.getElementById("sbmBtn");
const firstName = document.getElementById("name_2");
const lastName = document.getElementById("lastName");
const email2 = document.getElementById("emailRev");
const text = document.getElementById("text");
const cards = document.getElementById("cards");
const form = document.querySelector('#task-form');

// DOM Load event
document.addEventListener('DOMContentLoaded', getComment);
// Add task event
form.addEventListener('submit', addComment);

// Get Comments from LS
function getComment() {

    let comments;
    if (localStorage.getItem('comments') === null) {
        comments = [];
    } else {
        comments = JSON.parse(localStorage.getItem('comments'));
    }

    comments.forEach(function (newComm) {

        const div = document.createElement('div');
        div.className = "testimonial";

        const div2 = document.createElement('div');
        div2.className = "pic";

        div.appendChild(div2);

        const img = document.createElement('img');
        img.src = "anonimo.png";

        div2.appendChild(img);

        const p = document.createElement('p');
        p.className = "description";
        p.innerHTML = newComm.text;

        div.appendChild(p);

        const h3 = document.createElement('h3');

        h3.className = "title";
        h3.innerHTML = newComm.firstName;
        div.appendChild(h3);


        cards.appendChild(div);



    });
}



// Add Task
function addComment(e) {

    const filter = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const filterName = /[a-zA-Z]/


    if (!filter.test(email2.value)) {
        showError("Molimo proverite Vas mejl")

    } else if (email2.value === '' || lastName.value === '' || firstName.value === '' || text.value === '') {
        showError('Molimo da ne ostavljate polja prazna');
    } else if (text.value.length < 10) {
        showError('Molimo da unesete minimalno 10 slova u komentaru');
    } else if (!filterName.test(lastName.value) || !filterName.test(firstName.value)) {

        showError('Molimo kucajte samo slova');
    } else { // ukoliko user ne prodje validaciju, ne ispiujemo ga

        save(firstName.value, lastName.value, email2.value, text.value);

    }






    e.preventDefault();
}



// Store Task
const save = (firstName, lastName, email2, text) => {

    let comments = [];



    const newComm = {
        firstName: firstName,
        lastName: lastName,
        email2: email2,
        text: text
    };


    if (localStorage.getItem("comments")) {
        comments = JSON.parse(localStorage.getItem("comments"));




        if (!comments.find(comm => comm.email2 === newComm.email2)) {
            comments.push(newComm);
            localStorage.setItem("comments", JSON.stringify(comments));
            Swal.fire({
                type: 'success',
                title: 'Vaš komentar je uspešno poslat!',

            })
            appendCard();
            setTimeout(reload, 2000)
            // alert(`User successfully registered!`);
            // location.assign("login.html");
        } else {
            showError("Vec ste komentarisali")

        }
    } else { // Ovo se izvrsava samo prvi put, tj. samo kada u localStorage-u
        // ne postoji polje / kljuc "users"
        comments.push(newComm);
        localStorage.setItem("comments", JSON.stringify(comments));
        Swal.fire({
            type: 'success',
            title: 'Vaš komentar je uspešno poslat!',

        })

        appendCard();
        setTimeout(reload, 2000)


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

function appendCard() {
    const div = document.createElement('div');
    div.className = "testimonial";

    const div2 = document.createElement('div');
    div2.className = "pic";

    div.appendChild(div2);

    const img = document.createElement('img');
    img.src = "anonimo.png";

    div2.appendChild(img);

    const p = document.createElement('p');
    p.className = "description";
    p.appendChild(document.createTextNode(text.value));

    div.appendChild(p);

    const h3 = document.createElement('h3');

    h3.className = "title";
    h3.appendChild(document.createTextNode(firstName.value));
    div.appendChild(h3);


    cards.appendChild(div);

}

function reload() {
    window.location.reload();
}