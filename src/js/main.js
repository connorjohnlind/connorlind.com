// Browserify Imports
import "babel-polyfill";
import "particles.js";
import $ from "jquery";

// Module Imports
// ...

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', './js/assets/particles.json', function() {
  console.log('callback - particles-js config loaded');
});

// isMobile
var isMobile;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  isMobile = true;

/*****NAVIGATION*****/

var homeBottom = $('nav').position().top;
var navHeight = $('nav').height();

function highlightLink(href) {
  var $anchor = $('a[href="' + href + '"]');
  $('.active').removeClass('active');
  $($anchor).addClass('active');
}

$(window).scroll(function(){

  var pos = $(this).scrollTop();

  // Fixing Navigation Bar
  if (pos > homeBottom) {
    $('nav').addClass("fixed");
  } else {
    $('nav').removeClass("fixed");
  }

  //Link Hilighting
  if (pos < homeBottom)
    highlightLink('#home');
  if (pos > $('#about').position().top - navHeight)
    highlightLink('#anchor-about');
  if (pos > $('#portfolio').position().top - navHeight)
    highlightLink('#anchor-portfolio');
  if (pos > $('#contact').position().top - navHeight)
    highlightLink('#anchor-contact');

});
