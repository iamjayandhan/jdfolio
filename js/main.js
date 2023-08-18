// (function() {

//     var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

//     // Main
//     initHeader();
//     initAnimation();
//     addListeners();

//     function initHeader() {
//         width = window.innerWidth;
//         height = window.innerHeight;
//         target = {x: width/2, y: height/2};

//         largeHeader = document.getElementById('large-header');
//         largeHeader.style.height = height+'px';

//         canvas = document.getElementById('demo-canvas');
//         canvas.width = width;
//         canvas.height = height;
//         ctx = canvas.getContext('2d');

//         // create points
//         points = [];
//         for(var x = 0; x < width; x = x + width/20) {
//             for(var y = 0; y < height; y = y + height/20) {
//                 var px = x + Math.random()*width/20;
//                 var py = y + Math.random()*height/20;
//                 var p = {x: px, originX: px, y: py, originY: py };
//                 points.push(p);
//             }
//         }

//         // for each point find the 5 closest points
//         for(var i = 0; i < points.length; i++) {
//             var closest = [];
//             var p1 = points[i];
//             for(var j = 0; j < points.length; j++) {
//                 var p2 = points[j]
//                 if(!(p1 == p2)) {
//                     var placed = false;
//                     for(var k = 0; k < 5; k++) {
//                         if(!placed) {
//                             if(closest[k] == undefined) {
//                                 closest[k] = p2;
//                                 placed = true;
//                             }
//                         }
//                     }

//                     for(var k = 0; k < 5; k++) {
//                         if(!placed) {
//                             if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
//                                 closest[k] = p2;
//                                 placed = true;
//                             }
//                         }
//                     }
//                 }
//             }
//             p1.closest = closest;
//         }

//         // assign a circle to each point
//         for(var i in points) {
//             var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
//             points[i].circle = c;
//         }
//     }

//     // Event handling
//     function addListeners() {
//         if(!('ontouchstart' in window)) {
//             window.addEventListener('mousemove', mouseMove);
//         }
//         window.addEventListener('scroll', scrollCheck);
//         window.addEventListener('resize', resize);
//     }

//     function mouseMove(e) {
//         var posx = posy = 0;
//         if (e.pageX || e.pageY) {
//             posx = e.pageX;
//             posy = e.pageY;
//         }
//         else if (e.clientX || e.clientY)    {
//             posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//             posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//         }
//         target.x = posx;
//         target.y = posy;
//     }

//     function scrollCheck() {
//         if(document.body.scrollTop > height) animateHeader = false;
//         else animateHeader = true;
//     }

//     function resize() {
//         width = window.innerWidth;
//         height = window.innerHeight;
//         largeHeader.style.height = height+'px';
//         canvas.width = width;
//         canvas.height = height;
//     }

//     // animation
//     function initAnimation() {
//         animate();
//         for(var i in points) {
//             shiftPoint(points[i]);
//         }
//     }

//     function animate() {
//         if(animateHeader) {
//             ctx.clearRect(0,0,width,height);
//             for(var i in points) {
//                 // detect points in range
//                 if(Math.abs(getDistance(target, points[i])) < 4000) {
//                     points[i].active = 0.3;
//                     points[i].circle.active = 0.6;
//                 } else if(Math.abs(getDistance(target, points[i])) < 20000) {
//                     points[i].active = 0.1;
//                     points[i].circle.active = 0.3;
//                 } else if(Math.abs(getDistance(target, points[i])) < 40000) {
//                     points[i].active = 0.02;
//                     points[i].circle.active = 0.1;
//                 } else {
//                     points[i].active = 0;
//                     points[i].circle.active = 0;
//                 }

//                 drawLines(points[i]);
//                 points[i].circle.draw();
//             }
//         }
//         requestAnimationFrame(animate);
//     }

//     function shiftPoint(p) {
//         TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
//             y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
//             onComplete: function() {
//                 shiftPoint(p);
//             }});
//     }

//     // Canvas manipulation
//     function drawLines(p) {
//         if(!p.active) return;
//         for(var i in p.closest) {
//             ctx.beginPath();
//             ctx.moveTo(p.x, p.y);
//             ctx.lineTo(p.closest[i].x, p.closest[i].y);
//             ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
//             ctx.stroke();
//         }
//     }

//     function Circle(pos,rad,color) {
//         var _this = this;

//         // constructor
//         (function() {
//             _this.pos = pos || null;
//             _this.radius = rad || null;
//             _this.color = color || null;
//         })();

//         this.draw = function() {
//             if(!_this.active) return;
//             ctx.beginPath();
//             ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
//             ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
//             ctx.fill();
//         };
//     }

//     // Util
//     function getDistance(p1, p2) {
//         return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
//     }
    
// })();















(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);










// var confettiPlayers = [];

// function makeItConfetti() {
//   var confetti = document.querySelectorAll('.confetti');
  
//   if (!confetti[0].animate) {
//     return false;
//   }

//   for (var i = 0, len = confetti.length; i < len; ++i) {
//     var candycorn = confetti[i];
//     candycorn.innerHTML = '<div class="rotate"><div class="askew"></div></div>';
//     var scale = Math.random() * .7 + .3;
//     var player = candycorn.animate([
//       { transform: `translate3d(${(i/len*100)}vw,-5vh,0) scale(${scale}) rotate(0turn)`, opacity: scale },
//       { transform: `translate3d(${(i/len*100 + 10)}vw,105vh,0) scale(${scale}) rotate(${ Math.random() > .5 ? '' : '-'}2turn)`, opacity: 1 }
//     ], {
//       duration: Math.random() * 3000 + 5000,
//       iterations: Infinity,
//       delay: -(Math.random() * 7000)
//     });
    
//     confettiPlayers.push(player);
//   }
// }

// makeItConfetti();
// onChange({currentTarget: {value: 'bookmarks'}})

// document.getElementById('type').addEventListener('change', onChange)

// function onChange(e) {
//   document.body.setAttribute('data-type', e.currentTarget.value);
//   confettiPlayers.forEach(player => player.playbackRate = e.currentTarget.value === 'bookmarks' ? 2 : 1);
// }

function myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 4 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
  }





  $(document).ready(function() {
 
    // Fakes the loading setting a timeout
      setTimeout(function() {
          $('body').addClass('loaded');
      }, 750);
   
  });




  // TOGGLE BUTTON DARK MODE
//   document.getElementById("toggle").addEventListener("change",function() {
//     this.setAttribute("aria-checked",this.checked);
//   });




























$(document).ready(function() {
    $('#play-btn').click(function() {
      $('#video-modal').modal('show');
      $('#my-video').get(0).play();
    });
  
    $('#video-modal').on('hidden.bs.modal', function () {
      $('#my-video').get(0).pause();
    });
  });












