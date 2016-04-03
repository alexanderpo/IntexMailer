/* global $ */
/* eslint max-len: [2, 300, 4] */
/* eslint prefer-template:2, no-useless-concat:2 */

$(document).ready(() => {
  var frameElement = ''; // for button Change value

  function markSelect(element) { // added class for mark active element
    $(element).addClass('markedElement');
    // $(element).append('<a id="deleteBlock"><img src="/images/drop.png" /></a>');
    // element.css('background','#23ABF1');
  }

  $('.email-preview')
    .children()
    .load(() => { // load iframe document
      const iframeDocument = $('.email-preview').children().contents(); // get iframe doc

      iframeDocument.find('head')
        .append(   // append style for active element, style for cursor on hover
          '<style>.markedElement{background: rgba(255,133,85, 0.7);padding:2px;border-radius:10px;}a,img,h1,h2,h3,h4,h5,h6,span,strong,b,em,p,button,input{cursor:pointer;}</style>'
        );

      iframeDocument
        .find('a')
        .on('click', (click) => { // diactivate links in iframe doc
          click.preventDefault();
        });

      iframeDocument
        .find('body')
        .on('click', (event) => { // when object was cliked in iframe body tag
          $(frameElement).removeClass('markedElement'); // delete previous active element
          $('.setups').empty();  // clean place for new inputs

          const element = $(event.target); // varibals from active element
          const textElement = element.text();
          // const valueElement = element.val();
          const linkElement = element.attr('href');

          frameElement = element; // for global

          // edit only this elements
          if (element.is('h1') || element.is('h2') || element.is('h3') || element.is('h4') || element.is('h5') ||
            element.is('h6') || element.is('span') || element.is('em') || element.is('strong') || element.is('b')) {
            markSelect(element);
            $('.setups')
              .hide()
              .prepend(
                '<div class="setup"><h4>Enter a new TEXT:</h4><input type="text" name="titleName" value="'
                + textElement + ' "><button type="" id="textSetupButton"></button></div>'
              )
              .fadeIn(700);
          } else if (element.is('p')) {
            markSelect(element);
            $('.setups')
            .hide()
            .prepend(
              '<div class="setup"><h4>Enter a new TEXT:</h4><textarea name="textareaName"> '
              + textElement + '</textarea><button type="" id="textSetupButton"></button></div>'
             )
            .fadeIn(700);
          } else if (element.is('a') || element.is('button')) {
            markSelect(element);
            $('.setups')
            .hide()
            .prepend(
              '<div class="setup"><h4>Enter NAME for LINK:</h4><input type="text" name="link" value="'
              + textElement + ' "><button type="" id="textSetupButton"></button></div><div class="setup"><h4>Enter LINK:</h4><input type="text" name="link" value="'
              + linkElement + ' "><button type="" id="linkSetupButton"></button></div>'
            )
            .fadeIn(700);
          } else if (element.is('img')) {
            markSelect(element);
            $('.setups')
            .hide()
            .prepend(
              '<div class="setup"><h4>Choose image file from COMPUTER:</h4><input id="imgLoad" type="file" accept="image/*,image/jpeg" name="file"><button type="" id="imageSetupButton"></button></div>'
            )
            .fadeIn(700);
          }
        });
    });

  $(document).on('click', '#textSetupButton', () => { // edit text elements
    const inputValue = $('#textSetupButton').prev().val();
    frameElement.text(inputValue);
  });

  $(document).on('click', '#linkSetupButton', () => { // edit links elements
    const inputValue = $('#linkSetupButton').prev().val();
    frameElement.attr('href', inputValue);
  });

  $(document).on('click', '#imageSetupButton', () => { // edit links elements
    const tempPath = URL.createObjectURL($('#imageSetupButton').prev()[0].files[0]);
    frameElement.attr('src', tempPath);
  });
  // sending email

  $('#addEmailInput').on('click', () => {
    $('.emails').append(
      '<input type="email" class="email" name="email" placeholder="youremail@mail.com"><a id="deleteMailInput" class="deleteMailInput" />'
    )
    .fadeIn(700);
  });

  $(document).on('click', '.deleteMailInput', () => {
    $('#deleteMailInput').prev().remove();
    $('#deleteMailInput').remove();
  });

  $('.email').on('click', () => {
    $(frameElement).removeClass('markedElement');
  });

  $('#sendTemplate').on('click', () => {
    const frameDocument = $('.email-preview').children().contents().find('html').get(0);

    const email = $('.email').map(function() {
      return $(this).val();
    }).get();

    const template = frameDocument.outerHTML;

    const message = $('#message');

    message.text('Sending email. Please wait...').fadeIn('slow');

    $.get('/send', { to: email, content: template }, (data) => {
      if (data === 'send') {
        message.empty().html('Email is been sent at ' + email + ' . Please check inbox !').delay(6000).fadeOut('slow');
      } else {
        message.empty().html('Some problem. Please try later... ').delay(10000).fadeOut('slow');
      }
    });
  });
});
