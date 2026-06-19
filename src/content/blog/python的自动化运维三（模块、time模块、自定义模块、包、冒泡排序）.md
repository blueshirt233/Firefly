---
title: python的自动化运维三（模块、time模块、自定义模块、包、冒泡排序）
published: 2026-06-14
pinned: false
description: python的自动化运维三（模块、time模块、自定义模块、包、冒泡排序）
tags:
  - python
draft: false
category: 教程
image: api
---
# 模块
使用模块可以提高代码的可维护性
建立自己的模块不要用中文、特殊字符，不要跟系统模块重复
## 模块的使用
使用import引入模块
```python
import math
import os
import subprocess
```
使用时用模块名+函数名
```python
import math as m #起别名，在当前代码下使用m，一般用于长模块名
from math import * #直接导入所有函数，在当前代码下直接使用函数，不要模块名+函数名
from math import 函数名（可以导入多个，分离）  #只导入指定函数名，在当前代码下直接使用函数，不要模块名+函数名
```

# time模块
```python
import time as t #导入time模块并起别名  
  
print(t.time()) #1781402187.2512467是指1970.1.1到今天的时间  
  
st=t.time()#程序开始时间  
l=[]  
for i in range(10000000):  
    l.append(i)  
et=t.time()#程序结束时间  
  
print(f"消耗的时间：{et-st}s的时间")
```

# 自定义模块
创建一个基本的模块
```python
#模块名是mymodule，不要有空格等特殊字符
#创建自定义模块  
  
def add(x,y):  
    return x+y
```
使用这个模块
```python
import mymodule as my  
  
print(my.add(1, 1))  #2
```

# 包
这是防止多人合作时同时创建了多个同名模块导致代码报错
创建两个包【zhangsan】、【lisi】，下面同时又mymodule模块
```python
import lisi.mymodule as lm  
import zhangsan.mymodule as zm  
  
print(zm.add(1, 1))  
print(lm.add(1, 1))
```
别名在这里避免长模块名，导入时使用包名.模块名
包创建时会有__init__.py文件作用
1.识别目录为python包
2.初始化包级别的代码
3.定义__all__变量，控制from package import * 的行为
4.导入子模块或子包是他们更容易访问

# 冒泡排序
```python
def arr(l):  
    m=l  
    for i in range(len(m)-1):  
        for j in range(len(m)-1-i):  
            if m[j]>m[j+1]:  
                m[j],m[j+1]=m[j+1],m[j]  
    return l
```
```python
import maopao  
    
print(maopao.arr([14, 33, 27, 88, 50, 12, 36]))
```
