export default class mpvueRouter {
  constructor(options) {
    this.name = "mpVueRooter";
    this.beforeHooks = [];
    this.afterHooks = [];
    this.Class = this.constructor;
    // 配置的路由
    if (options) this.routesArr = options.routes;
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
    (async () => {
      await this.switchRoute(to, wx.navigateTo);
    })();
  }
  replace(to) {
    (async () => {
      await this.switchRoute(to, wx.redirectTo);
    })();
  }
  switchTab(to) {
    (async () => {
      await this.switchRoute(to, wx.switchTab);
    })();
  }
  async switchRoute(to, adaptor) {
    const next = await this.popHooks(to, "before");
    if (!next) {
      return false;
    } else {
      const routeObj = {
        url: this.getPath(to)
      };
      adaptor(routeObj);
      this.Class._Vue.prototype.$route.params = to.params;
      await this.popHooks(to, "after");
      return true;
    }
  }

  async popHooks(to, type) {
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

    for (let index = 0; index < hooks.length; index++) {
      if (type == "before") {
        signal = await hooks[index](to, from, next);
      } else {
        await hooks[index](to, from);
      }
      if (signal === false) {
        break;
      }
    }

    return signal;
  }
  beforeEach(fn) {
    this.beforeHooks.push(fn);
  }
  afterEach(fn) {
    this.afterHooks.push(fn);
  }

  // 根据to拿到对应的path
  getPath(to) {
    if (to.path) {
      return to.path
    } else if (to.name && this.routesArr) {
      let path = '/404';
      this.routesArr.some(item => {
        if (item.name === to.name) {
          path = item.path;
          return true;
        }
        return false;
      });
      return path;
    }
    return '/404';
  }
}
