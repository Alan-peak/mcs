const Mock = require('mockjs')
const qs = require('qs')
const domain = 'http://localhost:8090/wyw'
const Random = Mock.Random
var status = 200
var msg = '成功'

// count用于用户ID递增
var count = 136
// 初始化用户信息
var allUser = [{
  userId: 127,
  username: 'admin',
  password: '123456',
  mobile: '18813291795',
  email: '18813291795@qq.com',
  roleName: 'admin',
  userState: 'true',
  createDate: new Date()
},
{
  userId: 128,
  username: 'wyw',
  password: '123456',
  mobile: '18813291794',
  email: '18813291794@qq.com',
  roleName: 'admin',
  userState: 'false',
  createDate: new Date()
},
{
  userId: 129,
  username: 'zl',
  password: '123456',
  mobile: '18813291793',
  email: '18813291793@qq.com',
  roleName: 'admin',
  userState: 'true',
  createDate: new Date()
},
{
  userId: 130,
  username: 'wzy',
  password: '123456',
  mobile: '18813291792',
  email: '18813291792@qq.com',
  roleName: 'admin',
  userState: 'true',
  createDate: new Date()
},
{
  userId: 131,
  username: 'zjx',
  password: '123456',
  mobile: '18813291791',
  email: '18813291791@qq.com',
  roleName: 'admin',
  userState: 'false',
  createDate: new Date()
},
{
  userId: 132,
  username: 'hgx',
  password: '123456',
  mobile: '18813291790',
  email: '18813291790@qq.com',
  roleName: 'common',
  userState: 'true',
  createDate: new Date()
},
{
  userId: 133,
  username: 'jzh',
  password: '123456',
  mobile: '18813291796',
  email: '18813291796@qq.com',
  roleName: 'common',
  userState: 'true',
  createDate: new Date()
},
{
  userId: 134,
  username: 'wsf',
  password: '123456',
  mobile: '18813291797',
  email: '18813291797@qq.com',
  roleName: 'common',
  userState: 'false',
  createDate: new Date()
},
{
  userId: 135,
  username: 'lq',
  password: '123456',
  mobile: '18813291798',
  email: '18813291798@qq.com',
  roleName: 'common',
  userState: 'false',
  createDate: new Date()
},
{
  userId: 136,
  username: 'lmj',
  password: '123456',
  mobile: '18813291799',
  email: '18813291799@qq.com',
  roleName: 'common',
  userState: 'true',
  createDate: new Date()
}
]

// 分页模糊查询用户
const users = req => {
  let params = qs.parse(req.url.split('?')[1])
  let pageNum = parseInt(params.pageNum)
  let pageSize = parseInt(params.pageSize)
  let start = (pageNum - 1) * pageSize
  let end = start + pageSize
  let matchUser = []
  if (params.query === '') {
    matchUser = allUser
  } else {
    for (let i = 0; i < allUser.length; i++) {
      if (allUser[i].username.indexOf(params.query) !== -1) {
        matchUser.push(allUser[i])
      }
    }
  }
  // 如下判断的缘由是：当将最后一页的全部数据都删除时，前端页数已经发生变化，但实际上pageNum不变，导致数据返回
  if (start >= matchUser.length) {
    end = start
    start -= pageSize
    pageNum--
  }
  return {
    data: matchUser.slice(start, end),
    total: matchUser.length,
    pageNum: pageNum,
    meta: {
      msg,
      status
    }
  }
}
Mock.mock(RegExp(`${domain}/userManage/getUsersForPage` + '.*'), 'get', users)

// 更新用户状态
const updateUserState = req => {
  let params = JSON.parse(req.body).params
  let flag = false
  for (let i = 0; i < allUser.length; i++) {
    if (allUser[i].userId === params.userId) {
      allUser[i].userState = params.userState
      flag = true
    }
  }
  if (!flag) {
    msg = '失败'
    status = 888
  }
  return {
    meta: {
      msg,
      status
    }
  }
}
Mock.mock(`${domain}/userManage/updateUserState`, 'post', updateUserState)

// 添加用户
const addUser = req => {
  let user = JSON.parse(req.body)
  count++
  user.userId = count
  user.roleName = 'common'
  user.userState = Random.boolean()
  user.createDate = Random.date()
  allUser.push(user)
  return {
    meta: {
      msg,
      status
    }
  }
}
Mock.mock(`${domain}/userManage/addUser`, 'post', addUser)

// 根据用户ID获取用户信息
const getUserByUserId = req => {
  let params = qs.parse(req.url.split('?')[1])
  let userId = parseInt(params.userId)
  let tmpArrId
  for (let i = 0; i < allUser.length; i++) {
    if (allUser[i].userId === userId) {
      tmpArrId = i
    }
  }
  return {
    data: allUser[tmpArrId],
    meta: {
      msg,
      status
    }
  }
}
Mock.mock(RegExp(`${domain}/userManage/getUserByUserId` + '.*'), 'get', getUserByUserId)

// 根据用户ID更新用户信息
const updateUserByUserId = req => {
  let user = JSON.parse(req.body)
  for (let i = 0; i < allUser.length; i++) {
    if (allUser[i].userId === user.userId) {
      allUser[i].mobile = user.mobile
      allUser[i].email = user.email
    }
  }
  return {
    meta: {
      msg,
      status
    }
  }
}
Mock.mock(`${domain}/userManage/updateUserByUserId`, 'post', updateUserByUserId)

// 根据用户ID删除用户信息
const deleteUserByUserId = req => {
  let params = JSON.parse(req.body)
  let tmpArrId
  console.log(params)
  for (let i = 0; i < allUser.length; i++) {
    if (allUser[i].userId === params.userId) {
      tmpArrId = i
    }
  }
  allUser.splice(tmpArrId, 1)
  console.log(allUser)
  return {
    meta: {
      msg,
      status
    }
  }
}
Mock.mock(`${domain}/userManage/deleteUserByUserId`, 'post', deleteUserByUserId)
