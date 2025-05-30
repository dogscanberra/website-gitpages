// WALKING PAW ANIMATION
// 
// 
const paws = document.querySelectorAll('.paw');
  
// Apply animation-delay based on the index of each image
paws.forEach((img, index) => {
  const delay = -(index + 1) / 2;  // Calculate n/2
  img.style.animationDelay = `${delay}s`;  // Set the animation delay
});

///////////////////////////
// Random photo preview  //
///////////////////////////
window.addEventListener("load", miniGalleryScramble, true);
  function miniGalleryScramble() {
      // Get gallery element and frames contained within it:
  var gallery = document.getElementById("mini-gallery");
  if (!!gallery) {
  var photoFrames = Array.prototype.slice.call(gallery.getElementsByClassName("carousel-item"));
      // Remove the frame elements from the gallery element
  photoFrames.forEach(function(frame){
    console.log(frame)
      gallery.removeChild(frame)
  })
      // Randomly shuffle the team members
  for (var i = photoFrames.length -1; i>0 ; i --) {
      var j = Math.floor(Math.random() * (i+1)); // Maps 0-1 to 0-len
      var temp = photoFrames[i];
      photoFrames[i] = photoFrames[j]; // Puts the final element as the randomly selected element
      photoFrames[j] = temp; // Replaces the chosen element with the one it replaced
  }
      // Replace the team member elements back within the team element
  var photoIdx = 0;
  photoFrames.forEach(function(frame) {
    if (photoIdx<1) {
      frame.classList.add("active");
    }
    if (photoIdx<10) { 
      gallery.appendChild(frame);
      photoIdx += 1;
    }
  })}
  };
  
  



