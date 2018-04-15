var CookieUtil = {
	// 获取 cookie
	get: function(name) {
		var cookieName = encodeURIComponent(name) + '=';
		var cookieStart = document.cookie.indexOf(cookieName);
		var cookieValue = null;
		if (cookieStart > -1) {
			var cookieEnd = document.cookie.indexOf(';', cookieStart);
			if (cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
		}
		return cookieValue;
	},
	// 设置 cookie: 前两个参数为必填。
	set: function(name, value, expires, path, domain, secure) {
		var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
		if (expires instanceof Date) {
			cookieText += '; expires=' + expires.toGMTString();
		}
		if (path) {
			cookieText += '; path=' + path;
		}
		if (domain) {
			cookieText += '; domain=' + domain;
		}
		if (secure) {
			cookieText += '; secure';
		}
		document.cookie = cookieText;
	},
	// 删除 cookie： 第一个参数必填，后三个参数可选
	unset: function(name, path, domain, secure) {
		this.set(name, '', new Date(0), path, domain, secure);
	}
};
