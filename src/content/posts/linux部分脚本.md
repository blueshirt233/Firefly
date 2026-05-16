---
title: linux部分脚本
published: 2026-05-16
pinned: false
description: linux部分脚本
tags:
  - linux
draft: false
category: 教程
---
# linux安装好后的关闭防火墙和selinux的脚本




基本版本
```bash
#!/bin/bash


#关闭防火墙
echo "开始关闭防火墙"
systemctl stop firewalld
systemctl disable firewalld
systemctl status firewalld
echo "已关闭防火墙"
echo ""
echo ""


echo "开始关闭selinx"
if [ $(getenforce) = "disbaled" ]; then
	echo "已关闭selinx，状态为$T"
else
	sed -i 's/enforcing/disabled/g' /etc/selinux/config  #sed -i ’s/原内容/新内容/g‘ 文件位置
	setenforce 0;
	echo "已设置为disabled,现在的状态是："$(getenforce)
fi
echo ""
echo ""
echo "结束脚本"
```

函数版本
```bash
#!/bin/bash

stop_firewalld() {
	#关闭防火墙
	echo "开始关闭防火墙"
	systemctl stop firewalld
	systemctl disable firewalld
	systemctl status firewalld
	echo "已关闭防火墙"
	echo ""
	echo ""
}

stop_selinux() {
	echo "开始关闭selinx"
	if [ $(getenforce) = "disbaled" ]; then
		echo "已关闭selinx，状态为$T"
	else
		sed -i 's/enforcing/disabled/g' /etc/selinux/config
		setenforce 0;
		echo "已设置为disabled,现在的状态是："$(getenforce)
	fi
	echo ""
	echo ""
	echo "结束脚本"
}

main() {
	stop_firewalld
	stop_selinux
}

main
```


# linux配置邮件服务器的脚本
基础版本

```bash
#!/bin/bash

echo "安装邮件服务器必要组件中"
dnf install -y postfix s-nail > /dev/null0
echo "安装完成"

echo "启动中"
systemctl start postfix
systemctl enable postfix
echo "启动完成"

echo ""
echo "配置postfix文件"
cp /etc/s-nail.rc /etc/s-nail.rc.back

read -p "你的邮箱账号是：" account
read -p "你的邮箱公司是：" business
read -p "你的授权码是：" password

cat >>/etc/s-nail.rc<< EOF
set from="${account}@${business}.com"
set smtp=smtp.${business}.com:587
set smtp-auth-user="${account}@${business}.com"
set smtp-auth-password="$password"
set smtp-auth=login
set smtp-use-starttls
EOF

echo"配置完成请测试"
```
函数版本

```bash
#!/bin/bash

#安装并启动
start_email() {
	echo "安装必要组件中..."
	dnf install -y postfix s-nail > /dev/null0
	if [ $? -eq 0 ]; then
		echo "安装完成"
	else
		echo "安装失败"
		exit 1
	fi
}

config_email(){
cp /etc/s-nail.rc /etc/s-nail.rc.back

read -p "你的邮箱账号是：" account
read -p "你的邮箱公司是：" business
read -p "你的授权码是：" password

cat >>/etc/s-nail.rc<< EOF
set from="${account}@${business}.com"
set smtp=smtp.${business}.com:587
set smtp-auth-user="${account}@${business}.com"
set smtp-auth-password="$password"
set smtp-auth=login
set smtp-use-starttls
EOF
}

main(){
	start_email
	
	echo "启动中"
	systemctl start postfix
	systemctl enable postfix
	echo "已启动完成"
	echo ""
	
	config_email
}

main
```

备份脚本参考
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/4087c115fbb94cbdb015d8a09bc6a8f6.png#pic_center)
备份脚本参考2
```bash
"beifen.sh" 14L, 360B                                                                                                                                                                                                            7,27         全部
#!/bin/bash

echo "开始备份文件"
time=`date +%Y%m%d` #时间的格式，出输出为：20260409

#开始遍历并筛选/date下的文件 
for f in `find /date -type f -name "*.txt"`
do
        #开始备份文件但是是在源目录下备份，可以改为到其他目录后打包发送到企业云留底
        echo "备份文件：$f"
        cp ${f} ${f}_${time}
done

```
应用检查脚本
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/0e70878a83c849409e4e5aba8629c804.png#pic_center)
恶意ip监控并邮件通知
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/35529ebab1ba4c54ab01e2b935da0056.png#pic_center)
批量创建用户
```bash
#!/bin/bash

#检查文件是否存在以防扰乱后续文件
if [ -f /tmp/userinfo.txt ];then
	echo "检查环境中..."
	rm -rf /tmp/userinfo.txt
else
	echo "检查环境中..."
fi

#判断必要组件mkpassed是否存在
if  which mkpasswd ; then
	echo " "
	echo "开始创建用户"
	echo ""
else
	echo "没有必要组件，正在安装..."
	dnf install -y mkpasswd > /dev/null0
	if [ $? -eq 0 ]; then
		echo "安装完成，开始创建用户"
	else
		echo "安装失败，请检查"
		exit 1
	fi
fi

#生成随机密码并创建用户
for i in `seq -w 0 03`
do
	p=$(openssl rand -base64 15)
	useradd user_${i}
	echo "${p}" | passwd --stdin user_${i}
	echo "user_${i} ${p}" >> /tmp/userinfo.txt
done
```

