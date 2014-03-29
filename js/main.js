var RespoonsiveCarousel = function(options){
	this.options = options;		
	this.carouselLength = $(".respoonsive-carousel ul.container > li").length;
	this.tileWidth = $('.respoonsive-carousel').width();
	this.containerWidth = this.carouselLength * this.tileWidth;
}

RespoonsiveCarousel.prototype.init = function(){
	$this = this;
	$(".respoonsive-carousel ul.container").css('left' , '0px');
	$('.respoonsive-carousel ul.container li').css('width' , $('.respoonsive-carousel').width() + 'px');
	$(".respoonsive-carousel ul.container").css('width',this.containerWidth + 'px');
	
	if(this.options.mode == "thumbs"){
		if($('.respoonsive-carousel-controls').length == 0){
			$('.respoonsive-carousel').append('<ul class="respoonsive-carousel-controls"></ul>');
			for(var i=0 ; i < this.carouselLength; i++){
				
				$('.respoonsive-carousel-controls').append('<li><a href="#"' + (i==0 ? " class='active' " : "" ) +'>' + Number(i+1) + '</a></li>');
			}
		}
		$('.respoonsive-carousel-controls li a').click(function(e){
			e.preventDefault();
			$('.respoonsive-carousel-controls li a').removeClass('active');
			$(this).addClass('active');
			$(".respoonsive-carousel ul.container").animate({"left" : $(this).parent().index() * -1 * $this.tileWidth + "px"});
		});
	}
	$(window).resize(function(){$this.resizeCarousel();})
	
}
RespoonsiveCarousel.prototype.resizeCarousel = function(){
	$(".respoonsive-carousel ul.container").css('left' , '0px');
	$('.respoonsive-carousel-controls li a').unbind('click');
	$('.respoonsive-carousel ul.container li').css('width' , $('.respoonsive-carousel').width() + 'px');
	$(".respoonsive-carousel ul.container").css('width',this.containerWidth + 'px');
	$('.respoonsive-carousel-controls li a').click(function(e){
		e.preventDefault();
		$('.respoonsive-carousel-controls li a').removeClass('active');
		$(this).addClass('active');
		$(".respoonsive-carousel ul.container").animate({"left" : $(this).parent().index() * -1 * $this.tileWidth + "px"});
	});
}