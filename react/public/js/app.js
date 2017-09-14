$(function(){
	$(".nav li").click(function(){
		$(this).addClass("am-active").siblings().removeClass("am-active");
		var index = $(this).index();
		$(".tab").removeClass("am-active").eq(index).addClass("am-active");
	});
	
	$('.video-box .like span,.article-details .like span').on('click',function(){
		$(this).addClass('active');
		$(this).find('i').addClass('am-animation-scale-down')
	})
	
	$(window).scroll(function(){
		var _top = $(window).scrollTop();
		if(_top>200){
			$('#goTop').html('<a href="#top" data-am-widget="gotop" class="am-gotop" style="color:#FFFFFF">点击回到顶部</a>')
		}else{
			$('#goTop').html('文章标题')
		}
	});
	
	//明暗密码
	$('.eye').on('click',function(){
		if($(this).attr('data-show')==1){
			$(this).attr('data-show','2');
			$(this).removeClass('fa-eye-slash').addClass('fa-eye');
			$(this).parent('p').children('.unlook-psw').hide();
			$(this).parent('p').children('.look-psw').show();
			$(this).parent('p').children('.look-psw').val($(this).parent('p').children('.unlook-psw').val());
			return;
		}
		if($(this).attr('data-show')==2){
			$(this).attr('data-show','1');
			$(this).removeClass('fa-eye').addClass('fa-eye-slash');
			$(this).parent('p').children('.look-psw').hide();
			$(this).parent('p').children('.unlook-psw').show();
			$(this).parent('p').children('.unlook-psw').val($(this).parent('p').children('.look-psw').val())
			return;
		}
	})
})
