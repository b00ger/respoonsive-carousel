var RespoonsiveCarousel = function(options){
	this.caroursel = (typeof(options)!= "undefined") ? $(options.target) : $(".respoonsive-carousel");
	this.container = this.caroursel.find("ul.container");
	this.tiles = this.container.children("li"); 
	this.mode = (typeof(options)!= "undefined") ? options.mode : "default";		
	this.currentTile = 0;
	this.carouselLength = this.tiles.length;
	this.tileWidth = this.caroursel.width();
	this.containerWidth = this.carouselLength * this.tileWidth;
	this.lightboxModal = $('#respoonsive-lightbox');
}

RespoonsiveCarousel.prototype.init = function(){
	$this = this;
	this.container.css('left' , '0px');
	this.tiles.css('width' , $('.respoonsive-carousel').width() + 'px');
	this.container.css('width',this.containerWidth + 'px');
		if($('.respoonsive-carousel-status').length == 0){
			$('.respoonsive-carousel').append('<ul class="respoonsive-carousel-status"/>');
			for(var i=0 ; i < this.carouselLength; i++){
				
				$('.respoonsive-carousel-status').append('<li><a href="#"' + (i==0 ? " class='active' " : "" ) +'>' + '</a></li>');
			}
		}
		$('.respoonsive-carousel-status li a').click(function(e){
			e.preventDefault();
			$('.respoonsive-carousel-status li a').removeClass('active');
			$(this).addClass('active');
			$(".respoonsive-carousel ul.container").animate({"left" : $(this).parent().index() * -1 * $this.tileWidth + "px"});
		});
	
		this.caroursel.append('<a class="prev">Prev</a><a class="next">Next</a>');
		this.caroursel.find('a.prev').click(function(e){
			$this.currentTile = (($this.currentTile - 1) > 0) ? $this.currentTile - 1 : 0; 
			e.preventDefault();
			$this.container.animate({"left" : $this.currentTile * -1 * $this.tileWidth + "px"}, function(){$this.setStatusLights()});
			
		});
		this.caroursel.find('a.next').click(function(e){
			$this.currentTile = (($this.currentTile + 1) < $this.carouselLength) ? $this.currentTile + 1 : 0; 
			e.preventDefault();
			$this.container.animate({"left" : $this.currentTile * -1 * $this.tileWidth + "px"}, function(){$this.setStatusLights()});
		});
	
	$('a.larger').click(function() {
		$this.lightbox($(this))
	});
	$(window).resize(function(){$this.resizeCarousel();})
	
}
RespoonsiveCarousel.prototype.lightbox = function(clicked){
	this.lightboxModal.find('.modal-title').html(clicked.data('title'));
	this.lightboxModal.find('.lightbox-img').attr('src', clicked.data('src'));
	this.lightboxModal.modal("show");
}
RespoonsiveCarousel.prototype.setStatusLights = function(){
	$('.respoonsive-carousel-status li a').removeClass('active');
	$('.respoonsive-carousel-status li:nth-child('+ Number(this.currentTile+1) +')').find('a').addClass('active');
}
RespoonsiveCarousel.prototype.resizeCarousel = function(){
	this.container.css('left' , '0px');
	this.tiles.css('width' , $('.respoonsive-carousel').width() + 'px');
	this.container.css('width',this.containerWidth + 'px');
	
	$('.respoonsive-carousel-status li a').unbind('click');
	$('.respoonsive-carousel-status li a').click(function(e){
		e.preventDefault();
		$('.respoonsive-carousel-status li a').removeClass('active');
		$(this).addClass('active');
		$(".respoonsive-carousel ul.container").animate({"left" : $(this).parent().index() * -1 * $this.tileWidth + "px"});
	});
}