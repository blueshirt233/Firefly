---
title: python的自动化运维四面向对象（类和实例，继承和多态）
published: 2026-06-16
pinned: false
description: python的自动化运维四面向对象（类和实例，继承和多态）
tags:
  - python
draft: false
category: 教程
image: api
---
# 类和实例
```python
```python
class Animal:  #创建类，类名首字母大写
    def animal(self):  #在类里面的函数就是方法，
        print("动物信息")  
  
  
class Cat(animal):  #创建类并继承animal类
    def eat(self):  
        print("吃猫粮")  
    def run(self):  
        print("猫奔跑")  
  
tom = Cat()  #创建实例，类名+（）
tom.animal()  
tom.run()  
tom.eat()
```
类是抽象的方模板
类有两种特征，静态特征和动态特征，静态就是属性，动态就是函数
静态属性可以在类创建的时候就有
```python
class Animal:  #创建类，类名首字母大写

	def __init__ (self,name,age):
		self.nmae = name
		self.age = age

    def animal(self):  
        print("动物信息")  
```

使用__init__方法来初始化类，第一个参数永远是self代表自身，将导入的参数复制给self.name和self.age
## 封装
在类的内部定义访问数据的函数，这样，就把“数据”给封装起来了
```python
class animal:  
    def __init__ (self,name,age):  #使用__init__方法来初始化类，第一个参数永远是self代表自身
        self.name = name  #将导入的参数复制给self.name,这个是系统过的静态属性
        self.age = age  
  
    def animal(self):  #创建类内部的函数，并和类的属性联动起来就是封装
        print(f"名字是：{self.name}，年龄是：{self.age}")  #在同一类下共享属性
  
  
class Cat(animal):  
    def eat(self):  
        print(f"{self.name}吃猫粮")  #继承animal父类，所以继承了animal的所有属性和方法
    def run(self):  
        print(f"{self.name}奔跑")  
  
tom = Cat("大脸猫",3)  
jeray=Cat("小脸猫",1)  
tom.animal()  
tom.run()  
tom.eat()  
jeray.animal()  
jeray.run()  
jeray.eat()
```

```
名字是：大脸猫，年龄是：3
大脸猫奔跑
大脸猫吃猫粮
名字是：小脸猫，年龄是：1
小脸猫奔跑
小脸猫吃猫粮
```
## 访问限制
以上的代码有一个缺陷就是self.name和self.age可以在外部修改，通过
```
tom.name="傻猫"  
tom.animal()
```
```
名字是：傻猫，年龄是：3
```
需要改成
```python
class animal:  
    def __init__ (self,name,age):  
        self.__name = name  #增加两条下划线来设置为私有变量
        self.__age = age  
  
    def animal(self):  
        print(f"名字是：{self.__name}，年龄是：{self.__age}")  
  
    def getname(self):  #通过使用getset方法让外部调用
        return self.__name  
    def getage(self):  
        return self.__age  
    def setname(self,name):  
        self.__name=name  
    def setage(self,age):  #set方法有一个好处就是可以做输入限制防止代码崩溃
        if 0<age<20:  
            self.__age=age  
        else:  
            print("年龄输入错误")  
  
  
class Cat(animal):  
    def eat(self):  
        name=self.getname()  
        print(f"{name}吃猫粮")  
    def run(self):  
        name=self.getname()  
        print(f"{name}奔跑")  
  
tom = Cat("大脸猫",3)  
jeray=Cat("小脸猫",1)  
tom.animal()  
tom.run()  
tom.eat()  
jeray.animal()  
jeray.run()  
jeray.eat()  
tom.setage(12)  
tom.animal()  
tom.setname("笨猫")  
tom.animal()  
jeray.animal() 
```

```
名字是：大脸猫，年龄是：3
大脸猫奔跑
大脸猫吃猫粮
名字是：小脸猫，年龄是：1
小脸猫奔跑
小脸猫吃猫粮
名字是：大脸猫，年龄是：12
名字是：笨猫，年龄是：12
名字是：小脸猫，年龄是：1
```

还有一种更简单的方法就是变量前面加一个"\_\"就行
```python
class animal:
    def __init__(self, name, age):
        self._name = name
        self._age = age

    def animal(self):
        print(f"名字是：{self._name}，年龄是：{self._age}")

