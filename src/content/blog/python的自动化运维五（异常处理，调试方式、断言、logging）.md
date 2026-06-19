---
title: python的自动化运维五（异常处理）
published: 2026-06-16
pinned: false
description: python的自动化运维五（异常处理）
tags:
  - python
draft: false
category: 教程
image: api
---
# try...except...else...finall
```python
try:  
    i=input("number:")  
    r=10/i  
    print(r)  
except ZeroDivisionError as e:  
    print(e)  
except TypeError as e:  
    print(e)  
except BaseException as e:  
    print(e)  
else:  
    print("程序没有异常")  
finally:  
    print("程序结束")
```
以上是异常处理的结构体
基础的类型或常用的就是
```python
try:  
    i=input("number:")  
    r=10/i  
    print(r)  
except ZeroDivisionError as e:  
    print(e)  
except TypeError as e:  
    print(e)  
except BaseException as e:  
    print(e)  
```
这种类型try区域写代码或者是main的主题代码，except写异常类型，分为上部分呢写细分，下部分写总，最后没有异常可以写一个else来输出没有异常，提示程序结束可以写一个finally，else和finally可写可不写，看使用情况而定
最终可以写成
```python
def n():  
    i=input("number:")  
    return i  
  
def pro():  
    r=10/n()  
    return r  
  
def func():  
    print(pro())  
  
def main():  
    print(func())  
  
try:  
    if __name__ == "__main__":  
        main()  
except ZeroDivisionError as e:  
    print(e)  
except TypeError as e:  
    print(e)  
except BaseException as e:  
    print(e)  
else:  
    print("best")  
finally:  
    print("exit")
```
只要最后执行的程序拦截到异常就行，不需要内部程序写具体内容

# 断言
```python
def foo(s):  
    n = int(s)  
    assert n != 0, 'n is zero!'   #表达式结果为true继续执行为false跳错误+错误提示
    return 10 / n  
  
def main():  
    foo('0')  
  
if __name__ == "__main__":  
    main()
```

`assert`的意思是，表达式`n != 0`应该是`True`程序会继续走不会中断，否则，根据程序运行的逻辑，后面的代码肯定会出错。

如果断言失败，`assert`语句本身就会抛出`AssertionError`+错误提示 ：

```plain
$ python err.py
Traceback (most recent call last):
  ...
AssertionError: n is zero!
```

程序中如果到处充斥着`assert`，和`print()`相比也好不到哪去。不过，启动Python解释器时可以用`-O`参数来关闭`assert`：

```plain
$ python -O err.py
Traceback (most recent call last):
  ...
ZeroDivisionError: division by zero
```

 注意

断言的开关“-O”是英文大写字母O，不是数字0。

关闭后，你可以把所有的`assert`语句当成`pass`来看。

# logging

```python
import logging  #导入模块
  
logging.basicConfig(  
    level=logging.DEBUG,  #设置等级 debug<info<warring<error debug就是什么都输出，error则只输出error
    format='%(asctime)s - %(levelname)s - %(message)s',  #输出格式"时间-等级-内容"
    handlers=[  
        logging.FileHandler('app.log'),  #输出到问价
        logging.StreamHandler()  #在控制台输出
    ]  
)  
  
def safe_divide(a,b_str):  
    try:  
        b = int(b_str)  
        logging.debug(f"输入的字符串{b_str},已转换为{b}")  #如果正常转换则输出信息
  
        if b ==0:  
            logging.error("除数不能为零")  #除数为0，则输出信息，并return退出函数
            return None  
  
        result = a/b  
        logging.info(f"结果：{a}/{b}={result}")  #正常输出结果并return
        return result  
  
    except ValueError:  
        logging.error(f"字符串{b_str}不能转为整数")  #捕获错误并输出日志报告
        return None  
  
# safe_divide(10,"0")  
# safe_divide(10,"abc")  
safe_divide(10,2)
```

这就是`logging`的好处，它允许你指定记录信息的级别，有`debug`，`info`，`warning`，`error`等几个级别，当我们指定`level=INFO`时，`logging.debug`就不起作用了。同理，指定`level=WARNING`后，`debug`和`info`就不起作用了。这样一来，你可以放心地输出不同级别的信息，也不用删除，最后统一控制输出哪个级别的信息。

`logging`的另一个好处是通过简单的配置，一条语句可以同时输出到不同的地方，比如console和文件。