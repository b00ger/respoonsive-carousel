/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "respoonsiveCarousel",
        defaults = {
            propertyName: "value",
            carouselElement : ".respoonsive-carousel",
            lightboxModalElement : "#respoonsive-lightbox"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init(this.element);
    }

    Plugin.prototype = {

        init: function(el) {
			this.carousel = $(el);
			this.lightboxModal = $(this.options.lightboxModalElement);
			this.statusLights = $("<ul class=\"respoonsive-carousel-status\"/>");
			this.prevNextControls = $("<a class=\"prev\">Prev</a><a class=\"next\">Next</a>");
			this.container = this.carousel.find("ul.rc-container");
			this.tiles = this.container.children("li");	
			this.currentTile = 0;
			this.carouselLength = this.tiles.length;
			this.tileWidth = this.carousel.width();
			this.containerWidth = this.carouselLength * this.tileWidth;
			
			this.container.css('left' , '0px');
			this.tiles.css('width' , this.tileWidth + 'px');
			this.container.css('width',this.containerWidth + 'px');
			this.carousel.append(this.statusLights);
			for(var i=0 ; i < this.carouselLength; i++){
				this.statusLights.append('<li><a href="#"' + (i==0 ? " class='active' " : "" ) +'>' + '</a></li>');
			}
				
				
			var base = this;
			this.statusLights.find('a').click(function(e){
				e.preventDefault();
				//this
				base.statusLights.find('a').removeClass('active');
				$(this).addClass('active');
				base.container.animate({"left" : $(this).parent().index() * -1 * base.tileWidth + "px"});
			});
			
			this.carousel.append(this.prevNextControls);
			this.carousel.find('a.prev').click(function(e){
				base.currentTile = ((base.currentTile - 1) > 0) ? base.currentTile - 1 : 0; 
				e.preventDefault();
				base.container.animate({"left" : base.currentTile * -1 * base.tileWidth + "px"}, function(){base.setStatusLights()});
				
			});
			this.carousel.find('a.next').click(function(e){
				base.currentTile = ((base.currentTile + 1) < base.carouselLength) ? base.currentTile + 1 : 0; 
				e.preventDefault();
				base.container.animate({"left" : base.currentTile * -1 * base.tileWidth + "px"}, function(){base.setStatusLights()});
			});
			
			$('a.larger').click(function() {
				base.lightbox($(this))
			});
			
			$(window).resize(function(){base.resizeCarousel(base.element, base.options);})			
			
        },

        resizeCarousel: function() {
            this.container.css('left' , '0px');
            this.tiles.css('width' , $('.respoonsive-carousel').width() + 'px');
            this.container.css('width',this.containerWidth + 'px');
            this.currentTile = 0;
            this.statusLights.find('a').unbind('click');
            this.tileWidth = this.carousel.width();
            
            var base = this;
            this.statusLights.find('a').click(function(e){
            	e.preventDefault();
            	base.statusLights.find('a').removeClass('active');
            	$(this).addClass('active');
            	base.container.animate({"left" : $(this).parent().index() * -1 * base.tileWidth + "px"});
            });
        },
        
        setStatusLights: function() {
            var base = this;
            this.statusLights.find('a').removeClass('active');
            this.statusLights.children('li:nth-child('+ Number(base.currentTile+1) +')').find('a').addClass('active');
        },
        
        lightbox: function(clicked) {
            this.lightboxModal.find('.modal-title').html(clicked.data('title'));
            this.lightboxModal.find('.lightbox-img').attr('src', clicked.data('src'));
            this.lightboxModal.modal("show");
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };
   
})( jQuery, window, document );