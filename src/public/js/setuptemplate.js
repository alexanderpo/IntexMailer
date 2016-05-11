/* global $ */
/* eslint max-len: [2, 300, 4] */
/* eslint prefer-template:2, no-useless-concat:2 */

$(document).ready(() => {
  var frameElement = '';

  function markSelect(element) {
    $(element).addClass('markedElement');
  }

  function showHideEmailSetupForm(objName) {
    if ($(objName).css('display') === 'none') {
      $(objName).animate({ height: 'show' }, 400);
    } else {
      $(objName).animate({ height: 'hide' }, 200);
    }
  }

  $('.email-preview')
    .children()
    .load(() => {
      const iframeDocument = $('.email-preview').children().contents();

      iframeDocument.find('head')
        .append(
          '<style>.markedElement{background: rgba(255,133,85, 0.7);padding:2px;border-radius:10px;}a,img,h1,h2,h3,h4,h5,h6,span,strong,b,em,p,button,input{cursor:pointer;}</style>'
        );

      iframeDocument
        .find('a')
        .on('click touchstart', (click) => {
          click.preventDefault();
        });

      iframeDocument
        .find('body')
        .on('click touchstart', (event) => {
          $(frameElement).removeClass('markedElement');
          $('.setups').empty();

          const element = $(event.target);
          const textElement = element.text();
          const linkElement = element.attr('href');

          frameElement = element;

          if (element.is('h1') || element.is('h2') || element.is('h3') || element.is('h4') || element.is('h5') ||
            element.is('h6') || element.is('span') || element.is('em') || element.is('strong') || element.is('b') ||
            element.is('p')) {
            markSelect(element);
            $('.setups')
              .hide()
              .prepend(
                '<div class="setup"><h4>Enter a new TEXT:</h4><textarea class="text-area" name="textareaName"> '
                + textElement + '</textarea></div>'
              )
              .fadeIn(300);
          } else if (element.is('a') || element.is('button')) {
            markSelect(element);
            $('.setups')
            .hide()
            .prepend(
              '<div class="setup"><h4>Enter a new TEXT:</h4><textarea class="text-area" name="textareaName"> '
              + textElement + '</textarea></div><div class="setup"><h4>Enter LINK:</h4><input type="text" name="link" value="'
              + linkElement + ' "><button type="" id="linkSetupButton"></button></div>'
            )
            .fadeIn(300);
          } else if (element.is('img')) {
            markSelect(element);
            $('.setups')
            .hide()
            .prepend(
              '<div class="setup"><h4>Choose image file from COMPUTER:</h4><input id="imgLoad" type="file" accept="image/*,image/jpeg" name="file"><button type="" id="imageSetupButton"></button></div>'
            )
            .fadeIn(300);
          }
        });
    });


  $(document).on('keyup', '.text-area', () => {
    const inputValue = $('.text-area').val();
    frameElement.text(inputValue);
  });

  $(document).on('click touchstart', '#linkSetupButton', () => {
    const inputValue = $('#linkSetupButton').prev().val();
    frameElement.attr('href', inputValue);
  });

  $(document).on('click touchstart', '#imageSetupButton', () => {
    const tempPath = URL.createObjectURL($('#imageSetupButton').prev()[0].files[0]);
    frameElement.attr('src', tempPath);
  });

  $('#showSetupEmailForm').on('click touchstart', () => {
    showHideEmailSetupForm('.emailsForm');
  });

  $('#addEmailInput').on('click touchstart', () => {
    $('.addedMails').append(
      '<input type="email" class="email" name="email" placeholder="recipientl@mail.com"><a id="deleteMailInput" class="deleteMailInput" />'
    )
    .fadeIn(700);
  });

  $(document).on('click touchstart', '.deleteMailInput', () => {
    $('#deleteMailInput').prev().remove();
    $('#deleteMailInput').remove();
  });

  $('#close-message').on('click', () => {
    $('#close-message').parent().fadeOut('slow');
  });

  $('.email').on('click touchstart', () => {
    $(frameElement).removeClass('markedElement');
  });

  $('#sendTemplate').on('click touchstart', () => {
    const frameDocument = $('.email-preview').children().contents().find('html').get(0);
    const email = $('.email').map(function() {
      return $(this).val();
    }).get();

    const template = frameDocument.outerHTML;
    const message = $('#message');
    const subject = $('#mailSubject').val();

    message.text('Sending email. Please wait...').fadeIn('slow');

    $.get('/send', { to: email, subj: subject, content: template }, (data) => {
      if (data === 'send') {
        message.empty().html('Email is been sent at <span id="message-email">' + email + '</span>. Please check inbox !').delay(6000).fadeOut('slow');
        $('#mailSubject').val('');
        $('.email').val('');
        $('.addedMails').empty();
      } else {
        message.empty().html('Some problem. Please try later... ').delay(10000).fadeOut('slow');
      }
    });
  });

  $('#authService').on('click touchstart', () => {
    const service = $('#services').val();
    const serviceUser = $('#serviceUser').val();
    const servicePassword = $('#servicePassword').val();
    const authMessage = $('#auth-message');

    authMessage.text('Auth. Waiting...').fadeIn('slow');

    $.get('/serviceAuth', { mailer: service, user: serviceUser, pass: servicePassword }, (data) => {
      if (data === 'auth') {
        authMessage.empty().html('Connected!').delay(3000).fadeOut('slow');
        $('#serviceUser').val('');
        $('#servicePassword').val('');
      } else {
        authMessage.empty().html('Some problem.Check required fields.').delay(3000).fadeOut('slow');
      }
    });
  });
});
