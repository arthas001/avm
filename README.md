# AVM(App Version Manager)

本应用是为了解决客户端应用的版本升级管理。

使用方法：

0. 应用接入新版本检测接口
1. 在本应用内创建应用，填写应用版本、当前版本下载地址等相关信息。
2. 应用上线。
3. 新版本上线，修改新版本相关信息


## 移动 app 版本控制服务

## config 使用注意

需要讲 ``` config.default.js ``` 文件重命名为 ``` config.js ```

## avm.sql

此文件为数据库导出文件，运行本项目前先执行此文件创建数据库。

## 一些测试数据

### 1. 管理员登陆

请求：

```
{
	"loginName": "admin",
	"passWord": "1234567890"
}
```

响应：

```
{
	"id": "cc8dd834f213400185f4f3c5d34c17c0",
	"loginName": "admin",
	"nickName": "天涯路人",
	"email": "hanxuepeng001@163.com",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNjOGRkODM0ZjIxMzQwMDE4NWY0ZjNjNWQzNGMxN2MwIiwibG9naW5OYW1lIjoiYWRtaW4iLCJpYXQiOjE0OTUxNjM0OTUsImV4cCI6MTQ5NTE2NzA5NX0.gFqiBIipeeZSvFhc-OUiw8XFrJMQUORqOjvoZuD5mpk"
}
```

## 创建超级管理员的方法

1. 先调用用户注册接口创建用户
2. 在数据库中将用户的 isAdmin 字段改为 1

用户注册：

```
{
	"loginName": "admin",
	"passWord": "1234567890",
	"nickName": "天涯路人",
	"email": "hanxuepeng001@163.com"
}
```
