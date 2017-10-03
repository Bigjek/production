const $ = require('jquery');
const menu = require ('./common/menu');
const form = require ('./common/form');

if($('.hamburger').length){
  menu();  
}

if($('.form-sub').length){
  form();  
}
