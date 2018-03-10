var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device

$(document).ready(function() {

	var windowsHeight = $(window).height();

    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	if ('flex' in document.documentElement.style) {
		// Хак для UCBrowser
		if (navigator.userAgent.search(/UCBrowser/) > -1) {
			document.documentElement.setAttribute('data-browser', 'not-flex');
		} else {		
		    // Flexbox-совместимый браузер.
			document.documentElement.setAttribute('data-browser', 'flexible');
		}
	} else {
	    // Браузер без поддержки Flexbox, в том числе IE 9/10.
		document.documentElement.setAttribute('data-browser', 'not-flex');
	}

	// First screen full height
	function setHeiHeight() {
	    $('.full__height').css({
	        height: $(window).height() + 'px'
	    });
	}
	setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize( setHeiHeight ); // обновляем при изменении размеров окна


	// Reset link whte attribute href="#"
	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});

	// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
    $(document).ready(function(){
        var HeaderTop = $('.header').offset().top;
        
        $(window).scroll(function(){
                if( $(window).scrollTop() > HeaderTop + windowsHeight ) {
                        $('.header').addClass('stiky');
                } else {
                        $('.header').removeClass('stiky');
                }
        });
    });

   	gridMatch();

   	if (!isXsWidth()) {
	   	$('.first__screen_pretitle').fadeOut();

	   	$('body').css('overflow', 'hidden');

	   	// Animated first screen
	   	setTimeout(function() {
	   		$('.loader').addClass('hide');
	    	$('.first__screen_pretitle').fadeIn(500);
	  	}, 1000);
	    var elemAnim = $(".first__screen_anim");
	   	setTimeout(function() {
		   	$('body').removeAttr('style');
	   		$('.loader').remove();
		   	$('.first__screen_man').addClass('show');

		    (function add(i) {
		        elemAnim.eq(i).addClass("animated");
		        if (i < elemAnim.length - 1) {
		            setTimeout(function() { 
		            	add(i + 1);
		            	Play();
		            }, 1500);
		        }
		    })(0);
	   	}, 1500);

	   	setTimeout(function() {
	   		$('.first__screen_action').addClass('animated');
		   	$('.first__screen_man').addClass('show');
	   		$('.first__screen_date').addClass('animated');
	   		$('.header').addClass('show');
	   	}, 5500);

        $('.slide__top').addClass("hidden").viewportChecker({
            classToAdd: 'visible animated fadeInUp',
            offset: 100
        });

        $('.section__title').addClass("hidden").viewportChecker({
            classToAdd: 'visible animated fadeInLeft',
            offset: 100
        });

   	}


   	// Play video
   	$('#play').on('click', function() {
   		var $video = $('#video'),
			src = $video.attr('src');
   		$('#preview,.review__play').hide();
   		$video.show().attr('src', src + '&autoplay=1');
   	});

   	// Review slider
   	$('.review__slider').slick({

   	})

});

$(window).resize(function(event) {
	checkOnResize()
});

function checkOnResize() {
   	// setGridMatch($('[data-grid-match] .grid__item'));
	var windowsHeight = $(window).height();
   	gridMatch();
}

function gridMatch() {
   	$('[data-grid-match] .grid__item').matchHeight({
   		byRow: true,
   	});
}


function Play() {
	var audo = new Audio('audio/Sound_21018.mp3');
	audo.play();
}	

// Map

function initMap() {
    var uluru = {lat: 65.9991695, lng: 57.5243292};
    var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: uluru,
		styles: [
		    {
		        "featureType": "administrative",
		        "elementType": "all",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            }
		        ]
		    },
		    {
		        "featureType": "landscape",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            },
		            {
		                "color": "#fcfcfc"
		            }
		        ]
		    },
		    {
		        "featureType": "poi",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            },
		            {
		                "color": "#fcfcfc"
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            },
		            {
		                "color": "#dddddd"
		            }
		        ]
		    },
		    {
		        "featureType": "road.arterial",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            },
		            {
		                "color": "#dddddd"
		            }
		        ]
		    },
		    {
		        "featureType": "road.local",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            },
		            {
		                "color": "#eeeeee"
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            },
		            {
		                "color": "#dddddd"
		            }
		        ]
		    }
		]
    });
	var locations = [
	    ["Нижний Новгород", 56.2965039,43.936059, "img/marker.png"],
	    ["Рига", 56.9496487,24.1051865, "img/marker.png"],
	    ["Мурманск", 68.9585244,33.0826597, "img/marker.png"],
	    ["Пермь", 58.0296813,56.2667916, "img/marker.png"],
	    ["Уфа", 54.7387621,55.9720554, "img/marker.png"],
	    ["Тверь", 56.8587214,35.9175965, "img/marker.png"],
	    ["Иркутск", 52.2869741,104.3050183, "img/marker.png"],
	    ["Красноярск", 56.0152834,92.8932476, "img/marker.png"],
	    ["Сыктывкар", 61.6478508,50.8339029, "img/marker.png"],
	    ["Сургут", 61.2559503,73.3845471, "img/marker.png"],
	    ["Новосибирск", 55.0083526,82.9357327, "img/marker.png"],
	    ["Ижевск", 56.8618601,53.2324284, "img/marker.png"],
	];

	var infowindow = new google.maps.InfoWindow();
	var marker, i;
	 
	for (i = 0; i < locations.length; i++) {
	    marker = new google.maps.Marker({
	        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
	        map: map,
	        icon: {
	            url: locations[i][3],
	            scaledSize: new google.maps.Size(34, 34)
	        }
	    });
	    google.maps.event.addListener(marker, 'click', (function(marker, i) {
	        return function() {
	            infowindow.setContent(locations[i][0]);
	            infowindow.open(map, marker);
	        }
	    })(marker, i));
	}
}
