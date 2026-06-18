---
title: linux系统学习（后续慢慢补充）
published: 2026-05-19
pinned: false
description: linux系统学习
tags:
  - linux
draft: false
category: 教程
---
# Linux快速入门
## 1.Linux目录结构
linux目录结构，核心思想，万物皆文件，一切从“/”开始
![3c0080b6-df63-44b3-b188-e224455a32.png](https://tu.2644536256.date/file/blog/wengzhang/1779195961763_3c0080b6-df63-44b3-b188-e224455a32.png)
## 2.Linux命令入门
### ls命令
ls：以平铺的形式，列出当前工作目录下的内容
ls 【-a  -l  -h】
-a：列出全部文件包括隐藏文件
-l：以列表的形式，列出当前工作目录下的内容，并展示更多细节
-h：文件大小显示单位
通常使用为ll，ll -a
### cd命令
cd 【linux路径】：切换到指定文件夹下
cd ~  |  cd /  |  cd 【相对路径】  |  cd 【绝对路径】
### pwd命令
pwd：查看当前工作目录
### mkdir命令
mkdir 【-p】【linux路径】：创建文件夹，【-p】自动创建不存在的父文件夹，适用于多层级目录。
### touch命令
touch【linux路径】创建对应路径下的文件
### cat命令
cat【linux路径】：查看文件内容
### more命令
more【linux路径】：查看文件内容，支持翻页操作，空格键翻页
### cp命令
cp【-r】【源文件路径】【目标文件路径】：复制文件，【-r】复制文件夹表示递归
### mv命令
mv【源文件路径】【目标文件路径】：移动文件或文件夹，两个路径相同效果为改名
### rm命令
rm 【-r】【-f】【文件或文件夹路径】：删除文件或文件夹路径，【-r】删除文件夹，【-f】强制删除，【文件或文件夹路径】可以多个用空格隔开
### which命令
which【命令】：查找命令的程序文件在哪里
### find命令
find 【起始路径（从哪个文件夹下开始找）】 -name “被查找的文件名” ：查找文件
\*：表示通配符(包含空格)
test*：表示匹配任意以test开头的文件
*test：：表示匹配任意以test结尾的文件
\*test*：表示匹配任意包含test的文件
find 【起始路径（从哪个文件夹下开始找）】-size 【+或-{单位k、M、G}】：查找对应文件夹下对应大小的文件
fing /【-type f】 -size +50M -size -100M：查找大于50M小于100M的文件【-type f】：仅匹配普通文件（排除目录、设备文件等）。
### wc命令
wc【-c】【-m】【-l】【文件路径】统计文件的行数，单词数量
-c：统计bytes数量 -m：统计字符数量 -l：统计行数 -w：统计单词数量
### echo命令
echo：打印命令  echo `pwd` ：被反引号包围的作为命令执行结果打印出来  echo >和 echo >>分别为覆盖和追加。
### tail命令
tail【-f】【-num】【文件路径】：持续跟踪文件倒数【num】行数的内容，其中【-f】为持续跟踪
### vi编辑器
vi编辑器使用方法：
编辑模式：【i】当前光标位置开始编辑，编辑结束，【esc】后【：wq】保存退出，【：q！】为强制退出，【q】仅退出，【w】仅保存，【set nu】显示行数【set paste】设置粘贴模式
【a】当前光标位置之后开始编辑
【I】当前行的开头开始编辑
【A】当前行的结尾开始编辑
【o】当前光标的下一行开始编辑
【O】当前光标的上一行开始编辑
命令模式：【dd】删除光标所在行的内容
【ndd】n是数字，删除当前光标以下n行的内容
【yy】复制当前行的内容
【nyy】n是数字，复制当前光标以下n行的内容
【p】粘贴复制内容
【u】撤销修改
【ctrl+r】反向撤销
【gg】跳到行首
【G】跳到行尾
【dG】从当前行开始向下全部删除
【dgg】从当前行开始向上全部删除
【dS】从当前光标开始删除到本行结尾
【d0】从光标开始删除到本行开头
### su命令
su 【用户名】切换用户
给普通用户开放sudo命令：切换到root用户下执行visudo。会自动进入编辑 /etc/sudiers 文件， 在文件最后添加【用户】 ALL=(ALL)    NOPASSWD:ALL之后保存，切换回用户使用sudo无需密码
### 用户组
groupadd 【用户组名】创建用户组
groupdel 【用户组名】删除用户组名
### 用户
useradd 【-g，-d】【用户名】：创建用户【-g】指定用户的组（需要已存在的组），不指定，会创建同名组用户自动加入，【-d】指定用户home目录的路径，不指定就默认
userdel 【-r】【用户名】：删除用户【-r】删除用户home目录
id 【用户名】：查看用户所在组
usermod -aG 【用户组】【用户名】：将指定用户加入指定用户组
getent passwd：查看当前系统中有哪些用户
getent group：查看当前系统中有哪些用户组
### 文件控制信息
![de7627e6e84d4ef5b893d4002a01423f.png](https://tu.2644536256.date/file/blog/wengzhang/1779284995806_de7627e6e84d4ef5b893d4002a01423f.png)

### chmod
chmod【-r】 【权限】【文件或文件夹】：修改文件文件夹的权限信息，【-r】对文件夹内全部内容应用权限
### chown
chown 【-r】【用户】：【用户组】【文件或文件夹】：修改文件、文件夹所属用户和用户组，【-r】对文件夹内全部内容应用权限
### 快捷案件
【ctrl+c】：强制停止
【ctrl+d】：强制退出
【history】：搜索历史命令
【！q】：搜索以（q）开头的最后一次执行的历史命令
【ctrl+r】：搜索命令，搜索最后一次只想的相关命令
【ctrl+a】：跳到命令开头
【ctrl+e】：跳到命令结尾
【ctrl+键盘左键】：向左跳一个单词
【ctrl+键盘右键】：向右挑一个单词
### systemctl
systemctl 【参数】【服务名】
参数：
start、restart、disable、enable、stop
### ln软链接
ln -s 【被链接的文件或文件夹】【目的位置】：-s：创建软链接
### date命令
date【-d】【+格式化字符串】：【-d】按照给定的格式化字符串来显示日期，一般用于日期计算
date -d “+1 day”  ：结果为明天，加一天
date -d “-1 day”：结果为昨天，减一天
格式化字符串：
%Y    年
%y    年份后两位数字
%m    月份
%d     日
%H    小时
%M    分钟
%S    秒
%s    从1970-01-01 00：00：00 UTC 到现在的秒数
ntp服务需要下载，dnf install ntp 然后启动服务start和enable
ntpdate -u 时间服务器网址：手动跟时间服务器校准时间
修改时区：
rm -f /etc/localtime 删除本地时间
sudo ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 用软链接把上海市区重新给本地时区
### 修改ip和主机名
hostname 主机名 ： 修改主机名
vi /etc/NetworkManager/system-connections/网卡名 ：修改ip改为固定ip，其中auto改为manual，ipaddress：x.x.x.x/24/x.x.x.x,dns=x.x.x.x
### 下载
wget 【-b】 url：文件下载器 【-b】为后台下载，同时写入日志 
curl 【-O】url ：发起网络请求，【-O】用于下载
### 端口
nmap需要安装，nmap+ip扫描ip下有几个端口暴露
netstat可能需要安装 dnf install net-tools 
netstat -anp | gerp 6000：查看本机6000端口占用情况
### 进程
ps 【-e -f】：查看系统进程【-e】显示出全部进程【-f】 完全格式化的形式展示信息，一般是ps -ef来用
kill 【-9】进程ID：关闭进程【-9】为强制关闭
### 环境变量
使用evn命令来查看当前环境变量，这个具体再shell中详细描述
### 解压压缩
tar 【-c -v- x- f- z- C】解压文件
-c；创建压缩文件
-v：显示压缩解压过程
-x：解压模式
-f：要创建或解压的文件，这个要在多选中排最后
-z：gzip模式，不适用就是tarball格式
-C：解压到哪里，用于解压
zip 【-r】文件：zip压缩文件【-r】：被压缩的文件包含文件夹的时候使用
unzip 【-d】 文件：解压zip文件【-d】：指定解压要去的位置
## 磁盘管理
### du命令
du【-h,-a,-c-s】【文件目录】：查看目录下磁盘占用情况
-h：显示单位
-a：显示所有文件包括子文件
-c显示所有文件和子目录的大小后显示从大小
-s：只显示总大小
常用 du -sh 目录

### df命令
df -h：查看空余磁盘空间
![image.png](https://tu.2644536256.date/file/blog/wengzhang/1779517268346_image.png)

### lsblk命令
![image.png](https://tu.2644536256.date/file/blog/wengzhang/1779517431493_image.png)

### mount和umount命令
mount 【-o ro，rw】设备名 目录：挂载
umount 设备名：取消挂载

### fdisk命令
fdisk 设备名：对分区进行操作，会有中文提示
![image.png](https://tu.2644536256.date/file/blog/wengzhang/1779518573233_image.png)
mkfs -t xfs 设备名 ：格式化硬盘
# linux运维命令
## 基础运维命令
### top命令
![1470684-20180918100416703-87744477.png](https://tu.2644536256.date/file/blog/wengzhang/1779370619947_1470684-20180918100416703-87744477.png)

top行：主要判断系统负载压力大不大
1.load指要小于cpu核心数时，压力不大，反之进程排队，系统出现瓶颈
2.1分钟平均压力值大于15分钟平均压力值为系统压力开始上升，注意进程，反之是已经度过高峰期开始压力下降

task行：主要看两个指标，running和zombie，running较多对cpu压力较大，zombie较多也会占用系统资源及时清除

%cpu（s）行：其中id数值非常低说明cpu已经被吃满，wa长期过高代表磁盘读写太慢，需要更换读写更快的磁盘。按1可以看到每个cpu核心内的占用情况

mib mem行：只要free+buff/cache总量充足则内存不需要担心

mib swap行：这个数字往上升的时候，应该是系统物理内存已经耗尽，需要从硬盘中借内存，会大大降低io读写

按P强制按照cpu排序，按M强制按照内存排序，按k输入pid直接终止进程，15/9强制终止进程，按r调整进程优先级，按q退出，按m内存变建议看板

![QQ_1779511240554.png](https://tu.2644536256.date/file/blog/wengzhang/1779511269349_QQ_1779511240554.png)

### htop
安装htop需要先安装dnf install epel-release仓库


### free命令
free -h 可以显示单位
在free中内存优先看available：预计可用内存容量 约等于free+cache
swap是物理内存用完最后保障业务运行的手段，系统会自动将不常用的进程或缓存放到虚拟内存里，但是会大大降低交互速度，所以尽量不要用到swap，用到了说明系统内存已经不够用了，需要加内存

![QQ_1779513112679.png](https://tu.2644536256.date/file/blog/wengzhang/1779513136669_QQ_1779513112679.png)

### iftop
安装iftop需要先安装dnf install epel-release仓库

![QQ_1779514126393.png](https://tu.2644536256.date/file/blog/wengzhang/1779514145424_QQ_1779514126393.png)

1、iftop界面相关说明
界面上面显示的是类似刻度尺的刻度范围，为显示流量图形的长条作标尺用的。
中间的<= =>这两个左右箭头，表示的是流量的方向。
TX：发送流量
RX：接收流量
TOTAL：总流量
Cumm：运行iftop到目前时间的总流量
peak：流量峰值
rates：分别表示过去 2s 10s 40s 的平均流量

2、iftop相关参数
常用的参数
-i设定监测的网卡，如：# iftop -i eth1
-B 以bytes为单位显示流量(默认是bits)，如：# iftop -B
-n使host信息默认直接都显示IP，如：# iftop -n
-N使端口信息默认直接都显示端口号，如: # iftop -N
-F显示特定网段的进出流量，如# iftop -F 10.10.1.0/24或# iftop -F 10.10.1.0/255.255.255.0
-h（display this message），帮助，显示参数信息
-p使用这个参数后，中间的列表显示的本地主机信息，出现了本机以外的IP信息;
-b使流量图形条默认就显示;
-f这个暂时还不太会用，过滤计算包用的;
-P使host信息及端口信息默认就都显示;
-m设置界面最上边的刻度的最大值，刻度分五个大段显示，例：# iftop -m 100M
进入iftop画面后的一些操作命令(注意大小写)
按h切换是否显示帮助;
按n切换显示本机的IP或主机名;
按s切换是否显示本机的host信息;
按d切换是否显示远端目标主机的host信息;
按t切换显示格式为2行/1行/只显示发送流量/只显示接收流量;
按N切换显示端口号或端口服务名称;
按S切换是否显示本机的端口信息;
按D切换是否显示远端目标主机的端口信息;
按p切换是否显示端口信息;
按P切换暂停/继续显示;
按b切换是否显示平均流量图形条;
按B切换计算2秒或10秒或40秒内的平均流量;
按T切换是否显示每个连接的总流量;
按l打开屏幕过滤功能，输入要过滤的字符，比如ip,按回车后，屏幕就只显示这个IP相关的流量信息;
按L切换显示画面上边的刻度;刻度不同，流量图形条会有变化;
按j或按k可以向上或向下滚动屏幕显示的连接记录;
按1或2或3可以根据右侧显示的三列流量数据进行排序;
按<根据左边的本机名或IP排序;
按>根据远端目标主机的主机名或IP排序;
按o切换是否固定只显示当前的连接;
按f可以编辑过滤代码，这是翻译过来的说法，我还没用过这个！
按!可以使用shell命令，这个没用过！没搞明白啥命令在这好用呢！
按q退出监控。

### iftop

![QQ_1779514540835.png](https://tu.2644536256.date/file/blog/wengzhang/1779514566732_QQ_1779514540835.png)

![QQ_1779514562910.png](https://tu.2644536256.date/file/blog/wengzhang/1779514588162_QQ_1779514562910.png)

![QQ_1779514861151.png](https://tu.2644536256.date/file/blog/wengzhang/1779514886633_QQ_1779514861151.png)

![QQ_1779514934034.png](https://tu.2644536256.date/file/blog/wengzhang/1779514956590_QQ_1779514934034.png)

![QQ_1779514978178.png](https://tu.2644536256.date/file/blog/wengzhang/1779514998951_QQ_1779514978178.png)

### journalctl

![QQ_1779515223165.png](https://tu.2644536256.date/file/blog/wengzhang/1779515247805_QQ_1779515223165.png)

![QQ_1779515235962.png](https://tu.2644536256.date/file/blog/wengzhang/1779515260902_QQ_1779515235962.png)

![QQ_1779515317918.png](https://tu.2644536256.date/file/blog/wengzhang/1779515340889_QQ_1779515317918.png)

![QQ_1779515392848.png](https://tu.2644536256.date/file/blog/wengzhang/1779515411177_QQ_1779515392848.png)

![QQ_1779515532641.png](https://tu.2644536256.date/file/blog/wengzhang/1779515556448_QQ_1779515532641.png)

![QQ_1779515556545.png](https://tu.2644536256.date/file/blog/wengzhang/1779515583470_QQ_1779515556545.png)

### 服务器排查核心

![QQ_1779515621813.png](https://tu.2644536256.date/file/blog/wengzhang/1779515639972_QQ_1779515621813.png)

![QQ_1779515645257.png](https://tu.2644536256.date/file/blog/wengzhang/1779515669260_QQ_1779515645257.png)

![QQ_1779515670295.png](https://tu.2644536256.date/file/blog/wengzhang/1779515693315_QQ_1779515670295.png)

![QQ_1779515684744.png](https://tu.2644536256.date/file/blog/wengzhang/1779515704068_QQ_1779515684744.png)

![QQ_1779515697779.png](https://tu.2644536256.date/file/blog/wengzhang/1779515714942_QQ_1779515697779.png)

![QQ_1779515709429.png](https://tu.2644536256.date/file/blog/wengzhang/1779515726764_QQ_1779515709429.png)

![QQ_1779515720362.png](https://tu.2644536256.date/file/blog/wengzhang/1779515735470_QQ_1779515720362.png)

![QQ_1779515735923.png](https://tu.2644536256.date/file/blog/wengzhang/1779515751957_QQ_1779515735923.png)

### 服务器响应变慢

![QQ_1779515752579.png](https://tu.2644536256.date/file/blog/wengzhang/1779515767708_QQ_1779515752579.png)

### 磁盘空间不够
![QQ_1779515826972.png](https://tu.2644536256.date/file/blog/wengzhang/1779515865836_QQ_1779515826972.png)

### 网络带宽异常高
![QQ_1779515871154.png](https://tu.2644536256.date/file/blog/wengzhang/1779515899606_QQ_1779515871154.png)


### ======================================



![QQ_1779515927182.png](https://tu.2644536256.date/file/blog/wengzhang/1779515948590_QQ_1779515927182.png)