/* Global variables */
	// The following are used for the nav bar creation
	var brandOffset, aboutUSOffset, locationOffset, galleryOffset;
	
	// The following represents the Google Maps on the page
	var map;
/* Global variables */


$(function() // to be executed when DOM finished loading
{	
	// initialize global vars
	initNavGlobalVars();
	$(window).resize(initNavGlobalVars);
	
	// implement the nav slider
	navSlider();
	
	/* ==========================================================
		BUG FIX: Fix which nav link is white when page is loaded
	========================================================== */
	$(window).trigger("scroll");
	/* END BUG FIX */
});

/**
	* This function will initialize the global variables of the nav bar
*/
function initNavGlobalVars()
{
	// initialize global vars
	brandOffset = Math.floor($("#brand").offset().top) - 50;
	aboutUSOffset = Math.floor($("#aboutUs").offset().top) - 50;
	locationOffset = Math.floor($("#location").offset().top) - 50;
	galleryOffset = Math.floor($("#gallery").offset().top) - 50;
}

/**
	This function is called to initialize the map on the home page
*/
function initMap() 
{				
	var hairDresserLocation = {lat: 45.509823, lng: -73.674527};
	map = new google.maps.Map(document.getElementById('googleMap'), 
	{
		zoom: 15,
		center: hairDresserLocation
	});
	
	// add marker to the map
	var marker = new google.maps.Marker
	({
          position: hairDresserLocation,
          map: map,
          title: 'Hair dresser saloon'
    });
}

/**
	* This function will modify the way the user navigates with the nav bar. It has 2 main features:
		1) When a link is clicked, the page will smoothly go to the destination.
		2) Each link in the navigation bar will be change color according to the position of the nav bar
*/
function navSlider()
{	
	// Feature #1
	$(".nav li a").click(function(e)
	{
		// check with type of link is clicked...
		
		// if link is not an outside link (so a section link)
		if( !$(this).attr("class") == "outsideLink" )
		{
			e.preventDefault(); // stops the browser's default behavior
			var anchorID = $(this).attr("href"); // get the ID of the anchor
			var target = $(anchorID); // set the target of the div with the anchor ID
		
			if (anchorID.charAt(0) == '#' && anchorID.length > 1 && target.length > 0)
			{
				var time = 1000; // time of the animation (in miliseconds)
				var pos = Math.max(target.offset().top, 0); // the target position
				$("body").animate({ scrollTop: pos }, time, 'swing');
			}
		}
	});
	
	// Feature #2
	$(window).scroll(function()
	{
		// variable that holds the current y-scroll value
		var scrollPos = $("body").scrollTop();
		
		// if were are between section brand and about us
		if(scrollPos >= brandOffset && scrollPos < aboutUSOffset)
		{
			$(".brandLink").css("color", "white");
			$(".aboutUSLink, .locationLink, .galleryLink").css("color", "#9d9d9d");
		}
		
		// if were are between section about us and location
		else if(scrollPos >= aboutUSOffset && scrollPos < locationOffset)
		{
			$(".aboutUSLink").css("color", "white");
			$(".brandLink, .locationLink, .galleryLink").css("color", "#9d9d9d");
		}
		
		// if were are between section location and gallery
		else if(scrollPos >= locationOffset && scrollPos < galleryOffset)
		{
			$(".locationLink").css("color", "white");
			$(".aboutUSLink, .brandLink, .galleryLink").css("color", "#9d9d9d");
		}
		
		// if were in section gallery
		else if(scrollPos >= galleryOffset)
		{
			$(".galleryLink").css("color", "white");
			$(".aboutUSLink, .locationLink, .brandLink").css("color", "#9d9d9d");
		}
	});
}