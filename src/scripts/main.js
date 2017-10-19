const $ = require('jquery');
const menu = require ('./common/menu');
const form = require ('./common/form');
const modal = require ('./common/modal');

if($('.hamburger').length){
  menu();  
}

if($('.form-sub').length){
  form();  
}

if($('.btn-order').length){
  modal.init(); 
}