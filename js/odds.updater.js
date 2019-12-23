var OddsUpdater = function(o) {
	var reload_time = o.reload_time || 10000;
	var timestamp 	= o.current_timestamp;
	var enable_use_jsonp 	= o.enable_use_jsonp;
	var server 	= o.odds_update_server;
	var betCart 	= $j('#betcard');
	var parent_container 	= o.parent_container;
	var monitor_page_number 	= o.monitor_page_number;
	var disable_update_activity_by_default_reload = o.disable_update_activity_by_default_reload;
    var check_disable_markets = o.check_disable_markets;
	
	var event_ids_container 		= ".updated_event_ids";
	var always_update 					= o.always_update;
	
	var is_live_page = o.is_live_page;
	var is_live_single_page = o.is_live_single_page;
	
	var queue = [];
	
	var disable_show_effect = o.disable_show_effect;
	var options = {
		'show_effect': 'easeOutQuad',
	};
	
	var change_odds_classes = {
		'up': 'up_odd',
		'down': 'down_odd',
	};
	
	var monitor = o.monitor;
	
	var init = function() {
		var page_timestamp = $j.cookie('page_update_timestamp_' + monitor_page_number);
		
		if (page_timestamp) {
			timestamp = page_timestamp;
		}
		
		getUpdatesByInterval();
	};
	
	function getUpdatesByInterval() {
		var timer_updates = setInterval(function() {
			getUpdates();
		}, reload_time);
		
		getUpdates();
	}
	
	function updatesResponse(response) {
		clean();
		
		if (!response) {return;}
		
		o.betCart 	= $j('#betcard');
		
		if (!isValidResponse(response)) {
			return;
		}
		
		response = $j.parseJSON(response);
		
		timestamp = response.timestamp;
		
		if (typeof(monitor_page_number) != 'undefined') {
			$j.cookie('page_update_timestamp_' + monitor_page_number, response.timestamp);
		}
		
		processUpdateOdds(response.changed_odds);
		processCloseMarkets(response.closed_markets);
		processReplaceOutcomes(response.replaced_outcomes);
		processOpenMarkets(response.opened_markets);
		processUpdateScores(response.current_scores);

        if (check_disable_markets == '1') {
            processCloseEvents(response.closed_events);
            processOpenEvents(response.opened_events);
        }
	}
	
	function getEventIds() {
		var ids = [];
		var event_ids = "";
		var event_id_array = [];

		if (is_live_page && !is_live_single_page) {
			event_ids = $j(event_ids_container).val() || "";
			
			if (event_ids) {
				event_id_array = event_ids.split(',');
			}
		} else if (always_update) {
			$j("#main_content [data-event_id]").each(function(index, element){
				var event_id = $j(element).attr('data-event_id');
				event_id_array.push(event_id);
			});	
			
			/*event_ids = unique(ids).join(',') || "";*/
		}
		
		return unique(event_id_array);
	}
	
	function unique(arr) {
		var obj = {};
		for(var i=0; i<arr.length; i++) {
			var str = arr[i];
			obj[str] = true;
		}
		
		var keys = [];
		for(var key in obj) keys.push(key);

		return keys;
	}

	function getUpdates() {
		var short_url_node = true;
		
		var event_ids = getEventIds();
		
		// Fix multi event ids
		if (event_ids.length !== 1 || !o.is_live_page) {
			var event_ids = null;
		}
		
		var betcart_outcomes = $j.cookie('saved_oids') ? $j.cookie('saved_oids').split('_') : null;
		
		if (o.enabling_selector && !$j(o.enabling_selector).val()) {
			console.log('Skip getting updates');
			return;
		}
		
		if (!event_ids && !betcart_outcomes) {
			/*console.log('Skip getting odds (empty events and empty betcart)');*/
			return;
		}
		
		var url = "getdata.php?sec=odds_control&subsec=get_updates&timestamp=" + timestamp + '&event_ids=' + event_ids;
		var short_url = "/oddsupdater/" + timestamp + "/";
		
		if (disable_update_activity_by_default_reload) {
			url += "&disable_update_activity=1";
			short_url += "1/";
        } else {
        	short_url += "0/";
        }
		
		if (event_ids) {
			short_url += event_ids + "/";
		} else {
			short_url += "0/";
		}
		
        if (check_disable_markets == '1') {
            url +="&check_disable_markets=1";
            short_url += "1/";
        } else {
        	short_url += "0/";
        }
        
        
        if (is_live_single_page == '1' && is_live_page == '1') {
        	url +="&is_live_single_page=1";
        	short_url += "1/";
        } else {
        	short_url += "0/";
        }
        
        if (short_url_node) {
        	url = short_url;
        }
		if (enable_use_jsonp) {
			ScriptDedicatedJson(o.server + "/" + url, function(response) {
				updatesResponse(response);
			});
		} else {
			ScriptDoLoad(url, "garbage", 1, 1, updatesResponse);
		}
	}
	
	// function clean all needed items after getting updates 
	function clean() {
		$j('a, b, span, div, td').removeClass(change_odds_classes.down).removeClass(change_odds_classes.up);
		$j('b').attr('style', '');
	}
	
	//main functions
	function processUpdateOdds(changes_odds) {
		var change_classes = {'up_odd': [], 'down_odd': []}, up_odds = [], down_odds = [];
		
		for (outcome_id in changes_odds) {
			var $outcome = $j('#\\:'+outcome_id),
				changes_odds_item = changes_odds[outcome_id]
			;

			var new_odds_converted = changes_odds_item.odd_format == 'US' ? changes_odds_item.new_odds_converted : parseFloat(changes_odds_item.new_odds_converted).toFixed(2);
			updateBetcartOutcome(outcome_id, new_odds_converted);
			
			if (0 == $outcome.length) {
				continue;
			}
			
			
			if (!parseFloat(new_odds_converted)) {
				$outcome.remove();
			}
			
			var $odds_value = $outcome.find('.odds_value');
			
			
			if (!$odds_value.length) {
				continue;
			}
			
			$odds_value.html(new_odds_converted);
			
			var old_rev = $outcome.attr("rev");
			
			if (old_rev) {
				var new_rev = old_rev.replace(/{"odds":.+?,/, '{"odds":'+changes_odds_item.new_odds+',');
				$outcome.attr("rev", new_rev);
			}
			
			// class
			if (changes_odds_item.previous_odds) {
				var $object = $outcome;
				
				if (parent_container) {
					$object = $object.parent();
				}
				
				var $object_class = getUpDownClass(changes_odds_item.previous_odds, changes_odds_item.new_odds);
				
				change_classes[$object_class].push($object.get(0));
			}
		}
	
		for (class_name in change_classes) {
			if (!change_classes[class_name].length) {
				continue;
			}
			
			var classes_collection = change_classes[class_name];
			
			$j(classes_collection).addClass(class_name);
		}
	}
	
	function processCloseMarkets(closed_markets) {
		for (i in closed_markets) {
			var market_id = closed_markets[i];
			
			disableMarketsInBetcart(market_id);
			disableMarketInPage(market_id);
			
			refreshBetcartValues();
		}
	}
	
	function processReplaceOutcomes(replaced_outcomes) {
		var changed = false;
		
		for (i in replaced_outcomes) {
			var outcome = replaced_outcomes[i];
			var json = $j.parseJSON(outcome);
			
			var $area = $j('.oid' + i);
			
			if (!$area || !json) {
				continue;
			}
			
			$area.find('.betcart-pane-event-coeff').html(json.odds).addClass('autoupdated_parameter');
			$area.find('.betcart-pane-event-pick').html(json.beton + " <strong class='autoupdated_parameter'>" + json.beton_val + "</strong>");
			
			// hidden post vars
			$area.find('.betcart-pane-event-data .data-oid').val(json.oid);
			$area.find('.betcart-pane-event-data .data-odds').val(json.odds);
			$area.removeClass('event-disabled');

			$area.removeClass('oid' + i).addClass('oid' + json.oid);
			
			changed = true;
		}
		
		
		if (changed) {
			// show exception about change odds
			applyError();
		}
		
		refreshBetcartValues();
	}
	
	function processOpenMarkets(opened_markets) {
		for (i in opened_markets) {
			var market_id  = opened_markets[i];
			var $area = $j('.market_id' + market_id);
			
			if (!$area) {
				continue;
			}
			
			$area
				.removeClass('event-disabled')
				.removeClass('market_disabled')
				.removeClass('pointer_events')
			;
				
		}
		
		return false;
	}
	
	function processUpdateScores(scores) {
		if (monitor) {
			$j('.update_score').removeClass('update_score');
		}
		
		for (event_id in scores) {
			var score = scores[event_id].result_score;
			if (!score) {
				continue;
			}
			
//			$j('.mid' + event_id).find('.betcart-pane-event-name b').html(score);
			o.betCart.find('.mid' + event_id).find('.betcart-pane-event-name b').html(score);
			
			if (!monitor) {
				continue;
			}
			
			var score_obj = $j('body').find('span.event_score_' + event_id);
			
            var prev_score = score_obj.html();
            if (prev_score != score) {
            	score_obj.html(score).addClass('update_score');
            }
		}
	}

    function processCloseEvents(closed_events) {
        for (i in closed_events) {
            var event_id = closed_events[i];
            disableEventInPage(event_id);
        }
    }

    function disableEventInPage(event_id) {
        //monitor live page
        $j('.event_id'+event_id+'')
            .addClass('event_disabled')
        ;
    }

    function processOpenEvents(opened_events) {
        for (i in opened_events) {
            var event_id  = opened_events[i];
            var $area = $j('.event_id' + event_id);

            if (!$area) {
                continue;
            }

            $area
                .removeClass('event_disabled')
            ;

        }

        return false;
    }
	
	//additional functions
	function updateBetcartOutcome(outcome_id, odds_value) {
		var $alert = [];
		
		if (!betCart) {
			var betCart 	= $j('#betcard');
		}
		
		var changed = false;
		
		betCart.find('.oid' + outcome_id).each(function(j) {
			var $old_odds = parseFloat($j(this).find('.betcart-pane-event-coeff').html());
			$j(this).find('.betcart-pane-event-coeff').html(odds_value).addClass('autoupdated_parameter');
			$j(this).find('.data-odds').val(odds_value);
			
			changed = true;
			
			if (o.alert_changes && $old_odds != odds_value && !in_array(outcome_id, $alert)) {
				alert("Odds changed from " + $old_odds + " to " + odds_value);
				$alert.push(outcome_id);
			}
		});
		
		if (changed) {
			// show exception about change odds
			applyError();
		}
	}
	
	function disableMarketsInBetcart(market_id) {
		$j('#betcard').find('.market_id' + market_id).each(function() {
			$j(this).addClass('event-disabled');
			applyError();
		})
	}
	
	function disableMarketInPage(market_id) {
		//single live page
		$j('#main_content a.market_id'+market_id+'')
			.addClass('market_disabled')
			.addClass('pointer_events')
		;
		
		//single live page
		$j('.live_table a.market_id'+market_id+'')
			.addClass('market_disabled')
			.addClass('pointer_events')
		;
		
		// simple live page
		$j('.events_contein a.market_id'+market_id+'')
			.addClass('market_disabled')
			.addClass('pointer_events')
		;
		
		// asian
		$j('.asian_live a.market_id'+market_id+'')
			.addClass('market_disabled')
			.addClass('pointer_events')
		;
	}
	
	function refreshBetcartValues() {
		
	}
	
	function replaceBetcartValues() {
		//todo
	}
	
	function getUpDownClass(previous_value, new_value) {
		var previous_value 	= parseFloat(previous_value);
		var new_value 		= parseFloat(new_value);
		
		if (previous_value > new_value) {
			//down
			return change_odds_classes.down; 
		} else if (previous_value < new_value) {
			//up
			return change_odds_classes.up;
		} else {
			return '';
		}
	}

	function isValidResponse(response) {
		if (!response) {
			return false;
		}
		
		return response[0] == '{';
	}
	
	function applyError(message) {
		if (!message) {
			var message = _('Odds were changed or some of your markets are currently not available.');
		}
		
		var translated = _(message);
		if (!translated) {
			translated = message;
		}
		
		$j('#betcart_html_error').html(translated).attr('rev', message).click();
	}
	
    new init();
	
    this.forceGetUpdates = function() {
        getUpdates();
    }

    return this;
}