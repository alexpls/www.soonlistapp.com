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
        'Please remember to download Soonlist for iPhone, it\'s the app that reminds you when your favourite movies are coming out!',
        '',
        'http://appstore.com/soonlistupcomingmovieinfoandreminders',
        '',
        'Take care of yourself,',
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
