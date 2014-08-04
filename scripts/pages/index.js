define(['jquery', 
		'joshua/ui/Sprite', 
		'joshua/ui/Picture', 
		'joshua/interact/smooth_mousewheel',
		'greensock/TweenMax',
		'domReady!'], 
	function($, Sprite, Picture, SmoothMouseWheel){

	// var xxx
	var $window = $(window),
		$document = $(document),
		$html = $('html'),
		$body = $('body'),
		leftPanel = $('#left-panel'),
		rightPanel = $('#right-panel'),
		navItems = $('.nav-menu ul li'),
		customScrollBarContent = $('.customScrollBarContent'),
		toggleBtn = $('.toggle'),
		rightSections = rightPanel.find('section'),
		loading = $('#loading'),
		loadingTop = $('#loading .top'),
		loadingBottom = $('#loading .bottom'),
		loadingBg = $('.line-bg'),
		loadingLine = $('.line-bg .line');

	var wh = $window.height(),
		dh = $document.height();

	var loadedPics = 0,
		totalPics = $('.js-picture').length,
		st_load;






	// click nav item
	navItems.on('click', function(e){
		e.preventDefault();

		var $this = $(this),
			target;

		if($this.index() == 0){
			target = 0;
		}else{
			target = $($this.find('a').attr('href')).offset().top
		}

		TweenMax.to([$html, $body], 1, {
			scrollTop: target,
			ease: Strong.easeOut
		});

		navItems.filter('.active').removeClass('active');
		$this.addClass('active');
	});

	toggleBtn.on('click', function(){
		$body.toggleClass('chosing');
	});







	// preload pictures
	(function(){
		$('.js-picture').each(function(i, item){
			var p = new Picture(item);

			$(p).on('done', function(){
				++loadedPics;
			}).on('error', function(){});
		});

		Picture.load();
	})();

	// loading
	(function(){
		st_load = setInterval(function(){
			TweenMax.to(loadingLine, .5, {
				width: loadedPics / totalPics * 100 + "%",
				onUpdate: function(){
					if(Math.abs(loadingLine.width() - loadingBg.width()) < 1){
						clearInterval(st_load);
						TweenMax.set(loadingBg, {display: 'none'});
						TweenMax.to(loadingTop, .5, {
							top: '-50%'
						});
						TweenMax.to(loadingBottom, .5, {
							bottom: '-50%'
						});
						TweenMax.to(loading, .5, {
							opacity: 0,
							delay: .5,
							onComplete: function(){
								TweenMax.set(loading, {display: 'none'});
							}
						})
					}
				}
			});
		}, 100);	
	})();





	// smooth mouse wheel
	SmoothMouseWheel.enable({
		spring: .4,
        duration: 900,
        maxDetail: 40
	});



	// hide menu
	$window.on('resize scroll', function(){
		$body.removeClass('chosing');
	});
	rightPanel.on('click', function(){
		$body.removeClass('chosing');
	});

	// custom scrollbar
	$window.on('scroll', changeScrollBarPos).on('resize', changeScrollBarHeight);

	function changeScrollBarPos(){
		customScrollBarContent.addClass('scrolling');

		var scrollTop = $html.scrollTop();
		scrollTop = scrollTop ? scrollTop : $body.scrollTop();

		var ratio = scrollTop / dh * 100 + '%';

		$('.customScrollBarContent').css({
			'top': ratio
		});

		setTimeout(function(){
			customScrollBarContent.removeClass('scrolling');
		}, 500);
	}
	function changeScrollBarHeight(){
		wh = $window.height();
		dh = $document.height();
		var ratio = wh / dh * 100 + '%';

		$('.customScrollBarContent').css('height', ratio);
	}

	setTimeout(changeScrollBarHeight, 100)
	setTimeout(function(){
		changeScrollBarPos();
		customScrollBarContent.addClass('ready');
	},200)
});