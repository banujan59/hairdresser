$(function() // to be executed when DOM finished loading
{	
	navSlider(); // implement the nav slider
});


/**
	* This function will modify the way the user navigates with the nav bar
	* When a link is clicked, the page will smoothly go to the destination.
*/
function navSlider()
{
	//======================================================================
	// BUG FIX #1: 
	// Prevent the page from displaying the anchor when reload is pressed
	//======================================================================
		setTimeout(function(){$("body").scrollTop(0);},20);
	// END BUG FIX #1
	
	$(".nav li a").click(function(e)
	{
		e.preventDefault(); // stops the browser's default behavior
		var anchorID = $(this).attr("href"); // get the ID of the anchor
		var target = $(anchorID); // set the target of the div with the anchor ID
		
		if (anchorID.charAt(0) == '#' && anchorID.length > 1 && target.length > 0)
		{
			var speed = 1000; // speed of the animation (in miliseconds)
			var pos = Math.max(target.offset().top, 0); // the target position
			$("body").animate({ scrollTop: pos }, speed, 'swing');
		}
	});
}