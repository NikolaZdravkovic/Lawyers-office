/**	
	
	Main JS
	
	
**/

jQuery(function ($) {


	/* 1. SCROLLSPY */

	$("#navbar ul li a[href^='#']").on('click', function (e) {

		// prevent default anchor click behavior
		e.preventDefault();

		// store hash
		var hash = this.hash;

		// animate
		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, 1000, function () {

			// when done, add hash to url
			// (default click behaviour)
			window.location.hash = hash;
		});

	});


	/* 2. HOVER DROP-DOWN */

	// for hover dropdown menu
	$('ul.nav li.dropdown').on('mouseenter', function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
	}).on('mouseleave', function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
	});




	/* 3. MAIN SLIDER (SLICK SLIDER) */

	jQuery('.main-slider').slick({
		dots: false,
		infinite: true,
		speed: 500,
		autoplay: true,
		accessibility: false,
		fade: true,
		cssEase: 'linear'
	});





	/* 4. SCROLL TOP BUTTON */

	//Check to see if the window is top if not then display button

	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 300) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});

	//Click event to scroll to top

	$('.scrollToTop').on('click', function () {
		$('html, body').animate({
			scrollTop: 0
		}, 800);
		return false;
	});


	/* 5. PRELOADER */

	$(window).on('load', function () { // makes sure the whole site is loaded
		$('#status').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(100).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(100).css({
			'overflow': 'visible'
		});
	})



	/* 6. WOW ANIMATION */

	wow = new WOW({
		animateClass: 'animated',
		offset: 100,
		live: true,

	});
	wow.init();

});

/* 7. GOOGLE MAP */


function initMap() {
	var uluru = {
		lat: 44.772437,
		lng: 20.477140
	};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}

/* 8. SLICK SLIDER(BLOG) */

$(function () {
	$('.slider').slick({
		centerMode: false,
		centerPadding: '60px',
		dots: true,
		/* Just changed this to get the bottom dots navigation */
		infinite: true,

		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 800,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 500,
			settings: {
				centerMode: false,
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}

		]
	});
});


/* 9. LOCAL STORAGE FOR QUICK FORM */

// const email = document.getElementById('form_email');
// const message = document.getElementById('form_message');
// const modal = document.getElementById('id01');


// //Event listner

// document.getElementById('form').addEventListener('submit', localStr)


// // Check email(regex)
// checkEmail = () => {

// 	var filter = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
// 	if (!filter.test(email.value)) {
// 		alert('please enter bla bla')
// 		email.value = '';
// 		return false;
// 	}
// 	getData();
// }

// // Local storage (setData and getData)
// getData = () => {

// 	localStorage.setItem('message', message.value)
// 	localStorage.setItem("email", email.value);
// 	document.getElementById('showEmail').innerHTML = localStorage.getItem('email');
// 	document.getElementById('showMessage').innerHTML = localStorage.getItem('message');

// 	modal.style.display = 'block';

// }
// // Cancel function
// cancel = () => {
// 	localStorage.clear();
// 	modal.style.display = "none";
// }
// // Confrim message function
// sendMsg = () => {

// 	// show loader
// 	document.getElementById("question").style.display = "none";
// 	document.getElementById('loading').style.display = "block";
// 	// modal.style.display = "none";
// 	setTimeout(endMsg, 2000);
// }


// // Local storage function

// function localStr(e) {

// 	checkEmail();

// 	e.preventDefault();
// }

// endMsg = () => {
// 	document.getElementById('showEnd').style.display = "block";
// 	document.getElementById('loading').style.display = "none";

// }

// ok = () => {
// 	document.getElementById('id01').style.display = 'none';
// 	window.location.reload()
// }







document.getElementById("btn").addEventListener("click", signup);
let users = [];
const modal = document.getElementById('id01');


const endMsg = () => {
	document.getElementById('showEnd').style.display = "block";
	document.getElementById('loading').style.display = "none";
}


const cancel = () => {
	users = JSON.parse(localStorage.getItem("users"));
	users.pop();
	localStorage.setItem("users", JSON.stringify(users));
	modal.style.display = "none";
}

const sendMsg = () => {
	// users;
	document.getElementById("question").style.display = "none";
	document.getElementById('loading').style.display = "block";

	setTimeout(endMsg, 2000);
}



const ok = () => {
	document.getElementById('id01').style.display = 'none';
	window.location.reload()
}



function signup(event) {
	event.preventDefault();

	const email = document.getElementById("email").value;
	const message = document.getElementById("message").value;




	save(email, message);
}

function save(email, message) {
	const newUser = {
		email: email,
		message: message,

	};

	if (localStorage.getItem("users")) {
		users = JSON.parse(localStorage.getItem("users"));

		if (!users.find(user => user.email === newUser.email)) {
			users.push(newUser);
			localStorage.setItem("users", JSON.stringify(users));
			alert(`User successfully registered!`);
		} else {
			alert(`User ${email} already exist!`);
		}
	} else { // Ovo se izvrsava samo prvi put, tj. samo kada u localStorage-u
		// ne postoji polje/kljuc "users"
		users.push(newUser);
		localStorage.setItem("users", JSON.stringify(users));
		alert(`User successfully registered!`);
	}

	modal.style.display = 'block';


	document.getElementById('showMessage').innerHTML = message;
	document.getElementById('showEmail').innerHTML = email;


}


