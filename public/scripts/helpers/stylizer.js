/* global $ */

// Functions for responsive menu


$(document).ready(menuSwitch);
$(window).on('resize', menuSwitch);

function menuSwitch() {
    if ($(window).innerWidth() <= 768) {
        $('.g-hbox').each(function(index, item) {
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

function getForm() {
    console.log('please');
    event.stopPropagation();
    event.stopImmediatePropagation();
    const form = $('.p-get-subcomments-form').next();
    if ((form).hasClass('hidden')) {
        (form).removeClass('hidden');
    } else {
        (form).addClass('hidden');
    }
}

$(document).on('click', '.p-get-subcomments-form', (ev) => {
    const $this = $(ev.target);
    const $form = $this.next();
    if (($form).hasClass('hidden')) {
        ($form).removeClass('hidden');
    } else {
        ($form).addClass('hidden');
    }
});

$(window).on('load', function() {
    // Animate loader off screen
    setTimeout(function() {
        $('.se-pre-con').fadeOut('slow');
     }, 3000);
});

