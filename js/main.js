$(document).ready(function() {

clientCarousel();


});
$(window).load(function() {
  $(".loader").fadeOut("slow");
})
//FUNCTION smooth scroll for starting-icon-scroll and scroll-to-top icon
function scroll_to(selector) {
    $('html,body').animate({scrollTop: $(selector).offset().top}, 1000);
    return false;
} 


// Function which add class to navbar when user scroll page by 100pxs.
$(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
        $("nav , button").addClass("sticky");
    }
    else {
        $("nav , button").removeClass("sticky");
    }
});

$(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
        $(".dropdown").addClass("sticky-dropdown");
    }
    else {
        $(".dropdown").removeClass("sticky-dropdown");
    }
});


//Function that shows scroll-to-top button when scroll is higher than 700pxs.
$(window).on("scroll", function () {
    if ($(this).scrollTop() > 700) {
        $(".scroll-to-top").addClass("scrolled");
    }
    else {
        $(".scroll-to-top").removeClass("scrolled");
    }
});


// Function which is responsible for parralax

$(document).ready(function(){
   // cache the window object
   $window = $(window);
 
   $('section[data-type="background"], .news-bg[data-type="background"], .start-bg[data-type="background"], .services-bg-map[data-type="background"] ').each(function(){
     // declare the variable to affect the defined data-type
     var $scroll = $(this);
                     
      $(window).scroll(function() {
        // HTML5 proves useful for helping with creating JS functions!
        // also, negative value because we're scrolling upwards                            
        var yPos = -($window.scrollTop() / $scroll.data('speed'));
         
        // background position
        var coords = '50% '+ yPos + 'px';
 
        // move the background
        $scroll.css({ backgroundPosition: coords });   
      }); // end window scroll
   });  // end section function
}); // close out scrip




// Function change active client in slidetype div by arrows next and previous("client-next", "client-prev".
// Function also cahnge active dot which is assigned to her client.

function clientCarousel () {

    $('.client-unit').first().addClass('active-client');
    $('.client-dot').first().addClass('active-client');
   

    $('.client-dot').click(function(){

      var $this = $(this),
          $siblings = $this.parent().children(),
          position = $siblings.index($this);
    $('.client-unit').removeClass('active-client').eq(position).addClass('active-client');
    $siblings.removeClass('active-client');
    $this.addClass('active-client');

	});

  $('.client-next, .client-prev').click(function(){

    var $this = $(this),
        curActiveClient = $('.client-belt').find('.active-client'),
        position = $('.client-belt').children().index(curActiveClient),
        clientNum = $('.client-unit').length;

       if($this.hasClass('client-next')){
          if(position < clientNum - 1){
          $('.active-client').removeClass('active-client').next().addClass('active-client');
          } else{

          $('.client-unit').removeClass('active-client').first().addClass('active-client');
          $('.client-dot').removeClass('active-client').first().addClass('active-client');
          }
        }else{

          if(position === 0){
            $('.client-unit').removeClass('active-client').last().addClass('active-client');
            $('.client-dot').removeClass('active-client').last().addClass('active-client');
          
          } else {
            $('.active-client').removeClass('active-client').prev().addClass('active-client');
          }
        }
  });
}


// GOOGLE API+MARKER

var map;
var saveWidget;

function initialize() {
  var myOptions = {
    zoom: 16,
    center: {lat: 51.465435, lng: -0.1458982}
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      myOptions);

  // Create a new SaveWidgetOptions object for Google Sydney.
  var saveWidgetOptions = {
    place: {
      // ChIJN1t_tDeuEmsRUsoyG83frY4 is the place Id for Google Sydney
      placeId: 'LocalLogisticGlobalStandards',
      location: {lat: 51.465435, lng: -0.1458982}
    },
    attribution: {
      source: 'Google Maps JavaScript API',
      webUrl: 'https://developers.google.com/maps/'
    }
  };

  new google.maps.Marker({
    map: map,
    position: saveWidgetOptions.place.location
  });

  var widgetDiv = document.getElementById('save-widget');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(widgetDiv);

  // Append a Save Control to the existing save-widget div.
  saveWidget = new google.maps.SaveWidget(widgetDiv, saveWidgetOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);



// Function change elements of navigation to be active or not when 
// you click on them. Then Smooth scroll to that #section. Function also adds
// that active-class when #section is at top of page

$(document).ready(function () {
    $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active-section');
        })
        $(this).addClass('active-section');


      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top-2
        }, 1000, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});


function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.cont a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top-2 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.cont ul a').removeClass("active-section");
            currLink.addClass("active-section");
        }
        else{
            currLink.removeClass("active-section");
        }
    });
}