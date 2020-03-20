(function(l, r) {
  if (l.getElementById("livereloadscript")) return;
  r = l.createElement("script");
  r.async = 1;
  r.src =
    "//" +
    (window.location.host || "localhost").split(":")[0] +
    ":35729/livereload.js?snipver=1";
  r.id = "livereloadscript";
  l.head.appendChild(r);
})(window.document);
var app = (function() {
  "use strict";

  function noop() {}
  const identity = x => x;
  function assign(tar, src) {
    // @ts-ignore
    for (const k in src) tar[k] = src[k];
    return tar;
  }
  function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
      loc: { file, line, column, char }
    };
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a
      ? b == b
      : a !== b || (a && typeof a === "object") || typeof a === "function";
  }
  function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== "function") {
      throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
  }
  function subscribe(store, ...callbacks) {
    if (store == null) {
      return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
  }
  function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
  }
  function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
      const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
      return definition[0](slot_ctx);
    }
  }
  function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
      ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
      : $$scope.ctx;
  }
  function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
      const lets = definition[2](fn(dirty));
      if ($$scope.dirty === undefined) {
        return lets;
      }
      if (typeof lets === "object") {
        const merged = [];
        const len = Math.max($$scope.dirty.length, lets.length);
        for (let i = 0; i < len; i += 1) {
          merged[i] = $$scope.dirty[i] | lets[i];
        }
        return merged;
      }
      return $$scope.dirty | lets;
    }
    return $$scope.dirty;
  }
  function exclude_internal_props(props) {
    const result = {};
    for (const k in props) if (k[0] !== "$") result[k] = props[k];
    return result;
  }
  function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy)
      ? action_result.destroy
      : noop;
  }

  const is_client = typeof window !== "undefined";
  let now = is_client ? () => window.performance.now() : () => Date.now();
  let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

  const tasks = new Set();
  function run_tasks(now) {
    tasks.forEach(task => {
      if (!task.c(now)) {
        tasks.delete(task);
        task.f();
      }
    });
    if (tasks.size !== 0) raf(run_tasks);
  }
  /**
   * Creates a new task that runs on each raf frame
   * until it returns a falsy value or is aborted
   */
  function loop(callback) {
    let task;
    if (tasks.size === 0) raf(run_tasks);
    return {
      promise: new Promise(fulfill => {
        tasks.add((task = { c: callback, f: fulfill }));
      }),
      abort() {
        tasks.delete(task);
      }
    };
  }

  function append(target, node) {
    target.appendChild(node);
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    node.parentNode.removeChild(node);
  }
  function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
      if (iterations[i]) iterations[i].d(detaching);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function empty() {
    return text("");
  }
  function attr(node, attribute, value) {
    if (value == null) node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function children(element) {
    return Array.from(element.childNodes);
  }
  function toggle_class(element, name, toggle) {
    element.classList[toggle ? "add" : "remove"](name);
  }
  function custom_event(type, detail) {
    const e = document.createEvent("CustomEvent");
    e.initCustomEvent(type, false, false, detail);
    return e;
  }

  const active_docs = new Set();
  let active = 0;
  // https://github.com/darkskyapp/string-hash/blob/master/index.js
  function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
  }
  function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = "{\n";
    for (let p = 0; p <= 1; p += step) {
      const t = a + (b - a) * ease(p);
      keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = node.ownerDocument;
    active_docs.add(doc);
    const stylesheet =
      doc.__svelte_stylesheet ||
      (doc.__svelte_stylesheet = doc.head.appendChild(element("style")).sheet);
    const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
    if (!current_rules[name]) {
      current_rules[name] = true;
      stylesheet.insertRule(
        `@keyframes ${name} ${rule}`,
        stylesheet.cssRules.length
      );
    }
    const animation = node.style.animation || "";
    node.style.animation = `${
      animation ? `${animation}, ` : ``
    }${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
  }
  function delete_rule(node, name) {
    const previous = (node.style.animation || "").split(", ");
    const next = previous.filter(
      name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf("__svelte") === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
      node.style.animation = next.join(", ");
      active -= deleted;
      if (!active) clear_rules();
    }
  }
  function clear_rules() {
    raf(() => {
      if (active) return;
      active_docs.forEach(doc => {
        const stylesheet = doc.__svelte_stylesheet;
        let i = stylesheet.cssRules.length;
        while (i--) stylesheet.deleteRule(i);
        doc.__svelte_rules = {};
      });
      active_docs.clear();
    });
  }

  let current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component)
      throw new Error(`Function called outside component initialization`);
    return current_component;
  }
  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }
  function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
  }
  function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
  }
  function getContext(key) {
    return get_current_component().$$.context.get(key);
  }

  const dirty_components = [];
  const binding_callbacks = [];
  const render_callbacks = [];
  const flush_callbacks = [];
  const resolved_promise = Promise.resolve();
  let update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  let flushing = false;
  const seen_callbacks = new Set();
  function flush() {
    if (flushing) return;
    flushing = true;
    do {
      // first, call beforeUpdate functions
      // and update components
      for (let i = 0; i < dirty_components.length; i += 1) {
        const component = dirty_components[i];
        set_current_component(component);
        update(component.$$);
      }
      dirty_components.length = 0;
      while (binding_callbacks.length) binding_callbacks.pop()();
      // then, once components are updated, call
      // afterUpdate functions. This may cause
      // subsequent updates...
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          // ...so guard against infinite loops
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }

  let promise;
  function wait() {
    if (!promise) {
      promise = Promise.resolve();
      promise.then(() => {
        promise = null;
      });
    }
    return promise;
  }
  function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? "intro" : "outro"}${kind}`));
  }
  const outroing = new Set();
  let outros;
  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros // parent group
    };
  }
  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }
    outros = outros.p;
  }
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach, callback) {
    if (block && block.o) {
      if (outroing.has(block)) return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);
        if (callback) {
          if (detach) block.d(1);
          callback();
        }
      });
      block.o(local);
    }
  }
  const null_transition = { duration: 0 };
  function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
      if (animation_name) delete_rule(node, animation_name);
    }
    function init(program, duration) {
      const d = program.b - t;
      duration *= Math.abs(d);
      return {
        a: t,
        b: program.b,
        d,
        duration,
        start: program.start,
        end: program.start + duration,
        group: program.group
      };
    }
    function go(b) {
      const { delay = 0, duration = 300, easing = identity, tick = noop, css } =
        config || null_transition;
      const program = {
        start: now() + delay,
        b
      };
      if (!b) {
        // @ts-ignore todo: improve typings
        program.group = outros;
        outros.r += 1;
      }
      if (running_program) {
        pending_program = program;
      } else {
        // if this is an intro, and there's a delay, we need to do
        // an initial tick and/or apply CSS animation immediately
        if (css) {
          clear_animation();
          animation_name = create_rule(
            node,
            t,
            b,
            duration,
            delay,
            easing,
            css
          );
        }
        if (b) tick(0, 1);
        running_program = init(program, duration);
        add_render_callback(() => dispatch(node, b, "start"));
        loop(now => {
          if (pending_program && now > pending_program.start) {
            running_program = init(pending_program, duration);
            pending_program = null;
            dispatch(node, running_program.b, "start");
            if (css) {
              clear_animation();
              animation_name = create_rule(
                node,
                t,
                running_program.b,
                running_program.duration,
                0,
                easing,
                config.css
              );
            }
          }
          if (running_program) {
            if (now >= running_program.end) {
              tick((t = running_program.b), 1 - t);
              dispatch(node, running_program.b, "end");
              if (!pending_program) {
                // we're done
                if (running_program.b) {
                  // intro — we can tidy up immediately
                  clear_animation();
                } else {
                  // outro — needs to be coordinated
                  if (!--running_program.group.r)
                    run_all(running_program.group.c);
                }
              }
              running_program = null;
            } else if (now >= running_program.start) {
              const p = now - running_program.start;
              t =
                running_program.a +
                running_program.d * easing(p / running_program.duration);
              tick(t, 1 - t);
            }
          }
          return !!(running_program || pending_program);
        });
      }
    }
    return {
      run(b) {
        if (is_function(config)) {
          wait().then(() => {
            // @ts-ignore
            config = config();
            go(b);
          });
        } else {
          go(b);
        }
      },
      end() {
        clear_animation();
        running_program = pending_program = null;
      }
    };
  }

  function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
  }
  function update_keyed_each(
    old_blocks,
    dirty,
    get_key,
    dynamic,
    ctx,
    list,
    lookup,
    node,
    destroy,
    create_each_block,
    next,
    get_context
  ) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--) old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
      const child_ctx = get_context(ctx, list, i);
      const key = get_key(child_ctx);
      let block = lookup.get(key);
      if (!block) {
        block = create_each_block(key, child_ctx);
        block.c();
      } else if (dynamic) {
        block.p(child_ctx, dirty);
      }
      new_lookup.set(key, (new_blocks[i] = block));
      if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
      transition_in(block, 1);
      block.m(node, next, lookup.has(block.key));
      lookup.set(block.key, block);
      next = block.first;
      n--;
    }
    while (o && n) {
      const new_block = new_blocks[n - 1];
      const old_block = old_blocks[o - 1];
      const new_key = new_block.key;
      const old_key = old_block.key;
      if (new_block === old_block) {
        // do nothing
        next = new_block.first;
        o--;
        n--;
      } else if (!new_lookup.has(old_key)) {
        // remove old block
        destroy(old_block, lookup);
        o--;
      } else if (!lookup.has(new_key) || will_move.has(new_key)) {
        insert(new_block);
      } else if (did_move.has(old_key)) {
        o--;
      } else if (deltas.get(new_key) > deltas.get(old_key)) {
        did_move.add(new_key);
        insert(new_block);
      } else {
        will_move.add(old_key);
        o--;
      }
    }
    while (o--) {
      const old_block = old_blocks[o];
      if (!new_lookup.has(old_block.key)) destroy(old_block, lookup);
    }
    while (n) insert(new_blocks[n - 1]);
    return new_blocks;
  }
  function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
      const key = get_key(get_context(ctx, list, i));
      if (keys.has(key)) {
        throw new Error(`Cannot have duplicate keys in a keyed each`);
      }
      keys.add(key);
    }
  }

  function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
      const o = levels[i];
      const n = updates[i];
      if (n) {
        for (const key in o) {
          if (!(key in n)) to_null_out[key] = 1;
        }
        for (const key in n) {
          if (!accounted_for[key]) {
            update[key] = n[key];
            accounted_for[key] = 1;
          }
        }
        levels[i] = n;
      } else {
        for (const key in o) {
          accounted_for[key] = 1;
        }
      }
    }
    for (const key in to_null_out) {
      if (!(key in update)) update[key] = undefined;
    }
    return update;
  }
  function get_spread_object(spread_props) {
    return typeof spread_props === "object" && spread_props !== null
      ? spread_props
      : {};
  }
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
        // Edge case - component was destroyed immediately,
        // most likely as a result of a binding initialising
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      // TODO null out other refs, including component.$$ (but need to
      // preserve final state?)
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
  }
  function init(
    component,
    options,
    instance,
    create_fragment,
    not_equal,
    props,
    dirty = [-1]
  ) {
    const parent_component = current_component;
    set_current_component(component);
    const prop_values = options.props || {};
    const $$ = (component.$$ = {
      fragment: null,
      ctx: null,
      // state
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: [],
      context: new Map(parent_component ? parent_component.$$.context : []),
      // everything else
      callbacks: blank_object(),
      dirty
    });
    let ready = false;
    $$.ctx = instance
      ? instance(component, prop_values, (i, ret, ...rest) => {
          const value = rest.length ? rest[0] : ret;
          if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
            if ($$.bound[i]) $$.bound[i](value);
            if (ready) make_dirty(component, i);
          }
          return ret;
        })
      : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        const nodes = children(options.target);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        $$.fragment && $$.fragment.c();
      }
      if (options.intro) transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor);
      flush();
    }
    set_current_component(parent_component);
  }
  class SvelteComponent {
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      const callbacks =
        this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }
    $set() {
      // overridden by instance, if it has props
    }
  }

  function dispatch_dev(type, detail) {
    document.dispatchEvent(
      custom_event(type, Object.assign({ version: "3.20.1" }, detail))
    );
  }
  function append_dev(target, node) {
    dispatch_dev("SvelteDOMInsert", { target, node });
    append(target, node);
  }
  function insert_dev(target, node, anchor) {
    dispatch_dev("SvelteDOMInsert", { target, node, anchor });
    insert(target, node, anchor);
  }
  function detach_dev(node) {
    dispatch_dev("SvelteDOMRemove", { node });
    detach(node);
  }
  function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
      dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
    else dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
  }
  function set_data_dev(text, data) {
    data = "" + data;
    if (text.data === data) return;
    dispatch_dev("SvelteDOMSetData", { node: text, data });
    text.data = data;
  }
  function validate_each_argument(arg) {
    if (
      typeof arg !== "string" &&
      !(arg && typeof arg === "object" && "length" in arg)
    ) {
      let msg = "{#each} only iterates over array-like objects.";
      if (typeof Symbol === "function" && arg && Symbol.iterator in arg) {
        msg += " You can use a spread to convert this iterable into an array.";
      }
      throw new Error(msg);
    }
  }
  function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
      if (!~keys.indexOf(slot_key)) {
        console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
      }
    }
  }
  class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
      if (!options || (!options.target && !options.$$inline)) {
        throw new Error(`'target' is a required option`);
      }
      super();
    }
    $destroy() {
      super.$destroy();
      this.$destroy = () => {
        console.warn(`Component was already destroyed`); // eslint-disable-line no-console
      };
    }
    $capture_state() {}
    $inject_state() {}
  }

  const subscriber_queue = [];
  /**
   * Creates a `Readable` store that allows reading by subscription.
   * @param value initial value
   * @param {StartStopNotifier}start start and stop notifications for subscriptions
   */
  function readable(value, start) {
    return {
      subscribe: writable(value, start).subscribe
    };
  }
  /**
   * Create a `Writable` store that allows both updating and reading by subscription.
   * @param {*=}value initial value
   * @param {StartStopNotifier=}start start and stop notifications for subscriptions
   */
  function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
      if (safe_not_equal(value, new_value)) {
        value = new_value;
        if (stop) {
          // store is ready
          const run_queue = !subscriber_queue.length;
          for (let i = 0; i < subscribers.length; i += 1) {
            const s = subscribers[i];
            s[1]();
            subscriber_queue.push(s, value);
          }
          if (run_queue) {
            for (let i = 0; i < subscriber_queue.length; i += 2) {
              subscriber_queue[i][0](subscriber_queue[i + 1]);
            }
            subscriber_queue.length = 0;
          }
        }
      }
    }
    function update(fn) {
      set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
      const subscriber = [run, invalidate];
      subscribers.push(subscriber);
      if (subscribers.length === 1) {
        stop = start(set) || noop;
      }
      run(value);
      return () => {
        const index = subscribers.indexOf(subscriber);
        if (index !== -1) {
          subscribers.splice(index, 1);
        }
        if (subscribers.length === 0) {
          stop();
          stop = null;
        }
      };
    }
    return { set, update, subscribe };
  }
  function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single ? [stores] : stores;
    const auto = fn.length < 2;
    return readable(initial_value, set => {
      let inited = false;
      const values = [];
      let pending = 0;
      let cleanup = noop;
      const sync = () => {
        if (pending) {
          return;
        }
        cleanup();
        const result = fn(single ? values[0] : values, set);
        if (auto) {
          set(result);
        } else {
          cleanup = is_function(result) ? result : noop;
        }
      };
      const unsubscribers = stores_array.map((store, i) =>
        subscribe(
          store,
          value => {
            values[i] = value;
            pending &= ~(1 << i);
            if (inited) {
              sync();
            }
          },
          () => {
            pending |= 1 << i;
          }
        )
      );
      inited = true;
      sync();
      return function stop() {
        run_all(unsubscribers);
        cleanup();
      };
    });
  }

  const LOCATION = {};
  const ROUTER = {};

  /**
   * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
   *
   * https://github.com/reach/router/blob/master/LICENSE
   * */

  function getLocation(source) {
    return {
      ...source.location,
      state: source.history.state,
      key: (source.history.state && source.history.state.key) || "initial"
    };
  }

  function createHistory(source, options) {
    const listeners = [];
    let location = getLocation(source);

    return {
      get location() {
        return location;
      },

      listen(listener) {
        listeners.push(listener);

        const popstateListener = () => {
          location = getLocation(source);
          listener({ location, action: "POP" });
        };

        source.addEventListener("popstate", popstateListener);

        return () => {
          source.removeEventListener("popstate", popstateListener);

          const index = listeners.indexOf(listener);
          listeners.splice(index, 1);
        };
      },

      navigate(to, { state, replace = false } = {}) {
        state = { ...state, key: Date.now() + "" };
        // try...catch iOS Safari limits to 100 pushState calls
        try {
          if (replace) {
            source.history.replaceState(state, null, to);
          } else {
            source.history.pushState(state, null, to);
          }
        } catch (e) {
          source.location[replace ? "replace" : "assign"](to);
        }

        location = getLocation(source);
        listeners.forEach(listener => listener({ location, action: "PUSH" }));
      }
    };
  }

  // Stores history entries in memory for testing or other platforms like Native
  function createMemorySource(initialPathname = "/") {
    let index = 0;
    const stack = [{ pathname: initialPathname, search: "" }];
    const states = [];

    return {
      get location() {
        return stack[index];
      },
      addEventListener(name, fn) {},
      removeEventListener(name, fn) {},
      history: {
        get entries() {
          return stack;
        },
        get index() {
          return index;
        },
        get state() {
          return states[index];
        },
        pushState(state, _, uri) {
          const [pathname, search = ""] = uri.split("?");
          index++;
          stack.push({ pathname, search });
          states.push(state);
        },
        replaceState(state, _, uri) {
          const [pathname, search = ""] = uri.split("?");
          stack[index] = { pathname, search };
          states[index] = state;
        }
      }
    };
  }

  // Global history uses window.history as the source if available,
  // otherwise a memory history
  const canUseDOM = Boolean(
    typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
  );
  const globalHistory = createHistory(
    canUseDOM ? window : createMemorySource()
  );
  const { navigate } = globalHistory;

  /**
   * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
   *
   * https://github.com/reach/router/blob/master/LICENSE
   * */

  const paramRe = /^:(.+)/;

  const SEGMENT_POINTS = 4;
  const STATIC_POINTS = 3;
  const DYNAMIC_POINTS = 2;
  const SPLAT_PENALTY = 1;
  const ROOT_POINTS = 1;

  /**
   * Check if `segment` is a root segment
   * @param {string} segment
   * @return {boolean}
   */
  function isRootSegment(segment) {
    return segment === "";
  }

  /**
   * Check if `segment` is a dynamic segment
   * @param {string} segment
   * @return {boolean}
   */
  function isDynamic(segment) {
    return paramRe.test(segment);
  }

  /**
   * Check if `segment` is a splat
   * @param {string} segment
   * @return {boolean}
   */
  function isSplat(segment) {
    return segment[0] === "*";
  }

  /**
   * Split up the URI into segments delimited by `/`
   * @param {string} uri
   * @return {string[]}
   */
  function segmentize(uri) {
    return (
      uri
        // Strip starting/ending `/`
        .replace(/(^\/+|\/+$)/g, "")
        .split("/")
    );
  }

  /**
   * Strip `str` of potential start and end `/`
   * @param {string} str
   * @return {string}
   */
  function stripSlashes(str) {
    return str.replace(/(^\/+|\/+$)/g, "");
  }

  /**
   * Score a route depending on how its individual segments look
   * @param {object} route
   * @param {number} index
   * @return {object}
   */
  function rankRoute(route, index) {
    const score = route.default
      ? 0
      : segmentize(route.path).reduce((score, segment) => {
          score += SEGMENT_POINTS;

          if (isRootSegment(segment)) {
            score += ROOT_POINTS;
          } else if (isDynamic(segment)) {
            score += DYNAMIC_POINTS;
          } else if (isSplat(segment)) {
            score -= SEGMENT_POINTS + SPLAT_PENALTY;
          } else {
            score += STATIC_POINTS;
          }

          return score;
        }, 0);

    return { route, score, index };
  }

  /**
   * Give a score to all routes and sort them on that
   * @param {object[]} routes
   * @return {object[]}
   */
  function rankRoutes(routes) {
    return (
      routes
        .map(rankRoute)
        // If two routes have the exact same score, we go by index instead
        .sort((a, b) =>
          a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
        )
    );
  }

  /**
   * Ranks and picks the best route to match. Each segment gets the highest
   * amount of points, then the type of segment gets an additional amount of
   * points where
   *
   *  static > dynamic > splat > root
   *
   * This way we don't have to worry about the order of our routes, let the
   * computers do it.
   *
   * A route looks like this
   *
   *  { path, default, value }
   *
   * And a returned match looks like:
   *
   *  { route, params, uri }
   *
   * @param {object[]} routes
   * @param {string} uri
   * @return {?object}
   */
  function pick(routes, uri) {
    let match;
    let default_;

    const [uriPathname] = uri.split("?");
    const uriSegments = segmentize(uriPathname);
    const isRootUri = uriSegments[0] === "";
    const ranked = rankRoutes(routes);

    for (let i = 0, l = ranked.length; i < l; i++) {
      const route = ranked[i].route;
      let missed = false;

      if (route.default) {
        default_ = {
          route,
          params: {},
          uri
        };
        continue;
      }

      const routeSegments = segmentize(route.path);
      const params = {};
      const max = Math.max(uriSegments.length, routeSegments.length);
      let index = 0;

      for (; index < max; index++) {
        const routeSegment = routeSegments[index];
        const uriSegment = uriSegments[index];

        if (routeSegment !== undefined && isSplat(routeSegment)) {
          // Hit a splat, just grab the rest, and return a match
          // uri:   /files/documents/work
          // route: /files/* or /files/*splatname
          const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

          params[splatName] = uriSegments
            .slice(index)
            .map(decodeURIComponent)
            .join("/");
          break;
        }

        if (uriSegment === undefined) {
          // URI is shorter than the route, no match
          // uri:   /users
          // route: /users/:userId
          missed = true;
          break;
        }

        let dynamicMatch = paramRe.exec(routeSegment);

        if (dynamicMatch && !isRootUri) {
          const value = decodeURIComponent(uriSegment);
          params[dynamicMatch[1]] = value;
        } else if (routeSegment !== uriSegment) {
          // Current segments don't match, not dynamic, not splat, so no match
          // uri:   /users/123/settings
          // route: /users/:id/profile
          missed = true;
          break;
        }
      }

      if (!missed) {
        match = {
          route,
          params,
          uri: "/" + uriSegments.slice(0, index).join("/")
        };
        break;
      }
    }

    return match || default_ || null;
  }

  /**
   * Check if the `path` matches the `uri`.
   * @param {string} path
   * @param {string} uri
   * @return {?object}
   */
  function match(route, uri) {
    return pick([route], uri);
  }

  /**
   * Combines the `basepath` and the `path` into one path.
   * @param {string} basepath
   * @param {string} path
   */
  function combinePaths(basepath, path) {
    return `${stripSlashes(
      path === "/"
        ? basepath
        : `${stripSlashes(basepath)}/${stripSlashes(path)}`
    )}/`;
  }

  /**
   * Decides whether a given `event` should result in a navigation or not.
   * @param {object} event
   */
  function shouldNavigate(event) {
    return (
      !event.defaultPrevented &&
      event.button === 0 &&
      !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
    );
  }

  function hostMatches(anchor) {
    const host = location.host;
    return (
      anchor.host == host ||
      // svelte seems to kill anchor.host value in ie11, so fall back to checking href
      anchor.href.indexOf(`https://${host}`) === 0 ||
      anchor.href.indexOf(`http://${host}`) === 0
    );
  }

  /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.20.1 */

  function create_fragment(ctx) {
    let current;
    const default_slot_template = /*$$slots*/ ctx[16].default;
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/ ctx[15],
      null
    );

    const block = {
      c: function create() {
        if (default_slot) default_slot.c();
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        if (default_slot) {
          default_slot.m(target, anchor);
        }

        current = true;
      },
      p: function update(ctx, [dirty]) {
        if (default_slot) {
          if (default_slot.p && dirty & /*$$scope*/ 32768) {
            default_slot.p(
              get_slot_context(
                default_slot_template,
                ctx,
                /*$$scope*/ ctx[15],
                null
              ),
              get_slot_changes(
                default_slot_template,
                /*$$scope*/ ctx[15],
                dirty,
                null
              )
            );
          }
        }
      },
      i: function intro(local) {
        if (current) return;
        transition_in(default_slot, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d: function destroy(detaching) {
        if (default_slot) default_slot.d(detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance($$self, $$props, $$invalidate) {
    let $base;
    let $location;
    let $routes;
    let { basepath = "/" } = $$props;
    let { url = null } = $$props;
    const locationContext = getContext(LOCATION);
    const routerContext = getContext(ROUTER);
    const routes = writable([]);
    validate_store(routes, "routes");
    component_subscribe($$self, routes, value =>
      $$invalidate(8, ($routes = value))
    );
    const activeRoute = writable(null);
    let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

    // If locationContext is not set, this is the topmost Router in the tree.
    // If the `url` prop is given we force the location to it.
    const location =
      locationContext ||
      writable(url ? { pathname: url } : globalHistory.location);

    validate_store(location, "location");
    component_subscribe($$self, location, value =>
      $$invalidate(7, ($location = value))
    );

    // If routerContext is set, the routerBase of the parent Router
    // will be the base for this Router's descendants.
    // If routerContext is not set, the path and resolved uri will both
    // have the value of the basepath prop.
    const base = routerContext
      ? routerContext.routerBase
      : writable({ path: basepath, uri: basepath });

    validate_store(base, "base");
    component_subscribe($$self, base, value =>
      $$invalidate(6, ($base = value))
    );

    const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
      // If there is no activeRoute, the routerBase will be identical to the base.
      if (activeRoute === null) {
        return base;
      }

      const { path: basepath } = base;
      const { route, uri } = activeRoute;

      // Remove the potential /* or /*splatname from
      // the end of the child Routes relative paths.
      const path = route.default ? basepath : route.path.replace(/\*.*$/, "");

      return { path, uri };
    });

    function registerRoute(route) {
      const { path: basepath } = $base;
      let { path } = route;

      // We store the original path in the _path property so we can reuse
      // it when the basepath changes. The only thing that matters is that
      // the route reference is intact, so mutation is fine.
      route._path = path;

      route.path = combinePaths(basepath, path);

      if (typeof window === "undefined") {
        // In SSR we should set the activeRoute immediately if it is a match.
        // If there are more Routes being registered after a match is found,
        // we just skip them.
        if (hasActiveRoute) {
          return;
        }

        const matchingRoute = match(route, $location.pathname);

        if (matchingRoute) {
          activeRoute.set(matchingRoute);
          hasActiveRoute = true;
        }
      } else {
        routes.update(rs => {
          rs.push(route);
          return rs;
        });
      }
    }

    function unregisterRoute(route) {
      routes.update(rs => {
        const index = rs.indexOf(route);
        rs.splice(index, 1);
        return rs;
      });
    }

    if (!locationContext) {
      // The topmost Router in the tree is responsible for updating
      // the location store and supplying it through context.
      onMount(() => {
        const unlisten = globalHistory.listen(history => {
          location.set(history.location);
        });

        return unlisten;
      });

      setContext(LOCATION, location);
    }

    setContext(ROUTER, {
      activeRoute,
      base,
      routerBase,
      registerRoute,
      unregisterRoute
    });

    const writable_props = ["basepath", "url"];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Router> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Router", $$slots, ["default"]);

    $$self.$set = $$props => {
      if ("basepath" in $$props) $$invalidate(3, (basepath = $$props.basepath));
      if ("url" in $$props) $$invalidate(4, (url = $$props.url));
      if ("$$scope" in $$props) $$invalidate(15, ($$scope = $$props.$$scope));
    };

    $$self.$capture_state = () => ({
      getContext,
      setContext,
      onMount,
      writable,
      derived,
      LOCATION,
      ROUTER,
      globalHistory,
      pick,
      match,
      stripSlashes,
      combinePaths,
      basepath,
      url,
      locationContext,
      routerContext,
      routes,
      activeRoute,
      hasActiveRoute,
      location,
      base,
      routerBase,
      registerRoute,
      unregisterRoute,
      $base,
      $location,
      $routes
    });

    $$self.$inject_state = $$props => {
      if ("basepath" in $$props) $$invalidate(3, (basepath = $$props.basepath));
      if ("url" in $$props) $$invalidate(4, (url = $$props.url));
      if ("hasActiveRoute" in $$props) hasActiveRoute = $$props.hasActiveRoute;
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*$base*/ 64) {
        // This reactive statement will update all the Routes' path when
        // the basepath changes.
        {
          const { path: basepath } = $base;

          routes.update(rs => {
            rs.forEach(r => (r.path = combinePaths(basepath, r._path)));
            return rs;
          });
        }
      }

      if ($$self.$$.dirty & /*$routes, $location*/ 384) {
        // This reactive statement will be run when the Router is created
        // when there are no Routes and then again the following tick, so it
        // will not find an active Route in SSR and in the browser it will only
        // pick an active Route after all Routes have been registered.
        {
          const bestMatch = pick($routes, $location.pathname);
          activeRoute.set(bestMatch);
        }
      }
    };

    return [
      routes,
      location,
      base,
      basepath,
      url,
      hasActiveRoute,
      $base,
      $location,
      $routes,
      locationContext,
      routerContext,
      activeRoute,
      routerBase,
      registerRoute,
      unregisterRoute,
      $$scope,
      $$slots
    ];
  }

  class Router extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance, create_fragment, safe_not_equal, {
        basepath: 3,
        url: 4
      });

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Router",
        options,
        id: create_fragment.name
      });
    }

    get basepath() {
      throw new Error(
        "<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set basepath(value) {
      throw new Error(
        "<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get url() {
      throw new Error(
        "<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set url(value) {
      throw new Error(
        "<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }
  }

  /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.20.1 */

  const get_default_slot_changes = dirty => ({
    params: dirty & /*routeParams*/ 2,
    location: dirty & /*$location*/ 16
  });

  const get_default_slot_context = ctx => ({
    params: /*routeParams*/ ctx[1],
    location: /*$location*/ ctx[4]
  });

  // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
  function create_if_block(ctx) {
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [create_if_block_1, create_else_block];
    const if_blocks = [];

    function select_block_type(ctx, dirty) {
      if (/*component*/ ctx[0] !== null) return 0;
      return 1;
    }

    current_block_type_index = select_block_type(ctx);
    if_block = if_blocks[current_block_type_index] = if_block_creators[
      current_block_type_index
    ](ctx);

    const block = {
      c: function create() {
        if_block.c();
        if_block_anchor = empty();
      },
      m: function mount(target, anchor) {
        if_blocks[current_block_type_index].m(target, anchor);
        insert_dev(target, if_block_anchor, anchor);
        current = true;
      },
      p: function update(ctx, dirty) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx);

        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx, dirty);
        } else {
          group_outros();

          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });

          check_outros();
          if_block = if_blocks[current_block_type_index];

          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[
              current_block_type_index
            ](ctx);
            if_block.c();
          }

          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i: function intro(local) {
        if (current) return;
        transition_in(if_block);
        current = true;
      },
      o: function outro(local) {
        transition_out(if_block);
        current = false;
      },
      d: function destroy(detaching) {
        if_blocks[current_block_type_index].d(detaching);
        if (detaching) detach_dev(if_block_anchor);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_if_block.name,
      type: "if",
      source:
        "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
      ctx
    });

    return block;
  }

  // (43:2) {:else}
  function create_else_block(ctx) {
    let current;
    const default_slot_template = /*$$slots*/ ctx[13].default;
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/ ctx[12],
      get_default_slot_context
    );

    const block = {
      c: function create() {
        if (default_slot) default_slot.c();
      },
      m: function mount(target, anchor) {
        if (default_slot) {
          default_slot.m(target, anchor);
        }

        current = true;
      },
      p: function update(ctx, dirty) {
        if (default_slot) {
          if (
            default_slot.p &&
            dirty & /*$$scope, routeParams, $location*/ 4114
          ) {
            default_slot.p(
              get_slot_context(
                default_slot_template,
                ctx,
                /*$$scope*/ ctx[12],
                get_default_slot_context
              ),
              get_slot_changes(
                default_slot_template,
                /*$$scope*/ ctx[12],
                dirty,
                get_default_slot_changes
              )
            );
          }
        }
      },
      i: function intro(local) {
        if (current) return;
        transition_in(default_slot, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d: function destroy(detaching) {
        if (default_slot) default_slot.d(detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_else_block.name,
      type: "else",
      source: "(43:2) {:else}",
      ctx
    });

    return block;
  }

  // (41:2) {#if component !== null}
  function create_if_block_1(ctx) {
    let switch_instance_anchor;
    let current;

    const switch_instance_spread_levels = [
      { location: /*$location*/ ctx[4] },
      /*routeParams*/ ctx[1],
      /*routeProps*/ ctx[2]
    ];

    var switch_value = /*component*/ ctx[0];

    function switch_props(ctx) {
      let switch_instance_props = {};

      for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
        switch_instance_props = assign(
          switch_instance_props,
          switch_instance_spread_levels[i]
        );
      }

      return {
        props: switch_instance_props,
        $$inline: true
      };
    }

    if (switch_value) {
      var switch_instance = new switch_value(switch_props());
    }

    const block = {
      c: function create() {
        if (switch_instance) create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
      },
      m: function mount(target, anchor) {
        if (switch_instance) {
          mount_component(switch_instance, target, anchor);
        }

        insert_dev(target, switch_instance_anchor, anchor);
        current = true;
      },
      p: function update(ctx, dirty) {
        const switch_instance_changes =
          dirty & /*$location, routeParams, routeProps*/ 22
            ? get_spread_update(switch_instance_spread_levels, [
                dirty & /*$location*/ 16 && { location: /*$location*/ ctx[4] },
                dirty & /*routeParams*/ 2 &&
                  get_spread_object(/*routeParams*/ ctx[1]),
                dirty & /*routeProps*/ 4 &&
                  get_spread_object(/*routeProps*/ ctx[2])
              ])
            : {};

        if (switch_value !== (switch_value = /*component*/ ctx[0])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;

            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });

            check_outros();
          }

          if (switch_value) {
            switch_instance = new switch_value(switch_props());
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(
              switch_instance,
              switch_instance_anchor.parentNode,
              switch_instance_anchor
            );
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          switch_instance.$set(switch_instance_changes);
        }
      },
      i: function intro(local) {
        if (current) return;
        if (switch_instance) transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        if (switch_instance) transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(switch_instance_anchor);
        if (switch_instance) destroy_component(switch_instance, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_if_block_1.name,
      type: "if",
      source: "(41:2) {#if component !== null}",
      ctx
    });

    return block;
  }

  function create_fragment$1(ctx) {
    let if_block_anchor;
    let current;
    let if_block =
      /*$activeRoute*/ ctx[3] !== null &&
      /*$activeRoute*/ ctx[3].route === /*route*/ ctx[7] &&
      create_if_block(ctx);

    const block = {
      c: function create() {
        if (if_block) if_block.c();
        if_block_anchor = empty();
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        if (if_block) if_block.m(target, anchor);
        insert_dev(target, if_block_anchor, anchor);
        current = true;
      },
      p: function update(ctx, [dirty]) {
        if (
          /*$activeRoute*/ ctx[3] !== null &&
          /*$activeRoute*/ ctx[3].route === /*route*/ ctx[7]
        ) {
          if (if_block) {
            if_block.p(ctx, dirty);
            transition_in(if_block, 1);
          } else {
            if_block = create_if_block(ctx);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();

          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });

          check_outros();
        }
      },
      i: function intro(local) {
        if (current) return;
        transition_in(if_block);
        current = true;
      },
      o: function outro(local) {
        transition_out(if_block);
        current = false;
      },
      d: function destroy(detaching) {
        if (if_block) if_block.d(detaching);
        if (detaching) detach_dev(if_block_anchor);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$1.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$1($$self, $$props, $$invalidate) {
    let $activeRoute;
    let $location;
    let { path = "" } = $$props;
    let { component = null } = $$props;
    const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    validate_store(activeRoute, "activeRoute");
    component_subscribe($$self, activeRoute, value =>
      $$invalidate(3, ($activeRoute = value))
    );
    const location = getContext(LOCATION);
    validate_store(location, "location");
    component_subscribe($$self, location, value =>
      $$invalidate(4, ($location = value))
    );

    const route = {
      path,
      // If no path prop is given, this Route will act as the default Route
      // that is rendered if no other Route in the Router is a match.
      default: path === ""
    };

    let routeParams = {};
    let routeProps = {};
    registerRoute(route);

    // There is no need to unregister Routes in SSR since it will all be
    // thrown away anyway.
    if (typeof window !== "undefined") {
      onDestroy(() => {
        unregisterRoute(route);
      });
    }

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Route", $$slots, ["default"]);

    $$self.$set = $$new_props => {
      $$invalidate(
        11,
        ($$props = assign(
          assign({}, $$props),
          exclude_internal_props($$new_props)
        ))
      );
      if ("path" in $$new_props) $$invalidate(8, (path = $$new_props.path));
      if ("component" in $$new_props)
        $$invalidate(0, (component = $$new_props.component));
      if ("$$scope" in $$new_props)
        $$invalidate(12, ($$scope = $$new_props.$$scope));
    };

    $$self.$capture_state = () => ({
      getContext,
      onDestroy,
      ROUTER,
      LOCATION,
      path,
      component,
      registerRoute,
      unregisterRoute,
      activeRoute,
      location,
      route,
      routeParams,
      routeProps,
      $activeRoute,
      $location
    });

    $$self.$inject_state = $$new_props => {
      $$invalidate(11, ($$props = assign(assign({}, $$props), $$new_props)));
      if ("path" in $$props) $$invalidate(8, (path = $$new_props.path));
      if ("component" in $$props)
        $$invalidate(0, (component = $$new_props.component));
      if ("routeParams" in $$props)
        $$invalidate(1, (routeParams = $$new_props.routeParams));
      if ("routeProps" in $$props)
        $$invalidate(2, (routeProps = $$new_props.routeProps));
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*$activeRoute*/ 8) {
        if ($activeRoute && $activeRoute.route === route) {
          $$invalidate(1, (routeParams = $activeRoute.params));
        }
      }

      {
        const { path, component, ...rest } = $$props;
        $$invalidate(2, (routeProps = rest));
      }
    };

    $$props = exclude_internal_props($$props);

    return [
      component,
      routeParams,
      routeProps,
      $activeRoute,
      $location,
      activeRoute,
      location,
      route,
      path,
      registerRoute,
      unregisterRoute,
      $$props,
      $$scope,
      $$slots
    ];
  }

  class Route extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$1, create_fragment$1, safe_not_equal, {
        path: 8,
        component: 0
      });

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Route",
        options,
        id: create_fragment$1.name
      });
    }

    get path() {
      throw new Error(
        "<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set path(value) {
      throw new Error(
        "<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get component() {
      throw new Error(
        "<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set component(value) {
      throw new Error(
        "<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }
  }

  /**
   * A link action that can be added to <a href=""> tags rather
   * than using the <Link> component.
   *
   * Example:
   * ```html
   * <a href="/post/{postId}" use:link>{post.title}</a>
   * ```
   */
  function link(node) {
    function onClick(event) {
      const anchor = event.currentTarget;

      if (
        anchor.target === "" &&
        hostMatches(anchor) &&
        shouldNavigate(event)
      ) {
        event.preventDefault();
        navigate(anchor.pathname + anchor.search, {
          replace: anchor.hasAttribute("replace")
        });
      }
    }

    node.addEventListener("click", onClick);

    return {
      destroy() {
        node.removeEventListener("click", onClick);
      }
    };
  }

  /* src/components/Navigation.svelte generated by Svelte v3.20.1 */
  const file = "src/components/Navigation.svelte";

  function create_fragment$2(ctx) {
    let nav;
    let div1;
    let a0;
    let h3;
    let link_action;
    let t1;
    let button;
    let span;
    let t2;
    let div0;
    let ul;
    let li0;
    let a1;
    let link_action_1;
    let t4;
    let li1;
    let a2;
    let link_action_2;
    let t6;
    let li2;
    let a3;
    let link_action_3;
    let t8;
    let li3;
    let a4;
    let link_action_4;
    let t10;
    let li4;
    let a5;
    let link_action_5;
    let dispose;

    const block = {
      c: function create() {
        nav = element("nav");
        div1 = element("div");
        a0 = element("a");
        h3 = element("h3");
        h3.textContent = "vacom";
        t1 = space();
        button = element("button");
        span = element("span");
        t2 = space();
        div0 = element("div");
        ul = element("ul");
        li0 = element("li");
        a1 = element("a");
        a1.textContent = "Home";
        t4 = space();
        li1 = element("li");
        a2 = element("a");
        a2.textContent = "About";
        t6 = space();
        li2 = element("li");
        a3 = element("a");
        a3.textContent = "Projects";
        t8 = space();
        li3 = element("li");
        a4 = element("a");
        a4.textContent = "Open-source";
        t10 = space();
        li4 = element("li");
        a5 = element("a");
        a5.textContent = "Themes";
        add_location(h3, file, 38, 6, 766);
        attr_dev(a0, "class", "navbar-brand svelte-4uxev7");
        attr_dev(a0, "href", "/");
        add_location(a0, file, 37, 4, 717);
        attr_dev(span, "class", "ti-align-justify");
        add_location(span, file, 45, 6, 898);
        attr_dev(button, "class", "navbar-toggler collapsed");
        attr_dev(button, "type", "button");
        attr_dev(button, "data-toggle", "collapse");
        add_location(button, file, 41, 4, 795);
        attr_dev(a1, "class", "nav-link svelte-4uxev7");
        attr_dev(a1, "href", "/");
        add_location(a1, file, 51, 10, 1097);
        attr_dev(li0, "class", "nav-item active");
        add_location(li0, file, 50, 8, 1058);
        attr_dev(a2, "class", "nav-link svelte-4uxev7");
        attr_dev(a2, "href", "/about");
        add_location(a2, file, 55, 10, 1199);
        attr_dev(li1, "class", "nav-item");
        add_location(li1, file, 54, 8, 1167);
        attr_dev(a3, "class", "nav-link svelte-4uxev7");
        attr_dev(a3, "href", "/projects");
        add_location(a3, file, 59, 10, 1307);
        attr_dev(li2, "class", "nav-item");
        add_location(li2, file, 58, 8, 1275);
        attr_dev(a4, "class", "nav-link svelte-4uxev7");
        attr_dev(a4, "href", "/opensource");
        add_location(a4, file, 63, 10, 1421);
        attr_dev(li3, "class", "nav-item");
        add_location(li3, file, 62, 8, 1389);
        attr_dev(a5, "class", "nav-link svelte-4uxev7");
        attr_dev(a5, "href", "/themes");
        add_location(a5, file, 67, 10, 1540);
        attr_dev(li4, "class", "nav-item");
        add_location(li4, file, 66, 8, 1508);
        attr_dev(ul, "class", "navbar-nav ml-auto svelte-4uxev7");
        add_location(ul, file, 49, 6, 1018);
        attr_dev(div0, "class", "collapse navbar-collapse");
        attr_dev(div0, "id", "navbarsExample09");
        add_location(div0, file, 48, 4, 951);
        attr_dev(div1, "class", "container");
        add_location(div1, file, 36, 2, 689);
        attr_dev(
          nav,
          "class",
          "navbar navbar-expand-lg main-nav  svelte-4uxev7"
        );
        attr_dev(nav, "id", "navbar");
        add_location(nav, file, 35, 0, 627);
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor, remount) {
        insert_dev(target, nav, anchor);
        append_dev(nav, div1);
        append_dev(div1, a0);
        append_dev(a0, h3);
        append_dev(div1, t1);
        append_dev(div1, button);
        append_dev(button, span);
        append_dev(div1, t2);
        append_dev(div1, div0);
        append_dev(div0, ul);
        append_dev(ul, li0);
        append_dev(li0, a1);
        append_dev(ul, t4);
        append_dev(ul, li1);
        append_dev(li1, a2);
        append_dev(ul, t6);
        append_dev(ul, li2);
        append_dev(li2, a3);
        append_dev(ul, t8);
        append_dev(ul, li3);
        append_dev(li3, a4);
        append_dev(ul, t10);
        append_dev(ul, li4);
        append_dev(li4, a5);
        if (remount) run_all(dispose);

        dispose = [
          action_destroyer((link_action = link.call(null, a0))),
          action_destroyer((link_action_1 = link.call(null, a1))),
          action_destroyer((link_action_2 = link.call(null, a2))),
          action_destroyer((link_action_3 = link.call(null, a3))),
          action_destroyer((link_action_4 = link.call(null, a4))),
          action_destroyer((link_action_5 = link.call(null, a5)))
        ];
      },
      p: noop,
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(nav);
        run_all(dispose);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$2.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$2($$self, $$props, $$invalidate) {
    const writable_props = [];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Navigation> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Navigation", $$slots, []);
    $$self.$capture_state = () => ({ link });
    return [];
  }

  class Navigation extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Navigation",
        options,
        id: create_fragment$2.name
      });
    }
  }

  function fade(node, { delay = 0, duration = 400, easing = identity }) {
    const o = +getComputedStyle(node).opacity;
    return {
      delay,
      duration,
      easing,
      css: t => `opacity: ${t * o}`
    };
  }

  /* src/components/Hero.svelte generated by Svelte v3.20.1 */
  const file$1 = "src/components/Hero.svelte";

  function create_fragment$3(ctx) {
    let section;
    let div2;
    let div1;
    let div0;
    let h2;
    let t0;
    let t1;
    let br;
    let t2;
    let span;
    let b;
    let t3;
    let t4;
    let p;
    let t5;
    let section_transition;
    let current;

    const block = {
      c: function create() {
        section = element("section");
        div2 = element("div");
        div1 = element("div");
        div0 = element("div");
        h2 = element("h2");
        t0 = text(/*initialText*/ ctx[0]);
        t1 = space();
        br = element("br");
        t2 = space();
        span = element("span");
        b = element("b");
        t3 = text(/*text*/ ctx[1]);
        t4 = space();
        p = element("p");
        t5 = text(/*description*/ ctx[2]);
        add_location(br, file$1, 60, 10, 1123);
        add_location(b, file$1, 62, 12, 1195);
        attr_dev(span, "class", "cd-words-wrapper text-color svelte-tkao10");
        add_location(span, file$1, 61, 10, 1140);
        attr_dev(
          h2,
          "class",
          "cd-headline clip is-full-width mb-4  svelte-tkao10"
        );
        add_location(h2, file$1, 58, 8, 1039);
        add_location(p, file$1, 65, 8, 1249);
        attr_dev(div0, "class", "col-lg-10");
        add_location(div0, file$1, 57, 6, 1007);
        attr_dev(div1, "class", "row");
        add_location(div1, file$1, 56, 4, 983);
        attr_dev(div2, "class", "container");
        add_location(div2, file$1, 55, 2, 955);
        attr_dev(section, "class", "section banner svelte-tkao10");
        add_location(section, file$1, 54, 0, 904);
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        insert_dev(target, section, anchor);
        append_dev(section, div2);
        append_dev(div2, div1);
        append_dev(div1, div0);
        append_dev(div0, h2);
        append_dev(h2, t0);
        append_dev(h2, t1);
        append_dev(h2, br);
        append_dev(h2, t2);
        append_dev(h2, span);
        append_dev(span, b);
        append_dev(b, t3);
        append_dev(div0, t4);
        append_dev(div0, p);
        append_dev(p, t5);
        current = true;
      },
      p: function update(ctx, [dirty]) {
        if (!current || dirty & /*initialText*/ 1)
          set_data_dev(t0, /*initialText*/ ctx[0]);
        if (!current || dirty & /*text*/ 2) set_data_dev(t3, /*text*/ ctx[1]);
        if (!current || dirty & /*description*/ 4)
          set_data_dev(t5, /*description*/ ctx[2]);
      },
      i: function intro(local) {
        if (current) return;

        add_render_callback(() => {
          if (!section_transition)
            section_transition = create_bidirectional_transition(
              section,
              fade,
              {},
              true
            );
          section_transition.run(1);
        });

        current = true;
      },
      o: function outro(local) {
        if (!section_transition)
          section_transition = create_bidirectional_transition(
            section,
            fade,
            {},
            false
          );
        section_transition.run(0);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(section);
        if (detaching && section_transition) section_transition.end();
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$3.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$3($$self, $$props, $$invalidate) {
    let { initialText = "A great initial text" } = $$props;
    let { text = "A great text to describe" } = $$props;
    let { description = `A great description to show` } = $$props;
    const writable_props = ["initialText", "text", "description"];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Hero> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Hero", $$slots, []);

    $$self.$set = $$props => {
      if ("initialText" in $$props)
        $$invalidate(0, (initialText = $$props.initialText));
      if ("text" in $$props) $$invalidate(1, (text = $$props.text));
      if ("description" in $$props)
        $$invalidate(2, (description = $$props.description));
    };

    $$self.$capture_state = () => ({ fade, initialText, text, description });

    $$self.$inject_state = $$props => {
      if ("initialText" in $$props)
        $$invalidate(0, (initialText = $$props.initialText));
      if ("text" in $$props) $$invalidate(1, (text = $$props.text));
      if ("description" in $$props)
        $$invalidate(2, (description = $$props.description));
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [initialText, text, description];
  }

  class Hero extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$3, create_fragment$3, safe_not_equal, {
        initialText: 0,
        text: 1,
        description: 2
      });

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Hero",
        options,
        id: create_fragment$3.name
      });
    }

    get initialText() {
      throw new Error(
        "<Hero>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set initialText(value) {
      throw new Error(
        "<Hero>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get text() {
      throw new Error(
        "<Hero>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set text(value) {
      throw new Error(
        "<Hero>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get description() {
      throw new Error(
        "<Hero>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set description(value) {
      throw new Error(
        "<Hero>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }
  }

  /* src/components/Footer.svelte generated by Svelte v3.20.1 */

  const file$2 = "src/components/Footer.svelte";

  function create_fragment$4(ctx) {
    let section;
    let div4;
    let div3;
    let div0;
    let p;
    let t0;
    let t1;
    let a0;
    let t2;
    let t3;
    let div2;
    let div1;
    let ul;
    let li0;
    let a1;
    let i0;
    let t4;
    let li1;
    let a2;
    let i1;
    let t5;
    let li2;
    let a3;
    let i2;
    let t6;
    let li3;
    let a4;
    let i3;
    let t7;
    let li4;
    let a5;
    let i4;

    const block = {
      c: function create() {
        section = element("section");
        div4 = element("div");
        div3 = element("div");
        div0 = element("div");
        p = element("p");
        t0 = text(/*text*/ ctx[0]);
        t1 = space();
        a0 = element("a");
        t2 = text(/*author*/ ctx[1]);
        t3 = space();
        div2 = element("div");
        div1 = element("div");
        ul = element("ul");
        li0 = element("li");
        a1 = element("a");
        i0 = element("i");
        t4 = space();
        li1 = element("li");
        a2 = element("a");
        i1 = element("i");
        t5 = space();
        li2 = element("li");
        a3 = element("a");
        i2 = element("i");
        t6 = space();
        li3 = element("li");
        a4 = element("a");
        i3 = element("i");
        t7 = space();
        li4 = element("li");
        a5 = element("a");
        i4 = element("i");
        attr_dev(a0, "href", /*url*/ ctx[2]);
        attr_dev(a0, "target", "_blank");
        attr_dev(a0, "class", "text-white");
        add_location(a0, file$2, 37, 10, 864);
        attr_dev(p, "class", "copy mb-0 svelte-1c4133f");
        add_location(p, file$2, 35, 8, 815);
        attr_dev(div0, "class", "col-lg-6");
        add_location(div0, file$2, 34, 6, 784);
        attr_dev(i0, "class", "fab fa-facebook-f");
        add_location(i0, file$2, 45, 16, 1199);
        attr_dev(a1, "href", /*facebook*/ ctx[3]);
        attr_dev(a1, "target", "_blank");
        attr_dev(a1, "class", "svelte-1c4133f");
        add_location(a1, file$2, 44, 14, 1147);
        attr_dev(li0, "class", "list-inline-item");
        add_location(li0, file$2, 43, 12, 1103);
        attr_dev(i1, "class", "fab fa-twitter");
        add_location(i1, file$2, 50, 16, 1375);
        attr_dev(a2, "href", /*twitter*/ ctx[4]);
        attr_dev(a2, "target", "_blank");
        attr_dev(a2, "class", "svelte-1c4133f");
        add_location(a2, file$2, 49, 14, 1324);
        attr_dev(li1, "class", "list-inline-item");
        add_location(li1, file$2, 48, 12, 1280);
        attr_dev(i2, "class", "fab fa-github");
        add_location(i2, file$2, 55, 16, 1547);
        attr_dev(a3, "href", /*github*/ ctx[5]);
        attr_dev(a3, "target", "_blank");
        attr_dev(a3, "class", "svelte-1c4133f");
        add_location(a3, file$2, 54, 14, 1497);
        attr_dev(li2, "class", "list-inline-item");
        add_location(li2, file$2, 53, 12, 1453);
        attr_dev(i3, "class", "fab fa-linkedin-in");
        add_location(i3, file$2, 60, 16, 1720);
        attr_dev(a4, "href", /*linkedin*/ ctx[6]);
        attr_dev(a4, "target", "_blank");
        attr_dev(a4, "class", "svelte-1c4133f");
        add_location(a4, file$2, 59, 14, 1668);
        attr_dev(li3, "class", "list-inline-item");
        add_location(li3, file$2, 58, 12, 1624);
        attr_dev(i4, "class", "fas fa-store");
        add_location(i4, file$2, 65, 16, 1895);
        attr_dev(a5, "href", /*store*/ ctx[7]);
        attr_dev(a5, "target", "_blank");
        attr_dev(a5, "class", "svelte-1c4133f");
        add_location(a5, file$2, 64, 14, 1846);
        attr_dev(li4, "class", "list-inline-item");
        add_location(li4, file$2, 63, 12, 1802);
        attr_dev(ul, "class", "list-inline mb-0");
        add_location(ul, file$2, 42, 10, 1061);
        attr_dev(
          div1,
          "class",
          "widget footer-widget text-lg-right mt-5 mt-lg-0 svelte-1c4133f"
        );
        add_location(div1, file$2, 41, 8, 989);
        attr_dev(div2, "class", "col-lg-6");
        add_location(div2, file$2, 40, 6, 958);
        attr_dev(div3, "class", "row ");
        add_location(div3, file$2, 33, 4, 759);
        attr_dev(div4, "class", "container");
        add_location(div4, file$2, 32, 2, 731);
        attr_dev(section, "class", "footer svelte-1c4133f");
        add_location(section, file$2, 31, 0, 704);
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        insert_dev(target, section, anchor);
        append_dev(section, div4);
        append_dev(div4, div3);
        append_dev(div3, div0);
        append_dev(div0, p);
        append_dev(p, t0);
        append_dev(p, t1);
        append_dev(p, a0);
        append_dev(a0, t2);
        append_dev(div3, t3);
        append_dev(div3, div2);
        append_dev(div2, div1);
        append_dev(div1, ul);
        append_dev(ul, li0);
        append_dev(li0, a1);
        append_dev(a1, i0);
        append_dev(ul, t4);
        append_dev(ul, li1);
        append_dev(li1, a2);
        append_dev(a2, i1);
        append_dev(ul, t5);
        append_dev(ul, li2);
        append_dev(li2, a3);
        append_dev(a3, i2);
        append_dev(ul, t6);
        append_dev(ul, li3);
        append_dev(li3, a4);
        append_dev(a4, i3);
        append_dev(ul, t7);
        append_dev(ul, li4);
        append_dev(li4, a5);
        append_dev(a5, i4);
      },
      p: function update(ctx, [dirty]) {
        if (dirty & /*text*/ 1) set_data_dev(t0, /*text*/ ctx[0]);
        if (dirty & /*author*/ 2) set_data_dev(t2, /*author*/ ctx[1]);

        if (dirty & /*url*/ 4) {
          attr_dev(a0, "href", /*url*/ ctx[2]);
        }

        if (dirty & /*facebook*/ 8) {
          attr_dev(a1, "href", /*facebook*/ ctx[3]);
        }

        if (dirty & /*twitter*/ 16) {
          attr_dev(a2, "href", /*twitter*/ ctx[4]);
        }

        if (dirty & /*github*/ 32) {
          attr_dev(a3, "href", /*github*/ ctx[5]);
        }

        if (dirty & /*linkedin*/ 64) {
          attr_dev(a4, "href", /*linkedin*/ ctx[6]);
        }

        if (dirty & /*store*/ 128) {
          attr_dev(a5, "href", /*store*/ ctx[7]);
        }
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(section);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$4.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$4($$self, $$props, $$invalidate) {
    let { text = "Copyrights © 2020. " } = $$props;
    let { author = "Vitor Amaral | vacom" } = $$props;
    let { url = "https://www.linkedin.com/in/vacom/" } = $$props;
    let { facebook = "https://www.facebook.com/storytics.studio" } = $$props;
    let { twitter = "https://twitter.com/vacom_me" } = $$props;
    let { github = "https://github.com/vacom" } = $$props;
    let { linkedin = "https://www.linkedin.com/in/vacom/" } = $$props;
    let { store = "https://creativemarket.com/storytics" } = $$props;
    const writable_props = [
      "text",
      "author",
      "url",
      "facebook",
      "twitter",
      "github",
      "linkedin",
      "store"
    ];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Footer> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Footer", $$slots, []);

    $$self.$set = $$props => {
      if ("text" in $$props) $$invalidate(0, (text = $$props.text));
      if ("author" in $$props) $$invalidate(1, (author = $$props.author));
      if ("url" in $$props) $$invalidate(2, (url = $$props.url));
      if ("facebook" in $$props) $$invalidate(3, (facebook = $$props.facebook));
      if ("twitter" in $$props) $$invalidate(4, (twitter = $$props.twitter));
      if ("github" in $$props) $$invalidate(5, (github = $$props.github));
      if ("linkedin" in $$props) $$invalidate(6, (linkedin = $$props.linkedin));
      if ("store" in $$props) $$invalidate(7, (store = $$props.store));
    };

    $$self.$capture_state = () => ({
      text,
      author,
      url,
      facebook,
      twitter,
      github,
      linkedin,
      store
    });

    $$self.$inject_state = $$props => {
      if ("text" in $$props) $$invalidate(0, (text = $$props.text));
      if ("author" in $$props) $$invalidate(1, (author = $$props.author));
      if ("url" in $$props) $$invalidate(2, (url = $$props.url));
      if ("facebook" in $$props) $$invalidate(3, (facebook = $$props.facebook));
      if ("twitter" in $$props) $$invalidate(4, (twitter = $$props.twitter));
      if ("github" in $$props) $$invalidate(5, (github = $$props.github));
      if ("linkedin" in $$props) $$invalidate(6, (linkedin = $$props.linkedin));
      if ("store" in $$props) $$invalidate(7, (store = $$props.store));
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [text, author, url, facebook, twitter, github, linkedin, store];
  }

  class Footer extends SvelteComponentDev {
    constructor(options) {
      super(options);

      init(this, options, instance$4, create_fragment$4, safe_not_equal, {
        text: 0,
        author: 1,
        url: 2,
        facebook: 3,
        twitter: 4,
        github: 5,
        linkedin: 6,
        store: 7
      });

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Footer",
        options,
        id: create_fragment$4.name
      });
    }

    get text() {
      throw new Error(
        "<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set text(value) {
      throw new Error(
        "<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get author() {
      throw new Error(
        "<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set author(value) {
      throw new Error(
        "<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get url() {
      throw new Error(
        "<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set url(value) {
      throw new Error(
        "<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get facebook() {
      throw new Error(
        "<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set facebook(value) {
      throw new Error(
        "<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get twitter() {
      throw new Error(
        "<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set twitter(value) {
      throw new Error(
        "<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get github() {
      throw new Error(
        "<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set github(value) {
      throw new Error(
        "<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get linkedin() {
      throw new Error(
        "<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set linkedin(value) {
      throw new Error(
        "<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get store() {
      throw new Error(
        "<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set store(value) {
      throw new Error(
        "<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }
  }

  /* src/components/Layout.svelte generated by Svelte v3.20.1 */

  function create_fragment$5(ctx) {
    let t0;
    let t1;
    let current;
    const navigation = new Navigation({ $$inline: true });
    const default_slot_template = /*$$slots*/ ctx[1].default;
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/ ctx[0],
      null
    );
    const footer = new Footer({ $$inline: true });

    const block = {
      c: function create() {
        create_component(navigation.$$.fragment);
        t0 = space();
        if (default_slot) default_slot.c();
        t1 = space();
        create_component(footer.$$.fragment);
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        mount_component(navigation, target, anchor);
        insert_dev(target, t0, anchor);

        if (default_slot) {
          default_slot.m(target, anchor);
        }

        insert_dev(target, t1, anchor);
        mount_component(footer, target, anchor);
        current = true;
      },
      p: function update(ctx, [dirty]) {
        if (default_slot) {
          if (default_slot.p && dirty & /*$$scope*/ 1) {
            default_slot.p(
              get_slot_context(
                default_slot_template,
                ctx,
                /*$$scope*/ ctx[0],
                null
              ),
              get_slot_changes(
                default_slot_template,
                /*$$scope*/ ctx[0],
                dirty,
                null
              )
            );
          }
        }
      },
      i: function intro(local) {
        if (current) return;
        transition_in(navigation.$$.fragment, local);
        transition_in(default_slot, local);
        transition_in(footer.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(navigation.$$.fragment, local);
        transition_out(default_slot, local);
        transition_out(footer.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(navigation, detaching);
        if (detaching) detach_dev(t0);
        if (default_slot) default_slot.d(detaching);
        if (detaching) detach_dev(t1);
        destroy_component(footer, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$5.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$5($$self, $$props, $$invalidate) {
    const writable_props = [];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Layout> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Layout", $$slots, ["default"]);

    $$self.$set = $$props => {
      if ("$$scope" in $$props) $$invalidate(0, ($$scope = $$props.$$scope));
    };

    $$self.$capture_state = () => ({ Navigation, Footer });
    return [$$scope, $$slots];
  }

  class Layout extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Layout",
        options,
        id: create_fragment$5.name
      });
    }
  }

  /* src/components/Heading.svelte generated by Svelte v3.20.1 */
  const file$3 = "src/components/Heading.svelte";

  function create_fragment$6(ctx) {
    let section;
    let div2;
    let div1;
    let div0;
    let h2;
    let t0;
    let t1;
    let span;
    let t2;
    let t3;
    let br;
    let t4;
    let t5;
    let section_transition;
    let current;

    const block = {
      c: function create() {
        section = element("section");
        div2 = element("div");
        div1 = element("div");
        div0 = element("div");
        h2 = element("h2");
        t0 = text(/*initialText*/ ctx[0]);
        t1 = space();
        span = element("span");
        t2 = text(/*colorText*/ ctx[1]);
        t3 = space();
        br = element("br");
        t4 = space();
        t5 = text(/*text*/ ctx[2]);
        attr_dev(span, "class", "text-color svelte-av7feg");
        add_location(span, file$3, 54, 10, 997);
        add_location(br, file$3, 55, 10, 1051);
        add_location(h2, file$3, 52, 8, 958);
        attr_dev(div0, "class", "col-lg-8 text-center");
        add_location(div0, file$3, 51, 6, 915);
        attr_dev(div1, "class", "row justify-content-center");
        add_location(div1, file$3, 50, 4, 868);
        attr_dev(div2, "class", "container");
        add_location(div2, file$3, 49, 2, 840);
        attr_dev(section, "class", "section banner pb-0 svelte-av7feg");
        add_location(section, file$3, 48, 0, 784);
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        insert_dev(target, section, anchor);
        append_dev(section, div2);
        append_dev(div2, div1);
        append_dev(div1, div0);
        append_dev(div0, h2);
        append_dev(h2, t0);
        append_dev(h2, t1);
        append_dev(h2, span);
        append_dev(span, t2);
        append_dev(h2, t3);
        append_dev(h2, br);
        append_dev(h2, t4);
        append_dev(h2, t5);
        current = true;
      },
      p: function update(ctx, [dirty]) {
        if (!current || dirty & /*initialText*/ 1)
          set_data_dev(t0, /*initialText*/ ctx[0]);
        if (!current || dirty & /*colorText*/ 2)
          set_data_dev(t2, /*colorText*/ ctx[1]);
        if (!current || dirty & /*text*/ 4) set_data_dev(t5, /*text*/ ctx[2]);
      },
      i: function intro(local) {
        if (current) return;

        add_render_callback(() => {
          if (!section_transition)
            section_transition = create_bidirectional_transition(
              section,
              fade,
              {},
              true
            );
          section_transition.run(1);
        });

        current = true;
      },
      o: function outro(local) {
        if (!section_transition)
          section_transition = create_bidirectional_transition(
            section,
            fade,
            {},
            false
          );
        section_transition.run(0);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(section);
        if (detaching && section_transition) section_transition.end();
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$6.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$6($$self, $$props, $$invalidate) {
    let { initialText = "I provide" } = $$props;
    let { colorText = "Design Solutions." } = $$props;
    let { text = "My work is presented here, check them below." } = $$props;
    const writable_props = ["initialText", "colorText", "text"];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Heading> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Heading", $$slots, []);

    $$self.$set = $$props => {
      if ("initialText" in $$props)
        $$invalidate(0, (initialText = $$props.initialText));
      if ("colorText" in $$props)
        $$invalidate(1, (colorText = $$props.colorText));
      if ("text" in $$props) $$invalidate(2, (text = $$props.text));
    };

    $$self.$capture_state = () => ({ fade, initialText, colorText, text });

    $$self.$inject_state = $$props => {
      if ("initialText" in $$props)
        $$invalidate(0, (initialText = $$props.initialText));
      if ("colorText" in $$props)
        $$invalidate(1, (colorText = $$props.colorText));
      if ("text" in $$props) $$invalidate(2, (text = $$props.text));
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [initialText, colorText, text];
  }

  class Heading extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$6, create_fragment$6, safe_not_equal, {
        initialText: 0,
        colorText: 1,
        text: 2
      });

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Heading",
        options,
        id: create_fragment$6.name
      });
    }

    get initialText() {
      throw new Error(
        "<Heading>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set initialText(value) {
      throw new Error(
        "<Heading>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get colorText() {
      throw new Error(
        "<Heading>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set colorText(value) {
      throw new Error(
        "<Heading>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get text() {
      throw new Error(
        "<Heading>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set text(value) {
      throw new Error(
        "<Heading>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }
  }

  /* src/components/ButtonLink.svelte generated by Svelte v3.20.1 */

  const file$4 = "src/components/ButtonLink.svelte";

  function create_fragment$7(ctx) {
    let a;
    let current;
    const default_slot_template = /*$$slots*/ ctx[2].default;
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/ ctx[1],
      null
    );

    const block = {
      c: function create() {
        a = element("a");
        if (default_slot) default_slot.c();
        attr_dev(a, "href", /*href*/ ctx[0]);
        attr_dev(a, "class", "btn btn-main btn-small svelte-fyftst");
        add_location(a, file$4, 34, 0, 530);
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        insert_dev(target, a, anchor);

        if (default_slot) {
          default_slot.m(a, null);
        }

        current = true;
      },
      p: function update(ctx, [dirty]) {
        if (default_slot) {
          if (default_slot.p && dirty & /*$$scope*/ 2) {
            default_slot.p(
              get_slot_context(
                default_slot_template,
                ctx,
                /*$$scope*/ ctx[1],
                null
              ),
              get_slot_changes(
                default_slot_template,
                /*$$scope*/ ctx[1],
                dirty,
                null
              )
            );
          }
        }

        if (!current || dirty & /*href*/ 1) {
          attr_dev(a, "href", /*href*/ ctx[0]);
        }
      },
      i: function intro(local) {
        if (current) return;
        transition_in(default_slot, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(a);
        if (default_slot) default_slot.d(detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$7.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$7($$self, $$props, $$invalidate) {
    let { href = "" } = $$props;
    const writable_props = ["href"];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<ButtonLink> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("ButtonLink", $$slots, ["default"]);

    $$self.$set = $$props => {
      if ("href" in $$props) $$invalidate(0, (href = $$props.href));
      if ("$$scope" in $$props) $$invalidate(1, ($$scope = $$props.$$scope));
    };

    $$self.$capture_state = () => ({ href });

    $$self.$inject_state = $$props => {
      if ("href" in $$props) $$invalidate(0, (href = $$props.href));
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [href, $$scope, $$slots];
  }

  class ButtonLink extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$7, create_fragment$7, safe_not_equal, {
        href: 0
      });

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "ButtonLink",
        options,
        id: create_fragment$7.name
      });
    }

    get href() {
      throw new Error(
        "<ButtonLink>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set href(value) {
      throw new Error(
        "<ButtonLink>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }
  }

  /* src/components/Action.svelte generated by Svelte v3.20.1 */
  const file$5 = "src/components/Action.svelte";

  // (21:16) <ButtonLink href={url} target="_blank">
  function create_default_slot(ctx) {
    let t;

    const block = {
      c: function create() {
        t = text(/*action*/ ctx[1]);
      },
      m: function mount(target, anchor) {
        insert_dev(target, t, anchor);
      },
      p: function update(ctx, dirty) {
        if (dirty & /*action*/ 2) set_data_dev(t, /*action*/ ctx[1]);
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(t);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_default_slot.name,
      type: "slot",
      source: '(21:16) <ButtonLink href={url} target=\\"_blank\\">',
      ctx
    });

    return block;
  }

  function create_fragment$8(ctx) {
    let section;
    let div3;
    let div2;
    let div0;
    let h3;
    let t0;
    let t1;
    let div1;
    let current;

    const buttonlink = new ButtonLink({
      props: {
        href: /*url*/ ctx[2],
        target: "_blank",
        $$slots: { default: [create_default_slot] },
        $$scope: { ctx }
      },
      $$inline: true
    });

    const block = {
      c: function create() {
        section = element("section");
        div3 = element("div");
        div2 = element("div");
        div0 = element("div");
        h3 = element("h3");
        t0 = text(/*title*/ ctx[0]);
        t1 = space();
        div1 = element("div");
        create_component(buttonlink.$$.fragment);
        attr_dev(h3, "class", "text-white mb-0");
        add_location(h3, file$5, 17, 16, 427);
        attr_dev(div0, "class", "col-lg-8");
        add_location(div0, file$5, 16, 12, 388);
        attr_dev(div1, "class", "col-lg-4 text-lg-right mt-5 mt-lg-0");
        add_location(div1, file$5, 19, 12, 499);
        attr_dev(div2, "class", "row align-items-center bg-dark p-5");
        add_location(div2, file$5, 15, 8, 327);
        attr_dev(div3, "class", "container");
        add_location(div3, file$5, 14, 4, 295);
        attr_dev(section, "class", "section-sm pt-0 cta svelte-11lf7lr");
        add_location(section, file$5, 13, 0, 253);
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        insert_dev(target, section, anchor);
        append_dev(section, div3);
        append_dev(div3, div2);
        append_dev(div2, div0);
        append_dev(div0, h3);
        append_dev(h3, t0);
        append_dev(div2, t1);
        append_dev(div2, div1);
        mount_component(buttonlink, div1, null);
        current = true;
      },
      p: function update(ctx, [dirty]) {
        if (!current || dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
        const buttonlink_changes = {};
        if (dirty & /*url*/ 4) buttonlink_changes.href = /*url*/ ctx[2];

        if (dirty & /*$$scope, action*/ 10) {
          buttonlink_changes.$$scope = { dirty, ctx };
        }

        buttonlink.$set(buttonlink_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(buttonlink.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(buttonlink.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(section);
        destroy_component(buttonlink);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$8.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$8($$self, $$props, $$invalidate) {
    let { title = "A great action title" } = $$props;
    let { action = "A great action" } = $$props;
    let { url = "/" } = $$props;
    const writable_props = ["title", "action", "url"];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Action> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Action", $$slots, []);

    $$self.$set = $$props => {
      if ("title" in $$props) $$invalidate(0, (title = $$props.title));
      if ("action" in $$props) $$invalidate(1, (action = $$props.action));
      if ("url" in $$props) $$invalidate(2, (url = $$props.url));
    };

    $$self.$capture_state = () => ({ ButtonLink, title, action, url });

    $$self.$inject_state = $$props => {
      if ("title" in $$props) $$invalidate(0, (title = $$props.title));
      if ("action" in $$props) $$invalidate(1, (action = $$props.action));
      if ("url" in $$props) $$invalidate(2, (url = $$props.url));
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [title, action, url];
  }

  class Action extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$8, create_fragment$8, safe_not_equal, {
        title: 0,
        action: 1,
        url: 2
      });

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Action",
        options,
        id: create_fragment$8.name
      });
    }

    get title() {
      throw new Error(
        "<Action>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set title(value) {
      throw new Error(
        "<Action>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get action() {
      throw new Error(
        "<Action>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set action(value) {
      throw new Error(
        "<Action>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get url() {
      throw new Error(
        "<Action>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set url(value) {
      throw new Error(
        "<Action>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }
  }

  /* src/containers/Projects/Filters.svelte generated by Svelte v3.20.1 */

  const file$6 = "src/containers/Projects/Filters.svelte";

  function get_each_context(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[2] = list[i];
    child_ctx[4] = i;
    return child_ctx;
  }

  // (96:6) {#each filters as item, i (item.id)}
  function create_each_block(key_1, ctx) {
    let label;
    let t0_value = /*item*/ ctx[2].title + "";
    let t0;
    let t1;

    const block = {
      key: key_1,
      first: null,
      c: function create() {
        label = element("label");
        t0 = text(t0_value);
        t1 = space();
        attr_dev(label, "class", "btn active svelte-oiropn");
        toggle_class(label, "active", /*item*/ ctx[2].active);
        add_location(label, file$6, 96, 8, 1685);
        this.first = label;
      },
      m: function mount(target, anchor) {
        insert_dev(target, label, anchor);
        append_dev(label, t0);
        append_dev(label, t1);
      },
      p: function update(ctx, dirty) {
        if (
          dirty & /*filters*/ 2 &&
          t0_value !== (t0_value = /*item*/ ctx[2].title + "")
        )
          set_data_dev(t0, t0_value);

        if (dirty & /*filters*/ 2) {
          toggle_class(label, "active", /*item*/ ctx[2].active);
        }
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(label);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_each_block.name,
      type: "each",
      source: "(96:6) {#each filters as item, i (item.id)}",
      ctx
    });

    return block;
  }

  function create_fragment$9(ctx) {
    let div2;
    let div1;
    let div0;
    let each_blocks = [];
    let each_1_lookup = new Map();
    let each_value = /*filters*/ ctx[1];
    validate_each_argument(each_value);
    const get_key = ctx => /*item*/ ctx[2].id;
    validate_each_keys(ctx, each_value, get_each_context, get_key);

    for (let i = 0; i < each_value.length; i += 1) {
      let child_ctx = get_each_context(ctx, each_value, i);
      let key = get_key(child_ctx);
      each_1_lookup.set(
        key,
        (each_blocks[i] = create_each_block(key, child_ctx))
      );
    }

    const block = {
      c: function create() {
        div2 = element("div");
        div1 = element("div");
        div0 = element("div");

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }

        attr_dev(div0, "class", "btn-group btn-group-toggle  svelte-oiropn");
        attr_dev(div0, "data-toggle", "buttons");
        add_location(div0, file$6, 93, 4, 1569);
        attr_dev(div1, "class", "col-10 ");
        toggle_class(div1, "text-center", /*center*/ ctx[0]);
        add_location(div1, file$6, 92, 2, 1516);
        attr_dev(div2, "class", "row mb-5");
        toggle_class(div2, "justify-content-center", /*center*/ ctx[0]);
        add_location(div2, file$6, 91, 0, 1453);
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        insert_dev(target, div2, anchor);
        append_dev(div2, div1);
        append_dev(div1, div0);

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(div0, null);
        }
      },
      p: function update(ctx, [dirty]) {
        if (dirty & /*filters*/ 2) {
          const each_value = /*filters*/ ctx[1];
          validate_each_argument(each_value);
          validate_each_keys(ctx, each_value, get_each_context, get_key);
          each_blocks = update_keyed_each(
            each_blocks,
            dirty,
            get_key,
            1,
            ctx,
            each_value,
            each_1_lookup,
            div0,
            destroy_block,
            create_each_block,
            null,
            get_each_context
          );
        }

        if (dirty & /*center*/ 1) {
          toggle_class(div1, "text-center", /*center*/ ctx[0]);
        }

        if (dirty & /*center*/ 1) {
          toggle_class(div2, "justify-content-center", /*center*/ ctx[0]);
        }
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(div2);

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].d();
        }
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$9.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$9($$self, $$props, $$invalidate) {
    let { center = false } = $$props;

    let {
      filters = [
        {
          id: "all-projects",
          title: "All Projects",
          active: true
        },
        {
          id: "branding",
          title: "branding",
          active: false
        },
        {
          id: "web-development",
          title: "Web Development",
          active: false
        },
        {
          id: "photography",
          title: "Photography",
          active: false
        }
      ]
    } = $$props;

    const writable_props = ["center", "filters"];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Filters> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Filters", $$slots, []);

    $$self.$set = $$props => {
      if ("center" in $$props) $$invalidate(0, (center = $$props.center));
      if ("filters" in $$props) $$invalidate(1, (filters = $$props.filters));
    };

    $$self.$capture_state = () => ({ center, filters });

    $$self.$inject_state = $$props => {
      if ("center" in $$props) $$invalidate(0, (center = $$props.center));
      if ("filters" in $$props) $$invalidate(1, (filters = $$props.filters));
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [center, filters];
  }

  class Filters extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$9, create_fragment$9, safe_not_equal, {
        center: 0,
        filters: 1
      });

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Filters",
        options,
        id: create_fragment$9.name
      });
    }

    get center() {
      throw new Error(
        "<Filters>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set center(value) {
      throw new Error(
        "<Filters>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get filters() {
      throw new Error(
        "<Filters>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set filters(value) {
      throw new Error(
        "<Filters>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }
  }

  /* src/containers/Projects/Project.svelte generated by Svelte v3.20.1 */
  const file$7 = "src/containers/Projects/Project.svelte";

  function create_fragment$a(ctx) {
    let div4;
    let a;
    let div3;
    let div2;
    let img;
    let img_src_value;
    let t0;
    let div1;
    let div0;
    let span;
    let h5;
    let t1;
    let t2;
    let p;
    let t3;
    let link_action;
    let div4_transition;
    let current;
    let dispose;

    const block = {
      c: function create() {
        div4 = element("div");
        a = element("a");
        div3 = element("div");
        div2 = element("div");
        img = element("img");
        t0 = space();
        div1 = element("div");
        div0 = element("div");
        span = element("span");
        h5 = element("h5");
        t1 = text(/*category*/ ctx[0]);
        t2 = space();
        p = element("p");
        t3 = text(/*title*/ ctx[1]);
        if (img.src !== (img_src_value = /*image*/ ctx[2]))
          attr_dev(img, "src", img_src_value);
        attr_dev(img, "alt", "portfolio-image");
        attr_dev(img, "class", "img-fluid w-100 d-block svelte-1r0a5a4");
        add_location(img, file$7, 121, 8, 2579);
        attr_dev(h5, "class", "mb-0 svelte-1r0a5a4");
        add_location(h5, file$7, 128, 14, 2812);
        attr_dev(p, "class", "svelte-1r0a5a4");
        add_location(p, file$7, 129, 14, 2859);
        attr_dev(span, "class", "overlay-content svelte-1r0a5a4");
        add_location(span, file$7, 127, 12, 2767);
        attr_dev(div0, "class", "overlay-inner svelte-1r0a5a4");
        add_location(div0, file$7, 126, 10, 2727);
        attr_dev(div1, "class", "overlay-box svelte-1r0a5a4");
        add_location(div1, file$7, 125, 8, 2691);
        attr_dev(div2, "class", "image position-relative svelte-1r0a5a4");
        add_location(div2, file$7, 120, 6, 2533);
        attr_dev(div3, "class", "position-relative inner-box svelte-1r0a5a4");
        add_location(div3, file$7, 119, 4, 2485);
        attr_dev(a, "class", "overlay-content svelte-1r0a5a4");
        attr_dev(a, "href", /*url*/ ctx[3]);
        add_location(a, file$7, 118, 2, 2433);
        attr_dev(div4, "class", "col-lg-4 col-6 mb-4 shuffle-item");
        add_location(div4, file$7, 117, 0, 2368);
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor, remount) {
        insert_dev(target, div4, anchor);
        append_dev(div4, a);
        append_dev(a, div3);
        append_dev(div3, div2);
        append_dev(div2, img);
        append_dev(div2, t0);
        append_dev(div2, div1);
        append_dev(div1, div0);
        append_dev(div0, span);
        append_dev(span, h5);
        append_dev(h5, t1);
        append_dev(span, t2);
        append_dev(span, p);
        append_dev(p, t3);
        current = true;
        if (remount) dispose();
        dispose = action_destroyer((link_action = link.call(null, a)));
      },
      p: function update(ctx, [dirty]) {
        if (
          !current ||
          (dirty & /*image*/ 4 &&
            img.src !== (img_src_value = /*image*/ ctx[2]))
        ) {
          attr_dev(img, "src", img_src_value);
        }

        if (!current || dirty & /*category*/ 1)
          set_data_dev(t1, /*category*/ ctx[0]);
        if (!current || dirty & /*title*/ 2) set_data_dev(t3, /*title*/ ctx[1]);

        if (!current || dirty & /*url*/ 8) {
          attr_dev(a, "href", /*url*/ ctx[3]);
        }
      },
      i: function intro(local) {
        if (current) return;

        add_render_callback(() => {
          if (!div4_transition)
            div4_transition = create_bidirectional_transition(
              div4,
              fade,
              {},
              true
            );
          div4_transition.run(1);
        });

        current = true;
      },
      o: function outro(local) {
        if (!div4_transition)
          div4_transition = create_bidirectional_transition(
            div4,
            fade,
            {},
            false
          );
        div4_transition.run(0);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(div4);
        if (detaching && div4_transition) div4_transition.end();
        dispose();
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$a.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$a($$self, $$props, $$invalidate) {
    let { category = "Web" } = $$props;
    let { title = "Web Project" } = $$props;
    let { image = "images/portfolio/4.jpg" } = $$props;
    let { url = "/project/1" } = $$props;
    const writable_props = ["category", "title", "image", "url"];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Project> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Project", $$slots, []);

    $$self.$set = $$props => {
      if ("category" in $$props) $$invalidate(0, (category = $$props.category));
      if ("title" in $$props) $$invalidate(1, (title = $$props.title));
      if ("image" in $$props) $$invalidate(2, (image = $$props.image));
      if ("url" in $$props) $$invalidate(3, (url = $$props.url));
    };

    $$self.$capture_state = () => ({ link, fade, category, title, image, url });

    $$self.$inject_state = $$props => {
      if ("category" in $$props) $$invalidate(0, (category = $$props.category));
      if ("title" in $$props) $$invalidate(1, (title = $$props.title));
      if ("image" in $$props) $$invalidate(2, (image = $$props.image));
      if ("url" in $$props) $$invalidate(3, (url = $$props.url));
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [category, title, image, url];
  }

  class Project extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$a, create_fragment$a, safe_not_equal, {
        category: 0,
        title: 1,
        image: 2,
        url: 3
      });

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Project",
        options,
        id: create_fragment$a.name
      });
    }

    get category() {
      throw new Error(
        "<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set category(value) {
      throw new Error(
        "<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get title() {
      throw new Error(
        "<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set title(value) {
      throw new Error(
        "<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get image() {
      throw new Error(
        "<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set image(value) {
      throw new Error(
        "<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get url() {
      throw new Error(
        "<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set url(value) {
      throw new Error(
        "<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }
  }

  /* src/containers/Projects/Projects.svelte generated by Svelte v3.20.1 */
  const file$8 = "src/containers/Projects/Projects.svelte";

  function get_each_context$1(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[4] = list[i];
    return child_ctx;
  }

  // (18:0) {#if detailed}
  function create_if_block_1$1(ctx) {
    let t;
    let br;
    let current;
    const heading_1_spread_levels = [/*heading*/ ctx[0]];
    let heading_1_props = {};

    for (let i = 0; i < heading_1_spread_levels.length; i += 1) {
      heading_1_props = assign(heading_1_props, heading_1_spread_levels[i]);
    }

    const heading_1 = new Heading({ props: heading_1_props, $$inline: true });

    const block = {
      c: function create() {
        create_component(heading_1.$$.fragment);
        t = space();
        br = element("br");
        add_location(br, file$8, 19, 2, 371);
      },
      m: function mount(target, anchor) {
        mount_component(heading_1, target, anchor);
        insert_dev(target, t, anchor);
        insert_dev(target, br, anchor);
        current = true;
      },
      p: function update(ctx, dirty) {
        const heading_1_changes =
          dirty & /*heading*/ 1
            ? get_spread_update(heading_1_spread_levels, [
                get_spread_object(/*heading*/ ctx[0])
              ])
            : {};

        heading_1.$set(heading_1_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(heading_1.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(heading_1.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(heading_1, detaching);
        if (detaching) detach_dev(t);
        if (detaching) detach_dev(br);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_if_block_1$1.name,
      type: "if",
      source: "(18:0) {#if detailed}",
      ctx
    });

    return block;
  }

  // (25:4) {#if filters}
  function create_if_block$1(ctx) {
    let current;

    const filters_1 = new Filters({
      props: { center: /*detailed*/ ctx[1] },
      $$inline: true
    });

    const block = {
      c: function create() {
        create_component(filters_1.$$.fragment);
      },
      m: function mount(target, anchor) {
        mount_component(filters_1, target, anchor);
        current = true;
      },
      p: function update(ctx, dirty) {
        const filters_1_changes = {};
        if (dirty & /*detailed*/ 2)
          filters_1_changes.center = /*detailed*/ ctx[1];
        filters_1.$set(filters_1_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(filters_1.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(filters_1.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(filters_1, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_if_block$1.name,
      type: "if",
      source: "(25:4) {#if filters}",
      ctx
    });

    return block;
  }

  // (30:6) {#each data as item}
  function create_each_block$1(ctx) {
    let current;
    const project_spread_levels = [
      { url: `/project/${/*item*/ ctx[4].id}` },
      /*item*/ ctx[4]
    ];
    let project_props = {};

    for (let i = 0; i < project_spread_levels.length; i += 1) {
      project_props = assign(project_props, project_spread_levels[i]);
    }

    const project = new Project({ props: project_props, $$inline: true });

    const block = {
      c: function create() {
        create_component(project.$$.fragment);
      },
      m: function mount(target, anchor) {
        mount_component(project, target, anchor);
        current = true;
      },
      p: function update(ctx, dirty) {
        const project_changes =
          dirty & /*data*/ 8
            ? get_spread_update(project_spread_levels, [
                { url: `/project/${/*item*/ ctx[4].id}` },
                get_spread_object(/*item*/ ctx[4])
              ])
            : {};

        project.$set(project_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(project.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(project.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(project, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_each_block$1.name,
      type: "each",
      source: "(30:6) {#each data as item}",
      ctx
    });

    return block;
  }

  function create_fragment$b(ctx) {
    let t0;
    let section;
    let div1;
    let t1;
    let div0;
    let current;
    let if_block0 = /*detailed*/ ctx[1] && create_if_block_1$1(ctx);
    let if_block1 = /*filters*/ ctx[2] && create_if_block$1(ctx);
    let each_value = /*data*/ ctx[3];
    validate_each_argument(each_value);
    let each_blocks = [];

    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block$1(
        get_each_context$1(ctx, each_value, i)
      );
    }

    const out = i =>
      transition_out(each_blocks[i], 1, 1, () => {
        each_blocks[i] = null;
      });

    const block = {
      c: function create() {
        if (if_block0) if_block0.c();
        t0 = space();
        section = element("section");
        div1 = element("div");
        if (if_block1) if_block1.c();
        t1 = space();
        div0 = element("div");

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }

        attr_dev(div0, "class", "row shuffle-wrapper portfolio-gallery");
        add_location(div0, file$8, 28, 4, 508);
        attr_dev(div1, "class", "container");
        add_location(div1, file$8, 23, 2, 415);
        attr_dev(section, "class", "portfolio svelte-nllw8s");
        add_location(section, file$8, 22, 0, 385);
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        if (if_block0) if_block0.m(target, anchor);
        insert_dev(target, t0, anchor);
        insert_dev(target, section, anchor);
        append_dev(section, div1);
        if (if_block1) if_block1.m(div1, null);
        append_dev(div1, t1);
        append_dev(div1, div0);

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(div0, null);
        }

        current = true;
      },
      p: function update(ctx, [dirty]) {
        if (/*detailed*/ ctx[1]) {
          if (if_block0) {
            if_block0.p(ctx, dirty);
            transition_in(if_block0, 1);
          } else {
            if_block0 = create_if_block_1$1(ctx);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(t0.parentNode, t0);
          }
        } else if (if_block0) {
          group_outros();

          transition_out(if_block0, 1, 1, () => {
            if_block0 = null;
          });

          check_outros();
        }

        if (/*filters*/ ctx[2]) {
          if (if_block1) {
            if_block1.p(ctx, dirty);
            transition_in(if_block1, 1);
          } else {
            if_block1 = create_if_block$1(ctx);
            if_block1.c();
            transition_in(if_block1, 1);
            if_block1.m(div1, t1);
          }
        } else if (if_block1) {
          group_outros();

          transition_out(if_block1, 1, 1, () => {
            if_block1 = null;
          });

          check_outros();
        }

        if (dirty & /*data*/ 8) {
          each_value = /*data*/ ctx[3];
          validate_each_argument(each_value);
          let i;

          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context$1(ctx, each_value, i);

            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block$1(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(div0, null);
            }
          }

          group_outros();

          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }

          check_outros();
        }
      },
      i: function intro(local) {
        if (current) return;
        transition_in(if_block0);
        transition_in(if_block1);

        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }

        current = true;
      },
      o: function outro(local) {
        transition_out(if_block0);
        transition_out(if_block1);
        each_blocks = each_blocks.filter(Boolean);

        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }

        current = false;
      },
      d: function destroy(detaching) {
        if (if_block0) if_block0.d(detaching);
        if (detaching) detach_dev(t0);
        if (detaching) detach_dev(section);
        if (if_block1) if_block1.d();
        destroy_each(each_blocks, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$b.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$b($$self, $$props, $$invalidate) {
    let { heading = {} } = $$props;
    let { detailed = false } = $$props;
    let { filters = false } = $$props;
    let { data = [] } = $$props;
    const writable_props = ["heading", "detailed", "filters", "data"];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Projects> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Projects", $$slots, []);

    $$self.$set = $$props => {
      if ("heading" in $$props) $$invalidate(0, (heading = $$props.heading));
      if ("detailed" in $$props) $$invalidate(1, (detailed = $$props.detailed));
      if ("filters" in $$props) $$invalidate(2, (filters = $$props.filters));
      if ("data" in $$props) $$invalidate(3, (data = $$props.data));
    };

    $$self.$capture_state = () => ({
      Heading,
      Filters,
      Project,
      heading,
      detailed,
      filters,
      data
    });

    $$self.$inject_state = $$props => {
      if ("heading" in $$props) $$invalidate(0, (heading = $$props.heading));
      if ("detailed" in $$props) $$invalidate(1, (detailed = $$props.detailed));
      if ("filters" in $$props) $$invalidate(2, (filters = $$props.filters));
      if ("data" in $$props) $$invalidate(3, (data = $$props.data));
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [heading, detailed, filters, data];
  }

  class Projects extends SvelteComponentDev {
    constructor(options) {
      super(options);

      init(this, options, instance$b, create_fragment$b, safe_not_equal, {
        heading: 0,
        detailed: 1,
        filters: 2,
        data: 3
      });

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Projects",
        options,
        id: create_fragment$b.name
      });
    }

    get heading() {
      throw new Error(
        "<Projects>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set heading(value) {
      throw new Error(
        "<Projects>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get detailed() {
      throw new Error(
        "<Projects>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set detailed(value) {
      throw new Error(
        "<Projects>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get filters() {
      throw new Error(
        "<Projects>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set filters(value) {
      throw new Error(
        "<Projects>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get data() {
      throw new Error(
        "<Projects>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set data(value) {
      throw new Error(
        "<Projects>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }
  }

  const FeaturedProjects = [
    {
      id: "pr-1",
      category: "Web",
      title: "Web Project",
      image: "images/portfolio/4.jpg"
    },
    {
      id: "pr-2",
      category: "Web",
      title: "Web Project",
      image: "images/portfolio/4.jpg"
    },
    {
      id: "pr-3",
      category: "Web",
      title: "Web Project",
      image: "images/portfolio/4.jpg"
    },
    {
      id: "pr-4",
      category: "Web",
      title: "Web Project",
      image: "images/portfolio/4.jpg"
    },
    {
      id: "pr-5",
      category: "Web",
      title: "Web Project",
      image: "images/portfolio/4.jpg"
    },
    {
      id: "pr-6",
      category: "Web",
      title: "Web Project",
      image: "images/portfolio/4.jpg"
    }
  ];

  const AllProjects = [...FeaturedProjects];

  /* src/containers/Home/Page.svelte generated by Svelte v3.20.1 */

  // (12:0) <Layout>
  function create_default_slot$1(ctx) {
    let t;
    let current;

    const hero = new Hero({
      props: {
        initialText: "CREATIVITY IS",
        text: "INTELLIGENCE HAVING FUN.",
        description:
          "Please check my portfolio. My creative and simplicity modern projects."
      },
      $$inline: true
    });

    const projects = new Projects({
      props: { data: FeaturedProjects },
      $$inline: true
    });

    const block = {
      c: function create() {
        create_component(hero.$$.fragment);
        t = space();
        create_component(projects.$$.fragment);
      },
      m: function mount(target, anchor) {
        mount_component(hero, target, anchor);
        insert_dev(target, t, anchor);
        mount_component(projects, target, anchor);
        current = true;
      },
      p: noop,
      i: function intro(local) {
        if (current) return;
        transition_in(hero.$$.fragment, local);
        transition_in(projects.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(hero.$$.fragment, local);
        transition_out(projects.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(hero, detaching);
        if (detaching) detach_dev(t);
        destroy_component(projects, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_default_slot$1.name,
      type: "slot",
      source: "(12:0) <Layout>",
      ctx
    });

    return block;
  }

  function create_fragment$c(ctx) {
    let t;
    let current;

    const layout = new Layout({
      props: {
        $$slots: { default: [create_default_slot$1] },
        $$scope: { ctx }
      },
      $$inline: true
    });

    const block = {
      c: function create() {
        t = space();
        create_component(layout.$$.fragment);
        document.title = "Vitor Amaral | Home";
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        insert_dev(target, t, anchor);
        mount_component(layout, target, anchor);
        current = true;
      },
      p: function update(ctx, [dirty]) {
        const layout_changes = {};

        if (dirty & /*$$scope*/ 1) {
          layout_changes.$$scope = { dirty, ctx };
        }

        layout.$set(layout_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(layout.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(layout.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(t);
        destroy_component(layout, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$c.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$c($$self, $$props, $$invalidate) {
    const writable_props = [];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Page> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Page", $$slots, []);
    $$self.$capture_state = () => ({
      Layout,
      Hero,
      Projects,
      FeaturedProjects
    });
    return [];
  }

  class Page extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Page",
        options,
        id: create_fragment$c.name
      });
    }
  }

  /* src/containers/About/Block.svelte generated by Svelte v3.20.1 */
  const file$9 = "src/containers/About/Block.svelte";

  function get_each_context_1(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[2] = list[i];
    return child_ctx;
  }

  function get_each_context$2(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[2] = list[i];
    return child_ctx;
  }

  // (58:14) {#each item.list as item}
  function create_each_block_1(ctx) {
    let div;
    let span;
    let t0_value = /*item*/ ctx[2].subTitle + "";
    let t0;
    let t1;
    let h4;
    let t2_value = /*item*/ ctx[2].title + "";
    let t2;
    let t3;
    let p;
    let t4_value = /*item*/ ctx[2].description + "";
    let t4;

    const block = {
      c: function create() {
        div = element("div");
        span = element("span");
        t0 = text(t0_value);
        t1 = space();
        h4 = element("h4");
        t2 = text(t2_value);
        t3 = space();
        p = element("p");
        t4 = text(t4_value);
        add_location(span, file$9, 59, 18, 1328);
        attr_dev(h4, "class", "mb-3 mt-1");
        add_location(h4, file$9, 60, 18, 1375);
        add_location(p, file$9, 61, 18, 1433);
        attr_dev(div, "class", "about-info mb-5 svelte-1hv0zqs");
        add_location(div, file$9, 58, 16, 1280);
      },
      m: function mount(target, anchor) {
        insert_dev(target, div, anchor);
        append_dev(div, span);
        append_dev(span, t0);
        append_dev(div, t1);
        append_dev(div, h4);
        append_dev(h4, t2);
        append_dev(div, t3);
        append_dev(div, p);
        append_dev(p, t4);
      },
      p: function update(ctx, dirty) {
        if (
          dirty & /*data*/ 2 &&
          t0_value !== (t0_value = /*item*/ ctx[2].subTitle + "")
        )
          set_data_dev(t0, t0_value);
        if (
          dirty & /*data*/ 2 &&
          t2_value !== (t2_value = /*item*/ ctx[2].title + "")
        )
          set_data_dev(t2, t2_value);
        if (
          dirty & /*data*/ 2 &&
          t4_value !== (t4_value = /*item*/ ctx[2].description + "")
        )
          set_data_dev(t4, t4_value);
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_each_block_1.name,
      type: "each",
      source: "(58:14) {#each item.list as item}",
      ctx
    });

    return block;
  }

  // (56:10) {#each data as item}
  function create_each_block$2(ctx) {
    let div;
    let t;
    let each_value_1 = /*item*/ ctx[2].list;
    validate_each_argument(each_value_1);
    let each_blocks = [];

    for (let i = 0; i < each_value_1.length; i += 1) {
      each_blocks[i] = create_each_block_1(
        get_each_context_1(ctx, each_value_1, i)
      );
    }

    const block = {
      c: function create() {
        div = element("div");

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }

        t = space();
        attr_dev(div, "class", "col-lg-6");
        add_location(div, file$9, 56, 12, 1201);
      },
      m: function mount(target, anchor) {
        insert_dev(target, div, anchor);

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(div, null);
        }

        append_dev(div, t);
      },
      p: function update(ctx, dirty) {
        if (dirty & /*data*/ 2) {
          each_value_1 = /*item*/ ctx[2].list;
          validate_each_argument(each_value_1);
          let i;

          for (i = 0; i < each_value_1.length; i += 1) {
            const child_ctx = get_each_context_1(ctx, each_value_1, i);

            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block_1(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(div, t);
            }
          }

          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }

          each_blocks.length = each_value_1.length;
        }
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(div);
        destroy_each(each_blocks, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_each_block$2.name,
      type: "each",
      source: "(56:10) {#each data as item}",
      ctx
    });

    return block;
  }

  function create_fragment$d(ctx) {
    let section;
    let div4;
    let div3;
    let div0;
    let h3;
    let t0;
    let t1;
    let div2;
    let div1;
    let section_transition;
    let current;
    let each_value = /*data*/ ctx[1];
    validate_each_argument(each_value);
    let each_blocks = [];

    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block$2(
        get_each_context$2(ctx, each_value, i)
      );
    }

    const block = {
      c: function create() {
        section = element("section");
        div4 = element("div");
        div3 = element("div");
        div0 = element("div");
        h3 = element("h3");
        t0 = text(/*title*/ ctx[0]);
        t1 = space();
        div2 = element("div");
        div1 = element("div");

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }

        attr_dev(h3, "class", "mb-2");
        add_location(h3, file$9, 49, 8, 1058);
        attr_dev(div0, "class", "col-lg-4 mb-5");
        add_location(div0, file$9, 48, 6, 1022);
        attr_dev(div1, "class", "row");
        add_location(div1, file$9, 53, 8, 1139);
        attr_dev(div2, "class", "col-lg-8");
        add_location(div2, file$9, 52, 6, 1108);
        attr_dev(div3, "class", "row");
        add_location(div3, file$9, 47, 4, 998);
        attr_dev(div4, "class", "container");
        add_location(div4, file$9, 46, 2, 970);
        attr_dev(
          section,
          "class",
          "section about border-top border-bottom svelte-1hv0zqs"
        );
        add_location(section, file$9, 45, 0, 895);
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        insert_dev(target, section, anchor);
        append_dev(section, div4);
        append_dev(div4, div3);
        append_dev(div3, div0);
        append_dev(div0, h3);
        append_dev(h3, t0);
        append_dev(div3, t1);
        append_dev(div3, div2);
        append_dev(div2, div1);

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(div1, null);
        }

        current = true;
      },
      p: function update(ctx, [dirty]) {
        if (!current || dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);

        if (dirty & /*data*/ 2) {
          each_value = /*data*/ ctx[1];
          validate_each_argument(each_value);
          let i;

          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context$2(ctx, each_value, i);

            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block$2(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(div1, null);
            }
          }

          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }

          each_blocks.length = each_value.length;
        }
      },
      i: function intro(local) {
        if (current) return;

        add_render_callback(() => {
          if (!section_transition)
            section_transition = create_bidirectional_transition(
              section,
              fade,
              {},
              true
            );
          section_transition.run(1);
        });

        current = true;
      },
      o: function outro(local) {
        if (!section_transition)
          section_transition = create_bidirectional_transition(
            section,
            fade,
            {},
            false
          );
        section_transition.run(0);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(section);
        destroy_each(each_blocks, detaching);
        if (detaching && section_transition) section_transition.end();
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$d.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$d($$self, $$props, $$invalidate) {
    let { title = "Work Experiences." } = $$props;

    let {
      data = [
        {
          list: [
            {
              title: "Frontend Developer at Mindera",
              subTitle: "October 2018 - Present",
              description: ``
            },
            {
              title: "Frontend Developer at UALabs",
              subTitle: "February 2019 - October 2019",
              description: ``
            }
          ]
        },
        {
          list: [
            {
              title: "Frontend Developer at Pictonio",
              subTitle: "February 2018 - July 2018",
              description: ``
            },
            {
              title: "Web Developer at University of Aveiro",
              subTitle: "November 2017 - March 2018",
              description: ``
            }
          ]
        }
      ]
    } = $$props;

    const writable_props = ["title", "data"];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Block> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Block", $$slots, []);

    $$self.$set = $$props => {
      if ("title" in $$props) $$invalidate(0, (title = $$props.title));
      if ("data" in $$props) $$invalidate(1, (data = $$props.data));
    };

    $$self.$capture_state = () => ({ fade, title, data });

    $$self.$inject_state = $$props => {
      if ("title" in $$props) $$invalidate(0, (title = $$props.title));
      if ("data" in $$props) $$invalidate(1, (data = $$props.data));
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [title, data];
  }

  class Block extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$d, create_fragment$d, safe_not_equal, {
        title: 0,
        data: 1
      });

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Block",
        options,
        id: create_fragment$d.name
      });
    }

    get title() {
      throw new Error(
        "<Block>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set title(value) {
      throw new Error(
        "<Block>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get data() {
      throw new Error(
        "<Block>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set data(value) {
      throw new Error(
        "<Block>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }
  }

  /* src/containers/About/Page.svelte generated by Svelte v3.20.1 */
  const file$a = "src/containers/About/Page.svelte";

  function get_each_context$3(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[4] = list[i];
    return child_ctx;
  }

  // (52:12) {#each list as item}
  function create_each_block$3(ctx) {
    let li;
    let t_value = /*item*/ ctx[4] + "";
    let t;

    const block = {
      c: function create() {
        li = element("li");
        t = text(t_value);
        attr_dev(li, "class", "svelte-13ajvfh");
        add_location(li, file$a, 52, 14, 1399);
      },
      m: function mount(target, anchor) {
        insert_dev(target, li, anchor);
        append_dev(li, t);
      },
      p: function update(ctx, dirty) {
        if (dirty & /*list*/ 8 && t_value !== (t_value = /*item*/ ctx[4] + ""))
          set_data_dev(t, t_value);
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(li);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_each_block$3.name,
      type: "each",
      source: "(52:12) {#each list as item}",
      ctx
    });

    return block;
  }

  // (38:0) <Layout>
  function create_default_slot$2(ctx) {
    let section;
    let div3;
    let div2;
    let div0;
    let h2;
    let t0;
    let t1;
    let p0;
    let t2;
    let t3;
    let p1;
    let t4;
    let t5;
    let div1;
    let ul;
    let section_transition;
    let t6;
    let t7;
    let br;
    let t8;
    let current;
    let each_value = /*list*/ ctx[3];
    validate_each_argument(each_value);
    let each_blocks = [];

    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block$3(
        get_each_context$3(ctx, each_value, i)
      );
    }

    const block = new Block({ $$inline: true });

    const action = new Action({
      props: {
        title: "Want to learn more about me?",
        action: "Check my Linkedin",
        url: "https://www.linkedin.com/in/vacom/"
      },
      $$inline: true
    });

    const block_1 = {
      c: function create() {
        section = element("section");
        div3 = element("div");
        div2 = element("div");
        div0 = element("div");
        h2 = element("h2");
        t0 = text(/*name*/ ctx[0]);
        t1 = space();
        p0 = element("p");
        t2 = text(/*subTitle*/ ctx[1]);
        t3 = space();
        p1 = element("p");
        t4 = text(/*description*/ ctx[2]);
        t5 = space();
        div1 = element("div");
        ul = element("ul");

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }

        t6 = space();
        create_component(block.$$.fragment);
        t7 = space();
        br = element("br");
        t8 = space();
        create_component(action.$$.fragment);
        add_location(h2, file$a, 44, 10, 1141);
        attr_dev(p0, "class", "lead mb-4");
        add_location(p0, file$a, 45, 10, 1167);
        attr_dev(p1, "class", "mb-4");
        add_location(p1, file$a, 46, 10, 1213);
        attr_dev(div0, "class", "col-lg-7");
        add_location(div0, file$a, 43, 8, 1108);
        attr_dev(
          ul,
          "class",
          "list-unstyled mt-3 mb-5 about-list svelte-13ajvfh"
        );
        add_location(ul, file$a, 50, 10, 1304);
        attr_dev(div1, "class", "col-lg-5");
        add_location(div1, file$a, 49, 8, 1271);
        attr_dev(
          div2,
          "class",
          "row justify-content-center align-items-center"
        );
        add_location(div2, file$a, 41, 6, 1039);
        attr_dev(div3, "class", "container");
        add_location(div3, file$a, 40, 4, 1009);
        attr_dev(section, "class", "section banner-3 svelte-13ajvfh");
        add_location(section, file$a, 39, 2, 954);
        add_location(br, file$a, 61, 2, 1518);
      },
      m: function mount(target, anchor) {
        insert_dev(target, section, anchor);
        append_dev(section, div3);
        append_dev(div3, div2);
        append_dev(div2, div0);
        append_dev(div0, h2);
        append_dev(h2, t0);
        append_dev(div0, t1);
        append_dev(div0, p0);
        append_dev(p0, t2);
        append_dev(div0, t3);
        append_dev(div0, p1);
        append_dev(p1, t4);
        append_dev(div2, t5);
        append_dev(div2, div1);
        append_dev(div1, ul);

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(ul, null);
        }

        insert_dev(target, t6, anchor);
        mount_component(block, target, anchor);
        insert_dev(target, t7, anchor);
        insert_dev(target, br, anchor);
        insert_dev(target, t8, anchor);
        mount_component(action, target, anchor);
        current = true;
      },
      p: function update(ctx, dirty) {
        if (!current || dirty & /*name*/ 1) set_data_dev(t0, /*name*/ ctx[0]);
        if (!current || dirty & /*subTitle*/ 2)
          set_data_dev(t2, /*subTitle*/ ctx[1]);
        if (!current || dirty & /*description*/ 4)
          set_data_dev(t4, /*description*/ ctx[2]);

        if (dirty & /*list*/ 8) {
          each_value = /*list*/ ctx[3];
          validate_each_argument(each_value);
          let i;

          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context$3(ctx, each_value, i);

            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block$3(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(ul, null);
            }
          }

          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }

          each_blocks.length = each_value.length;
        }
      },
      i: function intro(local) {
        if (current) return;

        add_render_callback(() => {
          if (!section_transition)
            section_transition = create_bidirectional_transition(
              section,
              fade,
              {},
              true
            );
          section_transition.run(1);
        });

        transition_in(block.$$.fragment, local);
        transition_in(action.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        if (!section_transition)
          section_transition = create_bidirectional_transition(
            section,
            fade,
            {},
            false
          );
        section_transition.run(0);
        transition_out(block.$$.fragment, local);
        transition_out(action.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(section);
        destroy_each(each_blocks, detaching);
        if (detaching && section_transition) section_transition.end();
        if (detaching) detach_dev(t6);
        destroy_component(block, detaching);
        if (detaching) detach_dev(t7);
        if (detaching) detach_dev(br);
        if (detaching) detach_dev(t8);
        destroy_component(action, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block: block_1,
      id: create_default_slot$2.name,
      type: "slot",
      source: "(38:0) <Layout>",
      ctx
    });

    return block_1;
  }

  function create_fragment$e(ctx) {
    let t;
    let current;

    const layout = new Layout({
      props: {
        $$slots: { default: [create_default_slot$2] },
        $$scope: { ctx }
      },
      $$inline: true
    });

    const block = {
      c: function create() {
        t = space();
        create_component(layout.$$.fragment);
        document.title = "Vitor Amaral | About";
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        insert_dev(target, t, anchor);
        mount_component(layout, target, anchor);
        current = true;
      },
      p: function update(ctx, [dirty]) {
        const layout_changes = {};

        if (dirty & /*$$scope, list, description, subTitle, name*/ 143) {
          layout_changes.$$scope = { dirty, ctx };
        }

        layout.$set(layout_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(layout.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(layout.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(t);
        destroy_component(layout, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$e.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$e($$self, $$props, $$invalidate) {
    let { name = "Vitor Amaral" } = $$props;
    let {
      subTitle = "Full Stack Developer & Management and Information Programming"
    } = $$props;

    let {
      description = `I'm 27 years old from Portugal, I am a Full Stack Developer.
   With experience in different fields such as creating mobile applications, web, desktop and APIs in GraphQL or Rest.
   I invite you to look at my work and my Linkedin for more information.`
    } = $$props;

    let {
      list = [
        "React",
        "TypeScript",
        "Nodejs",
        "GraphQL",
        "Serverless",
        "Svelte"
      ]
    } = $$props;
    const writable_props = ["name", "subTitle", "description", "list"];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Page> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Page", $$slots, []);

    $$self.$set = $$props => {
      if ("name" in $$props) $$invalidate(0, (name = $$props.name));
      if ("subTitle" in $$props) $$invalidate(1, (subTitle = $$props.subTitle));
      if ("description" in $$props)
        $$invalidate(2, (description = $$props.description));
      if ("list" in $$props) $$invalidate(3, (list = $$props.list));
    };

    $$self.$capture_state = () => ({
      Layout,
      Action,
      fade,
      Block,
      name,
      subTitle,
      description,
      list
    });

    $$self.$inject_state = $$props => {
      if ("name" in $$props) $$invalidate(0, (name = $$props.name));
      if ("subTitle" in $$props) $$invalidate(1, (subTitle = $$props.subTitle));
      if ("description" in $$props)
        $$invalidate(2, (description = $$props.description));
      if ("list" in $$props) $$invalidate(3, (list = $$props.list));
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [name, subTitle, description, list];
  }

  class Page$1 extends SvelteComponentDev {
    constructor(options) {
      super(options);

      init(this, options, instance$e, create_fragment$e, safe_not_equal, {
        name: 0,
        subTitle: 1,
        description: 2,
        list: 3
      });

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Page",
        options,
        id: create_fragment$e.name
      });
    }

    get name() {
      throw new Error(
        "<Page>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set name(value) {
      throw new Error(
        "<Page>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get subTitle() {
      throw new Error(
        "<Page>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set subTitle(value) {
      throw new Error(
        "<Page>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get description() {
      throw new Error(
        "<Page>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set description(value) {
      throw new Error(
        "<Page>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get list() {
      throw new Error(
        "<Page>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set list(value) {
      throw new Error(
        "<Page>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }
  }

  /* src/containers/Projects/Page.svelte generated by Svelte v3.20.1 */

  // (18:0) <Layout>
  function create_default_slot$3(ctx) {
    let current;

    const projects = new Projects({
      props: {
        heading: /*data*/ ctx[0],
        data: AllProjects,
        detailed: true,
        filters: false
      },
      $$inline: true
    });

    const block = {
      c: function create() {
        create_component(projects.$$.fragment);
      },
      m: function mount(target, anchor) {
        mount_component(projects, target, anchor);
        current = true;
      },
      p: noop,
      i: function intro(local) {
        if (current) return;
        transition_in(projects.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(projects.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(projects, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_default_slot$3.name,
      type: "slot",
      source: "(18:0) <Layout>",
      ctx
    });

    return block;
  }

  function create_fragment$f(ctx) {
    let t;
    let current;

    const layout = new Layout({
      props: {
        $$slots: { default: [create_default_slot$3] },
        $$scope: { ctx }
      },
      $$inline: true
    });

    const block = {
      c: function create() {
        t = space();
        create_component(layout.$$.fragment);
        document.title = "Vitor Amaral | Projects";
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        insert_dev(target, t, anchor);
        mount_component(layout, target, anchor);
        current = true;
      },
      p: function update(ctx, [dirty]) {
        const layout_changes = {};

        if (dirty & /*$$scope*/ 2) {
          layout_changes.$$scope = { dirty, ctx };
        }

        layout.$set(layout_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(layout.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(layout.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(t);
        destroy_component(layout, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$f.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$f($$self, $$props, $$invalidate) {
    let data = {
      initialText: "I create",
      colorText: "Projects & Apps.",
      text: "For various types of platforms"
    };

    const writable_props = [];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Page> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Page", $$slots, []);
    $$self.$capture_state = () => ({ Layout, Projects, AllProjects, data });

    $$self.$inject_state = $$props => {
      if ("data" in $$props) $$invalidate(0, (data = $$props.data));
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [data];
  }

  class Page$2 extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Page",
        options,
        id: create_fragment$f.name
      });
    }
  }

  /* src/containers/Projects/Details.svelte generated by Svelte v3.20.1 */
  const file$b = "src/containers/Projects/Details.svelte";

  function get_each_context$4(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[1] = list[i];
    return child_ctx;
  }

  function get_each_context_1$1(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[4] = list[i];
    return child_ctx;
  }

  // (64:12) {#each data.description as description}
  function create_each_block_1$1(ctx) {
    let p;
    let t_value = /*description*/ ctx[4] + "";
    let t;

    const block = {
      c: function create() {
        p = element("p");
        t = text(t_value);
        add_location(p, file$b, 64, 14, 1760);
      },
      m: function mount(target, anchor) {
        insert_dev(target, p, anchor);
        append_dev(p, t);
      },
      p: function update(ctx, dirty) {
        if (
          dirty & /*data*/ 1 &&
          t_value !== (t_value = /*description*/ ctx[4] + "")
        )
          set_data_dev(t, t_value);
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(p);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_each_block_1$1.name,
      type: "each",
      source: "(64:12) {#each data.description as description}",
      ctx
    });

    return block;
  }

  // (80:12) <ButtonLink href={data.url}>
  function create_default_slot_1(ctx) {
    let t;

    const block = {
      c: function create() {
        t = text("View project");
      },
      m: function mount(target, anchor) {
        insert_dev(target, t, anchor);
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(t);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_default_slot_1.name,
      type: "slot",
      source: "(80:12) <ButtonLink href={data.url}>",
      ctx
    });

    return block;
  }

  // (85:6) {#each data.images as image}
  function create_each_block$4(ctx) {
    let div1;
    let div0;
    let img;
    let img_src_value;
    let t;

    const block = {
      c: function create() {
        div1 = element("div");
        div0 = element("div");
        img = element("img");
        t = space();
        if (img.src !== (img_src_value = /*image*/ ctx[1]))
          attr_dev(img, "src", img_src_value);
        attr_dev(img, "alt", "");
        attr_dev(img, "class", "img-fluid w-100");
        add_location(img, file$b, 87, 12, 2362);
        attr_dev(div0, "class", "col-lg-12");
        add_location(div0, file$b, 86, 10, 2326);
        attr_dev(div1, "class", "row mt-5");
        add_location(div1, file$b, 85, 8, 2293);
      },
      m: function mount(target, anchor) {
        insert_dev(target, div1, anchor);
        append_dev(div1, div0);
        append_dev(div0, img);
        append_dev(div1, t);
      },
      p: function update(ctx, dirty) {
        if (
          dirty & /*data*/ 1 &&
          img.src !== (img_src_value = /*image*/ ctx[1])
        ) {
          attr_dev(img, "src", img_src_value);
        }
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(div1);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_each_block$4.name,
      type: "each",
      source: "(85:6) {#each data.images as image}",
      ctx
    });

    return block;
  }

  // (45:0) <Layout>
  function create_default_slot$4(ctx) {
    let section0;
    let div3;
    let div2;
    let div1;
    let div0;
    let h1;
    let t0_value = /*data*/ ctx[0].title + "";
    let t0;
    let t1;
    let section1;
    let div11;
    let div10;
    let div5;
    let div4;
    let h3;
    let t2_value = /*data*/ ctx[0].subTitle + "";
    let t2;
    let t3;
    let t4;
    let div9;
    let div6;
    let h50;
    let t6;
    let p0;
    let t7_value = /*data*/ ctx[0].client + "";
    let t7;
    let t8;
    let div7;
    let h51;
    let t10;
    let p1;
    let t11_value = /*data*/ ctx[0].category + "";
    let t11;
    let t12;
    let div8;
    let t13;
    let current;
    let each_value_1 = /*data*/ ctx[0].description;
    validate_each_argument(each_value_1);
    let each_blocks_1 = [];

    for (let i = 0; i < each_value_1.length; i += 1) {
      each_blocks_1[i] = create_each_block_1$1(
        get_each_context_1$1(ctx, each_value_1, i)
      );
    }

    const buttonlink = new ButtonLink({
      props: {
        href: /*data*/ ctx[0].url,
        $$slots: { default: [create_default_slot_1] },
        $$scope: { ctx }
      },
      $$inline: true
    });

    let each_value = /*data*/ ctx[0].images;
    validate_each_argument(each_value);
    let each_blocks = [];

    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block$4(
        get_each_context$4(ctx, each_value, i)
      );
    }

    const block = {
      c: function create() {
        section0 = element("section");
        div3 = element("div");
        div2 = element("div");
        div1 = element("div");
        div0 = element("div");
        h1 = element("h1");
        t0 = text(t0_value);
        t1 = space();
        section1 = element("section");
        div11 = element("div");
        div10 = element("div");
        div5 = element("div");
        div4 = element("div");
        h3 = element("h3");
        t2 = text(t2_value);
        t3 = space();

        for (let i = 0; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].c();
        }

        t4 = space();
        div9 = element("div");
        div6 = element("div");
        h50 = element("h5");
        h50.textContent = "Client";
        t6 = space();
        p0 = element("p");
        t7 = text(t7_value);
        t8 = space();
        div7 = element("div");
        h51 = element("h5");
        h51.textContent = "Category";
        t10 = space();
        p1 = element("p");
        t11 = text(t11_value);
        t12 = space();
        div8 = element("div");
        create_component(buttonlink.$$.fragment);
        t13 = space();

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }

        attr_dev(h1, "class", "text-capitalize mb-0 text-lg svelte-1vf191v");
        add_location(h1, file$b, 50, 12, 1327);
        attr_dev(div0, "class", "text-center");
        add_location(div0, file$b, 49, 10, 1289);
        attr_dev(div1, "class", "col-lg-12");
        add_location(div1, file$b, 48, 8, 1255);
        attr_dev(div2, "class", "row");
        add_location(div2, file$b, 47, 6, 1229);
        attr_dev(div3, "class", "container");
        add_location(div3, file$b, 46, 4, 1199);
        attr_dev(section0, "class", "page-title section pb-0 svelte-1vf191v");
        add_location(section0, file$b, 45, 2, 1153);
        attr_dev(h3, "class", "mb-4");
        add_location(h3, file$b, 62, 12, 1656);
        attr_dev(div4, "class", "project-info");
        add_location(div4, file$b, 61, 10, 1617);
        attr_dev(div5, "class", "col-lg-8");
        add_location(div5, file$b, 60, 8, 1584);
        attr_dev(h50, "class", "mb-0");
        add_location(h50, file$b, 71, 12, 1906);
        add_location(p0, file$b, 72, 12, 1947);
        attr_dev(div6, "class", "info");
        add_location(div6, file$b, 70, 10, 1875);
        attr_dev(h51, "class", "mb-0");
        add_location(h51, file$b, 75, 12, 2026);
        add_location(p1, file$b, 76, 12, 2069);
        attr_dev(div7, "class", "info");
        add_location(div7, file$b, 74, 10, 1995);
        attr_dev(div8, "class", "mt-5");
        add_location(div8, file$b, 78, 10, 2119);
        attr_dev(div9, "class", "col-lg-4");
        add_location(div9, file$b, 69, 8, 1842);
        attr_dev(div10, "class", "row justify-content-center");
        add_location(div10, file$b, 59, 6, 1535);
        attr_dev(div11, "class", "container");
        add_location(div11, file$b, 58, 4, 1505);
        attr_dev(section1, "class", "section portfolio-single svelte-1vf191v");
        add_location(section1, file$b, 57, 2, 1458);
      },
      m: function mount(target, anchor) {
        insert_dev(target, section0, anchor);
        append_dev(section0, div3);
        append_dev(div3, div2);
        append_dev(div2, div1);
        append_dev(div1, div0);
        append_dev(div0, h1);
        append_dev(h1, t0);
        insert_dev(target, t1, anchor);
        insert_dev(target, section1, anchor);
        append_dev(section1, div11);
        append_dev(div11, div10);
        append_dev(div10, div5);
        append_dev(div5, div4);
        append_dev(div4, h3);
        append_dev(h3, t2);
        append_dev(div4, t3);

        for (let i = 0; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].m(div4, null);
        }

        append_dev(div10, t4);
        append_dev(div10, div9);
        append_dev(div9, div6);
        append_dev(div6, h50);
        append_dev(div6, t6);
        append_dev(div6, p0);
        append_dev(p0, t7);
        append_dev(div9, t8);
        append_dev(div9, div7);
        append_dev(div7, h51);
        append_dev(div7, t10);
        append_dev(div7, p1);
        append_dev(p1, t11);
        append_dev(div9, t12);
        append_dev(div9, div8);
        mount_component(buttonlink, div8, null);
        append_dev(div11, t13);

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(div11, null);
        }

        current = true;
      },
      p: function update(ctx, dirty) {
        if (
          (!current || dirty & /*data*/ 1) &&
          t0_value !== (t0_value = /*data*/ ctx[0].title + "")
        )
          set_data_dev(t0, t0_value);
        if (
          (!current || dirty & /*data*/ 1) &&
          t2_value !== (t2_value = /*data*/ ctx[0].subTitle + "")
        )
          set_data_dev(t2, t2_value);

        if (dirty & /*data*/ 1) {
          each_value_1 = /*data*/ ctx[0].description;
          validate_each_argument(each_value_1);
          let i;

          for (i = 0; i < each_value_1.length; i += 1) {
            const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

            if (each_blocks_1[i]) {
              each_blocks_1[i].p(child_ctx, dirty);
            } else {
              each_blocks_1[i] = create_each_block_1$1(child_ctx);
              each_blocks_1[i].c();
              each_blocks_1[i].m(div4, null);
            }
          }

          for (; i < each_blocks_1.length; i += 1) {
            each_blocks_1[i].d(1);
          }

          each_blocks_1.length = each_value_1.length;
        }

        if (
          (!current || dirty & /*data*/ 1) &&
          t7_value !== (t7_value = /*data*/ ctx[0].client + "")
        )
          set_data_dev(t7, t7_value);
        if (
          (!current || dirty & /*data*/ 1) &&
          t11_value !== (t11_value = /*data*/ ctx[0].category + "")
        )
          set_data_dev(t11, t11_value);
        const buttonlink_changes = {};
        if (dirty & /*data*/ 1) buttonlink_changes.href = /*data*/ ctx[0].url;

        if (dirty & /*$$scope*/ 128) {
          buttonlink_changes.$$scope = { dirty, ctx };
        }

        buttonlink.$set(buttonlink_changes);

        if (dirty & /*data*/ 1) {
          each_value = /*data*/ ctx[0].images;
          validate_each_argument(each_value);
          let i;

          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context$4(ctx, each_value, i);

            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block$4(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(div11, null);
            }
          }

          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }

          each_blocks.length = each_value.length;
        }
      },
      i: function intro(local) {
        if (current) return;
        transition_in(buttonlink.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(buttonlink.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(section0);
        if (detaching) detach_dev(t1);
        if (detaching) detach_dev(section1);
        destroy_each(each_blocks_1, detaching);
        destroy_component(buttonlink);
        destroy_each(each_blocks, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_default_slot$4.name,
      type: "slot",
      source: "(45:0) <Layout>",
      ctx
    });

    return block;
  }

  function create_fragment$g(ctx) {
    let current;

    const layout = new Layout({
      props: {
        $$slots: { default: [create_default_slot$4] },
        $$scope: { ctx }
      },
      $$inline: true
    });

    const block = {
      c: function create() {
        create_component(layout.$$.fragment);
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        mount_component(layout, target, anchor);
        current = true;
      },
      p: function update(ctx, [dirty]) {
        const layout_changes = {};

        if (dirty & /*$$scope, data*/ 129) {
          layout_changes.$$scope = { dirty, ctx };
        }

        layout.$set(layout_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(layout.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(layout.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(layout, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$g.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$g($$self, $$props, $$invalidate) {
    let {
      data = {
        title: "A project title",
        subTitle: "A project nice subtitle",
        client: "Microsoft",
        category: "Web Design",
        url: "https://www.google.com",
        description: [
          `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
              eligendi fugiat ad cupiditate hic, eum debitis ipsum, quos non
              mollitia. Commodi suscipit obcaecati et, aperiam quas vero quo,
              labore tempore.`,
          `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
              debitis beatae doloremque cupiditate vel repellat nam est
              voluptates, magnam quod explicabo fugit, quidem.`
        ],
        images: ["images/portfolio/02.jpg", "images/portfolio/02.jpg"]
      }
    } = $$props;

    const writable_props = ["data"];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Details> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Details", $$slots, []);

    $$self.$set = $$props => {
      if ("data" in $$props) $$invalidate(0, (data = $$props.data));
    };

    $$self.$capture_state = () => ({ Layout, ButtonLink, data });

    $$self.$inject_state = $$props => {
      if ("data" in $$props) $$invalidate(0, (data = $$props.data));
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [data];
  }

  class Details extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$g, create_fragment$g, safe_not_equal, {
        data: 0
      });

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Details",
        options,
        id: create_fragment$g.name
      });
    }

    get data() {
      throw new Error(
        "<Details>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set data(value) {
      throw new Error(
        "<Details>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }
  }

  const data = [
    {
      id: "prospectus",
      category: "Prospectus",
      title: "Object to HTML form generator for React Applications",
      image: "https://i.imgur.com/n6xDWNy.jpg",
      url: "https://github.com/vacom/prospectus",
      external: true
    },
    {
      id: "requite",
      category: "Requite",
      title:
        "Dynamic selector for React components. Great for creating dynamic pages.",
      image: "https://i.imgur.com/HVNMt4J.jpg",
      url: "https://github.com/vacom/Requite",
      external: true
    },
    {
      id: "pursue",
      category: "Pursue",
      title: "A React utility HTTP client for higher-order components",
      image: "https://i.imgur.com/ERhNl4O.jpg",
      url: "https://github.com/vacom/pursue",
      external: true
    },
    {
      id: "requite-for-svelte",
      category: "Requite for Svelte",
      title: "Dynamic selector for Svelte",
      image: "https://i.imgur.com/vdWjYt5.png",
      url: "https://github.com/vacom/requite-svelte",
      external: true
    },
    {
      id: "logbook",
      category: "Logbook",
      title:
        "A library with no dependencies to handle and amplify the use of console.log and other forms of debugging",
      image: "https://i.imgur.com/lie3Fan.jpg",
      url: "https://github.com/vacom/logbook",
      external: true
    },
    {
      id: "stackSign",
      category: "StackSign",
      title:
        "A minimal boilerplate stack for React SPA with support for TypeScript, Apollo, GraphQL, Auth0 and Private Routes with React-Router",
      image: "https://i.imgur.com/4nM6IJW.jpg",
      url: "https://github.com/vacom/stacksign",
      external: true
    },
    {
      id: "vantage-auth",
      category: "Vantage-auth",
      title: "A reusable auth interface component for any React Application ",
      image: "https://i.imgur.com/VPBFAz0.jpg",
      url: "https://github.com/vacom/vantage-auth",
      external: true
    }
  ];

  /* src/containers/OpenSource/Page.svelte generated by Svelte v3.20.1 */

  // (17:0) <Layout>
  function create_default_slot$5(ctx) {
    let current;

    const projects = new Projects({
      props: {
        heading: /*data*/ ctx[0],
        data: data,
        detailed: true,
        filters: false
      },
      $$inline: true
    });

    const block = {
      c: function create() {
        create_component(projects.$$.fragment);
      },
      m: function mount(target, anchor) {
        mount_component(projects, target, anchor);
        current = true;
      },
      p: noop,
      i: function intro(local) {
        if (current) return;
        transition_in(projects.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(projects.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(projects, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_default_slot$5.name,
      type: "slot",
      source: "(17:0) <Layout>",
      ctx
    });

    return block;
  }

  function create_fragment$h(ctx) {
    let t;
    let current;

    const layout = new Layout({
      props: {
        $$slots: { default: [create_default_slot$5] },
        $$scope: { ctx }
      },
      $$inline: true
    });

    const block = {
      c: function create() {
        t = space();
        create_component(layout.$$.fragment);
        document.title = "Vitor Amaral | Open Source";
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        insert_dev(target, t, anchor);
        mount_component(layout, target, anchor);
        current = true;
      },
      p: function update(ctx, [dirty]) {
        const layout_changes = {};

        if (dirty & /*$$scope*/ 2) {
          layout_changes.$$scope = { dirty, ctx };
        }

        layout.$set(layout_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(layout.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(layout.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(t);
        destroy_component(layout, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$h.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$h($$self, $$props, $$invalidate) {
    let data$1 = {
      initialText: "I develop",
      colorText: "Open Source projects.",
      text: "Sharing is caring."
    };

    const writable_props = [];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Page> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Page", $$slots, []);
    $$self.$capture_state = () => ({
      Layout,
      Projects,
      AllProjects: data,
      data: data$1
    });

    $$self.$inject_state = $$props => {
      if ("data" in $$props) $$invalidate(0, (data$1 = $$props.data));
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [data$1];
  }

  class Page$3 extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$h, create_fragment$h, safe_not_equal, {});

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Page",
        options,
        id: create_fragment$h.name
      });
    }
  }

  /* src/containers/Themes/Page.svelte generated by Svelte v3.20.1 */
  const file$c = "src/containers/Themes/Page.svelte";

  function get_each_context$5(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[3] = list[i];
    return child_ctx;
  }

  // (44:12) {#each list as item}
  function create_each_block$5(ctx) {
    let li;
    let t_value = /*item*/ ctx[3] + "";
    let t;

    const block = {
      c: function create() {
        li = element("li");
        t = text(t_value);
        add_location(li, file$c, 44, 14, 1193);
      },
      m: function mount(target, anchor) {
        insert_dev(target, li, anchor);
        append_dev(li, t);
      },
      p: function update(ctx, dirty) {
        if (dirty & /*list*/ 4 && t_value !== (t_value = /*item*/ ctx[3] + ""))
          set_data_dev(t, t_value);
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(li);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_each_block$5.name,
      type: "each",
      source: "(44:12) {#each list as item}",
      ctx
    });

    return block;
  }

  // (29:0) <Layout>
  function create_default_slot$6(ctx) {
    let t0;
    let section;
    let div3;
    let div2;
    let div0;
    let h2;
    let t1;
    let t2;
    let p;
    let t3;
    let t4;
    let div1;
    let ul;
    let section_transition;
    let t5;
    let current;

    const heading = new Heading({
      props: {
        initialText: "I create",
        colorText: "Themes & Templates",
        text: "Beautiful and simple themes for agencies and photographers"
      },
      $$inline: true
    });

    let each_value = /*list*/ ctx[2];
    validate_each_argument(each_value);
    let each_blocks = [];

    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block$5(
        get_each_context$5(ctx, each_value, i)
      );
    }

    const action = new Action({
      props: {
        title: "Take a look at our themes",
        action: "Check out the themes",
        url: "https://creativemarket.com/storytics"
      },
      $$inline: true
    });

    const block = {
      c: function create() {
        create_component(heading.$$.fragment);
        t0 = space();
        section = element("section");
        div3 = element("div");
        div2 = element("div");
        div0 = element("div");
        h2 = element("h2");
        t1 = text(/*name*/ ctx[0]);
        t2 = space();
        p = element("p");
        t3 = text(/*description*/ ctx[1]);
        t4 = space();
        div1 = element("div");
        ul = element("ul");

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }

        t5 = space();
        create_component(action.$$.fragment);
        add_location(h2, file$c, 37, 10, 981);
        attr_dev(p, "class", "mb-4");
        add_location(p, file$c, 38, 10, 1007);
        attr_dev(div0, "class", "col-lg-7");
        add_location(div0, file$c, 36, 8, 948);
        attr_dev(ul, "class", "list-unstyled mt-3 mb-5 about-list");
        add_location(ul, file$c, 42, 10, 1098);
        attr_dev(div1, "class", "col-lg-5");
        add_location(div1, file$c, 41, 8, 1065);
        attr_dev(
          div2,
          "class",
          "row justify-content-center align-items-center"
        );
        add_location(div2, file$c, 34, 6, 879);
        attr_dev(div3, "class", "container");
        add_location(div3, file$c, 33, 4, 849);
        attr_dev(
          section,
          "class",
          "section banner-3 theme-section svelte-1uahdo6"
        );
        add_location(section, file$c, 32, 2, 780);
      },
      m: function mount(target, anchor) {
        mount_component(heading, target, anchor);
        insert_dev(target, t0, anchor);
        insert_dev(target, section, anchor);
        append_dev(section, div3);
        append_dev(div3, div2);
        append_dev(div2, div0);
        append_dev(div0, h2);
        append_dev(h2, t1);
        append_dev(div0, t2);
        append_dev(div0, p);
        append_dev(p, t3);
        append_dev(div2, t4);
        append_dev(div2, div1);
        append_dev(div1, ul);

        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(ul, null);
        }

        insert_dev(target, t5, anchor);
        mount_component(action, target, anchor);
        current = true;
      },
      p: function update(ctx, dirty) {
        if (!current || dirty & /*name*/ 1) set_data_dev(t1, /*name*/ ctx[0]);
        if (!current || dirty & /*description*/ 2)
          set_data_dev(t3, /*description*/ ctx[1]);

        if (dirty & /*list*/ 4) {
          each_value = /*list*/ ctx[2];
          validate_each_argument(each_value);
          let i;

          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context$5(ctx, each_value, i);

            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block$5(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(ul, null);
            }
          }

          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }

          each_blocks.length = each_value.length;
        }
      },
      i: function intro(local) {
        if (current) return;
        transition_in(heading.$$.fragment, local);

        add_render_callback(() => {
          if (!section_transition)
            section_transition = create_bidirectional_transition(
              section,
              fade,
              {},
              true
            );
          section_transition.run(1);
        });

        transition_in(action.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(heading.$$.fragment, local);
        if (!section_transition)
          section_transition = create_bidirectional_transition(
            section,
            fade,
            {},
            false
          );
        section_transition.run(0);
        transition_out(action.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(heading, detaching);
        if (detaching) detach_dev(t0);
        if (detaching) detach_dev(section);
        destroy_each(each_blocks, detaching);
        if (detaching && section_transition) section_transition.end();
        if (detaching) detach_dev(t5);
        destroy_component(action, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_default_slot$6.name,
      type: "slot",
      source: "(29:0) <Layout>",
      ctx
    });

    return block;
  }

  function create_fragment$i(ctx) {
    let t;
    let current;

    const layout = new Layout({
      props: {
        $$slots: { default: [create_default_slot$6] },
        $$scope: { ctx }
      },
      $$inline: true
    });

    const block = {
      c: function create() {
        t = space();
        create_component(layout.$$.fragment);
        document.title = "Vitor Amaral | Themes";
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        insert_dev(target, t, anchor);
        mount_component(layout, target, anchor);
        current = true;
      },
      p: function update(ctx, [dirty]) {
        const layout_changes = {};

        if (dirty & /*$$scope, list, description, name*/ 71) {
          layout_changes.$$scope = { dirty, ctx };
        }

        layout.$set(layout_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(layout.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(layout.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        if (detaching) detach_dev(t);
        destroy_component(layout, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$i.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$i($$self, $$props, $$invalidate) {
    let { name = "Storytics" } = $$props;

    let {
      description = `Storytics is a design studio from Portugal. 
  We design and create Themes and Templates for bloggers, entrepreneurs, and creatives.
  A Web Design Studio with a story to tell. Every theme we create tells a story.`
    } = $$props;

    let { list = ["Templates", "Themes", "Agencies", "CSS", "Html"] } = $$props;
    const writable_props = ["name", "description", "list"];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<Page> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("Page", $$slots, []);

    $$self.$set = $$props => {
      if ("name" in $$props) $$invalidate(0, (name = $$props.name));
      if ("description" in $$props)
        $$invalidate(1, (description = $$props.description));
      if ("list" in $$props) $$invalidate(2, (list = $$props.list));
    };

    $$self.$capture_state = () => ({
      Layout,
      Action,
      Heading,
      fade,
      name,
      description,
      list
    });

    $$self.$inject_state = $$props => {
      if ("name" in $$props) $$invalidate(0, (name = $$props.name));
      if ("description" in $$props)
        $$invalidate(1, (description = $$props.description));
      if ("list" in $$props) $$invalidate(2, (list = $$props.list));
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [name, description, list];
  }

  class Page$4 extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$i, create_fragment$i, safe_not_equal, {
        name: 0,
        description: 1,
        list: 2
      });

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Page",
        options,
        id: create_fragment$i.name
      });
    }

    get name() {
      throw new Error(
        "<Page>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set name(value) {
      throw new Error(
        "<Page>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get description() {
      throw new Error(
        "<Page>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set description(value) {
      throw new Error(
        "<Page>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    get list() {
      throw new Error(
        "<Page>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }

    set list(value) {
      throw new Error(
        "<Page>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'"
      );
    }
  }

  /* src/App.svelte generated by Svelte v3.20.1 */

  // (19:2) <Route path="/">
  function create_default_slot_1$1(ctx) {
    let current;
    const home = new Page({ $$inline: true });

    const block = {
      c: function create() {
        create_component(home.$$.fragment);
      },
      m: function mount(target, anchor) {
        mount_component(home, target, anchor);
        current = true;
      },
      i: function intro(local) {
        if (current) return;
        transition_in(home.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(home.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(home, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_default_slot_1$1.name,
      type: "slot",
      source: '(19:2) <Route path=\\"/\\">',
      ctx
    });

    return block;
  }

  // (13:0) <Router {url}>
  function create_default_slot$7(ctx) {
    let t0;
    let t1;
    let t2;
    let t3;
    let t4;
    let current;

    const route0 = new Route({
      props: { path: "themes", component: Page$4 },
      $$inline: true
    });

    const route1 = new Route({
      props: {
        path: "opensource",
        component: Page$3
      },
      $$inline: true
    });

    const route2 = new Route({
      props: {
        path: "project/:id",
        component: Details
      },
      $$inline: true
    });

    const route3 = new Route({
      props: { path: "projects", component: Page$2 },
      $$inline: true
    });

    const route4 = new Route({
      props: { path: "about", component: Page$1 },
      $$inline: true
    });

    const route5 = new Route({
      props: {
        path: "/",
        $$slots: { default: [create_default_slot_1$1] },
        $$scope: { ctx }
      },
      $$inline: true
    });

    const block = {
      c: function create() {
        create_component(route0.$$.fragment);
        t0 = space();
        create_component(route1.$$.fragment);
        t1 = space();
        create_component(route2.$$.fragment);
        t2 = space();
        create_component(route3.$$.fragment);
        t3 = space();
        create_component(route4.$$.fragment);
        t4 = space();
        create_component(route5.$$.fragment);
      },
      m: function mount(target, anchor) {
        mount_component(route0, target, anchor);
        insert_dev(target, t0, anchor);
        mount_component(route1, target, anchor);
        insert_dev(target, t1, anchor);
        mount_component(route2, target, anchor);
        insert_dev(target, t2, anchor);
        mount_component(route3, target, anchor);
        insert_dev(target, t3, anchor);
        mount_component(route4, target, anchor);
        insert_dev(target, t4, anchor);
        mount_component(route5, target, anchor);
        current = true;
      },
      p: function update(ctx, dirty) {
        const route5_changes = {};

        if (dirty & /*$$scope*/ 2) {
          route5_changes.$$scope = { dirty, ctx };
        }

        route5.$set(route5_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(route0.$$.fragment, local);
        transition_in(route1.$$.fragment, local);
        transition_in(route2.$$.fragment, local);
        transition_in(route3.$$.fragment, local);
        transition_in(route4.$$.fragment, local);
        transition_in(route5.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(route0.$$.fragment, local);
        transition_out(route1.$$.fragment, local);
        transition_out(route2.$$.fragment, local);
        transition_out(route3.$$.fragment, local);
        transition_out(route4.$$.fragment, local);
        transition_out(route5.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(route0, detaching);
        if (detaching) detach_dev(t0);
        destroy_component(route1, detaching);
        if (detaching) detach_dev(t1);
        destroy_component(route2, detaching);
        if (detaching) detach_dev(t2);
        destroy_component(route3, detaching);
        if (detaching) detach_dev(t3);
        destroy_component(route4, detaching);
        if (detaching) detach_dev(t4);
        destroy_component(route5, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_default_slot$7.name,
      type: "slot",
      source: "(13:0) <Router {url}>",
      ctx
    });

    return block;
  }

  function create_fragment$j(ctx) {
    let current;

    const router = new Router({
      props: {
        url: /*url*/ ctx[0],
        $$slots: { default: [create_default_slot$7] },
        $$scope: { ctx }
      },
      $$inline: true
    });

    const block = {
      c: function create() {
        create_component(router.$$.fragment);
      },
      l: function claim(nodes) {
        throw new Error(
          "options.hydrate only works if the component was compiled with the `hydratable: true` option"
        );
      },
      m: function mount(target, anchor) {
        mount_component(router, target, anchor);
        current = true;
      },
      p: function update(ctx, [dirty]) {
        const router_changes = {};

        if (dirty & /*$$scope*/ 2) {
          router_changes.$$scope = { dirty, ctx };
        }

        router.$set(router_changes);
      },
      i: function intro(local) {
        if (current) return;
        transition_in(router.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        transition_out(router.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        destroy_component(router, detaching);
      }
    };

    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment$j.name,
      type: "component",
      source: "",
      ctx
    });

    return block;
  }

  function instance$j($$self, $$props, $$invalidate) {
    let url = "";
    const writable_props = [];

    Object.keys($$props).forEach(key => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
        console.warn(`<App> was created with unknown prop '${key}'`);
    });

    let { $$slots = {}, $$scope } = $$props;
    validate_slots("App", $$slots, []);

    $$self.$capture_state = () => ({
      Router,
      Route,
      Home: Page,
      About: Page$1,
      Projects: Page$2,
      ProjectDetails: Details,
      OpenSource: Page$3,
      Themes: Page$4,
      url
    });

    $$self.$inject_state = $$props => {
      if ("url" in $$props) $$invalidate(0, (url = $$props.url));
    };

    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }

    return [url];
  }

  class App extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance$j, create_fragment$j, safe_not_equal, {});

      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "App",
        options,
        id: create_fragment$j.name
      });
    }
  }

  const app = new App({
    target: document.body
  });

  return app;
})();
//# sourceMappingURL=bundle.js.map
