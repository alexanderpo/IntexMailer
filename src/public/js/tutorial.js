 /* global $ */

$(document).ready(() => {
  function showHideTutorialStep(objName) {
    if ($(objName).css('display') === 'none') {
      $(objName).animate({ height: 'show' }, 400);
    } else {
      $(objName).animate({ height: 'hide' }, 200);
    }
  }

  $('.tutorial-title').on('click touchstart', () => {
    showHideTutorialStep('.tutorial-image');
  });
});