// ----------------- //
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
	(factory((global.bootstrap = {}),global.jQuery,global.Popper));
}(this, (function (exports,$,Popper) { 'use strict';


function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
var Carousel = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'photobooth';
    var VERSION = '4.0.0';
    var DATA_KEY = 'bs.photobooth';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var TRANSITION_DURATION = 600;
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  
    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key
  
    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch
  
    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };
    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };
    var Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
    };
    var Event = {
      SLIDE: "slide" + EVENT_KEY,
      SLID: "slid" + EVENT_KEY,
      KEYDOWN: "keydown" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY,
      TOUCHEND: "touchend" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      CAROUSEL: 'photobooth',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'photobooth-item-right',
      LEFT: 'photobooth-item-left',
      NEXT: 'photobooth-item-next',
      PREV: 'photobooth-item-prev',
      ITEM: 'photobooth-item'
    };
    var Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.photobooth-item',
      ITEM: '.photobooth-item',
      NEXT_PREV: '.photobooth-item-next, .photobooth-item-prev',
      INDICATORS: '.photobooth-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="photobooth"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */
  
    };
  
    var Carousel =
    /*#__PURE__*/
    function () {
      function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this._config = this._getConfig(config);
        this._element = $$$1(element)[0];
        this._indicatorsElement = $$$1(this._element).find(Selector.INDICATORS)[0];
  
        this._addEventListeners();
      } // Getters
  
  
      var _proto = Carousel.prototype;
  
      // Public
      _proto.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };
  
      _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };
  
      _proto.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };
  
      _proto.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }
  
        if ($$$1(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }
  
        clearInterval(this._interval);
        this._interval = null;
      };
  
      _proto.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }
  
        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }
  
        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };
  
      _proto.to = function to(index) {
        var _this = this;
  
        this._activeElement = $$$1(this._element).find(Selector.ACTIVE_ITEM)[0];
  
        var activeIndex = this._getItemIndex(this._activeElement);
  
        if (index > this._items.length - 1 || index < 0) {
          return;
        }
  
        if (this._isSliding) {
          $$$1(this._element).one(Event.SLID, function () {
            return _this.to(index);
          });
          return;
        }
  
        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }
  
        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;
  
        this._slide(direction, this._items[index]);
      };
  
      _proto.dispose = function dispose() {
        $$$1(this._element).off(EVENT_KEY);
        $$$1.removeData(this._element, DATA_KEY);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }; // Private
  
  
      _proto._getConfig = function _getConfig(config) {
        config = _extends({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };
  
      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;
  
        if (this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }
  
        if (this._config.pause === 'hover') {
          $$$1(this._element).on(Event.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(Event.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });
  
          if ('ontouchstart' in document.documentElement) {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            $$$1(this._element).on(Event.TOUCHEND, function () {
              _this2.pause();
  
              if (_this2.touchTimeout) {
                clearTimeout(_this2.touchTimeout);
              }
  
              _this2.touchTimeout = setTimeout(function (event) {
                return _this2.cycle(event);
              }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
            });
          }
        }
      };
  
      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }
  
        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;
  
          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;
  
          default:
        }
      };
  
      _proto._getItemIndex = function _getItemIndex(element) {
        this._items = $$$1.makeArray($$$1(element).parent().find(Selector.ITEM));
        return this._items.indexOf(element);
      };
  
      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;
  
        var activeIndex = this._getItemIndex(activeElement);
  
        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;
  
        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }
  
        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };
  
      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);
  
        var fromIndex = this._getItemIndex($$$1(this._element).find(Selector.ACTIVE_ITEM)[0]);
  
        var slideEvent = $$$1.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
        $$$1(this._element).trigger(slideEvent);
        return slideEvent;
      };
  
      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          $$$1(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
  
          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];
  
          if (nextIndicator) {
            $$$1(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      };
  
      _proto._slide = function _slide(direction, element) {
        var _this3 = this;
  
        var activeElement = $$$1(this._element).find(Selector.ACTIVE_ITEM)[0];
  
        var activeElementIndex = this._getItemIndex(activeElement);
  
        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);
  
        var nextElementIndex = this._getItemIndex(nextElement);
  
        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;
  
        if (direction === Direction.NEXT) {
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
        }
  
        if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }
  
        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
  
        if (slideEvent.isDefaultPrevented()) {
          return;
        }
  
        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }
  
        this._isSliding = true;
  
        if (isCycling) {
          this.pause();
        }
  
        this._setActiveIndicatorElement(nextElement);
  
        var slidEvent = $$$1.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });
  
        if (Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.SLIDE)) {
          $$$1(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          $$$1(activeElement).addClass(directionalClassName);
          $$$1(nextElement).addClass(directionalClassName);
          $$$1(activeElement).one(Util.TRANSITION_END, function () {
            $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
            $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this3._isSliding = false;
            setTimeout(function () {
              return $$$1(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          $$$1(activeElement).removeClass(ClassName.ACTIVE);
          $$$1(nextElement).addClass(ClassName.ACTIVE);
          this._isSliding = false;
          $$$1(this._element).trigger(slidEvent);
        }
  
        if (isCycling) {
          this.cycle();
        }
      }; // Static
  
  
      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);
  
          var _config = _extends({}, Default, $$$1(this).data());
  
          if (typeof config === 'object') {
            _config = _extends({}, _config, config);
          }
  
          var action = typeof config === 'string' ? config : _config.slide;
  
          if (!data) {
            data = new Carousel(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }
  
          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new TypeError("No method named \"" + action + "\"");
            }
  
            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };
  
      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);
  
        if (!selector) {
          return;
        }
  
        var target = $$$1(selector)[0];
  
        if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }
  
        var config = _extends({}, $$$1(target).data(), $$$1(this).data());
        var slideIndex = this.getAttribute('data-slide-to');
  
        if (slideIndex) {
          config.interval = false;
        }
  
        Carousel._jQueryInterface.call($$$1(target), config);
  
        if (slideIndex) {
          $$$1(target).data(DATA_KEY).to(slideIndex);
        }
  
        event.preventDefault();
      };
  
      _createClass(Carousel, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);
      return Carousel;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
  
  
    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
    $$$1(window).on(Event.LOAD_DATA_API, function () {
      $$$1(Selector.DATA_RIDE).each(function () {
        var $carousel = $$$1(this);
  
        Carousel._jQueryInterface.call($carousel, $carousel.data());
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
  
    $$$1.fn[NAME] = Carousel._jQueryInterface;
    $$$1.fn[NAME].Constructor = Carousel;
  
    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };
  
    return Carousel;
  }($);
  
exports.Carousel = Carousel;
Object.defineProperty(exports, '__esModule', { value: true });
})));
