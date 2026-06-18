---
title: zabbix简易搭建
published: 2026-05-16
pinned: false
description: zabbix简易搭建
tags:
  - zabbix
draft: false
category: 教程
---
![428a96a8a917429b86cf0bed477e0220.jpeg](https://tu.2644536256.date/file/blog/wengzhang/1778940232605_428a96a8a917429b86cf0bed477e0220.jpeg)




安装zabbix-agent

```bash
rpm -Uvh https://repo.zabbix.com/zabbix/7.4/release/rocky/9/noarch/zabbix-release-latest-7.4.el9.noarch.rpm
```

安装软件库
```bash
dnf install zabbix-agent2
```

直接下载zabbix-agent2控件

然后修改配置文件
```bash
/etc/zabbix/zabbix-agent2.conf
```
修改其中的
server：改zabbix主机ip
serveractive：改zabbix主机ip
hostname改主机名与zabbix配置相同