class Cat(animal):
    def eat(self):
        print(f"{self._name}吃猫粮")
    def run(self):
        print(f"{self._name}奔跑")
```

python‘’‘ ’‘’这个是类的描述，通过类名+\_\_doc来调用

# 继承和多态
```python
class animal:  
    def __init__ (self,name,age):  
        self.__name = name  
        self.__age = age  
  
    def animal(self):  
        print(f"名字是：{self.__name}，年龄是：{self.__age}")  
  
    def getname(self):  
        return self.__name  
    def getage(self):  
        return self.__age  
    def setname(self,name):  
        self.__name=name  
    def setage(self,age):  
        if 0<age<20:  
            self.__age=age  
        else:  
            print("年龄输入错误")  
    def eat(self):  
        print(f"{self.__name}吃饭")  
    def run(self):  
        print(f"{self.__name}奔跑")  
  
  
class Cat(animal):  
    def eat(self):  
        name=self.getname()  
        print(f"{name}吃猫粮")  
  
class Dog(animal):  
    def eat(self):  
        name=self.getname()  
        print(f"{name}吃狗粮")  
  
tom = Cat("大脸猫",3)  
jeray=Cat("小脸猫",1)  
tom.animal()  
tom.run()  
tom.eat()  
jeray.animal()  
jeray.run()  
jeray.eat()  
hansen=Dog("汉森",9)  
hansen.animal()  
hansen.eat()  
hansen.run()
```

```
名字是：大脸猫，年龄是：3
大脸猫奔跑
大脸猫吃猫粮
名字是：小脸猫，年龄是：1
小脸猫奔跑
小脸猫吃猫粮
名字是：汉森，年龄是：9
汉森吃狗粮
汉森奔跑
```

以上的代码体现了继承和重写，tom，jeray，hansen都继承了animal的静态属性和函数，同时凑重写了eat函数

```python
class animal:  
    def __init__ (self,name,age):  
        self.__name = name  
        self.__age = age  
  
    def animal(self):  
        print(f"名字是：{self.__name}，年龄是：{self.__age}")  
  
    def getname(self):  
        return self.__name  
    def getage(self):  
        return self.__age  
    def setname(self,name):  
        self.__name=name  
    def setage(self,age):  
        if 0<age<20:  
            self.__age=age  
        else:  
            print("年龄输入错误")  
    def eat(self):  
        print(f"{self.__name}吃饭")  
    def run(self):  
        print(f"{self.__name}奔跑")  
  
  
class Cat(animal):  
    def eat(self):  
        print(f"{self.getname()}吃猫粮")  
  
class Dog(animal):  
    def eat(self):  
        print(f"{self.getname()}吃狗粮")  
  
  
def zoo(a):  #这个函数没有任何意义，只有方法的集合，固定输出的模板
    a.eat()  
    a.run()  
    a.animal()  
  
  
zoo(Cat("大脸猫",3))  #输入不同的类名结合zoo方法里的方法来执行不同的结果
zoo(Cat("小脸猫",1))  
zoo(Dog("汉森",9))
```

这种写法是的代码解耦，动物园添加什么动物直接添加即可，但是输出内容已在zoo固定，无法更改，同时这个这个zoo由于使用的animal和animal子类的方法所以只能传animal或animal子类
看上去没啥意思，但是仔细想想，现在，如果我们再定义一个`Tortoise`类型，也从`Animal`派生：

```python
class Tortoise(Animal):
    def run(self):
        print('Tortoise is running slowly...')
