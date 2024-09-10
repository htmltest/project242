var app = {
	'init': function(){
		func.jsMask();
		func.jsPopup();
		func.jsSelect();
		func.jsSlider();
		func.jsEqH();
		func.jsCounter();
		func.jsToggle();
		func.jsPopupGallery();
		func.jsVideo();
		func.jsFldLabeled();
	}
};

var func = {
	'jsMask': function(){
		$('[data-masked]').each(function(){
			var mask = $(this).data('masked');
			$(this).mask(mask);
		});
	},
	'jsPopup': function(){
		$('[data-colorbox]').each(function(){
			var s={
					previous: '<i class="fa fa-angle-left" />',
					next: '<i class="fa fa-angle-right" />',
					close: '&times;',
					maxWidth: '100%',
					opacity: .6
				},o=$(this).data('colorbox'),s=$.extend(s,o);
			$(this).colorbox(s);
		});
	},
	'jsPopupMessage': function(html){
		$.colorbox({
			opacity: .6,
			close: '&times;',
			maxWidth: '100%',
			html: '<div class="popup-message-wrap">'+html+'</div>',
			scrolling: false
		});
	},
	'jsPopupGallery': function(){
		$('.js-popup-gallery').lightGallery({
			download: false,
			selector: '.js-popup-gallery a'
		});
	},
	'jsSelect': function(){
		$('select.js-select').select2();
	},
	'jsSlider': function(){
		$('.js-slider').slick({
			speed: 500,
			touchMove: false,
			touchThreshold: 500,
			prevArrow: '<i class="slick-arrow slick-prev fa fa-angle-left trans" />',
			nextArrow: '<i class="slick-arrow slick-next fa fa-angle-right trans" />'
		});
	},
	'jsEqH': function(){
		$('.js-eqhw').each(function(){
			var w = $(this),s = $('.js-eqhs',w),_h,h=0;
			s.each(function(){
				$(this).height('auto');
				_h = $(this).height();
				if(_h > h) h = _h;
				s.height(h);
			});
		});
	},
	'jsCounter': function(){
		var timeInMs = $('#d-wrap').data('date-end');
		var lang = $('#d-wrap').data('lang');
		if(timeInMs > 0) {
            var t = timeInMs,
                d, h, m, s;
            setInterval(function () {
                var f = new Date().getTime(), left = (t - f) / 1000;
                d = parseInt(left / 86400);
                left = left % 86400;
                h = parseInt(left / 3600);
                left = left % 3600;
                m = parseInt(left / 60);
                s = parseInt(left % 60);
                //if(d < 10) d = '0'+d;
                if (h < 10) h = '0' + h;
                if (m < 10) m = '0' + m;
                if (s < 10) s = '0' + s;
                //if(d < 1 && h < 1 && m < 1 && s < 1) location.href = '/';
                //c.innerHTML = '<span class="cnt-d">'+d+'</span><span class="cnt-h">'+h+'</span><span class="cnt-m">'+m+'</span><span class="cnt-s">'+s+'</span>';
                $('.js-estimate').text(d);
                if(lang == 'en'){
                    $('.js-estimate-caption').text(func.jsPlural(d, ['days', 'days', 'days']));
				}else{
                    $('.js-estimate-caption').text(func.jsPlural(d, ['день', 'дня', 'дней']));
                    $('.js-estimate-text').text(func.jsPlural(d, ['остался', 'осталось', 'осталось']));
				}

            }, 1000);
        }
	},
	'jsPlural': function(cnt,text){
		return cnt % 10 == 1 && cnt % 100 != 11 ? text[0] : (cnt % 10 >= 2 && cnt % 10 <= 4 && (cnt % 100 < 10 || cnt % 100 >= 20) ? text[1] : text[2]);
	},
	'jsToggle': function(){
		$('[data-toggle]').on('click',function(){
			var data = $(this).data('toggle');
			if(data.target && data.className){
				$(data.target).toggleClass(data.className);
			}
		});
		$('.js-toggle-subnav').on('click',function(){
			$(this).closest('nav').toggleClass('is-opened');
		});
		$('.js-nav-select-toggle').on('click',function(){
			$('.js-nav-select').not($(this).closest('.js-nav-select')).removeClass('is-opened');
			$(this).closest('.js-nav-select').toggleClass('is-opened');
		});
		$('.js-list-toggled').each(function(){
			var list = $(this),
				item = $('.js-list-toggled-item',list);
			$('body').on('click','.js-list-toggle',function(){
				var link = $(this),
					text = link.closest(item).find('.js-list-toggled-text'),
					show = link.data('show'),
					hide = link.data('hide');
				text.slideToggle(200,function(){
					text.is(':visible') ? link.text(hide) : link.text(show);
				});
			});
			$('body').on('click','.js-list-toggled-nav li',function(){
				var link = $(this),
					text = $('.js-list-toggled-text',list),
					caption = link.data('caption'),
					action = link.data('action'),
					btn = $('.js-list-toggle',list);
				if(action == 'show') text.slideDown(200);
				else text.slideUp(200);
				btn.text(caption);
			});
		});
		$(document).on('click',function(e){
			var navSelect = $('.js-nav-select');
			if(!navSelect.is(e.target) && navSelect.has(e.target).length === 0)
				navSelect.removeClass('is-opened');
		});
		$(document).keyup(function(e){
			if(e.key === 'Escape' || e.key === 'escape' || e.keyCode == 27){
				$('.js-nav-select').removeClass('is-opened');
			}
		});
	},
	'jsVideo': function(){
		$('.js-box-video').each(function(){
			var wrap = $(this),
				body = $('.js-box-video-body',wrap),
				iframe = $('iframe',body),
				on = $('.js-box-video-on',wrap),
				off = $('.js-box-video-off',wrap),
				src = on.data('src');
			on.on('touchend click',function(){
				$('.js-box-video').removeClass('is-on').find('iframe').attr('src','');
				wrap.addClass('is-on');
				iframe.attr('src',src);
			});
			off.on('touchend click',function(){
				wrap.removeClass('is-on');
				iframe.attr('src','');
			});	
		});
	},
	'jsFldLabeled': function(){
		$('.js-fld-labeled').each(function(){
			var box = $(this),
				fld = $('input,textarea',box),
				lbl = $('label',box);
			if(fld.val() == '') box.addClass('is-empty');
			else box.removeClass('is-empty');
			fld.on('keyup change',function(){
				$(this).val() != '' ? box.addClass('is-filled').removeClass('is-empty') : box.removeClass('is-filled').addClass('is-empty');
			});
		});
	},
};

