(function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.visualizer = f()
    }
})(function() {
    var define, module, exports;
    return (function() {
        function r(e, n, t) {
            function o(i, f) {
                if (!n[i]) {
                    if (!e[i]) {
                        var c = "function" == typeof require && require;
                        if (!f && c) return c(i, !0);
                        if (u) return u(i, !0);
                        var a = new Error("Cannot find module '" + i + "'");
                        throw a.code = "MODULE_NOT_FOUND", a
                    }
                    var p = n[i] = {
                        exports: {}
                    };
                    e[i][0].call(p.exports, function(r) {
                        var n = e[i][1][r];
                        return o(n || r)
                    }, p, p.exports, r, e, n, t)
                }
                return n[i].exports
            }
            for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
            return o
        }
        return r
    })()({
        1: [function(require, module, exports) {
            "use strict";
            var __values = this && this.__values || function(t) {
                var n = "function" == typeof Symbol && Symbol.iterator,
                    e = n && t[n],
                    i = 0;
                if (e) return e.call(t);
                if (t && "number" == typeof t.length) return {
                    next: function() {
                        return t && i >= t.length && (t = void 0), {
                            value: t && t[i++],
                            done: !t
                        }
                    }
                };
                throw new TypeError(n ? "Object is not iterable." : "Symbol.iterator is not defined.")
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.renderCorrect = void 0;
            var visualizerEvents_1 = require("./visualizerEvents");

            function renderCorrect(t, n, e) {
                var i, o, a, s, r, l;
                if (void 0 === e && (e = !0), e && injectCSS(), n.isRejected) {
                    document.getElementById(t).innerHTML = '<div class="visualisation">\n\t<link rel="preconnect" href="https://fonts.googleapis.com"/>\n\t<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>\n\t<link href="https://fonts.googleapis.com/css2?family=Roboto+Serif:opsz@8..144&display=swap" rel="stylesheet"/>\n\t<div class="left">\n\t\t<span class="fieldName">Pateicamies par Jūsu dalību VIII pasaules diktātā latviešu valodā! <br> Diemžēl nevarējām izlabot Jūsu darbu, jo tas bija pārāk atšķirīgs no oriģināla. <br> Tas, iespējams, saistīts ar diakritisko zīmju trūkumu vai arī diktāts bija uzrakstīts tikai daļēji.</span>\n\t</div>\n</div>'
                } else {
                    var c = n.text,
                        d = 0,
                        p = [];
                    try {
                        for (var u = __values(n.mistakes), f = u.next(); !f.done; f = u.next()) {
                            var v = f.value;
                            try {
                                for (var m = (a = void 0, __values(v.bounds)), h = m.next(); !h.done; h = m.next()) {
                                    var g = h.value;
                                    p.push({
                                        bounds: g,
                                        mistake: v
                                    })
                                }
                            } catch (t) {
                                a = {
                                    error: t
                                }
                            } finally {
                                try {
                                    h && !h.done && (s = m.return) && s.call(m)
                                } finally {
                                    if (a) throw a.error
                                }
                            }
                        }
                    } catch (t) {
                        i = {
                            error: t
                        }
                    } finally {
                        try {
                            f && !f.done && (o = u.return) && o.call(u)
                        } finally {
                            if (i) throw i.error
                        }
                    }
                    p.sort(function(t, n) {
                        return t.bounds.bounds.start - n.bounds.bounds.start
                    });
                    try {
                        for (var b = __values(p), y = b.next(); !y.done; y = b.next()) {
                            var x = y.value,
                                k = x.bounds.bounds.start,
                                w = x.bounds.bounds.end,
                                z = (v = x.mistake, n.text.substring(k, w)),
                                E = '<span class="mistake bound'.concat(x.bounds.type, " ").concat(v.id, '" data-mid="').concat(v.id, '" data-description="').concat(v.description.replace(/\"/g, "&quot;"), '" data-stat="').concat(v.submissionStatistic, '" data-percent="').concat(v.percentage, '" data-type="').concat(v.mistakeType, '">').concat(z, "</span>").concat(n.text.charAt(w).match(/(\.|,|!|\?)/) ? "" : " ");
                            c = c.substring(0, k + d) + E + c.substring(w + d), d += E.length - z.length
                        }
                    } catch (t) {
                        r = {
                            error: t
                        }
                    } finally {
                        try {
                            y && !y.done && (l = b.return) && l.call(b)
                        } finally {
                            if (r) throw r.error
                        }
                    }
                    var _ = n.mistakes.map(function(t) {
                            return t.typeCounter.ortho + t.typeCounter.punct
                        }).reduce(function(t, n, e) {
                            return t + n
                        }),
                        S = '<div class="visualisation">\n\t<link rel="preconnect" href="https://fonts.googleapis.com"/>\n\t<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>\n\t<link href="https://fonts.googleapis.com/css2?family=Roboto+Serif:opsz@8..144&display=swap" rel="stylesheet"/>\n\t<div class="tooltip hiddenTooltip" id="tooltip">\n    <div class="line"></div>\n    <div class="desc">placeholder description</div>\n    <div class="type">Kļūdas tips:</div>\n    <div class="footer">Kļūda fiksēta 0 (0%) darbos</div>\n</div>\n\t<div class="head">\n\t\t<div class="left">\n\t\t\t<span class="fieldName">Ortogrāfijas kļūdas:</span><br>'.concat(n.mistakes.map(function(t) {
                            return t.typeCounter.ortho
                        }).reduce(function(t, n, e) {
                            return t + n
                        }), '<br>\n\t\t\t<span class="fieldName">Interpunkcijas kļūdas:</span><br>').concat(n.mistakes.map(function(t) {
                            return t.typeCounter.punct
                        }).reduce(function(t, n, e) {
                            return t + n
                        }), '\n\t\t</div>\n\t\t<div class="right">\n\t\t\t<span class="fieldName">Kopā:</span><br>').concat(_, " ").concat(_ > 1 ? "kļūdas" : "kļūda", '\n\t\t</div>\n\t</div>\n\t<div class="submission">\n\t\t<div class="text">\n\t\t\t').concat(c.replace(/\n/g, "<br/>"), "\n\t\t</div>\n\t</div>\n</div>");
                    document.getElementById(t).innerHTML = S, setTimeout(function() {
                        (0, visualizerEvents_1.onResize)();
                        var n = document.getElementById(t).getElementsByClassName("mistake");
                        Array.prototype.forEach.call(n, function(t) {
                            t.addEventListener("click", function(n) {
                                (0, visualizerEvents_1.onClickMistake)(t, t.dataset.mid, n)
                            }), t.addEventListener("mouseenter", function(n) {
                                (0, visualizerEvents_1.onEnterMistake)(n, t, t.dataset.description, parseInt(t.dataset.stat), parseFloat(t.dataset.percent), t.dataset.type, t.dataset.mid)
                            }), t.addEventListener("mouseleave", function(n) {
                                (0, visualizerEvents_1.onLeaveMistake)(t.dataset.mid)
                            })
                        }), (0, visualizerEvents_1.registerClickHandler)()
                    }, 0)
                }
            }

            function injectCSS() {
                var t = document.createElement("style");
                t.innerHTML = ".visualisation {\n\theight: 100%;\n\twidth: 100%;\n\tposition: relative;\n}\n\n.visualisation .mistake {\n\t/* background-color: #F8606055; */\n\ttransition: 0.5s;\n}\n\n.visualisation .boundADD {\n\t/* background-color: #6060F855; */\n\ttext-decoration: underline;\n\tcolor: #0077FF;\n}\n\n.visualisation .boundDEL {\n\tcolor: #F86060;\n\ttext-decoration: line-through;\n}\n.visualisation .mistakeHovered {\n\tfilter: brightness(0.85);\n\tcursor: pointer;\n}\n\n\n.visualisation .right {\n\ttext-align: right;\n\tposition: absolute;\n\ttop: 0;\n\tmargin-top: 5%;\n\tright: 5%;\n}\n\n.visualisation .fieldName {\n\tfont-weight: bold;\n\tfont-size: 0.75em;\n}\n\n.visualisation .left {\n\t/* float: left; */\n}\n\n.visualisation .head {\n\tposition: relative;\n\tpadding: 5%;\n\n\tfont-family: 'Roboto Serif';\n\tfont-style: normal;\n\tfont-weight: 400;\n\tfont-size: 1.5em;\n\tline-height: 1.1em;\n}\n\n.visualisation .submission {\n\tposition: relative;\n\twidth: 90%;\n\t\tleft: 5%;\n\t\ttop: clamp(calc(10% + 7.5em), calc(20% + 7.5em), 20%);\n}\n\n.visualisation .text {\n\tposition: absolute;\n\twidth: 100%;\n\ttop: 7px;\n\n\tfont-family: 'Roboto Serif';\n\tfont-style: normal;\n\tfont-weight: 400;\n\tfont-size: 1.1em;\n\t\tline-height: 1.1em;\n}\n\n.visualisation .mistakeLine {\n\tbackground-color: #F86060;\n\tposition: absolute;\n\tleft: -15px;\n\twidth: 8.5px;\n\theight: 1.1em;\n}\n\n\n/** tooltip stuff **/\n.visualisation .hiddenTooltip {\n\topacity: 0;\n}\n.visualisation .tooltip {\n\tposition: absolute;\n\twidth: min(230px, 15vw);\n\theight: -moz-fit-content;\n\t\theight: fit-content;\n\tbackground-color: white;\n\tborder-radius: 2px 2px 2px 0px;\n\tbox-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);\n\tz-index: 1000;\n\ttransition: opacity 0.25s ease-out;\n\tpointer-events: none;\n}\n\n.visualisation .line {\n\tposition: relative;\n\theight: 0.5em;\n\tbackground-color: #F86060;\n\tborder-radius: 2px 2px 0px 0px;\n}\n\n.visualisation .desc {\n\tposition: relative;\n\tleft: 9px;\n\ttop: 12%;\n\tmargin-top: 0.5em;\n\t\tmargin-bottom: 0.5em;\n\t\twidth: calc(min(230px, 15vw) - 18px);\n\t\theight: fit-content;\n\n\tfont-family: 'Roboto Serif';\n\tfont-style: normal;\n\tfont-weight: 400;\n\tfont-size: 13px;\n\tline-height: 15px;\n\n\tcolor: #000000;\n}\n\n.visualisation .type {\n\tposition: relative;\n\tright: 9px;\n\tbottom: 2%;\n\n\tfont-family: 'Roboto Serif';\n\tfont-style: normal;\n\tfont-weight: 400;\n\tfont-size: 10px;\n\tline-height: 12px;\n\ttext-align: right;\n\n\tcolor: #000000;\n}\n.visualisation .footer {\n\tposition: relative;\n\tright: 9px;\n\t\tbottom: 2%;\n\n\tfont-family: 'Roboto Serif';\n\tfont-style: normal;\n\tfont-weight: 400;\n\tfont-size: 10px;\n\tline-height: 12px;\n\ttext-align: right;\n\n\tcolor: #000000;\n}\n\n.visualisation .tooltip::after {\n\tcontent: \" \";\n\tposition: absolute;\n\ttop: 100%;\n\t/* At the bottom of the tooltip */\n\tleft: -20px;\n\tmargin-left: 0px;\n\tborder-width: 20px;\n\tborder-style: solid;\n\tborder-color: white transparent transparent transparent;\n\n\tclip-path: polygon(50% 0, 200% 0, 100% 200%, 50% 200%);\n\tfilter: drop-shadow(0px 0px 2px #000);\n}", document.getElementsByTagName("head")[0].appendChild(t)
            }
            exports.renderCorrect = renderCorrect;

        }, {
            "./visualizerEvents": 2
        }],
        2: [function(require, module, exports) {
            "use strict";
            var __values = this && this.__values || function(e) {
                var t = "function" == typeof Symbol && Symbol.iterator,
                    n = t && e[t],
                    o = 0;
                if (n) return n.call(e);
                if (e && "number" == typeof e.length) return {
                    next: function() {
                        return e && o >= e.length && (e = void 0), {
                            value: e && e[o++],
                            done: !e
                        }
                    }
                };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.registerClickHandler = exports.onResize = exports.onClickMistake = exports.onLeaveMistake = exports.onEnterMistake = void 0;
            var timeout, hold = !1,
                yOffset = -20;

            function getCont() {
                return document.getElementsByClassName("visualisation")[0]
            }

            function is_touch_enabled() {
                return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0
            }

            function getScrollXY(e) {
                var t = 0,
                    n = 0,
                    o = e;
                do {
                    void 0 !== o.scrollLeft && (t += o.scrollLeft), void 0 !== o.scrollTop && (n += o.scrollTop), o = o.parentNode
                } while (o);
                return [t, n]
            }

            function setTooltipText(e, t, n, o) {
                var s = document.getElementById("tooltip"),
                    l = Math.floor(1e3 * n) / 10;
                s.getElementsByClassName("desc")[0].innerHTML = e, s.getElementsByClassName("footer")[0].innerHTML = t >= 0 ? "Kļūda fiksēta ".concat(t, " (").concat(l >= .1 ? l : "<0.1", "%) darbos") : "";
                var i = "";
                switch (o) {
                    case "ORTHO":
                        i = "Ortogrāfijas";
                        break;
                    case "PUNCT":
                        i = "Interpunkcijas";
                        break;
                    case "TEXT":
                        i = "Trūkstošs Teksts"
                }
                s.getElementsByClassName("type")[0].innerHTML = "Kļūdas tips: ".concat(i)
            }

            function onEnterMistake(e, t, n, o, s, l, i) {
                if (Array.prototype.forEach.call(getCont().getElementsByClassName(i), function(e) {
                    return e.classList.add("mistakeHovered")
                }), !hold) {
                    timeout && clearTimeout(timeout), setTooltipText(n, o, s, l);
                    var a = document.getElementById("tooltip"),
                        r = t.getBoundingClientRect(),
                        c = getCont().getBoundingClientRect();
                    a.style.top = "".concat(r.y - a.offsetHeight + yOffset - c.top, "px"), a.style.left = "".concat(e.clientX - c.left, "px"), a.classList.remove("hiddenTooltip")
                }
            }

            function onLeaveMistake(e) {
                if (Array.prototype.forEach.call(getCont().getElementsByClassName(e), function(e) {
                    return e.classList.remove("mistakeHovered")
                }), !hold) {
                    var t = document.getElementById("tooltip");
                    t.classList.add("hiddenTooltip"), timeout && clearTimeout(timeout), timeout = setTimeout(function() {
                        t.style.top = "-420vh", t.style.left = "-69vw"
                    }, 250)
                }
            }
            exports.onEnterMistake = onEnterMistake, exports.onLeaveMistake = onLeaveMistake;
            var lastElem = null;

            function onClickMistake(e, t, n) {
                if (lastElem) {
                    var o = new MouseEvent("mouseleave", {
                        clientX: n.clientX,
                        clientY: n.clientY
                    });
                    lastElem.dispatchEvent(o)
                }
                var s = new MouseEvent("mouseenter", {
                    clientX: n.clientX,
                    clientY: n.clientY
                });
                if (e.dispatchEvent(s), lastElem = e, hold = !hold) Array.prototype.forEach.call(getCont().getElementsByClassName(t), function(e) {
                    return e.style.background = "#FFB74D55"
                });
                else {
                    document.getElementById("tooltip").classList.add("hiddenTooltip"), Array.prototype.forEach.call(getCont().getElementsByClassName("mistake"), function(e) {
                        e.style.background = "#F8606000"
                    }), lastElem = null;
                    var l = new MouseEvent("mouseenter", {
                        clientX: n.clientX,
                        clientY: n.clientY
                    });
                    e.dispatchEvent(l)
                }
            }

            function onClickAnythingElse(e) {
                if (lastElem) {
                    hold = !1, Array.prototype.forEach.call(getCont().getElementsByClassName("mistake"), function(e) {
                        e.style.background = "#F8606000"
                    });
                    var t = new MouseEvent("mouseleave", {
                        clientX: e.clientX,
                        clientY: e.clientY
                    });
                    lastElem.dispatchEvent(t), lastElem = null
                }
            }

            function onResize() {
                var e, t, n = getCont().getElementsByClassName("submission")[0].getElementsByClassName("mistake");
                try {
                    for (var o = __values(Array.from(getCont().querySelectorAll(".mistakeLine"))), s = o.next(); !s.done; s = o.next()) {
                        s.value.remove()
                    }
                } catch (t) {
                    e = {
                        error: t
                    }
                } finally {
                    try {
                        s && !s.done && (t = o.return) && t.call(o)
                    } finally {
                        if (e) throw e.error
                    }
                }
                var l = [];
                Array.prototype.forEach.call(n, function(e) {
                    var t = e.getBoundingClientRect();
                    l.includes(t.y) || (getCont().getElementsByClassName("text")[0].insertAdjacentHTML("afterend", '<div class="mistakeLine" style="top:' + (e.offsetTop + e.parentElement.offsetTop) + "px; height:" + t.height + 'px;"></div>'), l.push(t.y))
                })
            }

            function registerClickHandler() {
                getCont().addEventListener("click", function(e) {
                    var t = e.target;
                    do {
                        if (t && t.classList && t.classList.contains("mistake")) return;
                        t = t.parentNode
                    } while (t);
                    onClickAnythingElse(e)
                }), new ResizeObserver(onResize).observe(getCont())
            }
            exports.onClickMistake = onClickMistake, exports.onResize = onResize, exports.registerClickHandler = registerClickHandler;

        }, {}]
    }, {}, [1])(1)
});