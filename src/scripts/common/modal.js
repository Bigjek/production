const $ = require('jquery');
const modalInit = (function () {
  return {
    init: function () {
      $('.btn-order').on('click', function () {
        // $(this).unbind('click');
        $('.main').animate({ left: '-3000px' }, 'slow', (function () {
          $(this).addClass('hidden');
          $('.modal-order').animate({ left: '0' }, 100,(function () {
            $('.modal-order').addClass('in');
          }));
        }));
      });
      $('.form-contact__back').on('click', function () {
        $('.modal-order').animate({ left: '-3000px' }, 'slow', (function () {
          $('.modal-order').removeClass('in');  
          $('.main').animate({ left: '0' }, 100,(function () {
            $(this).removeClass('hidden');
          }));
        //   $('form')[0].reset();
        }));
      });
    },
  };
}());

module.exports = modalInit;