$(function(){

	app.init();

	var initStats = true;

	$(window)
	.on('load resize',function(){
		setTimeout(function(){
			func.jsEqH();
		},100);
	})
	.on('load scroll resize',function(){
		var wT = $(window).scrollTop;
		if($('.js-init-stats').css('visibility') === 'visible' && initStats){
			initStats = false;
			$('.js-init-stats').addClass('is-init');
		}
	})
	.on('mousemove',function(e){
		var wW = $(window).width();
		$('[data-px]').each(function(){
			var data = $(this).data('px'),
				x = ((e.pageX - wW/4) * data.d - data.s) / 50,
				y = ((e.pageY - wW/4) * data.d - data.s) / 50;
			$(this).css({marginLeft: x, marginTop: y});
		});
	});

	var wow = new WOW({mobile:false});
	wow.init();



	$('.need_fancy').on('click', function () {
        func.jsPopupMessage($('#fz_152').html());
		return false;
    })
	if($('#error_block_form').length > 0) {
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 800);
    }
		/*
    if($('input[name="WEB_FORM_ID"]').length > 0){
		var form_web = $('input[name="WEB_FORM_ID"]').parent('form');
        var web_form_submit = $(form_web).find('input[name="web_form_submit"]');
		console.log(form_web);
		console.log(web_form_submit);
        form_web.submit(function () {
			// console.log(form.finde('input,textarea,select').filter('[required]:visible'));
        })
	}
	*/
});

function shide(el) {
    if ($('#'+el).css('display') == 'none') {
        $('#'+el).show();
    } else {
        $('#'+el).hide();
    }
}
$(document).ready(function(){ $(window).scroll(function(){if ($(this).scrollTop() > 100) {$('.scrollup').fadeIn();} else {$('.scrollup').fadeOut();}}); $('.scrollup').click(function(){$("html, body").animate({ scrollTop: 0 }, 600);return false;}); });
