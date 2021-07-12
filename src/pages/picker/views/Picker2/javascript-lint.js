!function(t) {
  "object" == typeof exports && "object" == typeof module ? t(require("codemirror")) : "function" == typeof define && define.amd ? define(["codemirror"], t) : t(CodeMirror)
}((function(t) {
    "use strict";
    var e = "CodeMirror-lint-markers";
    function n(t) {
      t.parentNode && t.parentNode.removeChild(t)
    }
    function o(e, o, r) {
      var i = function(e, n) {
        var o = document.createElement("div");
        function r(e) {
          if (!o.parentNode)
            return t.off(document, "mousemove", r);
          o.style.top = Math.max(0, e.clientY - o.offsetHeight - 5) + "px",
            o.style.left = e.clientX + 5 + "px"
        }
        return o.className = "CodeMirror-lint-tooltip",
          o.appendChild(n.cloneNode(!0)),
          document.body.appendChild(o),
          t.on(document, "mousemove", r),
          r(e),
        null != o.style.opacity && (o.style.opacity = 1),
          o
      }(e, o);
      function a() {
        var e;
        t.off(r, "mouseout", a),
        i && ((e = i).parentNode && (null == e.style.opacity && n(e),
          e.style.opacity = 0,
          setTimeout((function() {
              n(e)
            }
          ), 600)),
          i = null)
      }
      var s = setInterval((function() {
          if (i)
            for (var t = r; ; t = t.parentNode) {
              if (t && 11 == t.nodeType && (t = t.host),
              t == document.body)
                return;
              if (!t) {
                a();
                break
              }
            }
          if (!i)
            return clearInterval(s)
        }
      ), 400);
      t.on(r, "mouseout", a)
    }
    function r(t, e, n) {
      this.marked = [],
        this.options = e,
        this.timeout = null,
        this.hasGutter = n,
        this.onMouseOver = function(e) {
          !function(t, e) {
            var n = e.target || e.srcElement;
            if (!/\bCodeMirror-lint-mark-/.test(n.className))
              return;
            for (var r = n.getBoundingClientRect(), i = (r.left + r.right) / 2, a = (r.top + r.bottom) / 2, u = t.findMarksAt(t.coordsChar({
              left: i,
              top: a
            }, "client")), l = [], c = 0; c < u.length; ++c) {
              var f = u[c].__annotation;
              f && l.push(f)
            }
            l.length && function(t, e) {
              for (var n = e.target || e.srcElement, r = document.createDocumentFragment(), i = 0; i < t.length; i++) {
                var a = t[i];
                r.appendChild(s(a))
              }
              o(e, r, n)
            }(l, e)
          }(t, e)
        }
        ,
        this.waitingFor = 0
    }
    function i(t) {
      var n = t.state.lint;
      n.hasGutter && t.clearGutter(e);
      for (var o = 0; o < n.marked.length; ++o)
        n.marked[o].clear();
      n.marked.length = 0
    }
    function a(e, n, r, i) {
      var a = document.createElement("div")
        , s = a;
      return a.className = "CodeMirror-lint-marker-" + n,
      r && ((s = a.appendChild(document.createElement("div"))).className = "CodeMirror-lint-marker-multiple"),
      0 != i && t.on(s, "mouseover", (function(t) {
          o(t, e, s)
        }
      )),
        a
    }
    function s(t) {
      var e = t.severity;
      e || (e = "error");
      var n = document.createElement("div");
      return n.className = "CodeMirror-lint-message-" + e,
        void 0 !== t.messageHTML ? n.innerHTML = t.messageHTML : n.appendChild(document.createTextNode(t.message)),
        n
    }
    function u(e) {
      var n = e.state.lint.options
        , o = n.options || n
        , r = n.getAnnotations || e.getHelper(t.Pos(0, 0), "lint");
      if (r)
        if (n.async || r.async)
          !function(e, n, o) {
            var r = e.state.lint
              , i = ++r.waitingFor;
            function a() {
              i = -1,
                e.off("change", a)
            }
            e.on("change", a),
              n(e.getValue(), (function(n, o) {
                  e.off("change", a),
                  r.waitingFor == i && (o && n instanceof t && (n = o),
                    e.operation((function() {
                        l(e, n)
                      }
                    )))
                }
              ), o, e)
          }(e, r, o);
        else {
          var i = r(e.getValue(), o, e);
          if (!i)
            return;
          i.then ? i.then((function(t) {
              e.operation((function() {
                  l(e, t)
                }
              ))
            }
          )) : e.operation((function() {
              l(e, i)
            }
          ))
        }
    }
    function l(t, n) {
      i(t);
      for (var o, r, u = t.state.lint, l = u.options, c = function(t) {
        for (var e = [], n = 0; n < t.length; ++n) {
          var o = t[n]
            , r = o.from.line;
          (e[r] || (e[r] = [])).push(o)
        }
        return e
      }(n), f = 0; f < c.length; ++f) {
        var m = c[f];
        if (m) {
          for (var d = null, p = u.hasGutter && document.createDocumentFragment(), h = 0; h < m.length; ++h) {
            var v = m[h]
              , g = v.severity;
            g || (g = "error"),
              r = g,
              d = "error" == (o = d) ? o : r,
            l.formatAnnotation && (v = l.formatAnnotation(v)),
            u.hasGutter && p.appendChild(s(v)),
            v.to && u.marked.push(t.markText(v.from, v.to, {
              className: "CodeMirror-lint-mark-" + g,
              __annotation: v
            }))
          }
          u.hasGutter && t.setGutterMarker(f, e, a(p, d, m.length > 1, u.options.tooltips))
        }
      }
      l.onUpdateLinting && l.onUpdateLinting(n, c, t)
    }
    function c(t) {
      var e = t.state.lint;
      e && (clearTimeout(e.timeout),
        e.timeout = setTimeout((function() {
            u(t)
          }
        ), e.options.delay || 500))
    }
    t.defineOption("lint", !1, (function(n, o, a) {
        if (a && a != t.Init && (i(n),
        !1 !== n.state.lint.options.lintOnChange && n.off("change", c),
          t.off(n.getWrapperElement(), "mouseover", n.state.lint.onMouseOver),
          clearTimeout(n.state.lint.timeout),
          delete n.state.lint),
          o) {
          for (var s = n.getOption("gutters"), l = !1, f = 0; f < s.length; ++f)
            s[f] == e && (l = !0);
          var m = n.state.lint = new r(n,(d = o)instanceof Function ? {
            getAnnotations: d
          } : (d && !0 !== d || (d = {}),
            d),l);
          !1 !== m.options.lintOnChange && n.on("change", c),
          0 != m.options.tooltips && "gutter" != m.options.tooltips && t.on(n.getWrapperElement(), "mouseover", m.onMouseOver),
            u(n)
        }
        var d
      }
    )),
      t.defineExtension("performLint", (function() {
          this.state.lint && u(this)
        }
      ))
  }
));
