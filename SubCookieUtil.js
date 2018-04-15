// SubCookie 是开发人员为了绕开浏览器的单个域名下 cookie 数量限制而采用的一种方法，即使用 cookie 值来存储多个键值对。
// subCookie 是存放在单个 cookie 中的更小段的数据。
// 一般格式为: cookiename=subcookie=value1&subcookie2=value2&subcookie3=value3

var SubCookieUtil = {
	// 获取所有 subCookie，并将它们放到一个对象中保存
	getAll: function(name) {
		var cookieName = encodeURIComponent(name) + '=';
		var cookieStart = document.cookie.indexOf(cookieName);
		var cookieValue = null;
		var cookieEnd;
		var subCookies;
		var parts;
		var result = {};
		if (cookieStart > -1) {
			cookieEnd = document.cookie.indexOf(';', cookieStart);
			if (cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}
			cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
			if (cookieValue.length > 0) {
				subCookies = cookieValue.split('&');
				for (var i = 0; i < subCookies.length; i++) {
					parts = subCookies[i].split('=');
					result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1])
				}
			}
			return result;
		}

		return null;
	},
	// 获取单个 subCookie 的值
	get: function(name, subName) {
		var subCookies = this.getAll(name);
		if (subCookies) {
			return subCookies[subName];
		} else {
			return null;
		}
	},
	// 设置 subCookie
	setAll: function(name, subCookies, expires, path, domain, secure) {
		var cookieText = encodeURIComponent(name) + '=';
		var subCookieParts = [];
		var subName;
		for (subName in subCookies) {
			if (subName.length > 0 && subCookies.hasOwnProperty(subName)) {
				subCookieParts.push(encodeURIComponent(subName) + '=' + encodeURIComponent(subCookies[subName]));
			}
		}
		if (subCookieParts.length > 0) {
			cookieText += subCookieParts.join('&');
			if (expires instanceof Date) {
				cookieText += '; expires=' + expires.toGMTString();
			}
			if (path) {
				cookieText += '; path' + path;
			}
			if (domain) {
				cookieText += '; domain' + domain;
			}
			if (secure) {
				cookieText += '; secure';
			}
		} else {
			cookieText += '; expires=' + (new Date(0)).toGMTString();
		}
		document.cookie = cookieText;
	},
	// 设置单个 subCookie
	set: function(name, subName, value, expires, path, domain, secure) {
		subCookies[subName] = value;
		this.setAll(name, subCookies, expires, path, domain, secure);
	},

	// 删除单个 subCookie
	unset: function(name, subName, path, domain, secure) {
		var subCookies = this.getAll(name);
		if (subCookies) {
			delete subCookies[subName];
			this.setAll(name, subCookies, null, path, domain, secure);
		}
	},
	// 删除 某个cookie 下所有的 subCookie
	unsetAll: function(name, path, domain, secure) {
		this.setAll(name, null, new Date(0), path, domain, secure);
	}
};
