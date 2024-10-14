 AOS.init({
   duration: 500,
   easing: 'slide',
   once: true
 });

var form = document.getElementById("contact-form");

async function handleSubmit(event) {
  event.preventDefault();

  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      doneMessage(true);
    } else {
      failMessage();
    }
  }).catch(error => {
    failMessage();
  });
}
if (form) {
  form.addEventListener("submit", handleSubmit);
}

Fancybox.bind('[data-fancybox="gallery"]', {
  // Your custom options
  Images: {
    protected: true
  },
  Toolbar: {
    items: {
      facebook: {
        tpl: `<button class="f-button"><svg><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></button>`,
        click: () => {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}`,
            "",
            "left=0,top=0,width=600,height=300,menubar=no,toolbar=no,resizable=yes,scrollbars=yes"
          );
        },
      },
    },
    display: {
      left: ["infobar"],
      middle: [],
      right: [
        "facebook",
        "iterateZoom",
        "slideshow",
        "fullscreen",
        "thumbs",
        "close",
      ],
    },
  }
});

jQuery(document).ready(function($) {

  "use strict";

  FlexMasonry.init('.grid', {
    responsive: true,
    breakpointCols: {
      'min-width: 1200px': 5,
      'min-width: 600px': 3
    }
  });

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

      if ( $('.has-children').hasClass('active') ) {
        $('.has-children.active #collapseItem0').collapse('show');
      }

    }, 1000);

    $('body').on('click', '.menu-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();

    });

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

});

function doneMessage(redirect) {
  Swal.fire({
    title: "Thank you",
    text: "Thank you for your request. We will get back to you soon.",
    icon: "success",
    timer: 5000
  }).then(() => {
    // The swal closes automatically after the timer or when the button is clicked
    if (redirect) {
      window.location = location.protocol + "//" + location.host;
    }
  });
}

function failMessage() {
  Swal.fire({
    title: "An error occurred, please try again later.",
    text: "",
    icon: "error",
    timer: 5000
  });
}

function pumpkinMessage() {
  Swal.fire({
    html: '<a href="/contact"><img src="/images/pumpkin_ad.jpg" alt="Images" class="img-fluid"></a>',
    allowOutsideClick: true,
    showCancelButton: true, // Shows the cancel button
    confirmButtonText: "Book Now", // Confirm button text
    cancelButtonText: "Close", // Cancel button text
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/contact"; // Redirect on confirm
    }
  });
}
