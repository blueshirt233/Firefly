---
title: docker快速使用记录
published: 2026-05-24
pinned: false
description: docker快速使用记录
tags:
  - docker
draft: false
category: 教程
---
# docker快速使用记录
当前我使用的是rockylinux9，所有设置都在这个系统上执行
## 安装
优先关闭selinux和防火墙然后update一下
之后安装必须的依赖
```bash
sudo dnf install -y yum-utils device-mapper-persistent-data lvm2
```

由于 Docker 官方没有为 Rocky Linux 单独准备仓库，我们直接使用与 RHEL/CentOS 兼容的官方仓库。
```bash
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```
替换源，不然下载很慢
```bash
sudo dnf config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo #这是阿里云的
```
安装docker
```bash
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

- **docker-ce**：Docker 引擎的核心
    
- **docker-ce-cli**：与 Docker 守护进程交互的命令行工具
    
- **[containerd.io](https://containerd.io/)**：底层容器运行时
    
- **docker-buildx-plugin**：Docker 的扩展构建工具
    
- **docker-compose-plugin**：用于定义和运行多容器应用的工具

设置docker的启动和自启
```bash
systemctl start docker && systemctl enable docker
```
最后配置一下镜像加速，不然从docker上拉取速度很慢
```bash
curl -fsSL https://linuxmirrors.cn/docker.sh -o docker.sh && sudo bash docker.sh
```
如果这个不能用就手动添加一下或修改
```bash
vi /etc/docker/daemon.json
```
格式是：
```bash
{
  "registry-mirrors": [
    "[镜像加速地址1]",
    "[镜像加速地址2]"
  ],
  "insecure-registries": []
}
```
之后加载配置重启服务
```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

之后随便拉取一个实施效果

## 使用
使用方面可以看这个[[docker入门]]