!function(t){var e={};function r(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(o,n,function(e){return t[e]}.bind(null,n));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e),r.d(e,"default",function(){return o});class o{constructor(t){this.name="mpVueRooter",this.beforeHooks=[],this.afterHooks=[],this.Class=this.constructor}static install(t){if(this.installed)return;this.installed=!0;this._Vue=t,t.mixin({beforeCreate(){(t=>void 0!==t)(this.$options.router)&&(t.prototype._router=this.$options.router,t.prototype._route={path:"",params:Object.create(null)})},onLoad(){const t=getCurrentPages();this.$route.path="/"+t[t.length-1].route},onUnload(){}}),Object.defineProperty(t.prototype,"$router",{get(){return this._router}}),Object.defineProperty(t.prototype,"$route",{get(){return this._route}})}push(t){this.switchRoute(t,wx.navigateTo)}replace(t){this.switchRoute(t,wx.redirectTo)}switchTab(t){this.switchRoute(t,wx.switchTab)}switchRoute(t,e){if(this.popHooks(t,"before")){return e({url:t.path}),this.Class._Vue.prototype.$route.params=t.params,this.popHooks(t,"after"),!0}return!1}popHooks(t,e){const r=this._route,o={before:this.beforeHooks,after:this.afterHooks},n=t=>!1!==t;var s=!0;return o[e].some(o=>"before"==e?0==(s=o(t,r,n)):(o(t,r),!1)),s}beforeEach(t){this.beforeHooks.push(t)}afterEach(t){this.afterHooks.push(t)}}}]);