---
title: python的自动化运维（二、函数，psutil、切片、迭代、列表生成式、生成器、模块）
published: 2026-06-03
pinned: false
description: python的自动化运维（二、函数，psutil、切片、迭代、列表生成式、生成器、模块）
tags:
  - python
draft: false
category: 教程
image: api
---
# python函数
主要是为了代码的复用，让代码更加简洁
## 函数调用
int():转换为整数
input():添加输入信息返回字符串型
abs():绝对值
max():寻找最大值
min();寻找最小值
float():字符串和整型转换为浮点数
str():转换成字符串
bool():0、空、None都是false，其他都是true
hex():整数转换十六进制
函数名其实是指向一个函数对象的引用，可以把函数赋值给变量相当于起别名
## 普通函数
def 函数名（参数）：
	函数体
	return 返回值（可有可无）
# 空函数
def 函数名（参数）：
	pass
## 函数参数
函数定义的时候可以在（）里面写参数称为**形参**，使用函数传递进去的参数叫**实参**几个形参对应几个实参
```python
def calcSum(beg,end):
	sum = 0
	for i in range(beg,end+1): #range左开右闭,现在这个=[beg，end]
		sum+=i
	print(sum)
calcSum(1,100)
calcSum(300,400)
calcSum(1,1000)
```
## 默认参数

```python
def power(x, n=2):
    s = 1
    while n > 0:
        n = n - 1
        s = s * x
    return s
```
这里n=2，就是n被设置成默认参数2，此时
```plain
>>> power(5)
25
```
只需要输入5就可以，n为默认值，但是n如果不是2的时候就需要重写参数
```plain
>>> power(5, 3)
125
```
重新给n赋值

## 可变参数
```python
def num(*number):  
    s=0  
    for i in number:  
        s=s+i  
    return s  
  
  
print(num(1,2,3,4,5))
```
number前面增加\*号就是可以参数就变，下面调用这个函数的时候填入了五个参数可以正常运行

## 关键字参数
```python
def kwages(**other):  
    name = other.get("name")  
    age = other.get("age")  
    address = other.get("address","ningbo")  
    print(name,age,address)  
  
  
kwages(name="clj", age=12)
```
其实关键字参数本质是可以传入键值对参数，在传入参数后自动组装成一个字典，可以传入多个字典，当然也可以先创建一个字典然后把这个字典全部导入

```python
ex = {"name":"qjl","age":13,"address":"anhui"}  
  
def add(**ex):  
    name = ex.get("name")  
    age = ex.get("age")  
    address = ex.get("address","ningbo")  
    print(name,age,address)  
  
add(**ex)
```

## 多个返回值
```python
def kwages(**other):  
    name = other.get("name")  
    age = other.get("age")  
    address = other.get("address","ningbo")  
    # print(name,age,address)  
    return name,age,address  
  
  
# print(kwages(name="clj", age=12))  
print(kwages(name="clj",age=12))
```
返回值需要调用者来打印
同时需要屏蔽一个参数可以使用_来屏蔽
```python
def kwages(**other):  
    name = other.get("name")  
    age = other.get("age")  
    address = other.get("address","ningbo")  
    # print(name,age,address)  
    return name,age,address  
  
  
# print(kwages(name="clj", age=12))  
a,b,c=kwages(name="clj",age=12)  
print(a,b,c)
```
改为
```python
def kwages(**other):  
    name = other.get("name")  
    age = other.get("age")  
    address = other.get("address","ningbo")  
    # print(name,age,address)  
    return name,age,address  
  
  
# print(kwages(name="clj", age=12))  
_,b,c=kwages(name="clj",age=12)  
print(b,c)
```
这样代码不会报错同时可以获取到后面两个值

# 参数拓展
## 引用函数参数
```python
def greet():  
    print("hello")  
  
def call_greet(func):  
    func()  
  
  
call_greet(greet)
```
这里的func()其实是因为greet函数作为call_greet的实参引入，把整个函数赋值给func所以才能写func(),如果greet不是函数或者方法之类的，就不能这么写，认真写return或者print

```python
def add(x,y):  
    return x+y  
def mul(x,y):  
    return x*y  
  
func_list=[add,mul]  
print(func_list[0](1, 2))  
print(func_list[1](3, 4))
```

也可以把函数作为列表中的数据引入，然后读取列表数据输入参数也可以执行代码

