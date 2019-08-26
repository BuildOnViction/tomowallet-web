!(function(e) {
  function t(t) {
    for (
      var o, i, c = t[0], l = t[1], u = t[2], p = 0, f = [];
      p < c.length;
      p++
    )
      (i = c[p]),
        Object.prototype.hasOwnProperty.call(r, i) && r[i] && f.push(r[i][0]),
        (r[i] = 0);
    for (o in l) Object.prototype.hasOwnProperty.call(l, o) && (e[o] = l[o]);
    for (s && s(t); f.length; ) f.shift()();
    return a.push.apply(a, u || []), n();
  }
  function n() {
    for (var e, t = 0; t < a.length; t++) {
      for (var n = a[t], o = !0, c = 1; c < n.length; c++) {
        var l = n[c];
        0 !== r[l] && (o = !1);
      }
      o && (a.splice(t--, 1), (e = i((i.s = n[0]))));
    }
    return e;
  }
  var o = {},
    r = { 0: 0 },
    a = [];
  function i(t) {
    if (o[t]) return o[t].exports;
    var n = (o[t] = { i: t, l: !1, exports: {} });
    return e[t].call(n.exports, n, n.exports, i), (n.l = !0), n.exports;
  }
  (i.e = function(e) {
    var t = [],
      n = r[e];
    if (0 !== n)
      if (n) t.push(n[2]);
      else {
        var o = new Promise(function(t, o) {
          n = r[e] = [t, o];
        });
        t.push((n[2] = o));
        var a,
          c = document.createElement('script');
        (c.charset = 'utf-8'),
          (c.timeout = 120),
          i.nc && c.setAttribute('nonce', i.nc),
          (c.src = (function(e) {
            return i.p + '' + e + '.tomowallet_bundle.js';
          })(e));
        var l = new Error();
        a = function(t) {
          (c.onerror = c.onload = null), clearTimeout(u);
          var n = r[e];
          if (0 !== n) {
            if (n) {
              var o = t && ('load' === t.type ? 'missing' : t.type),
                a = t && t.target && t.target.src;
              (l.message =
                'Loading chunk ' + e + ' failed.\n(' + o + ': ' + a + ')'),
                (l.name = 'ChunkLoadError'),
                (l.type = o),
                (l.request = a),
                n[1](l);
            }
            r[e] = void 0;
          }
        };
        var u = setTimeout(function() {
          a({ type: 'timeout', target: c });
        }, 12e4);
        (c.onerror = c.onload = a), document.head.appendChild(c);
      }
    return Promise.all(t);
  }),
    (i.m = e),
    (i.c = o),
    (i.d = function(e, t, n) {
      i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (i.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (i.t = function(e, t) {
      if ((1 & t && (e = i(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (i.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          i.d(
            n,
            o,
            function(t) {
              return e[t];
            }.bind(null, o),
          );
      return n;
    }),
    (i.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return i.d(t, 'a', t), t;
    }),
    (i.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (i.p = '/'),
    (i.oe = function(e) {
      throw (console.error(e), e);
    });
  var c = (window.webpackJsonp = window.webpackJsonp || []),
    l = c.push.bind(c);
  (c.push = t), (c = c.slice());
  for (var u = 0; u < c.length; u++) t(c[u]);
  var s = l;
  a.push([811, 1]), n();
})({
  12: function(e, t, n) {
    'use strict';
    n.d(t, 'a', function() {
      return o;
    }),
      n.d(t, 'b', function() {
        return r;
      }),
      n.d(t, 'c', function() {
        return a;
      }),
      n.d(t, 'd', function() {
        return i;
      }),
      n.d(t, 'e', function() {
        return c;
      }),
      n.d(t, 'f', function() {
        return l;
      }),
      n.d(t, 'g', function() {
        return u;
      }),
      n.d(t, 'h', function() {
        return s;
      }),
      n.d(t, 'i', function() {
        return p;
      }),
      n.d(t, 'j', function() {
        return f;
      }),
      n.d(t, 'k', function() {
        return d;
      }),
      n.d(t, 'm', function() {
        return m;
      }),
      n.d(t, 'l', function() {
        return b;
      });
    var o = 'TOMO_WALLET/GLOBAL/RELEASE_WALLET_INFO',
      r = 'TOMO_WALLET/GLOBAL/RESET_WALLET_POPUP',
      a = 'TOMO_WALLET/GLOBAL/SET_LANGUAGE',
      i = 'TOMO_WALLET/GLOBAL/SET_NETWORK',
      c = 'TOMO_WALLET/GLOBAL/STORE_WALLET_INFO',
      l = 'TOMO_WALLET/GLOBAL/TOGGLE_LOADING_SCREEN',
      u = 'TOMO_WALLET/GLOBAL/TOGGLE_NETWORK_CONFIRMATION_POPUP',
      s = 'TOMO_WALLET/GLOBAL/TOGGLE_NAVBAR_OPTIONS',
      p = 'TOMO_WALLET/GLOBAL/TOGGLE_WALLET_POPUP',
      f = 'TOMO_WALLET/GLOBAL/UPDATE_WALLET_POPUP_CONTENT_TAB',
      d = 'TOMO_WALLET/GLOBAL/UPDATE_WALLET_POPUP_STAGE',
      m = { WARNING: 1, CONTENT: 2 },
      b = { RECOVERY_PHRASE: 1, PRIVATE_KEY: 2 };
  },
  131: function(e, t, n) {
    'use strict';
    var o = n(0),
      r = n.n(o),
      a = n(1),
      i = n.n(a),
      c = n(15),
      l = n.n(c),
      u = n(822),
      s = n(823),
      p = n(824),
      f = n(825),
      d = n(813),
      m = n(814),
      b = n(9),
      y = n(834);
    function O() {
      var e = (function(e, t) {
        t || (t = e.slice(0));
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
        );
      })([
        '\n  .modal-content {\n    padding: 2em;\n  }\n  .modal-header {\n    justify-content: center;\n    border: 0;\n    padding: 0;\n    button.close {\n      display: none;\n      position: absolute;\n      top: 15px;\n      right: 15px;\n    }\n  }\n  .modal-body {\n    padding: 3em 0;\n  }\n  .modal-footer {\n    border: 0;\n    padding: 0;\n  }\n',
      ]);
      return (
        (O = function() {
          return e;
        }),
        e
      );
    }
    var h = Object(b.a)(y.a)(O()),
      g = n(85);
    function v(e) {
      return (v =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function _() {
      return (_ =
        Object.assign ||
        function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        }).apply(this, arguments);
    }
    function E(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function w(e, t) {
      return !t || ('object' !== v(t) && 'function' != typeof t)
        ? (function(e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return e;
          })(e)
        : t;
    }
    function T(e) {
      return (T = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function P(e, t) {
      return (P =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    var A = (function(e) {
      function t() {
        return (
          (function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
          w(this, T(t).apply(this, arguments))
        );
      }
      var n, a, i;
      return (
        (function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function',
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            t && P(e, t);
        })(t, o['PureComponent']),
        (n = t),
        (a = [
          {
            key: 'render',
            value: function() {
              var e = this.props,
                t = e.backdrop,
                n = e.button,
                o = e.centered,
                a = e.className,
                i = e.Content,
                c = e.Footer,
                b = e.getContentProps,
                y = e.getFooterProps,
                O = e.getPopupProps,
                v = e.isOpen,
                E = e.noHeader,
                w = e.title,
                T = e.toggle;
              return r.a.createElement(
                h,
                _(
                  {
                    backdrop: t,
                    className: a,
                    centered: o,
                    isOpen: v,
                    title: w,
                    toggle: T,
                  },
                  O,
                ),
                !E && r.a.createElement(u.a, { toggle: T }, w),
                r.a.createElement(s.a, null, r.a.createElement(i, b)),
                r.a.createElement(
                  p.a,
                  null,
                  c
                    ? r.a.createElement(c, y)
                    : (l()(n, 'primary') || l()(n, 'secondary')) &&
                        r.a.createElement(
                          f.a,
                          { className: 'px-0' },
                          r.a.createElement(
                            d.a,
                            null,
                            l()(n, 'secondary') &&
                              r.a.createElement(
                                m.a,
                                { size: 6 },
                                r.a.createElement(
                                  g.h,
                                  _(
                                    {
                                      onClick: l()(
                                        n,
                                        'secondary.action',
                                        function() {},
                                      ),
                                      disabled: l()(n, 'secondary.disabled'),
                                    },
                                    l()(n, 'secondary'),
                                  ),
                                  l()(n, 'secondary.label', ''),
                                ),
                              ),
                            l()(n, 'primary') &&
                              r.a.createElement(
                                m.a,
                                { size: 6 },
                                r.a.createElement(
                                  g.h,
                                  _(
                                    {
                                      onClick: l()(
                                        n,
                                        'primary.action',
                                        function() {},
                                      ),
                                      disabled: l()(n, 'primary.disabled'),
                                    },
                                    l()(n, 'primary'),
                                  ),
                                  l()(n, 'primary.label', ''),
                                ),
                              ),
                          ),
                        ),
                ),
              );
            },
          },
        ]) && E(n.prototype, a),
        i && E(n, i),
        t
      );
    })();
    (A.propTypes = {
      backdrop: i.a.oneOfType([i.a.bool, i.a.oneOf(['static'])]),
      button: i.a.shape({ primary: i.a.object, secondary: i.a.object }),
      centered: i.a.bool,
      onClosed: i.a.func,
      className: i.a.string,
      Content: i.a.oneOfType([i.a.element, i.a.func]),
      Footer: i.a.oneOfType([i.a.element, i.a.func]),
      getContentProps: i.a.object,
      getFooterProps: i.a.object,
      getPopupProps: i.a.object,
      isOpen: i.a.bool,
      noHeader: i.a.bool,
      title: i.a.string,
      toggle: i.a.func,
    }),
      (A.defaultProps = {
        backdrop: 'static',
        button: { primary: { label: 'OK' } },
        className: '',
        Content: function() {
          return null;
        },
        getContentProps: {},
        getFooterProps: {},
        getPopupProps: {},
        centered: !0,
        isOpen: !1,
        noHeader: !1,
        title: '',
        toggle: function() {},
      });
    t.a = A;
  },
  163: function(e, t, n) {
    'use strict';
    var o = n(30),
      r = n(220),
      a = (n(219), n(566), n(569), n(164)),
      i = n(15),
      c = n.n(i),
      l = (n(32), n(18)),
      u = n(12),
      s = n(5),
      p = { isOpen: !1, stage: u.m.WARNING, tabType: u.l.PRIVATE_KEY },
      f = Object(a.a)({
        language: c()(s.c, ['LANGUAGES', 0, 'value'], ''),
        loading: !1,
        network: { data: s.c.NETWORKS[0], isExpanded: !1 },
        wallet: null,
        walletPopup: p,
        networkConfirmationPopup: { isOpen: !1, selected: {} },
      }),
      d = function() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case u.a:
            return e.set('wallet', null);
          case u.b:
            return e.set('walletPopup', p);
          case u.c:
            return e.set(
              'language',
              (
                s.c.LANGUAGES.find(function(e) {
                  return e.value === t.language;
                }) || {}
              ).value || '',
            );
          case u.d:
            return e.setIn(['network', 'data'], t.network);
          case u.e:
            return e.set('wallet', t.data);
          case u.f:
            return e.set('loading', t.bool);
          case u.g:
            return e
              .setIn(['networkConfirmationPopup', 'isOpen'], t.bool)
              .setIn(['networkConfirmationPopup', 'selected'], t.networkOpt);
          case u.h:
            return e.setIn(['network', 'isExpanded'], t.bool);
          case u.i:
            var n = e.setIn(['walletPopup', 'isOpen'], t.bool);
            return t.bool
              ? n
              : n
                  .setIn(['walletPopup', 'stage'], u.m.WARNING)
                  .setIn(['walletPopup', 'tabType'], u.l.PRIVATE_KEY);
          case u.j:
            return e.setIn(['walletPopup', 'tabType'], t.tabType);
          case u.k:
            return e.setIn(['walletPopup', 'stage'], t.stage);
          default:
            return e;
        }
      };
    function m(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        t &&
          (o = o.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, o);
      }
      return n;
    }
    function b(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? m(n, !0).forEach(function(t) {
              y(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : m(n).forEach(function(t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t),
              );
            });
      }
      return e;
    }
    function y(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    t.a = function() {
      var e =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      return Object(o.c)(b({ global: d, router: Object(r.a)(l.j) }, e));
    };
  },
  18: function(e, t, n) {
    'use strict';
    var o = n(0),
      r = n.n(o),
      a = n(36),
      i = n.n(a),
      c = n(28),
      l = n(33),
      u = n.n(l),
      s = n(32),
      p = n.n(s),
      f = n(61),
      d = n.n(f),
      m = n(128),
      b = n.n(m),
      y = n(161),
      O = n.n(y),
      h = n(146),
      g = n.n(h);
    function v(e) {
      var t = {
        dispatch: d.a,
        subscribe: d.a,
        getState: d.a,
        replaceReducer: d.a,
        injectedReducers: g.a,
      };
      u()(O()(e, t), '(app/utils...) injectors: Expected a valid redux store');
    }
    var _ = n(163);
    function E(e, t) {
      return function(n, o) {
        t || v(e),
          u()(
            b()(n) && !p()(n) && d()(o),
            '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
          ),
          (Reflect.has(e.injectedReducers, n) && e.injectedReducers[n] === o) ||
            ((e.injectedReducers[n] = o),
            e.replaceReducer(Object(_.a)(e.injectedReducers)));
      };
    }
    function w(e) {
      return v(e), { injectReducer: E(e, !0) };
    }
    function T(e) {
      return (T =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function P(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function A(e, t) {
      return !t || ('object' !== T(t) && 'function' != typeof t)
        ? (function(e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return e;
          })(e)
        : t;
    }
    function N(e) {
      return (N = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function R(e, t) {
      return (R =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    function L(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var S = function(e) {
        var t = e.key,
          n = e.reducer;
        return function(e) {
          var o = (function(o) {
            function a(e, o) {
              var r;
              return (
                (function(e, t) {
                  if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function');
                })(this, a),
                (r = A(this, N(a).call(this, e, o))),
                w(o.store).injectReducer(t, n),
                r
              );
            }
            var i, c, l;
            return (
              (function(e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError(
                    'Super expression must either be null or a function',
                  );
                (e.prototype = Object.create(t && t.prototype, {
                  constructor: { value: e, writable: !0, configurable: !0 },
                })),
                  t && R(e, t);
              })(a, r.a.Component),
              (i = a),
              (c = [
                {
                  key: 'render',
                  value: function() {
                    return r.a.createElement(e, this.props);
                  },
                },
              ]) && P(i.prototype, c),
              l && P(i, l),
              a
            );
          })();
          return (
            L(o, 'WrappedComponent', e),
            L(o, 'contextType', c.b),
            L(
              o,
              'displayName',
              'withReducer('.concat(
                e.displayName || e.name || 'Component',
                ')',
              ),
            ),
            i()(o, e)
          );
        };
      },
      j = '@@saga-injector/daemon',
      M = '@@saga-injector/once-till-unmount';
    function I(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        t &&
          (o = o.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, o);
      }
      return n;
    }
    function k(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? I(n, !0).forEach(function(t) {
              C(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : I(n).forEach(function(t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t),
              );
            });
      }
      return e;
    }
    function C(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var x = ['@@saga-injector/restart-on-remount', j, M],
      W = function(e) {
        return u()(
          b()(e) && !p()(e),
          '(app/utils...) injectSaga: Expected `key` to be a non empty string',
        );
      },
      D = function(e) {
        var t = {
          saga: d.a,
          mode: function(e) {
            return b()(e) && x.includes(e);
          },
        };
        u()(
          O()(e, t),
          '(app/utils...) injectSaga: Expected a valid saga descriptor',
        );
      };
    function B(e, t) {
      return function(n) {
        var o =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          r = arguments.length > 2 ? arguments[2] : void 0;
        t || v(e);
        var a = k({}, o, { mode: o.mode || j }),
          i = a.saga,
          c = a.mode;
        W(n), D(a);
        var l = Reflect.has(e.injectedSagas, n);
        (!l || (l && c !== j && c !== M)) &&
          (e.injectedSagas[n] = k({}, a, { task: e.runSaga(i, r) }));
      };
    }
    function U(e, t) {
      return function(n) {
        if ((t || v(e), W(n), Reflect.has(e.injectedSagas, n))) {
          var o = e.injectedSagas[n];
          o.mode &&
            o.mode !== j &&
            (o.task.cancel(), (e.injectedSagas[n] = 'done'));
        }
      };
    }
    function H(e) {
      return v(e), { injectSaga: B(e, !0), ejectSaga: U(e, !0) };
    }
    function Y(e) {
      return (Y =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function V(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function G(e, t) {
      return !t || ('object' !== Y(t) && 'function' != typeof t)
        ? (function(e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return e;
          })(e)
        : t;
    }
    function F(e) {
      return (F = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function K(e, t) {
      return (K =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    function z(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var q = function(e) {
        var t = e.key,
          n = e.saga,
          o = e.mode;
        return function(e) {
          var a = (function(a) {
            function i(e, r) {
              var a;
              return (
                (function(e, t) {
                  if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function');
                })(this, i),
                ((a = G(this, F(i).call(this, e, r))).injectors = H(r.store)),
                a.injectors.injectSaga(t, { saga: n, mode: o }, a.props),
                a
              );
            }
            var c, l, u;
            return (
              (function(e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError(
                    'Super expression must either be null or a function',
                  );
                (e.prototype = Object.create(t && t.prototype, {
                  constructor: { value: e, writable: !0, configurable: !0 },
                })),
                  t && K(e, t);
              })(i, r.a.Component),
              (c = i),
              (l = [
                {
                  key: 'componentWillUnmount',
                  value: function() {
                    this.injectors.ejectSaga(t);
                  },
                },
                {
                  key: 'render',
                  value: function() {
                    return r.a.createElement(e, this.props);
                  },
                },
              ]) && V(c.prototype, l),
              u && V(c, u),
              i
            );
          })();
          return (
            z(a, 'WrappedComponent', e),
            z(a, 'contextType', c.b),
            z(
              a,
              'displayName',
              'withSaga('.concat(e.displayName || e.name || 'Component', ')'),
            ),
            i()(a, e)
          );
        };
      },
      J = n(48),
      X = Object(J.a)(),
      Q = n(41),
      Z = n(97),
      $ = n.n(Z),
      ee = Object(Q.a)(Q.c, $.a),
      te = n(15),
      ne = n.n(te),
      oe = n(265),
      re = n.n(oe);
    function ae(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        t &&
          (o = o.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, o);
      }
      return n;
    }
    function ie(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var ce = function(e) {
        for (
          var t = e,
            n = [],
            o = function() {
              if (1 === t.length) return n.push(t[0]), 'break';
              var e = Math.floor((100 * Math.random()) % t.length);
              t[e] &&
                (n.push(t[e]),
                (t = t.filter(function(t, n) {
                  return n !== e;
                })));
            };
          t.length > 0;

        ) {
          if ('break' === o()) break;
        }
        return n;
      },
      le = function(e) {
        return e
          .trim()
          .replace(/[\r\n]+/g, '')
          .split(/[ ]+/)
          .join(' ');
      },
      ue = function(e, t) {
        sessionStorage.setItem(
          'global',
          JSON.stringify(
            (function(e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2
                  ? ae(n, !0).forEach(function(t) {
                      ie(e, t, n[t]);
                    })
                  : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                      e,
                      Object.getOwnPropertyDescriptors(n),
                    )
                  : ae(n).forEach(function(t) {
                      Object.defineProperty(
                        e,
                        t,
                        Object.getOwnPropertyDescriptor(n, t),
                      );
                    });
              }
              return e;
            })({}, JSON.parse(sessionStorage.getItem('global')), ie({}, e, t)),
          ),
        );
      },
      se = function(e) {
        return ne()(JSON.parse(sessionStorage.getItem('global')), [e]);
      },
      pe = function(e) {
        sessionStorage.setItem(
          'global',
          JSON.stringify(re()(JSON.parse(sessionStorage.getItem('global')), e)),
        );
      },
      fe = function(e) {
        ue('web3Info', e);
      },
      de = function() {
        return se('web3Info');
      },
      me = function() {
        pe('web3Info');
      },
      be = function(e) {
        ue('locale', e);
      },
      ye = function() {
        return se('locale');
      },
      Oe = function(e) {
        ue('network', e);
      },
      he = function() {
        return se('network');
      },
      ge = function(e) {
        ue('ledger', e);
      },
      ve = function() {
        return se('ledger');
      },
      _e = function() {
        return pe('ledger');
      },
      Ee = n(68),
      we = n(352),
      Te = n.n(we);
    function Pe(e) {
      return (
        (function(e) {
          if (Array.isArray(e)) {
            for (var t = 0, n = new Array(e.length); t < e.length; t++)
              n[t] = e[t];
            return n;
          }
        })(e) ||
        (function(e) {
          if (
            Symbol.iterator in Object(e) ||
            '[object Arguments]' === Object.prototype.toString.call(e)
          )
            return Array.from(e);
        })(e) ||
        (function() {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance',
          );
        })()
      );
    }
    function Ae(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        t &&
          (o = o.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, o);
      }
      return n;
    }
    function Ne(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Ae(n, !0).forEach(function(t) {
              Re(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : Ae(n).forEach(function(t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t),
              );
            });
      }
      return e;
    }
    function Re(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var Le = function(e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!p()(e)) {
          var n = t;
          return (
            e.forEach(function(e) {
              var t = Object.keys(e)[0];
              n = Object.keys(n).includes(t)
                ? Ne({}, n, Re({}, t, [].concat(Pe(n[t]), Pe(e[t]))))
                : Ne({}, n, {}, e);
            }),
            n
          );
        }
        return t;
      },
      Se = function(e, t) {
        var n = e.name,
          o = e.value;
        return p()(o) && !Te()(o) ? Re({}, n, [t]) : {};
      },
      je = function(e) {
        return function(t, n) {
          var o = t.name,
            r = t.value;
          return p()(r) || e.utils.isHex(r) ? {} : Re({}, o, [n]);
        };
      },
      Me = function(e, t) {
        var n = e.name,
          o = e.value,
          r = e.max;
        return !p()(o) && o > r ? Re({}, n, [t]) : {};
      },
      Ie = function(e, t) {
        var n = e.name,
          o = e.value,
          r = e.min;
        return !p()(o) && o < r ? Re({}, n, [t]) : {};
      },
      ke = function(e) {
        return function(t, n) {
          var o = t.name,
            r = t.value;
          return p()(r) || e.utils.isAddress(r) ? {} : Re({}, o, [n]);
        };
      },
      Ce = function(e, t) {
        var n = e.name,
          o = e.value,
          r = e.max;
        return !p()(o) && o.length > r ? Re({}, n, [t]) : {};
      },
      xe = function(e) {
        return {
          isRequired: Se,
          isMaxNumber: Me,
          isMinNumber: Ie,
          isMaxLength: Ce,
          isHex: je(e),
          isAddress: ke(e),
        };
      },
      We = n(46),
      De = n(44);
    function Be(e) {
      return (Be =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function Ue(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        t &&
          (o = o.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, o);
      }
      return n;
    }
    function He(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function Ye() {
      return (Ye =
        Object.assign ||
        function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        }).apply(this, arguments);
    }
    function Ve(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function Ge(e, t) {
      return !t || ('object' !== Be(t) && 'function' != typeof t)
        ? (function(e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return e;
          })(e)
        : t;
    }
    function Fe(e) {
      return (Fe = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function Ke(e, t) {
      return (Ke =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    var ze = function(e) {
      var t = (function(t) {
        function n() {
          return (
            (function(e, t) {
              if (!(e instanceof t))
                throw new TypeError('Cannot call a class as a function');
            })(this, n),
            Ge(this, Fe(n).apply(this, arguments))
          );
        }
        var a, i, c;
        return (
          (function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError(
                'Super expression must either be null or a function',
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              t && Ke(e, t);
          })(n, o['PureComponent']),
          (a = n),
          (i = [
            {
              key: 'render',
              value: function() {
                var t = this.props,
                  n = t.loading,
                  o = t.onToggleLoading;
                return r.a.createElement(
                  e,
                  Ye({}, this.props, { loading: n, toggleLoading: o }),
                );
              },
            },
          ]) && Ve(a.prototype, i),
          c && Ve(a, c),
          n
        );
      })();
      e.defaultProps &&
        (t.defaultProps = (function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? Ue(n, !0).forEach(function(t) {
                  He(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : Ue(n).forEach(function(t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t),
                  );
                });
          }
          return e;
        })({}, e.defaultProps));
      var n = Object(c.c)(
        function() {
          return Object(Q.b)({ loading: We.b });
        },
        function(e) {
          return {
            onToggleLoading: function(t) {
              return e(Object(De.e)(t));
            },
          };
        },
      );
      return i()(n(t), e);
    };
    n.d(t, 'k', function() {
      return S;
    }),
      n.d(t, 'l', function() {
        return q;
      }),
      n.d(t, 'j', function() {
        return X;
      }),
      n.d(t, 'a', function() {
        return ee;
      }),
      n.d(t, 'v', function() {
        return ce;
      }),
      n.d(t, 'n', function() {
        return Ee.e;
      }),
      n.d(t, 'c', function() {
        return Ee.b;
      }),
      n.d(t, 'h', function() {
        return Ee.c;
      }),
      n.d(t, 'g', function() {
        return xe;
      }),
      n.d(t, 'm', function() {
        return Le;
      }),
      n.d(t, 'q', function() {
        return Ee.g;
      }),
      n.d(t, 'i', function() {
        return de;
      }),
      n.d(t, 'u', function() {
        return fe;
      }),
      n.d(t, 'p', function() {
        return me;
      }),
      n.d(t, 'x', function() {
        return ze;
      }),
      n.d(t, 'b', function() {
        return Ee.a;
      }),
      n.d(t, 'e', function() {
        return ye;
      }),
      n.d(t, 's', function() {
        return be;
      }),
      n.d(t, 'f', function() {
        return he;
      }),
      n.d(t, 't', function() {
        return Oe;
      }),
      n.d(t, 'd', function() {
        return ve;
      }),
      n.d(t, 'r', function() {
        return ge;
      }),
      n.d(t, 'o', function() {
        return _e;
      }),
      n.d(t, 'w', function() {
        return le;
      });
  },
  227: function(e, t, n) {
    'use strict';
    var o = n(0),
      r = n.n(o),
      a = n(1),
      i = n.n(a),
      c = n(354),
      l = n.n(c);
    function u(e) {
      return (u =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function s(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function p(e) {
      return (p = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function f(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e;
    }
    function d(e, t) {
      return (d =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    var m = (function(e) {
      function t(e) {
        var n, o, r;
        return (
          (function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
          (o = this),
          ((n =
            !(r = p(t).call(this, e)) ||
            ('object' !== u(r) && 'function' != typeof r)
              ? f(o)
              : r).state = { isLoaded: !1, isErrorHandled: !1 }),
          (n.handleLoadImage = n.handleLoadImage.bind(f(n))),
          (n.handleLoadImageFailed = n.handleLoadImageFailed.bind(f(n))),
          n
        );
      }
      var n, a, i;
      return (
        (function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function',
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            t && d(e, t);
        })(t, o['PureComponent']),
        (n = t),
        (a = [
          {
            key: 'handleLoadImage',
            value: function() {
              this.setState({ isLoaded: !0 });
            },
          },
          {
            key: 'handleLoadImageFailed',
            value: function() {
              this.state.isErrorHandled || this.setState({ isLoaded: !1 });
            },
          },
          {
            key: 'render',
            value: function() {
              var e = this.props,
                t = e.alt,
                n = e.defaultSrc,
                a = e.src,
                i = this.state.isLoaded;
              return r.a.createElement(
                o.Fragment,
                null,
                !i && r.a.createElement('img', { src: n, alt: t }),
                r.a.createElement('img', {
                  src: a,
                  alt: t,
                  onLoad: this.handleLoadImage,
                  onError: this.handleLoadImageFailed,
                  style: { display: i ? 'block' : 'none' },
                }),
              );
            },
          },
        ]) && s(n.prototype, a),
        i && s(n, i),
        t
      );
    })();
    (m.propTypes = {
      defaultSrc: i.a.string,
      src: i.a.string,
      alt: i.a.string,
    }),
      (m.defaultProps = { defaultSrc: l.a, src: '', alt: 'No image found!' }),
      (t.a = m);
  },
  228: function(e, t, n) {
    'use strict';
    var o = n(0),
      r = n.n(o),
      a = n(1),
      i = n.n(a),
      c = n(15),
      l = n.n(c),
      u = n(814),
      s = n(9),
      p = n(813);
    function f() {
      var e = (function(e, t) {
        t || (t = e.slice(0));
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
        );
      })([
        '\n  &.bordered {\n    border-radius: 8px;\n    border: 1px solid #444b64;\n  }\n',
      ]);
      return (
        (f = function() {
          return e;
        }),
        e
      );
    }
    var d = Object(s.a)(p.a)(f());
    function m(e) {
      return (m =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function b() {
      return (b =
        Object.assign ||
        function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        }).apply(this, arguments);
    }
    function y(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function O(e) {
      return (O = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function h(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e;
    }
    function g(e, t) {
      return (g =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    var v = (function(e) {
      function t(e) {
        var n, o, r;
        return (
          (function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
          (o = this),
          ((n =
            !(r = O(t).call(this, e)) ||
            ('object' !== m(r) && 'function' != typeof r)
              ? h(o)
              : r).WORD_NUMBER = 12),
          (n.handleConvertMnemonic = n.handleConvertMnemonic.bind(h(n))),
          n
        );
      }
      var n, a, i;
      return (
        (function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function',
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            t && g(e, t);
        })(t, o['PureComponent']),
        (n = t),
        (a = [
          {
            key: 'handleConvertMnemonic',
            value: function() {
              var e = this.props.mnemonic;
              return Array.isArray(e) ? e : e.split(' ');
            },
          },
          {
            key: 'render',
            value: function() {
              var e = this.props,
                t = e.className,
                n = e.getCellProps,
                o = e.WordCell,
                a = this.handleConvertMnemonic();
              return r.a.createElement(
                d,
                {
                  noGutters: !0,
                  className: 'bordered'.concat(t ? ' '.concat(t) : ''),
                },
                Array(this.WORD_NUMBER)
                  .fill(null)
                  .map(function(e, t) {
                    return r.a.createElement(
                      u.a,
                      {
                        key: 'word_'.concat(t + 1),
                        xs: 6,
                        sm: 6,
                        md: 4,
                        lg: 4,
                        className: 'p-4',
                      },
                      ''.concat(t + 1, '. '),
                      (o && r.a.createElement(o, b({ wordIdx: t }, n))) ||
                        (!o && l()(a, [t], '')),
                    );
                  }),
              );
            },
          },
        ]) && y(n.prototype, a),
        i && y(n, i),
        t
      );
    })();
    (v.propTypes = {
      className: i.a.string,
      getCellProps: i.a.object,
      mnemonic: i.a.oneOfType([i.a.string, i.a.arrayOf(i.a.string)]),
      WordCell: i.a.oneOfType([i.a.element, i.a.func]),
    }),
      (v.defaultProps = { className: '', getCellProps: {}, mnemonic: '' });
    t.a = v;
  },
  339: function(e, t, n) {
    e.exports = n.p + '6e7ab60d94384464b837ca345e16342c.png';
  },
  341: function(e, t, n) {
    e.exports = n.p + 'fedffd45d1a191798cbc13a00d8d156e.eot';
  },
  346: function(e) {
    e.exports = JSON.parse(
      '{"tomowallet.common.button.back":"Back","tomowallet.common.button.next":"Next","tomowallet.common.button.save":"Save","tomowallet.common.button.import":"Import","tomowallet.common.button.send":"Send","tomowallet.common.button.receive":"Receive","tomowallet.common.button.maximum":"Max","tomowallet.common.button.confirm":"Confirm","tomowallet.common.list.language.english":"English","tomowallet.common.list.language.french":"French","tomowallet.header.navbar.option.about":"About"}',
    );
  },
  347: function(e) {
    e.exports = JSON.parse(
      '{"tomowallet.common.button.back":"Retour","tomowallet.common.button.next":"Suivant","tomowallet.common.button.save":"Enregistrer","tomowallet.common.button.import":"Importez","tomowallet.common.button.send":"Envoyer","tomowallet.common.button.receive":"Recevoir","tomowallet.common.button.maximum":"Max","tomowallet.common.button.confirm":"Confirmer","tomowallet.common.button.unlock":"Ouvrir","tomowallet.common.list.language.english":"Anglais","tomowallet.common.list.language.french":"Français","tomowallet.common.list.network.tomochain.testnet":"Réseau de Test TomoChain","tomowallet.common.list.network.tomochain.mainnet":"Réseau Principal TomoChain","tomowallet.component.navbar.logo.alt":"TOMOCHAIN LOGO","tomowallet.component.navbar.option.about":"Sur","tomowallet.component.navbar.option.faqs":"FAQ","tomowallet.component.navbar.option.mywallet":"Mon Portefeuille","tomowallet.component.navbar.option.mywallet.option.showprofile":"Afficher le Portefeuille","tomowallet.component.navbar.option.mywallet.option.settings":"Aider","tomowallet.component.navbar.option.mywallet.option.logout":"Connectez - Out","tomowallet.component.navbar.popup.showwallet.title":"Montre Portefeuille","tomowallet.component.navbar.popup.showwallet.warning.image.alt":"Image d\'avertissement","tomowallet.component.navbar.popup.showwallet.warning.text":"Nous sommes sur le point de montrer votre phrase de récupération et votre clé privée. Veuillez vous assurer que personne d\'autre ne regarde votre écran.","tomowallet.component.navbar.popup.showwallet.tab.recoveryphrase":"Phrase de récupération","tomowallet.component.navbar.popup.showwallet.tab.privatekey":"Clé privée","tomowallet.component.navbar.popup.showwallet.tab.privatekey.note":"Supprimer tous les espaces pour utiliser la clé privée, s\'il vous plaît","tomowallet.component.footer.versiontext":"TomoWallet 2019 - v1.0","tomowallet.component.footer.option.help":"Besoin d\'aide pour?","tomowallet.component.footer.option.policy":"Politique de Confidentialité","tomowallet.component.footer.option.termsofservice":"Conditions d\'Utilisation","tomowallet.component.footer.option.apidocumentation":"Documentation API","tomowallet.container.welcome.title":"Bienvenue à TomoWallet","tomowallet.container.welcome.description":"TomoWallet (nos amis nous appellent TMW) est une interface client gratuite vous permettant d’interagir avec TomoChain. Notre plate-forme open-source conviviale vous permet de générer des portefeuilles, d\'interagir avec des contrats intelligents et bien plus encore.","tomowallet.container.welcome.button.importwallet":"Importez Votre Portefeuille","tomowallet.container.welcome.textbetweenbuttons":"ou","tomowallet.container.welcome.button.createnewwallet":"Créer un Nouveau Portefeuille","tomowallet.container.welcome.image.alt":"Bienvenue à TomoWallet","tomowallet.container.importwallet.header.title":"Importez Votre Portefeuille","tomowallet.container.importwallet.alternative.text":"Ne pas avoir un portefeuille?","tomowallet.container.importwallet.alternative.link":"Créer un nouveau portefeuille","tomowallet.container.importwallet.tab.ledger.image.alt":"Grand Livre","tomowallet.container.importwallet.tab.ledger.text":"Portefeuille Ledger","tomowallet.container.importwallet.tab.ledger.input.label":"Sélectionnez le chemin de dérivation HD","tomowallet.container.importwallet.tab.ledger.input.placeholder":"Sélectionnez le chemin de dérivation HD...","tomowallet.container.importwallet.tab.ledger.input.description":"Pour déverrouiller le portefeuille, essayez les chemins {path1} ou {path2} avec Ethereum App, ou essayez chemin {path3} avec TomoChain App (dans Ledger).","tomowallet.container.importwallet.tab.recoveryphrase.text":"Phrase de Récupération / Clé Privée","tomowallet.container.importwallet.tab.recoveryphrase.input.label":"Entrez votre Phrase de Récupération ou votre Clé Privée","tomowallet.container.importwallet.tab.recoveryphrase.input.placeholder":"Entrez votre Phrase de Récupération ou votre Clé Privée...","tomowallet.container.importwallet.tab.recoveryphrase.option.importviaqrcode":"Importer une Clé Privée via un code QR","tomowallet.container.importwallet.popup.address.title":"Portefeuille Ledger","tomowallet.container.createwallet.warning.header.title":"Créer un Nouveau Portefeuille","tomowallet.container.createwallet.warning.header.alternative.text":"Vous avez déjà un portefeuille?","tomowallet.container.createwallet.warning.header.alternative.link":"Importez votre portefeuille","tomowallet.container.createwallet.warning.image.alt":"Attention!","tomowallet.container.createwallet.warning.content.title":"Sécurisons votre compte","tomowallet.container.createwallet.warning.content.description":"Votre phrase de sauvegarde contient toutes les clés privées de votre portefeuille. S\'il vous plaît écrivez ces 12 mots, dans l\'ordre, et gardez-les dans un endroit sûr, hors ligne. Cette phrase donnera à vous (ou à quiconque le possède) un moyen de restaurer votre portefeuille et d\'accéder à vos fonds. Si vous perdez votre mot de passe ou si notre service est indisponible, ce sera votre filet de sécurité.","tomowallet.container.createwallet.warning.content.description.danger":"Si vous perdez votre phrase de récupération, vous ne pourrez plus accéder à votre compte.","tomowallet.container.createwallet.warning.button.nexttorecoveryphrase":"À côté de la Phrase de Récupération","tomowallet.container.createwallet.recoveryphrase.title":"Phrase de Récupération","tomowallet.container.createwallet.recoveryphrase.notification.title":"S\'il vous plaît sauvegarder phrase de récupération","tomowallet.container.createwallet.recoveryphrase.notification.description":"Sauvegardez le texte ci-dessous sur papier et conservez-le dans un endroit secret pour le sauvegarder.","tomowallet.container.createwallet.recoveryphrase.button.save":"Enregistrer la Phrase de Récupération","tomowallet.container.createwallet.recoveryphrase.button.view.privatekey":"Voir ma clé privée","tomowallet.container.createwallet.recoveryphrase.button.confirmation":"J\'ai écrit ma Phrase de Récupération","tomowallet.container.createwallet.recoveryphrase.popup.confirmation.header":"Phrase de Récupération?","tomowallet.container.createwallet.recoveryphrase.popup.confirmation.image.alt":"Avez-vous noté?","tomowallet.container.createwallet.recoveryphrase.popup.confirmation.content":"Êtes-vous sûr d\'avoir noté votre Phrase de Récupération?","tomowallet.container.createwallet.recoveryphrase.popup.keyview.header":"Clé Privée","tomowallet.container.createwallet.recoveryphrase.popup.keyview.content.title":"Votre clé privée","tomowallet.container.createwallet.recoveryphrase.popup.keyview.content.text":"Sauvegardez le texte ci-dessous sur du papier, conservez-le dans un endroit secret et enregistrez.","tomowallet.container.createwallet.recoveryphrase.popup.keyview.content.qrcode.alt":"Cliquez ici pour voir le code QR. Assurez-vous que personne ne regarde!","tomowallet.container.createwallet.verification.title":"Vérification","tomowallet.container.createwallet.verification.description":"Vérifiez votre Phrase de Récupération. Choisissez chaque mot dans le bon ordre","tomowallet.container.createwallet.verification.button.verify":"Vérifier","tomowallet.container.createwallet.successnotification.content.title":"Réussi","tomowallet.container.createwallet.successnotification.image.alt":"Succès!","tomowallet.container.createwallet.successnotification.content.description":"Vous avez créé votre nouveau portefeuille avec succès","tomowallet.container.createwallet.successnotification.button.accesswallet":"Accédez à votre portefeuille maintenant","tomowallet.container.mywallet.section.address.title":"Adresse","tomowallet.container.mywallet.table.tab.portfolio.title":"PORTEFEUILLE","tomowallet.container.mywallet.table.tab.transaction.title":"TRANSACTIONS","tomowallet.container.mywallet.table.portfolio.header.tokenname":"Nom du Jeton","tomowallet.container.mywallet.table.portfolio.header.balance":"Solde","tomowallet.container.mywallet.table.portfolio.header.value":"Valeur (USD)","tomowallet.container.mywallet.table.portfolio.header.price":"Prix (USD)","tomowallet.container.mywallet.table.portfolio.cell.tokenname.image.alt":"{name} Symbole","tomowallet.container.mywallet.table.portfolio.cell.tokenname.publisher":"TomoChain","tomowallet.container.mywallet.table.transactions.header.tokentype":"Jeton","tomowallet.container.mywallet.table.transactions.header.txhash":"Txn Hachage","tomowallet.container.mywallet.table.transactions.header.createtime":"Âge","tomowallet.container.mywallet.table.transactions.header.from":"De","tomowallet.container.mywallet.table.transactions.header.to":"À","tomowallet.container.mywallet.table.transactions.header.quantity":"Quantité","tomowallet.container.mywallet.popup.sendtoken.title":"Envoyer","tomowallet.container.mywallet.popup.sendtoken.input.token.label":"Jeton","tomowallet.container.mywallet.popup.sendtoken.input.token.placeholder":"Sélectionner un jeton...","tomowallet.container.mywallet.popup.sendtoken.input.recipient.label":"Bénéficiaire","tomowallet.container.mywallet.popup.sendtoken.input.recipient.placeholder":"Coller ou numériser une adresse...","tomowallet.container.mywallet.popup.sendtoken.input.transferamount.label":"Montant du transfert","tomowallet.container.mywallet.popup.sendtoken.input.transferamount.placeholder":"Ajouter un jeton de montant...","tomowallet.container.mywallet.popup.sendtoken.input.message.label":"Message","tomowallet.container.mywallet.popup.sendtoken.input.message.placeholder":"Écrire un message...","tomowallet.container.mywallet.popup.sendtoken.input.amount.label":"Montant","tomowallet.container.mywallet.popup.sendtoken.input.from.label":"De","tomowallet.container.mywallet.popup.sendtoken.input.to.label":"À","tomowallet.container.mywallet.popup.sendtoken.info.transactionfee.label":"Frais de transaction","tomowallet.container.mywallet.popup.sendtoken.error.token.required":"Veuillez choisir un jeton","tomowallet.container.mywallet.popup.sendtoken.error.recipient.required":"S\'il vous plaît entrer une adresse de destinataire","tomowallet.container.mywallet.popup.sendtoken.error.recipient.invalid":"Ce destinataire est invalide","tomowallet.container.mywallet.popup.sendtoken.error.amount.required":"S\'il vous plaît entrer un montant de jeton","tomowallet.container.mywallet.popup.sendtoken.error.amount.invalid":"Le montant du virement n\'est pas correct","tomowallet.container.mywallet.popup.sendtoken.error.message.maxlength":"Le message dépasse 255 caractères maximum","tomowallet.container.mywallet.popup.receivetoken.title":"Recevoir","tomowallet.container.mywallet.popup.receivetoken.content.message":"Votre adresse prend en charge le transfert vers TOMO et son jeton.","tomowallet.container.mywallet.popup.success.info.amountsent":"Vous avez envoyé","tomowallet.container.mywallet.popup.success.info.transactionhash":"Hachage de transaction"}',
    );
  },
  348: function(e, t) {},
  350: function(e) {
    e.exports = JSON.parse(
      '[{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]',
    );
  },
  351: function(e) {
    e.exports = JSON.parse(
      '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"value","type":"uint256"}],"name":"estimateFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"issuer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"minFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"setMinFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"},{"name":"cap","type":"uint256"},{"name":"minFee","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"issuer","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Fee","type":"event"}]',
    );
  },
  353: function(e, t, n) {
    e.exports = n.p + '97a5a2d3170c8185d4e9f2a085dddd8b.svg';
  },
  354: function(e, t, n) {
    e.exports = n.p + '1f8d328df6e0776b78b6d294101620e8.svg';
  },
  359: function(e, t, n) {
    e.exports = n.p + '926c7bcab97fb5a858fd060d9dd2a39d.png';
  },
  39: function(e, t, n) {
    'use strict';
    var o = n(0),
      r = n.n(o),
      a = n(30),
      i = n(28),
      c = n(75),
      l = n(41),
      u = n(36),
      s = n.n(u),
      p = n(46),
      f = n(44),
      d = n(5);
    function m(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        t &&
          (o = o.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, o);
      }
      return n;
    }
    function b(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function y() {
      return (y =
        Object.assign ||
        function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        }).apply(this, arguments);
    }
    function O(e) {
      return (O =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function h(e, t) {
      if (!(e instanceof t))
        throw new TypeError('Cannot call a class as a function');
    }
    function g(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function v(e, t, n) {
      return t && g(e.prototype, t), n && g(e, n), e;
    }
    function _(e, t) {
      return !t || ('object' !== O(t) && 'function' != typeof t)
        ? (function(e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return e;
          })(e)
        : t;
    }
    function E(e) {
      return (E = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function w(e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError(
          'Super expression must either be null or a function',
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        t && T(e, t);
    }
    function T(e, t) {
      return (T =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    var P = (function(e) {
        function t() {
          return h(this, t), _(this, E(t).apply(this, arguments));
        }
        return (
          w(t, o['PureComponent']),
          v(t, [
            {
              key: 'render',
              value: function() {
                var e = this.props,
                  t = e.language,
                  n = e.children;
                return r.a.createElement(
                  c.b,
                  { locale: t, messages: d.b.MESSAGE_SET[t] },
                  n,
                );
              },
            },
          ]),
          t
        );
      })(),
      A = Object(i.c)(function() {
        return Object(l.b)({ language: p.a });
      })(P),
      N = function(e) {
        var t = (function(t) {
          function n() {
            return h(this, n), _(this, E(n).apply(this, arguments));
          }
          return (
            w(n, o['PureComponent']),
            v(n, [
              {
                key: 'render',
                value: function() {
                  var t = this.props,
                    n = t.language,
                    o = t.onSetLanguage;
                  return r.a.createElement(
                    e,
                    y({}, this.props, { language: n, changeLocale: o }),
                  );
                },
              },
            ]),
            n
          );
        })();
        e.defaultProps &&
          (t.defaultProps = (function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? m(n, !0).forEach(function(t) {
                    b(e, t, n[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    e,
                    Object.getOwnPropertyDescriptors(n),
                  )
                : m(n).forEach(function(t) {
                    Object.defineProperty(
                      e,
                      t,
                      Object.getOwnPropertyDescriptor(n, t),
                    );
                  });
            }
            return e;
          })({}, e.defaultProps));
        var n = Object(i.c)(
          function() {
            return Object(l.b)({ language: p.a });
          },
          function(e) {
            return {
              onSetLanguage: function(t) {
                return e(Object(f.b)(t));
              },
            };
          },
        );
        return s()(Object(a.d)(n, c.e)(t), e);
      };
    function R() {
      return (R =
        Object.assign ||
        function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        }).apply(this, arguments);
    }
    var L = function(e, t) {
      return r.a.createElement(c.a, R({}, e, { values: t }));
    };
    n.d(t, 'a', function() {
      return A;
    }),
      n.d(t, 'c', function() {
        return N;
      }),
      n.d(t, 'b', function() {
        return L;
      });
  },
  44: function(e, t, n) {
    'use strict';
    n.d(t, 'a', function() {
      return r;
    }),
      n.d(t, 'b', function() {
        return a;
      }),
      n.d(t, 'c', function() {
        return i;
      }),
      n.d(t, 'd', function() {
        return c;
      }),
      n.d(t, 'e', function() {
        return l;
      }),
      n.d(t, 'f', function() {
        return u;
      }),
      n.d(t, 'g', function() {
        return s;
      }),
      n.d(t, 'h', function() {
        return p;
      }),
      n.d(t, 'i', function() {
        return f;
      });
    var o = n(12),
      r = function() {
        return { type: o.a };
      },
      a = function(e) {
        return { type: o.c, language: e };
      },
      i = function(e) {
        return { type: o.d, network: e };
      },
      c = function(e) {
        return { type: o.e, data: e };
      },
      l = function(e) {
        return { type: o.f, bool: e };
      },
      u = function(e, t) {
        return { type: o.g, bool: e, networkOpt: t };
      },
      s = function(e) {
        return { type: o.i, bool: e };
      },
      p = function(e) {
        return { type: o.j, tabType: e };
      },
      f = function(e) {
        return { type: o.k, stage: e };
      };
  },
  46: function(e, t, n) {
    'use strict';
    n.d(t, 'a', function() {
      return a;
    }),
      n.d(t, 'b', function() {
        return i;
      }),
      n.d(t, 'c', function() {
        return c;
      }),
      n.d(t, 'd', function() {
        return l;
      }),
      n.d(t, 'e', function() {
        return u;
      }),
      n.d(t, 'f', function() {
        return s;
      });
    var o = n(18),
      r = function(e) {
        return e.global;
      },
      a = Object(o.a)(r, function(e) {
        return e.toJS().language;
      }),
      i = Object(o.a)(r, function(e) {
        return e.toJS().loading;
      }),
      c = Object(o.a)(r, function(e) {
        return e.toJS().networkConfirmationPopup;
      }),
      l = Object(o.a)(r, function(e) {
        return e.toJS().network;
      }),
      u = Object(o.a)(r, function(e) {
        return e.toJS().wallet;
      }),
      s = Object(o.a)(r, function(e) {
        return e.toJS().walletPopup;
      });
  },
  5: function(e, t, n) {
    'use strict';
    var o = {
        TOMOCHAIN_TESTNET: {
          type: 'http',
          host: 'https://testnet.tomochain.com',
          networkId: 89,
          hdPath: "m/44'/889'/0'/0/",
        },
        TOMOCHAIN_MAINNET: {
          type: 'http',
          host: 'https://rpc.tomochain.com',
          networkId: 88,
          hdPath: "m/44'/889'/0'/0/",
        },
      },
      r = {
        MESSAGE_SET: { en: n(346), fr: n(347) },
        TOKEN_TYPE: { TRC20: 'TRC20', TRC21: 'TRC21' },
        WEB3_STATUSES: {
          LOADING: 'loading',
          INITIALIZED: 'initialized',
          FAILED: 'failed',
        },
      },
      a = {
        DEFAULT: '/',
        LOGIN: '/login',
        HOMEPAGE: '/homepage',
        CREATE_WALLET: '/create-new-wallet',
        IMPORT_WALLET: '/import-wallet',
        MY_WALLET: '/my-wallet',
      },
      i = n(39),
      c = n(75),
      l = ''.concat('tomowallet', '.common'),
      u = ''.concat('tomowallet', '.component'),
      s = ''.concat('tomowallet', '.container'),
      p = ''.concat(l, '.button'),
      f = ''.concat(l, '.list'),
      d = ''.concat(u, '.navbar'),
      m = ''.concat(u, '.footer'),
      b = ''.concat(s, '.welcome'),
      y = ''.concat(s, '.createwallet'),
      O = ''.concat(y, '.warning'),
      h = ''.concat(y, '.recoveryphrase'),
      g = ''.concat(y, '.verification'),
      v = ''.concat(y, '.successnotification'),
      _ = ''.concat(s, '.importwallet'),
      E = ''.concat(s, '.mywallet'),
      w = Object(c.d)({
        COMMON_BUTTON_BACK: {
          id: ''.concat(p, '.back'),
          defaultMessage: 'Back',
        },
        COMMON_BUTTON_NEXT: {
          id: ''.concat(p, '.next'),
          defaultMessage: 'Next',
        },
        COMMON_BUTTON_SAVE: {
          id: ''.concat(p, '.save'),
          defaultMessage: 'Save',
        },
        COMMON_BUTTON_IMPORT: {
          id: ''.concat(p, '.import'),
          defaultMessage: 'Import',
        },
        COMMON_BUTTON_SEND: {
          id: ''.concat(p, '.send'),
          defaultMessage: 'Send',
        },
        COMMON_BUTTON_RECEIVE: {
          id: ''.concat(p, '.receive'),
          defaultMessage: 'Receive',
        },
        COMMON_BUTTON_MAXIMUM: {
          id: ''.concat(p, '.maximum'),
          defaultMessage: 'Max',
        },
        COMMON_BUTTON_CONFIRM: {
          id: ''.concat(p, '.confirm'),
          defaultMessage: 'Confirm',
        },
        COMMON_BUTTON_UNLOCK: {
          id: ''.concat(p, '.unlock'),
          defaultMessage: 'Unlock',
        },
        COMMON_LIST_LANGUAGE_ENGLISH: {
          id: ''.concat(f, '.language.english'),
          defaultMessage: 'English',
        },
        COMMON_LIST_LANGUAGE_FRENCH: {
          id: ''.concat(f, '.language.french'),
          defaultMessage: 'French',
        },
        COMMON_LIST_NETWORK_TOMOCHAIN_TESTNET: {
          id: ''.concat(f, '.network.tomochain.testnet'),
          defaultMessage: 'TomoChain TestNet',
        },
        COMMON_LIST_NETWORK_TOMOCHAIN_MAINNET: {
          id: ''.concat(f, '.network.tomochain.mainnet'),
          defaultMessage: 'TomoChain MainNet',
        },
        HEADER_NAVBAR_LOGO_ALT: {
          id: ''.concat(d, '.logo.alt'),
          defaultMessage: 'TOMOCHAIN LOGO',
        },
        HEADER_NAVBAR_OPTION_ABOUT: {
          id: ''.concat(d, '.option.about'),
          defaultMessage: 'About',
        },
        HEADER_NAVBAR_OPTION_FAQS: {
          id: ''.concat(d, '.option.faqs'),
          defaultMessage: 'FAQ',
        },
        HEADER_NAVBAR_OPTION_MY_WALLET: {
          id: ''.concat(d, '.option.mywallet'),
          defaultMessage: 'My Wallet',
        },
        HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_SHOW_WALLET: {
          id: ''.concat(d, '.option.mywallet.option.showprofile'),
          defaultMessage: 'Show Wallet',
        },
        HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_HELP: {
          id: ''.concat(d, '.option.mywallet.option.settings'),
          defaultMessage: 'Help',
        },
        HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_LOG_OUT: {
          id: ''.concat(d, '.option.mywallet.option.logout'),
          defaultMessage: 'Log out',
        },
        HEADER_NAVBAR_POPUP_SHOW_WALLET_TITLE: {
          id: ''.concat(d, '.popup.showwallet.title'),
          defaultMessage: 'Show Wallet',
        },
        HEADER_NAVBAR_POPUP_SHOW_WALLET_WARNING_IMAGE_ALT: {
          id: ''.concat(d, '.popup.showwallet.warning.image.alt'),
          defaultMessage: 'Warning image',
        },
        HEADER_NAVBAR_POPUP_SHOW_WALLET_WARNING_TEXT: {
          id: ''.concat(d, '.popup.showwallet.warning.text'),
          defaultMessage:
            'We are about to show your recovery phrase and private key, please ensure that no one else is looking at your screen.',
        },
        HEADER_NAVBAR_POPUP_SHOW_WALLET_TAB_RECOVERY_PHRASE: {
          id: ''.concat(d, '.popup.showwallet.tab.recoveryphrase'),
          defaultMessage: 'Recovery phrase',
        },
        HEADER_NAVBAR_POPUP_SHOW_WALLET_TAB_PRIVATE_KEY: {
          id: ''.concat(d, '.popup.showwallet.tab.privatekey'),
          defaultMessage: 'Private key',
        },
        HEADER_NAVBAR_POPUP_SHOW_WALLET_TAB_PRIVATE_KEY_NOTE: {
          id: ''.concat(d, '.popup.showwallet.tab.privatekey.note'),
          defaultMessage: 'Remove all spaces to use private key, please',
        },
        HEADER_NAVBAR_POPUP_NETWORK_CONFIRMATION_TITLE: {
          id: ''.concat(d, '.popup.networkconfirmation.title'),
          defaultMessage: 'Confirmation',
        },
        HEADER_NAVBAR_POPUP_NETWORK_CONFIRMATION_CONTENT_TEXT: {
          id: ''.concat(d, '.popup.networkconfirmation.content.text'),
          defaultMessage:
            'Changing network setting will log you out of the wallet as well. Are you sure you want to change the network?',
        },
        FOOTER_VERSION_TEXT: {
          id: ''.concat(m, '.versiontext'),
          defaultMessage: 'TomoWallet 2019 - v1.0',
        },
        FOOTER_OPTION_HELP: {
          id: ''.concat(m, '.option.help'),
          defaultMessage: 'Need help?',
        },
        FOOTER_OPTION_POLICY: {
          id: ''.concat(m, '.option.policy'),
          defaultMessage: 'Privacy Policy',
        },
        FOOTER_OPTION_TERMS_OF_SERVICE: {
          id: ''.concat(m, '.option.termsofservice'),
          defaultMessage: 'Terms of Service',
        },
        FOOTER_OPTION_API_DOCUMENTATION: {
          id: ''.concat(m, '.option.apidocumentation'),
          defaultMessage: 'API Documentation',
        },
        WELCOME_TITLE: {
          id: ''.concat(b, '.title'),
          defaultMessage: 'Welcome to TomoWallet',
        },
        WELCOME_DESCRIPTION: {
          id: ''.concat(b, '.description'),
          defaultMessage:
            'TomoWallet (our friends call us TMW) is a free, client-side interface helping you interact with the TomoChain. Our easy-to-use, open-source platform allows you to generate wallets, interact with smart contracts, and so much more.',
        },
        WELCOME_BUTTON_CREATE_NEW_WALLET: {
          id: ''.concat(b, '.button.createnewwallet'),
          defaultMessage: 'Create a New Wallet',
        },
        WELCOME_TEXT_BETWEEN_BUTTONS: {
          id: ''.concat(b, '.textbetweenbuttons'),
          defaultMessage: 'or',
        },
        WELCOME_BUTTON_IMPORT_WALLET: {
          id: ''.concat(b, '.button.importwallet'),
          defaultMessage: 'Import Your Wallet',
        },
        WELCOME_IMAGE_ALT: {
          id: ''.concat(b, '.image.alt'),
          defaultMessage: 'Welcome to TomoWallet',
        },
        WARNING_HEADER_TITLE: {
          id: ''.concat(O, '.header.title'),
          defaultMessage: 'Create New Wallet',
        },
        WARNING_HEADER_ALTERNATIVE_TEXT: {
          id: ''.concat(O, '.header.alternative.text'),
          defaultMessage: 'Already have a wallet?',
        },
        WARNING_HEADER_ALTERNATIVE_LINK: {
          id: ''.concat(O, '.header.alternative.link'),
          defaultMessage: 'Import your wallet',
        },
        WARNING_IMAGE_ALT: {
          id: ''.concat(O, '.image.alt'),
          defaultMessage: 'Warning!',
        },
        WARNING_CONTENT_TITLE: {
          id: ''.concat(O, '.content.title'),
          defaultMessage: "Let's secure your account",
        },
        WARNING_CONTENT_DESCRIPTION: {
          id: ''.concat(O, '.content.description'),
          defaultMessage:
            'Your backup phrase contains all of the private keys within your wallet. Please write down these 12 words, in order, and keep them somewhere safe offline. This phrase will gives you (or anyone who has it) a way to restore your wallet and access your funds. In the event that you lose your password or our service is unavailable, this will be your safety net.',
        },
        WARNING_CONTENT_DESCRIPTION_DANGER: {
          id: ''.concat(O, '.content.description.danger'),
          defaultMessage:
            'If you lose your recovery phrase, you will be unable to recover access to your account',
        },
        WARNING_BUTTON_NEXT_TO_RECOVERY_PHRASE: {
          id: ''.concat(O, '.button.nexttorecoveryphrase'),
          defaultMessage: 'Next to Recovery Phrase',
        },
        RECOVERY_PHRASE_TITLE: {
          id: ''.concat(h, '.title'),
          defaultMessage: 'Recovery Phrase',
        },
        RECOVERY_PHRASE_NOTIFICATION_TITLE: {
          id: ''.concat(h, '.notification.title'),
          defaultMessage: 'Please back up recovery phrase',
        },
        RECOVERY_PHRASE_NOTIFICATION_DESCRIPTION: {
          id: ''.concat(h, '.notification.description'),
          defaultMessage:
            'Back up the text below on paper and keep it somewhere secret and save.',
        },
        RECOVERY_PHRASE_BUTTON_SAVE: {
          id: ''.concat(h, '.button.save'),
          defaultMessage: 'Save Recovery Phrase',
        },
        RECOVERY_PHRASE_BUTTON_VIEW_PRIVATE_KEY: {
          id: ''.concat(h, '.button.view.privatekey'),
          defaultMessage: 'View my private key',
        },
        RECOVERY_PHRASE_BUTTON_CONFIRMATION: {
          id: ''.concat(h, '.button.confirmation'),
          defaultMessage: 'I Wrote My Recovery Phrase',
        },
        RECOVERY_PHRASE_POPUP_CONFIRMATION_IMAGE_ALT: {
          id: ''.concat(h, '.popup.confirmation.image.alt'),
          defaultMessage: 'Did you note down?',
        },
        RECOVERY_PHRASE_POPUP_CONFIRMATION_HEADER: {
          id: ''.concat(h, '.popup.confirmation.header'),
          defaultMessage: 'Recovery Phrase?',
        },
        RECOVERY_PHRASE_POPUP_CONFIRMATION_CONTENT: {
          id: ''.concat(h, '.popup.confirmation.content'),
          defaultMessage:
            'Are you sure you have noted down your Recovery Phrase?',
        },
        RECOVERY_PHRASE_POPUP_KEY_VIEW_HEADER: {
          id: ''.concat(h, '.popup.keyview.header'),
          defaultMessage: 'Private Key',
        },
        RECOVERY_PHRASE_POPUP_KEY_VIEW_CONTENT_TITLE: {
          id: ''.concat(h, '.popup.keyview.content.title'),
          defaultMessage: 'Your private key',
        },
        RECOVERY_PHRASE_POPUP_KEY_VIEW_CONTENT_TEXT: {
          id: ''.concat(h, '.popup.keyview.content.text'),
          defaultMessage:
            'Back up the text below on paper and keep it somewhere secret and save.',
        },
        RECOVERY_PHRASE_POPUP_KEY_VIEW_CONTENT_QRCODE_ALT: {
          id: ''.concat(h, '.popup.keyview.content.qrcode.alt'),
          defaultMessage:
            'Click here to view QR Code. Make sure no one else is looking!',
        },
        VERIFICATION_TITLE: {
          id: ''.concat(g, '.title'),
          defaultMessage: 'Verification',
        },
        VERIFICATION_DESCRIPTION: {
          id: ''.concat(g, '.description'),
          defaultMessage:
            'Verify your Recovery Phrase. Choose each word in the correct order',
        },
        VERIFICATION_BUTTON_VERIFY: {
          id: ''.concat(g, '.button.verify'),
          defaultMessage: 'Verify',
        },
        VERIFICATION_ERROR_VERIFY_FAILED: {
          id: ''.concat(g, '.error.verify.failed'),
          defaultMessage: 'Incorrect recovery phrase order.',
        },
        SUCCESS_NOTIFICATION_IMAGE_ALT: {
          id: ''.concat(v, '.image.alt'),
          defaultMessage: 'Success!',
        },
        SUCCESS_NOTIFICATION_CONTENT_TITLE: {
          id: ''.concat(v, '.content.title'),
          defaultMessage: 'Successful',
        },
        SUCCESS_NOTIFICATION_CONTENT_DESCRIPTION: {
          id: ''.concat(v, '.content.description'),
          defaultMessage: "You've created your new wallet successfully",
        },
        SUCCESS_NOTIFICATION_BUTTON_ACCESS_WALLET: {
          id: ''.concat(v, '.button.accesswallet'),
          defaultMessage: 'Access your wallet now',
        },
        IMPORT_WALLET_HEADER_TITLE: {
          id: ''.concat(_, '.header.title'),
          defaultMessage: 'Import Your Wallet',
        },
        IMPORT_WALLET_ALTERNATIVE_TEXT: {
          id: ''.concat(_, '.alternative.text'),
          defaultMessage: 'Do not have a wallet?',
        },
        IMPORT_WALLET_ALTERNATIVE_LINK: {
          id: ''.concat(_, '.alternative.link'),
          defaultMessage: 'Create a new wallet',
        },
        IMPORT_WALLET_TAB_LEDGER_IMAGE_ALT: {
          id: ''.concat(_, '.tab.ledger.image.alt'),
          defaultMessage: 'Ledger',
        },
        IMPORT_WALLET_TAB_LEDGER_TEXT: {
          id: ''.concat(_, '.tab.ledger.text'),
          defaultMessage: 'Ledger Wallet',
        },
        IMPORT_WALLET_TAB_LEDGER_INPUT_LABEL: {
          id: ''.concat(_, '.tab.ledger.input.label'),
          defaultMessage: 'Select HD derivation path',
        },
        IMPORT_WALLET_TAB_LEDGER_INPUT_PLACEHOLDER: {
          id: ''.concat(_, '.tab.ledger.input.placeholder'),
          defaultMessage: 'Select HD derivation path...',
        },
        IMPORT_WALLET_TAB_LEDGER_INPUT_DESCRIPTION: {
          id: ''.concat(_, '.tab.ledger.input.description'),
          defaultMessage:
            'To unlock the wallet, try paths {path1} or {path2} with Ethereum App, or try path {path3} with TomoChain App (on Ledger)',
        },
        IMPORT_WALLET_TAB_RECOVERY_PHRASE_TEXT: {
          id: ''.concat(_, '.tab.recoveryphrase.text'),
          defaultMessage: 'Recovery Phrase/ Private Key',
        },
        IMPORT_WALLET_TAB_RECOVERY_PHRASE_INPUT_LABEL: {
          id: ''.concat(_, '.tab.recoveryphrase.input.label'),
          defaultMessage: 'Enter your Recovery Phrase or Private Key',
        },
        IMPORT_WALLET_TAB_RECOVERY_PHRASE_INPUT_PLACEHOLDER: {
          id: ''.concat(_, '.tab.recoveryphrase.input.placeholder'),
          defaultMessage: 'Enter your Recovery Phrase or Private Key...',
        },
        IMPORT_WALLET_TAB_RECOVERY_PHRASE_OPTION_IMPORT_VIA_QRCODE: {
          id: ''.concat(_, '.tab.recoveryphrase.option.importviaqrcode'),
          defaultMessage: 'Import Private Key via QR code',
        },
        IMPORT_WALLET_ERROR_INVALID_RECOVERY_PHRASE: {
          id: ''.concat(_, '.error.invalid.recoveryphrase'),
          defaultMessage: 'Invalid recovery phrase/private key',
        },
        IMPORT_WALLET_ERROR_INVALID_HD_PATH: {
          id: ''.concat(_, '.error.invalid.hdpath'),
          defaultMessage: 'Invalid HD Path',
        },
        IMPORT_WALLET_POPUP_ADDRESS_TITLE: {
          id: ''.concat(_, '.popup.address.title'),
          defaultMessage: 'Ledger Wallet',
        },
        MY_WALLET_SECTION_ADDRESS_TITLE: {
          id: ''.concat(E, '.section.address.title'),
          defaultMessage: 'Address',
        },
        MY_WALLET_TABLE_PORTFOLIO_TITLE: {
          id: ''.concat(E, '.table.tab.portfolio.title'),
          defaultMessage: 'PORTFOLIO',
        },
        MY_WALLET_TABLE_PORTFOLIO_HEADER_TOKEN_NAME: {
          id: ''.concat(E, '.table.portfolio.header.tokenname'),
          defaultMessage: 'Token name',
        },
        MY_WALLET_TABLE_PORTFOLIO_HEADER_BALANCE: {
          id: ''.concat(E, '.table.portfolio.header.balance'),
          defaultMessage: 'Balance',
        },
        MY_WALLET_TABLE_PORTFOLIO_HEADER_VALUE: {
          id: ''.concat(E, '.table.portfolio.header.value'),
          defaultMessage: 'Value (USD)',
        },
        MY_WALLET_TABLE_PORTFOLIO_HEADER_PRICE: {
          id: ''.concat(E, '.table.portfolio.header.price'),
          defaultMessage: 'Price (USD)',
        },
        MY_WALLET_TABLE_PORTFOLIO_HEADER_SEND: {
          id: ''.concat(E, '.table.portfolio.header.send'),
          defaultMessage: 'Send',
        },
        MY_WALLET_TABLE_PORTFOLIO_HEADER_RECEIVE: {
          id: ''.concat(E, '.table.portfolio.header.receive'),
          defaultMessage: 'Receive',
        },
        MY_WALLET_TABLE_PORTFOLIO_CELL_TOKEN_NAME_IMAGE_ALT: {
          id: ''.concat(E, '.table.portfolio.cell.tokenname.image.alt'),
          defaultMessage: '{name} Symbol',
        },
        MY_WALLET_TABLE_PORTFOLIO_CELL_TOKEN_NAME_PUBLISHER: {
          id: ''.concat(E, '.table.portfolio.cell.tokenname.publisher'),
          defaultMessage: 'TomoChain',
        },
        MY_WALLET_TABLE_PORTFOLIO_ERROR_LOAD_FAILED: {
          id: ''.concat(E, '.table.portfolio.error.load.failed'),
          defaultMessage: 'Cannot load token list!',
        },
        MY_WALLET_TABLE_TRANSACTION_TITLE: {
          id: ''.concat(E, '.table.tab.transaction.title'),
          defaultMessage: 'TRANSACTIONS',
        },
        MY_WALLET_TABLE_TRANSACTIONS_HEADER_TOKEN_TYPE: {
          id: ''.concat(E, '.table.transactions.header.tokentype'),
          defaultMessage: 'Token',
        },
        MY_WALLET_TABLE_TRANSACTIONS_HEADER_TX_HASH: {
          id: ''.concat(E, '.table.transactions.header.txhash'),
          defaultMessage: 'Txn Hash',
        },
        MY_WALLET_TABLE_TRANSACTIONS_HEADER_CREATE_TIME: {
          id: ''.concat(E, '.table.transactions.header.createtime'),
          defaultMessage: 'Age',
        },
        MY_WALLET_TABLE_TRANSACTIONS_HEADER_FROM: {
          id: ''.concat(E, '.table.transactions.header.from'),
          defaultMessage: 'From',
        },
        MY_WALLET_TABLE_TRANSACTIONS_HEADER_TO: {
          id: ''.concat(E, '.table.transactions.header.to'),
          defaultMessage: 'To',
        },
        MY_WALLET_TABLE_TRANSACTIONS_HEADER_QUANTITY: {
          id: ''.concat(E, '.table.transactions.header.quantity'),
          defaultMessage: 'Quantity',
        },
        MY_WALLET_POPUP_SEND_TOKEN_TITLE: {
          id: ''.concat(E, '.popup.sendtoken.title'),
          defaultMessage: 'Send',
        },
        MY_WALLET_POPUP_SEND_TOKEN_INPUT_TOKEN_LABEL: {
          id: ''.concat(E, '.popup.sendtoken.input.token.label'),
          defaultMessage: 'Token',
        },
        MY_WALLET_POPUP_SEND_TOKEN_INPUT_TOKEN_PLACEHOLDER: {
          id: ''.concat(E, '.popup.sendtoken.input.token.placeholder'),
          defaultMessage: 'Select token...',
        },
        MY_WALLET_POPUP_SEND_TOKEN_INPUT_RECIPIENT_LABEL: {
          id: ''.concat(E, '.popup.sendtoken.input.recipient.label'),
          defaultMessage: 'Recipient',
        },
        MY_WALLET_POPUP_SEND_TOKEN_INPUT_RECIPIENT_PLACEHOLDER: {
          id: ''.concat(E, '.popup.sendtoken.input.recipient.placeholder'),
          defaultMessage: 'Paste or scan an address...',
        },
        MY_WALLET_POPUP_SEND_TOKEN_INPUT_TRANSFER_AMOUNT_LABEL: {
          id: ''.concat(E, '.popup.sendtoken.input.transferamount.label'),
          defaultMessage: 'Transfer Amount',
        },
        MY_WALLET_POPUP_SEND_TOKEN_INPUT_TRANSFER_AMOUNT_PLACEHOLDER: {
          id: ''.concat(E, '.popup.sendtoken.input.transferamount.placeholder'),
          defaultMessage: 'Add amount token...',
        },
        MY_WALLET_POPUP_SEND_TOKEN_INPUT_MESSAGE_LABEL: {
          id: ''.concat(E, '.popup.sendtoken.input.message.label'),
          defaultMessage: 'Message',
        },
        MY_WALLET_POPUP_SEND_TOKEN_INPUT_MESSAGE_PLACEHOLDER: {
          id: ''.concat(E, '.popup.sendtoken.input.message.placeholder'),
          defaultMessage: 'Write message...',
        },
        MY_WALLET_POPUP_SEND_TOKEN_INPUT_AMOUNT_LABEL: {
          id: ''.concat(E, '.popup.sendtoken.input.amount.label'),
          defaultMessage: 'Amount',
        },
        MY_WALLET_POPUP_SEND_TOKEN_INPUT_FROM_LABEL: {
          id: ''.concat(E, '.popup.sendtoken.input.from.label'),
          defaultMessage: 'From',
        },
        MY_WALLET_POPUP_SEND_TOKEN_INPUT_TO_LABEL: {
          id: ''.concat(E, '.popup.sendtoken.input.to.label'),
          defaultMessage: 'To',
        },
        MY_WALLET_POPUP_SEND_TOKEN_INFO_TRANSACTION_FEE_LABEL: {
          id: ''.concat(E, '.popup.sendtoken.info.transactionfee.label'),
          defaultMessage: 'Transaction fee',
        },
        MY_WALLET_POPUP_SEND_TOKEN_ERROR_TOKEN_REQUIRED: {
          id: ''.concat(E, '.popup.sendtoken.error.token.required'),
          defaultMessage: 'Please choose a token',
        },
        MY_WALLET_POPUP_SEND_TOKEN_ERROR_RECIPIENT_REQUIRED: {
          id: ''.concat(E, '.popup.sendtoken.error.recipient.required'),
          defaultMessage: 'Please enter a recipient address',
        },
        MY_WALLET_POPUP_SEND_TOKEN_ERROR_RECIPIENT_INVALID: {
          id: ''.concat(E, '.popup.sendtoken.error.recipient.invalid'),
          defaultMessage: 'This recipient is invalid',
        },
        MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_REQUIRED: {
          id: ''.concat(E, '.popup.sendtoken.error.amount.required'),
          defaultMessage: 'Please enter an amount of token',
        },
        MY_WALLET_POPUP_SEND_TOKEN_ERROR_AMOUNT_INVALID: {
          id: ''.concat(E, '.popup.sendtoken.error.amount.invalid'),
          defaultMessage: 'Transfer amount is not correct',
        },
        MY_WALLET_POPUP_SEND_TOKEN_ERROR_MESSAGE_MAXLENGTH: {
          id: ''.concat(E, '.popup.sendtoken.error.message.maxlength'),
          defaultMessage: 'Message exceeds maximum 255 characters',
        },
        MY_WALLET_POPUP_SUCCESS_INFO_AMOUNT_SENT: {
          id: ''.concat(E, '.popup.success.info.amountsent'),
          defaultMessage: 'You have sent',
        },
        MY_WALLET_POPUP_SUCCESS_INFO_TRANSACTION_HASH: {
          id: ''.concat(E, '.popup.success.info.transactionhash'),
          defaultMessage: 'Transaction hash',
        },
        MY_WALLET_POPUP_RECEIVE_TOKEN_TITLE: {
          id: ''.concat(E, '.popup.receivetoken.title'),
          defaultMessage: 'Receive',
        },
        MY_WALLET_POPUP_RECEIVE_TOKEN_CONTENT_MESSAGE: {
          id: ''.concat(E, '.popup.receivetoken.content.message'),
          defaultMessage:
            'Your address supports transferring to TOMO and its token',
        },
      }),
      T = {
        LANGUAGES: [
          { label: Object(i.b)(w.COMMON_LIST_LANGUAGE_ENGLISH), value: 'en' },
          { label: Object(i.b)(w.COMMON_LIST_LANGUAGE_FRENCH), value: 'fr' },
        ],
        NETWORKS: [
          {
            label: Object(i.b)(w.COMMON_LIST_NETWORK_TOMOCHAIN_TESTNET),
            value: Object.keys(o)[0],
          },
          {
            label: Object(i.b)(w.COMMON_LIST_NETWORK_TOMOCHAIN_MAINNET),
            value: Object.keys(o)[1],
          },
        ],
        MY_WALLET_TABLE_TYPES: [
          { label: Object(i.b)(w.MY_WALLET_TABLE_PORTFOLIO_TITLE), value: '1' },
          {
            label: Object(i.b)(w.MY_WALLET_TABLE_TRANSACTION_TITLE),
            value: '2',
          },
        ],
      },
      P = {
        GET_TOKENS: ''.concat(
          'https://apiwallet.testnet.tomochain.com',
          '/api/tokens',
        ),
        GET_TRANSACTIONS: ''.concat(
          'https://scan.testnet.tomochain.com',
          '/api/txs/listByAccount',
        ),
      };
    n.d(t, 'f', function() {
      return o;
    }),
      n.d(t, 'b', function() {
        return r;
      }),
      n.d(t, 'e', function() {
        return a;
      }),
      n.d(t, 'c', function() {
        return T;
      }),
      n.d(t, 'd', function() {
        return w;
      }),
      n.d(t, 'a', function() {
        return P;
      });
  },
  577: function(e, t) {},
  583: function(e, t) {},
  594: function(e, t) {},
  615: function(e, t) {},
  617: function(e, t) {},
  68: function(e, t, n) {
    'use strict';
    n.d(t, 'a', function() {
      return _;
    }),
      n.d(t, 'b', function() {
        return b;
      }),
      n.d(t, 'c', function() {
        return y;
      }),
      n.d(t, 'd', function() {
        return O;
      }),
      n.d(t, 'e', function() {
        return m;
      }),
      n.d(t, 'f', function() {
        return g;
      }),
      n.d(t, 'g', function() {
        return h;
      });
    var o = n(102),
      r = n.n(o),
      a = n(349),
      i = n.n(a),
      c = n(32),
      l = n.n(c),
      u = n(97),
      s = n.n(u),
      p = n(5),
      f = n(350),
      d = n(351),
      m = function() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
          t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = b(e, t);
        if (n) {
          var o =
            n.currentProvider.wallets[n.currentProvider.addresses[0]]._privKey;
          return n.utils.bytesToHex(o).replace(/^0x/, '');
        }
        return '';
      },
      b = function() {
        var e,
          t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
          n =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          o =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : function() {},
          a = n.host,
          c = n.hdPath;
        try {
          return (e = new i.a(t, a, 0, 1, !0, c)), new r.a(e);
        } catch (e) {
          return o(e), null;
        }
      },
      y = function(e) {
        if (e) {
          var t = e.currentProvider.addresses[0];
          return e.eth.getBalance(t).then(function(n) {
            return { address: t, balance: Number(e.utils.fromWei(n)) };
          });
        }
        return null;
      },
      O = function(e, t) {
        var n =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : function() {},
          o = b(e, t, n);
        return y(o).then(function(e) {
          return { web3: o, walletInfo: e };
        });
      },
      h = function(e, t) {
        var n = t.amount,
          o = t.contractAddress,
          r = t.decimals,
          a = t.from,
          i = t.to,
          c = t.type,
          l = new e.eth.Contract(s()(c, p.b.TOKEN_TYPE.TRC21) ? d : f, o),
          u = e.utils
            .toBN(n)
            .mul(e.utils.toBN(Math.pow(10, r)))
            .toString();
        return s()(c, p.b.TOKEN_TYPE.TRC21)
          ? l.methods
              .estimateFee(u)
              .call({ from: a, to: i })
              .then(function(t) {
                return l.methods
                  .transfer(i, u)
                  .send({ from: a, gasPrice: '250000000' })
                  .on('transactionHash', function(t) {
                    v({
                      interval: 2e3,
                      timeout: 1e4,
                      action: function() {
                        return e.eth.getTransactionReceipt(t);
                      },
                    });
                  });
              })
          : (function(e, t) {
              return e.eth.estimateGas(t);
            })(e, { from: a, to: i, value: u }).then(function(t) {
              return l.methods
                .transfer(i, u)
                .send({ from: a, to: o, gasPrice: '250000000', gas: 5e4 })
                .on('transactionHash', function(t) {
                  v({
                    interval: 2e3,
                    timeout: 1e4,
                    action: function() {
                      return e.eth.getTransactionReceipt(t);
                    },
                  });
                });
            });
      },
      g = function(e, t) {
        var n = t.amount,
          o = t.decimals,
          r = t.from,
          a = t.to,
          i = e.utils
            .toBN(n)
            .mul(e.utils.toBN(Math.pow(10, o)))
            .toString();
        return e.eth.sendTransaction({
          from: r,
          to: a,
          value: i,
          gasPrice: '250000000',
          gas: 5e4,
        });
      },
      v = function(e) {
        e.interval, e.timeout;
        var t,
          n,
          o = e.action,
          r = 0;
        return ((t = 2e3),
        (n = (void 0 === o ? function() {} : o)().then(function(e) {
          l()(e) || clearInterval(r);
        })),
        new Promise(function(e) {
          (r = setInterval(n, t)),
            (function(e) {
              return new Promise(function(t) {
                return setTimeout(t, e);
              });
            })(t).then(e);
        })).then(
          new Promise(function(e) {
            return e(
              setTimeout(function() {
                return clearInterval(r);
              }),
              1e4,
            );
          }),
        );
      },
      _ = function(e) {
        return new r.a().utils.fromWei(e);
      };
  },
  683: function(e, t) {},
  729: function(e, t) {
    function n(e) {
      var t = new Error("Cannot find module '" + e + "'");
      throw ((t.code = 'MODULE_NOT_FOUND'), t);
    }
    (n.keys = function() {
      return [];
    }),
      (n.resolve = n),
      (e.exports = n),
      (n.id = 729);
  },
  78: function(e, t, n) {
    'use strict';
    var o = n(0),
      r = n.n(o),
      a = n(36),
      i = n.n(a),
      c = n(102),
      l = n.n(c),
      u = n(15),
      s = n.n(u),
      p = n(32),
      f = n.n(p),
      d = n(18),
      m = n(5);
    function b(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        t &&
          (o = o.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, o);
      }
      return n;
    }
    function y(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? b(n, !0).forEach(function(t) {
              O(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : b(n).forEach(function(t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t),
              );
            });
      }
      return e;
    }
    function O(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function h() {
      return (h =
        Object.assign ||
        function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        }).apply(this, arguments);
    }
    function g(e) {
      return (g =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function v(e, t) {
      if (!(e instanceof t))
        throw new TypeError('Cannot call a class as a function');
    }
    function _(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function E(e, t, n) {
      return t && _(e.prototype, t), n && _(e, n), e;
    }
    function w(e, t) {
      return !t || ('object' !== g(t) && 'function' != typeof t) ? P(e) : t;
    }
    function T(e) {
      return (T = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function P(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e;
    }
    function A(e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError(
          'Super expression must either be null or a function',
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        t && N(e, t);
    }
    function N(e, t) {
      return (N =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    var R = Object(o.createContext)({
        web3: {},
        web3Status: '',
        switchRPCServer: function() {},
      }),
      L = (function(e) {
        function t(e) {
          var n;
          return (
            v(this, t),
            ((n = w(this, T(t).call(this, e))).state = {
              web3: {},
              status: m.b.WEB3_STATUSES.LOADING,
              error: null,
              rpcServer: {},
            }),
            (n.handleUpdateRpcServer = n.handleUpdateRpcServer.bind(P(n))),
            (n.handleSetWeb3 = n.handleSetWeb3.bind(P(n))),
            n
          );
        }
        return (
          A(t, o['Component']),
          E(t, [
            {
              key: 'componentDidMount',
              value: function() {
                var e = Object(d.i)();
                if (e) {
                  var t = e.recoveryPhrase,
                    n = e.rpcServer,
                    o = Object(d.c)(t, n);
                  this.handleSetWeb3(o), this.setState({ rpcServer: n });
                } else {
                  var r = m.c.NETWORKS.find(function(e) {
                    return e.value === Object(d.f)();
                  });
                  f()(r)
                    ? this.handleUpdateRpcServer(Object.keys(m.f)[0])
                    : this.handleUpdateRpcServer(r.value);
                }
              },
            },
            {
              key: 'handleUpdateRpcServer',
              value: function(e) {
                var t = this;
                this.setState({ rpcServer: s()(m.f, e, {}) }, function() {
                  Object(d.t)(e);
                  var n = new l.a(
                    l.a.givenProvider || t.state.rpcServer.host,
                    null,
                    {},
                  );
                  t.handleSetWeb3(n);
                });
              },
            },
            {
              key: 'handleSetWeb3',
              value: function(e) {
                var t = this;
                this.setState({ web3: new l.a(e) }, function() {
                  return t.state.web3.eth.net
                    .isListening()
                    .then(function() {
                      return t.setState({
                        status: m.b.WEB3_STATUSES.INITIALIZED,
                      });
                    })
                    .catch(function() {
                      return t.setState({ status: m.b.WEB3_STATUSES.FAILED });
                    });
                });
              },
            },
            {
              key: 'render',
              value: function() {
                var e = this.props.children,
                  t = this.state,
                  n = t.web3,
                  o = t.status,
                  a = t.rpcServer;
                return r.a.createElement(
                  R.Provider,
                  {
                    value: {
                      web3: n,
                      web3Status: o,
                      rpcServer: a,
                      switchRPCServer: this.handleUpdateRpcServer,
                      updateWeb3: this.handleSetWeb3,
                    },
                  },
                  e,
                );
              },
            },
          ]),
          t
        );
      })(),
      S = function(e) {
        var t = (function(t) {
          function n() {
            return v(this, n), w(this, T(n).apply(this, arguments));
          }
          return (
            A(n, o['Component']),
            E(n, [
              {
                key: 'render',
                value: function() {
                  var t = this;
                  return r.a.createElement(R.Consumer, null, function(n) {
                    var o = n.web3,
                      a = n.rpcServer,
                      i = n.switchRPCServer,
                      c = n.updateWeb3;
                    return r.a.createElement(
                      e,
                      h({}, t.props, {
                        web3: o,
                        rpcServer: a,
                        switchRPCServer: i,
                        updateWeb3: c,
                      }),
                    );
                  });
                },
              },
            ]),
            n
          );
        })();
        return (
          e.defaultProps && (t.defaultProps = y({}, e.defaultProps)), i()(t, e)
        );
      },
      j = function() {
        return r.a.createElement('span', null, 'Loading...');
      },
      M = function() {
        return r.a.createElement('span', null, 'Failed to load Web3.');
      };
    n.d(t, 'c', function() {
      return L;
    }),
      n.d(t, 'b', function() {
        return j;
      }),
      n.d(t, 'a', function() {
        return M;
      }),
      n.d(t, 'd', function() {
        return S;
      });
  },
  803: function(e, t, n) {
    var o = n(804);
    'string' == typeof o && (o = [[e.i, o, '']]);
    var r = { insert: 'head', singleton: !1 };
    n(810)(o, r);
    o.locals && (e.exports = o.locals);
  },
  804: function(e, t, n) {
    (t = e.exports = n(340)(!1)).i(n(805), ''),
      t.push([
        e.i,
        "*{box-sizing:border-box}body{background-color:#202533;font-size:14px;color:#9eaacc;line-height:1.7;min-height:100vh;font-family:'Nunito Sans', sans-serif}a{transition:all 0.3s}a:hover{text-decoration:none !important}.font-chevron-down{font-size:18px;color:#3a8ecc;margin-left:5px}.box_onl .dropdown-item{position:relative;padding:.5rem 0 .5rem 1em}.box_onl .dropdown-item:before{background-color:#3a8ecc;border-radius:50%;content:'';width:6px;height:6px;position:absolute;left:0;top:50%;transform:translateY(-50%)}.box_onl .dropdown-item.active:before{background-color:#36CE9A}.maincontent{min-height:calc(100vh - 179px)}@media (max-width: 768px){.maincontent{min-height:calc(100vh - 134px - 85px)}}.maincontent .card{background:transparent;border:0}.maincontent .card .card-header,.maincontent .card .card-body,.maincontent .card .card-footer{background:transparent;padding:0;border:0}.maincontent .card .card-header{text-align:center}.maincontent .card .card-body{padding:3em 0}.maincontent .card .box-border{border-radius:8px;border:1px solid #444b64}.form-group{margin-bottom:0}.form-group label{display:block;color:#5e677f}.form-group label svg{width:12px;margin-left:5px;color:#e4ae63}.form-group .box_select .my-select__input{display:inline-block;height:0;width:0;overflow:hidden}.form-group .box_select .my-select__indicator{color:#3A8ECC}.form-group .box_select>div{background-color:#2d344a !important;border-radius:8px;border:0;min-height:44px}.form-group .box_select.my-select--is-disabled>div{background-color:#212531 !important}.form-group .box_select.my-select--is-disabled .my-select__indicator{color:#444b64}.form-group .box_select .select_option{padding:1em}.form-group .box_select .select_option img,.form-group .box_select .select_option_active img{height:16px;margin-right:10px}.form-group .text-placeholder{color:#444b64}.form-group .input-group-append button{background-color:#2d344a !important;border-radius:0 8px 8px 0 !important;border:0;color:#9eaacc;font-size:14px;text-transform:uppercase;position:relative}.form-group .input-group-append button::before{background-color:#272d40;content:'';border-radius:8px;width:1px;height:70%;top:50%;left:0;position:absolute;transform:translateY(-50%)}.form-group .input-group-append button:focus,.form-group .input-group-append button:active,.form-group .input-group-append button:active:focus{box-shadow:0 0 0 0px #5692cd !important;background-color:transparent}.form-group .input-group-append button:hover{background-color:#2D344A}.form-group input,.form-group textarea{border-radius:8px;background-color:#2d344a;border:0;color:#9eaacc;font-size:14px;height:44px}.form-group input::placeholder,.form-group textarea::placeholder{color:#444b64;font-size:13px;font-family:'Nunito Sans', sans-serif}.form-group input:focus,.form-group input:active .form-group input:active:focus,.form-group textarea:focus,.form-group textarea:active .form-group input:active:focus,.form-group input:active .form-group textarea:active:focus,.form-group textarea:active .form-group textarea:active:focus{box-shadow:0 0 0 1px #5692cd;background-color:transparent;color:#9eaacc}.form-group textarea{padding:1em;height:120px}.cm_form .form-group{margin-bottom:2em}.box-confirmation>div{padding:1em 0}.box-confirmation>div>div{list-style:1.4}.box-confirmation>div>div:first-child{color:#5E677F}.font-icon-checkmark-outline{color:#e4ae63;font-size:60px}.word-break{word-break:break-word}.modal-content{border-radius:8px;background-color:#272d40}.modal-content .modal-title{color:#ffffff;font-size:18px;font-weight:600;text-transform:uppercase;text-align:center;font-family:'Bai Jamjuree', sans-serif}.border{border:1px solid #444b64 !important}.w-80{width:80px}.box-address .bg_gray{border-radius:8px;background-color:#272d40;padding:1em 1.5em;height:100%}.fullwidth{width:100%}.coinmarketcap-currency-widget *{border-width:0px !important;border-color:#5e677f !important}.coinmarketcap-currency-widget>div>div:first-child div:first-child>span:first-child a{color:#e4ae63 !important}.coinmarketcap-currency-widget>div>div:first-child div:first-child>span:last-child{color:#5e677f !important}.coinmarketcap-currency-widget>div>div:nth-child(2){overflow:hidden;padding-top:10px}.coinmarketcap-currency-widget>div>div:nth-child(2)>div{border-left:1px solid #3a4152 !important;padding:0 !important}.coinmarketcap-currency-widget>div>div:nth-child(2)>div:first-child{border:0 !important}.coinmarketcap-currency-widget>div>div:last-child{display:none}.qrc_bd{border:7px solid #fff;border-radius:3px;display:flex}.main_tab ul.nav-tabs{border:0}.main_tab ul.nav-tabs .nav-link{background:transparent !important;border:0;color:#5e677f;margin-right:50px;padding:0 0 5px;cursor:pointer;position:relative}.main_tab ul.nav-tabs .nav-link.active{color:#9eaacc}.main_tab ul.nav-tabs .nav-link.active::before{content:'';background-color:#5692cd;border-radius:25px;width:30px;height:2px;position:absolute;bottom:0;left:0}@media (max-width: 768px){.mb-text-center{text-align:center}}.footer-menu ul li{position:relative}.footer-menu ul li:before{background-color:#5e677f;content:'';height:20px;width:1px;position:absolute;left:0;top:50%;transform:translateY(-50%)}.footer-menu ul li:first-child:before{display:none}@media (max-width: 768px){.footer-menu{justify-content:center}}.footer-buttons{padding-top:15px;list-style-type:none;margin:0;padding:0;display:flex;justify-content:flex-end}@media (max-width: 768px){.footer-buttons{justify-content:center}}.footer-buttons li{display:inline-block;padding:5px}.footer-buttons li a{background:#272d40;border-radius:8px;color:#5e677f;display:flex;align-items:center;justify-content:center;width:30px;height:30px}.footer-buttons li a i{transition:all 0.3s}.footer-buttons li a:hover i{color:#fff}\n",
        '',
      ]);
  },
  805: function(e, t, n) {
    t = e.exports = n(340)(!1);
    var o = n(806),
      r = o(n(341)),
      a = o(n(341) + '#iefix'),
      i = o(n(807)),
      c = o(n(808)),
      l = o(n(809) + '#tomowallet');
    t.push([
      e.i,
      "@font-face {\n  font-family: 'tomowallet';\n  src:  url(" +
        r +
        ');\n  src:  url(' +
        a +
        ") format('embedded-opentype'),\n    url(" +
        i +
        ") format('truetype'),\n    url(" +
        c +
        ") format('woff'),\n    url(" +
        l +
        ') format(\'svg\');\n  font-weight: normal;\n  font-style: normal;\n}\n\ni {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: \'tomowallet\' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.font-icon-angle-double-left:before {\n  content: "\\e900";\n}\n.font-icon-angle-double-right:before {\n  content: "\\e901";\n}\n.font-icon-angle-down:before {\n  content: "\\e902";\n}\n.font-icon-angle-left:before {\n  content: "\\e903";\n}\n.font-icon-angle-right:before {\n  content: "\\e904";\n}\n.font-icon-angle-up:before {\n  content: "\\e905";\n}\n.font-icon-email:before {\n  content: "\\e906";\n}\n.font-icon-facebook:before {\n  content: "\\e907";\n}\n.font-icon-github:before {\n  content: "\\e908";\n}\n.font-icon-linkedin:before {\n  content: "\\e909";\n}\n.font-icon-telegram:before {\n  content: "\\e90b";\n}\n.font-icon-tomoz:before {\n  content: "\\e90c";\n}\n.font-icon-twitter:before {\n  content: "\\e90d";\n}\n.font-icon-wallet:before {\n  content: "\\e90e";\n}\n.font-icon-reddit:before {\n  content: "\\e90f";\n}\n.font-icon-next-right:before {\n  content: "\\e910";\n}\n.font-icon-startup:before {\n  content: "\\e911";\n}\n.font-icon-checkmark-outline:before {\n  content: "\\e912";\n}\n.font-icon-edit-pencil:before {\n  content: "\\e913";\n}\n.font-chevron-down:before {\n  content: "\\e90a";\n}',
      '',
    ]);
  },
  807: function(e, t, n) {
    e.exports = n.p + '3810bfd8cb0e2ebc8991bd67e2a7fe47.ttf';
  },
  808: function(e, t, n) {
    e.exports = n.p + '402aa80ccf23dab93e0e7063eb79b17c.woff';
  },
  809: function(e, t, n) {
    e.exports = n.p + '2f744a5585500833088b9c8a251ecf3f.svg';
  },
  811: function(e, t, n) {
    'use strict';
    n.r(t);
    n(371);
    var o = n(0),
      r = n.n(o),
      a = n(77),
      i = n.n(a),
      c = n(28),
      l = n(219),
      u = (n(565), n(30)),
      s = n(41),
      p = n(32),
      f = n.n(p),
      d = n(130),
      m = n(58),
      b = n(1),
      y = n.n(b),
      O = n(812),
      h = n(9);
    function g(e, t) {
      if (null == e) return {};
      var n,
        o,
        r = (function(e, t) {
          if (null == e) return {};
          var n,
            o,
            r = {},
            a = Object.keys(e);
          for (o = 0; o < a.length; o++)
            (n = a[o]), t.indexOf(n) >= 0 || (r[n] = e[n]);
          return r;
        })(e, t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        for (o = 0; o < a.length; o++)
          (n = a[o]),
            t.indexOf(n) >= 0 ||
              (Object.prototype.propertyIsEnumerable.call(e, n) &&
                (r[n] = e[n]));
      }
      return r;
    }
    function v() {
      var e = (function(e, t) {
        t || (t = e.slice(0));
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
        );
      })([
        '\n  display: ',
        ';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 99999;\n  width: 100vw;\n  height: 100vh;\n  padding-left: calc(50vw - 30px);\n  padding-top: calc(50vh - 30px);\n  background-color: black;\n  opacity: 0.5;\n  .spinner-border {\n    width: 60px;\n    height: 60px;\n  }\n',
      ]);
      return (
        (v = function() {
          return e;
        }),
        e
      );
    }
    var _ = Object(h.a)(function(e) {
        e.loading;
        var t = e.children,
          n = g(e, ['loading', 'children']);
        return r.a.createElement('div', n, t);
      })(v(), function(e) {
        return e.loading ? 'block' : 'none';
      }),
      E = n(46);
    function w(e) {
      return (w =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function T(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function P(e, t) {
      return !t || ('object' !== w(t) && 'function' != typeof t)
        ? (function(e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return e;
          })(e)
        : t;
    }
    function A(e) {
      return (A = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function N(e, t) {
      return (N =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    var R = (function(e) {
      function t() {
        return (
          (function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
          P(this, A(t).apply(this, arguments))
        );
      }
      var n, a, i;
      return (
        (function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function',
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            t && N(e, t);
        })(t, o['PureComponent']),
        (n = t),
        (a = [
          {
            key: 'render',
            value: function() {
              var e = this.props.loading;
              return r.a.createElement(
                _,
                { loading: e },
                r.a.createElement(O.a, { color: 'secondary' }),
              );
            },
          },
        ]) && T(n.prototype, a),
        i && T(n, i),
        t
      );
    })();
    (R.propTypes = { loading: y.a.bool }), (R.defaultProps = { loading: !1 });
    var L = Object(c.c)(function() {
        return Object(s.b)({ loading: E.b });
      })(R),
      S = n(15),
      j = n.n(S),
      M = n(97),
      I = n.n(M),
      k = n(817),
      C = n(818),
      x = n(835),
      W = n(830),
      D = n(831),
      B = n(832),
      U = n(833),
      H = n(5),
      Y = n(353),
      V = n.n(Y);
    function G(e) {
      return (G =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function F(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function K(e, t) {
      return !t || ('object' !== G(t) && 'function' != typeof t)
        ? (function(e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return e;
          })(e)
        : t;
    }
    function z(e) {
      return (z = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function q(e, t) {
      return (q =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    var J = (function(e) {
      function t() {
        return (
          (function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
          K(this, z(t).apply(this, arguments))
        );
      }
      var n, a, i;
      return (
        (function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function',
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            t && q(e, t);
        })(t, o['PureComponent']),
        (n = t),
        (a = [
          {
            key: 'render',
            value: function() {
              var e = this.props.formatMessage;
              return r.a.createElement(
                'div',
                { className: 'text-center content-warning' },
                r.a.createElement(
                  'div',
                  { className: 'conntent-warning__image' },
                  r.a.createElement('img', {
                    src: V.a,
                    alt: e(
                      H.d.HEADER_NAVBAR_POPUP_SHOW_WALLET_WARNING_IMAGE_ALT,
                    ),
                  }),
                ),
                r.a.createElement(
                  'div',
                  null,
                  e(H.d.HEADER_NAVBAR_POPUP_SHOW_WALLET_WARNING_TEXT),
                ),
              );
            },
          },
        ]) && F(n.prototype, a),
        i && F(n, i),
        t
      );
    })();
    (J.propTypes = { formatMessage: y.a.func }),
      (J.defaultProps = { formatMessage: function() {} });
    var X = J,
      Q = n(819),
      Z = n(820),
      $ = n(821),
      ee = (n(368), n(228)),
      te = n(18),
      ne = n(12),
      oe = n(85);
    function re(e) {
      return (re =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function ae(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function ie(e) {
      return (ie = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function ce(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e;
    }
    function le(e, t) {
      return (le =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    var ue = (function(e) {
      function t(e) {
        var n, o, r;
        return (
          (function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
          (o = this),
          ((n =
            !(r = ie(t).call(this, e)) ||
            ('object' !== re(r) && 'function' != typeof r)
              ? ce(o)
              : r).handleCheckPrivateKey = n.handleCheckPrivateKey.bind(ce(n))),
          (n.handleGetPrivateKey = n.handleGetPrivateKey.bind(ce(n))),
          (n.handleGetRecoveryPhrase = n.handleGetRecoveryPhrase.bind(ce(n))),
          n
        );
      }
      var n, a, i;
      return (
        (function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function',
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            t && le(e, t);
        })(t, o['PureComponent']),
        (n = t),
        (a = [
          {
            key: 'handleCheckPrivateKey',
            value: function() {
              return (0, this.props.isPrivateKey)(
                Object(te.i)().recoveryPhrase,
              );
            },
          },
          {
            key: 'handleGetPrivateKey',
            value: function() {
              var e = Object(te.i)(),
                t = e.recoveryPhrase,
                n = e.rpcServer;
              return this.handleCheckPrivateKey()
                ? t.replace(/^0x/, '')
                : Object(te.n)(t, n);
            },
          },
          {
            key: 'handleGetRecoveryPhrase',
            value: function() {
              return Object(te.i)().recoveryPhrase || '';
            },
          },
          {
            key: 'render',
            value: function() {
              var e = this.props,
                t = e.formatMessage,
                n = e.updateTab,
                o = e.walletPopup,
                a = j()(o, 'tabType'),
                i = this.handleCheckPrivateKey();
              return r.a.createElement(
                'div',
                { className: 'main_tab content-wallet-view' },
                r.a.createElement(
                  k.a,
                  { tabs: !0, className: 'mb-4' },
                  r.a.createElement(
                    C.a,
                    null,
                    !i &&
                      r.a.createElement(
                        Q.a,
                        {
                          active: a === ne.l.RECOVERY_PHRASE,
                          onClick: function() {
                            return n(ne.l.RECOVERY_PHRASE);
                          },
                        },
                        t(
                          H.d
                            .HEADER_NAVBAR_POPUP_SHOW_WALLET_TAB_RECOVERY_PHRASE,
                        ),
                      ),
                  ),
                  r.a.createElement(
                    C.a,
                    null,
                    r.a.createElement(
                      Q.a,
                      {
                        active: a === ne.l.PRIVATE_KEY,
                        onClick: function() {
                          return n(ne.l.PRIVATE_KEY);
                        },
                      },
                      t(H.d.HEADER_NAVBAR_POPUP_SHOW_WALLET_TAB_PRIVATE_KEY),
                    ),
                  ),
                ),
                r.a.createElement(
                  Z.a,
                  { activeTab: a },
                  !i &&
                    r.a.createElement(
                      $.a,
                      { tabId: ne.l.RECOVERY_PHRASE },
                      r.a.createElement(ee.a, {
                        mnemonic: this.handleGetRecoveryPhrase(),
                      }),
                    ),
                  r.a.createElement(
                    $.a,
                    { tabId: ne.l.PRIVATE_KEY, className: 'text-center mt-5' },
                    r.a.createElement(
                      'div',
                      { className: 'text-break' },
                      r.a.createElement(oe.r, null, this.handleGetPrivateKey()),
                    ),
                    r.a.createElement(
                      'div',
                      { className: 'mt-5' },
                      t(
                        H.d
                          .HEADER_NAVBAR_POPUP_SHOW_WALLET_TAB_PRIVATE_KEY_NOTE,
                      ),
                    ),
                  ),
                ),
              );
            },
          },
        ]) && ae(n.prototype, a),
        i && ae(n, i),
        t
      );
    })();
    (ue.propTypes = {
      formatMessage: y.a.func,
      isPrivateKey: y.a.func,
      updateTab: y.a.func,
      walletPopup: y.a.object,
    }),
      (ue.defaultProps = {
        formatMessage: function() {},
        isPrivateKey: function() {},
        updateTab: function() {},
        walletPopup: {},
      });
    var se = ue,
      pe = n(44),
      fe = n(39),
      de = n(78),
      me = n(131);
    function be() {
      var e = (function(e, t) {
        t || (t = e.slice(0));
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
        );
      })([
        '\n  max-width: 570px;\n  .modal-content {\n    min-height: 450px;\n    .modal-body {\n      .content-warning {\n        margin: auto;\n        max-width: 382px;\n        .conntent-warning__image {\n          margin: auto;\n          margin-bottom: 30px;\n          width: 245px;\n          text-align: center;\n          img {\n            max-height: 126px;\n          }\n        }\n      }\n      .content-wallet-view {\n        .nav-tabs {\n          display: flex;\n          justify-content: center;\n        }\n      }\n    }\n  }\n',
      ]);
      return (
        (be = function() {
          return e;
        }),
        e
      );
    }
    var ye = Object(h.a)(me.a)(be());
    function Oe(e) {
      return (Oe =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function he() {
      return (he =
        Object.assign ||
        function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        }).apply(this, arguments);
    }
    function ge(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function ve(e) {
      return (ve = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function _e(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e;
    }
    function Ee(e, t) {
      return (Ee =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    var we = (function(e) {
      function t(e) {
        var n, o, r;
        return (
          (function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
          (o = this),
          ((n =
            !(r = ve(t).call(this, e)) ||
            ('object' !== Oe(r) && 'function' != typeof r)
              ? _e(o)
              : r).handleClosePopup = n.handleClosePopup.bind(_e(n))),
          (n.handleGetButton = n.handleGetButton.bind(_e(n))),
          (n.handleGetContent = n.handleGetContent.bind(_e(n))),
          n
        );
      }
      var n, a, i;
      return (
        (function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function',
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            t && Ee(e, t);
        })(t, o['PureComponent']),
        (n = t),
        (a = [
          {
            key: 'handleClosePopup',
            value: function() {
              (0, this.props.onTogglePopup)(!1);
            },
          },
          {
            key: 'handleGetButton',
            value: function() {
              var e = this.props,
                t = e.intl.formatMessage,
                n = e.onUpdatePopupStage,
                o = e.walletPopup;
              return j()(o, 'stage') === ne.m.WARNING
                ? {
                    secondary: {
                      label: t(H.d.COMMON_BUTTON_BACK),
                      action: this.handleClosePopup,
                    },
                    primary: {
                      btnYellow: !0,
                      label: t(H.d.COMMON_BUTTON_NEXT),
                      action: function() {
                        return n(ne.m.CONTENT);
                      },
                    },
                  }
                : j()(o, 'stage') === ne.m.CONTENT
                ? {
                    secondary: {
                      label: t(H.d.COMMON_BUTTON_BACK),
                      action: this.handleClosePopup,
                    },
                    primary: {
                      btnYellow: !0,
                      label: t(H.d.COMMON_BUTTON_SAVE),
                    },
                  }
                : void 0;
            },
          },
          {
            key: 'handleGetContent',
            value: function() {
              var e = this.props,
                t = e.intl.formatMessage,
                n = e.onUpdatePopupContentTab,
                o = e.walletPopup,
                r = e.web3;
              return j()(o, 'stage') === ne.m.WARNING
                ? { Content: X, getContentProps: { formatMessage: t } }
                : j()(o, 'stage') === ne.m.CONTENT
                ? {
                    Content: se,
                    getContentProps: {
                      formatMessage: t,
                      isPrivateKey: r.utils.isHex,
                      updateTab: n,
                      walletPopup: o,
                    },
                  }
                : {};
            },
          },
          {
            key: 'render',
            value: function() {
              var e = this.props,
                t = e.intl.formatMessage,
                n = e.walletPopup;
              return r.a.createElement(
                ye,
                he({}, this.handleGetContent(), {
                  button: this.handleGetButton(),
                  isOpen: j()(n, 'isOpen', !1),
                  title: t(H.d.HEADER_NAVBAR_POPUP_SHOW_WALLET_TITLE),
                }),
              );
            },
          },
        ]) && ge(n.prototype, a),
        i && ge(n, i),
        t
      );
    })();
    (we.propTypes = {
      intl: y.a.object,
      onTogglePopup: y.a.func,
      onUpdatePopupContentTab: y.a.func,
      onUpdatePopupStage: y.a.func,
      walletPopup: y.a.object,
      web3: y.a.object,
    }),
      (we.defaultProps = {
        intl: {},
        onTogglePopup: function() {},
        onUpdatePopupContentTab: function() {},
        onUpdatePopupStage: function() {},
        walletPopup: {},
        web3: {},
      });
    var Te = Object(c.c)(
        function() {
          return Object(s.b)({ walletPopup: E.f });
        },
        function(e) {
          return {
            onTogglePopup: function(t) {
              return e(Object(pe.g)(t));
            },
            onUpdatePopupContentTab: function(t) {
              return e(Object(pe.h)(t));
            },
            onUpdatePopupStage: function(t) {
              return e(Object(pe.i)(t));
            },
          };
        },
      ),
      Pe = Object(u.d)(fe.c, Te, de.d)(we);
    function Ae() {
      var e = (function(e, t) {
        t || (t = e.slice(0));
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
        );
      })(['']);
      return (
        (Ae = function() {
          return e;
        }),
        e
      );
    }
    var Ne = Object(h.a)(me.a)(Ae()),
      Re = n(227),
      Le = n(339),
      Se = n.n(Le),
      je = function(e) {
        var t = e.formatMessage;
        return r.a.createElement(
          'div',
          { className: 'text-center' },
          r.a.createElement(
            oe.w,
            { className: 'mb-5' },
            r.a.createElement(Re.a, {
              src: Se.a,
              alt: t(H.d.WARNING_IMAGE_ALT),
            }),
          ),
          r.a.createElement(
            'span',
            null,
            t(H.d.HEADER_NAVBAR_POPUP_NETWORK_CONFIRMATION_CONTENT_TEXT),
          ),
        );
      };
    function Me(e) {
      return (Me =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function Ie(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function ke(e) {
      return (ke = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function Ce(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e;
    }
    function xe(e, t) {
      return (xe =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    var We = (function(e) {
      function t(e) {
        var n, o, r;
        return (
          (function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
          (o = this),
          ((n =
            !(r = ke(t).call(this, e)) ||
            ('object' !== Me(r) && 'function' != typeof r)
              ? Ce(o)
              : r).handleClosePopup = n.handleClosePopup.bind(Ce(n))),
          (n.handleConfirm = n.handleConfirm.bind(Ce(n))),
          n
        );
      }
      var n, a, i;
      return (
        (function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function',
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            t && xe(e, t);
        })(t, o['PureComponent']),
        (n = t),
        (a = [
          {
            key: 'handleClosePopup',
            value: function() {
              (0, this.props.togglePopup)(!1);
            },
          },
          {
            key: 'handleConfirm',
            value: function() {
              var e = this.props,
                t = e.changeNetwork,
                n = e.popupData,
                o = e.togglePopup;
              t(j()(n, 'selected', {})), o(!1);
            },
          },
          {
            key: 'render',
            value: function() {
              var e = this.props,
                t = e.intl.formatMessage,
                n = e.popupData;
              return r.a.createElement(Ne, {
                button: {
                  primary: {
                    action: this.handleConfirm,
                    btnYellow: !0,
                    label: t(H.d.COMMON_BUTTON_NEXT),
                  },
                  secondary: {
                    action: this.handleClosePopup,
                    label: t(H.d.COMMON_BUTTON_BACK),
                  },
                },
                Content: je,
                getContentProps: { formatMessage: t },
                isOpen: j()(n, 'isOpen', !1),
                title: t(H.d.HEADER_NAVBAR_POPUP_NETWORK_CONFIRMATION_TITLE),
              });
            },
          },
        ]) && Ie(n.prototype, a),
        i && Ie(n, i),
        t
      );
    })();
    (We.propTypes = {
      changeNetwork: y.a.func,
      intl: y.a.object,
      popupData: y.a.object,
    }),
      (We.defaultProps = {
        changeNetwork: function() {},
        intl: {},
        popupData: {},
      });
    var De = Object(fe.c)(We),
      Be = n(826),
      Ue = n(827),
      He = n(828),
      Ye = n(829);
    function Ve() {
      var e = qe([
        '\n  font-size: 14px;\n  transition: all .5s ease;\n  position: relative;\n  padding: .5rem 0;\n  background: transparent!important;\n  &:focus,\n  &:hover {\n    background: transparent;\n    color: #5692CD;\n    outline: 0 auto -webkit-focus-ring-color;\n  }\n',
      ]);
      return (
        (Ve = function() {
          return e;
        }),
        e
      );
    }
    function Ge() {
      var e = qe([
        '\n  background-color: #272D40;\n  border-radius: 8px;\n  border: 0;\n  top: 0;\n  margin: 0;\n  padding: 0.5em 1em;\n  min-width: 125px;\n  .dropdown-item {\n    color: #9eaacc;\n  }\n',
      ]);
      return (
        (Ge = function() {
          return e;
        }),
        e
      );
    }
    function Fe() {
      var e = qe([
        '\n  padding: 15px 0;\n  width: 100%;\n  text-align: center;\n  .navbar-brand {\n    > img {\n      height: 45px;\n      width: auto;\n      max-width: 100%;\n      cursor: pointer;\n    }\n  }\n  .nav-item {\n    font-weight: bold;\n    &:not(:first-child) {\n      margin-left: 20px;\n    }\n    &:not(:last-child) {\n      margin-right: 20px;\n    }\n  }\n',
      ]);
      return (
        (Fe = function() {
          return e;
        }),
        e
      );
    }
    function Ke() {
      var e = qe([
        "\n  color: #9eaacc !important;\n  font-weight: normal;\n  display: flex;\n  align-items: center;\n  font-size: 14px;\n  white-space: nowrap;\n  &.onl:before {\n      background-color: #36CE9A;\n      border-radius: 50%;\n      content: '';\n      width: 6px;\n      height: 6px;\n      position: absolute;\n      left: -5px;\n      top: 50%;\n      transform: translateY(-50%);\n    }\n",
      ]);
      return (
        (Ke = function() {
          return e;
        }),
        e
      );
    }
    function ze() {
      var e = qe([
        '\n  color: #9eaacc !important;\n  font-weight: normal;\n  cursor: pointer;\n',
      ]);
      return (
        (ze = function() {
          return e;
        }),
        e
      );
    }
    function qe(e, t) {
      return (
        t || (t = e.slice(0)),
        Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
        )
      );
    }
    var Je = Object(h.a)(Q.a)(ze()),
      Xe = Object(h.a)(Be.a)(Ke()),
      Qe = Object(h.a)(Ue.a)(Fe()),
      Ze = Object(h.a)(He.a)(Ge()),
      $e = Object(h.a)(Ye.a)(Ve()),
      et = n(359),
      tt = n.n(et);
    function nt(e) {
      return (nt =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function ot(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function rt(e) {
      return (rt = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function at(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e;
    }
    function it(e, t) {
      return (it =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    var ct = (function(e) {
      function t(e) {
        var n, o, r;
        return (
          (function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
          (o = this),
          ((n =
            !(r = rt(t).call(this, e)) ||
            ('object' !== nt(r) && 'function' != typeof r)
              ? at(o)
              : r).handleChangeLocale = n.handleChangeLocale.bind(at(n))),
          (n.handleChangeNetwork = n.handleChangeNetwork.bind(at(n))),
          (n.handleLogout = n.handleLogout.bind(at(n))),
          (n.handleRedirectToHomepage = n.handleRedirectToHomepage.bind(at(n))),
          (n.handleRenderPrivateBar = n.handleRenderPrivateBar.bind(at(n))),
          (n.handleRenderPublicBar = n.handleRenderPublicBar.bind(at(n))),
          (n.isActiveNetwork = n.isActiveNetwork.bind(at(n))),
          n
        );
      }
      var n, a, i;
      return (
        (function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function',
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            t && it(e, t);
        })(t, o['PureComponent']),
        (n = t),
        (a = [
          {
            key: 'componentDidMount',
            value: function() {
              var e = this.props,
                t = e.changeLocale,
                n = e.onSetNetwork,
                o = H.c.NETWORKS.find(function(e) {
                  return e.value === Object(te.f)();
                }),
                r = Object(te.e)();
              f()(o) || n(o), f()(r) || t(r);
            },
          },
          {
            key: 'handleChangeLocale',
            value: function(e) {
              var t = this.props.changeLocale;
              Object(te.s)(e), t(e);
            },
          },
          {
            key: 'handleChangeNetwork',
            value: function(e) {
              var t = this.props,
                n = t.onSetNetwork,
                o = t.switchRPCServer;
              n(e), o(e.value), this.handleLogout();
            },
          },
          {
            key: 'handleLogout',
            value: function() {
              var e = this,
                t = this.props.onReleaseWallet;
              Promise.all([t(), Object(te.p)(), Object(te.o)()]).then(
                function() {
                  return e.handleRedirectToHomepage();
                },
              );
            },
          },
          {
            key: 'handleRedirectToHomepage',
            value: function() {
              this.props.history.push(H.e.LOGIN);
            },
          },
          {
            key: 'handleRenderPublicBar',
            value: function() {
              var e = this,
                t = this.props,
                n = t.intl.formatMessage,
                a = t.language;
              return r.a.createElement(
                o.Fragment,
                null,
                r.a.createElement(
                  k.a,
                  { className: 'ml-auto', navbar: !0 },
                  r.a.createElement(
                    C.a,
                    null,
                    r.a.createElement(
                      Je,
                      null,
                      n(H.d.HEADER_NAVBAR_OPTION_ABOUT),
                    ),
                  ),
                  r.a.createElement(
                    C.a,
                    null,
                    r.a.createElement(
                      Je,
                      null,
                      n(H.d.HEADER_NAVBAR_OPTION_FAQS),
                    ),
                  ),
                  r.a.createElement(
                    x.a,
                    { nav: !0, inNavbar: !0 },
                    r.a.createElement(
                      Xe,
                      { nav: !0 },
                      (
                        H.c.LANGUAGES.find(function(e) {
                          return e.value === a;
                        }) || {}
                      ).label,
                      r.a.createElement('i', {
                        className: 'font-chevron-down',
                      }),
                    ),
                    r.a.createElement(
                      Ze,
                      { right: !0 },
                      H.c.LANGUAGES.map(function(t, n) {
                        return r.a.createElement(
                          $e,
                          {
                            key: 'language_'.concat(n + 1),
                            onClick: function() {
                              return e.handleChangeLocale(t.value);
                            },
                          },
                          t.label,
                        );
                      }),
                    ),
                  ),
                ),
              );
            },
          },
          {
            key: 'handleRenderPrivateBar',
            value: function() {
              var e = this,
                t = this.props,
                n = t.intl.formatMessage,
                a = t.network,
                i = t.onToggleNetworkConfirmationPopup,
                c = t.onToggleWalletPopup;
              return r.a.createElement(
                o.Fragment,
                null,
                r.a.createElement(
                  k.a,
                  { className: 'ml-auto', navbar: !0 },
                  r.a.createElement(
                    x.a,
                    { nav: !0, inNavbar: !0 },
                    r.a.createElement(
                      Xe,
                      { nav: !0, className: 'onl' },
                      j()(a, 'data.label'),
                      r.a.createElement('i', {
                        className: 'font-chevron-down',
                      }),
                    ),
                    r.a.createElement(
                      Ze,
                      { right: !0, className: 'box_onl' },
                      H.c.NETWORKS.map(function(t, n) {
                        return r.a.createElement(
                          $e,
                          {
                            key: 'network_'.concat(n + 1),
                            onClick: function() {
                              return i(!0, t);
                            },
                            active: e.isActiveNetwork(t),
                          },
                          t.label,
                        );
                      }),
                    ),
                  ),
                  r.a.createElement(
                    x.a,
                    { nav: !0, inNavbar: !0 },
                    r.a.createElement(
                      Xe,
                      { nav: !0 },
                      n(H.d.HEADER_NAVBAR_OPTION_MY_WALLET),
                      r.a.createElement('i', {
                        className: 'font-chevron-down',
                      }),
                    ),
                    r.a.createElement(
                      Ze,
                      { right: !0 },
                      !Object(te.d)() &&
                        r.a.createElement(
                          $e,
                          {
                            onClick: function() {
                              return c(!0);
                            },
                          },
                          n(
                            H.d
                              .HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_SHOW_WALLET,
                          ),
                        ),
                      r.a.createElement(
                        $e,
                        null,
                        n(H.d.HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_HELP),
                      ),
                      r.a.createElement(
                        $e,
                        { onClick: this.handleLogout },
                        n(H.d.HEADER_NAVBAR_OPTION_MY_WALLET_OPTION_LOG_OUT),
                      ),
                    ),
                  ),
                ),
              );
            },
          },
          {
            key: 'isActiveNetwork',
            value: function(e) {
              var t = this.props.network,
                n = e.value;
              return I()(j()(t, 'data.value'), n);
            },
          },
          {
            key: 'render',
            value: function() {
              var e = this.props,
                t = e.intl.formatMessage,
                n = e.isLoggedIn,
                a = e.network,
                i = e.networkConfirmationPopup,
                c = e.onToggleNetworkConfirmationPopup;
              return r.a.createElement(
                o.Fragment,
                null,
                r.a.createElement(
                  Qe,
                  { light: !0, expand: 'lg' },
                  r.a.createElement(
                    W.a,
                    { onClick: this.handleRedirectToHomepage },
                    r.a.createElement(D.a, {
                      src: tt.a,
                      alt: t(H.d.HEADER_NAVBAR_LOGO_ALT),
                    }),
                  ),
                  r.a.createElement(B.a, { onClick: this.handleToggleOptions }),
                  r.a.createElement(
                    U.a,
                    { isOpen: j()(a, 'isExpanded', !1), navbar: !0 },
                    n && this.handleRenderPrivateBar(),
                    this.handleRenderPublicBar(),
                  ),
                ),
                r.a.createElement(Pe, null),
                r.a.createElement(De, {
                  popupData: i,
                  togglePopup: c,
                  changeNetwork: this.handleChangeNetwork,
                }),
              );
            },
          },
        ]) && ot(n.prototype, a),
        i && ot(n, i),
        t
      );
    })();
    (ct.propTypes = {
      changeLocale: y.a.func,
      history: y.a.object,
      intl: y.a.object,
      isLoggedIn: y.a.bool,
      language: y.a.string,
      network: y.a.object,
      networkConfirmationPopup: y.a.object,
      onReleaseWallet: y.a.func,
      onSetNetwork: y.a.func,
      onToggleNetworkConfirmationPopup: y.a.func,
      onToggleWalletPopup: y.a.func,
      switchRPCServer: y.a.func,
    }),
      (ct.defaultProps = {
        changeLocaleL: function() {},
        history: {},
        intl: {},
        isLoggedIn: !1,
        language: 'en',
        network: {},
        networkConfirmationPopup: {},
        onReleaseWallet: function() {},
        onSetNetwork: function() {},
        onToggleNetworkConfirmationPopup: function() {},
        onToggleWalletPopup: function() {},
        switchRPCServer: function() {},
      });
    var lt = Object(c.c)(
        function() {
          return Object(s.b)({ network: E.d, networkConfirmationPopup: E.c });
        },
        function(e) {
          return {
            onReleaseWallet: function() {
              return e(Object(pe.a)());
            },
            onSetNetwork: function(t) {
              return e(Object(pe.c)(t));
            },
            onToggleNetworkConfirmationPopup: function(t, n) {
              return e(Object(pe.f)(t, n));
            },
            onToggleWalletPopup: function(t) {
              return e(Object(pe.g)(t));
            },
          };
        },
      ),
      ut = Object(u.d)(lt, m.f, de.d, fe.c)(ct),
      st = n(813),
      pt = n(814);
    function ft() {
      var e = mt(['\n  color: #5e677f;\n']);
      return (
        (ft = function() {
          return e;
        }),
        e
      );
    }
    function dt() {
      var e = mt(['\n  color: #5e677f !important;\n  font-weight: normal;\n']);
      return (
        (dt = function() {
          return e;
        }),
        e
      );
    }
    function mt(e, t) {
      return (
        t || (t = e.slice(0)),
        Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
        )
      );
    }
    var bt = Object(h.a)(Q.a)(dt()),
      yt = h.a.div(ft());
    function Ot(e) {
      return (Ot =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function ht(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function gt(e, t) {
      return !t || ('object' !== Ot(t) && 'function' != typeof t)
        ? (function(e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return e;
          })(e)
        : t;
    }
    function vt(e) {
      return (vt = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function _t(e, t) {
      return (_t =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    var Et = (function(e) {
      function t(e) {
        var n;
        return (
          (function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t),
          ((n = gt(this, vt(t).call(this, e))).FOOTER_BUTTONS = [
            {
              className: 'font-icon-facebook',
              link: 'https://www.facebook.com/tomochainofficial',
            },
            {
              className: 'font-icon-twitter',
              link: 'https://twitter.com/TomoChainANN',
            },
            { className: 'font-icon-telegram', link: 'https://t.me/tomochain' },
            {
              className: 'font-icon-github',
              link: 'https://github.com/tomochain/',
            },
            {
              className: 'font-icon-linkedin',
              link: 'https://www.linkedin.com/company/tomochain',
            },
            {
              className: 'font-icon-reddit',
              link: 'https://www.reddit.com/r/Tomochain/',
            },
          ]),
          n
        );
      }
      var n, a, i;
      return (
        (function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function',
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            t && _t(e, t);
        })(t, o['PureComponent']),
        (n = t),
        (a = [
          {
            key: 'render',
            value: function() {
              var e = this.props.intl.formatMessage;
              return r.a.createElement(
                st.a,
                { className: 'align-items-center pt-3 pb-3' },
                r.a.createElement(
                  pt.a,
                  { xs: 12, lg: 7 },
                  r.a.createElement(
                    yt,
                    { className: 'mb-text-center' },
                    e(H.d.FOOTER_VERSION_TEXT),
                  ),
                  r.a.createElement(
                    st.a,
                    { className: 'footer-menu' },
                    r.a.createElement(
                      k.a,
                      null,
                      r.a.createElement(
                        C.a,
                        null,
                        r.a.createElement(
                          bt,
                          { href: '#' },
                          e(H.d.FOOTER_OPTION_HELP),
                        ),
                      ),
                      r.a.createElement(
                        C.a,
                        null,
                        r.a.createElement(
                          bt,
                          { href: '#' },
                          e(H.d.FOOTER_OPTION_POLICY),
                        ),
                      ),
                      r.a.createElement(
                        C.a,
                        null,
                        r.a.createElement(
                          bt,
                          { href: '#' },
                          e(H.d.FOOTER_OPTION_TERMS_OF_SERVICE),
                        ),
                      ),
                      r.a.createElement(
                        C.a,
                        null,
                        r.a.createElement(
                          bt,
                          { href: '#' },
                          e(H.d.FOOTER_OPTION_API_DOCUMENTATION),
                        ),
                      ),
                    ),
                  ),
                ),
                r.a.createElement(
                  pt.a,
                  { xs: 12, lg: 5 },
                  r.a.createElement(
                    k.a,
                    { className: 'footer-buttons' },
                    this.FOOTER_BUTTONS.map(function(e, t) {
                      return r.a.createElement(
                        C.a,
                        { key: 'footer_button_'.concat(t + 1) },
                        r.a.createElement(
                          bt,
                          { href: '{item.link}', target: '_blank' },
                          r.a.createElement('i', { className: e.className }),
                        ),
                      );
                    }),
                  ),
                ),
              );
            },
          },
        ]) && ht(n.prototype, a),
        i && ht(n, i),
        t
      );
    })();
    (Et.propTypes = { intl: y.a.object }), (Et.defaultProps = { intl: {} });
    var wt = Object(fe.c)(Et),
      Tt = n(129),
      Pt = Object(Tt.a)(function() {
        return n.e(8).then(n.bind(null, 907));
      }),
      At = Object(Tt.a)(function() {
        return Promise.all([n.e(4), n.e(7)]).then(n.bind(null, 915));
      }),
      Nt = Object(Tt.a)(function() {
        return Promise.all([n.e(2), n.e(5)]).then(n.bind(null, 908));
      }),
      Rt = Object(Tt.a)(function() {
        return Promise.all([n.e(3), n.e(6)]).then(n.bind(null, 914));
      });
    function Lt(e) {
      return (Lt =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function St(e, t) {
      if (null == e) return {};
      var n,
        o,
        r = (function(e, t) {
          if (null == e) return {};
          var n,
            o,
            r = {},
            a = Object.keys(e);
          for (o = 0; o < a.length; o++)
            (n = a[o]), t.indexOf(n) >= 0 || (r[n] = e[n]);
          return r;
        })(e, t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        for (o = 0; o < a.length; o++)
          (n = a[o]),
            t.indexOf(n) >= 0 ||
              (Object.prototype.propertyIsEnumerable.call(e, n) &&
                (r[n] = e[n]));
      }
      return r;
    }
    function jt(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function Mt(e, t) {
      return !t || ('object' !== Lt(t) && 'function' != typeof t)
        ? (function(e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return e;
          })(e)
        : t;
    }
    function It(e) {
      return (It = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function kt(e, t) {
      return (kt =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    var Ct = (function(e) {
        function t() {
          return (
            (function(e, t) {
              if (!(e instanceof t))
                throw new TypeError('Cannot call a class as a function');
            })(this, t),
            Mt(this, It(t).apply(this, arguments))
          );
        }
        var n, a, i;
        return (
          (function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError(
                'Super expression must either be null or a function',
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              t && kt(e, t);
          })(t, o['PureComponent']),
          (n = t),
          (a = [
            {
              key: 'render',
              value: function() {
                var e = this.props,
                  t = e.isLoggedIn,
                  n = St(e, ['isLoggedIn']);
                return t
                  ? r.a.createElement(m.b, n)
                  : r.a.createElement(m.a, { strict: !0, to: H.e.LOGIN });
              },
            },
          ]) && jt(n.prototype, a),
          i && jt(n, i),
          t
        );
      })(),
      xt = n(825);
    function Wt() {
      var e = (function(e, t) {
        t || (t = e.slice(0));
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
        );
      })(['\n\n']);
      return (
        (Wt = function() {
          return e;
        }),
        e
      );
    }
    var Dt = Object(h.a)(xt.a)(Wt()),
      Bt = (n(803), n(68));
    function Ut(e) {
      return (Ut =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function Ht(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function Yt(e) {
      return (Yt = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function Vt(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e;
    }
    function Gt(e, t) {
      return (Gt =
        Object.setPrototypeOf ||
        function(e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    var Ft = (function(e) {
        function t(e) {
          var n, o, r;
          return (
            (function(e, t) {
              if (!(e instanceof t))
                throw new TypeError('Cannot call a class as a function');
            })(this, t),
            (o = this),
            ((n =
              !(r = Yt(t).call(this, e)) ||
              ('object' !== Ut(r) && 'function' != typeof r)
                ? Vt(o)
                : r).handleCheckLoggedIn = n.handleCheckLoggedIn.bind(Vt(n))),
            n
          );
        }
        var n, a, i;
        return (
          (function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError(
                'Super expression must either be null or a function',
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              t && Gt(e, t);
          })(t, o['PureComponent']),
          (n = t),
          (a = [
            {
              key: 'componentDidMount',
              value: function() {
                var e = this.props,
                  t = e.onStoreWallet,
                  n = e.updateWeb3,
                  o = Object(te.i)(),
                  r = Object(te.d)();
                if (o) {
                  var a = o.recoveryPhrase,
                    i = o.rpcServer;
                  Object(Bt.d)(a, i).then(function(e) {
                    var o = e.web3,
                      r = e.walletInfo;
                    n(o), t(r);
                  });
                } else r && t(r);
              },
            },
            {
              key: 'handleCheckLoggedIn',
              value: function() {
                var e = this.props.wallet;
                return !f()(e) || !!Object(te.i)() || !!Object(te.d)();
              },
            },
            {
              key: 'render',
              value: function() {
                var e = this.handleCheckLoggedIn();
                return r.a.createElement(
                  d.a,
                  null,
                  r.a.createElement(
                    Dt,
                    null,
                    r.a.createElement(L, null),
                    r.a.createElement(ut, { isLoggedIn: e }),
                    r.a.createElement(
                      'div',
                      { className: 'maincontent pt-3 pb-3' },
                      r.a.createElement(m.b, {
                        path: H.e.LOGIN,
                        render: function() {
                          return e
                            ? r.a.createElement(m.a, {
                                strict: !0,
                                to: H.e.MY_WALLET,
                              })
                            : r.a.createElement(Pt, null);
                        },
                      }),
                      r.a.createElement(m.b, {
                        path: H.e.CREATE_WALLET,
                        render: function() {
                          return e
                            ? r.a.createElement(m.a, {
                                strict: !0,
                                to: H.e.MY_WALLET,
                              })
                            : r.a.createElement(At, null);
                        },
                      }),
                      r.a.createElement(m.b, {
                        path: H.e.IMPORT_WALLET,
                        render: function() {
                          return e
                            ? r.a.createElement(m.a, {
                                strict: !0,
                                to: H.e.MY_WALLET,
                              })
                            : r.a.createElement(Nt, null);
                        },
                      }),
                      r.a.createElement(Ct, {
                        isLoggedIn: e,
                        path: H.e.MY_WALLET,
                        component: Rt,
                      }),
                      r.a.createElement(m.b, {
                        strict: !0,
                        path: H.e.DEFAULT,
                        render: function() {
                          return r.a.createElement(m.a, { to: H.e.LOGIN });
                        },
                      }),
                    ),
                    r.a.createElement(wt, { className: 'mt-5', isLoggedIn: e }),
                  ),
                );
              },
            },
          ]) && Ht(n.prototype, a),
          i && Ht(n, i),
          t
        );
      })(),
      Kt = Object(c.c)(
        function() {
          return Object(s.b)({ wallet: E.e });
        },
        function(e) {
          return {
            onStoreWallet: function(t) {
              return e(Object(pe.d)(t));
            },
          };
        },
      ),
      zt = Object(u.d)(de.d, Kt)(Ft),
      qt = n(360),
      Jt = n(361),
      Xt = n.n(Jt),
      Qt = n(342),
      Zt = n(366),
      $t = n(163),
      en = n(75),
      tn = n(362),
      nn = n.n(tn),
      on = n(363),
      rn = n.n(on),
      an = n(225),
      cn = n(364),
      ln = n(365);
    function un(e) {
      return (
        (function(e) {
          if (Array.isArray(e)) {
            for (var t = 0, n = new Array(e.length); t < e.length; t++)
              n[t] = e[t];
            return n;
          }
        })(e) ||
        (function(e) {
          if (
            Symbol.iterator in Object(e) ||
            '[object Arguments]' === Object.prototype.toString.call(e)
          )
            return Array.from(e);
        })(e) ||
        (function() {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance',
          );
        })()
      );
    }
    an.b.add(cn.a, ln.a), Object(en.c)([].concat(un(nn.a), un(rn.a)));
    var sn,
      pn,
      fn,
      dn,
      mn,
      bn = ((sn = te.j),
      (pn = Object(Zt.a)({})),
      (fn = [qt.a, Xt.a, pn, Object(Qt.a)(sn)]),
      (dn = [u.a.apply(void 0, fn)]),
      ((mn = Object(u.e)(
        Object($t.a)(),
        void 0,
        u.d.apply(void 0, dn),
      )).runSaga = pn.run),
      (mn.injectedReducers = {}),
      (mn.injectedSagas = {}),
      mn);
    Object(l.a)(bn);
    i.a.render(
      r.a.createElement(
        c.a,
        { store: bn },
        r.a.createElement(
          de.c,
          null,
          r.a.createElement(fe.a, null, r.a.createElement(zt, null)),
        ),
      ),
      document.getElementById('root'),
    );
  },
  85: function(e, t, n) {
    'use strict';
    var o = n(0),
      r = n.n(o),
      a = n(9);
    function i() {
      var e = f([
        "\n  font-family: 'Nunito Sans', sans-serif;\n  transition: all 0.3s;\n  ",
        '\n  &:focus,\n  &:hover {\n    ',
        '\n    cursor: pointer;\n  }\n  &:disabled {\n    opacity: 0.7;\n  }\n',
      ]);
      return (
        (i = function() {
          return e;
        }),
        e
      );
    }
    function c() {
      var e = f([
        "\n  background: transparent;\n  border: 1px solid #444b64;\n  border-radius: 8px;\n  display: flex;\n  height: 44px;\n  padding: 0 2em;\n  justify-content: center;\n  align-items: center;\n  font-family: 'Nunito Sans', sans-serif;\n  transition: all 0.3s;\n  width: 100%;\n  color: #9eaacc;\n  &:focus {\n    outline: none;\n  }\n  &:disabled {\n    opacity: 0.5;\n  }\n",
      ]);
      return (
        (c = function() {
          return e;
        }),
        e
      );
    }
    function l(e, t) {
      if (null == e) return {};
      var n,
        o,
        r = (function(e, t) {
          if (null == e) return {};
          var n,
            o,
            r = {},
            a = Object.keys(e);
          for (o = 0; o < a.length; o++)
            (n = a[o]), t.indexOf(n) >= 0 || (r[n] = e[n]);
          return r;
        })(e, t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        for (o = 0; o < a.length; o++)
          (n = a[o]),
            t.indexOf(n) >= 0 ||
              (Object.prototype.propertyIsEnumerable.call(e, n) &&
                (r[n] = e[n]));
      }
      return r;
    }
    function u() {
      var e = f([
        '\n  ',
        "\n  border: 0px;\n  border-radius: 8px;\n  display: flex;\n  height: 44px;\n  padding: 0 2em;\n  justify-content: center;\n  align-items: center;\n  font-family: 'Nunito Sans', sans-serif;\n  transition: all 0.3s;\n  width: 100%;\n  &:hover {\n    ",
        '\n  }\n  &:focus {\n    outline: none;\n  }\n  &:disabled {\n    opacity: 0.5;\n  }\n',
      ]);
      return (
        (u = function() {
          return e;
        }),
        e
      );
    }
    function s() {
      var e = f([
        '\n  ',
        "\n  border: 0px;\n  border-radius: 8px;\n  display: flex;\n  height: 34px;\n  padding: 0 2em;\n  justify-content: center;\n  align-items: center;\n  font-family: 'Nunito Sans', sans-serif;\n  transition: all 0.3s;\n  width: 100%;\n  &:hover {\n    ",
        '\n  }\n  &:focus {\n    outline: none;\n  }\n',
      ]);
      return (
        (s = function() {
          return e;
        }),
        e
      );
    }
    function p() {
      var e = f([
        '\n  ',
        "\n  border: 0px;\n  border-radius: 8px;\n  display: flex;\n  height: 44px;\n  padding: 0 2em;\n  justify-content: center;\n  align-items: center;\n  font-family: 'Nunito Sans', sans-serif;\n  transition: all 0.3s;\n  width: 100%;\n  &:hover {\n    ",
        '\n  }\n  &:focus {\n    outline: none;\n  }\n',
      ]);
      return (
        (p = function() {
          return e;
        }),
        e
      );
    }
    function f(e, t) {
      return (
        t || (t = e.slice(0)),
        Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
        )
      );
    }
    var d = a.a.button(
        p(),
        function(e) {
          return e.btnBlue
            ? 'background-color:#5692cd;color:#ffffff;'
            : 'background-color:#e4ae63;color:#ffffff';
        },
        function(e) {
          return e.btnBlue
            ? 'background-color:#4076AC;color:#ffffff;'
            : 'background-color:#C59148;color:#ffffff';
        },
      ),
      m = a.a.button(
        s(),
        function(e) {
          return e.btnBlue
            ? 'background-color:#5692cd;color:#ffffff;'
            : 'background-color:#e4ae63;color:#ffffff';
        },
        function(e) {
          return e.btnBlue
            ? 'background-color:#4076AC;color:#ffffff;'
            : 'background-color:#C59148;color:#ffffff';
        },
      ),
      b = Object(a.a)(function(e) {
        e.action, e.btnBlue, e.btnYellow;
        var t = e.children,
          n = l(e, ['action', 'btnBlue', 'btnYellow', 'children']);
        return r.a.createElement('button', n, t);
      })(
        u(),
        function(e) {
          var t = e.btnYellow,
            n = e.btnBlue;
          return t
            ? 'background-color:#e4ae63;color:#444b64'
            : n
            ? 'background-color:#5692cd;color:#ffffff;'
            : 'background-color:#2d344a;color:#9eaacc;';
        },
        function(e) {
          var t = e.btnYellow,
            n = e.btnBlue;
          return t
            ? 'background-color:#C59148;color:#444b64'
            : n
            ? 'background-color:#4076AC;color:#ffffff;'
            : 'background-color:#3D496E;color:#9eaacc;';
        },
      ),
      y = a.a.button(c()),
      O = Object(a.a)(function(e) {
        e.btnRed;
        var t = e.children,
          n = l(e, ['btnRed', 'children']);
        return r.a.createElement('span', n, t);
      })(
        i(),
        function(e) {
          return e.btnRed && 'color: #dc3545;';
        },
        function(e) {
          return e.btnRed && 'color: #8b0000;';
        },
      ),
      h = n(815);
    function g() {
      var e = (function(e, t) {
        t || (t = e.slice(0));
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
        );
      })([
        '\n  font-size: 14px;\n  color: #9eaacc !important;\n  line-height: 1.7;\n  margin-top: 30px;\n',
      ]);
      return (
        (g = function() {
          return e;
        }),
        e
      );
    }
    var v = Object(a.a)(h.a)(g()),
      _ = n(816);
    function E() {
      var e = N([
        '\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1em;\n',
      ]);
      return (
        (E = function() {
          return e;
        }),
        e
      );
    }
    function w() {
      var e = N([
        '\n  display: flex;\n  align-items: center;\n  justify-content: center;\n',
      ]);
      return (
        (w = function() {
          return e;
        }),
        e
      );
    }
    function T() {
      var e = N(['\n  padding: 0 3em;\n']);
      return (
        (T = function() {
          return e;
        }),
        e
      );
    }
    function P() {
      var e = N([
        '\n  background-color: #272d40;\n  border-radius: 8px;\n  padding: 3em 2em;\n  max-width: 600px;\n  margin: 0 auto;\n',
      ]);
      return (
        (P = function() {
          return e;
        }),
        e
      );
    }
    function A() {
      var e = N(['\n  max-width: 370px;\n  text-align: center;\n']);
      return (
        (A = function() {
          return e;
        }),
        e
      );
    }
    function N(e, t) {
      return (
        t || (t = e.slice(0)),
        Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
        )
      );
    }
    var R = a.a.div(A()),
      L = a.a.div(P()),
      S = Object(a.a)(_.a)(T()),
      j = a.a.div(w());
    a.a.div(E());
    function M() {
      var e = (function(e, t) {
        t || (t = e.slice(0));
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
        );
      })([
        '\n  align-items: center;\n  border-radius: 8px;\n  cursor: pointer;\n  width: 100%;\n  height: 100%;\n  padding: 2.5em 1.5em;\n  position: relative;\n  transition: 0.3s;\n  text-align: center;\n  ',
        '\n  .card-img {\n    width: 40px;\n  }\n  .card-body {\n    .card-title {\n      margin-bottom: 0px;\n      font-size: 20px;\n      ',
        '\n    }\n  }\n',
      ]);
      return (
        (M = function() {
          return e;
        }),
        e
      );
    }
    var I = a.a.div(
      M(),
      function(e) {
        return e.isActive
          ? 'background-color: #2d344a;border: solid 1px #2d344a;border-top: 5px solid #e4ae63;'
          : 'border: solid 1px #444b64;border-top: solid 5px #444b64;';
      },
      function(e) {
        return e.isActive && 'font-weight: bold;';
      },
    );
    function k() {
      var e = (function(e, t) {
        t || (t = e.slice(0));
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
        );
      })([
        '\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3em 0 0;\n  img {\n    max-width: 150px;\n  }\n',
      ]);
      return (
        (k = function() {
          return e;
        }),
        e
      );
    }
    var C = a.a.div(k());
    function x() {
      var e = q(['']);
      return (
        (x = function() {
          return e;
        }),
        e
      );
    }
    function W() {
      var e = q(['\n  color: #5e677f;\n']);
      return (
        (W = function() {
          return e;
        }),
        e
      );
    }
    function D() {
      var e = q([
        '\n  color: #e4ae63;\n  cursor: pointer;\n  transition: all .3s;\n  &:hover {\n    color: #C59148;\n  }\n',
      ]);
      return (
        (D = function() {
          return e;
        }),
        e
      );
    }
    function B() {
      var e = q(['\n  color: #e4ae63;\n  cursor: pointer;\n']);
      return (
        (B = function() {
          return e;
        }),
        e
      );
    }
    function U() {
      var e = q(['\n  color: #e4ae63;\n']);
      return (
        (U = function() {
          return e;
        }),
        e
      );
    }
    function H() {
      var e = q([
        '\n  color: #5692CD;\n  cursor: pointer;\n  transition: all .3s;\n  &:hover {\n    color: #0056b3;\n  }\n',
      ]);
      return (
        (H = function() {
          return e;
        }),
        e
      );
    }
    function Y() {
      var e = q(['\n  color: #5692CD;\n']);
      return (
        (Y = function() {
          return e;
        }),
        e
      );
    }
    function V() {
      var e = q(['\n  color: #be445e;\n']);
      return (
        (V = function() {
          return e;
        }),
        e
      );
    }
    function G() {
      var e = q([
        '\n  font-size: 14px;\n  text-transform: uppercase;\n  margin-bottom: 15px;\n',
      ]);
      return (
        (G = function() {
          return e;
        }),
        e
      );
    }
    function F() {
      var e = q(['\n  color: #ffffff;\n  font-size: 16px;\n']);
      return (
        (F = function() {
          return e;
        }),
        e
      );
    }
    function K() {
      var e = q([
        "\n  color: #ffffff;\n  font-size: 18px;\n  font-weight: 600;\n  text-transform: uppercase;\n  font-family: 'Bai Jamjuree', sans-serif;\n",
      ]);
      return (
        (K = function() {
          return e;
        }),
        e
      );
    }
    function z() {
      var e = q([
        "\n  color: #ffffff;\n  font-size: 50px;\n  font-weight: 600;\n  font-family: 'Bai Jamjuree', sans-serif;\n",
      ]);
      return (
        (z = function() {
          return e;
        }),
        e
      );
    }
    function q(e, t) {
      return (
        t || (t = e.slice(0)),
        Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
        )
      );
    }
    var J = a.a.h1(z()),
      X = a.a.h2(K()),
      Q = a.a.h3(F()),
      Z = a.a.h2(G()),
      $ = a.a.span(V()),
      ee = (a.a.a(Y()), a.a.span(H())),
      te = a.a.span(U()),
      ne = a.a.a(B()),
      oe = a.a.span(D()),
      re = a.a.div(W()),
      ae = a.a.div(x());
    n.d(t, 'a', function() {
      return d;
    }),
      n.d(t, 'p', function() {
        return m;
      }),
      n.d(t, 'h', function() {
        return b;
      }),
      n.d(t, 'f', function() {
        return y;
      }),
      n.d(t, 'g', function() {
        return O;
      }),
      n.d(t, 'j', function() {
        return v;
      }),
      n.d(t, 'b', function() {
        return R;
      }),
      n.d(t, 'i', function() {
        return L;
      }),
      n.d(t, 'c', function() {
        return S;
      }),
      n.d(t, 'd', function() {
        return j;
      }),
      n.d(t, 'o', function() {
        return I;
      }),
      n.d(t, 'w', function() {
        return C;
      }),
      n.d(t, 'k', function() {
        return J;
      }),
      n.d(t, 'l', function() {
        return X;
      }),
      n.d(t, 'm', function() {
        return Q;
      }),
      n.d(t, 'n', function() {
        return Z;
      }),
      n.d(t, 'q', function() {
        return $;
      }),
      n.d(t, 'r', function() {
        return ee;
      }),
      n.d(t, 'u', function() {
        return te;
      }),
      n.d(t, 't', function() {
        return ne;
      }),
      n.d(t, 'v', function() {
        return oe;
      }),
      n.d(t, 'e', function() {
        return ae;
      }),
      n.d(t, 's', function() {
        return re;
      });
  },
});
