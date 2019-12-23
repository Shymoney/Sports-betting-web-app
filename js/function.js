/**
 * supplant() does variable substitution on the string. It scans
 * through the string looking for expressions enclosed in {} braces.
 * If an expression is found, use it as a key on the object,
 * and if the key has a string value or number value, it is
 * substituted for the bracket expression and it repeats. 
 */
String.prototype.supplant = function( o ) {
	return this.replace(/{([^{}]*)}/g,
		function(a, b) {
			var r = o[b];
			return typeof r === 'string' || typeof r === 'number' ? r : a;
		}
	);
};

String.prototype.trim = String.prototype.trim || function(){
	return this.replace(/^\s+/,'').replace(/\s+$/, '');
};

Array.prototype.indexOf = Array.prototype.indexOf || function(elt /*, from*/) {
	var len = this.length >>> 0;
	var from = Number(arguments[1]) || 0;
	from = (from < 0) ? Math.ceil(from) : Math.floor(from);
	if (from < 0) { from += len; }
	for (; from < len; from++) {
		if (from in this && this[from] === elt) {
			return from;
		}
	}
	return -1;
};

function setFree() {
	$j('#update_access').val(1);
}

function setEngaged() {
	$j('#update_access').val(0);
}

function isFree() {
	$j('#update_access').val() == '1';
}

function isEngaged() {
	$j('#update_access').val() == '0';
}

function now () {
	return (new Date()).getTime();
};

function $defined(obj) {
	return (obj != undefined && obj != null);
};
function $id ( id ){
	var obj = document.getElementById(id);
	return $defined( obj ) ? obj : document.createElement('select');
};
function $chkObj (id) {
	return $defined( document.getElementById(id) );
};
function $clearField (id) {
	$id(id).value='';
};
function $clear(timer){
	clearTimeout(timer);
	clearInterval(timer);
	return null;
};

function $event( event ) {
	event.preventDefault = event.preventDefault || function(){this.returnValue = false;};
	event.stopPropagation = event.stopPropagaton || function(){this.cancelBubble = true;};
	// Fix target property, if necessary
	if ( !event.target ) {
		event.target = event.srcElement || document; // Fixes #1925 where srcElement might not be defined either
	}
	// check if target is a textnode (safari)
	if ( event.target.nodeType === 3 ) {
		event.target = event.target.parentNode;
	}
	// Add relatedTarget, if necessary
	if ( !event.relatedTarget && event.fromElement ) {
		event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
	}
	// Calculate pageX/Y if missing and clientX/Y available
	if ( event.pageX == null && event.clientX != null ) {
		var doc = document.documentElement, body = document.body;
		event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
		event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
	}
	// Add which for key events
	if ( event.which == null && (event.charCode != null || event.keyCode != null) ) {
		event.which = event.charCode != null ? event.charCode : event.keyCode;
	}
	// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
	if ( !event.metaKey && event.ctrlKey ) {
		event.metaKey = event.ctrlKey;
	}
	// Add which for click: 1 === left; 2 === middle; 3 === right
	// Note: button is not normalized, so don't use it
	if ( !event.which && event.button !== undefined ) {
		event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
	}
	return event;
};

function round(value, precision){
	precision = Math.pow(10, precision || 0);
	return Math.round(value * precision) / precision;
};

/**
 * @param {Number} value
 * @returns {String}
 */
function addZero ( value ) {
	return value < 10 ? '0' + value : value + '';
}

/**
 * @param {Number} serverTime
 * @param {Number} timeZone
 */
function getTime ( timeZone ) {
	var now_ = new Date();
	var time_ =  new Date( now_.getTime() + 60000 * ( now_.getTimezoneOffset() + timeZone * 60 ) );
	return {
		hours : addZero( time_.getHours() ),
		minutes : addZero( time_.getMinutes() ),
		seconds : addZero( time_.getSeconds() ),
		month : time_.getMonth(),
		day : addZero( time_.getDate() ),
		year : time_.getFullYear()
	};
}

