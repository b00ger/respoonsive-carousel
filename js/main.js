var RespoonsiveCarousel = function(options){
	
	this.mode = (typeof(options)!= "undefined") ? options.mode : "default";		
	this.currentTile = 0;
	this.carouselLength = $(".respoonsive-carousel ul.container > li").length;
	this.tileWidth = $('.respoonsive-carousel').width();
	this.containerWidth = this.carouselLength * this.tileWidth;
	this.lightboxModal = $('#respoonsive-lightbox');
}

RespoonsiveCarousel.prototype.init = function(){
	$this = this;
	$(".respoonsive-carousel ul.container").css('left' , '0px');
	$('.respoonsive-carousel ul.container li').css('width' , $('.respoonsive-carousel').width() + 'px');
	$(".respoonsive-carousel ul.container").css('width',this.containerWidth + 'px');
	
	if(this.mode == "thumbs"){
		if($('.respoonsive-carousel-status').length == 0){
			$('.respoonsive-carousel').append('<ul class="respoonsive-carousel-status"/>');
			for(var i=0 ; i < this.carouselLength; i++){
				
				$('.respoonsive-carousel-status').append('<li><a href="#"' + (i==0 ? " class='active' " : "" ) +'>' + Number(i+1) + '</a></li>');
			}
		}
		$('.respoonsive-carousel-status li a').click(function(e){
			e.preventDefault();
			$('.respoonsive-carousel-status li a').removeClass('active');
			$(this).addClass('active');
			$(".respoonsive-carousel ul.container").animate({"left" : $(this).parent().index() * -1 * $this.tileWidth + "px"});
		});
	}else {
		$('.respoonsive-carousel').append('<a class="prev">Prev</a><a class="next">Next</a>');
		$('a.prev').click(function(e){
			$this.currentTile = (($this.currentTile - 1) > 0) ? $this.currentTile - 1 : 0; 
			e.preventDefault();
			console.log($this.currentTile);
			$(".respoonsive-carousel ul.container").animate({"left" : $this.currentTile * -1 * $this.tileWidth + "px"});
		});
		$('a.next').click(function(e){
			$this.currentTile = (($this.currentTile + 1) < $this.carouselLength) ? $this.currentTile + 1 : 0; 
			e.preventDefault();
			console.log($this.carouselLength);
			$(".respoonsive-carousel ul.container").animate({"left" : $this.currentTile * -1 * $this.tileWidth + "px"});
		});
	}
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
RespoonsiveCarousel.prototype.resizeCarousel = function(){
	$(".respoonsive-carousel ul.container").css('left' , '0px');
	$('.respoonsive-carousel-status li a').unbind('click');
	$('.respoonsive-carousel ul.container li').css('width' , $('.respoonsive-carousel').width() + 'px');
	$(".respoonsive-carousel ul.container").css('width',this.containerWidth + 'px');
	$('.respoonsive-carousel-status li a').click(function(e){
		e.preventDefault();
		$('.respoonsive-carousel-status li a').removeClass('active');
		$(this).addClass('active');
		$(".respoonsive-carousel ul.container").animate({"left" : $(this).parent().index() * -1 * $this.tileWidth + "px"});
	});
}