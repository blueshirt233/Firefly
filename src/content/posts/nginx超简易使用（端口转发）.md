---
title: nginx超简易使用（端口转发）
published: 2026-05-16
pinned:
description: nginx超简易使用（端口转发）
tags:
  - nginx
draft: false
image:
category: 教程
---
# nginx

### nginx的简易使用
先关闭防火墙和selinux
systemctl stop firewalld
systemctl disable firewalld
vi /etc/selinux/config //修改配置文件 disbaled
更新系统
dnf update -y

dnf install nginx  //这就已经安装好nginx了

接下来基本配置一下，优化nginx配置文件
/etc/nginx/nginx.conf

```bash
user nginx;
worker_processes auto;  # 自动根据CPU核心数设置
error_log /var/log/nginx/error.log warn;
pid /run/nginx.pid;

# 加载动态模块
load_module modules/ngx_http_geoip_module.so;
load_module modules/ngx_http_image_filter_module.so;

events {
    worker_connections 1024;  # 每个worker最大连接数
    use epoll;               # 使用epoll模型（Linux）
    multi_accept on;         # 一次接受多个连接
}

http {
    # 基础设置
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # 日志格式
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    
    access_log /var/log/nginx/access.log main;
    
    # 性能优化
    sendfile on;                     # 使用sendfile系统调用
    tcp_nopush on;                   # 优化数据包发送
    tcp_nodelay on;                  # 禁用Nagle算法
    keepalive_timeout 65;            # 长连接超时
    types_hash_max_size 2048;        # types哈希表大小
    
    # 文件上传限制
    client_max_body_size 100m;       # 最大上传文件大小
    
    # 压缩设置
    gzip on;                         # 启用gzip压缩
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript
               application/json application/javascript application/xml+rss
               application/atom+xml image/svg+xml;
    
    # 包含其他配置
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;  # 如果使用站点目录
}
```
开始配置网站信息
没有这个文件的创建一个
touch /etc/nginx/con.f/default.conf

```bash
################################
 #jumpserver.laplace.com
################################
server {
    listen 80;
    server_name jumpserver.laplace.com;

    location / {
        proxy_pass http://192.168.17.153:80;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

################################
# zbx.laplace.com
################################
server {
    listen 80;
    server_name zbx.laplace.com;

    location / {
        proxy_pass http://192.168.7.154:8080;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_http_version 1.1;
        proxy_set_header Connection "";
    }
}

################################
# openclaw.laplace.com
################################
server {
    listen 80;
    server_name openclaw.laplace.com;

    location / {
        proxy_pass http://192.168.17.152:18789;
        #proxy_set_header Authorization "Bearer 21f4e27d0a1e7ff73210f59f02e1ceee4e7a034ee03545f3";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_http_version 1.1;
        proxy_set_header Connection "";
    }
}

################################
# st.laplace.com暂不开放
################################
#server {
#    listen 80;
#    server_name st.laplace.com;

#    location / {
#        proxy_pass http://192.168.17.151:8080;

#        proxy_set_header Host $host;
#        proxy_set_header X-Real-IP $remote_addr;
#        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#        proxy_set_header X-Forwarded-Proto $scheme;

#        proxy_http_version 1.1;
#        proxy_set_header Connection "";
#    }
#}

```
