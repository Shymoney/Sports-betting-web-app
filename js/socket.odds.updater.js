var SocketOddsUpdater = function(o) {
    var host                    = o.host;
    var port                    = o.port;
    var url                     = 'http://' + host + ':' + port;

    var parent_container 	    = o.parent_container;
    var check_disable_markets   = o.check_disable_markets;
    var event_ids_container 	= ".updated_event_ids";
    var always_update 			= o.always_update;
    var is_live_page            = o.is_live_page == "1";
    var is_live_single_page     = o.is_live_single_page == "1";
    var is_schedule_page        = o.is_schedule_page == "1";
    var sportsbook_mode         = o.sportsbook_mode;
    var marginLevel             = o.margin_level;
    var oddsFormat              = o.odds_format;
    var monitor = o.monitor;
    var change_odds_classes     = {
        'up': 'up_odd',
        'down': 'down_odd'
    };
    var current_events_ids;
    var current_events_info_ids;
    var clearIntervalId;

    var init = function() {
        var socket = io(url);

        socket.on('update', function(data){
            updatesResponse(data);
        });

        current_events_ids = getAllEventsIds();
        current_events_info_ids = (is_live_page || is_schedule_page) ? [] : getEventsInfoIds() ;

        var data = {
            "events"                : current_events_ids,
            "events_info"           : current_events_info_ids,
            "is_live_single_page"   : is_live_single_page && is_live_page ? 1 : 0,
            "is_live_page"          : (is_live_page || is_schedule_page) ? 1 : 0,
            "margin"                : "lev" + marginLevel
        };
        socket.on("connect", function() {
            socket.emit('subscribe', data);
        });

        setInterval(function() {
            var events_ids = getAllEventsIds();
            var subscribe = false;
            var data = {};

            if (events_ids.toString() != current_events_ids.toString()) {
                subscribe = true;
                current_events_ids = events_ids;
                data["events"] = current_events_ids;
            }

            if (!is_live_page && !is_schedule_page) {
                var events_info_ids = getEventsInfoIds();

                if (events_info_ids.toString() != current_events_info_ids.toString()) {
                    subscribe = true;
                    current_events_info_ids = events_info_ids;
                    data["events_info"] = current_events_info_ids;
                }
            }

            if (subscribe) {
                socket.emit('subscribe', data);
            }

        }, 1000);

    };

    function updatesResponse(response) {
        clean();

        if (!response) {return;}

        o.betCart 	= $j('#betcard');

        processUpdateOdds(response.changed_odds);
        processCloseMarkets(response.closed_markets);
        processReplaceOutcomes(response.replaced_outcomes);
        processOpenMarkets(response.opened_markets);
        //processUpdateScores(response.current_scores);
        processUpdateEventInfo(response.changed_events_info);

        if (check_disable_markets == '1') {
            processCloseEvents(response.closed_events);
            processOpenEvents(response.opened_events);
        }

        closeEvents(response.closed_events);
        openEvents(response.opened_events);
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

    // function clean all needed items after getting updates
    function clean() {
        $j('a, b, span, div, td').removeClass(change_odds_classes.down).removeClass(change_odds_classes.up);
        $j('b').attr('style', '');
    }

    //main functions
    function processUpdateOdds(changes_odds) {
        var change_classes = {'up_odd': [], 'down_odd': []}, up_odds = [], down_odds = [];
        clearInterval(clearIntervalId);

        for (outcome_id in changes_odds) {
            var $outcome = $j('#\\:'+outcome_id),
                changes_odds_item = changes_odds[outcome_id]
                ;

            var new_odds_converted = changes_odds_item.new_odds_converted[oddsFormat];
            new_odds_converted = oddsFormat == 'US' ? new_odds_converted : parseFloat(new_odds_converted).toFixed(2);

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
                if ($object.hasClass('event_close') || $object.hasClass('market_disabled')) {
                    continue;
                }

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

        clearIntervalId = setInterval(function() {
            clean();
            clearInterval(clearIntervalId);
        }, 3000);
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

    function getBetCartEventsIds() {
        if (!betCart) {
            var betCart 	= $j('#betcard');
        }
        var betCartEventsIds = [];
        var single = betCart.find("#single-pane-events");

        single.find(".betcart-pane-event").each(function() {
            var element = $j(this);
            var raw_events = element.attr('class').match(/mid([0-9]+)\s/);
            if (1 in raw_events) {
                betCartEventsIds.push(raw_events[1]);
            }
        });

        return unique(betCartEventsIds);
    }

    function getAllEventsIds() {
        var allEventsIds = [];

        var eventsIds = []
        if (sportsbook_mode == "asian" || (sportsbook_mode == "cis" && !(is_live_single_page && is_live_page))) {
            eventsIds = getEventsIdsByRev();
        } else {
            eventsIds = getEventIds();
        }
        var betCartEventsIds = getBetCartEventsIds();

        for (var idEventsIds in eventsIds) {
            allEventsIds.push(eventsIds[idEventsIds])
        }

        for (var idBetCartEventsIds in betCartEventsIds) {
            allEventsIds.push(betCartEventsIds[idBetCartEventsIds])
        }

        return unique(allEventsIds);
    }

    function getEventsIdsByRev() {
        var eventsIds = [];
        var objects = $j("a[rev]");

        objects.each(function() {
            var element = $j(this);
            var outcome_info = element.attr("rev");

            if (!outcome_info) {
                return;
            }

            if (!isCorrectStringJson(outcome_info)) {
               return;
            }

            outcome_info = JSON.parse(outcome_info);

            if ("mid" in outcome_info) {
                var eventId = outcome_info["mid"];
                eventsIds.push(eventId);
            }
        });

        eventsIds = unique(eventsIds);

        return eventsIds;
    }

    function isCorrectStringJson(stringJson) {
        if (stringJson.match(/^{/) && stringJson.match(/}$/)) {
            return true;
        }

        return false;
    }

    function getEventsInfoIds() {
        var eventsInfoIds = [];
        // todo: rewrite it
        $j("#live_events_rightcol td, #live_events_rightcol span, #betcard b").each(function() {
            var e = $j(this);
            var data = e.data();
            for (var event_id in data) {
                if (event_id == 'event-info-id') {
                    continue;
                }
                eventsInfoIds.push(event_id);
            }
        });

        $j("[data-event-info-id]").each(function() {
            var e = $j(this);
            var event_id = e.data('event-info-id');
            eventsInfoIds.push(event_id);
        });

        return unique(eventsInfoIds);
    }

    function processUpdateEventInfo(eventsInfo) {
        for (var idEv in eventsInfo) {
            var dataAttr = 'data-' + idEv;
            var eventInfoElement = $j("[" + dataAttr + "]");

            eventInfoElement.each(function() {
                var e = $j(this);
                var dataType = e.attr(dataAttr);
                var data = dataType.split("-");

                if (data.length <= 0) {
                    return;
                }

                if (data[0] == "score" && "scores" in eventsInfo[idEv]) {
                    var score = '';

                    if (data.length == 1 && "run" in eventsInfo[idEv]["scores"]) {
                        score = eventsInfo[idEv]["scores"]["run"]["home"] + ":" + eventsInfo[idEv]["scores"]["run"]["away"];
                    }

                    if (data.length == 2 && data[1] in eventsInfo[idEv]["scores"]) {
                        score = eventsInfo[idEv]["scores"][data[1]]["home"] + ":" + eventsInfo[idEv]["scores"][data[1]]["away"];
                    }

                    if (data.length == 3 && data[1] in eventsInfo[idEv]["scores"]) {
                        score = eventsInfo[idEv]["scores"][data[1]][data[2]];
                    }

                    score.length > 0 && e.html(score);
                } else if (data[0] == "desc" && "description" in eventsInfo[idEv]) {
                    var description = '';

                    if (data.length == 1 && "status" in eventsInfo[idEv]["description"]) {
                        if ("minute" in eventsInfo[idEv]["description"]) {
                            description = eventsInfo[idEv]["description"]["minute"] + ', ';
                        }

                        description += _(eventsInfo[idEv]["description"]["status"]);
                    }

                    if (data.length == 2 && data[1] in eventsInfo[idEv]["description"]) {
                        description = _(eventsInfo[idEv]["description"][data[1]]);
                    }

                    description.length > 0 && e.html(description);
                }
            });
        }
    }

    function closeEvents(events) {
        for (var eventId in events) {
            $j(".event_id" + eventId).addClass('event_close');
        }

        closeEventsBetcart(events);
    }

    function closeEventsBetcart(events) {
        for (var eventId in events) {
            $j(".mid" + eventId).addClass('event_close_betcart');
        }
    }

    function openEvents(events) {
        for (var eventId in events) {
            $j(".event_id" + eventId).removeClass('event_close');
        }

        openEventsBetcart(events);
    }

    function openEventsBetcart(events) {
        for (var eventId in events) {
            $j(".mid" + eventId).removeClass('event_close_betcart');
        }
    }

    new init();

    return this;
};
