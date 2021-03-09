 AOS.init({
   duration: 500,
   easing: 'slide',
   once: true
 });

jQuery(document).ready(function($) {

  "use strict";

  sendMessage('.send-message', true);

  FlexMasonry.init('.grid', {
    responsive: true,
    breakpointCols: {
      'min-width: 1200px': 5,
      'min-width: 600px': 3
    }
  });

  var gallery = function() {
    $('[data-fancybox="gallery"]').fancybox({
      loop: true,
      protect: true,
      buttons: [
        "share",
        "slideShow",
        "fullScreen",
        "thumbs",
        "close"
      ]
    });
  }
  gallery();

  var siteMenuClone = function() {

    $('.js-clone-nav').each(function() {
      var $this = $(this);
      $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
    });

    setTimeout(function() {

      var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

    $('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();

    });

    $(window).resize(function() {
      var $this = $(this),
        w = $this.width();

      if ( w > 768 ) {
        if ( $('body').hasClass('offcanvas-menu') ) {
          $('body').removeClass('offcanvas-menu');
        }
      }
    })

    $('body').on('click', '.js-menu-toggle', function(e) {
      var $this = $(this);
      e.preventDefault();

      if ( $('body').hasClass('offcanvas-menu') ) {
        $('body').removeClass('offcanvas-menu');
        $this.removeClass('active');
      } else {
        $('body').addClass('offcanvas-menu');
        $this.addClass('active');
      }
    })

    // click outisde offcanvas
    $(document).mouseup(function(e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ( $('body').hasClass('offcanvas-menu') ) {
          $('body').removeClass('offcanvas-menu');
        }
      }
    });
  };
  siteMenuClone();


  var siteCarousel = function () {
    if ( $('.nonloop-block-13').length > 0 ) {
      $('.nonloop-block-13').owlCarousel({
        center: false,
        items: 1,
        loop: false,
        stagePadding: 0,
        margin: 20,
        nav: true,
        navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
        responsive:{
          600:{
            margin: 20,
            items: 2
          },
          1000:{
            margin: 20,
            stagePadding: 0,
            items: 2
          },
          1200:{
            margin: 20,
            stagePadding: 0,
            items: 3
          }
        }
      });
    }

    $('.slide-one-item').owlCarousel({
      center: false,
      items: 1,
      loop: true,
      stagePadding: 0,
      margin: 0,
      autoplay: true,
      pauseOnHover: false,
      nav: true,
      navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
    });
  };
  siteCarousel();


  var swiperSetting = function() {
    var mySwiper = new Swiper ('.swiper-container', {
      // Optional parameters
      // direction: 'horizontal',
      // loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      mousewheel: {
        invert: false,
        forceToAxis: true,
        releaseOnEdges: true,
      },

      // direction: 'vertical',
      freeMode: true,
      // slidesPerView: 'auto',
      spaceBetween: 300,
      mousewheel: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      // And if we need scrollbar
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },

      slidesPerView: 3,
      breakpoints: {
        668: {
          slidesPerView: 1
        },
        1024: {
          slidesPerView: 2
        }
      },
      // paginationClickable: false,
      spaceBetween: 20,
      // freeMode: true,
      // grabCursor: true,
      // mousewheelControl: true

    })
  }
  swiperSetting();

});

function sendMessage(selector, redirect) {
  var $subscribeForm = $(selector + " form");

  $subscribeForm.on('submit', function(event){
    event.preventDefault();

    $.ajax({
      dataType: 'jsonp',
      url: "https://getsimpleform.com/messages/ajax?form_api_token=93729f2309759618ce1ddbed743dae23",
      data: $subscribeForm.serialize(),
    }).done(function() {
      doneMessage(redirect);
    }).fail(function() {
      failMessage();
    });
  });
}

function doneMessage(redirect) {
  swal({
    title: "Thank you",
    text: "Thank you for your request. We will get back to you soon.",
    timer: 5000,
    showConfirmButton: true,
    type: "success"
  },
  function(){
    swal.close();

    if(redirect) {
      window.location = location.protocol + "//" + location.host;
    }
  });
}

function failMessage() {
  swal({
    title: "An error occurred, please try again later.",
    text: "",
    type: "error",
    timer: 5000,
    showConfirmButton: true
  });
}