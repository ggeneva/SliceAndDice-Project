/* global $ */

// Functions for responsive menu


$(document).ready(menuSwitch);
$(window).on('resize', menuSwitch);

function menuSwitch() {
    if ($(window).innerWidth() <= 768) {
        $('.g-hbox').each(function(index, item) {
            console.log(item);
            $(item).removeClass('g-hbox');
            $(item).addClass('g-mobile-menu');
        });
        $('#g-mobile-logo').removeClass('hidden');
        $('.g-logo-box').addClass('hidden');
    } else {
        $('.g-mobile-menu').each(function(index, item) {
            $(item).removeClass('g-mobile-menu');
            $(item).addClass('g-hbox');
        });
        $('#g-mobile-logo').addClass('hidden');
        $('.g-logo-box').removeClass('hidden');
    }
}
