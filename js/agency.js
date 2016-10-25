/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */
 function detectIE() {
     var ua = window.navigator.userAgent;

     var msie = ua.indexOf('MSIE ');
     if (msie > 0) {
         // IE 10 or older => return version number
         return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
     }

     var trident = ua.indexOf('Trident/');
     if (trident > 0) {
         // IE 11 => return version number
         var rv = ua.indexOf('rv:');
         return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
     }

     var edge = ua.indexOf('Edge/');
     if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
     }

     // other browser
     return false;
 }
// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    var settings = {

      // Carousels
        carousels: {
          speed: 4,
          fadeIn: true,
          fadeDelay: 250
        },

    };
    var	$window = $(window),
			$body = $('body');

    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
    $('.carousel').each(function() {

      var	$t = $(this),
        $forward = $('<span class="forward"><i class="fa fa-arrow-right fa-2x"></i></span>'),
        $backward = $('<span class="backward"><i class="fa fa-arrow-left fa-2x"></i></span>'),
        $reel = $t.children('.reel'),
        $items = $reel.children('article');

      var	pos = 0,
        leftLimit,
        rightLimit,
        itemWidth,
        reelWidth,
        timerId;

      // Items.
        if (settings.carousels.fadeIn) {

          $items.addClass('loading');

            var	timerId,
              limit = $items.length - Math.ceil($window.width() / itemWidth);

            timerId = window.setInterval(function() {
              var x = $items.filter('.loading'), xf = x.first();

              if (x.length <= limit) {

                window.clearInterval(timerId);
                $items.removeClass('loading');
                return;

              }

              if (detectIE() < 10) {

                xf.fadeTo(750, 1.0);
                window.setTimeout(function() {
                  xf.removeClass('loading');
                }, 50);

              }
              else
                xf.removeClass('loading');

            }, settings.carousels.fadeDelay);
        }

      // Main.
        $t._update = function() {
          pos = 0;
          rightLimit = (-1 * reelWidth) + $window.width();
          leftLimit = 0;
          $t._updatePos();
        };

        if (detectIE() < 9)
          $t._updatePos = function() { $reel.css('left', pos); };
        else
          $t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };

      // Forward.
        $forward
          .appendTo($t)
          .hide()
          .mouseenter(function(e) {
            timerId = window.setInterval(function() {
              pos -= settings.carousels.speed;

              if (pos <= rightLimit)
              {
                window.clearInterval(timerId);
                pos = rightLimit;
              }

              $t._updatePos();
            }, 10);
          })
          .mouseleave(function(e) {
            window.clearInterval(timerId);
          });

      // Backward.
        $backward
          .appendTo($t)
          .hide()
          .mouseenter(function(e) {
            timerId = window.setInterval(function() {
              pos += settings.carousels.speed;

              if (pos >= leftLimit) {

                window.clearInterval(timerId);
                pos = leftLimit;

              }

              $t._updatePos();
            }, 10);
          })
          .mouseleave(function(e) {
            window.clearInterval(timerId);
          });

      // Init.
        $window.load(function() {

          reelWidth = $reel[0].scrollWidth;

            if ('ontouchstart' in document.documentElement) {

              $reel
                .css('overflow-y', 'hidden')
                .css('overflow-x', 'scroll')
                .scrollLeft(0);
              $forward.hide();
              $backward.hide();

            }
            else {

              $reel
                .css('overflow', 'visible')
                .scrollLeft(0);
              $forward.show();
              $backward.show();

            }

            $t._update();

          $window.resize(function() {
            reelWidth = $reel[0].scrollWidth;
            $t._update();
          }).trigger('resize');

        });

    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$('div.modal').on('show.bs.modal', function() {
	var modal = this;
	var hash = modal.id;
	window.location.hash = hash;
	window.onhashchange = function() {
		if (!location.hash){
			$(modal).modal('hide');
		}
	}
});