# psutil
这个是第三方模块使用之前需要安装
linux使用pip install psutil ，windows自行百度
以下是提取电脑信息的脚本
```python
import psutil  #导入psutil模块  
import socket  
  
def get_cpu():  
    cpu_count = psutil.cpu_count()  
    cpu_percent = psutil.cpu_percent(interval=2)  
    return {'cpu_count':cpu_count,'cpu_percent':cpu_percent}  #这里使用字典返回  
  
def get_memery():  
    total=psutil.virtual_memory().total  
    available=psutil.virtual_memory().available  
    percent=psutil.virtual_memory().percent  
    return {'total':total,'available':available,'percent':percent}  
  
def get_disk():  
    disk_total = psutil.disk_usage('E://').total  
    disk_used = psutil.disk_usage('E://').used  
    disk_percent = psutil.disk_usage('E://').percent  
    return {'disk_total':disk_total,'disk_used':disk_used,'disk_percent':disk_percent}  
  
def get_intnets():  
    net_sent=psutil.net_io_counters().bytes_sent  
    net_recv=psutil.net_io_counters().bytes_recv  
    return {'net_sent':net_sent,'net_recv':net_recv}  
  
def update():  
    date={}  #创建一个字典来接收信息  
    date.update(get_cpu())  #update方法来更新date字典，会增加不会覆盖  
    date.update(get_memery())  
    date.update(get_disk())  
    date.update(get_intnets())  
    return date  #返回date字典  
  
def report():  
    hostname = socket.gethostname()  #获取主机名  
    data = update()  #把update函数赋值给data  
    data.update({'hostname':hostname})   
    print(f"报告")  
    print("="*30)  
    print(f"主机名是：{data['hostname']}")  
    print(f"核心数是：{data['cpu_count']}")  
    print(f"总内存是：{data['total']/1024/1024/1024:.2f}GB")  
    print(f"已用内存是：{data['available']/1024/1024/1024:.2f}GB")  
    print(f"内存占用率{data['percent']}%")  
    print(f"磁盘总容量：{data['disk_total']}")  
    print(f"磁盘已使用容量：{data['disk_used']}")  
    print(f"磁盘占用率：{data['disk_percent']}%")  
    print(f"已发送：{data['net_sent']/1024/1024/1024:.2f}")  
    print(f"已接收：{data['net_recv']/1024/1024/1024:.2f}")  
  
  
if __name__ == '__main__':  
     report()
```

这就是psutil的具体用法

返回的结果
```
报告
==============================
主机名是：DESKTOP-M5VE6AQ
核心数是：16
总内存是：31.94GB
已用内存是：18.94GB
内存占用率40.7%
磁盘总容量：4000768323584
磁盘已使用容量：3502423371776
磁盘占用率：87.5%
已发送：29.88
已接收：487.84
```

# 切片
切片实际上就是提取list或tuple的部分元素，十分方便
一个list
```plain
L = ['Michael', 'Sarah', 'Tracy', 'Bob', 'Jack']
```
之前使用一个一个print或者for循环给提取出来，现在使用切片优势是代码变短
基本语法
```plain
	L[0:3] #取前三个元素
	```
	```plain
	['Michael', 'Sarah', 'Tracy']
```
`L[0:3]`表示，从索引`0`开始取，直到索引`3`为止，但不包括索引`3`。即索引`0`，`1`，`2`，正好是3个元素。
如果第一个索引是`0`，还可以省略：

```plain
>>> L[:3]
['Michael', 'Sarah', 'Tracy']
```
也可以从索引1开始，取出2个元素出来：

```plain
>>> L[1:3]
['Sarah', 'Tracy']
```
类似的，既然Python支持`L[-1]`取倒数第一个元素，那么它同样支持倒数切片，试试：

```plain
>>> L[-2:]   #取最后两个
['Bob', 'Jack']
>>> L[-2:-1]  #这个为什么就只有一个 因为从-2开始取，到-1为止，但是不包含-1
['Bob']
```
切片操作十分有用。我们先创建一个0-99的数列：
```plain
>>> L = list(range(100))
>>> L
[0, 1, 2, 3, ..., 99]
```

可以通过切片轻松取出某一段数列。比如前10个数：

