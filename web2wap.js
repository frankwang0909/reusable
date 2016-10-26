

var browser={  
	versions:function(){   
		var u = navigator.userAgent, app = navigator.appVersion;   
		return {//移动终端浏览器版本信息   
		    trident: u.indexOf('Trident') > -1, //IE内核  
		    presto: u.indexOf('Presto') > -1, //opera内核  
		    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
		    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
		    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
		    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
		    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
		    iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器  
		    iPad: u.indexOf('iPad') > -1, //是否iPad    
		    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
		};  
	}(),  
	
	language:(navigator.browserLanguage || navigator.language).toLowerCase()  
}; 


if (browser.versions.mobile || browser.versions.ios || browser.versions.android || browser.versions.iPhone || browser.versions.iPad) {
    var url = window.location.href;
    var reg = /(ticket)\/(index\/)?(\d+)(\.html)?$/gi;
    var reg2 = /(ticket\/list)(\.html)/gi;
    if (reg.test(url)) {
        var tmp = url.split("/");
        var parameter = tmp[tmp.length-1];
        if(parameter.indexOf(".") == -1){
            parameter  += ".html";
        }
         window.location.href = "http://m.xxxx/infor/show-" + parameter;
    }else if (reg2.test(url)) {
         window.location.href = 'http://m.xxxx/infor/list-0-1.html';
    }
    else {
        window.location = "http://m.xxxx.com";
    }
}