应用查询存活
```bash
#!/bin/bash
#检查是否存在pgrep
if ! which pgrep
then
	echo "缺少重要组件"
	exit 1
fi
#检查是否存在ss
if ! which ss
then
	echo "缺少重要组件"
	exit 1
fi
#判断应用是否存在
check_pgrep(){
	if pgrep "$1" &>/dev/null0
	then
		return 0
	else
		return 1
	fi
}
#判断应用端口是否存在
check_ss(){
	if ss -lnp "$1" &>/dev/null0
	then
		return 0
	else
		return 1
	fi
}
#两个都在才能判断服务正常
main(){
	if  check_pgrep $1 && check_ss $2
	then
		echo "服务正常"
	else
		echo "服务不正常"
	fi
}

main

```

# 服务器健康检查脚本

功能: 检查服务器的CPU、内存、磁盘、网络等资源使用情况，以及关键服务状态。
应用场景: 定期监控服务器健康状况，及时发现潜在问题。
示例代码:
```bash
#!/bin/bash

# 获取CPU使用率
cpu_usage=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}')

# 获取内存使用率
mem_usage=$(free -m | awk 'NR==2{printf "%.2f%%", $3*100/$2 }')

# 获取磁盘使用率
disk_usage=$(df -h | awk '$NF=="/"{printf "%s", $5}')

# 获取网络连接数
net_connections=$(netstat -ant | wc -l)

# 检查关键服务状态
service_status=$(systemctl is-active nginx)

# 输出结果
echo "CPU使用率: $cpu_usage%"
echo "内存使用率: $mem_usage"
echo "磁盘使用率: $disk_usage"
echo "网络连接数: $net_connections"
echo "Nginx服务状态: $service_status"
```

2. 日志清理脚本
功能: 定期清理过期的日志文件，释放磁盘空间。
应用场景: 防止日志文件无限增长，占用过多磁盘空间。
示例代码:
```bash
#!/bin/bash

# 定义日志目录和保留天数
log_dir="/var/log"
keep_days=7

# 查找并删除过期日志文件
find $log_dir -type f -mtime +$keep_days -exec rm -f {} \;

echo "日志清理完成！"
```
3. 备份脚本
功能: 定期备份重要数据和配置文件。
应用场景: 防止数据丢失，确保业务连续性。
示例代码:
```bash
#!/bin/bash

# 定义备份目录和备份文件名
backup_dir="/backup"
backup_file="backup_$(date +%Y%m%d).tar.gz"

# 创建备份目录
mkdir -p $backup_dir

# 打包备份文件
tar -czf $backup_dir/$backup_file /etc /var/www

echo "备份完成！"
```
4. 监控脚本
功能: 监控系统资源、服务状态、网站可用性等，并发送告警通知。
应用场景: 实时监控系统运行状态，及时发现和处理故障。
示例代码:
```bash
#!/bin/bash

# 定义监控项和阈值
cpu_threshold=80
mem_threshold=90
disk_threshold=85

# 获取监控数据
cpu_usage=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}')
mem_usage=$(free -m | awk 'NR==2{printf "%.2f%%", $3*100/$2 }')
disk_usage=$(df -h | awk '$NF=="/"{printf "%s", $5}' | sed 's/%//g')

# 判断是否超过阈值并发送告警
if [ $cpu_usage -gt $cpu_threshold ]; then
    echo "CPU使用率超过阈值！" | mail -s "CPU告警" admin@example.com
fi

if [ $mem_usage -gt $mem_threshold ]; then
    echo "内存使用率超过阈值！" | mail -s "内存告警" admin@example.com
fi

if [ $disk_usage -gt $disk_threshold ]; then
    echo "磁盘使用率超过阈值！" | mail -s "磁盘告警" admin@example.com
fi
```
总结
服务器健康检查脚本：检查服务器的CPU、内存、磁盘、网络等资源使用情况，以及关键服务状态。
日志清理脚本：定期清理过期的日志文件，释放磁盘空间。
备份脚本：定期备份重要数据和配置文件。
监控脚本：监控系统资源、服务状态、网站可用性等，并发送告警通知。