window.Cookie = new function (){
	return {
		set: function (name, value, options){
			value = encodeURIComponent(value);
			if ( options.domain ) value += '; domain=' + options.domain;
			if ( options.path ) value += '; path=' + options.path;
			if ( options.expires ) {
				var date = new Date();
				date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
				value += '; expires=' + date.toGMTString();
			}
			if ( options.secure ) value += '; secure';
			document.cookie = name + '=' + value;
		},
		get: function (name){
			var value = document.cookie.match('(?:^|;)\\s*' + name.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1') + '=([^;]*)');
			return (value) ? decodeURIComponent(value[1]) : null;
		},
		remove: function (name){
			this.set(name, 0, {expires: -1});
		}
	};
};

function transformCoeff(coeff, type, inverse) {
	if( !inverse ) {
		if( type === "EU" ) {
			return 1*coeff;
		}
		if( type === "UK" ) {
			return 1*coeff;
		}
		if( type === "US" ) {
			return round(coeff >= 2 ? 100*(coeff - 1) : 100/(1 - coeff));
		}
		if( type === "HK" ) {
			return coeff - 1;
		}
		if( type === "ID" ) {
			return round(coeff >=2 ? coeff - 1 : -1/(coeff - 1), 2);
		}
		if( type === "MY" ) {
			return round(coeff <=2 ? coeff - 1 : -1/(coeff - 1), 2);
		}
	} else {
		if( type === "EU" ) {
			return 1*coeff;
		}
		if( type === "US") {
			return coeff >= 0 ? 1+ coeff/100 : 1 - 100/coeff;
		}
		if( type === "UK" ) {
			return 1*coeff;
		}
		if( type === "HK" ) {
			return 1*coeff+1;
		}
		if( type === "ID" ) {
			return coeff >= 0 ? 1+ coeff : 1 - 1/coeff;
		}
		if( type === "MY" ) {
			return coeff >= 0 ? 1+ coeff : 1 - 1/coeff;
		}
	}
	return 1*coeff;
};

var logout_request = "LOGOUT_REQUEST";
var operator_logout_request = "OPERATOR_LOGOUT_REQUEST";
var logout = "LOGOUT";

var Base64 = (function(){
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	function _utf8_encode (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0, len = string.length; n < len; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	};
	function _utf8_decode (utftext) {
		var string = "", i = 0, c = c1 = c2 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	};
	return {
		encode : function (input) {
			var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
			input = _utf8_encode(input);
			
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output += _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
			}
			return output;
		},
		decode : function (input) {
			var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			while (i < input.length) {
				enc1 = _keyStr.indexOf(input.charAt(i++));
				enc2 = _keyStr.indexOf(input.charAt(i++));
				enc3 = _keyStr.indexOf(input.charAt(i++));
				enc4 = _keyStr.indexOf(input.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output += String.fromCharCode(chr1) + (enc3 != 64 ? String.fromCharCode(chr2) : '') + (enc4 != 64 ? String.fromCharCode(chr3) : '' );
			}
			return  _utf8_decode(output);
		}
	};
})();

var 
	ltime,
	ctime,
	interval = 10000,
	contenturl = "getdata.php?sec=100031&noscript=1",
	response = "",
	stime,
	HistoryAjaxArea = "content main_content",
	AjaxHistory = []
;

/* === change style of popup div === */
function changeAmt(id, odd, row, lay){
	var
		amtElem = $id(id+'amt'),
		profitElem = $id(id+'profit'),
		oddElem = $id(id+'odd'),
		amtValue = amtElem.value,
		oddValue = round(oddElem.value, 2)
	;

	if( (oddValue < 1.01) || (oddValue > 1000) ) {
		alert( js_messages["Odds value for this market should be between 1.01 and 1000"] );
		oddElem.value = oddValue = 1.01;
	}

	if (lay == 1) {
// 		document.getElementById(profitId).value = parseFloat(amt).toFixed(2);
		CalculateLiabltyProfit(id);
	} else {
		profitElem.value = profitElem.value.replace(/[\d.,]+/, round(amtValue * (oddValue - 1 ), 2));
	}
	
	ScriptDoLoad("getdata.php?sec=100006&id="+id+"&amt="+amtValue+"&odd="+oddValue, "tmp", '', 1);
	ScriptDoLoad(contenturl, "content", '', 1);
}

function silentUpdateOdd(id, row, lay, diff) {
	var 
		oddElem = $id(id+'odd'),
		oddVal = Math.min(Math.max(parseFloat(oddElem.value) + diff, 1.01), 999)
	;
	oddElem.value = round(oddVal, 2);
	changeAmt(id, oddVal, row, lay);
}

function getStep(old_value) {
	old_value = parseFloat(old_value);
	
	if (old_value < 2) {
		return 0.01;
	} else if (old_value < 3) {
		return 0.02;
	} else if (old_value < 4) {
		return 0.05;
	} else if (old_value < 6) {
		return 0.1;
	} else if (old_value < 10) {
		return 0.2;
	} else if (old_value < 20) {
		return 0.5;
	} else if (old_value < 50) {
		return 1;
	} else if (old_value < 100) {
		return 2;
	} else if (old_value < 200) {
		return 5;
	} else {
		return 10;
	}
}

function add(id, row, lay){
	silentUpdateOdd(id, row, lay, getStep($id(id+'odd').value));
}

function subtract(id, row, lay){
	silentUpdateOdd(id, row, lay, -getStep($id(id+'odd').value));
}

function CalculateLiabltyProfit(id){
	$id( id + 'profit' ).value = $id( id + 'profit' ).value.replace(/[\d.,]+/, round( $id(id + "amt").value * ($id("sel_"+id).value == 'liability' ? ( $id(id + "odd").value - 1) : 1), 2));
}

function getProfileType( etype, area ){
	ScriptDoLoad( "getdata.php?sec=000003&subsec=myinfo&etype="+etype, ( area || 'main_content'));
}

function selectCurrencyReport(subsec, area){
	ScriptDoLoad("getdata.php?sec=reports&subsec=" + (subsec || $id('rep_type').value), ( area || 'subarea'));
}

function selectLeague() {
	ScriptDoLoad( "getdata.php?sec=100051&subsec=updt&sport="+$id('sport').value ,'main_content');
}

function selectEvent() {
	ScriptDoLoad( "getdata.php?sec=100051&subsec=updt&sport="+$id('sport').value+"&league="+$id('league').value, 'main_content');
}

function selectCatLeagues(area) {
	$j.get("getdata.php?sec=100762&sport=" + $id('sport').value, function(data) {
		$j('#' + area).html(data);
	});
	ScriptDoLoad('getdata.php?sec=getCountriesOptions&sport_id=' + document.getElementById('sport').value, 'country');
}

function selectCatalogueShops(location_id, select_id) {
	$j.get("getdata.php?sec=load_options&subsec=shops&location_id=" +location_id, function(data) {
		$j('#' + select_id).html(data);
	});
	if (location_id) {
		$j('#' + select_id).disable();
	}
//	ScriptDoLoad('getdata.php?sec=getCountriesOptions&sport_id=' + document.getElementById('sport').value, 'country');
}

function selectCountry() {
	ScriptDoLoad('getdata.php?sec=getLeaguesOptions&sport_id=' + document.getElementById('sport').value + '&country_id=' + document.getElementById('country').value, 'league');
}

function selectLeagueEvents(area){
	$j.get("getdata.php?sec=100772&league="+$id('league').value, function(data) {
		$j('#' + area).html(data);
	});
}

function showEvents(){
	ScriptDoLoad( "getdata.php?sec=100051&subsec=eve&sport="+$id('sport').value+"&league="+$id('league').value+"&event="+$id('event').value, 'sub_content');
}

function GetLeagues( area ){
	ScriptDoLoad( 'getdata.php?sec=100013&sportid=' + $id('sport').value, area );
}

function SubmitSearchForm( url, formname, area, val ) {
	$id('datesec').value = val;
	ScriptDoLoadPost( url, formname, area);
}

/* func to submit alarms *///
/* old function */
function SettleEvents( url, subpos, mid){
		var action= $id('action' + mid).value;
		if (action != ''){
			ScriptDoLoad( url + "&action=" + action ,subpos);
		} else {
			return false;
		}
		return true;
}

function ClearDateSec(url,formname,xsubpos){
	$clearField('datesec');
	ScriptDoLoadPost(url,formname,xsubpos);
}

// func to list leagues
function Listleagues(url,xpos,query){
	if( $chkObj('betcard') ) {
		$id(xpos).style.display = '';
		ScriptDoLoad(url,xpos);
		setTimeout(function(){ScriptDoLoad('getdata.php?sec=100003&subsec=bcdisp','betcard');},1000);
	} else {
		window.location.href='home.php?sid=' + xpos.split("larea")[1];
	}
}

// show events while selecting league
function ShoweEvents(url, xpos, league){
	$clear(ctime);
	if ($id('event').value && $id('league').value) {
		ScriptDoLoad( url + '&lid=' + $id('league').value + (!league ? '&eventid=' +  $id('event').value : ''), xpos);
	}
}

// func to add default match bets
function AddDefaultMatchBet(url, xpos, load_func){
	if( !$chkObj('bet') ) {
		ScriptDoLoad('getdata.php?sec=100003&subsec=bcdisp','betcard');
		setTimeout(function(){
			ScriptDoLoad(url, xpos);
		},200);
	}else{
		ScriptDoLoad(url, xpos);
	}
}

function CheckUserId(url, xpos){
	ScriptDoLoad(url + '&uid=' + $id('uid').value, xpos, '', 1);
}

function ScriptDoLoadPostCustom(url, form, area, sec, subsec, cust) {
	if (sec) { document.forms[form].sec.value = sec; }
	if (subsec) { document.forms[form].subsec.value = subsec; }
	ScriptDoLoadPost(url, form, area);
}

function ScriptDoLoadPost(url, formName, area, NoLoading, callback){
	var form = !formName.indexOf || formName.indexOf("=") < 0 ? toForm(formName) : false;
	var POST = (form.method || 'post').toLowerCase() === 'post';
	var data = form === false ? formName : FormSerialize( form );
	
	if ( callback === false ) { callback = function(){return false;}; }
	
	jQuery.ajax({
		type: "post",
		data: data,
		url: url,
		beforeSend: function(){
			jQuery(document).trigger( jQuery.extend(jQuery.Event('show__loading'), {NoLoading: !!NoLoading, area: area, formName: formName }) );
		},
		success: function(html, status){
			if (html == operator_logout_request) {
				window.location = '/home.php?status=operator_logout_multiple';
				return;
			}

			if( area && !(jQuery.isFunction(callback) && callback.apply(this, arguments) === false) ) {
				jQuery("#"+area).html(html);
			}
		},
		complete: function(){
			jQuery(document).trigger( jQuery.extend(jQuery.Event('hide__loading'), {NoLoading: !!NoLoading, area: area, formName: formName }) );
		},
		context: form || this
	});
	
	if( !POST || form === false ) {
		var 
			hisrtoryArea = HistoryAjaxArea.split(" "),
			index = hisrtoryArea.indexOf( area ),
			contentArea = (" " + HistoryAjaxArea + " ").indexOf(" "+ area +" ") > -1,
			setHash = index > -1 && ScriptDoLoad.history === true;
		;
		if ( setHash ) {
			var copyUrl = url.slice(0);
			if( url.indexOf("?") > -1 ) {
				url = encodeURI( url.split("?")[1].split("&amp;").join("&").split("&").join("/").split("=").join("/") );
			}
			hashval = "u="+url+"&data=" + data.split("&").join("/").split("=").join("/") + "&a="+index+"&nl="+1*(!!NoLoading);
			url = copyUrl;
			AjaxHistory.push( url );

			if( jQuery.isFunction(ScriptDoLoad.setIframeLocation) ) {
				ScriptDoLoad.setIframeLocation( hashval );
			}
			
			location.hash = hashval;
			ScriptDoLoad.hash = hashval;
		}
	}
	
}

function ScriptDoLoadPostWithConfirmation(confirmation,url, formName, area, NoLoading, callback){
	if ( typeof(confirmation) === "string" ) {
		confirm(confirmation) && ScriptDoLoadPost(url, formName, area, NoLoading, callback);
	} else if ( jQuery.isFunction(confirmation.onLoad) && jQuery.isFunction(confirmation.onClose) ) {
		confirmation.onLoad().onClose(function () { ScriptDoLoadPost(url, formName, area, NoLoading, callback); });
	}
	return false;
};

function getReportFile(formName, reportType, additionalGetParameters, method) {

	var additionalGetParameters = additionalGetParameters || '';
	var method = method || 'post';
	var fuid = "fuid"+now();
	
	var $form = $j(toForm(formName)).data(fuid, false).bind('submit', false);
	$form
		.find('input:image')
		.bind("mousedown", function(){
			$form.data(fuid, true);
			$j(document).one("click", function(){
				$form.data(fuid, false);
			});
		})
		.bind('click', function(){
			if ($form.data(fuid) === false ) { return false; }
			$form
				.data('oldMethod', $form.attr("method")||"get")
				.data('oldAction', $form.attr("action")||location.href)
				.attr("method", method)
				.attr("action", "getdata.php?report_export=" + reportType + '&' + additionalGetParameters)
				.unbind('submit')
				.one('submit', function(e){ e.stopImmediatePropagation(); })
				.one('submit', function(e){
					$form.attr("method", $form.data("oldMethod")).attr("action",  $form.data("oldAction"));
				})
				.bind('submit', false)
			;
		})
		.attr('title', function(){ return jQuery(this).attr('alt'); })
	;
}

var query_queue = [];

function ScriptDoLoad(url, area, hashval, NoLoading, NoClearInterval, callback){
	if( ScriptDoLoad["content"] && jQuery.isFunction( ScriptDoLoad["content"].abort ) ) { ScriptDoLoad["content"].abort(); }
	if( (area == 'content' || area == 'main_content') && ScriptDoJsonP.xhr && jQuery.isFunction( ScriptDoJsonP.xhr.abort ) ) { 
		ScriptDoJsonP.xhr.abort();
	}

	if ( arguments.length == 4 && jQuery.isFunction(NoLoading) ) {
		callback = NoLoading;
		NoLoading = 1;
	} else if ( arguments.length == 5 && jQuery.isFunction(NoClearInterval) ) {
		callback = NoClearInterval;
		NoClearInterval = 1;
	}

	var 
		hisrtoryArea = HistoryAjaxArea.split(" "),
		index = hisrtoryArea.indexOf( area ),
		contentArea = (" " + HistoryAjaxArea + " ").indexOf(" "+ area +" ") > -1,
		setHash = index > -1 && ScriptDoLoad.history === true;
	;
	
	/*if (!hashval) {
		setHash = true;
	}*/
	
	if ( setHash && !hashval ) {
		var copyUrl = url.slice(0);
		if( url.indexOf("?") > -1 ) {
			url = encodeURI( url.split("?")[1].split("&amp;").join("&").split("&").join("/").split("=").join("/") );
		}
		hashval = "u="+url+"&a="+index+"&nl="+1*(!!NoLoading)+"&nci="+1*(!!NoClearInterval);
		url = copyUrl;
		AjaxHistory.push( url );
	}
	if ( setHash && typeof hashval == "string" && hashval ) {
		if( jQuery.isFunction(ScriptDoLoad.setIframeLocation) ) {
			ScriptDoLoad.setIframeLocation( hashval );
		}
			
		location.hash = hashval;
		ScriptDoLoad.hash = hashval;
		
	}
	if (area == 'content' && !$chkObj('content')) {
		area = 'main_content';
	}

	if ((area == 'content') || (area == 'eventsel')){
		contenturl = url;
		if(!NoClearInterval) { $clear(ctime); }
	}
	
	if ( area == "main_content_sibling" ) {
		if ( $chkObj('main_content_sibling')) {
			$id("main_content").style.display = "none";
			$id("main_content_sibling").style.display = "";
		} else {
			area = "main_content";
		}
	}

	if (area == 'bet') {
		if (!$chkObj('bet')) {
			ScriptDoLoad('getdata.php?sec=100003&subsec=bcdisp','betcard');
			setTimeout( function(){ ScriptDoLoad( url, area ); },200);
			return;
		} else {
			$id('betcard').style.display = '';
		}
	}
	
	var target = $id( area ), tuid = 'timer'+ now();
	
	var $send_request = {
		url: url,
		beforeSend: function(){
			jQuery(document).trigger( jQuery.extend(jQuery.Event('show__loading'), {NoLoading: !!NoLoading, area: area}) );
		},
		success: function(html, status){
			if (html == logout_request) {
				window.location = '/home.php?status=logout_multiple';
				return;
			}

			if (html == operator_logout_request) {
				window.location = '/home.php?status=operator_logout_multiple';
				return;
			}

			if (html == logout) {
				window.location = '/';
				return;
			}
			
			if (html == 'NOTIFICATION') {
				displayNotificationLightbox();
				return;
			}			
			
			$clear(target[tuid]);
			if( area && !(jQuery.isFunction(callback) && callback.apply(this, arguments) === false) ) {
				jQuery("#"+area).html(html);
			}
			if ( contentArea ) {
				$id("main_content").style.display = "";
				$id("main_content_sibling").style.display = "none";
			}
			
			if (typeof transport !== 'undefined') {
				var $lpage  = $j('.main_page').height();
				
				transport.postMessage($lpage);
			}
		},
		complete: function(html){
			jQuery(document).trigger( jQuery.extend(jQuery.Event('hide__loading'), {NoLoading: !!NoLoading, area: area}) );
			ScriptDoLoad[  contentArea ? "content" : "other" ]  = null;
			if ( document.getElementById("ScriptDoJsonP") ) {
				ScriptDoJsonP(url, area);
			}
			
		}
	};
	
	var getdata = function(){
		ScriptDoLoad[ contentArea ? "content" : "other" ] = jQuery.ajax($send_request);
	};
   
	if (typeof queue !== 'undefined') {
		queue.add($send_request);
	} else {
		target[ tuid ] = setTimeout( getdata, 1);
	}


}

function displayNotificationLightbox() {
	ScriptDoLoad('getdata.php?sec=notification&subsec=get', 'notification__lightbox', 0, 1);
}

function UpdateOutcomes(outcomes){
	
	for ( var i = outcomes.length; i--; ) {
		var oid_ = outcomes[i].id,
			oid_element_ = document.getElementById("oid"+oid_);
		if ( oid_element_ ) {
			
			var odd_ = document.createTextNode( transformCoeff( outcomes[i]["odd"], Cookie.get("odd_format") ) );
			
			while ( oid_element_.firstChild ) {
				oid_element_.removeChild(oid_element_.firstChild);
			}
			
			oid_element_.appendChild(odd_);
			
			while ( oid_element_.nodeName.toLowerCase() != "a" ) {
				oid_element_ = oid_element_.parentNode;
			}
			
			if ( "outcome_data" in oid_element_ ) {
				oid_element_["outcome_data"]["odds"] = outcomes[i]["odd"];
			} else {
				var rev_ = oid_element_.getAttribute("rev");
				if ( rev_ ) {
					oid_element_.setAttribute("rev", rev_.replace(/('|")odds\1:[^,]+/,"$1odds$1:" + "'" + outcomes[i]["odd"] + "'"));
				}
			}
			odd_ = oid_element_ = null;
		}
	}
}
function ScriptDedicatedJson(url, callback) {
    window.mycallback = function(data) {
    	if (callback) {
    		callback.call(this, data);
    	}
  	};
    jQuery.ajax({
    	type: 'GET',
        url: url,
        contentType: 'application/jsonp',
        crossdomain: true,
        dataType: "jsonp",
        crossDomain: true,
        success: mycallback,
        error: function (xhr, status, err) {
            console.log(status, err);
        }
    });

	return;
}
function ScriptDoJsonP( url, area ){
	if( ScriptDoJsonP.xhr && jQuery.isFunction( ScriptDoJsonP.xhr.abort ) ) { ScriptDoJsonP.xhr.abort(); }
	ScriptDoJsonP.xhr = jQuery.ajax({
		url: "http://bettings:8800/subscribe?"+url.replace(/.*getdata\.php\?(?:sec=[^&]+&)?(?:subsec=[^&]+&)?/,''),
		data: "reload="+ encodeURIComponent("ScriptDoLoad('" + url + "','" + area + "','',1)"),
		dataType: "jsonp",
		jsonp: 'callback',
    	jsonpCallback: 'UpdateOutcomes',
    	cache: false,
		success: function () {
			ScriptDoJsonP.xhr = null;
			ScriptDoJsonP(url, area);
		},
		error: function () {  }
	});
};

function PlaceBetReload(){
	ScriptDoLoad(contenturl, 'content');
	setTimeout( function(){
		ScriptDoLoad('getdata.php?sec=100021','logoutbox');
	},200);
}

function DefaultReload(ScriptUrl, ScriptPos, no_interval, overwrite_interval){
	if (overwrite_interval) {
		interval = overwrite_interval;
	}
 	$clear(ctime);
	if(no_interval) {
		ScriptDoLoad(ScriptUrl,ScriptPos, location.hash.replace("#",'') || 1,1);
	} else {
		ctime = setInterval(function() {
			ScriptDoLoad(ScriptUrl, ScriptPos, location.hash.replace("#",'') || 1, 1, true);
		}, interval);
	}
}

function toForm ( form ) {
	var form_ = form;
	if( typeof form == 'string' ) {
		form_ = document.getElementById(form_) || document.forms[form];
		
		if (form_.nodeName !== 'FORM') {
			form_ = document.forms[form];
		}
		
		if( !(form_ && form_.nodeName && form_.nodeName.toLowerCase() === "form") ) {
			form_ = jQuery( form );
			form_ = form_.length ? form.get(0) : null;
		}
	}
	return ( form_ && form_.nodeType === 1 && form_.nodeName.toLowerCase() === "form" ) ? form_ : null;
}

function FormSerialize( form ) {
	return jQuery( toForm(form) ).serialize();
}

function ClearBetCard(){
	ScriptDoLoad( 'getdata.php?sec=100005&subsec=clear', 'betcard');
}

function SearchEvents(url, xpos){
	$clear(ctime);
	ScriptDoLoad(url + "&keyword="+$id("searchbox").value, xpos, '', 1);
	return false;
}

function ShowJavascriptConfirm(url,xpos){
	return confirm("Do you really want to proceed?") && ScriptDoLoad(url,xpos);
}

function confirmSubmitPost(url,xform,xpos,NoLoading,callback){
	return confirm("Do you really want to proceed?") && ScriptDoLoadPost(url, xform, xpos, NoLoading, callback);
}

function ShowPagination(pageno, url, formname, xpos){
	document.getElementById('pageno').value = pageno;
	
	//additional
	jQuery('#pageno').val(pageno);
	jQuery('input[name="pageno"]').val(pageno);
	
	//ScriptDoLoad( url + (url.indexOf("?") > -1 ? "&" : "?") + FormSerialize( toForm(formname) ), xpos);
	ScriptDoLoadPost( url, formname, xpos);
}

function checkEnter(event, script, fname ) {
	event = $event(event || window.event);
	if ( event.which == 13 || event.which == 10 ) {
		$clear(ctime);
		SearchEvents(script,fname);
		event.preventDefault();
		event.stopPropagation();
	}
}

var changeColor = (function(){
	var tabsId = "place_bet my_bet event_info".split(" "),
		tabs = [],
		indexes = {},
		active,
		class_selected = "selected";
	
	return function(id,url,pos){
		if ( !tabs.length ) {
			for ( i = tabsId.length; i;) {
				var elem = $id( tabsId[--i] );
				while ( elem && elem.nodeName.toLowerCase() != "li" ) {
					elem = elem.parentNode;
				}
				if( tabsId[i] === id ) {
					if( (" " + elem.className + " ").indexOf(" "+ class_selected+ " ") < 0 ) {
						elem.className = (elem.className + " " + class_selected).trim();
					}
					active = elem;
				} else {
					elem.className = (" " + elem.className + " ").replace(" " + class_selected + " ", " ").trim();
				}
				indexes[ tabsId[i] ] = tabs.length;
				tabs[ indexes[ tabsId[i] ] ] = elem;
			}
		} else {
			var elem = tabs[indexes[id]];
			if ( elem != active ) {
				active.className = (" " + active.className + " ").replace(" " + class_selected + " ", " ").trim();
				elem.className = (elem.className + " " + class_selected).trim();
				active = elem;
			}
		}
		
		$id('betcard_bot').style.display = 'none';
		if (!url) { return; }
		ScriptDoLoad(url,pos,'', 1);
		return false;
	};
	
})();

function hideArea(xpos){
	var elem = $id(xpos);
	elem.style.display = 'none';
	elem.innerHTML = '';
}

function showArea(xpos){
	$id(xpos).style.display = '';
}

function SettleEvent(url,xpos,no_status){
	if ( no_status || $id('status').value == 'settle' ){
		ShowJavascriptConfirm(url,xpos);
	}
}

function OpenNewWindow(url,win_width,win_height){
	window.open(url,'mywindow','width='+win_width+',height='+win_height+',left=160,top=115,screenX=160,screenY=110');
}

function confirmExclusion() {
	if ( $id('excluded').checked ) {
		if (!confirm("Self exclusion will prevent you from placing any bets, and from accessing your account for a minimum of 6 months. Any un-matched bets will be cancelled. Any matched bets will stand. Should you have any available funds in your account, please withdraw them before invoking self exclusion or contact the Helpdesk to ask for a withdrawal on your behalf. Your account will not be reactivated under any circumstances during the 6 months minimum exclusion period. If we become aware of any other accounts held by you, we will enforce self exclusion on those accounts additionally. For further information regarding our Responsible Gambling Policy, please contact our Helpdesk.")) {
			$id('excluded').checked  = false;
		}
	}
}

function confirmExclusionSelect() {
	var excluded_period = $j('#excluded').val()
	if ( excluded_period > 0) {
		excluded_text = (excluded_period == 999) 
			? "Self exclusion will prevent you from placing any bets, and from accessing your account lifetime. Should you have any available funds in your account, please withdraw them before invoking self exclusion or contact the Helpdesk to ask for a withdrawal on your behalf. Your account will never be reactivated under any circumstances. If we become aware of any other accounts held by you, we will enforce self exclusion on those accounts additionally. For further information regarding our Responsible Gambling Policy, please contact our Helpdesk." 
			: "Self exclusion will prevent you from placing any bets, and from accessing your account for a minimum of " +excluded_period+ " months. Should you have any available funds in your account, please withdraw them before invoking self exclusion or contact the Helpdesk to ask for a withdrawal on your behalf. Your account will not be reactivated under any circumstances during the " +excluded_period+ " months minimum exclusion period. If we become aware of any other accounts held by you, we will enforce self exclusion on those accounts additionally. For further information regarding our Responsible Gambling Policy, please contact our Helpdesk.";
		if (!confirm(excluded_text)) {
			$j('#excluded').val('0');
		}
	}
}

function euclid(n, m) {
	if (m == 0) return n;
	var p = n % m;
	while (p != 0) {
		n = m;
		m = p;
		p = n % m;
	}
	return m;
}

function ConvertToFractional(odds){
	var odd = parseFloat(odds);
	var trad = "";
	if (isNaN(odd) || odd == 0) {
		trad = "0/0";
	} else {
		odd = Math.round((odd - 1) * 100);
		var e = euclid(odd, 100);
		trad = (odd / e) + "/" + (100 / e);
	}
	Tip(trad);
}

function CheckProfitLoss() {
	if ( $id('check_prft_loss').checked ) {
		$id('check_settle_bet').disabled = $id('check_exp_comm').disabled = $id('check_exp').disabled = false;
	} else {
		$id('check_settle_bet').disabled = $id('check_exp_comm').disabled = $id('check_exp').disabled = true;
		$id('check_exp_comm').checked = $id('check_settle_bet').checked = $id('check_exp').checked = false;
	}
}

function showInterval(url,pos,count_int){
	if( count_int > 0 ) {
		$id(pos).innerHTML = 'Placing bet in '+ count_int + ' seconds';
		stime = setTimeout(function(){
			showInterval(url,pos, --count_int);
		}, 1000);
	} else {
		count_int = 0;
		$clear(stime);
		ScriptDoLoad(url,'betcard');
	}
}

function AddValueToOption(inputid,selectid){
	var inpElem = $id(inputid), value = inpElem.value;
	if( !value ) return;
	jQuery("#"+selectid).append('<option value="'+value+'">'+value+'</option>');
	inpElem.value = '';
}

function RemoveValueToOption(selectid){
	jQuery("#"+selectid).children(":selected").remove();
}

function SelectAllAndSubmit(selectid,xform,xarea){
	selectAllOptions(selectid);
	confirmSubmitPost('getdata.php',xform,xarea);
}

function selectAllOptions(selectid) {
	var obj=$id(selectid);
	for (var i=0, len = obj.options.length; i < len; i++) { obj.options[i].selected = true; }
}

function submitFormByName(act, form, cont, NoLoading, callback){
	if( "subsec" in document.forms[form] ) {
		document.forms[form].subsec.value = act;
	}
    if( "request" in document.forms[form] ) {
        document.forms[form].request.value = act;
    }
	ScriptDoLoadPost('getdata.php', form, cont, NoLoading, callback);	
}

function submitForm(act, NoLoading, callback) {
	submitFormByName(act, 'betFn', 'main_content', NoLoading, callback);
}

var Router = (function(){
	var hash, iframe, d = window.document, name = "iframe"+now(), hisrtoryArea = HistoryAjaxArea.split(" ");
	
	var parseUrl = function ( url ) {
		for( var i = 0,params = url.split("/"), n = params.length, url = "getdata.php"; i < n; url += ( i && i & 1 ?  "="  : ( i ? "&" : "?" ) ) + decodeURIComponent( params[i++] ) );
		return url;
	};
	
	var reloadContent = function(h, iframe){
		if (hash !== h && ScriptDoLoad.hash == h) { hash = h; }
		if (hash !== h && ScriptDoLoad.hash != h) {
			if( h ) {
				var params = h.split("&"), len = params.length, args = [];
				if( len > 1 ) {
					
					args[0] = parseUrl( decodeURI(params[0]).replace(/^u=/, '') );
					if( h.indexOf("data=") < 0 ) {
						args[1] = hisrtoryArea[params[1].replace(/^a=/, '')];
						args[2] = h;
						//args[3] = 1; 
						args[3] = len > 2 ? parseInt(params[2].replace(/^nl=/, '')) : 0;
						args[4] = len > 3 ? parseInt(params[3].replace(/^nci=/, '')) : 0;
						ScriptDoLoad.apply(window, args);
					} else {
						args[1] = parseUrl( params[1].replace(/^data=/, '') ).split("?")[1];
						args[2] = hisrtoryArea[params[2].replace(/^a=/, '')];
						args[3] = 1; //args[3] = len > 2 ? parseInt(params[3].replace(/^nl=/, '')) : 0;
						ScriptDoLoadPost.apply(window, args);
					}
					
					hash = h;
					
				} else {
					throw new Error("incorrect hash url");
				}

			}
		}
	};
	if ( "\v" == "v" ) {
			return function() {
				if( !$defined(ScriptDoLoad.history) ) { ScriptDoLoad.history = true; }
				// create iframe that is constantly checked for hash changes
				if ( !iframe ) {
					iframe = d.createElement('iframe');
					iframe.scr = "javascript:false;";
					iframe.style.display = "none";
					iframe.name = iframe.id = name;
					d.body.appendChild(iframe);
					ScriptDoLoad.setIframeLocation = function (h) {
						if (h) {
							var doc = iframe.contentWindow.document;
							doc.open().close();	
							doc.location.hash = h;
						}
					};
					ScriptDoLoad.setIframeLocation(location.hash || '#');
				}
				setInterval(function() {
					var idoc = iframe.contentWindow.document,
						h = idoc.location.hash.replace("#", '');
					reloadContent(h);
				}, 100);
			};
	} else { 
		return function(){
			if( !$defined(ScriptDoLoad.history) ) { ScriptDoLoad.history = true; }
			setInterval(function() {
				var h = location.hash.replace("#", '');
				reloadContent(h);					
			}, 100);
		};
	}
})();

function displayLightbox(tpl_Lighbox){
	var $overlay = jQuery('<div/>').addClass('b-lightbox__overlay').hide().css("opacity", 0.6).prependTo("body");
	var $lightbox = jQuery('<div/>').attr('id', "login-failed__lightbox").addClass('b-lightbox g-fixed-center').hide().html(tpl_Lighbox).prependTo("body");
	$lightbox
			.find("a.lightbox-control")
			.one("click", function(e){
				$lightbox.trigger('onBeforeClose').fadeOut(function(){
					$overlay.fadeOut(function(){
						$overlay.remove();
						$lightbox.remove();
						$lightbox = $overlay = null;
					});
				});
				return false;
			})
		;
	$overlay.fadeIn();
	$lightbox.fadeIn();
};

function displayCoupon(tpl_Lighbox){
		var $overlay = jQuery('<div/>').addClass('b-lightbox__overlay').hide().css("opacity", 0.6).prependTo("body");
		var $lightbox = jQuery('<div/>').attr('id', "coupon").addClass('coupon_box').hide().html(tpl_Lighbox).prependTo("body");
		$lightbox
				.find("a.lightbox-control")
				.one("click", function(e){
					$lightbox.trigger('onBeforeClose').fadeOut(function(){
						$overlay.fadeOut(function(){
							$overlay.remove();
							$lightbox.remove();
							$lightbox = $overlay = null;
						});
					});
					return false;
				})
			;
		$overlay.fadeIn();
		$lightbox.fadeIn();
	};

function printDocument(documentId) {
    //Wait until PDF is ready to print    
    if (typeof document.getElementById(documentId).print == 'undefined') {
        setTimeout(function(){printDocument(documentId);}, 1000);
    } else {
        var x = document.getElementById(documentId);
        x.print();
    }
}

function getPage(params, callback){
	if (!callback) {
		console.log('Callback must be identified...');
		return false;
	}
	
	$j.ajax({
		url: "/tools/getpage.php",
		data: params,
		context: document.body
	}).done(function(data) {
		callback.call(this, data);
	});
}

function simplePost(url, method, data, callback){
	if ( callback === false ) { callback = function(){return false;}; }
	if ( method === false ) { method = "post" }
	
	jQuery.ajax({
		type: method,
		data: data,
		url: url,
		success: function(html, status){
			callback(html);
		},
	});	
}

function array_unique(inputArr) {
	var key = '',
    tmp_arr2 = [],
    val = '';

  var __array_search = function (needle, haystack) {
    var fkey = '';
    for (fkey in haystack) {
      if (haystack.hasOwnProperty(fkey)) {
        if ((haystack[fkey] + '') === (needle + '')) {
          return fkey;
        }
      }
    }
    return false;
  };

  for (key in inputArr) {
    if (inputArr.hasOwnProperty(key)) {
      val = inputArr[key];
      if (false === __array_search(val, tmp_arr2)) {
        tmp_arr2.push(val);
      }
    }
  }

  return tmp_arr2;
}

function array_remove(inputArr, value) {
	var unique_array = array_unique(inputArr);
	var result = [];
	
	for (i in unique_array) {
		var element = unique_array[i];
		
		if (element != value) {
			result.push(element);
		}
	}
	
	return result;
}

function runOnKeys(func) {
  var codes = [].slice.call(arguments, 1);

  var pressed = {};

  document.onkeydown = function(e) {
    e = e || window.event;

    pressed[e.keyCode] = true;
    
    for(var i=0; i<codes.length; i++) {
      if (!pressed[codes[i]]) {
        return;
      }
    }

    pressed = {};
    func();

  };

  document.onkeyup = function(e) {
    e = e || window.event;

    delete pressed[e.keyCode];
  };
}

function runOnKey(func) {
	var code = [].slice.call(arguments, 1);
	
	document.onkeyup = function(e) {
		e = e || window.event;
		
		console.log(e.keyCode);
		
		if (e.keyCode == code[0]) {
			func();
			return;
		}
	};
}

function in_array(needle, haystack, strict) {
    var found = false, key, strict = !!strict;
 
    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            found = true;
            break;
        }
    }
 
    return found;
}

function array_sum (array) {
	var key, sum=0;

	// input sanitation
	if( !array || (array.constructor !== Array && array.constructor !== Object) || !array.length ){
		return null;
	}

	for(var key in array){
		sum += array[key];
	}

	return sum;
}

function array_intersect_key(arr1) {
	  var retArr = {},
	    argl = arguments.length,
	    arglm1 = argl - 1,
	    k1 = '',
	    arr = {},
	    i = 0,
	    k = '';

	  arr1keys: for (k1 in arr1) {
	    arrs: for (i = 1; i < argl; i++) {
	      arr = arguments[i];
	      for (k in arr) {
	        if (k === k1) {
	          if (i === arglm1) {
	            retArr[k1] = arr1[k1];
	          }
	          // If the innermost loop always leads at least once to an equal value, continue the loop until done
	          continue arrs;
	        }
	      }
	      // If it reaches here, it wasn't found in at least one array, so try next value
	      continue arr1keys;
	    }
	  }

	  return retArr;
}

function array_filter(arr, func) {
	  var retObj = {}, k;

	  func = func || function (v) {
	    return v > 0;
	  };

	  // Fix: Issue #73
	  if (Object.prototype.toString.call(arr) === '[object Array]') {
	    retObj = [];
	  }

	  for (k in arr) {
		var result = func(arr[k]);
		
	    if (result == true) {
	    	retObj[k] = (arr[k]);
	    }
	  }

	  return retObj;
}

function count_parameters(obj){
    var count = 0;
    
    for(var prs in obj)  { 
        count++;
    } 
    
    return count; 
}

function toJSON(obj){
	var json = '({';
	jQuery.each(obj, function(k,v){
		
	var q = typeof v == 'string' ? ~v.indexOf("'") ? '"' : "'" : '';
		if (typeof v == 'object')
			v = toJSON(v).slice(0,-1).substr(1);
		
		json+= k + ':'+ q + v + q + ',';
	});
	
	return json.slice(0,-1)+'})';
}

function serialize( mixed_val ) {    // Generates a storable representation of a value
    // 
    // +   original by: Ates Goral (http://magnetiq.com)
    // +   adapted for IE: Ilia Kantor (http://javascript.ru)
 
    switch (typeof(mixed_val)){
        case "number":
            if (isNaN(mixed_val) || !isFinite(mixed_val)){
                return false;
            } else{
                return (Math.floor(mixed_val) == mixed_val ? "i" : "d") + ":" + mixed_val + ";";
            }
        case "string":
            return "s:" + mixed_val.length + ":\"" + mixed_val + "\";";
        case "boolean":
            return "b:" + (mixed_val ? "1" : "0") + ";";
        case "object":
            if (mixed_val == null) {
                return "N;";
            } else if (mixed_val instanceof Array) {
                var idxobj = { idx: -1 };
		var map = []
		for(var i=0; i<mixed_val.length;i++) {
			idxobj.idx++;
                        var ser = serialize(mixed_val[i]);
 
			if (ser) {
                        	map.push(serialize(idxobj.idx) + ser)
			}
		}                                       

                return "a:" + mixed_val.length + ":{" + map.join("") + "}"

            }
            else {
                var class_name = get_class(mixed_val);
 
                if (class_name == undefined){
                    return false;
                }
 
                var props = new Array();
                for (var prop in mixed_val) {
                    var ser = serialize(mixed_val[prop]);
 
                    if (ser) {
                        props.push(serialize(prop) + ser);
                    }
                }
                return "O:" + class_name.length + ":\"" + class_name + "\":" + props.length + ":{" + props.join("") + "}";
            }
        case "undefined":
            return "N;";
    }
 
    return false;
}

function array_chunk (input, size, preserve_keys) {
    var x, p = '', i = 0, c = -1, l = input.length || 0, n = [];

    if (size < 1) {
        return null;
    }

    if (Object.prototype.toString.call(input) === '[object Array]') {
        if (preserve_keys) {
            while (i < l) {
                (x = i % size) ? n[c][i] = input[i] : n[++c] = {}, n[c][i] = input[i];
                i++;
            }
        } else {
            while (i < l) {
                (x = i % size) ? n[c][x] = input[i] : n[++c] = [input[i]];
                i++;
            }
        }
    } else {
        if (preserve_keys) {
            for (p in input) {
                if (input.hasOwnProperty(p)) {
                    (x = i % size) ? n[c][p] = input[p] : n[++c] = {}, n[c][p] = input[p];
                    i++;
                }
            }
        }  else {
            for (p in input) {
                if (input.hasOwnProperty(p)) {
                    (x = i % size) ? n[c][x] = input[p] : n[++c] = [input[p]];
                    i++;
                }
            }
        }
    }
    return n;
}

function array_keys(input, search_value, argStrict) {
	var search = typeof search_value !== 'undefined',
	tmp_arr = [],
	strict = !! argStrict,
	include = true,
	key = '';

  if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
	return input.keys(search_value, argStrict);
  }

  for (key in input) {
	if (input.hasOwnProperty(key)) {
	  include = true;
	  if (search) {
		if (strict && input[key] !== search_value) {
		  include = false;
		} else if (input[key] != search_value) {
		  include = false;
		}
	  }

	  if (include) {
		tmp_arr[tmp_arr.length] = key;
	  }
	}
  }

  return tmp_arr;
}