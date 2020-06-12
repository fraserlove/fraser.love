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

    const contactScroll = document.querySelector('.contact-link');
    contactScroll.addEventListener('click', function() {
        window.scrollTo({ top: $('.contact').offset().top - window.innerHeight / 5, behavior: 'smooth' });
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

    var video_wrapper = $('.youtube-video-place');
    if(video_wrapper.length){
    $('.youtube-video-place').on('click', function(){
    $('#'+this.id).html('<iframe allowfullscreen frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" class="embed-responsive-item" src="' + $(this).data("yt-url") + '"></iframe>');});}
});

!function(window){
    var $q = function(q, res){
          if (document.querySelectorAll) {
            res = document.querySelectorAll(q);
          } else {
            var d=document
              , a=d.styleSheets[0] || d.createStyleSheet();
            a.addRule(q,'f:b');
            for(var l=d.all,b=0,c=[],f=l.length;b<f;b++)
              l[b].currentStyle.f && c.push(l[b]);
  
            a.removeRule(0);
            res = c;
          }
          return res;
        }
      , addEventListener = function(evt, fn){
          window.addEventListener
            ? this.addEventListener(evt, fn, false)
            : (window.attachEvent)
              ? this.attachEvent('on' + evt, fn)
              : this['on' + evt] = fn;
        }
      , _has = function(obj, key) {
          return Object.prototype.hasOwnProperty.call(obj, key);
        }
      ;
  
    function loadImage (el, fn) {
      var img = new Image()
        , src = el.getAttribute('data-src');
      img.onload = function() {
        if (!! el.parent)
          el.parent.replaceChild(img, el)
        else
          el.src = src;
  
        fn? fn() : null;
      }
      img.src = src;
    }
  
    function elementInViewport(el) {
      var rect = el.getBoundingClientRect()
  
      return (
         rect.top    >= 0
      && rect.left   >= 0
      && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
      )
    }
  
      var images = new Array()
        , query = $q('img.lazy')
        , processScroll = function(){
            for (var i = 0; i < images.length; i++) {
              if (elementInViewport(images[i])) {
                loadImage(images[i], function () {
                  images.splice(i, i);
                });
              }
            };
          }
        ;
      // Array.prototype.slice.call is not callable under our lovely IE8 
      for (var i = 0; i < query.length; i++) {
        images.push(query[i]);
      };
  
      processScroll();
      addEventListener('scroll',processScroll);
  
  }(this);