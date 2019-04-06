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
const slider = document.querySelector('.main-slider');
const controls = slider.querySelector('.slider-controls');
const sliderButtons = controls.querySelectorAll('.slider-controls__btn');
const slides = slider.querySelectorAll('.main-slider__slide');
const sliderBackgrounds = ['./img/slide-1.png', './img/slide-2.png', './img/slide-3.png'];
const event = new CustomEvent('activate');
const activateSlide = (i) =>{
	if(sliderButtons[i].classList.contains('active')){
		return;
	}
	const currentActiveIndex = Object.values(sliderButtons).indexOf(controls.querySelector('.active'));
	sliderButtons[currentActiveIndex].classList.remove('active');
	slides[currentActiveIndex].classList.remove('active');
	sliderButtons[i].classList.add('active');
	slides[i].classList.add('active');
	slider.style.backgroundImage = `url(${sliderBackgrounds[i]})`;
};

for(let i = 0; i < sliderButtons.length; i++){
	sliderButtons[i].addEventListener('click', (evt) => {
		evt.preventDefault();
		activateSlide(i);
	});
	sliderButtons[i].addEventListener('activate', () => {
		activateSlide(i);
	});
}
let timerId = setTimeout( function changeSlider(){
	const activeBtn = controls.querySelector('.active');
	const nextBtn = activeBtn.nextElementSibling || activeBtn.parentNode.firstElementChild;
	nextBtn.dispatchEvent(event);
	timerId = setTimeout(changeSlider, 5000);
}, 5000);