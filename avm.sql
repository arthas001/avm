/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : localhost
 Source Database       : avm

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : utf-8

 Date: 05/19/2017 11:46:18 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `apps`
-- ----------------------------
DROP TABLE IF EXISTS `apps`;
CREATE TABLE `apps` (
  `id` varchar(64) NOT NULL,
  `app_name` varchar(64) CHARACTER SET utf8mb4 NOT NULL COMMENT '应用名称',
  `platform` int(16) NOT NULL COMMENT '应用平台  0:iOS 1:android',
  `version_name` varchar(32) NOT NULL COMMENT '版本 例如：v1.0.0',
  `version_code` int(16) NOT NULL COMMENT '版本号  例如：10',
  `download_url` varchar(64) NOT NULL COMMENT 'app下载地址',
  `update_info` text CHARACTER SET utf8mb4 COMMENT '更新内容',
  `is_open` int(1) DEFAULT '0' COMMENT '版本检测是否开启 1: 开启  0:未开启',
  `status` int(1) DEFAULT '1' COMMENT '软删除状态码  0: 删除   1: 未删除',
  `key` varchar(128) NOT NULL COMMENT '应用的唯一key',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(64) NOT NULL,
  `loginname` varchar(64) NOT NULL COMMENT '登陆账号',
  `password` varchar(128) NOT NULL COMMENT '登陆密码',
  `nickname` varchar(64) NOT NULL COMMENT '昵称',
  `email` varchar(64) DEFAULT NULL,
  `isadmin` int(1) NOT NULL DEFAULT '0' COMMENT '是否是管理员',
  `salt` varchar(64) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
