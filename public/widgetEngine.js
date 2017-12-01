/**The MIT License (MIT)Copyright (c) 2016 Jacob LindahlPermission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the "Software"), to dealin the Software without restriction, including without limitation the rightsto use, copy, modify, merge, publish, distribute, sublicense, and/or sellcopies of the Software, and to permit persons to whom the Software isfurnished to do so, subject to the following conditions:The above copyright notice and this permission notice shall be included in allcopies or substantial portions of the Software.THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS ORIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THEAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHERLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THESOFTWARE. */
function openInNewTab (url) {
  var win = window.open(url, '_blank');
  win.focus();
};

function WidgetFactory() {

    function activateShopBotCarousel($this) {
        ! function(e, t) {
            "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Siema", [], t) : "object" == typeof exports ? exports.Siema = t() : e.Siema = t()
        }(this, function() {
            return function(e) {
                function t(r) {
                    if (i[r]) return i[r].exports;
                    var s = i[r] = {
                        i: r,
                        l: !1,
                        exports: {}
                    };
                    return e[r].call(s.exports, s, s.exports, t), s.l = !0, s.exports
                }
                var i = {};
                return t.m = e, t.c = i, t.i = function(e) {
                    return e
                }, t.d = function(e, i, r) {
                    t.o(e, i) || Object.defineProperty(e, i, {
                        configurable: !1,
                        enumerable: !0,
                        get: r
                    })
                }, t.n = function(e) {
                    var i = e && e.__esModule ? function() {
                        return e.default
                    } : function() {
                        return e
                    };
                    return t.d(i, "a", i), i
                }, t.o = function(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }, t.p = "", t(t.s = 0)
            }([function(e, t, i) {
                "use strict";

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    },
                    n = function() {
                        function e(e, t) {
                            for (var i = 0; i < t.length; i++) {
                                var r = t[i];
                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                            }
                        }
                        return function(t, i, r) {
                            return i && e(t.prototype, i), r && e(t, r), t
                        }
                    }(),
                    o = function() {
                        function e(t) {
                            var i = this;
                            r(this, e), this.config = this.mergeSettings(t), this.selector = "string" == typeof this.config.selector ? document.querySelector(this.config.selector) : this.config.selector, this.selectorWidth = this.selector.getBoundingClientRect().width, this.innerElements = [].slice.call(this.selector.children), this.currentSlide = this.config.startIndex, this.transformProperty = this.webkitOrNot(), this.init(), ["resizeHandler", "touchstartHandler", "touchendHandler", "touchmoveHandler", "mousedownHandler", "mouseupHandler", "mouseleaveHandler", "mousemoveHandler"].forEach(function(e) {
                                i[e] = i[e].bind(i)
                            }), window.addEventListener("resize", this.resizeHandler), this.config.draggable && (this.pointerDown = !1, this.drag = {
                                start: 0,
                                end: 0
                            }, this.selector.addEventListener("touchstart", this.touchstartHandler), this.selector.addEventListener("touchend", this.touchendHandler), this.selector.addEventListener("touchmove", this.touchmoveHandler, {
                                passive: !0
                            }), this.selector.addEventListener("mousedown", this.mousedownHandler), this.selector.addEventListener("mouseup", this.mouseupHandler), this.selector.addEventListener("mouseleave", this.mouseleaveHandler), this.selector.addEventListener("mousemove", this.mousemoveHandler))
                        }
                        return n(e, [{
                            key: "mergeSettings",
                            value: function(e) {
                                var t = {
                                        selector: ".siema",
                                        duration: 200,
                                        easing: "ease-out",
                                        perPage: 1,
                                        startIndex: 0,
                                        draggable: !0,
                                        threshold: 20,
                                        loop: !1
                                    },
                                    i = e;
                                for (var r in i) t[r] = i[r];
                                return t
                            }
                        }, {
                            key: "webkitOrNot",
                            value: function() {
                                var e = document.documentElement.style;
                                return "string" == typeof e.transform ? "transform" : "WebkitTransform"
                            }
                        }, {
                            key: "init",
                            value: function() {
                                if (null === this.selector) throw new Error("Something wrong with your selector 😭");
                                this.resolveSlidesNumber(), this.selector.style.overflow = "hidden", this.sliderFrame = document.createElement("div"), this.sliderFrame.style.width = this.selectorWidth / this.perPage * this.innerElements.length + "px", this.sliderFrame.style.webkitTransition = "all " + this.config.duration + "ms " + this.config.easing, this.sliderFrame.style.transition = "all " + this.config.duration + "ms " + this.config.easing, this.config.draggable && (this.sliderFrame.style.cursor = "-webkit-grab");
                                for (var e = document.createDocumentFragment(), t = 0; t < this.innerElements.length; t++) {
                                    var i = document.createElement("div");
                                    i.style.cssFloat = "left", i.style.float = "left", i.style.width = 100 / this.innerElements.length + "%", i.appendChild(this.innerElements[t]), e.appendChild(i)
                                }
                                this.sliderFrame.appendChild(e), this.selector.appendChild(this.sliderFrame), this.slideToCurrent()
                            }
                        }, {
                            key: "resolveSlidesNumber",
                            value: function() {
                                if ("number" == typeof this.config.perPage) this.perPage = this.config.perPage;
                                else if ("object" === s(this.config.perPage)) {
                                    this.perPage = 1;
                                    for (var e in this.config.perPage) window.innerWidth > e && (this.perPage = this.config.perPage[e])
                                }
                            }
                        }, {
                            key: "prev",
                            value: function() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                                0 === this.currentSlide && this.config.loop ? this.currentSlide = this.innerElements.length - this.perPage : this.currentSlide = Math.max(this.currentSlide - e, 0), this.slideToCurrent()
                            }
                        }, {
                            key: "next",
                            value: function() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                                this.currentSlide === this.innerElements.length - this.perPage && this.config.loop ? this.currentSlide = 0 : this.currentSlide = Math.min(this.currentSlide + e, this.innerElements.length - this.perPage), this.slideToCurrent()
                            }
                        }, {
                            key: "goTo",
                            value: function(e) {
                                this.currentSlide = Math.min(Math.max(e, 0), this.innerElements.length - 1), this.slideToCurrent()
                            }
                        }, {
                            key: "slideToCurrent",
                            value: function() {
                                this.sliderFrame.style[this.transformProperty] = "translate3d(-" + this.currentSlide * (this.selectorWidth / this.perPage) + "px, 0, 0)"
                            }
                        }, {
                            key: "updateAfterDrag",
                            value: function() {
                                var e = this.drag.end - this.drag.start,
                                    t = Math.abs(e),
                                    i = Math.ceil(t / (this.selectorWidth / this.perPage));
                                e > 0 && t > this.config.threshold ? this.prev(i) : e < 0 && t > this.config.threshold && this.next(i), this.slideToCurrent()
                            }
                        }, {
                            key: "resizeHandler",
                            value: function() {
                                this.resolveSlidesNumber(), this.selectorWidth = this.selector.getBoundingClientRect().width, this.sliderFrame.style.width = this.selectorWidth / this.perPage * this.innerElements.length + "px", this.slideToCurrent()
                            }
                        }, {
                            key: "clearDrag",
                            value: function() {
                                this.drag = {
                                    start: 0,
                                    end: 0
                                }
                            }
                        }, {
                            key: "touchstartHandler",
                            value: function(e) {
                                e.stopPropagation(), this.pointerDown = !0, this.drag.start = e.touches[0].pageX
                            }
                        }, {
                            key: "touchendHandler",
                            value: function(e) {
                                e.stopPropagation(), this.pointerDown = !1, this.sliderFrame.style.webkitTransition = "all " + this.config.duration + "ms " + this.config.easing, this.sliderFrame.style.transition = "all " + this.config.duration + "ms " + this.config.easing, this.drag.end && this.updateAfterDrag(), this.clearDrag()
                            }
                        }, {
                            key: "touchmoveHandler",
                            value: function(e) {
                                e.stopPropagation(), this.pointerDown && (this.drag.end = e.touches[0].pageX, this.sliderFrame.style.webkitTransition = "all 0ms " + this.config.easing, this.sliderFrame.style.transition = "all 0ms " + this.config.easing, this.sliderFrame.style[this.transformProperty] = "translate3d(" + (this.currentSlide * (this.selectorWidth / this.perPage) + (this.drag.start - this.drag.end)) * -1 + "px, 0, 0)")
                            }
                        }, {
                            key: "mousedownHandler",
                            value: function(e) {
                                e.preventDefault(), e.stopPropagation(), this.pointerDown = !0, this.drag.start = e.pageX
                            }
                        }, {
                            key: "mouseupHandler",
                            value: function(e) {
                                e.stopPropagation(), this.pointerDown = !1, this.sliderFrame.style.cursor = "-webkit-grab", this.sliderFrame.style.webkitTransition = "all " + this.config.duration + "ms " + this.config.easing, this.sliderFrame.style.transition = "all " + this.config.duration + "ms " + this.config.easing, this.drag.end && this.updateAfterDrag(), this.clearDrag()
                            }
                        }, {
                            key: "mousemoveHandler",
                            value: function(e) {
                                e.preventDefault(), this.pointerDown && (this.drag.end = e.pageX, this.sliderFrame.style.cursor = "-webkit-grabbing", this.sliderFrame.style.webkitTransition = "all 0ms " + this.config.easing, this.sliderFrame.style.transition = "all 0ms " + this.config.easing, this.sliderFrame.style[this.transformProperty] = "translate3d(" + (this.currentSlide * (this.selectorWidth / this.perPage) + (this.drag.start - this.drag.end)) * -1 + "px, 0, 0)")
                            }
                        }, {
                            key: "mouseleaveHandler",
                            value: function(e) {
                                this.pointerDown && (this.pointerDown = !1, this.sliderFrame.style.cursor = "-webkit-grab", this.drag.end = e.pageX, this.sliderFrame.style.webkitTransition = "all " + this.config.duration + "ms " + this.config.easing, this.sliderFrame.style.transition = "all " + this.config.duration + "ms " + this.config.easing, this.updateAfterDrag(), this.clearDrag())
                            }
                        }, {
                            key: "destroy",
                            value: function() {
                                window.removeEventListener("resize", this.resizeHandler), this.selector.removeEventListener("touchstart", this.touchstartHandler), this.selector.removeEventListener("touchend", this.touchendHandler), this.selector.removeEventListener("touchmove", this.touchmoveHandler), this.selector.removeEventListener("mousedown", this.mousedownHandler), this.selector.removeEventListener("mouseup", this.mouseupHandler), this.selector.removeEventListener("mouseleave", this.mouseleaveHandler), this.selector.removeEventListener("mousemove", this.mousemoveHandler)
                            }
                        }]), e
                    }();
                t.default = o, e.exports = t.default
            }])
        });
        const mySiema = new Siema({
            selector: '.' + $this.namespace + 'carousel',
            duration: 200,
            easing: 'ease-out',
            perPage: 1,
            startIndex: 0,
            draggable: true,
            threshold: 20,
            loop: false,
        });

        var prev = document.getElementsByClassName($this.namespace + 'prev');
        for (var i = 0; i < prev.length; i++) {
            prev[i].addEventListener('click', function() {
                mySiema.prev();
            });
        }

        var next = document.getElementsByClassName($this.namespace + 'next');
        for (var i = 0; i < next.length; i++) {
            next[i].addEventListener('click', function() {
                mySiema.next();
            });
        }
    };

    function activateStarRatings($this) {
        var SimpleStarRating = (function() {
            function SimpleStarRating(target) {
                function attr(name, d) {
                    var a = target.getAttribute(name);
                    return (a ? a : d);
                }
                var max = parseInt(attr('data-stars', 5)),
                    disabled = typeof target.getAttribute('disabled') != 'undefined',
                    defaultRating = parseFloat(attr('data-default-rating', 0)),
                    currentRating = -1,
                    stars = [];
                target.style.display = 'inline-block';
                for (var s = 0; s < max; s++) {
                    var n = document.createElement('span');
                    n.className = 'star';
                    n.addEventListener('click', starClick);
                    if (s > 0) stars[s - 1].appendChild(n);
                    else target.appendChild(n);
                    stars.push(n);
                }

                function disable() {
                    target.setAttribute('disabled', '');
                    disabled = true;
                }
                this.disable = disable;

                function enable() {
                    target.removeAttribute('disabled');
                    disabled = false;
                }
                this.enable = enable;

                function setCurrentRating(rating) {
                    currentRating = rating;
                    target.setAttribute('data-rating', currentRating);
                    showCurrentRating();
                }
                this.setCurrentRating = setCurrentRating;

                function setDefaultRating(rating) {
                    defaultRating = rating;
                    target.setAttribute('data-default-rating', defaultRating);
                    showDefaultRating();
                }
                this.setDefaultRating = setDefaultRating;
                this.onrate = function(rating) {};
                target.addEventListener('mouseout', function() {
                    disabled = target.getAttribute('disabled') !== null;
                    if (!disabled) showCurrentRating();
                }); /*target.addEventListener('mouseover', function () { disabled = target.getAttribute('disabled') !== null; if (!disabled) clearRating(); });*/
                showDefaultRating();

                function showRating(r) {
                    clearRating();
                    for (var i = 0; i < stars.length; i++) {
                        if (i >= r) break;
                        if (i === Math.floor(r) && i !== r) stars[i].classList.add('half');
                        stars[i].classList.add('active');
                    }
                }

                function showCurrentRating() {
                    var ratingAttr = parseFloat(attr('data-rating', 0));
                    if (ratingAttr) {
                        currentRating = ratingAttr;
                        showRating(currentRating);
                    } else {
                        showDefaultRating();
                    }
                }

                function showDefaultRating() {
                    defaultRating = parseFloat(attr('data-default-rating', 0));
                    showRating(defaultRating);
                }

                function clearRating() {
                    for (var i = 0; i < stars.length; i++) {
                        stars[i].classList.remove('active');
                        stars[i].classList.remove('half');
                    }
                }

                function starClick(e) {
                    if (disabled) return;
                    if (this === e.target) {
                        var starClicked = stars.indexOf(e.target);
                        if (starClicked !== -1) {
                            var starRating = starClicked + 1;
                            setCurrentRating(starRating);
                            if (typeof this.onrate === 'function') this.onrate(currentRating);
                            var evt = new CustomEvent('rate', {
                                detail: starRating,
                            });
                            target.dispatchEvent(evt);
                        }
                    }
                }
            }
            return SimpleStarRating;
        })();
        var ratings = document.getElementsByClassName($this.namespace + 'rating');
        for (var i = 0; i < ratings.length; i++) {
            var r = new SimpleStarRating(ratings[i]);
            ratings[i].addEventListener('rate', function(e) {});
        }
    }

    this.xhr = function(url, callback) {
        var xhr;
        if (typeof XMLHttpRequest !== 'undefined') {
            xhr = new XMLHttpRequest();
        } else {
            var versions = ["MSXML2.XmlHttp.5.0", "MSXML2.XmlHttp.4.0", "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.2.0", "Microsoft.XmlHttp"];
            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                } catch (e) {}
            }
        };

        xhr.onreadystatechange = ensureReadiness;

        function ensureReadiness() {
            if (xhr.readyState < 4) {
                return;
            }
            if (xhr.status !== 200) {
                return;
            }
            if (xhr.readyState === 4) {
                callback(xhr);
            }
        };
        xhr.open('GET', url, true);
        xhr.send('');
    };

    this.round = function(value, step) {
        step || (step = 1.0);
        var inv = 1.0 / step;
        return Math.round(value * inv) / inv;
    };

    this.o = {};

    this.namespace = 'shopBotWidget_';

    this.css = {
        /* Color theme */
        grey: "#b2b2b2",
        orange: "#FF3300",
        white: "#FFFFFF",
        black: "#333333",
        yellow: "#fbb617",
        blue: "#75b9f0",

        /* Font sizes */
        h1Fontsize: "30px",
        h2Fontsize: "24px",
        normalFontsize: "13px",
        smallFontsize: "12px",
        xsFontsize: "9px"
    };

    this.style = function() {
        /* Check here if template height and width are defined numbers, if not check which template and set width and height)*/
        if (isNaN(this.o.w)) {
            if (this.o.f == "custom") {
                if (this.o.tpl == 1) {
                    this.o.w = 340, this.o.h = 380;
                }
                if (this.o.tpl == 2) {
                    this.o.w = 160, this.o.h = 600;
                }
            }
        }

        var array = ["<style> .shopBotWidget {width:" + this.o.w + "px;height:" + this.o.h + "px;margin: 0; padding: 0;display: inline-block;background:" + this.css.white + ";font-family:Arial;}"];

        /*******************************************************************************************
          GLOBAL STYLING
        ***********************************************************************************************/

        array.push('bold  				{font-weight:bold !important;}');
        array.push('italic  			{font-style: italic !important;}');
        array.push('underline  			{text-decoration: underline !important;}');

        array.push('border-grey        	{border:1px solid ' + this.css.grey + ';}');
        array.push('border-top-grey    	{border-top:1px solid ' + this.css.grey + ';}');
        array.push('border-bottom-grey 	{border-bottom:1px solid ' + this.css.grey + ';}');
        array.push('border-left-grey   	{border-left:1px solid ' + this.css.grey + ';}');
        array.push('border-right-grey  	{border-right:1px solid ' + this.css.grey + ';}');

        array.push('h1     				{font-size: ' + this.css.h1Fontsize + ' !important;}');
        array.push('h2     				{font-size: ' + this.css.h2Fontsize + ' !important;}');
        array.push('normal 				{font-size: ' + this.css.normalFontsize + ' !important;}');
        array.push('small  				{font-size: ' + this.css.smallFontsize + ' !important;}');
        array.push('xs     				{font-size: ' + this.css.xsFontsize + ' !important;}');

        array.push('color-special     	{color: ' + this.o.cst.background.color + ' !important;}');

        array.push('text-align-center  	{text-align:center;}');
        array.push('text-align-justify 	{text-align:justify;}');
        array.push('text-align-left    	{text-align:left;}');
        array.push('text-align-right   	{text-align:right;}');

        array.push('no-margin          	{margin:0 !important;}');
        array.push('no-margin-left     	{margin-left:0 !important;}');
        array.push('no-margin-right    	{margin-right:0 !important;}');
        array.push('no-margin-bottom   	{margin-bottom:0 !important;}');
        array.push('no-margin-top      	{margin-top:0 !important;}');

        array.push('star-margin		    {margin-top:-7px !important; margin-bottom:0 !important;}');
        array.push('star-margin2		{margin-top: -11px !important; margin-bottom: -3px !important;}');

        array.push('no-padding          {padding:0 !important;}');
        array.push('no-padding-left     {padding-left:0 !important;}');
        array.push('no-padding-right    {padding-right:0 !important;}');
        array.push('no-padding-bottom   {padding-bottom:0 !important;}');
        array.push('no-padding-top      {padding-top:0 !important;}');

        array.push('small-padding    	{padding:15px !important;}');

        array.push('capitalize          {text-transform: capitalize !important;}');
        array.push('uppercase           {text-transform: uppercase !important;}');

        array.push('line-through		{text-decoration: line-through;}');

        array.push('block        		{display:block !important;}');
        array.push('inline-block 		{display:inline-block !important; vertical-align:middle;}');
        array.push('full_width 			{width:100% !important;}');
        array.push('three_quarter_width {width:75% !important;}');
        array.push('half_width 			{width:50% !important;}');
        array.push('quarter_width 		{width:25% !important;}');

        array.push('top_bar { background:' + this.css.orange + ';color:' + this.css.white + '; padding:5px; font-size: 12px; text-align:justify; }');

        array.push('cursor { cursor: pointer; color:black; text-decoration:none;}');

        /*******************************************************************************************
          CAROUSEL
        ***********************************************************************************************/
        array.push('carousel { overflow: hidden; height: 100%;text-align:justify;}');
        array.push('prev { background: ' + this.css.white + '; border: 1px solid ' + this.o.cst.background.color + '; border-radius: 50%; cursor: pointer; position: absolute; z-index: 999;}');
        array.push('next { background: ' + this.css.white + '; border: 1px solid ' + this.o.cst.background.color + '; border-radius: 50%; cursor: pointer; position: absolute; z-index: 999; }');
        array.push('prev .content { position: absolute; top: 0; left: 0; width: 100%; height: 100%; text-align: center;}');
        array.push('next .content { position: absolute; top: 0; left: 0; width: 100%; height: 100%; text-align: center;}');
        array.push('prev .content:before { content: ""; vertical-align: middle; display: inline-block; width: 0; height: 100%;}');
        array.push('next .content:before { content: ""; vertical-align: middle; display: inline-block; width: 0; height: 100%;}');
        array.push('prev .content span { vertical-align: middle; display: inline-block;color: ' + this.o.cst.background.color + ';font-size:90%;}');
        array.push('next .content span { vertical-align: middle; display: inline-block;color: ' + this.o.cst.background.color + ';font-size:90%;}');

        array.push('indicator-container { position:absolute;}');
        array.push('indicator { display:inline-block; height:10px; width:10px; border-radius:50%; border:1px solid #a3a3a3;background:#e2e2e2;margin: 0 1px !important;}');
        array.push('indicator-active { background:#a3a3a3;}');

        /*******************************************************************************************
          TOOLTIPS
        ***********************************************************************************************/
        array.push('tooltipWrapper { background: #888888; cursor: help; display: inline-block; text-align: center; -webkit-transform: translateZ(0); -webkit-font-smoothing: antialiased;  border-radius: 50%; color: white; position: absolute;}');
        array.push('tooltipWrapper .' + this.namespace + 'tooltip          { background: ' + this.css.white + '; color: ' + this.css.black + '; display: block; opacity: 0; pointer-events: none; position: absolute; width: auto; -webkit-transform: translateY(10px); -moz-transform: translateY(10px); -ms-transform: translateY(10px); -o-transform: translateY(10px); transform: translateY(10px); -webkit-transition: all .25s ease-out; -moz-transition: all .25s ease-out; -ms-transition: all .25s ease-out; -o-transition: all .25s ease-out; transition: all .25s ease-out; -webkit-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28); -moz-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28); -ms-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28); -o-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28); box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);}');
        array.push('tooltipWrapper:hover .' + this.namespace + 'tooltip    { opacity: 1; pointer-events: auto; -webkit-transform: translateY(0px); -moz-transform: translateY(0px); -ms-transform: translateY(0px); -o-transform: translateY(0px); transform: translateY(0px);}');
        array.push('tooltip:before { content: " "; display: block; position: absolute;} ');

        /*******************************************************************************************
          DESIGN BLOCK
        ***********************************************************************************************/
        array.push('classBlock { display: inline-block; margin: 7px 22px !important; position: relative; vertical-align: top; width: 106px;}');
        array.push('classBlock .offer_discounted_badge_value { box-sizing: border-box;  background:' + this.o.cst.background.color + '; border-radius: 50%; color: white; display: inline-block; font-size: 10px; height: 37px; left: 0px; top:0px; padding: 5px; position: absolute; text-align: center; width: 37px; text-transform:uppercase;}');
        array.push('classBlock .offer_image { width: 100%;vertical-align: middle;}');
        array.push('classBlock .offer_title { display: inline-block; font-size: 11px; text-transform:uppercase;overflow: hidden; text-align: justify; text-overflow: ellipsis; white-space: nowrap; width: 100%;}');
        array.push('classBlock .' + this.namespace + 'rating { white-space: nowrap; display: inline-block !important; width: 100% !important; text-align: justify;}');
        array.push('classBlock .' + this.namespace + 'rating .star { display: inline-block; position: relative; cursor:pointer;}');
        array.push('classBlock .' + this.namespace + 'rating .star::before { color: ' + this.css.grey + '; content: "\\f006"; font-family: FontAwesome; display: inline-block; font-size:13px;height: 13px; width: 13px;}');
        array.push('classBlock .' + this.namespace + 'rating .active::before {font-family: FontAwesome; content: "\\f005"; color: ' + this.o.cst.background.color + ';  }');
        array.push('classBlock .offer_logo { width: 100%;}');
        array.push('classBlock .offer_price { font-size: 10px;}');

        array.push('classBlockFlat { display: inline-block; margin: 5px 10px 5px 10px; position: relative; vertical-align: top; width: 140px;}');
        array.push('classBlockFlat:nth-child(4) { margin-right: 35px !important;}');
        array.push('classBlockFlat:last-child { margin-right: 35px !important;}');
        array.push('classBlockFlat:first-child { margin-left: 35px !important;}');
        array.push('classBlockFlat:nth-child(5) { margin-left: 35px !important;}');
        array.push('classBlockFlat .offer_discounted_badge_value { box-sizing: border-box;  background:' + this.o.cst.background.color + '; border-radius: 50%; color: white; display: inline-block; font-size: 10px; height: 37px; left: 0px; top:0px; padding: 5px; position: absolute; text-align: center; width: 37px; text-transform:uppercase;}');
        array.push('classBlockFlat .offer_image { max-width: 80px; max-height:80px; vertical-align: middle;}');
        array.push('classBlockFlat .offer_title { margin-top:5px; display: inline-block; font-size: 11px; text-transform:uppercase;overflow: hidden; text-align: justify; text-overflow: ellipsis; white-space: nowrap; width: 100%;}');
        array.push('classBlockFlat .' + this.namespace + 'rating { white-space: nowrap; display: inline-block !important; width: 100% !important; text-align: justify;}');
        array.push('classBlockFlat .' + this.namespace + 'rating .star { display: inline-block; position: relative; cursor:pointer;}');
        array.push('classBlockFlat .' + this.namespace + 'rating .star::before { color: ' + this.css.grey + '; content: "\\f006"; font-family: FontAwesome; display: inline-block; font-size:13px;height: 13px; width: 13px;}');
        array.push('classBlockFlat .' + this.namespace + 'rating .active::before {font-family: FontAwesome; content: "\\f005"; color: ' + this.o.cst.background.color + ';  }');
        array.push('classBlockFlat .' + this.namespace + 'star-margin { display:none !important;}');
        array.push('classBlockFlat .' + this.namespace + 'xs { font-size:0px !important}');
        array.push('classBlockFlat .' + this.namespace + 'block { text-align:center}');
        array.push('classBlockFlat .offer_logo { width: 100%;}');
        array.push('classBlockFlat .offer_price { font-size: 10px;}');

        /* Tooltips */
        array.push('classBlock .' + this.namespace + 'tooltipWrapper { box-sizing: border-box;margin-left: -108px !important; margin-top: 80px !important; font-size: 10px; height: 14px; padding: 1px; width: 14px;}');
        array.push('classBlock .' + this.namespace + 'tooltipWrapper .' + this.namespace + 'tooltip { font-size: 10px; bottom: 100%; left: -22px; margin-bottom: 3px; padding: 5px;}');
        array.push('classBlock .' + this.namespace + 'tooltip:before { bottom: -20px; height: 20px; left: 0; pwidth: 100%;} ');

        array.push('classBlockFlat .' + this.namespace + 'tooltipWrapper { box-sizing: border-box;margin-left: -90px !important; margin-top: 70px !important; font-size: 10px; height: 14px; padding: 1px; width: 14px;}');
        array.push('classBlockFlat .' + this.namespace + 'tooltipWrapper .' + this.namespace + 'tooltip { font-size: 10px; bottom: 100%; left: -22px; margin-bottom: 3px; padding: 5px;}');
        array.push('classBlockFlat .' + this.namespace + 'tooltip:before { bottom: -20px; height: 20px; left: 0; pwidth: 100%;} ');

        /* Carousel indicators */
        array.push('inBetween.' + this.namespace + 'prev { margin-left: -20px !important; padding: 15px 0;  top: 285px; width: 30px;}');
        array.push('inBetween.' + this.namespace + 'next { margin-left: 740px !important; padding: 15px 0;  top: 285px; width: 30px; }');
        array.push('inBetween.' + this.namespace + 'indicator-container { margin: 0 0 0 360px !important; top: 580px;}');

        array.push('inBetweenFlat.' + this.namespace + 'prev { margin-left: 0px !important; padding: 15px 0;  top: 145px; width: 30px;}');
        array.push('inBetweenFlat.' + this.namespace + 'next { margin-left: 660px !important; padding: 15px 0;  top: 145px; width: 30px; }');
        array.push('inBetweenFlat.' + this.namespace + 'indicator-container { margin: 0 0 0 360px !important; top: 580px;}');

        array.push('wideSkyscrape.' + this.namespace + 'prev { margin: 0 0 0 10px !important; padding: 10px 0;  width: 20px;top: 565px;}');
        array.push('wideSkyscrape.' + this.namespace + 'next { margin: 0 0 0 110px !important; padding: 10px 0;  width: 20px;top: 565px; }');
        array.push('wideSkyscrape.' + this.namespace + 'prev .content span { font-size: 16px !important;}');
        array.push('wideSkyscrape.' + this.namespace + 'next .content span { font-size: 16px !important;}');
        array.push('wideSkyscrape.' + this.namespace + 'indicator-container { margin: 2px 0 0 40px !important; top: 565px;}');

        array.push('halfPage.' + this.namespace + 'prev { margin: 0 0 0 20px !important; padding: 10px 0;  width: 20px;top:570px !important;}');
        array.push('halfPage.' + this.namespace + 'next { margin: 0 0 0 260px !important; padding: 10px 0;  width: 20px;top:570px !important; }');
        array.push('halfPage.' + this.namespace + 'prev .content span { font-size: 16px !important;}');
        array.push('halfPage.' + this.namespace + 'next .content span { font-size: 16px !important;}');
        array.push('halfPage.' + this.namespace + 'indicator-container { margin: 0 0 0 120px !important;top:570px !important; }');

        /*******************************************************************************************
          DESIGN BIGBLOCK
        ***********************************************************************************************/
        array.push('classBigBlock { display: inline-block; margin: 5px 0 0 45px !important; position: relative; vertical-align: top; width: 140px;}');
        array.push('classBigBlock .offer_discounted_badge_value { box-sizing: border-box;  background:' + this.o.cst.background.color + '; border-radius: 50%; color: white; display: inline-block; font-size: 10px; height: 42px; left: 0px; top: 0px; padding: 8px; position: absolute; text-align: center; width: 42px;text-transform:uppercase;}');
        array.push('classBigBlock .offer_image { width: 100%;vertical-align: middle;}');
        array.push('classBigBlock .offer_title { display: inline-block; font-size: 12px; text-transform:uppercase;overflow: hidden; text-align: justify; text-overflow: ellipsis; white-space: nowrap; width: 100%;}');
        array.push('classBigBlock .' + this.namespace + 'rating { color: ' + this.o.cst.background.color + '; white-space: nowrap; display: inline-block !important; width: 100% !important; text-align: justify;}');
        array.push('classBigBlock .' + this.namespace + 'rating .star { display: inline-block; position: relative; cursor:default;}');
        array.push('classBigBlock .' + this.namespace + 'rating .star::before { color: ' + this.css.grey + '; content: "\\f006"; font-family: FontAwesome; display: inline-block; font-size:13px;height: 13px; width: 13px;}');
        array.push('classBigBlock .' + this.namespace + 'rating .active::before {font-family: FontAwesome; content: "\\f005"; color: ' + this.o.cst.background.color + ';  }');
        array.push('classBigBlock .offer_logo { width: 100%;}');
        array.push('classBigBlock .offer_price { font-size: 11px;}');

        array.push('classBigBlockFlat { display: inline-block; margin: 0px 0 0 30px !important; position: relative; vertical-align: top; width: 180px;}');
        array.push('classBigBlockFlat .offer_discounted_badge_value { box-sizing: border-box;  background:' + this.o.cst.background.color + '; border-radius: 50%; color: white; display: inline-block; font-size: 10px; height: 42px; left: 0px; top: 0px; padding: 8px; position: absolute; text-align: center; width: 42px;text-transform:uppercase;}');
        array.push('classBigBlockFlat .offer_image { max-width: 110px; max-height: 110px;vertical-align: middle;}');
        array.push('classBigBlockFlat .offer_title { margin-top:5px; display: inline-block; font-size: 12px; text-transform:uppercase;overflow: hidden; text-align: justify; text-overflow: ellipsis; white-space: nowrap; width: 100%;}');
        array.push('classBigBlockFlat .' + this.namespace + 'rating { color: ' + this.o.cst.background.color + '; white-space: nowrap; display: inline-block !important; width: 100% !important; text-align: justify;}');
        array.push('classBigBlockFlat .' + this.namespace + 'rating .star { display: inline-block; position: relative; cursor:default;}');
        array.push('classBigBlockFlat .' + this.namespace + 'rating .star::before { color: ' + this.css.grey + '; content: "\\f006"; font-family: FontAwesome; display: inline-block; font-size:13px;height: 13px; width: 13px;}');
        array.push('classBigBlockFlat .' + this.namespace + 'rating .active::before {font-family: FontAwesome; content: "\\f005"; color: ' + this.o.cst.background.color + ';  }');
        array.push('classBigBlockFlat .' + this.namespace + 'xs { font-size: 5px !important;}');
        array.push('classBigBlockFlat .' + this.namespace + 'block { text-align:center !important; margin-bottom: 3px}');
        array.push('classBigBlockFlat .offer_logo { max-width: 88px;}');
        array.push('classBigBlockFlat .offer_price { font-size: 11px;}');

        /* Tooltips */
        array.push('classBigBlock .' + this.namespace + 'tooltipWrapper { box-sizing: border-box; margin-left: -140px !important; margin-top: 110px !important; font-size: 10px; height: 16px; padding: 2px; width: 16px;}');
        array.push('classBigBlock .' + this.namespace + 'tooltipWrapper .' + this.namespace + 'tooltip { font-size: 10px; bottom: 100%; left: -20px; margin-bottom: 5px; padding: 5px;}');
        array.push('classBigBlock .' + this.namespace + 'tooltip:before { bottom: -20px; height: 20px; left: 0; pwidth: 100%;} ');

        array.push('classBigBlockFlat .' + this.namespace + 'tooltipWrapper { box-sizing: border-box; margin-left: -140px !important; margin-top: 105px !important; font-size: 10px; height: 16px; padding: 2px; width: 16px;}');
        array.push('classBigBlockFlat .' + this.namespace + 'tooltipWrapper .' + this.namespace + 'tooltip { font-size: 10px; bottom: 100%; left: -20px; margin-bottom: 5px; padding: 5px;}');
        array.push('classBigBlockFlat .' + this.namespace + 'tooltip:before { bottom: -20px; height: 20px; left: 0; pwidth: 100%;} ');

        /* Carousel indicators */
        array.push('mediumRectangle.' + this.namespace + 'prev { margin-left: -17px !important; padding: 15px 0;  top: 115px; width: 30px;}');
        array.push('mediumRectangle.' + this.namespace + 'next { margin-left: 225px !important; padding: 15px 0;  top: 115px; width: 30px; }');
        array.push('mediumRectangle.' + this.namespace + 'prev .content span { font-size: 16px !important;}');
        array.push('mediumRectangle.' + this.namespace + 'next .content span { font-size: 16px !important;}');
        array.push('mediumRectangle.' + this.namespace + 'indicator-container { margin: 0 0 0 85px !important; top: 220px;}');

        /* Carousel indicators */
        array.push('mediumRectangleFlat.' + this.namespace + 'prev { margin-left: -17px !important; padding: 15px 0;  top: 115px; width: 30px;}');
        array.push('mediumRectangleFlat.' + this.namespace + 'next { margin-left: 225px !important; padding: 15px 0;  top: 115px; width: 30px; }');
        array.push('mediumRectangleFlat.' + this.namespace + 'prev .content span { font-size: 16px !important;}');
        array.push('mediumRectangleFlat.' + this.namespace + 'next .content span { font-size: 16px !important;}');
        array.push('mediumRectangleFlat.' + this.namespace + 'indicator-container { margin: 0 0 0 85px !important; top: 220px;}');

        /*******************************************************************************************
          DESIGN SMALLLOCK
        ***********************************************************************************************/
        array.push('classSmallBlock { position: relative; display:inline-block; width:85px;margin:-11px 0 0 46px !important}');
        array.push('classSmallBlock .offer_discounted_badge_value { box-sizing: border-box;  background: #F33C00; border-radius: 50%; color: white; display: inline-block; left: -11px; top: 11px; position: absolute; text-align: center; text-transform: uppercase; font-size: 10px; height: 30px; padding: 5px; width: 30px;}');
        array.push('classSmallBlock .offer_image { width: 100%;vertical-align: middle;}');
        array.push('classSmallBlock .offer_title { display: inline-block; font-size: 8px; text-transform:uppercase;overflow: hidden; text-align: justify; text-overflow: ellipsis; white-space: nowrap; width: 100%;}');
        array.push('classSmallBlock .' + this.namespace + 'rating { color: ' + this.o.cst.background.color + '; white-space: nowrap; display: inline-block !important; width: 100% !important; text-align: justify;}');
        array.push('classSmallBlock .' + this.namespace + 'rating .star { display: inline-block; position: relative; cursor:default;}');
        array.push('classSmallBlock .' + this.namespace + 'rating .star::before { color: ' + this.css.grey + '; content: "\\f006"; font-family: FontAwesome; display: inline-block; font-size:10px;height: 10px; width: 10px;}');
        array.push('classSmallBlock .' + this.namespace + 'rating .active::before {font-family: FontAwesome; content: "\\f005"; color: ' + this.o.cst.background.color + ';  }');
        array.push('classSmallBlock .offer_logo { width: 100%;}');
        array.push('classSmallBlock .offer_price { font-size: 8px;}');

        /* Tooltips */
        array.push('classSmallBlock .' + this.namespace + 'tooltipWrapper { box-sizing: border-box; font-size: 8px; height: 12px; margin-left: -86px !important; margin-top: 68px !important; padding: 2px; width: 12px;}');
        array.push('classSmallBlock .' + this.namespace + 'tooltipWrapper .' + this.namespace + 'tooltip { font-size: 9px; bottom: 100%; left: -20px; margin-bottom: 0; padding: 5px;}');
        array.push('classSmallBlock .' + this.namespace + 'tooltip:before { bottom: -20px; height: 20px; left: 0; pwidth: 100%;} ');

        /* Carousel indicators */
        array.push('rectangle.' + this.namespace + 'prev { margin-left: 3px !important; padding: 10px 0;  top: 70px; width: 20px;}');
        array.push('rectangle.' + this.namespace + 'next { margin-left: 155px !important; padding: 10px 0;  top: 70px; width: 20px; }');
        array.push('rectangle.' + this.namespace + 'prev .content span { font-size: 13px !important;}');
        array.push('rectangle.' + this.namespace + 'next .content span { font-size: 13px !important;}');
        array.push('rectangle.' + this.namespace + 'indicator-container { margin: 0 0 0 65px !important; top: 130px;}');
        array.push('rectangle.' + this.namespace + 'indicator { width:8px; height:8px; }');

        /*******************************************************************************************
          DESIGN INLINEBLOCK
        ***********************************************************************************************/
        array.push('classLineBlock {display: inline-block;margin: 0 2% !important;width:21%;vertical-align: top;}');
        array.push('classLineBlock .offer_image { max-height: 100% !important; width: 100%;vertical-align: middle;}');
        array.push('classLineBlock .' + this.namespace + 'rating { white-space: nowrap; display: inline-block !important; width: 100% !important; text-align: justify;}');
        array.push('classLineBlock .' + this.namespace + 'rating .star { display: inline-block; position: relative; cursor:pointer;}');
        array.push('classLineBlock .' + this.namespace + 'rating .star::before { color: ' + this.css.grey + '; content: "\\f006"; font-family: FontAwesome; display: inline-block; font-size:11px;height: 11px; width: 9px;}');
        array.push('classLineBlock .' + this.namespace + 'rating .active::before {font-family: FontAwesome; content: "\\f005"; color: ' + this.o.cst.background.color + ';  }');

        array.push('classLineBlock .offer_title { display: inline-block; font-size: 11px; text-transform:uppercase;overflow: hidden; text-align: justify; text-overflow: ellipsis; white-space: nowrap; width: 100%;}');
        array.push('classLineBlock .offer_logo { width:70%;}');
        array.push('classLineBlock .offer_price { font-size: 10px;}');

        /* Tooltips */
        array.push('classLineBlock .' + this.namespace + 'tooltipWrapper { box-sizing: border-box; font-size: 8px; height: 13px; margin-left: -50px !important; margin-top: 31px !important; padding: 2px; width: 12px;}');
        array.push('classLineBlock .' + this.namespace + 'tooltipWrapper .' + this.namespace + 'tooltip { font-size: 9px; bottom: 100%; left: 0; margin-bottom: 3px; padding: 2px; z-index: 999999999 !important;}');
        array.push('classLineBlock .' + this.namespace + 'tooltip:before { bottom: -20px; height: 20px; left: 0; pwidth: 100%;} ');

        /* Carousel indicators */
        array.push('leaderboard.' + this.namespace + 'prev { margin: 0 0 0 -20px !important; padding: 10px 0; width: 20px;top:37px;}');
        array.push('leaderboard.' + this.namespace + 'next { margin: 0 0 0 678px !important; padding: 10px 0;  width: 20px;top:37px; }');
        array.push('leaderboard.' + this.namespace + 'prev .content span { font-size: 15px !important;}');
        array.push('leaderboard.' + this.namespace + 'next .content span { font-size: 15px !important;}');
        array.push('leaderboard.' + this.namespace + 'indicator-container { margin: 0px 0 0 325px !important; }');
        array.push('leaderboard.' + this.namespace + 'indicator { width:8px; height:8px; }');

        array.push('superLeaderboard.' + this.namespace + 'prev { margin: 0 0 0 -20px !important; padding: 15px 0; width: 30px; top:32px;}');
        array.push('superLeaderboard.' + this.namespace + 'next { margin: 0 0 0 890px !important; padding: 15px 0;  width: 30px; top:32px;}');
        array.push('superLeaderboard.' + this.namespace + 'prev .content span { font-size: 22px !important;}');
        array.push('superLeaderboard.' + this.namespace + 'next .content span { font-size: 22px !important;}');

        /*******************************************************************************************
          DESIGN LINE
        ***********************************************************************************************/
        array.push('classLine {display: inline-block;margin: 0 0 11px 0 !important;width:100%; padding:0 10px;}');
        array.push('classLine .offer_discounted_badge_value { box-sizing: border-box;  background:' + this.o.cst.background.color + '; border-radius: 50%; color: white; display: inline-block; font-size: 10px; height: 42px; left: 0px; top:0px; padding: 8px; position: absolute; text-align: center; width: 42px;text-transform:uppercase;}');
        array.push('classLine .offer_image { max-height: 100% !important; width: 78%;vertical-align: middle;}');
        array.push('classLine .offer_title { display: inline-block; font-size: 11px; text-transform:uppercase;overflow: hidden; text-align: justify; text-overflow: ellipsis; white-space: nowrap; width: 90%;}');
        array.push('classLine .product_label { display: inline-block; font-size: 11px; overflow: hidden; text-align: justify; text-overflow: ellipsis; white-space: nowrap; width: 90%;}');
        array.push('classLine .' + this.namespace + 'rating { color: ' + this.o.cst.background.color + '; white-space: nowrap; display: inline-block !important; margin:0;width: 100% !important; text-align: justify;}');
        array.push('classLine .' + this.namespace + 'rating .star { display: inline-block; position: relative; cursor:default;}');
        array.push('classLine .' + this.namespace + 'rating .star::before { color: ' + this.css.grey + '; content: "\\f006"; font-family: FontAwesome; display: inline-block; font-size:13px;height: 13px; width: 13px;}');
        array.push('classLine .' + this.namespace + 'rating .active::before {font-family: FontAwesome; content: "\\f005"; color: ' + this.o.cst.background.color + ';  }');
        array.push('classLine .offer_price { background: white none repeat scroll 0 0; font-size: 10px; margin: -15px 0 0 10% !important; overflow: hidden; padding: 1px 0; position: relative; width: 80%; text-align:center;}');
        array.push('classLine .offer_logo { width: 50%;}');
        array.push('classLine .offer_button { background: ' + this.css.orange + '; border: 1px solid ' + this.css.grey + '; color:' + this.css.white + '; padding:5px; font-size: 10px; overflow: hidden; padding: 1px 0; position: relative; width: 80%; text-align:center;}');

        /* Tooltips */
        array.push('classLine .' + this.namespace + 'tooltipWrapper { box-sizing: border-box; margin-left: 0 !important; margin-top: 45% !important; font-size: 10px; height: 16px; padding: 2px; width: 15px;}');
        array.push('classLine .' + this.namespace + 'tooltipWrapper .' + this.namespace + 'tooltip          { font-size:10px; bottom: 100%; left: -25px; margin-bottom: 15px; padding: 5px; }');
        array.push('classLine .' + this.namespace + 'tooltip:before { bottom: -20px; height: 20px; left: 0; pwidth: 100%;} ');

        /* Carousel indicators */
        array.push('custom.' + this.namespace + 'prev { margin: -6px 0 0 10px !important; padding: 10px 0;  width: 20px;}');
        array.push('custom.' + this.namespace + 'next { margin: -6px 0 0 35px !important; padding: 10px 0;  width: 20px; }');
        array.push('custom.' + this.namespace + 'prev .content span { font-size: 16px !important;}');
        array.push('custom.' + this.namespace + 'next .content span { font-size: 16px !important;}');
        array.push('custom.' + this.namespace + 'indicator-container { margin: -5px 0 0 4% !important; }');

        array.push("</style>");

        /* Compile all in a string with the proper namespace */
        style = array[0];
        for (i = 1; i < (array.length - 1); i++) {
            style += "." + this.namespace + array[i];
        }
        style += array[array.length - 1];

        return style;
    };

    this.generateOffersHTML = function(offer, mainClass, subClass) {
        var subHTML = '<a href="' + offer.offer_url + '" target="_blank" class="' + this.namespace +  mainClass + ' ' + this.namespace + 'cursor" >';

        if (mainClass == "classBlock" || mainClass == "classBlockFlat" || mainClass == "classSmallBlock" || mainClass == "classBigBlock" || mainClass == "classBigBlockFlat") {
            subHTML += '<div class="' + this.namespace + 'block">';
            subHTML += this.o.cst.discountSpot && offer.offer_discounted_badge_value ? '<div class="offer_discounted_badge_value">' + offer.offer_discounted_badge_value + '</div>' : '';
            subHTML += '<img src = "' + offer.offer_image + '" class="offer_image">';
            subHTML += offer.sponsored_offer ? '<div class="' + this.namespace + 'tooltipWrapper ' + this.namespace + 'offer ' + mainClass + '"> i<div class="' + this.namespace + 'tooltip">' + offer.sponsored_offer_tooltip + '</div> </div>' : '';

            subHTML += '</div>';

            subHTML += '<div class="' + this.namespace + 'block ' + this.namespace + 'full_width"><div class="offer_title">' + offer.offer_title + '</div></div>';
            subHTML += '<div class="' + this.namespace + 'block ' + (mainClass == "classSmallBlock" ? this.namespace + 'star-margin2' : this.namespace + 'star-margin') + '">' + (this.o.cst.shopBotReview && offer.review_note ? '<span class="' + this.namespace + 'rating" data-default-rating="' + this.round(offer.review_note, 0.5) + '" data-stars="5"></span>' : '&nbsp;') + '</div>';

            subHTML += '<div class="' + this.namespace + 'inline-block ' + this.namespace + 'half_width ' + this.namespace + 'text-align-left">' +
                '<div class="' + this.namespace + 'xs">&nbsp;</div>' +
                (this.o.cst.shopBotLogo ? '<img src = "' + offer.shop_logo + '" class="offer_logo">' : '&nbsp;') +
                '</div>';

            subHTML += '<div class="' + this.namespace + 'inline-block ' + this.namespace + 'half_width ' + this.namespace + 'text-align-right">';
            subHTML += '<div class="offer_price ' + (mainClass == "classSmallBlock" ? this.namespace + 'small' : this.namespace + 'normal') + ' ' + this.namespace + 'color-special">' + offer.offer_discounted_price + '</div>';
            subHTML += '<div class="offer_price ' + (offer.offer_regular_price && offer.offer_regular_price != offer.offer_discounted_price ? this.namespace + "line-through" : "") + '">' + (offer.offer_regular_price && offer.offer_regular_price != offer.offer_discounted_price ? offer.offer_regular_price : '&nbsp;') + '</div>';

            subHTML += '</div>';
        } else if (mainClass == "classLineBlock") {
            subHTML += '<div class="' + this.namespace + 'inline-block ' + this.namespace + 'quarter_width">';
            subHTML += '<img src = "' + offer.offer_image + '" class="offer_image">';
            subHTML += offer.sponsored_offer ? '<div class="' + this.namespace + 'tooltipWrapper ' + this.namespace + 'offer ' + mainClass + '"> i<div class="' + this.namespace + 'tooltip">' + offer.sponsored_offer_tooltip + '</div> </div>' : '';

            subHTML += '<div class="' + this.namespace + 'block">' + (this.o.cst.shopBotReview && offer.review_note ? '<span class="' + this.namespace + 'rating" data-default-rating="' + this.round(offer.review_note, 0.5) + '" data-stars="5"></span>' : '&nbsp;') + '</div>';
            subHTML += '</div>';

            subHTML += '<div class="' + this.namespace + 'inline-block ' + this.namespace + 'three_quarter_width">';

            subHTML += '<div class="' + this.namespace + 'block ' + this.namespace + 'full_width ' + this.namespace + 'text-align-right">';
            subHTML += '<div class="offer_title">' + offer.offer_title + '</div>';
            subHTML += '</div>';

            subHTML += '<div class="' + this.namespace + 'inline-block ' + this.namespace + 'half_width ' + this.namespace + 'text-align-right">';
            subHTML += '<div class="' + this.namespace + 'xs">&nbsp;</div>' + (this.o.cst.shopBotLogo ? '<img src = "' + offer.shop_logo + '" class="offer_logo">' : '&nbsp;');
            subHTML += '</div>';

            subHTML += '<div class="' + this.namespace + 'inline-block ' + this.namespace + 'half_width ' + this.namespace + 'text-align-right">';
            subHTML += '<div class="offer_price ' + (mainClass == "classSmallBlock" ? this.namespace + 'small' : this.namespace + 'normal') + ' ' + this.namespace + 'color-special">' + offer.offer_discounted_price + '</div>';
            subHTML += '<div class="offer_price ' + (offer.offer_regular_price && offer.offer_regular_price != offer.offer_discounted_price  ? this.namespace + "line-through" : "") + '">' + (offer.offer_regular_price && offer.offer_regular_price != offer.offer_discounted_price ? offer.offer_regular_price : '&nbsp;') + '</div>';
            subHTML += '</div>';

            subHTML += '</div>';
        } else if (mainClass == "classLine") {
            subHTML += '<div class="' + this.namespace + 'inline-block ' + this.namespace + 'quarter_width">';
            subHTML += '<img src = "' + offer.offer_image + '" class="offer_image"></div>';
            subHTML += '<div class="' + this.namespace + 'inline-block ' + this.namespace + 'half_width">';
            subHTML += '<div class="offer_title">' + offer.offer_title + '</div>';
            subHTML += '<div class="product_label">' + (offer.product_label ? offer.product_label : '&nbsp;') + '</div>';
            subHTML += '</div>';
            subHTML += '<div class="' + this.namespace + 'inline-block ' + this.namespace + 'quarter_width">';
            subHTML += '<div class="offer_discounted_price ' + this.namespace + 'inline-block ' +  this.namespace + "normal " + this.namespace + "color-special" + '">' + offer.offer_discounted_price + '</div>';
            subHTML += '<div class="offer_regular_price ' + this.namespace + 'inline-block ' + (offer.offer_regular_price && offer.offer_regular_price > offer.offer_discounted_price  ? this.namespace + "line-through" : this.namespace + "normal " + this.namespace + "color-special") + '">' + (offer.offer_regular_price && offer.offer_regular_price > offer.offer_discounted_price ? offer.offer_regular_price : '&nbsp;') + '</div>';
            subHTML += '<a class="offer_button ' + this.namespace + 'block">See Offer</a>';

            subHTML += '</div>';
        }
        subHTML += '</a>';

        return subHTML;
    };

    this.getProps = function() {
        var props = {},
            arrayFormats, $this = this,
            match;

        /* Design n°1 */
        arrayFormats = [{
                format: "mediumRectangle",
                offersPerSlide: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return 1;
                            break;
                    }
                    return 0;
                },
                mainClass: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "classBigBlock";
                            break;
                    }
                    return "classBigBlock";
                },
                slideStyle: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "padding:5px 30px;";
                            break;
                    }
                    return "";
                }
            },
            {
                format: "mediumRectangleFlat",
                offersPerSlide: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return 1;
                            break;
                    }
                    return 0;
                },
                mainClass: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "classBigBlockFlat";
                            break;
                    }
                    return "classBigBlockFlat";
                },
                slideStyle: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "padding:5px 30px;";
                            break;
                    }
                    return "";
                }
            },
            {
                format: "rectangle",
                offersPerSlide: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return 1;
                            break;
                    }
                    return 0;
                },
                mainClass: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "classSmallBlock";
                            break;
                    }
                    return "classSmallBlock";
                },
                slideStyle: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "";
                            break;
                    }
                    return "";
                }
            },
            {
                format: "inBetween",
                offersPerSlide: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return 15;
                            break;
                    }
                    return 0;
                },
                mainClass: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "classBlock";
                            break;
                    }
                    return "classBlock";
                },
                slideStyle: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "padding:20px 25px;";
                            break;
                    }
                    return "";
                }
            },
            {
                format: "inBetweenFlat",
                offersPerSlide: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return 8;
                            break;
                    }
                    return 0;
                },
                mainClass: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "classBlockFlat";
                            break;
                    }
                    return "classBlockFlat";
                },
                slideStyle: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "padding:5px 5px;";
                            break;
                    }
                    return "";
                }
            },
            {
                format: "halfPage",
                offersPerSlide: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return 6;
                            break;
                    }
                    return 0;
                },
                mainClass: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "classBlock";
                            break;
                    }
                    return "classBlock";
                },
                slideStyle: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "padding:5px 0;";
                            break;
                    }
                    return "";
                }
            },
            {
                format: "wideSkyscrape",
                offersPerSlide: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return 3;
                            break;
                    }
                    return 0;
                },
                mainClass: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "classBlock";
                            break;
                    }
                    return "classBlock";
                },
                slideStyle: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "padding:10px 5px;";
                            break;
                    }
                    return "";
                }
            },
        ];

        match = arrayFormats.filter(function(obj) {
            return obj.format === $this.o.f;
        })[0];
        if (match) {
            return match;
        }

        /* Design n°2 */
        arrayFormats = [{
                format: "leaderboard",
                offersPerSlide: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return 4;
                            break;
                        case 2:
                            return 4;
                            break;
                    }
                    return 0;
                },
                mainClass: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "classLineBlock";
                            break;
                        case 2:
                            return "classLineBlock";
                            break;
                    }
                    return "classSimpleBlock";
                },
                slideStyle: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "padding:20px 25px;";
                            break;
                        case 2:
                            return "padding:20px 25px;";
                            break;
                    }
                    return "";
                }
            },
            {
                format: "superLeaderboard",
                offersPerSlide: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return 4;
                            break;
                        case 2:
                            return 4;
                            break;
                    }
                    return 0;
                },
                mainClass: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "classLineBlock";
                            break;
                        case 2:
                            return "classLineBlock";
                            break;
                    }
                    return "classSimpleBlock";
                },
                slideStyle: function() {
                    switch ($this.o.tpl) {
                        case 1:
                            return "padding:15px 40px;";
                            break;
                        case 2:
                            return "padding:15px 40px;";
                            break;
                    }
                    return "";
                }
            },
        ];

        match = arrayFormats.filter(function(obj) {
            return obj.format === $this.o.f;
        })[0];
        if (match) {
            return match;
        }

        /* Design n°3 */
        arrayFormats = [{
            format: "expandable",
            offersPerSlide: function() {
                switch ($this.o.tpl) {
                    case 1:
                        return 4;
                        break;
                }
                return 0;
            },
            mainClass: function() {
                switch ($this.o.tpl) {
                    case 1:
                        return "classLineBlock";
                        break;
                }
                return "classLineBlock";
            },
            slideStyle: function() {
                switch ($this.o.tpl) {
                    case 1:
                        return "";
                        break;
                }
                return "";
            }
        }, ];

        match = arrayFormats.filter(function(obj) {
            return obj.format === $this.o.f;
        })[0];
        if (match) {
            return match;
        }

        /* Design n°4 */
        arrayFormats = [{
            format: "custom",
            offersPerSlide: function() {
                switch ($this.o.tpl) {
                    case 1:
                        return 5;
                        break;
                    case 2:
                        return 3;
                        break;
                }
                return 0;
            },
            mainClass: function() {
                switch ($this.o.tpl) {
                    case 1:
                        return "classLine";
                        break;
                    case 2:
                        return "classBlock";
                        break;
                }
                return "classLine";
            },
            slideStyle: function() {
                switch ($this.o.tpl) {
                    case 1:
                        return "padding:5px;";
                        break;
                    case 2:
                        return "padding: 10px 5px;";
                        break;
                }
                return "";
            }
        }, ];

        match = arrayFormats.filter(function(obj) {
            return obj.format === $this.o.f;
        })[0];
        if (match) {
            return match;
        }

        return {};
    };

    this.html = function(offers) {
        var html = '',
            data_length = offers.data.length,
            props = this.getProps(),
            numberOfSlides = Math.ceil(data_length / props.offersPerSlide()),
            limit_indicators = numberOfSlides <= 5 ? numberOfSlides : 5;

        /* Top bar */
        if (this.o.f == "custom" && this.o.tpl == 1) {
            html += '<div class="' + this.namespace + 'top_bar">Top ' + (this.o.c_id ? this.o.c_id : '') + '</div>';
        }

        html += '<div class="' + this.namespace + 'carousel">';
        for (i = 0; i < numberOfSlides; i++) {
            html += '<div style="' + props.slideStyle() + '">';
            for (j = i * props.offersPerSlide(); j < (i * props.offersPerSlide()) + props.offersPerSlide(); j++) {
                if (offers.data[j]) {
                    html += this.generateOffersHTML(offers.data[j], props.mainClass());
                }
            }

            if (numberOfSlides > 1) {
                html += '<div class="' + this.namespace + props.format + ' ' + this.namespace + 'prev"><div class="content"><span><</span></div></div>';

                if (props.format != "leaderboard" && props.format != "superLeaderboard") {
                    html += '<div class="' + this.namespace + props.format + ' ' + this.namespace + 'indicator-container">';
                    for (k = 0; k < limit_indicators; k++) {
                        html += '<div class="' + this.namespace + props.format + ' ' + this.namespace + 'indicator ' + (k == i ? this.namespace + "indicator-active" : "") + '"></div>';
                    }
                    html += '</div>';
                }

                html += '<div class="' + this.namespace + props.format + ' ' + this.namespace + 'next"><div class="content"><span>></span></div></div></div>';
            }

        }
        html += '</div>';

        return html;
    };

    this.r = function() {
        var $this = this;

        this.xhr(
            this.o.url +
            "/offers?token=" + this.o.t +
            (this.o.b_id ? "&brand_id[]=" + this.o.b_id : "") +
            (this.o.p_id ? "&product_id[]=" + this.o.p_id : "") +
            (this.o.u_id ? "&universe_id=" + this.o.u_id : "") +
            (this.o.c_id ? "&category_id[]=" + this.o.c_id : "") +
            "&options[sponsored-offers-allowed]=" + this.o.cst.sponsorOffers,
            function(res) {
                if (res.status != 200) {
                    return;
                }

                var offers = JSON.parse(res.responseText),
                    mainDiv = "";

                /* Filtrer pour s'assurer que sponsored offers de chaque offre = option choisie par l'utilisateur*/
                offers.data = offers.data.filter(function(offer) {
                    if ($this.o.cst.sponsorOffers == true) {
                        return true;
                    } else if ($this.o.cst.sponsorOffers == false) {
                        if (offer.sponsored_offer) {
                            return ($this.o.cst.sponsorOffers == offer.sponsored_offer);
                        } else {
                            return true;
                        }
                    }
                });

                /* Load all images or 20 first images before acutally printing the html, if error image the widget doesn't print*/
                var length = offers.data.length || 20,
                    img = [];

                for (i = 0; i < length; i++) {
                    img[i] = new Image(), img[i].src = offers.data[i].offer_image;
                    img[i].onload = (function(i) {
                        return function() {
                            if (i == length - 1) {
                                mainDiv += $this.style() + $this.html(offers);

                                /* Render widget */
                                var shopBotWidgets = document.getElementsByClassName("shopBotWidget");
                                [].slice.call(shopBotWidgets).forEach(function(shopBotWidget) {
                                    shopBotWidget.innerHTML = mainDiv;
                                });
                                activateShopBotCarousel($this);
                                activateStarRatings($this);
                            }
                        };
                    })(i);
                }
            });
    };
}

var w = new WidgetFactory();
