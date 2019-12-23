window.betCartTemplates = {
    betCart:
    '<div id="betcard-body" class="b-betcart">'+
    '<input type="hidden" class="is_stake_per_bet" value="1" />'+
    '{title}{betcart}'+
    '</div>',
    betCartTitle: [
        '<div class="b-title b-title__bg title_reg  my-bets_tabs selected">',
        '<div class="b-title_txt_box">',
        '<a href="/my_account/bets/" class="my_bets_link">'+_("My Bets")+'</a>',
        '<h1 class="bet_slip_txt"><span class="dec_txt betcard">'+_("Betting Slip")+'</span><span class="g-right my-bets">'+_("Cash Out")+ '</span></h1>',
        '</div>',
        '</div>'
    ].join(''),
    betCartNavAttr: 'id="tab-nav" class="betcart-head g-clearfix"',
    tabs:[
        {
            'nav':'<li id="tab-nav-item-{single}" class="{selected} tab-nav-item tab-nav-item-{index}"><a href="#{single}-pane" rel="{single}" onClick="javascript:saveTab(\'single\');"><span class="left_shadow"></span><span>'+_("Single")+'</span><span class="right_shadow"></span></a></li>',
            'pane':
            '<div id="{single}-pane" class="betcart-pane">'+
            '<div id="{single}-pane-events"></div>'+
            '<div class="betcart-pane-checkbox" id="default-pane-checkbox">'+
            '<div id="accept_high" class="additional-checkbox betcart-pane-checkbox-item accept-high {accept_high_selected}" onClick="saveCheckbox(this);">'+
            '<a href="javascript:void(0);"><span class="b-checkbox b-checkbox__c">&nbsp;</span> <span>'+_('Accept higher odds')+'</span> </a>' +
            '</div>'+
            '<div id="accept_any" class="additional-checkbox betcart-pane-checkbox-item accept-any {accept_any_selected}" onClick="saveCheckbox(this);">'+
            '<a href="javascript:void(0);"><span class="b-checkbox b-checkbox__c">&nbsp;</span> <span>'+_('Accept any odds')+'</span> </a>' +
            '</div>'+
            '</div>'+
            '<div class="betcart-pane-bottom">'+
            '<div id="{single}-pane-bottom" class="betcart-pane-bottom-inn">'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-count g-clearfix">'+
            '<span>'+_("Singles")+':</span><var></var>'+
            '</div>'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-stake betcart-pane-bottom-stake-single-total g-clearfix">'+
            '<span>'+_("Stake")+':</span><input type="text" value="" onKeyup="saveStake(jQuery(this));" />'+
            '</div>'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-total g-clearfix">'+
            '<span>'+_("Total stake")+':</span><var></var>'+
            '</div>'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-potential g-clearfix">'+
            '<span>'+_("Potential payout")+':</span><var></var>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div id="{single}-pane-button" class="betcart-pane-action g-clearfix">'+
            '<a href="javascript:;" class="b-button b-button_next g-stack betcart-pane-action-item betcart-pane-action-send"><b class="b-button__text g-stack">' + _('Next') + '</b></a>'+
            '<a href="javascript:;" onClick="clearAll();" class="b-button b-button_clear  b-button_change g-stack betcart-pane-action-item betcart-pane-action-clear"><b class="b-button__text">' + _('Clear All') + '</b></a>'+
            '<a href="javascript:;" class="b-button b-button_conf g-stack betcart-pane-action-item betcart-pane-action-confirm g-hidden"><b class="b-button__text g-stack">' + _('Confirm') + '</b></a>'+
            '<a href="javascript:;" class="b-button b-button_change g-stack betcart-pane-action-item betcart-pane-action-change g-hidden"><b class="b-button__text g-stack">' + _('Change Bets') + '</b></a>'+
            '</div>'+
            '</div>',
            'item':
            '<div class="betcart-pane-event mid{mid} event_id{mid} sport{sport} type{type} oid{oid} market_id{market_id} scope{scope} allowance{beton_val}">'+
            '<div class="betcart-pane-event-name"><div><span class="live_i outcome_id{oid} g-hidden">LIVE</span><span><b data-{mid}="score">{live_result}</b> {event}</span></div> <a href="javascript:void(0);" onClick="deleteFromCookie({oid})" class="betcart-pane-event-remove oid{oid}">&nbsp;</a></div>'+
            '<div class="betcart-pane-event-type"><b>{event_type}</b> <span class="scope_key">('+_('{scope_key}')+')</span></div>'+
            '<div class="betcart-pane-event-row g-clearfix"><span>'+_("Pick")+':</span><b class="betcart-pane-event-coeff">{coeff}</b><strong class="betcart-pane-event-pick">{event_pick}</strong> </div>'+
            '<div class="betcart-pane-event-stake g-clearfix g-hidden"><span>'+_("Stake")+':</span> <input class="single-amount-value" tabindex="10{index}" type="text" value="" onKeyup="saveStake(jQuery(this));" /></div>'+
            '<div class="betcart-pane-event-stake g-clearfix g-hidden-element{lay}"><span>'+_("Liability")+':</span> <strong class="betcart-pane-event-potential"><var></var></strong></div>'+
            '<div class="betcart-pane-event-data">'+
            '<input type="hidden" class="data-oid" value="{oid}" />'+
            '<input type="hidden" class="data-odds" value="{odds}" default="{odds}" />'+
            '<input type="hidden" class="data-buypoints" value="0" />'+
            '<input type="hidden" class="data-status" value="{event_status}" />'+
            '<input type="hidden" class="data-lay" value="{event_lay}" />'+
            '</div>'+
            '<script>if ("{event_status}" == "inprogress") {$j(".outcome_id{oid}").removeClass("g-hidden");} </script>'+
            '</div>',
            'minItems': 0
        },
        {
            'nav':'<li id="tab-nav-item-{combined}" class="{selected} tab-nav-item tab-nav-item-{index}"><a href="#{combined}-pane" rel="{combined}" onClick="javascript:saveTab(\'combined\');"><span class="left_shadow"></span><span>'+_("Combined")+'</span><span class="right_shadow"></span></a></li>',
            'pane':
            '<div id="{combined}-pane" class="betcart-pane">'+
            '<div id="{combined}-pane-events"></div>'+
            '<div class="betcart-pane-checkbox">'+
            '<div id="accept_high" class="additional-checkbox betcart-pane-checkbox-item accept-high {accept_high_selected}" onClick="saveCheckbox(this);">'+
            '<a href="javascript:void(0);"><span class="b-checkbox b-checkbox__c">&nbsp;</span> <span>'+_('Accept higher odds')+'</span> </a>' +
            '</div>'+
            '<div id="accept_any" class="additional-checkbox betcart-pane-checkbox-item accept-any {accept_any_selected}" onClick="saveCheckbox(this);">'+
            '<a href="javascript:void(0);"><span class="b-checkbox b-checkbox__c">&nbsp;</span> <span>'+_('Accept any odds')+'</span> </a>' +
            '</div>'+
            '</div>'+
            '<div class=" betcart-pane-bottom">'+
            '<div id="{combined}-pane-bottom" class="betcart-pane-bottom-inn">'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-total g-clearfix">'+
            '<span>'+_("Total odds")+':</span><var></var>'+
            '</div>'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-stake g-clearfix">'+
            '<span>'+_("Stake")+':</span><input type="hidden" value="0" /><var>0.00</var>'+
            '</div>'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-count g-clearfix">'+
            '<span>'+_("Number of picks")+':</span><var>0</var>'+
            '</div>'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-total-stake g-clearfix">'+
            '<span>'+_("Total stake")+':</span><input type="text" onKeyup="saveStake(jQuery(this));" value="">'+
            '</div>'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-bonus g-clearfix">'+
            '<span>'+_("Bonus")+':</span><var></var>'+
            '</div>'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-potential g-clearfix">'+
            '<span>'+_("Potential payout")+':</span><var></var>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div id="{combined}-pane-button" class="betcart-pane-action g-clearfix">'+
            '<a href="javascript:;" class="b-button b-button_next g-stack betcart-pane-action-item betcart-pane-action-send"><b class="b-button__text g-stack">' + _('Next') + '</b></a>'+
            '<a href="javascript:;" onClick="clearAll();" class="b-button b-button_clear b-button_change g-stack betcart-pane-action-item betcart-pane-action-clear"><b class="b-button__text">' + _('Clear All') + '</b></a>'+
            '<a href="javascript:;" class="b-button b-button_conf g-stack betcart-pane-action-item betcart-pane-action-confirm g-hidden"><b class="b-button__text g-stack">' + _('Confirm') + '</b></a>'+
            '<a href="javascript:;" class="b-button b-button_change g-stack betcart-pane-action-item betcart-pane-action-change g-hidden"><b class="b-button__text g-stack">' + _('Change Bets') + '</b></a>'+
            '</div>'+
            '</div>',
            'item':
            '<div class="betcart-pane-event mid{mid} event_id{mid} sport{sport} type{type} oid{oid} market_id{market_id} scope{scope} allowance{beton_val}">'+
            '<div class="betcart-pane-event-name">'+
            '<div><span class="live_i outcome_id{oid} g-hidden">LIVE</span><span><b data-{mid}="score">{live_result}</b> {event}</span></div>'+
            '<a href="javascript:void(0);" class="betcart-pane-all-event-remove oid{oid}mid{mid}"></a>'+
            '</div>'+
            '<div class="betcart-pane-event-type"><b>{event_type}</b> <span class="scope_key">('+_('{scope_key}')+')</span></div>'+
            '<div class="betcart-pane-event-row g-clearfix"><span>'+_("Pick")+':</span><b class="betcart-pane-event-coeff">{coeff}</b><strong class="betcart-pane-event-pick">{event_pick}</strong>'+
            '</div>'+
            '<div class="betcart-pane-event-data">'+
            '<input type="hidden" class="data-oid" value="{oid}" />'+
            '<input type="hidden" class="data-odds" value="{odds}" default="{odds}" />'+
            '<input type="hidden" class="data-buypoints" value="0" />'+
            '<input type="hidden" class="data-status" value="{event_status}" />'+
            '<input type="hidden" class="data-lay" value="{event_lay}" />'+
            '</div>'+
            '<a href="javascript:void(0);" onClick="deleteFromCookie({oid})" class="betcart-pane-event-remove oid{oid}">&nbsp;</a>'+
            '<script>if ("{event_status}" == "inprogress") {$j(".outcome_id{oid}").removeClass("g-hidden");} </script>'+
            '</div>',
            'minItems': 2
        },
        {
            'nav':'<li id="tab-nav-item-{system}" class="{selected} tab-nav-item tab-nav-item-{index}"><a href="#{system}-pane" rel="{system}" onClick="javascript:saveTab(\'system\');"><span class="left_shadow"></span><span>'+_("System")+'</span><span class="right_shadow"></span></a></li>',
            'pane':
            '<div id="{system}-pane" class="betcart-pane">'+
            '<div id="{system}-pane-events"></div>'+
            '<div class="betcart-pane-checkbox checkbox_error mar_bot_8"></div>'+
            '<div class="betcart-pane-checkbox checkbox_success mar_bot_8">'+
            '<div id="{system}-pane-checkbox" class="betcart-pane-checkbox-inn"></div>'+
            '</div>'+

            '<div class="betcart-pane-checkbox">'+
            '<div id="accept_high" class="additional-checkbox betcart-pane-checkbox-item accept-high {accept_high_selected}" onClick="saveCheckbox(this);">'+
            '<a href="javascript:void(0);"><span class="b-checkbox b-checkbox__c">&nbsp;</span> <span>'+_('Accept higher odds')+'</span> </a>' +
            '</div>'+
            '<div id="accept_any" class="additional-checkbox betcart-pane-checkbox-item accept-any {accept_any_selected}" onClick="saveCheckbox(this);">'+
            '<a href="javascript:void(0);"><span class="b-checkbox b-checkbox__c">&nbsp;</span> <span>'+_('Accept any odds')+'</span> </a>' +
            '</div>'+
            '</div>'+
            '<div style="display:none!important">'+
            '<div class="betcart-pane-bankers">'+
            '<div class="betcart-pane-bankers-inn">'+
            '<label for="bankers-activate-checkbox" class="betcart-pane-bankers-psevdocheck"><span>x</span></label>'+
            '<input type="checkbox" id="bankers-activate-checkbox" class="g-hidden-accessible" checked="checked">'+
            '&nbsp;<label for="bankers-activate-checkbox">Bankers</label>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="betcart-pane-bottom">'+
            '<div id="{system}-pane-bottom" class="betcart-pane-bottom-inn">'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-total-odds g-clearfix">'+
            '<span>'+_("Total odds")+':</span><var></var>'+
            '</div>'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-stake g-clearfix">'+
            '<span>'+_("Stake per bet")+'</span><input type="hidden" value="0" /><var>0.00</var>'+
            '</div>'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-count g-clearfix">'+
            '<span>'+_("Number of bets")+':</span><var></var>'+
            '</div>'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-total-stake g-clearfix">'+
            '<span>'+_("Total stake")+':</span><input type="text" value="" onKeyup="saveStake(jQuery(this))">'+
            '</div>'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-potential g-clearfix">'+
            '<span>'+_("Potential payout")+':</span><var></var>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div id="{system}-pane-button" class="betcart-pane-action g-clearfix">'+
            '<a href="javascript:;" class="b-button b-button_next g-stack betcart-pane-action-item betcart-pane-action-send"><b class="b-button__text g-stack">' + _('Next') + '</b></a>'+
            '<a href="javascript:;" onClick="clearAll();" class="b-button b-button_clear b-button_change g-stack betcart-pane-action-item betcart-pane-action-clear"><b class="b-button__text">' + _('Clear All') + '</b></a>'+
            '<a href="javascript:;" class="b-button b-button_conf g-stack betcart-pane-action-item betcart-pane-action-confirm g-hidden"><b class="b-button__text g-stack">' + _('Confirm') + '</b></a>'+
            '<a href="javascript:;" class="b-button b-button_change g-stack betcart-pane-action-item betcart-pane-action-change g-hidden"><b class="b-button__text g-stack">' + _('Change Bets') + '</b></a>'+
            '</div>'+
            '</div>',
            'item':
            '<div class="betcart-pane-event mid{mid} event_id{mid} sport{sport} type{type} oid{oid} market_id{market_id} scope{scope} allowance{beton_val}">'+
            '<div class="betcart-pane-event-name">'+
            '<div><span class="live_i outcome_id{oid} g-hidden">LIVE</span><span><b data-{mid}="score">{live_result}</b> {event}</span></div>'+
            '</div>'+
            '<div class="g-clearfix">'+
            '<div class="betcart-pane-event-type g-left"><b>{event_lay}</b> <b>{event_type}</b> <span class="scope_key">('+_('{scope_key}')+')</span></div>'+
            '<div class="betcart-pane-event-banker g-right">'+
            '<label for="bankers-{index}">B</label>'+
            '<input type="checkbox" id="bankers-{index}" class="g-hidden-accessible data-banker"/>'+
            '</div>'+
            '</div>'+
            '<div class="betcart-pane-event-row g-clearfix"><span>'+_("Pick")+':</span><b class="betcart-pane-event-coeff">{coeff}</b><strong class="betcart-pane-event-pick betcart-pane-event-pick-line">{event_pick}</strong> </div>'+
            '<div class="betcart-pane-event-data">'+
            '<input type="hidden" class="data-oid" value="{oid}" market_id="{market_id}" outcome_id="{oid}" event_id="{mid}" />'+
            '<input type="hidden" class="data-market_id" value="{market_id}" />'+
            '<input type="hidden" class="data-odds" value="{odds}" default="{odds}" market_id="{market_id}" outcome_id="{oid}" event_id="{mid}" />'+
            '<input type="hidden" class="data-buypoints" value="0" />'+
            '<input type="hidden" class="data-status" value="{event_status}" />'+
            '<input type="hidden" class="data-lay" value="{event_lay}" />'+
            '</div>'+
            '<a href="javascript:void(0);" onClick="deleteFromCookie({oid})" class="betcart-pane-event-remove oid{oid}">&nbsp;</a>'+
            '<script>if ("{event_status}" == "inprogress") {$j(".outcome_id{oid}").removeClass("g-hidden");} </script>'+
            '</div>',
            'checkbox':
            '<div class="betcart-pane-checkbox-item {betcart-pane-checkbox-item-active}">'+
            '<a href="javascript:void(0);"><span class="b-checkbox b-checkbox__c">&nbsp;</span> <span class="b-system-type">{bankersTitle} ' + _('System') + ' {iteration}/{total} &ndash; ({count} ' + _('odds') + ')</span> </a>' +
            '</div>',
            'checkboxTitle': '<div class="betcart-pane-checkbox-title"></div>',
            'minItems': 3
        },
        {
            'nav':'<li id="tab-nav-item-{roundrobin}" class="{selected} tab-nav-item tab-nav-item-{index}"><a href="#{roundrobin}-pane" rel="{roundrobin}" onClick="javascript:saveTab(\'roundrobin\');"><span>'+ _('System') +'</span></a></li>',
            'pane':
            '<div id="{roundrobin}-pane" class="betcart-pane">'+
            '<div id="{roundrobin}-pane-events"></div>'+
            '<div class="betcart-pane-checkbox">'+
            '<div id="{roundrobin}-pane-checkbox" class="betcart-pane-checkbox-inn"></div>'+
            '</div>'+
            '<div class="betcart-pane-bottom">'+
            '<div id="{roundrobin}-pane-bottom" class="betcart-pane-bottom-inn">'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-stake g-clearfix">'+
            '<span>'+_("Stake per bet")+'</span><input type="text" value="" onKeyup="saveStake(jQuery(this));" />'+
            '</div>'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-count g-clearfix">'+
            '<span>'+_("Number of bets")+':</span><var></var>'+
            '</div>'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-total g-clearfix">'+
            '<span>'+_("Total stake")+':</span><var></var>'+
            '</div>'+
            '<div class="betcart-pane-bottom-item betcart-pane-bottom-potential g-clearfix">'+
            '<span>'+_("Potential payout")+':</span><var></var>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div id="{roundrobin}-pane-button" class="betcart-pane-action g-clearfix">'+
            '<a href="javascript:;" class="b-button b-button_next g-stack betcart-pane-action-item betcart-pane-action-send"><b class="b-button__text g-stack">' + _('Next') + '</b></a>'+
            '<a href="javascript:; onClick="clearAll();" class="b-button b-button_clear b-button_change g-stack betcart-pane-action-item betcart-pane-action-clear"><b class="b-button__text">' + _('Clear All') + '</b></a>'+
            '<a href="javascript:;" class="b-button b-button_conf g-stack betcart-pane-action-item betcart-pane-action-confirm g-hidden"><b class="b-button__text g-stack">' + _('Confirm') + '</b></a>'+
            '<a href="javascript:;" class="b-button b-button_change g-stack betcart-pane-action-item betcart-pane-action-change g-hidden"><b class="b-button__text g-stack">' + _('Change Bets') + '</b></a>'+
            '</div>'+
            '</div>',
            'item':
            '<div class="betcart-pane-event mid{mid} event_id{mid} sport{sport} type{type} oid{oid} market_id{market_id} scope{scope} allowance{beton_val}">'+
            '<div class="betcart-pane-event-name"><div><span class="live_i outcome_id{oid} g-hidden">LIVE</span><span><b data-{mid}="score">{live_result}</b> {event}</span></div><div>{scope_title}</div> <a href="javascript:void(0);" onClick="deleteFromCookie({oid})" class="betcart-pane-event-remove oid{oid}">&nbsp;</a></div>'+
            '<div class="betcart-pane-event-type">{event_type} <span class="scope_key">('+_('{scope_key}')+')</span></div>'+
            '<div class="betcart-pane-event-row g-clearfix"><span>'+_("Pick")+':</span><b class="betcart-pane-event-coeff">{coeff}</b><strong class="betcart-pane-event-pick betcart-pane-event-pick-line">{event_pick}</strong> </div>'+
            '<div class="betcart-pane-event-data">'+
            '<input type="hidden" class="data-oid" value="{oid}" />'+
            '<input type="hidden" class="data-odds" value="{odds}" default="{odds}" />'+
            '<input type="hidden" class="data-buypoints" value="0" />'+
            '<input type="hidden" class="data-status" value="{event_status}" />'+
            '<input type="hidden" class="data-lay" value="{event_lay}" />'+
            '</div>'+
            '<script>if ("{event_status}" == "inprogress") {$j(".outcome_id{oid}").removeClass("g-hidden");} </script>'+
            '</div>',
            'checkbox':
            '<div class="betcart-pane-checkbox-item betcart-pane-checkbox-item-active">'+
            '<a href="javascript:void(0);"><span class="b-checkbox b-checkbox__c">&nbsp;</span> <span>System - {title} ({count} Bets) </a></span>' +
            '</div>',
            'checkboxTitle': '<div class="betcart-pane-checkbox-title">'+ _('Select System below') +'</div>',
            'minItems': 3
        },

        {
            'nav':'<li id="tab-nav-item-{ifbet}" class="tab-nav-item tab-nav-item-{index}"><a href="#{ifbet}-pane" class="b-link"><span class="left_shadow"></span><span>'+_('If Bet')+'</span><span class="right_shadow"></span></a></li>',
            'pane':
                ['<div id="{ifbet}-pane" class="betcart-pane">',
                    '<div id="{ifbet}-pane-events"></div>',
                    '<div class="betcart-pane-bottom">',
                    '<div id="{ifbet}-pane-bottom" class="betcart-pane-bottom-inn betcart-pane-event-inn">',
                    '<div class="betcart-pane-bottom-item betcart-pane-bottom-select g-clearfix">',
                    '<span class="g-left">'+_('If-Bet Type')+':</span>',
                    '<select class="g-right">',
                    '<option value="0">'+_('Win Only')+'</option>',
                    '<option value="1">'+_('Win or Push')+'</option>',
                    '</select>',
                    '</div>',
                    '<div class="betcart-pane-bottom-item betcart-pane-bottom-total g-clearfix">',
                    '<span class="g-left">'+_('Total stake')+':</span><var class="g-right"></var>',
                    '</div>',
                    '<div class="betcart-pane-bottom-item betcart-pane-bottom-potential g-clearfix">',
                    '<span class="g-left">'+_('Potential payout')+':</span><span class="g-right">{currency}&nbsp;<var></var></span>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '<div id="{ifbet}-pane-button" class="betcart-pane-action g-clearfix">',
                    '<span class="b-button b-button_next g-stack betcart-pane-action-item betcart-pane-action-send">',
                    '<b class="b-button__text g-stack">'+_('Next')+' </b>',
                    '</span>',
                    '<span class="b-button b-button_clear b-button_change g-stack betcart-pane-action-item betcart-pane-action-clear">',
                    '<b class="b-button__text g-stack">'+_('Clear All')+'</b>',
                    '</span>',
                    '<span class="b-button m-button_green betcart-pane-action-item betcart-pane-action-change hide">',
                    '<i class="b-button__bg b-button__l"></i>',
                    '<i class="b-button__bg b-button__r"></i>',
                    '<span class="b-button__text">&#8592; '+_('Change Bets')+'</span>',
                    '</span>',
                    '<span class="b-button m-button_green betcart-pane-action-item betcart-pane-action-confirm hide">',
                    '<i class="b-button__bg b-button__l"></i>',
                    '<i class="b-button__bg b-button__r"></i>',
                    '<span class="b-button__text">'+_('Confirm')+'</span>',
                    '</span>',
                    '</div>',
                    '</div>'].join(''),
            'item':
                ['<div class="betcart-pane-event mid{mid} event_id{mid} sport{sport} type{type} oid{oid} scope{scope} allowance{beton_val}" {ifbet}>',
                    '<div class="betcart-pane-event-inn">',
                    '<div class="betcart-pane-event-name"><div><span class="if_bet_name">{event}</span></div></div>',
                    '<div class="betcart-pane-event-type"><b>{event_type}</b> <span class="scope_key">('+_('{scope_key}')+')</span></div>',
                    '<div class="betcart-pane-event-row g-clearfix"><span>'+_('Pick')+':</span><b class="betcart-pane-event-coeff">{coeff}</b><strong class="betcart-pane-event-pick">{event_pick}</strong></div>',
                    '<div class="betcart-pane-event-stake g-clearfix"><span>'+_('Stake')+':</span><span class="g-right">{currency}&nbsp;<input tabindex="200{index}" type="text" value="0.00" /></span></div>',
                    '<div class="betcart-pane-event-potential g-clearfix"><span>'+_('Potential Win')+':</span><span class="g-right">{currency}&nbsp;<input type="text" value="0.00" /></span></div>',
                    '<div class="betcart-pane-event-data">',
                    '<input type="hidden" class="data-oid" value="{oid}"  />',
                    '<input type="hidden" class="data-odds" value="{odds}" default="{odds}" />',
                    '<input type="hidden" class="data-buypoints" value="0" />',
                    '</div>',
                    '<a href="javascript:;" class="betcart-pane-icons betcart-pane-event-arrow betcart-pane-event-arrow-up"></a>',
                    '<a href="javascript:;" class="betcart-pane-icons betcart-pane-event-arrow betcart-pane-event-arrow-down"></a>',
                    '<a href="javascript:;" class="betcart-pane-event-remove betcart-pane-icons oid{oid}"></a>',
                    '</div>',
                    '<div>'].join(''),
            'option': '<option value="{value}">{text}</option>',
            'minItems': 2
        },
        {
            'nav':'<li id="tab-nav-item-{reverse}" class="tab-nav-item tab-nav-item-{index}"><a href="#{reverse}-pane" class="b-link"><span class="left_shadow"></span><span>'+_('Reverse')+'</span><span class="right_shadow"></span></a></li>',
            'pane':
                ['<div id="{reverse}-pane" class="betcart-pane">',
                    '<div id="{reverse}-pane-events"></div>',
                    '<div class="betcart-pane-bottom">',
                    '<div id="{reverse}-pane-bottom" class="betcart-pane-bottom-inn betcart-pane-event-inn">',
                    '<div class="betcart-pane-bottom-item betcart-pane-bottom-select g-clearfix">',
                    '<span class="g-left">'+_('Reverse Bet Type')+':</span>',
                    '<b class="g-right">'+_('Win Or Push')+'</b>',
                    '</div>',
                    '<div class="betcart-pane-bottom-item betcart-pane-bottom-stake g-clearfix">',
                    '<span class="g-left">'+_('Stake')+':</span><span class="g-right">{currency}&nbsp;<input type="text" value="0.00" /></span>',
                    '</div>',
                    '<div class="betcart-pane-bottom-item betcart-pane-bottom-count g-clearfix">',
                    '<span class="g-left">'+_('Number of bets')+':</span><var class="g-right">0</var>',
                    '</div>',
                    '<div class="betcart-pane-bottom-item betcart-pane-bottom-total g-clearfix">',
                    '<span class="g-left">'+_('Total stake')+':</span><var class="g-right"></var>',
                    '</div>',
                    '<div class="betcart-pane-bottom-item betcart-pane-bottom-potential g-clearfix">',
                    '<span class="g-left">'+_('Potential Win')+':</span><span class="g-right">{currency}&nbsp;<input type="text" value="0.00" /></span>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '<div id="{reverse}-pane-button" class="betcart-pane-action g-clearfix">',
                    '<span class="b-button b-button_next g-stack betcart-pane-action-item betcart-pane-action-send">',
                    '<b class="b-button__text g-stack">'+_('Next')+' </b>',
                    '</span>',
                    '<span class="b-button b-button_clear b-button_change g-stack betcart-pane-action-item betcart-pane-action-clear">',
                    '<b class="b-button__text g-stack">'+_('Clear All')+'</b>',
                    '</span>',
                    '<span class="b-button m-button_green betcart-pane-action-item betcart-pane-action-change hide">',
                    '<i class="b-button__bg b-button__l"></i>',
                    '<i class="b-button__bg b-button__r"></i>',
                    '<span class="b-button__text">&#8592; '+_('Change Bets')+'</span>',
                    '</span>',
                    '<span class="b-button m-button_green betcart-pane-action-item betcart-pane-action-confirm hide">',
                    '<i class="b-button__bg b-button__l"></i>',
                    '<i class="b-button__bg b-button__r"></i>',
                    '<span class="b-button__text">'+_('Confirm')+'</span>',
                    '</span>',
                    '</div>',
                    '</div>'].join(''),
            'item':
                ['<div class="betcart-pane-event mid{mid} event_id{mid} sport{sport} type{type} oid{oid} scope{scope} allowance{beton_val}">',
                    '<div class="betcart-pane-event-inn">',
                    '<div class="betcart-pane-event-name"><div><span>{event}</span></div></div>',
                    '<div class="betcart-pane-event-type"><b>{event_type}</b> <span class="scope_key">('+_('{scope_key}')+')</span></div>',
                    '<div class="betcart-pane-event-row g-clearfix"><span>'+_('Pick')+':</span><b class="betcart-pane-event-coeff">{coeff}</b><strong class="betcart-pane-event-pick">{event_pick}</strong> </div>',
                    '<div class="betcart-pane-event-data">',
                    '<input type="hidden" class="data-oid" value="{oid}"  />',
                    '<input type="hidden" class="data-odds" value="{odds}" default="{odds}" />',
                    '<input type="hidden" class="data-buypoints" value="0" />',
                    '</div>',
                    '<a href="javascript:;" class="betcart-pane-event-remove betcart-pane-icons oid{oid}"></a>',
                    '</div>',
                    '</div>'].join(''),
            'option': '<option value="{value}">{text}</option>',
            'minItems': 2
        },
        {
            'nav':'<li id="tab-nav-item-{teaser}" class="tab-nav-item tab-nav-item-{index}"><a href="#{teaser}-pane" class="b-link"><span class="left_shadow"></span><span>'+_('Teaser')+'</span><span class="right_shadow"></span></a></li>',
            'pane':
                ['<div id="{teaser}-pane" class="betcart-pane">',
                    '<div id="{teaser}-pane-events"></div>',
                    '<div class="betcart-pane-bottom">',
                    '<div id="{teaser}-pane-bottom" class="betcart-pane-bottom-inn betcart-pane-event-inn">',
                    '<div class="betcart-pane-bottom-item betcart-pane-bottom-count"><b></b></div>',
                    '<div class="betcart-pane-bottom-item betcart-pane-bottom-select g-clearfix">',
                    '<span class="g-left">'+_('Teaser')+':</span><select class="g-right"></select>',
                    '</div>',
                    '<div class="betcart-pane-bottom-item betcart-pane-bottom-total g-clearfix">',
                    '<span class="g-left">'+_('Total odds')+':</span><var class="g-right"></var>',
                    '</div>',
                    '<div class="betcart-pane-bottom-item betcart-pane-bottom-stake g-clearfix">',
                    '<span class="g-left">'+_('Stake')+':</span><span class="g-right">{currency}&nbsp;<input type="text" value="0.00" /></span>',
                    '</div>',
                    '<div class="betcart-pane-bottom-item betcart-pane-bottom-potential g-clearfix">',
                    '<span class="g-left">'+_('Potential Win')+':</span><span class="g-right">{currency}&nbsp;<input type="text" value="0.00" /></span>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '<div id="{teaser}-pane-button" class="betcart-pane-action g-clearfix">',
                    '<span class="b-button b-button_next g-stack betcart-pane-action-item betcart-pane-action-send">',
                    '<b class="b-button__text g-stack">'+_('Next')+' </b>',
                    '</span>',
                    '<span class="b-button b-button_clear b-button_change g-stack betcart-pane-action-item betcart-pane-action-clear">',
                    '<b class="b-button__text g-stack">'+_('Clear All')+'</b>',
                    '</span>',
                    '<span class="b-button m-button_green betcart-pane-action-item betcart-pane-action-change hide">',
                    '<i class="b-button__bg b-button__l"></i>',
                    '<i class="b-button__bg b-button__r"></i>',
                    '<span class="b-button__text">&#8592; '+_('Change Bets')+'</span>',
                    '</span>',
                    '<span class="b-button m-button_green betcart-pane-action-item betcart-pane-action-confirm hide">',
                    '<i class="b-button__bg b-button__l"></i>',
                    '<i class="b-button__bg b-button__r"></i>',
                    '<span class="b-button__text">'+_('Confirm')+'</span>',
                    '</span>',
                    '</div>',
                    '</div>'].join(''),
            'item':
                ['<div class="betcart-pane-event mid{mid} event_id{mid} sport{sport} type{type} oid{oid} scope{scope} allowance{beton_val}">',
                    '<div class="betcart-pane-event-inn">',
                    '<div class="betcart-pane-event-name"><div><span>{event}</span></div></div>',
                    '<div class="betcart-pane-event-row g-clearfix"><span>'+_('Pick')+':</span><b class="betcart-pane-event-coeff">{coeff}</b><strong class="betcart-pane-event-pick">{event_pick}</strong></div>',
                    '<div class="betcart-pane-event-data">',
                    '<input type="hidden" class="data-oid" value="{oid}" />',
                    '<input type="hidden" class="data-odds" value="{odds}" default="{odds}" />',
                    '<input type="hidden" class="data-sport" value="{sport}" />',
                    '<input type="hidden" class="data-buypoints" value="0" />',
                    '</div>',
                    '<a href="javascript:;" class="betcart-pane-event-remove betcart-pane-icons oid{oid}"></a>',
                    '</div>',
                    '</div>'].join(''),
            'option': '<option value="{value}">{text}</option>',
            'minItems': 2
        }

    ],
    response :	'<div class="betcart-message betcart-message-{desc}">'+
    '<h3>{title}<span class="g-right betcart_additional_message">{additional_message}</span></h3>'+
    '<p>{msg}</p>'+
    '</div>',
    responseData: {
        'bid': {
            'title' : '{msg}',
            'msg': ''
        },
        'pending': {
            'title' : _('Stake is pending'),
            'msg': _('Your bet has been sent to our riskmanagers for a manual approval, the bet will be voided unless approved before the event starts. on or below the slip so they are aware that it not is placed.')
        },
        'success': {
            'title': _('Stake was accepted'),
            'msg': ''
        }
    }/*,
     couponTemplate: [
     '<div class="display_coupon g-round">',
     '<iframe type="application/pdf" src=\'/getdata.php?sec=print_ticket&print=1&as_html=1&bet_ids_json={bet_ids_json}\' name="pdfDocument" id="pdfDocument" width="0" height="0" style="border: none;" class="g-hiddeh"></iframe>' +
     '<script> ' +
     'function print_window(){ ' +
     "$j('#pdfDocument').attr('src', '/getdata.php?sec=print_ticket&print=1&as_html=1&bet_ids_json={bet_ids_json}'); " +
     "$j('#pdfDocument')[0].onload = function(){	$j('#pdfDocument')[0].contentWindow.print(); } " +
     '} '   +
     '</script> '   +
     '<div id="coupon_area" ></div>',
     '<div class="coupon_bott">',
     '<a  href=\'javascript:print_window();\' class="coupon_button coupon_button_p g-round_2"><span class="l_but"></span><span class="t_but">Print ticket</span></a>',
     '<a  href="javascript:;" target="_blank" class="lightbox-control coupon_button coupon_button_c g-round_2"><span class="l_but"></span><span class="t_but">Close</span></a>',
     '</div>',
     '</div>',
     '</div>',
     '<script>ScriptDoLoad(\'/getdata.php?sec=print_ticket&as_html=1&bet_ids_json={bet_ids_json}\', "coupon_area"); scroll(0,0);</script>',
     ].join('')*/
};