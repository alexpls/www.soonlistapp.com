(function() {
  'use strict';

  var form = document.forms['remind-myself'];

  // if the reminder form doesn't exist on this page then don't bother trying
  // to do antything with it.
  if (!form) {
    return;
  }

  // Prevent the form from submitting, since we'll handle this behaviour ourselves
  // in Javascript:
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    var emailInput = form.email;
    var submittedEmail = emailInput.value;

    console.log("Email submitted: ", submittedEmail);

    if (isEmailValid(submittedEmail)) {
      console.log('Validation was successful');
      form.parentElement.removeChild(form);
      document.location.href = makeMailToSchemeURL(submittedEmail);

    } else {
      console.log('Validation failed');
      emailInput.classList.add('invalid');
    }

  }, false);

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
        'Please remember to download Soonlist for iPhone'
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
})();
