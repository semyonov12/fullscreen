document.addEventListener("DOMContentLoaded", function (event) {

	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});


	let burger = document.querySelector(".menu__burger");
	let menu = document.querySelector(".menu");
	let body = document.querySelector("body");
	const wrapper = document.querySelector('.wrapper');




	let pageSlider = new Swiper(".page", {
		// Свои классы
		wrapperClass: 'page__wrapper',
		slideClass: 'page__screen',

		direction: "vertical",

		slidesPerView: 'auto',

		keyboard: {
			enabled: true,
			onlyInViewport: true,
			pageUpDown: true,
		},


		mousewheel: {
			sensitivity: 1,
		},

		watchOverflow: true,

		speed: 800,

		observer: true,

		observeParents: true,

		observeSlideChildren: true,

		pagination: {
			el: ".swiper-pagination",
			clickable: true,

		},
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},

		init: false,
	
		on: {
			init: function() {
				menuSlider();
				setScrollType();
				wrapper.classList.add('loaded');
			},
			resize: function () {
				setScrollType();
			},
		},
	});

	document.addEventListener("click", function (e) {
		const targetElement = e.target;

		if (targetElement.closest(".menu__burger")) {
			burger.closest(".menu__burger").classList.toggle("active");
			menu.classList.toggle("active");
			body.classList.toggle("lock");
		}

		if (!targetElement.closest(".menu") && !targetElement.closest(".menu__burger")) {
			burger.classList.remove("active");
			menu.classList.remove("active");
			body.classList.remove("lock");
		}
	});

	const menuLinks = document.querySelectorAll('.menu__link');

	function menuSlider() {
		if (menuLinks.length) {
			for (let index = 0; index < menuLinks.length; index++) {
				const menuLink = menuLinks[index];
				menuLink.addEventListener("click", function (e) {
					e.preventDefault();

					pageSlider.slideTo(index, 800);
					burger.classList.remove("active");
					menu.classList.remove("active");
					body.classList.remove("lock");
					
				});
				
			}
		}
	}

	
// убрать слайдер если содиржимое не влазит в экран
	function setScrollType() {
		if (wrapper.classList.contains('free')) {
			wrapper.classList.remove('free');
			pageSlider.params.freeMode.enabled = false;
		}

		for (let index = 0; index < pageSlider.slides.length; index++) {
			const pageSlide = pageSlider.slides[index];
			const pageSlideContent = pageSlide.querySelector('.page__screen-content');
			if (pageSlideContent) {
				const pageSlideContentHeight = pageSlideContent.offsetHeight;
				if (pageSlideContentHeight > window.innerHeight) {
					wrapper.classList.add('free');
					pageSlider.params.freeMode.enabled = true;
					break;
				}
			}
		}
	}

	pageSlider.init();


});






