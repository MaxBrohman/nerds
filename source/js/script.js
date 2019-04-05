const buttons = document.querySelectorAll('.btn');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close-btn');

const closePopupKeydownHandler = (evt) => {
	if(evt.code === 'Escape'){
		evt.preventDefault();
		popup.classList.remove('popup--active');
		window.removeEventListener('keydown', closePopupKeydownHandler);
	}
};

buttons.forEach(btn => {
	btn.addEventListener('click', (evt) => {
		evt.preventDefault();
		popup.classList.add('popup--active');
		window.addEventListener('keydown', closePopupKeydownHandler);
	});
	btn.addEventListener('keydown', (evt) => {
		if(evt.code === 'Enter'){
			evt.preventDefault();
			popup.classList.add('popup--active');
		}
	});
});

popupClose.addEventListener('click', () => {
	popup.classList.remove('popup--active');
});

//slider
//Нужна динамическая коллекция
const controls = document.getElementsByClassName('slider-controls');
const sliderButtons = controls[0].getElementsByClassName('slider-controls__btn');

for(let elem of sliderButtons){
	elem.addEventListener('click', (evt) => {
		evt.preventDefault();
		if(elem.classList.contains('active')){
			return;
		}
		sliderButtons[Object.values(sliderButtons).indexOf(controls[0].querySelector('.active'))].classList.remove('active');
		elem.classList.add('active');
	});
};