---
title: ollama本地部署ai记录
published: 2026-05-16
pinned: false
description: ollama本地部署ai记录
tags:
  - ollama
draft: false
category: 教程
---
# ollama本地部署ai记录
## 前期准备
这次是部署在rockylinux上的，还是照常把selinux和防火墙关闭然后update一下
要注意显卡在linux系统上要安装驱动，不然跑ai显卡不出力就很，你懂吧.....
先看一下显卡有没有被机器识别到，要是没有输出什么东西，就要看一下接口是不是有问题了
```bash
# 列出所有PCI设备中的NVIDIA显卡
lspci | grep -i nvidia
# 或者搜索显示相关的设备 (包括VGA, 3D控制器等)
lspci | grep -E -i "vga|3d|display"
```
然后输入
```bash
nvidia-smi  #查看显卡详细状态和驱动版本，这个没有输出或者显示没有这个命令，那就是没装驱动装一下驱动
```
这个是安装系统包管理器
```bash
sudo dnf install epel-release
sudo dnf install nvidia-driver-latest-dkms
```
但是我的显卡比较新是英伟达的pro 6000，这个包管理器旧了，没找到，要换一种方式

1. **安装必要的依赖和工具**  
    首先，我们需要安装一些必要的依赖：

```bash
    sudo dnf install epel-release -y
    sudo dnf groupinstall "Development Tools" -y
    sudo dnf install dkms kernel-devel kernel-headers pciutils libglvnd-opengl libglvnd-glx libglvnd-devel acpid pkgconf-pkg-config -y
```
    > 其中，`dkms` 是核心工具，它能确保每次系统内核更新后，NVIDIA 驱动都能自动重新编译适配，让驱动保持稳定
    
2. **添加 NVIDIA 官方软件源并安装驱动**
    
    > **重要提示**：在安装闭源驱动前，需要先禁用系统自带的开源驱动 `nouveau`。**请务必执行下方第 5 步的“禁用 Nouveau 驱动”操作**，重启后再继续这个步骤，不然可能会导致驱动冲突或安装失败。
    
    接下来，我们添加 NVIDIA 的官方源，并安装正确的驱动模块：
    
```bash
    # 添加 NVIDIA 官方软件源
    sudo dnf config-manager --add-repo http://developer.download.nvidia.com/compute/cuda/repos/rhel9/$(uname -i)/cuda-rhel9.repo
    # 安装关键模块
    sudo dnf module install nvidia-driver:open-dkms -y
    # 安装驱动、CUDA 支持等必要组件
    sudo dnf install nvidia-driver nvidia-driver-cuda nvidia-kmod-common nvidia-modprobe nvidia-settings dnf-plugin-nvidia -y
```
    
    **关键说明**：
    
    - **使用 `:open-dkms`**：这是专门针对 Blackwell 这类较新架构的推荐选择。
        
    - **安装 `nvidia-settings`**：这是一个图形化面板，可以用来详细查看和管理你的 Pro 6000 显卡，非常实用。
        
3. **重启系统**  
    安装完成后，重启系统让驱动生效：
    
    bash
    
```bash
    sudo reboot
```
    
4. **验证安装**
    
```bash
    nvidia-smi
```
    
    如果能看见清晰的显卡信息（特别是显示你的 "RTX PRO 6000" 型号和驱动版本），就说明驱动已经成功安装了。

正常会显示这个东西

```
[root@localhost ~]# nvidia-smi
Mon May 25 14:12:25 2026       
+-------------------------------------------------------------------------------+
| NVIDIA-SMI 595.71.05              Driver Version: 595.71.05      CUDA Version: 13.2     |
+-------------------------------------+---------------------+------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA RTX PRO 6000 Blac...    Off |   00000000:01:00.0 Off |                  Off |
| 30%   32C    P8             14W /  600W |       4MiB /  97887MiB |      0%      Default |
|                                         |                        |                  N/A |
+-------------------------------------+---------------------+-------------------+

+-------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI              PID   Type   Process name                        GPU Memory |
|        ID   ID                                                               Usage      |
|===============================================================================|
|  No running processes found                                                             |
+-------------------------------------------------------------------------------+

```


安装成功后就开始安装ollama
## 安装ollama
在官网上就有安装的一键命令，但是由于网络所以下载很成问题，所以只能外部下载导入服务器离线安装
[Release v0.12.0 · ollama/ollama](https://github.com/ollama/ollama/releases/tag/v0.12.0)
只能去这个网站下载相应版本的ollama，然后导入服务器中

```bash
tar -zxvf ollama-linux-amd64.tgz
```
使用这个命令来解压导入服务器的安装包

解压出来会有两个文件【bin、lib】
这两个都移动到/usr/local这个目录下
确认一下/usr/local/bin/ollama这个能不能执行，不能的话要chmod一下
```bash
sudo useradd -r -s /bin/false -U -m -d /usr/share/ollama ollama
```
创建一个ollama用户
- `-r`：创建系统用户。
    
- `-s /bin/false`：禁止此用户登录。
    
- `-U`：创建与用户名同名的用户组。
    
- `-m -d /usr/share/ollama`：创建家目录 `/usr/share/ollama`，用于存放配置文件

创建 systemd 服务单元文件
```bash
sudo vim /etc/systemd/system/ollama.service
```
里面写
```
[Unit]
Description=Ollama Service
After=network-online.target

[Service]
ExecStart=/usr/local/bin/ollama serve
User=ollama
Group=ollama
Restart=always
RestartSec=3
Environment="PATH=$PATH"

[Install]
WantedBy=default.target
```

其中Environment="PATH=$PATH"这个就是下载位置，我就是因为默认下载位置太小要改一下
就改成
```bash
Environment="OLLAMA_MODELS=/home/ollama_models"
```
改到home下面了

保存文件后，执行以下命令：

```bash
# 1. 重新加载 systemd 配置
sudo systemctl daemon-reload
# 2. 设置 ollama 服务开机自启
sudo systemctl enable ollama
# 3. 立即启动 ollama 服务
sudo systemctl start ollama
# 4. 查看服务状态，确认是否运行正常
sudo systemctl status ollama
```

如果 `status` 显示 `active (running)`，服务就配置成功了。

之后执行一下ollama list 看一下ollama是不是部署成功，正常可以显示一行表头，里面没有东西

## 下载模型
下载模型就简单了
```bash
ollama run 模型名字
```
就开始下载了
下载完ollama list里面应该就有模型了

要用这个模型，也是
```
ollama run 模型名字
```
开始对话

## 创建api
现在要创建api为了让局域网的其他客户端能够使用这个ai，现在只能localhost本地访问，要开放访问
还是到这个文件里面去编辑
```bash
sudo vim /etc/systemd/system/ollama.service
```


```bash
[Service]
ExecStart=/usr/local/bin/ollama serve
User=ollama
Group=ollama
Restart=always
RestartSec=3
Environment="OLLAMA_MODELS=/home/ollama_models"
Environment="OLLAMA_HOST=0.0.0.0:11434"   # 添加这一行
```

之后

```bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
```
重载一下配置，重启一下ollama

```bash
sudo netstat -tlnp | grep 11434
```
看一下端口开放的情况


之后局域网访问就http://192.168.7.103:11434，浏览器应该显示ollama is running 就是可以了

那么这个就是api地址：http://192.168.7.103:11434
密钥随便填，填什么都行，但是一定要有，不能没有，ollama不需要验证，但是要有这个东西
这样就可以使用了
