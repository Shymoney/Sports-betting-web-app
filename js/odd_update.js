//i think this script is what handles the odds updater

<script type="text/javascript">

$j(function() {
	var options = {is_live_page: '',is_live_single_page: '0',current_timestamp:'1459507214',always_update:'1',reload_time:'5000',disable_update_activity_by_default_reload:'0',check_disable_markets:'',disable_show_effect:'',margin_level:'0',odds_format:'EU',sportsbook_mode:'euro',host:'138.201.21.157',port:'8888',is_schedule_page:'',parent_container: true};
window.updater= new SocketOddsUpdater(options);});
</script>

<script type="text/javascript">
/*<![CDATA[*/window.hiddenClass = "g-hidden";
$j(document).ready(function(){$j('#content').qwerty({coeff: 'a[rev]',currency: 'â‚¦',maxevent: 50,type:'EU',subsec: {"single":"single","combined":"combined","system":"system"},allowConflict: 1,bankersEnabled: true,customConflict: '',conflict_mod_outright: false,conflict_mod: '',resultWin : 'dirty',payout: true,payout: true,disableUpdate: 0,systemMinMax: 0,combinedBonus: [0, 0, 0.05, 0.05, 0.05, 0.07, 0.07, 0.07, 0.08, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.1, 0.1, 0.1, 0.1, 0.1, 0.12, 0.12, 0.12, 0.12, 0.15, 0.15, 0.15, 0.15, 0.15, 0.31, 0.31, 0.31, 0.31, 0.31, 0.31, 0.53, 0.53, 0.53, 0.53, 0.53, 0.53, 0.77, 0.77, 0.77, 0.77, 0.77, 1.15, 1.15, 1.15, 2],systemBonus: [0, 0, 0.05, 0.05, 0.05, 0.07, 0.07, 0.07, 0.08, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.1, 0.1, 0.1, 0.1, 0.1, 0.12, 0.12, 0.12, 0.12, 0.15, 0.15, 0.15, 0.15, 0.15, 0.31, 0.31, 0.31, 0.31, 0.31, 0.31, 0.53, 0.53, 0.53, 0.53, 0.53, 0.53, 0.77, 0.77, 0.77, 0.77, 0.77, 1.15, 1.15, 1.15, 2],onlyOneItemInSingle: true,selected_bet_type: 'single',default_stake: '0.00',sportsbook_exchange_mode: '',enableSeveralMarketOutcomes: '1',combinedType: "combined_system",conflict_markets_key: 'mid',is_total_stake_variant: true,sportsbook_bet_types: '["single","combined","system"]',us_odd_format_with_plus: '1',descriptionDelimiterEnabled: 1,betcart_template: '',pitchersEnable: false,overwrite_default_stake: '0',one_event_pick: false,tax_percent: '',set_null_default: false,autoupdate_stake: true,placebet_by_enter: true,onSuggestStakes: function($betcart, data) {},onInsert: function() {$j('.my_bets_link').addClass('g-hidden');},betcart_add_events_before: false,focus_to_stake: false,market_restrictions: 'null',round : '2',betcart_print_coupon_button: true,reload_betcart: 0,});});/*]]>*/
</script>


<script>
setInterval(function test() {
/* ScriptDoLoad('getdata.php?sec=menu&subsec=getRightLiveMenu', 'live_events_rightcol', null, 1); */
ScriptDoLoad('../../livemenu/right/index.html', 'live_events_rightcol', null, 1);},60000);
</script>


