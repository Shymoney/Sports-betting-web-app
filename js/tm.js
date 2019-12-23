/*!
 * jQuery UI Timepicker 0.2.1
 *
 * Copyright (c) 2009 Martin Milesich (http://milesich.com/)
 *
 * Some parts are
 *   Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 *
 * $Id: timepicker.js 28 2009-08-11 20:31:23Z majlo $
 *
 * Depends:
 *  ui.core.js
 *  ui.datepicker.js
 *  ui.slider.js
 */
(function($) {

/**
 * Extending default values
 */
$.extend($.datepicker._defaults, {
    'time24h': false, // True if 24h time
    'showTime': false, // Show timepicker with datepicker
    'altTimeField': '' // Selector for an alternate field to store time into
});

var dpuuid = new Date().getTime();  

/**
 * _hideDatepicker must be called with null
 */
$.datepicker._connectDatepickerOverride = $.datepicker._connectDatepicker;
$.datepicker._connectDatepicker = function(target, inst) {
    $.datepicker._connectDatepickerOverride(target, inst);

    // showButtonPanel is required with timepicker
    if (this._get(inst, 'showTime')) {
        inst.settings['showButtonPanel'] = true;
    }

    var showOn = this._get(inst, 'showOn');

    if (showOn == 'button' || showOn == 'both') {
        // Unbind all click events
        inst.trigger.unbind('click');

        // Bind new click event
        inst.trigger.click(function() {
            if ($.datepicker._datepickerShowing && $.datepicker._lastInput == target) {
				$.datepicker._hideDatepicker(null); // This override is all about the "null"
			} else {
				$.datepicker._showDatepicker(target);
			}
            return false;
        });
    }
};

/**
 * Datepicker does not have an onShow event so I need to create it.
 * What I actually doing here is copying original _showDatepicker
 * method to _showDatepickerOverload method.
 */
$.datepicker._showDatepickerOverride = $.datepicker._showDatepicker;
$.datepicker._showDatepicker = function (input) {
    // Call the original method which will show the datepicker
    $.datepicker._showDatepickerOverride(input);

    input = input.target || input;

    // find from button/image trigger
    if (input.nodeName.toLowerCase() != 'input') {
		input = $('input', input.parentNode)[0];
	}

    // Do not show timepicker if datepicker is disabled
    if ($.datepicker._isDisabledDatepicker(input)) {
		return;
	}

    // Get instance to datepicker
    var inst = $.datepicker._getInst(input);

    var showTime = $.datepicker._get(inst, 'showTime');

    // If showTime = True show the timepicker
    if (showTime) {
		$.timepicker.show(input);
	}
};

/**
 * Same as above. Here I need to extend the _checkExternalClick method
 * because I don't want to close the datepicker when the sliders get focus.
 */
$.datepicker._checkExternalClickOverride = $.datepicker._checkExternalClick;
$.datepicker._checkExternalClick = function (event) {
    if (!$.datepicker._curInst) return;
    var $target = $(event.target);

    if (($target.parents("#" + $.timepicker._mainDivId).length == 0)) {
        $.datepicker._checkExternalClickOverride(event);
    }
};

/**
 * Datepicker has onHide event but I just want to make it simple for you
 * so I hide the timepicker when datepicker hides.
 */
$.datepicker._hideDatepickerOverride = $.datepicker._hideDatepicker;
$.datepicker._hideDatepicker = function(input, duration) {
    // Some lines from the original method
    var inst = this._curInst;

    if (!inst || (input && inst != $.data(input, PROP_NAME))) return;

    // Get the value of showTime property
    var showTime = this._get(inst, 'showTime');

    if (input === undefined && showTime) {
        if (inst.input) {
            inst.input.val(this._formatDate(inst));
            inst.input.trigger('change'); // fire the change event
        }
        this._updateAlternate(inst);
        $.timepicker.update(this._formatDate(inst));
    }

    // Hide datepicker
    $.datepicker._hideDatepickerOverride(input, duration);

    // Hide the timepicker if enabled
    if (showTime) {
        $.timepicker.hide();
    }
};

/**
 * This is a complete replacement of the _selectDate method.
 * If showed with timepicker do not close when date is selected.
 */
$.datepicker._selectDate = function(id, dateStr) {
	var target = $(id);
	var inst = this._getInst(target[0]);
	var showTime = this._get(inst, 'showTime');
	dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
    if (!showTime) {
        if (inst.input)
            inst.input.val(dateStr);
        this._updateAlternate(inst);
    }
	var onSelect = this._get(inst, 'onSelect');
	if (onSelect)
		onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
	else if (inst.input && !showTime)
		inst.input.trigger('change'); // fire the change event
	if (inst.inline)
		this._updateDatepicker(inst);
	else {
        if (showTime) {
			this._updateDatepicker(inst);
		} else {
			this._hideDatepicker();
			this._lastInput = inst.input[0];
			if (typeof(inst.input[0]) != 'object') 
				inst.input.focus(); // restore focus
			this._lastInput = null;
		}
	}
};

/**
 * We need to resize the timepicker when the datepicker has been changed.
 */
$.datepicker._updateDatepickerOverride = $.datepicker._updateDatepicker;
$.datepicker._updateDatepicker = function(inst) {
    $.datepicker._updateDatepickerOverride(inst);
	if ( this._get(inst, 'showTime') ) {
	    if (inst.input) {
	        inst.input.val(this._formatDate(inst));
	        inst.input.trigger('change'); // fire the change event
	    }
	    this._updateAlternate(inst);
	    $.timepicker.update(this._formatDate(inst));
	    $.timepicker.resize();
	}
};

function Timepicker() {}

Timepicker.prototype = {
    init: function()
    {
        this._mainDivId = 'ui-timepicker-div';
        this._inputId   = null;
        this._orgValue  = null;
        this._orgHour   = null;
        this._orgMinute = null;
        this._colonPos  = -1;
        this._visible   = false;
        this.tpDiv      = $('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible" style="width:30em; display: none; position: absolute;"/>');
        this._generateHtml();
		this.tpDiv.height('20em');
    },

    show: function (input)
    {
        // Get instance to datepicker
        var inst = $.datepicker._getInst(input);
		
		this.inst = inst;

        this._time24h = $.datepicker._get(inst, 'time24h');
        this._altTimeField = $.datepicker._get(inst, 'altTimeField');

        this._inputId = input.id;

        if (!this._visible) {
            this._parseTime();
            this._orgValue = $("#" + this._inputId).val();
        }
		
		this.tpDiv.find("table tr").eq(2)[this._time24h ? "removeClass" : "addClass"]("ui-helper-hidden");
		$("#ui-timepicker-am").closest("tr")[this._time24h ? "addClass" : "removeClass"]("ui-helper-hidden").end().triggerHandler("click");

        this.resize();

        this.tpDiv
			.removeClass('ui-helper-hidden-accessible')
			.show()
		;

        this._visible = true;

        var dpDiv     = $("#" + $.datepicker._mainDivId);
        var dpDivPos  = dpDiv.position();

        var viewWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + $(document).scrollLeft();
        var tpRight   = this.tpDiv.offset().left + this.tpDiv.outerWidth();

        if (tpRight > viewWidth) {
            dpDiv.css('left', dpDivPos.left - (tpRight - viewWidth) - 5);
            this.tpDiv.css('left', dpDiv.offset().left + dpDiv.outerWidth() + 'px');
        }
    },

    update: function (fd)
    {
        var curTime = $("#" + this._mainDivId + ' span.fragHours').text()
                    + ':'
                    + $("#" + this._mainDivId + ' span.fragMinutes').text();

        if (!this._time24h) {
            curTime += ' ' + $("#" + this._mainDivId + ' span.fragAmpm').text();
        }

        var curDate = $("#" + this._inputId).val();

        $("#" + this._inputId).val(fd + ' ' + curTime);

        if (this._altTimeField) {
            $(this._altTimeField).each(function() { $(this).val(curTime); });
        }
    },

    hide: function ()
    {
        this._visible = false;
        $("#" + this._mainDivId).hide();
    },

    resize: function ()
    {
        var dpDiv = $("#" + $.datepicker._mainDivId);
        var dpDivPos = dpDiv.position();

        var hdrHeight = $("#" + $.datepicker._mainDivId +  ' > div.ui-datepicker-header:first-child').height();

        $("#" + this._mainDivId + ' > div.ui-datepicker-header:first-child').css('height', hdrHeight);

        this.tpDiv.css({
            'height': dpDiv.height(),
            'top'   : dpDivPos.top,
            'left'  : dpDivPos.left + dpDiv.outerWidth() - 1 + 'px'
        });
	
    },

    _generateHtml: function () {
        var html = '';

		html += '<style type="text/css">';
		html += '.ui-timepicker a {text-align:center}';
		html += '.ui-timepicker th {text-align:left}';
		html += '.ui-timepicker td {width:7%}';
		html += '</style>';
		
        html += [
				'<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">',
					'<div class="ui-datepicker-title" style="margin:0">',
						'<span class="fragHours">08</span>',
						'<span class="delim">:</span>',
						'<span class="fragMinutes">45</span>&nbsp;',
						'<span class="fragAmpm"></span>',
					'</div>',
				'</div>',
				'<table id="ui-timepicker-grid" class="ui-timepicker">',
					'<tbody>',
						'<tr>',
							'<td colspan="13">&nbsp;</td>',
						'</tr>',
						'<tr>',
							'<th>Hour</th>',
							'<td><a href="#">00</a></td>',
							'<td><a href="#">01</a></td>',
							'<td><a href="#">02</a></td>',
							'<td><a href="#">03</a></td>',
							'<td><a href="#">04</a></td>',
							'<td><a href="#">05</a></td>',
							'<td><a href="#">06</a></td>',
							'<td><a href="#">07</a></td>',
							'<td><a href="#">08</a></td>',
							'<td><a href="#">09</a></td>',
							'<td><a href="#">10</a></td>',
							'<td><a href="#">11</a></td>',
						'</tr>',
						'<tr class="ui-helper-hidden">',
							'<th>&nbsp;</th>',
							'<td><a href="#">12</a></td>',
							'<td><a href="#">13</a></td>',
							'<td><a href="#">14</a></td>',
							'<td><a href="#">15</a></td>',
							'<td><a href="#">16</a></td>',
							'<td><a href="#">17</a></td>',
							'<td><a href="#">18</a></td>',
							'<td><a href="#">19</a></td>',
							'<td><a href="#">20</a></td>',
							'<td><a href="#">21</a></td>',
							'<td><a href="#">22</a></td>',
							'<td><a href="#">23</a></td>',
						'</tr>',
						'<tr>',
							'<th>Minutes</th>',
							'<td><a href="#">00</a></td>',
							'<td><a href="#">05</a></td>',
							'<td><a href="#">10</a></td>',
							'<td><a href="#">15</a></td>',
							'<td><a href="#">20</a></td>',
							'<td><a href="#">25</a></td>',
							'<td><a href="#">30</a></td>',
							'<td><a href="#">35</a></td>',
							'<td><a href="#">40</a></td>',
							'<td><a href="#">45</a></td>',
							'<td><a href="#">50</a></td>',
							'<td><a href="#">55</a></td>',
						'</tr>',
						'<tr>',
							'<th>&nbsp;</th>',
							'<td colspan="12">',
								'<div id="minuteSlider" class="slider"></div>',
							'</td>',
						'</tr>',
						'<tr>',
							'<th>&nbsp;</th>',
							'<td><a id="ui-timepicker-am" href="#" type="hour">A.M</a></td>',
							'<td><a id="ui-timepicker-pm" href="#" type="hour">P.M</a></td>',
						'</tr>',
					'</tbody>',
				'</table>',
				'<div style="width:97%;position:absolute;left:1%;bottom:0" class="ui-datepicker-buttonpane ui-widget-content">',
					'<button class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid + '.datepicker._hideDatepicker();return fasle;" type="button">Done</button>',
				'</div>'
			].join('');
			

        this.tpDiv.html(html).appendTo(document.body);
		
        $('#minuteSlider').slider({
            orientation: "horizontal",
            range: 'min',
            min: 0,
            max: 59,
            step: 1,
            slide: function(event, ui) {
                self._setTime('minute', ui.value);
            },
            stop: function(event, ui) {
                $('#' + self._inputId).focus();
            }
        }).children("a").css('padding', 0);
		
		var $ui_timepicker_pm = $("#ui-timepicker-pm"),
			$ui_timepicker_am = $('#ui-timepicker-am'),
			$ui_timepicker_grid = $('#ui-timepicker-grid'),
			$ui_timepicker_grid_link = $ui_timepicker_grid.find('a').addClass('ui-state-default'),
			$ui_timepicker_grid_table_row = $ui_timepicker_grid.find('tr'),
			$ui_timepicker_frag_hours = this.tpDiv.find('span.fragHours');

		var reTimeSeparate = /^0|:/,
			prepare = function ( $elems, type) {
				$elems.each(function(i, elem){
	
					var $self = $(elem),
						time = ~~($self.text().replace(reTimeSeparate, ''));	
					if (time == 12) {
						time = 0;
					}
	
					$self
						.attr('type', type)
						.attr('time', time)			
						.bind('click.' + type, function( e ){
							var time_ = ~~($self.attr('time'));
							if ((type == 'hour') && $ui_timepicker_pm.hasClass('ui-state-active')) {
								time_ += 12;
							}
							self._setTime (type, time_);
							return false;
						})
					;	
				});			
			};
		
		prepare($ui_timepicker_grid_table_row.eq('1').find('a'), 'hour');
		prepare($ui_timepicker_grid_table_row.eq('2').find('a'), 'hour');
		prepare($ui_timepicker_grid_table_row.eq('3').find('a'), 'minute');
		
		$ui_timepicker_am.click(function() {
			var hour = ~~($ui_timepicker_frag_hours.text());
			if (hour >= 12) {hour -= 12;}
			self._setTime ('hour', hour );
			return false;
		});
		
		$ui_timepicker_pm.click(function() {
			var hour = ~~($ui_timepicker_frag_hours.text());
			if (hour >= 12) {hour -= 12;}
			self._setTime ('hour', hour + 12);
			return false;
		});		
		
        var self = this;
    },

    _writeTime: function (type, value) {
        if (type == 'hour') {
            if (!this._time24h) {
                if (value < 12) {
                    $("#" + this._mainDivId + ' span.fragAmpm').text('am');
                } else {
                    $("#" + this._mainDivId + ' span.fragAmpm').text('pm');
                    value -= 12;
                }

                if (value == 0) value = 12;
            } else {
                $("#" + this._mainDivId + ' span.fragAmpm').text('');
            }

            if (value < 10) value = '0' + value;
            $("#" + this._mainDivId + ' span.fragHours').text(value);
        }

        if (type == 'minute') {
            if (value < 10) value = '0' + value;
            $("#" + this._mainDivId + ' span.fragMinutes').text(value);
        }
		
		$.datepicker._updateDatepicker( this.inst );
		
    },

    _parseTime: function ()
    {
        var dt = $("#" + this._inputId).val();

        this._colonPos = dt.search(':');

        var m = 0, h = 0, a = '';

        if (this._colonPos != -1) {
            h = parseInt(dt.substr(this._colonPos - 2, 2), 10);
            m = parseInt(dt.substr(this._colonPos + 1, 2), 10);
            a = jQuery.trim(dt.substr(this._colonPos + 3, 3));
        }

        a = a.toLowerCase();

        if (a != 'am' && a != 'pm') {
            a = '';
        }

        if (h < 0) h = 0;
        if (m < 0) m = 0;

        if (h > 23) h = 23;
        if (m > 59) m = 59;

        if (a == 'pm' && h  < 12) h += 12;
        if (a == 'am' && h == 12) h  = 0;

        this._setTime('hour',   h);
        this._setTime('minute', m);

        this._orgHour   = h;
        this._orgMinute = m;
    },

    _setTime: function (type, value)
    {
        if (isNaN(value)) value = 0;
        if (value < 0)    value = 0;
        if (value > 23 && type == 'hour')   value = 23;
        if (value > 59 && type == 'minute') value = 59;

		// set selected classes
		$('table.ui-timepicker td a[type=' + type + ']').removeClass('ui-state-active');

		var selected = value;
		
		if (type == 'hour') {
			if (value < 12) {
				$('#ui-timepicker-am').addClass('ui-state-active');
			} else {
				$('#ui-timepicker-pm').addClass('ui-state-active');
				selected -= 12;
			}
		}

		$('table.ui-timepicker a[time=' + selected + '][type=' + type + ']').addClass('ui-state-active');
				
        if (type == 'minute') {
            $('#minuteSlider').slider('value', value);
        }		
		
        this._writeTime(type, value);
    }
};

$.timepicker = new Timepicker();
$('document').ready(function () {$.timepicker.init();});

window['DP_jQuery_' + dpuuid] = $;

})(jQuery);
