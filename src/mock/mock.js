const Mock = require('mockjs')
const Random = Mock.Random
const domain = 'http://localhost:8090/wyw'
const code = 200
const status = 200
const msg = '成功'

// 登录
const login = req => {
  let params = JSON.parse(req.body)
  if (params.username === 'admin' && params.password === '123456') {
    return {
      status
    }
  }
}
Mock.mock(`${domain}/login`, 'post', login)

// 系统菜单
const allSysMenu = [{
  id: 125,
  authName: '用户管理',
  path: 'users',
  order: 1,
  children: [{
    id: 110,
    authName: '用户列表',
    path: 'users',
    children: []
  }]
}, {
  id: 103,
  authName: '权限管理',
  path: 'rights',
  order: 2,
  children: [{
    id: 104,
    authName: '商品管理',
    path: null,
    children: []
  }]
}, {
  id: 101,
  authName: '商品管理',
  path: 'goods',
  order: 3,
  children: [{
    id: 104,
    authName: '商品管理',
    path: null,
    children: []
  }]
}, {
  id: 102,
  authName: '订单管理',
  path: 'orders',
  order: 4,
  children: [{
    id: 104,
    authName: '商品管理',
    path: null,
    children: []
  }]
}, {
  id: 145,
  authName: '数据统计',
  path: 'reports',
  order: 5,
  children: [{
    id: 104,
    authName: '商品管理',
    path: null,
    children: []
  }]
}]

const getAllSysMenu = req => {
  return {
    data: allSysMenu,
    meta: {
      msg,
      status
    }
  }
}
Mock.mock(`${domain}/sysMenu/getAll`, 'get', getAllSysMenu)

// 随机生成文章数据
const postData = req => {
  console.log(req)
  let posts = []
  for (let i = 0; i < 10; i++) {
    let post = {
      title: Random.csentence(10, 25),
      icon: Random.dataImage('250x250', '文章icon'),
      author: Random.cname(),
      date: Random.date() + '' + Random.time()
    }
    posts.push(post)
  }
  return {
    code,
    posts
  }
}
Mock.mock(`${domain}/posts`, 'get', postData)
