/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', './js/assets/particles.json', function() {
  console.log('callback - particles-js config loaded');
});

// isMobile
var isMobile;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  isMobile = true;

  // Mobile height fix
  $('.height-fix').each(function() {
    var h = $(this).height();
    $(this).height(h)
  })
}

/*****NAVIGATION*****/

var navPos = $('nav').position().top;

function highlightLink(href) {
  var $anchor = $('a[href="' + href + '"]');
  $('.active').removeClass('active');
  $($anchor).addClass('active');
}

$(window).scroll(function(){

  // Fixing Navigation Bar
  if ($(this).scrollTop() > navPos) {
    $('nav').addClass("fixed");
  } else {
    $('nav').removeClass("fixed");
  }

  //Link Hilighting

});
