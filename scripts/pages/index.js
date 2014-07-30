define(['jquery', 
		'joshua/ui/Sprite', 
		'joshua/ui/Picture', 
		'joshua/interact/smooth_mousewheel',
		'greensock/TweenMax',
		'domReady!'], 
	function($, Sprite, Picture, SmoothMouseWheel){

	var $html = $('html'),
		$body = $('body'),
		navItems = $('.nav-menu ul li');

	navItems.on('click', function(e){
		e.preventDefault();

		var $this = $(this),
			target;

		if($this.index() == 0){
			target = 0;
		}else{
			target = $($this.find('a').attr('href')).offset().top
		}

		TweenMax.to([$html, $body], 0.5, {
			scrollTop: target
		});

		navItems.filter('.active').removeClass('active');
		$this.addClass('active');
	});

	// preload pictures
	(function(){
		$('.js-picture').each(function(i, item){
			var p = new Picture(item);

			$(p).on('done', function(){})
			.on('error', function(){});
		});

		Picture.load();
	})();

	// smooth mouse wheel
	SmoothMouseWheel.enable({
		spring: .4,
        duration: 900,
        maxDetail: 40
	});
});