```
只需要新增类就可以直接执行

# 获取对象信息 type()
首先，我们来判断对象类型，使用`type()`函数：

基本类型都可以用`type()`判断：

```plain
>>> type(123)
<class 'int'>
>>> type('str')
<class 'str'>
>>> type(None)
<type(None) 'NoneType'>
```
首先，我们来判断对象类型，使用`type()`函数：

如果一个变量指向函数或者类，也可以用`type()`判断：

```plain
>>> type(abs)
<class 'builtin_function_or_method'>
>>> type(a)
<class '__main__.Animal'>
```

但是`type()`函数返回的是什么类型呢？它返回对应的Class类型。如果我们要在`if`语句中判断，就需要比较两个变量的type类型是否相同：

```plain
>>> type(123)==type(456)
True
>>> type(123)==int
True
>>> type('abc')==type('123')
True
>>> type('abc')==str
True
>>> type('abc')==type(123)
False
```

# 使用isinstance()

对于class的继承关系来说，使用`type()`就很不方便。我们要判断class的类型，可以使用`isinstance()`函数。

我们回顾上次的例子，如果继承关系是：

```plain
object -> Animal -> Dog -> Husky
```

那么，`isinstance()`就可以告诉我们，一个对象是否是某种类型。先创建3种类型的对象：

```plain
>>> a = Animal()
>>> d = Dog()
>>> h = Husky()
```

然后，判断：

```plain
>>> isinstance(h, Husky)
True
```

紧接着，可以测试该对象的属性：

```plain
>>> hasattr(obj, 'x') # 有属性'x'吗？
True
>>> obj.x
9
>>> hasattr(obj, 'y') # 有属性'y'吗？
False
>>> setattr(obj, 'y', 19) # 设置一个属性'y'
>>> hasattr(obj, 'y') # 有属性'y'吗？
True
>>> getattr(obj, 'y') # 获取属性'y'
19
>>> obj.y # 获取属性'y'
19
```
如果试图获取不存在的属性，会抛出AttributeError的错误：

```plain
>>> getattr(obj, 'z') # 获取属性'z'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'MyObject' object has no attribute 'z'
```

可以传入一个default参数，如果属性不存在，就返回默认值：

```plain
>>> getattr(obj, 'z', 404) # 获取属性'z'，如果不存在，返回默认值404
404
```
# 实例属性和类属性
由于Python是动态语言，根据类创建的实例可以任意绑定属性。

给实例绑定属性的方法是通过实例变量，或者通过`self`变量：

```python
class Student(object):
    def __init__(self, name):
        self.name = name

s = Student('Bob')
s.score = 90
```

但是，如果`Student`类本身需要绑定一个属性呢？可以直接在class中定义属性，这种属性是类属性，归`Student`类所有：

```python
class Student(object):
    name = 'Student'
```

当我们定义了一个类属性后，这个属性虽然归类所有，但类的所有实例都可以访问到。来测试一下：

```plain
>>> class Student(object):
...     name = 'Student'
...
>>> s = Student() # 创建实例s
>>> print(s.name) # 打印name属性，因为实例并没有name属性，所以会继续查找class的name属性
Student
>>> print(Student.name) # 打印类的name属性
Student
>>> s.name = 'Michael' # 给实例绑定name属性
>>> print(s.name) # 由于实例属性优先级比类属性高，因此，它会屏蔽掉类的name属性
Michael
>>> print(Student.name) # 但是类属性并未消失，用Student.name仍然可以访问
Student
>>> del s.name # 如果删除实例的name属性
>>> print(s.name) # 再次调用s.name，由于实例的name属性没有找到，类的name属性就显示出来了
Student
```

从上面的例子可以看出，在编写程序的时候，千万不要对实例属性和类属性使用相同的名字，因为相同名称的实例属性将屏蔽掉类属性，但是当你删除实例属性后，再使用相同的名称，访问到的将是类属性。