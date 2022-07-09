$('#offers-section .switch .switch-input').on('change', function(e) {
    let notActiveSpan = $('#offers-section .offer-time-selection span').not('.active');
    $('#offers-section .offer-time-selection span').removeClass('active');
    notActiveSpan.addClass('active');
});

$('#hero-section header #nav-button').click(function() {
    $('#nav-button').toggleClass('active');
    let modal = $('#modal-nav');
    if ($('#modal-nav').hasClass('hidden')) {
        modal.removeClass('hidden');
        modal.stop(false, false).animate({top: "0"}, 400);
    } else {
        modal.stop(false, false).animate({top: "-100%"}, 400, function() {
            modal.addClass('hidden');
        });
    }
});