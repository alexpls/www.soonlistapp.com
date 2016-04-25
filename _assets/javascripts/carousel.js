(function() {

  'use strict';

  var MS_PER_SLIDE = 5000;
  var MS_FOR_ANIM = 250;

  function Carousel(carouselElem) {
    var imageContainer = carouselElem.getElementsByClassName('images')[0];
    var slides = carouselElem.getElementsByTagName('img');
    var numSlides = slides.length;
    var numSlidesLoaded = 0;
    var currentSlideIdx = 0;

    function nextSlide() {
      var slideWidth = slides[0].width;

      currentSlideIdx++;

      if (currentSlideIdx > slides.length-1) {
        currentSlideIdx = 0;
      }

      console.log('showing slide' + currentSlideIdx);

      for (var i = 0; i < slides.length; i++) {
        var slide = slides[i];
        slide.classList.remove('active');

        if (i === currentSlideIdx) {
          slide.classList.add('active');
        }
      }

      imageContainer.style.marginLeft = (-(currentSlideIdx * slideWidth)) + 'px';
    }

    function loadedSlide() {
      numSlidesLoaded++;
      if (numSlidesLoaded === numSlides) {
        setInterval(nextSlide, MS_PER_SLIDE - MS_FOR_ANIM);
      }
    }

    for (var i = 0; i < slides.length; i++) {
      var slide = slides[i];
      if (slide.complete) {
        loadedSlide();
      } else {
        slide.addEventListener('load', loadedSlide, false)
      }
    }
  }

  var carousels = document.getElementsByClassName('phone-carousel');
  for (var i = 0; i < carousels.length; i++) {
    var carouselElem = carousels[i];
    new Carousel(carouselElem);
  }

})();
