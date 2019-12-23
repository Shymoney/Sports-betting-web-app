Math.factorial = (function () {
	var f = [1];
	return function( n ){
		if ( n in f ) { return f[n]; }
		var res = f[f.length-1];
		for ( var i = f.length; i <=n; i++ ) {
			res *= i;
			f[i] = res;
		}
		return res;
	};
})();

Math.combination = function( m, n ) {
	return (m <= n) ? Math.factorial(n) / (Math.factorial(m) * Math.factorial(n - m)) : 1;
};

Math.combinations = function( $n, $k ) {
	var $b = [], $result = [];
	for (var i=0; i < $n + 1; i++) {
		$b.push(0);
	}
	
	while ($b[$n] == 0) {
		$i = 0;
		while ($b[$i] == 1) {
			$b[$i] = 0;
			$i++;
		}
		$b[$i] = 1;

		var $value = $b.slice(0, $n);
		
		$result.push($value);
	}
	
	$result.pop();
	
	return $result;
	/*
	while ($b[$n] == 0) {
		$i = 0;
		while ($b[$i] == 1) {
			$b[$i] = 0;
			$i++;
		}
		$b[$i] = 1;

		$result[] = array_slice($b, 0, $n);
	}
	array_pop($result);

	empty($k) or $result = array_slice(array_filter($result, create_function('$a', 'return array_sum($a) == ' . $k . ';')), 0);

	return $result;*/
};

/*
* @param type: 	EU
* 				UK
* 				US
* 				HK
* 				ID
* 				MY
*/

