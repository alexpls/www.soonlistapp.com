(function() {

  'use strict';

  function Carousel(carouselElem) {
    var imageContainer = carouselElem.getElementsByClassName('images')[0];
    var slides = carouselElem.getElementsByTagName('img');
    var numSlides = slides.length;
    var currentSlideIdx = 0;
    var slideWidth = slides[0].width;

    setInterval(function() {
      currentSlideIdx++;

      if (currentSlideIdx > slides.length-1) {
        currentSlideIdx = 0;
      }

      console.log('showing slide' + currentSlideIdx);

      imageContainer.style.marginLeft = (-(currentSlideIdx * slideWidth)) + 'px';

      for (var i = 0; i < slides.length; i++) {
        var slide = slides[i];
        if (i === currentSlideIdx) {
          (function(slide) {
            setTimeout(function() {
              slide.classList.add('active');
            }, 250);
          })(slide);
        }
        slide.classList.remove('active');
      }
    }, 3000);
  }

  var carousels = document.getElementsByClassName('phone-carousel');
  for (var i = 0; i < carousels.length; i++) {
    var carouselElem = carousels[i];
    console.log('here')
    new Carousel(carouselElem);
  }

})();
