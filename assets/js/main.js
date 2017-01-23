/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

	// HELPERS
	var addAnimations = function (animations, trigger, hook, offset, duration, controller) {
		var scene = '';
		var tween = new TimelineMax();
		tween.insertMultiple(animations, 0, 0);

		if (hook && duration) {
			scene = new ScrollMagic.Scene({
				triggerElement: trigger,
				triggerHook: hook,
				offset: offset,
				duration: duration
			})
					.setTween(tween)
					.addTo(controller);
		} else if (duration) {
			scene = new ScrollMagic.Scene({
				triggerElement: trigger,
				offset: offset,
				duration: duration
			})
					.setTween(tween)
					.addTo(controller);
		} else {
			scene = new ScrollMagic.Scene({
				triggerElement: trigger,
				offset: offset
			})
					.setTween(tween)
					.addTo(controller);
		}

		return;
	};

	// Use this variable to set up the common and page specific functions. If you
	// rename this variable, you will also need to rename the namespace below.
	var Hyperdrive = {
		// All pages
		'common': {
			init: function() {
			},
			finalize: function() {
				// JavaScript to be fired on all pages, after page specific JS is fired
			}
		},
		// Home page
		'home_page': {
			init: function() {
			},
			finalize: function() {
			}
		}
	};

	// The routing fires all common scripts, followed by the page specific scripts.
	// Add additional events for more control over timing e.g. a finalize event
	var UTIL = {
		fire: function(func, funcname, args) {
			var fire;
			var namespace = Hyperdrive;
			funcname = (funcname === undefined) ? 'init' : funcname;
			fire = func !== '';
			fire = fire && namespace[func];
			fire = fire && typeof namespace[func][funcname] === 'function';

			if (fire) {
				namespace[func][funcname](args);
			}
		},
		loadEvents: function() {
			// Fire common init JS
			UTIL.fire('common');

			// Fire page-specific init JS, and then finalize JS
			$.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
				UTIL.fire(classnm);
				UTIL.fire(classnm, 'finalize');
			});

			// Fire common finalize JS
			UTIL.fire('common', 'finalize');
		}
	};

	// Load Events
	$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
