(function($,sr){
 
	      // debouncing function from John Hann
	      // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	      var debounce = function (func, threshold, execAsap) {
	      var timeout;
	 
	      return function debounced () {
	          var obj = this, args = arguments;
	          function delayed () {
	              if (!execAsap)
	                  func.apply(obj, args);
	              timeout = null; 
	          };
	 
	          if (timeout)
	              clearTimeout(timeout);
	          else if (execAsap)
	              func.apply(obj, args);
	 
	          timeout = setTimeout(delayed, threshold || 100); 
	      };
	  };
		// smartresize 
	  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
	 
})(jQuery,'smartresize');

function readyFn( jQuery ) {
	//$("body").responsiveText();
	
	
	var windowwidth = $(window).width();
	    
	//calculate about me quote position
	function getAboutMeQuotePosition(){
		var aboutmeimg = $('#aboutme-slides .col-sm-7');
		var aboutmetextblock = $('#aboutme-slides .col-sm-5');
		
		if(aboutmeimg.length && windowwidth > 660 && aboutmeimg.outerHeight() > aboutmetextblock.outerHeight()){
			aboutmetextblock.animate({'margin-top': Math.round((aboutmeimg.outerHeight() - aboutmetextblock.outerHeight())/2)},500);
		}else{
			if(windowwidth < 661){
		       aboutmetextblock.animate({'margin-top':'30'},500);
		    }
		} 
	    
	    $(window).smartresize(function() {
	    	var windowwidthnew = $(window).width();
	    	if(aboutmeimg.length && windowwidthnew > 660 && aboutmeimg.outerHeight() > aboutmetextblock.outerHeight()){
	    		aboutmetextblock.animate({'margin-top': Math.round((aboutmeimg.outerHeight() - aboutmetextblock.outerHeight())/2)},500);
		    }else{
		    	if(windowwidthnew < 661){
		    	  aboutmetextblock.animate({'margin-top':'30'},500);
		    	}
		    }
		 });
		
	}
	getAboutMeQuotePosition();
	
	$('.navbar a').click(function() {
        var href = $.attr(this, 'href');
        $('body,html').animate({
            scrollTop: $(href).offset().top - 75
        }, 500, function () {
            window.location.hash = href;
        });
        return false;
    });

};

$( window ).load( readyFn );
