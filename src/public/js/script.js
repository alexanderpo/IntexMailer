$(document).ready(function(){

	// Blur images on mouse over
	$(".template a").hover( function(){ 
		$(this).children("img").animate({ opacity: 0.75 }, "fast"); 
	}, function(){ 
		$(this).children("img").animate({ opacity: 1.0 }, "slow"); 
	}); 
	
	// Initialize prettyPhoto plugin
	$(".template a[rel^='prettyPhoto']").prettyPhoto({
		theme:'pp_default', 
		autoplay_slideshow: false, 
		overlay_gallery: false, 
		show_title: false
	});

	// Clone template items to get a second collection for Quicksand plugin
	var $templateClone = $(".template").clone();
	
	// Attempt to call Quicksand on every click event handler
	$(".filter a").click(function(e){
		
		$(".filter li").removeClass("current");	
		
		// Get the class attribute value of the clicked link
		var $filterClass = $(this).parent().attr("class");

		if ( $filterClass == "all" ) {
			var $filteredtemplate = $templateClone.find("li");
		} else {
			var $filteredtemplate = $templateClone.find("li[data-type~=" + $filterClass + "]");
		}
		
		// Call quicksand
		$(".template").quicksand( $filteredtemplate, { 
			duration: 800, 
			easing: 'easeInOutQuad' 
		}, function(){
			
			// Blur newly cloned template items on mouse over and apply prettyPhoto
			$(".template a").hover( function(){ 
				$(this).children("img").animate({ opacity: 0.75 }, "fast"); 
			}, function(){ 
				$(this).children("img").animate({ opacity: 1.0 }, "slow"); 
			}); 
			
			$(".template a[rel^='prettyPhoto']").prettyPhoto({
				theme:'pp_default', 
				autoplay_slideshow: false, 
				overlay_gallery: false, 
				show_title: false
			});
		});
        
		$(this).parent().addClass("current");

		// Prevent the browser jump to the link anchor
		e.preventDefault();
	})
});