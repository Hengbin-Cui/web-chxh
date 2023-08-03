// IE10以下浏览器提示
function hiUpgrade() {
    window.AESKey = '';
    // 判断浏览器是否支持placeholder属性
    function isSupportPlaceholder() {
        var input = document.createElement('input');
        return 'placeholder' in input;
    };
    //判断是否是IE浏览器，包括Edge浏览器
    function IEVersion() {
        //取得浏览器的userAgent字符串
        var userAgent = navigator.userAgent;
        //判断是否IE浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
        if (isIE) {
            // ie10及以下
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion < 10 || !isSupportPlaceholder()) {
                return true;
            }
        } else {
            return false;
        }
    }
    var tpl = '<div id="hi-upgrade"><div class="hi-wrap"><p class="hi-title">无法正常浏览本网站！</p><div class="hi-close">继续浏览</div><div class="hi-text1"><p>1、您的浏览器版本过低，请升级您的浏览器。</p><p>2、如果您的浏览器是最新版本，请<span>切换到极速模式</span>访问。</p><p>3、您使用的是IE10以下的浏览器，建议您<span>使用主流浏览器</span>访问。</p></div><p class="hi-text2"><span>主流浏览器下载</span></p><ul class="hi-list"><li><a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank"><div class="hi-ico1"></div><p>谷歌浏览器</p></a></li><li><a href="http://www.firefox.com.cn/download/" target="_blank"><div class="hi-ico2"></div><p>火狐浏览器</p></a></li><li><a href="http://browser.360.cn" target="_blank"><div class="hi-ico3"></div><p>UC浏览器</p></a></li><li><a href="https://www.uc.cn" target="_blank"><div class="hi-ico4"></div><p>360浏览器</p></a></li><li><a href="https://browser.qq.com" target="_blank"><div class="hi-ico5"></div><p>QQ浏览器</p></a></li><li><a href="https://ie.sogou.com" target="_blank"><div class="hi-ico6"></div><p>搜狗浏览器</p></a></li></ul></div></div>';
    if (IEVersion()) {
        document.write(tpl);
    }
}
hiUpgrade();

// 导航
function headNav() {
    var oBody = $("body");
    var oHead = $("#c-header");
    var oNav = $("#c-header .c-nav");
    var oBtn = $("#c-header .c-switch");
    var oL = $("#c-header .c-nav>li");
    var oTitle = $("#c-header .c-nav2 li .c-title-box");
    var num = 0;
    var i = 0;
    var oP = $("#c-placeholder");
    var b = true;
    var t = null;

    // 窗口重置隐藏手机端导航
    $(window).resize(function() {
        
        if ($(window).width()>991) {
            oBody.removeClass('c-open');
        }
    });

    // 手机端导航栏目下拉
    oTitle.click(function() {
        $(this).next().stop().slideToggle();
    });

    // 鼠标移入导航样式
    oHead.hover(function() {
        $(this).addClass("c-style2");
    }, function() {
        if ($(window).scrollTop() <= oHead.outerHeight() && oP.length == 0 && !oBody.hasClass("c-open")) {
            oHead.removeClass("c-style2");
        } else if ($(window).scrollTop() > oHead.outerHeight()) {
            oHead.addClass("c-style2");
        } else if ($(window).scrollTop() <= oHead.outerHeight() && oP.length != 0) {
            oHead.addClass("c-style2");
        }
    });

    // 手机端导航显示
    oBtn.click(function() {
        if (b) {
            b = false;
            // t = $(window).scrollTop();
            oBody.addClass('c-open');
            // oBody.css("top", -t);
        } else {
            b = true;
            oBody.removeClass('c-open');
            // oBody.css("top", "0");
            // $(window).scrollTop(t);
        }
    });

    // 导航显示及样式
    function fn1() {
        if ($(window).scrollTop() - i > 0 && $(window).scrollTop() > oHead.outerHeight() && !oBody.hasClass("c-open")) {
            i = $(window).scrollTop();
            oHead.addClass("c-head-move");
            oHead.addClass("c-style2");
        } else if ($(window).scrollTop() - i <= 0) {
            i = $(window).scrollTop();
            oHead.removeClass("c-head-move");
            if ($(window).scrollTop() <= oHead.outerHeight() && oP.length == 0 && !oBody.hasClass("c-open")) {
                oHead.removeClass("c-style2");
            } else if ($(window).scrollTop() > oHead.outerHeight()) {
                oHead.addClass("c-style2");
            } else if ($(window).scrollTop() <= oHead.outerHeight() && oP.length != 0) {
                oHead.addClass("c-style2");
            }
        }
    }
    fn1();
    $(window).scroll(function() {
        fn1();
    });

    // pc导航动画
    oL.each(function() {
        if ($(this).hasClass("on")) {
            num = $(this).index();
        }
        $(this).hover(function() {
                oL.eq(num).removeClass("on");
                $(this).children("ul").stop().slideDown();
            },
            function() {
                oL.eq(num).addClass("on");
                $(this).children("ul").stop().slideUp();
            });
    });
}
headNav();

// 顶部搜索
function headSearch() {
    var obj = $("#c-header form");
    var oBox = obj.find(".c-box");
    obj.hover(function() {
        oBox.stop().fadeIn();
    }, function() {
        oBox.stop().fadeOut();
    });
    obj.submit(function(){
        if(!$(this).find("input").val()){
            layer.msg('请输入搜索的关键词！', {
                icon: 7
            });
            return false;
        }
    });
}
headSearch();

// 顶部效果

// window.onload = function(){
// 	$('.header .box .right .r-box .menu ul li .m-link').addClass(' wow fadeInDownSmall')
// }


