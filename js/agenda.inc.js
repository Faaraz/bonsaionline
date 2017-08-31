(function($, window){

    "use strict";

    window.JQueryPluginAbstract = klass(function(element, nameSpace, options){
        this.$element = $(element);
        this.nameSpace = nameSpace;
        this.options = options;
        $(element).data('plugin_' + nameSpace, this);
        this.eventBoundElements = [];
    }).methods({
        getSet : function(args){
            if(args.length > 0 && typeof args[0]  == 'string') {
                var methodName = args[0];

                if(typeof this[methodName] == 'function'){// methodcall
                    // return response
                    return this[methodName].apply(this, Array.prototype.slice.call( args, 1 ));

                }else{ // get/set option
                    if(args[0] == 'option' && args.length > 1 && typeof args[1] == 'string'){
                        var propertyName = args[1];

                        if(this.options.hasOwnProperty(propertyName)){
                            if(args.length == 3){
                                this.setProperty(propertyName, args[2]);

                                return this.$element;
                            }else{
                                return this.options[propertyName];
                            }
                        }else{
                            $.error('Property \''+ propertyName + '\' not found' );
                        }
                    }
                }
            }
        },

        get : function() {
            // return controller
            return this.$element.data('plugin_' + this.nameSpace);
        },

        setProperty : function(propertyName, value){
            this.options[propertyName] = value;
        },

        _dispatchCallback : function(eventName, params){
            if(typeof this.options[eventName] == 'function'){
                this.options[eventName](params);
            }
        },

        _addEventListener : function(element, eventName, callback){
            $(element).bind(eventName + "." + this.nameSpace, callback);
            var bindData = {element : element, eventName : eventName, callback : callback};
            this.eventBoundElements.push(bindData);
        },

        _removeEventListener :function(element, eventName){
            $(element).unbind(eventName + "." + this.nameSpace);
        },

        destroy : function(){
            var me = this;

            for(var i = 0; i < me.eventBoundElements.length; i++){
                var bindData = me.eventBoundElements[i];
                $(bindData.element).unbind(bindData.eventName + '.' + me.nameSpace, bindData.callback);
            }

            this.$element.unbind('.' + this.nameSpace).removeData('plugin_' + me.nameSpace);
        }
    });
})(jQuery, window);

/*
 *  @description : provides backward compatibility for html5 dataset-attribute feature.
 *  @version 1.0
 */
(function ($) {
    "use strict";

    $.fn.dataSet = function(){
        var dataSets = [];

        this.each(function(){
            var dataSet = {};

            if (typeof($(this).get(0).dataset) == "object") {
                var obj = $(this).get(0).dataset;

                for (var x in obj) {
                    if (obj.hasOwnProperty(x))
                    {
                        dataSet[x] = obj[x];
                    }
                }
            }else{
                dataSet = {};
                var attributes = $(this).get(0).attributes;

                for(var i = 0;i < attributes.length;i++){
                    var nodeName = attributes[i].nodeName;

                    if(/^data\-/.test(nodeName)){
                        var nodeValue = attributes[i].nodeValue;
                        nodeName = nodeName.toLowerCase().replace('data-', '');
                        var stack = nodeName.split("-");
                        nodeName = stack[0];

                        for(var j = 1; j < stack.length; j++){
                            nodeName += stack[j].substr(0, 1).toUpperCase() + stack[j].slice(1);
                        }

                        dataSet[nodeName] = nodeValue;
                    }
                }
            }

            dataSets.push(dataSet);
        });

        return dataSets;
    };
})(jQuery);

//  enable or disable the possibility to de-select an option element
(function($){
    "use strict";

    $.fn.optionDeselectEnabled = function(enable){
        return this.each(function(){
            if(!enable){
                $(this).unbind("mousedown");
            }else{
                $(this).mousedown(function(){
                    var optionSelected = $(this).attr("selected");

                    if(optionSelected){
                        $(this).click(function(){
                            $(this).attr("selected", false);
                        });
                    }else{
                        $(this).unbind("click");
                    }
                });
            }
        });
    };
})(jQuery);

//  Makes the HTML5 placeholder attribute backwards compatible.
(function($){
    "use strict";

    $.fn.placeHolder = function(){
        return this.each(function(){
            var placeHolderText = $(this).get(0).getAttribute('placeholder');

            $(this).focus(function(){
                if($(this).val() == placeHolderText){
                    $(this).val("").removeClass('placeholder');
                }
            }).blur(function(){
                if($(this).val().length == 0){
                    $(this).val(placeHolderText).addClass('placeholder');
                }
            });

            if($(this).val().length == 0){
                $(this).val(placeHolderText).addClass('placeholder');
            }
        });
    } ;
})(jQuery);
/*
 *  @description : Javascript's match-method only returns the first match, this one returns all matches.
 *  @return : An array where each key is an array of matches (first match is entire string, each next match is a submatch)
 */

(function($, window){
    window.preg_match_all = function(pattern, searchableString){
        var cursor = 0;
        var stack = [];

        while(cursor < searchableString.length){
            if(pattern.test(searchableString)){
                var matches = searchableString.match(pattern);
                stack.push(matches);
                var lastMatch = matches[matches.length-1];
                var index = searchableString.indexOf(lastMatch, cursor) + lastMatch.length;
                searchableString = searchableString.substr(index);
                cursor = 0;
            }else{
                cursor = searchableString.length;
            }
        }

        return stack;
    }
})(jQuery, window);


/*
 *  @description : creates and returns cancelble timer.
 *  @param: <int> timeDelay (milliseconds)
 *  @example:
 *  var delegate = $.timer(2000);
 *  $(delegate).bind("onComplete", function(){ alert("complete");});
 */
(function($){
    "use strict";

    $.extend({
            timer : function (timeDelay) {
                // return timer
                return {
                    timeDelay : timeDelay,
                    t : null,

                    start : function(){
                        var me = this;
                        $(me).trigger("onStart");
                        me.t = setTimeout(function(){
                            me._onTimeElapsed.call(me);
                        }, me.timeDelay);

                        return me;
                    },

                    _onTimeElapsed : function(){
                        this.clear();
                        $(this).trigger("onComplete");
                    },

                    cancel : function(){
                        this.clear();
                        $(this).trigger("onCancel");

                        return this;
                    },

                    clear : function(){
                        if(this.t != null){
                            clearTimeout(this.t);
                            this.t = null;
                        }

                        return this;
                    }
                };
            }
        }
    );
})(jQuery);


(function($){
    "use strict";

    $.fn.dimensions = function(){
        var dimensions = [];
        $(this[0]).each(function(){
            var props = {}, i, x;
            props.width = parseFloat($(this).width());
            props.height = parseFloat($(this).height());
            props.padding = {};
            props.margin = {};
            props.borderWidth = {};
            var sides = ['top', 'right', 'bottom', 'left'];

            for(i = 0; i < sides.length;i++){
                props.padding[sides[i]] = isNaN(parseInt($(this).css('padding-' + sides[i]))) ? 0 : parseInt($(this).css('padding-' + sides[i]));
            }

            for(i = 0; i < sides.length;i++){
                props.margin[sides[i]] = isNaN(parseInt($(this).css('margin-' + sides[i]))) ? 0 : parseInt($(this).css('margin-' + sides[i]));
            }

            for(i = 0; i < sides.length;i++){
                props.borderWidth[sides[i]] = isNaN(parseInt($(this).css('border-' + sides[i] + '-width'))) ? 0 : parseInt($(this).css('border-' + sides[i] + '-width'));
            }

            // negative margin/padding does not make element smaller
            for(x in props.margin){
                if (props.margin.hasOwnProperty(x))
                {
                    props.margin[x] = props.margin[x] < 0 ? 0: props.margin[x];
                }
            }
            for(x in props.padding){
                if (props.padding.hasOwnProperty(x)) {
                    props.padding[x] = props.padding[x] < 0 ? 0 : props.padding[x];
                }
            }

            props.xSpan = parseFloat($(this).get(0).offsetWidth) + props.margin.left + props.margin.right;
            props.ySpan = parseFloat($(this).get(0).offsetHeight) + props.margin.top + props.margin.bottom;
            dimensions.push(props);
        });

        return dimensions;
    };
})(jQuery);

(function($){
    "use strict";

    $.fn.imageLoad = function(callback){
        return this.each(function(){
            var imgElement = $(this).get(0);
            var loaded = (imgElement.complete && ($(imgElement).height() > 0 && $(imgElement).width() > 0));

            if(loaded){
                callback.call(this, imgElement);
            }else{
                $(imgElement).load(function(e){
                    callback.call(this, imgElement);
                });
            }
        });
    };
})(jQuery);

(function($){
    "use strict";

    $.fn.imageCollectionLoad = function(callback){
        var me = this;
        var count = $(this).length;
        var progress = {count : 0};

        var ready = function(image){
            progress.count++;

            if(progress.count == count){
                callback.call(me);
            }
        };

        $(this).imageLoad(ready);

        return this;
    };
})(jQuery);

(function($){
    "use strict";

    $.fn.descendants = function(){
        var descendants = [];

        this.each(function(){
            $(this).children().each(function(){
                descendants.push(this);
                var children = $(this).descendants();

                $(children).each(function(){
                    descendants.push(this);
                });
            });
        });

        return descendants;
    };
})(jQuery);

(function($){
    "use strict";

    $.fn.isDescendantOf = function(element){
        var tagName = $(this[0]).get(0).tagName.toLowerCase();
        var needle = $(this[0]);
        var elements = $(element).find(tagName);
        var isDescendant = false;

        $(elements).each(function(){
            if($(this).is(needle)){
                isDescendant = true;
            }
        });

        return isDescendant;
    };
})(jQuery);

(function($, window, undefined){
    "use strict";

    $.fn.resizeComplete = function(callback, time){
        if($(this).length > 1 || !$(this)[0] instanceof window.constructor){
            throw 'Event jQuery#windowResizeComplete can only be attached to window';
        }

        time = isNaN(time) ? 500 : time;
        var timerExists = $(window).data('resizeTimer') !== undefined;
        var timer;

        if(!timerExists){
            timer = $.timer(time);
            $(window).data('resizeTimer', timer);
            $(timer).data('callbacks', [callback]);
            $(window).data('dimensions', {width : parseFloat($(window).width()), height : parseFloat($(window).height())});

            $(timer).bind('onComplete', function(){
                var windowWidth = parseFloat($(window).width());
                var windowHeight = parseFloat($(window).height());
                var previousDimensions = $(window).data('dimensions');
                $(window).data('dimensions', {width : windowWidth, height : windowHeight});

                if(windowWidth == previousDimensions.width && windowHeight == previousDimensions.height){
                    timer.cancel();
                    var callbacks = $(timer).data('callbacks');

                    for(var index in callbacks){
                        if (callbacks.hasOwnProperty(index)) {
                            callbacks[index].call();
                        }
                    }
                }else{
                    timer.cancel().start();
                }
            });

            $(window).resize(function(e){
                timer.cancel().start();
            });
        }else{
            timer =  $(window).data('resizeTimer');
            $(timer).data('callbacks').push(callback);
        }
    };

    return $(this);
})(jQuery, window, void 0);


(function($, window, undefined){
    "use strict";

    // constants
    var TOUCH_EVENTS_SUPPORTED = ('ontouchstart' in window);

    var SwipeController = JQueryPluginAbstract.extend(function(element, nameSpace, options){
         this.options = $.extend({}, {
            includeMouseSwipe : false,
            hSwipeEnd : null,
            vSwipeEnd : null,
            excludedCssSelectors : []
        }, options);

        this.touchesCount = 0;
        this.startX = 0;
        this.startY = 0;
        this.pageX = 0;
        this.pageY = 0;
        this.touchStartTime = 0;
        this.swipeTime = 0;
        this.swiping = false;
        this.mouseDown = false;
        this.debugCount = 1;
        this.ID = new Date().getTime();
    }).methods({

        init : function() {
            this.options.includeMouseSwipe = !TOUCH_EVENTS_SUPPORTED;
            var me = this;

            if(TOUCH_EVENTS_SUPPORTED){
                this.$element.bind('touchstart.' + me.nameSpace, function(e){me._touchStartEventHandler.call(me, e);});
                this.$element.bind('touchmove.' + me.nameSpace, function(e){me._touchMoveEventHandler.call(me, e);});
                this.$element.bind('touchend.' + me.nameSpace, function(e){me._touchEndEventHandler.call(me, e);});
            }

            if(window.navigator.msPointerEnabled){
                $(document).bind('MSPointerUp.' + me.nameSpace, function(e){me._touchEndEventHandler.call(me, e);});
            }else{
                this.$element.bind('mouseup.' + me.nameSpace, function(e){me._touchEndEventHandler.call(me, e);});
            }

            // mouseup will not fire if mousemove becomes drag so we have to listen for dragend as well as mouseup
            this.$element.bind('dragend.' + me.nameSpace, function(e){me._clickEventHandler.call(me, e);});

            if(this.options.includeMouseSwipe){
                if(window.navigator.msPointerEnabled){
                    this.$element.bind('MSPointerDown.' + me.nameSpace, function(e){me._touchStartEventHandler.call(me, e);});
                    this.$element.bind('MSPointerMove.' + me.nameSpace, function(e){me._touchMoveEventHandler.call(me, e);});
                }else{
                    this.$element.bind('mousedown.' + me.nameSpace, function(e){me._touchStartEventHandler.call(me, e);});
                    this.$element.bind('mousemove.' + me.nameSpace, function(e){me._touchMoveEventHandler.call(me, e);});
                }
            }

            this._setMsTouchAction();
        },

        // override
        setProperty : function(propertyName, value){
            this.supr(propertyName, value);

            if(propertyName == 'hSwipeEnd' || propertyName == 'vSwipeEnd'){
                this._setMsTouchAction();
            }
        },

        /**
         * IE:
         * pan-x : disables page scrolling vertical
         * pan-y : disables page scrolling horizontal
         * pan : disables scrolling altogether
         * none : default scrolling
         **/
        _setMsTouchAction : function(){
            var msTouchAction = 'auto';

            if(typeof this.options.vSwipeEnd == 'function' && this.options.hSwipeEnd == null){
                msTouchAction = 'pan-x';
            }

            if(typeof this.options.hSwipeEnd == 'function' && this.options.vSwipeEnd == null){
                msTouchAction = 'pan-y';
            }

            this.$element.get(0).style.msTouchAction = msTouchAction;
        },

        _clickEventHandler : function(){
            this.mouseDown = false;
        },

        _touchStartEventHandler : function(event) {
            if(!this._shouldPropagate(event)){
                return;
            }

            this.$element.css('cursor', 'pointer');
            var me = this;
            this._setTouchesCount(event);
            var params = this._calculateParams(event);
            var pageXAndPageY = this._getPageXAndPageY(event);
            me.startX = me.pageX = pageXAndPageY.x;
            me.startY = me.pageY = pageXAndPageY.y;
            me.touchStartTime = (new Date()).getTime();
            this.mouseDown = true;

            if(typeof me.options.touchStart == 'function'){
                me.options.touchStart.call(this, event, params);
            }
        },

        _touchMoveEventHandler : function(event){
            if(!this._shouldPropagate(event)){
                return;
            }

            if(this.mouseDown){
                var me = this;
                this._setTouchesCount(event);

                var params = this._calculateParams(event);
                var isSwipe = this.swiping = me.touchesCount == 1;
                var pageXAndPageY = this._getPageXAndPageY(event);
                var isStationaryTouch = me.pageX == pageXAndPageY.x && me.pageY == pageXAndPageY.y;
                me.pageX = pageXAndPageY.x;
                me.pageY = pageXAndPageY.y;

                if(!isStationaryTouch){   // Windows tablet keeps firing mousemove with touch eventhough we are not moving our finger
                    this.swipeTime = (new Date()).getTime();

                    /* On Android touchEnd and mouseup are never fired if we don't call event.preventDefault with the touchmove-event.
                    *  But if we call event.preventDefault, page-scrolling is disabled. This can be an undesirable side-effect for scripts using this script and working with scroll
                    *  So we only event.preventDefault if we really have to, being the case when options.swipeEnd, options.vSwipeEnd, options.hSwipeEnd are declared
                    */
                    var preventDefault = typeof me.options.swipeEnd == 'function' ||
                        params.vSwipe && me.options.vSwipeEnd != null ||
                        params.hSwipe && me.options.hSwipeEnd != null;

                    if(preventDefault){
                        event.preventDefault();
                    }

                    if(isSwipe){  // single finger
                        var isMouseEvent = this._isMouseEvent(event);

                        if((isMouseEvent && this.options.includeMouseSwipe && this.mouseDown) || !isMouseEvent){
                            if(typeof me.options.vSwipe == 'function' && params.vSwipe){
                                me.options.vSwipe.call(this, event, params);
                            }

                            if(typeof me.options.hSwipe == 'function' && params.hSwipe){
                                me.options.hSwipe.call(this, event, params);
                            }

                            if(typeof me.options.swipe == 'function'){
                                me.options.swipe.call(this, event, params);
                            }
                        }
                    }else{ // multiple fingers == gesture
                        this._touchEndHandler(event);
                    }
                }
            }
        },

        _touchEndEventHandler : function(event){
            this._touchEndHandler(event);
        },

        _touchEndHandler : function(event){
            if(!this._shouldPropagate(event) || !this.mouseDown){
                return;
            }

            this.$element.css('cursor', 'default');
            var me = this;
            this._setTouchesCount(event);
            var params = this._calculateParams(event, true);

            var now = (new Date()).getTime();
            var isEndOfSwipe = (params.deltaXTotal != 0 || params.deltaYTotal != 0);
            var isMouseEvent = this._isMouseEvent(event);
            this._resetTouchValues();

            if(isEndOfSwipe){   // dispatch event if this is the end of a swipe
                 if((isMouseEvent && this.options.includeMouseSwipe && this.mouseDown) || !isMouseEvent){
                    if(typeof me.options.swipeEnd == 'function'){
                        me.options.swipeEnd.call(this, event, params);
                    }

                    if(typeof me.options.vSwipeEnd == 'function' && params.vSwipe){
                        me.options.vSwipeEnd.call(this, event, params);
                    }

                    if(typeof me.options.hSwipeEnd == 'function' && params.hSwipe){
                        me.options.hSwipeEnd.call(this, event, params);
                    }
                }
            }

            // always dispatch the end of a touch
            if(typeof this.options.touchEnd == 'function'){
                if((isMouseEvent && this.options.includeMouseSwipe && this.mouseDown) || !isMouseEvent){
                    params.isEndOfSwipe = isEndOfSwipe;
                    this.options.touchEnd.call(this, event, params);
                }
            }

            this.mouseDown = false;
        },

        _calculateParams : function(event){
            var pageXAndPageY = this._getPageXAndPageY(event);
            var params = {};
            var isTouchEndEvent = /(touchend|mspointerup|mouseup)/.test(event.type.toLowerCase());

            if(isTouchEndEvent){    // pageX and pageY are always 0 cause of no touches
                pageXAndPageY.x = this.pageX;
                pageXAndPageY.y = this.pageY;
            }

            params.deltaX = Math.round((pageXAndPageY.x - this.pageX) * 100) / 100;
            params.deltaY = Math.round((pageXAndPageY.y - this.pageY) * 100) / 100;

            params.deltaXTotal = Math.round((pageXAndPageY.x - this.startX) * 100) / 100;
            params.deltaYTotal = Math.round((pageXAndPageY.y - this.startY) * 100) / 100;

            params.swipeTime = (new Date()).getTime() - this.touchStartTime;
            var deltaY = params.deltaY != 0 ? params.deltaY : params.deltaYTotal;
            var deltaX = params.deltaX != 0 ? params.deltaX : params.deltaXTotal;
            params.swipeSpeedX = deltaX != 0 ? Math.abs(deltaX) / params.swipeTime : 0;
            params.swipeSpeedY = deltaY != 0 ? Math.abs(deltaY) / params.swipeTime : 0;
            params.x = pageXAndPageY.x;
            params.y = pageXAndPageY.y;
            params.touchesCount = this.touchesCount;
            params.originalEvent = event;
            params.vSwipe = deltaY != 0 && Math.abs(deltaY) >= Math.abs(deltaX);
            params.hSwipe = deltaX != 0 && Math.abs(deltaX) >= Math.abs(deltaY);

            if(deltaY != 0 || deltaX != 0){
                if(Math.abs(deltaY) > Math.abs(deltaX)){
                    params.direction = deltaY < 0 ? 'UP' : 'DOWN';
                }else{
                    params.direction = deltaX < 0 ? 'LEFT' : 'RIGHT';
                }
            }

            return params;
        },

        _setIsMouseDown : function(mouseDown){
            this.mouseDown = mouseDown;
        },

        _setTouchesCount : function(event){;
            var me = this;
            me.touchesCount = 1;

            if (window.navigator.msPointerEnabled){
                if(/pointer/.test(event.type.toLowerCase())){
                    if(typeof event.originalEvent.getPointerList == 'function'){
                        var currentPointers = event.originalEvent.getPointerList();
                        me.touchesCount = currentPointers.length;
                    }
                }
            }else{
                me.touchesCount = me._isMouseEvent(event) ? 1 : event.originalEvent.touches.length;
            }
        },

        _getTouchPointFromEvent : function(event){
            return (event.originalEvent.touches != undefined && event.originalEvent.touches.length > 0) ? event.originalEvent.touches[0] : event;
        },

        _getPageXAndPageY : function(event){
            var vector = {};

            if(event.originalEvent.touches != undefined && event.originalEvent.touches.length > 0){
                event = event.originalEvent.touches[0];
            }else{
                event = event.clientX != undefined ? event : event.originalEvent;
            }

            vector.x = event.clientX;
            vector.y = event.clientY;

            return vector;
        },

        _resetTouchValues : function(){
            this.touchesCount = 0;
            this.startX = 0;
            this.startY = 0;
            this.pageX = 0;
            this.pageY = 0;
            this.touchStartTime = 0;
            this.swipeDirection = null;
            this.swiping = false;
        },

        _isMouseEvent : function(event){
            return /mouse/.test(event.type.toLowerCase()) || this._isMsPointerEvent(event);
        },

        _isMsPointerEvent : function(event){
            return /pointer/.test(event.type.toLowerCase());
        },

        _isTouchEvent : function(event){
            return /touch/.test(event.type.toLowerCase());
        },

        _shouldPropagate: function(event){
            var me = this;
            var selectors = this.options.excludedCssSelectors;
            var element = event.originalEvent.target;
            var selectorString = me.options.excludedCssSelectors.join(',');//console.info($(selectorString).find(element).length);

            return $(selectorString).find($(element)).length == 0;
        }
    });

    $.fn.swipeplus = function(){
        var args = arguments;

        if(typeof $(this[0]).data('plugin_swipeplus') == 'object'){
            if(typeof args[0] == 'string'){
                return $(this).data('plugin_swipeplus').getSet(args);
            }
        }else{
            if(args.length == 0 || typeof args[0] == 'object'){
                var opts = typeof args[0] == 'object' ? args[0] : {};

                return this.each(function(){
                    var swipeController = new SwipeController(this, 'swipeplus', opts);
                    swipeController.init();
                    $(this).data('plugin_swipeplus', swipeController);
                });
            }
        }
    };
})(jQuery, window, void 0);

var ObservableAbstract;

(function($, window, undefined){
    "use strict";

    window.ObservableAbstract = klass(function(){
        this.observers = [];
    }).methods({
        registerObserver : function(observer){
            this.observers.push(observer);
        },

        unregisterObserver : function(observer){
            var index = this.observers.indexOf(observer);

            if(index > -1){
                this.observers.splice(index, 1);
            }
        },

        notifyObservers : function(response){
            response = response === undefined ? {} : response;

            for(var x in this.observers){
                var observer = this.observers[x];

                if(typeof observer.notify == 'function'){
                    observer.notify(this, response);
                }
            }
        }
    });
})(jQuery, window, void 0);


(function($, window, undefined){
    "use strict";

    $.fn.sortElements = function(sortFunction){
        var me = this;

        if($(me).length > 1){
            var $sorted = $(me).sort(sortFunction);

            $sorted.each(function(sortIndex){
                $(this).addClass('sortIndex-' + sortIndex);
            });

            for(var i = 0;i < $sorted.length ; i++){
                var $element = $(this).parent().find('.sortIndex-' + i);
                $element.removeClass('.sortIndex-' + i);
                (i == 0) ?  $element.prependTo($sorted.parent()) : $element.insertAfter($(this).parent().children().eq(i-1));
            }
        }

       return this;
    }
})(jQuery, window, void 0);

/**
*  @name ResponsiveViewControllerAbstract
*  @class An abstract base class for creating controllers for responsive views enhanced with Javascript.  Makes it easier to run view-dependant logic when switching between views.
*  @author <a href="justin@dynamit.nl">Justin van Schaick</a>
*  @copyright Dynamit B.V. The Hague,  The Netherlands 2013
*  @version 2.0 17-05-2013
*  version history
*  1.0
*  - initial version
*  2.0
*  - Changed names of #_mobileViewActivateEventHandler, #_tabletViewActivateEventHandler and #_screenViewActivateEventHandler to #_mobileViewEnterEventHandler, etc.
*  - Added 3 methods for viewstate-leave : #_mobileViewLeaveEventHandler, #_tabletViewLeaveEventHandler and #__screenViewLeaveEventHandler
*  - Made this class an Observable
*/
var ResponsiveViewControllerAbstract;

