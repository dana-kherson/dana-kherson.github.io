
    
  /* ==============================================
  Main Elements
  =============================================== */
  jQuery(document).ready(function ($) {
    'use strict';

   /* $(function () {
        $('.navbar.navbar-expand-lg li > a[href*=#]:not([href=#])').on('click', function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    }); */
    
	// Preloader
	$(window).on("load", function() {
        $("#preloader").fadeOut(600);
        $(".preloader-bg").delay(400).fadeOut(600);
		
        setTimeout(function() {
            $(".fadeIn-element").delay(600).css({
                display: "none"
            }).fadeIn(800);
        }, 0);
    }); 
	// PARALLAX
			$.stellar({
				horizontalScrolling: false,
				verticalOffset: 0,
				responsive:true
			});
	// DATA BACKGROUND IMAGE
			var pageSection = $("*");
			pageSection.each(function(indx){
				if ($(this).attr("data-background")){
					$(this).css("background-image", "url(" + $(this).data("background") + ")");
				}
			});
    
    	// page loader
			$(window).load(function(){
				$("body").addClass("page-loaded");	
            });

            // loading bars
$(".bar").each(function(){
    $(this).find(".bar-inner").animate({
    width: $(this).attr("data-width")
    },2000)
    });
    
    // wow
    new WOW().init();
    // Fit Video
    try {
        $(".fit-videos").fitVids();
    }
    catch(err) {
        
    }
    /* ==============================================
    MENU
    =============================================== */
	/*var wind = $(window);

    wind.on("scroll", function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar.navbaroverlay"),
            logo = $(".navbar.navbaroverlay .logo> img");

        if (bodyScroll > 300) {
            navbar.addClass("nav-scroll");
            logo.attr('src', 'agency/images/logo.png');

        } else {
            navbar.removeClass("nav-scroll");
            logo.attr('src', 'agency/images/logo-light.png');
        }
    });
    $('.navbar .search .icon').on('click', function () {
        $(".navbar .search .search-form").fadeIn();
    });

    $('.navbar .search .search-form .close').on('click', function () {
        $(".navbar .search .search-form").fadeOut();
    });
    // dark style
    var wind = $(window);

    wind.on("scroll", function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $("body.dark-style .navbar.navbaroverlay"),
            logo = $("body.dark-style .navbar.navbaroverlay .logo> img");

        if (bodyScroll > 300) {
            navbar.addClass("nav-scroll");
            logo.attr('src', 'agency/images/logo-light.png');

        } else {
            navbar.removeClass("nav-scroll");
            logo.attr('src', 'agency/images/logo-light.png');
        }
    });

    // side menu toggle
        // close navbar-collapse when a  clicked
        $(".navbar-nav a").on('click', function () {
            $(".navbar-collapse").removeClass("show");
        });*/

    /* ==============================================
    Active Menu
    =============================================== */
        jQuery(function() {
            var sections = jQuery('section');
            var navigation_links = jQuery('.navbar.navbar-expand-lg li > a');
            sections.waypoint({
                handler: function(direction) {
                    var active_section;
                    active_section = jQuery(this);
                    if (direction === "up") active_section = active_section.prev();
                    var active_link = jQuery('.navbar.navbar-expand-lg li > a[href="#' + active_section.attr("id") + '"]');
                    navigation_links.parent().removeClass("active");
                    active_link.parent().addClass("active");
                    active_section.addClass("active-section");
                },
                offset: '35%'
            });
        });
    /* ==============================================
    OnScroll Animation
    =============================================== */
    	$('.animated').appear(function() {

	        var elem = $(this);
	        var animation = elem.data('animation');

	        if ( !elem.hasClass('visible') ) {
	        	var animationDelay = elem.data('animation-delay');
	            if ( animationDelay ) {
	                setTimeout(function(){
	                    elem.addClass( animation + " visible" );
	                }, animationDelay);

	            } else {
	                elem.addClass( animation + " visible" );
	            }
	        }
	    });

    /* ==============================================
    MAGNIFIC POPUP
    =============================================== */

        $('.portfolio-grid').magnificPopup({
            delegate: 'a.info', // the selector for gallery item
            type: 'image',
            gallery: {
                enabled: true
            }
        });

    /* ==============================================
    OWL CAROUSEL
    =============================================== */

    $('.portfolio-grid').owlCarousel({
        loop: true,
        margin: 0,
        slideSpeed: 500,
        nav: false,
        responsive: {
            0: {
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                items: 2
            },
            380: {
                items: 2
            },
            450: {
                items: 3
            },
            600: {
                items: 3.5
            },
            1000: {
                items: 5.5
            },
            1200: {
                items: 5.5
            },
            1400: {
                items: 5.5
            },
            1500: {
                items: 5.5
            }
        }
    });

    $('.projects').owlCarousel({
        loop: true,
        margin: 0,
        slideSpeed: 5000,
        slideTransition: 'linear',
        nav: false,
        dots: false,
        responsive: {
            0: {
                autoplay: true,
                autoplayTimeout: 8000,
                autoplayHoverPause: true,
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    $('.customNextBtn').click(function() {
        var owl = $('.projects');
        owl.owlCarousel();
        owl.trigger('next.owl.carousel');
    });

    $('.customPrevBtn').click(function() {
        var owl = $('.projects');
        owl.owlCarousel();
        owl.trigger('prev.owl.carousel', [300]);
    });
    /* ==============================================
    CountTo
    =============================================== */
		jQuery(function($) {
								
			$(".numbers-value").appear(function() {
				$(this).countTo();
		});
	
      });
    /* ==============================================
    Portfolio Filer
    =============================================== */    
    $(window).on("load", function () {

    var wind = $(window);

    // Preloader
    $(".loading").fadeOut(500);


    // isotope
    $('.gallery').isotope({
        itemSelector: '.items'
    });

    var $gallery = $('.gallery').isotope();

    // filter items on button click
    $('.filtering').on('click', 'span', function () {

        var filterValue = $(this).attr('data-filter');

        $gallery.isotope({ filter: filterValue });

    });

    $('.filtering').on('click', 'span', function () {

        $(this).addClass('active').siblings().removeClass('active');

    });

});
    /* ==============================================
    FlexSlider
    =============================================== */ 
    function initFlexSlider(){

        $('.flexslider').flexslider({
            animation: "slide",
            directionNav: false,
            slideshowSpeed: 3500,
            animationSpeed: 1000
        });

    }
    
    initFlexSlider();
    /* ==============================================
    Testimonials
    =============================================== */ 
    $('.testimonials-slider').flexslider({
        animation: "slide",
        animationSpeed: 1000,
        slideshow: true
    });
    
});






