var slides = document.querySelectorAll('.main-slider__slide');
var sliderImg = document.querySelector('.main-slider');
var firstSlide = document.querySelector('.first-slide');
var secondSlide = document.querySelector('.second-slide');
var thirdSlide = document.querySelector('.third-slide');
var sliderToggle = document.querySelectorAll('.slider-toggle');
var firstBtn = document.querySelector('.toggle-first');
var secondBtn = document.querySelector('.toggle-second');
var thirdBtn = document.querySelector('.toggle-third');
var sliderBackgroundImgArray = ['url(img/slide-1.png)', 'url(img/slide-2.png)', 'url(img/slide-3.png)'];

firstBtn.addEventListener('click', function(){
    if (firstSlide.classList.contains('active')){
    } else {
        firstSlide.classList.add('active');
        secondSlide.classList.remove('active');
        thirdSlide.classList.remove('active');
        sliderImg.style.backgroundImage = sliderBackgroundImgArray[0];
    }
});
secondBtn.addEventListener('click', function(){
    if (secondSlide.classList.contains('active')){
    } else {
        secondSlide.classList.add('active');
        firstSlide.classList.remove('active');
        thirdSlide.classList.remove('active');
        sliderImg.style.backgroundImage = sliderBackgroundImgArray[1];
    }
});
thirdBtn.addEventListener('click', function(){
    if (thirdSlide.classList.contains('active')){
    } else {
        thirdSlide.classList.add('active');
        secondSlide.classList.remove('active');
        firstSlide.classList.remove('active');
        sliderImg.style.backgroundImage = sliderBackgroundImgArray[2];
    }
});