(function($, window){
    "use strict";

    var VIEW_STATES = {
        MOBILE : 'mobile',
        TABLET : 'tablet',
        SCREEN : 'screen'
    };

    window.ResponsiveViewControllerAbstract = ObservableAbstract.extend(function ResponsiveViewControllerAbstract(){
        this.UI = {
            $viewStateIndicatorElements : []
        };
        this.viewState = null;
        this.mobileViewRendered = false;
        this.tabletViewRendered = false;
        this.screenViewRendered = false;
    }).methods({

        init : function(){
            var me = this;
            me._addViewStateIndicators();
            me._setViewState();

            $(window).resize(function(e){
                me._windowResizeEventHandler(e);
            });
        },

        _addViewStateIndicators : function(){
            var me = this;

            if(me.UI.$viewStateIndicatorElements.length == 0){
                 var indictorSelectors = ['mobile', 'tablet', 'screen'];

                for(var i = 0; i < indictorSelectors.length; i++){
                    var fullSelector = 'view-state-indicator-' + indictorSelectors[i];

                    if($('#' + fullSelector).length == 0){
                        $("<div class='view-state-indicator' id='" + fullSelector + "' data-view-state='" + indictorSelectors[i] + "'></div>").prependTo(document.body);
                    }
                }

                me.UI.$viewStateIndicatorElements = $('.view-state-indicator');
            }
        },

        /**
        * Called when the window is resized
        * @function
        * @private
        * @name ResponsiveViewControllerAbstract#_windowResizeEventHandler
        */
        _windowResizeEventHandler : function(e){
            this._setViewState();
        },

        /**
        * Sets the current viewstate for the page based on the activated media-query.
        * Calls an eventhandler for the corresponding view if a view-state change is registered.
        * Calls an eventhandler for the corresponding view if this is the first time the view is rendered.
        * @function
        * @private
        * @name ResponsiveViewControllerAbstract#_setViewState
        */
        _setViewState : function(){
            var me = this;
            var $visibleViewStateIndicatorElement = this.UI.$viewStateIndicatorElements.filter(function(){return $(this).css('display') != 'none';});

            if($visibleViewStateIndicatorElement.length > 0){
                if($visibleViewStateIndicatorElement.length > 1){
                    throw 'Multiple indicator-elements visible, viewstate can not be determined.  Please adjust your stylesheet';
                }

                var currentViewState = this.viewState;
                var dataSet = $visibleViewStateIndicatorElement.dataSet()[0];
                this.viewState = dataSet.viewState;
                var isViewStateRendered;
                var currentViewStateRendered = false;
                var isViewStateChanged = this.viewState != currentViewState;

                switch(this.viewState){
                    case VIEW_STATES.MOBILE:
                        currentViewStateRendered = me.mobileViewRendered;
                        me.mobileViewRendered = true;
                        break;
                    case VIEW_STATES.TABLET:
                        currentViewStateRendered = me.tabletViewRendered;
                        me.tabletViewRendered = true;
                         break;
                    default:
                        currentViewStateRendered = me.screenViewRendered;
                        me.screenViewRendered = true;
                }

                isViewStateRendered = !currentViewStateRendered;

                if(currentViewState != this.viewState && currentViewState != null){
                    switch(currentViewState){
                        case VIEW_STATES.MOBILE:
                        me._mobileViewLeaveEventHandler();
                    break;

                    case VIEW_STATES.TABLET:
                        me._tabletViewLeaveEventHandler();
                    break;

                    default:
                        me._screenViewLeaveEventHandler();
                    }
                }

                if(isViewStateChanged){
                    this.notifyObservers({previousViewState : currentViewState, currentViewState : this.viewState, isViewStateRendered : isViewStateRendered});
                    me._viewStateChangeEventHandler(currentViewState, this.viewState, isViewStateRendered);
                }

                switch(this.viewState){
                    case VIEW_STATES.MOBILE:
                        if(isViewStateRendered){
                            me._mobileViewRenderEventHandler();
                        }

                        if(isViewStateChanged){
                            me._mobileViewEnterEventHandler(isViewStateRendered);
                        }
                    break;

                    case VIEW_STATES.TABLET:
                        if(isViewStateRendered){
                            me._tabletViewRenderEventHandler();
                        }

                        if(isViewStateChanged){
                            me._tabletViewEnterEventHandler(isViewStateRendered);
                        }
                    break;

                    default:
                        if(isViewStateRendered){
                            me._screenViewRenderEventHandler();
                        }

                        if(isViewStateChanged){
                            me._screenViewEnterEventHandler(isViewStateRendered);
                        }

                        break;
                }
            }
        },

        /**
        * Called when the view-state changes.  Can be hooked in to by subclasses.
        * @function
        * @protected
        * @name ResponsiveViewControllerAbstract#_viewStateChangeEventHandler
        */
        _viewStateChangeEventHandler : function(previousViewState, currentViewState, isViewStateRendered){
        },

        /**
        * Called when the view-state changes to mobile-view.  Can be hooked in to by subclasses.
        * @function
        * @protected
        * @name ResponsiveViewControllerAbstract#_mobileViewEnterEventHandler
        * @param {boolean} isViewStateRendered Whether viewstate is rendered
        */
        _mobileViewEnterEventHandler : function(isViewStateRendered){
        },

        /**
        * Called when the view-state changes from mobile-view.  Can be hooked in to by subclasses.
        * @function
        * @protected
        * @name ResponsiveViewControllerAbstract#_mobileViewLeaveEventHandler
        */
        _mobileViewLeaveEventHandler : function(){
        },

        /**
        * Called when the view-state changes to tablet-view.  Can be hooked in to by subclasses.
        * @function
        * @protected
        * @name ResponsiveViewControllerAbstract#_tabletViewEnterEventHandler
        * @param {boolean} isViewStateRendered Whether viewstate is rendered
        */
        _tabletViewEnterEventHandler : function(isViewStateRendered){
        },

        /**
        * Called when the view-state changes from tablet-view.  Can be hooked in to by subclasses.
        * @function
        * @protected
        * @name ResponsiveViewControllerAbstract#_tabletViewLeaveEventHandler
        */
        _tabletViewLeaveEventHandler : function(){
        },

        /**
        * Called when the view-state changes to screen-view.  Can be hooked in to by subclasses.
        * @function
        * @protected
        * @name ResponsiveViewControllerAbstract#_screenViewEnterEventHandler
        * @param {boolean} isViewStateRendered Whether viewstate is rendered
        */
        _screenViewEnterEventHandler : function(isViewStateRendered){
        },

        /**
        * Called when the view-state changes from screen-view.  Can be hooked in to by subclasses.
        * @function
        * @protected
        * @name ResponsiveViewControllerAbstract#_screenViewLeaveEventHandler
        */
        _screenViewLeaveEventHandler : function(){
        },

        /**
        * Called ONCE when the view-state changes to mobile-view for the first time.  Can be hooked in to by subclasses.
        * @function
        * @protected
        * @name ResponsiveViewControllerAbstract#_mobileViewRenderEventHandler
        */
        _mobileViewRenderEventHandler : function(){
        },

        /**
        * Called ONCE when the view-state changes to tablet-view for the first time.  Can be hooked in to by subclasses.
        * @function
        * @protected
        * @name ResponsiveViewControllerAbstract#_tabletViewRenderEventHandler
        */
        _tabletViewRenderEventHandler : function(){
        },

        /**
        * Called ONCE when the view-state changes to screen-view for the first time.  Can be hooked in to by subclasses.
        * @function
        * @protected
        * @name ResponsiveViewControllerAbstract#_screenViewRenderEventHandler
        */
        _screenViewRenderEventHandler : function(){
        },

        /**
        * Returns whether mobile view is active
        * @function
        * @public
        * @return {boolean}
        * @name ResponsiveViewControllerAbstract#isMobileView
        */
        isMobileView : function(){
            return this.viewState == VIEW_STATES.MOBILE;
        },

        /**
        * Returns whether tablet view is active
        * @function
        * @public
        * @return {boolean}
        * @name ResponsiveViewControllerAbstract#isTabletView
        */
        isTabletView : function(){
            return this.viewState == VIEW_STATES.TABLET;
        },

         /**
        * Returns whether screen view is active
        * @function
        * @public
        * @return {boolean}
        * @name ResponsiveViewControllerAbstract#isScreenView
        */
        isScreenView : function(){
            return this.viewState == VIEW_STATES.SCREEN;
        }
    });
})(jQuery, window);


var ViewStateObservable, ViewStateObservablePlugin;

(function($, window, undefined){
    "use strict";

    window.ViewStateObservable = ResponsiveViewControllerAbstract.extend(function(){
        this.init();
    }).methods({
        registerObserver : function(observer){
            this.supr(observer);
            observer.notify(this, {viewState : this.viewState});
        },

        _viewStateChangeEventHandler : function(){
            this.notifyObservers();
        }
    });

    window.ViewStateObservablePlugin = JQueryPluginAbstract.extend(function(){
        this.viewStateObservable = new ViewStateObservable();
    }).methods({
        registerObserver : function(observer){
            this.viewStateObservable.registerObserver(observer);
        },

        unregisterObserver : function(observer){
            this.viewStateObservable.unregisterObserver(observer);
        }
    });



    $.fn.viewStateObservable = function(){
        if($(this).length != 1 || !$(this)[0] instanceof window.constructor){
            throw 'Event jQuery#viewStateObservable can only be attached to window';
        }

        var args = arguments;

        if($(this[0]).data('plugin_viewstateobservable') === undefined){
            var opts = {};

            if(args.length == 0 || typeof args[0] == 'object'){
                opts = typeof args[0] == 'object' ? args[0] : opts;
            }

            var controller = new ViewStateObservablePlugin(this, 'viewstateobservable', opts);
            $(this[0]).data('plugin_viewstateobservable', controller);
        }

        if(typeof args[0] == 'string'){
            return $(this).data('plugin_viewstateobservable').getSet(args);
        }

        return this;
    };
})(jQuery, window, void 0);

