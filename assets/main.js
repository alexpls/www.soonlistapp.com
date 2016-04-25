(function() {

  'use strict';

  function Carousel(carouselElem) {
    var imageContainer = carouselElem.getElementsByClassName('images')[0];
    var slides = carouselElem.getElementsByTagName('img');
    var numSlides = slides.length;
    var numSlidesLoaded = 0;
    var currentSlideIdx = 0;
    var slideWidth = slides[0].width;

    function nextSlide() {
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
    }

    function loadedSlide() {
      numSlidesLoaded++;
      if (numSlidesLoaded === numSlides) {
        setInterval(nextSlide, 3000);
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
(function() {
  'use strict';

  var form = document.forms['remind-myself'];
  var emailInput = form.email;
  var submitButton = form.submit;

  if (userIsOnIphone()) {
    var notOnIphoneElems = document.getElementsByClassName('not-on-iphone');
    [].forEach.call(notOnIphoneElems, function(elem) {
      elem.parentNode.removeChild(elem);
    });
  }

  if (!form || userIsOnIphone()) {
    return;
  }

  // Since the form is only really usable when JS is enabled, only show it once
  // we know the browser is running JS.
  form.classList.remove('hide');

  disableSendButton();

  // Prevent the form from submitting, since we'll handle this behaviour
  // ourselves in Javascript:
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    var submittedEmail = emailInput.value;

    console.log("Email submitted: ", submittedEmail);

    if (isEmailValid(submittedEmail)) {
      console.log('Validation was successful');
      emailInput.value = '';
      document.location.href = makeMailToSchemeURL(submittedEmail);

    } else {
      console.log('Validation unsuccessful');
      form.getElementsByClassName('input-with-error')[0].classList.add('showing-error');
    }
  }, false);

  emailInput.addEventListener('keyup', disableSendButton, false);

  function disableSendButton() {
    submitButton.disabled = emailInput.value.length === 0;
  }

  function isEmailValid(email) {
    return /.+\@.+\..+/gi.test(email);
  }

  function makeMailToSchemeURL(toEmail) {
    var params = {
      to: toEmail,
      subject: 'Download Soonlist!',
      body: [
        'Dear future me,',
        '',
        'Please remember to download Soonlist for iPhone',
        '',
        'Regards,',
        'Past me'
      ].join('\n')
    };

    return [
      'mailto:?',
      urlEncodeParams(params)
    ].join('');
  }

  function urlEncodeParams(params) {
    var encodedParams = [];

    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        var key = param, value = params[param];
        encodedParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      }
    }

    return encodedParams.join('&');
  }

  function userIsOnIphone() {
    return /i(Phone|Pod)/i.test(navigator.userAgent);
  }
})();