1. 自动化部署脚本
功能: 自动化部署应用程序，包括代码拉取、依赖安装、配置修改、服务启动等。
应用场景: 简化部署流程，提高部署效率，减少人为错误。
示例代码:
```bash
#!/bin/bash

# 定义项目目录和代码仓库地址
project_dir="/var/www/myapp"
repo_url="git@github.com:user/myapp.git"

# 拉取最新代码
cd $project_dir
git pull $repo_url

# 安装依赖
npm install

# 修改配置文件
sed -i 's/DATABASE_HOST=localhost/DATABASE_HOST=db.example.com/' .env

# 重启服务
systemctl restart myapp

echo "部署完成！"
```
2. 用户管理脚本
功能: 批量创建、删除、修改用户账号和权限。
应用场景: 简化用户管理流程，提高管理效率。
示例代码:
```bash
#!/bin/bash

# 定义用户列表文件
user_list="user_list.txt"

# 遍历用户列表文件
while read -r username password; do
    # 创建用户
    useradd -m -s /bin/bash $username

    # 设置用户密码
    echo "$username:$password" | chpasswd

    # 添加用户到sudo组
    usermod -aG sudo $username
done < $user_list

echo "用户创建完成！"
```
3. 软件安装脚本
功能: 自动化安装和配置软件包。
应用场景: 简化软件安装流程，提高安装效率。
示例代码:
```bash
#!/bin/bash

# 更新软件包列表
apt-get update

# 安装软件包
apt-get install -y nginx mysql-server php-fpm

# 配置软件包
sed -i 's/listen = 127.0.0.1:9000/listen = /var/run/php/php7.4-fpm.sock/' /etc/php/7.4/fpm/pool.d/www.conf

# 启动服务
systemctl start nginx mysql php7.4-fpm

echo "软件安装完成！"
```
4. 网络配置脚本
功能: 配置网络接口、IP地址、路由、防火墙等。
应用场景: 简化网络配置流程，提高配置效率。
示例代码:
```bash
#!/bin/bash

# 配置网络接口
cat <<EOF > /etc/network/interfaces
auto eth0
iface eth0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1
EOF

# 重启网络服务
systemctl restart networking

# 配置防火墙
ufw allow 22/tcp
ufw allow 80/tcp
ufw enable

echo "网络配置完成！"
```
总结
自动化部署脚本：自动化部署应用程序，提高部署效率。
用户管理脚本：批量创建、删除、修改用户账号和权限。
软件安装脚本：自动化安装和配置软件包，简化安装流程。
网络配置脚本：配置网络接口、IP地址、路由、防火墙等，简化网络配置流程。

