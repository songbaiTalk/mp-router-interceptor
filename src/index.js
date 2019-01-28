export default class mpvueRouter {
  constructor(options) {
    this.name = "mpVueRooter";
    this.beforeHooks = [];
    this.afterHooks = [];
    this.Class = this.constructor;
  }
  /**
   * static方法，对class的static的方法，其this指向class，
   * 也就是es5的构造函数的prototype而不是类的实例
   * @param {*} Vue
   *
   */
  static install(Vue) {
    if (this.installed) return;
    this.installed = true;
    const isDef = v => v !== undefined;
    this._Vue = Vue;
    Vue.mixin({
      /**
       * 钩子函数中的this全都指向vue实例
       */
      beforeCreate() {
        if (isDef(this.$options.router)) {
          Vue.prototype._router = this.$options.router;
          Vue.prototype._route = {
            path: "",
            params: Object.create(null)
          };
        }
      },
      onLoad() {
        const pages = getCurrentPages();
        this.$route.path = "/" + pages[pages.length - 1].route;
      },
      onUnload() {
        //TODO
      }
    });
    Object.defineProperty(Vue.prototype, "$router", {
      get() {
        return this._router;
      }
    });
    Object.defineProperty(Vue.prototype, "$route", {
      get() {
        return this._route;
      }
    });
  }

  /**
   * this指向router实例而不是vue
   * 实例，而router与route挂载到
   * vue的prototpye上，可以考虑将
   * 此类方法更改为static的
   *
   * 指向router的实例的好处是可以
   * 脱离页面环境而使用
   */
  push(to) {
    this.switchRoute(to, wx.navigateTo);
  }
  replace(to) {
    this.switchRoute(to, wx.redirectTo);
  }
  switchTab(to) {
    this.switchRoute(to, wx.switchTab);
  }
  switchRoute(to, adaptor) {
    const next = this.popHooks(to, "before");
    if (!next) {
      return false;
    } else {
      const routeObj = {
        url: to["path"]
      };
      adaptor(routeObj);
      this.Class._Vue.prototype.$route.params = to.params;
      this.popHooks(to, "after");
      return true;
    }
  }

  popHooks(to, type) {
    (async () => {
      const from = this._route;
      const hookMap = {
        before: this.beforeHooks,
        after: this.afterHooks
      };
      const hooks = hookMap[type];
      const next = status => {
        return status !== false;
      };
      var signal = true;
      hooks.some(hook => {
        if (type == "before") {
          signal = hook(to, from, next);
          return signal == false;
        } else {
          hook(to, from);
          return false;
        }
      });
      return signal;
    })();
  }
  beforeEach(fn) {
    this.beforeHooks.push(fn);
  }
  afterEach(fn) {
    this.afterHooks.push(fn);
  }
}