(function($){
	var $document = $(document);
	
	$.fn.qwerty = function(options) {
		var subsecOptions = {};
		
		var reFloat = /\d+\.?\d*/,
			reFloatQ = /\d+\.[27]5/,
			typeDefinition = /type([a-z0-9]+)/,
			eventDefinition = /mid([a-z0-9]+)/,
			sportDefinition = /sport([a-z0-9]+)/,
			hiddenClass = window.hiddenClass || 'hide',
			tabHiddenClass = 'ui-tabs-hide'
		;
			
		/**
		 * @param {boolean} buypoints 
		 * @param {float} buypoints_step
		 * @param {integer} buypoints_spread
		 * @param {integer} buypoints_charge
		 */
		options = $.extend(true, {}, {
			idTo: 'betcard',
			coeff: 'a.ratelink',
			sec: "placebet",
			currency: '&euro;',
			//minItems: [ 0, 2, 3, 2, 2, 2],
			//activeTab: [1, 1, 1, 0, 0, 0],
			minval: 0.1,
			maxevent: 10,
			
			validate: function ( self ) {
				return true;
			},
			
			teaser : {
				mixed: false,
				sports: {},
				table: {},
				titles: {},
				restrictOdd: false
			},
			
			subsec: subsecOptions,
			
			disableUpdate : false,
			allowConflict: false,
			conflict_mod: false,
			conflict_mod_outright: true,
			
			type: "EU",
			unconvertible_types: null,
			
			payout : false,
			
			resultWin : 'pure',
			
			buypoints: false,
			buypoints_step: 0.5,
			buypoints_spread: 3,
			buypoints_charge: 10,
			buypoints_extra : true,
			buypoints_extra_charge_20 : false,
			buypoints_ignored : false,
			
			systemMinMax: false,
			
			userForm: '',
			initUserForm: function() {},
			
			bankersEnabled: true,
			maxBankersChecked : 1,
			
			onInsert: function( $betCart, countEvents ){},
			onUpdate: function( $betCart, data ){},
			onRemove: function( $betCart, data ){},
			onPlaceBet: function( $betCart, data ){},
			onSuggestStakes: function( $betCart, data ){},
			onBeforePlaceBet: function( $betCart, data ){
				return {
					status: true
				};
			},
			
			combinedBonus : false,
			systemBonus : false,
			
			multyOutcomes : true,
			onlyOneOutcomeInCombination : true,
			additional_betcart_restrictions : false,
			combinedType : false,
			
			systemFilter : function ( binaryList, elements ){
				var midElemets = elements.midElemets || (elements.midElemets = elements.closest("[class*=mid]"));
				var midList = [],
					elem, 
					i = 0,
					reMid = /\bmid(\d+)\b/;
				for ( ;(elem = midElemets[i]); i++ ) {
					binaryList[ i ] && midList.push( elem.className.match(reMid).pop() );
				}
				if ( midList.length == 1 ) return false;
				midList.sort();
				for ( var i = midList.length - 1; i--; ) {
					if ( midList[ i + 1 ] == midList[ i ] ) return true;
				}
				return false;
			},
			
			onlyOneItemInSingle : false,
			tax_percent : null,
			tax_amount : null,
			selected_bet_type : 'single',
			default_stake : '',
			overwrite_default_stake: parseFloat(0),
			is_total_stake_variant : false,
			enableSeveralMarketOutcomes: false,
			sportsbook_exchange_mode: false,
			conflict_markets_key: 'mid',
			betcart_stakes_mutuality_key: 'market_id',
			sportsbook_bet_types: null,
			saveOdds: true,
			descriptionDelimiterEnabled: true,
			pitchersEnable: false,
			betcart_template: null,
			mix_parlay_events: null,
			one_event_pick: false,
			static_couldown: false,
			alert_suggest_stakes: false,
			focus_to_stake: false,
			confirmed_message: _('Selection will be confirmed in'),
			set_null_default: false, // deprecated
			autoupdate_stake: true,
			betcart_add_events_before: false,
			sportsbook_bet_resolve_conflict: true,
			maximum_system_picks:7,
			betcart_parlay_types_restrictions: [],
			placebet_by_enter: true,
			market_restrictions: null,
			market_restriction_sport: 's',
			mobi_theme: false,
			clear_input: false,
			update_timeout: 400,
			round : 2,
			betcart_print_coupon_button: false,
			betcart_print_coupon_by_checkbox: false,
			check_system_pick_min_per_bet: false,
			reload_betcart: 0
		}, options);
		

		options.w = [_('Single'), _('Double'), _('Treble'), _('Fourfold'), _('Fivefold'), _('Sixfold'), _('Sevenfold'), _('Eightfold'), _('Ninefold'), _('Tenfold'), _('Elevenfold'), _('Twelvefold'), _('Thirteenfold'), _('Fourteenfold'), _('Fifteenfold'), _('Sixteenfold'), _('Seventeenfold'), _('Eighteenfold'), _('Nineteenfold'), _('Twentyfold')];
		options.message = {
			minval: _("You can bet minimum ") + (options.minval) + (options.currency || "&euro;") + ".",
			maxevent: _("You can add maximum ")  + ' ' + (options.maxevent) + ' ' + _(" picks."),
			teaser: _("Please select a teaser."),
			conflict: _("You have conflicting picks in your selection"),
			odds_changed: _("Odds were changed. Please confirm your selection."),
			odds_changed_accept: _("Odds were changed. If you click on proceed button you are accepting those odds."),
			trigger_limit: _("Please check your limits."),
			empty_system: _("Please select at least one system."),
			pick_added: _("Pick added to betting slip")
		};
		
		if (options.focus_to_stake) {
			options.overwrite_default_stake = 0;
		}
		
		if (options.combinedType == 'combined_system') {
			options.conflict_markets_key =  'mid';
			options.betcart_stakes_mutuality_key = 'market_id';
		}
		
		options.market_restrictions = $j.parseJSON(options.market_restrictions);
		options.unconvertible_types = $.parseJSON(options.unconvertible_types);
		
		var templates = window.betCartTemplates;
		
		function optimizeHeight() {
			var $betcart_height = $j('#betcard').height();
			
		}
		function d2( value ){
			if (typeof value == 'string') {
				value = parseFloat(+value.toString().replace(',','.'));
			}
			
			return  ( 1 * value ).toFixed(options.round);
		};
		
		function getObjectElementsCount( object ){
			var count = 0;
			for (i in object) {
				count += 1;
			}
			
			return count;
		};
		
		function getPitchersSelectbox(data) {
			if (data.length == 0) {
				return "";
			}
			
			var result = "<select class='b-select b-select-betcart pitcher-action-value' name='pitcher-action-value'>";
			result += "<option value='all'>Listed pitchers must start</option>";
			for (i in data) {
				result += "<option value='"+data[i]+"'>" + data[i] + " must start</option>";
			}
			
			result += "<option value=''>Action</option>";
			result += "</select>";
			
			return result;
		}
		function getSetCombinations(sets) {
			if (sets.length == 0) {
				return [];
			}
			
			var current_set			= sets.pop();
			var rest_combinations	= getSetCombinations(sets);
			var full_combinations	= [];
			var iteration = "0";
			
			for (var iteration = 0; iteration < current_set.length; iteration++) {
				var element = current_set[iteration];
				if (rest_combinations.length == 0) {
					var array_element = [];
					array_element.push(element)
					full_combinations.push(array_element);
				}
				
				for (var iteration_j = 0; iteration_j < rest_combinations.length; iteration_j++) {
					var combination = rest_combinations[iteration_j].slice(); 
					if (!$j.isArray(combination)) {
						var combination = [];
					}
					
					combination.push(element);
					full_combinations.push(combination);
				}
			}
			
			return full_combinations;
		};
		
		function getArrayFromObject( object ){
			var result = [];
			
			for (i in object) {
				var object_item = [];
				
				for (j in object[i]) {
					var element = object[i][j];
					if (typeof element == 'function') {
						continue;
					}
					
					object_item.push(element);
				}
				
				result.push(object_item);
			}
			
			return result;
		};
		
		function getObjectElementByIterationNumber( object, number ){
			var iteration = 0;
			
			for (i in object) {
				if (iteration == number) {
					return object[i];
				}
				iteration++;
			}
			
			return null;
		};
		
		function getSum( array ){
			var sum = 0;
			for (i in array) {
				sum += array[i];
			}
			
			return sum;
		};
		
		function getBetType( nav ){
			if( /id="tab-nav-item-single"/.test( nav ) ) {return 'single';}
			if( /id="tab-nav-item-combined"/.test( nav ) ) {return 'combined';}
			if( /id="tab-nav-item-system"/.test( nav ) ) {return 'system';}
			if( /id="tab-nav-item-roundrobin"/.test( nav ) ) {return 'roundrobin';}
			if( /id="tab-nav-item-teaser"/.test( nav ) ) {return 'teaser';}
			
			return null
		};
		
		function getMaximumCombinations( elements , conflict_markets_key){
			var classes = {}, 
				count = 0, 
				pattern = new RegExp('.*\\b'+conflict_markets_key+'(\\d+)\\b.*');
			
			elements.each(function(i) {
				var class_ = $(this).parent().parent().attr('class').replace(pattern, '$1')
				if (!classes[class_]) {classes[class_] = 1; count++};
			})
			
			return count;
		};
		
		function getCombinations( e_count, only_one ){
			var e = [];
			var $param = 0;
			if (only_one) {
				var $param = 1;
			}
			
			for (var i=0; i<e_count; i++) {
				if (i==e_count-1) {
					e.push(1);
				} else {
					e.push($param);
				}
			}
			
			return e;
		};
		
		function getTaxPercent( tax_percent ){
			if (!tax_percent) {
				return 1;
			}
			
			return (100 - tax_percent)/100;
		};
		
		function getSystemCountCombination(element, iteration, count) {
			return 10;
		}
		
		function getAmountWithTaxPercent(payout, tax_percent) {
			var percented_amount = payout / (100-(-tax_percent));
			return 100*percented_amount;
			
			var real_percent = (100 - tax_percent) / 100;
			return payout * real_percent;
		}
		
		function getTaxPercentRealPercent(tax_percent) {
			var all_percent = tax_percent-(-100);
			var real_percent = 100 / all_percent;
			
			return real_percent;
		}
		
		function getUniqueEventsCount(stakes) {
			var groups = {};
			
			for (i in stakes) {
				var event_id = $(stakes[i]).parent().find('.data-oid').attr('event_id');
				groups[event_id] = event_id;
				
			}
			
			return count_parameters(groups);
		}
		
		var bet_cart = function(o) {
			var getType = (function () {
				var constType = [],
					type = {};
				for(var prop in options.subsec){
					constType.push(options.subsec[prop]);
				}
				return function( string ) {
					for( var i = 0, n = constType.length; i < n; i++ ) {
						type[constType[i]] = ( new RegExp( constType[i] ) ).test(string);
						if( type[constType[i]] ) {
							type.name = constType[i];
							try{
								type.index = document.getElementById('tab-nav-item-'+type.name).className.replace(/.*tab-nav-item-(\d+).*/, '$1') - 1;
							} catch( e ){
								type.index = -1;
							}
						}
					}
					return type;
				};

			})();

			var getEventID = (function(){
				var eventID = 0, events = {};
				return function(string) {
					if(!events[string]) {
						events[string] = ++eventID;
					}
					return ""+events[string];
				};
			})();
			
			var $betCart, $tabsNav, $betCartPane, $buttons, self, birs = {};
			
			var createButtons = function (b) {
				b.accept.click(function(e) {
					$betCart.find('.betcart-pane-event-coeff').removeClass('autoupdated_parameter');
					$betCart.find('.b-button_accept').addClass('g-hidden');
					
					$betCart.find('.close_betcard_button').removeClass('betcart-pane-link-disabled');
					$betCart.find('.b-button_next').removeClass('betcart-pane-action-item-disabled');
					$betCart.find('.b-button_conf').removeClass('betcart-pane-action-item-disabled');
					
					removeErrorsPanels();
				});
				b.clear.click(function(e) {
					if( $betCart.hasClass("post-data") ) { return false; }
					e.preventDefault();
					deinit(); 
				});
				b.send.click(function( e ) {
						$('input').removeClass('betcart-pane-event-stake-minval');
						
						if( $betCart.hasClass("post-data") ) { return false; }
						e.preventDefault();
	
						var $this = $(this), 
							context = this;
	
						this.$element = $("#" + $this.closest('.betcart-pane-action').attr("id").replace("-button", ""));
						this.elementName = this.$element.attr('id');
						this.elementType = getType( this.elementName );
						
						if( !o.allowConflict && $('#' + this.elementType.name + '-pane-events').hasClass('betcart-pane-event-conflict') ) {
							_alert(o.message.conflict);
							return;
						}
						
						this.$element.all_stake 	=	this.$element.find(".betcart-pane-bottom-all-stake input");
						this.$element.all_total 	=	this.$element.find(".betcart-pane-bottom-all-total input");
						this.$element.all_potential 	=	this.$element.find(".betcart-pane-bottom-all-potential input");
						this.$element.total 		=	this.$element.find(".betcart-pane-bottom-total input");
						
						this.$element.potential_payout = this.$element.find(".single-amount-potential-payout");
						this.$element.stake = this.$element.find(".betcart-pane-bottom-stake input");
						this.$element.stake_total = this.$element.find(".betcart-pane-bottom-total-stake input");
						if( !this.$element.stake.size() ) {
							this.$element.stake = this.$element.find(".betcart-pane-event-stake input");
						}
						this.$element.potential = this.$element.find(".betcart-pane-bottom-potential input");
						if( this.$element.potential.attr('readonly') ) {
							this.$element.potential = this.$element.potential.addClass('read').add(this.$element.find(".betcart-pane-event-potential input"));
						}
						
						this.$element.potential_alternative = this.$element.find(".betcart-pane-event-potential input");
						this.$element.close = this.$element.find("a.betcart-pane-event-remove");
						this.$element.close_all = this.$element.find("a.betcart-pane-all-event-remove");
						
						if (o.betcart_template == 'ibetcity') {
							this.$element.buypoints = this.$element.find('.betcart-pane-event-buypoints select');
						} else {
							this.$element.buypoints = this.$element.find('.betcart-pane-event-coeff select');
						}
						
						this.$element.stake.removeClass('betcart-pane-event-stake-minval').each(function(i) {
							var odds_value = d2(this.value);
							
							if( parseFloat(odds_value ) < o.minval ) {
								$(this).addClass('betcart-pane-event-stake-minval').parents('.betcart-pane-event').addClass('event-stake-minval');
							}
							this.value = odds_value;
						});
						this.$element.stakeMinimalValue = this.$element.stake.filter("input.betcart-pane-event-stake-minval");
						
						if ( this.$element.stakeMinimalValue.size() ) {
	//						_alert(o.message.minval);
	//						return;
						} 
						
						if ( (this.elementType.system || this.elementType.roundrobin) && !$('.betcart-pane-checkbox-item-active', "#" + this.elementName +"-checkbox").length ) {
							_alert( o.message.empty_system );
							return;
						}
						
						this.$element.select = $("#"+this.elementType.name+"-pane-bottom>.betcart-pane-bottom-select>select");
						
						if( this.elementType.teaser ) {
							var _teaserValue =  1 * (this.$element.select.children(':selected').html() + '').replace(' pt', '');
							if( isNaN( _teaserValue ) ) {
								_alert(o.message.teaser);
								return;
							}
						}
					
					
						
						if( this.elementType.teaser ) {
							this.$element.children(':first').children().find('.betcart-pane-event-pick').each(function(){
								var _html = this.innerHTML;
								var _value = _html.replace("\n",'').replace(/.*\((.+)\).*/, '$1');
								if( _value == _html ) {
									_value = _html.split(' ')[1];
									_value = parseFloat(_value) + ( _html.toUpperCase().indexOf('OVER') > -1 ? -1 : 1 ) * _teaserValue;
								} else {
									_value = parseFloat(_value)  +  _teaserValue;
								}
								var new_html = _html.replace(/(.*)\(.+\)(.*)/, '$1('+ _value +')$2');
								if( new_html == _html ) {
									var _t = _html.split(' ');
									_t[1] = _value;
									new_html = _t.join(' ');
									_t.length = 0;
								}
								this.innerHTML = new_html;
								_value = _html = null;
							});
						}
						
						// readonly
						this.$element.potential_payout.attr( "readonly", "readonly" ).addClass("betcart-pane-event-stake-readonly");
						this.$element.stake.attr( "readonly", "readonly" ).addClass("betcart-pane-event-stake-readonly").parents('.betcart-pane-event').removeClass('event-stake-minval');
						this.$element.stake_total.attr("readonly", "readonly").addClass("betcart-pane-event-stake-readonly").not(".read").each(function(){
							$(this).val(d2($(this).val()));
						});
						
						this.$element.potential.attr("readonly", "readonly").addClass("betcart-pane-event-stake-readonly").not(".read").each(function(){
							this.value = this.realValue || this.viewValue || this.value;
						});
						
						
						this.$element.buypoints.attr('disabled', "disabled");
						
						this.$element.all_stake.attr( "readonly", "readonly" ).addClass("betcart-pane-event-stake-readonly");
						this.$element.all_total.attr( "readonly", "readonly" ).addClass("betcart-pane-event-stake-readonly");
						this.$element.all_potential.attr( "readonly", "readonly" ).addClass("betcart-pane-event-stake-readonly");
						this.$element.total.attr( "readonly", "readonly" ).addClass("betcart-pane-event-stake-readonly");
						
						this.$element.potential_alternative.each(function() {
							$(this).attr("readonly", "readonly").addClass("betcart-pane-event-stake-readonly");
						})
						// readonly
						
						if(self.$userForm) {
							self.$userForm.addClass('betcart-pane-event-form-readonly').find('input, select, textarea').addClass('readonly').attr('readonly', true);
						}
						
						if( this.$element.select.next().is('strong') ) {
							this.$element.select.attr('disabled' , "disabled").addClass(hiddenClass).next().text( this.$element.select.children('option:selected').text() ).removeClass(hiddenClass);
						} else {
							this.$element.select.attr('disabled' , "disabled").addClass(hiddenClass).after( '<strong class="g-right" />' ).next().text( this.$element.select.children(':selected').text() );
						}
						
						this.$element.close.addClass(hiddenClass);
						
						if ( this.elementType.system || this.elementType.roundrobin ) {
							$("#"+this.elementType.name+"-pane-checkbox>.betcart-pane-checkbox-item").each(function() {
								var $self = $(this);
								if( $self.hasClass("betcart-pane-checkbox-item-active") ) {
									$self.find('a, input[type="checkbox"]').addClass(hiddenClass);
								} else {
									$self.addClass(hiddenClass);
								}
							});
							if ( o.bankersEnabled ) {
								var bankersCheck = document.getElementById("bankers-activate-checkbox");
								$(bankersCheck).closest(".betcart-pane-bankers").hide();
								if (bankersCheck != null && bankersCheck.checked ) {
									$('input:checkbox', document.getElementById(this.elementType.name + '-pane-events')).each(function(){
										if ( this.checked ) {
											this.readOnly = true;
											this.parentNode.className = $.trim(this.parentNode.className + " readonly");
										} else {
											this.parentNode.style.display = "none";
										}
									});
								}
							}
						}
						
						if( this.elementType.ifbet ) {
							this.$element.find('.betcart-pane-event-arrow').addClass(hiddenClass);
						}
						
						var _currentIndex = self.active.indexOf(this.elementType.index);
						
						for( var k in b ) {
							if( !b.hasOwnProperty(k) || !b[k].size() ) { continue; }
							if( k == 'send' || k == 'clear' || k == 'accept' ) {
								b[k].eq(_currentIndex).addClass(hiddenClass);
							} else {
								b[k].eq(_currentIndex).removeClass(hiddenClass);
							}
						}
						
						$betCart.removeClass("post-data").addClass('betcart-preview');
						var $clone_elements = $('#system-pane-checkbox').slice();
						var $clone_elements_html = $clone_elements.html();

						$('#system-pane-checkbox').find("div.betcart-pane-checkbox-item").addClass('g-hidden');
						$('#system-pane-checkbox').append("<div class='overlay_elements'>" + $clone_elements_html + "</div>");

					
					//hide navigate
					$tabsNav.addClass(hiddenClass);
					$("#betcard_error_panel").addClass(hiddenClass).empty();
					$("#betcard_error_panel_clone, .betcard_error_panel_clone").addClass(hiddenClass).empty();
					
					var accepted_parameters = $betCart.find('.betcart-pane-event-coeff.autoupdated_parameter').length;
					if (accepted_parameters) {
						_alert(o.message.odds_changed_accept);
					}
					
					//$betCart.addClass("post-data");
					
				});
				b.change.click(function( e ) {
					$('input').removeClass('betcart-pane-event-stake-minval');
					$('.overlay_elements').remove();
					$('#system-pane-checkbox').find("div.betcart-pane-checkbox-item").removeClass('g-hidden');
					
					if( $betCart.hasClass("post-data") ) { return false; }
					e.preventDefault();
					
					if ( self.couldown ) { 
						clearInterval(self.couldown);
						$("#betcard_couldown_panel").addClass(hiddenClass); 
					}
					
					var $this = $(this), 
						context = this;
					this.$element = $("#" + $this.closest('.betcart-pane-action').attr("id").replace("-button", ""));
									
					this.elementName = this.$element.attr('id');
					
					this.$element.all_stake 	=	this.$element.find(".betcart-pane-bottom-all-stake input");
					this.$element.all_total 	=	this.$element.find(".betcart-pane-bottom-all-total input");
					this.$element.all_potential 	=	this.$element.find(".betcart-pane-bottom-all-potential input");
					this.$element.total 	=	this.$element.find(".betcart-pane-bottom-total input");
					
					this.$element.potential_payout = this.$element.find(".single-amount-potential-payout");
					this.$element.stake = this.$element.find(".betcart-pane-bottom-stake input");
					this.$element.stake_total = this.$element.find(".betcart-pane-bottom-total-stake input");
					if( !this.$element.stake.size() ) {
						this.$element.stake = this.$element.find(".betcart-pane-event-stake input");
					}
					this.$element.potential = this.$element.find(".betcart-pane-bottom-potential input");
					if( this.$element.potential.hasClass('read') ) {
						this.$element.potential = this.$element.potential.add( this.$element.find(".betcart-pane-event-potential input") );
					}
					
					this.$element.potential_alternative = this.$element.find(".betcart-pane-event-potential input");
					
					this.$element.close = this.$element.find("a.betcart-pane-event-remove");
					this.$element.close_all = this.$element.find("a.betcart-pane-all-event-remove");
					
					if (o.betcart_template == 'ibetcity') {
						this.$element.buypoints = this.$element.find('.betcart-pane-event-buypoints select');
					} else {
						this.$element.buypoints = this.$element.find('.betcart-pane-event-coeff select');
					}
					
					this.elementType = getType( this.elementName );
					
					this.$element.select = $("#"+this.elementType.name+"-pane-bottom>.betcart-pane-bottom-select>select");
					
					this.$element.potential_payout.removeAttr( "readonly" ).removeClass("betcart-pane-event-stake-readonly");
					this.$element.stake.removeAttr( "readonly" ).removeClass("betcart-pane-event-stake-readonly");
					this.$element.stake_total.removeAttr("readonly" ).removeClass("betcart-pane-event-stake-readonly");
					this.$element.total.removeAttr("readonly" ).removeClass("betcart-pane-event-stake-readonly");
					
					this.$element.all_stake.removeAttr("readonly" ).removeClass("betcart-pane-event-stake-readonly");
					this.$element.all_total.removeAttr("readonly" ).removeClass("betcart-pane-event-stake-readonly");
					this.$element.all_potential.removeAttr("readonly" ).removeClass("betcart-pane-event-stake-readonly");
					this.$element.total.removeAttr("readonly" ).removeClass("betcart-pane-event-stake-readonly");
					
					this.$element.potential_alternative.each(function() {
						$(this).removeAttr("readonly" ).removeClass("betcart-pane-event-stake-readonly");
					});
					
					this.$element.potential.removeAttr("readonly" ).removeClass("betcart-pane-event-stake-readonly").each(function(){
						var $this = $(this);
						if( $this.hasClass('read') ) { 
							return $this.attr('readonly', "readonly").removeClass("read");
						}
						this.value = this.viewValue || this.realValue || this.value;
					});
					this.$element.select.removeAttr('disabled').removeClass(hiddenClass).next().addClass(hiddenClass);
					this.$element.buypoints.removeAttr('disabled');
					this.$element.close.removeClass(hiddenClass);
					if(self.$userForm) {
						self.$userForm.removeClass('betcart-pane-event-form-readonly').find('.readonly').removeClass('readonly').removeAttr('readonly');
					}
					
					if ( this.elementType.system || this.elementType.roundrobin ) {
						$("#"+this.elementType.name+"-pane-checkbox>.betcart-pane-checkbox-item").each(function() {
							var $self = $(this);
							if( $self.hasClass("betcart-pane-checkbox-item-active") ) {
								$self.find('a, input[type="checkbox"]').removeClass(hiddenClass);
							} else {
								$self.removeClass(hiddenClass);
							}
						});
						if ( o.bankersEnabled ) {
							var bankersCheck = document.getElementById("bankers-activate-checkbox");
							$(bankersCheck).closest(".betcart-pane-bankers").show();
							if ( bankersCheck.checked ) {
								$('input:checkbox', document.getElementById(this.elementType.name + '-pane-events')).each(function(){
									if ( this.checked ) {
										this.readOnly = false;
										this.parentNode.className = $.trim((" " + this.parentNode.className + " ").replace(" readonly "," "));
									} else {
										this.parentNode.style.display = "block";
									}
								});
							}
						}
					}
					
					if( this.elementType.ifbet ) {
//						this.$element.find('.betcart-pane-event-potential').removeClass(hiddenClass);
						this.$element.find('.betcart-pane-event-arrow').removeClass(hiddenClass);
					}
					
					if( this.elementType.teaser ) {
						var _teaserValue =  1 * (this.$element.select.children(':selected').html() + '').replace(' pt', '');
						this.$element.children(':first').children().find('.betcart-pane-event-pick').each(function(){
							var _html = this.innerHTML;
							var _value = _html.replace("\n",'').replace(/.*\((.+)\).*/, '$1');
							if( _value == _html ) {
								_value = _html.split(' ')[1];
								_value = parseFloat(_value) + ( _html.toUpperCase().indexOf('OVER') > -1 ? 1 : -1 ) * _teaserValue;
							} else {
								_value = parseFloat(_value) - _teaserValue;
							}
							var new_html = _html.replace(/(.*)\(.+\)(.*)/, '$1('+ _value +')$2');
							if( new_html == _html ) {
								var _t = _html.split(' ');
								_t[1] = _value;
								new_html = _t.join(' ');
								_t.length = 0;
							}
							this.innerHTML = new_html;
							_value = _html = null;
						});
					}
					var _currentIndex = self.active.indexOf(this.elementType.index);
					for( var k in b ) {
						if( !b.hasOwnProperty(k) || !b[k].size() ) { continue; }
						if( k == 'send' || k == 'clear' ) {
							b[k].eq(_currentIndex).removeClass(hiddenClass);
						} else {
							b[k].eq(_currentIndex).addClass(hiddenClass);
						}
					}
					
					//show navigate and hide message box
					$tabsNav.removeClass(hiddenClass);
					
					$betCart.removeClass('betcart-preview');
					$("#betcard_error_panel").addClass(hiddenClass);
					$("#betcard_error_panel_clone").addClass(hiddenClass);
					
				});
				b.confirm.click(function( e ) {
					$('*').removeClass('autoupdated_parameter');
					
					if( $betCart.hasClass("post-data") ) { return false; }
					e.preventDefault();
					
					$("#betcard_error_panel").addClass(hiddenClass).empty();
					$("#betcard_error_panel_clone, .betcard_error_panel_clone, .betcard-error").addClass(hiddenClass).empty().remove();
					
					var $this = $(this), 
						context = this;
					this.$element = $("#" + $this.closest('.betcart-pane-action').attr("id").replace("-button", ""));
					
					this.elementName = this.$element.attr('id');
					this.elementType = getType( this.elementName );
					this.$element.stake = this.$element.find(".betcart-pane-bottom-stake input");
					this.$element.is_stake_per_bet = this.$element.find(".is_stake_per_bet").val();
					if( !this.$element.stake.size() ){
						this.$element.stake = this.$element.find(".betcart-pane-event-stake input");
					}
					this.$element.close = this.$element.find("a.betcart-pane-event-remove");
					this.$element.close_all = this.$element.find("a.betcart-pane-all-event-remove");
					
					this.$element.select = $("#"+this.elementType.name+"-pane-bottom>.betcart-pane-bottom-select>select");
					
					var dataPost = {
						stake: [],
						oid: [],
						odds: [],
						buypoints: [],
						live: [],
						syst: [],
						banker: [],
						withdraw_type: [],
						lay: [],
						push: this.$element.select.val(),
						accept_higher: [],
						accept_any: [],
						pitchers_action: [],
					};
					
					// TODO: ÐŸÐµÑ‡Ð°Ñ‚ÑŒ ÐºÑƒÐ¿Ð¾Ð½Ð°
					this.$element.find('.betcart-pane-event').each(function(i) {
						var $self = $(this);
						if( context.elementType.single || context.elementType.ifbet ) {
							var stake_value = $self.find(".betcart-pane-event-stake input").val();
							var is_stake_per_bet = $self.find('.betcart-pane-event-stake').hasClass("g-hidden");
							
							if (is_stake_per_bet) {
								var stake_value = $self.parent().parent().find('.betcart-pane-bottom-stake input').val();
							}
							
							if (o.tax_percent) {
								/*stake_value = getAmountWithTaxPercent(stake_value, o.tax_percent);*/
							}

							dataPost.stake.push( stake_value );
						}
						
					
						var $el = $self.closest('.betcart-pane').find("input.data-withdraw-type");
						if ($el.attr('checked')) {
							withdraw_type = 'phone';
						} else {
							withdraw_type = "none";
						}
						
						
						dataPost.oid.push( $self.find("input.data-oid").val() );
						dataPost.odds.push( $self.find("input.data-odds").attr('value') );
						dataPost.buypoints.push( $self.find("input.data-buypoints").val() );
						dataPost.withdraw_type.push( withdraw_type );
						dataPost.lay.push( $self.find("input.data-lay").val() );
						dataPost.pitchers_action.push( $self.find("select.pitcher-action-value").val() ? $self.find("select.pitcher-action-value").val() : "" );
						
						if($self.find("input.data-status").val()=="inprogress") {
							dataPost.live.push( 1 );
						} else {
							dataPost.live.push( 0 );
						}
					});
					
					dataPost.accept_higher = this.$element.find(".accept-high").hasClass('betcart-pane-checkbox-item-active');
					dataPost.accept_any = this.$element.find(".accept-any").hasClass('betcart-pane-checkbox-item-active');
					
					dataPost.print_coupon = this.$element.find("#print_coupon").hasClass('betcart-pane-checkbox-item-active') ? 1 : 0;
					dataPost.sms_coupon = this.$element.find("#sms_coupon").hasClass('betcart-pane-checkbox-item-active') ? 1 : 0;
					
					if( !context.elementType.single && !context.elementType.ifbet ) {
						var stake = this.$element.stake.val()
						if (o.tax_percent) {
							/*stake = getAmountWithTaxPercent(stake, o.tax_percent);*/
						}
						dataPost.stake = stake;
					}
					
					if( context.elementType.system || context.elementType.roundrobin ) {
						$("#"+this.elementType.name+"-pane-checkbox>.betcart-pane-checkbox-item").each(function() {
							dataPost.syst.push( $(this).hasClass('betcart-pane-checkbox-item-active') );
						});
						$("#"+this.elementType.name+"-pane-events .betcart-pane-event-banker label").each(function() {
							dataPost.banker.push( $(this).hasClass('checked') );
						});
					}
					this.$element.find("input.trigger_limits").removeClass("trigger_limits");	
					if(self.$userForm) {
						dataPost = [$.param(dataPost, false), self.$userForm.filter(":visible").serialize()].join('&');

					}
					
					var couldown = 0;
					var showCouldown = b.confirm.data("showCouldown");
					if ( typeof showCouldown == "undefined" ) b.confirm.data("showCouldown", (showCouldown = true));
					
					var $before_place_bet = o.onBeforePlaceBet.call(this, dataPost);
					
					if (!$before_place_bet.status) {
						_alert($before_place_bet.message);
						return;
					}
					
					var fn = function(){
						$.ajax({
							type: "POST",
							url: "getdata.php?sec=" + options.sec + "&subsec=" + this.elementType.name,
							data: dataPost,
							success: function(data) {
								if (!data) {
									_alert('Internal server error. Please try again');
								} else if (data.state == "ok") {
									var desc = data.desc;

									data.additional_message = '';

									if (o.betcart_print_coupon_button) {
										console.log(data);
										data.additional_message = "<a href='javascript:;' onclick='print_coupone("+data.bet+")'>Print ticket</a>";
									}

									if (o.betcart_print_coupon_by_checkbox && data.print_coupon == 1) {
										window.print_coupone(data.bet);
									}

									deinit( templates.response.supplant( templates.responseData[ desc ] ).replace( /<\w+>\s*<\/\w+>/, '' ).supplant(data) );
									
									if (templates.couponTemplate) {
										displayCoupon(templates.couponTemplate.supplant(data));
									}
									$('#btn_refresh_balance').click();

									if (+o.reload_betcart && $('#my-bets.cashout_enabled').length) {
										setTimeout(function() {
											ScriptDoLoad('getdata.php?sec=get_cashout_block', 'my-bets', 1, 1, function() {
												if ($('#betcard').find('.betcart-message').length) {
													$('#betcard').addClass('g-hidden');
												}
											});

										}, o.reload_betcart * 1000);
									}

									$(document).trigger('succes_betcart');
									$('.tab-nav-item').removeClass('ui-state-active');
									if (data.action == "SEND_TO_DEPOSIT") {
										window.location = '/my_account/deposit/'+ data.params.betcart_action_param.deposit_amount+'/';
									}
									
									var print_coupone = function() {
										$('#pdfDocument').attr('src', 'getdata.php?sec=print_ticket&print=1&as_html=1&single=1&bet_ids_json=' + data.bet_ids_json);
										
										if ($('#pdfDocument')[0]) {
											$('#pdfDocument')[0].onload = function(){
												$j('#pdfDocument')[0].contentWindow.print();
											}
										}
									}
									
                                    if ( data.action == "SHOW_LOGOUT_WINDOW" ) {
										if (!o.betcart_print_coupon_by_checkbox) {
											print_coupone();
										}
                                    	
                                        $('#user_activity_window').show();
                                        if ($('#timer').hasClass('epiclock-container')) {
                                            clock.resume();
                                            clock.restart();
                                            clearInterval(check_user_activity);
                                        } else {
                                           clock = $('#timer').epiclock({
                                                mode: $.epiclock.modes.expire,
                                                offset: {
                                                    seconds: 15
                                                },
                                                format: 's'
                                            }).bind('timer', function () {
                                                location.replace('/home.php?status=logout');
                                            }).data('epiclock');
                                            clearInterval(check_user_activity);
                                        }
                                    } else if ( data.action == "PRINT_COUPONE" ) {
										if (!o.betcart_print_coupon_by_checkbox) {
											print_coupone();
										}
                                    }
                                    

									o.onPlaceBet.call(this, dataPost, data);
								} else {
									if (data.state == "NOT_AUTHORIZED_REDIRECT") {
										window.location = data.link;
									} else if (data == "SEND_TO_WITHDRAW_SETTINGS") {
										window.location = '/my_account/withdraw/';
									} else if (data.state == "error") {
										b.confirm.data("showCouldown", false);
										couldown && setTimeout( function(){ b.confirm.data("showCouldown", true); }, 7 * 1000 );
										
										switch ( data.desc ) {
											case "suggest_stakes":
												o.onSuggestStakes.call(this, dataPost, data);
												
												if (o.alert_suggest_stakes) {
													removeBetcartBlock($betCart);
													$('.betcart-pane-action-change').not('.g-hidden').click();
													
													alert(data.msg);
													return;
												}
												
												_alert(data.msg);
												suggest_stakes(data, o);
												highlight_outcomes(data);
											break;
											case "suggest_stakes_with_replace":
												suggestStakesWithReplace(data, o);
												removeBetcartBlock($betCart);
												
												// alert message
												_alert(data.msg);
												
												recalculateTabs();
												highlight_outcomes(data);
												break;
											case "msg":
												_alert(data.msg);
												highlight_outcomes(data);
												break;
											case "conflict_markets":
												_alert(data.msg);
												highlight_outcomes(data, 'betcart-pane-event-conflict-item');
												break;
											case "odds_changed":
												if (o.alert_suggest_stakes) {
													updateOddByOid( data.odds_changed )
														
													if (confirm(o.message["odds_changed"])) {
														removeBetcartBlock($betCart);
														$('.betcart-pane-action-confirm').not('.g-hidden').click();
													}
													
													return;
												}
												

												_alert( data.msg, function(){
													updateOddByOid( data.odds_changed )
												} );
												
												removeBetcartBlock($betCart);
												break;
											case "not_available":
												_alert("not available", function(){
													for (var i = 0, n = data.not_available.length; i < n; i++) {
														var mid = data.not_available[i];
														$("#" + options.idTo + " li.mid" + mid).each(function(){
															$(this).css("color", "red").addClass("not-available");
														});
													}
													$("#" + options.idTo + " .not-available").fadeOut("fast", function(){
														$(this).each(function(){
															var cl = $(this).attr("class"), mid = cl.replace(/.*\bmid(\d+)\b.*/, '$1') , oid = cl.replace(/.*\boid(\d+)\b.*/, '$1');
															self.remove({
																"mid": mid,
																"oid": oid
															});
														});
													});
												});
												break;
											case "trigger_limit":
												var rLimits = data["trigger_limit"];
												_alert(o.message["trigger_limit"], function() {
													if( rLimits[0].oid == 0 ) {
														context.$element
															.find("input.stake")
															.addClass("trigger_limits")
															.val( rLimits[0].limit )
															.triggerHandler('keyup')
														;
													}
													for( var i = 0, n = rLimits.length; i < n; i++ ) {
														
														var $stake = context.$element.find( ".oid" + rLimits[i].oid + " .betcart-pane-event-stake input");
														
														if( !$stake.size() ) {
															$stake = context.$element.children('.betcart-pane-bottom').find('.betcart-pane-bottom-stake input');
														}
														
														$stake
															.addClass("trigger_limits")
															.val( rLimits[i].limit )
															.triggerHandler('keyup')
														;
													}
												});
												break;
											default:
												break;
										}
									} else {
										_alert(_("Internal server error. Please try again"));
									}
								}
							},
							error: function() {
								_alert( _("Internal server error. Please try again") );
								
								$betCart.find('.close_betcard_button').removeClass('betcart-pane-link-disabled');
								$buttons.removeClass('betcart-pane-action-item-disabled');
								$betCart.find('input').removeClass('betcart-pane-action-item-disabled');
								$betCart.find('.betcart-pane-checkbox').removeClass('betcart-pane-action-item-disabled');
								$betCart.removeClass("post-data");
							},
							complete: function(data){
						        var $response = $j.parseJSON(data.responseText);
						        var $desc = $response.desc;
						        
						        $betCart.find('.close_betcard_button').removeClass('betcart-pane-link-disabled');
						        $buttons.removeClass('betcart-pane-action-item-disabled');
						        $betCart.find('input').removeClass('betcart-pane-action-item-disabled');
						        $betCart.find('.betcart-pane-checkbox').removeClass('betcart-pane-action-item-disabled');
						        $betCart.removeClass("post-data");
						    },
							dataType: "json"
						});
					};
					
					var $birs_count = 0, elements = [];
					
					context.$element.find("input.data-odds").each(function() {
						elements.push($(this));
					})
					
					var events_count = getUniqueEventsCount(elements);
					
					for ( var oid in birs ) {
						$birs_count++;
						if ( birs.hasOwnProperty( oid ) ) {
							couldown = Math.max( birs[oid], couldown );
						}
					}
					
					if (events_count > 2) {
						couldown = 0;
					}
					
					$betCart.addClass("post-data");
					
					$buttons.addClass('betcart-pane-action-item-disabled');
					$betCart.find('input').addClass('betcart-pane-action-item-disabled');
					$betCart.find('.close_betcard_button').addClass('betcart-pane-link-disabled');
					$betCart.find('.betcart-pane-checkbox').addClass('betcart-pane-action-item-disabled');
					var message = "<span class='confirmed_message'>" + _(o.confirmed_message) + "</span>";
					if ( couldown && showCouldown  && !o.mobi_theme) {
						if (self.couldown) {
							clearInterval(self.couldown);
						}
						
						self.couldown = _addCouldown($.proxy(function(){
							fn.call(this);
							
							clearInterval(self.couldown);
							
						}, this), couldown, message, "betcart-couldown-orange", options.static_couldown);
					} else {
						if (o.mobi_theme) {
							var $couldown_box = $("#betcard_couldown_panel");
							if ( !$couldown_box.length ) {
								$couldown_box = $('#tab-nav').after('<div id="betcard_couldown_panel" class="betcard-couldown"/>').next();
							}
			
							$("#betcard_couldown_panel").removeAttr("class").addClass("betcard-couldown " + 'betcart-couldown-orange').html(  message + " " + couldown + " " +  _('sec') );	
						}
						

						fn.call(this);
						
					}
					
				});
							
			};
		
			function init() {
				var subsec = $.extend(o.subsec, {});
				self = this;
				this.countEvents = 0;
				this.active = [];
				this.disabled = [];
				this.enabled = [];
				this.countTabs = 0;
				this.minItem = Number.MAX_VALUE;
				this.maxItem = Number.MIN_VALUE;
				this.betCartHTML = {
					nav: ['<ul '+ templates.betCartNavAttr +'>'],
					pane: []
				};

				betcartPostErrorCatch();
				
				/* Fix double init betcart */
				jQuery('.b-betcart__out_clone').addClass("g-hidden");
				jQuery('#my-bets').hide();

				for( var i = 0, n = templates.tabs.length; i < n; i++ ) {
					var nav = templates.tabs[i].nav.supplant(subsec);
					
					if( /id="tab-nav-item-{[^}]+}"/.test( nav ) ) {continue;}
					var bet_type = getBetType(nav);
					
					this.active.push(i);
					if (bet_type == o.selected_bet_type) {
						this.betCartHTML.nav.push( nav.supplant( {index : i+1,  selected : 'ui-tabs-selected ui-state-active'} ) );
					} else {
						this.betCartHTML.nav.push( nav.supplant( {index : i+1} ) );
					}
					
					if(o.userForm && !o.subsec.form) {
						o.subsec.form = o.userForm;
					} 
					
					if ($j.cookie('accept_high') || $j.cookie('accept_any') || $j.cookie('print_coupon')) {
						o.subsec.accept_high_selected = $j.cookie('accept_high') == '1' ? 'betcart-pane-checkbox-item-active' : 'no-act';
						o.subsec.accept_any_selected = $j.cookie('accept_any') == '1' ? 'betcart-pane-checkbox-item-active' : 'no-act';
						o.subsec.print_coupon_selected = $j.cookie('print_coupon') == '1' ? 'betcart-pane-checkbox-item-active' : 'no-act';
					}
					
					o.subsec.sms_coupon = parseInt(o.sms_coupon) 		? "1" : "0";
					o.subsec.print_coupon = parseInt(o.print_coupon) 	? "1" : "0";
					
					if (o.subsec.sms_coupon == '1') {
						o.subsec.sms_coupon_check = "betcart-pane-checkbox-item-active";
					}
					if (o.subsec.print_coupon == '1') {
						o.subsec.print_coupon_check = "betcart-pane-checkbox-item-active";
					}
					
					if (bet_type == o.selected_bet_type) {
						o.subsec.default_stake =  o.default_stake;
					} else {
						o.subsec.default_stake = '0.00';
					}
					
					o.subsec.sportsbook_exchange_mode = o.sportsbook_exchange_mode ? 1 : 0;
					
					this.betCartHTML.pane.push( templates.tabs[i].pane.supplant( o.subsec ) );
					
					if ( templates.tabs[i].minItems !== 0) {
						this.disabled.push(this.countTabs);
					} else {
						this.enabled.push(this.countTabs);
					}

					if( this.minItem > templates.tabs[i].minItems ){
						this.minItem = templates.tabs[i].minItems;
					}
					if( this.maxItem < templates.tabs[i].minItems ){
						this.maxItem = templates.tabs[i].minItems;
					}
					this.countTabs++;
				}
				
				this.betCartHTML.nav.push( '</ul>' );
				
				this.betCartHTML = this.betCartHTML.nav.join('')+ this.betCartHTML.pane.join('');
				
				$("#"+o.idTo).html( templates.betCart.supplant({ title: templates.betCartTitle, betcart: this.betCartHTML.supplant({currency: o.currency}) }) ).removeClass('g-hidden').removeClass('betcard__deinit');
				$betCart = $("#"+options.idTo+"-body").addClass('betcart-body').tabs({
					select: this.enabled[0],
					disabled: this.disabled
				});

				if( o.userForm ) { this.$userForm = o.initUserForm instanceof Function ? o.initUserForm() : null ; }
				
				$tabsNav = $("ul.ui-tabs-nav", $betCart);
				$betCartPane = $betCart.children(".betcart-pane");
				
				$buttons = $(".betcart-pane-action-item", $betCart);
					
				createButtons({
					clear: $buttons.filter(".betcart-pane-action-clear"),
					send: $buttons.filter(".betcart-pane-action-send"),
					change: $buttons.filter(".betcart-pane-action-change"),
					confirm: $buttons.filter(".betcart-pane-action-confirm"),
					accept: $buttons.filter(".betcart-pane-action-accept")
				});
				
				$betCart.attr("init", true);
				
				if ( o.bankersEnabled ) {
					$betCart.addClass("betcart-bankers-enabled");
				}
				
				o.teaser.index = getType( o.subsec.teaser ).index;
				
				o.buypoints = o.buypoints && o.type == "US";
				
				this.insert = function ( data ) {
					removeErrorsPanels();

					if (!data) {
						return;
					}
					
					if ( this.countEvents === o.maxevent ) {
						removeLastElementsFromCookie(o.maxevent);
						_alert(o.message.maxevent);
						
						var oid = data.oid;
						$('#' + oid).removeClass("selected");
						
						return false;
					} else {
						removeErrorsPanels();
					}

					this.countEvents++;
					var $count_events = this.countEvents;
					
					data.restrinctions_error = false;
					
					$('.picks_count').html(this.countEvents);

					var event_id = parseInt(data.mid);
					var is_event_allow_to_be_combined 	= data.allowed_bet_type !== "single" || data.event_status === "inprogress";// || event_id.indexOf(o.mix_parlay_events);//(o.mix_parlay_events.length > 0 && event_id.indexOf(o.mix_parlay_events) !== -1) || data.event_status === "inprogress";
					var is_allow_check_mix_parlay 		= o.mix_parlay_events && this.countEvents > 1;
					var is_single_event_exist 			= $betCart.find('#combined-pane').find('.betcart-pane-event.enable_single').length;
					
					if ( data.event_status === "inprogress" ) {
						birs[data.oid] = ~~data.bir_delay;
					}

					if (is_allow_check_mix_parlay) {
						if (is_single_event_exist) {
							deinit();
							init();
						} else if (is_event_allow_to_be_combined) {
							// ok
						} else {
							if( $betCart.hasClass("post-data") ) { return false; }
							deinit();
							init();
						}
					}
					
					// apply pitchers dropdown
					data.pitchers = getPitchersSelectbox(data.pitchers);
					data.additional_class = data.pitchers ? "pitchers_block" : "";

					$betCartPane.each(function(i) {
						var tab_type = getTabByIndex(o.sportsbook_bet_types, i);
						var $tab = templates.tabs[self.active[i]];
						
						//CLUDGE: replare getCountEvents() to $count_events
						if ( !(o.onlyOneItemInSingle && !i) && getCountEvents() >= $tab.minItems && self.active[i] !== o.teaser.index ) {
							$betCart.tabs('enable', i);
							saveTab("combined");
						} else if ( self.active[i] === o.teaser.index ) {
							
							if( !self.Teaser ) {
								self.Teaser = new Teaser(this);
							}
							
							self.Teaser.setEnabled( self.Teaser.isTeaser(data) );

							if( self.Teaser.isEnabled() ) {
								
								if ( self.countEvents >= templates.tabs[ o.teaser.index ].minItems && self.Teaser.isDisabled() ) {
									self.Teaser.enable();
								} else if( self.countEvents < templates.tabs[ o.teaser.index ].minItems && !self.Teaser.isDisabled() ) {
									self.Teaser.disable();
								}
															
							} else if( !self.Teaser.isDisabled() ) {
								self.Teaser.disable();
							}
						}
						
						this.$element = $(this);
						this.elementName = $(this).attr("id");
						this.elementType = getType( this.elementName );
						this.$eventList = $('#' + this.elementType.name + '-pane-events');
						this.$eventListSingle = $('#single-pane-events');
						data.currency = o.currency;
						
						var converted_type = data.type.indexOf(o.unconvertible_types) !== -1 ? 'EU' : o.type;
						
						data.coeff = o.type == 'EU' || o.type == 'HK' ? d2( Math.round( transformCoeff( data.odds, converted_type ) * 100) / 100 ) :  transformCoeff( data.odds, converted_type );
						
						if (data && o.us_odd_format_with_plus && o.type == 'US' && data.coeff > 0) {
							data.coeff = "+" + data.coeff;
						}
						
						if (data && data.beton_val && o.us_odd_format_with_plus  && data.type == 'ah' && data.beton_val > 0) {
							data.beton_val = "+" + data.beton_val.toString().replace('+', '');
						}
						
						data = convertData(data, o);


						data.first_half = data.scope != 'fe';
						data.buypoints_select = "";
						var is_live = data.event_status == 'inprogress';
						
						if(!is_live && !data.first_half && (data.type == 'ou' || data.type == 'ah') && o.buypoints && self.active[i] !== o.teaser.index && Teaser.isTeaserSport( data.sport) ) {
							data.beton_val *= 1;
							var buypoints_select = ['<div class="betcart-pane-event-buypoints"><select>'],
								american_coeff = transformCoeff(data.odds, o.type) + o.buypoints_charge,
								decimal_coeff = data.odds,
								nbsp = reFloatQ.test(data.beton_val) ? '&nbsp;&nbsp;&nbsp;' : '&nbsp;&nbsp;',
								/* @TODO: modify condition */
								sign = data.beton.toLowerCase() === 'over' ? -1 : 1;

							var iteration = 0, test = 0;
							var sport_extra = o.buypoints_extra_charge_20[data.sport] || [];
							var sport_ignored = o.buypoints_ignored[data.sport] || [];
							
							for(var j = data.beton_val, n = data.beton_val + sign*o.buypoints_spread; sign*(j - n) <=0; j += sign*o.buypoints_step ) {
								var allowance = j > 0 && data.type == 'ah' ? '+' + j : j;								
								var next_allowance = j + sign*o.buypoints_step;
								var allowance_abs = Math.abs(allowance);
								
								
								var parameter = sign*( (j) - data.beton_val) / o.buypoints_step;
								
								var next_allowance_abs = Math.abs(next_allowance);
								var charge = o.buypoints_charge;
								var is_current_in = sport_extra.indexOf(allowance_abs) !== -1;
								var is_next_in = sport_extra.indexOf(next_allowance_abs) !== -1;
								
								if (is_current_in && is_next_in) {
									var next_charge = 10;
								} else {
									var next_charge = 0;
								}
								
								american_coeff -= charge;

								
								if(!sport_extra && o.buypoints_extra && j != data.beton_val && (Math.abs( data.beton_val ) == 3 || Math.abs( data.beton_val ) == 7) && data.sport == 'rg' && data.type == 'ah' ) {
									american_coeff -= charge;
								}

								if( Math.abs(american_coeff) < 100 ) {
									american_coeff -= 200;
								}
								
								decimal_coeff = transformCoeff(american_coeff, o.type, true);
								
								
								
								if( !/\./.test(allowance) ) {
									allowance += nbsp;
								}
								
								if (sport_ignored.indexOf(allowance_abs) == -1) {
									buypoints_select.push( ('<option value="' + decimal_coeff + '#' + parameter + '">'+ allowance +'&nbsp;' + american_coeff + '</option>').replace(/-/g, '&minus;') );
								}
								
								
								american_coeff -= next_charge;
								iteration++;
							}
							
							buypoints_select.push('</select></div>');
							
							if (o.descriptionDelimiterEnabled) {
								data.event_pick = '<div class="betcart-pane-event-pick-' + data.type + '-team">' + data.beton + '</div>';
							} else {
								data.event_pick = '<span class="betcart-pane-event-pick-' + data.type + '-team">' + data.beton + '</span>';
							}
							if (o.pitchersEnable) {
								data.buypoints_select = buypoints_select.join('');
							} else {
								data.coeff = buypoints_select.join('');
							}
								
						}
						
						data.first_half *= 1;
						data.pure_event = $.trim(data.event.replace(/\(first-half\)/, ''));
						
						data.index = self.countEvents - 1;
						data.ifbet = 1 === self.countEvents ? 'ifbet="true"': '';
						
						this.tmpBetOnVal = data.beton_val != undefined ? data.beton_val : 3.33;
						data.beton_val = 100 * Math.abs( this.tmpBetOnVal );
						
//						if ( data.scope ) {
//                            data.event += (', ' + data.scope).toUpperCase();
//                            delete data.scope;
//						}
						
						if (o.sportsbook_exchange_mode) {
							data.event_lay = getEventLay(data.lay);
						} else {
							data.event_lay = '';
						}
						
						if (!data.popular_code) {
							data.ins_popular_code = '';
						} else {
							data.ins_popular_code = ' - ' + data.popular_code;
						}

						this.elementHTML = templates.tabs[self.active[i]].item.supplant(data);

						if(this.tmpBetOnVal){
							data.beton_val = this.tmpBetOnVal;
							this.tmpBetOnVal = null;
						}
						var $eventListItem = $(this.elementHTML), 
							$eventListLastItemWithCurrentMID;
						
						if ( o.multyOutcomes && ($eventListLastItemWithCurrentMID = this.$eventList.find(".mid" + data.mid + ":last")).length ) {
							$eventListItem.insertAfter( $eventListLastItemWithCurrentMID );
							this.$eventList
								.find(".mid" + data.mid)
								.addClass("betcart-pane-event-group")
								.first()
								.addClass("betcart-pane-event-group-first")
								;
						} else {
							if (o.betcart_add_events_before) {
								$eventListItem.prependTo( this.$eventList );
							} else {
								$eventListItem.appendTo( this.$eventList );
							}
						}

						if (o.betcart_parlay_types_restrictions) {
                            var betcart_restrictions = null;
                            var sport_name = '';
                            var restriction_sport = '';

                            if (o.betcart_parlay_types_restrictions['default']) {
                                betcart_restrictions = o.betcart_parlay_types_restrictions['default'];
                            }
                            if (o.betcart_parlay_types_restrictions[data.sport]) {
                                betcart_restrictions = o.betcart_parlay_types_restrictions[data.sport];
                                sport_name = ' for ' + data.sport_name;
                                restriction_sport =  '.sport' + data.sport;
                            }
                            if (betcart_restrictions && betcart_restrictions[data.type] && betcart_restrictions[data.type] < this.$eventList.find(".type" + data.type + restriction_sport).length) {
                                this.$eventList.find("a.oid" + data.oid).bind('click', function (e) {
                                    e.preventDefault();
                                    self.remove(data);
                                }).removeClass("oid" + data.oid).click();

                                _alert('You can add maximum ' + betcart_restrictions[data.type] + ' picks on ' + data.event_type + sport_name + '.');
                                data.restrinctions_error = true;
                            }
						}
							
						$eventListItem.find("a.oid"+data.oid).bind('click', function(e){
							e.preventDefault();
							self.remove(data);
						}).removeClass("oid"+data.oid);
						
						$eventListItem.find("a.betcart-pane-all-event-remove").bind('click', function(e){
							e.preventDefault();
							self.remove_event(data);
						}).removeClass("oid"+data.oid);
						
						if ( o.conflict_mod_outright ) {
							var $events = getEvents();
							
							for (list_event in $events) {
								var $current_event = $events[list_event];
								var $type = getEventValue($current_event, typeDefinition);
								
								if ($type == 'out' && $events.length > 1) {
									_alert('Outrights could not be combined with other types');
									this.$eventListConflictOutright =  this.$eventList.find('.betcart-pane-event');
								}
							}
						}
						
						if( self.countEvents === 1 || !this.$eventList.children('.betcart-pane-event:first-child').hasClass('betcart-pane-event-first-child') ) {
							this.$eventList.children('.betcart-pane-event:first-child').addClass('betcart-pane-event-first-child');	
						}
						
						this.$eventList.children('.betcart-pane-event:last-child').addClass('betcart-pane-event-last-child').prev().removeClass('betcart-pane-event-last-child');
						this.$eventListConflict = this.$eventList.children( ".mid" + data.mid );
						
						if( o.conflict_mod == 'disable_only_mn_sp' && this.$eventListConflict.size() > 1 ) {
							var SPORTS = { 'ba': 1, 'rg': 1, 'bb': 1 };
							var TYPES = {'12': 1, 'g12': 1, '1x2': 1, 'ah': 1, 'ou' : 1 };

							var 
								sole = parseInt((new Date()).getTime()).toString(36).toUpperCase(),
								spread = spread1H = spreadFT = false,
								total1H = totalFT = false,
								moneline = false;
							;

							this.$eventListConflict.addClass('conflict'+sole).each(function() {
								var $item = $j(this);
								var 
									params = this.className,
									type = params.replace(/.*type(\S+).*/, '$1'),
									sport = params.replace(/.*sport(\S+).*/, '$1'),
									scope = params.replace(/.*scope(\S+).*/, '$1')
								;
								if( sport in SPORTS ) {
									$item.attr('conflict_event_sport', sport);
									$item.removeClass('conflict'+sole);
									
									spread = type == 'ah';
									if( spread ) {
										$item.addClass('spread'+sole);	
									}
									spread1H = type == 'ah' && scope != 'fe';
									if( spread1H ) {
										$item.addClass('spread1H'+sole);	
									}
									
									spreadFT = type == 'ah' && scope == 'fe';
									if( spreadFT ) {
										$item.addClass('spreadFT'+sole);	
									}
									
									total1H = type == 'ou' && scope != 'fe';
									if( total1H ) {
										$item.addClass('total1H'+sole);	
									}
											
									totalFT = type == 'ou' && scope == 'fe';
									if( totalFT ) {
										$item.addClass('totalFT'+sole);	
									}
									
									moneline = (type == '1x2' || type == '12' || type == 'g12');
									if( moneline ) {
										$item.addClass('moneline'+sole);	
									}

									moneline1H = (type == '1x2' || type == '12' || type == 'g12') && scope != 'fe';
									if( moneline1H ) {
										$item.addClass('moneline1H'+sole);
									}

									monelineFT = (type == '1x2' || type == '12') && scope == 'fe';
									if( monelineFT ) {
										$item.addClass('monelineFT'+sole);
									}

								} 
							});

							var items = this.$eventListConflict;

							var spreadItems = items.filter('.spread'+sole);
							var monelineItems = items.filter('.moneline'+sole);
							var conflict_event_sport = items.attr('conflict_event_sport');
							
							if( spreadItems.size() && monelineItems.size() ) {
								spreadItems.removeClass('spread'+sole).addClass('conflict'+sole);
								monelineItems.removeClass('moneline'+sole).addClass('conflict'+sole);
							} 

							var spread1HItems = spreadItems.filter('.spread1H'+sole);
							var spreadFTItems = spreadItems.filter('.spreadFT'+sole);

							if( spread1HItems.size() && spreadFTItems.size() ) {
								spread1HItems.removeClass('spread1H'+sole).addClass('conflict'+sole);
								spreadFTItems.removeClass('spreadFT'+sole).addClass('conflict'+sole);
							}

							var total1HItems = items.filter('.total1H'+sole);
							var totalFTItems = items.filter('.totalFT'+sole);

							if( total1HItems.size() && totalFTItems.size() ) {
								total1HItems.removeClass('total1H'+sole).addClass('conflict'+sole);
								totalFTItems.removeClass('totalFT'+sole).addClass('conflict'+sole);
							} 

							var moneline1HItems = items.filter('.moneline1H'+sole);
							var monelineFTItems = items.filter('.monelineFT'+sole);

							if( moneline1HItems.size() && monelineFTItems.size() && sport == 'ba') {
								moneline1HItems.removeClass('total1H'+sole).addClass('conflict'+sole);
								monelineFTItems.removeClass('totalFT'+sole).addClass('conflict'+sole);
//								moneline1HItems.removeClass('monelineFT'+sole).addClass('conflict'+sole);
//								moneline1HItems.removeClass('moneline1H'+sole).addClass('conflict'+sole);
							}

							//new
							if( spreadFTItems.size() && totalFTItems.size() && conflict_event_sport == 'ba') {
								var restrictions = $.parseJSON(options.additional_betcart_restrictions);
								
								if (restrictions.ba && restrictions.ba.indexOf('ah_ou') >= 0) {
									spreadFTItems.removeClass('spreadFT'+sole).addClass('conflict'+sole);
									totalFTItems.removeClass('totalFT'+sole).addClass('conflict'+sole);
								}
							}
							
							this.$eventListConflict = this.$eventListConflict.filter('.conflict'+sole).removeClass('conflict'+sole);
						};
						
						if (o.conflict_mod == 'disable_small_odd') {
							
							if ( this.$eventListConflict.size() > 1 ) {
								
								var 
									sole = parseInt((new Date()).getTime()).toString(36).toUpperCase(),
									monelineFT = moneline1H = false;
								;
	
								this.$eventListConflict.addClass('conflict'+sole).each(function() {
									var $item = $j(this);
									var 
										params = this.className,
										type = params.replace(/.*type(\S+).*/, '$1'),
										scope = params.replace(/.*scope(\S+).*/, '$1')
									;
										
									$item.removeClass('conflict'+sole);
										
									moneline1H = (type == '1x2' || type == '12' ||  type == 'g12') && scope != 'fe';
									if( monelineFT ) {
										$item.addClass('moneline1H'+sole);	
									}
									monelineFT = (type == '1x2' || type == '12') && scope == 'fe';
									if( monelineFT ) {
										$item.addClass('monelineFT'+sole);	
									}
										
								});
	
								var items = this.$eventListConflict;

								var moneline1HItems = items.filter('.moneline1H'+sole);
								var monelineFTItems = items.filter('.monelineFT'+sole);
	
								if( moneline1HItems.size() && monelineFTItems.size() ) {
									moneline1HItems.removeClass('total1H'+sole).addClass('conflict'+sole);
									monelineFTItems.removeClass('totalFT'+sole).addClass('conflict'+sole);
								} 
	
								this.$eventListConflict = this.$eventListConflict.filter('.conflict'+sole).removeClass('conflict'+sole);
								
							}
							
							var $last = this.$eventList.children('.betcart-pane-event:last-child');
							if ( $last.find('input.data-odds').val() <= 1.2 ) {
								$last.addClass("betcart-pane-event-conflict-item");
								this.$eventList.addClass("betcart-pane-event-conflict");
								if( o.allowConflict ) { this.$eventList.addClass("betcart-pane-event-conflict-allow"); }
							}
							$last = null;
						}
						
						/**
						 * 
						 * ÐŸÐ¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ - Ð²ÑÐµ ÐºÐ¾Ð½Ñ„Ð»Ð¸ÐºÑ‚
						 * Ð•ÑÐ»Ð¸ Ñ†Ð¸Ñ„Ñ€Ñ‹ Ð½Ðµ ÑÑ…Ð¾Ð´ÑÑ‚ÑÑ - Ñ‚Ð¾ ÐºÐ¾Ð½Ñ„Ð»Ð¸ÐºÑ‚Ð° Ð½ÐµÑ‚
						 */
						// start check market restrictions
						
						if (tab_type == 'combined' && o.market_restrictions) {
							this.$eventListConflict = [];
							
							if (o.market_restriction_sport) {
								var all_types 		= getBetcartElements($betCart, o.market_restriction_sport, typeDefinition).elements;
								var all_events 		= getBetcartElements($betCart, o.market_restriction_sport, eventDefinition).elements;
								var types_by_events = getBetcartElements($betCart, o.market_restriction_sport, typeDefinition, eventDefinition).groups;
							}
							
							
							$betCart.find('.betcart-pane-event').removeClass('betcart-pane-event-conflict-item');
							
							var need_code 			= null;
							var error_found 		= false;
							var restriction_groups 	= {};
							
							// add new added event in ckecking collection
							if ($.inArray(data.mid, all_events) == '-1') {
								all_events.push(data.mid);
							}

							// add new added market in ckecking collection
							if ($.inArray(data.type, all_types) == '-1') {
								all_types.push(data.type);
							}
							
							// add new added market in ckecking collection
							if (!types_by_events[data.mid]) {
								types_by_events[data.mid] = [];
							}
							if ($.inArray(data.type, types_by_events[data.mid]) == '-1') {
								types_by_events[data.mid].push(data.type);
							}
							
							for (event_id in types_by_events) {
								restriction_groups[event_id] 	= {};
								
								// each market in restriction table
								for (restriction_code in o.market_restrictions) {
									// set 0 to restriction code for event
									restriction_groups[event_id][restriction_code] = 0;
									
									// get restricted markets for this type
									var restriction_markets = o.market_restrictions[restriction_code];
									
									for (checked_type_key in types_by_events[event_id]) {
										var checked_type = types_by_events[event_id][checked_type_key];
										
										if (in_array(checked_type, restriction_markets)) { 
											restriction_groups[event_id][restriction_code]++;
										}
											
									}
									
								}
								
							}
							
							// display errors
							for (event_id in restriction_groups) {
								var restriction_group = restriction_groups[event_id];
								
								for (restriction_code in restriction_group) {
									if (restriction_group[restriction_code] > 1) {
										
										var restriction_markets = o.market_restrictions[restriction_code];
										
										for (restriction_market_key in restriction_markets) {
											var restriction_market = restriction_markets[restriction_market_key];
											
											var $error_identifier = '.sport'+options.market_restriction_sport+'.type'+restriction_market+'.mid' + event_id;
											
											$betCart.find($error_identifier).addClass('betcart-pane-event-conflict-item');
											
											_alert('Highlighted picks could not be combined.');
											
										}
									}
								}
							}
						}
						
						if ( !this.elementType.single ) {
							if ( this.$eventListConflict.length > 1 && !o.allowConflict  ) {
								this.$eventListConflict.addClass("betcart-pane-event-conflict-item");
								this.$eventList.addClass("betcart-pane-event-conflict");
								this.$eventList.addClass("betcart-pane-event-conflict-allow");
							}
							if ( o.conflict_mod_outright && this.$eventListConflictOutright ) {
								this.$eventListConflictOutright.addClass("betcart-pane-event-conflict-item");
								this.$eventList.addClass("betcart-pane-event-conflict");
								this.$eventList.addClass("betcart-pane-event-conflict-allow");
							}
						}

						if( self.active[i] === o.teaser.index && self.Teaser.isEnabled() ) {
							new calculate(this);
						} else if ( self.active[i] !== o.teaser.index ) {
							new calculate(this);
						}

					});

					if (data.restrinctions_error) {
						return false;
					}

					if ( o.onlyOneItemInSingle && $count_events > 1) {
						$betCart.tabs( "select", 1 ).tabs( "disable", 0 );
						if ($count_events == 2) {
							$betCart.tabs( "select", 1 ).tabs( "disable", 0 );
						} else {
							var selected_tab_index = getIndexByTab(o.sportsbook_bet_types, o.selected_bet_type);
							$betCart.tabs( "select", selected_tab_index ).tabs( "disable", 0 );
						}
						
					}
					
					_success(o.message.pick_added);

					o.onInsert.call(this, $betCart, this.countEvents);
					
					//recalculate all tabs
					for (var tab_index = 0;tab_index < 3; tab_index++) {
						var tab_type = getTabByIndex(o.sportsbook_bet_types, tab_index);
						recalculateTab(tab_type);
					}
				
					return this;
				};
				
				this.update = function(data) {
					//TODO
					if ( data.event_status === "inprogress" ) {
						birs[data.oid] = ~~data.bir_delay;
					}
					
					var is_type_difficult = isTypeDifficult(data.type); 
					var finding = (data.type == 'out' || is_type_difficult ? '.market_id'+data.market_id : '') + '.mid' + data.mid + ".type" + data.type + ".scope" + data.scope;
					
					if (!is_type_difficult) {
						finding += ".allowance" + ( data.beton_val != undefined ? 100 * Math.abs(data.beton_val) : 333 );
					}

					$betCart.find( finding ).each(function(i) {
						
						var $this = $(this);
						
						if ( i == 0) {
							delete birs[ /oid(\d+)/.exec(this.className)[1] ];
						}

						this.className = this.className.replace(/oid\d+/, 'oid' + data.oid);

						var buypoints = false;
					
						if (o.sportsbook_exchange_mode) {
							data.event_lay = data.lay;
						} else {
							data.event_lay = '';
						}
						
						if (data.type == '1x2' || data.type == '12') {
							data.event_type = _('Match Win');
							data.event_pick = data.beton;
						} else if (data.type == 'g12') {
							data.event_type = _('Next Game');
							data.event_pick = data.beton;
						} else if (data.type == '1x2ex' || data.type == '12ex') {
							data.event_pick = data.beton;
						} else if (data.type == 'ou') {
							data.event_type = _('Over/Under');
							data.event_pick = data.beton + ' ' + data.beton_val;
                        } else if (~['yellowou', 'yellowouaway', 'yellowouhome', 'attempsou', 'foulsou', 'goalminou', 'offsidesou', 'subou'].indexOf(data.type)) {
                            data.event_type = data.type_title;
                            data.event_pick = data.beton + ' ' + data.beton_val;
                        } else if (~['goalmin'].indexOf(data.type)) {
                            data.type_title = data.type_title + ', ' + data.beton_val;
                            data.event_pick = data.beton;
						} else  if (data.type == 'ah') {
							data.event_type = _('Handicap');
							data.event_pick = '<div class="betcart-pane-event-pick-ah-team">' + data.beton + '</div><div class="betcart-pane-event-pick-ah-coeff">' + '(' + data.beton_val + ')' + '</div>';
                        } else if (data.type == 'yellowah') {
                            data.event_type = data.type_title;
                            data.event_pick = '<div class="betcart-pane-event-pick-ah-team">' + data.beton + '</div><div class="betcart-pane-event-pick-ah-coeff">' + '(' + data.beton_val + ')' + '</div>';
                        } else if (data.type == 'oe') {
							data.event_type = _('Odd/Even');
							data.event_pick = data.beton;	
						} else if (data.type == 'wm') {
							data.event_type = _('Winnig Margins');
							data.event_pick = data.beton;
						} else if (data.type == 'fts') {
							data.event_type = _('First team to score');
							data.event_pick = data.beton;
						} else if (data.type == 'lts') {
							data.event_type = _('Last team to score');
							data.event_pick = data.beton;
						} else if (data.type == 'mbt') {
							data.event_type = _('Match bet + total');
							data.event_pick = data.beton;
						} else if (data.type == 'mfl') {
							data.event_type = _('Match flow');
							data.event_pick = data.beton;
						} else if (data.type == 'hsp') {
							data.event_type = _('Highest scoring period');
							data.event_pick = data.beton;
						} else if (data.type == 'hsph') {
							data.event_type = _('Highest scoring period home');
							data.event_pick = data.beton;
						} else if (data.type == 'hspa') {
							data.event_type = _('Highest scoring period away');
							data.event_pick = data.beton;
						} else if (data.type == 'hwb') {
							data.event_type = _('Home to win both halves?');
							data.event_pick = data.beton;
						} else if (data.type == 'hwe') {
							data.event_type = _('Home to win either half?');
							data.event_pick = data.beton;
						} else if (data.type == 'hsb') {
							data.event_type = _('Home to score in both halves?');
							data.event_pick = data.beton;
						} else if (data.type == 'awb') {
							data.event_type = _('Away to win both halves?');
							data.event_pick = data.beton;
						} else if (data.type == 'awe') {
							data.event_type = _('Away to win either half?');
							data.event_pick = data.beton;
						} else if (data.type == 'asb') {
							data.event_type = _('Away to score in both halves?');
							data.event_pick = data.beton;
						} else if (data.type == 'bho15') {
							data.event_type = _('Both halves over 1.5?');
							data.event_pick = data.beton;
						} else if (data.type == 'bhu15') {
							data.event_type = _('Both halves under 1.5?');
							data.event_pick = data.beton;
						} else if (data.type == 'cs') {
							data.event_type = _('Correct Score');
							data.event_pick = data.beton;
						} else if (data.type == 'gcs') {
							data.event_type = _("Score in game");
							data.event_pick = data.beton;
						} else if (data.type == 'c1x2') {
							data.event_type = _("Corner matchbet");
							data.event_pick = data.beton;
						} else if (data.type == 'cou') {
							data.event_type = _("Total corners");
							data.event_pick = data.beton;
						} else if (data.type == 'cah') {
							data.event_type = _("Corner handicap");
							data.event_pick = data.beton;
						} else if (data.type == 'cfts') {
							data.event_type = _("First corner");
							data.event_pick = data.beton;
						} else if (data.type == 'clts') {
							data.event_type = _("Last corner");
							data.event_pick = data.beton;
						} else if (data.type == 'coe') {
							data.event_type = _("Corner Odd/Even");
							data.event_pick = data.beton;
						} else if (data.type == 'cng') {
							data.event_type = _("Corner Total (Aggregated)");
							data.event_pick = data.beton;
						} else if (data.type == 'cngh') {
							data.event_type = _("Home Team Number of Corners");
							data.event_pick = data.beton;
						} else if (data.type == 'cnga') {
							data.event_type = _("Away Team Number of Corners");
							data.event_pick = data.beton;
						} else if (data.type == 'hf') {
							data.event_type = _('Half Time / Full Time');
							data.event_pick = data.beton;
						} else if (data.type == 'tg') {
							data.event_type = _('Total Goals');
							data.event_pick = data.beton;
						} else if (data.type == 'tga') {
							data.event_type = _('Away team total Goals');
							data.event_pick = data.beton;
						} else if (data.type == 'tgh') {
							data.event_type = _('Home team total Goals');
							data.event_pick = data.beton;
						} else if (data.type == 'ng') {
							data.event_type = _('Number of goals');
							data.event_pick = data.beton;
						} else if (data.type == 'nga') {
							data.event_type = _('Away team number of goals');
							data.event_pick = data.beton;
						} else if (data.type == 'ngh') {
							data.event_type = _('Home team number of goals');
							data.event_pick = data.beton;
						} else if (data.type == 'out') {
							data.event_type = data.beton.split("::")[0];
							data.event_pick = (data.beton+"::"+data.beton).split("::")[1];
						} else if (data.type == 'dc') {
							data.event_type = _('Double Chance');
							data.event_pick = data.beton;
						} else if (data.type == '1x2ah') {
							data.event_type = _('Three-way handicap');
							data.event_pick = '<div class="betcart-pane-event-pick-ah-team">' + data.beton + '</div><div class="betcart-pane-event-pick-ah-coeff">' + '(' + data.beton_val + ')' + '</div>';
						} else if (data.type == 'gng') {
							data.event_type = _('GG / NG');
							data.event_pick = data.beton;
						} else if (data.type == 'gngh') {
							data.event_type = _('GG / NG') + ' ' + '(' + _('Home') + ')';
							data.event_pick = data.beton;
						} else if (data.type == 'gnga') {
							data.event_type = _('GG / NG') + ' ' + '(' + _('Away') + ')';
							data.event_pick = data.beton;
						} else if (data.type == 'mg') {
							data.event_type = _('Multi goals');
							data.event_pick = data.beton;
						} else if (data.type == 'next') {
							data.event_type = _('Next goal');
							data.event_pick = data.beton;
						} else if (data.type == 'rest') {
							data.event_type = _('Who wins the rest of the match');
							data.event_pick = data.beton;
						} else if (data.type == 'restah') {
							data.event_type = _('Asian handicap (rest)');
							data.event_pick = '<div class="betcart-pane-event-pick-ah-team">' + data.beton + '</div><div class="betcart-pane-event-pick-ah-coeff">' + '(' + data.beton_val + ')' + '</div>';
						} else if (data.type == 'couh') {
							data.event_type = _('Over/Under corners') + ' ' + _('Home');
							data.event_pick = data.beton;
						} else if (data.type == 'coua') {
							data.event_type = _('Over/Under corners') + ' ' + _('Away');
							data.event_pick = data.beton;
						} else if (data.type == 'gs') {
							data.event_type = _('Score of game');
							data.event_pick = data.beton;
						} else if (data.type == 'gsb') {
							data.event_type = _('Score of game or break');
							data.event_pick = data.beton;
						} else if (data.type == 'pso') {
							data.event_type = _('Which team will win the penalty shootout?');
							data.event_pick = data.beton;
						} else if (data.type == 'ngt') {
							data.event_type = _('When will next goal be scored?');
							data.event_pick = data.beton;
						} else if (data.type == 'ouc') {
							data.event_type = _('Over/Under cards');
							data.event_pick = data.beton;
						} else if (data.type == '10min') {
							data.event_type = _('1-10 min result');
							data.event_pick = data.beton;
						} else if (data.type == 'hfcs') {
							data.event_type = _('Halftime/Fulltime Correct Sore');
							data.event_pick = data.beton;
						} else if (data.type == 'tts') {
							data.event_type = _('Which Team To Score');
							data.event_pick = data.beton;
						} else if (data.type == 'fgint') {
							data.event_type = _('First Goal Time Interval');
							data.event_pick = data.beton;
						} else if (data.type == '12custom') {
							data.event_type = _('Draw No Bet');
							data.event_pick = data.beton;	
						} else if (data.type == 'ouh') {
							data.event_type = _('Over/Under') + ' ' + _('Home');
							data.event_pick = data.beton + ' ' + data.beton_val;
						} else if (data.type == 'oua') {
							data.event_type = _('Over/Under') + ' ' + _('Away');
							data.event_pick = data.beton + ' ' + data.beton_val;
						} else {
							data.event_type = data.type_title;
							data.event_pick = data.beton;
						};

                        data.event_type = data.type_title;

						data.first_half = data.scope != 'fe';

						if( !data.first_half && (data.type == 'ou' || data.type == 'ah') && o.buypoints && self.active[i] !== o.teaser.index && Teaser.isTeaserSport( data.sport) ) {

							buypoints = true;
							data.beton_val *= 1;
							var buypoints_select = ['<div class="betcart-pane-event-buypoints"><select disabled="disabled">'],
								american_coeff = transformCoeff(data.odds, o.type) + o.buypoints_charge,
								decimal_coeff = data.odds,
								nbsp = reFloatQ.test(data.beton_val) ? '&nbsp;&nbsp;&nbsp;&nbsp;' : '&nbsp;&nbsp;';
								sign = data.beton.toLowerCase() === 'over' ? -1 : 1;

							for ( var j = data.beton_val, n = data.beton_val + sign*o.buypoints_spread; sign*(j - n) <=0; j += sign*o.buypoints_step ) {

								american_coeff -= o.buypoints_charge;
								if ( o.buypoints_extra && j != data.beton_val && (Math.abs( data.beton_val ) == 3 || Math.abs( data.beton_val ) == 7) && data.sport == 'rg' ) {
									american_coeff -= o.buypoints_charge;
								}

								if ( Math.abs(american_coeff) < 100 ) {
									american_coeff -= 200;
								}

								decimal_coeff = transformCoeff(american_coeff, o.type, true);

								var allowance = j > 0 && data.type == 'ah' ? '+' + j : j;

								if( !/\./.test(allowance) ) {
									allowance += nbsp;
								}

								buypoints_select.push( ('<option value="' + decimal_coeff + '#' +  sign * ( j - data.beton_val) / o.buypoints_step + '">'+ allowance +'&nbsp;' + american_coeff + '</option>').replace(/-/g,'&minus;') );

							}

							buypoints_select.push('</select></div>');

							data.event_pick = '<div class="betcart-pane-event-pick-'+data.type+'-team">' + data.beton + '</div>';
							if (o.pitchersEnable) {
								data.buypoints_select = buypoints_select.join('');
							} else {
								data.coeff = buypoints_select.join('');
							}

						}

						if( !buypoints ) {
							data.coeff = o.type == 'EU' || o.type == 'HK' ? d2( Math.round( transformCoeff( data.odds, o.type ) * 100) / 100 ) :  transformCoeff( data.odds, o.type );
						}
						
						var enable_cookie = (typeof window['deleteFromCookie'] == 'function');
						
						$this.find(".betcart-pane-event-coeff").html( data.coeff );
						$this.find(".betcart-pane-event-data-lay").html( data.lay );
						$this.find(".title-lay").html( data.lay );
						$this.find(".betcart-pane-event-pick").html( data.event_pick );
						$this.find("input.data-oid").val(data.oid);
						$this.find("input.data-odds").val(data.odds).attr("default", data.odds);
						$this.find("a.betcart-pane-event-remove")
							.unbind('click')
							.attr('onClick', enable_cookie ? 'deleteFromCookie('+data.oid+')' : '')
							.bind('click', function(e){
								e.preventDefault();
								self.remove(data);
						});
						
						if ( self.Teaser && self.active[i] === o.teaser.index ) {
							if ( self.Teaser.isEnabled() ) {
								self.Teaser.setEnabled( self.Teaser.isTeaser(data) );
							} else {
								self.Teaser.setDefault();
								self.Teaser.setEnabled( self.Teaser.isTeasers() );
							}
							if( self.Teaser.isEnabled() ) {
								if ( self.countEvents >= templates.tabs[ o.teaser.index ].minItems && self.Teaser.isDisabled() ) {
									self.Teaser.enable();
								} else if( self.countEvents < templates.tabs[ o.teaser.index ].minItems && !self.Teaser.isDisabled() ) {
									self.Teaser.disable();
								}
							} else if( !self.Teaser.isDisabled() ) {
								self.Teaser.disable();
							}
						}
						
						if( self.Teaser && self.active[i] === o.teaser.index && self.Teaser.isEnabled() ) {
							new calculate( $betCartPane[i] );
						} else if ( self.active[i] !== o.teaser.index ) {
							new calculate( $betCartPane[i] );	
						}
						
						$('.picks_count').html(this.countEvents);
					});
					
					o.onUpdate.call(this, $betCart, this.countEvents);
				};
				this.remove_event = function(data) {
					this.remove(data, true);
				};
				
				this.remove = function(data, all_event_delete) {
					removeErrorsPanels();

					
					if (options.market_restrictions) {
						$betCart.find('.betcart-pane-event').removeClass('betcart-pane-event-conflict-item');
					}
					
					if (all_event_delete) {
						$betCart.find('.mid'+data.mid).each(function(e) {
							var class_name = $(this).attr('class');
							oid = class_name.replace(/.*\boid(\d+)\b.*/, '$1');
							
							$betCart.find('.oid'+oid).remove();
							deleteFromCookie(oid); // save_odds_plugin
						});
						
					} else {
						$betCart.find('.oid'+data.oid).remove();
						if ( data.oid in birs ) {
							delete birs[ data.oid ];
						}
					}
					
					if (!o.saveOdds) {
						var events_count = $betCart.find('.betcart-pane-event').length;
						
						if (!events_count) {
							deinit();
						}
						
						return;
					}
					
					/* estimated odds count */
					this.countEvents = getEstimatedOddsCount();
					var $count_events = this.countEvents;
					
					$('.picks_count').html(this.countEvents);
					
					
					o.onRemove.call(this, $betCart, this.countEvents);
					
					if( 0 === this.countEvents ) {
						deinit();
						return;
					}
					
					var siblingIndex = 0;
					
					$betCartPane.each(function(i) {
						if ( o.onlyOneItemInSingle && !i && $count_events == 1 ) {
							$betCart.tabs( 'enable', i ).tabs("select", i );
						} else if( $count_events < templates.tabs[self.active[i]].minItems && self.active[i] !== o.teaser.index ) {
							if( $tabsNav.find("li:eq(" + i + ")").hasClass("ui-state-active") ){
								$betCart.tabs("select", siblingIndex );
							}
							$betCart.tabs( "disable", i );
							
							if (i == 2) {
								// for system
								saveTab("combined", true);
							}
						} else if ( self.active[i] === o.teaser.index ) {
							saveTab("combined", true);
							if ( !self.Teaser.isEnabled() || (self.Teaser.isEnabled() && self.Teaser.isMixed() ) ) {
								self.Teaser.setDefault();
								self.Teaser.setEnabled( self.Teaser.isTeasers() );
							} 
						
							if( self.Teaser.isEnabled() ) {
	
								if ( self.countEvents >= templates.tabs[ o.teaser.index ].minItems && self.Teaser.isDisabled() ) {
									self.Teaser.enable();
								} else if( self.countEvents < templates.tabs[ o.teaser.index ].minItems && !self.Teaser.isDisabled() ) {
									self.Teaser.disable();
								}
															
							} else if( !self.Teaser.isDisabled() ) {
								self.Teaser.disable();
							}
						} else {
							siblingIndex = i;
							saveTab("single");
						}	

						this.$element = $(this);
						this.elementName = $(this).attr("id");
						this.elementType = getType( this.elementName );
						this.$eventList = $('#' + this.elementType.name + '-pane-events');
						this.$eventListConflict = this.$eventList.children(".mid" + data.mid);
						
						if ( this.$eventList.hasClass('betcart-pane-event-conflict') ) {
							if ( this.$eventListConflict.length == 1 ) {
								this.$eventListConflict.removeClass('betcart-pane-event-conflict-item');
								i && o.multyOutcomes && this.$eventListConflict.removeClass('betcart-pane-event-group');
							} else if ( i && o.multyOutcomes && this.$eventListConflict.length > 1 ) {
								this.$eventListConflict
									.removeClass("betcart-pane-event-group-first")
									.first()
									.addClass("betcart-pane-event-group-first")
								;
	
							}
							if ( !this.$eventList.children('.betcart-pane-event-conflict-item').length ) {
								this.$eventList.removeClass('betcart-pane-event-conflict');
								if( o.allowConflict ) { this.$eventList.removeClass("betcart-pane-event-conflict-allow"); }
							}
						} else {
							//fix grouping events
							this.$eventList
								.removeClass("betcart-pane-event-group")
								.removeClass("betcart-pane-event-group-first")
								.find(".mid" + data.mid)
								.removeClass("add-pane-event-group")
								.first()
								.addClass("betcart-pane-event-group-first")
							;
						}
							
						if( self.countEvents === 1 || !this.$eventList.children('.betcart-pane-event:first-child').hasClass('betcart-pane-event-first-child') ) {
							this.$eventList.children('.betcart-pane-event:first-child').addClass('betcart-pane-event-first-child');	
						}
						
						var $event_count = this.$eventList.find('.betcart-pane-event').length;
						if ($event_count > 1) {
						this.$eventList.children('.betcart-pane-event:last-child').addClass('betcart-pane-event-last-child').prev().removeClass('betcart-pane-event-last-child');
						} else {
							$('.betcart-pane-event').removeClass('betcart-pane-event-last-child');
						}

						if( self.active[i] === o.teaser.index && self.Teaser.isEnabled() ) {
							new calculate(this);
						} else if ( self.active[i] !== o.teaser.index ) {
							new calculate(this);
						}
						
						//add recalculating after events
						var tab_type = getTabByIndex(o.sportsbook_bet_types, i);
						recalculateTab(tab_type);
					});
				};

                if (!options.combinedBonus) {
                    $j(".betcart-pane-bottom-bonus").addClass('g-hidden');
                }
			};
			
			function betcartPostErrorCatch() {
				jQuery('#betcart_html_error').click(function(e) {
					var $enable_display = !$('a.b-button').hasClass('betcart-pane-action-item-disabled');
					var message 		= $('#betcart_html_error').html();
					
					if (message && $enable_display) {
						_alert(message);
						$('#betcart_html_error').html('');
					}
				});
			}
			
			function recalculateTabs() {
				for (var i=0; i < 6; i++) {
					var $tab = $($betCartPane[i]);
					
					if (!$tab.hasClass('ui-tabs-hide')) {
						new calculate( $betCartPane[i] );
					}
				}
			}
			
			function updateOddByOid ( data ) {
				
				if( !$.isArray( data ) ) { data = [data]; }
				
				for (var i = 0, len = data.length; i < len; i++) {
					
					$betCart.find('.oid' + data[i].oid).each(function(j) {
						var $this = $(this);
						var buypoints = false;
						data[i].first_half = this.className.replace(/.*scope(\S+).*/, '$1') != 'fe';
						data[i].type = this.className.replace(/.*type(\S+).*/, '$1');
						data[i].beton_val = this.className.replace(/.*allowance(\S+).*/, '$1') / 100;
						
						var _$coeff = $this.find(".betcart-pane-event-coeff"),
							_$select = _$coeff.find('select'),
							_index = _$select.size() ? _$select.children().index( _$select.children(':selected') ) : -1;
						
						if( _$select.size() && !data[i].first_half && (data[i].type == 'ou' || data[i].type == 'ah') && o.buypoints && self.active[j] !== o.teaser.index ) {
							data[i].beton = $this.find('.betcart-pane-event-pick').get(0).firstChild.innerHTML;
							buypoints = true;
							data[i].beton_val *= 1;
							var buypoints_select = ['<div class="betcart-pane-event-buypoints"><select>'],
								american_coeff = transformCoeff(data[i].new_odds, o.type) + o.buypoints_charge,
								decimal_coeff = data[i].new_odds,
								nbsp = reFloatQ.test(data[i].beton_val) ? '&nbsp;&nbsp;&nbsp;&nbsp;' : '&nbsp;&nbsp;';
								sign = data[i].beton.toLowerCase() === 'over' ? -1 : 1;
							for(var k = data[i].beton_val, n = data[i].beton_val + sign*o.buypoints_spread; sign*(k - n) <=0; k += sign*o.buypoints_step ) {								
								american_coeff -= o.buypoints_charge;
								if( o.buypoints_extra && k != data[i].beton_val && (Math.abs( data[i].beton_val ) == 3 || Math.abs( data.beton_val ) == 7) && data[i].sport == 'rg' ) {
									american_coeff -= o.buypoints_charge;
								}
								if( Math.abs(american_coeff) < 100 ) {
									american_coeff -= 200;
								}
								decimal_coeff = transformCoeff(american_coeff, o.type, true);
								var allowance = k > 0 && data[i].type == 'ah' ? '+' + k : k;
								if( !/\./.test(allowance) ) {
									allowance += nbsp;
								}
								var step = sign * ( k - data[i].beton_val) / o.buypoints_step;
								buypoints_select.push( ('<option '+ ( step == _index ? ' selected="selected"' : '' ) +'value="' + decimal_coeff + '#' +  step + '">'+ allowance +'&nbsp;' + american_coeff + '</option>').replace(/-/g,'&minus;') );
							}
							buypoints_select.push('</select></div>');
							
							if (o.pitchersEnable) {
								data[i].buypoints_select = buypoints_select.join('');
							}
							else {
								data[i].coeff = buypoints_select.join('');
							}
						}
						
						if( !buypoints ) {
							var converted_type = data[i].type.indexOf(o.unconvertible_types) !== -1 ? 'EU' : o.type;
							
							data[i].coeff = o.type == 'EU' || o.type == 'HK' ? d2( Math.round( transformCoeff( data[i].new_odds, converted_type ) * 100) / 100 ) :  transformCoeff( data[i].new_odds, converted_type );
						}
						
						_$coeff.html( data[i].coeff );
						$this.find("input.data-odds").attr( 'default', data[i].new_odds ).val( data[i].new_odds );
						$this.find('.display_odd').html(data[i].new_odds);
						
						if( i < len - 1 ) { return; }
						
						if( self.active[j] === o.teaser.index && self.Teaser && self.Teaser.isEnabled() ) {
							new calculate( $betCartPane[j] );
						} else if ( self.active[j] !== o.teaser.index ) {
							new calculate( $betCartPane[j] );	
						}
						
					});
				
				};
				
			};
			
			function deinit(s) {
				if(typeof s === "undefined" ) { 
					$("#"+o.idTo).addClass('g-hidden');
					s = ""; 
				} else {
					$("#"+o.idTo).addClass('betcard__deinit');
				}				
				
				/* Fix double init betcart */
				jQuery('.b-betcart__out_clone').removeClass("g-hidden");
				jQuery('#my-bets').hide();
				jQuery('.betcart-body').show();
				jQuery('.l-page__r').find('.my-bets_tabs').removeClass('selected');
				jQuery('.betcart-body').find('.my-bets_tabs').addClass('selected');

				
				$betCart.tabs('destroy').removeAttr( "init" ).html(s);
				
				var _outcomes = $document.data( "outcomes" );
				if ( $.isPlainObject( _outcomes ) ) {
					for ( var _key in _outcomes ) {
						if ( Object.prototype.hasOwnProperty.call( _outcomes, _key ) ) {
							$( document.getElementById( ":" + _outcomes[ _key ] ) ).removeClass("selected");
						}
					}
				}
				$document.removeData( "outcomes" );
				jQuery.cookie("saved_oids", "", { expires: date, path: '/' });
				jQuery.cookie("selected_bet_type", "", { expires: date, path: '/' });
			};
			
			var resultWin = {
				'dirty': function ( coeff ) {
					return coeff;
				},
				'pure' : function ( coeff ) {
					return coeff - 1;
				}
			};
			
			var calculate = function( element ) {
				if( typeof element === "undefined") {
					$betCartPane.each(function(i){
						new calculate(this);	
					});
					return;
				}
				
				this.$element = $(element);
				
				this.elementName = this.$element.attr("id");
				this.elementType = getType( this.elementName );
				
				this.$eventList = $('#' + this.elementType.name + '-pane-events');
				
				this.$element.bottom 			=	$('#' + this.elementType.name + '-pane-bottom');
				
				this.$element.checkboxList		=	$('#' + this.elementType.name + '-pane-checkbox');
				
				this.$element.odds 				=	this.$element.find("input.data-odds");


				if (this.elementType.name == 'system') {

					$('.betcart-pane-checkbox.checkbox_success').removeClass(hiddenClass);
					$('.betcart-pane-checkbox.checkbox_error').addClass(hiddenClass);
					
					if (this.$element.odds.length > o.maximum_system_picks) {
						$('.betcart-pane-checkbox.checkbox_success').addClass(hiddenClass);
						$('.betcart-pane-checkbox.checkbox_error').removeClass(hiddenClass).text("You can add maximum " + o.maximum_system_picks + " system picks");
						return;
					}
					
				}
				
				if (o.betcart_template == 'ibetcity') {
					this.$element.buypoints = this.$element.find('.betcart-pane-event-buypoints select');
				} else {
					this.$element.buypoints = this.$element.find('.betcart-pane-event-coeff select');
				}
				
				this.$element.eventPotential 	=	this.$element.find(".betcart-pane-event-potential");
				this.$element.tax_percent 		=	this.$element.bottom.children(".betcart-pane-bottom-tax");
				this.$element.stake_var 		=	this.$element.bottom.children(".betcart-pane-bottom-stake");
				this.$element.tax_amount 		=	this.$element.find(".betcart-pane-bottom-tax-amount");
				this.$element.select 			=	this.$element.bottom.children(".betcart-pane-bottom-select").find('select');
				this.$element.count 			=	this.$element.bottom.children(".betcart-pane-bottom-count");
				this.$element.textCount			=	this.$element.bottom.children(".betcart-pane-bottom-text-count");
				this.$element.bonus 			=	this.$element.bottom.children(".betcart-pane-bottom-bonus");
				this.$element.minimum 			=	this.$element.bottom.children(".betcart-pane-bottom-minimum");
				this.$element.maximum 			=	this.$element.bottom.children(".betcart-pane-bottom-maximum");
				this.$element.total 			=	this.$element.bottom.find(".betcart-pane-bottom-total");
				this.$element.total_stake 		=	this.$element.bottom.find(".betcart-pane-bottom-total-stake");
				this.$element.total_odds 		=	this.$element.bottom.children(".betcart-pane-bottom-total-odds");
				this.$element.potential 		=	this.$element.bottom.find(".betcart-pane-bottom-potential");
				this.$element.potential_max 	=	this.$element.bottom.children(".betcart-pane-bottom-potential-max");
				this.$element.lay_liability_total 		=	this.$element.bottom.children(".betcart-pane-bottom-lay-liability-total");
				
				this.$element.all_stake 	=	this.$element.bottom.children(".betcart-pane-bottom-all-stake");
				this.$element.all_total 	=	this.$element.bottom.children(".betcart-pane-bottom-all-total");
				this.$element.all_potential 	=	this.$element.bottom.children(".betcart-pane-bottom-all-potential");
				
				this.$element.input_variants 	=	this.$element.find(".b-select-betcart-bottom-input-variants");
				this.$elementBindEvents[ this.elementType.name ].call(this);
			};
			
			calculate.prototype = {
				$elementBindEvents: {
					single: function() {
						var context = this;
						var is_stake_per_bet = context.$eventList.find('.betcart-pane-event-stake').hasClass("g-hidden");
						
						context.$element.stake = context.$eventList.find('.betcart-pane-event-stake input');
						
						if (is_stake_per_bet) {
							context.$element.stake_total = context.$element.bottom.find('input');
						}
						
						context.$elementCalculate.single.apply(context);
						context.$elementShow.single.apply(context);
						
						if (is_stake_per_bet) {
							var $stake_object = context.$element.stake_total;
						} else {
							var $stake_object = context.$element.stake;
						}
						
						context.$element.input_variants.bind('change', function(e) {
							var $value = $(this).val();
							var $parent = $(this).closest('.betcart-pane-bottom');
							
							if ($value == 'wager') {
								o.resultWin = 'pure';
							} else {
								o.resultWin = 'pure';
							}
							
							//add all variants hidden class
							$($parent).find('.input_variant').addClass('g-hidden');
							
							$($parent).find('.' + $value + '_input').removeClass(hiddenClass);
							$($parent).find('.' + $value + '_var').addClass(hiddenClass);
							
						});
						
						var $bind_key = o.mobi_theme ? "keyup click" : "keyup";
						$stake_object
							.unbind('keyup focus blur')
							.bind($bind_key, function( e, autoupdate ){
								var $this = $(this),
									$parent = $this.closest('.betcart-pane-event'),							
									odds = $parent.find('input.data-odds').val();
									
								if ( e.target.readOnly || e.target.disabled ) { return; }
							
								var _value = $.trim( e.target.value ).replace(',','.');
								var _float = parseFloat(_value);
								
								if (isNaN(_float)) {
									_float = null;
								}
								
								if( _value === e.target.oldValue ) { return; }
								
								if ( this.timer ) { clearTimeout( this.timer ); }
								
								if( autoupdate ) {
									context.$elementCalculate.single.apply(context);
									context.$elementShow.single.apply(context);
								} else {
									this.timer = setTimeout( function() {
										if (!_float) {
											if (o.betcart_autoupdate_total_stake) {
												//e.target.value = d2(o.overwrite_default_stake);
											}
											
											context.$elementCalculate.single.apply(context);
											context.$elementShow.single.apply(context);
											
											return;
										}
										
										if (o.type == 'US') {
											odds = transformCoeff( transformCoeff(odds, o.type), o.type, true );
										}
										
										var $value = d2(reFloat.test(_value) ? parseFloat(d2(_value))*resultWin[o.resultWin](odds) : 0);
										
										$parent.find('.betcart-pane-event-potential input')
											.val( $value )
											.triggerHandler('keyup', [true]);
											
										context.$elementCalculate.single.apply(context);
										context.$elementShow.single.apply(context);
									} , o.update_timeout);
								}
							})
							/*
							 * .bind('focus', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if( parseFloat(e.target.value) ) { return; }
								e.target.value = '';
							})
							.bind('blur', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if( $.trim(e.target.value) ) { return; }
								e.target.value = d2(0);
							})
							 * */
							.bind('focus', function( e ){
								var default_stake = o.overwrite_default_stake || o.default_stake || 0;
								var $float = parseFloat(e.target.value);
								
								e.target.old_value = e.target.value;
								
								if (o.clear_input && !$float) {
									e.target.value = '';
								}
								
								if ( e.target.readOnly || e.target.disabled ) { return; }
							})
							.bind('blur', function( e ){
								if (!o.clear_input) {
									return;
								}
								
								var default_stake = d2(o.overwrite_default_stake || o.default_stake || 0);
								
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if( $.trim(e.target.value) ) { return; }
								
								e.target.value = default_stake;
							})
							.bind('keydown', function( e ) {
								if (e.which == 13 && o.placebet_by_enter) {
									$(this).closest('.betcart-pane').find('.betcart-pane-action-send').click();
								}
							});
						;
						context.$element.odds
							.unbind('keyup focus blur')
							.bind('keyup', function( e, autoupdate ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								
								var _value = $.trim( e.target.value ).replace(',','.');
								
								if( _value === e.target.oldValue ) { return; }
								
								e.target.oldValue = _value;
								
								if ( this.timer ) { clearTimeout( this.timer ); }
								
								if( autoupdate ) {
									context.$elementCalculate.single.apply(context);
									context.$elementShow.single.apply(context);
								} else {
									this.timer = setTimeout( function(){
										context.$elementCalculate.single.apply(context);
										context.$elementShow.single.apply(context);
									} , o.update_timeout);
								}
							})
							.bind('focus', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if( parseFloat(e.target.value) ) { return; }
								e.target.value = '';
							})
							.bind('blur', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if( $.trim(e.target.value) ) { return; }
								
								e.target.value = d2(0);
							})
						;
						context.$element.eventPotential.find('input')
							.unbind('keyup focus blur')
							.bind('keyup', function( e ){
								
								if ( e.target.readOnly || e.target.disabled ) { return; }

								var _value = $.trim( e.target.value ).replace(',','.');

								if( _value === e.target.oldValue ) { return; }
								
								e.target.viewValue = e.target.oldValue = _value;
								
								var $this = $(this),
									$parent = $this.closest('.betcart-pane-event'),							
									odds = $parent.find('input.data-odds').val();
								
								if (o.type == 'US') {
									odds = transformCoeff(transformCoeff(odds, o.type), o.type, true);
								}
								
								if ( this.timer ) {
									clearTimeout( this.timer );
								}
								
								this.timer = setTimeout(function() {
									odds = parseFloat(odds);
									
									var $odds_coeff = parseFloat(_value);
									var $result_win = resultWin[o.resultWin](odds);
	
									var $value = d2(reFloat.test(_value) ? $odds_coeff / $result_win: 0);
									
									$parent.find('.betcart-pane-event-stake input')
										.val( $value )
										.triggerHandler('keyup', [true]);
								}, o.update_timeout);
							})
							.bind('focus', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( parseFloat(e.target.value) ) { return; }
								e.target.value = '';
							})
							.bind('blur', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( $.trim(e.target.value) ) { return; }
								e.target.value = d2(0);
							})
							.triggerHandler('blur')
						;
						
						context.$element.buypoints.unbind('change').bind('change', function(){
							var $this = $(this),
								$parent = $this.closest('.betcart-pane-event'),							
								$odds = $parent.find('input.data-odds'),
								$buypoints = $parent.find('input.data-buypoints');
								
								var source_odds = $odds.data("sourceOdd") || $odds.val();
								$odds.val( $this.val().split('#')[0] ); //buypointed odds calculated on server-side	
								$buypoints.val( $this.val().split('#')[1] );
								context.$element.odds = context.$element.find("input.data-odds");							
								
								context.$elementCalculate.single.apply(context);
								context.$elementShow.single.apply(context);
								$odds.data("sourceOdd", source_odds);
						});
						
						//All stake (for ibetcity: Wager)
						context.$element.all_stake.unbind('keyup, click, focusout')
							.bind('keyup', function( e, autoupdate ){
								var $this = $(this),
									$parent = $('#single-pane-events'),							
									odds = $parent.find('input.data-odds').val()
									$elements = $parent.find('.betcart-pane-event')
								;
								var us_odds = transformCoeff(odds, o.type);
								
								var _value = $.trim( e.target.value ).replace(',','.');
								if (!_value) _value = 0;
								
								if ( this.timer ) { clearTimeout( this.timer ); }
									 
								this.timer = setTimeout( function(){
									$elements.each(function() {
										var odds = $(this).find('input.data-odds').val();
										
										var us_odds = transformCoeff(odds, o.type);
										var $object = us_odds > 0 ? ".single-amount-value" : ".single-amount-potential-payout";
										
										$(this).find($object)
											.val( d2(_value) )
											.keyup()
										;
									});
	
								} , o.update_timeout);
							})
							.click(function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if( parseFloat(e.target.value) ) { return; }
								e.target.value = '';
							})
							.focusout(function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if( $.trim(e.target.value) ) { return; }
								e.target.value = d2(0);
							})
						;
						
						//All total (for ibetcity: Total Risk)
						context.$element.all_total.unbind('keyup focus blur')
							.bind('keyup', function( e, autoupdate ){
								var $this = $(this),
									$parent = $('#single-pane-events'),							
									odds = $parent.find('input.data-odds').val(),
									$elements = $parent.find('.betcart-pane-event')
								;
									
								var us_odds = transformCoeff(odds, o.type);
									
								if (!$elements.length) {
									return;
								}
								
								var _value = $.trim( e.target.value ).replace(',','.');
								if (!_value) _value = 0;
								//var _value = _value / $elements.length;
								
								if ( this.timer ) { clearTimeout( this.timer ); }
									 
								this.timer = setTimeout( function(){
									$parent.find('.single-amount-value')
										.val( d2(_value) )
										.keyup()
									;
								} , o.update_timeout);
							})
							.click(function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if( parseFloat(e.target.value) ) { return; }
								e.target.value = '';
							})
							.focusout(function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if( $.trim(e.target.value) ) { return; }
								e.target.value = d2(0);
							})
						;
						
						//All potential (for ibetcity: Total Win)
						context.$element.all_potential.unbind('keyup focus blur')
							.bind('keyup', function( e, autoupdate ){
								var $this = $(this),
									$parent = $('#single-pane-events'),							
									odds = $parent.find('input.data-odds').val(),
									$elements = $parent.find('.betcart-pane-event')
								;
									
								if (!$elements.length) {
									return;
								}
								
								var _value = $.trim( e.target.value ).replace(',','.');
								if (!_value) _value = 0;
								//var _value = _value / $elements.length;
								
								if ( this.timer ) { clearTimeout( this.timer ); }
									 
								this.timer = setTimeout( function(){
									$parent.find('.single-amount-potential-payout')
										.val( d2(_value) )
										.keyup();
								} , o.update_timeout);
							})
							.click(function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if( parseFloat(e.target.value) ) { return; }
								e.target.value = '';
							})
							.focusout(function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if( $.trim(e.target.value) ) { return; }
								e.target.value = d2(0);
							})
						;
					},
					combined: function(){
						var context= this;
						
						context.$element.stake = context.$element.bottom.find(".betcart-pane-bottom-stake").find('input');
						
						context.$elementCalculate.combined.apply(context);
						
						context.$element.data.orig_stake = context.$element.stake.val();
						
						if (o.selected_bet_type == 'combined') {
							recalculateTab('combined');
						}
						
						context.methods = {
							eliminated: function ( binaryList, e, conflict_markets_key ) {
								var reMid_original = /\bmid(\d+)\b/;
								var reMid = new RegExp('\\b'+o.conflict_markets_key+'(\\d+)\\b');
								
								var summ = -1, 
									i = binaryList.length;
								for ( ; i--; ) summ += binaryList[ i ];
								for ( i = e.length; i--; ) if ( e[ i ] == 0 && summ == i ) return true;
								
								if ( o.onlyOneOutcomeInCombination ) {
									var midElemets = context.$element.odds.closest("[class*="+o.conflict_markets_key+"]");
									var midList = [],
										elem;
									for ( i = 0; (elem = midElemets[ i ]); i++ ) {
										binaryList[ i ] && midList.push( elem.className.match(reMid).pop() );
									}
									if ( midList.length == 1 ) return false;
									midList.sort();
									for ( var i = midList.length - 1; i--; ) {
										if ( midList[ i + 1 ] == midList[ i ] ) return true;
									}
								}
								return false;
							},
							//TODO
							product : function ( elements, e, bonusList ) {
								var overall_odds 	= this.getOverallOdds(elements);
								var product_default = this.product_default(elements, e, bonusList);
								
								return { 
									prod	:	product_default.prod,
									count	:	overall_odds.count,
									min		:	product_default.min, 
									max		:	overall_odds.odds, 
									all		: 	product_default.all,
									bonus	:	product_default.bonus
								};
							},
							
							getElementsByMarket: function(elements) {
								var market_elements = {};
								
								for ( i = 0; i < elements.length; i++ ) {
									var $element = $(elements[i]).parent().parent();
									var market_id = getValueIdByClass($element.attr('class'), 'market_id');
									
									if (!market_elements[market_id]) {
										market_elements[market_id] = [];
									}
									
									market_elements[market_id].push($element);
									
								}
								
								return market_elements;
							},
							getElementsByEvent: function(elements) {
								var event_elements = {};
								
								for ( i = 0; i < elements.length; i++ ) {
									var $element = $(elements[i]).parent().parent();
									var event_id = getValueIdByClass($element.attr('class'), 'mid');
									
									if (!event_elements[event_id]) {
										event_elements[event_id] = [];
									}
									
									event_elements[event_id].push($element);
									
								}
								
								return event_elements;
							},
							getElementsByEventAndMarkets: function(elements) {
								var event_elements = {};
								
								for ( i = 0; i < elements.length; i++ ) {
									var $element = $(elements[i]).parent().parent();
									var event_id = getValueIdByClass($element.attr('class'), 'mid');
									var market_id = getValueIdByClass($element.attr('class'), 'market_id');
									
									if (!event_elements[event_id]) {
										event_elements[event_id] = {};
									}
									if (!event_elements[event_id][market_id]) {
										event_elements[event_id][market_id] = [];
									}
									
									event_elements[event_id][market_id].push($element);
									
								}
								
								return event_elements;
							},
							getMaximumElementsByEventAndMarkets: function(elements) {
								var result = {};
								
								for ( i in elements ) {
									var event_id = i;
									
									for (j in elements[i]) {
										var market_id 	= j;
										var max_value 	= 0;
										var $markets 	= elements[i][j];
										
										for (k in $markets) {
											var $market = $markets[k];
											var odd = parseFloat($market.find("input.data-odds").val());
											
											if (odd > max_value) {
												max_value = odd;
											}
										}
										
										if (!result[event_id]) {
											result[event_id] = {};
										}
										
										if (!result[event_id][market_id]) {
											result[event_id][market_id] = max_value;
										}
									}
								}
								
								return result;
							},
							getDefaultMultiplier: function(elements_by_events_and_markets_max) {
								var multiplier = 1;
								
								for (event_id in elements_by_events_and_markets_max) {
									var markets = elements_by_events_and_markets_max[event_id];
									var market_count = getObjectElementsCount(markets);
									var market_odd = getObjectElementByIterationNumber(markets, 0);
									
									if (market_count == 1) {
										multiplier *= market_odd;
									}
								}
								
								return multiplier;
							},
							getCountElementsByLevel: function(combinations, level) {
								var count = 0;
								
								for (i in combinations) {
									var element = combinations[i];
									if (element.length == level) {
										count += 1;
									}
								}
								
								return count;
							},
							getOverallOdds: function(elements) {
								var elements_by_markets 				= this.getElementsByMarket(elements);
								var elements_by_markets_maximum_odd 	= this.getMaximumElementsByMarkets(elements_by_markets);
								
								var elements_by_events 					= this.getElementsByEvent(elements);
								
								var elements_by_events_and_markets 		= this.getElementsByEventAndMarkets(elements);
								
								var elements_by_events_and_markets_max 	= this.getMaximumElementsByEventAndMarkets(elements_by_events_and_markets);
								
								elements_by_markets_max_array 				= getArrayFromObject(elements_by_events);
								elements_by_events_and_markets_max_array 	= getArrayFromObject(elements_by_events_and_markets_max);
								
								var all_combinations 						= getSetCombinations(elements_by_markets_max_array);
								
								var combinations 							= getSetCombinations(elements_by_events_and_markets_max_array);
								
								var all_odd = 0;
								var level 	= 1;
								
								for (i in combinations) {
									var odd = 1;
									level = combinations[i].length;
									
									for (j in combinations[i]) {
										odd *= combinations[i][j];
									}
									
									all_odd += odd;
								}
								
								var count 	= this.getCountElementsByLevel(all_combinations, level);
								
								if (o.combinedType !== 'combined_system') {
									count = 1;
								}
								
								var result 	= {};
								
								result.odds = all_odd;
								result.count = count;
								
								return result;
							},
							getMaximumElementsByMarkets: function(elements) {
								var result = {};
								
								for ( i in elements ) {
									var market_id = i;
									var max_value = 0;
									
									for (j in elements[i]) {
										var $element = elements[i][j];
										
										var odd = $element.find("input.data-odds").val();
										if (odd > max_value) {
											max_value = odd;
										}
									}
									
									if (!result[market_id]) {
										result[market_id] = max_value;
									}
									
								}
								
								return result;
							},
							product_default : function ( elements, e, bonusList ) {
								bonusList = bonusList || [];
								var bonus = 0;
								var n = elements.length;
								var binaryList = [];
								var p = 0;
								var i = n; 
								var min = Number.MAX_VALUE;
								var max = Number.MIN_VALUE;
								var all = [];
								var cf = 0;
								var cn = -1;
								var count = 0;
								for ( ;i--; ) {
									binaryList[ i ] = 0;
								}
								
								//todo: fix here playbet24
								/*while ( true ) {
									i = 0;
									while ( binaryList[i] ) binaryList[i++] = 0;
									if ( i == n ) { break; }
									binaryList[i] = 1;
									if ( e != null && this.eliminated( binaryList, e ) ) { continue; }
									p = 1;
									cn = -1;
									for ( i = n; i--; ) {
										if ( binaryList[ i ] == 1 ) {
											p *= parseFloat( elements[ i ].value );
											cn++;
										}
									}
									if (p) {
										all.push(p);
									}
									
									p = resultWin[ o.resultWin ] ( p );
									min = Math.min( min, p );
									max = Math.max( max, p );
									
									if ( cn in bonusList ) {
										bonus += p * bonusList [ cn ];
									}
									cf += p;
									count++;
								}*/
								
								var bonus = cf * o.combinedBonus [ n ];
								
								return { 
									prod	:	cf + bonus,
									count	:	count,
									min		:	min, 
									max		:	max, 
									all		: 	all,
									bonus	:	cf && Math.round(100*bonus / cf) || 0
								};
							},
							odds : function ( elements, e, bonusList ) {
								bonusList = bonusList || [];
								var bonus = 0;
								var n = elements.length;
								var binaryList = [];
								var p = 0;
								var i = n; 
								var min = Number.MAX_VALUE;
								var max = Number.MIN_VALUE;
								var all = [];
								var cf = 0;
								var cn = -1;
								var count = 0;
								for ( ;i--; ) {
									binaryList[ i ] = 0;
								}
								
								while ( true ) {
									i = 0;
									while ( binaryList[i] ) binaryList[i++] = 0;
									if ( i == n ) { break; }
									binaryList[i] = 1;
									if ( e != null && this.eliminated( binaryList, e ) ) { continue; }
									p = 1;
									cn = -1;
									for ( i = n; i--; ) {
										if ( binaryList[ i ] == 1 ) {
											var current_element = elements[ i ];
											p *= parseFloat( $(current_element).parent().find('.betcart-pane-event-coeff').html() );
											cn++;
										}
									}
									p = resultWin[ o.resultWin ] ( p );
									min = Math.min( min, p );
									max = Math.max( max, p );
									if (p) {
										all.push(p);
									}
									if ( cn in bonusList ) {
										bonus += p * bonusList [ cn ];
									}
									cf += p;
									count++;
								}
								var overall_odds 	= this.getOverallOdds(elements);
								return { 
									prod	:	overall_odds.odds + bonus,
									count	:	overall_odds.count,
									min		:	min, 
									max		:	max, 
									all		: 	all,
									bonus	:	cf && Math.round(100*bonus / cf) || 0
								};
							},
						};
						
						var $elements = context.$element.find('.betcart-pane-event-pick');
						var e_count = getMaximumCombinations($elements, o.conflict_markets_key);
						var e = [];
						for (var i=0; i<e_count; i++) {
							if (i==e_count-1) {
								e.push(1);
							} else {
								e.push(0);
							}
						}
						
						if (context.methods) {
							var methodProductsResult_ = context.methods.product( $elements, e, o.systemBonus, o.systemFilter  );
							context.$element.data.l = methodProductsResult_.count;
						}
						
						if (options.overwrite_default_stake) {
							context.$element.stake.val(options.overwrite_default_stake);
						}
						
						context.$elementShow.combined.apply(context);
						context.$elementCalculate.combined.apply(context);
						
						var $bind_key = o.mobi_theme ? "keyup click" : "keyup";
						
						context.$element.stake
							.unbind('keyup focus blur')
							.bind($bind_key, function( e, autoupdate ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								
								var _value = $.trim( e.target.value ).replace(',','.');
								var _float = parseFloat(_value);
								
								if (isNaN(_float)) {
									_float = null;
								}
								
								e.target.oldValue =_value;
								
								var stake_value = reFloat.test(_value) ? parseFloat( _value ) : 0;
								
								if (o.tax_percent) {
									stake_value = getAmountWithTaxPercent(stake_value, o.tax_percent);
								}
								
								context.$element.data.p = resultWin[o.resultWin] ( context.$element.data.t ) * stake_value;
								context.$element.data.new_stake = stake_value;
								
								if ( this.timer ) { clearTimeout( this.timer ); }
								
								if( autoupdate ) {
									context.$elementShow.combined.apply(context);
								} else {
									this.timer = setTimeout( function(){
										if (!_float) {
											if (o.betcart_autoupdate_total_stake) {
												e.target.value = d2(o.overwrite_default_stake);
											}
											
											context.$elementCalculate.combined.apply(context);
											context.$elementShow.combined.apply(context);
											
											return;
										}
										
										context.$elementShow.combined.apply(context);
									} , o.update_timeout);
								}
							})
							.bind('focus', function( e ){
								var default_stake = o.overwrite_default_stake || o.default_stake || 0;
								var $float = parseFloat(e.target.value);
								
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if( $float && o.overwrite_default_stake != $float ) { return; }
								
								if (parseFloat(default_stake) == parseFloat(e.target.value)) {
									e.target.value = "";
								} else {
									e.target.value = d2(default_stake);
								}
							})
							.bind('blur', function( e ){
								var default_stake = o.overwrite_default_stake || o.default_stake || 0;
								
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if( $.trim(e.target.value) ) { return; }
								
								e.target.value = d2(default_stake);
							})
							.bind('keydown', function( e ) {
								if (e.which == 13 && o.placebet_by_enter) {
									$(this).closest('.betcart-pane').find('.b-button_conf').click();
								}
							});
						;
						
						context.$element.potential.find('input')
							.unbind('keyup focus blur')
							.bind($bind_key, function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
							
								var _value = $.trim( e.target.value ).replace(',','.');
								
								if( _value === e.target.oldValue ) { return; }
								
								e.target.viewValue = e.target.oldValue = _value;
								
								if (this.timer) {
									clearTimeout(this.timer);
								}
								this.timer = setTimeout(function(){
									var $result_value = reFloat.test(_value) ? parseFloat( d2(_value) )/resultWin[o.resultWin] ( context.$element.data.t ) : 0;
									
									context.$element.stake.parent().find('var').html(d2($result_value));
									
									context.$element.stake
										.val( d2($result_value) )
										.triggerHandler('keyup', [true]);
								}, o.update_timeout);
								
							})
							.bind('focus', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( parseFloat(e.target.value) ) { return; }
								e.target.value = '';
							})
							.bind('blur', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( $.trim(e.target.value) ) { return; }
								e.target.value = d2(0);
							})
							.triggerHandler('blur')
						;
						
						context.$element.total_stake.find('input')
								.unbind('keyup focus blur')
								.bind($bind_key, function( e ){
								
								if ( e.target.readOnly || e.target.disabled ) { return; }
								
								var _value = $.trim( e.target.value ).replace(',','.');
								var _float = parseFloat(_value);
								
								if (isNaN(_float)) {
									_float = null;
								}
								
								e.target.viewValue = e.target.oldValue = _value;
								
								if (this.timer) {
									clearTimeout(this.timer);
								}
								
								this.timer = setTimeout(function(){
									var event_count = context.$element.data.l;
									var stake_value = d2(reFloat.test(_value) ? parseFloat( d2(_value) )/ event_count : 0);
									
									context.$element.stake
										.val( stake_value )
										.triggerHandler('keyup', [true])
									;
									context.$element.total_stake
										.val( stake_value )
										.triggerHandler('keyup', [true])
									;
									
									context.$element.stake_var.find('var')
										.html( stake_value );
										
									
									if (e.originalEvent) {
										$('div#system-pane .betcart-pane-bottom').find('.betcart-pane-bottom-total-stake input').val(d2(_value));
										recalculateTab('system');
									}
									
								}, o.update_timeout);
							})
							.bind('focus', function( e ){
								var $float = parseFloat(e.target.value);
								if (o.clear_input && !$float) {
									e.target.value = '';
								}
								
								if ( e.target.readOnly || e.target.disabled ) { return; }
							})
							.bind('blur', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( $.trim(e.target.value) ) { return; }
							})
							.bind('keydown', function( e ) {
								if (e.which == 13 && o.placebet_by_enter) {
									$(this).closest('.betcart-pane').find('.b-button_conf').click();
								}
							})
							.triggerHandler('blur')
						;
						
						context.$element.buypoints.unbind('change').bind('change', function(){
							var $this = $(this),
								$parent = $this.closest('.betcart-pane-event'),							
								$odds = $parent.find('input.data-odds'),
								$buypoints = $parent.find('input.data-buypoints');
								
								var source_odds = $odds.data("sourceOdd") || $odds.val();
								$odds.val( $this.val().split('#')[0] ); //buypointed odds calculated on server-side	
								$buypoints.val( $this.val().split('#')[1] );
								context.$element.odds = context.$element.find("input.data-odds");							
								
								context.$elementCalculate.combined.apply(context);
								context.$elementShow.combined.apply(context);
								$odds.data("sourceOdd", source_odds);
						});
					},
					system: function() {
						//todo-calculate system
						var reMid_old = /\bmid(\d+)\b/;
						var reMid = new RegExp('\\b'+o.conflict_markets_key+'(\\d+)\\b');
						var context = this;
						context.$element.stake = context.$element.bottom.children(".betcart-pane-bottom-stake").find('input');
						
						if (o.selected_bet_type == 'system') {
							recalculateTab('system');
						}
						
						var countOdds =	!o.onlyOneOutcomeInCombination ? 
							context.$element.odds.length : 
							(function( list ){
								return $.grep( list, function( item, index ){
									return index ? item != list[ index - 1 ] : !0;
								}).length;
							})( 
								context.$element.odds
									.closest("[class*="+o.conflict_markets_key+"]")
									.map(function(){ return this.className.match(reMid).pop() })
									.get()
									.sort() 
							);
						
						var elements = [];
						context.$element.odds.each(function() {
							elements.push($(this));
						})
						
						context.$element.data.elements = elements;
						
						if (o.conflict_markets_key == 'mid' && o.onlyOneOutcomeInCombination) {
							var countOdds = getUniqueEventsCount(elements);
						}
						
						if ( o.bankersEnabled ) {
							context.$element.bankersActivator = $("#bankers-activate-checkbox");
							context.$element.bankers = $("input:checkbox", context.$eventList);
							context.$element.bankersCountCheck = context.$element.bankers.filter(":checked").length;
							context.$element.bankersMaxCount = countOdds - 2;
							context.$element.bankerIndexes = context.$element.bankers.map(function () { return this.checked; }).get();
						}
						
						context.methods = {
							eliminated: function ( binaryList, e ) {
								var summ = -1, 
									i = binaryList.length;
								for ( ; i--; ) summ += binaryList[ i ];
								for ( i = e.length; i--; ) if ( e[ i ] == 0 && summ == i ) return true;
								if ( o.onlyOneOutcomeInCombination ) {
									var midElemets = context.$element.odds.closest("[class*="+o.conflict_markets_key+"]");
									var midList = [],
										elem;
									for ( i = 0; (elem = midElemets[ i ]); i++ ) {
										binaryList[ i ] && midList.push( elem.className.match(reMid).pop() );
									}
									if ( midList.length == 1 ) return false;
									midList.sort();
									for ( var i = midList.length - 1; i--; ) {
										if ( midList[ i + 1 ] == midList[ i ] ) return true;
									}
								}
								return false;
							},
							getUniqueStakes: function(elements) {
								var p = 1, count = 0, posible_bets = [], unique_stakes = [], existing_unique_stakes = [];
								
								for (i in elements) {
									var iteration_element = {};
									var element_item = $(elements[ i ][0]);
									
									var outcome_id = element_item.attr('outcome_id');
									
									var market_id = element_item.attr('market_id');
									var event_id = element_item.attr('event_id');
									var odds = element_item.val();
									
									iteration_element.outcome_id = outcome_id;
									iteration_element.market_id = market_id;
									iteration_element.event_id = event_id;
									iteration_element.odds = odds;
									
									if ($.inArray(outcome_id, existing_unique_stakes) == '-1') {
										unique_stakes.push(iteration_element);
										existing_unique_stakes.push(outcome_id);
									}
								}
								return unique_stakes;
							},
							getCountActiveBankers: function(bankers) {
								var count_active_bankers = 0;

								bankers.each(function() {
									if ($j(this).attr('checked')) {
										count_active_bankers++;
									}
								});

								return count_active_bankers;
							},
							product : function ( elements, e, bonusList ) {
								bonusList = bonusList || [];
								var bonus = 0;
								var n = elements.length;
								var binaryList = [];
								var p = 0;
								var i = n; 
								var min = Number.MAX_VALUE;
								var max = Number.MIN_VALUE;
								var all = [];
								var posible_bets = [], 
									outcomes_by_market = [],
									unique_stakes = [],
									existing_unique_stakes = []
								;
								var cf = 0;
								var cn = -1;
								var count = 0;
								for ( ;i--; ) {
									binaryList[ i ] = 0;
								}
								
								while ( true ) {
									posible_bets[count] 		= [];
									outcomes_by_market[count] 	= [];
									
									i = 0;
									while ( binaryList[i] ) binaryList[i++] = 0;
									if ( i == n ) { break; }
									binaryList[i] = 1;
									if ( e != null && this.eliminated( binaryList, e ) ) { continue; }
									p = 1;
									cn = -1;
									for ( i = n; i--; ) {
										if ( binaryList[ i ] == 1 ) {
											p *= parseFloat( elements[ i ].value );
											
											var iteration_element = {};
											var element_item = elements[ i ];
											var outcome_id = element_item.getAttribute('outcome_id');
											var market_id = element_item.getAttribute('market_id');
											var event_id = element_item.getAttribute('event_id');
											var odds = element_item.value;
											
											iteration_element.outcome_id = outcome_id;
											iteration_element.market_id = market_id;
											iteration_element.event_id = event_id;
											iteration_element.odds = odds;
											
											posible_bets[count].push(iteration_element);
											
											if ($.inArray(outcome_id, existing_unique_stakes) == '-1') {
												unique_stakes.push(iteration_element);
												existing_unique_stakes.push(outcome_id);
											}
											cn++;
										}
									}
									p = resultWin[ o.resultWin ] ( p );
									min = Math.min( min, p );
									max = Math.max( max, p );
									all.push(p);
									if ( cn in bonusList ) {
										bonus += p * bonusList [ cn ];
									}
									cf += p;
									count++;
								}
								
								posible_bets.pop(); // remove last empty element
								
								var winning_combinations 	= this.getWinningBetCombinations(posible_bets, unique_stakes);
								var combinations_count 		= this.getStakeCombinations(e, posible_bets);
								
								if (winning_combinations.length > 0) {
									var result_odd = this.getMaxSystemOdd(winning_combinations); // maximum system odd with intersections
								} else {
									var result_odd = cf;
								}
								
								var $result = { 
									prod	:	result_odd + bonus,
									count	:	count,
									min		:	min, 
									max		:	max, 
									all		:	all, 
									bonus	:	cf && Math.round(100*bonus / cf) || 0,
									combinations_count: combinations_count
								};
								
								return $result;
							},
							getStakeCombinations: function($zero_map, $posible_bets) {
								var $allowedCombinationsMap = [], $maximumCombinationsMap = [];
								
								for (var i=0; i < $zero_map.length; i++) {
									$allowedCombinationsMap.push(1);
								}

								var unique_stakes = this.getUniqueStakes(context.$element.data.elements);
								if (!unique_stakes.length) {
									return;
								}
								
								for (var j=0; j < unique_stakes.length; j++) {
									$maximumCombinationsMap.push(1);
								}
								
								if (o.sportsbook_bet_resolve_conflict) {
									var $group_count = this.groupStakesByConflictKey(unique_stakes);
									$allowedCombinationsMap = getCombinations($group_count, 1);
									$allowedCombinationsMap.push(1);
								}
								
								var $stake_combinations = [];
								var $combination_count = $maximumCombinationsMap.length;

								var count_active_bankers = this.getCountActiveBankers(context.$element.bankers);
								var $combinations = Math.combinations(($combination_count - count_active_bankers));
								
								for (i in $combinations) {
									var $combination = $combinations[i];
									var $combination_rank = array_sum($combination);
									
									if (!$allowedCombinationsMap[$combination_rank] || 0 == $combination_rank) {
										continue;
									}
									
									$stakes = array_intersect_key(unique_stakes, array_filter($combination));
									
									$is_stakes_intersects = this.isStakeEventsIntersects($stakes);
									
									if ($is_stakes_intersects) {
										continue;
									}

									$stake_combinations.push($stakes);

								}
								
								var $combinations_count = {};
								for (i in $stake_combinations) {
									var $stake_combination = $stake_combinations[i];
									var $combination_count = count_parameters($stake_combination);
									
									if (!$combinations_count[$combination_count]) {
										$combinations_count[$combination_count] = 0;
									}
									
									$combinations_count[$combination_count] += 1;
								}
								
								return $combinations_count;
								
							},
							groupStakesByConflictKey: function(stakes) {
								var groups = {};
								var key = o.conflict_markets_key == 'mid' ? 'event_id' : 'market_id';
								
								for (i in stakes) {
									var stake = stakes[i];
									groups[stake[key]] = stake[key];
									
								}
								return count_parameters(groups);
							},
							isStakeEventsIntersects: function(stakes, $compare_by_all) {
								$key 		= (o.conflict_markets_key == 'mid') ? 'event_id' : 'market_id';
								$key_else 	= ($key == 'market_id') ? 'event_id' : 'market_id';

								var $event_ids = {}, $market_ids = {};
								for (i in $stakes) {
									var $stake = $stakes[i];
									
									$event_ids[$stake[$key]] = $stake[$key];
									$market_ids[$stake[$key_else]] = $stake[$key_else];
								}
								
								$count_events 	= count_parameters($event_ids);
								$count_stakes 	= count_parameters($stakes);
								$count_markets 	= count_parameters($market_ids);

								return ($count_events < $count_stakes);
							},
							getWinningBetCombinations: function(posible_bets, unique_stakes) {
								var mutual_stake_groups 	
								= this.getMutualStakeGroups(unique_stakes);
								var nonmutual_combinations 	= this.getSetCombinations(mutual_stake_groups);
								
								var winnig_combinations = [];
								for (var i = 0; i < nonmutual_combinations.length; i++) {
									var nonmutual_combination = nonmutual_combinations[i].slice();
									var bet_combination = [];
									for (var j = 0; j < posible_bets.length; j++) {
										var possible_bet = posible_bets[j].slice();
										
										if (!this.isStakeCombinationsMutual(nonmutual_combination, possible_bet)) {
											bet_combination.push(possible_bet);
										}
									}
									
									if (bet_combination.length > 0) {
										winnig_combinations.push(bet_combination);
									}
								}
								
								return winnig_combinations;
							},
							getMaxSystemOdd : function(combinations) {
								var odds = [];
								for (i in combinations) {
									odds.push(this.getBetCombinationOdds(combinations[i]));
								}
								
								if (odds.length == 0) {
									return 0;
								}
								
								return this.maxArrayElement(odds);
							},
							
							maxArrayElement: function(array) {
								var max_element = array[0];
								for (i in array) {
									if (array[i] > max_element) {
										max_element = array[i];
									}
								}
								return max_element;
							},
							getBetCombinationOdds: function (bet_combination) {
								var total_odds = 0;
								for (i in bet_combination) {
									var bet_odds 	= 1;
									var stakes 		= bet_combination[i];
									
									for (j in stakes) {
										var stake = stakes[j];
										if (stake.odds) {
											bet_odds *= stake.odds;
										}
									}
									
									if (bet_odds > 1) {
										total_odds += bet_odds;
									}
								}
								
								return total_odds;
							},
							
							getMutualStakeGroups:  function(unique_stakes) {
								var mutual_groups = [];
								var existing_mutual_groups = [];
								var comparing_stakes = unique_stakes;
								
								for (i in unique_stakes) {
									var stake_master = unique_stakes[i];
									var mutual_group = [];
									var existing_mutual_group = [];
									
									for (j in comparing_stakes) {
										var stake_comparing = comparing_stakes[j];
										if (stake_comparing == null || stake_master == null) {
											continue;
										}
										
										if (this.isStakesMutual(stake_master, stake_comparing)) {
											mutual_group.push(stake_comparing)
											existing_mutual_group.push(stake_comparing.outcome_id);
											comparing_stakes[j] = null;
										}
									}
									
									if (mutual_group.length > 1) { 
										mutual_groups.push(mutual_group);
									}
								}
								
								return mutual_groups;
							},
							
							isStakesMutual: function(stake_a, stake_b) {
								var key = o.betcart_stakes_mutuality_key;
								return stake_a[key] == stake_b[key];
							},
							
							isStakeCombinationsMutual: function(stake_combination_a, stake_combination_b) {
								for (var i = 0; i < stake_combination_a.length; i++) {
									var stake_a = stake_combination_a[i];
									for (var j = 0; j < stake_combination_b.length; j++) {
										var stake_b = stake_combination_b[j];
										
										if (this.isStakesMutual(stake_a, stake_b) && (stake_a.outcome_id !== stake_b.outcome_id)) {
											return true;
										}
										
									}
								}
					
								return false;
							},
							
							getSetCombinations: function(sets) {
								if (sets.length == 0) {
									return [];
								}
								
								var current_set			= sets.pop();
								var rest_combinations	= this.getSetCombinations(sets);
								var full_combinations	= [];
								var iteration = "0";
								
								for (var iteration = 0; iteration < current_set.length; iteration++) {
									var element = current_set[iteration];
									if (rest_combinations.length == 0) {
										var array_element = [];
										array_element.push(element)
										full_combinations.push(array_element);
									}
									
									for (var iteration_j = 0; iteration_j < rest_combinations.length; iteration_j++) {
										//var combination = rest_combinations[iteration_j];
										var combination = rest_combinations[iteration_j].slice(); 
										if (!$j.isArray(combination)) {
											var combination = [];
										}
										
										combination.push(element);
										full_combinations.push(combination);
									}
								}
								
								return full_combinations;
							},
						};
						
						context.$elementCalculate.system.apply(context);
						context.$elementShow.system.apply(context);
						
						var countCheck = countOdds - context.$element.bankersCountCheck,
							iteration = 1,
							outHTML = [],
							bankersTitle = ""
						;
						
						if (context.elementType.index >= 0) {
							outHTML[0] = templates.tabs[context.elementType.index].checkboxTitle;
						}
						for ( var i = 0; i < countOdds; i++ ) {
							if ( context.$element.bankerIndexes[i] ) { continue; }
							var title = o.w[ iteration - 1 ] + (iteration == countCheck ? '' : _('s'));
							if ( context.$element.bankersCountCheck ) {
								bankersTitle = context.$element.bankersCountCheck + " " + _("Banker")+ (context.$element.bankersCountCheck > 1 ? _("s") : "") + " + ";
								title = bankersTitle + title;
							}

							var combinations_count = context.$element.data.combinations_count;
							
							outHTML[ outHTML.length ] = 
								templates.tabs[ context.elementType.index ].checkbox.supplant({
									count: combinations_count[iteration] || 0,//Math.combination(iteration, countCheck),
									title: title,
									val: (reFloat.test($.trim(context.$element.stake.val())) ? d2($.trim(context.$element.stake.val())) : d2(0)),
									currency: o.currency,
									index: iteration - 1,
									iteration: iteration,
									total: countCheck,
									bankersTitle: bankersTitle
								});
							iteration++;
						}
						context.$element.checkboxList.html(outHTML.join(''));
						context.$element.checkboxListValue = null;
						
						context.$elementCalculate.system.apply(context);
						var stakeTrimValue = $.trim(context.$element.stake.val()),
							stakeValue = reFloat.test(stakeTrimValue) ? parseFloat(stakeTrimValue) : 0;
							
						context.$element.data.val = stakeValue;
						context.$elementShow.system.apply(context);
					
						
						context.$element.input_variants.bind('change', function(e) {
							var $value = $(this).val();
							var $parent = $(this).closest('.betcart-pane-bottom');
							
							//add all variants hidden class
							$($parent).find('.input_variant').addClass('g-hidden');
							
							$($parent).find('.' + $value + '_input').removeClass(hiddenClass);
							$($parent).find('.' + $value + '_var').addClass(hiddenClass);
							
						});
						
						
						context.$element.checkboxList.find('a, input[type="checkbox"]').unbind('click').bind('click', function(e) {
							e.preventDefault();
							var $this = $(this).closest('.betcart-pane-checkbox-item').toggleClass('betcart-pane-checkbox-item-active');
							
							var stakeTrimValue = $.trim(context.$element.stake.val()),
								stakeValue = reFloat.test(stakeTrimValue) ? parseFloat(stakeTrimValue) : 0,
								original_stake_value = stakeValue;
							
							if (o.tax_percent) {
								stakeValue = getAmountWithTaxPercent(stakeValue, o.tax_percent);
							}
							
							context.$elementCalculate.system.apply(context);
							context.$element.data.val = stakeValue;
							context.$elementShow.system.apply(context);
							
							if (e.originalEvent && !o.tax_percent) { // disable calculation to tax_percent system
								recalculateTab('system');
							}
							
						});
						
						if ( o.bankersEnabled ) {
							context.$element.bankersActivator.unbind('click').bind('click', function(e) {
								var label = e.target.previousSibling;
								if ( e.target.checked ) {
									context.$element.bankers.parent().show();
									if ( label && (" " + label.className + " ").indexOf(" checked ") < 0 ) {
										label.className = $.trim( label.className + " checked" );
									}
								} else {
									if ( label ) {
										label.className = $.trim( (" " + label.className + " ").replace(" checked ", " ") );
									}
									var reCalc = false;
									context.$element.bankers
										.each(function(){ 
											reCalc = reCalc || this.checked;
											this.checked = false;
										})
										.siblings(".checked")
										.removeClass("checked")
										.end()
										.parent()
										.hide()
									;
									if ( reCalc ) {
										context.$elementBindEvents.system.call(context);
									}
									
									context.$element.total_stake.keyup();
								}
							}).triggerHandler("click");
							
							context.$element.bankers.unbind('click').bind('click', function(e) {
								//debugger;
								if ( e.target.readOnly || e.target.disabled ) { 
									e.preventDefault();
									return; 
								}
								
								var label = e.target.previousSibling;
								if ( e.target.checked ) {
									if ( context.$element.bankersCountCheck < context.$element.bankersMaxCount && 
										 !( o.onlyOneOutcomeInCombination && context.$element.bankers
												.filter(":checked")
												.closest(".mid" + 
													$( e.target )
														.closest( "[class*=mid]" )
														.attr("class")
														.match(/\bmid(\d+)\b/)
														.pop() 
												).length > 1 
										  )
										
									) {
										context.$element.bankersCountCheck++;
										if ( (" " + label.className + " ").indexOf(" checked ") < 0 ) {
											label.className = $.trim(label.className + " checked");
										}
										if ( context.$element.bankersCountCheck == context.$element.bankersMaxCount ) {
											context.$element.addClass("betcart-pane-bankers-readonly");
										}
									} else {
										e.target.checked = false;
									}
								} else {
									if ( context.$element.bankersCountCheck == context.$element.bankersMaxCount ) {
										context.$element.removeClass("betcart-pane-bankers-readonly");
									}
									context.$element.bankersCountCheck--;
									label.className = $.trim((" " + label.className + " ").replace(" checked ", " "));
								}
								context.$element.checkboxListValue = context.$element.checkboxList.children(".betcart-pane-checkbox-item").map(function() { return ~~($(this).hasClass('betcart-pane-checkbox-item-active')); });
								context.$elementBindEvents.system.call(context);
							});
						}
						
						var $bind_key = o.mobi_theme ? "keyup click" : "keyup";
						
						context.$element.stake
							.unbind('keyup focus blur')
							.bind($bind_key, function( e, autoupdate ) {
								if ( e.target.readOnly || e.target.disabled ) { return; }
							
								var _value = $.trim( e.target.value ).replace(',','.');
								var _float = parseFloat(_value);
								
								if (!_value && o.overwrite_default_stake) {
									_value = o.overwrite_default_stake;
									e.target.value = _value;
								}
								
								if (o.tax_percent) {
									_value = getAmountWithTaxPercent(_value, o.tax_percent);
								}
								
								if( _value === e.target.oldValue ) { return; }
								
								e.target.oldValue = _value;
								
								context.$element.data.val = reFloat.test( _value ) ? parseFloat( _value ) : 0;
								
								if (this.timer) { clearTimeout(this.timer); }
								
								if( autoupdate ) {
									context.$elementShow.system.apply(context);
								} else {
									this.timer = setTimeout(function(){
										context.$elementShow.system.apply(context);
									}, o.update_timeout);
								}
							})
							.bind('focus', function( e ) {
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( parseInt(e.target.value) ) { return; }
								
								var $float = parseFloat(e.target_value);
								if (o.clear_input && !$float) {
									e.target.value = '';
								}
							})
							.bind('blur', function( e ) {
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( $.trim(e.target.value) ) { return; }
								
								/*e.target.value = d2(0);*/
								
							})
							.bind('keydown', function( e ) {
								if (e.which == 13 && o.placebet_by_enter) {
									$(this).closest('.betcart-pane').find('.b-button_conf').click();
								}
							});
						;
						
						context.$element.potential.find('input')
							.unbind('keyup focus blur')
							.bind('keyup', function( e ) {
								if ( e.target.readOnly || e.target.disabled ) { return; }
								var _value = $.trim( e.target.value ).replace(',','.');
								
								if( _value === e.target.oldValue ) { return; }
								
								e.target.viewValue = e.target.oldValue = _value;
	
								if (this.timer) { clearTimeout(this.timer); }
								this.timer = setTimeout(function(){ 
									context.$element.stake
										.val( d2( (reFloat.test( _value ) ? parseFloat( d2( _value ) ) : 0) / context.$element.data.p ) )
										.triggerHandler('keyup', [true])
									;
								}, o.update_timeout);
							})
							.bind('focus', function( e ) {
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( parseFloat(e.target.value) ) { return; }
								
								var $float = parseFloat(e.target_value);
								if (o.clear_input && !$float) {
									e.target.value = '';
								}
							})
							.bind('blur', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( $.trim(e.target.value) ) { return; }
								/*e.target.value = d2(0);*/
							})
							.triggerHandler('blur')
						;
						
						context.$element.total_stake.find('input')
							.unbind('keyup focus blur')
							.bind($bind_key, function( e ) {
								if ( e.target.readOnly || e.target.disabled ) { return; }
								var _value = $.trim( e.target.value ).replace(',','.');
								var _float = parseFloat(_value);
								
								if (!_float && o.overwrite_default_stake) {
									_value = d2(o.overwrite_default_stake);
								} else {
									e.target.viewValue = e.target.oldValue = _value;
									e.target.value = e.target.oldValue = _value;
								}
								
								if (this.timer) { clearTimeout(this.timer); }
								this.timer = setTimeout(function(){ 
									var event_count = context.$element.data.l;
									
									if (!event_count) {
										context.$element.stake
											.val( d2(o.overwrite_default_stake) )
											.triggerHandler('keyup', [true])
										;
										
										return;
									}
									
									var stake_value = d2(reFloat.test(_value) ? parseFloat( d2(_value) )/ event_count : 0);
									
									if (!_float) {
										stake_value =  d2(o.overwrite_default_stake);
									}
									
									context.$element.stake
										.val( stake_value )
										.triggerHandler('keyup', [true])
									;
									context.$element.stake_var.find('var')
										.html( stake_value )
									;
									
								}, o.update_timeout);
								
								if (e.originalEvent) {
									$('div#combined-pane .betcart-pane-bottom').find('.betcart-pane-bottom-total-stake input').val(d2(_value));
									recalculateTab('combined');
								}
							})
							.bind('focus', function( e ) {
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( parseFloat(e.target.value) ) { return; }
								
								var $float = parseFloat(e.target_value);
								if (o.clear_input && !$float) {
									e.target.value = '';
								}
							})
							.bind('blur', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( $.trim(e.target.value) ) { return; }
								e.target.value = d2(0);
							})
							.bind('keydown', function( e ) {
								if (e.which == 13 && o.placebet_by_enter) {
									$(this).closest('.betcart-pane').find('.b-button_conf').click();
								}
							})
							
						;
	
						context.$element.buypoints.unbind('change').bind('change', function(){
							var $this = $(this),
								$parent = $this.closest('.betcart-pane-event'),							
								$odds = $parent.find('input.data-odds'),
								$buypoints = $parent.find('input.data-buypoints');

								var source_odds = $odds.data("sourceOdd") || $odds.val();
								$odds.val( $this.val().split('#')[0] );	//buypointed odds calculated on server-side
								$buypoints.val( $this.val().split('#')[1] );
								context.$element.odds = context.$element.find("input.data-odds");							
								
								context.$elementCalculate.system.apply(context);
								
								stakeTrimValue = $.trim(context.$element.stake.val());
								stakeValue = reFloat.test(stakeTrimValue) ? parseFloat(stakeTrimValue) : 0;
								context.$element.data.val = stakeValue;
								
								context.$elementShow.system.apply(context);
								$odds.data("sourceOdd", source_odds);
						});
					},
					roundrobin: function() {
						var context = this;
						context.$element.stake = context.$element.bottom.children(".betcart-pane-bottom-stake").find('input');
						context.methods = {
							eliminated: function (arr, e) {
								var summ = 0;
								for (i = 0; i < arr.length; i++) { summ += arr[i]; }
								for (i = 0; i < e.length; i++) { if (e[i] == 0 && summ == i + 1) { return true; } }
								return false;
							},
							product : function (elements, e) {
								var n = elements.size(), b = [], p = 0;
								for (i = 0; i < n; i++) {
									b[i] = 0;
								}
								
								var cf = 0;
								while (true) {
									var i = 0;
									while (b[i] == 1) { b[i] = 0; i++; }
									if (i == n) { break; }
									b[i] = 1;
									if (e != null && this.eliminated(b, e)) { continue; }
									p = 1;
									for (i = 0; i < n; i++) { if (b[i] == 1) {
										p *= parseFloat(elements[i].value); } 
									}
									cf += resultWin[o.resultWin] ( p );
								}
								return cf;
							}
						};
						
						context.$elementCalculate.roundrobin.apply(context);
						context.$elementShow.roundrobin.apply(context);
						
						for (var i = 0, n = context.$element.odds.size(), arr = []; i < n; i++) {
							arr.push(
								templates.tabs[ context.elementType.index ].checkbox.supplant({
									count: Math.combination(i + 1, n),
									title: o.w[i] + ( (i + 1 == n) ? '' : _('s')),
									val: (reFloat.test($.trim(context.$element.stake.val())) ? d2($.trim(context.$element.stake.val())) : d2(0)),
									currency: o.currency,
									index: i,
									iteration: i+1
								})
							);
						}
						
						arr.unshift( templates.tabs[ context.elementType.index ].checkboxTitle );
						context.$element.checkboxList.html(arr.join('')).find('.betcart-pane-checkbox-item:first').removeClass('betcart-pane-checkbox-item-active').css('display','none');
						
						context.$elementCalculate.roundrobin.apply(context);
						var stakeTrimValue = $.trim(context.$element.stake.val()),
							stakeValue = reFloat.test(stakeTrimValue) ? parseFloat(stakeTrimValue) : 0;
						
						context.$element.data.val = stakeValue;
						context.$elementShow.roundrobin.apply(context);
					
						context.$element.checkboxList.find('a, input[type="checkbox"]').unbind('click').bind('click', function(e) {
							e.preventDefault();
							
							var $this = $(this).closest('.betcart-pane-checkbox-item').toggleClass('betcart-pane-checkbox-item-active');
							
							var stakeTrimValue = $.trim(context.$element.stake.val()),
								stakeValue = reFloat.test(stakeTrimValue) ? parseFloat(stakeTrimValue) : 0;
							
							context.$elementCalculate.roundrobin.apply(context);
							context.$element.data.val = stakeValue;
							context.$elementShow.roundrobin.apply(context);
							
						});
					
						context.$element.stake
							.unbind('keyup focus blur')
							.bind('keyup', function( e, autoupdate ) {
								
								if ( e.target.readOnly || e.target.disabled ) { return; }
								
								var _value = $.trim( e.target.value ).replace(',','.');
								
								if( _value === e.target.oldValue ) { return; }
								
								e.target.oldValue = _value;
								
								context.$element.data.val = reFloat.test( _value ) ? parseFloat( _value ) : 0;
								
								if ( this.timer ) { clearTimeout(this.timer); }
								
								if( autoupdate ) {
									context.$elementShow.roundrobin.apply(context);
								} else {
									this.timer = setTimeout(function(){ 
										context.$elementShow.roundrobin.apply(context);
									}, o.update_timeout);
								}
								
							})
							.bind('focus', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( parseFloat(e.target.value) ) { return; }
								e.target.value = '';
							})
							.bind('blur', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( $.trim(e.target.value) ) { return; }
								e.target.value = d2(0);
							})
						;
						
						context.$element.potential.find('input')
							.unbind('keyup')
							.bind('keyup', function( e ) {
								
								if ( e.target.readOnly || e.target.disabled ) { return; }
								
								var _value = $.trim( e.target.value ).replace(',','.');
								
								if( _value === e.target.oldValue ) { return; }
								
								e.target.viewValue = e.target.oldValue = _value;
								
								if ( this.timer ) { clearTimeout(this.timer); }
								
								this.timer = setTimeout(function(){ 
									context.$element.stake
										.val( d2( (reFloat.test( _value ) ? parseFloat( _value ) : 0) /context.$element.data.p) )
										.triggerHandler('keyup', [true])
									;
								}, o.update_timeout);
							})
							.bind('focus', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( parseFloat(e.target.value) ) { return; }
								e.target.value = '';
							})
							.bind('blur', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( $.trim(e.target.value) ) { return; }
								e.target.value = d2(0);
							})
							.triggerHandler('blur')
						;
						
						context.$element.buypoints.unbind('change').bind('change', function(){
							var $this = $(this),
								$parent = $this.closest('.betcart-pane-event'),							
								$odds = $parent.find('input.data-odds'),
								$buypoints = $parent.find('input.data-buypoints');

								var source_odds = $odds.data("sourceOdd") || $odds.val();
								$odds.val( $this.val().split('#')[0] ); //buypointed odds calculated on server-side	
								$buypoints.val( $this.val().split('#')[1] );
								context.$element.odds = context.$element.find("input.data-odds");							
								
								context.$elementCalculate.roundrobin.apply(context);
								
								stakeTrimValue = $.trim(context.$element.stake.val());
								stakeValue = reFloat.test(stakeTrimValue) ? parseFloat(stakeTrimValue) : 0;
								context.$element.data.val = stakeValue;
								
								context.$elementShow.roundrobin.apply(context);
								$odds.data("sourceOdd", source_odds);
						});
	
					},
					ifbet: function() {
						var context = this;
						context.$element.stake = context.$eventList.find('.betcart-pane-event-stake input');
						context.$elementCalculate.ifbet.apply(context);
						context.$elementShow.ifbet.apply(context);
						
						var fnKeyupEvent = function( e, autoupdate ) {
							
							if ( e.target.readOnly || e.target.disabled ) { return; }
							
							var _value = $.trim( e.target.value ).replace(',','.');
							
							if( _value === e.target.oldValue ) { return; }
							
							e.target.oldValue = _value;
							
							var $this = $(this),
								$parentElement = $this.closest(".betcart-pane-event");
								
							if ( ($parentElement.prev().size() && $parentElement.prev().attr('ifbet') && parseFloat ( $parentElement.prev().find('.betcart-pane-event-stake input').val() ) > 0) 
								|| ( !$parentElement.prev()[0] && !$parentElement.attr('ifbet') ) ){
								$parentElement.attr('ifbet', true );
							}
							
							if( !$parentElement.attr('ifbet') ){
								$this.val( d2(0) );
								return;
							}
							
							if( 0 === parseFloat( $this.val() ) ) {
								$parentElement.nextAll('.betcart-pane-event').removeAttr('ifbet');
							} else {
								$parentElement.next('.betcart-pane-event').attr('ifbet', true);
							}
							
							if ( this.timer ) {
								clearTimeout( this.timer );
							}
							
							if( autoupdate ) {
								context.$elementCalculate.ifbet.apply(context);
								context.$elementShow.ifbet.apply(context);
							} else {
								this.timer = setTimeout(function() {
									context.$elementCalculate.ifbet.apply(context);
									context.$elementShow.ifbet.apply(context);
								}, o.update_timeout);
							}
							
						};
						
						var fnUpdateValue = function() {
							var context = this;
							context.$elementCalculate.ifbet.apply(context);
							for(var i = 0, n = context.$element.stake.size(); i < n; i++) {
								var $element = $( context.$element.stake[i] ),
									$parentElement = $element.closest(".betcart-pane-event");
								
								if( !$parentElement.attr('ifbet') ){
									$element.val(0);
								}
								
								if( 0 == $element.val() ) {
									$parentElement.nextAll('.betcart-pane-event').removeAttr('ifbet');
								}
							
							}
						};
						
						var fnChangeTabIndex = function( $firstElement, $secondElement ){
							var tempTabIndex = $firstElement.attr( 'tabindex' );
							$firstElement.attr( 'tabindex', $secondElement.attr('tabindex') );
							$secondElement.attr( 'tabindex', tempTabIndex );
						};
						
						context.$element.stake
							.unbind('keyup focus blur')
							.bind('keyup', fnKeyupEvent )
							.bind('focus', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( parseFloat(e.target.value) ) { return; }
								e.target.value = '';
							})
							.bind('blur', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( $.trim(e.target.value) ) { return; }
								e.target.value = d2(0);
							})
						;
						
						context.$element.eventPotential.find('input')
							.unbind('keyup focus blur')
							.bind('keyup', function( e ) {
								
								if ( e.target.readOnly || e.target.disabled ) { return; }
								
								var _value = $.trim( e.target.value ).replace(',','.');
								
								if( _value === e.target.oldValue ) { return; }
								
								e.target.viewValue = e.target.oldValue = _value;
								
								var $this = $(this),
									$parentElement = $this.closest('.betcart-pane-event');
								
								if( !$parentElement.attr('ifbet') ){
									$this.val( d2(0) );
									return;
								}
								
								if( 0 === parseFloat( $this.val() ) ) {
									$parentElement.nextAll('.betcart-pane-event').removeAttr('ifbet');
								} else {
									$parentElement.next('.betcart-pane-event').attr('ifbet', true);
								}
								
								if ( this.timer ) {
									clearTimeout( this.timer );
								}
								
								this.timer = setTimeout(function() {
									$parentElement
										.find('.betcart-pane-event-stake input')
										.val( d2( _value / resultWin[o.resultWin]( $parentElement.find('input.data-odds').val() ) ) )
										.triggerHandler('keyup', [true])
									;
								}, o.update_timeout);
							})
							.bind('focus', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( parseFloat(e.target.value) ) { return; }
								e.target.value = '';
							})
							.bind('blur', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( $.trim(e.target.value) ) { return; }
								e.target.value = d2(0);
							})
							.triggerHandler('blur')
						;
					
						context.$element.select.unbind('change').bind('change', function(){
							fnUpdateValue.apply(context);
							context.$elementCalculate.ifbet.apply(context);
							context.$elementShow.ifbet.apply(context);
						});
					
						context.$element.find('a.betcart-pane-event-arrow-up').die().live('click', function(e) {
							
							e.preventDefault();
							
							this.$element = $(this).closest('.betcart-pane-event');
							this.$prevElement = this.$element.prev();
							this.$beforeElement = this.$element.clone(true);
							this.$element.remove();
							
							this.$beforeElement.insertBefore( this.$prevElement );
							
							fnChangeTabIndex( this.$prevElement.find('.betcart-pane-event-stake input'), this.$beforeElement.find('.betcart-pane-event-stake input') );
							
							if( this.$prevElement.hasClass('betcart-pane-event-first-child') ) {
								this.$prevElement.removeClass('betcart-pane-event-first-child').prev().addClass('betcart-pane-event-first-child');
							}
							
							if( this.$beforeElement.hasClass('betcart-pane-event-last-child') ) {
								this.$beforeElement.removeClass('betcart-pane-event-last-child').next().addClass('betcart-pane-event-last-child');
							}
							
							if( this.$prevElement.attr('ifbet') && !this.$beforeElement.attr('ifbet') ) {
								this.$beforeElement.attr('ifbet', true);
							}
							
							context.$element.stake = context.$element.find('.betcart-pane-event-stake input');
							context.$element.odds = context.$element.find("input.data-odds");
							context.$element.eventPotential = context.$element.find(".betcart-pane-event-potential");
							
							context.$element.stake.unbind('keyup').bind('keyup', function() {
								fnKeyupEvent.apply(this);
							});
							
							fnUpdateValue.apply(context);
							context.$elementCalculate.ifbet.apply(context);
							context.$elementShow.ifbet.apply(context);
						});
						
						context.$element.find('a.betcart-pane-event-arrow-down').die().live('click', function(e) {
							
							e.preventDefault();
							
							this.$element = $(this).closest('.betcart-pane-event');
							this.$nextElement = this.$element.next();
							this.$afterElement = this.$element.clone(true);
							this.$element.remove();
							
							this.$afterElement.insertAfter( this.$nextElement );
							
							this.$afterElement = this.$nextElement.next();
							
							fnChangeTabIndex( this.$afterElement.children('.betcart-pane-event-stake').find('input'), this.$nextElement.children('.betcart-pane-event-stake').find('input') );
							
							if( this.$nextElement.hasClass('betcart-pane-event-last-child') ) {
								this.$nextElement.removeClass('betcart-pane-event-last-child').next().addClass('betcart-pane-event-last-child');
							}
							
							if( this.$afterElement.hasClass('betcart-pane-event-first-child') ) {
								this.$afterElement.removeClass('betcart-pane-event-first-child').prev().addClass('betcart-pane-event-first-child');
							}
							
							if( !this.$nextElement.attr('ifbet') && this.$afterElement.attr('ifbet') ) {
								this.$nextElement.attr('ifbet', true);
							}
							
							context.$element.stake = context.$element.find('.betcart-pane-event-stake input');
							context.$element.odds = context.$element.find("input.data-odds");
							context.$element.eventPotential = context.$element.find(".betcart-pane-event-potential");
							
							context.$element.stake.unbind('keyup').bind('keyup', function() {
								fnKeyupEvent.apply(this);
							});
							
							fnUpdateValue.apply(context);
							context.$elementCalculate.ifbet.apply(context);
							context.$elementShow.ifbet.apply(context);
	
						});
				
						context.$element.buypoints.unbind('change').bind('change', function(){
							var $this = $(this),
								$parent = $this.closest('.betcart-pane-event'),							
								$odds = $parent.find('input.data-odds'),
								$buypoints = $parent.find('input.data-buypoints');

								var source_odds = $odds.data("sourceOdd") || $odds.val();
								$odds.val( $this.val().split('#')[0] ); //buypointed odds calculated on server-side	
								$buypoints.val( $this.val().split('#')[1] );
								context.$element.odds = context.$element.find("input.data-odds");							
								
								context.$elementCalculate.ifbet.apply(context);
								context.$elementShow.ifbet.apply(context);
								$odds.data("sourceOdd", source_odds);
						});
					},
					reverse: function() {
						var context = this;
						context.$element.stake = context.$element.bottom.children(".betcart-pane-bottom-stake").find('input');
						
						context.$elementCalculate.reverse.apply(context);
						
						var stakeTrimValue = $.trim(context.$element.stake.val()),
							stakeValue = reFloat.test(stakeTrimValue) ? parseFloat(stakeTrimValue) : 0;
						
						context.$element.data.val = stakeValue;
						context.$elementShow.reverse.apply(context);
						
						context.$element.input_variants.bind('change', function(e) {
							
							var $value = $(this).val();
							var $parent = $(this).closest('.betcart-pane-bottom');
							
							//add all variants hidden class
							$($parent).find('.input_variant').addClass('g-hidden');
							
							$($parent).find('.' + $value + '_input').removeClass(hiddenClass);
							$($parent).find('.' + $value + '_var').addClass(hiddenClass);
							
						});
						
						context.$element.stake
							.unbind('keyup focus blur')
							.bind('keyup', function( e, autoupdate ) {
							
								if ( e.target.readOnly || e.target.disabled ) { return; }
							
								var _value = $.trim( e.target.value ).replace(',','.');
								
								if( _value === e.target.oldValue ) { return; }
								
								e.target.oldValue = _value;
								
								context.$element.data.val = reFloat.test( _value ) ? parseFloat( _value ) : 0;
								
								if (this.timer) { clearTimeout(this.timer); }
								
								if( autoupdate ) {
									context.$elementShow.reverse.apply(context);
								} else {
									this.timer = setTimeout(function(){ 
										context.$elementShow.reverse.apply(context);
									}, o.update_timeout);
								}
								
							})
							.bind('focus', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( parseFloat(e.target.value) ) { return; }
								e.target.value = '';
							})
							.bind('blur', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( $.trim(e.target.value) ) { return; }
								e.target.value = d2(0);
							})
						;						
						context.$element.potential.find('input')
							.unbind('keyup focus blur')
							.bind('keyup', function( e ) {
							
								if ( e.target.readOnly || e.target.disabled ) { return; }
							
								var _value = $.trim( e.target.value ).replace(',','.');
								
								if( _value === e.target.oldValue ) { return; }
								
								e.target.viewValue = e.target.oldValue = _value;
									
								if ( this.timer ) { clearTimeout(this.timer); }
	
								this.timer = setTimeout(function(){ 
									context.$element.stake
										.val( d2 ( (reFloat.test( _value ) ? parseFloat( _value ) : 0) / context.$element.data.p ) )
										.triggerHandler('keyup', [true]);
								}, o.update_timeout);
							})
							.bind('focus', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( parseFloat(e.target.value) ) { return; }
								e.target.value = '';
							})
							.bind('blur', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( $.trim(e.target.value) ) { return; }
								e.target.value = d2(0);
							})
							.triggerHandler('blur')
						;
						
						context.$element.total.find('input')
							.unbind('keyup focus blur')
							.bind('keyup', function( e ) {
								var $parent = $('#reverse-pane');
								var $bets_number = $parent.find('.betcart-pane-bottom-count var').html();
								
								if ( e.target.readOnly || e.target.disabled ) { return; }
							
								var _value = $.trim( e.target.value ).replace(',','.');
								
								if( _value === e.target.oldValue ) { return; }
									
								if ( this.timer ) { clearTimeout(this.timer); }
	
								this.timer = setTimeout(function(){ 
									var $value = d2 ( _value / $bets_number );
									
									context.$element.stake
										.val( $value )
										.triggerHandler('keyup', [true]);
								}, o.update_timeout);
							})
							.bind('focus', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( parseFloat(e.target.value) ) { return; }
								e.target.value = '';
							})
							.bind('blur', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( $.trim(e.target.value) ) { return; }
								e.target.value = d2(0);
							})
							.triggerHandler('blur')
						;
						
						context.$element.buypoints.unbind('change').bind('change', function(){
							var $this = $(this),
								$parent = $this.closest('.betcart-pane-event'),							
								$odds = $parent.find('input.data-odds'),
								$buypoints = $parent.find('input.data-buypoints');

								var source_odds = $odds.data("sourceOdd", source_odds) || $odds.val();
								$odds.val( $this.val().split('#')[0] ); //buypointed odds calculated on server-side	
								$buypoints.val( $this.val().split('#')[1] );
								context.$element.odds = context.$element.find("input.data-odds");							
								
								context.$elementCalculate.reverse.apply(context);
								
								stakeTrimValue = $.trim(context.$element.stake.val());
								stakeValue = reFloat.test(stakeTrimValue) ? parseFloat(stakeTrimValue) : 0;
								context.$element.data.val = stakeValue;
								
								context.$elementShow.reverse.apply(context);
								$odds.data("sourceOdd", source_odds);
						});
	
					},
					teaser: function() {
						var context = this;
						context.$element.stake = context.$element.bottom.children(".betcart-pane-bottom-stake").find('input');
						context.$elementCalculate.teaser.apply(context);
						context.$elementShow.teaser.apply(context);
						var selectHTML = templates.tabs[o.teaser.index].option.supplant({'value': self.Teaser.decimalCoeff,'text':'Select'})+ self.Teaser.value().join('');
						context.$element.select.html( selectHTML ).unbind('change').bind('change', function(){
							context.$elementCalculate.teaser.apply(context);
							context.$elementShow.teaser.apply(context);
						});
					
						context.$element.stake
							.unbind('keyup')
							.bind('keyup', function( e, autoupdate ) {
								
								if ( e.target.readOnly || e.target.disabled ) { return; }
								
								var _value = $.trim( e.target.value ).replace(',','.');
								
								if( _value === e.target.oldValue ) { return; }
								
								e.target.oldValue = _value;
								
	//							this.newStakeValue = reFloat.test( _value ) ? parseFloat( _value ) : 0;
								
								if (this.timer) { clearTimeout(this.timer); }
								
								if( autoupdate ) {
									context.$elementCalculate.teaser.apply(context);
									context.$elementShow.teaser.apply(context);
								} else {
									this.timer = setTimeout(function() { 
										context.$elementCalculate.teaser.apply(context);
										context.$elementShow.teaser.apply(context);
									}, o.update_timeout);
								}
								
							})
							.bind('focus', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( parseFloat(e.target.value) ) { return; }
								e.target.value = '';
							})
							.bind('blur', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( $.trim(e.target.value) ) { return; }
								e.target.value = d2(0);
							})
						;						
						context.$element.potential.find('input')
							.unbind('keyup')
							.bind('keyup', function( e ) {
								
								if ( e.target.readOnly || e.target.disabled ) { return; }
								
								var _value = $.trim( e.target.value ).replace(',','.');
								
								if( _value === e.target.oldValue ) { return; }
								
								e.target.viewValue = e.target.oldValue = _value;
								
								if( context.$element.data.t == 0 ) {
									this.value = d2(0);
									return;
								}
								
								if (this.timer) { clearTimeout(this.timer); }
								
								this.timer = setTimeout(function() { 
									context.$element.stake
										.val( d2( (reFloat.test( e.target.value ) ? parseFloat( e.target.value ) : 0) / resultWin[o.resultWin]( context.$element.data.t ) ) )
										.triggerHandler('keyup', [true]);
								}, o.update_timeout);
							})
							.bind('focus', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( parseFloat(e.target.value) ) { return; }
								e.target.value = '';
							})
							.bind('blur', function( e ){
								if ( e.target.readOnly || e.target.disabled ) { return; }
								if ( $.trim(e.target.value) ) { return; }
								e.target.value = d2(0);
							})
							.triggerHandler('blur')
						;
					}

				},
				$elementCalculate: {
					single: function() {
						var context = this, elements = context.$element.stake;
						var length = elements.size(), total = 0, prod = 0, prod_original = 0, prod_liability_total = 0, summary = 0, vector = [], vector_original = [], odds_value;
						var stake_total = context.$element.stake_total;
						
						if (length == 0) {
							context.$element.data = {
								l: length,
								t: total,
								p: prod,
								plt: prod_liability_total,
								v: vector,
								s: summary
							};
							return;
						}
						
						elements.each(function(i) {
							var $this = $(this), trimValue = $.trim($this.val());
							if (stake_total) {
								trimValue = (stake_total.val());
							}
							
							
							if (o.tax_percent) {
								trimValue = getAmountWithTaxPercent(trimValue, o.tax_percent).toString();
							}
							
							var value = reFloat.test(trimValue) ? parseFloat(trimValue.replace(',','.')) : 0;
							
							//round value to 2 digits
							if (o.tax_percent) {
								value = d2(value);
							}
							
							var $odds_value = $this.closest('.betcart-pane-event').find("input.data-odds").val();
							odds_value = $odds_value;
							
							//value = transformCoeff( transformCoeff(value, o.type), o.type, true );
							$odds_value = transformCoeff( transformCoeff($odds_value, o.type), o.type, true );
							
							total += value;
							
							vector[i] = value * resultWin[o.resultWin]( $odds_value );
							vector_original[i] = value * resultWin["pure"]( $odds_value );
							
							prod += vector[i];
							prod_original += vector_original[i];
							
							if (!$this.closest('.betcart-pane-event').find('.betcart-pane-event-potential').parent().hasClass('g-hidden-element0')) {
								prod_liability_total += vector[i];
							}
							
							//TODO: Maybe its here
							summary += value;
						});
						
						context.$element.data = {
							l: length,
							odds_value: odds_value,
							t: total,
							p: prod, // otential payout by resultWin function
							p_o: prod_original, // original potential payout
							plt: prod_liability_total, // potential payout with liability
							v: vector,
							v_o: vector_original, // original potential values
							s: summary
						};
						
						
						return;
					},
					combined: function() {
						var context = this, 
							methods = context.methods, 
							elements = context.$element.odds;
						
						var length = elements.size(), total = 1, prod = 0, summary = 0;
						if (length == 0) {
							context.$element.data = {
								l: length,
								t: total,
								p: prod,
								sum: summary,
								sa: 0
							};
							return;
						}
						var elements_count = 0;
						elements.each(function(i) {
							elements_count++;
							total *= this.value;
							summary -= (-this.value);
						});
						
						var e_count = getMaximumCombinations(elements, o.conflict_markets_key);
						
						var e = [];
						for (var i=0; i<e_count; i++) {
							if (i==e_count-1) {
								e.push(1);
							} else {
								e.push(0);
							}
						}
				
						total = transformCoeff( transformCoeff(total, o.type), o.type, true );

						var trimValue = $.trim(context.$element.stake.val());
						
						var value = reFloat.test(trimValue) ? d2(trimValue) : 0;
						
						var all = [], max_stake_win = 0;
						
						if (context.methods) {
							var methodProductsResult_ = context.methods.product( elements, e, o.systemBonus, o.systemFilter  );
							length = methodProductsResult_.count;
							all = methodProductsResult_.all;
							
						}
						
						prod = value * resultWin[o.resultWin] ( total );
						
						context.$element.data = {
							l: length,
							t: total,
							p: prod,
							all: all,
							count: elements_count,
							sum: summary,
							sa: value
						};
						
						return;
					},
					system: function() {
						var context = this, 
							methods = context.methods,
							$odds = context.$element.odds,
							bankersChecked = false,
							hasBankers = "bankers" in context.$element;
						
						if (!countCheck) {
							var countCheck = 0;
						}
						if ( hasBankers ) {
							context.$element.bankerIndexes = context.$element.bankers.map(function () { return this.checked; }).get();
							bankersChecked = context.$element.bankers.filter(function(){return this.checked;}).length;
						}
							
						if ( bankersChecked ) {
							$odds = $odds.filter(function( index ){ return !context.$element.bankerIndexes[index] });
						}
						
						var size = $odds.length,
							length = 0, 
							total = 0, 
							prod = 0,
							min = 0,
							max = 0,
							bonus = 0,
							summary = 0,
							li = context.$element.checkboxList.children(".betcart-pane-checkbox-item")
						;
						if ( !size ) {
							context.$element.data = {
								n: countCheck,
								l: length,
								t: total,
								p: prod
							};
							return;
						}
						
						var e = li.map(function(i) {
							return ~~($(this).hasClass('betcart-pane-checkbox-item-active'));
						});
						var trimValue = $.trim(context.$element.stake.val());
						var value = reFloat.test(trimValue) ? parseFloat(trimValue) : 0;

						var methodProductsResult_ = methods.product( $odds, e, o.systemBonus, o.systemFilter );
						
						prod = methodProductsResult_.prod;
						potential_payout = 0;
						min = methodProductsResult_.min;
						max = methodProductsResult_.max;
						bonus = methodProductsResult_.bonus
						length = methodProductsResult_.count;
						var combinations_count = methodProductsResult_.combinations_count;
						
						total = length * value;
						max_stake_win = 0;
						
						if (methodProductsResult_.all && o.combinedType == 'combined_system') {
							//max potential payout
							for (i in methodProductsResult_.all) {
								var element = methodProductsResult_.all[i];
								max_stake_win += element * value;
							}
							
							potential_payout = max_stake_win;
						}
						if ( bankersChecked ) {
							for ( var bankerIndex = context.$element.bankerIndexes.length; bankerIndex--; ) {
								if ( context.$element.bankerIndexes[ bankerIndex ] ) {
									var odds_ = context.$element.odds.eq( bankerIndex ).val();
									prod *= odds_;
									min = Math.min( min, odds_ );
									max = Math.max( max, odds_ );
								}
							}
						}
						
						context.$element.data = {
							n: size,
							l: length,
							t: total,
							p: prod,
							pot: potential_payout,
							min: min,
							max: max, 
							bonus : bonus,
							combinations_count : combinations_count
						};
						
						return;
					},
					roundrobin: function() {
						var context = this, methods = context.methods;
						var size = context.$element.odds.size(), length = 0, total = 0, prod = 0, e = [], li = context.$element.checkboxList.children(".betcart-pane-checkbox-item");
						if (size == 0) {
							context.$element.data = {
								n: size,
								l: length,
								t: total,
								p: prod
							};
							return;
						}
						li.each(function(i) {
							e[i] = $(this).hasClass('betcart-pane-checkbox-item-active') ? 1 : 0;
						});
						context.$element.odds.each(function(i){ length = e[i] == 1 ? length + Math.combination(i + 1, size) : length;  });
						var trimValue = $.trim(context.$element.stake.val());
						var value = reFloat.test(trimValue) ? parseFloat(trimValue) : 0;
						total = length * value;
						prod = methods.product(context.$element.odds, e);
						context.$element.data = {
							n: size,
							l: length,
							t: total,
							p: prod
						};
						return;
					},
					ifbet: function() {
						var context = this, elements = context.$element.stake;
						var ifbetType =  context.$element.select.val();
						var length = elements.size(), total = 0, prod = 0, vector = [], maxval = Number.MAX_VALUE;
						if (length == 0) {
							context.$element.data = {
								l: length,
								t: total,
								p: prod,
								v: vector
							};
						}
						elements.each(function(i) {
							var $this = $(this), 
								trimValue = $.trim($this.val()),
								value = reFloat.test(trimValue) ? parseFloat(trimValue) : 0,
								odds = $this.closest('.betcart-pane-event').find("input.data-odds").val();
								
								if( i === 0 ) {
									total = value;
								}
								
								$this.attr( 'maxval', maxval );
								
								if( i && value > maxval ) {
									$this.val( d2( maxval ) );
									value = maxval;
									var _potentialInput = $this.closest('.betcart-pane-event').find('.betcart-pane-event-potential input').get(0),
										_potentialValue = d2( maxval * resultWin[o.resultWin]( odds ) );
									_potentialInput.viewValue = _potentialInput.value =  _potentialValue;
								}
								
								vector[i] = value * resultWin[o.resultWin]( odds );
								prod += vector[i];
								maxval = ifbetType == 0 ? value * odds : total;
						});
						context.$element.data = {
							l: length,
							t: total,
							p: prod,
							v: vector
						}; 
						return;
					},
					reverse: function() {
						var context = this, methods = this.methods;
						var size = context.$element.odds.size(), length = 0, total = 0, prod = 0;
						if (size == 0) {
							context.$element.data = {
								n: size,
								l: length,
								t: total,
								p: prod
							};
							return;
						}
						length = 2 * Math.combination(2, size);
						var trimValue = $.trim(context.$element.stake.val());
						var value = reFloat.test(trimValue) ? parseFloat(trimValue) : 0;
						total = length * value;
						
						context.$element.odds.each(function(i){ prod += resultWin[o.resultWin]( 1.00 * context.$element.odds[i].value ); });
						prod = 2*( size - 1 ) * prod;
						
						context.$element.data = {
							n: size,
							l: length,
							t: total,
							p: prod
						};
						return;
					},
					teaser: function() {
						var context = this;
						var length = context.$element.odds.size(), total = 0, prod = 0;
						if (length == 0) {
							context.$element.data = {
								l: length,
								t: total,
								p: prod
							};
							return;
						}
//						total += context.$element.odds.val() * context.$element.select.val();
						total = context.$element.select.val();
						var trimValue = $.trim(context.$element.stake.val());
						var value = reFloat.test(trimValue) ? d2(trimValue) : 0;
						prod = value * resultWin[o.resultWin] (total);
						context.$element.data = {
							l: length,
							t: total,
							p: prod > 0 ? prod : 0
						};
						return;
					}
				},
				$elementShow: {
					single: function() {
						var $el = this.$element;
						$el.count.find("var").text( $el.data.l );
						$el.total_odds.find("var").text( $el.data.odds_value );
						$el.total.find("var").text( d2($el.data.t) );
						
						$el.tax_amount.find("var").text( o.tax_percent );
						
						$el.potential.find("var").text( d2($el.data.p));
						
						if(o.payout) {
							$el.potential.find("var").text( d2($el.data.p));
						} else {
							$el.potential.find("input").val( d2($el.data.p));
						}
						
						$el.lay_liability_total.find("var").text( d2($el.data.plt));
						
						var $picks_count = 1;
						$el.eventPotential.each(function(i){
							if(o.payout) { return $(this).find('var').text( d2($el.data.v[i]) ); } 
								
							var input = this.getElementsByTagName('input')[0];
							if( input.viewValue !== 0 ) {
								input.value = input.viewValue || '';
								input.viewValue = 0;
								input.realValue = d2( $el.data.v[i] );
							} else {
								input.realValue = input.value = d2( $el.data.v[i] );
							}
						});
						
						$value = d2($el.data.p / $el.data.l);
						//$el.all_stake.find('input').val( $value );
						$el.all_stake.find('var').html( $value );
						
						$value = d2($el.data.s);
						//$value = d2($el.data.t + $el.data.t);
						//$el.all_total.find('input').val($value );
						$el.all_total.find('var').html( $value );
						
						$value = d2($el.data.p);
						//$el.all_potential.find('input').val( $value );
						$el.all_potential.find('var').html( $value );
					},
					combined: function() {
						var $el = this.$element;
						$el.count.find("b").text( o.w[$el.data.l - 1] );
						var transCoeff = transformCoeff($el.data.t, o.type);
						
						if( (transCoeff+"").indexOf(".") > -1 ) {
							transCoeff = d2(transCoeff);
						}
						
						$el.count.find("var").text( $el.data.count );
						$el.tax_amount.find("var").text( o.tax_percent );
						
						var payout_ = $el.data.p;
						var combinedBonus_ = o.combinedBonus;
						
						if ( $.isArray(combinedBonus_) && ($el.data.count - 1) in combinedBonus_ ) {
							var bonus_amount = combinedBonus_[ $el.data.count - 1 ];
							$el.bonus.find("var").text( Math.round(100 * bonus_amount) + "%" );
							payout_ *= (1 + bonus_amount);
						}

						$el.total.find("var").text( d2(transCoeff) );
						
						if ( o.payout ) {
							var is_show = false;
							if ($el.data.new_stake) { 
								var stake_value = parseFloat(d2($el.data.new_stake));
							} else {
								is_show = true;
								var stake_value = d2($el.data.sa);
							}
							
							var max_odd = 0;
							if ($el.data.all && o.combinedType == 'combined_system') {
								//max potential payout
								var context 	= this;
								var $elements 	= $el.find('.betcart-pane-event-pick');
								var e_count 	= getMaximumCombinations($elements, o.conflict_markets_key);
								var e 			= getCombinations(e_count);
								var methodProductsResult_ = context.methods.odds( $elements, e, o.systemBonus, o.systemFilter  );
								$el.data.all = methodProductsResult_.all;
								
								$el.count.find("var").text( methodProductsResult_.count );
								
								max_odd = methodProductsResult_.prod;
								
								$el.total.find("var").text( d2(max_odd) );
								
								var max_stake_win = 0;
								
								if (is_show) {
									var max_stake_value = stake_value;
								} else {
									var max_stake_value = stake_value;
								}
								
								
								max_stake_win = (stake_value / methodProductsResult_.count) * max_odd;
								
								var $pot_value = max_stake_win;
							} else {
								var $pot_value = payout_;
							}
							
							var all_stake_amount = max_stake_value * $el.data.l;
							
							$pot_value *= $el.data.l;
							
							$el.potential.find("var").text( d2($pot_value) );
							$el.potential.find("input").val( d2($pot_value) );
							
							if (o.combinedType == 'combined_system') {
								$el.total.find("var").text( d2(max_odd) );
								$el.total.find("input").val( d2(max_odd) );
							}
							
							if (o.autoupdate_stake) {
								$el.total_stake.find("var").text( d2($el.data.l * stake_value) );
								$el.total_stake.find("input").val( d2($el.data.l * stake_value) );
							}
							
						} else {
							var input = $el.potential.find('input').get(0);
							if( input.viewValue !== 0 ) {
								input.value = input.viewValue || '';
								input.viewValue = 0;
								input.realValue = d2( payout_ );
							} else {
								input.realValue = input.value = d2( payout_);
							}
							
							$el.potential.find("var").text( d2(payout_) );
						}
						
					},
					system: function() {
						var $el = this.$element;
						
						$el.checkboxList.children(".betcart-pane-checkbox-item-active").find(".betcart-pane-checkbox-item-stake var").text( d2($el.data.val) );
						$el.textCount.find("b").text( o.w[$el.odds.length - 1] );
						$el.count.find("var").text($el.data.l);
						$el.tax_amount.find("var").text(o.tax_percent);
						
						var total = d2($el.data.l*$el.data.val);
						var total_odds = $el.data.p;
						
						//stake
						$el.stake_var.find("var").text(d2($el.data.val));
						
						//total
						$el.total.find("var").text(total);
						
						//total stake. Need for ibetcity
						var $enabled_templates = ['ibetcity', 'tipobet', 'exobet', 'albet'];
						if (in_array(o.betcart_template, $enabled_templates) && o.autoupdate_stake) {
							$el.total_stake.find("var").text(total);
							$el.total_stake.find('input').val(total).html(total);
						}
						
						//total system odds
						$el.total_odds.find("var").text(d2(total_odds));
						
						if ( o.systemMinMax ) {
							var min_ = $el.data.min > $el.data.max ? 0 : $el.data.min;
							$('var', $el.minimum).text( d2( min_ * $el.data.val) );
							$('var', $el.maximum).text( d2( $el.data.max * $el.data.val) );
						}
						
						$("var", $el.bonus).text( $el.data.bonus + "%" );
							
						if ( o.payout ) {
							var $pot_value = $el.data.p;
							$el.potential.find("var").text( d2($pot_value) );
							$el.potential.find("input").val( d2($pot_value) );
							$el.tax_amount.find("var_o").text( d2($el.data.l*$el.data.val) );
						} else {
							var input = $el.potential.find('input').get(0);
							var result_value = $el.data.p*$el.data.val;
							
							if( input.viewValue !== 0 ) {
								input.value = input.viewValue || '';
								input.viewValue = 0;
								input.realValue = d2( result_value );
							} else {
								input.realValue = input.value = d2( result_value );
							}
							
							$el.potential.find("var").text( d2(result_value) );
							$el.potential.find("input").val( d2(result_value) );
						}
						
						
						var $potential = d2($el.data.p*$el.data.val);
						
						//bet44
						if (o.sportsbook_bet_resolve_conflict) {
							var $potential_resolved = d2($el.data.pot * $el.data.val);
							
							if (parseFloat($potential_resolved) > 0) {
								$potential = $potential_resolved;
							}
						}
						
						$el.potential.find("var").text( $potential );
						$el.potential.find("input").val( $potential );
					},
					roundrobin: function() {
						var $el = this.$element;
						$el.checkboxList.children(".betcart-pane-checkbox-item-active").find(".betcart-pane-checkbox-item-stake var").text( d2($el.data.val) );
						$el.count.find("var").text($el.data.l);
						$el.total.find("var").text(d2($el.data.l*$el.data.val));
						
						var result_value = $el.data.p*$el.data.val;
						
						if(o.payout) {
							$el.potential.find("var").text(d2(result_value));
						} else {
							
							var input = $el.potential.find('input').get(0);
							if( input.viewValue !== 0 ) {
								input.value = input.viewValue || '';
								input.viewValue = 0;
								input.realValue = d2( result_value );
							} else {
								input.realValue = input.value = d2( result_value );
							}
							
							$el.potential.find("var").text( d2(result_value) );
							
						}
					},
					ifbet: function() {
						var $el = this.$element;
						$el.total.find("var").text(d2($el.data.t));
						if(o.payout) {
							$el.potential.find("var").text(d2($el.data.p));
						} else {
							$el.potential.find("input").val(d2($el.data.p));
						}

						var summary_potential = 0;
						
						$el.eventPotential.each(function(i){
							if(o.payout) {
								var value = d2($el.data.v[i]);
								summary_potential -= -value;

								$(this).find('input').val( value );
								return $(this).find('var').text( value );
							}
							
							var input = this.getElementsByTagName('input')[0];
							var value = d2($el.data.v[i]);
							if( input.viewValue !== 0 ) {
								input.value = input.viewValue || '';
								input.viewValue = 0;
								input.realValue = value;
							} else {
								input.realValue = input.value = value;
							}

							summary_potential -= -value;
								
						});

						$el.find('.betcart-pane-bottom-potential var').html(d2(summary_potential));

					},
					reverse: function() {
						var $el = this.$element;
						$el.count.find("var").text($el.data.l);
						
						var $value = d2($el.data.l*$el.data.val);
						$el.total.find("var").text($value);
						$el.total.find("input").val($value);
						
						if(o.payout) {
							var $potential = d2($el.data.p*$el.data.val);
							$el.potential.find("var").text($potential);
							$el.potential.find("input").val($potential);
						} else {
							
							var input = $el.potential.find('input').get(0);
							if( input.viewValue !== 0 ) {
								input.value = input.viewValue || '';
								input.viewValue = 0;
								input.realValue = d2( $el.data.p * $el.data.val );
							} else {
								input.realValue = input.value = d2( $el.data.p * $el.data.val );
							}
						}
					},
					teaser: function() {
						var $el = this.$element;
						$el.count.find("b").text( o.w[$el.data.l - 1] );
						var transCoeff = transformCoeff($el.data.t, o.type);
						if( (transCoeff+"").indexOf(".") > -1 ) {
							transCoeff = d2(transCoeff);
						}
						
						$el.total.find("var").text( d2(transCoeff) );
						if(o.payout) {
							$el.potential.find("var").text( d2($el.data.p) );
							$el.potential.find("input").val( d2($el.data.p) );
						} else {

							var input = $el. potential.find('input').get(0);
							if( input.viewValue !== 0 ) {
								input.value = input.viewValue || '';
								input.viewValue = 0;
								input.realValue = d2( $el.data.p );
							} else {
								input.realValue = input.value = d2( $el.data.p );
							}
							
						}
					}
				}
			};
			
			var Teaser = function(element) {
				this.$element = $(element);
				this.$tab = $("#tab-nav-item-"+o.subsec.teaser);
				this.setDefault();
			};
			
			Teaser.isTeaserSport = function(id){
				return id in o.teaser.table; 
			};
			
			Teaser.prototype = {
				setDefault: function(){
					this.data = null;
					this.sport = null;
					this.coeff = null;
					this.decimalCoeff = null;
					this.single = false;
					this.singleName = null;
					this.singleTitle = null;
					this.possibleMixed = o.teaser.mixed && this.intersection( o.teaser.table['football'] || [], o.teaser.table['basketball'] || [] );
					this.mixed = false;
					this.mixedTitle = null;
					this.mixedTable = null;
					this.enabled = true;
				},
				enable: function(){
					$betCart.tabs( 'enable', this.$tab.parent().children().index(this.$tab) );
				},
				isEnabled: function(){
					return this.enabled;
				},
				setEnabled: function( flag ) {
					this.enabled = this.enabled && flag;
				},
				disable: function(){
					var currentTab = this.$tab,
						indexTab = this.$tab.parent().children().index(this.$tab);
					if ( currentTab.hasClass("ui-state-active") ) {
						var siblingIndex  = indexTab;
						do{
							--siblingIndex;
							currentTab = currentTab.prev();
						}
						while( currentTab.hasClass("ui-state-disabled") );
						$betCart.tabs( 'select', siblingIndex );
					};
					$betCart.tabs( 'disable', indexTab );
				},
				isDisabled: function(){
					return this.$tab.hasClass("ui-state-disabled");
				},
				isTeaser: function( data ) {
					if( data.type != 'ah' && data.type != 'ou' ){
						return false;
					}
					if( data.type == 'ah' && reFloatQ.test(data.beton_val) ) {
						return false;
					}
					if( data.scope != 'fe' ) {
						return false;
					}
										
					if( !Teaser.isTeaserSport( data.sport ) ) {
						return false;
					}
					
					if( null === this.coeff ) {
						this.coeff = o.teaser.restrictOdd * transformCoeff( data.odds, o.type );
						this.decimalCoeff = data.odds;
					} else if( o.teaser.restrictOdd * transformCoeff( data.odds, o.type ) !== this.coeff ) {
						return false;
					}
					
					if( null === this.sport ) {
						this.sport = data.sport;
					} else if ( this.sport === data.sport ) {
						if( !this.mixed ) {
							this.single = true;
							if( null === this.singleName ) {
								this.singleName = this.getSingleName(data.sport);
							}
							if ( null === this.singleTitle ) {
								this.singleTitle = this.getSingleTitle(); 
							};
						} 
						return true;
					} else if ( this.possibleMixed ) {
						this.mixed = true;
						this.single = false;
						if( null === this.mixedTitle ) {
							this.mixedTitle = getMixedTitle();
						}
						return true;
					} else {
						return false;
					}
					return true;
				},
				isTeasers: function(){
					this.$eventListItem = this.$element.find('.betcart-pane-event:first');
					var bTest = true;
					while( bTest && this.$eventListItem.is('.betcart-pane-event') ) {
						var eventData = this.$eventListItem.find('div.betcart-pane-event-data');
						bTest = this.isTeaser({
							sport : eventData.children('input.data-sport').val(),
							type  : this.$eventListItem.attr('class').replace(/.*type(\S+).*/, '$1'),
							odds  : eventData.children('input.data-odds').val(),
							scope : this.$eventListItem.attr('class').replace(/.*scope(\S+).*/, '$1')
						});
						this.$eventListItem  = this.$eventListItem.next();
					}
					return bTest;
				},
				getSingleName: function(id) {
					var singleName = null;

					if ( id in o.teaser.table ) {
						singleName = id;
					}
					
					return singleName;
				},
				getSingleTitle: function(){
					return o.teaser.table[this.singleName][0];
				},
				getMixedTitle: function(){
					var constMixedTitle = this.mixedTable[0],
						mixedTitle = [], k = 0;
					for(var prop in o.teaser.table) {
						for (var i = 0, n = constMixedTitle[prop].length; i < n; i++ ) {
							if( typeof mixedTitle[i] !== 'array' ) {
								mixedTitle[i] = [];	
							}
							mixedTitle[i].push( constMixedTitle[prop][i] );
						}
						k++;
					}
					for (var i = mixedTitle.length - 1; i >= 0; i--) {
						mixedTitle[i] = mixedTitle[i].join('-');
					}
					return mixedTitle;
				},
				isMixed: function(){
					return this.possibleMixed && this.mixed;
				},
				intersection: function( Football, Basketball, countEvents,  countOdds ) {
					this.mixedTable = [];
					if(Football.length === 0 || Basketball.length === 0) {
						this.mixedTable = null;
						return false;
					}
					if ( typeof countOdds === 'undefined' ) {
						countOdds = 3;
					}
					if ( typeof countEvents === 'undefined' ) {
						countEvents = 10;
					}
					for(var i = countEvents -1; i > 0; i-- ) {
						this.mixedTable[i] = [];
						for(var j = countOdds - 1; j >= 0; j-- ) {
							if( Football[i][j] !== Basketball[i][j] ) {
								this.mixedTable = null;
								return false;
							}
							this.mixedTable[j] = Basketball[i][j];
						}
					}
					this.mixedTable[0] = {
						'football'		:	[],
						'basketball'	:	[]
					};
					for(var j = countOdds - 1; j >= 0; j-- ) {
						this.mixedTable[0]['football'][j] 	=	Football[0][j];
						this.mixedTable[0]['basketball'][j]	=	Basketball[0][j];
					}
									
					return true;
				},
				value: function(){
					if(this.mixed) {
						
						this.mixedData = this.mixedTable[self.countEvents - 1];
						this.mixedSelect = [];
						
						for( var i = 0, n = this.mixedData.length; i < n; i++ ) {
							this.mixedSelect.push(templates.tabs[o.teaser.index].option.supplant({'value': this.mixedData[i], 'text': 'Mixed Teaser ' + this.mixedTitle[i] +' pts' }));	
						}
						return this.mixedSelect;
					} else if(this.single){
						this.singleData = o.teaser.table[this.singleName][self.countEvents - 1];
						this.titles = o.teaser.titles[this.singleName][self.countEvents];

						this.singleSelect = [];
						
						if (!this.singleData) {
							return this.singleSelect;
						}
						for( var i = 0, n = this.singleData.length; i < n; i++ ) {
							var teaser_value = this.singleData[i];
							//var teaser_title = this.singleTitle[i];
							var teaser_title = this.titles ? this.titles[i] : this.singleTitle[i];
							if (!teaser_title) {
								teaser_title = this.singleTitle[i];
							}
		
							this.singleSelect.push(templates.tabs[o.teaser.index].option.supplant({'value': teaser_value, 'text': teaser_title +' pt' }));	
						}
						return this.singleSelect;
					}
					return [];
				}
			};

			return new init();
		};
		
		function removeErrorsPanels() {
            $('.betcard-error').remove();
			$("#betcard_error_panel").addClass(hiddenClass).empty();
			$("#betcard_error_panel_clone, .betcard_error_panel_clone").addClass(hiddenClass).empty();
		}
		
		function getBetcartElements($betCart, sport_code, selectorDefinition, groupDefinition) {
			var $elements = [];
			var $groups = {};
			var $elements = $betCart.find('.betcart-pane-event').filter(":visible");
			
			$elements.each(function() {
				var $element = $(this);
				var $class = $element.attr('class');
				
				if (groupDefinition) {
					var $group_chunks = $class.match(groupDefinition);
					var $need_group = $group_chunks[1];
					
					if (!$groups[$need_group]) {
						$groups[$need_group] = [];
					}
				}
				
				
				var $selector_chunks = $class.match(selectorDefinition);
				var $need_selector = $selector_chunks[1];
				
				var $sport_chunks = $class.match(sportDefinition);
				var $need_sport = $sport_chunks[1];
				
				
				if ($need_sport == sport_code && $.inArray($need_selector, $elements) == '-1') {
					$elements.push($need_selector);
				}
				
				if (groupDefinition && $need_sport == sport_code && $.inArray($need_selector, $groups[$need_group]) == '-1') {
					$groups[$need_group].push($need_selector);
				}
			});
			
			return {
				elements: $elements,
				groups: $groups
			}
		}
		
		function convertData(data, o) {
			if (data.type == '1x2') {
				data.event_type = _('Match Win');
				data.event_pick = data.beton;
			} else if (data.type == '1x2ex') {
				data.event_type = _('Match Win');
				data.event_pick = data.beton;
			} else if (data.type == '12') {
				data.event_type = _('Draw No Bet');
				data.event_pick = data.beton;	
			} else if (data.type == 'g12') {
				data.event_type = _('Next Game');
				data.event_pick = data.beton;	
			}  else if (data.type == '12ex') {
				data.event_type = _('Draw No Bet');
				data.event_pick = data.beton;	
			} else if (data.type == 'ou') {
				data.event_type = _('Over/Under');
				data.event_pick = data.beton + ' ' + data.beton_val;
            } else if (~['yellowou', 'yellowouaway', 'yellowouhome', 'attempsou', 'foulsou', 'goalminou', 'offsidesou', 'subou'].indexOf(data.type)) {
                data.event_type = data.type_title;
                data.event_pick = data.beton + ' ' + data.beton_val;
            } else if (~['goalmin'].indexOf(data.type)) {
                data.type_title = data.type_title + ', ' + data.beton_val;
                data.event_pick = data.beton;
			} else  if (data.type == 'ah') {
				data.event_type = _('Handicap');
				data.event_pick = o.descriptionDelimiterEnabled 
					? '<div class="betcart-pane-event-pick-ah-team">' + data.beton + '</div><div class="betcart-pane-event-pick-ah-coeff">' + '(' + data.beton_val + ')' + '</div>'
					: '<span class="betcart-pane-event-pick-ah-team">' + data.beton + '</span><span class="betcart-pane-event-pick-ah-coeff"> ' + data.beton_val + ' </span>'
				;
            } else  if (data.type == 'yellowah') {
                data.event_type = data.type_title;
                data.event_pick = o.descriptionDelimiterEnabled
                    ? '<div class="betcart-pane-event-pick-ah-team">' + data.beton + '</div><div class="betcart-pane-event-pick-ah-coeff">' + '(' + data.beton_val + ')' + '</div>'
                    : '<span class="betcart-pane-event-pick-ah-team">' + data.beton + '</span><span class="betcart-pane-event-pick-ah-coeff"> ' + data.beton_val + ' </span>'
                ;
			} else if (data.type == 'oe') {
				data.event_type = _('Odd/Even');
				data.event_pick = data.beton;	
			} else if (data.type == 'wm') {
				data.event_type = _('Winnig Margins');
				data.event_pick = data.beton;
			} else if (data.type == 'fts') {
				data.event_type = _('First team to score');
				data.event_pick = data.beton;
			} else if (data.type == 'lts') {
				data.event_type = _('Last team to score');
				data.event_pick = data.beton;
			} else if (data.type == 'mbt') {
				data.event_type = _('Match bet + total');
				data.event_pick = data.beton + ' ' + data.beton_val;
			} else if (data.type == 'mfl') {
				data.event_type = _('Match flow');
				data.event_pick = data.beton;
			} else if (data.type == 'hsp') {
				data.event_type = _('Highest scoring period');
				data.event_pick = data.beton;
			} else if (data.type == 'hsph') {
				data.event_type = _('Highest scoring period home');
				data.event_pick = data.beton;
			} else if (data.type == 'hspa') {
				data.event_type = _('Highest scoring period away');
				data.event_pick = data.beton;
			} else if (data.type == 'hwb') {
				data.event_type = _('Home to win both halves?');
				data.event_pick = data.beton;
			} else if (data.type == 'hwe') {
				data.event_type = _('Home to win either half?');
				data.event_pick = data.beton;
			} else if (data.type == 'hsb') {
				data.event_type = _('Home to score in both halves?');
				data.event_pick = data.beton;
			} else if (data.type == 'awb') {
				data.event_type = _('Away to win both halves?');
				data.event_pick = data.beton;
			} else if (data.type == 'awe') {
				data.event_type = _('Away to win either half?');
				data.event_pick = data.beton;
			} else if (data.type == 'asb') {
				data.event_type = _('Away to score in both halves?');
				data.event_pick = data.beton;
			} else if (data.type == 'bho15') {
				data.event_type = _('Both halves over 1.5?');
				data.event_pick = data.beton;
			} else if (data.type == 'bhu15') {
				data.event_type = _('Both halves under 1.5?');
				data.event_pick = data.beton;
			} else if (data.type == 'cs') {
				data.event_type = _('Correct Score');
				data.event_pick = data.beton;
			}  else if (data.type == 'sb') {
				data.event_type = _('Set Betting');
				data.event_pick = data.beton;
			} else if (data.type == 'gcs') {
				data.event_type = _("Score in game");
				data.event_pick = data.beton;
			} else if (data.type == 'c1x2') {
				data.event_type = _("Corner matchbet");
				data.event_pick = data.beton;
			} else if (data.type == 'cou') {
				data.event_type = _("Total corners");
				data.event_pick = data.beton;
			} else if (data.type == 'cah') {
				data.event_type = _("Corner handicap");
				data.event_pick = data.beton;
			} else if (data.type == 'cfts') {
				data.event_type = _("First corner");
				data.event_pick = data.beton;
			} else if (data.type == 'clts') {
				data.event_type = _("Last corner");
				data.event_pick = data.beton;
			} else if (data.type == 'coe') {
				data.event_type = _("Corner Odd/Even");
				data.event_pick = data.beton;
			} else if (data.type == 'cng') {
				data.event_type = _("Corner Total (Aggregated)");
				data.event_pick = data.beton;
			} else if (data.type == 'cngh') {
				data.event_type = _("Home Team Number of Corners");
				data.event_pick = data.beton;
			} else if (data.type == 'cnga') {
				data.event_type = _("Away Team Number of Corners");
				data.event_pick = data.beton;
			} else if (data.type == 'hf') {
				data.event_type = _('Half Time / Full Time');
				data.event_pick = data.beton;
			} else if (data.type == 'tg') {
				data.event_type = _('Total Goals');
				data.event_pick = data.beton;
			} else if (data.type == 'tga') {
				data.event_type = _('Away team total Goals');
				data.event_pick = data.beton;
			} else if (data.type == 'tgh') {
				data.event_type = _('Home team total Goals');
				data.event_pick = data.beton;
			} else if (data.type == 'ng') {
				data.event_type = _('Number of goals');
				data.event_pick = data.beton;
			} else if (data.type == 'nga') {
				data.event_type = _('Away team number of goals');
				data.event_pick = data.beton;
			} else if (data.type == 'ngh') {
				data.event_type = _('Home team number of goals');
				data.event_pick = data.beton;
			} else if ( /^out/.test(data.type) ) {
				var outright_name = data.beton_outright_market || data.type_title;
				data.event_type =  outright_name;
				data.event_pick = data.beton;
			} else if (data.type == 'dc') {
				data.event_type = _('Double Chance');
				data.event_pick = data.beton;
			} else if (data.type == '1x2ah') {
				data.event_type = _('Three-way handicap');
				data.event_pick = o.descriptionDelimiterEnabled 
					? '<div class="betcart-pane-event-pick-ah-team">' + data.beton + ' (' + data.beton_val + ')' + '</div>'
					: '<span class="betcart-pane-event-pick-ah-team">' + data.beton + ' ' + data.beton_val + '' + '</span>'
				;
			} else if (data.type == 'gng') {
				data.event_type = _('GG / NG');
				data.event_pick = data.beton;
			} else if (data.type == 'gngh') {
				data.event_type = _('GG / NG') + ' ' + '(' + _('Home') + ')';
				data.event_pick = data.beton;
			} else if (data.type == 'gnga') {
				data.event_type = _('GG / NG') + ' ' + '(' + _('Away') + ')';
				data.event_pick = data.beton;
			} else if (data.type == 'mg') {
				data.event_type = _('Multi goals');
				data.event_pick = data.beton;
			} else if (data.type == 'next') {
				data.event_type = _('Next goal') + ' ' + data.beton_val;
				data.event_pick = data.beton;
			} else if (data.type == 'rest') {
				data.event_type = _('Who wins the rest of the match') + ' ' + data.beton_val;
				data.event_pick = data.beton;
			} else if (data.type == 'restah') {
				data.event_type = _('Asian handicap (rest)');
				data.event_pick = o.descriptionDelimiterEnabled 
					? '<div class="betcart-pane-event-pick-ah-team">' + data.beton + '</div><div class="betcart-pane-event-pick-ah-coeff">' + '(' + data.beton_val + ')' + '</div>'
					: '<span class="betcart-pane-event-pick-ah-team">' + data.beton + '</span><span class="betcart-pane-event-pick-ah-coeff"> ' + data.beton_val + ' </span>'
				;
			} else if (data.type == 'couh') {
				data.event_type = _('Over/Under corners') + ' ' + _('Home');
				data.event_pick = data.beton;
			} else if (data.type == 'coua') {
				data.event_type = _('Over/Under corners') + ' ' + _('Away');
				data.event_pick = data.beton;
			} else if (data.type == 'gs') {
				data.event_type = _('Score of game');
				data.event_pick = data.beton;
			} else if (data.type == 'gsb') {
				data.event_type = _('Score of game or break');
				data.event_pick = data.beton;
			} else if (data.type == 'pso') {
				data.event_type = _('Which team will win the penalty shootout?');
				data.event_pick = data.beton;
			} else if (data.type == 'ngt') {
				data.event_type = _('When will next goal be scored?');
				data.event_pick = data.beton;
			} else if (data.type == 'ouc') {
				data.event_type = _('Over/Under cards');
				data.event_pick = data.beton;
			} else if (data.type == '10min') {
				data.event_type = _('1-10 min result');
				data.event_pick = data.beton;
			} else if (data.type == 'hfcs') {
				data.event_type = _('Halftime/Fulltime Correct Sore');
				data.event_pick = data.beton;
			} else if (data.type == 'tts') {
				data.event_type = _('Which Team To Score');
				data.event_pick = data.beton;
			} else if (data.type == 'fgint') {
				data.event_type = _('First Goal Time Interval');
				data.event_pick = data.beton;
			} else if (data.type == '12custom') {
				data.event_type = _('Draw No Bet');
				data.event_pick = data.beton;	
			} else if (data.type == 'ouh') {
				data.event_type = _('Over/Under') + ' ' + _('Home');
				data.event_pick = data.beton + ' ' + data.beton_val;
			} else if (data.type == 'oua') {
				data.event_type = _('Over/Under') + ' ' + _('Away');
				data.event_pick = data.beton + ' ' + data.beton_val;
			} else {
				data.event_type = data.type_title;
				data.event_pick = data.beton;
			};

            data.event_type = data.type_title;

			return data;
		}
		
		function _alert( message, fn ) {
			$('.betcard_error_panel_clone, #betcard_error_panel, #betcard_error_panel_clone').addClass(hiddenClass);
			
			var $error_box = $("#betcard_error_panel");
			if( !$error_box.size() ) {
				$error_box = $('#tab-nav').after('<div id="betcard_error_panel" class="betcard-error ' + hiddenClass + '"/>').next();
			}
			
			$error_box.html('<div class="betcard-error-item">' + _(message) + '</div>').removeClass(hiddenClass);
			if ( $.isFunction( fn ) ) { fn.apply(this); }
			$('.betcart-pane-action #betcard_error_panel').remove();
			$error_box.clone().addClass('betcard_error_panel_clone g-hidden').prependTo(".betcart-pane-action")
		};
		
		function _success( message, fn ) {
			var $success_box = $("#betcard_success_panel");
			$success_box.removeClass(hiddenClass).text(message);
			
			setTimeout(function() {
				$success_box.addClass(hiddenClass);
			}, 1000);
			
			return;
		};
		
		function getEstimatedOddsCount() {
			/* estimated odds count */
			var current_oids_count = 0;
			var saved_oids_string = jQuery.cookie('saved_oids');
			var saved_oids = [];
				
			if (saved_oids_string) {
				saved_oids = saved_oids_string.split('_');
				for (i in saved_oids) {
					var intValue = parseInt(saved_oids[i]);
					if (isNaN(intValue)) {
						continue;
					}
					if (saved_oids[i] !== '') {
						current_oids_count = current_oids_count-(-1);
					}
				}

			} else {
				current_oids_count = 0;
			}	
			
			return current_oids_count;
		}
		
		function removeLastElementsFromCookie( maximum_count ) {
			var saved_oids_string = jQuery.cookie('saved_oids');
			var saved_oids = [];
			var saved_oids_maximized = [];
				
			if (saved_oids_string) {
				saved_oids = saved_oids_string.split('_');
				for (var i = 0; i < saved_oids.length; i++) { 
					var intValue = parseInt(saved_oids[i]);
					if (isNaN(intValue) || i >= maximum_count) {
						continue;
					}
					
					saved_oids_maximized.push(intValue);
				}
			}
			
			var date 			= new Date();
			date.setTime(date.getTime() + (720 * 60 * 1000));	
			jQuery.cookie("saved_oids", saved_oids_maximized.join("_"), { expires: date, path: '/' });
			
		}
		
		function removeBetcartBlock($betCart) {
			$betCart.removeClass("post-data");
			
			$("#betcard-body").removeClass("betcart-preview");
		}
		
		function replaceLinks($element) {
			 $($element).find('a').replaceWith(function(){
			     return '<span> '+$(this).text()+'</span>';
			 });
			 
			 return $element;
		}
		
		function getEventLay( lay ) {
			if (lay) {
				return _('Lay');
			} else {
				return _ ('Back');
			}
		}
		
		function suggestStakesWithReplace(data, o) {
			for (var i in data.suggestions) {
				var suggested_stake = data.suggestions[i];
				var json = $j.parseJSON(suggested_stake);
				
				if (!json) {
					continue;
				}
				
				var $area = $('.oid' + i);
				
				$area.find('.betcart-pane-event-coeff').html(json.odds).addClass('autoupdated_parameter');
				$area.find('.betcart-pane-event-pick').html(json.beton + " <strong class='autoupdated_parameter'>" + json.beton_val + "</strong>");
				
				// hidden post vars
				$area.find('.betcart-pane-event-data .data-oid').val(json.oid);
				$area.find('.betcart-pane-event-data .data-odds').val(json.odds);

				$area.removeClass('oid' + i).addClass('oid' + json.oid);
			}
			
			recalculateTab('single');
			recalculateTab('combined');
			recalculateTab('system');
			
			return;
		}
		
		function suggest_stakes( data, o ) {
			var bet_type 	= data.data.bet_type;
			var tips 		= data.data;
			var pane 		= data.data.bet_type_original;
			var pane 		= '#' + pane + '-pane';
			
			if (bet_type == 'single') {
				if (!tips.max_pick < 0) {
					return false;
				}
				
				var return_object = false;
				if (tips.max_pick instanceof Object) {
					return_object = true;
				}
				
				$('.single-amount-potential-payout').removeAttr('readonly').removeClass('betcart-pane-event-stake-readonly'); // for ibetcity
				$('.betcart-pane-event-stake input').removeAttr('readonly');
				$('.betcart-pane-bottom-stake input').removeAttr('readonly');
				
				if (o.betcart_template !== 'ibetcity') {
					$('.betcart-pane-event-stake input').removeAttr('class');
					$('.betcart-pane-bottom-stake input').removeAttr('class');
				}
				
				$('.betcart-pane-event-stake input').each(function(){
					var class_name = $(this).parent().parent().attr('class');
					var outcome_id = getOutcomeIdByClass(class_name);
					
					var old_value = $(this).val();
					if (!single_min_value || old_value < single_min_value) {
						single_min_value = old_value;
					}
					
					if (return_object) {
						if (tips.max_pick[outcome_id] > -1) {
							$(this).val(tips.max_pick[outcome_id]).addClass('betcart-pane-event-stake-minval');
						}
					} else {
						var difference = old_value - tips.max_pick;
						if (difference >= 0) {
							$(this).val(tips.max_pick).addClass('betcart-pane-event-stake-minval');
						}
					}
					
				});
				
				// for total stake single
				var picks_number 		= $(pane + ' .betcart-pane-bottom-count var').html();
				var single_min_value 	= null;
				
				for (i in tips.max_pick) {
					var val = tips.max_pick[i];
					if (!single_min_value || single_min_value > val) {
						single_min_value = val;
					}
				}
				
				if (!return_object) {
					single_min_value = tips.max_pick;
				}
				
				$('#single-pane .betcart-pane-bottom-stake input').addClass('betcart-pane-event-stake-minval');
				$('#single-pane .betcart-pane-bottom-stake input').val(single_min_value);
				$('#single-pane .betcart-pane-bottom-total var').html(d2(single_min_value * picks_number));
				
				/*for ibetcity*/
				if (o.betcart_template == 'ibetcity') {
					$('#single-pane .betcart-pane-bottom-all-stake input').val(single_min_value);
					$('#single-pane .betcart-pane-event-stake input').addClass('betcart-pane-event-stake-minval').val(single_min_value);
					$('#single-pane .single-amount-value').keyup();
					
				}
				
				/*for ibetcity end*/
				recalculateTab('single');
				
			} else {
				if (tips.max_pick < 0) {
					return false;
				}
				
				var new_value_total = tips.max_pick;
				var old_value_stake = $('.betcart-pane-bottom-stake input').val();
				var old_value_total = $('.betcart-pane-bottom-total-stake input').val();
				
				var picks_number 	= $(pane + ' .betcart-pane-bottom-count var').html();
				var old_value 		= old_value_stake < old_value_total ? old_value_stake : old_value_total;
				
				if (o.combinedType !== 'combined_system') {
					picks_number = 1;
				}
				
				if (old_value_total && picks_number > 1) {
					tips.max_pick = d2(tips.max_pick / picks_number);
				}
				
				$('.betcart-pane-bottom-stake input').removeAttr('readonly').removeAttr('class').addClass('betcart-pane-event-stake-minval');
				$('.betcart-pane-bottom-total-stake input').removeAttr('readonly').removeAttr('class').addClass('betcart-pane-event-stake-minval');

				if (bet_type == 'system') {
					if (tips.max_pick < 0) {
						return false;
					}

					var pick = tips.max_pick;
					var total = new_value_total;

					if (o.check_system_pick_min_per_bet) {
						pick = d2(new_value_total);
						total = new_value_total * picks_number;
					}

					$('.betcart-pane-bottom-stake input').val(pick);
					$('.betcart-pane-bottom-stake var').html(d2(pick));
					$('.betcart-pane-bottom-total-stake input').val(total);
				}
				 else {
					$('.betcart-pane-bottom-stake input').val(tips.max_pick);
					$('.betcart-pane-bottom-total-stake input').val(tips.max_pick);
					$('.betcart-pane-bottom-stake var').html(tips.max_pick);
				}
				
				recalculateTab('system');
				recalculateTab('combined');
			}
			
		};
		
		function getTabByIndex(object, index) {
			if (!object) {return;}
			var object = jQuery.parseJSON(object); 
			for (var i = 0; i < object.length; i++) {
				if (index == i) {
					return object[i];
				}
			}
			
			return null;
		}
		
		function getIndexByTab(object, tab) {
			if (!object) {return;}
			
			var object = jQuery.parseJSON(object); 
			
			for (i in object) {
				if (object[i] == tab) {
					var selected_value =  i;
				}
			}
			
			if (selected_value == 1) {
				return 1;
			} else if (selected_value == 2) {
				return 2;
			}
			
			return selected_value;
		}
		
		function recalculateTab(tab) {
			if (tab == 'single') {
				var object = $('#'+tab+'-pane-bottom .betcart-pane-bottom-stake-single-total input');
			} else {
				var object = $('#'+tab+'-pane-bottom .betcart-pane-bottom-total-stake input');
			}
			
			var value = object.val();
			
			if (value == 'NaN') {
				object.val("0.00");
				return;
			}
			
			object.keyup();
			
			return;
		};
		
		function highlight_outcomes( data, class_name ) {
			if (!class_name) {
				class_name = 'event-disabled';
			}
			
			$('.betcart-pane-event').removeClass(class_name);
			
			if (!data.vars) {
				return false;
			}
			
			for (i in data.vars) {
				var outcome = data.vars[i];				
				$('.oid' + outcome.oid).addClass(class_name);
			}
		};
		
		function getOutcomeIdByClass(class_name) {
			var class_name_items = class_name.split(' ');
			
			for (var i = 0; i < class_name_items.length; i++) {
				if (class_name_items[i].indexOf("oid") > -1) {
					return class_name_items[i].replace('oid', '');
				}
			}
			
			return 0;
		}
		
		function getValueIdByClass(class_name, key) {
			var class_name_items = class_name.split(' ');
			
			for (var i = 0; i < class_name_items.length; i++) {
				if (class_name_items[i].indexOf(key) > -1) {
					return class_name_items[i].replace(key, '');
				}
			}
			
			return 0;
		}
		
		function isTypeDifficult(type) {
			var difficult_types = ['nba', 'nbh', 'bp', 'exb', 'nbp', 'ouc', 'cnga', 'cngh'];
			
			return in_array(type, difficult_types);
		}
		
		function _addCouldown ( fn, couldown, message, couldownClass, static_couldown ) {
			var $couldown_box = $("#betcard_couldown_panel");
			if ( !$couldown_box.length ) {
				$couldown_box = $('#tab-nav').after('<div id="betcard_couldown_panel" class="betcard-couldown"/>').next();
			}
			
			$("#betcard_couldown_panel").removeAttr("class").addClass("betcard-couldown " + couldownClass).html(  message + " " + couldown + " " + _('sec') );
			
			var start = new Date().getTime();
			var couldown_timer = setInterval(function(){
				var delta = new Date(start + couldown* 1000 - (new Date().getTime())).getSeconds();
				
				if ( delta < 0 ) { delta = 0; }

				if (delta > couldown && couldown) {
					start = new Date().getTime();
					delta = couldown;
				}
				
				if (!static_couldown) {
					$couldown_box.html( message + " " + delta + " " + _('sec') );
				}
				if ( delta == 0 && $.isFunction(fn) ) { 
					clearInterval(couldown_timer);
					$couldown_box.addClass(hiddenClass);
					fn();
				}
			}, 100);
			
			
			return couldown_timer;
		}
		
		function getCountEvents() {
			return $('#single-pane-events .betcart-pane-event').length;
		}
		
		function getEvents() {
			var $events = [];
			
			$('#single-pane-events .betcart-pane-event').each(function() {
				$events.push($(this));
			});
			
			return $events;
		}
		
		function getEventValue($event, definition) {
			var $group_chunks = $event.attr('class').match(definition);
			var $need_value = $group_chunks[1];
			
			return $need_value;
		}
		
		$(window).one("beforeunload", function(){
			var _outcomes = $document.data("outcomes") || {}, _listId = [];
			for ( var _name in _outcomes ) {
				if ( Object.prototype.hasOwnProperty.call( _outcomes, _name ) ) {
					_listId [ _listId.length ] = _outcomes[ _name ];
				}
			}
			_listId.length && this.Cookie.set("oids", _listId.join(","), { expires : 1 } );
		});
		
		return this.each(function() {
			var ID = options.idTo, 
				names = options.subsec,
				$betcart = $("#"+ID), 
				__betcart,
				$this = $(this);
			var getDocumentObjectsByIds = function(oids, dataList) {
				for (i in oids) {
					var element = oids[i];
				}
			};
			
			var enabledSeveralOutcmes = function(type) {
				return in_array(type, ['forecast', 'tricast']);
			}
			
			var handler = function( e, dataList ) {
				e.preventDefault();

				if ( $betcart.hasClass("post-data") ) {
					return false;
				}

				$(document).trigger('betcart.active');

				if ( !$betcart || !$betcart.attr("init") ) {
					__betcart = new bet_cart(options, $this);
					$betcart = $("#"+ID+'-body').attr('init', true);
					$(document).trigger('init_betcart').removeData("initBetcartInstance");
				}
			
				$betcart.children("div").each(function( index ) {
					var btn_change = $("#" + this.id + "-button>.betcart-pane-action-change");
					if ( !btn_change.hasClass(hiddenClass) ) { 
						btn_change.triggerHandler('click');
					}
				});

				if ( this.nodeType !== 1 && !dataList ) return;
				
				if ( dataList ) {
					for ( var i = 0, len = dataList.length; i < len; i++ ) __betcart.insert( dataList[ i ] )
				}
				
				if (dataList) {
					var saved_oids = jQuery.cookie('saved_oids');
					if (saved_oids) {
						saved_oids = saved_oids.split('_');
					} else {
						saved_oids = {};
					}
					var _outcomes = {};
					for (i in dataList) {
						var element = dataList[i];
						for (j in saved_oids) {
							if (saved_oids[j] == element.oid) {
								var key = (element.type == 'out' ? '.market_id' + element.market_id : '') + (options.enableSeveralMarketOutcomes || enabledSeveralOutcmes(element.type) ? '.oid' + element.oid : '') + '.mid' + element.mid+ ".type" + element.type + ".scope" + element.scope + ".allowance" + ( element.beton_val != undefined ? 100 * Math.abs(element.beton_val) : 333 );
								_outcomes[key] = element.oid;
							}
						}
						$document.data( "outcomes", _outcomes );
					}
					return;
				} else {
					var _data = $.parseJSON( this.getAttribute('rev') ), 
						_outcomes = $document.data("outcomes") || {};
						var is_type_difficult = isTypeDifficult(_data.type)	
						
						var _name = (_data.type == 'out' || is_type_difficult ? '.market_id' + _data.market_id : '') + (options.enableSeveralMarketOutcomes || enabledSeveralOutcmes(_data.type) ? '.oid' + _data.oid : '') + '.mid' + _data.mid+ ".type" + _data.type + ".scope" + _data.scope;
						if (!is_type_difficult) {
							_name += ".allowance" + ( _data.beton_val != undefined ? 100 * Math.abs(_data.beton_val) : 333 );
						}
					if ( options.disableUpdate ) {
						_name += _data.beton; 
					}	
				}
				
				
				/* START ADDING PICKS*/
				// If only one event pick
				if (options.one_event_pick && $betcart.find('.oid' + _data.oid).length) {
					$betcart.find('.oid' + _data.oid).each(function(){
						$(this).find('.betcart-pane-event-remove').click();
					});
					
					$( document.getElementById( ":" + _outcomes[ _name ] ) ).removeClass("selected");
					
				}  else if (options.one_event_pick && $betcart.find('.mid' + _data.mid).length) {
					$betcart.find('.mid' + _data.mid).each(function(){
						$(this).find('.betcart-pane-event-remove').click();
					});
					
					var insert_result = __betcart.insert(_data);
					
					if (insert_result) {
						_outcomes[_name] = _data.oid;
						
						$(document.getElementById(":" + _outcomes[_name])).addClass("selected");
					}
					
				} else if ( $betcart.find('.mid' + _data.mid).length && !(options.enableSeveralMarketOutcomes || enabledSeveralOutcmes(_data.type))) {
					if ( $betcart.find('.oid' + _data.oid).not(".g-hidden").length ) {
						__betcart.remove(_data);
						deleteOids(_data.oid);
						$( document.getElementById( ":" + _outcomes[ _name ] ) ).removeClass("selected");
						delete _outcomes[ _name ];
					} else if ( !options.disableUpdate && $betcart.find(_name).length ) {
						__betcart.update(_data);
						deleteOids(_outcomes[ _name ]);
						$( document.getElementById( ":" + _outcomes[ _name ] ) ).removeClass("selected");
						_outcomes[ _name ] = _data.oid;
						$( document.getElementById( ":" + _outcomes[ _name ] ) ).addClass("selected");
					} else {
						var insert_result = __betcart.insert( _data );
						if (insert_result) {
							_outcomes[ _name ] = _data.oid;
							$( document.getElementById( ":" + _outcomes[ _name ] ) ).addClass("selected");
						}
					}
				} else if ($betcart.find('.oid' + _data.oid).length) {
					if ( $betcart.find('.oid' + _data.oid).length ) {
						__betcart.remove(_data);
						$( document.getElementById( ":" + _outcomes[ _name ] ) ).removeClass("selected");
						delete _outcomes[ _name ];
					} else if ( !options.disableUpdate && $betcart.find(_name).length ) {
						__betcart.update(_data);
						$( document.getElementById( ":" + _outcomes[ _name ] ) ).removeClass("selected");
						_outcomes[ _name ] = _data.oid;
						$( document.getElementById( ":" + _outcomes[ _name ] ) ).addClass("selected");
					} else {
						var insert_result = __betcart.insert( _data );
						if (insert_result) {
							_outcomes[ _name ] = _data.oid;
							$( document.getElementById( ":" + _outcomes[ _name ] ) ).addClass("selected");
						}
					}
				} else {
					var insert_result = __betcart.insert(_data);
					if (insert_result) {
						_outcomes[ _name ] = _data.oid;
						$( document.getElementById( ":" + _outcomes[ _name ] ) ).addClass("selected");
					}
				}

				// add focus to stake input after adding new odds in betcart
				if (options.focus_to_stake) {
					$('.betcart-pane-bottom-item input').focus();
				}
				
				if (options.overwrite_default_stake) {
					$('.betcart-pane-bottom-item input').val(d2(options.overwrite_default_stake));
				}
				
				$document.data( "outcomes", _outcomes );

				return false;
			};
			
			$document.data("initBetcartInstance", function( dataList ){
				handler( new $.Event( "clcik" ), dataList);
				
				// add focus to stake input after adding new odds in betcart
				if (options.focus_to_stake) {
					$('.betcart-pane-bottom-item input').val("0").focus();
				}
				
				if (options.overwrite_default_stake) {
					$('.betcart-pane-bottom-item input').val(d2(options.overwrite_default_stake));
				}
			});

            $document.data("setBetcartAnonymousBet", function( data ) {
                handler(new $.Event("clcik"), data["outcomes"]);

				// Set disabled outcomes
				for (var outcome_id in data["outcomes"]) {
					if ('enabled' in data["outcomes"][outcome_id] && data["outcomes"][outcome_id]['enabled']) {
						continue;
					}

					$j('#betcard').find('.oid' + data["outcomes"][outcome_id]['oid']).each(function () {
						$j(this).addClass('event-disabled');
						var message = _('Odds were changed or some of your markets are currently not available.');
						var translated = _(message);
						if (!translated) {
							translated = message;
						}
						$j('#betcart_html_error').html(translated).attr('rev', message).click();
					});
				}

				var betCart = $j('#betcard-body');
				if (data["bet_type"] == "system") {

					// Set tab
					betCart.tabs( "select", 2 ).tabs( "disable", 0 );

					// Set bankers
					if (data["banker"] && typeof data["banker"] == "object") {
						for (var id_banker in data["banker"]) {
							if (data["banker"][id_banker] === "true") {

								var banker_id = "#bankers-" + id_banker;
								betCart.find('.betcart-pane-event.oid' + id_banker).find('.data-banker').attr('checked', true).triggerHandler('click');
							}
						}
					}

					// Set type system
					$j("#system-pane-checkbox .betcart-pane-checkbox-item").each(function (i) {

						if (data["syst"][i] === "true") {
							var e = $j(this);
							e.find(".b-checkbox").trigger('click');
						}
					});

				} else if (data["bet_type"] == "combined") {
					betCart.tabs( "select", 1 ).tabs( "disable", 0 );
				}

				//Set stake and update values
				$j(".betcart-pane-bottom-total-stake input, .betcart-pane-bottom-stake-single-total input").val(data['stake']).trigger('keyup');

				// Set accept any and accep high
				data['accept_higher'] == 'true' && $j(".accept-high").addClass('betcart-pane-checkbox-item-active');
				data['accept_any'] == 'true' && $j(".accept-any").addClass('betcart-pane-checkbox-item-active');

				saveTab(data["bet_type"]);

                if (options.focus_to_stake) {
                    $('.betcart-pane-bottom-item input').val("0").focus();
                }

                if (options.overwrite_default_stake) {
                    $('.betcart-pane-bottom-item input').val(d2(options.overwrite_default_stake));
                }
            });

			$this.delegate( options.coeff, 'click', handler );
		});
	};
})(jQuery);