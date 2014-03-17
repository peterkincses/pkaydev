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
	
	function getPortfolioItemHeight(){
		
		var portfolioitem = $('#portfolio .col-md-4');
	    var total = portfolioitem.length;
	    var maxHeight = 0;
	    
	    
        
        if(total > 0){
        	portfolioitem.each(function() {
		        maxHeight = $(this).outerHeight() > maxHeight ? $(this).outerHeight() : maxHeight;
		    }).outerHeight(maxHeight);
	    
		    $(window).smartresize(function() {
			  var maxHeightnew = 0;
			  portfolioitem.each(function() {
			  	    $(this).css('height','');
			  	    $(this).find('a img').css({'height':'','width':'100%'});
			        maxHeightnew = $(this).outerHeight() > maxHeightnew ? $(this).outerHeight() : maxHeightnew;
			  }).outerHeight(maxHeightnew);
	        });
	    
		    portfolioitem.mouseover(function(){
		    	var portfolioimg = $(this).find('a img');
		    	var portfolioname = $(this).find('.portfolioname');
		    	
		        portfolioname.fadeIn();
		    	portfolioimg.animate({
			        width: $('#portfolio .col-md-4').height() * 1.2,
			        height: $('#portfolio .col-md-4').height() * 1.2
			    }, 400);
		    });
		    portfolioitem.mouseleave(function(){
		    	var portfolioimg = $(this).find('a img');
		    	var portfolioname = $(this).find('.portfolioname');
		    	
		    	portfolioname.fadeOut(400,function(){
		    		portfolioimg.animate({
				        width: $('#portfolio .col-md-4').height(),
				        height: $('#portfolio .col-md-4').height()
				    }, 400);
				});
		    });
		    
		    portfolioitem.click(function(){
		    	var datatarget= $(this).attr('data-target');
		    	var spinner = $(this).find('.spinner');
		    	if(datatarget){
		    	   spinner.animate({'width':'30px','height':'30px'},500,function(){
		    	   	  setTimeout(function(){ window.location = datatarget; }, 1500);
		    	   });
		    	}
		    	  
		    	  
		    	   
		    });
       }
		
	}
	getPortfolioItemHeight();
	
	$('.navbar a').click(function() {
        var href = $.attr(this, 'href');
        $('body,html').animate({
            scrollTop: $(href).offset().top - 75
        }, 500, function () {
            window.location.hash = href;
            $('.navbar-collapse').removeClass('in');
            $('.navbar-collapse').addClass('collapse');
        });
        return false;
    });
    

};

$( window ).load( readyFn );
