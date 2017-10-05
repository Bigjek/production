
const $ = require('jquery');
const valudForm = require('jquery-validation');
const maskForm = require('jquery-mask-plugin');

// инициализация
function formInit(){
  var wrapper = $( '.file-upload' ),
    inp = wrapper.find( 'input' ),
    btn = wrapper.find( '.button' ),
    lbl = wrapper.find( 'mark' );
    
    // Crutches for the :focus style:
  inp.focus(function(){
    wrapper.addClass( 'focus' );
  }).blur(function(){
    wrapper.removeClass( 'focus' );
  });
    
  var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;
    
  inp.change(function(){
    var file_name;
    if( file_api && inp[ 0 ].files[ 0 ] )
      file_name = inp[ 0 ].files[ 0 ].name;
    else
      file_name = inp.val().replace( 'C:\\fakepath\\', '' );
    
    if( ! file_name.length )
      return;
    
    if( lbl.is( ':visible' ) ){
      lbl.text( file_name );
      btn.text( 'Выбрать' );
    }else
      btn.text( file_name );
  }).change();

  $( window ).resize(function(){
    $( '.file-upload input' ).triggerHandler( 'change' );
  });

  //Validate form

  $('#myOrder').validate({
    rules:{
      'name':{
        required: true,
      },
      'email':{
        required: true, email: true,
      },
      'tel':{
        required: true,
      },
      'msg':{
        required: true,
      },
    },
    messages:{
      'name':{
        required: 'Не заполнено',
      },
      'email':{
        required: 'Не заполнено', email: 'Неверные данные',
      },
      'tel':{
        required: 'Не заполнено',
      },
      'msg':{
        required: 'Не заполнено',
      },
    },
    submitHandler: function(form) {
      alert('Данные будут отправлены после создания админки');
      $(form).submit(false);
    },
  });

  $('#tel').mask('+7(000) 000-00-00');
  
}

module.exports = formInit;