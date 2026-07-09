---
title: python的自动化运维六（读文件、写文件）
published: 2026-06-20
pinned: false
description: python的自动化运维六（读文件、写文件）
tags:
  - python
draft: false
category: 教程
image: api
---
# 读文件
```python
try:  
    f=open('text.txt','r')  #用open方法创建io流，来读取文件第一个是文件路径，写文件名就是在当前路径下识别，r是读
    s_tr=f.read()  #把文件全部读到内存中
    print(s_tr)  #打印出来  
except BaseException as e:  
    print(e)
finally：
	if f:#如果有f输出
		f.close()#关闭io流
```
以上是读取文件的基本代码，但是过于繁琐所以简化为以下方式
```python
try:  
    with open("text.txt","r") as f:  #这个是创建io流读取文件赋值给f
        print(f.read())  #这个就是文件督导内存中并打印结束后自动关闭io流
except BaseException as e:  
    print(e)
```
这样就简化代码，输出结果
```plain
hello
world
```
但是如果文件很大有10g直接输出到内存容易爆内存，所以可以使用`read(size)`来反复调用，但是不要用在读中文文件中会报错
```python
try:  
    with open("text.txt","r") as f:  
        print(f.read(2))  
        print(f.read(2))  
        print(f.read(2))  
        print(f.read(2))  
        print(f.read(2))  
        print(f.read(2))  
except BaseException as e:  
    print(e)
```
结果
```
he
ll
o

wo
rl
d
```
如果是配置文件，也可以调用`readlines()`最方便

```python
try:  
    with open('text.txt','r',encoding="utf-8") as f: #这里可以的utf-8就可以识别中文，不然会乱码
        for i in f.readlines():  #这里一个循环直接把全部打印出来
            print(i.strip())  
except BaseException as e:  
    print(e)
```
# 读二进制文件
读二进制文件则`r`要改成`rb`
```python
try:  
    with open("text.png","rb") as f:  #这个是创建io流读取二进制文件赋值给f
        print(f.read())  #这个就是文件督导内存中并打印结束后自动关闭io流
except BaseException as e:  
    print(e)
```
# 写文件
```python
try:  
    with open("text.txt","a+",encoding="utf-8") as f:  #a+是续写w是覆盖，写入还是使用a+，utf-8让写入的文字用utf-8编码输入
        f.write("你好\n")  
except BaseException as e:  
    print(e)
```

读写练习

```python
def write():  
    try:  
        with open("text1.txt","a+",encoding="utf-8") as f:  
            while True:  
                userinput=input("请输入内容，按q退出：")  
                if userinput.lower() == "q":  
                    break  
                if not userinput:  
                    continue  
                f.write(userinput)  
                f.write("\n")  
                f.flush()  
                print(f"以保存：{userinput}")  
    except BaseException as e:  
        print(e)  
  
def read():  
    try:  
        print("="*50)  
        with open("text1.txt","r",encoding="utf-8") as f:  
            for i in f.readlines():  
                print(i.strip())  
        print("="*50)  
    except BaseException as e:  
        print(e)  
  
def main():  
    while True:  
        user=input("请输入操作：写入/读取,q或Q退出：")  
        if user == "写入":  
            write()  
        if user == "读取":  
            read()  
        if not user:  
            continue  
        if user.lower() == "q":  
            break  
  
if __name__ == "__main__" :  
    main()
```

