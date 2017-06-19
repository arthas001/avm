# 0. AVM(App Version Manager) 简介


AVM的主要应用场景是管理发布的 app 的更新升级。当你想持续运营一款 app 的时候，最主要的一个问题是如何解决线上出现的 bug 。iOS 平台的升级由 Apple 的 App Store 进行把控，而Android在国内则没有这样的一个平台。在以前经历的项目中，每发布一个 app 就需要在这个应用的后台服务中集成一次管理服务，尽管有可以复用的代码，我觉着还是不如将版本管理服务独立成一个单独的服务，用平台的方式来进行集中的管理。AVM 就是基于这个想法而诞生的。由于本人前端的一些技术还未了解，AVM 就只实现了接口，UI就暂未实现。如果有前端大牛想基于本项目来完成一个完整的平台，欢迎 fork，暂时不接受 UI 相关的 pr，一是本人不擅长UI部分，二是也不想限制了前端的实现方式。有了接口，想要 WEB 前端还是桌面前端，或者想在移动端上实现，看你擅长的领域了。 

# 1. 使用方法

## 配置数据库

本项目使用的是 MySQL ，运行项目前需要配置数据库

```
var config = {
    /************** JWT 配置 **************/
    jwt_secret: "appversionmanager",
    jwt_expiresIn: '1h',

    /************* 数据库配置 ***************/
    db:{
        dialect: 'mysql',
        username: 'root',
        password: '1234567890',
        db_name: 'avm',
        host: 'localhost',
        port: 3306
    }
};

```
然后将``avm.sql``导入。
## 运行项目：

```
1. git clone https://git.oschina.net/sealand/avm.git
2. cd appversionmanager
3. npm start
```

## 测试效果
![dfadfa]()


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
