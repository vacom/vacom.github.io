var app = (function () {
  "use strict";
  function t() {}
  const e = (t) => t;
  function n(t, e) {
    for (const n in e) t[n] = e[n];
    return t;
  }
  function o(t) {
    return t();
  }
  function r() {
    return Object.create(null);
  }
  function s(t) {
    t.forEach(o);
  }
  function i(t) {
    return "function" == typeof t;
  }
  function l(t, e) {
    return t != t
      ? e == e
      : t !== e || (t && "object" == typeof t) || "function" == typeof t;
  }
  function c(e, ...n) {
    if (null == e) return t;
    const o = e.subscribe(...n);
    return o.unsubscribe ? () => o.unsubscribe() : o;
  }
  function a(t, e, n) {
    t.$$.on_destroy.push(c(e, n));
  }
  function u(t, e, n, o) {
    if (t) {
      const r = f(t, e, n, o);
      return t[0](r);
    }
  }
  function f(t, e, o, r) {
    return t[1] && r ? n(o.ctx.slice(), t[1](r(e))) : o.ctx;
  }
  function p(t, e, n, o, r, s, i) {
    const l = (function (t, e, n, o) {
      if (t[2] && o) {
        const r = t[2](o(n));
        if (void 0 === e.dirty) return r;
        if ("object" == typeof r) {
          const t = [],
            n = Math.max(e.dirty.length, r.length);
          for (let o = 0; o < n; o += 1) t[o] = e.dirty[o] | r[o];
          return t;
        }
        return e.dirty | r;
      }
      return e.dirty;
    })(e, o, r, s);
    if (l) {
      const r = f(e, n, o, i);
      t.p(r, l);
    }
  }
  function d(t) {
    const e = {};
    for (const n in t) "$" !== n[0] && (e[n] = t[n]);
    return e;
  }
  function m(e) {
    return e && i(e.destroy) ? e.destroy : t;
  }
  const g = "undefined" != typeof window;
  let $ = g ? () => window.performance.now() : () => Date.now(),
    h = g ? (t) => requestAnimationFrame(t) : t;
  const v = new Set();
  function b(t) {
    v.forEach((e) => {
      e.c(t) || (v.delete(e), e.f());
    }),
      0 !== v.size && h(b);
  }
  function y(t, e) {
    t.appendChild(e);
  }
  function x(t, e, n) {
    t.insertBefore(e, n || null);
  }
  function w(t) {
    t.parentNode.removeChild(t);
  }
  function k(t, e) {
    for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
  }
  function T(t) {
    return document.createElement(t);
  }
  function _(t) {
    return document.createTextNode(t);
  }
  function j() {
    return _(" ");
  }
  function A() {
    return _("");
  }
  function S(t, e, n) {
    null == n
      ? t.removeAttribute(e)
      : t.getAttribute(e) !== n && t.setAttribute(e, n);
  }
  function E(t, e) {
    (e = "" + e), t.wholeText !== e && (t.data = e);
  }
  function P(t, e, n) {
    t.classList[n ? "add" : "remove"](e);
  }
  const C = new Set();
  let R,
    L = 0;
  function q(t, e, n, o, r, s, i, l = 0) {
    const c = 16.666 / o;
    let a = "{\n";
    for (let t = 0; t <= 1; t += c) {
      const o = e + (n - e) * s(t);
      a += 100 * t + `%{${i(o, 1 - o)}}\n`;
    }
    const u = a + `100% {${i(n, 1 - n)}}\n}`,
      f = `__svelte_${(function (t) {
        let e = 5381,
          n = t.length;
        for (; n--; ) e = ((e << 5) - e) ^ t.charCodeAt(n);
        return e >>> 0;
      })(u)}_${l}`,
      p = t.ownerDocument;
    C.add(p);
    const d =
        p.__svelte_stylesheet ||
        (p.__svelte_stylesheet = p.head.appendChild(T("style")).sheet),
      m = p.__svelte_rules || (p.__svelte_rules = {});
    m[f] ||
      ((m[f] = !0), d.insertRule(`@keyframes ${f} ${u}`, d.cssRules.length));
    const g = t.style.animation || "";
    return (
      (t.style.animation = `${
        g ? g + ", " : ""
      }${f} ${o}ms linear ${r}ms 1 both`),
      (L += 1),
      f
    );
  }
  function I(t, e) {
    const n = (t.style.animation || "").split(", "),
      o = n.filter(
        e ? (t) => t.indexOf(e) < 0 : (t) => -1 === t.indexOf("__svelte")
      ),
      r = n.length - o.length;
    r &&
      ((t.style.animation = o.join(", ")),
      (L -= r),
      L ||
        h(() => {
          L ||
            (C.forEach((t) => {
              const e = t.__svelte_stylesheet;
              let n = e.cssRules.length;
              for (; n--; ) e.deleteRule(n);
              t.__svelte_rules = {};
            }),
            C.clear());
        }));
  }
  function M(t) {
    R = t;
  }
  function z() {
    if (!R) throw new Error("Function called outside component initialization");
    return R;
  }
  function O(t) {
    z().$$.on_mount.push(t);
  }
  function D(t, e) {
    z().$$.context.set(t, e);
  }
  function N(t) {
    return z().$$.context.get(t);
  }
  const W = [],
    F = [],
    V = [],
    H = [],
    B = Promise.resolve();
  let G = !1;
  function U(t) {
    V.push(t);
  }
  let K = !1;
  const J = new Set();
  function Q() {
    if (!K) {
      K = !0;
      do {
        for (let t = 0; t < W.length; t += 1) {
          const e = W[t];
          M(e), Y(e.$$);
        }
        for (W.length = 0; F.length; ) F.pop()();
        for (let t = 0; t < V.length; t += 1) {
          const e = V[t];
          J.has(e) || (J.add(e), e());
        }
        V.length = 0;
      } while (W.length);
      for (; H.length; ) H.pop()();
      (G = !1), (K = !1), J.clear();
    }
  }
  function Y(t) {
    if (null !== t.fragment) {
      t.update(), s(t.before_update);
      const e = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, e),
        t.after_update.forEach(U);
    }
  }
  let X;
  function Z(t, e, n) {
    t.dispatchEvent(
      (function (t, e) {
        const n = document.createEvent("CustomEvent");
        return n.initCustomEvent(t, !1, !1, e), n;
      })(`${e ? "intro" : "outro"}${n}`)
    );
  }
  const tt = new Set();
  let et;
  function nt() {
    et = { r: 0, c: [], p: et };
  }
  function ot() {
    et.r || s(et.c), (et = et.p);
  }
  function rt(t, e) {
    t && t.i && (tt.delete(t), t.i(e));
  }
  function st(t, e, n, o) {
    if (t && t.o) {
      if (tt.has(t)) return;
      tt.add(t),
        et.c.push(() => {
          tt.delete(t), o && (n && t.d(1), o());
        }),
        t.o(e);
    }
  }
  const it = { duration: 0 };
  function lt(n, o, r, l) {
    let c = o(n, r),
      a = l ? 0 : 1,
      u = null,
      f = null,
      p = null;
    function d() {
      p && I(n, p);
    }
    function m(t, e) {
      const n = t.b - a;
      return (
        (e *= Math.abs(n)),
        {
          a: a,
          b: t.b,
          d: n,
          duration: e,
          start: t.start,
          end: t.start + e,
          group: t.group,
        }
      );
    }
    function g(o) {
      const {
          delay: r = 0,
          duration: i = 300,
          easing: l = e,
          tick: g = t,
          css: y,
        } = c || it,
        x = { start: $() + r, b: o };
      o || ((x.group = et), (et.r += 1)),
        u
          ? (f = x)
          : (y && (d(), (p = q(n, a, o, i, r, l, y))),
            o && g(0, 1),
            (u = m(x, i)),
            U(() => Z(n, o, "start")),
            (function (t) {
              let e;
              0 === v.size && h(b),
                new Promise((n) => {
                  v.add((e = { c: t, f: n }));
                });
            })((t) => {
              if (
                (f &&
                  t > f.start &&
                  ((u = m(f, i)),
                  (f = null),
                  Z(n, u.b, "start"),
                  y && (d(), (p = q(n, a, u.b, u.duration, 0, l, c.css)))),
                u)
              )
                if (t >= u.end)
                  g((a = u.b), 1 - a),
                    Z(n, u.b, "end"),
                    f || (u.b ? d() : --u.group.r || s(u.group.c)),
                    (u = null);
                else if (t >= u.start) {
                  const e = t - u.start;
                  (a = u.a + u.d * l(e / u.duration)), g(a, 1 - a);
                }
              return !(!u && !f);
            }));
    }
    return {
      run(t) {
        i(c)
          ? (X ||
              ((X = Promise.resolve()),
              X.then(() => {
                X = null;
              })),
            X).then(() => {
              (c = c()), g(t);
            })
          : g(t);
      },
      end() {
        d(), (u = f = null);
      },
    };
  }
  function ct(t, e) {
    t.d(1), e.delete(t.key);
  }
  function at(t, e) {
    const n = {},
      o = {},
      r = { $$scope: 1 };
    let s = t.length;
    for (; s--; ) {
      const i = t[s],
        l = e[s];
      if (l) {
        for (const t in i) t in l || (o[t] = 1);
        for (const t in l) r[t] || ((n[t] = l[t]), (r[t] = 1));
        t[s] = l;
      } else for (const t in i) r[t] = 1;
    }
    for (const t in o) t in n || (n[t] = void 0);
    return n;
  }
  function ut(t) {
    return "object" == typeof t && null !== t ? t : {};
  }
  function ft(t) {
    t && t.c();
  }
  function pt(t, e, n) {
    const { fragment: r, on_mount: l, on_destroy: c, after_update: a } = t.$$;
    r && r.m(e, n),
      U(() => {
        const e = l.map(o).filter(i);
        c ? c.push(...e) : s(e), (t.$$.on_mount = []);
      }),
      a.forEach(U);
  }
  function dt(t, e) {
    const n = t.$$;
    null !== n.fragment &&
      (s(n.on_destroy),
      n.fragment && n.fragment.d(e),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function mt(t, e) {
    -1 === t.$$.dirty[0] &&
      (W.push(t), G || ((G = !0), B.then(Q)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
  }
  function gt(e, n, o, i, l, c, a = [-1]) {
    const u = R;
    M(e);
    const f = n.props || {},
      p = (e.$$ = {
        fragment: null,
        ctx: null,
        props: c,
        update: t,
        not_equal: l,
        bound: r(),
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(u ? u.$$.context : []),
        callbacks: r(),
        dirty: a,
        skip_bound: !1,
      });
    let d = !1;
    if (
      ((p.ctx = o
        ? o(e, f, (t, n, ...o) => {
            const r = o.length ? o[0] : n;
            return (
              p.ctx &&
                l(p.ctx[t], (p.ctx[t] = r)) &&
                (!p.skip_bound && p.bound[t] && p.bound[t](r), d && mt(e, t)),
              n
            );
          })
        : []),
      p.update(),
      (d = !0),
      s(p.before_update),
      (p.fragment = !!i && i(p.ctx)),
      n.target)
    ) {
      if (n.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes);
        })(n.target);
        p.fragment && p.fragment.l(t), t.forEach(w);
      } else p.fragment && p.fragment.c();
      n.intro && rt(e.$$.fragment), pt(e, n.target, n.anchor), Q();
    }
    M(u);
  }
  class $t {
    $destroy() {
      dt(this, 1), (this.$destroy = t);
    }
    $on(t, e) {
      const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
      return (
        n.push(e),
        () => {
          const t = n.indexOf(e);
          -1 !== t && n.splice(t, 1);
        }
      );
    }
    $set(t) {
      var e;
      this.$$set &&
        ((e = t), 0 !== Object.keys(e).length) &&
        ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
    }
  }
  const ht = [];
  function vt(e, n = t) {
    let o;
    const r = [];
    function s(t) {
      if (l(e, t) && ((e = t), o)) {
        const t = !ht.length;
        for (let t = 0; t < r.length; t += 1) {
          const n = r[t];
          n[1](), ht.push(n, e);
        }
        if (t) {
          for (let t = 0; t < ht.length; t += 2) ht[t][0](ht[t + 1]);
          ht.length = 0;
        }
      }
    }
    return {
      set: s,
      update: function (t) {
        s(t(e));
      },
      subscribe: function (i, l = t) {
        const c = [i, l];
        return (
          r.push(c),
          1 === r.length && (o = n(s) || t),
          i(e),
          () => {
            const t = r.indexOf(c);
            -1 !== t && r.splice(t, 1), 0 === r.length && (o(), (o = null));
          }
        );
      },
    };
  }
  function bt(e, n, o) {
    const r = !Array.isArray(e),
      l = r ? [e] : e,
      a = n.length < 2;
    return {
      subscribe: vt(o, (e) => {
        let o = !1;
        const u = [];
        let f = 0,
          p = t;
        const d = () => {
            if (f) return;
            p();
            const o = n(r ? u[0] : u, e);
            a ? e(o) : (p = i(o) ? o : t);
          },
          m = l.map((t, e) =>
            c(
              t,
              (t) => {
                (u[e] = t), (f &= ~(1 << e)), o && d();
              },
              () => {
                f |= 1 << e;
              }
            )
          );
        return (
          (o = !0),
          d(),
          function () {
            s(m), p();
          }
        );
      }).subscribe,
    };
  }
  const yt = {},
    xt = {};
  function wt(t) {
    return {
      ...t.location,
      state: t.history.state,
      key: (t.history.state && t.history.state.key) || "initial",
    };
  }
  const kt = (function (t, e) {
      const n = [];
      let o = wt(t);
      return {
        get location() {
          return o;
        },
        listen(e) {
          n.push(e);
          const r = () => {
            (o = wt(t)), e({ location: o, action: "POP" });
          };
          return (
            t.addEventListener("popstate", r),
            () => {
              t.removeEventListener("popstate", r);
              const o = n.indexOf(e);
              n.splice(o, 1);
            }
          );
        },
        navigate(e, { state: r, replace: s = !1 } = {}) {
          r = { ...r, key: Date.now() + "" };
          try {
            s
              ? t.history.replaceState(r, null, e)
              : t.history.pushState(r, null, e);
          } catch (n) {
            t.location[s ? "replace" : "assign"](e);
          }
          (o = wt(t)), n.forEach((t) => t({ location: o, action: "PUSH" }));
        },
      };
    })(
      Boolean(
        "undefined" != typeof window &&
          window.document &&
          window.document.createElement
      )
        ? window
        : (function (t = "/") {
            let e = 0;
            const n = [{ pathname: t, search: "" }],
              o = [];
            return {
              get location() {
                return n[e];
              },
              addEventListener(t, e) {},
              removeEventListener(t, e) {},
              history: {
                get entries() {
                  return n;
                },
                get index() {
                  return e;
                },
                get state() {
                  return o[e];
                },
                pushState(t, r, s) {
                  const [i, l = ""] = s.split("?");
                  e++, n.push({ pathname: i, search: l }), o.push(t);
                },
                replaceState(t, r, s) {
                  const [i, l = ""] = s.split("?");
                  (n[e] = { pathname: i, search: l }), (o[e] = t);
                },
              },
            };
          })()
    ),
    { navigate: Tt } = kt,
    _t = /^:(.+)/;
  function jt(t) {
    return "*" === t[0];
  }
  function At(t) {
    return t.replace(/(^\/+|\/+$)/g, "").split("/");
  }
  function St(t) {
    return t.replace(/(^\/+|\/+$)/g, "");
  }
  function Et(t, e) {
    return {
      route: t,
      score: t.default
        ? 0
        : At(t.path).reduce(
            (t, e) => (
              (t += 4),
              !(function (t) {
                return "" === t;
              })(e)
                ? !(function (t) {
                    return _t.test(t);
                  })(e)
                  ? jt(e)
                    ? (t -= 5)
                    : (t += 3)
                  : (t += 2)
                : (t += 1),
              t
            ),
            0
          ),
      index: e,
    };
  }
  function Pt(t, e) {
    let n, o;
    const [r] = e.split("?"),
      s = At(r),
      i = "" === s[0],
      l = (function (t) {
        return t
          .map(Et)
          .sort((t, e) =>
            t.score < e.score ? 1 : t.score > e.score ? -1 : t.index - e.index
          );
      })(t);
    for (let t = 0, r = l.length; t < r; t++) {
      const r = l[t].route;
      let c = !1;
      if (r.default) {
        o = { route: r, params: {}, uri: e };
        continue;
      }
      const a = At(r.path),
        u = {},
        f = Math.max(s.length, a.length);
      let p = 0;
      for (; p < f; p++) {
        const t = a[p],
          e = s[p];
        if (void 0 !== t && jt(t)) {
          u["*" === t ? "*" : t.slice(1)] = s
            .slice(p)
            .map(decodeURIComponent)
            .join("/");
          break;
        }
        if (void 0 === e) {
          c = !0;
          break;
        }
        let n = _t.exec(t);
        if (n && !i) {
          const t = decodeURIComponent(e);
          u[n[1]] = t;
        } else if (t !== e) {
          c = !0;
          break;
        }
      }
      if (!c) {
        n = { route: r, params: u, uri: "/" + s.slice(0, p).join("/") };
        break;
      }
    }
    return n || o || null;
  }
  function Ct(t, e) {
    return St("/" === e ? t : `${St(t)}/${St(e)}`) + "/";
  }
  function Rt(t) {
    let e;
    const n = t[6].default,
      o = u(n, t, t[5], null);
    return {
      c() {
        o && o.c();
      },
      m(t, n) {
        o && o.m(t, n), (e = !0);
      },
      p(t, [e]) {
        o && o.p && 32 & e && p(o, n, t, t[5], e, null, null);
      },
      i(t) {
        e || (rt(o, t), (e = !0));
      },
      o(t) {
        st(o, t), (e = !1);
      },
      d(t) {
        o && o.d(t);
      },
    };
  }
  function Lt(t, e, n) {
    let o,
      r,
      s,
      { basepath: i = "/" } = e,
      { url: l = null } = e;
    const c = N(yt),
      u = N(xt),
      f = vt([]);
    a(t, f, (t) => n(10, (s = t)));
    const p = vt(null);
    let d = !1;
    const m = c || vt(l ? { pathname: l } : kt.location);
    a(t, m, (t) => n(9, (r = t)));
    const g = u ? u.routerBase : vt({ path: i, uri: i });
    a(t, g, (t) => n(8, (o = t)));
    const $ = bt([g, p], ([t, e]) => {
      if (null === e) return t;
      const { path: n } = t,
        { route: o, uri: r } = e;
      return { path: o.default ? n : o.path.replace(/\*.*$/, ""), uri: r };
    });
    c ||
      (O(() =>
        kt.listen((t) => {
          m.set(t.location);
        })
      ),
      D(yt, m)),
      D(xt, {
        activeRoute: p,
        base: g,
        routerBase: $,
        registerRoute: function (t) {
          const { path: e } = o;
          let { path: n } = t;
          if (
            ((t._path = n), (t.path = Ct(e, n)), "undefined" == typeof window)
          ) {
            if (d) return;
            const e = (function (t, e) {
              return Pt([t], e);
            })(t, r.pathname);
            e && (p.set(e), (d = !0));
          } else f.update((e) => (e.push(t), e));
        },
        unregisterRoute: function (t) {
          f.update((e) => {
            const n = e.indexOf(t);
            return e.splice(n, 1), e;
          });
        },
      });
    let { $$slots: h = {}, $$scope: v } = e;
    return (
      (t.$$set = (t) => {
        "basepath" in t && n(3, (i = t.basepath)),
          "url" in t && n(4, (l = t.url)),
          "$$scope" in t && n(5, (v = t.$$scope));
      }),
      (t.$$.update = () => {
        if (256 & t.$$.dirty) {
          const { path: t } = o;
          f.update((e) => (e.forEach((e) => (e.path = Ct(t, e._path))), e));
        }
        if (1536 & t.$$.dirty) {
          const t = Pt(s, r.pathname);
          p.set(t);
        }
      }),
      [f, m, g, i, l, v, h]
    );
  }
  class qt extends $t {
    constructor(t) {
      super(), gt(this, t, Lt, Rt, l, { basepath: 3, url: 4 });
    }
  }
  const It = (t) => ({ params: 2 & t, location: 16 & t }),
    Mt = (t) => ({ params: t[1], location: t[4] });
  function zt(t) {
    let e, n, o, r;
    const s = [Dt, Ot],
      i = [];
    function l(t, e) {
      return null !== t[0] ? 0 : 1;
    }
    return (
      (e = l(t)),
      (n = i[e] = s[e](t)),
      {
        c() {
          n.c(), (o = A());
        },
        m(t, n) {
          i[e].m(t, n), x(t, o, n), (r = !0);
        },
        p(t, r) {
          let c = e;
          (e = l(t)),
            e === c
              ? i[e].p(t, r)
              : (nt(),
                st(i[c], 1, 1, () => {
                  i[c] = null;
                }),
                ot(),
                (n = i[e]),
                n || ((n = i[e] = s[e](t)), n.c()),
                rt(n, 1),
                n.m(o.parentNode, o));
        },
        i(t) {
          r || (rt(n), (r = !0));
        },
        o(t) {
          st(n), (r = !1);
        },
        d(t) {
          i[e].d(t), t && w(o);
        },
      }
    );
  }
  function Ot(t) {
    let e;
    const n = t[10].default,
      o = u(n, t, t[9], Mt);
    return {
      c() {
        o && o.c();
      },
      m(t, n) {
        o && o.m(t, n), (e = !0);
      },
      p(t, e) {
        o && o.p && 530 & e && p(o, n, t, t[9], e, It, Mt);
      },
      i(t) {
        e || (rt(o, t), (e = !0));
      },
      o(t) {
        st(o, t), (e = !1);
      },
      d(t) {
        o && o.d(t);
      },
    };
  }
  function Dt(t) {
    let e, o, r;
    const s = [{ location: t[4] }, t[1], t[2]];
    var i = t[0];
    function l(t) {
      let e = {};
      for (let t = 0; t < s.length; t += 1) e = n(e, s[t]);
      return { props: e };
    }
    return (
      i && (e = new i(l())),
      {
        c() {
          e && ft(e.$$.fragment), (o = A());
        },
        m(t, n) {
          e && pt(e, t, n), x(t, o, n), (r = !0);
        },
        p(t, n) {
          const r =
            22 & n
              ? at(s, [
                  16 & n && { location: t[4] },
                  2 & n && ut(t[1]),
                  4 & n && ut(t[2]),
                ])
              : {};
          if (i !== (i = t[0])) {
            if (e) {
              nt();
              const t = e;
              st(t.$$.fragment, 1, 0, () => {
                dt(t, 1);
              }),
                ot();
            }
            i
              ? ((e = new i(l())),
                ft(e.$$.fragment),
                rt(e.$$.fragment, 1),
                pt(e, o.parentNode, o))
              : (e = null);
          } else i && e.$set(r);
        },
        i(t) {
          r || (e && rt(e.$$.fragment, t), (r = !0));
        },
        o(t) {
          e && st(e.$$.fragment, t), (r = !1);
        },
        d(t) {
          t && w(o), e && dt(e, t);
        },
      }
    );
  }
  function Nt(t) {
    let e,
      n,
      o = null !== t[3] && t[3].route === t[7] && zt(t);
    return {
      c() {
        o && o.c(), (e = A());
      },
      m(t, r) {
        o && o.m(t, r), x(t, e, r), (n = !0);
      },
      p(t, [n]) {
        null !== t[3] && t[3].route === t[7]
          ? o
            ? (o.p(t, n), 8 & n && rt(o, 1))
            : ((o = zt(t)), o.c(), rt(o, 1), o.m(e.parentNode, e))
          : o &&
            (nt(),
            st(o, 1, 1, () => {
              o = null;
            }),
            ot());
      },
      i(t) {
        n || (rt(o), (n = !0));
      },
      o(t) {
        st(o), (n = !1);
      },
      d(t) {
        o && o.d(t), t && w(e);
      },
    };
  }
  function Wt(t, e, o) {
    let r,
      s,
      { path: i = "" } = e,
      { component: l = null } = e;
    const { registerRoute: c, unregisterRoute: u, activeRoute: f } = N(xt);
    a(t, f, (t) => o(3, (r = t)));
    const p = N(yt);
    a(t, p, (t) => o(4, (s = t)));
    const m = { path: i, default: "" === i };
    let g = {},
      $ = {};
    var h;
    c(m),
      "undefined" != typeof window &&
        ((h = () => {
          u(m);
        }),
        z().$$.on_destroy.push(h));
    let { $$slots: v = {}, $$scope: b } = e;
    return (
      (t.$$set = (t) => {
        o(13, (e = n(n({}, e), d(t)))),
          "path" in t && o(8, (i = t.path)),
          "component" in t && o(0, (l = t.component)),
          "$$scope" in t && o(9, (b = t.$$scope));
      }),
      (t.$$.update = () => {
        8 & t.$$.dirty && r && r.route === m && o(1, (g = r.params));
        {
          const { path: t, component: n, ...r } = e;
          o(2, ($ = r));
        }
      }),
      (e = d(e)),
      [l, g, $, r, s, f, p, m, i, b, v]
    );
  }
  class Ft extends $t {
    constructor(t) {
      super(), gt(this, t, Wt, Nt, l, { path: 8, component: 0 });
    }
  }
  function Vt(t) {
    function e(t) {
      const e = t.currentTarget;
      "" === e.target &&
        (function (t) {
          const e = location.host;
          return (
            t.host == e ||
            0 === t.href.indexOf("https://" + e) ||
            0 === t.href.indexOf("http://" + e)
          );
        })(e) &&
        (function (t) {
          return (
            !t.defaultPrevented &&
            0 === t.button &&
            !(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey)
          );
        })(t) &&
        (t.preventDefault(),
        Tt(e.pathname + e.search, { replace: e.hasAttribute("replace") }));
    }
    return (
      t.addEventListener("click", e),
      {
        destroy() {
          t.removeEventListener("click", e);
        },
      }
    );
  }
  function Ht(e) {
    let n,
      o,
      r,
      i,
      l,
      c,
      a,
      u,
      f,
      p,
      d,
      g,
      $,
      h,
      v,
      b,
      k,
      _,
      A,
      E,
      P,
      C,
      R,
      L,
      q,
      I,
      M,
      z,
      O,
      D;
    return {
      c() {
        (n = T("nav")),
          (o = T("div")),
          (r = T("a")),
          (r.innerHTML = "<h3>vacom</h3>"),
          (l = j()),
          (c = T("button")),
          (c.innerHTML = '<span class="ti-align-justify"></span>'),
          (a = j()),
          (u = T("div")),
          (f = T("ul")),
          (p = T("li")),
          (d = T("a")),
          (d.textContent = "Home"),
          ($ = j()),
          (h = T("li")),
          (v = T("a")),
          (v.textContent = "About"),
          (k = j()),
          (_ = T("li")),
          (A = T("a")),
          (A.textContent = "Projects"),
          (P = j()),
          (C = T("li")),
          (R = T("a")),
          (R.textContent = "Open-source"),
          (q = j()),
          (I = T("li")),
          (M = T("a")),
          (M.textContent = "Themes"),
          S(r, "class", "navbar-brand svelte-h0zd5h"),
          S(r, "href", "/"),
          S(c, "class", "navbar-toggler collapsed"),
          S(c, "type", "button"),
          S(c, "data-toggle", "collapse"),
          S(d, "class", "nav-link svelte-h0zd5h"),
          S(d, "href", "/"),
          S(p, "class", "nav-item active"),
          S(v, "class", "nav-link svelte-h0zd5h"),
          S(v, "href", "/about"),
          S(h, "class", "nav-item"),
          S(A, "class", "nav-link svelte-h0zd5h"),
          S(A, "href", "/projects"),
          S(_, "class", "nav-item"),
          S(R, "class", "nav-link svelte-h0zd5h"),
          S(R, "href", "/opensource"),
          S(C, "class", "nav-item"),
          S(M, "class", "nav-link svelte-h0zd5h"),
          S(M, "href", "/themes"),
          S(I, "class", "nav-item"),
          S(f, "class", "navbar-nav ml-auto svelte-h0zd5h"),
          S(u, "class", "collapse navbar-collapse"),
          S(u, "id", "navbarsExample09"),
          S(o, "class", "container"),
          S(n, "class", "navbar navbar-expand-lg main-nav  svelte-h0zd5h"),
          S(n, "id", "navbar");
      },
      m(t, e) {
        x(t, n, e),
          y(n, o),
          y(o, r),
          y(o, l),
          y(o, c),
          y(o, a),
          y(o, u),
          y(u, f),
          y(f, p),
          y(p, d),
          y(f, $),
          y(f, h),
          y(h, v),
          y(f, k),
          y(f, _),
          y(_, A),
          y(f, P),
          y(f, C),
          y(C, R),
          y(f, q),
          y(f, I),
          y(I, M),
          O ||
            ((D = [
              m((i = Vt.call(null, r))),
              m((g = Vt.call(null, d))),
              m((b = Vt.call(null, v))),
              m((E = Vt.call(null, A))),
              m((L = Vt.call(null, R))),
              m((z = Vt.call(null, M))),
            ]),
            (O = !0));
      },
      p: t,
      i: t,
      o: t,
      d(t) {
        t && w(n), (O = !1), s(D);
      },
    };
  }
  class Bt extends $t {
    constructor(t) {
      super(), gt(this, t, null, Ht, l, {});
    }
  }
  function Gt(t, { delay: n = 0, duration: o = 400, easing: r = e }) {
    const s = +getComputedStyle(t).opacity;
    return {
      delay: n,
      duration: o,
      easing: r,
      css: (t) => "opacity: " + t * s,
    };
  }
  function Ut(t) {
    let e, n, o, r, s, i, l, c, a, u, f, p, d, m, g, $, h;
    return {
      c() {
        (e = T("section")),
          (n = T("div")),
          (o = T("div")),
          (r = T("div")),
          (s = T("h2")),
          (i = _(t[0])),
          (l = j()),
          (c = T("br")),
          (a = j()),
          (u = T("span")),
          (f = T("b")),
          (p = _(t[1])),
          (d = j()),
          (m = T("p")),
          (g = _(t[2])),
          S(u, "class", "cd-words-wrapper text-color svelte-tkao10"),
          S(s, "class", "cd-headline clip is-full-width mb-4  svelte-tkao10"),
          S(r, "class", "col-lg-10"),
          S(o, "class", "row"),
          S(n, "class", "container"),
          S(e, "class", "section banner svelte-tkao10");
      },
      m(t, $) {
        x(t, e, $),
          y(e, n),
          y(n, o),
          y(o, r),
          y(r, s),
          y(s, i),
          y(s, l),
          y(s, c),
          y(s, a),
          y(s, u),
          y(u, f),
          y(f, p),
          y(r, d),
          y(r, m),
          y(m, g),
          (h = !0);
      },
      p(t, [e]) {
        (!h || 1 & e) && E(i, t[0]),
          (!h || 2 & e) && E(p, t[1]),
          (!h || 4 & e) && E(g, t[2]);
      },
      i(t) {
        h ||
          (U(() => {
            $ || ($ = lt(e, Gt, {}, !0)), $.run(1);
          }),
          (h = !0));
      },
      o(t) {
        $ || ($ = lt(e, Gt, {}, !1)), $.run(0), (h = !1);
      },
      d(t) {
        t && w(e), t && $ && $.end();
      },
    };
  }
  function Kt(t, e, n) {
    let { initialText: o = "A great initial text" } = e,
      { text: r = "A great text to describe" } = e,
      { description: s = "A great description to show" } = e;
    return (
      (t.$$set = (t) => {
        "initialText" in t && n(0, (o = t.initialText)),
          "text" in t && n(1, (r = t.text)),
          "description" in t && n(2, (s = t.description));
      }),
      [o, r, s]
    );
  }
  class Jt extends $t {
    constructor(t) {
      super(),
        gt(this, t, Kt, Ut, l, { initialText: 0, text: 1, description: 2 });
    }
  }
  function Qt(e) {
    let n,
      o,
      r,
      s,
      i,
      l,
      c,
      a,
      u,
      f,
      p,
      d,
      m,
      g,
      $,
      h,
      v,
      b,
      k,
      A,
      P,
      C,
      R,
      L,
      q,
      I,
      M,
      z,
      O,
      D,
      N,
      W;
    return {
      c() {
        (n = T("section")),
          (o = T("div")),
          (r = T("div")),
          (s = T("div")),
          (i = T("p")),
          (l = _(e[0])),
          (c = j()),
          (a = T("a")),
          (u = _(e[1])),
          (f = j()),
          (p = T("div")),
          (d = T("div")),
          (m = T("ul")),
          (g = T("li")),
          ($ = T("a")),
          (h = T("i")),
          (v = j()),
          (b = T("li")),
          (k = T("a")),
          (A = T("i")),
          (P = j()),
          (C = T("li")),
          (R = T("a")),
          (L = T("i")),
          (q = j()),
          (I = T("li")),
          (M = T("a")),
          (z = T("i")),
          (O = j()),
          (D = T("li")),
          (N = T("a")),
          (W = T("i")),
          S(a, "href", e[2]),
          S(a, "target", "_blank"),
          S(a, "class", "text-white"),
          S(i, "class", "copy mb-0 svelte-1c4133f"),
          S(s, "class", "col-lg-6"),
          S(h, "class", "fab fa-facebook-f"),
          S($, "href", e[3]),
          S($, "target", "_blank"),
          S($, "class", "svelte-1c4133f"),
          S(g, "class", "list-inline-item"),
          S(A, "class", "fab fa-twitter"),
          S(k, "href", e[4]),
          S(k, "target", "_blank"),
          S(k, "class", "svelte-1c4133f"),
          S(b, "class", "list-inline-item"),
          S(L, "class", "fab fa-github"),
          S(R, "href", e[5]),
          S(R, "target", "_blank"),
          S(R, "class", "svelte-1c4133f"),
          S(C, "class", "list-inline-item"),
          S(z, "class", "fab fa-linkedin-in"),
          S(M, "href", e[6]),
          S(M, "target", "_blank"),
          S(M, "class", "svelte-1c4133f"),
          S(I, "class", "list-inline-item"),
          S(W, "class", "fas fa-store"),
          S(N, "href", e[7]),
          S(N, "target", "_blank"),
          S(N, "class", "svelte-1c4133f"),
          S(D, "class", "list-inline-item"),
          S(m, "class", "list-inline mb-0"),
          S(
            d,
            "class",
            "widget footer-widget text-lg-right mt-5 mt-lg-0 svelte-1c4133f"
          ),
          S(p, "class", "col-lg-6"),
          S(r, "class", "row "),
          S(o, "class", "container"),
          S(n, "class", "footer svelte-1c4133f");
      },
      m(t, e) {
        x(t, n, e),
          y(n, o),
          y(o, r),
          y(r, s),
          y(s, i),
          y(i, l),
          y(i, c),
          y(i, a),
          y(a, u),
          y(r, f),
          y(r, p),
          y(p, d),
          y(d, m),
          y(m, g),
          y(g, $),
          y($, h),
          y(m, v),
          y(m, b),
          y(b, k),
          y(k, A),
          y(m, P),
          y(m, C),
          y(C, R),
          y(R, L),
          y(m, q),
          y(m, I),
          y(I, M),
          y(M, z),
          y(m, O),
          y(m, D),
          y(D, N),
          y(N, W);
      },
      p(t, [e]) {
        1 & e && E(l, t[0]),
          2 & e && E(u, t[1]),
          4 & e && S(a, "href", t[2]),
          8 & e && S($, "href", t[3]),
          16 & e && S(k, "href", t[4]),
          32 & e && S(R, "href", t[5]),
          64 & e && S(M, "href", t[6]),
          128 & e && S(N, "href", t[7]);
      },
      i: t,
      o: t,
      d(t) {
        t && w(n);
      },
    };
  }
  function Yt(t, e, n) {
    let { text: o = "Copyrights © 2020. " } = e,
      { author: r = "Vitor Amaral | vacom" } = e,
      { url: s = "https://www.linkedin.com/in/vacom/" } = e,
      { facebook: i = "https://www.facebook.com/storytics.studio" } = e,
      { twitter: l = "https://twitter.com/vacom_me" } = e,
      { github: c = "https://github.com/vacom" } = e,
      { linkedin: a = "https://www.linkedin.com/in/vacom/" } = e,
      { store: u = "https://creativemarket.com/storytics" } = e;
    return (
      (t.$$set = (t) => {
        "text" in t && n(0, (o = t.text)),
          "author" in t && n(1, (r = t.author)),
          "url" in t && n(2, (s = t.url)),
          "facebook" in t && n(3, (i = t.facebook)),
          "twitter" in t && n(4, (l = t.twitter)),
          "github" in t && n(5, (c = t.github)),
          "linkedin" in t && n(6, (a = t.linkedin)),
          "store" in t && n(7, (u = t.store));
      }),
      [o, r, s, i, l, c, a, u]
    );
  }
  class Xt extends $t {
    constructor(t) {
      super(),
        gt(this, t, Yt, Qt, l, {
          text: 0,
          author: 1,
          url: 2,
          facebook: 3,
          twitter: 4,
          github: 5,
          linkedin: 6,
          store: 7,
        });
    }
  }
  function Zt(t) {
    let e, n, o, r, s;
    e = new Bt({});
    const i = t[1].default,
      l = u(i, t, t[0], null);
    return (
      (r = new Xt({})),
      {
        c() {
          ft(e.$$.fragment),
            (n = j()),
            l && l.c(),
            (o = j()),
            ft(r.$$.fragment);
        },
        m(t, i) {
          pt(e, t, i),
            x(t, n, i),
            l && l.m(t, i),
            x(t, o, i),
            pt(r, t, i),
            (s = !0);
        },
        p(t, [e]) {
          l && l.p && 1 & e && p(l, i, t, t[0], e, null, null);
        },
        i(t) {
          s || (rt(e.$$.fragment, t), rt(l, t), rt(r.$$.fragment, t), (s = !0));
        },
        o(t) {
          st(e.$$.fragment, t), st(l, t), st(r.$$.fragment, t), (s = !1);
        },
        d(t) {
          dt(e, t), t && w(n), l && l.d(t), t && w(o), dt(r, t);
        },
      }
    );
  }
  function te(t, e, n) {
    let { $$slots: o = {}, $$scope: r } = e;
    return (
      (t.$$set = (t) => {
        "$$scope" in t && n(0, (r = t.$$scope));
      }),
      [r, o]
    );
  }
  class ee extends $t {
    constructor(t) {
      super(), gt(this, t, te, Zt, l, {});
    }
  }
  function ne(t) {
    let e, n, o, r, s, i, l, c, a, u, f, p, d, m, g;
    return {
      c() {
        (e = T("section")),
          (n = T("div")),
          (o = T("div")),
          (r = T("div")),
          (s = T("h2")),
          (i = _(t[0])),
          (l = j()),
          (c = T("span")),
          (a = _(t[1])),
          (u = j()),
          (f = T("br")),
          (p = j()),
          (d = _(t[2])),
          S(c, "class", "text-color svelte-av7feg"),
          S(r, "class", "col-lg-8 text-center"),
          S(o, "class", "row justify-content-center"),
          S(n, "class", "container"),
          S(e, "class", "section banner pb-0 svelte-av7feg");
      },
      m(t, m) {
        x(t, e, m),
          y(e, n),
          y(n, o),
          y(o, r),
          y(r, s),
          y(s, i),
          y(s, l),
          y(s, c),
          y(c, a),
          y(s, u),
          y(s, f),
          y(s, p),
          y(s, d),
          (g = !0);
      },
      p(t, [e]) {
        (!g || 1 & e) && E(i, t[0]),
          (!g || 2 & e) && E(a, t[1]),
          (!g || 4 & e) && E(d, t[2]);
      },
      i(t) {
        g ||
          (U(() => {
            m || (m = lt(e, Gt, {}, !0)), m.run(1);
          }),
          (g = !0));
      },
      o(t) {
        m || (m = lt(e, Gt, {}, !1)), m.run(0), (g = !1);
      },
      d(t) {
        t && w(e), t && m && m.end();
      },
    };
  }
  function oe(t, e, n) {
    let { initialText: o = "I provide" } = e,
      { colorText: r = "Design Solutions." } = e,
      { text: s = "My work is presented here, check them below." } = e;
    return (
      (t.$$set = (t) => {
        "initialText" in t && n(0, (o = t.initialText)),
          "colorText" in t && n(1, (r = t.colorText)),
          "text" in t && n(2, (s = t.text));
      }),
      [o, r, s]
    );
  }
  class re extends $t {
    constructor(t) {
      super(),
        gt(this, t, oe, ne, l, { initialText: 0, colorText: 1, text: 2 });
    }
  }
  function se(t) {
    let e, n;
    const o = t[2].default,
      r = u(o, t, t[1], null);
    return {
      c() {
        (e = T("a")),
          r && r.c(),
          S(e, "href", t[0]),
          S(e, "class", "btn btn-main btn-small svelte-fyftst");
      },
      m(t, o) {
        x(t, e, o), r && r.m(e, null), (n = !0);
      },
      p(t, [s]) {
        r && r.p && 2 & s && p(r, o, t, t[1], s, null, null),
          (!n || 1 & s) && S(e, "href", t[0]);
      },
      i(t) {
        n || (rt(r, t), (n = !0));
      },
      o(t) {
        st(r, t), (n = !1);
      },
      d(t) {
        t && w(e), r && r.d(t);
      },
    };
  }
  function ie(t, e, n) {
    let { href: o = "" } = e,
      { $$slots: r = {}, $$scope: s } = e;
    return (
      (t.$$set = (t) => {
        "href" in t && n(0, (o = t.href)),
          "$$scope" in t && n(1, (s = t.$$scope));
      }),
      [o, s, r]
    );
  }
  class le extends $t {
    constructor(t) {
      super(), gt(this, t, ie, se, l, { href: 0 });
    }
  }
  function ce(t) {
    let e;
    return {
      c() {
        e = _(t[1]);
      },
      m(t, n) {
        x(t, e, n);
      },
      p(t, n) {
        2 & n && E(e, t[1]);
      },
      d(t) {
        t && w(e);
      },
    };
  }
  function ae(t) {
    let e, n, o, r, s, i, l, c, a, u;
    return (
      (a = new le({
        props: {
          href: t[2],
          target: "_blank",
          $$slots: { default: [ce] },
          $$scope: { ctx: t },
        },
      })),
      {
        c() {
          (e = T("section")),
            (n = T("div")),
            (o = T("div")),
            (r = T("div")),
            (s = T("h3")),
            (i = _(t[0])),
            (l = j()),
            (c = T("div")),
            ft(a.$$.fragment),
            S(s, "class", "text-white mb-0"),
            S(r, "class", "col-lg-8"),
            S(c, "class", "col-lg-4 text-lg-right mt-5 mt-lg-0"),
            S(o, "class", "row align-items-center bg-dark p-5"),
            S(n, "class", "container"),
            S(e, "class", "section-sm pt-0 cta svelte-11mz0an");
        },
        m(t, f) {
          x(t, e, f),
            y(e, n),
            y(n, o),
            y(o, r),
            y(r, s),
            y(s, i),
            y(o, l),
            y(o, c),
            pt(a, c, null),
            (u = !0);
        },
        p(t, [e]) {
          (!u || 1 & e) && E(i, t[0]);
          const n = {};
          4 & e && (n.href = t[2]),
            10 & e && (n.$$scope = { dirty: e, ctx: t }),
            a.$set(n);
        },
        i(t) {
          u || (rt(a.$$.fragment, t), (u = !0));
        },
        o(t) {
          st(a.$$.fragment, t), (u = !1);
        },
        d(t) {
          t && w(e), dt(a);
        },
      }
    );
  }
  function ue(t, e, n) {
    let { title: o = "A great action title" } = e,
      { action: r = "A great action" } = e,
      { url: s = "/" } = e;
    return (
      (t.$$set = (t) => {
        "title" in t && n(0, (o = t.title)),
          "action" in t && n(1, (r = t.action)),
          "url" in t && n(2, (s = t.url));
      }),
      [o, r, s]
    );
  }
  class fe extends $t {
    constructor(t) {
      super(), gt(this, t, ue, ae, l, { title: 0, action: 1, url: 2 });
    }
  }
  function pe(t, e, n) {
    const o = t.slice();
    return (o[2] = e[n]), (o[4] = n), o;
  }
  function de(t, e) {
    let n,
      o,
      r,
      s = e[2].title + "";
    return {
      key: t,
      first: null,
      c() {
        (n = T("label")),
          (o = _(s)),
          (r = j()),
          S(n, "class", "btn active svelte-oiropn"),
          S(n, "for", "button"),
          P(n, "active", e[2].active),
          (this.first = n);
      },
      m(t, e) {
        x(t, n, e), y(n, o), y(n, r);
      },
      p(t, e) {
        2 & e && s !== (s = t[2].title + "") && E(o, s),
          2 & e && P(n, "active", t[2].active);
      },
      d(t) {
        t && w(n);
      },
    };
  }
  function me(e) {
    let n,
      o,
      r,
      s = [],
      i = new Map(),
      l = e[1];
    const c = (t) => t[2].id;
    for (let t = 0; t < l.length; t += 1) {
      let n = pe(e, l, t),
        o = c(n);
      i.set(o, (s[t] = de(o, n)));
    }
    return {
      c() {
        (n = T("div")), (o = T("div")), (r = T("div"));
        for (let t = 0; t < s.length; t += 1) s[t].c();
        S(r, "class", "btn-group btn-group-toggle  svelte-oiropn"),
          S(r, "data-toggle", "buttons"),
          S(o, "class", "col-10 "),
          P(o, "text-center", e[0]),
          S(n, "class", "row mb-5"),
          P(n, "justify-content-center", e[0]);
      },
      m(t, e) {
        x(t, n, e), y(n, o), y(o, r);
        for (let t = 0; t < s.length; t += 1) s[t].m(r, null);
      },
      p(t, [e]) {
        if (2 & e) {
          const n = t[1];
          s = (function (t, e, n, o, r, s, i, l, c, a, u, f) {
            let p = t.length,
              d = s.length,
              m = p;
            const g = {};
            for (; m--; ) g[t[m].key] = m;
            const $ = [],
              h = new Map(),
              v = new Map();
            for (m = d; m--; ) {
              const t = f(r, s, m),
                l = n(t);
              let c = i.get(l);
              c ? o && c.p(t, e) : ((c = a(l, t)), c.c()),
                h.set(l, ($[m] = c)),
                l in g && v.set(l, Math.abs(m - g[l]));
            }
            const b = new Set(),
              y = new Set();
            function x(t) {
              rt(t, 1), t.m(l, u), i.set(t.key, t), (u = t.first), d--;
            }
            for (; p && d; ) {
              const e = $[d - 1],
                n = t[p - 1],
                o = e.key,
                r = n.key;
              e === n
                ? ((u = e.first), p--, d--)
                : h.has(r)
                ? !i.has(o) || b.has(o)
                  ? x(e)
                  : y.has(r)
                  ? p--
                  : v.get(o) > v.get(r)
                  ? (y.add(o), x(e))
                  : (b.add(r), p--)
                : (c(n, i), p--);
            }
            for (; p--; ) {
              const e = t[p];
              h.has(e.key) || c(e, i);
            }
            for (; d; ) x($[d - 1]);
            return $;
          })(s, e, c, 1, t, n, i, r, ct, de, null, pe);
        }
        1 & e && P(o, "text-center", t[0]),
          1 & e && P(n, "justify-content-center", t[0]);
      },
      i: t,
      o: t,
      d(t) {
        t && w(n);
        for (let t = 0; t < s.length; t += 1) s[t].d();
      },
    };
  }
  function ge(t, e, n) {
    let { center: o = !1 } = e,
      {
        filters: r = [
          { id: "all-projects", title: "All Projects", active: !0 },
          { id: "branding", title: "branding", active: !1 },
          { id: "web-development", title: "Web Development", active: !1 },
          { id: "photography", title: "Photography", active: !1 },
        ],
      } = e;
    return (
      (t.$$set = (t) => {
        "center" in t && n(0, (o = t.center)),
          "filters" in t && n(1, (r = t.filters));
      }),
      [o, r]
    );
  }
  class $e extends $t {
    constructor(t) {
      super(), gt(this, t, ge, me, l, { center: 0, filters: 1 });
    }
  }
  function he(t) {
    let e, n, o, r, s, i, l, c, a, u, f, p, d, g, $, h, v, b, k, A;
    return {
      c() {
        (e = T("div")),
          (n = T("a")),
          (o = T("div")),
          (r = T("div")),
          (s = T("img")),
          (l = j()),
          (c = T("div")),
          (a = T("div")),
          (u = T("span")),
          (f = T("h5")),
          (p = _(t[0])),
          (d = j()),
          (g = T("p")),
          ($ = _(t[1])),
          s.src !== (i = t[2]) && S(s, "src", i),
          S(s, "alt", "portfolio"),
          S(s, "class", "img-fluid w-100 d-block svelte-1r0a5a4"),
          S(f, "class", "mb-0 svelte-1r0a5a4"),
          S(g, "class", "svelte-1r0a5a4"),
          S(u, "class", "overlay-content svelte-1r0a5a4"),
          S(a, "class", "overlay-inner svelte-1r0a5a4"),
          S(c, "class", "overlay-box svelte-1r0a5a4"),
          S(r, "class", "image position-relative svelte-1r0a5a4"),
          S(o, "class", "position-relative inner-box svelte-1r0a5a4"),
          S(n, "class", "overlay-content svelte-1r0a5a4"),
          S(n, "href", t[3]),
          S(e, "class", "col-lg-4 col-6 mb-4 shuffle-item");
      },
      m(t, i) {
        x(t, e, i),
          y(e, n),
          y(n, o),
          y(o, r),
          y(r, s),
          y(r, l),
          y(r, c),
          y(c, a),
          y(a, u),
          y(u, f),
          y(f, p),
          y(u, d),
          y(u, g),
          y(g, $),
          (b = !0),
          k || ((A = m((h = Vt.call(null, n)))), (k = !0));
      },
      p(t, [e]) {
        (!b || (4 & e && s.src !== (i = t[2]))) && S(s, "src", i),
          (!b || 1 & e) && E(p, t[0]),
          (!b || 2 & e) && E($, t[1]),
          (!b || 8 & e) && S(n, "href", t[3]);
      },
      i(t) {
        b ||
          (U(() => {
            v || (v = lt(e, Gt, {}, !0)), v.run(1);
          }),
          (b = !0));
      },
      o(t) {
        v || (v = lt(e, Gt, {}, !1)), v.run(0), (b = !1);
      },
      d(t) {
        t && w(e), t && v && v.end(), (k = !1), A();
      },
    };
  }
  function ve(t, e, n) {
    let { category: o = "Web" } = e,
      { title: r = "Web Project" } = e,
      { image: s = "images/portfolio/4.jpg" } = e,
      { url: i = "/project/1" } = e;
    return (
      (t.$$set = (t) => {
        "category" in t && n(0, (o = t.category)),
          "title" in t && n(1, (r = t.title)),
          "image" in t && n(2, (s = t.image)),
          "url" in t && n(3, (i = t.url));
      }),
      [o, r, s, i]
    );
  }
  class be extends $t {
    constructor(t) {
      super(),
        gt(this, t, ve, he, l, { category: 0, title: 1, image: 2, url: 3 });
    }
  }
  function ye(t, e, n) {
    const o = t.slice();
    return (o[4] = e[n]), o;
  }
  function xe(t) {
    let e, o, r, s;
    const i = [t[0]];
    let l = {};
    for (let t = 0; t < i.length; t += 1) l = n(l, i[t]);
    return (
      (e = new re({ props: l })),
      {
        c() {
          ft(e.$$.fragment), (o = j()), (r = T("br"));
        },
        m(t, n) {
          pt(e, t, n), x(t, o, n), x(t, r, n), (s = !0);
        },
        p(t, n) {
          const o = 1 & n ? at(i, [ut(t[0])]) : {};
          e.$set(o);
        },
        i(t) {
          s || (rt(e.$$.fragment, t), (s = !0));
        },
        o(t) {
          st(e.$$.fragment, t), (s = !1);
        },
        d(t) {
          dt(e, t), t && w(o), t && w(r);
        },
      }
    );
  }
  function we(t) {
    let e, n;
    return (
      (e = new $e({ props: { center: t[1] } })),
      {
        c() {
          ft(e.$$.fragment);
        },
        m(t, o) {
          pt(e, t, o), (n = !0);
        },
        p(t, n) {
          const o = {};
          2 & n && (o.center = t[1]), e.$set(o);
        },
        i(t) {
          n || (rt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          st(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          dt(e, t);
        },
      }
    );
  }
  function ke(t) {
    let e, o;
    const r = [{ url: "/project/" + t[4].id }, t[4]];
    let s = {};
    for (let t = 0; t < r.length; t += 1) s = n(s, r[t]);
    return (
      (e = new be({ props: s })),
      {
        c() {
          ft(e.$$.fragment);
        },
        m(t, n) {
          pt(e, t, n), (o = !0);
        },
        p(t, n) {
          const o =
            8 & n ? at(r, [{ url: "/project/" + t[4].id }, ut(t[4])]) : {};
          e.$set(o);
        },
        i(t) {
          o || (rt(e.$$.fragment, t), (o = !0));
        },
        o(t) {
          st(e.$$.fragment, t), (o = !1);
        },
        d(t) {
          dt(e, t);
        },
      }
    );
  }
  function Te(t) {
    let e,
      n,
      o,
      r,
      s,
      i,
      l = t[1] && xe(t),
      c = t[2] && we(t),
      a = t[3],
      u = [];
    for (let e = 0; e < a.length; e += 1) u[e] = ke(ye(t, a, e));
    const f = (t) =>
      st(u[t], 1, 1, () => {
        u[t] = null;
      });
    return {
      c() {
        l && l.c(),
          (e = j()),
          (n = T("section")),
          (o = T("div")),
          c && c.c(),
          (r = j()),
          (s = T("div"));
        for (let t = 0; t < u.length; t += 1) u[t].c();
        S(s, "class", "row shuffle-wrapper portfolio-gallery"),
          S(o, "class", "container"),
          S(n, "class", "portfolio svelte-nllw8s");
      },
      m(t, a) {
        l && l.m(t, a),
          x(t, e, a),
          x(t, n, a),
          y(n, o),
          c && c.m(o, null),
          y(o, r),
          y(o, s);
        for (let t = 0; t < u.length; t += 1) u[t].m(s, null);
        i = !0;
      },
      p(t, [n]) {
        if (
          (t[1]
            ? l
              ? (l.p(t, n), 2 & n && rt(l, 1))
              : ((l = xe(t)), l.c(), rt(l, 1), l.m(e.parentNode, e))
            : l &&
              (nt(),
              st(l, 1, 1, () => {
                l = null;
              }),
              ot()),
          t[2]
            ? c
              ? (c.p(t, n), 4 & n && rt(c, 1))
              : ((c = we(t)), c.c(), rt(c, 1), c.m(o, r))
            : c &&
              (nt(),
              st(c, 1, 1, () => {
                c = null;
              }),
              ot()),
          8 & n)
        ) {
          let e;
          for (a = t[3], e = 0; e < a.length; e += 1) {
            const o = ye(t, a, e);
            u[e]
              ? (u[e].p(o, n), rt(u[e], 1))
              : ((u[e] = ke(o)), u[e].c(), rt(u[e], 1), u[e].m(s, null));
          }
          for (nt(), e = a.length; e < u.length; e += 1) f(e);
          ot();
        }
      },
      i(t) {
        if (!i) {
          rt(l), rt(c);
          for (let t = 0; t < a.length; t += 1) rt(u[t]);
          i = !0;
        }
      },
      o(t) {
        st(l), st(c), (u = u.filter(Boolean));
        for (let t = 0; t < u.length; t += 1) st(u[t]);
        i = !1;
      },
      d(t) {
        l && l.d(t), t && w(e), t && w(n), c && c.d(), k(u, t);
      },
    };
  }
  function _e(t, e, n) {
    let { heading: o = {} } = e,
      { detailed: r = !1 } = e,
      { filters: s = !1 } = e,
      { data: i = [] } = e;
    return (
      (t.$$set = (t) => {
        "heading" in t && n(0, (o = t.heading)),
          "detailed" in t && n(1, (r = t.detailed)),
          "filters" in t && n(2, (s = t.filters)),
          "data" in t && n(3, (i = t.data));
      }),
      [o, r, s, i]
    );
  }
  class je extends $t {
    constructor(t) {
      super(),
        gt(this, t, _e, Te, l, {
          heading: 0,
          detailed: 1,
          filters: 2,
          data: 3,
        });
    }
  }
  const Ae = [
      {
        id: "pr-primrose",
        title: "Web App",
        category: "Primrose",
        image: "public/images/projects/primrose/cover.png",
      },
    ],
    Se = [...Ae],
    Ee = [
      {
        id: "pr-primrose",
        title: "Primrose",
        subTitle: "Application to summarize and analyze Primavera data",
        client: "KSI",
        category: "Web App",
        url: null,
        description: [
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi\n              eligendi fugiat ad cupiditate hic, eum debitis ipsum, quos non\n              mollitia. Commodi suscipit obcaecati et, aperiam quas vero quo,\n              labore tempore.",
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam\n              debitis beatae doloremque cupiditate vel repellat nam est\n              voluptates, magnam quod explicabo fugit, quidem.",
        ],
        images: ["images/portfolio/02.jpg", "images/portfolio/02.jpg"],
      },
    ];
  function Pe(e) {
    let n, o, r, s;
    return (
      (n = new Jt({
        props: {
          initialText: "CREATIVITY IS",
          text: "INTELLIGENCE HAVING FUN.",
          description:
            "Please check my portfolio. My creative and simplicity modern\n    projects.",
        },
      })),
      (r = new je({ props: { data: Ae } })),
      {
        c() {
          ft(n.$$.fragment), (o = j()), ft(r.$$.fragment);
        },
        m(t, e) {
          pt(n, t, e), x(t, o, e), pt(r, t, e), (s = !0);
        },
        p: t,
        i(t) {
          s || (rt(n.$$.fragment, t), rt(r.$$.fragment, t), (s = !0));
        },
        o(t) {
          st(n.$$.fragment, t), st(r.$$.fragment, t), (s = !1);
        },
        d(t) {
          dt(n, t), t && w(o), dt(r, t);
        },
      }
    );
  }
  function Ce(t) {
    let e, n, o;
    return (
      (n = new ee({
        props: { $$slots: { default: [Pe] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          (e = j()),
            ft(n.$$.fragment),
            (document.title = "Vitor Amaral | Home");
        },
        m(t, r) {
          x(t, e, r), pt(n, t, r), (o = !0);
        },
        p(t, [e]) {
          const o = {};
          1 & e && (o.$$scope = { dirty: e, ctx: t }), n.$set(o);
        },
        i(t) {
          o || (rt(n.$$.fragment, t), (o = !0));
        },
        o(t) {
          st(n.$$.fragment, t), (o = !1);
        },
        d(t) {
          t && w(e), dt(n, t);
        },
      }
    );
  }
  class Re extends $t {
    constructor(t) {
      super(), gt(this, t, null, Ce, l, {});
    }
  }
  function Le(t, e, n) {
    const o = t.slice();
    return (o[2] = e[n]), o;
  }
  function qe(t, e, n) {
    const o = t.slice();
    return (o[2] = e[n]), o;
  }
  function Ie(t) {
    let e,
      n,
      o,
      r,
      s,
      i,
      l,
      c,
      a,
      u = t[2].subTitle + "",
      f = t[2].title + "",
      p = t[2].description + "";
    return {
      c() {
        (e = T("div")),
          (n = T("span")),
          (o = _(u)),
          (r = j()),
          (s = T("h4")),
          (i = _(f)),
          (l = j()),
          (c = T("p")),
          (a = _(p)),
          S(s, "class", "mb-3 mt-1"),
          S(e, "class", "about-info mb-5 svelte-1hv0zqs");
      },
      m(t, u) {
        x(t, e, u),
          y(e, n),
          y(n, o),
          y(e, r),
          y(e, s),
          y(s, i),
          y(e, l),
          y(e, c),
          y(c, a);
      },
      p(t, e) {
        2 & e && u !== (u = t[2].subTitle + "") && E(o, u),
          2 & e && f !== (f = t[2].title + "") && E(i, f),
          2 & e && p !== (p = t[2].description + "") && E(a, p);
      },
      d(t) {
        t && w(e);
      },
    };
  }
  function Me(t) {
    let e,
      n,
      o = t[2].list,
      r = [];
    for (let e = 0; e < o.length; e += 1) r[e] = Ie(Le(t, o, e));
    return {
      c() {
        e = T("div");
        for (let t = 0; t < r.length; t += 1) r[t].c();
        (n = j()), S(e, "class", "col-lg-6");
      },
      m(t, o) {
        x(t, e, o);
        for (let t = 0; t < r.length; t += 1) r[t].m(e, null);
        y(e, n);
      },
      p(t, s) {
        if (2 & s) {
          let i;
          for (o = t[2].list, i = 0; i < o.length; i += 1) {
            const l = Le(t, o, i);
            r[i] ? r[i].p(l, s) : ((r[i] = Ie(l)), r[i].c(), r[i].m(e, n));
          }
          for (; i < r.length; i += 1) r[i].d(1);
          r.length = o.length;
        }
      },
      d(t) {
        t && w(e), k(r, t);
      },
    };
  }
  function ze(t) {
    let e,
      n,
      o,
      r,
      s,
      i,
      l,
      c,
      a,
      u,
      f,
      p = t[1],
      d = [];
    for (let e = 0; e < p.length; e += 1) d[e] = Me(qe(t, p, e));
    return {
      c() {
        (e = T("section")),
          (n = T("div")),
          (o = T("div")),
          (r = T("div")),
          (s = T("h3")),
          (i = _(t[0])),
          (l = j()),
          (c = T("div")),
          (a = T("div"));
        for (let t = 0; t < d.length; t += 1) d[t].c();
        S(s, "class", "mb-2"),
          S(r, "class", "col-lg-4 mb-5"),
          S(a, "class", "row"),
          S(c, "class", "col-lg-8"),
          S(o, "class", "row"),
          S(n, "class", "container"),
          S(
            e,
            "class",
            "section about border-top border-bottom svelte-1hv0zqs"
          );
      },
      m(t, u) {
        x(t, e, u),
          y(e, n),
          y(n, o),
          y(o, r),
          y(r, s),
          y(s, i),
          y(o, l),
          y(o, c),
          y(c, a);
        for (let t = 0; t < d.length; t += 1) d[t].m(a, null);
        f = !0;
      },
      p(t, [e]) {
        if (((!f || 1 & e) && E(i, t[0]), 2 & e)) {
          let n;
          for (p = t[1], n = 0; n < p.length; n += 1) {
            const o = qe(t, p, n);
            d[n] ? d[n].p(o, e) : ((d[n] = Me(o)), d[n].c(), d[n].m(a, null));
          }
          for (; n < d.length; n += 1) d[n].d(1);
          d.length = p.length;
        }
      },
      i(t) {
        f ||
          (U(() => {
            u || (u = lt(e, Gt, {}, !0)), u.run(1);
          }),
          (f = !0));
      },
      o(t) {
        u || (u = lt(e, Gt, {}, !1)), u.run(0), (f = !1);
      },
      d(t) {
        t && w(e), k(d, t), t && u && u.end();
      },
    };
  }
  function Oe(t, e, n) {
    let { title: o = "Work Experiences." } = e,
      {
        data: r = [
          {
            list: [
              {
                title: "Frontend Developer at Mindera",
                subTitle: "October 2018 - Present",
                description: "",
              },
              {
                title: "Frontend Developer at UALabs",
                subTitle: "February 2019 - October 2019",
                description: "",
              },
            ],
          },
          {
            list: [
              {
                title: "Frontend Developer at Pictonio",
                subTitle: "February 2018 - July 2018",
                description: "",
              },
              {
                title: "Web Developer at University of Aveiro",
                subTitle: "November 2017 - March 2018",
                description: "",
              },
            ],
          },
        ],
      } = e;
    return (
      (t.$$set = (t) => {
        "title" in t && n(0, (o = t.title)), "data" in t && n(1, (r = t.data));
      }),
      [o, r]
    );
  }
  class De extends $t {
    constructor(t) {
      super(), gt(this, t, Oe, ze, l, { title: 0, data: 1 });
    }
  }
  function Ne(t, e, n) {
    const o = t.slice();
    return (o[4] = e[n]), o;
  }
  function We(t) {
    let e,
      n,
      o = t[4] + "";
    return {
      c() {
        (e = T("li")), (n = _(o)), S(e, "class", "svelte-13ajvfh");
      },
      m(t, o) {
        x(t, e, o), y(e, n);
      },
      p(t, e) {
        8 & e && o !== (o = t[4] + "") && E(n, o);
      },
      d(t) {
        t && w(e);
      },
    };
  }
  function Fe(t) {
    let e,
      n,
      o,
      r,
      s,
      i,
      l,
      c,
      a,
      u,
      f,
      p,
      d,
      m,
      g,
      $,
      h,
      v,
      b,
      A,
      P,
      C,
      R,
      L = t[3],
      q = [];
    for (let e = 0; e < L.length; e += 1) q[e] = We(Ne(t, L, e));
    return (
      (v = new De({})),
      (C = new fe({
        props: {
          title: "Want to learn more about me?",
          action: "Check my Linkedin",
          url: "https://www.linkedin.com/in/vacom/",
        },
      })),
      {
        c() {
          (e = T("section")),
            (n = T("div")),
            (o = T("div")),
            (r = T("div")),
            (s = T("h2")),
            (i = _(t[0])),
            (l = j()),
            (c = T("p")),
            (a = _(t[1])),
            (u = j()),
            (f = T("p")),
            (p = _(t[2])),
            (d = j()),
            (m = T("div")),
            (g = T("ul"));
          for (let t = 0; t < q.length; t += 1) q[t].c();
          (h = j()),
            ft(v.$$.fragment),
            (b = j()),
            (A = T("br")),
            (P = j()),
            ft(C.$$.fragment),
            S(c, "class", "lead mb-4"),
            S(f, "class", "mb-4"),
            S(r, "class", "col-lg-7"),
            S(g, "class", "list-unstyled mt-3 mb-5 about-list svelte-13ajvfh"),
            S(m, "class", "col-lg-5"),
            S(o, "class", "row justify-content-center align-items-center"),
            S(n, "class", "container"),
            S(e, "class", "section banner-3 svelte-13ajvfh");
        },
        m(t, $) {
          x(t, e, $),
            y(e, n),
            y(n, o),
            y(o, r),
            y(r, s),
            y(s, i),
            y(r, l),
            y(r, c),
            y(c, a),
            y(r, u),
            y(r, f),
            y(f, p),
            y(o, d),
            y(o, m),
            y(m, g);
          for (let t = 0; t < q.length; t += 1) q[t].m(g, null);
          x(t, h, $),
            pt(v, t, $),
            x(t, b, $),
            x(t, A, $),
            x(t, P, $),
            pt(C, t, $),
            (R = !0);
        },
        p(t, e) {
          if (
            ((!R || 1 & e) && E(i, t[0]),
            (!R || 2 & e) && E(a, t[1]),
            (!R || 4 & e) && E(p, t[2]),
            8 & e)
          ) {
            let n;
            for (L = t[3], n = 0; n < L.length; n += 1) {
              const o = Ne(t, L, n);
              q[n] ? q[n].p(o, e) : ((q[n] = We(o)), q[n].c(), q[n].m(g, null));
            }
            for (; n < q.length; n += 1) q[n].d(1);
            q.length = L.length;
          }
        },
        i(t) {
          R ||
            (U(() => {
              $ || ($ = lt(e, Gt, {}, !0)), $.run(1);
            }),
            rt(v.$$.fragment, t),
            rt(C.$$.fragment, t),
            (R = !0));
        },
        o(t) {
          $ || ($ = lt(e, Gt, {}, !1)),
            $.run(0),
            st(v.$$.fragment, t),
            st(C.$$.fragment, t),
            (R = !1);
        },
        d(t) {
          t && w(e),
            k(q, t),
            t && $ && $.end(),
            t && w(h),
            dt(v, t),
            t && w(b),
            t && w(A),
            t && w(P),
            dt(C, t);
        },
      }
    );
  }
  function Ve(t) {
    let e, n, o;
    return (
      (n = new ee({
        props: { $$slots: { default: [Fe] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          (e = j()),
            ft(n.$$.fragment),
            (document.title = "Vitor Amaral | About");
        },
        m(t, r) {
          x(t, e, r), pt(n, t, r), (o = !0);
        },
        p(t, [e]) {
          const o = {};
          143 & e && (o.$$scope = { dirty: e, ctx: t }), n.$set(o);
        },
        i(t) {
          o || (rt(n.$$.fragment, t), (o = !0));
        },
        o(t) {
          st(n.$$.fragment, t), (o = !1);
        },
        d(t) {
          t && w(e), dt(n, t);
        },
      }
    );
  }
  function He(t, e, n) {
    let { name: o = "Vitor Amaral" } = e,
      {
        subTitle: r = "Full Stack Developer & Management and Information Programming",
      } = e,
      {
        description: s = "I'm 27 years old from Portugal, I am a Full Stack Developer.\n   With experience in different fields such as creating mobile applications, web, desktop and APIs in GraphQL or Rest.\n   I invite you to look at my work and my Linkedin for more information.",
      } = e,
      {
        list: i = [
          "React",
          "TypeScript",
          "Nodejs",
          "GraphQL",
          "Serverless",
          "Svelte",
        ],
      } = e;
    return (
      (t.$$set = (t) => {
        "name" in t && n(0, (o = t.name)),
          "subTitle" in t && n(1, (r = t.subTitle)),
          "description" in t && n(2, (s = t.description)),
          "list" in t && n(3, (i = t.list));
      }),
      [o, r, s, i]
    );
  }
  class Be extends $t {
    constructor(t) {
      super(),
        gt(this, t, He, Ve, l, {
          name: 0,
          subTitle: 1,
          description: 2,
          list: 3,
        });
    }
  }
  function Ge(e) {
    let n, o;
    return (
      (n = new je({
        props: { heading: e[0], data: Se, detailed: !0, filters: !1 },
      })),
      {
        c() {
          ft(n.$$.fragment);
        },
        m(t, e) {
          pt(n, t, e), (o = !0);
        },
        p: t,
        i(t) {
          o || (rt(n.$$.fragment, t), (o = !0));
        },
        o(t) {
          st(n.$$.fragment, t), (o = !1);
        },
        d(t) {
          dt(n, t);
        },
      }
    );
  }
  function Ue(t) {
    let e, n, o;
    return (
      (n = new ee({
        props: { $$slots: { default: [Ge] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          (e = j()),
            ft(n.$$.fragment),
            (document.title = "Vitor Amaral | Projects");
        },
        m(t, r) {
          x(t, e, r), pt(n, t, r), (o = !0);
        },
        p(t, [e]) {
          const o = {};
          2 & e && (o.$$scope = { dirty: e, ctx: t }), n.$set(o);
        },
        i(t) {
          o || (rt(n.$$.fragment, t), (o = !0));
        },
        o(t) {
          st(n.$$.fragment, t), (o = !1);
        },
        d(t) {
          t && w(e), dt(n, t);
        },
      }
    );
  }
  function Ke(t) {
    return [
      {
        initialText: "I create",
        colorText: "Projects & Apps.",
        text: "For various types of platforms",
      },
    ];
  }
  class Je extends $t {
    constructor(t) {
      super(), gt(this, t, Ke, Ue, l, {});
    }
  }
  function Qe(t, e, n) {
    const o = t.slice();
    return (o[2] = e[n]), o;
  }
  function Ye(t, e, n) {
    const o = t.slice();
    return (o[5] = e[n]), o;
  }
  function Xe(t) {
    let e,
      n,
      o = t[5] + "";
    return {
      c() {
        (e = T("p")), (n = _(o));
      },
      m(t, o) {
        x(t, e, o), y(e, n);
      },
      p(t, e) {
        1 & e && o !== (o = t[5] + "") && E(n, o);
      },
      d(t) {
        t && w(e);
      },
    };
  }
  function Ze(t) {
    let e, n, o;
    return (
      (n = new le({
        props: {
          href: t[0].url,
          $$slots: { default: [tn] },
          $$scope: { ctx: t },
        },
      })),
      {
        c() {
          (e = T("div")), ft(n.$$.fragment), S(e, "class", "mt-5");
        },
        m(t, r) {
          x(t, e, r), pt(n, e, null), (o = !0);
        },
        p(t, e) {
          const o = {};
          1 & e && (o.href = t[0].url),
            256 & e && (o.$$scope = { dirty: e, ctx: t }),
            n.$set(o);
        },
        i(t) {
          o || (rt(n.$$.fragment, t), (o = !0));
        },
        o(t) {
          st(n.$$.fragment, t), (o = !1);
        },
        d(t) {
          t && w(e), dt(n);
        },
      }
    );
  }
  function tn(t) {
    let e;
    return {
      c() {
        e = _("View project");
      },
      m(t, n) {
        x(t, e, n);
      },
      d(t) {
        t && w(e);
      },
    };
  }
  function en(t) {
    let e, n, o, r, s;
    return {
      c() {
        (e = T("div")),
          (n = T("div")),
          (o = T("img")),
          (s = j()),
          o.src !== (r = t[2]) && S(o, "src", r),
          S(o, "alt", ""),
          S(o, "class", "img-fluid w-100"),
          S(n, "class", "col-lg-12"),
          S(e, "class", "row mt-5");
      },
      m(t, r) {
        x(t, e, r), y(e, n), y(n, o), y(e, s);
      },
      p(t, e) {
        1 & e && o.src !== (r = t[2]) && S(o, "src", r);
      },
      d(t) {
        t && w(e);
      },
    };
  }
  function nn(t) {
    let e,
      n,
      o,
      r,
      s,
      i,
      l,
      c,
      a,
      u,
      f,
      p,
      d,
      m,
      g,
      $,
      h,
      v,
      b,
      A,
      P,
      C,
      R,
      L,
      q,
      I,
      M,
      z,
      O,
      D,
      N,
      W,
      F = t[0].title + "",
      V = t[0].subTitle + "",
      H = t[0].client + "",
      B = t[0].category + "",
      G = t[0].description,
      U = [];
    for (let e = 0; e < G.length; e += 1) U[e] = Xe(Ye(t, G, e));
    let K = null !== t[0].url && Ze(t),
      J = t[0].images,
      Q = [];
    for (let e = 0; e < J.length; e += 1) Q[e] = en(Qe(t, J, e));
    return {
      c() {
        (e = T("section")),
          (n = T("div")),
          (o = T("div")),
          (r = T("div")),
          (s = T("div")),
          (i = T("h1")),
          (l = _(F)),
          (c = j()),
          (a = T("section")),
          (u = T("div")),
          (f = T("div")),
          (p = T("div")),
          (d = T("div")),
          (m = T("h3")),
          (g = _(V)),
          ($ = j());
        for (let t = 0; t < U.length; t += 1) U[t].c();
        (h = j()),
          (v = T("div")),
          (b = T("div")),
          (A = T("h5")),
          (A.textContent = "Client"),
          (P = j()),
          (C = T("p")),
          (R = _(H)),
          (L = j()),
          (q = T("div")),
          (I = T("h5")),
          (I.textContent = "Category"),
          (M = j()),
          (z = T("p")),
          (O = _(B)),
          (D = j()),
          K && K.c(),
          (N = j());
        for (let t = 0; t < Q.length; t += 1) Q[t].c();
        S(i, "class", "text-capitalize mb-0 text-lg svelte-1vf191v"),
          S(s, "class", "text-center"),
          S(r, "class", "col-lg-12"),
          S(o, "class", "row"),
          S(n, "class", "container"),
          S(e, "class", "page-title section pb-0 svelte-1vf191v"),
          S(m, "class", "mb-4"),
          S(d, "class", "project-info"),
          S(p, "class", "col-lg-8"),
          S(A, "class", "mb-0"),
          S(b, "class", "info"),
          S(I, "class", "mb-0"),
          S(q, "class", "info"),
          S(v, "class", "col-lg-4"),
          S(f, "class", "row justify-content-center"),
          S(u, "class", "container"),
          S(a, "class", "section portfolio-single svelte-1vf191v");
      },
      m(t, w) {
        x(t, e, w),
          y(e, n),
          y(n, o),
          y(o, r),
          y(r, s),
          y(s, i),
          y(i, l),
          x(t, c, w),
          x(t, a, w),
          y(a, u),
          y(u, f),
          y(f, p),
          y(p, d),
          y(d, m),
          y(m, g),
          y(d, $);
        for (let t = 0; t < U.length; t += 1) U[t].m(d, null);
        y(f, h),
          y(f, v),
          y(v, b),
          y(b, A),
          y(b, P),
          y(b, C),
          y(C, R),
          y(v, L),
          y(v, q),
          y(q, I),
          y(q, M),
          y(q, z),
          y(z, O),
          y(v, D),
          K && K.m(v, null),
          y(u, N);
        for (let t = 0; t < Q.length; t += 1) Q[t].m(u, null);
        W = !0;
      },
      p(t, e) {
        if (
          ((!W || 1 & e) && F !== (F = t[0].title + "") && E(l, F),
          (!W || 1 & e) && V !== (V = t[0].subTitle + "") && E(g, V),
          1 & e)
        ) {
          let n;
          for (G = t[0].description, n = 0; n < G.length; n += 1) {
            const o = Ye(t, G, n);
            U[n] ? U[n].p(o, e) : ((U[n] = Xe(o)), U[n].c(), U[n].m(d, null));
          }
          for (; n < U.length; n += 1) U[n].d(1);
          U.length = G.length;
        }
        if (
          ((!W || 1 & e) && H !== (H = t[0].client + "") && E(R, H),
          (!W || 1 & e) && B !== (B = t[0].category + "") && E(O, B),
          null !== t[0].url
            ? K
              ? (K.p(t, e), 1 & e && rt(K, 1))
              : ((K = Ze(t)), K.c(), rt(K, 1), K.m(v, null))
            : K &&
              (nt(),
              st(K, 1, 1, () => {
                K = null;
              }),
              ot()),
          1 & e)
        ) {
          let n;
          for (J = t[0].images, n = 0; n < J.length; n += 1) {
            const o = Qe(t, J, n);
            Q[n] ? Q[n].p(o, e) : ((Q[n] = en(o)), Q[n].c(), Q[n].m(u, null));
          }
          for (; n < Q.length; n += 1) Q[n].d(1);
          Q.length = J.length;
        }
      },
      i(t) {
        W || (rt(K), (W = !0));
      },
      o(t) {
        st(K), (W = !1);
      },
      d(t) {
        t && w(e), t && w(c), t && w(a), k(U, t), K && K.d(), k(Q, t);
      },
    };
  }
  function on(t) {
    let e, n;
    return (
      (e = new ee({
        props: { $$slots: { default: [nn] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          ft(e.$$.fragment);
        },
        m(t, o) {
          pt(e, t, o), (n = !0);
        },
        p(t, [n]) {
          const o = {};
          257 & n && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
        },
        i(t) {
          n || (rt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          st(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          dt(e, t);
        },
      }
    );
  }
  function rn(t, e, n) {
    let { params: o } = e,
      {
        data: r = {
          title: "A project title",
          subTitle: "A project nice subtitle",
          client: "Microsoft",
          category: "Web Design",
          url: "https://www.google.com",
          description: [
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi\n              eligendi fugiat ad cupiditate hic, eum debitis ipsum, quos non\n              mollitia. Commodi suscipit obcaecati et, aperiam quas vero quo,\n              labore tempore.",
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam\n              debitis beatae doloremque cupiditate vel repellat nam est\n              voluptates, magnam quod explicabo fugit, quidem.",
          ],
          images: ["images/portfolio/02.jpg", "images/portfolio/02.jpg"],
        },
      } = e;
    return (
      O(() => {
        console.log("content!! = ", o);
        const [t] = Ee.filter((t) => t.id === o.id);
        n(0, (r = t));
      }),
      (t.$$set = (t) => {
        "params" in t && n(1, (o = t.params)),
          "data" in t && n(0, (r = t.data));
      }),
      [r, o]
    );
  }
  class sn extends $t {
    constructor(t) {
      super(), gt(this, t, rn, on, l, { params: 1, data: 0 });
    }
  }
  const ln = [
    {
      id: "prospectus",
      category: "Prospectus",
      title: "Object to HTML form generator for React Applications",
      image: "https://i.imgur.com/n6xDWNy.jpg",
      url: "https://github.com/vacom/prospectus",
      external: !0,
    },
    {
      id: "requite",
      category: "Requite",
      title:
        "Dynamic selector for React components. Great for creating dynamic pages.",
      image: "https://i.imgur.com/HVNMt4J.jpg",
      url: "https://github.com/vacom/Requite",
      external: !0,
    },
    {
      id: "pursue",
      category: "Pursue",
      title: "A React utility HTTP client for higher-order components",
      image: "https://i.imgur.com/ERhNl4O.jpg",
      url: "https://github.com/vacom/pursue",
      external: !0,
    },
    {
      id: "requite-for-svelte",
      category: "Requite for Svelte",
      title: "Dynamic selector for Svelte",
      image: "https://i.imgur.com/vdWjYt5.png",
      url: "https://github.com/vacom/requite-svelte",
      external: !0,
    },
    {
      id: "logbook",
      category: "Logbook",
      title:
        "A library with no dependencies to handle and amplify the use of console.log and other forms of debugging",
      image: "https://i.imgur.com/lie3Fan.jpg",
      url: "https://github.com/vacom/logbook",
      external: !0,
    },
    {
      id: "stackSign",
      category: "StackSign",
      title:
        "A minimal boilerplate stack for React SPA with support for TypeScript, Apollo, GraphQL, Auth0 and Private Routes with React-Router",
      image: "https://i.imgur.com/4nM6IJW.jpg",
      url: "https://github.com/vacom/stacksign",
      external: !0,
    },
    {
      id: "vantage-auth",
      category: "Vantage-auth",
      title: "A reusable auth interface component for any React Application ",
      image: "https://i.imgur.com/VPBFAz0.jpg",
      url: "https://github.com/vacom/vantage-auth",
      external: !0,
    },
  ];
  function cn(e) {
    let n, o;
    return (
      (n = new je({
        props: { heading: e[0], data: ln, detailed: !0, filters: !1 },
      })),
      {
        c() {
          ft(n.$$.fragment);
        },
        m(t, e) {
          pt(n, t, e), (o = !0);
        },
        p: t,
        i(t) {
          o || (rt(n.$$.fragment, t), (o = !0));
        },
        o(t) {
          st(n.$$.fragment, t), (o = !1);
        },
        d(t) {
          dt(n, t);
        },
      }
    );
  }
  function an(t) {
    let e, n, o;
    return (
      (n = new ee({
        props: { $$slots: { default: [cn] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          (e = j()),
            ft(n.$$.fragment),
            (document.title = "Vitor Amaral | Open Source");
        },
        m(t, r) {
          x(t, e, r), pt(n, t, r), (o = !0);
        },
        p(t, [e]) {
          const o = {};
          2 & e && (o.$$scope = { dirty: e, ctx: t }), n.$set(o);
        },
        i(t) {
          o || (rt(n.$$.fragment, t), (o = !0));
        },
        o(t) {
          st(n.$$.fragment, t), (o = !1);
        },
        d(t) {
          t && w(e), dt(n, t);
        },
      }
    );
  }
  function un(t) {
    return [
      {
        initialText: "I develop",
        colorText: "Open Source projects.",
        text: "Sharing is caring.",
      },
    ];
  }
  class fn extends $t {
    constructor(t) {
      super(), gt(this, t, un, an, l, {});
    }
  }
  function pn(t, e, n) {
    const o = t.slice();
    return (o[3] = e[n]), o;
  }
  function dn(t) {
    let e,
      n,
      o = t[3] + "";
    return {
      c() {
        (e = T("li")), (n = _(o));
      },
      m(t, o) {
        x(t, e, o), y(e, n);
      },
      p(t, e) {
        4 & e && o !== (o = t[3] + "") && E(n, o);
      },
      d(t) {
        t && w(e);
      },
    };
  }
  function mn(t) {
    let e, n, o, r, s, i, l, c, a, u, f, p, d, m, g, $, h, v;
    e = new re({
      props: {
        initialText: "I create",
        colorText: "Themes & Templates",
        text: "Beautiful and simple themes for agencies and photographers",
      },
    });
    let b = t[2],
      A = [];
    for (let e = 0; e < b.length; e += 1) A[e] = dn(pn(t, b, e));
    return (
      (h = new fe({
        props: {
          title: "Take a look at our themes",
          action: "Check out the themes",
          url: "https://creativemarket.com/storytics",
        },
      })),
      {
        c() {
          ft(e.$$.fragment),
            (n = j()),
            (o = T("section")),
            (r = T("div")),
            (s = T("div")),
            (i = T("div")),
            (l = T("h2")),
            (c = _(t[0])),
            (a = j()),
            (u = T("p")),
            (f = _(t[1])),
            (p = j()),
            (d = T("div")),
            (m = T("ul"));
          for (let t = 0; t < A.length; t += 1) A[t].c();
          ($ = j()),
            ft(h.$$.fragment),
            S(u, "class", "mb-4"),
            S(i, "class", "col-lg-7"),
            S(m, "class", "list-unstyled mt-3 mb-5 about-list"),
            S(d, "class", "col-lg-5"),
            S(s, "class", "row justify-content-center align-items-center"),
            S(r, "class", "container"),
            S(o, "class", "section banner-3 theme-section svelte-1uahdo6");
        },
        m(t, g) {
          pt(e, t, g),
            x(t, n, g),
            x(t, o, g),
            y(o, r),
            y(r, s),
            y(s, i),
            y(i, l),
            y(l, c),
            y(i, a),
            y(i, u),
            y(u, f),
            y(s, p),
            y(s, d),
            y(d, m);
          for (let t = 0; t < A.length; t += 1) A[t].m(m, null);
          x(t, $, g), pt(h, t, g), (v = !0);
        },
        p(t, e) {
          if (
            ((!v || 1 & e) && E(c, t[0]), (!v || 2 & e) && E(f, t[1]), 4 & e)
          ) {
            let n;
            for (b = t[2], n = 0; n < b.length; n += 1) {
              const o = pn(t, b, n);
              A[n] ? A[n].p(o, e) : ((A[n] = dn(o)), A[n].c(), A[n].m(m, null));
            }
            for (; n < A.length; n += 1) A[n].d(1);
            A.length = b.length;
          }
        },
        i(t) {
          v ||
            (rt(e.$$.fragment, t),
            U(() => {
              g || (g = lt(o, Gt, {}, !0)), g.run(1);
            }),
            rt(h.$$.fragment, t),
            (v = !0));
        },
        o(t) {
          st(e.$$.fragment, t),
            g || (g = lt(o, Gt, {}, !1)),
            g.run(0),
            st(h.$$.fragment, t),
            (v = !1);
        },
        d(t) {
          dt(e, t),
            t && w(n),
            t && w(o),
            k(A, t),
            t && g && g.end(),
            t && w($),
            dt(h, t);
        },
      }
    );
  }
  function gn(t) {
    let e, n, o;
    return (
      (n = new ee({
        props: { $$slots: { default: [mn] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          (e = j()),
            ft(n.$$.fragment),
            (document.title = "Vitor Amaral | Themes");
        },
        m(t, r) {
          x(t, e, r), pt(n, t, r), (o = !0);
        },
        p(t, [e]) {
          const o = {};
          71 & e && (o.$$scope = { dirty: e, ctx: t }), n.$set(o);
        },
        i(t) {
          o || (rt(n.$$.fragment, t), (o = !0));
        },
        o(t) {
          st(n.$$.fragment, t), (o = !1);
        },
        d(t) {
          t && w(e), dt(n, t);
        },
      }
    );
  }
  function $n(t, e, n) {
    let { name: o = "Storytics" } = e,
      {
        description: r = "Storytics is a design studio from Portugal. \n  We design and create Themes and Templates for bloggers, entrepreneurs, and creatives.\n  A Web Design Studio with a story to tell. Every theme we create tells a story.",
      } = e,
      { list: s = ["Templates", "Themes", "Agencies", "CSS", "Html"] } = e;
    return (
      (t.$$set = (t) => {
        "name" in t && n(0, (o = t.name)),
          "description" in t && n(1, (r = t.description)),
          "list" in t && n(2, (s = t.list));
      }),
      [o, r, s]
    );
  }
  class hn extends $t {
    constructor(t) {
      super(), gt(this, t, $n, gn, l, { name: 0, description: 1, list: 2 });
    }
  }
  function vn(t) {
    let e, n;
    return (
      (e = new sn({ props: { params: t[0] } })),
      {
        c() {
          ft(e.$$.fragment);
        },
        m(t, o) {
          pt(e, t, o), (n = !0);
        },
        p(t, n) {
          const o = {};
          1 & n && (o.params = t[0]), e.$set(o);
        },
        i(t) {
          n || (rt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          st(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          dt(e, t);
        },
      }
    );
  }
  function bn(t) {
    let e, n;
    return (
      (e = new Re({})),
      {
        c() {
          ft(e.$$.fragment);
        },
        m(t, o) {
          pt(e, t, o), (n = !0);
        },
        i(t) {
          n || (rt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          st(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          dt(e, t);
        },
      }
    );
  }
  function yn(t) {
    let e, n, o, r, s, i, l, c, a, u, f, p;
    return (
      (e = new Ft({ props: { path: "themes", component: hn } })),
      (o = new Ft({ props: { path: "opensource", component: fn } })),
      (s = new Ft({
        props: {
          path: "project/:id",
          $$slots: {
            default: [
              vn,
              ({ params: t }) => ({ 0: t }),
              ({ params: t }) => (t ? 1 : 0),
            ],
          },
          $$scope: { ctx: t },
        },
      })),
      (l = new Ft({ props: { path: "projects", component: Je } })),
      (a = new Ft({ props: { path: "about", component: Be } })),
      (f = new Ft({
        props: { path: "/", $$slots: { default: [bn] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          ft(e.$$.fragment),
            (n = j()),
            ft(o.$$.fragment),
            (r = j()),
            ft(s.$$.fragment),
            (i = j()),
            ft(l.$$.fragment),
            (c = j()),
            ft(a.$$.fragment),
            (u = j()),
            ft(f.$$.fragment);
        },
        m(t, d) {
          pt(e, t, d),
            x(t, n, d),
            pt(o, t, d),
            x(t, r, d),
            pt(s, t, d),
            x(t, i, d),
            pt(l, t, d),
            x(t, c, d),
            pt(a, t, d),
            x(t, u, d),
            pt(f, t, d),
            (p = !0);
        },
        p(t, e) {
          const n = {};
          3 & e && (n.$$scope = { dirty: e, ctx: t }), s.$set(n);
          const o = {};
          2 & e && (o.$$scope = { dirty: e, ctx: t }), f.$set(o);
        },
        i(t) {
          p ||
            (rt(e.$$.fragment, t),
            rt(o.$$.fragment, t),
            rt(s.$$.fragment, t),
            rt(l.$$.fragment, t),
            rt(a.$$.fragment, t),
            rt(f.$$.fragment, t),
            (p = !0));
        },
        o(t) {
          st(e.$$.fragment, t),
            st(o.$$.fragment, t),
            st(s.$$.fragment, t),
            st(l.$$.fragment, t),
            st(a.$$.fragment, t),
            st(f.$$.fragment, t),
            (p = !1);
        },
        d(t) {
          dt(e, t),
            t && w(n),
            dt(o, t),
            t && w(r),
            dt(s, t),
            t && w(i),
            dt(l, t),
            t && w(c),
            dt(a, t),
            t && w(u),
            dt(f, t);
        },
      }
    );
  }
  function xn(t) {
    let e, n;
    return (
      (e = new qt({
        props: { url: wn, $$slots: { default: [yn] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          ft(e.$$.fragment);
        },
        m(t, o) {
          pt(e, t, o), (n = !0);
        },
        p(t, [n]) {
          const o = {};
          2 & n && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
        },
        i(t) {
          n || (rt(e.$$.fragment, t), (n = !0));
        },
        o(t) {
          st(e.$$.fragment, t), (n = !1);
        },
        d(t) {
          dt(e, t);
        },
      }
    );
  }
  let wn = "";
  return new (class extends $t {
    constructor(t) {
      super(), gt(this, t, null, xn, l, {});
    }
  })({ target: document.body });
})();
//# sourceMappingURL=bundle.js.map