(function($, window, undefined){
    "use strict";

    $.extend({
        browserUtils : function (){
            return {
                //  GET THE OS NAME
                isAndroid : function(){
                    var userAgentName = navigator.userAgent.toLowerCase();

                    return (/android/).test(userAgentName);
                },

                isMacOs : function(){
                    var appVersion = navigator.appVersion.toLowerCase();

                    return (/mac|macos/).test(appVersion);
                },

                //  GET THE BROWSER NAME
                isIE : function(){
                    return (/(IE|Internet Explorer|Microsoft|MS)/i).test(navigator.appName);
                },

                isFireFox : function(){
                    return (/(Firefox|Netscape)/i).test(navigator.userAgent);
                },

                isChrome : function(){
                    return (/Chrome/i).test(navigator.userAgent);
                },

                isOpera : function(){
                    return (/Opera/i).test(navigator.appName);
                },

                isSafari : function(){    // no unique identifier for Safari so detect by seeing of it's not a browser other than Safari
                    return !this.isIE() && !this.isFireFox() && !this.isChrome() && !this.isOpera();
                },

                isWindowsPhone : function(){
                    return (/windows phone/i).test(navigator.userAgent);
                },

                browserVersionNumber : function(){
                    var matches = [];

                    if(this.isIE()){
                        matches = navigator.userAgent.match(/MSIE ([0-9]+(\.[0-9]+)?)/);
                    }

                    if(this.isFireFox()){
                        matches = navigator.userAgent.match(/Firefox\/([0-9]+(\.[0-9]+)?)/);
                    }

                    if(this.isChrome()){
                        matches = navigator.userAgent.match(/Chrome\/([0-9]+(\.[0-9]+)?)/);
                    }

                    if(this.isOpera()){
                        matches = navigator.userAgent.match(/Opera\/([0-9]+(\.[0-9]+)?)/);
                    }

                    if(this.isSafari()){
                        matches = navigator.userAgent.match(/Safari\/([0-9]+(\.[0-9]+)?)/);
                    }

                    return matches != null && matches.length > 1 ? parseFloat(matches[1]) : 0;
                },

                isMobile : function (){
                    return ((/(iPhone|iPod|BlackBerry|Windows Phone|IEMobile|ZuneWP7)/i).test(navigator.userAgent) || ((/(Android)/i).test(navigator.userAgent) && (/(Mobile)/i).test(navigator.userAgent) && (/(Nexus)/i).test(navigator.userAgent)));
                },

                isTablet : function(){
                    return (!this.isMobile() && (/(iPad|Android)/i).test(navigator.userAgent));
                },

                isDesktop : function(){
                  return (!this.isMobile() && !this.isTablet());
                },

                /**
                * Sets a cookie.
                * @function
                * @public
                * @name $.browsersUtils#setCookie
                * @param {string} cookieName The name of the cookie
                * @param {string} value The value of the cookie
                * @param {int} expirationDays The number of days from now on which the cookie should expire
                * @param {string} path The path for which the cookie should be saved
                * @param {string} domain The domain for which the cookie is valid
                * @param {string} secure TWether to create a secure cookie or not
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                setCookie : function (cookieName, value, expirationDays, path, domain, secure){
                    this.deleteCookie(cookieName);
                    var expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + expirationDays);
                    var correctedValue = escape(value) + ((expirationDays == null) ? "" : "; expires="+expirationDate.toUTCString());
                    var cookie = cookieName + "=" + correctedValue;
                    cookie += path != undefined ? ';path=' + path : '';
                    cookie += domain != undefined ? ';domain=' + domain : '';
                    cookie += secure != undefined ? ';secure' : '';
                    document.cookie = cookie;

                    if(!this.cookieExists(cookieName)){
                        throw 'Could not create cookie\'' + cookieName + '\'';
                    }
                },

                /**
                * Sets a cookie.  Throws an exception of the cookie can't be set.
                * @function
                * @public
                * @name $.browsersUtils#setCookie
                * @param {string} cookieName The name of the cookie
                * @param {string} value The value of the cookie
                * @param {int} expirationDays The number of days from now on which the cookie should expire
                * @param {string} path The path for which the cookie should be saved
                * @param {string} domain The domain for which the cookie is valid
                * @param {string} secure Wether to create a secure cookie or not
                * @throws Exception
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                deleteCookie : function(/* string */cookieName, path, domain){
                    if(this.cookieExists(cookieName)){
                        var cookie_date = new Date ( );  // current date & time
                        cookie_date.setTime ( cookie_date.getTime() - 1 );
                        var cookie = cookieName += "=; expires=" + cookie_date.toGMTString();
                        cookie += domain != undefined ? ';domain=' + domain : '';
                        cookie += path != undefined ? ';path=' + path : '';
                        document.cookie = cookie;
                    }
                },

                /**
                * Gets a cookie. Throws an exception if the cookie doesn't exist.
                * @function
                * @public
                * @name $.browsersUtils#getCookie
                * @param {string} cookieName The name of the cookie
                * @return {string) The value of the cookie
                * @throws Exception
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                getCookie : function (/* string */ cookieName){
                    var i,x,y,ARRcookies = document.cookie.split(";");

                    for (i=0;i<ARRcookies.length;i++){
                        x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
                        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
                        x = x.replace(/^\s+|\s+$/g,"");

                        if (x == cookieName){
                            return unescape(y);
                        }
                    }

                    throw("no such cookie exception");
                },

                /**
                * Checks if a cookie exists.
                * @function
                * @public
                * @name $.browsersUtils#cookieExists
                * @param {string} cookieName The name of the cookie
                * @return {boolean)
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                cookieExists : function(/* string */ cookieName){
                    try{
                        this.getCookie(cookieName);

                        return true;
                    }catch(e){
                        return false;
                    }
                },

                /**
                * Gets all cookies set for the current page and returns an array of objects.
                * @function
                * @public
                * @name $.browsersUtils#getCookies
                * @return {Array<Object>)
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                getCookies : function(){
                    var cookies = [];
                    var i,x,y,ARRcookies = document.cookie.split(";");

                    for (i=0;i<ARRcookies.length;i++){
                        x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
                        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
                        x = x.replace(/^\s+|\s+$/g,"");

                        cookies.push({key : x, value : unescape(y)});
                    }

                    return cookies;
                }
            }
        }
    });
})(jQuery, window, void 0);



/**
**************** IE **************
*   Browser CodeName: Mozilla
    Browser Name: Microsoft Internet Explorer
    Browser Version: 4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)
    Platform: Win32
    User-agent header: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)

*
*************** FIREFOX **************
*   Browser CodeName: Mozilla
    Browser Name: Netscape
    Browser Version: 5.0 (Windows)
    Platform: Win32
    User-agent header: Mozilla/5.0 (Windows NT 5.1; rv:9.0.1) Gecko/20100101 Firefox/9.0.1

*************** CHROME **************
*   Browser CodeName: Mozilla
    Browser Name: Netscape
    Browser Version: 5.0 (Windows NT 5.1) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7
    Platform: Win32
    User-agent header: Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7

*************** OPERA **************
*   Browser CodeName: Mozilla
    Browser Name: Opera
    Browser Version: 9.80 (Windows NT 5.1; U; nl)
    Platform: Win32
    User-agent header: Opera/9.80 (Windows NT 5.1; U; nl) Presto/2.9.168 Version/11.52
*
************** SAFARI **************
*   Browser CodeName: Mozilla
    Browser Name: Netscape
    Browser Version: 5.0 (Windows NT 5.1) AppleWebKit/534.52.7 (KHTML, like Gecko) Version/5.1.2 Safari/534.52.7
    Platform: Win32
    User-agent header: Mozilla/5.0 (Windows NT 5.1) AppleWebKit/534.52.7 (KHTML, like Gecko) Version/5.1.2 Safari/534.52.7



* */
(function($, window, undefined){
    $.extend({
            /**
            *  @name mathUtils
            *  @class A Math-utils object for performing some mathematical operations.
            */
            dateUtils : function(){
                return {
                    getCurrentDateAsString : function(){
                        var date = new Date();

                        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
                    },
                    getYear : function(){
                        return new Date().getFullYear()
                    },
                    getMonth : function(){
                        return new Date().getMonth() + 1;
                    },
                    getDays : function(){
                        return new Date().getDate()
                    },
                    dateLiesInFuture : function(dateString /* yyyy-mm-dd */){
                        var d = new Date();
                        var today = new Date();
                        var dateToCompare = this.dateStringToDateObject(dateString);

                        return today.getTime() < dateToCompare.getTime();
                    },
                    haveChronologicalOrder : function(date1, date2){
                        return this.getDateDifferenceInSeconds(date1, date2) >= 0;
                    },
                    getDateDifferenceInSeconds : function(date1, date2){
                        return this.dateStringToSeconds(date2) - this.dateStringToSeconds(date1);
                    },
                    parseYearFromDateString : function(dateStr){
                        dateStr = this.formatDateString(dateStr);

                        return dateStr.split("-")[0];
                    },
                    parseMonthsFromDateString : function(dateStr){
                        dateStr = this.formatDateString(dateStr);

                        return this.removeLeadingZeros(dateStr.split("-")[1]);
                    },
                    parseDaysFromDateString : function(dateStr){
                        dateStr = this.removeLeadingZeros(this.formatDateString(dateStr));

                        return dateStr.split("-")[2];
                    },
                    dateStringToDateObject : function(dateString){
                        var date = new Date(parseInt(this.parseYearFromDateString(dateString)), parseInt(this.parseMonthsFromDateString(dateString)), parseInt(this.parseDaysFromDateString(dateString)));

                        return date;
                    },
                    dateStringToSeconds : function(dateStr){
                        var date = this.dateStringToDateObject(dateStr);//alert(new Date().getTime(obj.y, obj.m, obj.d));

                        return date.getTime();
                    },
                    isValidDateString : function(dateStr){
                        var patt1 = /^[0-9]{4}([\-\/]{1}[0-9]{2}){2}$/;
                        var patt2 = /^([0-9]{2}[\-\/]{1}){2}[0-9]{4}$/;

                        return patt1.test(dateStr) || patt2.test(dateStr);
                    },
                    formatDateString : function(dateString){
                        var startsWithYear = (/^[0-9]{4}[\-\/]{1}/).test(dateString);
                        dateString = this.addLeadingZeros(dateString);

                        while((/[\-\/]/).test(dateString)){
                            dateString = dateString.replace(/[\-\/]/, "");
                        }

                        if((/^[0-9]{8}$/).test(dateString)){
                            if(!startsWithYear){
                                dateString = dateString.substr(4) + dateString.substr(2,2) + dateString.substr(0,2);
                            }

                            return dateString.substr(0, 4) + "-" + dateString.substr(4, 2) + "-" + dateString.substr(6, 2);
                        }

                        throw("invalid date supplied");

                    },

                    addLeadingZeros : function(dateString){
                        var separator = (/[\-]/).test(dateString) ? "-" : "/";
                        var stack = dateString.split(separator) ;

                        for(var i=0;i<stack.length;i++){
                            stack[i] = stack[i].length == 1 ? "0" + stack[i] : stack[i];
                        }

                        return stack.join(separator);
                    },

                    removeLeadingZeros : function(numb){
                        if(numb.indexOf("0") == 0){
                            return numb.substr(1);
                        }

                        return numb;
                    },

                    valDate : function(dateStr, US_format){
                        dateStr = this.formatDateString(dateStr);

                        var excesDays = false;
                        var valid = false;
                        var years = null;
                        var month = null
                        var days = null;

                        if(this.isValidDateString(dateStr)){
                            var stack = dateStr.split("-");
                            years = stack[0];
                            days = this.removeLeadingZeros (US_format ? stack[1] : stack[2]);
                            month = this.removeLeadingZeros (US_format ? stack[2] : stack[1]);

                            var daysValid = (days < 32 && days > 0 );
                            var monthsValid = (month < 13  && month > 0);
                            valid = (daysValid && monthsValid);

                            if(valid){
                                excesDays = ( (days  == 31 && (month == 2 || month == 4 || month == 6 || month == 11)) || ( month == 2 &&  days > 29) );    //  this month doesn't have that many days
                                excesDays = ( (days == 29 && month == 2) && !( years % 400 == 0 || ( years % 400 > 0 && years % 4 == 0)) );                 //  leap-year, 28 days only

                                valid = excesDays ? false : true;
                            }
                        }

                        return {valid : valid, excesDays : excesDays, months : month, days : days, years : years};
                    },

                    getDaysInMonth : function(date){
                        var month = date.getMonth();
                        var year = date.getFullYear();
                        var nextMonth = month == 11 ? 0 : month + 1;
                        var nextYear = month == 11 ? year + 1 : year;
                        var startOfNextMonth = new Date(nextYear, nextMonth, 1);
                        var dateForLastDayOfGivenMonth = new Date(startOfNextMonth.getTime() - (1000 * 60 * 3));

                        return (new Date(dateForLastDayOfGivenMonth)).getDate();
//
//                        var daysInMonth = (month == 4 || month == 6 || month == 11) ? 30 : 31;
//
//                        if(month == 2){
//                            daysInMonth = ( year % 400 == 0 || ( year % 400 > 0 && year % 4 == 0)) ? 28 : 29;
//                        }
//
//                        return daysInMonth;
                    },

                    getMillisecondsInAYear : function(){
                        return 60 * 60 * 1000 * 24 * 365;
                    },

                    /**
                    * Returns the names of the months for a given language, optionally truncated
                    * @function
                    * @public
                    * @name $.dateUtils#getMonthNamesForLanguage
                    * @param {string} languageCode The languageCode (2 characters)
                    * @param {string} truncateLength The length to which to truncate the names (optional)
                    * @return {Array<string>} The monthnames
                    * @throws {NotSupported} If the language is not supported
                    * @author Justin van Schaick <justin@dynamit.nl>
                    */
                    getMonthNamesForLanguage : function(languageCode, truncateLength){
                        languageCode = languageCode.toLowerCase();
                        var monthNames = [];

                        switch(languageCode){
                            case 'nl' :
                                monthNames = ['januari', 'februari', 'maart' , 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
                                break;
                            case 'en' :
                                monthNames = ['January', 'February', 'March' , 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                                break;
                        }

                        if(monthNames.length > 0){
                            var truncate = (typeof truncateLength == 'number');
                            monthNames = truncate ? this._truncateWeekOrMonthNames(monthNames, truncateLength) : monthNames;

                            if(truncate){
                                if(truncateLength == 3 && languageCode == 'nl'){
                                    monthNames[2] = 'mrt';
                                }
                            }

                            return monthNames;
                        }

                        throw 'NotSupported';
                    },

                    /**
                    * Returns the names of the weekdays for a given language, optionally truncated
                    * @function
                    * @public
                    * @name $.dateUtils#getDayNamesForLanguage
                    * @param {string} countryCode The languageCode (2 characters)
                    * @param {string} truncateLength The length to which to truncate the names (optional)
                    * @return {Array<string>} The daynames
                    * @throws {NotSupported} If the language is not supported
                    * @author Justin van Schaick <justin@dynamit.nl>
                    */
                    getDayNamesForLanguage : function(languageCode, truncateLength){
                        languageCode = languageCode.toLowerCase();
                        var dayNames = [];

                        switch(languageCode){
                            case 'nl' :
                                dayNames = ['maandag', 'dinsdag', 'woensdag' , 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];
                                break;
                            case 'en' :
                                dayNames = ['monday', 'tuesday', 'wednesday' , 'thursday', 'friday', 'saturday', 'sunday'];
                                break;
                        }

                        if(dayNames.length > 0){
                            dayNames = (typeof truncateLength == 'number') ? this._truncateWeekOrMonthNames(dayNames, truncateLength) : dayNames;

                            return dayNames;
                        }

                        throw 'NotSupported';
                    },

                    /**
                    * Truncates the month- or daynames for <code>getMonthNamesForLanguage</code> and <code>getDayNamesForLanguage</code>
                    * @function
                    * @private
                    * @name $.dateUtils#_truncateWeekOrMonthNames
                    * @param {Array<string>} names The names
                    * @param {string} truncateLength The length to which to truncate the names
                    * @return {Array<string>} The truncated names
                    * @author Justin van Schaick <justin@dynamit.nl>
                    */
                    _truncateWeekOrMonthNames : function(names, truncateLength){
                        for(var i = 0; i < names.length ;i++){
                            names[i] = names[i].substring(0, truncateLength);
                        }

                        return names;
                    },

                    /**
                    * Returns a Date-object for the day after <code>date</code>
                    * @function
                    * @public
                    * @name $.dateUtils#nextDay
                    * @param {Date} date The date for which to return the next day
                    * @return {Date}
                    * @author Justin van Schaick <justin@dynamit.nl>
                    */
                    nextDay : function(date){
                        var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                        var time = (newDate.getTime() + (24 * 60 * 60 * 1000));
                        newDate.setTime(time);

                        return newDate;
                    },

                    /**
                    * Returns a Date-object for the day before <code>date</code>
                    * @function
                    * @public
                    * @name $.dateUtils#prevDay
                    * @param {Date} date The date for which to return the previous day
                    * @return {Date}
                    * @author Justin van Schaick <justin@dynamit.nl>
                    */
                    prevDay : function(date){
                        var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                        var time = (newDate.getTime() - (24 * 60 * 60 * 1000));
                        newDate.setTime(time);

                        return newDate;
                    }
            };
        }
    });
})(jQuery, window, void 0);
(function($, window, undefined){
    "use strict";

    $.extend({
        /**
        *  @name mathUtils
        *  @class A Math-utils object for performing some mathematical operations.
        */
        mathUtils : function(){
            return {
                radeg :  Math.PI / 180,

                /**
                * Returns the sinus of <code>angle</code>for an angle expressed in degrees
                * @function
                * @public
                * @name $.mathUtils#sind
                * @param {float} angle The angle on which to return the sinus
                * @return {float} The sinus
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                sind : function(angle){
                    return Math.sin(angle / this.radeg);
                },

                /**
                * Returns the cosinus of <code>angle</code>for an angle expressed in degrees
                * @function
                * @public
                * @name $.mathUtils#cosd
                * @param {float} angle The angle on which to return the cosinus
                * @return {float} The cosinus
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                cosd : function(angle){
                    return Math.cos(angle / this.radeg);
                },

                /**
                * Returns the tangent of <code>angle</code>for an angle expressed in degrees
                * @function
                * @public
                * @name $.mathUtils#tand
                * @param {float} angle The angle on which to return the tangent
                * @return {float} The tangent
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                tand : function(angle){
                    return Math.tan(angle / this.radeg);
                },

                /**
                * Returns the inverse sinus of <code>angle</code>for an angle expressed in degrees
                * @function
                * @public
                * @name $.mathUtils#asind
                * @param {float} angle The angle on which to return the inverse sinus
                * @return {float} The inverse sinus
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                asind : function(angle){
                    return this.radeg * Math.atan(angle / Math.sqrt(1 - angle * angle));
                },

                /**
                * Returns the inverse cosinus of <code>angle</code>for an angle expressed in degrees
                * @function
                * @public
                * @name $.mathUtils#acosd
                * @param {float} angle The angle on which to return the inverse cosinus
                * @return {float} The inverse cosinus
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                acosd : function(angle){
                    return 90 - this.asind(angle);
                },

                /**
                * Returns the inverse tangent of <code>angle</code>for an angle expressed in degrees
                * @function
                * @public
                * @name $.mathUtils#atand
                * @param {float} angle The angle on which to return the inverse tangent
                * @return {float} The inverse tangent
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                atand : function(angle){
                    return this.radeg * Math.atan(angle)
                },

                // can't remember what this does
                atan2d : function(y, x){
                    return this.radeg * Math.atan(y / x) - 180 * (x | 0);
                },

                /**
                * Returns a vector on the edge of a circle given it's radius, the angle from the center and the center-vector of the circle
                * @function
                * @public
                * @name $.mathUtils#getPointOnCircleByAngle
                * @param {float} radius The radius of the circle
                * @param {float} angleInDegrees The angle at which you want to get the position, a float between 0 and 360
                * @param {Vector} center The center of the circle.
                * @return {Vector} The point (vector on the circle)
                * @example $.mathUtils.getPointOnCircleByAngle(75, 180, {x : 100, y: 60});
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                getPointOnCircleByAngle : function (radius, angleInDegrees, center){
                    var cos = Math.cos(angleInDegrees * Math.PI / 180);
                    var r = radius * cos;
                    var x = Math.round(center.x + r);
                    var sin = Math.sin(angleInDegrees * Math.PI / 180);
                    var s = radius * sin;
                    var y = Math.round(center.y + s);

                    return {x : x, y : y};

                },

                /**
                * Returns a number in the range between <code>min</code> and <code>max</code> by adding <code>change</code> to <code>currentValue</code>.  Any value beyond the range <code>min</code> - <code>max</code>
                * is subtracted and added/substracted from the range.  Very convenient with arrays.
                * @function
                * @public
                * @name $.mathUtils#getNormalizedValue
                * @param {int} currentValue The current value to change
                * @param {int} change The negative or positive number to add/substract. Should never be greater than max-1 or smaller than 0-max-1;
                * @param {int} min The start of the range.
                * @param {int} max The end of the range.
                * @return {int}
                * @example $.mathUtils.getNormalizedValue(6, 5, -5, 10); (returns : -5 )
                * @author Justin van Schaick <justin@dynamit.nl>
                */
               getNormalizedValue : function(currentValue, change, min, max){
                    currentValue += change;
                    currentValue = (currentValue < min) ? max - (min - currentValue) + 1 : currentValue;
                    currentValue = (currentValue > max) ? min + (currentValue - max) - 1 : currentValue;

                    return currentValue;

                },

                /**
                * Returns the length of the hypothenuse (longest side of a triangle)
                * @function
                * @public
                * @name $.mathUtils#getHypothenuseLength
                * @param {float} radius The length of one of the first of the shortest sides of the triangle
                * @param {float} radius The length of one of the second of the shortest sides of the triangle
                * @return {float} The length of the hypothenuse
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                getHypothenuseLength : function(length1, length2){
                    return Math.sqrt(Math.pow(length1, 2)  + Math.pow(length2, 2));
                },

                /**
                * Returns a random number between <code>min</code> and <code>max</code>
                * @function
                * @public
                * @name $.mathUtils#randomNumber
                * @param {int} min The minimum number to return
                * @param {int} max The maximum number to return
                * @return {int} A random number
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                randomNumber : function(min, max){
                    min = !isNaN(min) ? min : 0;
                    var randomNumber = Math.floor(Math.random() * (max - min)) + min;

                    return randomNumber;
                },

                /**
                * Recalculates <code>height</code> given the width, height and new width
                * @function
                * @public
                * @name $.mathUtils#scaleHeightForWidth
                * @param {float} width The current width
                * @param {float} height The current height
                * @param {float} newWidth The new width to which to scale <code>height</code>
                * @return {float} The new height
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                scaleHeightForWidth : function (width, height, newWidth){
                    var widthHeightRatio = width / height;
                    var newHeight = newWidth / widthHeightRatio;

                    return newHeight;
                },

                /**
                * Recalculates <code>width</code> given the width, height and new height
                * @function
                * @public
                * @name $.mathUtils#scaleWidthForHeight
                * @param {float} width The current width
                * @param {float} height The current height
                * @param {float} newHeight The new height to which to scale <code>width</code>
                * @return {float} The new width
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                scaleWidthForHeight : function(width, height, newHeight){
                    var widthHeightRatio = width / height;
                    var newWidth = newHeight * widthHeightRatio;

                    return newWidth;
                },

                /**
                * Recalculates the width and height of a rectange given a maximum width and height while preserving aspectratio.
                * @function
                * @public
                * @name $.mathUtils#scaleRectangleToSize
                * @param {float} width The current width
                * @param {float} height The current height
                * @param {float} maxWidth The maximum width
                * @param {float} maxHeight The maximum height
                * @return {Vector} The new width and height
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                scaleRectangleToSize : function(width, height, maxWidth, maxHeight){
                    var widthHeightRatio = height > 0 ? parseFloat(width / height) : 0;

                    if((height - maxHeight) > (width - maxWidth)){
                        height = maxHeight;
                        width = widthHeightRatio * height;
                    }else{
                        width = maxWidth;
                        height = width / widthHeightRatio;
                    }

                    return {width : width,  height : height};
                },

                add : function(){
                    return this._together(true, arguments);
                },

                subtract : function(){
                    return this._together(false, arguments);
                },

                _together : function(add, numbers){
                    var result = null;

                    for(var x in numbers){
                        if(add){
                            result = (result == null) ? 0 : result;
                            result+= numbers[x];
                        }else{
                            if(result == null){
                                result = numbers[x];
                            }else{
                                result-= numbers[x];
                            }
                        }
                    }

                    return result;
                },

                /**
                * Changes <code>number</code> to <code>max</code> if it exceeds <code>max</code> or to <code>min</code> of it's less than <code>min</code>
                * @function
                * @public
                * @name $.mathUtils#cap
                * @param {float} number The number to cap
                * @param {float} min The minimum
                * @param {float} max The maximum
                * @return {float} The (capped) number
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                cap : function(number, min, max){
                    number = number < min ? min : number;
                    number = number > max ? max : number;

                    return number;
                },

                /**
                * Perform's Math.max on an array of floats/integers/numbers and returns the highest value
                * @function
                * @public
                * @name $.mathUtils#max
                * @param {Array<float>} numbers The numbers on which to return the highest value
                * @return {float} The highest value
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                max : function(numbers){
                    return numbers.length > 0 ? Math.max.apply(this, numbers) : 0;
                },

                /**
                * Perform's Math.min on an array of floats/integers/numbers and returns the lowest value
                * @function
                * @public
                * @name $.mathUtils#min
                * @param {Array<float>} numbers The numbers on which to return the lowest value
                * @return {float} The lowest value
                * @author Justin van Schaick <justin@dynamit.nl>
                */
                min : function(numbers){
                    return numbers.length > 0 ? Math.min.apply(this, numbers) : 0;
                }
            };
        }
    });
})(jQuery, window, void 0);

(function($, window, undefined){

    var StringUtils = klass(function(){

    }).methods({
        unCamelCase : function(sourceString){
            var str = '';
            var charArray = sourceString.split('');

            for(var i=0;i<charArray.length;i++){
                str+= /[A-Z]/.test(charArray[i]) ? '-' + charArray[i].toLowerCase() : charArray[i];
            }

            return str;
        },

        camelCase : function(sourceString){
            var charArray = sourceString.split('-');
            var str = charArray[0];

            for(var i=1;i<charArray.length;i++){
                str+= charArray[i].substring(0, 1).toUpperCase() +  charArray[i].substring(1);
            }

            return str;
        }
    });

    $.extend({
            /**
            *  @name stringUtils
            *  @class A String-utils object
            */
            stringUtils : function(){
                return new StringUtils();
            }
    });
})(jQuery, window, void 0);

(function($, window, undefined){
    "use strict";

    var EVENTS = {
        SPIN_START : 'spinStart',
        MANIPULATION_START : 'manipulationStart',
        MANIPULATION_END : 'manipulationEnd',
        CHANGE : 'change'
    };

    var defaultOptions = {
        includeMouseSwipe : false,
        accelerator : 1,
        sensitivity : 1,
        valueHeightRatio : 1.4
    };

    var SpinningWheel = JQueryPluginAbstract.extend(function(element, nameSpace, options){
        this.$element = $(element).addClass('data-spinning-wheel');
        this.options = $.extend(defaultOptions, options);
        this.slotValueHeight = 0;
        this.slotHeight = 0;
        this.spinDirection = null;
        this.slotCombinationExceptions = [];
        this.triggeredThroughUI = false;
        this.uiHeight = $(element).height();
        this.uiTriggered = false;
    }).methods({
        init : function(){
            this.create();
        },

        create : function(){
            $("<div class='spinning-wheel-window'></div>").appendTo(this.$element);
        },

        addSlot : function(values, cssClassCustom){
            if(values.length < 3){
                throw 'Supplied array must contain 3 values or more';
            }

            var me = this;
            var $slotElement = $("<div class='slot'><div class='window'></div><ul><li></li><li></li><li></li></ul></div>");
            var slotIndex = this.$element.find('.slot').length;
            var cssClass = "slot-" + slotIndex;
            $slotElement.appendTo(this.$element).data('slotValues', values).data('slotValueIndex', 1).data('slotIndex', slotIndex).addClass(cssClass);

            if(typeof cssClassCustom == 'string'){
                $slotElement.addClass(cssClassCustom);
            }

            $slotElement.find('li').each(function(index){
                $(this).html(values[index]);
            });

            $slotElement.swipeplus({
                touchStart : function(e, params){
                    me.swipeStartEventHandler(e, params, 0, $($slotElement));
                },
                vSwipe : function(e, params){
                    me.swipeEventHandler(e, params, 0, $($slotElement));
                },
                vSwipeEnd : function(e, params){
                    me.swipeCompleteEventHandler(e, params, 0, $slotElement);
                },
                includeMouseSwipe : me.options.includeMouseSwipe
            });

            this.uiHeight = this.$element.height();
            this.setSlotDimensions($slotElement);
            this._fillInAllSlotValues();
        },

        setSlotDimensions : function($slotElement){
            var slotHeight = this.slotHeight = $slotElement.height();
            var slotValueHeight = this.slotValueHeight = Math.round(((slotHeight * this.options.valueHeightRatio) / 3) * 100) / 100;
            this.$element.find('li').css({height : slotValueHeight + 'px', lineHeight : slotValueHeight + 'px'});
            var marginTop = this.$element.height() -  this.$element.find('.slot ul').get(0).offsetHeight;
            marginTop /= 2;
//            this.$element.find('.slot ul').css({marginTop : -(slotValueHeight / 2) + 'px'});
            this.$element.find('.slot ul').css({marginTop : marginTop + 'px'});
        },

        swipeStartEventHandler : function(e, params, slotIndex, $slotElement){
            this.triggeredThroughUI = true;
            $slotElement.find('li').stop(true, false);
            var eventParams = this._createEventParams($slotElement);
            this._dispatchCallback(EVENTS.MANIPULATION_START, eventParams);
        },

        swipeEventHandler : function(e, params, slotIndex, $slotElement){
            e.stopPropagation();
            e.preventDefault();
            var up = params.deltaY < 0;
            $slotElement.data('direction', (up ? 'UP' : 'DOWN'));
            var $firstLiElement = $slotElement.find('li:eq(0)');
            var currentMarginTop = parseFloat($firstLiElement.css('margin-top'));
            var marginTop = currentMarginTop + params.deltaY;
            var bounderies = {min : -(this.slotValueHeight / 2), max : (this.slotValueHeight / 2)};
            var withinTolerance = marginTop > bounderies.min && marginTop < bounderies.max;

            if(withinTolerance){
                $firstLiElement.css('marginTop', marginTop + 'px');
            }else{
                this.swapSlotValueElements($slotElement, up);
            }
        },

        swipeCompleteEventHandler : function(e, params, slotIndex, $slotElement){
            var swipeDistance = Math.abs(params.deltaYTotal);
            var percentageYSwiped = swipeDistance / this.uiHeight;
            var eventParams = this._createEventParams($slotElement);
            this._dispatchCallback(EVENTS.MANIPULATION_END, eventParams);

            var swipeSpeed = params.swipeSpeedY -(params.swipeSpeedY % (params.swipeSpeedY * 0.9));
            var numberOfSpins = 1 + Math.round(swipeSpeed);
            numberOfSpins *= this.options.sensitivity;
            numberOfSpins = Math.round(numberOfSpins);
            numberOfSpins = numberOfSpins == 0 ? 1 : numberOfSpins;
            numberOfSpins-= 1;

            if(numberOfSpins > 0){
                 this.spinWheel($slotElement, numberOfSpins, numberOfSpins, params.direction == 'UP');
            }else{
                 var $firstLiElement = $slotElement.find('li:eq(0)');
                var currentMarginTop = parseFloat($firstLiElement.css('margin-top'));
                var isSpinCycleComplete = currentMarginTop == 0;

                if(!isSpinCycleComplete){
                    this.spinWheel($slotElement, 1, 1, $slotElement.data('direction') == 'UP');
                }
            }


//            if(percentageYSwiped > 1 || true){//console.info('before : '+ params.swipeSpeedY);
//                params.swipeSpeedY -= (params.swipeSpeedY % (params.swipeSpeedY * 0.9));//console.info('after : ' + params.swipeSpeedY);
//                var numberOfSpins = 1 + Math.round(params.swipeSpeedY);
//                numberOfSpins = Math.round(numberOfSpins);
//                numberOfSpins = numberOfSpins == 0 ? 1 : numberOfSpins;//console.info(numberOfSpins);
//                $('#search-field').val(numberOfSpins);
//                this.spinWheel($slotElement, numberOfSpins, numberOfSpins, params.direction == 'UP');
//            }else{
//                var $firstLiElement = $slotElement.find('li:eq(0)');
//                var currentMarginTop = parseFloat($firstLiElement.css('margin-top'));
//                var isSpinCycleComplete = currentMarginTop == 0;
//
//                if(!isSpinCycleComplete){
////                    var direction = currentMarginTop < ($firstLiElement.get(0).offsetHeight / 2) ? 1 : -1;console.info(direction);
//                    this.spinWheel($slotElement, 1, 1, $slotElement.data('direction') == 'UP');
//                }
//            }
        },

        spinWheelTo : function(slotElementIndex, slotValueIndex, simulateUITrigger){
            this.triggeredThroughUI = simulateUITrigger === undefined ? false : simulateUITrigger;
            var me = this;
//            me.triggeredThroughUI = false;
            var $slotElement = this.getSlot(slotElementIndex);
            var currentSlotValueIndex = parseInt($slotElement.data('slotValueIndex'));
            var valuesCount = $slotElement.data('slotValues').length;
            var spinsUp = (slotValueIndex >= currentSlotValueIndex) ? (slotValueIndex - currentSlotValueIndex) : valuesCount - (currentSlotValueIndex - slotValueIndex);
            var spinsDown = (slotValueIndex <= currentSlotValueIndex) ? (currentSlotValueIndex - slotValueIndex) : valuesCount - (slotValueIndex - currentSlotValueIndex);
            var numberOfSpins = spinsUp < spinsDown ? spinsUp : spinsDown;
            var up = numberOfSpins == spinsUp;

            if(numberOfSpins > 0){
                me.spinWheel($slotElement, numberOfSpins, numberOfSpins, up);
            }else{
                 if(this.isStationary()){
                    var params = me._createEventParams($slotElement);
                    me._dispatchCallback(EVENTS.CHANGE, params);
                }
            }
        },

        spinWheel : function($slotElement, numberOfSpinsLeft, originalNumberOfSpins, up){
            var me = this;

            if(this.isStationary()){
                var eventParams = this._createEventParams($slotElement);
                me._dispatchCallback(EVENTS.SPIN_START, eventParams);
            }

            if(!$slotElement.hasClass('spinning')){
                $slotElement.addClass('spinning');
            }

            this.spinDirection = up ? 'UP' : 'DOWN';
            var marginTopStationary = 0;
            var marginTopMax = this.slotValueHeight / 2;
            var marginTopMin = -marginTopMax;
            var $firstLiElement = $slotElement.find('li:eq(0)');
            var currentMarginTop = parseFloat($firstLiElement.css('margin-top'));
            var isStationary = currentMarginTop == marginTopStationary;
            var hasPassedStationaryPosition = (up && currentMarginTop < marginTopStationary) || (!up && currentMarginTop > marginTopStationary);
            var targetMarginTop;

            if(up){ // moves up from marginTopMax to marginTopMin
                targetMarginTop = hasPassedStationaryPosition || isStationary ? marginTopMin : marginTopStationary;
            }else{
                targetMarginTop = hasPassedStationaryPosition || isStationary ? marginTopMax : marginTopStationary;
            }

            if(hasPassedStationaryPosition){
                $slotElement.addClass('halfway');
            }else{
                $slotElement.removeClass('halfway');
            }

            var spinsDone = (originalNumberOfSpins + 1) - numberOfSpinsLeft;
            var duration = Math.floor((spinsDone * (60 / numberOfSpinsLeft)) + 100);
            duration *= this.options.accelerator;
            duration = duration < 0 ? 10 : duration;
            duration = duration > 30 ? 30 : duration;

            var easing = numberOfSpinsLeft == 1 && !isStationary ? 'easeOutCirc' : 'linear';

            $firstLiElement.stop(true, false).animate({marginTop : targetMarginTop + 'px'}, {duration : duration, easing : easing,
                complete : function(){
                    me.animateCompleteEventHandler($firstLiElement, $slotElement, up, numberOfSpinsLeft, originalNumberOfSpins);
                }
            });
        },

        animateCompleteEventHandler : function($animatedLiElement, $slotElement, up, numberOfSpinsLeft, originalNumberOfSpins){
            var me = this;

            if(this.isSlotAtStationaryPosition($slotElement)){
                numberOfSpinsLeft--;

                if(numberOfSpinsLeft > 0){
                    this.spinWheel($slotElement, numberOfSpinsLeft, originalNumberOfSpins, up);
                }else{
                    $slotElement.removeClass('spinning');

                    if(this.isStationary()){
                        var params = me._createEventParams($slotElement);
                        me._dispatchCallback(EVENTS.CHANGE, params);
                    }
                }
            }else{
                $slotElement.removeClass('halfway');
                this.swapSlotValueElements($slotElement, up);
                this.spinWheel($slotElement, numberOfSpinsLeft, originalNumberOfSpins, up);
            }
        },

        _createEventParams : function($slotElement){
            return {
                uiTriggered : this.triggeredThroughUI,
                values : this.getSelectedValues(),
                indices : this.getSelectedIndices(),
                ui : $slotElement,
                slotIndex : $slotElement.data('slotIndex')
            };
        },

        isSlotAtStationaryPosition : function($slotElement){
            var $firstLiElement = $slotElement.find('li:eq(0)');
            var currentMarginTop = parseFloat($firstLiElement.css('margin-top'));

            return currentMarginTop == 0;
        },

        swapSlotValueElements : function($slotElement, up){
            var $firstLiElement = $slotElement.find('li:eq(0)');
            var index = parseInt($slotElement.data('slotValueIndex'));
            var oldIndex = index;
            var values = $slotElement.data('slotValues');

            if(up){
                $firstLiElement.remove().appendTo($slotElement.find('ul:eq(0)')).css({marginTop : 0});
                $slotElement.find('li:first').css({marginTop : (this.slotValueHeight / 2) + 'px'});
            }else{
                $slotElement.find('li:last').css({marginTop : -(this.slotValueHeight / 2) + 'px'}).prependTo($slotElement.find('ul:eq(0)'));
                $firstLiElement.css({marginTop : 0});
            }

            index = this.getSlotValueIndex((!up ? 0 : 2), $slotElement.data('slotIndex'));
            $slotElement.data('slotValueIndex', index);
            this.spinSlotValues(up, $slotElement, values, index);

            if(typeof this.options.wheelSpinComplete == 'function'){
                this.options.wheelSpinComplete.call(this, {oldIndex : oldIndex, newIndex : index, oldValue : values[oldIndex], newValue : values[index], slotIndex : $slotElement.data('slotIndex')});
            }
        },

        spinSlotValues : function(up, $slotElement, values, index){
            var nextIndex = 0;

            if(up){
                nextIndex = this.getSlotValueIndex(2, $slotElement.data('slotIndex'));
                $slotElement.find('li:last').html(values[nextIndex]);
            }else{
                nextIndex = this.getSlotValueIndex(0, $slotElement.data('slotIndex'));
                $slotElement.find('li:eq(0)').html(values[nextIndex]);
            }
        },

        _fillInAllSlotValues : function(){
            var slots = this.getAllSlots();

            for(var i = 0; i < slots.length ; i++){
                this._fillInSlotValues(slots[i]);
            }
        },

        _fillInSlotValues : function(slotElement){
            var values = this.getSlotValues(slotElement);

            for(var i = 0; i < 3 ; i++){
                var slotValueIndex = this.getSlotValueIndex(i, $(slotElement).data('slotIndex'));
                $(slotElement).find('li:eq('+ i + ')').html(values[slotValueIndex]);
            }
        },

        getSlotValueIndex : function(rowIndex, columnIndex){
            var slotElement = this.getSlot(columnIndex);
            var currentSlotValueIndex = $(slotElement).data('slotValueIndex');
            var slotValues = this.getSlotValues(slotElement);
            var disabledSlotValueIndices = this.getDisabledSlotValueIndices(slotElement);
            var mathUtils = $.mathUtils();
            var slotValueIndex = rowIndex == 1 ? currentSlotValueIndex : mathUtils.getNormalizedValue(currentSlotValueIndex, rowIndex - 1, 0, slotValues.length - 1);
            var i = 0;

            while(disabledSlotValueIndices.indexOf(slotValueIndex) > -1 && i < disabledSlotValueIndices.length){
                slotValueIndex = mathUtils.getNormalizedValue(slotValueIndex, (rowIndex == 0 ? -1 : 1), 0, slotValues.length - 1);
                i++;
            }
//
            return slotValueIndex;
        },

        getDisabledSlotValueIndices : function(slotElement){
            return $(slotElement).data('disabledSlotValueIndices') != undefined ? $(slotElement).data('disabledSlotValueIndices') : [];
        },

        getSlotValues : function(slotElement){
            return $(slotElement).data('slotValues');
        },

        setSlotValues : function(slotIndex, slotValues){
            var slotElement = this.getSlot(slotIndex);
            $(slotElement).data('slotValues', slotValues);
            var slotValueIndex = 1;
//            var slotValueIndex = this.getSlotValueIndex(1, slotIndex);console.info('spinner:slotValueIndex='+slotValueIndex);
//            slotValueIndex = slotValueIndex >= slotValues.length ? slotValues.length - 1 : slotValueIndex;
//            console.info($(slotElement).data('slotValueIndex'));
            $(slotElement).data('slotValueIndex', slotValueIndex);
            this._fillInSlotValues(slotElement);
        },

        getSlot : function(index){
            return this.$element.find('.slot:eq(' + index +')');
        },

        getAllSlots : function(){
            return this.$element.find('.slot');
        },

        getSelectedValues : function(){
            var values = [];
            var slots = this.getAllSlots();
            var me = this;

            $(slots).each(function(){
                var value = me.getSelectedValueForSlotElement($(this));
                values.push(value);
            });

           return values;
        },

        getSelectedIndices : function(){
           return this.getRowIndices(1);
        },

        getRowIndices : function(rowIndex){
            var slots = this.getAllSlots();
            var me = this;
            var indices = [];

            $(slots).each(function(columnIndex){
                var slotValueIndex = $(this).data('slotValueIndex');

                if(rowIndex == 0 || rowIndex == 2){
                    slotValueIndex = me.getSlotValueIndex(rowIndex, columnIndex);
                }

                indices.push(slotValueIndex);
            });

           return indices;
        },

        getSelectedValueBySlotIndex : function(index){
            var $slotElement = this.getSlot(index);

            return this.getSelectedValueForSlotElement($slotElement);
        },

        getSelectedValueForSlotElement : function($slotElement){
            return $slotElement.find('li:eq(1)').html();
        },

        isStationary : function(){
            return this.$element.find('.spinning').length == 0;
        },

        disableSlotValue : function(slotIndex, slotValueIndex){
            var $slotElement = this.getSlot(slotIndex);
            var disabledSlotValueIndices = this.getDisableSlotValueIndices($slotElement);
            disabledSlotValueIndices.push(slotValueIndex);
            $slotElement.data('disabledSlotValueIndices', disabledSlotValueIndices);
        },

        setDisabledSlotValues : function(slotIndex, disabledSlotValueIndices){
            var slotElement = this.getSlot(slotIndex);
            $(slotElement).data('disabledSlotValueIndices', disabledSlotValueIndices);
            this._fillInAllSlotValues();
        },

        clearDisabledSlotValues : function(slotIndex){
            var slots = isNaN(slotIndex) ? this.getSlots() : [this.getSlot(slotIndex)];

            $(slots).each(function(){
                $(this).data('disabledSlotValueIndices', []);
            });
        }
    });

    $.fn.spinningWheels = function(){
        var args = arguments;

        if(typeof args[0] == 'string'){
            if(typeof $(this[0]).data('plugin_spinningwheel') == 'object'){
                return $(this).data('plugin_spinningwheel').getSet(args);
            }
        }

        var opts = typeof args[0] == 'object' ? args[0] : {};

        return this.each(function(){
            var spinningWheel = new SpinningWheel(this, 'spinningwheel', opts);
            spinningWheel.init();
        });
    };
})(jQuery, window, void 0);

(function($, window, undefined){
    "use strict";

    var EVENTS = {
        scrollComplete : 'scrollComplete'
    };

    var ScrollPane = JQueryPluginAbstract.extend(function(scrollPaneElement, nameSpace, options){
        this.scrollElement = null;
        this.scrollContentContainer = $(scrollPaneElement).find('.scroll-content:eq(0)');
        this.hScrollBar = null;
        this.vScrollBar = null;
        this.model = null;
        this.manipulationInProgress = false;
        this.animating = false;
        this.mathUtils = $.mathUtils();
        this.mobileDevice = $(document.body).hasClass('mobile-device');

        this.init();
    }).methods({

        init : function(){
            var me = this;
            var overflowX = me.$element.css('overflow');
            overflowX = overflowX.length > 0 ? overflowX : me.$element.css('overflow-x');
            var overflowY = me.$element.css('overflow');
            overflowY = overflowY.length > 0 ? overflowX : me.$element.css('overflow-y');
            var overflowYCssClass = 'overflow-y-' + overflowY;
            var overflowXCssClass = 'overflow-x-' + overflowX;
//            var dimensions = me.$element.dimensions()[0];
            me.$element.addClass('scroller').addClass(overflowXCssClass).addClass(overflowYCssClass);
            var scrollElement = $("<div class='scroll-content-wrapper'></div>").appendTo(me.$element).scrollLeft(0).scrollTop(0);
            $(me.scrollContentContainer).appendTo(scrollElement);
            this.scrollElement = scrollElement;

            if(this.options.useTouch){
                $(me.scrollElement).swipeplus({
                    swipe : function(e, params){
                        me._swipeEventHandler(e, params);
                    },
                    touchStart : function(e, params){
                        me._swipeStartEventHandler(e, params);
                    },
                    touchEnd : function(e, params){
                        me._touchEndEventHandler(e, params);
                    },
                    excludedCssSelectors : ['.scrollbar', '.scroll-nav-button', '.scroll-button', '.scroll-track', '.swipe-excluded']
                });
            }

            if(this.options.useScrollbars){
                var scrollBarElements = this._addScrollBarElements();
            }

            this._configModel();

            if(this.options.useScrollbars){
                this._configScrollBars(scrollBarElements);
            }

            this.update();

            me._addEventListener(window, 'resize', function(e){me._windowResizeEventHandler.call(me, e);});
            me._addEventListener(me.scrollElement, 'mousewheel', function(e, delta, deltaX, deltaY){me._mouseWheelEventHandler.call(me, e, delta, deltaX, deltaY);});

            if(this.options.useTouch){
                me._addEventListener($(me.scrollElement).find('a'), 'click', function(e){me._anchorClickEventHandler.call(me, e, this);});
            }
        },

        _addScrollBarElements : function(){
            var me = this;
            var html = "<div class='scroll-nav-button scroll-nav-button-first'></div><div class='scroll-track'><div class='scroll-button'></div></div><div class='scroll-nav-button scroll-nav-button-second'></div>";
            var hScrollBar = $("<div class='scrollbar scrollbar-horizontal'>" + html + "</div>").appendTo(me.$element);
            var vScrollBar = $("<div class='scrollbar scrollbar-vertical'>" + html + "</div>").appendTo(me.$element);

            return {hScrollBar : hScrollBar, vScrollBar : vScrollBar};
        },

        _configModel : function(){
            var me = this;
            var scrollBarButtonLength = 0;
            var scrollBarButtonWidth = 0;

            if(!this.options.useScrollbars){
                var $scrollBarButton = me.$element.find('.scrollbar-horizontal:eq(0) .scroll-nav-button');
                scrollBarButtonLength = $scrollBarButton.length > 0 ? $scrollBarButton.dimensions()[0].xSpan : 0;
                scrollBarButtonWidth = $scrollBarButton.length > 0 ? $scrollBarButton.get(0).offsetWidth : 0;
            }

            this.model = new ScrollPaneModel(this.options, 0, 0, 0, 0, scrollBarButtonWidth, scrollBarButtonLength);
        },

        _configScrollBars : function(scrollBarElements){
            var me = this;
            me.hScrollBar = new HorizontalScrollBar(this.options, scrollBarElements.hScrollBar, me.model, me.model.overflowX);
            me.vScrollBar = new VerticalScrollBar(this.options, scrollBarElements.vScrollBar, me.model, me.model.overflowY);
            var $scrollBars = $(scrollBarElements.hScrollBar).add(scrollBarElements.vScrollBar);

            me._addEventListener($scrollBars, 'scroll', function(e, params){
                me._scrollBarScrollEventHandler.call(me, e, params);
            });

            me._addEventListener($scrollBars, 'scrollTo', function(e, params){
                me._scrollTrackClickEventHandler.call(me, e, params);
            });

            me._addEventListener($scrollBars, 'manipulationEnd', function(e, params){
                me._scrollBarScrollCompleteEventHandler.call(me, e, params);
            });

            me.hScrollBar.init();
            me.vScrollBar.init();
        },

        _swipeStartEventHandler : function(e, params){
            var me = this;
            var scroll = this.getScroll();

            $(me.scrollElement).stop(true, false).data('scrollStart', scroll);

            if(me.scrollElement.hasClass('scrolling')){
                me.scrollElement.removeClass('scrolling');
            }
        },

        _swipeEventHandler : function(e, params){
            var me = this;

            if(!$(me.scrollElement).hasClass('ignore-anchors')){
                $(me.scrollElement).addClass('ignore-anchors');
            }

            if(!$(me.scrollElement).hasClass('scrolling')){
                $(me.scrollElement).addClass('scrolling');
            }

            if(!me.manipulationInProgress){
                me.manipulationInProgress = true;
                $(me.scrollElement).find('img, a').attr('draggable', 'false').attr('ondragstart', 'return false;').attr('ondrag', 'return false;');
            }

            var verticalScroll = Math.abs(params.deltaY) >= Math.abs(params.deltaX);
            var delta = verticalScroll ? params.deltaYTotal : params.deltaXTotal;
            var scrollStart = $(me.scrollElement).data('scrollStart');
            var scrollTo = verticalScroll ? (scrollStart.top - delta) : (scrollStart.left - delta);
            this._doScroll(verticalScroll, scrollTo, false);
        },

        _swipeCompleteEventHandler : function(e, params){
            if(this.model.overflowX > 0 || this.model.overflowY > 0){
                var me = this;
                var verticalScroll = Math.abs(params.deltaYTotal) >= Math.abs(params.deltaXTotal);
                var delta = (verticalScroll ? params.deltaYTotal : params.deltaXTotal) * 3.5;
                delta *= -1;
                var scrollStart = $(me.scrollElement).data('scrollStart');
                this._doDeltaScroll(verticalScroll, delta, (verticalScroll ? scrollStart.top : scrollStart.left - delta));
            }
        },

        _touchEndEventHandler : function(e, params){
            var me = this;
            me.manipulationInProgress = false;
            $(me.scrollElement).find('img, a').removeAttr('draggable').removeAttr('ondragstart').removeAttr('ondrag');

            if(!this.animating){
                this._evalSnapped();
            }
        },

        _windowResizeEventHandler : function(e){
            this.update(false);
        },

        _mouseWheelEventHandler : function(e, delta, deltaX, deltaY){
            if(deltaY != 0 && this.vScrollBar != null && !this.vScrollBar.isHidden()){
                e.preventDefault();
                delta *= this.options.mouseWheelAccelerator;
                var scroll = this.getScroll();
                var scrollTo = scroll.top - delta;
                scrollTo = $.mathUtils().cap(scrollTo, 0, this.model.overflowY);
                this.scrollTo(0, scrollTo, false);
            }
        },

        _scrollBarScrollEventHandler : function(e, params){
            this._scrollBarEventHandler(e, params, false);
        },

        _scrollTrackClickEventHandler : function(e, params){
            var verticalScroll = params.vScroll;
            var overflow = verticalScroll ? this.model.overflowY : this.model.overflowX;
            var scrollCurrent = verticalScroll ? this.model.scrollY : this.model.scrollX;
            var fraction = params.percentageToScroll > 0 ? params.percentageToScroll / 100 : 0;
            var scrollTo = fraction * overflow;
            var delta = scrollTo - scrollCurrent;
            this._doDeltaScroll(verticalScroll, delta, scrollCurrent);
        },

        _scrollBarScrollCompleteEventHandler : function(e, params){
            this._evalSnapped();
        },

        _scrollBarEventHandler : function(e, params, animate){
            var overflow = params.vScroll ? this.model.overflowY : this.model.overflowX;
            var fraction = params.percentageToScroll > 0 ? params.percentageToScroll / 100 : 0;
            var scrollTo = fraction * overflow;//console.info(scroll);
            var obj = {};
            obj.x = params.vScroll ? 0 : scrollTo;
            obj.y = params.vScroll ? scrollTo : 0;
            this.scrollTo(obj.x, obj.y, animate, (animate ? 500 : 0));
        },

         _anchorClickEventHandler : function(e, anchor){
            var me = this;

            if(me.manipulationInProgress){
                e.stopPropagation();
                e.preventDefault();
            }else{
//               e.stopPropagation();
//               e.preventDefault();
//               var url = $(anchor).attr('href');
//
//               setTimeout(function(){
//                   if(!me.manipulationInProgress && !$(me.scrollElement).hasClass('scrolling')){
//                       window.location = url;
//                   }
//               }, 100);
            }
        },

        _doDeltaScroll : function(verticalScroll, delta, scrollCurrent){
            var me = this;
            var scrollTo;
            // if delta is < 0 we scroll left or up, otherwise right or down

            if(me.options.snapSize > 0){
                scrollTo = scrollCurrent + delta;
                var currentScroll = verticalScroll ? this.model.scrollY : this.model.scrollX;
                var isSnapped = currentScroll % this.options.snapSize == 0;
                var targetScroll;

                if(delta < 0){
                    targetScroll = isSnapped ? (currentScroll + this.options.snapSize) : (currentScroll + this.options.snapSize - (currentScroll % this.options.snapSize));
                    delta = targetScroll - currentScroll;
                    scrollTo = currentScroll - delta;
                }else{
                    targetScroll = isSnapped ? (currentScroll - this.options.snapSize) : (currentScroll - (currentScroll % this.options.snapSize));
                    delta = currentScroll - targetScroll;
                    scrollTo = currentScroll + delta;
//                    scrollTo -= (scrollTo % this.options.snapSize);
                }

                this._doScroll(verticalScroll, scrollTo, true);
            }else{
                scrollTo = scrollCurrent + delta;
                this._doScroll(verticalScroll, scrollTo, true);
            }
        },

        _doScroll : function(verticalScroll, scrollTo, animate){
            var me = this;
            me._cancelAnimation();
            var max = verticalScroll ? this.model.overflowY : this.model.overflowX;
            scrollTo = Math.round(scrollTo);
            scrollTo = $.mathUtils().cap(scrollTo, 0, max);
            var obj = {};
            obj.x = verticalScroll ? this.model.scrollX : scrollTo;
            obj.y = verticalScroll ? scrollTo : this.model.scrollY;

            me.scrollTo(obj.x, obj.y, animate);
        },

        scrollTo: function(x, y, animate, duration){
            animate = animate != undefined ? animate : false;
            var me = this;
            this._cancelAnimation();
            var overflow = this.getOverflow();
            var scrollLeft = me.mathUtils.cap(x, 0, overflow.x);
            var scrollTop = me.mathUtils.cap(y, 0, overflow.y);

            if(!animate){
                $(me.scrollElement).scrollLeft(scrollLeft).scrollTop(scrollTop);
                this._updateScroll();
                this._dispatchCallback(EVENTS.scrollComplete);
            }else{
                var currentScroll = this.getScroll();
                var distanceToScroll = Math.abs(x- currentScroll.left) + Math.abs(y- currentScroll.top);
                duration = isNaN(duration) ? distanceToScroll * this.options.animationDuration : duration;

                var options = {
                    progress : function(){
                        me._updateScroll();
                    },
                    complete : function(){
                        me._scrollAnimationCompleteEventHandler();
                    },
                    easing : 'easeOutQuad',
                    duration : duration
                };

                var css = {scrollLeft : scrollLeft + 'px', scrollTop : scrollTop + 'px'};
                this.animating = true;
                $(me.scrollElement).animate(css, options);
            }
        },


        update : function(dispatchEvent){
            dispatchEvent = dispatchEvent === undefined ? true : dispatchEvent;
            var me = this;
            var scrollPaneDimensions = $(me.scrollElement).dimensions()[0];
            var scrollContentdimensions = $(me.scrollContentContainer).dimensions()[0];
            var scrollContentHeight = $.mathUtils().add(scrollContentdimensions.ySpan, scrollPaneDimensions.padding.top);
            this.model.setScrollContentSize($(me.scrollContentContainer).get(0).offsetWidth, scrollContentHeight);
            var scrollPaneHeight = $.mathUtils().add(scrollPaneDimensions.height, scrollPaneDimensions.padding.top, scrollPaneDimensions.padding.bottom);
            var scrollPaneWidth = scrollPaneDimensions.width + scrollPaneDimensions.padding.left + scrollPaneDimensions.padding.right;

            this.updatePercentageScrolled(dispatchEvent);
            this.model.setScrollPaneSize(scrollPaneWidth, scrollPaneHeight);

            var overflowX = $(me.scrollContentContainer).get(0).offsetWidth - $(me.scrollElement).get(0).offsetWidth;
            var overflowY = $(me.scrollContentContainer).get(0).offsetHeight - $(me.scrollElement).get(0).offsetHeight;

            overflowX = overflowX < 0 ? 0 : overflowX;
            overflowY = overflowY < 0 ? 0 : overflowY;
            this.model.setOverflow(overflowX, overflowY);

            if(overflowX == 0 || me.$element.hasClass('overflow-x-hidden')){
                me.$element.addClass('scrollbar-x-none');
            }else{
                me.$element.removeClass('scrollbar-x-none');
            }

            if(overflowY == 0 || me.$element.hasClass('overflow-y-hidden')){
                me.$element.addClass('scrollbar-y-none');
            }else{
                me.$element.removeClass('scrollbar-y-none');
            }

            if(this.options.useScrollbars){
                 if(scrollPaneDimensions.xSpan < this.options.showScrollBarButtonsTreshold){
                    $(me.hScrollBar.scrollBarElement).addClass('scroll-nav-button-none');
                }else{
                    $(me.hScrollBar.scrollBarElement).removeClass('scroll-nav-button-none');
                }

                if(scrollPaneDimensions.ySpan < this.options.showScrollBarButtonsTreshold){
                    $(me.vScrollBar.scrollBarElement).addClass('scroll-nav-button-none');
                }else{
                    $(me.vScrollBar.scrollBarElement).removeClass('scroll-nav-button-none');
                }

                me.vScrollBar.update();
                me.hScrollBar.update();
            }

            if(this.options.useTouch){
                this._setSwipeEndCallbacks('hSwipeEnd', overflowX);
                this._setSwipeEndCallbacks('vSwipeEnd', overflowY);
            }

            this._evalSnapped();
        },

        _setSwipeEndCallbacks : function(callbackName, overflow){
            var me = this;
            var swipeEndHandler = overflow == 0 ? null : function(e, params){me._swipeCompleteEventHandler(e, params);};

            if(typeof $(me.scrollElement).swipeplus('option', callbackName) != typeof swipeEndHandler){
                 $(me.scrollElement).swipeplus('option', callbackName, swipeEndHandler);
            }
        },

        updatePercentageScrolled : function(dispatchEvent){
            dispatchEvent = dispatchEvent === undefined ? true : dispatchEvent;
            var me = this;
            var scrollTop = parseFloat($(me.scrollElement).scrollTop());
            var scrollLeft = parseFloat($(me.scrollElement).scrollLeft());

            this.model.setScroll(scrollLeft, scrollTop, dispatchEvent);//console.info('perc scrolled according to controller : ' + this.getPercentagesScrolled().y + ", according to model : " + this.model.getPercentageScrolled().y);
        },


        _updateScroll : function(){
            var me = this;
            var scroll = this.getScroll();
            me.model.setScroll(scroll.left, scroll.top, true);
        },

        _scrollAnimationCompleteEventHandler : function(){
            var me = this;
            me.animating = false;
            me._updateScroll();
            $(me.scrollElement).removeClass('ignore-anchors').removeClass('scrolling');
            me._evalSnapped();
            me._dispatchCallback(EVENTS.scrollComplete);
        },

        _evalSnapped : function(){
            this._updateScroll();

            if(this.options.snapSize > 0){
                if(this.isScrollBarManipulationInProgress()){
                    return;
                }

                var isSnapped = this.model.scrollX % this.options.snapSize == 0;

                if(!isSnapped){
                    var left = (this.model.scrollX % this.options.snapSize);
                    var right = Math.abs(this.options.snapSize - (this.model.scrollX % this.options.snapSize));
                    var x = left < right ? this.model.scrollX - left : this.model.scrollX + right;

                    var top = (this.model.scrollY % this.options.snapSize);
                    var bottom = Math.abs(this.options.snapSize - (this.model.scrollY % this.options.snapSize));
                    var y = top < bottom ? this.model.scrollY - top : this.model.scrollY + bottom;

                    var animationSpeed = (x != this.model.scrollX ? Math.abs(this.model.scrollX - x) : Math.abs(this.model.scrollY - y)) * this.options.animationDuration;

                    this.scrollTo(x, y, true, animationSpeed);
                }
            }
        },

        isScrollBarManipulationInProgress : function(){
            return this.mobileDevice ? false : ((this.vScrollBar != null && this.vScrollBar.manipulationInProgress || this.hScrollBar != null && this.hScrollBar.manipulationInProgress));
        },

        _cancelAnimation : function(){
            var me = this;
            me.animating = false;
            $(me.scrollElement).stop(true, true);//.removeClass('ignore');
        },

        getScroll : function(){
            var me = this;

            return {left : $(me.scrollElement).scrollLeft(), top : $(me.scrollElement).scrollTop()};
        },

        getSize : function(){
            return this.model.getScrollPaneSize();
        },

        getScrollX : function(){
            return this.model.scrollX;
        },

        getScrollY : function(){
            return this.model.scrollY;
        },

        getOverflow : function(){
            return this.model.getOverFlow();
        },

        destroy : function(){
            var me = this;
            $(me.scrollElement).removeData('scrollStart');
            me.$element.removeData('defaultDimensions');
            $(me.scrollElement).swipeplus('destroy');
            $(me.scrollElement).stop(true, true).removeClass('ignore-anchors');
            $(me.scrollContentContainer).insertBefore(me.scrollElement);
            me.$element.removeClass('scroller overflow-x-auto overflow-x-hidden overflow-x-scroll overflow-x-none');
            me.$element.removeClass('overflow-y-auto overflow-y-hidden overflow-y-scroll overflow-y-none');
            me.$element.removeClass('scrollbar-y-none scrollbar-x-none');

            if(this.options.useScrollbars){
                me.vScrollBar.destroy();
                me.hScrollBar.destroy();
            }

            this.supr();

            if(this.options.useScrollbars){
                $(me.vScrollBar.scrollBarElement).add(me.hScrollBar.scrollBarElement).remove();
            }

            $(me.scrollElement).remove();
        }
    });




    /************************** ScrollBar ***************************************/

    var ScrollBar = klass(function(options, scrollBarElement, model){
        this.options = options;
        this.scrollBarElement = scrollBarElement;
        this.model = model;
        this.scrollTrackElement = $(scrollBarElement).find('.scroll-track');
        this.scrollButton = $(scrollBarElement).find('.scroll-button');
        this.scrollNavButtons = $(scrollBarElement).find('.scroll-nav-button');
        this.scrollBarLength = 0;
        this.scrollTrackLength = 0;
        this.scrollButtonLength = 0;
        this.scrollNavButtonLength = 0;
        this.manipulationInProgress = false;
    }).methods({
        init : function(){
            var me = this;

            $(me.scrollBarElement).find('.scroll-nav-button').click(function(e){
                me._scrollBarButtonClickEventHandler(e, this);
            });

            $(me.model).bind('scrollPaneSizeChange', function(e, params){
                    me._scrollPaneSizeChangeEventHandler(e, params);
                }).bind('scrollChange', function(e, params){
                        me._scrollChangeEventHandler(e, params);
                    }
                ).bind('overflowChange', function(e, params){
                        me.update();
                    }
                );

            $(me.scrollButton).data('percentageScrolled', 0);

            var axis = this.isVerticalScrollBar() ? 'y' : 'x';

            $(me.scrollButton).draggable({
                        containment : 'parent',
                        axis : axis,
                        start : function(e, ui){
                            me._scrollButtonDragStartEventHandler(e, ui);
                        },
                        drag : function(e, ui){
                            me._scrollButtonDragEventHandler(e, ui);
                        },
                        stop : function(e, ui){
                            me._scrollButtonDragStopEventHandler(e, ui);
                        }
            });

            $(me.scrollTrackElement).click(function(e){
                me._scrollTrackClickEventHandler(e);
            });

            this.update();
        },

        update : function(){
            var me = this;
            var scrollPaneElement = $(me.scrollBarElement).parent().find('.scroll-content-wrapper:eq(0)');

            if($(scrollPaneElement).get(0) === undefined){    // bug somewhere, probably related to destroy method. This is a quick fix
                return;
            }

            this.scrollBarLength = this.isVerticalScrollBar() ? $(scrollPaneElement).get(0).offsetHeight : $(scrollPaneElement).get(0).offsetWidth;
            this.scrollNavButtonLength = 0;

            if(this.isScrollButtonsVisible()){
                this.scrollNavButtonLength = this.isVerticalScrollBar() ? $(me.scrollNavButtons[0]).height() : $(me.scrollNavButtons[0]).width();
            }

            this.scrollTrackLength = this.scrollBarLength - (this.scrollNavButtonLength * 2);
            this._setScrollBarDimensions();
        },

        isScrollButtonsVisible : function(){
            var me = this;

//            return !$(me.scrollNavButtons[0]).is(':hidden');
            return $(me.scrollNavButtons[0]).css('display') != 'none';
        },

        _setScrollBarDimensions : function(){
            var me = this;

            if(this.isVerticalScrollBar()){
                $(me.scrollTrackElement).height(this.scrollTrackLength);
                $(me.scrollBarElement).height(this.scrollBarLength);
            }else{
                $(me.scrollTrackElement).width(this.scrollTrackLength);
                $(me.scrollBarElement).width(this.scrollBarLength);
            }

            this._setScrollButtonDimensions();
        },

        _setScrollButtonDimensions : function(){
            var me = this;
            var overflow = this.getOverflow();
            var percentageVisible = this.scrollBarLength / (this.scrollBarLength + overflow);
            var scrollButtonLength = Math.round(percentageVisible * this.scrollTrackLength);
            var css = !this.isVerticalScrollBar() ? {width : scrollButtonLength + 'px'} : {height : scrollButtonLength  + 'px'};
            $(me.scrollButton).css(css);
            this.scrollButtonLength = scrollButtonLength;
            var refactoredScrollDistance = (parseFloat($(me.scrollButton).data('percentageScrolled')) / 100) * (this.scrollTrackLength - scrollButtonLength);
            refactoredScrollDistance = Math.round(refactoredScrollDistance * 100) / 100;
            css = !this.isVerticalScrollBar() ? {left : refactoredScrollDistance + 'px'} : {top : refactoredScrollDistance  + 'px'};

            if(css.left != $(me.scrollButton).get(0).offsetLeft){
                $(me.scrollButton).css(css);
            }
        },

        isVerticalScrollBar : function(){
            var me = this;

            return $(me.scrollBarElement).hasClass('scrollbar-vertical');
        },

        _scrollPaneSizeChangeEventHandler : function(e, params){
            this.update();
        },

        _scrollButtonDragStartEventHandler : function(e, ui){
            var me = this;
            me.manipulationInProgress = true;
            $(me.scrollBarElement).trigger('manipulationStart');
        },

        _scrollButtonDragEventHandler : function(e, ui){
            var me = this;
            $(me.scrollBarElement).trigger('scroll', {percentageToScroll : me.getScrollButtonPercentageScrolled(), vScroll : this.isVerticalScrollBar()});
        },

        _scrollButtonDragStopEventHandler : function(e, ui){
            var me = this;
            me.manipulationInProgress = false;
            $(me.scrollButton).data('percentageScrolled', me.getScrollButtonPercentageScrolled());
            $(me.scrollBarElement).trigger('manipulationEnd');
        },

        _scrollTrackClickEventHandler : function(e){
            var me = this;
            var pointClicked = this.isVerticalScrollBar() ? e.pageY - $(me.scrollBarElement).offset().top : e.pageX - $(me.scrollBarElement).offset().left;
            pointClicked-= this.isVerticalScrollBar() ? $(me.scrollTrackElement).get(0).offsetTop : $(me.scrollTrackElement).get(0).offsetLeft;
            var percentageToScroll = this.getPercentageForPositionOnScrollBar(pointClicked);
            $(me.scrollBarElement).trigger('scrollTo', {percentageToScroll : percentageToScroll, vScroll : this.isVerticalScrollBar()});
        },

        _scrollBarButtonClickEventHandler : function(e, scrollNavButtonElement){
            var me = this;
            var scrollBackButtonClicked = $(scrollNavButtonElement).hasClass('scroll-nav-button-second');
            var percentageScrolled = this.getScrollButtonPercentageScrolled();
            var percentageToScroll = 0;
            var percentageToAdd = this.getOverflow() < 100 ? 50 : 25;

            if(scrollBackButtonClicked){
                percentageToScroll = percentageScrolled + percentageToAdd;
            }else{
                percentageToScroll = percentageScrolled - percentageToAdd;
            }

            percentageToScroll = $.mathUtils().cap(percentageToScroll, 0, 100);

            if(percentageScrolled != percentageToScroll){
               $(me.scrollBarElement).trigger('scrollTo', {percentageToScroll : percentageToScroll, vScroll : this.isVerticalScrollBar()});
            }
        },

        _scrollChangeEventHandler : function(e, params){
            var me = this;

            if(!me.manipulationInProgress){ // ony move the scrollbar to match the scroll if it's not being manipulated by the user.  Otherwise we create a causality-loop
                var percentageScrolled = this.model.getPercentageScrolled();
                this.moveScrollButton(this.isVerticalScrollBar() ? percentageScrolled.y : percentageScrolled.x, false);
            }
        },

        moveScrollButton : function(percentage, animate){
            animate = animate === undefined ? true : animate;
            var me = this;
            var distanceToScroll = percentage > 0 ? Math.round((this.scrollTrackLength - this.scrollButtonLength) * (percentage / 100)) : 0;
            var css = this.isVerticalScrollBar() ? {top : distanceToScroll + 'px'} : {left : distanceToScroll + 'px'} ;

            $(me.scrollButton).stop(false, false).css(css).data('percentageScrolled', percentage);
        },

        getScrollButtonPercentageScrolled : function(){
            var me = this,
            scrollableDistance = this.scrollTrackLength - this.scrollButtonLength,
            buttonDistanceScrolled = parseInt(!this.isVerticalScrollBar() ? $(me.scrollButton).get(0).offsetLeft : $(me.scrollButton).get(0).offsetTop),
            percentage = buttonDistanceScrolled > 0 ? Math.round((buttonDistanceScrolled / scrollableDistance) * 10000) / 100 : 0;
            percentage = $.mathUtils().cap(percentage, 0, 100);

            return percentage;
        },

        getPercentageForPositionOnScrollBar : function(pos){
            var perc = ((pos > this.scrollTrackLength - this.scrollButtonLength ? this.scrollTrackLength - this.scrollButtonLength : pos) / (this.scrollTrackLength - this.scrollButtonLength)) * 100;

            return perc;
        },

        getScrollBarLength : function(){
            var scrollBarsLength = this.model.getScrollBarsLength();

            return (this.isVerticalScrollBar() ? scrollBarsLength.y : scrollBarsLength.x);
        },

        getOverflow : function(){
            var overflow = this.model.getOverFlow();

            return (this.isVerticalScrollBar() ? overflow.y : overflow.x);
        },

        isHidden : function(){
            var me = this;

            return $(me.scrollBarElement).css('display') == 'none';
        },

        destroy : function(){
            var me = this;
            $(me.model).unbind('scrollPaneSizeChange');
            $(me.model).unbind('scrollChange');
            $(me.model).unbind('overflowChange');
            $(me.scrollTrackElement).find('.scroll-nav-button').add(me.scrollBarElement).unbind('click');
            $(me.scrollButton).draggable('destroy');
        }
    });

    var VerticalScrollBar = ScrollBar.extend(function(){
    }).methods({
        reset : function(){
            var me = this;
            $(me.scrollButton).css({top : 0});
            this.supr();
        }
    });

    var HorizontalScrollBar = ScrollBar.extend(function(){
    }).methods({
        reset : function(){
            var me = this;
            $(me.scrollButton).css({left : 0}).data('percentageScrolled', 0);
            this.supr();
        }
    });

    /******************** ScrollPaneModel ***********************/

    var ScrollPaneModel = klass(function(options, scrollPaneWidth, scrollPaneHeight, scrollContentWidth, scrollContentHeight, scrollBarWidth, scrollBarButtonLength){
        this.options = options;
        this.scrollPaneWidth = scrollPaneWidth;
        this.scrollPaneHeight = scrollPaneHeight;
        this.scrollContentWidth = scrollContentWidth;
        this.scrollContentHeight = scrollContentHeight;
        this.overflowX = 0;
        this.overflowY = 0;
        this.scrollX = 0;
        this.scrollY = 0;
        this.scrollBarWidth = scrollBarWidth;
        this.scrollBarButtonLength = scrollBarButtonLength;
        this.showScrollBarButtons = true;
    }).methods({

        setScroll : function(x, y, dispatchEvent){
            var scrollChanged = x != this.scrollX || y != this.scrollY;
            var params = {xOld : this.scrollX, yOld : this.scrollY, scrollLeft : x, scrollTop : y};
            this.scrollX = x;
            this.scrollY = y;

            if(scrollChanged && dispatchEvent){
                $(this).trigger('scrollChange', params);
            }
        },

        setOverflow : function(overflowX, overflowY){
            var overflowXCurrent = this.overflowX;
            var overflowYCurrent = this.overflowY;
            this.overflowX = overflowX;
            this.overflowY = overflowY;

            if(overflowXCurrent != overflowX || overflowYCurrent != overflowY){
                $(this).trigger('overflowChange', {});
            }
        },

        getOverFlow : function(){
            return {x : this.overflowX, y : this.overflowY};
        },

        hasOverflow : function(){
            var overflow = this.getOverFlow();

            return {x : overflow.x > 0, y : overflow.y > 0};
        },

        setScrollPaneSize : function(w, h){
            var hasChanged = w != this.scrollPaneWidth || h != this.scrollPaneHeight;
            this.scrollPaneWidth = w;
            this.scrollPaneHeight = h;

            if(hasChanged){
                $(this).trigger('scrollPaneSizeChange');
            }
        },

        getScrollPaneSize : function(){
            return {x : this.scrollPaneWidth, y : this.scrollPaneHeight};
        },

        setScrollContentSize : function(w, h){
            this.scrollContentWidth = w;
            this.scrollContentHeight = h;
        },

        getScrollContentSize : function(){
            return {width : this.scrollContentWidth, height : this.scrollContentHeight};
        },

        getYPercentageScrolled : function(){
            var overflow = this.getOverFlow();
            return Math.round((this.scrollY > 0 ? (this.scrollY / overflow.y) : 0) * 100);
        },

        getXPercentageScrolled : function(){
            var overflow = this.getOverFlow();
            return Math.round((this.scrollX > 0 ? (this.scrollX / overflow.x) : 0) * 100);
        },

        getPercentageScrolled : function(){
            var overflow = this.getOverFlow();
            var yPercentageScrolled = (this.scrollY > 0 ? (this.scrollY / overflow.y) : 0) * 100;
            var xPercentageScrolled = (this.scrollX > 0 ? (this.scrollX / overflow.x) : 0) * 100;
            var percScrolled = {y : yPercentageScrolled, x : xPercentageScrolled};

            return percScrolled;
        },

        getScrollDistanceForScrollPercentage : function(percentage, xScroll){
            var overflow = this.getOverFlow();

            return Math.round((!xScroll ? (overflow.y > 0 ? (overflow.y * (percentage / 100)) : 0) : (overflow.x > 0 ? (overflow.x * (percentage / 100)) : 0)) * 100) / 100;
        },

        getScrollDistanceForScrollPercentageChange: function(currentPercentage, newPercentage, xScroll){
            var percentage = newPercentage - currentPercentage;
            percentage = percentage < 0 ? percentage * -1 : percentage;

            return this.getScrollDistanceForScrollPercentage(percentage, xScroll);
        },

        translateDistanceToScrollToScrollSpeed : function(distanceToScroll){
            var milliSeconds = 100;
            milliSeconds+= distanceToScroll > 0 ? Math.round(((Math.round(distanceToScroll) / 200) * milliSeconds)) : 0;

            return milliSeconds;
        }
    });

    /*******************************************************/

    $.fn.scroller = function(){
        var args = arguments;

        if(typeof args[0] == 'string'){
            if(typeof $(this[0]).data('plugin_scroller') == 'object'){
                return $(this[0]).data('plugin_scroller').getSet(args);
            }
        }else{
            if(args.length == 0 || typeof args[0] == 'object'){
                var opts = typeof args[0] == 'object' ? args[0] : {};
                var config = $.extend({}, $.fn.scroller.defaultOptions);
                config = $.extend(config, opts);

                return this.each(function(){
                    new ScrollPane(this, 'scroller', config);
                });
            }
        }
    }


    $.fn.scroller.defaultOptions = {
        showScrollBarButtons : true,
        showScrollBarButtonsTreshold : 100,
        snapSize : 0,
        animationDuration : 2.5,
        mouseWheelAccelerator : 8,
        useTouch : false,
        useScrollbars : true
    }

})(jQuery, window, void 0);

var Marquee = klass(function(marqueeElement){
    this.marqueeElement = marqueeElement;
    this.marqueeContentElement = null;
    this.counter = 0;
    this.marqueeClone = null;
    this.autoStart = true;
    this.pauseOnHover = false;
    this.defaultLeft = 0;
}).methods({

    init : function(){
        var me = this;
        $(me.marqueeElement).css('position', 'relative');
        var $children = $(me.marqueeElement).children();
        var defaultDimensions = $children.dimensions();

        if($children.length > 1){
            me.marqueeContentElement = $("<div class='marquee-content'></div>").prependTo(me.marqueeElement);
            $children.appendTo(me.marqueeContentElement).css('float', 'left');
        }else{
            me.marqueeContentElement = $children.eq(0);
        }

        var contentWidth = 0;
        var dimensions = $children.dimensions();

        for(var index in dimensions){
            contentWidth+= dimensions[index].xSpan;
        }

        contentWidth = contentWidth < $(me.marqueeElement).get(0).offsetWidth ? $(me.marqueeElement).get(0).offsetWidth : contentWidth;
        contentWidth *= 5;
        contentWidth = Math.round(contentWidth);

        me.marqueeContentElement.css({overflowX : 'hidden', width : contentWidth + 'px'});

        if(this.pauseOnHover){
           $(me.marqueeElement).mouseover(function(e){
                me.onMarqueeMouseOverHandler(e);
            }).mouseout(function(e){
                me.onMarqueeMouseOutHandler(e);
            });
        }

        if(this.autoStart){
            this.animate();
        }
    },

    animate : function(){
        var me = this;
        this.animateElement($(me.marqueeContentElement).children(':eq(0)'));
    },

    animateElement : function(element){
        var me = this;
        var currentMarginLeft = parseFloat($(element).css('margin-left'));
        var marginLeftTarget = -$(element).get(0).offsetWidth;
        var marginLeft = currentMarginLeft - 1;
        marginLeft = marginLeft < marginLeftTarget ? marginLeftTarget : marginLeft;

        $(element).animate({marginLeft : marginLeft + 'px'}, {
            duration : 20, easing : 'linear', complete : function(){
                me.onAnimationCompleteHandler(element, marginLeft, marginLeftTarget);
            }
        });
    },

    onAnimationCompleteHandler : function(element, marginLeft, marginLeftTarget){
        var me = this;
        var targetReached = marginLeft == marginLeftTarget;

        if(targetReached){
            $(element).appendTo(me.marqueeContentElement).css('margin-left', 0);
            me.setItemPosition($(element));

            this.animate();
        }else{
           me.animateElement(element);
        }
    },

    onMarqueeMouseOverHandler : function(e){
        var me = this;
        $(me.marqueeContentElement).children().stop(false, false);
    },

    onMarqueeMouseOutHandler : function(e){
        this.animate();
    },

    setItemPosition : function($element){
        var me = this;
        var count = $(me.marqueeContentElement).children().length;
        var width = $element.dimensions()[0].width;

        if(count > 1){
            var marginLeft;

            if($element.get(0).offsetLeft > $(me.marqueeElement).dimensions()[0].width){
                marginLeft = 0;
            }else{
                marginLeft = width > $(me.marqueeElement).get(0).offsetWidth ? 0 : width;
            }
//            marginLeft = 0;

            $element.css({marginLeft : marginLeft + 'px'});
        }
    },

    start : function(){
        if(this.isHidden()){
            this.show();
        }

        this.stop();
        this.animate();
    },

    stop : function(){
        var me = this;
        $(me.marqueeContentElement).children().stop(true, false);
    },

    reset : function(){
        var me = this;
        this.stop();
        $(me.marqueeContentElement).children().css('margin-left', 0);
    },

    hide : function(){
        var me = this;
        this.reset();
        $(me.marqueeElement).hide();
    },

    show : function(){
        var me = this;
        $(me.marqueeElement).show();
    },

    isHidden : function(){
        var me = this;

        return $(me.marqueeElement).is(':hidden');
    }
});


var AgendaFilterController = klass(function(filterElement){
    this.$filterElement = $(filterElement);
    this.$dropDownElement = $(filterElement).find('ul:first');
    this.selectedValue = null;
    this.defaultValue = null;
}).methods({

    init : function(){
        var me = this;
        this._setValue(this.$filterElement.find('ul li:eq(0)'));
        this.defaultValue = this.selectedValue;

        this.$filterElement.click(function(e){
            me._filterElementClickEventHandler(e);
        }).mouseleave(function(e){
            me._onFilterMenuMouseLeaveEventHandler(e);
        }).mouseenter(function(e){
            me._onFilterMenuMouseEnterEventHandler(e);
        }).find('ul li').click(function(e){
            me._filterOptionElementClickEventHandler(e, this);
        });

        $(document).click(function(e){
            me._onDocumentClickEventHandler(e);
        });
    },

    _filterElementClickEventHandler : function(e){
        e.stopPropagation();
        this.$dropDownElement.stop();

        if(this.$dropDownElement.hasClass('expanded')){
            this.slideUp();
        }else{
            this._slideDown();
        }
    },

    _filterOptionElementClickEventHandler : function(e, selectedOptionElement){
        e.stopPropagation();
        var currentValue = this.selectedValue;
        this._setValue(selectedOptionElement);
        this.slideUp();

        if(currentValue != this.selectedValue){
            $(this).trigger('selectionchange', {value : this.selectedValue, oldValue :  currentValue, defaultValue : this.defaultValue});
        }
    },

    _onFilterMenuMouseLeaveEventHandler : function(e){
        this.slideUp(3000);
    },

    _onFilterMenuMouseEnterEventHandler : function(e){//console.info('enter');
//        if(this.$dropDownElement.hasClass('expanded') && this.$dropDownElement.hasClass('collapsing')){
//            this._slideDown();
//        }
    },

    _onDocumentClickEventHandler : function(e){
        if(this.$dropDownElement.hasClass('expanded')){
            this.slideUp();
        }
    },

    slideUp : function(delay){
        delay = isNaN(delay) ? 0 : delay;

        if(delay == 0){
            this.$dropDownElement.removeClass('expanded').removeClass('collapsing').hide()
        }else{
            this.$dropDownElement.delay(delay).addClass('collapsing').slideUp(200, function(){
                $(this).stop();
                $(this).removeClass('collapsing').removeClass('expanded').hide();
            });
        }


//        this.$dropDownElement.delay(delay).addClass('collapsing').slideUp(200, function(){
//            $(this).stop();
//            $(this).removeClass('collapsing').removeClass('expanded').hide();
//        });
    },

    _slideDown : function(){
        if(this.$dropDownElement.hasClass('collapsing')){
            this.$dropDownElement.removeClass('collapsing');//.stop();
        }

        this.$dropDownElement.addClass('expanded').slideDown(200);
    },

    _setValue : function(selectedOptionElement){
        this.$dropDownElement.find('li.active').removeClass('active');
        $(selectedOptionElement).addClass('active');
        var data = $(selectedOptionElement).dataSet()[0];
        this.selectedValue = data.tag;
        this.$filterElement.find('.selected-value').html($(selectedOptionElement).find('span:eq(0)').html());
    },

    isCollapsed : function(){
        return this.$dropDownElement.hasClass('expanded');
    },

    setDefaults : function(){
        this.$dropDownElement.find('li:first').trigger('click');
    }
});

var AgendaFilterControllerForMobile

(function($, window, undefined){
    "use strict";

    AgendaFilterControllerForMobile = klass(function(filterElement){
//        this.timer = null;
//        this.TIMEOUT_NO_USERINPUT_MILLISECONDS = 6000;

        this.UI = {
            $filterElement : $(filterElement),
            $filterListContainerElement : $(filterElement).find('.filter-list-container'),
            $filterOptionListElement : $(filterElement).find('.filter-list'),
            $agendaElement : $('#agenda')
        };
        this.expanded = false;
    }).methods({

        init : function(){
            var me = this;

            me.UI.$filterElement.click(function(e){
                me._agendaFilterButtonClickEventHandler(e);
            });

            me.UI.$filterOptionListElement.find('li').click(function(e){
                me._filterOptionClickEventHandler(e);
            });

            me.UI.$filterListContainerElement.insertBefore(me.UI.$agendaElement).hide();
        },

        _agendaFilterButtonClickEventHandler : function(e){
            var me = this;

            if(!me.UI.$filterListContainerElement.hasClass('expanded')){
                me.showFilterList();
            }else{
                me.hideFilterList();
            }
        },

        _filterOptionClickEventHandler : function(e){
            e.stopPropagation();
//            this._wait();
            var me = this;
            me.UI.$filterOptionListElement.find('li.selected').not(e.target).removeClass('selected');
            $(e.target).toggleClass('selected');
            $(this).trigger('filterchange', {filters : me.getSelectedFilters()});
            //this.getSelectedFilters();
        },
//
//        _wait : function(){
//            var me = this;
//            me.cancelTimer();
//
//            me.timer = $.timer(me.TIMEOUT_NO_USERINPUT_MILLISECONDS);
//
//            $(me.timer).bind('onComplete', function(e){
//                me._timerCompleteEventHandler(e);
//            });
//
//            me.timer.start();
//        },
//
//        _timerCompleteEventHandler : function(e){
//            var me = this;
//            me.timer = null;
//            me.hideFilterList();
//        },

        showFilterList : function(){
            var me = this;
            me.UI.$agendaElement.slideUp();
            me.UI.$filterListContainerElement.slideDown().addClass('expanded');
        },

        hideFilterList : function(){
            var me = this;

            if(me.UI.$filterListContainerElement.hasClass('expanded')){
                 me.UI.$agendaElement.slideDown();

                 me.UI.$filterListContainerElement.slideUp(function(){
                    $(this).removeClass('expanded');
                    $(me).trigger('filtercollapsed', {filters : me.getSelectedFilters()});
                });
            }
        },

        getSelectedFilters : function(){
            var filterTags = [];

            this.UI.$filterOptionListElement.find('li.selected').each(function(){
                var data = $(this).dataSet()[0];
                filterTags.push(data.tag);
            });

            return filterTags;
        },

        setDefaults : function(){
            var me = this;
//            me.cancelTimer();
            me.UI.$filterListContainerElement.removeClass('expanded').hide();
            me.UI.$filterOptionListElement.find('li.selected').removeClass('selected');
            me.UI.$filterElement.trigger('filterchange', {filters : me.getSelectedFilters()});
        },

//        cancelTimer : function(){
//            if(this.timer != null){
//                this.timer.cancel();
//                this.timer = null;
//            }
//        },

        getTotalFilterCount : function(){
            var me = this;

            return me.UI.$filterOptionListElement.find('li').length;
        },

        isExpanded : function(){
            return this.UI.$filterListContainerElement.hasClass('expanded');
        }
    });
})(jQuery, window, void 0);


/**
 *  -- Notes --
 *  To reduce redundancy by repeatedly using the same css-selectors in the script we use CSS_SELECTORS and the property UI.
 *  This however has only been partially implemented because this was done halfway the project.  This is good to know if you want to
 *  make changes.
 *
 *  Dates were an issue here.  We parse ISO-datestrings from the events and use the timestamps to configure the datepicker and the spinner.
 *  The browser however, interprets the timestamps as local time also takes daylightsavingstime in to consideration.  Eventhough we use
 *  an offset time (GMT+1) in our iso-time, it still becomes GMT+2 if it's summer on the clientside. If the clock on the client is off, the date will become
 *  even more exotic.  We don't want that.  We want for example 2013-04-23T23:30 to always be 2013-04-23T23:30.  No matter what the time on the client is
 *  and no matter what part of the world the client is located.
 *  That's why we work with UTC time where 23:30 is always 23:30, no matter what the time on the client is set to.
 *  So we are displaying times in Amsterdam-time but as UTC/Zulu time.
 **/

var CSS_SELECTORS = {
    agenda : '#agenda',
    allMonths : '#agenda .month',
    month : '.month',
    week : '.week',
    allWeeks : '#agenda .week',
    allEvents : '#agenda .event',
    event : '.event',
    agendaNavButtonFull : '.agenda-nav-button-full',
    agendaNavButton : '.agenda-nav-button',
    eventDatePicker : '#event-date-picker',
    datePickerWidget : '#event-date',
    spinningWheel : '#sw-wrapper'
};

var AgendaPageController;

(function($, window, undefined){
    "use strict";

    window.AgendaPageController = ResponsiveViewControllerAbstract.extend(function AgendaPageController(settings, mediaPlayerController){
        this.settings = settings;
        this.mediaPlayerController = mediaPlayerController;
        this.agendaScrollPane = null;
        this.agendaFilterController = null;
        this.eventCarouselController = null;
        this.mobileView = false;
        this.agendaPageControllerForMobile = null;
        this.mobileDevice = $(document.body).hasClass('mobile-device');
        this.UI = $.extend(this.UI, {
            $headerContainer : $('#headercontainer'),
            $agenda : $(CSS_SELECTORS.agenda),
            $agendaFilter : $('#agenda-filter'),
            $agendaMonthNav : $('#agenda-nav a').not('.archive'),
            $agendaNextPrevNavFull : $(CSS_SELECTORS.agendaNavButtonFull),
            $agendaNextPrevNav : $(CSS_SELECTORS.agendaNavButton),
            $dummyMonth :  $('#agenda .month.dummy'),
            $eventCarousel : $('#event-carousel'),
            $events : $(CSS_SELECTORS.allEvents),
            $months : $(CSS_SELECTORS.allMonths),
            $musicPlayer : $('#jp_container_1'),
            $scrollContent : $('#agenda .scroll-content'),
            $tabs : $('#tabs'),
            $weeks : $(CSS_SELECTORS.allWeeks),
            $verderButton : $('#agenda-nav .last'),
            $splashScreen : $('#splash-screen')
        });
    }).methods({
        init : function(){
            var me = this;

            me.UI.$agendaNextPrevNavFull.click(function(e){
                me._agendaNextPrevNavButtonClickEventHandler(e, this);
            });

            me.UI.$agendaMonthNav.click(function(e){
                me._agendaNavLinkClickEventHandler(e);
            });

            $(document.body).click(function(e){
                me._documentMouseClickEventHandler(e);
            });

            me.UI.$events.removeClass('hover'); // iOS Safari iPod is persistent - event-anchors still have .hover-class on reload page if they were clicked previously

            me.supr();
        },

        _configTabPanel : function(){
            var me = this;

            me.UI.$tabs.tabs({activate : function(e, ui){
                me._onTabActivateHandler(e, ui);
            }});
        },

        _configEventElement : function(eventElement, index, $monthElement){
            var me = this;

            if(!this.mobileDevice){
                $(eventElement).find('.eventinfo .description:eq(0)').clone().insertAfter($(eventElement).find('div.artist'));
                this._setEventElementHeight(eventElement);
                var marqueeElement = $(eventElement).find('.ticket-link-container .marquee:eq(0)');
                var marquee = null;

                if(marqueeElement.length > 0){
                    marquee = new Marquee(marqueeElement);
                    marquee.autoStart = false;
                    $(marqueeElement).data('marquee', marquee);
                }else{
                    marqueeElement = null;
                }

                $(eventElement).mouseover(function(e){
                    me._agendaItemMouseOverEventHandler(e, marqueeElement, eventElement);
                }).mouseleave(function(e){
                    me._agendaItemMouseLeaveEventHandler(e, marqueeElement, eventElement);
                });
            }

            $(eventElement).find('.event-link').click(function(e){
                me._eventAnchorClickEventHandler(e, eventElement, index, $monthElement);
            });
        },

        _configEventDatePicker : function(){
            var me = this;
            var agendaHelper = $.agendaHelper();

            $(CSS_SELECTORS.eventDatePicker).click(function(e){
                me._datePickerAnchorClickEventHandler(e);
            });

            var eventDates = agendaHelper.getEventDatesFromAgenda();
            var dateUtils = $.dateUtils();
            var config = {
                monthNames : dateUtils.getMonthNamesForLanguage(LANGUAGE),
                dayNames : dateUtils.getDayNamesForLanguage(LANGUAGE),
                dayNamesShort : dateUtils.getDayNamesForLanguage(LANGUAGE, 3),
                dayNamesMin : dateUtils.getDayNamesForLanguage(LANGUAGE, 2),
                onSelect : function(dateText, params){
                    me._datePickerDateSelectEventHandler(dateText, params);
                }
            };

            // put sunday as the first day of the week rather than the last
            config.dayNames.splice(0, 0, config.dayNames.pop());
            config.dayNamesShort.splice(0, 0, config.dayNamesShort.pop());
            config.dayNamesMin.splice(0, 0, config.dayNamesMin.pop());

            if(eventDates.length > 1){
                config.defaultDate = config.minDate = new Date(eventDates[0]);
                config.maxDate = new Date(eventDates.pop());
            }

            $(CSS_SELECTORS.datePickerWidget).datepicker(config).click(function(e){
                me._eventDatePickerWidgetClickEventHandler(e);
            });
        },

        _eventAnchorClickEventHandler : function(e, eventElement, index, $monthElement){
            this.UI.$events.removeClass('hover');
            var playButtonClicked = $(e.originalEvent.target).hasClass('player-play-button');

            if(playButtonClicked){
                 return this._eventPlayButtonClickEventHandler(e, eventElement, index);
            }

            if($(eventElement).hasClass('disabled')){console.info('preventDefault');
                e.preventDefault();
            }
        },

        _eventPlayButtonClickEventHandler : function(e, eventElement, index){
            e.stopPropagation();
            e.preventDefault();

            this.currentTrackIndex = index;

            try{
                this.mediaPlayerController.playSongForEventElement($(eventElement));
            }catch(error){
                if(this.settings.debug){
                    console.info(error);
                }
            }
        },

        _datePickerAnchorClickEventHandler : function(e){
            e.stopPropagation();
            $(CSS_SELECTORS.datePickerWidget).hasClass('active') ? this._hideDatePicker() : $(CSS_SELECTORS.datePickerWidget).addClass('active').fadeIn();
        },

        _datePickerDateSelectEventHandler : function(dateString, params){
            var date = new Date(dateString);
            this._hideDatePicker();
            this._handleDateSelection(date);
        },

        _handleDateSelection : function(date){
            var monthElements = $(CSS_SELECTORS.allMonths);
            var agendaHelper = $.agendaHelper();
            agendaHelper.unhighlightAllEvents();  // remove all previous highlights (if any)

            agendaHelper.highlightEventsByDate(date);

            var isNoEventsHighlighted = this.UI.$events.filter(function(){return $(this).hasClass('highlight');}).length == 0;

            if(isNoEventsHighlighted){
                agendaHelper.highlightClosestEvents(date);
            }

            var i = -1;

            // find the first month-element with highlighted events, this is the one we want to scroll to.
            $(monthElements).each(function(index){
                if($(this).find('.highlight').length > 0 && i == -1){
                    i = index;

                    return;
                }
            });

            var isMonthElementsWithHighlightedEventsFound = i > -1;

            if(isMonthElementsWithHighlightedEventsFound != null){
                this.scrollAgendaToMonthElement(monthElements[i]);
            }
        },

        _eventDatePickerWidgetClickEventHandler : function(e){
            e.stopPropagation();    // stop the event from propagating to _documentMouseClickEventHandler (we are clicking in the datepicker and not outside it)
        },

        _documentMouseClickEventHandler : function(e){
            if($(CSS_SELECTORS.datePickerWidget).hasClass('active')){
                this._hideDatePicker();
            }
        },

        _windowResizeCompleteEventHandler : function(e){
            if(this.isScreenView()){
                this._setScrollContentWidth();
            }
        },

        _hideDatePicker : function(){
            $(CSS_SELECTORS.datePickerWidget).removeClass('active').fadeOut();
        },

        _onTabActivateHandler : function(e, ui){     // update the scroller on the selected tab when it turns visible and aquired width and height
            if(this.isScreenView()){
                $(ui.newPanel).scroller('update');
            }
        },

        _configAgendaFilter : function(){            // create the controller for the agenda-filter in 'normal' view
            var me = this;
            this.agendaFilterController = new AgendaFilterController(me.UI.$agendaFilter);

            $(me.agendaFilterController).bind('selectionchange', function(e, params){
                me._agendaFilterChangeEventHandler(e, params);
            });

            this.agendaFilterController.init();
        },

        _configEventCarousel : function(){           // create the image-carousel in left top corner
            var me = this;
            me.UI.$eventCarousel.carousel();
            me.eventCarouselController = me.UI.$eventCarousel.data('plugin_carousel');

            $(me.eventCarouselController).bind('rotateStart', function(e, params){
                me._carouselRotateEventHandler(e, params);
            });
        },

        _setEventElementHeight : function(element){ // fixate the height for a event-element to prevent problems with hovering (items shown on hover can cause element to expand or contract)
            var descriptionElement = $(element).find('.description:eq(0)');
            var artistElement = $(element).find('.artist:eq(0)');
            var height = 0;

            if(!this.isMobileView()){   // normal view : fixate height to prevent 'height-flickering' on hover
                var artistElementHeight = $(artistElement).get(0).offsetHeight;
                var descriptionElementHeight = descriptionElement.length > 0 ? (descriptionElement).get(0).offsetHeight : 0;

                if(descriptionElement.length > 0){
                    $(descriptionElement).show();                                           // show element for it to aquire height
                    descriptionElementHeight = $(descriptionElement).get(0).offsetHeight;   // get height
                    $(descriptionElement).hide();                                           // hide it again
                }

                height = descriptionElementHeight > artistElementHeight ? descriptionElementHeight : artistElementHeight;
                var ticketLinkContainer = $(element).find('.ticket-link-container');
                $(element).find('a.event-link').add(ticketLinkContainer).css('height', height + 'px');
            }
        },

        _setMonthElementsHeight : function(){    // adds an extra element to the bottom of each month-div to create month-elements with an evenly distributed height.
            var height,
            heights = [];

            this.UI.$months.each(function(){
                var contentHeight = 0;

                // each monthelement has a table-cell display so equal heights.  We need to get the height of the content.
                $(this).find('.week').each(function(){
                    contentHeight+= $(this).get(0).offsetHeight;
                });

                heights.push(contentHeight);
            });

            height = $.mathUtils().max(heights);

            this.UI.$months.each(function(){
                var contentHeight = 0;

                $(this).find('.week').each(function(){
                    contentHeight+= $(this).get(0).offsetHeight;
                });

                var h = height - contentHeight;
                $(this).find('.week:last .month-space-fill-element').height(h);
            });
        },

        /**
         *  Sets the width of the div containing the scrollable content of the agenda according to the current width of the agenda which is dependant on the size of our window.
         *  Seeing how this is a responsive view this width is dynamic and we constantly have to adjust it.  It has to be set to exactly the
         *  right width
         *
         */
        _setScrollContentWidth : function(){
            var me = this;

            if(this.isScreenView()){
                if(me.UI.$months.not('.dummy').length > 0){
                    var scrollerSize = me.UI.$agenda.scroller('getSize');
                    var $lastMonthElement = me.UI.$months.not(me.UI.$dummyMonth).filter(':last');
                    var spaceRequired = $lastMonthElement.dimensions()[0].xSpan * (me.UI.$months.not(me.UI.$dummyMonth).length - 1) + scrollerSize.x;
                    me.UI.$scrollContent.width(spaceRequired);
                    me.UI.$agenda.scroller('update');
                }
            }
        },

        // hook
        _screenViewRenderEventHandler : function(){ // called ONCE when screenview is detected.  We need this view and css to configure these items properly.
            var me = this;
            me._configTabPanel();
            me._configEventCarousel();

            me.UI.$months.each(function(){
                var $monthElement = $(this);

                 $monthElement.find(CSS_SELECTORS.event).each(function(index){
                    me._configEventElement(this, index, $monthElement);
                });
            });

            me._setMonthElementsHeight();
            me.mediaPlayerController.init();
            me._configEventDatePicker();
            me._configAgendaFilter();
            me._initEventBlocks();

            if(!me.mobileDevice){
                me._initializeEventTicketLinkMarquees();
            }

            me.UI.$splashScreen.delay(800).fadeOut(1000);
        },

        // hook
        _screenViewEnterEventHandler : function(isViewStateRendered){
            var me = this;
            $(document.body).addClass('screen-view');

            if(!isViewStateRendered && !this.mobileDevice){
                me.UI.$events.each(function(){
                        me._setEventElementHeight(this);
                    }
                );
            }

            me.UI.$musicPlayer.show();
            me._createAgendaScrollPane();
            me._createTabsScrollPanes();

            if(isViewStateRendered){
                if(me.UI.$months.length > 1){
                    var height = me.UI.$dummyMonth.find(CSS_SELECTORS.week).css('height');
                    me.UI.$dummyMonth.css({width :'1000px', height : parseInt(height) + 'px'});

                     // now the scrollpane has been rendered we can set the height of our next/prev buttons.  We show it first to get the height and set opacity to 0 temporarily to prevent flickering as it is show an hidden again.
                    var monthHeight = me.UI.$months.eq(0).find(CSS_SELECTORS.week).get(0).offsetHeight;
                    me.UI.$agendaNextPrevNavFull.height(monthHeight).css('opacity', 0).show().each(function(){
                        var height = $(this).get(0).offsetHeight;
                        var nextPrevNavButtonHeight = $(this).find(CSS_SELECTORS.agendaNavButton).get(0).offsetHeight;
                        var residualHeight = height - nextPrevNavButtonHeight;
                        var topHeight = me.settings.navButtonTop <= residualHeight ? me.settings.navButtonTop : residualHeight;
                        var bottomHeight = residualHeight - topHeight;
                        var $expandables = $(this).find('.expandable');
                        $expandables.eq(0).height(topHeight);
                        $expandables.eq(1).height(bottomHeight);
//                        $expandables.height(expandableHeight);
                        $(this).css('opacity', 1);
                    });
                }
            }

            me.UI.$agenda.scroller('update');
            me._setAgendaNextPrevNavButtonVisibility();
            me._setScrollContentWidth();

            if(isViewStateRendered){
                var browserUtils = $.browserUtils();
                if(browserUtils.cookieExists('eventTimestamp')){
                    var eventTimestamp = browserUtils.getCookie('eventTimestamp');
                    me._deleteAgendaCookie();

                    if(/^[0-9]+$/.test(eventTimestamp)){
                        var date = new Date();
                        date.setTime(eventTimestamp);
                        date = $.agendaHelper().toUtcDate(date);
//                        console.info('cookie found for date ' + date.toLocaleDateString());
                        me._handleDateSelection(date);
                    }
                }
            }
        },

        _createAgendaScrollPane : function(){
            if(this.agendaScrollPane == null){
                $(CSS_SELECTORS.allMonths).addClass('scroll-item');
                var monthsElements = this.UI.$months;
                var me = this;
                var options = {
                    scrollComplete : function(e, params){
                        me._scrollPaneScrollCompleteEventHandler(e, params)
                    },
                    snapSize : monthsElements.length > 0 ? $(monthsElements[0]).get(0).offsetWidth : 0,
                    useScrollbars : !me.mobileDevice,
                    useTouch : true
                };

                this.agendaScrollPane = me.UI.$agenda.scroller(options);
                this._setAgendaNextPrevNavButtonVisibility();
            }
        },

        // override
        _windowResizeEventHandler : function(){
            this.supr();
            this._setScrollContentWidth();
            this._setAgendaNextPrevNavButtonVisibility();
        },

        // hook
        _screenViewLeaveEventHandler : function(){
            var me = this;
            $(document.body).removeClass('screen-view');
            me.agendaFilterController.setDefaults();
            me.UI.$scrollContent.removeAttr('style');
            me._destroyAgendaScrollPane();
            me._destroyTabsScrollPanes();
            $.agendaHelper().unhighlightAllEvents();
            me._deleteAgendaCookie();
        },

        // hook
        _viewStateChangeEventHandler : function(){
            var me = this;
            me.setNavDisplay();
        },

        _deleteAgendaCookie : function(){
            $.browserUtils().deleteCookie('eventTimestamp');
        },

        _destroyAgendaScrollPane : function(){
            if(this.agendaScrollPane != null){
                var me = this;
                $(me.agendaScrollPane).unbind('scrollComplete');
                me.UI.$agenda.scroller('destroy');
                this.UI.$months.removeClass('scroll-item');
                this.agendaScrollPane = null;
            }
        },

        _createTabsScrollPanes : function(){
            var options = {useScrollbars : true, useTouch : true};

             this.UI.$tabs.find(".ui-tabs-panel").each(function(){
                $(this).scroller(options);
            });
        },

        _destroyTabsScrollPanes : function(){
            this.UI.$tabs.find(".ui-tabs-panel").each(function(){
                $(this).scroller('destroy');
            });
        },

        _scrollPaneScrollCompleteEventHandler : function(e, params){
            this._setAgendaNextPrevNavButtonVisibility();
        },

        _initializeEventTicketLinkMarquees : function(){
            $(CSS_SELECTORS.allEvents).each(function(){
                var marqueeElement = $(this).find('.ticket-marquee');

                if(marqueeElement.length == 1){
                    var dimensions = $(marqueeElement).dimensions()[0];
                    $(marqueeElement).height(dimensions.height);
                    var marquee = $(marqueeElement).data('marquee');
                    marquee.init();
                    marquee.hide();
                }
            });
        },

        /**
         * Initialize event blocks on homepage.
         *
         * @private
         */
        _initEventBlocks : function () {

            var self = this,
                $element = $('.banner-wrapper');

            if ( ! $element[0])
            {
                return;
            }

            var elementTop = $element.offset().top,
                $text = $element.find('.banner-text'),
                textOffset = $text.offset().top - elementTop;

            // Bind info click event
            $text.on("click", function (event)
            {
                event.preventDefault();
                event.stopPropagation();
                window.location.href = $(this).attr('href');
            });

            // Bind text up/down event
            $element.on('mouseenter mouseleave click', function(event)
            {
                if (event.type != 'mouseenter' || (event.type == 'mouseenter' && $.browserUtils().isDesktop()))
                {
                    self._toggleEventBlock(event, $(this), $element, textOffset);
                }
            });
        },

        /**
         * Toggles the text drawer in the event blocks on the homepage.
         * @param event
         * @param $block
         * @param $element
         * @param textOffset
         * @private
         */
        _toggleEventBlock: function (event, $block, $element, textOffset)
        {
            var $image = $block.find('.banner-image'),
                $text = $block.find('.banner-text'),
                elementHeight = $element.height(),
                speed = 200;

            if ($text.hasClass('text-up') && event.type != "mouseenter")
            {
                $text.animate({top: textOffset},speed).removeClass('text-up');
                $image.animate({opacity:1},speed).removeClass('img-up');
            }
            else if (event.type != 'mouseleave')
            {
                if (!$text.data('top'))
                {
                    // Get the height of the text element that needs to scroll into view
                    var height = $text.outerHeight(true) - (elementHeight - textOffset);
                    $text.data('top', textOffset - height);
                }
                $text.animate({top: $text.data('top')},speed).addClass('text-up');
                $image.animate({opacity:0.8},speed).addClass('img-up');
            }
        },

        _agendaNextPrevNavButtonClickEventHandler : function(e, element){
            this._deleteAgendaCookie();
            $.agendaHelper().unhighlightAllEvents();
            this.scrollAgendaToNextOrPreviousMonthElement($(element).hasClass('left'));
        },

        scrollAgendaToMonthElement : function(monthElement){
            var me = this;
            var left = $(monthElement).get(0).offsetLeft;
            me.UI.$agenda.scroller('scrollTo', left, 0, true, 500);
        },

        /**
        *  Scrolls the agenda to the next or previous monthElement
        */
        scrollAgendaToNextOrPreviousMonthElement : function(previous){
            var me = this,
            marginLeft = null,
            scrollXCurrent = this.UI.$agenda.scroller('getScrollX'),
            elements = me.UI.$months.not('.dummy'),
            offsetLeft = 0;
            var tolerance = 10;
            var element = null;
            var index = 0, i;

            if(previous){
                for(i = elements.length - 1; i >= 0; i-- ){
                    if(marginLeft == null){
                        offsetLeft = $(elements[i]).get(0).offsetLeft;

                        if(offsetLeft - scrollXCurrent < 0 - tolerance){index = i;
                            marginLeft = offsetLeft;
                            element = elements[i];
                        }
                    }
                }
            }else{
                for(i = 0; i < elements.length; i++ ){
                    if(marginLeft == null){
                        offsetLeft = $(elements[i]).get(0).offsetLeft;

                        if(offsetLeft - scrollXCurrent > 0 + tolerance){index = i;
                            marginLeft = offsetLeft;
                            element = elements[i];
                        }
                    }
                }
            }

            if(marginLeft != null){
                this.scrollAgendaToMonthElement(element);
            }
        },

        _setAgendaNextPrevNavButtonVisibility : function(){
            var me = this;

            if(me.UI.$months.length > 1 && me.isScreenView() && me.agendaScrollPane != null){
                var scrollX = me.UI.$agenda.scroller('getScrollX');
                var isNavButtonLeftRequired = $(CSS_SELECTORS.allMonths + ':first').get(0).offsetLeft - scrollX < 0;
                var isNavButtonRightRequired = me.UI.$months.not('.dummy').filter(function(){return $(this).get(0).offsetLeft - scrollX > 0;}).length > 0;
                isNavButtonLeftRequired ? me.UI.$agendaNextPrevNavFull.filter(':first').show() : me.UI.$agendaNextPrevNavFull.filter(':first').hide();
                isNavButtonRightRequired ? me.UI.$agendaNextPrevNavFull.filter(':last').show() : me.UI.$agendaNextPrevNavFull.filter(':last').hide();
            }else{
                me.UI.$agendaNextPrevNavFull.hide();
            }
        },

        _agendaNavLinkClickEventHandler : function(e){
            e.preventDefault();
            var monthElement;

            try{
                monthElement = this._getElementToScrollToForSelectedDateElement($(e.target));
            }catch(e){
                if(this.settings.debug){
                    console.info(e);
                }

                return;
            }

            this.scrollAgendaToMonthElement($(monthElement));
        },

        /**
        *  Determins what month-element to scroll to based on which button was clicked in the agenda navigation-menu ( 'vandaag/{month}/{month}/{month}/verder/archief' (header))
        */
        _getElementToScrollToForSelectedDateElement : function($selectedDateElement){
            var me = this;
            var agendaHelper = $.agendaHelper();
            var isSpecificMonthSelected = $selectedDateElement.hasClass('month');
            var monthIndex = null;
            var data;

            if(isSpecificMonthSelected){    // user selected a specific month, scroll to correponding month-element
                data = $selectedDateElement.dataSet()[0];
                monthIndex = data.monthIndex;
            }else{
                var isTodaySelected = $selectedDateElement.hasClass('today');
                var isLastSelected = $selectedDateElement.hasClass('last');

                if(isTodaySelected){    // navigate/scroll to current month-element and highlight events for today
                    monthIndex = (new Date()).getMonth();
                }else{
                    if(isLastSelected){
                          monthIndex = this._getMonthIndexForVerderButton();
                          monthIndex = monthIndex > -1 ? monthIndex : null;
                    }else{  // archive selected
                        throw 'Not implemented : get archive  in \'getElementToScrollToForSelectedDateElement\'';
                    }
                }
            }

            if(monthIndex != null){
                var elementsToScrollTo = agendaHelper.getMonthElementsForMonth(monthIndex);
                agendaHelper.unhighlightAllEvents();
                agendaHelper.highlightFirstEventOfMonth(monthIndex);

                if(elementsToScrollTo.length > 0){
                    return elementsToScrollTo[0];
                }
            }

            throw 'No element found in \'getElementToScrollToForSelectedDateElement\'';
        },

        _getMonthIndexForVerderButton : function(){
            if(undefined != this.UI.$verderButton.data('monthIndex')){
                return this.UI.$verderButton.data('monthIndex');
            }

            var agendaHelper = $.agendaHelper();
            var $lastMonthButton = this.UI.$verderButton.prev();
            var data = $lastMonthButton.dataSet()[0];
            var monthIndex = data.monthIndex;
            monthIndex++;
            monthIndex = monthIndex > 11 ? 0 : monthIndex;

            monthIndex = agendaHelper.getIndexForNextMonthElementWithEvents(monthIndex);

            // this is an expensive call in terms of memory so we store are value in the data attribute. for our next calls
            this.UI.$verderButton.data('monthIndex', monthIndex);

            return monthIndex;
        },

        _agendaItemMouseOverEventHandler : function(e, marqueeElement, eventElement){
            if(!$(eventElement).hasClass('disabled')){
                $(eventElement).addClass('hover');

                if(!this.isMobileView()){
                    if(marqueeElement != null){
                        $(marqueeElement).parent().next('a.tickets:eq(0)').hide();
                        var marquee = $(marqueeElement).data('marquee');
                        marquee.show();
                        marquee.start();
                    }

                    $(eventElement).find('.event-link .artist').hide();
                    $(eventElement).find('.event-link .description').show();
                }
            }
        },

        _agendaItemMouseLeaveEventHandler : function(e, marqueeElement, agendaItemElement){
            $(agendaItemElement).removeClass('hover');

            if(!this.isMobileView()){
                if(marqueeElement != null){
                    var marquee = $(marqueeElement).data('marquee');
                    marquee.stop();
                    marquee.hide();
                    $(marqueeElement).parent().next('a.tickets:eq(0)').show();
                }

                $(agendaItemElement).find('.event-link .description').hide();
                $(agendaItemElement).find('.event-link .artist').show();
            }
        },

        _agendaFilterChangeEventHandler : function(e, params){
            var eventElements = $(CSS_SELECTORS.allEvents);
            $(eventElements).removeClass('disabled');
            var isFilterSelected = params.value != params.defaultValue;

            if(isFilterSelected){
                $(eventElements).not('.' + params.value).addClass('disabled');
            }
        },

        _carouselRotateEventHandler : function(e, params){
            var $descriptionsListElement = $('#event-descriptions-container ul');
            var $firstChildElement = $descriptionsListElement.children(':eq(0)');

            if($firstChildElement.length == 1){
                var height = $firstChildElement.data('height');
                height = isNaN(height) ? $firstChildElement.get(0).offsetHeight : height;
                $firstChildElement.data('height', height);

                $firstChildElement.animate({marginTop : -height + 'px'}, params.options.duration, function(){
                    $firstChildElement.appendTo($descriptionsListElement).hide().css('margin-top', 0).fadeIn();
                });
            }
        },

        setNavDisplay : function(){
            this.isMobileView() ? this.UI.$agendaNextPrevNavFull.hide() : this.UI.$agendaNextPrevNavFull.show();
        }
    });
})(jQuery, window, void 0);

var AgendaPageControllerForMobile;

(function($, window, undefined){
    "use strict";

    AgendaPageControllerForMobile = ResponsiveViewControllerAbstract.extend(function AgendaPageControllerForMobile(settings, mediaPlayerController){
        this.settings = settings;
        this.mediaPlayerController = mediaPlayerController;
        this.agendaFilterControllerForMobile = null;
        this.dateUtils = $.dateUtils();
        this.monthIndices = [];
        this.dayMonthIndices = [];
        this.selectedDate = null;
        this.UI = $.extend(this.UI, {
            $headerContainer : $('#headercontainer'),
            $agenda : $('#agenda'),
            $agendaFilterMobile : $('#agenda-filter-mobile'),
            $musicPlayerControls : $('#jp_container_1'),
            $musicPlayer : $('#jquery_jplayer_1'),
            $events : $('.event'),
            $days : $('.day'),
            $dayLabels : $('.daydate'),
            $socialToggleLink : $('#toggleLink'),
            $socialMenuContainer : $('.toggledDiv'),
            $socialMenu : $('#social'),
            $mainMenu : $('#nav'),
            $splashScreen : $('#splash-screen')
        });
        this.musicPlayerHeight = 0;
        this.socialMenuHeight = 0;
        this.headerContainerInitialHeight = 0;
    }).methods({

        init : function(){
            var me = this;
            $('.event.canceled').removeClass('canceled');
            me.UI.$events.each(function(index, obj){
                me._configEventElement(this);
            });

            me.UI.$musicPlayerControls.find('.close').click(function(e){
                me._musicPlayerCollapseButtonClickEventHandler(e);
            });

            me.UI.$socialToggleLink.click(function(e){
                me._socialToggleLinkClickEventHandler(e);
            });

            me.supr();
        },

        _configEventElement : function(eventElement){
            var me = this;

            $(eventElement).find('a.event-link').each(function(index){
                $(this).click(function(e){
                    me._eventLinkClickEventHandler(e, eventElement, index);
                });
            });

            $(eventElement).find('a.music').click(function(e){
                me._musicPlayButtonClickEventHandler(e, eventElement);
            });
        },

        _eventLinkClickEventHandler : function(e, eventElement, index){
            var me = this;

            if(this.isMobileView()){        // mobile view
                e.preventDefault();         // prevent anchor-default, we want to stay on this page

                me.UI.$events.removeClass('selected');
                var eventInfoElement = $(eventElement).find('.eventinfo');
                var itemsToCollapse = $('.eventinfo.expanded');

                if($(eventInfoElement).hasClass('expanded')){
                    me.eventSelectedIndex = -1;
                    $(itemsToCollapse).slideUp().removeClass('expanded');
                }else{  // show event-info
                    $(eventElement).addClass('selected');
                    $(eventInfoElement).addClass('expanded');
                    me.eventSelectedIndex = index;
                    var date = $.agendaHelper().getEventDateFromEventElement(eventElement);

                    if($(itemsToCollapse).length > 0){
                        $(itemsToCollapse).slideUp().removeClass('expanded', function(){
                            $(eventInfoElement).slideDown();
                        });
                    }else{
                        $(eventInfoElement).slideDown();
                    }

                    me._spinWheelToDate(date);
                }
            }
        },

        _musicPlayButtonClickEventHandler : function(e, eventElement){
            e.preventDefault();
            var me = this;

            try{
                this.mediaPlayerController.playSongForEventElement($(eventElement));
                me._showMusicPlayer();
            }catch(error){
                if(this.settings.debug){
                    console.info(error);
                }
            }
        },

        _musicPlayerCollapseButtonClickEventHandler : function(e){
            this._hideMusicPlayer();
        },

        _socialToggleLinkClickEventHandler : function(e){
            var me = this;
            var agendaMarginTop = parseFloat(this.UI.$agenda.css('margin-top'));
            var scrollTop = me._getDocumentScrollTop();

            if(this.UI.$socialMenuContainer.hasClass('expanded')){
                agendaMarginTop -= this.socialMenuHeight;
                this.UI.$socialMenuContainer.removeClass('expanded').slideUp(me._getAgendaMarginTopUpdateParams(scrollTop));
            }else{
                agendaMarginTop += this.socialMenuHeight;
                this.UI.$socialMenuContainer.addClass('expanded').slideDown(me._getAgendaMarginTopUpdateParams(scrollTop));
            }
        },

        _getDocumentScrollTop : function(){
            var scrollTop = $('html').scrollTop();
            scrollTop = isNaN(scrollTop) || scrollTop == 0 ? $('body').scrollTop() : scrollTop;
            scrollTop = isNaN(scrollTop) ? 0 : parseFloat(scrollTop);

            return scrollTop;
        },

        _getAgendaMarginTopUpdateParams : function(scrollTop){
            var me = this;

            return {duration : 500, progress : function(){me._socialMediaContainerAnimateProgressEventHandler(scrollTop);}, complete : function(){
                    me._setAgendaMarginTop();
//                    me.UI.$agenda.scrollTop(scrollTop);
                }};
        },

        _socialMediaContainerAnimateProgressEventHandler : function(scrollTop){
            this._setAgendaMarginTop();
            $('html, body').scrollTop(scrollTop);
        },

        _showMusicPlayer : function(){
            var me = this;
            var scrollTop = me._getDocumentScrollTop();

            me.UI.$musicPlayerControls.slideDown(me._getAgendaMarginTopUpdateParams(scrollTop));
        },

        _hideMusicPlayer : function(){
            var me = this;

            var args = {
                duration : 1000,
                progress : function(){
                    me._setAgendaMarginTop();
                },
                complete : function(){
                    me._setAgendaMarginTop();
                }
            };

            me.mediaPlayerController.stop();
            me.UI.$musicPlayerControls.slideUp(args);
        },

        // hook
        _mobileViewRenderEventHandler : function(){
            var me = this;
            me.UI.$splashScreen.css('margin-top', (me.UI.$mainMenu.get(0).offsetTop + me.UI.$mainMenu.get(0).offsetHeight) + 'px');
            me.mediaPlayerController.init();
            me.musicPlayerHeight = this.UI.$musicPlayerControls.dimensions()[0].ySpan;
            me.socialMenuHeight = parseFloat($('.toggledDiv').css('height'));
            me.headerContainerInitialHeight = this.UI.$headerContainer.get(0).offsetHeight;
            me._configMobileViewAgendaFilter();
            me._configSpinningWheel();
            $(window).on('touchstart', function(e){
                if(me.isMobileView()){
                    if($(e.originalEvent.target).hasClass('window')){
                        e.preventDefault();
                    }
                }
            });

            me.UI.$splashScreen.delay(600).fadeOut(1000);
        },

        // hook
        _mobileViewEnterEventHandler : function(isViewStateRendered){
            var me = this;
            $(document.body).addClass('mobile-view');
            var musicPaused = this.mediaPlayerController.isPaused();
            musicPaused ? me.UI.$musicPlayerControls.hide() : me.UI.$musicPlayerControls.show();
            me._setAgendaMarginTop();

            me.UI.$events.each(function(){
                var ticketLinkContainer = $(this).find('.ticket-link-container');
                $(this).find('a.event-link').add(ticketLinkContainer).css('height', 'auto');
            });
        },

        // hook
        _mobileViewLeaveEventHandler : function(){
            $(document.body).removeClass('mobile-view');
            this.agendaFilterControllerForMobile.setDefaults();
            this.UI.$dayLabels.removeAttr('style');
            this._setAgendaMarginTop();
            this.UI.$events.show().find('.eventinfo.expanded').removeClass('expanded').removeAttr('style');
            this.UI.$agenda.show();
        },

        // sets the appropriate margin-top for the agenda so that it sits nicely underneath the fixed header
        _setAgendaMarginTop : function(){
            var me = this;
            var marginTop = 0;

            if(me.isMobileView()){//console.info('setting margin top');
                marginTop = me._calculateMarginTop();
            }

            me.UI.$agenda.add('.filter-list-container').css({marginTop : marginTop + 'px'});
        },

        _calculateMarginTop : function(){
            var marginTop = 0;
            marginTop = this.UI.$headerContainer.get(0).offsetHeight + this.UI.$musicPlayerControls.dimensions()[0].ySpan + $('.player').dimensions()[0].borderWidth.bottom - this.headerContainerInitialHeight; //console.info('headerContainerInitialHeight : '+ this.headerContainerInitialHeight);
            marginTop-= this.UI.$musicPlayerControls.css('display') == 'block' ? $('.player').dimensions()[0].borderWidth.bottom : 0;

            return marginTop;
        },

        _configMobileViewAgendaFilter : function(){            // create the controller for the agenda-filter in mobile view
            var me = this;
            this.agendaFilterControllerForMobile = new AgendaFilterControllerForMobile(me.UI.$agendaFilterMobile);

            $(me.agendaFilterControllerForMobile).bind('filterchange', function(e, params){
                me._agendaFilterControllerForMobileSelectionChangeEventHandler(e, params);
            }).bind('filtercollapsed', function(e, params){
                me._filterCollapsedEventHandler(e, params);
            });

            this.agendaFilterControllerForMobile.init();
        },

        _agendaFilterControllerForMobileSelectionChangeEventHandler : function(e, params){
            this._toggleAgendaItemsForFilters(params.filters);
            this._configSpinningWheel();
            this.agendaFilterControllerForMobile.hideFilterList();
        },

        _filterCollapsedEventHandler : function(e, params){
            if(this.UI.$events.filter(':visible').length > 0){
                $(CSS_SELECTORS.spinningWheel).spinningWheels('spinWheelTo', 0, 0, true);
            }
        },

        _toggleAgendaItemsForFilters : function(filters){
            var me = this;

            if(filters.length == 0){    // show everything
                $(CSS_SELECTORS.allEvents).show();
            }else{  // only show items which have a css-class that matches one of the filters.
                $(CSS_SELECTORS.allEvents).each(function(index, eventElement){
                    var show = false;

                    $(filters).each(function(tagIndex, tag){
                        if($(eventElement).hasClass(tag)){
                            show = true;
                        }
                    });

                    show ? $(this).show():  $(this).hide();
                });
            }

            me._setDayLabelVisibility();
            me._setAgendaMarginTop();
        },

        _setDayLabelVisibility : function(){
            var me = this;

            me.UI.$days.each(function(){
                var $events =  $(this).find(CSS_SELECTORS.event);
                var $eventsHidden = $events.filter(function(){
                    return me._isEventHidden($(this));
                });
                var visibleEventsCount = $events.length - $eventsHidden.length;
                (visibleEventsCount > 0) ? $(this).find('.daydate').show() : $(this).find('.daydate').hide();
            });
        },

        _isEventHidden : function($eventElement){
            return $eventElement.css('display') == 'none';
        },

//        _configSpinningWheel : function(){
//            var reconfigure = $(CSS_SELECTORS.spinningWheel).hasClass('data-spinning-wheel');
//            var me = this;
//            var dateUtils = $.dateUtils();
//            var daysHtml = [];
//            var monthsHtml = [];
//            this.monthIndices = [];
//            this.dayMonthIndices = [];
//            var eventDates = $.agendaHelper().getEventDatesFromAgenda(!reconfigure);
//            var abbreviatedDays = dateUtils.getDayNamesForLanguage(LANGUAGE, 2);
//            var abbreviatedMonths = dateUtils.getMonthNamesForLanguage(LANGUAGE, 3);
//
//            for(var i = 0; i < eventDates.length; i++){
//                var eventDate = new Date(eventDates[i]);
//                var dayIndex = eventDate.getDay() - 1;
//                var monthIndex = eventDate.getMonth();
//                var year = eventDate.getFullYear();
//
//                var monthHtml = "<div><span class='month-abbrev month-index' data-month-index='" + monthIndex + "' data-year='"+ year + "'></span><span>"+ abbreviatedMonths[monthIndex] + "</span></div>";
//
//                if(monthsHtml.indexOf(monthHtml) == -1){
//                    monthsHtml.push(monthHtml);
//                    this.monthIndices.push(monthIndex);
//                }
//
//                dayIndex = dayIndex < 0 ? 6 : dayIndex;
//                var html = "<div><span class='day-abbrev month-index' data-month-index='" + monthIndex + "' data-day='" + eventDate.getDate() + "' data-year='"+ year + "'></span><span>"+ abbreviatedDays[dayIndex] + " " + eventDate.getDate() + "</span></div>";
//
//                if(daysHtml.indexOf(html) == -1){
//                    daysHtml.push(html);
//                    this.dayMonthIndices.push(monthIndex);
//                }
//            }
//
//            var $spinningWheelsElement = $(CSS_SELECTORS.spinningWheel);
//
//            if(daysHtml.length < 3 || monthsHtml.length < 3){       //  Not enough values to fill spinner
//                if(daysHtml.length > 0 && monthsHtml.length > 0){   //  If we have at least one value to repeat we can fill our spinner
//                    var j = 0;
//
//                    while(daysHtml.length < 3){
//                        daysHtml.push(daysHtml[j]);
//                        j++;
//                    }
//
//                    j = 0;
//
//                    while(monthsHtml.length < 3){
//                        monthsHtml.push(monthsHtml[j]);
//                        j++;
//                    }
//                }
//            }
//
//            if(daysHtml.length > 2 && monthsHtml.length > 2){
//                $spinningWheelsElement.removeAttr('style');
//
//                if(reconfigure){
//                    $spinningWheelsElement.spinningWheels('setSlotValues', 0, monthsHtml);
//                    $spinningWheelsElement.spinningWheels('setSlotValues', 1, daysHtml);
//
//                    if(!me.agendaFilterControllerForMobile.isExpanded()){
//                        $spinningWheelsElement.spinningWheels('spinWheelTo', 1, 0, true);
//                    }
//                }else{
//                    var opts = {
//                        change : function(params){
//                            me._spinningWheelsChangeEventHandler.call(me, params);
//                        },
//                        manipulationStart : function(params){
//                            me._spinningWheelsManipulationStartEventHandler.call(me, params);
//                        },
//                        accelerator : 0.4,
//                        sensitivity : 0.9
//                    };
//
//                    $spinningWheelsElement.spinningWheels(opts);
//                    $spinningWheelsElement.spinningWheels('addSlot', monthsHtml, 'month');
//                    $spinningWheelsElement.spinningWheels('addSlot', daysHtml, 'day');
//
//                    $spinningWheelsElement.on('touchmove', function(e){
//                        e.preventDefault();
//                    });
//
//                    var browserUtils = $.browserUtils();
//
//                    if(browserUtils.cookieExists('eventTimestamp')){
//                        var eventTimestamp = browserUtils.getCookie('eventTimestamp');
//                        browserUtils.deleteCookie('eventTimestamp', '/');
//
//                        if(/^[0-9]+$/.test(eventTimestamp)){
//                            var date = new Date();
//                            date.setTime(eventTimestamp);
//                            date = $.agendaHelper().toUtcDate(date);
//                            me._spinWheelToDate(date);
//
//                            return;
//                        }
//                    }
//
//                    $spinningWheelsElement.spinningWheels('spinWheelTo', 1, 0, true);
//                }
//            }else{
//                $spinningWheelsElement.hide();
//            }
//        },

        _configSpinningWheel : function(){
            var reconfigure = $(CSS_SELECTORS.spinningWheel).hasClass('data-spinning-wheel');
            var me = this;
            var dateUtils = $.dateUtils();
            var daysHtml = [];
            var monthsHtml = [];
            this.monthIndices = [];
            this.dayMonthIndices = [];
            var eventDates = $.agendaHelper().getEventDatesFromAgenda(!reconfigure);
            var monthNames = dateUtils.getMonthNamesForLanguage(LANGUAGE);

            for(var i = 0; i < eventDates.length; i++){
                var eventDate = new Date(eventDates[i]);
                var dayIndex = eventDate.getDay() - 1;
                var monthIndex = eventDate.getMonth();
                var year = eventDate.getFullYear();

                var monthHtml = "<div><span class='month-abbrev month-index' data-month-index='" + monthIndex + "' data-year='"+ year + "' data-day='" + eventDate.getDate() + "'>"+ monthNames[monthIndex] + "</span><span class='full-year'>" + eventDate.getFullYear() + "</span></div>";

                if(this.monthIndices.indexOf(monthIndex) == -1){
                    monthsHtml.push(monthHtml);
                    this.monthIndices.push(monthIndex);
                }
            }

            var $spinningWheelsElement = $(CSS_SELECTORS.spinningWheel);

            if(monthsHtml.length < 3){       //  Not enough values to fill spinner
                if(monthsHtml.length > 0){   //  If we have at least one value to repeat we can fill our spinner
                    var j = 0;

                    while(monthsHtml.length < 3){
                        monthsHtml.push(monthsHtml[j]);
                        j++;
                    }
                }
            }

            if(monthsHtml.length > 2){
                $spinningWheelsElement.removeAttr('style');

                if(reconfigure){
                    $spinningWheelsElement.spinningWheels('setSlotValues', 0, monthsHtml);

                    if(!me.agendaFilterControllerForMobile.isExpanded()){
                        $spinningWheelsElement.spinningWheels('spinWheelTo', 0, 0, true);
                    }
                }else{
                    var opts = {
                        change : function(params){
                            me._spinningWheelsChangeEventHandler.call(me, params);
                        },
                        manipulationStart : function(params){
                            me._spinningWheelsManipulationStartEventHandler.call(me, params);
                        },
                        accelerator : 0.4,
                        sensitivity : 0.9
                    };

                    $spinningWheelsElement.spinningWheels(opts);
                    $spinningWheelsElement.spinningWheels('addSlot', monthsHtml, 'month');

                    $spinningWheelsElement.on('touchmove', function(e){
                        e.preventDefault();
                    });

                    var browserUtils = $.browserUtils();

                    if(browserUtils.cookieExists('eventTimestamp')){
                        var eventTimestamp = browserUtils.getCookie('eventTimestamp');
                        browserUtils.deleteCookie('eventTimestamp', '/');

                        if(/^[0-9]+$/.test(eventTimestamp)){
                            var date = new Date();
                            date.setTime(eventTimestamp);
                            date = $.agendaHelper().toUtcDate(date);
                            me._spinWheelToDate(date);

                            return;
                        }
                    }

                    $spinningWheelsElement.spinningWheels('spinWheelTo', 0, 0, true);
                }
            }else{
                $spinningWheelsElement.hide();
            }
        },

        _spinningWheelsManipulationStartEventHandler : function(params){
           this.UI.$events.removeClass('selected');
//           $('html, body').height($(window).height);
//           $('html, body, window').css('overflow', 'hidden');//alert($('body').css('overflow'));
        },

        _spinningWheelsChangeEventHandler : function(params){
            var me = this;
            var monthIndex = parseInt(params.ui.find('.month-index:eq(1)').dataSet()[0].monthIndex);
            var monthSlotValueIndexToSpinTo = me.monthIndices.indexOf(monthIndex);
            var currentSlotValueIndexDisplayed = parseInt($(CSS_SELECTORS.spinningWheel).spinningWheels('getSlotValueIndex', 1, 0));
            var shouldChange = currentSlotValueIndexDisplayed != parseInt(monthSlotValueIndexToSpinTo);
            var $itemsToCollapse = me.UI.$events.not('.selected').find('.eventinfo.expanded');

            if($itemsToCollapse.length > 0){
                $itemsToCollapse.slideUp(function(){
                    me.selectedDate = me._getSelectedDateFromDateSpinner();
                    me._scrollAgendaToEventForDate(me.selectedDate, params.uiTriggered);

                    if(shouldChange){
                        $(CSS_SELECTORS.spinningWheel).spinningWheels('spinWheelTo', 0, monthSlotValueIndexToSpinTo, params.uiTriggered);
                    }
                });
            }else{
                me.selectedDate = me._getSelectedDateFromDateSpinner();
//                me._scrollAgendaToEventForDate(me.selectedDate, params.uiTriggered);
                me._scrollAgendaToEventForDate(me.selectedDate, true);

                if(shouldChange){
                    $(CSS_SELECTORS.spinningWheel).spinningWheels('spinWheelTo', 0, monthSlotValueIndexToSpinTo, params.uiTriggered);
                }
            }
        },

//        _spinningWheelsChangeEventHandler : function(params){
//            var me = this;
//            var isDaysChanged = params.ui.hasClass('day');
//            var monthIndex = parseInt(params.ui.find('.month-index:eq(1)').dataSet()[0].monthIndex);
//            var monthSlotValueIndexToSpinTo;
//            var slotIndex = 1;
//
//            if(isDaysChanged){  // day changed (second slot), we have to match the month (slot 2) to this day
//                slotIndex = 0;
//                monthSlotValueIndexToSpinTo = me.monthIndices.indexOf(monthIndex);
//            }else{              // month changed (first slot)
//                if(!params.uiTriggered){    // means it wasn't changed by the user but by our script spinning the month to match the day
//                    return;
//                }
//
//                // still here, user changed to month so we have to change the day to match it
//                monthSlotValueIndexToSpinTo = me.dayMonthIndices.indexOf(monthIndex);
//            }
//
//            if(monthSlotValueIndexToSpinTo == -1){
//                if(this.settings.debug){
//                    alert('Error in datespinner, index == -1');
//                }
//
//                return;
//            }
//
//            var currentSlotValueIndexDisplayed = parseInt($(CSS_SELECTORS.spinningWheel).spinningWheels('getSlotValueIndex', 1, slotIndex));
//            var shouldChange = currentSlotValueIndexDisplayed != parseInt(monthSlotValueIndexToSpinTo);
//            var $itemsToCollapse = me.UI.$events.not('.selected').find('.eventinfo.expanded');
//
//            if($itemsToCollapse.length > 0){
//                $itemsToCollapse.slideUp(function(){
//                    me.selectedDate = me._getSelectedDateFromDateSpinner();
//                    me._scrollAgendaToEventForDate(me.selectedDate, params.uiTriggered);
//
//                    if(shouldChange){
//                        $(CSS_SELECTORS.spinningWheel).spinningWheels('spinWheelTo', slotIndex, monthSlotValueIndexToSpinTo, (params.uiTriggered && !isDaysChanged));
//                    }
//                });
//            }else{
//                me.selectedDate = me._getSelectedDateFromDateSpinner();
////                me._scrollAgendaToEventForDate(me.selectedDate, params.uiTriggered);
//                me._scrollAgendaToEventForDate(me.selectedDate, true);
//
//                if(shouldChange){
//                    $(CSS_SELECTORS.spinningWheel).spinningWheels('spinWheelTo', slotIndex, monthSlotValueIndexToSpinTo, (params.uiTriggered && !isDaysChanged));
//                }
//            }
//        },

        _spinWheelToDate : function(date){
            var monthIndex = date.getUTCMonth();
            var day = date.getUTCDate();
            var $spinningWheelsElement = $(CSS_SELECTORS.spinningWheel);
            var $slotElement = $spinningWheelsElement.spinningWheels('getSlot', 1);
            var slotValues = $spinningWheelsElement.spinningWheels('getSlotValues', $slotElement);

            for(var index in slotValues){
                var $span = $(slotValues[index]).find('.day-abbrev');
                var data = $span.dataSet()[0];

                if(monthIndex == parseInt(data.monthIndex) && day == parseInt(data.day)){
                    $spinningWheelsElement.spinningWheels('spinWheelTo', 1, index);

                    return;
                }
            }
        },

        _scrollAgendaToEventForDate : function(date, scrollToDateLabel){
            var me = this;
            var $eventElementMatched = $(CSS_SELECTORS.allEvents).filter('.selected');
            $eventElementMatched = $eventElementMatched.length > 0 ? $eventElementMatched : null;
            var agendaHelper = $.agendaHelper();

            if($eventElementMatched == null){
                var $eventElements = agendaHelper.getEventElementsByDate(date);
                $eventElements = $eventElements.length > 0 ? $eventElements : agendaHelper.getEventElementClosestToDate(date);

                if($eventElements.length > 0){
                    var $matches = $eventElements.filter(function(){
                        return !me._isEventHidden($(this));
                    });

                    $eventElementMatched = $matches.length > 0 ? $matches.eq(0) : null;
                }
            }

            if($eventElementMatched != null){
                var $element = scrollToDateLabel ? $eventElementMatched.parent().find('.daydate') : $eventElementMatched;

                if($element.length > 0){
                    me._scrollToElement($element);
                }
            }
        },

        _scrollToElement : function(element){
            var me = this;
            var isDayLabel = $(element).hasClass('daydate');

            var scrollTopAction = function(){
                var scrollTopCurrent = me._getDocumentScrollTop();
                var scrollTop = $(element).offset().top;
                scrollTop -= me.UI.$musicPlayerControls.dimensions()[0].ySpan;
                scrollTop -= ($('.player').offset().top + $('.player').get(0).offsetHeight - scrollTopCurrent);
                scrollTop += me.UI.$musicPlayerControls.css('display') == 'block' ? $('.player').dimensions()[0].borderWidth.bottom : 0;

                scrollTop = Math.round(scrollTop);

                if($.browserUtils().isWindowsPhone()){  // animation scrolltop on WP is buggy and window#scrollTo does a nice fluent animation on WP so we use this
                    scrollTop += 1;
                    window.scrollTo(0, scrollTop);
                }else{
                    if(scrollTop != scrollTopCurrent){
                        $('html, body').animate({scrollTop : scrollTop + 'px'}, {complete : function(){
                                if(isDayLabel){
                                    var width = parseFloat($(element).width());
                                    var textIndent = 8;
                                    var targetWidth = width + textIndent;
                                    $(element).animate({width : targetWidth + 'px', textIndent:  textIndent + 'px'}, {duration : 250, easing : 'easeOutQuad', complete : function(){
                                        $(this).animate({textIndent: 0, width : width + 'px'}, {duration : 250, easing : 'easeOutQuad'});
                                    }});
                                }
                        }});
                    }
                }
            };

             scrollTopAction();
        },

        _getSelectedDateFromDateSpinner : function(){
            var monthsSlot =  $(CSS_SELECTORS.spinningWheel).spinningWheels('getSlot', 0);
            var data = $(monthsSlot).find('.month-abbrev:eq(1)').dataSet()[0];
            var now = new Date();
            var date = new Date();
            date.setUTCFullYear(data.year, data.monthIndex, data.day);
            date.setUTCHours(0, 0, 0, 0);

            return date;
        }

//        _getSelectedDateFromDateSpinner : function(){
//            var daysSlot =  $(CSS_SELECTORS.spinningWheel).spinningWheels('getSlot', 1);
//            var data = $(daysSlot).find('.day-abbrev:eq(1)').dataSet()[0];
//            var now = new Date();
//            var date = new Date();
//            date.setUTCFullYear(data.year, data.monthIndex, data.day);
//            date.setUTCHours(0, 0, 0, 0);
//
//            return date;
//        }
    });
})(jQuery, window, void 0);

(function($){
   "use strict";

   var AgendaHelper = klass(function(){
       this.UI = {
           $agenda : $('#agenda'),
           $events : $('.event')
       };
    }).methods({

        getEventDatesFromAgenda : function(getAll){
            return this.getEventDatesFromElement(this.UI.$agenda, getAll);
        },

        // Parses all the event-dates from the event-elements nested in param element and returns them
        getEventDatesFromElement : function(element, getAll){
            getAll = getAll != null ? getAll : true;
            var me = this;
            var timeStamps = [];

            $(element).find(CSS_SELECTORS.event).each(function(){
                try{
                    if(getAll || (!getAll && $(this).css('display') != 'none')){
                        var timeStamp = me.getEventDateFromEventElement(this).getTime();
                        timeStamps.push(timeStamp);
                    }
                }catch(e){
//                    alert(e);
                }
            });

            timeStamps.sort(function(a, b){return a - b;});

            return timeStamps;
        },

        // Parses the event-date from the meta-element nested in the event-element and returns it
        getEventDateFromEventElement : function(eventElement){
            if($(eventElement).data('eventDate') !== undefined){
                return $(eventElement).data('eventDate');
            }

            var data = $(eventElement).dataSet()[0];

            if(isNaN(data.date)){
                 throw 'No eventdate provided in \'getEventDateFromEventElement\'';
            }

            var time = parseInt(data.date);

            var date = new Date(time);
            $(eventElement).data('eventDate', date);

            return date;
        },

        getMonthElementsForMonth : function(monthIndex){
            var monthElements =  $(CSS_SELECTORS.allMonths).not('.dummy');
            var monthElementsForMonthIndex = [];

            for(var i = 0;i < monthElements.length ; i++){
                var monthElement = monthElements[i];

                var startAndEndDate = this.getStartAndEndDateForMonthElement(monthElement);

                if(startAndEndDate.startDate.getMonth() == monthIndex){
                    monthElementsForMonthIndex.push(monthElement);
                }else{
                    if(this._startAndEndDateCoverMonth(startAndEndDate.startDate, startAndEndDate.endDate, monthIndex)){
                        var isMidnightBetweenMonths = startAndEndDate.endDate.getDate() == 1 && startAndEndDate.endDate.getHours() == 0;

                        if(!isMidnightBetweenMonths){
                            monthElementsForMonthIndex.push(monthElement);
                        }
                    }
                }
            }

            return monthElementsForMonthIndex;
        },

        // returns the monthElement that covers the provided date (if any)
        getMonthElementByDate : function(date){
            var me = this;
            var elements = $(CSS_SELECTORS.allMonths).not('.dummy').filter(function(){
                var startAndEndDate = me.getStartAndEndDateForMonthElement(this);

                return date.getTime() >= startAndEndDate.startDate.getTime() && date.getTime() <= startAndEndDate.endDate.getTime();
            });

            if(elements.length == 0){
                throw 'No month-element found for associated date in \'getMonthElementByDate \'';
            }

            return elements;
        },

        getEventElementsByDate : function (date){
            var me = this;
            var eventElements = []

            this.UI.$events.each(function(){
                var eventDate;

                try{
                    eventDate = me.getEventDateFromEventElement(this);
                }catch(e){
                    if(this.settings.debug){
                        alert(e);
                    }

                    return;
                }

                var isDayMatched = eventDate.getUTCMonth() == date.getUTCMonth() && eventDate.getUTCDate() == date.getUTCDate();

                if(isDayMatched){
                    eventElements.push(this);
                }
            });

            return $(eventElements);
        },

        getEventElementClosestToDate : function(date, $eventElements){
            var me = this;
            $eventElements = $eventElements != null ? $eventElements : me.UI.$events;
            var $closest = null;
            $eventElements.each(function(){
                var eventDate = me.getEventDateFromEventElement(this);
                var differenceBetweenEventDateAndDate = Math.abs(eventDate.getTime() - date.getTime());

                if($closest != null){
                    var closestEventDate = me.getEventDateFromEventElement($closest);
                    var differenceBetweenClosestEventDateAndDate = Math.abs(eventDate.getTime() - closestEventDate.getTime());

                    if(differenceBetweenEventDateAndDate < differenceBetweenClosestEventDateAndDate){
                        $closest = $(this);
                    }
                }else{
                    $closest = $(this);
                }
            });

            if($closest == null){
                throw 'No closest element found in \'getEventElementClosestToDate\'';
            }

            return $closest;
        },

        /**
         *  Returns an Object with the start- and enddate of a month-element.
         *  These dates are based on the first and last date of the events presented in the element.
         *  If only one event is present in the element the start- and endate will both be the event-date.
         *  If no events are present (which should not happen), getStartAndEndDateForMonthElement will try to determin the start- and enddate by
         *  according to the preceeding and following month-elements.  If this fails an exception will be thrown.
         *  @return Object
         *  @throws Exception
         */
        getStartAndEndDateForMonthElement : function(monthElement){    // getter with lazy data-assignment
            if($(monthElement).data('startDate') == undefined || $(monthElement).data('endDate') == undefined){
                var timeStamps = this.getEventDatesFromElement(monthElement);
                var startAndEndDates;

                if(timeStamps.length > 0){
                    var startDate = new Date(timeStamps[0]);
                    startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());   // reset to midnight
                    $(monthElement).data('startDate', startDate);

                    if(timeStamps.length > 1){
                        var endDate = new Date(timeStamps[timeStamps.length - 1]);
                        endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());   // reset to midnight
                        endDate = $.dateUtils().nextDay(endDate);
                        $(monthElement).data('endDate', endDate);
                    }else{
                        $(monthElement).data('endDate', $.dateUtils().nextDay($(monthElement).data('startDate')));
                    }
                }else{
                    if($(monthElement).prev('.month').length == 1){
                        startAndEndDates = this.getMonthElementStartAndEndDate($(monthElement).prev('.month'));
                        $(monthElement).data('startDate', startAndEndDates.endDate);
                    }

                    if($(monthElement).next('.month').length == 1){
                        startAndEndDates = this.getMonthElementStartAndEndDate($(monthElement).next('.month'));
                        $(monthElement).data('endDate', startAndEndDates.startDate);
                    }
                }
            }

            if(typeof $(monthElement).data('startDate') == 'undefined' || typeof $(monthElement).data('endDate') == 'undefined'){
                throw 'No start- and enddate could be determined for monthElement in \'getMonthElementStartAndEndDate\'';
            }

            startAndEndDates = {startDate : $(monthElement).data('startDate'), endDate : $(monthElement).data('endDate')};

            return startAndEndDates;
        },

        getMonthIndicesForMonthsWithEvents : function(){
            var timestamps = this.getEventDatesFromAgenda();
            var date = new Date();
            var monthIndices = [];

            for(var index in timestamps){
                date.setTime(timestamps[index]);

                if(monthIndices.indexOf(date.getMonth()) == -1){
                    monthIndices.push(date.getMonth());
                }
            }

            return monthIndices;
        },

        getIndexForNextMonthElementWithEvents : function(monthIndex){
            var monthIndices = this.getMonthIndicesForMonthsWithEvents();
            monthIndices.sort(function(a, b){return a - b;});
            var index = -1;

            for(var i = 0; i < monthIndices.length; i++){
                if(monthIndices[i] > monthIndex){
                    index = monthIndices[i];

                    break;
                }
            }

            return index;
        },

        _startAndEndDateCoverMonth : function (startDate, endDate, monthIndex){
            var endDateFallsinNextYear = startDate.getFullYear() < endDate.getFullYear();
            var startDatePreceedsOrIsEqualToMonth = (startDate.getMonth() <= monthIndex);
            var endDateExceedsOrIsEqualToMonth = (endDate.getMonth() >= monthIndex);

            return (startDatePreceedsOrIsEqualToMonth && endDateExceedsOrIsEqualToMonth) || (endDateFallsinNextYear && endDateExceedsOrIsEqualToMonth);
        },

        highlightFirstEventOfMonth : function(monthIndex){
            var me = this;
            var monthElements = $(CSS_SELECTORS.allMonths).not('.dummy');
            var highlighted = false;

            for(var i = 0; i < monthElements.length ; i++){
                var monthElement = monthElements[i];
                var startAndEndDate = this.getStartAndEndDateForMonthElement(monthElement);

                if(this._startAndEndDateCoverMonth(startAndEndDate.startDate, startAndEndDate.endDate, monthIndex)){
                    var eventElements = $(monthElement).find(CSS_SELECTORS.event);

                    for(var j = 0; j < eventElements.length ; j++){
                        var eventDate = null;
                        var eventElement = eventElements[j];

                        try{
                            eventDate = me.getEventDateFromEventElement(eventElement);
                        }catch(e){
                            continue;
                        }

                        if(eventDate != null && eventDate.getMonth() == monthIndex){
                            $(eventElement).addClass('highlight');
                            highlighted = true;

                            break;
                        }
                    }
                }

                if(highlighted){
                    return;
                }
            }
        },

        unhighlightAllEvents : function(){
            $(CSS_SELECTORS.allEvents).removeClass('highlight');
        },

        highlightEventsByDate : function(date){
            var me = this;
            var eventsHighlighted = false;

            for(var i = 0 ; i < me.UI.$events.length; i++){
                me.highlightEventByDate(date, me.UI.$events.eq(i));

                if(!eventsHighlighted ){
                    if(me.UI.$events.eq(i).hasClass('highlight')){
                        eventsHighlighted = true;
                    }
                }else{
                    if(!me.UI.$events.eq(i).hasClass('highlight')){ // no more items to highlight, return
                        return;
                    }
                }
            }
        },

        highlightEventByDate : function(date, eventElement){
            var me = this;
            var eventDate = null;

            try{
                eventDate = me.getEventDateFromEventElement(eventElement);
            }catch(e){
                // do nothing
            }

            if(eventDate != null){ // should be true, each event should have a date.
                var eventIsOnSelectedDate = date.getDate() == eventDate.getDate() && date.getMonth() == eventDate.getMonth() && date.getFullYear() == eventDate.getFullYear();

                if(eventIsOnSelectedDate){ // found an event for that date, highlight it
                    $(eventElement).addClass('highlight');
                }
            }
        },

        highlightClosestEvents : function(date){
            var me = this;
            var preceedingEvent = null;
            var followingEvent = null;
            var preceedingEventDate = null;
            var followingEventDate = null;
            var eventDate = null;

            $(CSS_SELECTORS.allEvents).each(function(){
                var event = this;

                try{
                    eventDate = me.getEventDateFromEventElement(event);
                }catch(e){//alert(e);
                    // do nothing
                }

                if(eventDate != null){ // should be true, each event should have a date.
                    eventDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());       // reset to midnight
                    var isPreceedingEvent = eventDate.getTime() < date.getTime();
                    var isFollowingEvent = eventDate.getTime() > date.getTime();

                    if(isPreceedingEvent){ // found an event for that date, highlight it
                        preceedingEvent = this;
                        preceedingEventDate = eventDate;
                    }

                    if(isFollowingEvent && followingEvent == null){ // found an event for that date, highlight it
                        followingEvent = this;
                        followingEventDate = eventDate;
                    }
                }
            });

            if(preceedingEvent != null){
                $(preceedingEvent).addClass('highlight');
                this.highlightEventsByDate(preceedingEventDate);
            }

            if(followingEvent != null){
                $(followingEvent).addClass('highlight');
                this.highlightEventsByDate(followingEventDate);
            }
        },

        toUtcDate : function(date){
            var dateUTC = new Date();
            dateUTC.setUTCFullYear(date.getFullYear(), date.getUTCMonth(), date.getUTCDate());
            dateUTC.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

            return dateUTC;
        },

        getTrackInfoFromTrackInfoElement : function($trackInfoElement){
            var me = this;
            var $eventElement = $trackInfoElement.parent().parent('.event');
            var bandDescription = $trackInfoElement.find('.artist:eq(0)').html();
            bandDescription = $.trim(bandDescription);
            var artist = $trackInfoElement.find('.artist:eq(0)').val();
            var eventDescription = $eventElement.find('.description:eq(0)').html();
            var eventDate = me.getEventDateFromEventElement($eventElement);
            var audioTitle = $trackInfoElement.find('.title:eq(0)').val();
            var audioSource = $trackInfoElement.find('.src:eq(0)').val();

            var trackInfo = {
                bandDescription : bandDescription,
                eventDescription : eventDescription,
                eventDate : eventDate,
                audioTitle : audioTitle,
                audioSource : audioSource,
                artist : artist
            };

            return trackInfo;
        },

        getTrackInfoFromEventElement : function(eventElement){
            var me = this;
            var $trackInfoElement = $(eventElement).find('.audio-track');

            if($trackInfoElement.length == 0){
                throw 'No audio element found for this event';
            }

            return this.getTrackInfoFromAudioElement($trackInfoElement);
        }
    });

    $.extend({agendaHelper : function(){
            return new AgendaHelper();
    }});
})(jQuery);

var MediaPlayerController;

(function($, window, undefined){
    "use strict";

    var defaultSettings = {
        maxSecondsPerTrackToPlay : 30,
        debug : false,
        relPathSwf : 'js/jsplayer-2.3.0',
        ready : null,
        trackInfo : null
    };

    window.MediaPlayerController = ResponsiveViewControllerAbstract.extend(function(settings){
        this.settings = $.extend({}, defaultSettings, settings);
        this.UI = $.extend(this.UI, {
            $events : $('#agenda .event'),
            $musicPlayer : $("#jquery_jplayer_1"),
            $eventDate : $('#jp_container_1 .track-event-date'),
            $bandDescription : $('#jp_container_1 .track-event-band-description'),
            $artistName : $('#jp_container_1 .track-artist'),
            $trackTitle : $('#jp_container_1 .track-title'),
            $audioInfoElements : $('div.audio-track'),
            $seekBar : $('.jp-seek-bar')
        });
        this.currentTrackIndex = 0;
        this.initialized = false;
        this.musicPlayerReady = false;
    }).methods({
        init : function(){
            if(!this.initialized){
                this.initialized = true;
                this._configJqueryPlayer();
            }

            this.supr();
        },

        _configJqueryPlayer : function(){
            var me = this;

            var config = {
                swfPath: me.settings.relPathSwf,
                supplied: 'mp3',
                wmode : 'window',
                solution : 'html, flash',
                errorAlerts : me.settings.debug
            };

            if(me.UI.$audioInfoElements.length > 0){  // load the song of the first event in the agenda to the mediaplayer.
                config.ready = function(){
                    me._musicPlayerReadyEventHandler();
                };

                config.ended = function(e){
                    me._jPlayerEndedEventHandler(e);
                };
            }

            if(this.settings.maxSecondsPerTrackToPlay > 0){
                config.timeupdate = function(e) {
                    me._jPlayerTimeUpdateEventHandler(e);
                };
            }

            me.UI.$musicPlayer.jPlayer(config);
            me._addCustomProgressBar();
        },

        _musicPlayerReadyEventHandler : function(){
            this.musicPlayerReady = true;

            if(typeof this.settings.ready == 'function'){
                this.settings.ready.call();
            }

            if(!this.isMobileView()){
                this._loadFirstAudioTrack();
            }
        },

        _loadFirstAudioTrack : function(){
            var me = this;

            try{
                var agendaHelper = $.agendaHelper();
                var trackInfo = agendaHelper.getTrackInfoFromTrackInfoElement(me.UI.$audioInfoElements.eq(0));
                this.setMediaForAudioPlayer(trackInfo);
            }catch(error){
                if(me.settings.debug){
                    console.info(error);
                }
            }
        },

        _addCustomProgressBar : function(){
            var me = this;
            me.UI.$seekBar.css('position', 'relative');
            var $progressBar = $("<div class='custom-progress-bar'></div>").appendTo(me.UI.$seekBar).css({backgroundColor : '#ff0000', height : '100%', width : 0, position : 'absolute', top : 0, left: 0});

            me.UI.$seekBar.click(function(e){
                me._customProgressBarClickEventHandler(e, $progressBar);
            }).find('.jp-play-bar').hide();
        },

        _jPlayerTimeUpdateEventHandler : function(e){
            var me = this;
            var trackLength = me._getTrackLength(e.jPlayer.status);
            me._setCustomProgressBarWidth(e.jPlayer.status.currentTime, trackLength);

            if (e.jPlayer.status.currentTime > me.settings.maxSecondsPerTrackToPlay) {
                me.stop();
                me.playNextTrack();
            }
        },

        _getTrackLength : function(jPlayerStatus){
            var me = this;
            jPlayerStatus = jPlayerStatus != undefined ? jPlayerStatus : me.UI.$musicPlayer.data().jPlayer.status;
            var trackLength = me.UI.$musicPlayer.data().jPlayer.status.duration;
            trackLength = trackLength < me.settings.maxSecondsPerTrackToPlay ? me.settings.maxSecondsPerTrackToPlay : trackLength

            return (trackLength > me.settings.maxSecondsPerTrackToPlay ? me.settings.maxSecondsPerTrackToPlay : trackLength);
        },

        _customProgressBarClickEventHandler : function(e, $customProgressBar){
            e.stopPropagation();
            var me = this;
            var maxWidth = me.UI.$seekBar.parent().get(0).offsetWidth;
            var xClicked = e.pageX - $customProgressBar.offset().left;
            var fraction = xClicked > 0 ? xClicked / maxWidth : 0;
            var trackLength = me._getTrackLength();
            var goToTime = fraction * trackLength;
            this.UI.$musicPlayer.jPlayer('play', goToTime);
        },

        _setCustomProgressBarWidth : function(timePlayed, trackLength){
            var me = this;
            var fraction = timePlayed > 0 ? timePlayed / trackLength : 0;
            var $customProgressBar = this.UI.$seekBar.find('.custom-progress-bar');
            var percentage = Math.round(fraction * 1000) / 10;
            percentage = percentage > 100 ? 100 : percentage;
            $customProgressBar.css('width', percentage +'%');
        },

        _windowResizeEventHandler : function(){
            if(this.isMobileView()){
                this._setCustomProgressBarMaxWidth();
            }

            this.supr();
        },

        // hook
        _screenViewEnterEventHandler : function(isViewStateRendered){
            var me = this;
            me._setCustomProgressBarMaxWidth();

            if(isViewStateRendered){
                if(me.UI.$audioInfoElements.length > 0){
                    if(me.musicPlayerReady){
                        me._loadFirstAudioTrack();
                    }
                }
            }
        },

        _setCustomProgressBarMaxWidth : function(){
            var me = this;
            var maxWidth = me.UI.$seekBar.parent().get(0).offsetWidth;
            var dimensions = me.UI.$seekBar.dimensions()[0];
            maxWidth -= (dimensions.borderWidth.left + dimensions.borderWidth.right);
            me.UI.$seekBar.find('.custom-progress-bar').css('max-width', maxWidth + 'px');

            return maxWidth;
        },

        _jPlayerEndedEventHandler : function(e){
            this.playNextTrack();
        },

        playNextTrack : function(){
            var me = this;
            me.currentTrackIndex ++;
            me.currentTrackIndex = me.currentTrackIndex == me.UI.$audioInfoElements.length ? 0 : me.currentTrackIndex;
            me.playSongForAudioElement(me.UI.$audioInfoElements.eq(me.currentTrackIndex));
        },

        playSongForEventElement : function($eventElement){
            var $trackInfoElement = $eventElement.find('div.audio-track');
            this.playSongForAudioElement($trackInfoElement);
        },

        playSongForAudioElement : function($trackInfoElement){
            this.currentTrackIndex = this.UI.$audioInfoElements.index($trackInfoElement);

            try{
                var trackInfo = $.agendaHelper().getTrackInfoFromTrackInfoElement($trackInfoElement);
                this.playSong(trackInfo);
            }catch(e){
                throw e;
            }
        },

        playSong : function(trackInfo){
            this._setCustomProgressBarWidth(0, 0);
            this.setMediaForAudioPlayer(trackInfo);
            this.UI.$musicPlayer.jPlayer('play');
        },

        setMediaForAudioPlayer : function(trackInfo){
            this.UI.$musicPlayer.jPlayer('clearMedia');
            var dateUtils = $.dateUtils();
            var dayNames = dateUtils.getDayNamesForLanguage(LANGUAGE, 2);
            var monthNames = dateUtils.getMonthNamesForLanguage(LANGUAGE, 3);
            var monthIndex = trackInfo.eventDate.getUTCMonth();
            var day = trackInfo.eventDate.getUTCDay() - 1;
            day = day < 0 ? 6 : day;
            var eventDateString = monthNames[monthIndex] + " " + dayNames[day] + " " + trackInfo.eventDate.getUTCDate();
            this.UI.$eventDate.html(eventDateString);
            this.UI.$bandDescription.html(trackInfo.bandDescription);
            this.UI.$artistName.html(trackInfo.artist);
            this.UI.$trackTitle.html(trackInfo.audioTitle);
            var title = $('#jp_container_1 .jp-title ul li:eq(0)').html().toString();

            while((/<span[^>]*>/).test(title) || (/<\/span>/).test(title)){
                 title = title.replace(/<span[^>]*>/, "").replace(/<\/span>/, "");
            }

            title = title.toUpperCase();
            // uncomment this if the track info must be shown in hover:
            //$('#jp_container_1 .jp-title').attr('title', title);

            var jsonString = "{";
            var extension = trackInfo.audioSource.substr(trackInfo.audioSource.lastIndexOf('.') + 1);
            jsonString+= ("\"" + extension + "\" : " + "\"" + trackInfo.audioSource + "\"");
            jsonString += "}";
            var params = $.parseJSON(jsonString);
            params.label = trackInfo.audioTitle;
            this.UI.$musicPlayer.jPlayer('setMedia', params);
        },

        stop : function(){
            this.UI.$musicPlayer.jPlayer('stop');
        },

        isPaused : function(){
            return this.UI.$musicPlayer.data().jPlayer.status.paused;
        }
    });
})(jQuery, window, void 0);

var AgendaMain;

(function($, window, undefined){
    "use strict";

    var defaultSettings = {
        maxSecondsPerTrackToPlay : 30,
        debug : false,
        relPathSwf : 'js/jsplayer-2.3.0',
        navButtonTop : 150
    };

    window.AgendaMain = ResponsiveViewControllerAbstract.extend(function AgendaMain(settings){
        settings = typeof(settings) == 'object' ? settings : {};
        this.settings = $.extend({}, defaultSettings, settings);
        this.mediaPlayerController = null;
    }).methods({

        init : function(){
            if(this.settings.debug){
                console.info('!!! --- DEBUG ENABLED --- !!! Turn this off if on production');
            }

            var isMobileDevice = !$.browserUtils().isDesktop();
            var cssClass = !isMobileDevice ? 'other-device' : 'mobile-device';
            $(document.body).addClass(cssClass);
            this.mediaPlayerController = new MediaPlayerController(this.settings);
            this.mediaPlayerController.init();

            this.supr();
        },

         _screenViewRenderEventHandler : function(){
            var agendaPageController = new AgendaPageController(this.settings, this.mediaPlayerController);
            agendaPageController.init();
        },

        _mobileViewRenderEventHandler : function(){
            var agendaPageControllerForMobile = new AgendaPageControllerForMobile(this.settings, this.mediaPlayerController);
            agendaPageControllerForMobile.init();
        }
    });
})(jQuery, window, void 0);
