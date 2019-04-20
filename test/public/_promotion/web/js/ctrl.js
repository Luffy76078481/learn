$(function() {

    var arearHight = $('.area1_right').offset().top,
        scrollbarHight = $(window).scrollTop();


    $(window).scroll(function() {
        scrollbarHight = $(window).scrollTop();

        if (scrollbarHight >= arearHight) {
            $('#top').css({ "display": "block" })
        } else {
            $('#top').css({ "display": "none" })
        }

    });

      $('#top').click(function() {

            var homeani = $('.area1').offset().top;
            $('html,body').animate({
                scrollTop: homeani
            }, 500);

        })
})