// 首页轮播
function homeBanner() {
    var swiper = new Swiper(".c-home-banner", {
        // effect : 'fade',
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        // breakpoints: {
        //     767: {
        //         slidesPerView: 3,
        //         spaceBetween: 20,
        //     }
        // }
    });
    // 设置全屏
    HiSetClientHeight($(".c-home-banner .swiper-slide img"));
}
homeBanner();

// 可视化数据滚动
function visualData(obj) {
    $(window).load(function() {
        obj.each(function() {
            var h = Number($(this).html());
            var t = "";
            var n = Math.ceil(h / 20);
            var a = true;
            var This = $(this);
            if ($(this).length != 0) {
                t = $(this).offset().top;
            }
            This.html(0);
            fn1();
            $(window).scroll(function() {
                fn1();
            });

            function fn1() {
                var wT = $(window).scrollTop();
                if (wT > t - $(window).height() + 50 && wT < t - 50 && a == true) {
                    a = false;
                    var y = 0;
                    var timer2 = setInterval(function() {
                        if (y >= h) {
                            y = h;
                            clearInterval(timer2);
                        }
                        This.html(y);
                        y += n;
                    }, 100);
                }
            }
        });
    });
}
visualData($(".c-num-move"));


// 侧边栏回到顶部
function goTop() {
    var obj = $("#c-go-top");
    var oBtn = $("#c-go-top");
    oBtn.click(function() {
        $("html,body").animate({ scrollTop: 0 }, 500);
    });

    function fn1() {
        if ($(window).scrollTop() > $(window).height()) {
            obj.fadeIn();
        } else {
            obj.fadeOut();
        }
    }
    fn1();
    $(window).scroll(function() {
        fn1();
    });
}
goTop();

// 底部导航
function footerNav() {
    var aList = $("#c-footer .c-list-box");
    aList.each(function() {
        var This = $(this);
        $(this).find(".c-title-box").click(function() {
            if ($(window).width() < 768) {
                This.toggleClass("on");
                This.find(".c-list").stop().slideToggle();
            }
        });
    });
}
footerNav();

// 二维码弹窗
function codePop() {
    var b = $("#c-footer .c-code-btn");
    var w = $("#c-code-pop");
    var c = w.find(".c-close");
    var d = w.find(".c-img-box");
    var oImg = w.find(".c-img-box>img");
    b.click(function() {
        oImg.attr("src",$(this).data("img-src"));
        w.stop().fadeToggle();
        
    });
    d.click(function() {
        return false;
    });
    w.click(function() {
        w.stop().fadeToggle();
    });
    c.click(function() {
        w.stop().fadeToggle();
    });
}
codePop();


// banner设置全屏高度
HiSetClientHeight($(".banner"));

// 通过滚动方向控制head状态
$(document).on('mousewheel DOMMouseScroll', onMouseScroll);
function onMouseScroll(e){
    var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
    if(wheel<1){//向下滚动
        $('.header').addClass('fhs');
		
		$('.g_ene_nav').removeClass('sticky_top');
    }else{//向上滚动
        $('.header').removeClass('fhs');
		
		$('.g_ene_nav').addClass('sticky_top');
    }   
    $('.header .right .menu ul li .s-menu').hide();
}

// 通过滚动判断head状态
function fn1() {
    if ($(window).scrollTop() > 1) {
        $('.header').addClass('fh');
    } else {
        $('.header').removeClass('fh');
    }
}
fn1();
$(window).scroll(function () {
    fn1();
})


$('.header .box .right .close').on('click',function(){
    $(this).toggleClass('on');
    $('.header .box .right .r-box').stop().slideToggle();
})

// 导航下拉
xxkhn('.g_navN1 .g_left .g_zhi_box','.g_right .img')
function xxkhn(dj,x_id){
	
	$(dj).hover(function(){
		$(this).addClass('on').siblings().removeClass('on');
		$(this).parent().parent().find(x_id).removeClass('on');
		$(this).parent().parent().find(x_id).eq($(this).index()).addClass('on');
	})
}

$('.header .box .right .r-box .menu ul li').hover(function(){
	$(this).find('.g_navN1,.g_navN2').stop().slideDown()
	$(this).find('.g_tjt').stop().show()
},function(){
	$(this).find('.g_navN1,.g_navN2').stop().slideUp()
	$(this).find('.g_tjt').stop().hide()
})

$('.header .box .right .r-box .other .search').hover(function(){
	$(this).find('.g_navN3').stop().slideDown()
	$(this).find('.g_tjt').stop().show()
},function(){
	$(this).find('.g_navN3').stop().slideUp()
	$(this).find('.g_tjt').stop().hide()
})

$('.header .box .right .r-box .other .language').hover(function(){
	$(this).find('.g_navN4').stop().slideDown()
	$(this).find('.g_tjt').stop().show()
},function(){
	$(this).find('.g_navN4').stop().slideUp()
	$(this).find('.g_tjt').stop().hide()
})

$(".pop_a").click(function(){
	$('body,html').animate({scrollTop:0},300);
	$('nav').removeClass('nav1_none');
});
$(window).scroll(function() {
	if ($(window).scrollTop() > ($(window).height())/2) {
			$('.pop_a').fadeIn(250);
	} else {
			$('.pop_a').fadeOut(250);
	}
});

$(".footer .container-index .center .ewm ul li").hover(function(){
	$(this).addClass('on')
	$(this).find('.ewm_b').stop().slideDown()
},function(){
	$(this).removeClass('on')
	$(this).find('.ewm_b').stop().slideUp()
}
);