1. 安全加固脚本
功能: 加强系统安全配置，例如禁用root登录、修改SSH端口、配置防火墙等。
应用场景: 提高系统安全性，防止恶意攻击。
示例代码:
```bash
#!/bin/bash

# 禁用root登录
sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

# 修改SSH端口
sed -i 's/#Port 22/Port 2222/' /etc/ssh/sshd_config

# 配置防火墙
ufw allow 2222/tcp
ufw deny 22/tcp
ufw enable

# 重启SSH服务
systemctl restart sshd

echo "安全加固完成！"
```
2. 数据同步脚本
功能: 将数据从一个服务器同步到另一个服务器。
应用场景: 实现数据备份、数据迁移、负载均衡等。
示例代码:
```bash
#!/bin/bash

# 定义源目录和目标目录
src_dir="/data"
dst_dir="user@backup.example.com:/backup"

# 使用rsync同步数据
rsync -avz --delete $src_dir $dst_dir

echo "数据同步完成！"
```
3. 数据库备份脚本
功能: 定期备份数据库，并压缩存储。
应用场景: 防止数据库数据丢失，确保数据安全。
示例代码:
```bash
#!/bin/bash

# 定义数据库信息和备份目录
db_user="root"
db_password="password"
db_name="mydatabase"
backup_dir="/backup"

# 创建备份目录
mkdir -p $backup_dir

# 备份数据库
mysqldump -u$db_user -p$db_password $db_name | gzip > $backup_dir/$db_name_$(date +%Y%m%d).sql.gz

echo "数据库备份完成！"
```
4. 网站监控脚本
功能: 监控网站可用性、响应时间、状态码等，并发送告警通知。
应用场景: 实时监控网站运行状态，及时发现和处理故障。
示例代码:
```bash
#!/bin/bash

# 定义网站URL和监控频率
website="https://www.example.com"
interval=60

# 循环监控网站
while true; do
    # 获取网站状态码和响应时间
    response=$(curl -o /dev/null -s -w "%{http_code}\n%{time_total}\n" $website)
    status_code=$(echo "$response" | head -n 1)
    response_time=$(echo "$response" | tail -n 1)

    # 判断状态码是否正常
    if [ $status_code -ne 200 ]; then
        echo "网站不可用！状态码: $status_code" | mail -s "网站监控告警" admin@example.com
    fi

    # 判断响应时间是否超时
    if [ $(echo "$response_time > 2" | bc) -eq 1 ]; then
        echo "网站响应时间过长！响应时间: $response_time 秒" | mail -s "网站监控告警" admin@example.com
    fi

    # 等待指定时间后继续监控
    sleep $interval
done
```
5. 日志分析脚本
功能: 分析日志文件，提取关键信息，生成统计报告。
应用场景: 分析网站访问日志、系统日志、应用程序日志等，发现潜在问题。
示例代码:
```bash
#!/bin/bash

# 定义日志文件和分析结果输出文件
log_file="/var/log/nginx/access.log"
output_file="log_analysis.txt"

# 统计访问量最多的IP地址
awk '{print $1}' $log_file | sort | uniq -c | sort -nr | head -n 10 > $output_file

# 统计访问量最多的URL
awk '{print $7}' $log_file | sort | uniq -c | sort -nr | head -n 10 >> $output_file

# 统计HTTP状态码分布
awk '{print $9}' $log_file | sort | uniq -c | sort -nr >> $output_file

echo "日志分析完成！"
```
1. 自动化测试脚本
功能: 自动化执行测试用例，生成测试报告。
应用场景: 提高测试效率，保证软件质量。
示例代码:
```bash
#!/bin/bash

# 定义测试用例目录和测试报告输出文件
test_case_dir="/tests"
report_file="test_report.txt"

# 遍历测试用例目录
for test_case in $test_case_dir/*; do
    # 执行测试用例
    result=$(bash $test_case)

    # 记录测试结果
    echo "$test_case: $result" >> $report_file
done

echo "自动化测试完成！"
```
2. 性能测试脚本
功能: 模拟用户请求，测试系统性能指标，例如响应时间、吞吐量、并发数等。
应用场景: 评估系统性能瓶颈，优化系统性能。
示例代码:
```bash
#!/bin/bash

# 定义测试URL和并发数
website="https://www.example.com"
concurrency=100

# 使用ab命令进行性能测试
ab -n 1000 -c $concurrency $website > performance_test.txt

echo "性能测试完成！"
```
3. 代码格式化脚本
功能: 自动格式化代码，使其符合编码规范。
应用场景: 提高代码可读性和可维护性。
示例代码:
```bash
#!/bin/bash

# 定义代码目录和格式化工具
code_dir="/code"
formatter="black"

# 遍历代码目录
find $code_dir -name "*.py" -exec $formatter {} \;

echo "代码格式化完成！"
```
4. 依赖管理脚本
功能: 管理项目依赖，例如安装、更新、删除依赖包。
应用场景: 简化依赖管理流程，提高开发效率。
示例代码:
```bash
#!/bin/bash

# 定义项目目录和依赖管理工具
project_dir="/project"
package_manager="pip"

# 安装依赖
cd $project_dir
$package_manager install -r requirements.txt

echo "依赖安装完成！"
```
5. 版本控制脚本
功能: 管理代码版本，例如提交代码、创建分支、合并代码等。
应用场景: 实现代码版本控制，方便代码回滚和协作开发。
示例代码:
```bash
#!/bin/bash

# 定义代码目录和版本控制工具
code_dir="/code"
vcs="git"

# 提交代码
cd $code_dir
$vcs add .
$vcs commit -m "提交代码"
$vcs push

echo "代码提交完成！"
```
6. 文档生成脚本
功能: 自动生成项目文档，例如API文档、用户手册等。
应用场景: 提高文档编写效率，保证文档与代码同步更新。
示例代码:
```bash
#!/bin/bash

# 定义项目目录和文档生成工具
project_dir="/project"
doc_generator="sphinx"

# 生成文档
cd $project_dir/docs
$doc_generator-build . ../docs

echo "文档生成完成！"
```
7. 邮件发送脚本
功能: 自动发送邮件，例如发送告警通知、发送测试报告等。
应用场景: 实现自动化通知，提高工作效率。
示例代码:
```bash
#!/bin/bash

# 定义邮件内容
subject="测试邮件"
body="这是一封测试邮件。"

# 发送邮件
echo "$body" | mail -s "$subject" admin@example.com

echo "邮件发送完成！"
```
