$(document).ready(function(){
    $('.menu-toggler').on('click', function() {
        $(this).toggleClass('open');
        $('.top-nav').toggleClass('open');
    });

    ScrollOut({
        targets: '.about-details h1, .about-details p, .about-details h6, .about-details table'
    });

    const pageDown = document.querySelector('.page-down');
    pageDown.addEventListener('click', function() {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    });

    const pageUp = document.querySelector('.page-up');
    pageUp.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    $('.top-nav .nav-link').on('click', function() {
        $('.menu-toggler').removeClass('open');
        $('.top-nav').removeClass('open');
    });

    const aboutScroll = document.querySelector('.about-link');
    aboutScroll.addEventListener('click', function() {
        window.scrollTo({ top: $('.about').offset().top - window.innerHeight / 4, behavior: 'smooth' });
    });

    const portfolioScroll = document.querySelector('.portfolio-link');
    portfolioScroll.addEventListener('click', function() {
        window.scrollTo({ top: $('.portfolio').offset().top - window.innerHeight / 4, behavior: 'smooth' });
    });

    const contactScroll = document.querySelector('.contact-link');
    contactScroll.addEventListener('click', function() {
        window.scrollTo({ top: $('.contact').offset().top - window.innerHeight / 4, behavior: 'smooth' });
    });

    var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 25,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows : true,
        },
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
    });

    $('input').focus(
        function(){
            $(this).parent('div').parent('div').css('padding-bottom','2px');
            $(this).parent('div').parent('div').css('margin-bottom','8px');
        }).blur(
        function(){
            $(this).parent('div').parent('div').css('padding-bottom','0px');
            $(this).parent('div').parent('div').css('margin-bottom','10px');
        });

    $('textarea').focus(
        function(){
            $(this).parent('div').parent('div').css('padding-bottom','2px');
            $(this).parent('div').parent('div').css('margin-bottom','8px');
        }).blur(
        function(){
            $(this).parent('div').parent('div').css('padding-bottom','0px');
            $(this).parent('div').parent('div').css('margin-bottom','10px');
        });

    setTimeout(function() {
            $('.flash').fadeOut('fast');
        }, 3500);
});