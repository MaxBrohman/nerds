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

//range-controls
const rangeControls = document.querySelector('.range-controls');
const scale = rangeControls.querySelector('.scale');
const bar = rangeControls.querySelector('.bar');
const toggleMin = rangeControls.querySelector('.toggle-min');
const toggleMax = rangeControls.querySelector('.toggle-max');
const minPriceInput = document.querySelector('input[name="min-price"]');
const maxPriceInput = document.querySelector('input[name="max-price"]');
const maxValue = scale.clientWidth - toggleMax.offsetWidth - toggleMin.offsetWidth;
const MAX_PRICE_VALUE = 25000;
const TOGGLE_MIN_VAL = toggleMin.offsetLeft;

const getBarWidth = () => {
	//ширина и координаты шкалы меняются в зависимости от положения переключателей
	bar.style.left = `${toggleMin.offsetLeft - TOGGLE_MIN_VAL}px`;
	bar.style.right = `${rangeControls.clientWidth - toggleMax.offsetLeft - (rangeControls.clientWidth - (scale.offsetLeft + scale.clientWidth))}px`;
	bar.style.width = `${toggleMax.offsetLeft - toggleMin.offsetLeft}px`;
	setInputsValue
};
//при движении переключателей, значения инпутов меняются
const setInputsValue = () => {
	minPriceInput.value = (MAX_PRICE_VALUE * ((toggleMin.offsetLeft - TOGGLE_MIN_VAL)/maxValue)).toFixed(0);
	maxPriceInput.value = (MAX_PRICE_VALUE * ((toggleMax.offsetLeft - TOGGLE_MIN_VAL - toggleMax.offsetWidth)/maxValue)).toFixed(0);
};
//При вводе в инпут значени переключатель двигается пропорционально значению
const inputChangeHandler = (input, toggle, secondInput) => {
	input.addEventListener('change', () => {
		const inputValue = (value) => {
			if(isNaN(value) || value === '' || value === ' ' || value < 0){
				value = 0;
				input.value = value;
			}
			if((input.name === 'min-price' && value > secondInput.value) || (input.name === 'max-price' && value < secondInput.value)){
				value = secondInput.value;
				input.value = `${value}`;
			}
			return value;
		};
		toggle.style.left = `${+((maxValue * (inputValue(+input.value)/MAX_PRICE_VALUE)).toFixed(0)) + TOGGLE_MIN_VAL}px`;
		getBarWidth();
	});
};
inputChangeHandler(minPriceInput, toggleMin, maxPriceInput);
inputChangeHandler(maxPriceInput, toggleMax, minPriceInput);
class Drag{
	constructor(elem, scale){
		this.elem = elem;
		this.scale = scale;
		this.startCoord;
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.elem.addEventListener('mousedown', this.onMouseDown.bind(this));
		//Ограничителем для левого будет правый toggle и наоборот
		this.limiter = this.elem.nextElementSibling || this.elem.previousElementSibling;
	}
	onMouseDown(evt){
		this.startCoord = evt.clientX;
		document.addEventListener('mousemove', this.onMouseMove);
		document.addEventListener('mouseup', this.onMouseUp);
	}
	onMouseMove(evt){
		evt.preventDefault();
		const shift = evt.clientX - this.startCoord;
		this.startCoord = evt.clientX;
		this.elem.style.left = `${this.elem.offsetLeft + shift}px`;
		//если левый toggle, то обрабатываются выход за правый и за левую границу bar
		if(this.elem.nextElementSibling){
			if(this.elem.offsetLeft > this.limiter.offsetLeft - this.elem.offsetWidth){
				this.elem.style.left = `${this.limiter.offsetLeft - this.elem.offsetWidth}px`;
			}
			if(this.elem.offsetLeft < TOGGLE_MIN_VAL){
				this.elem.style.left = `${TOGGLE_MIN_VAL}px`;
			}
		//если правый toggle, то обрабатыавается выход за левый и за правую границу
		} else {
			if(this.elem.offsetLeft < this.limiter.offsetLeft + this.elem.offsetWidth){
				this.elem.style.left = `${this.limiter.offsetLeft + this.elem.offsetWidth}px`;
			}
			if(this.elem.offsetLeft > this.scale.clientWidth + TOGGLE_MIN_VAL - this.elem.offsetWidth){
				this.elem.style.left = `${this.scale.clientWidth + TOGGLE_MIN_VAL - this.elem.offsetWidth}px`;
			}
		}
		setInputsValue();
		getBarWidth();
	}
	onMouseUp(evt){
		evt.preventDefault();
		document.removeEventListener('mousemove', this.onMouseMove);
		document.removeEventListener('mouseup', this.onMouseUp);
	}
};
setInputsValue();
new Drag(toggleMin, scale);
new Drag(toggleMax, scale);