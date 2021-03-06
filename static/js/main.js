$(document).ready(function(){

    $('.menu-toggler').on('click', function() {
        $(this).toggleClass('open');
        $('.nav-list').toggleClass('open');
        $('.top-nav').toggleClass('open');

        if ($('.nav-list').hasClass('open')) {
            $('.top-nav').removeClass('closed');
            $('.nav-list').removeClass('closed');
        } else {
            $('.top-nav').addClass('closed');
            $('.nav-list').addClass('closed');
        }
    });
    ScrollOut({
        targets: '.about-details h1, .about-details p, .about-details h6, .about-details table'
    });

    const pageDown = document.querySelector('.page-down');
    pageDown.addEventListener('click', function() {
        window.scrollTo({ top: $('.about').offset().top - window.innerHeight / 5, behavior: 'smooth' });
    });

    const pageUp = document.querySelector('.page-up');
    pageUp.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    $('.nav-list .nav-link').on('click', function() {
        $('.menu-toggler').removeClass('open');
        $('.nav-list').removeClass('open');
        $('.top-nav').removeClass('open');
    });

    const aboutScroll = document.querySelector('.about-link');
    aboutScroll.addEventListener('click', function() {
        window.scrollTo({ top: $('.about').offset().top - window.innerHeight / 5, behavior: 'smooth' });
    });

    const developmentScroll = document.querySelector('.development-link');
    developmentScroll.addEventListener('click', function() {
        window.scrollTo({ top: $('.development').offset().top - window.innerHeight / 5, behavior: 'smooth' });
    });

    const youtubeScroll = document.querySelector('.youtube-link');
    youtubeScroll.addEventListener('click', function() {
        window.scrollTo({ top: $('.youtube').offset().top - window.innerHeight / 5, behavior: 'smooth' });
    });

    const publicationsScroll = document.querySelector('.publications-link');
    publicationsScroll.addEventListener('click', function() {
        window.scrollTo({ top: $('.publications').offset().top - window.innerHeight / 5, behavior: 'smooth' });
    });

    const contactScroll = document.querySelector('.contact-link');
    contactScroll.addEventListener('click', function() {
        window.scrollTo({ top: $('.contact').offset().top - window.innerHeight / 5, behavior: 'smooth' });
    });

    var swiper = new Swiper('.swiper-container-portfolio', {
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
    });

    var swiper = new Swiper('.swiper-container-youtube', {
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
    });

    var swiper = new Swiper('.swiper-container-publications', {
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

    var video_wrapper = $('.youtube-video-place');
    if(video_wrapper.length){
    $('.youtube-video-place').on('click', function(){
    $('#'+this.id).html('<iframe allowfullscreen frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" class="embed-responsive-item" src="' + $(this).data("yt-url") + '"></iframe>');});}

});