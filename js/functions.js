//////// меню

let itm = document.querySelectorAll(".menu__link");

for (let i = 0; i < itm.length; i++) {
	itm[i].addEventListener("click", function () {
		burger.classList.remove("active");
		menu.classList.remove("active");
		body.classList.remove("lock");
	});
};

/////////// аккардион

document.querySelectorAll('.faq__triger').forEach((item) =>
	item.addEventListener('click', () => {

		item.parentNode.classList.toggle('faq__item-active');
	})
);

////////////// фикс 100% vh над загрузкой вставлять

window.addEventListener('resize', () => {
	// We execute the same script as before
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
});



//////////////попапы
const body = document.querySelector("body");
const popupLinks = document.querySelectorAll(".popup-link");
const lockPadding = document.querySelectorAll("lock-padding");

let unlock = true;

const timeout = 300;

if (popupLinks.length > 0) {
	for (let i = 0; i < popupLinks.length; i++) {
		const popupLink = popupLinks[i];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let i = 0; i < popupCloseIcon.length; i++) {
		const el = popupCloseIcon[i];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let i = 0; i < lockPadding.length; i++) {
			const el = lockPadding[i];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		for (let i = 0; i < lockPadding.length; i++) {
			const el = lockPadding[i];
			el.style.paddingRight = '0px';
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
};


//////////////табы

document.querySelectorAll('.tabs__triger').forEach((item) =>
	item.addEventListener('click', function (e) {
		e.preventDefault();
		const id = e.target.getAttribute('href').replace('#', '');

		document.querySelectorAll('.tabs__triger').forEach(
			(child) => child.classList.remove('tabs__triger-active')
		);
		document.querySelectorAll('.tabs__body').forEach(
			(child) => child.classList.remove('tabs__body-active')
		);

		item.classList.add('tabs__triger-active');
		document.getElementById(id).classList.add('tabs__body-active');
	})
);

document.querySelector('.tabs__triger').click();


////////////// форма количество

document.addEventListener("click", function (e) {
	let targetElement = e.target;
	if (targetElement.closest('.quantity__button')) {
		let value = parseInt(targetElement.closest('.quantity').querySelector('input').value);
		if (targetElement.classList.contains('quantity__button_plus')) {
			value++;
		} else {
			--value;
			if (value < 1) value = 1;
		}
		targetElement.closest('.quantity').querySelector('input').value = value;
	}
});







