#Demo
```javascript
// 定义routes
const router = new mpRouter({
    routes: [
        {
            name: 'policyMain',
            path: '/pages/policy/main'
        }
    ]
})

// 在初始化Vue时引用router
const app = new Vue({
  // 省略若干...
  router
});

// 跳转到指定的路由
this.$router.push({
  name: 'policyMain'
})
```