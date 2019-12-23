var date 			= new Date();
date.setTime(date.getTime() + (720 * 60 * 1000));
var cookie_title 	= 'saved_oids';
var separator 		= '_';

/**
 * Function toggle saving outcomes 
 */
function saveOids(oid, is_lay) {
	if (!is_lay) {
		is_lay = false;
	}
	
	var saved_oids 			= jQuery.cookie(cookie_title);
	var saved_oids_exist 	= false;
	var oid_already_exist 	= false;
	var new_data 			= [];
	var new_data_ex 		= [];
	
	if (saved_oids) {
		exist_data = saved_oids.split(separator);
		for (i in exist_data) {
			var intValue = parseInt(exist_data[i]);
			if (isNaN(intValue)) {
				continue;
			}
			if (intValue !== oid) {
				new_data.push(intValue);
			} else {
				oid_already_exist = true;
			}
		}
		
		if (!oid_already_exist) {
			new_data.push(oid);
		}
	} else {
		new_data.push(oid);
	}
	
	jQuery.cookie(cookie_title, new_data.join(separator), { expires: date, path: '/' });
}

function deleteOids(oid) {
	var all_data_string = jQuery.cookie(cookie_title);
	if (!all_data_string) {
		return false;
	}
	
	var all_data = all_data_string.split(separator);
	var new_data = [];
	
	if (!all_data) {
		return;
	}
	
	for (var data_item in all_data) {
		var element = all_data[data_item];
		var intValue = parseInt(element);
		
		if (!element || isNaN(intValue)) {
			continue;
		}
		
		if (element && element != oid) {
			new_data.push(element);
		}
	}
	
	var count = 0;
	var document_data = jQuery(document).data( "outcomes" );
	if (document_data) {
		for (i in document_data) {
			if (document_data[i] == oid) {
				delete (document_data[i]);
			} else {
				count++;
			}
		}
		jQuery(document).data( "outcomes", document_data );
		
		if (!count) {
			jQuery('.tab-nav-item').removeClass('ui-state-active');
			jQuery('#tab-nav-item-single').addClass('ui-state-active');
			jQuery.cookie('selected_bet_type', 'single', { expires: date, path: '/' });
			jQuery.cookie(cookie_title, null, { expires: date, path: '/' });
			jQuery.cookie('oids', null, { expires: date, path: '/' });
		}
		
		if (count == 1) {
			restoreTabs();
		}
	}
	
	jQuery("a[id=':"+oid+"']").toggleClass('selected'); //delete selected class
	jQuery.cookie(cookie_title, new_data.join(separator), { expires: date, path: '/' }); //save in cookie
}

/**
 * Function restore tabs, make active only first tab
 */
function restoreTabs() {
	jQuery.cookie('selected_bet_type', 'single', { expires: date, path: '/' });
	return;
}

/**
 * Function delete outcome from cookie 
 */
function deleteFromCookie(oid) {
	deleteOids(oid);
}

/**
 * Function delete outcome from cookie 
 */
function deleteFromCookieByEvent(mid) {
	return;
}

/**
 * Function add outcome from cookie 
 */
function addToCookie(oid, is_lay) {
	if (!is_lay) {
		is_lay = false;
	}
	
	var intValue = parseInt(oid);
	if (isNaN(intValue)) {
		return false;
	}
	
	saveOids(oid, is_lay);
}

/**
 * Function save current selected tab
 */
function saveTab(tab) {
	var isDisabled = jQuery('#tab-nav-item-' + tab).hasClass('ui-state-disabled');
	if (isDisabled) {
		return false;
	}
	
	jQuery.cookie('selected_bet_type', tab, { expires: date, path: '/' });
}

/**
 * Function save current selected stake 
 */
function saveStake(tab_element, specify_single) {
	var stake 		= jQuery(tab_element).val();
	var id_panel 	= jQuery(tab_element).parent().parent().parent().parent().attr('id');
	var oid 		= jQuery(tab_element).parent().parent().attr('class').replace(/.*\boid(\d+)\b.*/, '$1');
	var tab 		= id_panel.replace(/(\S+)-pane/, '$1');
	
	if (!tab) {
		return false;
	}

	if (tab == 'single' && specify_single) {
		var saved_oids_amount = jQuery.cookie('saved_oids_amount');
		var new_saved_oids_amount = [];
		var value = oid + "=" + stake;
		
		if (saved_oids_amount) {
			var saved_oids_amount_array = saved_oids_amount.split(',');
		} else {
			var saved_oids_amount_array = [];
		}
		for (i in saved_oids_amount_array) {
			var element = saved_oids_amount_array[i];
			var element_array = element.split('=');
			if (element_array[0] !== oid) {
				new_saved_oids_amount.push(element);
			}
		}
		
		new_saved_oids_amount.push(value);
		jQuery.cookie('saved_oids_amount', new_saved_oids_amount.join(','), { expires: date, path: '/' });
	} else {
		jQuery.cookie('default_stake_' + tab, stake, { expires: date, path: '/' });
	}
}

/**
 * Function clear all outcomes 
 */
function clearAll() {
	date.setTime(date.getTime() + (720 * 60 * 1000));
	jQuery.cookie(cookie_title, '', { expires: date, path: '/' });
	jQuery.cookie('selected_bet_type', '', { expires: date, path: '/' });
	jQuery.cookie('default_stake_roundrobin', '', { expires: date, path: '/' });
	jQuery.cookie('default_stake_combined', '', { expires: date, path: '/' });
	jQuery.cookie('selected_bet_system', '', { expires: date, path: '/' });
	jQuery.cookie('saved_oids_amount', '', { expires: date, path: '/' });
}

function saveCheckbox(object) {
	var id = jQuery(object).attr('id');
	if (!id) {
		return;
	}
	
	jQuery(object).toggleClass('betcart-pane-checkbox-item-active');
	
	var new_value = jQuery(object).hasClass('betcart-pane-checkbox-item-active') ? 1 : 0;
	jQuery.cookie(id, new_value, { expires: date, path: '/' });
}