<script type="text/javascript">/*<![CDATA[*/
			function openWindow(link){
					var param = "width=1171,height=700,resizable=yes,scrollbars=yes,status=no,status=no,location=no"
					var statsWindow = window.open(link,"stats",param)
					statsWindow.focus();
				}
			(function($){
				var $document = $(document),
					noLoading = false,
					$overlay = $('#public__overay').css("opacity", "0.6"),
					$login = $("#login-failed__lightbox"),
					$loading = $('#loading__box').hide().removeClass('g-hidden-accessible'),
					$expire = $('#session-expire__lightbox').hide().removeClass('g-hidden-accessible');
				
				var AjaxRespondersRegister = function() {
					$document.bind('show__loading', function( e ) {
						if (e.NoLoading || noLoading) { return; }
						
						$overlay.stop().fadeIn();
						$loading.stop().fadeIn();
					});
					
					$document.bind('hide__loading', function( e ) {
						if ( !e.NoLoading && !noLoading ) {			
							$loading.fadeOut(function() {
								if ( document.getElementById('session_expired') ) {
									$overlay.stop().fadeIn();
									$expire.stop().fadeIn();
								} else {
									$overlay.fadeOut();
								}
							});
						}
						/*$('#'+e.area).init_plugins();*/
						
						/****** Highligh Odds ********/
						var outcomes_ = $document.data("outcomes");
						if ( $.isPlainObject(outcomes_) ) {
							for ( var _key in outcomes_ ) {
								if ( Object.prototype.hasOwnProperty.call( outcomes_, _key ) ) {
									$( document.getElementById( ":" + outcomes_[ _key ] ) ).addClass("selected");
								}
							}
						}
						/****** Highligh Odds ********/
						
					});

					AjaxRespondersRegister = null;
				};

				if ( $login && $login.length ) {
					$login.find('a').one('click', function(){
						$login.fadeOut(function(){
							$login.remove();
							$overlay.fadeOut($.isFunction(AjaxRespondersRegister) ? AjaxRespondersRegister : function(){});
							$login = null;
						});
					});
				} else {
					$overlay.hide().removeClass("g-hidden");
					($.isFunction(AjaxRespondersRegister) ? AjaxRespondersRegister : function(){})();
				}
								
                if ($multiple_login) {
					var $overlay = jQuery('#public__overay').hide().css("opacity", 0.6).prependTo("body");
		   			var $lightbox = jQuery("#multiple-session-expire__lightbox").addClass('b-lightbox g-fixed-center').removeClass('g-hidden-accessible').hide().prependTo("body");
			   			
		   			$lightbox
		   					.find("a")
		   					.one("click", function(e){
		   						$lightbox.trigger('onBeforeClose').fadeOut(function(){
		   							jQuery('#popup-mask').removeClass('popup-mask');
		   							$overlay.fadeOut(function(){
		   								$overlay.remove();
		   								$lightbox.remove();
		   								$lightbox = $overlay = null;
		   							});
		   						});
		   					})
		   				;
			   			
		   			$overlay.fadeIn();
		   			$lightbox.fadeIn();
				}	
                
    			$.ConfirmLightbox = $('#confirm__lightbox').hide().removeClass('g-hidden-accessible');
    				
    			$.ConfirmLightbox.onLoad = function(){
    				noLoading = true;
    				$overlay.stop().fadeIn();
    				$.ConfirmLightbox.stop().fadeIn();
    				return $.ConfirmLightbox;
    			};
    			
				$.ConfirmLightbox.onClose = function( callback ){
					$.ConfirmLightbox.find("a").unbind('click');
					var $links = $.ConfirmLightbox.find("a").click(function( click ){
						$.ConfirmLightbox.fadeOut(function(){
							$overlay.fadeOut();
							$links.unbind("click");
							noLoading = false;
							$links = null;
							if ( !click.currentTarget.previousSibling && callback && $.isFunction(callback) ) {
								callback();
							}
						});
					});
					return $.ConfirmLightbox;
				};
				
				$('body').append("<div class='scroll-to-top-mobile'></div>"); 
				    $('.scroll-to-top-mobile').hide()                                                         
                    $(window).scroll( function() { if ( $j(this).scrollTop() > $(window).height() ) {   
                        $('.scroll-to-top-mobile').fadeIn(800); 
                             } else { 
                        $('.scroll-to-top-mobile').fadeOut(800);  } }); 
                        $('.scroll-to-top-mobile').bind('click', function() { 
                             $('html, body').animate({scrollTop : 0}, 800);
                        });
                   
                        $document.init_plugins();                        function heightBanner(correction) {
                        	$('.b-banners__body_inn').each(function() {
                        		var $bannersHeight = $(this).height();
                        		var $bannersWidth = $(this).parent().parent().find('.b-banners__nav').width();
                        		
								 if(correction){
								 	var $bannersHeight =  $bannersHeight + correction;
								 }
								$(this).closest('.b-banners__body').height($bannersHeight);
                        	})
							$document.init_plugins();                        }
                        
                        var widthBlock = $('.b-banners__body').width(); 
                        
                        var blockSize = {width : widthBlock}
                      
						$(window).resize(function(){
							$('.b-banners__body').each(function() {
								var indexImg =  $(this).find('.m-banners__nav_item_active').index();
								var widthBlock =  $(this).parent().find('.b-banners__nav').width();
								$(this).find('.b-banners__item').width(widthBlock);  
								var scrolLeftNew = blockSize.width; 
								var scrolLeftNew = scrolLeftNew - widthBlock ;
								var scrolLeft = $(this).find('.b-banners__body_inn').css('left'); 
								var scrolLeft = parseInt(scrolLeft);
								
								if(scrolLeft != 0){
									var scrolLeft = scrolLeft + scrolLeftNew * indexImg + "px";
									$(this).find('.b-banners__body_inn').css('left', scrolLeft); 
								}      
								
								blockSize.width = widthBlock;
							});
							
							heightBanner(4);
						}); 
                            
                        
                        // init
						heightBanner();
                        
                })(jQuery);
		/*]]>*/</script>