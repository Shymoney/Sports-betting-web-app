function saveOids(oid) {
	var date = new Date();
	date.setTime(date.getTime() + (720 * 60 * 1000));
	
	var cookies = document.cookie.split(';');
	var spaces_regex = /\s/g;
	var saved_oids_exist = false;
	
	for (var item in cookies) {
		var cookie_data = cookies[item].split('=');
		var cookie_title = cookie_data[0].replace(spaces_regex, "");
		
		if (cookie_title == 'saved_oids') {
			saved_oids_exist = true;
			
			if (!cookie_data) {
				var new_data = [];
			} else {
				var new_data = cookie_data[1].split('_');
			}
			new_data.push(oid);
			
			jQuery.cookie(cookie_title, new_data.join('_'), { expires: date, path: '/' });
		}
	}
	
	if (!saved_oids_exist) {
		var new_data = [];
		new_data.push(oid);
		
		jQuery.cookie('saved_oids', new_data.join('_'), { expires: date, path: '/' });
	}
	
}

function deleteOids(oid) {
	var date = new Date();
	date.setTime(date.getTime() + (720 * 60 * 1000));
	
	var cookies = document.cookie.split(';');
	var spaces_regex = /\s/g;

	for (var item in cookies) {
		var cookie_data = cookies[item].split('=');
		var cookie_title = cookie_data[0].replace(spaces_regex, "");
		
		if (cookie_title == 'saved_oids') {
			if (!cookie_data) {
				return false;
			}
			
			var all_data = cookie_data[1].split('_');
			
			var new_data = [];
			
			for (var data_item in all_data) {
				var element = all_data[data_item];
				if (!element) {
					continue;
				}
				
				if (element && element != oid) {
					new_data.push(element);
				}
			}
			
			jQuery.cookie(cookie_title, new_data.join('_'), { expires: date, path: '/' });
		}
	}
}

function deleteFromCookie(oid) {
	deleteOids(oid);
}

function addToCookie(oid) {
	saveOids(oid);
}