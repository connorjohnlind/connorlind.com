$(function() {

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

    // Navigation
    var navPos = $('nav').position().top;
    var lastPos = 0;
    var lockTimer

    $(window).on('scroll', function() {

        var pos = $(window).scrollTop();
        var pos2 = pos + 50;
        var scrollBottom = pos + $(window).height();


        if (pos >= navPos && lastPos < pos) {
            $('nav').addClass('fixed');
        }
        if (pos < navPos && lastPos > pos) {
            $('nav').removeClass('fixed');
        }
        lastPos = pos;

    });


});
