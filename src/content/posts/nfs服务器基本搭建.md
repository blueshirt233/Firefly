---
title: nfs服务器基本搭建
published: 2026-05-16
pinned:
description: nfs服务器
tags:
  - nfs服务器
draft:
category: nfs服务器
---
# nfs服务器基本搭建和基本使用
服务器端
关闭防火墙和selinux
开始安装组件

```bash
dnf install nfs-utils
```

安装组件

```bash
mkdir /nfs-share
```
创建共享文件夹

```bash
chown nobody:nobody /nfs-share
```

修改文件权限

```bash
/nfs-share *(rw,sync,no_root_squash)
```

编辑 /etc/ecports文件

```bash
ecportfs -a #重新加载exports文件
systemctl start nfs-service
systemctl enable nfs-service
```

客户端

```bash
dnf install nfs-utils
```

安装组件

```bash
mkdir /root/share
```

创建共享文件夹

```bash
mount -t nfs 192.168.17.160:/nfs-share /root/share
```

临时挂载共享目录（关机后恢复）
编辑/etc/fstab

```bash
192.168.17.160:/nfs-share /root/share nfs defaults 0 0
```
永久挂载（重启后启用）