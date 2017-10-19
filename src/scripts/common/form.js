const $ = require('jquery');
const valudForm = require('jquery-validation');
const maskForm = require('jquery-mask-plugin');

// инициализация
function formInit() {
  var wrapper = $('.file-upload'),
    inp = wrapper.find('input'),
    btn = wrapper.find('.button'),
    lbl = wrapper.find('mark');

  // Crutches for the :focus style:
  inp.focus(function () {
    wrapper.addClass('focus');
  }).blur(function () {
    wrapper.removeClass('focus');
  });

  var file_api = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;

  inp.change(function () {
    var file_name;
    if (file_api && inp[0].files[0])
      file_name = inp[0].files[0].name;
    else
      file_name = inp.val().replace('C:\\fakepath\\', '');

    if (!file_name.length)
      return;

    if (file_name.length > 40) {
      var src = file_name.substr(0, (40 - 3)) + '...';
      return lbl.text(src);
    }

    if (lbl.is(':visible')) {
      lbl.text(file_name);
      btn.text('Выбрать');
    } else
      btn.text(file_name);
  }).change();

  $(window).resize(function () {
    $('.file-upload input').triggerHandler('change');
  });
  $.validator.addMethod('params', function (value, element, param) {
    return this.optional(element) || value.match(new RegExp('.' + param + '$'));
  });
  $.validator.addMethod('filesize', function (value, element, param) {
    return this.optional(element) || (element.files[0].size <= param);
  }, 'File size must be less than {0}');
  //Validate form
  var validatorShooting = $('#myOrder').validate({
    rules: {
      'name': {
        required: true,
      },
      'email': {
        required: true,
        email: true,
      },
      'tel': {
        required: true,
        minlength: 16,
      },
      'msg': {
        required: true,
      },
      'pack': {
        required: false,
        params: '(docx?|doc|pdf|txt|xlsx)',
        filesize: 5000000,
      },
    },
    messages: {
      'name': {
        required: 'Не заполнено',
      },
      'email': {
        required: 'Не заполнено',
        email: 'Неверные данные',
      },
      'tel': {
        required: 'Не заполнено',
        minlength: 'Не заполнено',
      },
      'msg': {
        required: 'Не заполнено',
      },
      'pack': {
        params: 'Формат doc|pdf|xlsx|txt',
        filesize: 'Файл больше 5MB.',
      },
    },
    submitHandler: function (form) {
      $(form).submit(function (e) {
        e.preventDefault();
        if (validatorShooting.form()) {
          var $form = $(this);
          var data = new FormData($('#myOrder')[0]);
          $('.modal-time').addClass('flex');
          $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            processData: false,
            contentType: false,
            data: data,
          }).done(function (data, request) {
            // $('#myOrder')[0].reset();
            $('.modal-success').addClass('flex');
            $('.modal-order').addClass('hidden');
          }).fail(function (data) {
            $('.modal-error').addClass('flex');
          }).always(function (data) {
            $('.modal-time').removeClass('flex');
          });
        }
      });
    },
  });

  $('#tel').mask('+7(000)000-00-00');
}
module.exports = formInit;