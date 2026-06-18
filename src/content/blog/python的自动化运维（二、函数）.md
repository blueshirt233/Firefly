---
title: python的自动化运维（二、函数）
published: 2026-06-03
pinned: false
description: python的自动化运维（二、函数）
tags:
  - python
draft: false
category: 教程
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