```plain
>>> L[:10]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

后10个数：

```plain
>>> L[-10:]
[90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
```

前11-20个数：

```plain
>>> L[10:20]
[10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
```

前10个数，每两个取一个：

```plain
>>> L[:10:2]
[0, 2, 4, 6, 8]
```

所有数，每5个取一个：

```plain
>>> L[::5]
[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]
```

甚至什么都不写，只写`[:]`就可以原样复制一个list：

```plain
>>> L[:]
[0, 1, 2, 3, ..., 99]
```

tuple也是一种list，唯一区别是tuple不可变。因此，tuple也可以用切片操作，只是操作的结果仍是tuple：

```plain
>>> (0, 1, 2, 3, 4, 5)[:3]
(0, 1, 2)
```

字符串`'xxx'`也可以看成是一种list，每个元素就是一个字符。因此，字符串也可以用切片操作，只是操作结果仍是字符串：

```plain
>>> 'ABCDEFG'[:3]
'ABC'
>>> 'ABCDEFG'[::2]
'ACEG'
```
# 迭代
如果给定一个`list`或`tuple`，我们可以通过`for`循环来遍历这个`list`或`tuple`，这种遍历我们称为迭代（Iteration）。

```plain
>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> for key in d.keys():
...     print(key)
...
a
c
b

>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> for key in d.values():
...     print(key)
...
1
2
3

>>> d = {'a': 1, 'b': 2, 'c': 3}
>>> for k,y in d.items():
...     print(k,y)
...
a 1
b 2
c 3
```

由于字符串也是可迭代对象，因此，也可以作用于`for`循环：

```plain
>>> for ch in 'ABC':
...     print(ch)
...
A
B
C
```

如何判断一个对象是可迭代对象呢？方法是通过`collections.abc`模块的`Iterable`类型判断：

```plain
>>> from collections.abc import Iterable
>>> isinstance('abc', Iterable) # str是否可迭代
True
>>> isinstance([1,2,3], Iterable) # list是否可迭代
True
>>> isinstance(123, Iterable) # 整数是否可迭代
False
```

如果要对`list`实现类似Java那样的下标循环怎么办？Python内置的`enumerate`函数可以把一个`list`变成索引-元素对，这样就可以在`for`循环中同时迭代索引和元素本身：

```plain
>>> for i, value in enumerate(['A', 'B', 'C']):
...     print(i, value)
...
0 A
1 B
2 C
```

上面的`for`循环里，同时引用了两个变量，在Python里是很常见的，比如下面的代码：

```plain
>>> for x, y in [(1, 1), (2, 4), (3, 9)]:
...     print(x, y)
...
1 1
2 4
3 9
```
# 列表生成式
列表生成式即List Comprehensions，是Python内置的非常简单却强大的可以用来创建list的生成式。

举个例子，要生成list `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`可以用`list(range(1, 11))`：

```plain
>>> list(range(1, 11))
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

但如果要生成`[1x1, 2x2, 3x3, ..., 10x10]`怎么做？方法一是循环：

```plain
>>> L = []
>>> for x in range(1, 11):
...    L.append(x * x)
...
>>> L
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

但是循环太繁琐，而列表生成式则可以用一行语句代替循环生成上面的list：

```plain
>>> [x * x for x in range(1, 11)]
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```
写列表生成式时，把要生成的元素`x * x`放到前面，后面跟`for`循环，就可以把list创建出来，十分有用，多写几次，很快就可以熟悉这种语法。

for循环后面还可以加上if判断，这样我们就可以筛选出仅偶数的平方：

```plain
>>> [x * x for x in range(1, 11) if x % 2 == 0]
[4, 16, 36, 64, 100]
```

还可以使用两层循环，可以生成全排列：

```plain
>>> [m + n for m in 'ABC' for n in 'XYZ']
['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']
```

三层和三层以上的循环就很少用到了。
`for`循环其实可以同时使用两个甚至多个变量，比如`dict`的`items()`可以同时迭代key和value：

```plain
>>> d = {'x': 'A', 'y': 'B', 'z': 'C' }
>>> for k, v in d.items():
...     print(k, '=', v)
...
y = B
x = A
z = C
```

因此，列表生成式也可以使用两个变量来生成list：

```plain
>>> d = {'x': 'A', 'y': 'B', 'z': 'C' }
>>> [k + '=' + v for k, v in d.items()]
['y=B', 'x=A', 'z=C']
```

最后把一个list中所有的字符串变成小写：

```plain
>>> L = ['Hello', 'World', 'IBM', 'Apple']
>>> [s.lower() for s in L]
['hello', 'world', 'ibm', 'apple']
```
使用列表生成式的时候，有些童鞋经常搞不清楚`if...else`的用法。

例如，以下代码正常输出偶数：

```plain
>>> [x for x in range(1, 11) if x % 2 == 0]
[2, 4, 6, 8, 10]
```

但是，我们不能在最后的`if`加上`else`：

```plain
>>> [x for x in range(1, 11) if x % 2 == 0 else 0]
  File "<stdin>", line 1
    [x for x in range(1, 11) if x % 2 == 0 else 0]
                                              ^
SyntaxError: invalid syntax
```

这是因为跟在`for`后面的`if`是一个筛选条件，不能带`else`，否则如何筛选？

另一些童鞋发现把`if`写在`for`前面必须加`else`，否则报错：

```plain
>>> [x if x % 2 == 0 for x in range(1, 11)]
  File "<stdin>", line 1
    [x if x % 2 == 0 for x in range(1, 11)]
                       ^
SyntaxError: invalid syntax
```

这是因为`for`前面的部分是一个表达式，它必须根据`x`计算出一个结果。因此，考察表达式：`x if x % 2 == 0`，它无法根据`x`计算出结果，因为缺少`else`，必须加上`else`：

```plain
>>> [x if x % 2 == 0 else -x for x in range(1, 11)]
[-1, 2, -3, 4, -5, 6, -7, 8, -9, 10]
```

上述`for`前面的表达式`x if x % 2 == 0 else -x`才能根据`x`计算出确定的结果。

可见，在一个列表生成式中，`for`前面的`if ... else`是表达式，而`for`后面的`if`是过滤条件，不能带`else`。
# 生成器
通过列表生成式，我们可以直接创建一个列表。但是，受到内存限制，列表容量肯定是有限的。而且，创建一个包含100万个元素的列表，不仅占用很大的存储空间，如果我们仅仅需要访问前面几个元素，那后面绝大多数元素占用的空间都白白浪费了。

要创建一个generator，有很多种方法。第一种方法很简单，只要把一个列表生成式的`[]`改成`()`，就创建了一个generator：

```plain
>>> L = [x * x for x in range(10)]
>>> L
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
>>> g = (x * x for x in range(10))
>>> g
<generator object <genexpr> at 0x1022ef630>
```
建`L`和`g`的区别仅在于最外层的`[]`和`()`，`L`是一个list，而`g`是一个generator。

我们可以直接打印出list的每一个元素，但我们怎么打印出generator的每一个元素呢？

如果要一个一个打印出来，可以通过`next()`函数获得generator的下一个返回值：

```plain
>>> next(g)
0
>>> next(g)
1
>>> next(g)
4
>>> next(g)
9
>>> next(g)
16
>>> next(g)
25
>>> next(g)
36
>>> next(g)
49
>>> next(g)
64
>>> next(g)
81
>>> next(g)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```

我们讲过，generator保存的是算法，每次调用`next(g)`，就计算出`g`的下一个元素的值，直到计算到最后一个元素，没有更多的元素时，抛出`StopIteration`的错误。

当然，上面这种不断调用`next(g)`实在是太变态了，正确的方法是使用`for`循环，因为generator也是可迭代对象：

```plain
>>> g = (x * x for x in range(10))
>>> for n in g:
...     print(n)
... 
0
1
4
9
16
25
36
49
64
81
```

所以，我们创建了一个generator后，基本上永远不会调用`next()`，而是通过`for`循环来迭代它，并且不需要关心`StopIteration`的错误。

所以，我们创建了一个generator后，基本上永远不会调用`next()`，而是通过`for`循环来迭代它，并且不需要关心`StopIteration`的错误。

generator非常强大。如果推算的算法比较复杂，用类似列表生成式的`for`循环无法实现的时候，还可以用函数来实现。

比如，著名的斐波拉契数列（Fibonacci），除第一个和第二个数外，任意一个数都可由前两个数相加得到：

1, 1, 2, 3, 5, 8, 13, 21, 34, ...

斐波拉契数列用列表生成式写不出来，但是，用函数把它打印出来却很容易：

```python
def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        print(b)
        a, b = b, a + b
        n = n + 1
    return 'done'
```
```plain
>>> fib(6)
1
1
2
3
5
8
'done'
```