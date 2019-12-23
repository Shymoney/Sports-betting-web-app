/*global jQuery */

(function($) {

    /** Special keys */
    var special = {
        'backspace': 8,
        'tab': 9,
        'enter': 13,
        'pause': 19,
        'point': [190, 110],
        'capslock': 20,
        'esc': 27,
        'space': 32,
        'pageup': 33,
        'pagedown': 34,
        'end': 35,
        'home': 36,
        'left': 37,
        'up': 38,
        'right': 39,
        'down': 40,
        'insert': 45,
        'delete': 46,
        'f1': 112,
        'f2': 113,
        'f3': 114,
        'f4': 115,
        'f5': 116,
        'f6': 117,
        'f7': 118,
        'f8': 119,
        'f9': 120,
        'f10': 121,
        'f11': 122,
        'f12': 123,
        '?': 191, // Question mark
        'minus': $.browser.opera ? [109, 45, 173] : $.browser.mozilla ? [109, 173] : [189, 109, 173],
        'plus': $.browser.opera ? [61, 43] : $.browser.mozilla ? [61, 107] : [187, 107],
        'equal': [61, 107],
    };

    /** Hash for shortcut lists */
    var lists = {};

    /** Active shortcut list */
    var active;
    
    /** Customs shortcut list */
    var customs;
    
    /** Mixeds shortcut list */
    var mixeds;

    /** Hash for storing which keys are pressed at the moment. Key - ASCII key code (e.which), value - true/false. */
    var pressed = {};

    var isStarted = false;
    
    var multikeyword = true;

    var getKey = function(type, maskObj) {
        var key = type;

        if (maskObj.ctrl) { key += '_ctrl'; }
        if (maskObj.alt) { key += '_alt'; }
        if (maskObj.shift) { key += '_shift'; }
        if (maskObj.custom) { key += '_custom'; }
        if (maskObj.mixed) { key += '_mixed'; }

        var keyMaker = function(key, which, which_1, which_2) {
            if (which && which !== 16 && which !== 17 && which !== 18) { key += '_' + which; }
            
            if (which_1) {
            	 key += '_' + which_1;
            }
            if (which_2) {
            	key += '_' + which_2;
            }
            return key;
        };

        if ($.isArray(maskObj.which)) {
            var keys = [];
            $.each(maskObj.which, function(i, which) {
                keys.push(keyMaker(key, which));
            });
            return keys;
        } else {
            return keyMaker(key, maskObj.which, maskObj.which_1, maskObj.which_2);
        }
    };

    var getMaskObject = function(mask) {
        var obj = {};
        var items = mask.split('+');
        var is_mixed = false;
        
        $.each(items, function(i, item) {
            if (item === 'ctrl' || item === 'alt' || item === 'shift' || item === 'custom' || item === 'mixed') {
            	if (item == 'mixed') {
            		is_mixed = true;
            	}
                obj[item] = true;
            } else {
            	if (is_mixed) {
            		var value = special[item] || item.toUpperCase();
            	} else {
            		var value = special[item] || item.toUpperCase().charCodeAt();
            	}
                
            	if (obj.which && obj.which_1) {
                	obj.which_2 = value;
                }else if (obj.which) {
                	obj.which_1 = value;
                } else {
                	obj.which = value
                }
            }
        });
        
        return obj;
    };

    var checkIsInput = function(target) {
        var name = target.tagName.toLowerCase();
        var type = target.type;
        return (name === 'input' && $.inArray(type, ['text', 'password', 'file', 'search']) > -1) || name === 'textarea';
    };

    var getCustoms = function(active) {
		var $customs = {};
    	
    	for (i in active) {
    		if (i.match(/custom/)) {
    			$customs[i] = active[i];
    		}
    	}
    	
    	return $customs;
    }
    
    var getMixeds = function(active) {
    	var $mixeds = {};
    	
    	for (i in active) {
    		if (i.match(/mixed/)) {
    			$mixeds[i] = active[i];
    		}
    	}
    	
    	return $mixeds;
    }
    
    var tryStartMultikeys = function(keys, callback) {
    	for (i in customs) {
    		var custom = customs[i][0];
    		var custom_mask = filterCustomMask(custom.mask.split('+'));
    		
    		if (tryStartMultikeyFunction(custom_mask, keys)) {
    			custom.handler();
    			
    			return callback(true);
    		}
    	}
 
    	for (i in mixeds) {
    		var custom = mixeds[i][0];
    		var custom_mask = filterMixedMask(custom.mask.split('+'));
    		
    		if (tryStartMultikeyFunction(custom_mask, keys)) {
    			custom.handler();
    			
    			return callback(true);
    		}
    	}
    	
    	return callback(false);
    	
    	return false;
    };
    
    var arraysEqual = function(a, b) {
    	  if (a === b) return true;
    	  if (a == null || b == null) return false;
    	  if (a.length != b.length) return false;

    	  // If you don't care about the order of the elements inside
    	  // the array, you should sort both arrays here.

    	  for (var i = 0; i < a.length; ++i) {
    	    if (a[i] !== b[i]) return false;
    	  }
    	  return true;
	}
    
    var tryStartMultikeyFunction = function(mask, keys) {
    	if (arraysEqual(mask, keys)) {
    		return true;
    	}
    	
    	return false;
    }
    
    var filterCustomMask = function(mask) {
    	var result = [];
    	
    	for (i in mask) {
    		if (i > 0) {
    			result.push(mask[i].toUpperCase().charCodeAt());
    		}
    	}
    	
    	return result;
    }
    
    var filterMixedMask = function(mask) {
    	var result = [];
    	
    	for (i in mask) {
    		if (i > 0) {
    			result.push(parseInt(mask[i]));
    		}
    	}
    	
    	return result;
    }
    
    var run = function(type, e) {
        if (!active) { return; }

        var maskObj = {
            ctrl: e.ctrlKey,
            alt: e.altKey,
            shift: e.shiftKey,
            which: e.which,
        };

        var key = getKey(type, maskObj);
        
        var shortcuts = active[key]; // Get shortcuts from the active list.

        if (!shortcuts) { return; }

        var isInput = checkIsInput(e.target);
        var isPrevented = false;

        $.each(shortcuts, function(i, shortcut) {
            // If not in input or this shortcut is enabled in inputs.
            if (!isInput || shortcut.enableInInput) {
                if (!isPrevented) {
                    e.preventDefault();
                    isPrevented = true;
                }
                shortcut.handler(e); // Run the shortcut's handler.
            }
        });
    };

    $.Shortcuts = {};

    /**
     * Start reacting to shortcuts in the specified list.
     * @param {String} [list] List name
     */
    $.Shortcuts.start = function(list) {
        list = list || 'default';
        active = lists[list]; // Set the list as active.
        
        customs = getCustoms(active);
        mixeds = getMixeds(active);
        
        if (isStarted) { return; } // We are going to attach event handlers only once, the first time this method is called.
        var $multikeys = [];
        var $result = false;
        
        var $minimum_interval = 300;
        
        var $date = new Date();
		var $last_keys_time = $date.getTime();
        
        $(document).bind(($.browser.opera ? 'keypress' : 'keydown') + '.shortcuts', function(e) {
        	var $result = null;
        	var $enable_shortcuts = $('#enable_shortcuts').val();
        	var $enabled_page = $('#betcard').length;
        	
        	if (e.type === 'keypress' && e.which >= 97 && e.which <= 122) {
                 e.which = e.which - 32;
        	}
        	
        	if (multikeyword && e.which >= 96 && e.which <= 105) {
        		e.which = e.which - 48;
        	}

        	if ($enable_shortcuts == 0 || !$enabled_page) {
        		e.which = 0
        	}
        	
        	var $date = new Date();
			var $key_time = $date.getTime();
			
			if (!$last_keys_time) {
				$last_keys_time = $key_time;
			}
			
			var $time_difference = $key_time - $last_keys_time;
			
			$last_keys_time = $key_time;
			
			if ($time_difference >= $minimum_interval) {
				// call function
				setTimeout(function() {
					tryStartMultikeys($multikeys, function(data) {
						// if callback function didn't find
						
						if (!data) {
							if (!pressed[e.which]) {
								run('down', e);
							}
						}
					});
				}, 500);
				
				$multikeys = [];
			}
			
			$multikeys.push(e.which);
        });
    };

    /**
     * Stop reacting to shortcuts (unbind event handlers).
     */
    $.Shortcuts.stop = function() {
        $(document).unbind('keypress.shortcuts keydown.shortcuts keyup.shortcuts');
        isStarted = false;
        return this;
    };

    /**
     * Add a shortcut.
     * @param {Object}   params         Shortcut parameters.
     * @param {String}  [params.type]   The type of event to be used for running the shortcut's handler.
     *     Possible values:
     *     down â€“ On key down (default value).
     *     up   â€“ On key up.
     *     hold â€“ On pressing and holding down the key. The handler will be called immediately
     *            after pressing the key and then repeatedly while the key is held down.
     * 
     * @param {String}   params.mask    A string specifying the key combination.
     *     Consists of key names separated by a plus sign. Case insensitive.
     *     Examples: 'Down', 'Esc', 'Shift+Up', 'ctrl+a'.
     * 
     * @param {Function} params.handler A function to be called when the key combination is pressed. The event object will be passed to it.
     * @param {String}  [params.list]   You can organize your shortcuts into lists and then switch between them.
     *     By default shortcuts are added to the 'default' list.
     * @param {Boolean} [params.enableInInput] Whether to enable execution of the shortcut in input fields and textareas. Disabled by default.
     */
    $.Shortcuts.add = function(params) {
        if (!params.mask) { throw new Error("$.Shortcuts.add: required parameter 'params.mask' is undefined."); }
        if (!params.handler) { throw new Error("$.Shortcuts.add: required parameter 'params.handler' is undefined."); }

        var type = params.type || 'down';
        var listNames = params.list ? params.list.replace(/\s+/g, '').split(',') : ['default'];
        
        $.each(listNames, function(i, name) {
            if (!lists[name]) { lists[name] = {}; }
            var list = lists[name];
            var masks = params.mask.toLowerCase().replace(/\s+/g, '').split(',');

            $.each(masks, function(i, mask) {
                var maskObj = getMaskObject(mask);
                var keys = getKey(type, maskObj);
                
                if (!$.isArray(keys)) { keys = [keys]; }
    
                $.each(keys, function(i, key) {
                    if (!list[key]) { list[key] = []; }
                    list[key].push(params);
                });
            });
        });

        return this;
    };

    /**
     * Remove a shortcut.
     * @param {Object}  params       Shortcut parameters.
     * @param {String} [params.type] Event type (down|up|hold). Default: 'down'.
     * @param {String}  params.mask  Key combination.
     * @param {String} [params.list] A list from which to remove the shortcut. Default: 'default'.
     */
    $.Shortcuts.remove = function(params) {
        if (!params.mask) { throw new Error("$.Shortcuts.remove: required parameter 'params.mask' is undefined."); }

        var type = params.type || 'down';
        var listNames = params.list ? params.list.replace(/\s+/g, '').split(',') : ['default'];

        $.each(listNames, function(i, name) {
            if (!lists[name]) { return true; } // continue
            var masks = params.mask.toLowerCase().replace(/\s+/g, '').split(',');

            $.each(masks, function(i, mask) {
                var maskObj = getMaskObject(mask);
                var keys = getKey(type, maskObj);
                if (!$.isArray(keys)) { keys = [keys]; }

                $.each(keys, function(i, key) {
                    delete lists[name][key];
                });
            });
        });

        return this;
    };

}(jQuery));